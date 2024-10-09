import * as _381 from "./abci/types";
import * as _382 from "./crypto/keys";
import * as _383 from "./crypto/proof";
import * as _384 from "./p2p/types";
import * as _385 from "./types/block";
import * as _386 from "./types/evidence";
import * as _387 from "./types/params";
import * as _388 from "./types/types";
import * as _389 from "./types/validator";
import * as _390 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._381
  };
  export const crypto = {
    ..._382,
    ..._383
  };
  export const p2p = {
    ..._384
  };
  export const types = {
    ..._385,
    ..._386,
    ..._387,
    ..._388,
    ..._389
  };
  export const version = {
    ..._390
  };
}