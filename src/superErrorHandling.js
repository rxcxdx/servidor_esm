import check from "check-types";
import { nanoid } from "nanoid";

/*eslint no-unused-vars: 'off'*/
export default function superErrorHandling(err, req, res, next) {
  const PROBLEMA = check.nonEmptyString(err.message) ? err.message : nanoid();

  const dto = {
    problema: PROBLEMA,
  };

  res.status(500).send(dto);
}
