/*eslint no-unused-vars: 'off'*/

export default function errorHandling(error, req, res, next) {
  // error.stack
  // error.name
  // error.message
  res.status(500).send({ message: 'errorHandling'})
}
