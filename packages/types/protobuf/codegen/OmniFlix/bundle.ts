import * as _251 from "./onft/v1beta1/genesis";
import * as _252 from "./onft/v1beta1/onft";
import * as _253 from "./onft/v1beta1/params";
import * as _254 from "./onft/v1beta1/query";
import * as _255 from "./onft/v1beta1/tx";
import * as _703 from "./onft/v1beta1/tx.amino";
import * as _704 from "./onft/v1beta1/tx.registry";
import * as _705 from "./onft/v1beta1/query.rpc.Query";
import * as _706 from "./onft/v1beta1/tx.rpc.msg";
import * as _908 from "./rpc.query";
import * as _909 from "./rpc.tx";
export namespace OmniFlix {
  export namespace onft {
    export const v1beta1 = {
      ..._251,
      ..._252,
      ..._253,
      ..._254,
      ..._255,
      ..._703,
      ..._704,
      ..._705,
      ..._706
    };
  }
  export const ClientFactory = {
    ..._908,
    ..._909
  };
}