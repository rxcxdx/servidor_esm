function linha(cart, descricao) {
  return {
    descricao,
    quantidade: cart.reduce((acc,o) => acc + o.quantidade, 0)
  }
}

export default function itens(cart) {
  const mapa = Map.groupBy(cart, (o) => o.descricao)
  const resposta = []
  mapa.forEach((a, b) => {
    resposta.push(linha(a, b))
  })
  resposta.sort((a, b) => a.quantidade - b.quantidade).reverse()
  return resposta
}


