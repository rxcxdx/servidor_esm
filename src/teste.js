import { produto } from "./eagle2.js";
import kindOf from 'kind-of'

const o = await produto('a')
console.log(kindOf(o))