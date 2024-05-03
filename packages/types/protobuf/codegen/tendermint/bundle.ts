import * as _338 from "./abci/types";
import * as _339 from "./crypto/keys";
import * as _340 from "./crypto/proof";
import * as _341 from "./p2p/types";
import * as _342 from "./types/block";
import * as _343 from "./types/evidence";
import * as _344 from "./types/params";
import * as _345 from "./types/types";
import * as _346 from "./types/validator";
import * as _347 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._338
  };
  export const crypto = {
    ..._339,
    ..._340
  };
  export const p2p = {
    ..._341
  };
  export const types = {
    ..._342,
    ..._343,
    ..._344,
    ..._345,
    ..._346
  };
  export const version = {
    ..._347
  };
}