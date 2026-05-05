import { z } from 'zod';

export const quoteSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number.')
    .max(40, 'That phone number looks too long.'),
  email: z.string().trim().email('Please enter a valid email address.').max(200),
  address: z.string().trim().max(240).optional().or(z.literal('')),
  request: z.string().trim().max(2000).optional().or(z.literal('')),
  hp_url: z.string().max(0).optional().or(z.literal('')),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
