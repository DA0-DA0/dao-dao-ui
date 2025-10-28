import * as _251 from "./onft/v1beta1/genesis";
import * as _252 from "./onft/v1beta1/onft";
import * as _253 from "./onft/v1beta1/params";
import * as _254 from "./onft/v1beta1/query";
import * as _255 from "./onft/v1beta1/tx";
import * as _717 from "./onft/v1beta1/tx.amino";
import * as _718 from "./onft/v1beta1/tx.registry";
import * as _719 from "./onft/v1beta1/query.rpc.Query";
import * as _720 from "./onft/v1beta1/tx.rpc.msg";
import * as _926 from "./rpc.query";
import * as _927 from "./rpc.tx";
export namespace OmniFlix {
  export namespace onft {
    export const v1beta1 = {
      ..._251,
      ..._252,
      ..._253,
      ..._254,
      ..._255,
      ..._717,
      ..._718,
      ..._719,
      ..._720
    };
  }
  export const ClientFactory = {
    ..._926,
    ..._927
  };
}