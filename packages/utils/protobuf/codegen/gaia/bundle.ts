import * as _82 from "./globalfee/v1beta1/genesis";
import * as _83 from "./globalfee/v1beta1/query";
import * as _84 from "./globalfee/v1beta1/tx";
import * as _340 from "./globalfee/v1beta1/tx.amino";
import * as _341 from "./globalfee/v1beta1/tx.registry";
import * as _342 from "./globalfee/v1beta1/query.rpc.Query";
import * as _343 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _482 from "./rpc.query";
import * as _483 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._82,
      ..._83,
      ..._84,
      ..._340,
      ..._341,
      ..._342,
      ..._343
    };
  }
  export const ClientFactory = {
    ..._482,
    ..._483
  };
}