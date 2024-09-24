import * as _380 from "./abci/types";
import * as _381 from "./crypto/keys";
import * as _382 from "./crypto/proof";
import * as _383 from "./p2p/types";
import * as _384 from "./types/block";
import * as _385 from "./types/evidence";
import * as _386 from "./types/params";
import * as _387 from "./types/types";
import * as _388 from "./types/validator";
import * as _389 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._380
  };
  export const crypto = {
    ..._381,
    ..._382
  };
  export const p2p = {
    ..._383
  };
  export const types = {
    ..._384,
    ..._385,
    ..._386,
    ..._387,
    ..._388
  };
  export const version = {
    ..._389
  };
}