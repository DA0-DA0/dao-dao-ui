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
  neutron: {
    cron: new (await import("./cron/tx.rpc.msg")).MsgClientImpl(rpc),
    dex: new (await import("./dex/tx.rpc.msg")).MsgClientImpl(rpc),
    feeburner: new (await import("./feeburner/tx.rpc.msg")).MsgClientImpl(rpc),
    feerefunder: new (await import("./feerefunder/tx.rpc.msg")).MsgClientImpl(rpc),
    interchainqueries: new (await import("./interchainqueries/tx.rpc.msg")).MsgClientImpl(rpc),
    interchaintxs: {
      v1: new (await import("./interchaintxs/v1/tx.rpc.msg")).MsgClientImpl(rpc)
    }
  }
});