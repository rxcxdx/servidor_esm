import buy from '../src/buy.js'

try {
  const entrada = {
    username: 'bruce',
    cart: [
      { descricao: 'agua', quantidade: 1, valor: 1 },
      { descricao: 'fanta', quantidade: 1, valor: 1 }
    ]
  }
  const v = await buy(entrada)
  console.log(v)
} catch (err) {
  console.log('ERRO FATAL')
  console.log(err.message)
} finally {
  process.exit()
}
