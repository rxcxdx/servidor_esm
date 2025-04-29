import config from 'config'
import util from 'util'
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone.js"

dayjs.extend(timezone)

console.log(util.inspect({ ...config}, { depth: 2 }));
console.log('------------')
console.log('Guessing user zone:', dayjs.tz.guess())

