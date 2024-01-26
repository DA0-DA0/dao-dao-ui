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
import * as _244 from "./auth/v1beta1/tx.amino";
import * as _245 from "./authz/v1beta1/tx.amino";
import * as _246 from "./bank/v1beta1/tx.amino";
import * as _247 from "./distribution/v1beta1/tx.amino";
import * as _248 from "./gov/v1/tx.amino";
import * as _249 from "./gov/v1beta1/tx.amino";
import * as _250 from "./mint/v1beta1/tx.amino";
import * as _251 from "./slashing/v1beta1/tx.amino";
import * as _252 from "./staking/v1beta1/tx.amino";
import * as _253 from "./upgrade/v1beta1/tx.amino";
import * as _254 from "./auth/v1beta1/tx.registry";
import * as _255 from "./authz/v1beta1/tx.registry";
import * as _256 from "./bank/v1beta1/tx.registry";
import * as _257 from "./distribution/v1beta1/tx.registry";
import * as _258 from "./gov/v1/tx.registry";
import * as _259 from "./gov/v1beta1/tx.registry";
import * as _260 from "./mint/v1beta1/tx.registry";
import * as _261 from "./slashing/v1beta1/tx.registry";
import * as _262 from "./staking/v1beta1/tx.registry";
import * as _263 from "./upgrade/v1beta1/tx.registry";
import * as _264 from "./auth/v1beta1/query.rpc.Query";
import * as _265 from "./authz/v1beta1/query.rpc.Query";
import * as _266 from "./bank/v1beta1/query.rpc.Query";
import * as _267 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _268 from "./distribution/v1beta1/query.rpc.Query";
import * as _269 from "./gov/v1/query.rpc.Query";
import * as _270 from "./gov/v1beta1/query.rpc.Query";
import * as _271 from "./mint/v1beta1/query.rpc.Query";
import * as _272 from "./params/v1beta1/query.rpc.Query";
import * as _273 from "./slashing/v1beta1/query.rpc.Query";
import * as _274 from "./staking/v1beta1/query.rpc.Query";
import * as _275 from "./tx/v1beta1/service.rpc.Service";
import * as _276 from "./upgrade/v1beta1/query.rpc.Query";
import * as _277 from "./auth/v1beta1/tx.rpc.msg";
import * as _278 from "./authz/v1beta1/tx.rpc.msg";
import * as _279 from "./bank/v1beta1/tx.rpc.msg";
import * as _280 from "./distribution/v1beta1/tx.rpc.msg";
import * as _281 from "./gov/v1/tx.rpc.msg";
import * as _282 from "./gov/v1beta1/tx.rpc.msg";
import * as _283 from "./mint/v1beta1/tx.rpc.msg";
import * as _284 from "./slashing/v1beta1/tx.rpc.msg";
import * as _285 from "./staking/v1beta1/tx.rpc.msg";
import * as _286 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _409 from "./rpc.query";
import * as _410 from "./rpc.tx";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._2,
      ..._3,
      ..._4,
      ..._5,
      ..._244,
      ..._254,
      ..._264,
      ..._277
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._6,
      ..._7,
      ..._8,
      ..._9,
      ..._10,
      ..._245,
      ..._255,
      ..._265,
      ..._278
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._11,
      ..._12,
      ..._13,
      ..._14,
      ..._15,
      ..._246,
      ..._256,
      ..._266,
      ..._279
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
        ..._267
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
      ..._247,
      ..._257,
      ..._268,
      ..._280
    };
  }
  export namespace gov {
    export const v1 = {
      ..._27,
      ..._28,
      ..._29,
      ..._30,
      ..._248,
      ..._258,
      ..._269,
      ..._281
    };
    export const v1beta1 = {
      ..._31,
      ..._32,
      ..._33,
      ..._34,
      ..._249,
      ..._259,
      ..._270,
      ..._282
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._35,
      ..._36,
      ..._37,
      ..._38,
      ..._250,
      ..._260,
      ..._271,
      ..._283
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
      ..._272
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
      ..._251,
      ..._261,
      ..._273,
      ..._284
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._47,
      ..._48,
      ..._49,
      ..._50,
      ..._51,
      ..._252,
      ..._262,
      ..._274,
      ..._285
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
      ..._275
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._55,
      ..._56,
      ..._57,
      ..._253,
      ..._263,
      ..._276,
      ..._286
    };
  }
  export const ClientFactory = {
    ..._409,
    ..._410
  };
}