import { sumBy } from 'lodash-es'

function linha(cart, descricao) {  
  return {
    descricao,
    quantidade: sumBy(cart, 'quantidade')
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
