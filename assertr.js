import check from "check-types";
import validator from "validator";

export function validarAscii(entrada) {
  try {
    check.assert(validator.isAscii(entrada));
  } catch {
    throw new Error("não é Ascii");
  }
}

const regexYearMonth = new RegExp("^[0-9]{4}-[0-9]{2}$");

export function validarYearMonth(entrada) {
  try {
    check.assert(regexYearMonth.test(entrada));
  } catch {
    throw new Error("não é YearMonth");
  }
}
