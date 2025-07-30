import { MsgSupply, MsgWithdraw, MsgMaxWithdraw, MsgCollateralize, MsgDecollateralize, MsgBorrow, MsgMaxBorrow, MsgRepay, MsgLiquidate, MsgLeveragedLiquidate, MsgSupplyCollateral, MsgGovUpdateRegistry, MsgGovUpdateSpecialAssets, MsgGovSetParams } from "./tx";
export const AminoConverter = {
  "/umee.leverage.v1.MsgSupply": {
    aminoType: "/umee.leverage.v1.MsgSupply",
    toAmino: MsgSupply.toAmino,
    fromAmino: MsgSupply.fromAmino
  },
  "/umee.leverage.v1.MsgWithdraw": {
    aminoType: "/umee.leverage.v1.MsgWithdraw",
    toAmino: MsgWithdraw.toAmino,
    fromAmino: MsgWithdraw.fromAmino
  },
  "/umee.leverage.v1.MsgMaxWithdraw": {
    aminoType: "/umee.leverage.v1.MsgMaxWithdraw",
    toAmino: MsgMaxWithdraw.toAmino,
    fromAmino: MsgMaxWithdraw.fromAmino
  },
  "/umee.leverage.v1.MsgCollateralize": {
    aminoType: "/umee.leverage.v1.MsgCollateralize",
    toAmino: MsgCollateralize.toAmino,
    fromAmino: MsgCollateralize.fromAmino
  },
  "/umee.leverage.v1.MsgDecollateralize": {
    aminoType: "/umee.leverage.v1.MsgDecollateralize",
    toAmino: MsgDecollateralize.toAmino,
    fromAmino: MsgDecollateralize.fromAmino
  },
  "/umee.leverage.v1.MsgBorrow": {
    aminoType: "/umee.leverage.v1.MsgBorrow",
    toAmino: MsgBorrow.toAmino,
    fromAmino: MsgBorrow.fromAmino
  },
  "/umee.leverage.v1.MsgMaxBorrow": {
    aminoType: "/umee.leverage.v1.MsgMaxBorrow",
    toAmino: MsgMaxBorrow.toAmino,
    fromAmino: MsgMaxBorrow.fromAmino
  },
  "/umee.leverage.v1.MsgRepay": {
    aminoType: "/umee.leverage.v1.MsgRepay",
    toAmino: MsgRepay.toAmino,
    fromAmino: MsgRepay.fromAmino
  },
  "/umee.leverage.v1.MsgLiquidate": {
    aminoType: "/umee.leverage.v1.MsgLiquidate",
    toAmino: MsgLiquidate.toAmino,
    fromAmino: MsgLiquidate.fromAmino
  },
  "/umee.leverage.v1.MsgLeveragedLiquidate": {
    aminoType: "/umee.leverage.v1.MsgLeveragedLiquidate",
    toAmino: MsgLeveragedLiquidate.toAmino,
    fromAmino: MsgLeveragedLiquidate.fromAmino
  },
  "/umee.leverage.v1.MsgSupplyCollateral": {
    aminoType: "/umee.leverage.v1.MsgSupplyCollateral",
    toAmino: MsgSupplyCollateral.toAmino,
    fromAmino: MsgSupplyCollateral.fromAmino
  },
  "/umee.leverage.v1.MsgGovUpdateRegistry": {
    aminoType: "/umee.leverage.v1.MsgGovUpdateRegistry",
    toAmino: MsgGovUpdateRegistry.toAmino,
    fromAmino: MsgGovUpdateRegistry.fromAmino
  },
  "/umee.leverage.v1.MsgGovUpdateSpecialAssets": {
    aminoType: "/umee.leverage.v1.MsgGovUpdateSpecialAssets",
    toAmino: MsgGovUpdateSpecialAssets.toAmino,
    fromAmino: MsgGovUpdateSpecialAssets.fromAmino
  },
  "/umee.leverage.v1.MsgGovSetParams": {
    aminoType: "/umee.leverage.v1.MsgGovSetParams",
    toAmino: MsgGovSetParams.toAmino,
    fromAmino: MsgGovSetParams.fromAmino
  }
};