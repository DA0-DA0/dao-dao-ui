import * as _242 from "./onft/v1beta1/genesis";
import * as _243 from "./onft/v1beta1/onft";
import * as _244 from "./onft/v1beta1/params";
import * as _245 from "./onft/v1beta1/query";
import * as _246 from "./onft/v1beta1/tx";
import * as _685 from "./onft/v1beta1/tx.amino";
import * as _686 from "./onft/v1beta1/tx.registry";
import * as _687 from "./onft/v1beta1/query.rpc.Query";
import * as _688 from "./onft/v1beta1/tx.rpc.msg";
import * as _886 from "./rpc.query";
import * as _887 from "./rpc.tx";
export namespace OmniFlix {
  export namespace onft {
    export const v1beta1 = {
      ..._242,
      ..._243,
      ..._244,
      ..._245,
      ..._246,
      ..._685,
      ..._686,
      ..._687,
      ..._688
    };
  }
  export const ClientFactory = {
    ..._886,
    ..._887
  };
}