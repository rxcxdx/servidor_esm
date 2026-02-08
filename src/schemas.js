import * as z from 'zod'
import { nanoid } from 'nanoid'

const schemaItem = z.object({
  identifier: z.nanoid(),
  descricao: z.string(),
  quantidade: z.int().positive(),
  valor: z.number().positive(),
  obs: z.string().trim().optional()
})

export const schemaVenda = z.object({
  _id: z.nanoid().default(() => nanoid()),
  dt: z.date().default(() => new Date()),
  username: z.string(),
  cart: z.array(schemaItem).min(1),
  obs: z.string().trim().optional()
})