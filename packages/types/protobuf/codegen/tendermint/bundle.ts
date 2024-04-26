import * as _314 from "./abci/types";
import * as _315 from "./crypto/keys";
import * as _316 from "./crypto/proof";
import * as _317 from "./p2p/types";
import * as _318 from "./types/block";
import * as _319 from "./types/evidence";
import * as _320 from "./types/params";
import * as _321 from "./types/types";
import * as _322 from "./types/validator";
import * as _323 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._314
  };
  export const crypto = {
    ..._315,
    ..._316
  };
  export const p2p = {
    ..._317
  };
  export const types = {
    ..._318,
    ..._319,
    ..._320,
    ..._321,
    ..._322
  };
  export const version = {
    ..._323
  };
}