import * as _359 from "./abci/types";
import * as _360 from "./crypto/keys";
import * as _361 from "./crypto/proof";
import * as _362 from "./p2p/types";
import * as _363 from "./types/block";
import * as _364 from "./types/evidence";
import * as _365 from "./types/params";
import * as _366 from "./types/types";
import * as _367 from "./types/validator";
import * as _368 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._359
  };
  export const crypto = {
    ..._360,
    ..._361
  };
  export const p2p = {
    ..._362
  };
  export const types = {
    ..._363,
    ..._364,
    ..._365,
    ..._366,
    ..._367
  };
  export const version = {
    ..._368
  };
}