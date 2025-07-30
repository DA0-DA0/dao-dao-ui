//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSupply, MsgWithdraw, MsgMaxWithdraw, MsgCollateralize, MsgDecollateralize, MsgBorrow, MsgMaxBorrow, MsgRepay, MsgLiquidate, MsgLeveragedLiquidate, MsgSupplyCollateral, MsgGovUpdateRegistry, MsgGovUpdateSpecialAssets, MsgGovSetParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/umee.leverage.v1.MsgSupply", MsgSupply], ["/umee.leverage.v1.MsgWithdraw", MsgWithdraw], ["/umee.leverage.v1.MsgMaxWithdraw", MsgMaxWithdraw], ["/umee.leverage.v1.MsgCollateralize", MsgCollateralize], ["/umee.leverage.v1.MsgDecollateralize", MsgDecollateralize], ["/umee.leverage.v1.MsgBorrow", MsgBorrow], ["/umee.leverage.v1.MsgMaxBorrow", MsgMaxBorrow], ["/umee.leverage.v1.MsgRepay", MsgRepay], ["/umee.leverage.v1.MsgLiquidate", MsgLiquidate], ["/umee.leverage.v1.MsgLeveragedLiquidate", MsgLeveragedLiquidate], ["/umee.leverage.v1.MsgSupplyCollateral", MsgSupplyCollateral], ["/umee.leverage.v1.MsgGovUpdateRegistry", MsgGovUpdateRegistry], ["/umee.leverage.v1.MsgGovUpdateSpecialAssets", MsgGovUpdateSpecialAssets], ["/umee.leverage.v1.MsgGovSetParams", MsgGovSetParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    supply(value: MsgSupply) {
      return {
        typeUrl: "/umee.leverage.v1.MsgSupply",
        value: MsgSupply.encode(value).finish()
      };
    },
    withdraw(value: MsgWithdraw) {
      return {
        typeUrl: "/umee.leverage.v1.MsgWithdraw",
        value: MsgWithdraw.encode(value).finish()
      };
    },
    maxWithdraw(value: MsgMaxWithdraw) {
      return {
        typeUrl: "/umee.leverage.v1.MsgMaxWithdraw",
        value: MsgMaxWithdraw.encode(value).finish()
      };
    },
    collateralize(value: MsgCollateralize) {
      return {
        typeUrl: "/umee.leverage.v1.MsgCollateralize",
        value: MsgCollateralize.encode(value).finish()
      };
    },
    decollateralize(value: MsgDecollateralize) {
      return {
        typeUrl: "/umee.leverage.v1.MsgDecollateralize",
        value: MsgDecollateralize.encode(value).finish()
      };
    },
    borrow(value: MsgBorrow) {
      return {
        typeUrl: "/umee.leverage.v1.MsgBorrow",
        value: MsgBorrow.encode(value).finish()
      };
    },
    maxBorrow(value: MsgMaxBorrow) {
      return {
        typeUrl: "/umee.leverage.v1.MsgMaxBorrow",
        value: MsgMaxBorrow.encode(value).finish()
      };
    },
    repay(value: MsgRepay) {
      return {
        typeUrl: "/umee.leverage.v1.MsgRepay",
        value: MsgRepay.encode(value).finish()
      };
    },
    liquidate(value: MsgLiquidate) {
      return {
        typeUrl: "/umee.leverage.v1.MsgLiquidate",
        value: MsgLiquidate.encode(value).finish()
      };
    },
    leveragedLiquidate(value: MsgLeveragedLiquidate) {
      return {
        typeUrl: "/umee.leverage.v1.MsgLeveragedLiquidate",
        value: MsgLeveragedLiquidate.encode(value).finish()
      };
    },
    supplyCollateral(value: MsgSupplyCollateral) {
      return {
        typeUrl: "/umee.leverage.v1.MsgSupplyCollateral",
        value: MsgSupplyCollateral.encode(value).finish()
      };
    },
    govUpdateRegistry(value: MsgGovUpdateRegistry) {
      return {
        typeUrl: "/umee.leverage.v1.MsgGovUpdateRegistry",
        value: MsgGovUpdateRegistry.encode(value).finish()
      };
    },
    govUpdateSpecialAssets(value: MsgGovUpdateSpecialAssets) {
      return {
        typeUrl: "/umee.leverage.v1.MsgGovUpdateSpecialAssets",
        value: MsgGovUpdateSpecialAssets.encode(value).finish()
      };
    },
    govSetParams(value: MsgGovSetParams) {
      return {
        typeUrl: "/umee.leverage.v1.MsgGovSetParams",
        value: MsgGovSetParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    supply(value: MsgSupply) {
      return {
        typeUrl: "/umee.leverage.v1.MsgSupply",
        value
      };
    },
    withdraw(value: MsgWithdraw) {
      return {
        typeUrl: "/umee.leverage.v1.MsgWithdraw",
        value
      };
    },
    maxWithdraw(value: MsgMaxWithdraw) {
      return {
        typeUrl: "/umee.leverage.v1.MsgMaxWithdraw",
        value
      };
    },
    collateralize(value: MsgCollateralize) {
      return {
        typeUrl: "/umee.leverage.v1.MsgCollateralize",
        value
      };
    },
    decollateralize(value: MsgDecollateralize) {
      return {
        typeUrl: "/umee.leverage.v1.MsgDecollateralize",
        value
      };
    },
    borrow(value: MsgBorrow) {
      return {
        typeUrl: "/umee.leverage.v1.MsgBorrow",
        value
      };
    },
    maxBorrow(value: MsgMaxBorrow) {
      return {
        typeUrl: "/umee.leverage.v1.MsgMaxBorrow",
        value
      };
    },
    repay(value: MsgRepay) {
      return {
        typeUrl: "/umee.leverage.v1.MsgRepay",
        value
      };
    },
    liquidate(value: MsgLiquidate) {
      return {
        typeUrl: "/umee.leverage.v1.MsgLiquidate",
        value
      };
    },
    leveragedLiquidate(value: MsgLeveragedLiquidate) {
      return {
        typeUrl: "/umee.leverage.v1.MsgLeveragedLiquidate",
        value
      };
    },
    supplyCollateral(value: MsgSupplyCollateral) {
      return {
        typeUrl: "/umee.leverage.v1.MsgSupplyCollateral",
        value
      };
    },
    govUpdateRegistry(value: MsgGovUpdateRegistry) {
      return {
        typeUrl: "/umee.leverage.v1.MsgGovUpdateRegistry",
        value
      };
    },
    govUpdateSpecialAssets(value: MsgGovUpdateSpecialAssets) {
      return {
        typeUrl: "/umee.leverage.v1.MsgGovUpdateSpecialAssets",
        value
      };
    },
    govSetParams(value: MsgGovSetParams) {
      return {
        typeUrl: "/umee.leverage.v1.MsgGovSetParams",
        value
      };
    }
  },
  fromPartial: {
    supply(value: MsgSupply) {
      return {
        typeUrl: "/umee.leverage.v1.MsgSupply",
        value: MsgSupply.fromPartial(value)
      };
    },
    withdraw(value: MsgWithdraw) {
      return {
        typeUrl: "/umee.leverage.v1.MsgWithdraw",
        value: MsgWithdraw.fromPartial(value)
      };
    },
    maxWithdraw(value: MsgMaxWithdraw) {
      return {
        typeUrl: "/umee.leverage.v1.MsgMaxWithdraw",
        value: MsgMaxWithdraw.fromPartial(value)
      };
    },
    collateralize(value: MsgCollateralize) {
      return {
        typeUrl: "/umee.leverage.v1.MsgCollateralize",
        value: MsgCollateralize.fromPartial(value)
      };
    },
    decollateralize(value: MsgDecollateralize) {
      return {
        typeUrl: "/umee.leverage.v1.MsgDecollateralize",
        value: MsgDecollateralize.fromPartial(value)
      };
    },
    borrow(value: MsgBorrow) {
      return {
        typeUrl: "/umee.leverage.v1.MsgBorrow",
        value: MsgBorrow.fromPartial(value)
      };
    },
    maxBorrow(value: MsgMaxBorrow) {
      return {
        typeUrl: "/umee.leverage.v1.MsgMaxBorrow",
        value: MsgMaxBorrow.fromPartial(value)
      };
    },
    repay(value: MsgRepay) {
      return {
        typeUrl: "/umee.leverage.v1.MsgRepay",
        value: MsgRepay.fromPartial(value)
      };
    },
    liquidate(value: MsgLiquidate) {
      return {
        typeUrl: "/umee.leverage.v1.MsgLiquidate",
        value: MsgLiquidate.fromPartial(value)
      };
    },
    leveragedLiquidate(value: MsgLeveragedLiquidate) {
      return {
        typeUrl: "/umee.leverage.v1.MsgLeveragedLiquidate",
        value: MsgLeveragedLiquidate.fromPartial(value)
      };
    },
    supplyCollateral(value: MsgSupplyCollateral) {
      return {
        typeUrl: "/umee.leverage.v1.MsgSupplyCollateral",
        value: MsgSupplyCollateral.fromPartial(value)
      };
    },
    govUpdateRegistry(value: MsgGovUpdateRegistry) {
      return {
        typeUrl: "/umee.leverage.v1.MsgGovUpdateRegistry",
        value: MsgGovUpdateRegistry.fromPartial(value)
      };
    },
    govUpdateSpecialAssets(value: MsgGovUpdateSpecialAssets) {
      return {
        typeUrl: "/umee.leverage.v1.MsgGovUpdateSpecialAssets",
        value: MsgGovUpdateSpecialAssets.fromPartial(value)
      };
    },
    govSetParams(value: MsgGovSetParams) {
      return {
        typeUrl: "/umee.leverage.v1.MsgGovSetParams",
        value: MsgGovSetParams.fromPartial(value)
      };
    }
  }
};