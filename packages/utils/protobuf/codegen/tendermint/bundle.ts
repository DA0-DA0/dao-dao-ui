import * as _185 from "./abci/types";
import * as _186 from "./crypto/keys";
import * as _187 from "./crypto/proof";
import * as _188 from "./p2p/types";
import * as _189 from "./types/block";
import * as _190 from "./types/evidence";
import * as _191 from "./types/params";
import * as _192 from "./types/types";
import * as _193 from "./types/validator";
import * as _194 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._185
  };
  export const crypto = {
    ..._186,
    ..._187
  };
  export const p2p = {
    ..._188
  };
  export const types = {
    ..._189,
    ..._190,
    ..._191,
    ..._192,
    ..._193
  };
  export const version = {
    ..._194
  };
}