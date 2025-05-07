import * as _420 from "./abci/types";
import * as _421 from "./crypto/keys";
import * as _422 from "./crypto/proof";
import * as _423 from "./p2p/types";
import * as _424 from "./types/block";
import * as _425 from "./types/evidence";
import * as _426 from "./types/params";
import * as _427 from "./types/types";
import * as _428 from "./types/validator";
import * as _429 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._420
  };
  export const crypto = {
    ..._421,
    ..._422
  };
  export const p2p = {
    ..._423
  };
  export const types = {
    ..._424,
    ..._425,
    ..._426,
    ..._427,
    ..._428
  };
  export const version = {
    ..._429
  };
}