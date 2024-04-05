import * as _294 from "./abci/types";
import * as _295 from "./crypto/keys";
import * as _296 from "./crypto/proof";
import * as _297 from "./p2p/types";
import * as _298 from "./types/block";
import * as _299 from "./types/evidence";
import * as _300 from "./types/params";
import * as _301 from "./types/types";
import * as _302 from "./types/validator";
import * as _303 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._294
  };
  export const crypto = {
    ..._295,
    ..._296
  };
  export const p2p = {
    ..._297
  };
  export const types = {
    ..._298,
    ..._299,
    ..._300,
    ..._301,
    ..._302
  };
  export const version = {
    ..._303
  };
}