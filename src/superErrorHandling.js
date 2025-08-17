/*eslint no-unused-vars: 'off'*/
import createError from 'http-errors'

export default function superErrorHandling(error, req, res, next) {
  // error.stack
  res.status(500).send(createError(500,'superErrorHandling'))
}