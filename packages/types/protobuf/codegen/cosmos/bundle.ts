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
import * as _67 from "./ics23/v1/proofs";
import * as _68 from "./mint/v1beta1/genesis";
import * as _69 from "./mint/v1beta1/mint";
import * as _70 from "./mint/v1beta1/query";
import * as _71 from "./mint/v1beta1/tx";
import * as _72 from "./msg/v1/msg";
import * as _73 from "./orm/v1/orm";
import * as _74 from "./params/v1beta1/params";
import * as _75 from "./params/v1beta1/query";
import * as _76 from "./query/v1/query";
import * as _77 from "./slashing/v1beta1/genesis";
import * as _78 from "./slashing/v1beta1/query";
import * as _79 from "./slashing/v1beta1/slashing";
import * as _80 from "./slashing/v1beta1/tx";
import * as _81 from "./staking/v1beta1/authz";
import * as _82 from "./staking/v1beta1/genesis";
import * as _83 from "./staking/v1beta1/query";
import * as _84 from "./staking/v1beta1/staking";
import * as _85 from "./staking/v1beta1/tx";
import * as _86 from "./tx/signing/v1beta1/signing";
import * as _87 from "./tx/v1beta1/service";
import * as _88 from "./tx/v1beta1/tx";
import * as _89 from "./upgrade/v1beta1/query";
import * as _90 from "./upgrade/v1beta1/tx";
import * as _91 from "./upgrade/v1beta1/upgrade";
import * as _391 from "./auth/v1beta1/tx.amino";
import * as _392 from "./authz/v1beta1/tx.amino";
import * as _393 from "./bank/v1beta1/tx.amino";
import * as _394 from "./distribution/v1beta1/tx.amino";
import * as _395 from "./feegrant/v1beta1/tx.amino";
import * as _396 from "./gov/v1/tx.amino";
import * as _397 from "./gov/v1beta1/tx.amino";
import * as _398 from "./mint/v1beta1/tx.amino";
import * as _399 from "./slashing/v1beta1/tx.amino";
import * as _400 from "./staking/v1beta1/tx.amino";
import * as _401 from "./upgrade/v1beta1/tx.amino";
import * as _402 from "./auth/v1beta1/tx.registry";
import * as _403 from "./authz/v1beta1/tx.registry";
import * as _404 from "./bank/v1beta1/tx.registry";
import * as _405 from "./distribution/v1beta1/tx.registry";
import * as _406 from "./feegrant/v1beta1/tx.registry";
import * as _407 from "./gov/v1/tx.registry";
import * as _408 from "./gov/v1beta1/tx.registry";
import * as _409 from "./mint/v1beta1/tx.registry";
import * as _410 from "./slashing/v1beta1/tx.registry";
import * as _411 from "./staking/v1beta1/tx.registry";
import * as _412 from "./upgrade/v1beta1/tx.registry";
import * as _413 from "./auth/v1beta1/query.rpc.Query";
import * as _414 from "./authz/v1beta1/query.rpc.Query";
import * as _415 from "./bank/v1beta1/query.rpc.Query";
import * as _416 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _417 from "./distribution/v1beta1/query.rpc.Query";
import * as _418 from "./feegrant/v1beta1/query.rpc.Query";
import * as _419 from "./gov/v1/query.rpc.Query";
import * as _420 from "./gov/v1beta1/query.rpc.Query";
import * as _421 from "./mint/v1beta1/query.rpc.Query";
import * as _422 from "./params/v1beta1/query.rpc.Query";
import * as _423 from "./slashing/v1beta1/query.rpc.Query";
import * as _424 from "./staking/v1beta1/query.rpc.Query";
import * as _425 from "./tx/v1beta1/service.rpc.Service";
import * as _426 from "./upgrade/v1beta1/query.rpc.Query";
import * as _427 from "./auth/v1beta1/tx.rpc.msg";
import * as _428 from "./authz/v1beta1/tx.rpc.msg";
import * as _429 from "./bank/v1beta1/tx.rpc.msg";
import * as _430 from "./distribution/v1beta1/tx.rpc.msg";
import * as _431 from "./feegrant/v1beta1/tx.rpc.msg";
import * as _432 from "./gov/v1/tx.rpc.msg";
import * as _433 from "./gov/v1beta1/tx.rpc.msg";
import * as _434 from "./mint/v1beta1/tx.rpc.msg";
import * as _435 from "./slashing/v1beta1/tx.rpc.msg";
import * as _436 from "./staking/v1beta1/tx.rpc.msg";
import * as _437 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _648 from "./rpc.query";
import * as _649 from "./rpc.tx";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._29,
      ..._30,
      ..._31,
      ..._32,
      ..._391,
      ..._402,
      ..._413,
      ..._427
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._37,
      ..._392,
      ..._403,
      ..._414,
      ..._428
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._38,
      ..._39,
      ..._40,
      ..._41,
      ..._42,
      ..._393,
      ..._404,
      ..._415,
      ..._429
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
        ..._416
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
      ..._394,
      ..._405,
      ..._417,
      ..._430
    };
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._55,
      ..._56,
      ..._57,
      ..._58,
      ..._395,
      ..._406,
      ..._418,
      ..._431
    };
  }
  export namespace gov {
    export const v1 = {
      ..._59,
      ..._60,
      ..._61,
      ..._62,
      ..._396,
      ..._407,
      ..._419,
      ..._432
    };
    export const v1beta1 = {
      ..._63,
      ..._64,
      ..._65,
      ..._66,
      ..._397,
      ..._408,
      ..._420,
      ..._433
    };
  }
  export namespace ics23 {
    export const v1 = {
      ..._67
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._68,
      ..._69,
      ..._70,
      ..._71,
      ..._398,
      ..._409,
      ..._421,
      ..._434
    };
  }
  export namespace msg {
    export const v1 = {
      ..._72
    };
  }
  export namespace orm {
    export const v1 = {
      ..._73
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._74,
      ..._75,
      ..._422
    };
  }
  export namespace query {
    export const v1 = {
      ..._76
    };
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._77,
      ..._78,
      ..._79,
      ..._80,
      ..._399,
      ..._410,
      ..._423,
      ..._435
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._81,
      ..._82,
      ..._83,
      ..._84,
      ..._85,
      ..._400,
      ..._411,
      ..._424,
      ..._436
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._86
      };
    }
    export const v1beta1 = {
      ..._87,
      ..._88,
      ..._425
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._89,
      ..._90,
      ..._91,
      ..._401,
      ..._412,
      ..._426,
      ..._437
    };
  }
  export const ClientFactory = {
    ..._648,
    ..._649
  };
}