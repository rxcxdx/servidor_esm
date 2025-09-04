import { sumBy } from "lodash-es";

export default function calcularTotal(cart) {
  return sumBy(cart, (o) => o.quantidade * o.valor)
}
