import * as _409 from "./abci/types";
import * as _410 from "./crypto/keys";
import * as _411 from "./crypto/proof";
import * as _412 from "./p2p/types";
import * as _413 from "./types/block";
import * as _414 from "./types/evidence";
import * as _415 from "./types/params";
import * as _416 from "./types/types";
import * as _417 from "./types/validator";
import * as _418 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._409
  };
  export const crypto = {
    ..._410,
    ..._411
  };
  export const p2p = {
    ..._412
  };
  export const types = {
    ..._413,
    ..._414,
    ..._415,
    ..._416,
    ..._417
  };
  export const version = {
    ..._418
  };
}