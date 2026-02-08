import { every } from 'lodash-es'
import BigNumber from 'bignumber.js'

// Number.isFinite(o.valor)
// Number.isInteger(o.quantidade)

export default function vigilancia(lista) {
  const resposta = every(lista, (o) => {
    return new BigNumber(o.valor).decimalPlaces() <= 2 ? true : false 
  })  
  return resposta
}