/*eslint no-unused-vars: 'off'*/

export default function superErrorHandling(error, req, res, next) {
  // error.stack
  res.status(500).send('superErrorHandling')
}