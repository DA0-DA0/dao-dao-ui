import * as _413 from "./abci/types";
import * as _414 from "./crypto/keys";
import * as _415 from "./crypto/proof";
import * as _416 from "./p2p/types";
import * as _417 from "./types/block";
import * as _418 from "./types/evidence";
import * as _419 from "./types/params";
import * as _420 from "./types/types";
import * as _421 from "./types/validator";
import * as _422 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._413
  };
  export const crypto = {
    ..._414,
    ..._415
  };
  export const p2p = {
    ..._416
  };
  export const types = {
    ..._417,
    ..._418,
    ..._419,
    ..._420,
    ..._421
  };
  export const version = {
    ..._422
  };
}