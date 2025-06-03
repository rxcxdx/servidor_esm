/*eslint no-unused-vars: 'off'*/
import check from "check-types";

function buildMessage(err) {
  try {
    const v = err.message;
    check.assert.nonEmptyString(v);
    return v;
  } catch {
    return null;
  }
}

function buildName(err) {
  try {
    const v = err.name;
    check.assert.nonEmptyString(v);
    return v;
  } catch {
    return null;
  }
}

export default function superErrorHandling(err, req, res, next) {
  const o = {
    message: buildMessage(err),
    name: buildName(err),
  };
  res.status(500).send(o);
}
