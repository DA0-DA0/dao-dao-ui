import * as _172 from "./ccv/consumer/v1/consumer";
import * as _173 from "./ccv/consumer/v1/genesis";
import * as _174 from "./ccv/consumer/v1/query";
import * as _175 from "./ccv/consumer/v1/tx";
import * as _176 from "./ccv/provider/v1/genesis";
import * as _177 from "./ccv/provider/v1/provider";
import * as _178 from "./ccv/provider/v1/query";
import * as _179 from "./ccv/provider/v1/tx";
import * as _180 from "./ccv/v1/shared_consumer";
import * as _181 from "./ccv/v1/wire";
import * as _636 from "./ccv/consumer/v1/tx.amino";
import * as _637 from "./ccv/provider/v1/tx.amino";
import * as _638 from "./ccv/consumer/v1/tx.registry";
import * as _639 from "./ccv/provider/v1/tx.registry";
import * as _640 from "./ccv/consumer/v1/query.rpc.Query";
import * as _641 from "./ccv/provider/v1/query.rpc.Query";
import * as _642 from "./ccv/consumer/v1/tx.rpc.msg";
import * as _643 from "./ccv/provider/v1/tx.rpc.msg";
import * as _878 from "./rpc.query";
import * as _879 from "./rpc.tx";
export namespace interchain_security {
  export namespace ccv {
    export namespace consumer {
      export const v1 = {
        ..._172,
        ..._173,
        ..._174,
        ..._175,
        ..._636,
        ..._638,
        ..._640,
        ..._642
      };
    }
    export namespace provider {
      export const v1 = {
        ..._176,
        ..._177,
        ..._178,
        ..._179,
        ..._637,
        ..._639,
        ..._641,
        ..._643
      };
    }
    export const v1 = {
      ..._180,
      ..._181
    };
  }
  export const ClientFactory = {
    ..._878,
    ..._879
  };
}