import { calcMargemLucro } from "../matematica.js";
import check from "check-types";

check.assert.equal(0, calcMargemLucro(0, 0));
check.assert.equal(0, calcMargemLucro(10, 10));
check.assert.equal(0, calcMargemLucro(0, 10));
check.assert.equal(50, calcMargemLucro(10, 5));
check.assert.equal(100, calcMargemLucro(10, 0));

