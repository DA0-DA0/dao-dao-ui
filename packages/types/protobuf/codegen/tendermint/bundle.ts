import * as _370 from "./abci/types";
import * as _371 from "./crypto/keys";
import * as _372 from "./crypto/proof";
import * as _373 from "./p2p/types";
import * as _374 from "./types/block";
import * as _375 from "./types/evidence";
import * as _376 from "./types/params";
import * as _377 from "./types/types";
import * as _378 from "./types/validator";
import * as _379 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._370
  };
  export const crypto = {
    ..._371,
    ..._372
  };
  export const p2p = {
    ..._373
  };
  export const types = {
    ..._374,
    ..._375,
    ..._376,
    ..._377,
    ..._378
  };
  export const version = {
    ..._379
  };
}