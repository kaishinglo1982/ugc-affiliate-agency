export interface AccountingExportRow {
  date: string
  type: 'revenue' | 'expense'
  category: string
  amount: number
  vatRate: number
  vatAmount: number
  description: string
  customerName?: string
  invoiceNumber?: string
}

export interface AccountingExporter {
  name: string
  format: string
  export(rows: AccountingExportRow[], period: string): Promise<{ content: string; mimeType: string; filename: string }>
}

class CSVExporter implements AccountingExporter {
  name = 'CSV'
  format = 'csv'
  async export(rows: AccountingExportRow[], period: string): Promise<{ content: string; mimeType: string; filename: string }> {
    const headers = 'Datum,Typ,Kategorie,Betrag,USt-Satz,USt-Betrag,Beschreibung,Kunde,Rechnungsnummer'
    const csvRows = rows.map(r => `${r.date},${r.type},${r.category},${r.amount},${r.vatRate},${r.vatAmount},"${r.description}",${r.customerName || ''},${r.invoiceNumber || ''}`)
    return { content: [headers, ...csvRows].join('\n'), mimeType: 'text/csv', filename: `export-${period}.csv` }
  }
}

class DATEVExporter implements AccountingExporter {
  name = 'DATEV'
  format = 'datev'
  async export(rows: AccountingExportRow[], period: string): Promise<{ content: string; mimeType: string; filename: string }> {
    const header = 'DATEV-Export;Umsätze;2026;'
    const dataRows = rows.map(r => `${r.date};${r.type === 'revenue' ? 'H' : 'S'};${r.amount.toFixed(2)};${r.vatRate};${r.description}`)
    return { content: [header, ...dataRows].join('\n'), mimeType: 'text/csv', filename: `datev-export-${period}.csv` }
  }
}

class LexofficeExporter implements AccountingExporter {
  name = 'Lexoffice'
  format = 'lexoffice'
  async export(rows: AccountingExportRow[], period: string): Promise<{ content: string; mimeType: string; filename: string }> {
    return { content: JSON.stringify({ version: '1.0', period, rows }), mimeType: 'application/json', filename: `lexoffice-${period}.json` }
  }
}

class SevDeskExporter implements AccountingExporter {
  name = 'SevDesk'
  format = 'sevdesk'
  async export(rows: AccountingExportRow[], period: string): Promise<{ content: string; mimeType: string; filename: string }> {
    return { content: JSON.stringify({ sevdeskVersion: '1.0', period, transactions: rows }), mimeType: 'application/json', filename: `sevdesk-${period}.json` }
  }
}

export const accountingExporters: Record<string, AccountingExporter> = {
  csv: new CSVExporter(),
  datev: new DATEVExporter(),
  lexoffice: new LexofficeExporter(),
  sevdesk: new SevDeskExporter(),
}

export function getAccountingExporter(format: string): AccountingExporter {
  return accountingExporters[format] || accountingExporters.csv
}
