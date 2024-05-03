import { Rpc } from "../helpers";
export const createRPCMsgClient = async ({
  rpc
}: {
  rpc: Rpc;
}) => ({
  cosmos: {
    adminmodule: {
      adminmodule: new (await import("./adminmodule/adminmodule/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    auth: {
      v1beta1: new (await import("./auth/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    authz: {
      v1beta1: new (await import("./authz/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    bank: {
      v1beta1: new (await import("./bank/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    distribution: {
      v1beta1: new (await import("./distribution/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    feegrant: {
      v1beta1: new (await import("./feegrant/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    gov: {
      v1: new (await import("./gov/v1/tx.rpc.msg")).MsgClientImpl(rpc),
      v1beta1: new (await import("./gov/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    mint: {
      v1beta1: new (await import("./mint/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    slashing: {
      v1beta1: new (await import("./slashing/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    staking: {
      v1beta1: new (await import("./staking/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    },
    upgrade: {
      v1beta1: new (await import("./upgrade/v1beta1/tx.rpc.msg")).MsgClientImpl(rpc)
    }
  }
});