import * as _274 from "./abci/types";
import * as _275 from "./crypto/keys";
import * as _276 from "./crypto/proof";
import * as _277 from "./p2p/types";
import * as _278 from "./types/block";
import * as _279 from "./types/evidence";
import * as _280 from "./types/params";
import * as _281 from "./types/types";
import * as _282 from "./types/validator";
import * as _283 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._274
  };
  export const crypto = {
    ..._275,
    ..._276
  };
  export const p2p = {
    ..._277
  };
  export const types = {
    ..._278,
    ..._279,
    ..._280,
    ..._281,
    ..._282
  };
  export const version = {
    ..._283
  };
}