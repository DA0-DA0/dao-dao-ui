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
import * as _40 from "./orm/v1/orm";
import * as _41 from "./params/v1beta1/params";
import * as _42 from "./params/v1beta1/query";
import * as _43 from "./query/v1/query";
import * as _44 from "./slashing/v1beta1/genesis";
import * as _45 from "./slashing/v1beta1/query";
import * as _46 from "./slashing/v1beta1/slashing";
import * as _47 from "./slashing/v1beta1/tx";
import * as _48 from "./staking/v1beta1/authz";
import * as _49 from "./staking/v1beta1/genesis";
import * as _50 from "./staking/v1beta1/query";
import * as _51 from "./staking/v1beta1/staking";
import * as _52 from "./staking/v1beta1/tx";
import * as _53 from "./tx/signing/v1beta1/signing";
import * as _54 from "./tx/v1beta1/service";
import * as _55 from "./tx/v1beta1/tx";
import * as _56 from "./upgrade/v1beta1/query";
import * as _57 from "./upgrade/v1beta1/tx";
import * as _58 from "./upgrade/v1beta1/upgrade";
import * as _274 from "./auth/v1beta1/tx.amino";
import * as _275 from "./authz/v1beta1/tx.amino";
import * as _276 from "./bank/v1beta1/tx.amino";
import * as _277 from "./distribution/v1beta1/tx.amino";
import * as _278 from "./gov/v1/tx.amino";
import * as _279 from "./gov/v1beta1/tx.amino";
import * as _280 from "./mint/v1beta1/tx.amino";
import * as _281 from "./slashing/v1beta1/tx.amino";
import * as _282 from "./staking/v1beta1/tx.amino";
import * as _283 from "./upgrade/v1beta1/tx.amino";
import * as _284 from "./auth/v1beta1/tx.registry";
import * as _285 from "./authz/v1beta1/tx.registry";
import * as _286 from "./bank/v1beta1/tx.registry";
import * as _287 from "./distribution/v1beta1/tx.registry";
import * as _288 from "./gov/v1/tx.registry";
import * as _289 from "./gov/v1beta1/tx.registry";
import * as _290 from "./mint/v1beta1/tx.registry";
import * as _291 from "./slashing/v1beta1/tx.registry";
import * as _292 from "./staking/v1beta1/tx.registry";
import * as _293 from "./upgrade/v1beta1/tx.registry";
import * as _294 from "./auth/v1beta1/query.rpc.Query";
import * as _295 from "./authz/v1beta1/query.rpc.Query";
import * as _296 from "./bank/v1beta1/query.rpc.Query";
import * as _297 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _298 from "./distribution/v1beta1/query.rpc.Query";
import * as _299 from "./gov/v1/query.rpc.Query";
import * as _300 from "./gov/v1beta1/query.rpc.Query";
import * as _301 from "./mint/v1beta1/query.rpc.Query";
import * as _302 from "./params/v1beta1/query.rpc.Query";
import * as _303 from "./slashing/v1beta1/query.rpc.Query";
import * as _304 from "./staking/v1beta1/query.rpc.Query";
import * as _305 from "./tx/v1beta1/service.rpc.Service";
import * as _306 from "./upgrade/v1beta1/query.rpc.Query";
import * as _307 from "./auth/v1beta1/tx.rpc.msg";
import * as _308 from "./authz/v1beta1/tx.rpc.msg";
import * as _309 from "./bank/v1beta1/tx.rpc.msg";
import * as _310 from "./distribution/v1beta1/tx.rpc.msg";
import * as _311 from "./gov/v1/tx.rpc.msg";
import * as _312 from "./gov/v1beta1/tx.rpc.msg";
import * as _313 from "./mint/v1beta1/tx.rpc.msg";
import * as _314 from "./slashing/v1beta1/tx.rpc.msg";
import * as _315 from "./staking/v1beta1/tx.rpc.msg";
import * as _316 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _461 from "./rpc.query";
import * as _462 from "./rpc.tx";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._2,
      ..._3,
      ..._4,
      ..._5,
      ..._274,
      ..._284,
      ..._294,
      ..._307
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._6,
      ..._7,
      ..._8,
      ..._9,
      ..._10,
      ..._275,
      ..._285,
      ..._295,
      ..._308
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._11,
      ..._12,
      ..._13,
      ..._14,
      ..._15,
      ..._276,
      ..._286,
      ..._296,
      ..._309
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
        ..._297
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
      ..._277,
      ..._287,
      ..._298,
      ..._310
    };
  }
  export namespace gov {
    export const v1 = {
      ..._27,
      ..._28,
      ..._29,
      ..._30,
      ..._278,
      ..._288,
      ..._299,
      ..._311
    };
    export const v1beta1 = {
      ..._31,
      ..._32,
      ..._33,
      ..._34,
      ..._279,
      ..._289,
      ..._300,
      ..._312
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._35,
      ..._36,
      ..._37,
      ..._38,
      ..._280,
      ..._290,
      ..._301,
      ..._313
    };
  }
  export namespace msg {
    export const v1 = {
      ..._39
    };
  }
  export namespace orm {
    export const v1 = {
      ..._40
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._41,
      ..._42,
      ..._302
    };
  }
  export namespace query {
    export const v1 = {
      ..._43
    };
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._44,
      ..._45,
      ..._46,
      ..._47,
      ..._281,
      ..._291,
      ..._303,
      ..._314
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._48,
      ..._49,
      ..._50,
      ..._51,
      ..._52,
      ..._282,
      ..._292,
      ..._304,
      ..._315
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._53
      };
    }
    export const v1beta1 = {
      ..._54,
      ..._55,
      ..._305
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._56,
      ..._57,
      ..._58,
      ..._283,
      ..._293,
      ..._306,
      ..._316
    };
  }
  export const ClientFactory = {
    ..._461,
    ..._462
  };
}