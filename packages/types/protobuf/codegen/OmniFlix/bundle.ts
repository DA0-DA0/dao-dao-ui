import * as _224 from "./onft/v1beta1/genesis";
import * as _225 from "./onft/v1beta1/onft";
import * as _226 from "./onft/v1beta1/params";
import * as _227 from "./onft/v1beta1/query";
import * as _228 from "./onft/v1beta1/tx";
import * as _571 from "./onft/v1beta1/tx.amino";
import * as _572 from "./onft/v1beta1/tx.registry";
import * as _573 from "./onft/v1beta1/query.rpc.Query";
import * as _574 from "./onft/v1beta1/tx.rpc.msg";
import * as _731 from "./rpc.query";
import * as _732 from "./rpc.tx";
export namespace OmniFlix {
  export namespace onft {
    export const v1beta1 = {
      ..._224,
      ..._225,
      ..._226,
      ..._227,
      ..._228,
      ..._571,
      ..._572,
      ..._573,
      ..._574
    };
  }
  export const ClientFactory = {
    ..._731,
    ..._732
  };
}