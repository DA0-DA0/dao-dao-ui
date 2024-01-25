//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgDeposit, MsgWithdrawal, MsgPlaceLimitOrder, MsgWithdrawFilledLimitOrder, MsgCancelLimitOrder, MsgMultiHopSwap, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/neutron.dex.MsgDeposit", MsgDeposit], ["/neutron.dex.MsgWithdrawal", MsgWithdrawal], ["/neutron.dex.MsgPlaceLimitOrder", MsgPlaceLimitOrder], ["/neutron.dex.MsgWithdrawFilledLimitOrder", MsgWithdrawFilledLimitOrder], ["/neutron.dex.MsgCancelLimitOrder", MsgCancelLimitOrder], ["/neutron.dex.MsgMultiHopSwap", MsgMultiHopSwap], ["/neutron.dex.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    deposit(value: MsgDeposit) {
      return {
        typeUrl: "/neutron.dex.MsgDeposit",
        value: MsgDeposit.encode(value).finish()
      };
    },
    withdrawal(value: MsgWithdrawal) {
      return {
        typeUrl: "/neutron.dex.MsgWithdrawal",
        value: MsgWithdrawal.encode(value).finish()
      };
    },
    placeLimitOrder(value: MsgPlaceLimitOrder) {
      return {
        typeUrl: "/neutron.dex.MsgPlaceLimitOrder",
        value: MsgPlaceLimitOrder.encode(value).finish()
      };
    },
    withdrawFilledLimitOrder(value: MsgWithdrawFilledLimitOrder) {
      return {
        typeUrl: "/neutron.dex.MsgWithdrawFilledLimitOrder",
        value: MsgWithdrawFilledLimitOrder.encode(value).finish()
      };
    },
    cancelLimitOrder(value: MsgCancelLimitOrder) {
      return {
        typeUrl: "/neutron.dex.MsgCancelLimitOrder",
        value: MsgCancelLimitOrder.encode(value).finish()
      };
    },
    multiHopSwap(value: MsgMultiHopSwap) {
      return {
        typeUrl: "/neutron.dex.MsgMultiHopSwap",
        value: MsgMultiHopSwap.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/neutron.dex.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    deposit(value: MsgDeposit) {
      return {
        typeUrl: "/neutron.dex.MsgDeposit",
        value
      };
    },
    withdrawal(value: MsgWithdrawal) {
      return {
        typeUrl: "/neutron.dex.MsgWithdrawal",
        value
      };
    },
    placeLimitOrder(value: MsgPlaceLimitOrder) {
      return {
        typeUrl: "/neutron.dex.MsgPlaceLimitOrder",
        value
      };
    },
    withdrawFilledLimitOrder(value: MsgWithdrawFilledLimitOrder) {
      return {
        typeUrl: "/neutron.dex.MsgWithdrawFilledLimitOrder",
        value
      };
    },
    cancelLimitOrder(value: MsgCancelLimitOrder) {
      return {
        typeUrl: "/neutron.dex.MsgCancelLimitOrder",
        value
      };
    },
    multiHopSwap(value: MsgMultiHopSwap) {
      return {
        typeUrl: "/neutron.dex.MsgMultiHopSwap",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/neutron.dex.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    deposit(value: MsgDeposit) {
      return {
        typeUrl: "/neutron.dex.MsgDeposit",
        value: MsgDeposit.fromPartial(value)
      };
    },
    withdrawal(value: MsgWithdrawal) {
      return {
        typeUrl: "/neutron.dex.MsgWithdrawal",
        value: MsgWithdrawal.fromPartial(value)
      };
    },
    placeLimitOrder(value: MsgPlaceLimitOrder) {
      return {
        typeUrl: "/neutron.dex.MsgPlaceLimitOrder",
        value: MsgPlaceLimitOrder.fromPartial(value)
      };
    },
    withdrawFilledLimitOrder(value: MsgWithdrawFilledLimitOrder) {
      return {
        typeUrl: "/neutron.dex.MsgWithdrawFilledLimitOrder",
        value: MsgWithdrawFilledLimitOrder.fromPartial(value)
      };
    },
    cancelLimitOrder(value: MsgCancelLimitOrder) {
      return {
        typeUrl: "/neutron.dex.MsgCancelLimitOrder",
        value: MsgCancelLimitOrder.fromPartial(value)
      };
    },
    multiHopSwap(value: MsgMultiHopSwap) {
      return {
        typeUrl: "/neutron.dex.MsgMultiHopSwap",
        value: MsgMultiHopSwap.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/neutron.dex.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};