Plano de Otimização (MVP estável, melhorias sem quebrar)
=======================================================

Objetivos
- Reduzir latência e eliminar N+1 sem alterar comportamentos.
- Adotar compressão e rastreabilidade, preservando observabilidade atual.
- Introduzir endpoint agregado seguro, com fallback no frontend.

Filosofia
- Incremental, reversível, medido por headers/logs.
- Evitar overengineering e migrações desnecessárias.

Fluxo de Execução
- Passo A: Quick win — otimizar jogadores do período (joinedload).
- Passo B: Adicionar Flask-Compress e `X-Trace-Id`, mantendo `X-Request-Duration-ms`.
- Passo C: Criar `/api/cashflow/summary` com agregação por mês/ano; payload enxuto.
- Passo D: Frontend com flag `NEXT_PUBLIC_USE_AGGREGATED_CF` e fallback.
- Passo E: Avaliar necessidade de índices adicionais (somente se faltar). 

Observabilidade e Rollback
- Já temos `X-Request-Duration-ms` e logs estruturados.
- Adicionar `X-Trace-Id` para correlação.
- Rollback: desativar flag no frontend e/ou desabilitar Compress.

Status Atual (encerramento do plano)
- N+1 removido em jogadores do período via `joinedload`.
- `Flask-Compress` habilitado; headers `X-Trace-Id` e `X-Request-Duration-ms` ativos.
- Endpoint agregado `/api/cashflow/summary` implementado e validado.
- Teste mínimo adicionado (`backend/tests/test_cashflow_summary.py`) cobrindo contrato e headers.
- Documentação atualizada (`docs/*`): API, troubleshooting, getting-started, deployment, testing.
- Índices compostos definidos nos modelos (sem migração aplicada), com diretrizes de criação concorrente em produção.

----------------------------------------
Passo A — Backend: eliminar N+1 em jogadores do período
----------------------------------------
Arquivo: `backend/blueprints/api/controllers.py`
Objetivo: carregar `mp.player` sem disparar N consultas.

Snippet:
```
from sqlalchemy.orm import joinedload

monthly_players = (
    MonthlyPlayer.query
    .options(joinedload(MonthlyPlayer.player))
    .filter(and_(
        MonthlyPlayer.monthly_period_id == period_id,
        MonthlyPlayer.user_id == current_user_id
    ))
    .all()
)
```

----------------------------------------
Passo B — Backend: Compressão e Trace ID
----------------------------------------
Arquivo: `backend/__init__.py`
Objetivo: habilitar compressão e correlação de requisições, sem duplicar timing.

1) Dependência
```
# backend/requirements.txt
Flask-Compress~=1.14.0
```

2) Inicialização
```
from flask_compress import Compress
compress = Compress()

def init_extensions(app):
    # ... extensões existentes
    compress.init_app(app)

@app.before_request
def _set_trace_id():
    try:
        g.trace_id = request.headers.get('X-Request-Id') or uuid.uuid4().hex[:8]
    except Exception:
        pass

@app.after_request
def _attach_trace_id(response):
    try:
        if getattr(g, 'trace_id', None):
            response.headers['X-Trace-Id'] = g.trace_id
    except Exception:
        pass
    return response
```

Nota: manter o middleware de timing já existente para `X-Request-Duration-ms`.

----------------------------------------
Passo C — Backend: endpoint agregado `/api/cashflow/summary`
----------------------------------------
Arquivo: `backend/blueprints/api/controllers.py`
Objetivo: retornar por mês `{year, month, income, expenses, balance}`.

