import buy from '../src/buy.js'
import mockRegistro from './mockRegistro.js'

try {
  const o = mockRegistro()
  o.obs = 'cli_buy'
  const v = await buy(o)
  console.log(v)
} catch (err) {
  console.log('ERRO FATAL')
  console.log(err.message)
} finally {
  process.exit()
}