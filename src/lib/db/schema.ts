import { pgTable, text, timestamp, boolean, serial, varchar, integer, numeric, index, uniqueIndex } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  activeOrganizationId: text('activeOrganizationId'),
}, (table) => ({
  userIdIdx: index('session_user_id_idx').on(table.userId),
  activeOrganizationIdx: index('session_active_organization_idx').on(table.activeOrganizationId),
}))

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- Multi-tenant organization tables -------------------------------------

export const organizations = pgTable('organization', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  logo: text('logo'),
  metadata: text('metadata'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
}, (table) => ({
  slugUnique: uniqueIndex('organization_slug_unique').on(table.slug),
}))

export const members = pgTable('member', {
  id: text('id').primaryKey(),
  organizationId: text('organizationId')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: text('role').notNull().default('member'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
}, (table) => ({
  organizationIdx: index('member_organization_id_idx').on(table.organizationId),
  userIdx: index('member_user_id_idx').on(table.userId),
  organizationUserUnique: uniqueIndex('member_organization_user_unique').on(table.organizationId, table.userId),
}))

export const invitations = pgTable('invitation', {
  id: text('id').primaryKey(),
  organizationId: text('organizationId')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  email: text('email').notNull(),
  role: text('role'),
  status: text('status').notNull().default('pending'),
  expiresAt: timestamp('expiresAt').notNull(),
  inviterId: text('inviterId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
}, (table) => ({
  organizationIdx: index('invitation_organization_id_idx').on(table.organizationId),
  emailIdx: index('invitation_email_idx').on(table.email),
}))

// --- App tables ------------------------------------------------------------

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  imageUrl: varchar('image_url', { length: 500 }),
  gsm: varchar('gsm', { length: 50 }),
  fabric: varchar('fabric', { length: 100 }),
  color: varchar('color', { length: 100 }),
  careInstructions: text('care_instructions'),
  inventoryCount: integer('inventory_count').default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const productVariants = pgTable('product_variants', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull(),
  size: varchar('size', { length: 20 }).notNull(),
  sku: varchar('sku', { length: 100 }).unique(),
  inventoryCount: integer('inventory_count').default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const drops = pgTable('drops', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  imageUrl: varchar('image_url', { length: 500 }),
  status: varchar('status', { length: 50 }).default('upcoming'),
  dropDate: timestamp('drop_date'),
  products: text('products'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: varchar('order_number', { length: 50 }).notNull().unique(),
  userId: text('user_id').notNull(),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD'),
  status: varchar('status', { length: 50 }).default('pending'),
  stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 255 }),
  shippingAddress: text('shipping_address'),
  billingAddress: text('billing_address'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  productId: integer('product_id').notNull(),
  variantId: integer('variant_id'),
  quantity: integer('quantity').notNull().default(1),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const waitlistLeads = pgTable('waitlist_leads', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  source: varchar('source', { length: 100 }),
  status: varchar('status', { length: 50 }).default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  status: varchar('status', { length: 50 }).default('subscribed'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const discountCodes = pgTable('discount_codes', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  discountPercent: integer('discount_percent'),
  discountAmount: numeric('discount_amount', { precision: 10, scale: 2 }),
  maxUses: integer('max_uses'),
  usesCount: integer('uses_count').default(0),
  expiresAt: timestamp('expires_at'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const agentLogs = pgTable('agent_logs', {
  id: serial('id').primaryKey(),
  agentName: varchar('agent_name', { length: 255 }).notNull(),
  action: varchar('action', { length: 255 }),
  input: text('input'),
  output: text('output'),
  status: varchar('status', { length: 50 }),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
