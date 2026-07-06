import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  price: z.number().positive(),
  sizes: z.array(z.string()),
  color: z.string(),
  stock: z.number().int().nonnegative(),
  badge: z.string().optional(),
});

export const WaitlistSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
  channel: z.enum(['email', 'whatsapp']).default('email'),
  source: z.string().default('landing-page'),
});

export const VideoGenerateSchema = z.object({
  productId: z.string().optional(),
  format: z.string().default('Mystery Drop'),
  goal: z.string().default('waitlist_signup'),
});

export const CheckoutItemSchema = z.object({
  productId: z.string(),
  size: z.string(),
  quantity: z.number().int().positive(),
});

export const CheckoutSchema = z.object({
  email: z.string().email(),
  items: z.array(CheckoutItemSchema).min(1),
  shipping: z
    .object({
      name: z.string().min(1),
      address: z.string().min(1),
      city: z.string().min(1),
      country: z.string().min(1),
      zip: z.string().min(1),
    })
    .optional(),
});

export const LeadSchema = z.object({
  email: z.string().email(),
  channel: z.enum(['email', 'whatsapp']).default('email'),
  source: z.string().default('landing-page'),
});

export type Product = z.infer<typeof ProductSchema>;
export type WaitlistInput = z.infer<typeof WaitlistSchema>;
export type CheckoutInput = z.infer<typeof CheckoutSchema>;
export type LeadInput = z.infer<typeof LeadSchema>;
