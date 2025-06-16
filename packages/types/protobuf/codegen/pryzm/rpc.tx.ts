import { Rpc } from "../helpers";
export const createRPCMsgClient = async ({
  rpc
}: {
  rpc: Rpc;
}) => ({
  cosmos: {
    auth: {
      v1beta1: new (await import("../cosmos/auth/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    authz: {
      v1beta1: new (await import("../cosmos/authz/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    bank: {
      v1beta1: new (await import("../cosmos/bank/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    distribution: {
      v1beta1: new (await import("../cosmos/distribution/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    feegrant: {
      v1beta1: new (await import("../cosmos/feegrant/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    gov: {
      v1: new (await import("../cosmos/gov/v1/tx.rpc.msg")).MsgClientImpl(rpc),
      v1beta1: new (await import("../cosmos/gov/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    mint: {
      v1beta1: new (await import("../cosmos/mint/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    slashing: {
      v1beta1: new (await import("../cosmos/slashing/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    staking: {
      v1beta1: new (await import("../cosmos/staking/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    upgrade: {
      v1beta1: new (await import("../cosmos/upgrade/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    }
  },
  pryzm: {
    amm: {
      v1: new (await import("./amm/v1/tx.rpc.msg")).MsgClientImpl(rpc),
      v2: new (await import("./amm/v2/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    assets: {
      v1: new (await import("./assets/v1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    icstaking: {
      v1: new (await import("./icstaking/v1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    incentives: {
      v1: new (await import("./incentives/v1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    mint: {
      v1: new (await import("./mint/v1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    pgov: {
      v1: new (await import("./pgov/v1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    refractor: {
      v1: new (await import("./refractor/v1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    treasury: {
      v1: new (await import("./treasury/v1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    ystaking: {
      v1: new (await import("./ystaking/v1/tx.rpc.msg")).MsgClientImpl(rpc)
    }
  }
});