"use client"

import { useState, useEffect } from "react"
import type { MonthlyFinancials, CashFlowSummary } from "@/types/cashflow"
import { getCashflowByMonth, getCashflowSummary, getInitialBalance, updateInitialBalance } from "@/lib/cashflow-data"
import { FinancialSummaryCards } from "@/components/financial-summary-cards"
import { MonthlyBreakdown } from "@/components/monthly-breakdown"
import { Button } from "@/components/ui/button"
import { Filter, Download, Settings } from "lucide-react"
import AuthGuard from "@/components/auth-guard"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function CashFlowPage() {
  const [financials, setFinancials] = useState<MonthlyFinancials[]>([])
  const [summary, setSummary] = useState<CashFlowSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    currentBalance: 0,
    totalProfit: 0,
  })
  const [initialBalance, setInitialBalance] = useState<number>(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formValue, setFormValue] = useState<string>("0")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      const [monthlyData, initial] = await Promise.all([
        getCashflowByMonth(),
        getInitialBalance(),
      ])
      setFinancials(monthlyData)
      const s = await getCashflowSummary(monthlyData)
      // Inclui saldo inicial no saldo atual e lucro total
      const withInitial: CashFlowSummary = {
        ...s,
        currentBalance: s.currentBalance + (initial || 0),
        totalProfit: s.totalProfit + (initial || 0),
      }
      setSummary(withInitial)
      setInitialBalance(initial)
      setFormValue(String(initial))
    }
    load()
  }, [])

  async function onSaveInitialBalance() {
    setSaving(true)
    try {
      const parsed = Number(formValue)
      const newVal = await updateInitialBalance(isNaN(parsed) ? 0 : parsed)
      setInitialBalance(newVal)
      setDialogOpen(false)
      // Recalcula o resumo para refletir o novo saldo inicial
      const s = await getCashflowSummary(financials)
      setSummary({
        ...s,
        currentBalance: s.currentBalance + (newVal || 0),
        totalProfit: s.totalProfit + (newVal || 0),
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background py-6 px-3">
      <div className="container-page">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">FLUXO DE CAIXA</h1>
            <p className="text-muted-foreground mt-1">Controle financeiro mensal e análise de receitas vs despesas</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <FinancialSummaryCards summary={summary} />

        {/* Initial Balance Card */}
        <Card className="p-4 mt-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Saldo Inicial</div>
              <div className="text-2xl font-bold">R$ {initialBalance.toLocaleString("pt-BR")}</div>
            </div>
            <div>
              <Button size="sm" variant="outline" onClick={() => setDialogOpen(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Configurar saldo inicial
              </Button>
            </div>
          </div>
        </Card>

        {/* Dialog to set initial balance */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Configurar saldo inicial</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="initialBalance">Valor</Label>
                <Input id="initialBalance" type="number" step="0.01" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>Cancelar</Button>
                <Button onClick={onSaveInitialBalance} disabled={saving}>
                  {saving ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Monthly Breakdown */}
        <MonthlyBreakdown financials={financials} initialBalance={initialBalance} />
        </div>
      </div>
    </AuthGuard>
  )
}
