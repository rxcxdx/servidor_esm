import { createLogger, transports, format } from "winston";

/*
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};
*/

export default createLogger({
  level: "info",
  format: format.combine(format.simple(), format.colorize({ all: true })),
  transports: new transports.Console(),
});
