import * as _171 from "./feeshare/v1/feeshare";
import * as _172 from "./feeshare/v1/genesis";
import * as _173 from "./feeshare/v1/query";
import * as _174 from "./feeshare/v1/tx";
import * as _629 from "./feeshare/v1/tx.amino";
import * as _630 from "./feeshare/v1/tx.registry";
import * as _631 from "./feeshare/v1/query.rpc.Query";
import * as _632 from "./feeshare/v1/tx.rpc.msg";
import * as _865 from "./rpc.query";
import * as _866 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._171,
      ..._172,
      ..._173,
      ..._174,
      ..._629,
      ..._630,
      ..._631,
      ..._632
    };
  }
  export const ClientFactory = {
    ..._865,
    ..._866
  };
}