import { MsgRegisterHostChain, MsgUpdateHostChain, MsgLiquidStake, MsgLiquidStakeLSM, MsgLiquidUnstake, MsgRedeem, MsgUpdateParams } from "./msgs";
export const AminoConverter = {
  "/pstake.liquidstakeibc.v1beta1.MsgRegisterHostChain": {
    aminoType: "pstake/MsgRegisterHostChain",
    toAmino: MsgRegisterHostChain.toAmino,
    fromAmino: MsgRegisterHostChain.fromAmino
  },
  "/pstake.liquidstakeibc.v1beta1.MsgUpdateHostChain": {
    aminoType: "pstake/MsgUpdateHostChain",
    toAmino: MsgUpdateHostChain.toAmino,
    fromAmino: MsgUpdateHostChain.fromAmino
  },
  "/pstake.liquidstakeibc.v1beta1.MsgLiquidStake": {
    aminoType: "pstake/MsgLiquidStake",
    toAmino: MsgLiquidStake.toAmino,
    fromAmino: MsgLiquidStake.fromAmino
  },
  "/pstake.liquidstakeibc.v1beta1.MsgLiquidStakeLSM": {
    aminoType: "pstake/MsgLiquidStakeLSM",
    toAmino: MsgLiquidStakeLSM.toAmino,
    fromAmino: MsgLiquidStakeLSM.fromAmino
  },
  "/pstake.liquidstakeibc.v1beta1.MsgLiquidUnstake": {
    aminoType: "pstake/MsgLiquidUnstake",
    toAmino: MsgLiquidUnstake.toAmino,
    fromAmino: MsgLiquidUnstake.fromAmino
  },
  "/pstake.liquidstakeibc.v1beta1.MsgRedeem": {
    aminoType: "pstake/MsgRedeem",
    toAmino: MsgRedeem.toAmino,
    fromAmino: MsgRedeem.fromAmino
  },
  "/pstake.liquidstakeibc.v1beta1.MsgUpdateParams": {
    aminoType: "pstake/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};