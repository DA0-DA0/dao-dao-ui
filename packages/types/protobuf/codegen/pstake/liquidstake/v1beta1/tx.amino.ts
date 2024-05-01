import { MsgLiquidStake, MsgLiquidUnstake, MsgStakeToLP, MsgUpdateParams, MsgUpdateWhitelistedValidators, MsgSetModulePaused } from "./tx";
export const AminoConverter = {
  "/pstake.liquidstake.v1beta1.MsgLiquidStake": {
    aminoType: "/pstake.liquidstake.v1beta1.MsgLiquidStake",
    toAmino: MsgLiquidStake.toAmino,
    fromAmino: MsgLiquidStake.fromAmino
  },
  "/pstake.liquidstake.v1beta1.MsgLiquidUnstake": {
    aminoType: "/pstake.liquidstake.v1beta1.MsgLiquidUnstake",
    toAmino: MsgLiquidUnstake.toAmino,
    fromAmino: MsgLiquidUnstake.fromAmino
  },
  "/pstake.liquidstake.v1beta1.MsgStakeToLP": {
    aminoType: "/pstake.liquidstake.v1beta1.MsgStakeToLP",
    toAmino: MsgStakeToLP.toAmino,
    fromAmino: MsgStakeToLP.fromAmino
  },
  "/pstake.liquidstake.v1beta1.MsgUpdateParams": {
    aminoType: "/pstake.liquidstake.v1beta1.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/pstake.liquidstake.v1beta1.MsgUpdateWhitelistedValidators": {
    aminoType: "/pstake.liquidstake.v1beta1.MsgUpdateWhitelistedValidators",
    toAmino: MsgUpdateWhitelistedValidators.toAmino,
    fromAmino: MsgUpdateWhitelistedValidators.fromAmino
  },
  "/pstake.liquidstake.v1beta1.MsgSetModulePaused": {
    aminoType: "/pstake.liquidstake.v1beta1.MsgSetModulePaused",
    toAmino: MsgSetModulePaused.toAmino,
    fromAmino: MsgSetModulePaused.fromAmino
  }
};