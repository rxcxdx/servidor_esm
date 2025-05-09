import check from "check-types";
import intl from "./intl.js";

export default function lerDate(entrada) {
  try {
    check.assert.date(entrada);
    const a = intl.formatDate(entrada);
    const b = intl.formatTime(entrada, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    console.log(a, b);
  } catch {
    console.log("erro lerDate");
  }
}
