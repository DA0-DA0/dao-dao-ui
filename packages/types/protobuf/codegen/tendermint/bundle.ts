import * as _310 from "./abci/types";
import * as _311 from "./crypto/keys";
import * as _312 from "./crypto/proof";
import * as _313 from "./p2p/types";
import * as _314 from "./types/block";
import * as _315 from "./types/evidence";
import * as _316 from "./types/params";
import * as _317 from "./types/types";
import * as _318 from "./types/validator";
import * as _319 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._310
  };
  export const crypto = {
    ..._311,
    ..._312
  };
  export const p2p = {
    ..._313
  };
  export const types = {
    ..._314,
    ..._315,
    ..._316,
    ..._317,
    ..._318
  };
  export const version = {
    ..._319
  };
}