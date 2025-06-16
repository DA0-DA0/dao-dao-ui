import { MsgUpdateParams, MsgCreatePool, MsgUpdateRewardTokenWeight, MsgAddRewardTokenToPool, MsgBond, MsgUnbond, MsgClaimReward, MsgClaimUnbonding, MsgCancelUnbonding, MsgIncentivizePool } from "./tx";
export const AminoConverter = {
  "/pryzm.incentives.v1.MsgUpdateParams": {
    aminoType: "pryzm/incentives/v1/UpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/pryzm.incentives.v1.MsgCreatePool": {
    aminoType: "pryzm/incentives/v1/CreatePool",
    toAmino: MsgCreatePool.toAmino,
    fromAmino: MsgCreatePool.fromAmino
  },
  "/pryzm.incentives.v1.MsgUpdateRewardTokenWeight": {
    aminoType: "pryzm/incentives/v1/UpdateRewardWeight",
    toAmino: MsgUpdateRewardTokenWeight.toAmino,
    fromAmino: MsgUpdateRewardTokenWeight.fromAmino
  },
  "/pryzm.incentives.v1.MsgAddRewardTokenToPool": {
    aminoType: "pryzm/incentives/v1/AddRewardToken",
    toAmino: MsgAddRewardTokenToPool.toAmino,
    fromAmino: MsgAddRewardTokenToPool.fromAmino
  },
  "/pryzm.incentives.v1.MsgBond": {
    aminoType: "pryzm/incentives/v1/Bond",
    toAmino: MsgBond.toAmino,
    fromAmino: MsgBond.fromAmino
  },
  "/pryzm.incentives.v1.MsgUnbond": {
    aminoType: "pryzm/incentives/v1/Unbond",
    toAmino: MsgUnbond.toAmino,
    fromAmino: MsgUnbond.fromAmino
  },
  "/pryzm.incentives.v1.MsgClaimReward": {
    aminoType: "pryzm/incentives/v1/ClaimReward",
    toAmino: MsgClaimReward.toAmino,
    fromAmino: MsgClaimReward.fromAmino
  },
  "/pryzm.incentives.v1.MsgClaimUnbonding": {
    aminoType: "pryzm/incentives/v1/ClaimUnbonding",
    toAmino: MsgClaimUnbonding.toAmino,
    fromAmino: MsgClaimUnbonding.fromAmino
  },
  "/pryzm.incentives.v1.MsgCancelUnbonding": {
    aminoType: "pryzm/incentives/v1/CancelUnbonding",
    toAmino: MsgCancelUnbonding.toAmino,
    fromAmino: MsgCancelUnbonding.fromAmino
  },
  "/pryzm.incentives.v1.MsgIncentivizePool": {
    aminoType: "pryzm/incentives/v1/IncentivizePool",
    toAmino: MsgIncentivizePool.toAmino,
    fromAmino: MsgIncentivizePool.fromAmino
  }
};