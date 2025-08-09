import { groupBy, forEach, sumBy } from 'lodash-es'


function linha(cart, descricao) {
  return {
    descricao: descricao,
    quantidade: sumBy(cart, 'quantidade'),
  }
}

export default function itens(cart) {
  const grupo = groupBy(cart, 'descricao')
  const resposta = []
  forEach(grupo, (a, b) => {
    resposta.push(linha(a, b))
  })
  resposta.sort((a, b) => a.quantidade - b.quantidade).reverse()
  return resposta
}


