import { createHashHistory } from "history";
import qhistory from "qhistory";

import { parse, stringify } from "qs";

export const history = qhistory(createHashHistory(), stringify, parse);
