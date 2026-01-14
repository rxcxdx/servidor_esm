import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid'

const schemaItem = z.object({
  identifier: z.string(),
  descricao: z.string(),
  quantidade: z.int().positive(),
  valor: z.number().positive(),
  obs: z.string().trim().optional()
})

export const schemaVenda = z.object({
  _id: z.string().default(() => uuidv4()),
  dt: z.date().default(() => new Date()),
  username: z.string(),
  cart: z.array(schemaItem).min(1),
  obs: z.string().trim().optional()
})