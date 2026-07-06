'use client'

import { useState } from 'react'
import {
  revenues,
  expenses,
  cashflowEntries,
  profitMetrics,
  expenseImportAdapters,
} from '@/data/enterprise'

const formatCurrency = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

const formatDate = (d: string) =>
  new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })

const sourceColors: Record<string, string> = {
  affiliate: 'bg-blue-500/20 text-blue-300',
  service: 'bg-purple-500/20 text-purple-300',
  ads: 'bg-amber-500/20 text-amber-300',
  other: 'bg-gray-500/20 text-gray-300',
}

const categoryColors: Record<string, string> = {
  api: 'bg-rose-500/20 text-rose-300',
  ads: 'bg-amber-500/20 text-amber-300',
  tools: 'bg-violet-500/20 text-violet-300',
  hosting: 'bg-cyan-500/20 text-cyan-300',
  salary: 'bg-emerald-500/20 text-emerald-300',
  other: 'bg-gray-500/20 text-gray-300',
}

const statusColors: Record<string, string> = {
  booked: 'text-green-400',
  pending: 'text-amber-400',
  reconciled: 'text-blue-400',
}

const totalRevenue = revenues.reduce((sum, r) => sum + r.amount, 0)
const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
const netProfit = totalRevenue - totalExpenses
const lastCashflow = cashflowEntries[cashflowEntries.length - 1]
const cashBalance = lastCashflow ? lastCashflow.balance : 0

const entityTypes = ['campaign', 'platform', 'niche'] as const

