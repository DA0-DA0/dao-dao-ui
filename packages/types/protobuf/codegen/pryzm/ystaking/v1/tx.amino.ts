import { MsgBond, MsgUnbond, MsgClaimReward, MsgExitPool } from "./tx";
export const AminoConverter = {
  "/pryzm.ystaking.v1.MsgBond": {
    aminoType: "pryzm/ystaking/v1/Bond",
    toAmino: MsgBond.toAmino,
    fromAmino: MsgBond.fromAmino
  },
  "/pryzm.ystaking.v1.MsgUnbond": {
    aminoType: "pryzm/ystaking/v1/Unbond",
    toAmino: MsgUnbond.toAmino,
    fromAmino: MsgUnbond.fromAmino
  },
  "/pryzm.ystaking.v1.MsgClaimReward": {
    aminoType: "pryzm/ystaking/v1/ClaimReward",
    toAmino: MsgClaimReward.toAmino,
    fromAmino: MsgClaimReward.fromAmino
  },
  "/pryzm.ystaking.v1.MsgExitPool": {
    aminoType: "pryzm/ystaking/v1/ExitPool",
    toAmino: MsgExitPool.toAmino,
    fromAmino: MsgExitPool.fromAmino
  }
};