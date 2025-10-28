import * as _195 from "./denom/authorityMetadata";
import * as _196 from "./denom/genesis";
import * as _197 from "./denom/params";
import * as _198 from "./denom/query";
import * as _199 from "./denom/tx";
import * as _200 from "./oracle/genesis";
import * as _201 from "./oracle/oracle";
import * as _202 from "./oracle/query";
import * as _203 from "./oracle/tx";
import * as _204 from "./scheduler/genesis";
import * as _205 from "./scheduler/hook";
import * as _206 from "./scheduler/params";
import * as _207 from "./scheduler/proposal";
import * as _208 from "./scheduler/query";
import * as _680 from "./denom/tx.amino";
import * as _681 from "./oracle/tx.amino";
import * as _682 from "./denom/tx.registry";
import * as _683 from "./oracle/tx.registry";
import * as _684 from "./denom/query.rpc.Query";
import * as _685 from "./oracle/query.rpc.Query";
import * as _686 from "./scheduler/query.rpc.Query";
import * as _687 from "./denom/tx.rpc.msg";
import * as _688 from "./oracle/tx.rpc.msg";
import * as _922 from "./rpc.query";
import * as _923 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._195,
    ..._196,
    ..._197,
    ..._198,
    ..._199,
    ..._680,
    ..._682,
    ..._684,
    ..._687
  };
  export const oracle = {
    ..._200,
    ..._201,
    ..._202,
    ..._203,
    ..._681,
    ..._683,
    ..._685,
    ..._688
  };
  export const scheduler = {
    ..._204,
    ..._205,
    ..._206,
    ..._207,
    ..._208,
    ..._686
  };
  export const ClientFactory = {
    ..._922,
    ..._923
  };
}