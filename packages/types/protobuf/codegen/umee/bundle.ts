import * as _529 from "./leverage/v1/events";
import * as _530 from "./leverage/v1/genesis";
import * as _531 from "./leverage/v1/leverage";
import * as _532 from "./leverage/v1/query";
import * as _533 from "./leverage/v1/tx";
import * as _865 from "./leverage/v1/tx.amino";
import * as _866 from "./leverage/v1/tx.registry";
import * as _867 from "./leverage/v1/query.rpc.Query";
import * as _868 from "./leverage/v1/tx.rpc.msg";
import * as _914 from "./rpc.query";
import * as _915 from "./rpc.tx";
export namespace umee {
  export namespace leverage {
    export const v1 = {
      ..._529,
      ..._530,
      ..._531,
      ..._532,
      ..._533,
      ..._865,
      ..._866,
      ..._867,
      ..._868
    };
  }
  export const ClientFactory = {
    ..._914,
    ..._915
  };
}