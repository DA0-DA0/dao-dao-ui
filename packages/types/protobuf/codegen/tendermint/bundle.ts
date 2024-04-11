import * as _296 from "./abci/types";
import * as _297 from "./crypto/keys";
import * as _298 from "./crypto/proof";
import * as _299 from "./p2p/types";
import * as _300 from "./types/block";
import * as _301 from "./types/evidence";
import * as _302 from "./types/params";
import * as _303 from "./types/types";
import * as _304 from "./types/validator";
import * as _305 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._296
  };
  export const crypto = {
    ..._297,
    ..._298
  };
  export const p2p = {
    ..._299
  };
  export const types = {
    ..._300,
    ..._301,
    ..._302,
    ..._303,
    ..._304
  };
  export const version = {
    ..._305
  };
}