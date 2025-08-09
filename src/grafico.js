import { groupBy, forEach, sumBy } from 'lodash-es'

function linha(vendas, dia) {
  return {
    dia: dia,
    vendas: vendas.length,
    total: sumBy(vendas, 'total')
  }
}

export default function grafico(docs) {
  const grupo = groupBy(docs, 'dia')
  const resposta = []
  forEach(grupo, (a, b) => {
    resposta.push(linha(a, b))
  })
  resposta.sort((a, b) => a.dia.localeCompare(b.dia))
  return resposta
}
