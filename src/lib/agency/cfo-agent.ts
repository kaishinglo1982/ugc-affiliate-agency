import { revenues, expenses, cashflowEntries, profitMetrics, expenseImportAdapters } from '@/data/enterprise'
import type { Revenue, Expense, CashflowEntry, ProfitMetric, ExpenseImportAdapter } from '@/data/enterprise'

export class CFOAgent {
  getTotalRevenue(): number {
    return revenues.reduce((sum, r) => sum + r.amount, 0)
  }

  getTotalExpenses(): number {
    return expenses.reduce((sum, e) => sum + e.amount, 0)
  }

  getNetProfit(): number {
    return this.getTotalRevenue() - this.getTotalExpenses()
  }

  getCashflow(): CashflowEntry[] {
    return cashflowEntries
  }

  getProfitByEntity(entityType: string): ProfitMetric[] {
    return profitMetrics.filter(p => p.entityType === entityType)
  }

  getImportAdapters(): ExpenseImportAdapter[] {
    return expenseImportAdapters
  }

  getCostWarning(threshold: number): Expense[] {
    return expenses.filter(e => e.amount > threshold)
  }

  getBudgetRecommendations(): { category: string; current: number; recommended: number; reason: string }[] {
    const apiCost = expenses.filter(e => e.category === 'api').reduce((s, e) => s + e.amount, 0)
    const adCost = expenses.filter(e => e.category === 'ads').reduce((s, e) => s + e.amount, 0)
    const toolsCost = expenses.filter(e => e.category === 'tools').reduce((s, e) => s + e.amount, 0)
    const totalRevenue = this.getTotalRevenue()
    return [
      {
        category: 'api',
        current: apiCost,
        recommended: Math.round(apiCost * 0.9 * 100) / 100,
        reason: 'API costs can be reduced by 10% through provider optimisation',
      },
      {
        category: 'ads',
        current: adCost,
        recommended: Math.round(totalRevenue * 0.25 * 100) / 100,
        reason: `Ad spend should be capped at 25% of revenue ($${totalRevenue})`,
      },
      {
        category: 'tools',
        current: toolsCost,
        recommended: toolsCost,
        reason: 'Tool costs are within acceptable range',
      },
    ]
  }

  getProviderCosts(): { provider: string; total: number; trend: 'up' | 'down' | 'stable' }[] {
    const grouped: Record<string, number> = {}
    for (const exp of expenses) {
      grouped[exp.provider] = (grouped[exp.provider] ?? 0) + exp.amount
    }
    return Object.entries(grouped).map(([provider, total]) => ({
      provider,
      total: Math.round(total * 100) / 100,
      trend: total > 500 ? 'up' as const : total > 100 ? 'stable' as const : 'down' as const,
    }))
  }

  getProfitByAgent(): { agent: string; profit: number }[] {
    return profitMetrics
      .filter(p => p.entityType === 'agent')
      .map(p => ({ agent: p.entityId, profit: p.profit }))
  }

  getProfitByProvider(): { provider: string; profit: number }[] {
    return profitMetrics
      .filter(p => p.entityType === 'provider')
      .map(p => ({ provider: p.entityId, profit: p.profit }))
  }
}
