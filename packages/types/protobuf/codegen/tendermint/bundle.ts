import * as _355 from "./abci/types";
import * as _356 from "./crypto/keys";
import * as _357 from "./crypto/proof";
import * as _358 from "./p2p/types";
import * as _359 from "./types/block";
import * as _360 from "./types/evidence";
import * as _361 from "./types/params";
import * as _362 from "./types/types";
import * as _363 from "./types/validator";
import * as _364 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._355
  };
  export const crypto = {
    ..._356,
    ..._357
  };
  export const p2p = {
    ..._358
  };
  export const types = {
    ..._359,
    ..._360,
    ..._361,
    ..._362,
    ..._363
  };
  export const version = {
    ..._364
  };
}