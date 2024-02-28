import * as _291 from "./abci/types";
import * as _292 from "./crypto/keys";
import * as _293 from "./crypto/proof";
import * as _294 from "./p2p/types";
import * as _295 from "./types/block";
import * as _296 from "./types/evidence";
import * as _297 from "./types/params";
import * as _298 from "./types/types";
import * as _299 from "./types/validator";
import * as _300 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._291
  };
  export const crypto = {
    ..._292,
    ..._293
  };
  export const p2p = {
    ..._294
  };
  export const types = {
    ..._295,
    ..._296,
    ..._297,
    ..._298,
    ..._299
  };
  export const version = {
    ..._300
  };
}