export default function FinanceCenterPage() {
  const [entityFilter, setEntityFilter] = useState<string>('all')

  const filteredMetrics =
    entityFilter === 'all'
      ? profitMetrics
      : profitMetrics.filter((pm) => pm.entityType === entityFilter)

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-mono font-black uppercase tracking-widest text-4xl text-bone">
          Finance Center
        </h1>
        <p className="mt-2 text-bone/60 font-mono text-sm tracking-widest">
          Revenue tracking, expenses, cashflow, and profitability analysis
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-10">
        <div className="rounded-2xl bg-coal border border-white/10 p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">
            Total Revenue
          </p>
          <p className="font-mono text-2xl font-black text-gold">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
        <div className="rounded-2xl bg-coal border border-white/10 p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">
            Total Expenses
          </p>
          <p className="font-mono text-2xl font-black text-gold">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div className="rounded-2xl bg-coal border border-white/10 p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">
            Net Profit
          </p>
          <p className="font-mono text-2xl font-black text-gold">
            {formatCurrency(netProfit)}
          </p>
        </div>
        <div className="rounded-2xl bg-coal border border-white/10 p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-1">
            Cash Balance
          </p>
          <p className="font-mono text-2xl font-black text-gold">
            {formatCurrency(cashBalance)}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-coal p-6 mb-10 overflow-x-auto">
        <h2 className="font-mono font-black uppercase tracking-widest text-bone mb-6">
          Revenue
        </h2>
        <table className="w-full text-left text-sm">
          <thead className="font-mono text-xs uppercase tracking-widest text-bone/40">
            <tr>
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3 pr-4">Source</th>
              <th className="pb-3 pr-4">Amount</th>
              <th className="pb-3 pr-4">Platform</th>
              <th className="pb-3 pr-4">Campaign</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {revenues.map((rev) => (
              <tr key={rev.id} className="hover:bg-white/[0.03] transition-colors">
                <td className="py-3 pr-4 text-bone/60 font-mono text-xs">
                  {formatDate(rev.date)}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={`inline-block rounded-full px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                      sourceColors[rev.source] || 'bg-gray-500/20 text-gray-300'
                    }`}
                  >
                    {rev.source}
                  </span>
                </td>
                <td className="py-3 pr-4 font-mono text-gold">
                  {formatCurrency(rev.amount)}
                </td>
                <td className="py-3 pr-4 text-bone/80">{rev.platform}</td>
                <td className="py-3 pr-4 text-bone/80">{rev.campaignId}</td>
                <td className="py-3">
                  <span
                    className={`font-mono text-xs uppercase tracking-widest ${
                      statusColors[rev.status] || 'text-bone/50'
                    }`}
                  >
                    {rev.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-white/10 bg-coal p-6 mb-10 overflow-x-auto">
        <h2 className="font-mono font-black uppercase tracking-widest text-bone mb-6">
          Expenses
        </h2>
        <table className="w-full text-left text-sm">
          <thead className="font-mono text-xs uppercase tracking-widest text-bone/40">
            <tr>
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3 pr-4">Category</th>
              <th className="pb-3 pr-4">Provider</th>
              <th className="pb-3 pr-4">Amount</th>
              <th className="pb-3 pr-4">Description</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {expenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-white/[0.03] transition-colors">
                <td className="py-3 pr-4 text-bone/60 font-mono text-xs">
                  {formatDate(exp.date)}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={`inline-block rounded-full px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                      categoryColors[exp.category] || 'bg-gray-500/20 text-gray-300'
                    }`}
                  >
                    {exp.category}
                  </span>
                </td>
                <td className="py-3 pr-4 text-bone/80">{exp.provider}</td>
                <td className="py-3 pr-4 font-mono text-gold">
                  {formatCurrency(exp.amount)}
                </td>
                <td className="py-3 pr-4 text-bone/60 text-xs">{exp.description}</td>
                <td className="py-3">
                  <span
                    className={`font-mono text-xs uppercase tracking-widest ${
                      statusColors[exp.status] || 'text-bone/50'
                    }`}
                  >
                    {exp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-white/10 bg-coal p-6 mb-10">
        <h2 className="font-mono font-black uppercase tracking-widest text-bone mb-6">
          Cashflow Timeline
        </h2>
        <div className="space-y-0">
          {cashflowEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold ${
                  entry.type === 'inflow'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {entry.type === 'inflow' ? '↑' : '↓'}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-mono text-sm font-semibold ${
                    entry.type === 'inflow' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {entry.type === 'inflow' ? '+' : '-'}
                  {formatCurrency(entry.amount)}
                </p>
                <p className="font-mono text-xs tracking-widest text-bone/50 truncate">
                  {entry.description}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs text-bone/60">{formatDate(entry.date)}</p>
                <p className="font-mono text-sm text-gold">{formatCurrency(entry.balance)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-coal p-6 mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mono font-black uppercase tracking-widest text-bone">
            Profit by Entity
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setEntityFilter('all')}
              className={`rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest border transition-all ${
                entityFilter === 'all'
                  ? 'bg-gold/20 text-gold border-gold/40'
                  : 'text-bone/50 border-white/10 hover:border-white/20'
              }`}
            >
              All
            </button>
            {entityTypes.map((type) => (
              <button
                key={type}
                onClick={() => setEntityFilter(type)}
                className={`rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest border transition-all ${
                  entityFilter === type
                    ? 'bg-gold/20 text-gold border-gold/40'
                    : 'text-bone/50 border-white/10 hover:border-white/20'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {filteredMetrics.map((pm) => (
            <div
              key={pm.id}
              className="rounded-xl border border-white/10 bg-ink/50 p-4"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-bone/50 mb-3">
                {pm.entityType} — {pm.entityId}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-bone/50">Revenue</span>
                  <span className="font-mono text-sm text-green-400">
                    {formatCurrency(pm.revenue)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-bone/50">Cost</span>
                  <span className="font-mono text-sm text-red-400">
                    {formatCurrency(pm.cost)}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2">
                  <span className="font-mono text-xs text-bone/50">Profit</span>
                  <span className="font-mono text-sm font-semibold text-gold">
                    {formatCurrency(pm.profit)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-bone/50">ROAS</span>
                  <span className="font-mono text-sm font-bold text-bone">
                    {pm.roas.toFixed(2)}x
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-coal p-6 mb-10">
        <h2 className="font-mono font-black uppercase tracking-widest text-bone mb-6">
          Expense Import Adapters
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {expenseImportAdapters.map((adapter) => (
            <div
              key={adapter.id}
              className="rounded-xl border border-white/10 bg-ink/50 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono text-sm font-bold text-bone">{adapter.provider}</p>
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    adapter.connected ? 'bg-green-400' : 'bg-red-400'
                  }`}
                />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-bone/40 mb-3">
                {adapter.type}
              </p>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] tracking-widest text-bone/50">
                    Connected
                  </span>
                  <span
                    className={`font-mono text-[10px] tracking-widest ${
                      adapter.connected ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {adapter.connected ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] tracking-widest text-bone/50">
                    Last Import
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-bone/70">
                    {adapter.lastImport ? formatDate(adapter.lastImport) : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] tracking-widest text-bone/50">
                    Imports
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-gold">
                    {adapter.importCount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
