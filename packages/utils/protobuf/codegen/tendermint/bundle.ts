import * as _196 from "./abci/types";
import * as _197 from "./crypto/keys";
import * as _198 from "./crypto/proof";
import * as _199 from "./p2p/types";
import * as _200 from "./types/block";
import * as _201 from "./types/evidence";
import * as _202 from "./types/params";
import * as _203 from "./types/types";
import * as _204 from "./types/validator";
import * as _205 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._196
  };
  export const crypto = {
    ..._197,
    ..._198
  };
  export const p2p = {
    ..._199
  };
  export const types = {
    ..._200,
    ..._201,
    ..._202,
    ..._203,
    ..._204
  };
  export const version = {
    ..._205
  };
}