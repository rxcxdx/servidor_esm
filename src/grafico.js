function linha(vendas, dia) {
  return {
    dia,
    vendas: vendas.length
  }
}

export default function grafico(registros) {
  const mapa = Map.groupBy(registros, (o) => o.dia)
  const lista = []
  mapa.forEach((a, b) => {
    lista.push(linha(a, b))
  })
  lista.sort((a, b) => a.dia.localeCompare(b.dia))
  return lista
}
