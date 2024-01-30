import * as _236 from "./abci/types";
import * as _237 from "./crypto/keys";
import * as _238 from "./crypto/proof";
import * as _239 from "./p2p/types";
import * as _240 from "./types/block";
import * as _241 from "./types/evidence";
import * as _242 from "./types/params";
import * as _243 from "./types/types";
import * as _244 from "./types/validator";
import * as _245 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._236
  };
  export const crypto = {
    ..._237,
    ..._238
  };
  export const p2p = {
    ..._239
  };
  export const types = {
    ..._240,
    ..._241,
    ..._242,
    ..._243,
    ..._244
  };
  export const version = {
    ..._245
  };
}