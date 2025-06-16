import * as _508 from "./abci/types";
import * as _509 from "./crypto/keys";
import * as _510 from "./crypto/proof";
import * as _511 from "./p2p/types";
import * as _512 from "./types/block";
import * as _513 from "./types/evidence";
import * as _514 from "./types/params";
import * as _515 from "./types/types";
import * as _516 from "./types/validator";
import * as _517 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._508
  };
  export const crypto = {
    ..._509,
    ..._510
  };
  export const p2p = {
    ..._511
  };
  export const types = {
    ..._512,
    ..._513,
    ..._514,
    ..._515,
    ..._516
  };
  export const version = {
    ..._517
  };
}