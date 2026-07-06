'use client'

import { taxProfile, vatEstimates, incomeTaxReserves, taxCalendarEvents } from '@/data/enterprise'

const formatCurrency = (n: number) =>
  '€' + n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

const formatDate = (d: string) =>
  new Date(d + 'T00:00:00Z').toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  })

const legalFormLabels: Record<string, string> = {
  einzelunternehmen: 'Einzelunternehmen',
  gmbh: 'GmbH',
  ug: 'UG',
  kg: 'KG',
  other: 'Other',
}

const filingPeriodLabels: Record<string, string> = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  yearly: 'Yearly',
}

const statusBadge: Record<string, string> = {
  filed: 'text-green-400',
  estimated: 'text-amber-400',
  paid: 'text-blue-400',
}

const typeBadge: Record<string, string> = {
  vat: 'text-sky-400',
  'income-tax': 'text-amber-400',
  'trade-tax': 'text-rose-400',
  payroll: 'text-violet-400',
  other: 'text-bone/50',
}

const calendarStatusBadge: Record<string, string> = {
  upcoming: 'text-blue-400',
  due: 'text-red-400',
  filed: 'text-green-400',
  overdue: 'text-rose-400',
}

const exportFormats = [
  { format: 'csv', label: 'CSV Export', desc: 'Universal spreadsheet format', status: 'ready' as const },
  { format: 'datev', label: 'DATEV', desc: 'German accounting standard', status: 'ready' as const },
  { format: 'lexoffice', label: 'Lexoffice', desc: 'Cloud-based German accounting', status: 'ready' as const },
  { format: 'sevdesk', label: 'SevDesk', desc: 'German small business accounting', status: 'ready' as const },
]

const exportStatusBadge: Record<string, string> = {
  generating: 'text-amber-400',
  ready: 'text-green-400',
  exported: 'text-blue-400',
}

