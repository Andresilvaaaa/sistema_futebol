# Uso da API

## Estatísticas de Jogadores

- Endpoint: `GET /api/stats/players`
- Escopo: Retorna contagens apenas dos jogadores do usuário autenticado.
- Resposta:
  - `total`: número total de jogadores
  - `active`: jogadores ativos
  - `inactive`: jogadores inativos
  - `pending`: jogadores pendentes
  - `delayed`: jogadores atrasados

### Exemplo

```
GET /api/stats/players

200 OK
{
  "total": 24,
  "active": 18,
  "inactive": 3,
  "pending": 2,
  "delayed": 1
}
```

Observação: É necessário estar autenticado (JWT) para acessar.