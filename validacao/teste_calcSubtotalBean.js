import { calcSubtotalBean } from "../matematica.js";
import check from "check-types";

check.assert.equal(0, calcSubtotalBean(1, undefined));
check.assert.equal(0, calcSubtotalBean(undefined, 1));
check.assert.equal(0, calcSubtotalBean(1, NaN));
check.assert.equal(0, calcSubtotalBean(NaN, 1));
check.assert.equal(1, calcSubtotalBean(1, 1));
check.assert.equal(3, calcSubtotalBean(1, 3));