export default function TaxPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-mono font-black uppercase tracking-widest text-4xl text-bone">
          Tax Center
        </h1>
        <p className="mt-2 text-bone/60 font-mono text-sm tracking-widest">
          Tax planning, estimates, and compliance calendar
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-coal p-6 mb-10">
        <h2 className="font-mono font-black uppercase tracking-widest text-bone mb-6">
          Tax Profile
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">Country</p>
            <p className="font-mono text-bone">{taxProfile.country}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">Legal Form</p>
            <p className="font-mono text-bone">{legalFormLabels[taxProfile.legalForm] || taxProfile.legalForm}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">VAT ID</p>
            <p className="font-mono text-gold">{taxProfile.vatId}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">Tax Number</p>
            <p className="font-mono text-bone">{taxProfile.taxNumber}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">VAT Rate</p>
            <p className="font-mono text-gold">{taxProfile.vatRate}%</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">Filing Period</p>
            <p className="font-mono text-bone">{filingPeriodLabels[taxProfile.vatFilingPeriod]}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">Trade Tax Rate</p>
            <p className="font-mono text-gold">{taxProfile.tradeTaxRate}%</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">Income Tax Rate</p>
            <p className="font-mono text-gold">{taxProfile.incomeTaxRate}%</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-coal p-6 mb-10 overflow-x-auto">
        <h2 className="font-mono font-black uppercase tracking-widest text-bone mb-6">
          VAT Estimates
        </h2>
        <table className="w-full text-left text-sm">
          <thead className="font-mono text-xs uppercase tracking-widest text-bone/40">
            <tr>
              <th className="pb-3 pr-4">Period</th>
              <th className="pb-3 pr-4">Revenue</th>
              <th className="pb-3 pr-4">VAT on Revenue</th>
              <th className="pb-3 pr-4">Expenses</th>
              <th className="pb-3 pr-4">VAT on Expenses</th>
              <th className="pb-3 pr-4">VAT Due</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {vatEstimates.map((est) => (
              <tr key={est.id} className="hover:bg-white/[0.03] transition-colors">
                <td className="py-3 pr-4 text-bone font-semibold">{est.period}</td>
                <td className="py-3 pr-4 font-mono text-bone">{formatCurrency(est.revenue)}</td>
                <td className="py-3 pr-4 font-mono text-bone/80">{formatCurrency(est.vatOnRevenue)}</td>
                <td className="py-3 pr-4 font-mono text-bone">{formatCurrency(est.expenses)}</td>
                <td className="py-3 pr-4 font-mono text-bone/80">{formatCurrency(est.vatOnExpenses)}</td>
                <td className="py-3 pr-4 font-mono text-gold">{formatCurrency(est.vatDue)}</td>
                <td className="py-3">
                  <span className={`font-mono text-xs uppercase tracking-widest ${statusBadge[est.status] || 'text-bone/50'}`}>
                    {est.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {incomeTaxReserves.map((reserve) => (
          <div
            key={reserve.id}
            className="rounded-2xl border border-white/10 bg-coal p-6"
          >
            <h2 className="font-mono font-black uppercase tracking-widest text-bone mb-6">
              Income Tax Reserve — {reserve.year}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">Estimated Profit</p>
                <p className="font-mono text-2xl font-black text-gold">{formatCurrency(reserve.estimatedProfit)}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">Tax Rate</p>
                <p className="font-mono text-2xl font-black text-bone">{reserve.taxRate}%</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">Reserve Amount</p>
                <p className="font-mono text-2xl font-black text-gold">{formatCurrency(reserve.reserveAmount)}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">Monthly Reserve</p>
                <p className="font-mono text-2xl font-black text-gold">{formatCurrency(reserve.monthlyReserve)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-coal p-6 mb-10 overflow-x-auto">
        <h2 className="font-mono font-black uppercase tracking-widest text-bone mb-6">
          Tax Calendar
        </h2>
        <table className="w-full text-left text-sm">
          <thead className="font-mono text-xs uppercase tracking-widest text-bone/40">
            <tr>
              <th className="pb-3 pr-4">Title</th>
              <th className="pb-3 pr-4">Due Date</th>
              <th className="pb-3 pr-4">Type</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {taxCalendarEvents.map((event) => (
              <tr key={event.id} className="hover:bg-white/[0.03] transition-colors">
                <td className="py-3 pr-4 text-bone font-semibold">{event.title}</td>
                <td className="py-3 pr-4 font-mono text-bone/80 text-xs">{formatDate(event.dueDate)}</td>
                <td className="py-3 pr-4">
                  <span className={`font-mono text-xs uppercase tracking-widest ${typeBadge[event.type] || 'text-bone/50'}`}>
                    {event.type}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <span className={`font-mono text-xs uppercase tracking-widest ${calendarStatusBadge[event.status] || 'text-bone/50'}`}>
                    {event.status}
                  </span>
                </td>
                <td className="py-3 font-mono text-gold">{formatCurrency(event.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-white/10 bg-coal p-6 mb-10">
        <h2 className="font-mono font-black uppercase tracking-widest text-bone mb-6">
          Accounting Export
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {exportFormats.map((fmt) => (
            <div
              key={fmt.format}
              className="rounded-xl border border-white/10 bg-ink p-5 hover:border-gold/30 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-mono font-bold uppercase tracking-widest text-bone text-sm">
                  {fmt.label}
                </h3>
                <span className={`font-mono text-xs uppercase tracking-widest ${exportStatusBadge[fmt.status]}`}>
                  {fmt.status}
                </span>
              </div>
              <p className="font-mono text-xs tracking-widest text-bone/40">{fmt.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-amber-900/30 bg-amber-900/10 p-4">
        <p className="font-mono text-xs tracking-widest text-amber-400/80">
          {'\u26A0\uFE0F'} Diese Zahlen sind Schätzungen und keine Steuerberatung.
        </p>
      </div>
    </div>
  )
}
