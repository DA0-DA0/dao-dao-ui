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
import * as _54 from "./gov/v1/genesis";
import * as _55 from "./gov/v1/gov";
import * as _56 from "./gov/v1/query";
import * as _57 from "./gov/v1/tx";
import * as _58 from "./gov/v1beta1/genesis";
import * as _59 from "./gov/v1beta1/gov";
import * as _60 from "./gov/v1beta1/query";
import * as _61 from "./gov/v1beta1/tx";
import * as _62 from "./mint/v1beta1/genesis";
import * as _63 from "./mint/v1beta1/mint";
import * as _64 from "./mint/v1beta1/query";
import * as _65 from "./mint/v1beta1/tx";
import * as _66 from "./msg/v1/msg";
import * as _67 from "./orm/v1/orm";
import * as _68 from "./params/v1beta1/params";
import * as _69 from "./params/v1beta1/query";
import * as _70 from "./query/v1/query";
import * as _71 from "./slashing/v1beta1/genesis";
import * as _72 from "./slashing/v1beta1/query";
import * as _73 from "./slashing/v1beta1/slashing";
import * as _74 from "./slashing/v1beta1/tx";
import * as _75 from "./staking/v1beta1/authz";
import * as _76 from "./staking/v1beta1/genesis";
import * as _77 from "./staking/v1beta1/query";
import * as _78 from "./staking/v1beta1/staking";
import * as _79 from "./staking/v1beta1/tx";
import * as _80 from "./tx/signing/v1beta1/signing";
import * as _81 from "./tx/v1beta1/service";
import * as _82 from "./tx/v1beta1/tx";
import * as _83 from "./upgrade/v1beta1/query";
import * as _84 from "./upgrade/v1beta1/tx";
import * as _85 from "./upgrade/v1beta1/upgrade";
import * as _328 from "./auth/v1beta1/tx.amino";
import * as _329 from "./authz/v1beta1/tx.amino";
import * as _330 from "./bank/v1beta1/tx.amino";
import * as _331 from "./distribution/v1beta1/tx.amino";
import * as _332 from "./gov/v1/tx.amino";
import * as _333 from "./gov/v1beta1/tx.amino";
import * as _334 from "./mint/v1beta1/tx.amino";
import * as _335 from "./slashing/v1beta1/tx.amino";
import * as _336 from "./staking/v1beta1/tx.amino";
import * as _337 from "./upgrade/v1beta1/tx.amino";
import * as _338 from "./auth/v1beta1/tx.registry";
import * as _339 from "./authz/v1beta1/tx.registry";
import * as _340 from "./bank/v1beta1/tx.registry";
import * as _341 from "./distribution/v1beta1/tx.registry";
import * as _342 from "./gov/v1/tx.registry";
import * as _343 from "./gov/v1beta1/tx.registry";
import * as _344 from "./mint/v1beta1/tx.registry";
import * as _345 from "./slashing/v1beta1/tx.registry";
import * as _346 from "./staking/v1beta1/tx.registry";
import * as _347 from "./upgrade/v1beta1/tx.registry";
import * as _348 from "./auth/v1beta1/query.rpc.Query";
import * as _349 from "./authz/v1beta1/query.rpc.Query";
import * as _350 from "./bank/v1beta1/query.rpc.Query";
import * as _351 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _352 from "./distribution/v1beta1/query.rpc.Query";
import * as _353 from "./gov/v1/query.rpc.Query";
import * as _354 from "./gov/v1beta1/query.rpc.Query";
import * as _355 from "./mint/v1beta1/query.rpc.Query";
import * as _356 from "./params/v1beta1/query.rpc.Query";
import * as _357 from "./slashing/v1beta1/query.rpc.Query";
import * as _358 from "./staking/v1beta1/query.rpc.Query";
import * as _359 from "./tx/v1beta1/service.rpc.Service";
import * as _360 from "./upgrade/v1beta1/query.rpc.Query";
import * as _361 from "./auth/v1beta1/tx.rpc.msg";
import * as _362 from "./authz/v1beta1/tx.rpc.msg";
import * as _363 from "./bank/v1beta1/tx.rpc.msg";
import * as _364 from "./distribution/v1beta1/tx.rpc.msg";
import * as _365 from "./gov/v1/tx.rpc.msg";
import * as _366 from "./gov/v1beta1/tx.rpc.msg";
import * as _367 from "./mint/v1beta1/tx.rpc.msg";
import * as _368 from "./slashing/v1beta1/tx.rpc.msg";
import * as _369 from "./staking/v1beta1/tx.rpc.msg";
import * as _370 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _535 from "./rpc.query";
import * as _536 from "./rpc.tx";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._28,
      ..._29,
      ..._30,
      ..._31,
      ..._328,
      ..._338,
      ..._348,
      ..._361
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._32,
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._329,
      ..._339,
      ..._349,
      ..._362
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._37,
      ..._38,
      ..._39,
      ..._40,
      ..._41,
      ..._330,
      ..._340,
      ..._350,
      ..._363
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
        ..._351
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
      ..._331,
      ..._341,
      ..._352,
      ..._364
    };
  }
  export namespace gov {
    export const v1 = {
      ..._54,
      ..._55,
      ..._56,
      ..._57,
      ..._332,
      ..._342,
      ..._353,
      ..._365
    };
    export const v1beta1 = {
      ..._58,
      ..._59,
      ..._60,
      ..._61,
      ..._333,
      ..._343,
      ..._354,
      ..._366
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._62,
      ..._63,
      ..._64,
      ..._65,
      ..._334,
      ..._344,
      ..._355,
      ..._367
    };
  }
  export namespace msg {
    export const v1 = {
      ..._66
    };
  }
  export namespace orm {
    export const v1 = {
      ..._67
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._68,
      ..._69,
      ..._356
    };
  }
  export namespace query {
    export const v1 = {
      ..._70
    };
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._71,
      ..._72,
      ..._73,
      ..._74,
      ..._335,
      ..._345,
      ..._357,
      ..._368
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._75,
      ..._76,
      ..._77,
      ..._78,
      ..._79,
      ..._336,
      ..._346,
      ..._358,
      ..._369
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._80
      };
    }
    export const v1beta1 = {
      ..._81,
      ..._82,
      ..._359
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._83,
      ..._84,
      ..._85,
      ..._337,
      ..._347,
      ..._360,
      ..._370
    };
  }
  export const ClientFactory = {
    ..._535,
    ..._536
  };
}