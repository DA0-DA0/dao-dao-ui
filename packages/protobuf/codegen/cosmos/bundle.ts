import * as _2 from "./auth/v1beta1/auth";
import * as _3 from "./auth/v1beta1/genesis";
import * as _4 from "./auth/v1beta1/query";
import * as _5 from "./auth/v1beta1/tx";
import * as _6 from "./authz/v1beta1/authz";
import * as _7 from "./authz/v1beta1/event";
import * as _8 from "./authz/v1beta1/genesis";
import * as _9 from "./authz/v1beta1/query";
import * as _10 from "./authz/v1beta1/tx";
import * as _11 from "./bank/v1beta1/authz";
import * as _12 from "./bank/v1beta1/bank";
import * as _13 from "./bank/v1beta1/genesis";
import * as _14 from "./bank/v1beta1/query";
import * as _15 from "./bank/v1beta1/tx";
import * as _16 from "./base/abci/v1beta1/abci";
import * as _17 from "./base/query/v1beta1/pagination";
import * as _18 from "./base/tendermint/v1beta1/query";
import * as _19 from "./base/tendermint/v1beta1/types";
import * as _20 from "./base/v1beta1/coin";
import * as _21 from "./crypto/ed25519/keys";
import * as _22 from "./crypto/multisig/v1beta1/multisig";
import * as _23 from "./distribution/v1beta1/distribution";
import * as _24 from "./distribution/v1beta1/genesis";
import * as _25 from "./distribution/v1beta1/query";
import * as _26 from "./distribution/v1beta1/tx";
import * as _27 from "./gov/v1/genesis";
import * as _28 from "./gov/v1/gov";
import * as _29 from "./gov/v1/query";
import * as _30 from "./gov/v1/tx";
import * as _31 from "./gov/v1beta1/genesis";
import * as _32 from "./gov/v1beta1/gov";
import * as _33 from "./gov/v1beta1/query";
import * as _34 from "./gov/v1beta1/tx";
import * as _35 from "./mint/v1beta1/genesis";
import * as _36 from "./mint/v1beta1/mint";
import * as _37 from "./mint/v1beta1/query";
import * as _38 from "./mint/v1beta1/tx";
import * as _39 from "./msg/v1/msg";
import * as _40 from "./params/v1beta1/params";
import * as _41 from "./params/v1beta1/query";
import * as _42 from "./query/v1/query";
import * as _43 from "./slashing/v1beta1/genesis";
import * as _44 from "./slashing/v1beta1/query";
import * as _45 from "./slashing/v1beta1/slashing";
import * as _46 from "./slashing/v1beta1/tx";
import * as _47 from "./staking/v1beta1/authz";
import * as _48 from "./staking/v1beta1/genesis";
import * as _49 from "./staking/v1beta1/query";
import * as _50 from "./staking/v1beta1/staking";
import * as _51 from "./staking/v1beta1/tx";
import * as _52 from "./tx/signing/v1beta1/signing";
import * as _53 from "./tx/v1beta1/service";
import * as _54 from "./tx/v1beta1/tx";
import * as _55 from "./upgrade/v1beta1/query";
import * as _56 from "./upgrade/v1beta1/tx";
import * as _57 from "./upgrade/v1beta1/upgrade";
import * as _186 from "./auth/v1beta1/tx.amino";
import * as _187 from "./authz/v1beta1/tx.amino";
import * as _188 from "./bank/v1beta1/tx.amino";
import * as _189 from "./distribution/v1beta1/tx.amino";
import * as _190 from "./gov/v1/tx.amino";
import * as _191 from "./gov/v1beta1/tx.amino";
import * as _192 from "./mint/v1beta1/tx.amino";
import * as _193 from "./slashing/v1beta1/tx.amino";
import * as _194 from "./staking/v1beta1/tx.amino";
import * as _195 from "./upgrade/v1beta1/tx.amino";
import * as _196 from "./auth/v1beta1/tx.registry";
import * as _197 from "./authz/v1beta1/tx.registry";
import * as _198 from "./bank/v1beta1/tx.registry";
import * as _199 from "./distribution/v1beta1/tx.registry";
import * as _200 from "./gov/v1/tx.registry";
import * as _201 from "./gov/v1beta1/tx.registry";
import * as _202 from "./mint/v1beta1/tx.registry";
import * as _203 from "./slashing/v1beta1/tx.registry";
import * as _204 from "./staking/v1beta1/tx.registry";
import * as _205 from "./upgrade/v1beta1/tx.registry";
import * as _206 from "./auth/v1beta1/query.rpc.Query";
import * as _207 from "./authz/v1beta1/query.rpc.Query";
import * as _208 from "./bank/v1beta1/query.rpc.Query";
import * as _209 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _210 from "./distribution/v1beta1/query.rpc.Query";
import * as _211 from "./gov/v1/query.rpc.Query";
import * as _212 from "./gov/v1beta1/query.rpc.Query";
import * as _213 from "./mint/v1beta1/query.rpc.Query";
import * as _214 from "./params/v1beta1/query.rpc.Query";
import * as _215 from "./slashing/v1beta1/query.rpc.Query";
import * as _216 from "./staking/v1beta1/query.rpc.Query";
import * as _217 from "./tx/v1beta1/service.rpc.Service";
import * as _218 from "./upgrade/v1beta1/query.rpc.Query";
import * as _219 from "./auth/v1beta1/tx.rpc.msg";
import * as _220 from "./authz/v1beta1/tx.rpc.msg";
import * as _221 from "./bank/v1beta1/tx.rpc.msg";
import * as _222 from "./distribution/v1beta1/tx.rpc.msg";
import * as _223 from "./gov/v1/tx.rpc.msg";
import * as _224 from "./gov/v1beta1/tx.rpc.msg";
import * as _225 from "./mint/v1beta1/tx.rpc.msg";
import * as _226 from "./slashing/v1beta1/tx.rpc.msg";
import * as _227 from "./staking/v1beta1/tx.rpc.msg";
import * as _228 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _310 from "./rpc.query";
import * as _311 from "./rpc.tx";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._2,
      ..._3,
      ..._4,
      ..._5,
      ..._186,
      ..._196,
      ..._206,
      ..._219
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._6,
      ..._7,
      ..._8,
      ..._9,
      ..._10,
      ..._187,
      ..._197,
      ..._207,
      ..._220
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._11,
      ..._12,
      ..._13,
      ..._14,
      ..._15,
      ..._188,
      ..._198,
      ..._208,
      ..._221
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._16
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._17
      };
    }
    export namespace tendermint {
      export const v1beta1 = {
        ..._18,
        ..._19,
        ..._209
      };
    }
    export const v1beta1 = {
      ..._20
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._21
    };
    export namespace multisig {
      export const v1beta1 = {
        ..._22
      };
    }
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._23,
      ..._24,
      ..._25,
      ..._26,
      ..._189,
      ..._199,
      ..._210,
      ..._222
    };
  }
  export namespace gov {
    export const v1 = {
      ..._27,
      ..._28,
      ..._29,
      ..._30,
      ..._190,
      ..._200,
      ..._211,
      ..._223
    };
    export const v1beta1 = {
      ..._31,
      ..._32,
      ..._33,
      ..._34,
      ..._191,
      ..._201,
      ..._212,
      ..._224
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._35,
      ..._36,
      ..._37,
      ..._38,
      ..._192,
      ..._202,
      ..._213,
      ..._225
    };
  }
  export namespace msg {
    export const v1 = {
      ..._39
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._40,
      ..._41,
      ..._214
    };
  }
  export namespace query {
    export const v1 = {
      ..._42
    };
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._43,
      ..._44,
      ..._45,
      ..._46,
      ..._193,
      ..._203,
      ..._215,
      ..._226
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._47,
      ..._48,
      ..._49,
      ..._50,
      ..._51,
      ..._194,
      ..._204,
      ..._216,
      ..._227
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._52
      };
    }
    export const v1beta1 = {
      ..._53,
      ..._54,
      ..._217
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._55,
      ..._56,
      ..._57,
      ..._195,
      ..._205,
      ..._218,
      ..._228
    };
  }
  export const ClientFactory = {
    ..._310,
    ..._311
  };
}