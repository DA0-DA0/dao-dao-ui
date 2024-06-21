import * as _345 from "./abci/types";
import * as _346 from "./crypto/keys";
import * as _347 from "./crypto/proof";
import * as _348 from "./p2p/types";
import * as _349 from "./types/block";
import * as _350 from "./types/evidence";
import * as _351 from "./types/params";
import * as _352 from "./types/types";
import * as _353 from "./types/validator";
import * as _354 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._345
  };
  export const crypto = {
    ..._346,
    ..._347
  };
  export const p2p = {
    ..._348
  };
  export const types = {
    ..._349,
    ..._350,
    ..._351,
    ..._352,
    ..._353
  };
  export const version = {
    ..._354
  };
}