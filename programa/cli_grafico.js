import grafico from "../src/grafico.js";

try {
  const o = await grafico("2025-05");
  console.log(o);
} catch (err) {
  console.log(err.message);
} finally {
  process.exit(1);
}
