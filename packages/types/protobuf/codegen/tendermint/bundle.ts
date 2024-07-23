import * as _377 from "./abci/types";
import * as _378 from "./crypto/keys";
import * as _379 from "./crypto/proof";
import * as _380 from "./p2p/types";
import * as _381 from "./types/block";
import * as _382 from "./types/evidence";
import * as _383 from "./types/params";
import * as _384 from "./types/types";
import * as _385 from "./types/validator";
import * as _386 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._377
  };
  export const crypto = {
    ..._378,
    ..._379
  };
  export const p2p = {
    ..._380
  };
  export const types = {
    ..._381,
    ..._382,
    ..._383,
    ..._384,
    ..._385
  };
  export const version = {
    ..._386
  };
}