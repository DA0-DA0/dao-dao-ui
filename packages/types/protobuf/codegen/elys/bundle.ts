import * as _105 from "./stablestake/debt";
import * as _106 from "./stablestake/genesis";
import * as _107 from "./stablestake/params";
import * as _108 from "./stablestake/pool";
import * as _109 from "./stablestake/query";
import * as _110 from "./stablestake/tx";
import * as _111 from "./stablestake/types";
import * as _585 from "./stablestake/tx.amino";
import * as _586 from "./stablestake/tx.registry";
import * as _587 from "./stablestake/query.rpc.Query";
import * as _588 from "./stablestake/tx.rpc.msg";
import * as _855 from "./rpc.query";
import * as _856 from "./rpc.tx";
export namespace elys {
  export const stablestake = {
    ..._105,
    ..._106,
    ..._107,
    ..._108,
    ..._109,
    ..._110,
    ..._111,
    ..._585,
    ..._586,
    ..._587,
    ..._588
  };
  export const ClientFactory = {
    ..._855,
    ..._856
  };
}