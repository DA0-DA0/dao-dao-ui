import * as _231 from "./onft/v1beta1/genesis";
import * as _232 from "./onft/v1beta1/onft";
import * as _233 from "./onft/v1beta1/params";
import * as _234 from "./onft/v1beta1/query";
import * as _235 from "./onft/v1beta1/tx";
import * as _670 from "./onft/v1beta1/tx.amino";
import * as _671 from "./onft/v1beta1/tx.registry";
import * as _672 from "./onft/v1beta1/query.rpc.Query";
import * as _673 from "./onft/v1beta1/tx.rpc.msg";
import * as _871 from "./rpc.query";
import * as _872 from "./rpc.tx";
export namespace OmniFlix {
  export namespace onft {
    export const v1beta1 = {
      ..._231,
      ..._232,
      ..._233,
      ..._234,
      ..._235,
      ..._670,
      ..._671,
      ..._672,
      ..._673
    };
  }
  export const ClientFactory = {
    ..._871,
    ..._872
  };
}