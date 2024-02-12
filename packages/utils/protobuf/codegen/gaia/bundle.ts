import * as _81 from "./globalfee/v1beta1/genesis";
import * as _82 from "./globalfee/v1beta1/query";
import * as _83 from "./globalfee/v1beta1/tx";
import * as _339 from "./globalfee/v1beta1/tx.amino";
import * as _340 from "./globalfee/v1beta1/tx.registry";
import * as _341 from "./globalfee/v1beta1/query.rpc.Query";
import * as _342 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _481 from "./rpc.query";
import * as _482 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._81,
      ..._82,
      ..._83,
      ..._339,
      ..._340,
      ..._341,
      ..._342
    };
  }
  export const ClientFactory = {
    ..._481,
    ..._482
  };
}