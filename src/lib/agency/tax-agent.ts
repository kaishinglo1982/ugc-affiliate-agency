import { taxProfile, vatEstimates, incomeTaxReserves, taxCalendarEvents } from '@/data/enterprise'
import type { TaxProfile, VatEstimate, IncomeTaxReserve, TaxCalendarEvent } from '@/data/enterprise'

export class TaxAgent {
  getProfile(): TaxProfile {
    return taxProfile
  }

  getVatEstimate(period: string): VatEstimate | undefined {
    return vatEstimates.find(v => v.period === period)
  }

  getIncomeTaxReserve(year: number): IncomeTaxReserve | undefined {
    return incomeTaxReserves.find(r => r.year === year)
  }

  getUpcomingDeadlines(): TaxCalendarEvent[] {
    return taxCalendarEvents.filter(e => e.status === 'upcoming' || e.status === 'due')
  }

  estimateVat(periodRevenue: number, periodExpenses: number): { vatOnRevenue: number; vatOnExpenses: number; vatDue: number } {
    const rate = taxProfile.vatRate / 100
    const vatOnRevenue = Math.round(periodRevenue * rate * 100) / 100
    const vatOnExpenses = Math.round(periodExpenses * rate * 100) / 100
    const vatDue = Math.round((vatOnRevenue - vatOnExpenses) * 100) / 100
    return { vatOnRevenue, vatOnExpenses, vatDue }
  }
}