Abordagem (duas agregações + merge):
```
from sqlalchemy import func

@api_bp.route('/cashflow/summary', methods=['GET'])
@jwt_required()
def get_cashflow_summary():
    current_user_id = str(get_jwt_identity())

    income_rows = (
        db.session.query(
            MonthlyPeriod.year,
            MonthlyPeriod.month,
            func.sum(MonthlyPeriod.total_received).label('income')
        )
        .filter(MonthlyPeriod.user_id == current_user_id)
        .group_by(MonthlyPeriod.year, MonthlyPeriod.month)
        .all()
    )

    expense_rows = (
        db.session.query(
            Expense.year,
            Expense.month,
            func.sum(Expense.amount).label('expenses')
        )
        .filter(Expense.user_id == current_user_id)
        .group_by(Expense.year, Expense.month)
        .all()
    )

    idx = {}
    for y, m, income in income_rows:
        idx[(y, m)] = {'year': y, 'month': m, 'income': float(income), 'expenses': 0.0}
    for y, m, expenses in expense_rows:
        item = idx.setdefault((y, m), {'year': y, 'month': m, 'income': 0.0, 'expenses': 0.0})
        item['expenses'] = float(expenses)

    result = []
    for (_y, _m), item in sorted(idx.items()):
        balance = item['income'] - item['expenses']
        item['balance'] = balance
        result.append(item)

    return jsonify(result), 200
```

----------------------------------------
Passo D — Frontend: flag e fallback
----------------------------------------
Arquivo: `frontend/lib/cashflow-data.ts`
Objetivo: usar o agregado quando disponível, senão manter método atual.

Snippet:
```
import { api } from './api'

export async function getCashflowByMonth(params?: { startYear?: number; endYear?: number }) {
  const useAgg = process.env.NEXT_PUBLIC_USE_AGGREGATED_CF === 'true'
  if (useAgg) {
    try {
      const res = await api.get('/cashflow/summary')
      const data = (res.data || []) as Array<{ year: number; month: number; income: number; expenses: number; balance: number }>

      const filtered = data.filter((d) => {
        if (params?.startYear && d.year < params.startYear) return false
        if (params?.endYear && d.year > params.endYear) return false
        return true
      })

      return filtered.sort((a, b) => (a.year - b.year) || (a.month - b.month)).map((d) => ({
        month: MONTH_NAMES[d.month - 1] || String(d.month),
        year: d.year,
        monthNumber: d.month,
        income: d.income,
        expenses: d.expenses,
        balance: d.balance,
        profit: d.balance,
      }))
    } catch (_) {
      // fallback
    }
  }

  // método atual (fallback)
  // ... manter implementação existente
}
```

Enable flag: `NEXT_PUBLIC_USE_AGGREGATED_CF=true`.

----------------------------------------
Passo E — Índices (só se necessário)
----------------------------------------
Status atual: modelos já definem índices úteis:
- `idx_expenses_period (monthly_period_id, month, year)`
- `idx_monthly_periods_unique (month, year, user_id)`
- `idx_monthly_players_period`, `idx_casual_players_period`

Diretriz: não criar índices redundantes; avaliar planos de execução do endpoint agregado e só então adicionar.

----------------------------------------
Checklist de Implementação
----------------------------------------
- Dia 1: aplicar `joinedload`; adicionar Flask-Compress; `X-Trace-Id` nos headers.
- Dia 2: implementar `/api/cashflow/summary`; ativar flag no frontend com fallback; medir.
- Dia 3: avaliar necessidade de novos índices; só criar se faltar.

----------------------------------------
Medição e Logs
----------------------------------------
- Backend: `X-Request-Duration-ms`, `X-Trace-Id`, logs `[Perf][Request]` já existentes.
- Frontend: manter logs `[Perf][Cashflow]` e comparar antes/depois.

----------------------------------------
Troubleshooting
----------------------------------------
- 404/401 no agregado: validar `jwt_required` e `get_jwt_identity`.
- Payload grande: filtrar por `startYear/endYear` no frontend.
- Compressão não ativa: confirmar `Flask-Compress` no `requirements.txt` e `compress.init_app(app)`.
- Índices: evitar duplicatas; preferir análise de plano antes de migrar.