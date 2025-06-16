import { MsgUpdateParams, MsgRegisterHostChain, MsgUpdateHostChain, MsgStake, MsgStakeLsmShares, MsgUnstake, MsgRedeemUnstaked, MsgInstantUnstake, MsgRebalanceDelegations, MsgRedelegate, MsgRegisterInterchainAccount, MsgCreateMultiSigConnection, MsgUpdateMultiSigConnection, MsgAcknowledgeMultiSigPacket, MsgRegisterHostAccounts, MsgRetryFailedLsmTransfer } from "./tx";
export const AminoConverter = {
  "/pryzm.icstaking.v1.MsgUpdateParams": {
    aminoType: "pryzm/icstaking/v1/UpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/pryzm.icstaking.v1.MsgRegisterHostChain": {
    aminoType: "pryzm/icstaking/v1/RegisterHostChain",
    toAmino: MsgRegisterHostChain.toAmino,
    fromAmino: MsgRegisterHostChain.fromAmino
  },
  "/pryzm.icstaking.v1.MsgUpdateHostChain": {
    aminoType: "pryzm/icstaking/v1/UpdateHostChain",
    toAmino: MsgUpdateHostChain.toAmino,
    fromAmino: MsgUpdateHostChain.fromAmino
  },
  "/pryzm.icstaking.v1.MsgStake": {
    aminoType: "pryzm/icstaking/v1/Stake",
    toAmino: MsgStake.toAmino,
    fromAmino: MsgStake.fromAmino
  },
  "/pryzm.icstaking.v1.MsgStakeLsmShares": {
    aminoType: "pryzm/icstaking/v1/StakeLsmShares",
    toAmino: MsgStakeLsmShares.toAmino,
    fromAmino: MsgStakeLsmShares.fromAmino
  },
  "/pryzm.icstaking.v1.MsgUnstake": {
    aminoType: "pryzm/icstaking/v1/Unstake",
    toAmino: MsgUnstake.toAmino,
    fromAmino: MsgUnstake.fromAmino
  },
  "/pryzm.icstaking.v1.MsgRedeemUnstaked": {
    aminoType: "pryzm/icstaking/v1/RedeemUnstaked",
    toAmino: MsgRedeemUnstaked.toAmino,
    fromAmino: MsgRedeemUnstaked.fromAmino
  },
  "/pryzm.icstaking.v1.MsgInstantUnstake": {
    aminoType: "pryzm/icstaking/v1/InstantUnstake",
    toAmino: MsgInstantUnstake.toAmino,
    fromAmino: MsgInstantUnstake.fromAmino
  },
  "/pryzm.icstaking.v1.MsgRebalanceDelegations": {
    aminoType: "pryzm/icstaking/v1/RebalanceDelegations",
    toAmino: MsgRebalanceDelegations.toAmino,
    fromAmino: MsgRebalanceDelegations.fromAmino
  },
  "/pryzm.icstaking.v1.MsgRedelegate": {
    aminoType: "pryzm/icstaking/v1/Redelegate",
    toAmino: MsgRedelegate.toAmino,
    fromAmino: MsgRedelegate.fromAmino
  },
  "/pryzm.icstaking.v1.MsgRegisterInterchainAccount": {
    aminoType: "pryzm/icstaking/v1/RegInterchainAccount",
    toAmino: MsgRegisterInterchainAccount.toAmino,
    fromAmino: MsgRegisterInterchainAccount.fromAmino
  },
  "/pryzm.icstaking.v1.MsgCreateMultiSigConnection": {
    aminoType: "pryzm/icstaking/v1/CreateMultiSigConn",
    toAmino: MsgCreateMultiSigConnection.toAmino,
    fromAmino: MsgCreateMultiSigConnection.fromAmino
  },
  "/pryzm.icstaking.v1.MsgUpdateMultiSigConnection": {
    aminoType: "pryzm/icstaking/v1/UpdateMultiSigConn",
    toAmino: MsgUpdateMultiSigConnection.toAmino,
    fromAmino: MsgUpdateMultiSigConnection.fromAmino
  },
  "/pryzm.icstaking.v1.MsgAcknowledgeMultiSigPacket": {
    aminoType: "pryzm/icstaking/v1/AckMultiSigPacket",
    toAmino: MsgAcknowledgeMultiSigPacket.toAmino,
    fromAmino: MsgAcknowledgeMultiSigPacket.fromAmino
  },
  "/pryzm.icstaking.v1.MsgRegisterHostAccounts": {
    aminoType: "pryzm/icstaking/v1/RegisterHostAccounts",
    toAmino: MsgRegisterHostAccounts.toAmino,
    fromAmino: MsgRegisterHostAccounts.fromAmino
  },
  "/pryzm.icstaking.v1.MsgRetryFailedLsmTransfer": {
    aminoType: "pryzm/icstaking/v1/RetryFailLsmTransfer",
    toAmino: MsgRetryFailedLsmTransfer.toAmino,
    fromAmino: MsgRetryFailedLsmTransfer.fromAmino
  }
};