import check from "check-types";
import validator from "validator";

export function validarAscii(entrada) {
  try {
    check.assert(validator.isAscii(entrada));
  } catch {
    throw new Error("não é Ascii");
  }
}
