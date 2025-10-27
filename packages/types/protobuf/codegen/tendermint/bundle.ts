import * as _542 from "./abci/types";
import * as _543 from "./crypto/keys";
import * as _544 from "./crypto/proof";
import * as _545 from "./p2p/types";
import * as _546 from "./types/block";
import * as _547 from "./types/evidence";
import * as _548 from "./types/params";
import * as _549 from "./types/types";
import * as _550 from "./types/validator";
import * as _551 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._542
  };
  export const crypto = {
    ..._543,
    ..._544
  };
  export const p2p = {
    ..._545
  };
  export const types = {
    ..._546,
    ..._547,
    ..._548,
    ..._549,
    ..._550
  };
  export const version = {
    ..._551
  };
}