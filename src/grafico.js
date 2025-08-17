function linha(vendas, dia) {
  return {
    dia,
    vendas: vendas.length
  }
}

export default function grafico(docs) {
  const mapa = Map.groupBy(docs, (o) => o.dia)
  const resposta = []
  mapa.forEach((a, b) => {
    resposta.push(linha(a, b))
  })
  resposta.sort((a, b) => a.dia.localeCompare(b.dia))
  return resposta
}
