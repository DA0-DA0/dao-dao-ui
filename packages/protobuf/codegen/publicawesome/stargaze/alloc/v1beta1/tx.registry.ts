//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateVestingAccount, MsgFundFairburnPool } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccount", MsgCreateVestingAccount], ["/publicawesome.stargaze.alloc.v1beta1.MsgFundFairburnPool", MsgFundFairburnPool]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createVestingAccount(value: MsgCreateVestingAccount) {
      return {
        typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccount",
        value: MsgCreateVestingAccount.encode(value).finish()
      };
    },
    fundFairburnPool(value: MsgFundFairburnPool) {
      return {
        typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgFundFairburnPool",
        value: MsgFundFairburnPool.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createVestingAccount(value: MsgCreateVestingAccount) {
      return {
        typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccount",
        value
      };
    },
    fundFairburnPool(value: MsgFundFairburnPool) {
      return {
        typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgFundFairburnPool",
        value
      };
    }
  },
  fromPartial: {
    createVestingAccount(value: MsgCreateVestingAccount) {
      return {
        typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccount",
        value: MsgCreateVestingAccount.fromPartial(value)
      };
    },
    fundFairburnPool(value: MsgFundFairburnPool) {
      return {
        typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgFundFairburnPool",
        value: MsgFundFairburnPool.fromPartial(value)
      };
    }
  }
};