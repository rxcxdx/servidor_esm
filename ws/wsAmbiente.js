import config from 'config'
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(timezone)

export default function (req, res) {
  const data = [
    process.env.NODE_ENV,
    config,
    dayjs.tz.guess()
  ]
  res.send(data)
}
