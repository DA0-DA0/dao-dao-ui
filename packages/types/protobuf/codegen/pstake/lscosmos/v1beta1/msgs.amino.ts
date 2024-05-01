import { MsgLiquidStake, MsgLiquidUnstake, MsgRedeem, MsgClaim, MsgRecreateICA, MsgJumpStart, MsgChangeModuleState, MsgReportSlashing } from "./msgs";
export const AminoConverter = {
  "/pstake.lscosmos.v1beta1.MsgLiquidStake": {
    aminoType: "/pstake.lscosmos.v1beta1.MsgLiquidStake",
    toAmino: MsgLiquidStake.toAmino,
    fromAmino: MsgLiquidStake.fromAmino
  },
  "/pstake.lscosmos.v1beta1.MsgLiquidUnstake": {
    aminoType: "/pstake.lscosmos.v1beta1.MsgLiquidUnstake",
    toAmino: MsgLiquidUnstake.toAmino,
    fromAmino: MsgLiquidUnstake.fromAmino
  },
  "/pstake.lscosmos.v1beta1.MsgRedeem": {
    aminoType: "/pstake.lscosmos.v1beta1.MsgRedeem",
    toAmino: MsgRedeem.toAmino,
    fromAmino: MsgRedeem.fromAmino
  },
  "/pstake.lscosmos.v1beta1.MsgClaim": {
    aminoType: "/pstake.lscosmos.v1beta1.MsgClaim",
    toAmino: MsgClaim.toAmino,
    fromAmino: MsgClaim.fromAmino
  },
  "/pstake.lscosmos.v1beta1.MsgRecreateICA": {
    aminoType: "/pstake.lscosmos.v1beta1.MsgRecreateICA",
    toAmino: MsgRecreateICA.toAmino,
    fromAmino: MsgRecreateICA.fromAmino
  },
  "/pstake.lscosmos.v1beta1.MsgJumpStart": {
    aminoType: "/pstake.lscosmos.v1beta1.MsgJumpStart",
    toAmino: MsgJumpStart.toAmino,
    fromAmino: MsgJumpStart.fromAmino
  },
  "/pstake.lscosmos.v1beta1.MsgChangeModuleState": {
    aminoType: "/pstake.lscosmos.v1beta1.MsgChangeModuleState",
    toAmino: MsgChangeModuleState.toAmino,
    fromAmino: MsgChangeModuleState.fromAmino
  },
  "/pstake.lscosmos.v1beta1.MsgReportSlashing": {
    aminoType: "/pstake.lscosmos.v1beta1.MsgReportSlashing",
    toAmino: MsgReportSlashing.toAmino,
    fromAmino: MsgReportSlashing.fromAmino
  }
};