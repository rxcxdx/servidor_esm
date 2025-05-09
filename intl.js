import { createIntlCache, createIntl } from "@formatjs/intl";
const cache = createIntlCache();
export default createIntl({ locale: "pt-BR" }, cache);