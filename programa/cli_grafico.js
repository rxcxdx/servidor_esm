import grafico from '../src/grafico.js'

try {
  const arr = await grafico('2025-06')
  console.log(arr)
} catch (err) {
  console.log(err.toString())
} finally {
  process.exit(1)
}
