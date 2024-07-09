import * as _364 from "./abci/types";
import * as _365 from "./crypto/keys";
import * as _366 from "./crypto/proof";
import * as _367 from "./p2p/types";
import * as _368 from "./types/block";
import * as _369 from "./types/evidence";
import * as _370 from "./types/params";
import * as _371 from "./types/types";
import * as _372 from "./types/validator";
import * as _373 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._364
  };
  export const crypto = {
    ..._365,
    ..._366
  };
  export const p2p = {
    ..._367
  };
  export const types = {
    ..._368,
    ..._369,
    ..._370,
    ..._371,
    ..._372
  };
  export const version = {
    ..._373
  };
}