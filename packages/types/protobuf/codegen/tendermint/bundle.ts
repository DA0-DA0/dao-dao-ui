import * as _344 from "./abci/types";
import * as _345 from "./crypto/keys";
import * as _346 from "./crypto/proof";
import * as _347 from "./p2p/types";
import * as _348 from "./types/block";
import * as _349 from "./types/evidence";
import * as _350 from "./types/params";
import * as _351 from "./types/types";
import * as _352 from "./types/validator";
import * as _353 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._344
  };
  export const crypto = {
    ..._345,
    ..._346
  };
  export const p2p = {
    ..._347
  };
  export const types = {
    ..._348,
    ..._349,
    ..._350,
    ..._351,
    ..._352
  };
  export const version = {
    ..._353
  };
}