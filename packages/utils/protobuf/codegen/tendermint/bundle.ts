import * as _193 from "./abci/types";
import * as _194 from "./crypto/keys";
import * as _195 from "./crypto/proof";
import * as _196 from "./p2p/types";
import * as _197 from "./types/block";
import * as _198 from "./types/evidence";
import * as _199 from "./types/params";
import * as _200 from "./types/types";
import * as _201 from "./types/validator";
import * as _202 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._193
  };
  export const crypto = {
    ..._194,
    ..._195
  };
  export const p2p = {
    ..._196
  };
  export const types = {
    ..._197,
    ..._198,
    ..._199,
    ..._200,
    ..._201
  };
  export const version = {
    ..._202
  };
}