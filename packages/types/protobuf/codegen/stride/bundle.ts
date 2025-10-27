import * as _512 from "./records/records";
import * as _513 from "./stakeibc/address_unbonding";
import * as _514 from "./stakeibc/callbacks";
import * as _515 from "./stakeibc/epoch_tracker";
import * as _516 from "./stakeibc/genesis";
import * as _517 from "./stakeibc/gov";
import * as _518 from "./stakeibc/host_zone";
import * as _519 from "./stakeibc/ica_account";
import * as _520 from "./stakeibc/packet";
import * as _521 from "./stakeibc/params";
import * as _522 from "./stakeibc/query";
import * as _523 from "./stakeibc/trade_route";
import * as _524 from "./stakeibc/tx";
import * as _525 from "./stakeibc/validator";
import * as _887 from "./stakeibc/tx.amino";
import * as _888 from "./stakeibc/tx.registry";
import * as _889 from "./stakeibc/query.rpc.Query";
import * as _890 from "./stakeibc/tx.rpc.msg";
import * as _942 from "./rpc.query";
import * as _943 from "./rpc.tx";
export namespace stride {
  export const records = {
    ..._512
  };
  export const stakeibc = {
    ..._513,
    ..._514,
    ..._515,
    ..._516,
    ..._517,
    ..._518,
    ..._519,
    ..._520,
    ..._521,
    ..._522,
    ..._523,
    ..._524,
    ..._525,
    ..._887,
    ..._888,
    ..._889,
    ..._890
  };
  export const ClientFactory = {
    ..._942,
    ..._943
  };
}