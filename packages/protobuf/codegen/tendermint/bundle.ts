import * as _157 from "./abci/types";
import * as _158 from "./crypto/keys";
import * as _159 from "./crypto/proof";
import * as _160 from "./p2p/types";
import * as _161 from "./types/block";
import * as _162 from "./types/evidence";
import * as _163 from "./types/params";
import * as _164 from "./types/types";
import * as _165 from "./types/validator";
import * as _166 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._157
  };
  export const crypto = {
    ..._158,
    ..._159
  };
  export const p2p = {
    ..._160
  };
  export const types = {
    ..._161,
    ..._162,
    ..._163,
    ..._164,
    ..._165
  };
  export const version = {
    ..._166
  };
}