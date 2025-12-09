import { gravarVenda } from './flanker.js'

// O SERVIDOR NAO PRECISA ESTAR ON

const body = {
  cart: [
    {
      valor: 1,
      descricao: 'fanta',
      quantidade: 1
    }
  ],
  username: 'bruce'
}

try {
  const o = await gravarVenda(body)
  console.log(o)
} catch (e) {
  console.log(e.message)
} finally {
  process.exit(1)
}
