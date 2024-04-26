import * as _28 from "./auth/v1beta1/auth";
import * as _29 from "./auth/v1beta1/genesis";
import * as _30 from "./auth/v1beta1/query";
import * as _31 from "./auth/v1beta1/tx";
import * as _32 from "./authz/v1beta1/authz";
import * as _33 from "./authz/v1beta1/event";
import * as _34 from "./authz/v1beta1/genesis";
import * as _35 from "./authz/v1beta1/query";
import * as _36 from "./authz/v1beta1/tx";
import * as _37 from "./bank/v1beta1/authz";
import * as _38 from "./bank/v1beta1/bank";
import * as _39 from "./bank/v1beta1/genesis";
import * as _40 from "./bank/v1beta1/query";
import * as _41 from "./bank/v1beta1/tx";
import * as _42 from "./base/abci/v1beta1/abci";
import * as _43 from "./base/query/v1beta1/pagination";
import * as _44 from "./base/tendermint/v1beta1/query";
import * as _45 from "./base/tendermint/v1beta1/types";
import * as _46 from "./base/v1beta1/coin";
import * as _47 from "./crypto/ed25519/keys";
import * as _48 from "./crypto/multisig/keys";
import * as _49 from "./crypto/secp256k1/keys";
import * as _50 from "./distribution/v1beta1/distribution";
import * as _51 from "./distribution/v1beta1/genesis";
import * as _52 from "./distribution/v1beta1/query";
import * as _53 from "./distribution/v1beta1/tx";
import * as _54 from "./feegrant/v1beta1/feegrant";
import * as _55 from "./feegrant/v1beta1/genesis";
import * as _56 from "./feegrant/v1beta1/query";
import * as _57 from "./feegrant/v1beta1/tx";
import * as _58 from "./gov/v1/genesis";
import * as _59 from "./gov/v1/gov";
import * as _60 from "./gov/v1/query";
import * as _61 from "./gov/v1/tx";
import * as _62 from "./gov/v1beta1/genesis";
import * as _63 from "./gov/v1beta1/gov";
import * as _64 from "./gov/v1beta1/query";
import * as _65 from "./gov/v1beta1/tx";
import * as _66 from "./mint/v1beta1/genesis";
import * as _67 from "./mint/v1beta1/mint";
import * as _68 from "./mint/v1beta1/query";
import * as _69 from "./mint/v1beta1/tx";
import * as _70 from "./msg/v1/msg";
import * as _71 from "./orm/v1/orm";
import * as _72 from "./params/v1beta1/params";
import * as _73 from "./params/v1beta1/query";
import * as _74 from "./query/v1/query";
import * as _75 from "./slashing/v1beta1/genesis";
import * as _76 from "./slashing/v1beta1/query";
import * as _77 from "./slashing/v1beta1/slashing";
import * as _78 from "./slashing/v1beta1/tx";
import * as _79 from "./staking/v1beta1/authz";
import * as _80 from "./staking/v1beta1/genesis";
import * as _81 from "./staking/v1beta1/query";
import * as _82 from "./staking/v1beta1/staking";
import * as _83 from "./staking/v1beta1/tx";
import * as _84 from "./tx/signing/v1beta1/signing";
import * as _85 from "./tx/v1beta1/service";
import * as _86 from "./tx/v1beta1/tx";
import * as _87 from "./upgrade/v1beta1/query";
import * as _88 from "./upgrade/v1beta1/tx";
import * as _89 from "./upgrade/v1beta1/upgrade";
import * as _332 from "./auth/v1beta1/tx.amino";
import * as _333 from "./authz/v1beta1/tx.amino";
import * as _334 from "./bank/v1beta1/tx.amino";
import * as _335 from "./distribution/v1beta1/tx.amino";
import * as _336 from "./feegrant/v1beta1/tx.amino";
import * as _337 from "./gov/v1/tx.amino";
import * as _338 from "./gov/v1beta1/tx.amino";
import * as _339 from "./mint/v1beta1/tx.amino";
import * as _340 from "./slashing/v1beta1/tx.amino";
import * as _341 from "./staking/v1beta1/tx.amino";
import * as _342 from "./upgrade/v1beta1/tx.amino";
import * as _343 from "./auth/v1beta1/tx.registry";
import * as _344 from "./authz/v1beta1/tx.registry";
import * as _345 from "./bank/v1beta1/tx.registry";
import * as _346 from "./distribution/v1beta1/tx.registry";
import * as _347 from "./feegrant/v1beta1/tx.registry";
import * as _348 from "./gov/v1/tx.registry";
import * as _349 from "./gov/v1beta1/tx.registry";
import * as _350 from "./mint/v1beta1/tx.registry";
import * as _351 from "./slashing/v1beta1/tx.registry";
import * as _352 from "./staking/v1beta1/tx.registry";
import * as _353 from "./upgrade/v1beta1/tx.registry";
import * as _354 from "./auth/v1beta1/query.rpc.Query";
import * as _355 from "./authz/v1beta1/query.rpc.Query";
import * as _356 from "./bank/v1beta1/query.rpc.Query";
import * as _357 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _358 from "./distribution/v1beta1/query.rpc.Query";
import * as _359 from "./feegrant/v1beta1/query.rpc.Query";
import * as _360 from "./gov/v1/query.rpc.Query";
import * as _361 from "./gov/v1beta1/query.rpc.Query";
import * as _362 from "./mint/v1beta1/query.rpc.Query";
import * as _363 from "./params/v1beta1/query.rpc.Query";
import * as _364 from "./slashing/v1beta1/query.rpc.Query";
import * as _365 from "./staking/v1beta1/query.rpc.Query";
import * as _366 from "./tx/v1beta1/service.rpc.Service";
import * as _367 from "./upgrade/v1beta1/query.rpc.Query";
import * as _368 from "./auth/v1beta1/tx.rpc.msg";
import * as _369 from "./authz/v1beta1/tx.rpc.msg";
import * as _370 from "./bank/v1beta1/tx.rpc.msg";
import * as _371 from "./distribution/v1beta1/tx.rpc.msg";
import * as _372 from "./feegrant/v1beta1/tx.rpc.msg";
import * as _373 from "./gov/v1/tx.rpc.msg";
import * as _374 from "./gov/v1beta1/tx.rpc.msg";
import * as _375 from "./mint/v1beta1/tx.rpc.msg";
import * as _376 from "./slashing/v1beta1/tx.rpc.msg";
import * as _377 from "./staking/v1beta1/tx.rpc.msg";
import * as _378 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _543 from "./rpc.query";
import * as _544 from "./rpc.tx";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._28,
      ..._29,
      ..._30,
      ..._31,
      ..._332,
      ..._343,
      ..._354,
      ..._368
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._32,
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._333,
      ..._344,
      ..._355,
      ..._369
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._37,
      ..._38,
      ..._39,
      ..._40,
      ..._41,
      ..._334,
      ..._345,
      ..._356,
      ..._370
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._42
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._43
      };
    }
    export namespace tendermint {
      export const v1beta1 = {
        ..._44,
        ..._45,
        ..._357
      };
    }
    export const v1beta1 = {
      ..._46
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._47
    };
    export const multisig = {
      ..._48
    };
    export const secp256k1 = {
      ..._49
    };
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._50,
      ..._51,
      ..._52,
      ..._53,
      ..._335,
      ..._346,
      ..._358,
      ..._371
    };
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._54,
      ..._55,
      ..._56,
      ..._57,
      ..._336,
      ..._347,
      ..._359,
      ..._372
    };
  }
  export namespace gov {
    export const v1 = {
      ..._58,
      ..._59,
      ..._60,
      ..._61,
      ..._337,
      ..._348,
      ..._360,
      ..._373
    };
    export const v1beta1 = {
      ..._62,
      ..._63,
      ..._64,
      ..._65,
      ..._338,
      ..._349,
      ..._361,
      ..._374
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._66,
      ..._67,
      ..._68,
      ..._69,
      ..._339,
      ..._350,
      ..._362,
      ..._375
    };
  }
  export namespace msg {
    export const v1 = {
      ..._70
    };
  }
  export namespace orm {
    export const v1 = {
      ..._71
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._72,
      ..._73,
      ..._363
    };
  }
  export namespace query {
    export const v1 = {
      ..._74
    };
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._75,
      ..._76,
      ..._77,
      ..._78,
      ..._340,
      ..._351,
      ..._364,
      ..._376
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._79,
      ..._80,
      ..._81,
      ..._82,
      ..._83,
      ..._341,
      ..._352,
      ..._365,
      ..._377
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._84
      };
    }
    export const v1beta1 = {
      ..._85,
      ..._86,
      ..._366
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._87,
      ..._88,
      ..._89,
      ..._342,
      ..._353,
      ..._367,
      ..._378
    };
  }
  export const ClientFactory = {
    ..._543,
    ..._544
  };
}