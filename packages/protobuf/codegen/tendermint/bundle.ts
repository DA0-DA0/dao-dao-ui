import * as _176 from "./abci/types";
import * as _177 from "./crypto/keys";
import * as _178 from "./crypto/proof";
import * as _179 from "./p2p/types";
import * as _180 from "./types/block";
import * as _181 from "./types/evidence";
import * as _182 from "./types/params";
import * as _183 from "./types/types";
import * as _184 from "./types/validator";
import * as _185 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._176
  };
  export const crypto = {
    ..._177,
    ..._178
  };
  export const p2p = {
    ..._179
  };
  export const types = {
    ..._180,
    ..._181,
    ..._182,
    ..._183,
    ..._184
  };
  export const version = {
    ..._185
  };
}