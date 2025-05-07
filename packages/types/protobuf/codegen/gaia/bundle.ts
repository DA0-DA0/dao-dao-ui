import * as _116 from "./globalfee/v1beta1/genesis";
import * as _117 from "./globalfee/v1beta1/query";
import * as _118 from "./globalfee/v1beta1/tx";
import * as _119 from "./metaprotocols/extensions";
import * as _505 from "./globalfee/v1beta1/tx.amino";
import * as _506 from "./globalfee/v1beta1/tx.registry";
import * as _507 from "./globalfee/v1beta1/query.rpc.Query";
import * as _508 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _732 from "./rpc.query";
import * as _733 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._116,
      ..._117,
      ..._118,
      ..._505,
      ..._506,
      ..._507,
      ..._508
    };
  }
  export const metaprotocols = {
    ..._119
  };
  export const ClientFactory = {
    ..._732,
    ..._733
  };
}