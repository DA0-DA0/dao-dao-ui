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
import * as _55 from "./evidence/v1beta1/evidence";
import * as _56 from "./feegrant/v1beta1/feegrant";
import * as _57 from "./feegrant/v1beta1/genesis";
import * as _58 from "./feegrant/v1beta1/query";
import * as _59 from "./feegrant/v1beta1/tx";
import * as _60 from "./gov/v1/genesis";
import * as _61 from "./gov/v1/gov";
import * as _62 from "./gov/v1/query";
import * as _63 from "./gov/v1/tx";
import * as _64 from "./gov/v1beta1/genesis";
import * as _65 from "./gov/v1beta1/gov";
import * as _66 from "./gov/v1beta1/query";
import * as _67 from "./gov/v1beta1/tx";
import * as _68 from "./ics23/v1/proofs";
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
import * as _569 from "./auth/v1beta1/tx.amino";
import * as _570 from "./authz/v1beta1/tx.amino";
import * as _571 from "./bank/v1beta1/tx.amino";
import * as _572 from "./distribution/v1beta1/tx.amino";
import * as _573 from "./feegrant/v1beta1/tx.amino";
import * as _574 from "./gov/v1/tx.amino";
import * as _575 from "./gov/v1beta1/tx.amino";
import * as _576 from "./mint/v1beta1/tx.amino";
import * as _577 from "./slashing/v1beta1/tx.amino";
import * as _578 from "./staking/v1beta1/tx.amino";
import * as _579 from "./upgrade/v1beta1/tx.amino";
import * as _580 from "./auth/v1beta1/tx.registry";
import * as _581 from "./authz/v1beta1/tx.registry";
import * as _582 from "./bank/v1beta1/tx.registry";
import * as _583 from "./distribution/v1beta1/tx.registry";
import * as _584 from "./feegrant/v1beta1/tx.registry";
import * as _585 from "./gov/v1/tx.registry";
import * as _586 from "./gov/v1beta1/tx.registry";
import * as _587 from "./mint/v1beta1/tx.registry";
import * as _588 from "./slashing/v1beta1/tx.registry";
import * as _589 from "./staking/v1beta1/tx.registry";
import * as _590 from "./upgrade/v1beta1/tx.registry";
import * as _591 from "./auth/v1beta1/query.rpc.Query";
import * as _592 from "./authz/v1beta1/query.rpc.Query";
import * as _593 from "./bank/v1beta1/query.rpc.Query";
import * as _594 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _595 from "./distribution/v1beta1/query.rpc.Query";
import * as _596 from "./feegrant/v1beta1/query.rpc.Query";
import * as _597 from "./gov/v1/query.rpc.Query";
import * as _598 from "./gov/v1beta1/query.rpc.Query";
import * as _599 from "./mint/v1beta1/query.rpc.Query";
import * as _600 from "./params/v1beta1/query.rpc.Query";
import * as _601 from "./slashing/v1beta1/query.rpc.Query";
import * as _602 from "./staking/v1beta1/query.rpc.Query";
import * as _603 from "./tx/v1beta1/service.rpc.Service";
import * as _604 from "./upgrade/v1beta1/query.rpc.Query";
import * as _605 from "./auth/v1beta1/tx.rpc.msg";
import * as _606 from "./authz/v1beta1/tx.rpc.msg";
import * as _607 from "./bank/v1beta1/tx.rpc.msg";
import * as _608 from "./distribution/v1beta1/tx.rpc.msg";
import * as _609 from "./feegrant/v1beta1/tx.rpc.msg";
import * as _610 from "./gov/v1/tx.rpc.msg";
import * as _611 from "./gov/v1beta1/tx.rpc.msg";
import * as _612 from "./mint/v1beta1/tx.rpc.msg";
import * as _613 from "./slashing/v1beta1/tx.rpc.msg";
import * as _614 from "./staking/v1beta1/tx.rpc.msg";
import * as _615 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _906 from "./rpc.query";
import * as _907 from "./rpc.tx";
export namespace cosmos {
  export namespace auth {
    export const v1beta1 = {
      ..._29,
      ..._30,
      ..._31,
      ..._32,
      ..._569,
      ..._580,
      ..._591,
      ..._605
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._37,
      ..._570,
      ..._581,
      ..._592,
      ..._606
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._38,
      ..._39,
      ..._40,
      ..._41,
      ..._42,
      ..._571,
      ..._582,
      ..._593,
      ..._607
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
        ..._594
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
      ..._572,
      ..._583,
      ..._595,
      ..._608
    };
  }
  export namespace evidence {
    export const v1beta1 = {
      ..._55
    };
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._56,
      ..._57,
      ..._58,
      ..._59,
      ..._573,
      ..._584,
      ..._596,
      ..._609
    };
  }
  export namespace gov {
    export const v1 = {
      ..._60,
      ..._61,
      ..._62,
      ..._63,
      ..._574,
      ..._585,
      ..._597,
      ..._610
    };
    export const v1beta1 = {
      ..._64,
      ..._65,
      ..._66,
      ..._67,
      ..._575,
      ..._586,
      ..._598,
      ..._611
    };
  }
  export namespace ics23 {
    export const v1 = {
      ..._68
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._69,
      ..._70,
      ..._71,
      ..._72,
      ..._576,
      ..._587,
      ..._599,
      ..._612
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
      ..._600
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
      ..._577,
      ..._588,
      ..._601,
      ..._613
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._82,
      ..._83,
      ..._84,
      ..._85,
      ..._86,
      ..._578,
      ..._589,
      ..._602,
      ..._614
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
      ..._603
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._90,
      ..._91,
      ..._92,
      ..._579,
      ..._590,
      ..._604,
      ..._615
    };
  }
  export const ClientFactory = {
    ..._906,
    ..._907
  };
}