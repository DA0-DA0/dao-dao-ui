import * as _12 from "./cctp/v1/attester";
import * as _13 from "./cctp/v1/burn_message";
import * as _14 from "./cctp/v1/burning_and_minting_paused";
import * as _15 from "./cctp/v1/events";
import * as _16 from "./cctp/v1/genesis";
import * as _17 from "./cctp/v1/max_message_body_size";
import * as _18 from "./cctp/v1/message";
import * as _19 from "./cctp/v1/nonce";
import * as _20 from "./cctp/v1/params";
import * as _21 from "./cctp/v1/per_message_burn_limit";
import * as _22 from "./cctp/v1/query";
import * as _23 from "./cctp/v1/remote_token_messenger";
import * as _24 from "./cctp/v1/sending_and_receiving_messages_paused";
import * as _25 from "./cctp/v1/signature_threshold";
import * as _26 from "./cctp/v1/token_pair";
import * as _27 from "./cctp/v1/tx";
import * as _427 from "./cctp/v1/tx.amino";
import * as _428 from "./cctp/v1/tx.registry";
import * as _429 from "./cctp/v1/query.rpc.Query";
import * as _430 from "./cctp/v1/tx.rpc.msg";
import * as _707 from "./rpc.query";
import * as _708 from "./rpc.tx";
export namespace circle {
  export namespace cctp {
    export const v1 = {
      ..._12,
      ..._13,
      ..._14,
      ..._15,
      ..._16,
      ..._17,
      ..._18,
      ..._19,
      ..._20,
      ..._21,
      ..._22,
      ..._23,
      ..._24,
      ..._25,
      ..._26,
      ..._27,
      ..._427,
      ..._428,
      ..._429,
      ..._430
    };
  }
  export const ClientFactory = {
    ..._707,
    ..._708
  };
}