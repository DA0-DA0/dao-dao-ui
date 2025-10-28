import * as _552 from "./leverage/v1/events";
import * as _553 from "./leverage/v1/genesis";
import * as _554 from "./leverage/v1/leverage";
import * as _555 from "./leverage/v1/query";
import * as _556 from "./leverage/v1/tx";
import * as _896 from "./leverage/v1/tx.amino";
import * as _897 from "./leverage/v1/tx.registry";
import * as _898 from "./leverage/v1/query.rpc.Query";
import * as _899 from "./leverage/v1/tx.rpc.msg";
import * as _947 from "./rpc.query";
import * as _948 from "./rpc.tx";
export namespace umee {
  export namespace leverage {
    export const v1 = {
      ..._552,
      ..._553,
      ..._554,
      ..._555,
      ..._556,
      ..._896,
      ..._897,
      ..._898,
      ..._899
    };
  }
  export const ClientFactory = {
    ..._947,
    ..._948
  };
}