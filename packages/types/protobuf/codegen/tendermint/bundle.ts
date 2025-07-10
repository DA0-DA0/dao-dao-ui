import * as _519 from "./abci/types";
import * as _520 from "./crypto/keys";
import * as _521 from "./crypto/proof";
import * as _522 from "./p2p/types";
import * as _523 from "./types/block";
import * as _524 from "./types/evidence";
import * as _525 from "./types/params";
import * as _526 from "./types/types";
import * as _527 from "./types/validator";
import * as _528 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._519
  };
  export const crypto = {
    ..._520,
    ..._521
  };
  export const p2p = {
    ..._522
  };
  export const types = {
    ..._523,
    ..._524,
    ..._525,
    ..._526,
    ..._527
  };
  export const version = {
    ..._528
  };
}