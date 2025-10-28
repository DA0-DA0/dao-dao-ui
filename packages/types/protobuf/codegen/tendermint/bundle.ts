import * as _528 from "./abci/types";
import * as _529 from "./crypto/keys";
import * as _530 from "./crypto/proof";
import * as _531 from "./p2p/types";
import * as _532 from "./types/block";
import * as _533 from "./types/evidence";
import * as _534 from "./types/params";
import * as _535 from "./types/types";
import * as _536 from "./types/validator";
import * as _537 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._528
  };
  export const crypto = {
    ..._529,
    ..._530
  };
  export const p2p = {
    ..._531
  };
  export const types = {
    ..._532,
    ..._533,
    ..._534,
    ..._535,
    ..._536
  };
  export const version = {
    ..._537
  };
}