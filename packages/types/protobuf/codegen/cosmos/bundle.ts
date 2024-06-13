import * as _29 from "./auth/v1beta1/auth";
import * as _30 from "./auth/v1beta1/genesis";
import * as _31 from "./auth/v1beta1/query";
import * as _32 from "./auth/v1beta1/tx";
import * as _33 from "./authz/v1beta1/authz";
import * as _34 from "./authz/v1beta1/event";
import * as _35 from "./authz/v1beta1/genesis";
import * as _36 from "./authz/v1beta1/query";
import * as _37 from "./authz/v1beta1/tx";
import * as _38 from "./bank/v1beta1/authz";
import * as _39 from "./bank/v1beta1/bank";
import * as _40 from "./bank/v1beta1/genesis";
import * as _41 from "./bank/v1beta1/query";
import * as _42 from "./bank/v1beta1/tx";
import * as _43 from "./base/abci/v1beta1/abci";
import * as _44 from "./base/query/v1beta1/pagination";
import * as _45 from "./base/tendermint/v1beta1/query";
import * as _46 from "./base/tendermint/v1beta1/types";
import * as _47 from "./base/v1beta1/coin";
import * as _48 from "./crypto/ed25519/keys";
import * as _49 from "./crypto/multisig/keys";
import * as _50 from "./crypto/secp256k1/keys";
import * as _51 from "./distribution/v1beta1/distribution";
import * as _52 from "./distribution/v1beta1/genesis";
import * as _53 from "./distribution/v1beta1/query";
import * as _54 from "./distribution/v1beta1/tx";
import * as _55 from "./feegrant/v1beta1/feegrant";
import * as _56 from "./feegrant/v1beta1/genesis";
import * as _57 from "./feegrant/v1beta1/query";
import * as _58 from "./feegrant/v1beta1/tx";
import * as _59 from "./gov/v1/genesis";
import * as _60 from "./gov/v1/gov";
import * as _61 from "./gov/v1/query";
import * as _62 from "./gov/v1/tx";
import * as _63 from "./gov/v1beta1/genesis";
import * as _64 from "./gov/v1beta1/gov";
import * as _65 from "./gov/v1beta1/query";
import * as _66 from "./gov/v1beta1/tx";
import * as _67 from "./mint/v1beta1/genesis";
import * as _68 from "./mint/v1beta1/mint";
import * as _69 from "./mint/v1beta1/query";
import * as _70 from "./mint/v1beta1/tx";
import * as _71 from "./msg/v1/msg";
import * as _72 from "./orm/v1/orm";
import * as _73 from "./params/v1beta1/params";
import * as _74 from "./params/v1beta1/query";
import * as _75 from "./query/v1/query";
import * as _76 from "./slashing/v1beta1/genesis";
import * as _77 from "./slashing/v1beta1/query";
import * as _78 from "./slashing/v1beta1/slashing";
import * as _79 from "./slashing/v1beta1/tx";
import * as _80 from "./staking/v1beta1/authz";
import * as _81 from "./staking/v1beta1/genesis";
import * as _82 from "./staking/v1beta1/query";
import * as _83 from "./staking/v1beta1/staking";
import * as _84 from "./staking/v1beta1/tx";
import * as _85 from "./tx/signing/v1beta1/signing";
import * as _86 from "./tx/v1beta1/service";
import * as _87 from "./tx/v1beta1/tx";
import * as _88 from "./upgrade/v1beta1/query";
import * as _89 from "./upgrade/v1beta1/tx";
import * as _90 from "./upgrade/v1beta1/upgrade";
import * as _362 from "./auth/v1beta1/tx.amino";
import * as _363 from "./authz/v1beta1/tx.amino";
import * as _364 from "./bank/v1beta1/tx.amino";
import * as _365 from "./distribution/v1beta1/tx.amino";
import * as _366 from "./feegrant/v1beta1/tx.amino";
import * as _367 from "./gov/v1/tx.amino";
import * as _368 from "./gov/v1beta1/tx.amino";
import * as _369 from "./mint/v1beta1/tx.amino";
import * as _370 from "./slashing/v1beta1/tx.amino";
import * as _371 from "./staking/v1beta1/tx.amino";
import * as _372 from "./upgrade/v1beta1/tx.amino";
import * as _373 from "./auth/v1beta1/tx.registry";
import * as _374 from "./authz/v1beta1/tx.registry";
import * as _375 from "./bank/v1beta1/tx.registry";
import * as _376 from "./distribution/v1beta1/tx.registry";
import * as _377 from "./feegrant/v1beta1/tx.registry";
import * as _378 from "./gov/v1/tx.registry";
import * as _379 from "./gov/v1beta1/tx.registry";
import * as _380 from "./mint/v1beta1/tx.registry";
import * as _381 from "./slashing/v1beta1/tx.registry";
import * as _382 from "./staking/v1beta1/tx.registry";
import * as _383 from "./upgrade/v1beta1/tx.registry";
import * as _384 from "./auth/v1beta1/query.rpc.Query";
import * as _385 from "./authz/v1beta1/query.rpc.Query";
import * as _386 from "./bank/v1beta1/query.rpc.Query";
import * as _387 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _388 from "./distribution/v1beta1/query.rpc.Query";
import * as _389 from "./feegrant/v1beta1/query.rpc.Query";
import * as _390 from "./gov/v1/query.rpc.Query";
import * as _391 from "./gov/v1beta1/query.rpc.Query";
import * as _392 from "./mint/v1beta1/query.rpc.Query";
import * as _393 from "./params/v1beta1/query.rpc.Query";
import * as _394 from "./slashing/v1beta1/query.rpc.Query";
import * as _395 from "./staking/v1beta1/query.rpc.Query";
import * as _396 from "./tx/v1beta1/service.rpc.Service";
import * as _397 from "./upgrade/v1beta1/query.rpc.Query";
import * as _398 from "./auth/v1beta1/tx.rpc.msg";
import * as _399 from "./authz/v1beta1/tx.rpc.msg";
import * as _400 from "./bank/v1beta1/tx.rpc.msg";
import * as _401 from "./distribution/v1beta1/tx.rpc.msg";
import * as _402 from "./feegrant/v1beta1/tx.rpc.msg";
import * as _403 from "./gov/v1/tx.rpc.msg";
import * as _404 from "./gov/v1beta1/tx.rpc.msg";
import * as _405 from "./mint/v1beta1/tx.rpc.msg";
import * as _406 from "./slashing/v1beta1/tx.rpc.msg";
import * as _407 from "./staking/v1beta1/tx.rpc.msg";
import * as _408 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _594 from "./rpc.query";
import * as _595 from "./rpc.tx";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._29,
      ..._30,
      ..._31,
      ..._32,
      ..._362,
      ..._373,
      ..._384,
      ..._398
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._37,
      ..._363,
      ..._374,
      ..._385,
      ..._399
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._38,
      ..._39,
      ..._40,
      ..._41,
      ..._42,
      ..._364,
      ..._375,
      ..._386,
      ..._400
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._43
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._44
      };
    }
    export namespace tendermint {
      export const v1beta1 = {
        ..._45,
        ..._46,
        ..._387
      };
    }
    export const v1beta1 = {
      ..._47
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._48
    };
    export const multisig = {
      ..._49
    };
    export const secp256k1 = {
      ..._50
    };
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._51,
      ..._52,
      ..._53,
      ..._54,
      ..._365,
      ..._376,
      ..._388,
      ..._401
    };
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._55,
      ..._56,
      ..._57,
      ..._58,
      ..._366,
      ..._377,
      ..._389,
      ..._402
    };
  }
  export namespace gov {
    export const v1 = {
      ..._59,
      ..._60,
      ..._61,
      ..._62,
      ..._367,
      ..._378,
      ..._390,
      ..._403
    };
    export const v1beta1 = {
      ..._63,
      ..._64,
      ..._65,
      ..._66,
      ..._368,
      ..._379,
      ..._391,
      ..._404
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._67,
      ..._68,
      ..._69,
      ..._70,
      ..._369,
      ..._380,
      ..._392,
      ..._405
    };
  }
  export namespace msg {
    export const v1 = {
      ..._71
    };
  }
  export namespace orm {
    export const v1 = {
      ..._72
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._73,
      ..._74,
      ..._393
    };
  }
  export namespace query {
    export const v1 = {
      ..._75
    };
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._76,
      ..._77,
      ..._78,
      ..._79,
      ..._370,
      ..._381,
      ..._394,
      ..._406
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._80,
      ..._81,
      ..._82,
      ..._83,
      ..._84,
      ..._371,
      ..._382,
      ..._395,
      ..._407
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._85
      };
    }
    export const v1beta1 = {
      ..._86,
      ..._87,
      ..._396
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._88,
      ..._89,
      ..._90,
      ..._372,
      ..._383,
      ..._397,
      ..._408
    };
  }
  export const ClientFactory = {
    ..._594,
    ..._595
  };
}