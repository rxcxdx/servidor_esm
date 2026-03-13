import * as z from 'zod'
import { nanoid } from 'nanoid'

const schemaItem = z.object({
  identifier: z.nanoid(),
  valor: z.number().positive(),
  quantidade: z.int().positive(),
  descricao: z.string().toLowerCase(),
  obs: z.string().trim().toLowerCase()
})

export const schemaVenda = z.object({
  username: z.string(),
  cart: z.array(schemaItem).min(1),
  obs: z.string().trim().toLowerCase()
})

export const schemaProdutoUpsert = z.object({
  id: z.nanoid().default(() => nanoid()),
  descricao: z.string().min(1),
  valor: z.number().positive()
})

export const schemaMargemLucro = z.object({
  alpha: z.number().positive(),
  beta: z.number().min(0)
})

export const schemaIndice = z.object({
  gte: z.iso.datetime().pipe(z.coerce.date()),
  lte: z.iso.datetime().pipe(z.coerce.date())
})

export const schemaRelatorio = z.object({
  gte: z.iso.datetime().pipe(z.coerce.date()),
  lte: z.iso.datetime().pipe(z.coerce.date())
})

export const schemaEditarDt = z.object({
  _id: z.nanoid(),
  dt: z.coerce.date()
})
