import * as _28 from "./adminmodule/adminmodule/genesis";
import * as _29 from "./adminmodule/adminmodule/query";
import * as _30 from "./adminmodule/adminmodule/tx";
import * as _31 from "./auth/v1beta1/auth";
import * as _32 from "./auth/v1beta1/genesis";
import * as _33 from "./auth/v1beta1/query";
import * as _34 from "./auth/v1beta1/tx";
import * as _35 from "./authz/v1beta1/authz";
import * as _36 from "./authz/v1beta1/event";
import * as _37 from "./authz/v1beta1/genesis";
import * as _38 from "./authz/v1beta1/query";
import * as _39 from "./authz/v1beta1/tx";
import * as _40 from "./bank/v1beta1/authz";
import * as _41 from "./bank/v1beta1/bank";
import * as _42 from "./bank/v1beta1/genesis";
import * as _43 from "./bank/v1beta1/query";
import * as _44 from "./bank/v1beta1/tx";
import * as _45 from "./base/abci/v1beta1/abci";
import * as _46 from "./base/query/v1beta1/pagination";
import * as _47 from "./base/tendermint/v1beta1/query";
import * as _48 from "./base/tendermint/v1beta1/types";
import * as _49 from "./base/v1beta1/coin";
import * as _50 from "./crypto/ed25519/keys";
import * as _51 from "./crypto/multisig/keys";
import * as _52 from "./crypto/secp256k1/keys";
import * as _53 from "./distribution/v1beta1/distribution";
import * as _54 from "./distribution/v1beta1/genesis";
import * as _55 from "./distribution/v1beta1/query";
import * as _56 from "./distribution/v1beta1/tx";
import * as _57 from "./feegrant/v1beta1/feegrant";
import * as _58 from "./feegrant/v1beta1/genesis";
import * as _59 from "./feegrant/v1beta1/query";
import * as _60 from "./feegrant/v1beta1/tx";
import * as _61 from "./gov/v1/genesis";
import * as _62 from "./gov/v1/gov";
import * as _63 from "./gov/v1/query";
import * as _64 from "./gov/v1/tx";
import * as _65 from "./gov/v1beta1/genesis";
import * as _66 from "./gov/v1beta1/gov";
import * as _67 from "./gov/v1beta1/query";
import * as _68 from "./gov/v1beta1/tx";
import * as _69 from "./mint/v1beta1/genesis";
import * as _70 from "./mint/v1beta1/mint";
import * as _71 from "./mint/v1beta1/query";
import * as _72 from "./mint/v1beta1/tx";
import * as _73 from "./msg/v1/msg";
import * as _74 from "./orm/v1/orm";
import * as _75 from "./params/v1beta1/params";
import * as _76 from "./params/v1beta1/query";
import * as _77 from "./query/v1/query";
import * as _78 from "./slashing/v1beta1/genesis";
import * as _79 from "./slashing/v1beta1/query";
import * as _80 from "./slashing/v1beta1/slashing";
import * as _81 from "./slashing/v1beta1/tx";
import * as _82 from "./staking/v1beta1/authz";
import * as _83 from "./staking/v1beta1/genesis";
import * as _84 from "./staking/v1beta1/query";
import * as _85 from "./staking/v1beta1/staking";
import * as _86 from "./staking/v1beta1/tx";
import * as _87 from "./tx/signing/v1beta1/signing";
import * as _88 from "./tx/v1beta1/service";
import * as _89 from "./tx/v1beta1/tx";
import * as _90 from "./upgrade/v1beta1/query";
import * as _91 from "./upgrade/v1beta1/tx";
import * as _92 from "./upgrade/v1beta1/upgrade";
import * as _356 from "./adminmodule/adminmodule/tx.amino";
import * as _357 from "./auth/v1beta1/tx.amino";
import * as _358 from "./authz/v1beta1/tx.amino";
import * as _359 from "./bank/v1beta1/tx.amino";
import * as _360 from "./distribution/v1beta1/tx.amino";
import * as _361 from "./feegrant/v1beta1/tx.amino";
import * as _362 from "./gov/v1/tx.amino";
import * as _363 from "./gov/v1beta1/tx.amino";
import * as _364 from "./mint/v1beta1/tx.amino";
import * as _365 from "./slashing/v1beta1/tx.amino";
import * as _366 from "./staking/v1beta1/tx.amino";
import * as _367 from "./upgrade/v1beta1/tx.amino";
import * as _368 from "./adminmodule/adminmodule/tx.registry";
import * as _369 from "./auth/v1beta1/tx.registry";
import * as _370 from "./authz/v1beta1/tx.registry";
import * as _371 from "./bank/v1beta1/tx.registry";
import * as _372 from "./distribution/v1beta1/tx.registry";
import * as _373 from "./feegrant/v1beta1/tx.registry";
import * as _374 from "./gov/v1/tx.registry";
import * as _375 from "./gov/v1beta1/tx.registry";
import * as _376 from "./mint/v1beta1/tx.registry";
import * as _377 from "./slashing/v1beta1/tx.registry";
import * as _378 from "./staking/v1beta1/tx.registry";
import * as _379 from "./upgrade/v1beta1/tx.registry";
import * as _380 from "./adminmodule/adminmodule/query.rpc.Query";
import * as _381 from "./auth/v1beta1/query.rpc.Query";
import * as _382 from "./authz/v1beta1/query.rpc.Query";
import * as _383 from "./bank/v1beta1/query.rpc.Query";
import * as _384 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _385 from "./distribution/v1beta1/query.rpc.Query";
import * as _386 from "./feegrant/v1beta1/query.rpc.Query";
import * as _387 from "./gov/v1/query.rpc.Query";
import * as _388 from "./gov/v1beta1/query.rpc.Query";
import * as _389 from "./mint/v1beta1/query.rpc.Query";
import * as _390 from "./params/v1beta1/query.rpc.Query";
import * as _391 from "./slashing/v1beta1/query.rpc.Query";
import * as _392 from "./staking/v1beta1/query.rpc.Query";
import * as _393 from "./tx/v1beta1/service.rpc.Service";
import * as _394 from "./upgrade/v1beta1/query.rpc.Query";
import * as _395 from "./adminmodule/adminmodule/tx.rpc.msg";
import * as _396 from "./auth/v1beta1/tx.rpc.msg";
import * as _397 from "./authz/v1beta1/tx.rpc.msg";
import * as _398 from "./bank/v1beta1/tx.rpc.msg";
import * as _399 from "./distribution/v1beta1/tx.rpc.msg";
import * as _400 from "./feegrant/v1beta1/tx.rpc.msg";
import * as _401 from "./gov/v1/tx.rpc.msg";
import * as _402 from "./gov/v1beta1/tx.rpc.msg";
import * as _403 from "./mint/v1beta1/tx.rpc.msg";
import * as _404 from "./slashing/v1beta1/tx.rpc.msg";
import * as _405 from "./staking/v1beta1/tx.rpc.msg";
import * as _406 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _587 from "./rpc.query";
import * as _588 from "./rpc.tx";
export namespace cosmos {
  export namespace adminmodule {
    export const adminmodule = {
      ..._28,
      ..._29,
      ..._30,
      ..._356,
      ..._368,
      ..._380,
      ..._395
    };
  }
  export namespace auth {
    export const v1beta1 = {
      ..._31,
      ..._32,
      ..._33,
      ..._34,
      ..._357,
      ..._369,
      ..._381,
      ..._396
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._35,
      ..._36,
      ..._37,
      ..._38,
      ..._39,
      ..._358,
      ..._370,
      ..._382,
      ..._397
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._40,
      ..._41,
      ..._42,
      ..._43,
      ..._44,
      ..._359,
      ..._371,
      ..._383,
      ..._398
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._45
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._46
      };
    }
    export namespace tendermint {
      export const v1beta1 = {
        ..._47,
        ..._48,
        ..._384
      };
    }
    export const v1beta1 = {
      ..._49
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._50
    };
    export const multisig = {
      ..._51
    };
    export const secp256k1 = {
      ..._52
    };
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._53,
      ..._54,
      ..._55,
      ..._56,
      ..._360,
      ..._372,
      ..._385,
      ..._399
    };
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._57,
      ..._58,
      ..._59,
      ..._60,
      ..._361,
      ..._373,
      ..._386,
      ..._400
    };
  }
  export namespace gov {
    export const v1 = {
      ..._61,
      ..._62,
      ..._63,
      ..._64,
      ..._362,
      ..._374,
      ..._387,
      ..._401
    };
    export const v1beta1 = {
      ..._65,
      ..._66,
      ..._67,
      ..._68,
      ..._363,
      ..._375,
      ..._388,
      ..._402
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._69,
      ..._70,
      ..._71,
      ..._72,
      ..._364,
      ..._376,
      ..._389,
      ..._403
    };
  }
  export namespace msg {
    export const v1 = {
      ..._73
    };
  }
  export namespace orm {
    export const v1 = {
      ..._74
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._75,
      ..._76,
      ..._390
    };
  }
  export namespace query {
    export const v1 = {
      ..._77
    };
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._78,
      ..._79,
      ..._80,
      ..._81,
      ..._365,
      ..._377,
      ..._391,
      ..._404
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._82,
      ..._83,
      ..._84,
      ..._85,
      ..._86,
      ..._366,
      ..._378,
      ..._392,
      ..._405
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._87
      };
    }
    export const v1beta1 = {
      ..._88,
      ..._89,
      ..._393
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._90,
      ..._91,
      ..._92,
      ..._367,
      ..._379,
      ..._394,
      ..._406
    };
  }
  export const ClientFactory = {
    ..._587,
    ..._588
  };
}