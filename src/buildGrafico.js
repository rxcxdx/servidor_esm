import { groupBy, forEach } from 'lodash-es'
import { reduzirVendas } from './matematica.js'

export default function buildGrafico(vendas) {
  const grupo = groupBy(vendas, 'dia')
  const resposta = []
  forEach(grupo, (vendasEspecifico, k) => {
    resposta.push({
      dia: k,
      quantVendas: vendasEspecifico.length,
      ...reduzirVendas(vendasEspecifico)
    })
  })
  resposta.sort((a, b) => a.dia.localeCompare(b.dia))
  return resposta
}
