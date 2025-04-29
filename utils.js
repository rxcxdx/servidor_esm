import check from "check-types";
import dayjs from "dayjs";

export function assertDayjs(entrada) {
  check.assert(dayjs.isDayjs(entrada), "não é dayjs");
  check.assert(entrada.isValid(), "não é data válida");
}
