import * as _339 from "./abci/types";
import * as _340 from "./crypto/keys";
import * as _341 from "./crypto/proof";
import * as _342 from "./p2p/types";
import * as _343 from "./types/block";
import * as _344 from "./types/evidence";
import * as _345 from "./types/params";
import * as _346 from "./types/types";
import * as _347 from "./types/validator";
import * as _348 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._339
  };
  export const crypto = {
    ..._340,
    ..._341
  };
  export const p2p = {
    ..._342
  };
  export const types = {
    ..._343,
    ..._344,
    ..._345,
    ..._346,
    ..._347
  };
  export const version = {
    ..._348
  };
}