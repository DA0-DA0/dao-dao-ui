import * as _12 from "./auth/v1beta1/auth";
import * as _13 from "./auth/v1beta1/genesis";
import * as _14 from "./auth/v1beta1/query";
import * as _15 from "./auth/v1beta1/tx";
import * as _16 from "./authz/v1beta1/authz";
import * as _17 from "./authz/v1beta1/event";
import * as _18 from "./authz/v1beta1/genesis";
import * as _19 from "./authz/v1beta1/query";
import * as _20 from "./authz/v1beta1/tx";
import * as _21 from "./bank/v1beta1/authz";
import * as _22 from "./bank/v1beta1/bank";
import * as _23 from "./bank/v1beta1/genesis";
import * as _24 from "./bank/v1beta1/query";
import * as _25 from "./bank/v1beta1/tx";
import * as _26 from "./base/abci/v1beta1/abci";
import * as _27 from "./base/query/v1beta1/pagination";
import * as _28 from "./base/tendermint/v1beta1/query";
import * as _29 from "./base/tendermint/v1beta1/types";
import * as _30 from "./base/v1beta1/coin";
import * as _31 from "./crypto/ed25519/keys";
import * as _32 from "./crypto/multisig/v1beta1/multisig";
import * as _33 from "./distribution/v1beta1/distribution";
import * as _34 from "./distribution/v1beta1/genesis";
import * as _35 from "./distribution/v1beta1/query";
import * as _36 from "./distribution/v1beta1/tx";
import * as _37 from "./gov/v1/genesis";
import * as _38 from "./gov/v1/gov";
import * as _39 from "./gov/v1/query";
import * as _40 from "./gov/v1/tx";
import * as _41 from "./gov/v1beta1/genesis";
import * as _42 from "./gov/v1beta1/gov";
import * as _43 from "./gov/v1beta1/query";
import * as _44 from "./gov/v1beta1/tx";
import * as _45 from "./mint/v1beta1/genesis";
import * as _46 from "./mint/v1beta1/mint";
import * as _47 from "./mint/v1beta1/query";
import * as _48 from "./mint/v1beta1/tx";
import * as _49 from "./msg/v1/msg";
import * as _50 from "./orm/v1/orm";
import * as _51 from "./params/v1beta1/params";
import * as _52 from "./params/v1beta1/query";
import * as _53 from "./query/v1/query";
import * as _54 from "./slashing/v1beta1/genesis";
import * as _55 from "./slashing/v1beta1/query";
import * as _56 from "./slashing/v1beta1/slashing";
import * as _57 from "./slashing/v1beta1/tx";
import * as _58 from "./staking/v1beta1/authz";
import * as _59 from "./staking/v1beta1/genesis";
import * as _60 from "./staking/v1beta1/query";
import * as _61 from "./staking/v1beta1/staking";
import * as _62 from "./staking/v1beta1/tx";
import * as _63 from "./tx/signing/v1beta1/signing";
import * as _64 from "./tx/v1beta1/service";
import * as _65 from "./tx/v1beta1/tx";
import * as _66 from "./upgrade/v1beta1/query";
import * as _67 from "./upgrade/v1beta1/tx";
import * as _68 from "./upgrade/v1beta1/upgrade";
import * as _288 from "./auth/v1beta1/tx.amino";
import * as _289 from "./authz/v1beta1/tx.amino";
import * as _290 from "./bank/v1beta1/tx.amino";
import * as _291 from "./distribution/v1beta1/tx.amino";
import * as _292 from "./gov/v1/tx.amino";
import * as _293 from "./gov/v1beta1/tx.amino";
import * as _294 from "./mint/v1beta1/tx.amino";
import * as _295 from "./slashing/v1beta1/tx.amino";
import * as _296 from "./staking/v1beta1/tx.amino";
import * as _297 from "./upgrade/v1beta1/tx.amino";
import * as _298 from "./auth/v1beta1/tx.registry";
import * as _299 from "./authz/v1beta1/tx.registry";
import * as _300 from "./bank/v1beta1/tx.registry";
import * as _301 from "./distribution/v1beta1/tx.registry";
import * as _302 from "./gov/v1/tx.registry";
import * as _303 from "./gov/v1beta1/tx.registry";
import * as _304 from "./mint/v1beta1/tx.registry";
import * as _305 from "./slashing/v1beta1/tx.registry";
import * as _306 from "./staking/v1beta1/tx.registry";
import * as _307 from "./upgrade/v1beta1/tx.registry";
import * as _308 from "./auth/v1beta1/query.rpc.Query";
import * as _309 from "./authz/v1beta1/query.rpc.Query";
import * as _310 from "./bank/v1beta1/query.rpc.Query";
import * as _311 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _312 from "./distribution/v1beta1/query.rpc.Query";
import * as _313 from "./gov/v1/query.rpc.Query";
import * as _314 from "./gov/v1beta1/query.rpc.Query";
import * as _315 from "./mint/v1beta1/query.rpc.Query";
import * as _316 from "./params/v1beta1/query.rpc.Query";
import * as _317 from "./slashing/v1beta1/query.rpc.Query";
import * as _318 from "./staking/v1beta1/query.rpc.Query";
import * as _319 from "./tx/v1beta1/service.rpc.Service";
import * as _320 from "./upgrade/v1beta1/query.rpc.Query";
import * as _321 from "./auth/v1beta1/tx.rpc.msg";
import * as _322 from "./authz/v1beta1/tx.rpc.msg";
import * as _323 from "./bank/v1beta1/tx.rpc.msg";
import * as _324 from "./distribution/v1beta1/tx.rpc.msg";
import * as _325 from "./gov/v1/tx.rpc.msg";
import * as _326 from "./gov/v1beta1/tx.rpc.msg";
import * as _327 from "./mint/v1beta1/tx.rpc.msg";
import * as _328 from "./slashing/v1beta1/tx.rpc.msg";
import * as _329 from "./staking/v1beta1/tx.rpc.msg";
import * as _330 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _477 from "./rpc.query";
import * as _478 from "./rpc.tx";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._12,
      ..._13,
      ..._14,
      ..._15,
      ..._288,
      ..._298,
      ..._308,
      ..._321
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._16,
      ..._17,
      ..._18,
      ..._19,
      ..._20,
      ..._289,
      ..._299,
      ..._309,
      ..._322
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._21,
      ..._22,
      ..._23,
      ..._24,
      ..._25,
      ..._290,
      ..._300,
      ..._310,
      ..._323
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._26
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._27
      };
    }
    export namespace tendermint {
      export const v1beta1 = {
        ..._28,
        ..._29,
        ..._311
      };
    }
    export const v1beta1 = {
      ..._30
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._31
    };
    export namespace multisig {
      export const v1beta1 = {
        ..._32
      };
    }
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._291,
      ..._301,
      ..._312,
      ..._324
    };
  }
  export namespace gov {
    export const v1 = {
      ..._37,
      ..._38,
      ..._39,
      ..._40,
      ..._292,
      ..._302,
      ..._313,
      ..._325
    };
    export const v1beta1 = {
      ..._41,
      ..._42,
      ..._43,
      ..._44,
      ..._293,
      ..._303,
      ..._314,
      ..._326
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._45,
      ..._46,
      ..._47,
      ..._48,
      ..._294,
      ..._304,
      ..._315,
      ..._327
    };
  }
  export namespace msg {
    export const v1 = {
      ..._49
    };
  }
  export namespace orm {
    export const v1 = {
      ..._50
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._51,
      ..._52,
      ..._316
    };
  }
  export namespace query {
    export const v1 = {
      ..._53
    };
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._54,
      ..._55,
      ..._56,
      ..._57,
      ..._295,
      ..._305,
      ..._317,
      ..._328
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._58,
      ..._59,
      ..._60,
      ..._61,
      ..._62,
      ..._296,
      ..._306,
      ..._318,
      ..._329
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._63
      };
    }
    export const v1beta1 = {
      ..._64,
      ..._65,
      ..._319
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._66,
      ..._67,
      ..._68,
      ..._297,
      ..._307,
      ..._320,
      ..._330
    };
  }
  export const ClientFactory = {
    ..._477,
    ..._478
  };
}