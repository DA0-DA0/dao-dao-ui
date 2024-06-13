import * as _341 from "./abci/types";
import * as _342 from "./crypto/keys";
import * as _343 from "./crypto/proof";
import * as _344 from "./p2p/types";
import * as _345 from "./types/block";
import * as _346 from "./types/evidence";
import * as _347 from "./types/params";
import * as _348 from "./types/types";
import * as _349 from "./types/validator";
import * as _350 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._341
  };
  export const crypto = {
    ..._342,
    ..._343
  };
  export const p2p = {
    ..._344
  };
  export const types = {
    ..._345,
    ..._346,
    ..._347,
    ..._348,
    ..._349
  };
  export const version = {
    ..._350
  };
}