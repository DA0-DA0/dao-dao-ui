//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgRegisterHostChain, MsgUpdateHostChain, MsgStake, MsgStakeLsmShares, MsgUnstake, MsgRedeemUnstaked, MsgInstantUnstake, MsgRebalanceDelegations, MsgRedelegate, MsgRegisterInterchainAccount, MsgCreateMultiSigConnection, MsgUpdateMultiSigConnection, MsgAcknowledgeMultiSigPacket, MsgRegisterHostAccounts, MsgRetryFailedLsmTransfer } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/pryzm.icstaking.v1.MsgUpdateParams", MsgUpdateParams], ["/pryzm.icstaking.v1.MsgRegisterHostChain", MsgRegisterHostChain], ["/pryzm.icstaking.v1.MsgUpdateHostChain", MsgUpdateHostChain], ["/pryzm.icstaking.v1.MsgStake", MsgStake], ["/pryzm.icstaking.v1.MsgStakeLsmShares", MsgStakeLsmShares], ["/pryzm.icstaking.v1.MsgUnstake", MsgUnstake], ["/pryzm.icstaking.v1.MsgRedeemUnstaked", MsgRedeemUnstaked], ["/pryzm.icstaking.v1.MsgInstantUnstake", MsgInstantUnstake], ["/pryzm.icstaking.v1.MsgRebalanceDelegations", MsgRebalanceDelegations], ["/pryzm.icstaking.v1.MsgRedelegate", MsgRedelegate], ["/pryzm.icstaking.v1.MsgRegisterInterchainAccount", MsgRegisterInterchainAccount], ["/pryzm.icstaking.v1.MsgCreateMultiSigConnection", MsgCreateMultiSigConnection], ["/pryzm.icstaking.v1.MsgUpdateMultiSigConnection", MsgUpdateMultiSigConnection], ["/pryzm.icstaking.v1.MsgAcknowledgeMultiSigPacket", MsgAcknowledgeMultiSigPacket], ["/pryzm.icstaking.v1.MsgRegisterHostAccounts", MsgRegisterHostAccounts], ["/pryzm.icstaking.v1.MsgRetryFailedLsmTransfer", MsgRetryFailedLsmTransfer]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    registerHostChain(value: MsgRegisterHostChain) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostChain",
        value: MsgRegisterHostChain.encode(value).finish()
      };
    },
    updateHostChain(value: MsgUpdateHostChain) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgUpdateHostChain",
        value: MsgUpdateHostChain.encode(value).finish()
      };
    },
    stake(value: MsgStake) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgStake",
        value: MsgStake.encode(value).finish()
      };
    },
    stakeLsmShares(value: MsgStakeLsmShares) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgStakeLsmShares",
        value: MsgStakeLsmShares.encode(value).finish()
      };
    },
    unstake(value: MsgUnstake) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgUnstake",
        value: MsgUnstake.encode(value).finish()
      };
    },
    redeemUnstaked(value: MsgRedeemUnstaked) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRedeemUnstaked",
        value: MsgRedeemUnstaked.encode(value).finish()
      };
    },
    instantUnstake(value: MsgInstantUnstake) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgInstantUnstake",
        value: MsgInstantUnstake.encode(value).finish()
      };
    },
    rebalanceDelegations(value: MsgRebalanceDelegations) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRebalanceDelegations",
        value: MsgRebalanceDelegations.encode(value).finish()
      };
    },
    redelegate(value: MsgRedelegate) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRedelegate",
        value: MsgRedelegate.encode(value).finish()
      };
    },
    registerInterchainAccount(value: MsgRegisterInterchainAccount) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRegisterInterchainAccount",
        value: MsgRegisterInterchainAccount.encode(value).finish()
      };
    },
    createMultiSigConnection(value: MsgCreateMultiSigConnection) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgCreateMultiSigConnection",
        value: MsgCreateMultiSigConnection.encode(value).finish()
      };
    },
    updateMultiSigConnection(value: MsgUpdateMultiSigConnection) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgUpdateMultiSigConnection",
        value: MsgUpdateMultiSigConnection.encode(value).finish()
      };
    },
    acknowledgeMultiSigPacket(value: MsgAcknowledgeMultiSigPacket) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgAcknowledgeMultiSigPacket",
        value: MsgAcknowledgeMultiSigPacket.encode(value).finish()
      };
    },
    registerHostAccounts(value: MsgRegisterHostAccounts) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostAccounts",
        value: MsgRegisterHostAccounts.encode(value).finish()
      };
    },
    retryFailedLsmTransfer(value: MsgRetryFailedLsmTransfer) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRetryFailedLsmTransfer",
        value: MsgRetryFailedLsmTransfer.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgUpdateParams",
        value
      };
    },
    registerHostChain(value: MsgRegisterHostChain) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostChain",
        value
      };
    },
    updateHostChain(value: MsgUpdateHostChain) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgUpdateHostChain",
        value
      };
    },
    stake(value: MsgStake) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgStake",
        value
      };
    },
    stakeLsmShares(value: MsgStakeLsmShares) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgStakeLsmShares",
        value
      };
    },
    unstake(value: MsgUnstake) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgUnstake",
        value
      };
    },
    redeemUnstaked(value: MsgRedeemUnstaked) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRedeemUnstaked",
        value
      };
    },
    instantUnstake(value: MsgInstantUnstake) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgInstantUnstake",
        value
      };
    },
    rebalanceDelegations(value: MsgRebalanceDelegations) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRebalanceDelegations",
        value
      };
    },
    redelegate(value: MsgRedelegate) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRedelegate",
        value
      };
    },
    registerInterchainAccount(value: MsgRegisterInterchainAccount) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRegisterInterchainAccount",
        value
      };
    },
    createMultiSigConnection(value: MsgCreateMultiSigConnection) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgCreateMultiSigConnection",
        value
      };
    },
    updateMultiSigConnection(value: MsgUpdateMultiSigConnection) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgUpdateMultiSigConnection",
        value
      };
    },
    acknowledgeMultiSigPacket(value: MsgAcknowledgeMultiSigPacket) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgAcknowledgeMultiSigPacket",
        value
      };
    },
    registerHostAccounts(value: MsgRegisterHostAccounts) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostAccounts",
        value
      };
    },
    retryFailedLsmTransfer(value: MsgRetryFailedLsmTransfer) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRetryFailedLsmTransfer",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    registerHostChain(value: MsgRegisterHostChain) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostChain",
        value: MsgRegisterHostChain.fromPartial(value)
      };
    },
    updateHostChain(value: MsgUpdateHostChain) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgUpdateHostChain",
        value: MsgUpdateHostChain.fromPartial(value)
      };
    },
    stake(value: MsgStake) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgStake",
        value: MsgStake.fromPartial(value)
      };
    },
    stakeLsmShares(value: MsgStakeLsmShares) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgStakeLsmShares",
        value: MsgStakeLsmShares.fromPartial(value)
      };
    },
    unstake(value: MsgUnstake) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgUnstake",
        value: MsgUnstake.fromPartial(value)
      };
    },
    redeemUnstaked(value: MsgRedeemUnstaked) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRedeemUnstaked",
        value: MsgRedeemUnstaked.fromPartial(value)
      };
    },
    instantUnstake(value: MsgInstantUnstake) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgInstantUnstake",
        value: MsgInstantUnstake.fromPartial(value)
      };
    },
    rebalanceDelegations(value: MsgRebalanceDelegations) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRebalanceDelegations",
        value: MsgRebalanceDelegations.fromPartial(value)
      };
    },
    redelegate(value: MsgRedelegate) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRedelegate",
        value: MsgRedelegate.fromPartial(value)
      };
    },
    registerInterchainAccount(value: MsgRegisterInterchainAccount) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRegisterInterchainAccount",
        value: MsgRegisterInterchainAccount.fromPartial(value)
      };
    },
    createMultiSigConnection(value: MsgCreateMultiSigConnection) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgCreateMultiSigConnection",
        value: MsgCreateMultiSigConnection.fromPartial(value)
      };
    },
    updateMultiSigConnection(value: MsgUpdateMultiSigConnection) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgUpdateMultiSigConnection",
        value: MsgUpdateMultiSigConnection.fromPartial(value)
      };
    },
    acknowledgeMultiSigPacket(value: MsgAcknowledgeMultiSigPacket) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgAcknowledgeMultiSigPacket",
        value: MsgAcknowledgeMultiSigPacket.fromPartial(value)
      };
    },
    registerHostAccounts(value: MsgRegisterHostAccounts) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostAccounts",
        value: MsgRegisterHostAccounts.fromPartial(value)
      };
    },
    retryFailedLsmTransfer(value: MsgRetryFailedLsmTransfer) {
      return {
        typeUrl: "/pryzm.icstaking.v1.MsgRetryFailedLsmTransfer",
        value: MsgRetryFailedLsmTransfer.fromPartial(value)
      };
    }
  }
};