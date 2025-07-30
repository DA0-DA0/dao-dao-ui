import * as _242 from "./onft/v1beta1/genesis";
import * as _243 from "./onft/v1beta1/onft";
import * as _244 from "./onft/v1beta1/params";
import * as _245 from "./onft/v1beta1/query";
import * as _246 from "./onft/v1beta1/tx";
import * as _690 from "./onft/v1beta1/tx.amino";
import * as _691 from "./onft/v1beta1/tx.registry";
import * as _692 from "./onft/v1beta1/query.rpc.Query";
import * as _693 from "./onft/v1beta1/tx.rpc.msg";
import * as _895 from "./rpc.query";
import * as _896 from "./rpc.tx";
export namespace OmniFlix {
  export namespace onft {
    export const v1beta1 = {
      ..._242,
      ..._243,
      ..._244,
      ..._245,
      ..._246,
      ..._690,
      ..._691,
      ..._692,
      ..._693
    };
  }
  export const ClientFactory = {
    ..._895,
    ..._896
  };
}