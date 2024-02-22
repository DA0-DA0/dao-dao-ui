import * as _275 from "./abci/types";
import * as _276 from "./crypto/keys";
import * as _277 from "./crypto/proof";
import * as _278 from "./p2p/types";
import * as _279 from "./types/block";
import * as _280 from "./types/evidence";
import * as _281 from "./types/params";
import * as _282 from "./types/types";
import * as _283 from "./types/validator";
import * as _284 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._275
  };
  export const crypto = {
    ..._276,
    ..._277
  };
  export const p2p = {
    ..._278
  };
  export const types = {
    ..._279,
    ..._280,
    ..._281,
    ..._282,
    ..._283
  };
  export const version = {
    ..._284
  };
}