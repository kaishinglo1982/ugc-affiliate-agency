export interface ImportedExpense {
  externalId: string
  date: string
  amount: number
  currency: string
  description: string
  category: string
  provider: string
}

export interface ExpenseImporter {
  provider: string
  type: string
  connect(): Promise<boolean>
  import(fromDate: string, toDate: string): Promise<ImportedExpense[]>
}

class MockImporter implements ExpenseImporter {
  constructor(public provider: string, public type: string) {}
  async connect(): Promise<boolean> { return true }
  async import(fromDate: string, toDate: string): Promise<ImportedExpense[]> {
    return [{ externalId: `mock-${this.provider}-1`, date: new Date().toISOString(), amount: Math.random() * 500, currency: 'EUR', description: `Mock ${this.provider} expense`, category: this.type, provider: this.provider }]
  }
}

export const importers: Record<string, ExpenseImporter> = {
  stripe: new MockImporter('stripe', 'payment'),
  paypal: new MockImporter('paypal', 'payment'),
  bank: new MockImporter('bank', 'banking'),
  'meta-ads': new MockImporter('meta-ads', 'ads'),
  'tiktok-ads': new MockImporter('tiktok-ads', 'ads'),
  openai: new MockImporter('openai', 'api'),
  anthropic: new MockImporter('anthropic', 'api'),
  elevenlabs: new MockImporter('elevenlabs', 'api'),
  hosting: new MockImporter('hosting', 'hosting'),
}

export function getExpenseImporter(provider: string): ExpenseImporter {
  return importers[provider] || new MockImporter(provider, 'other')
}
