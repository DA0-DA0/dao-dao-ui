//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgLiquidStake, MsgLiquidUnstake, MsgRedeem, MsgClaim, MsgRecreateICA, MsgJumpStart, MsgChangeModuleState, MsgReportSlashing } from "./msgs";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/pstake.lscosmos.v1beta1.MsgLiquidStake", MsgLiquidStake], ["/pstake.lscosmos.v1beta1.MsgLiquidUnstake", MsgLiquidUnstake], ["/pstake.lscosmos.v1beta1.MsgRedeem", MsgRedeem], ["/pstake.lscosmos.v1beta1.MsgClaim", MsgClaim], ["/pstake.lscosmos.v1beta1.MsgRecreateICA", MsgRecreateICA], ["/pstake.lscosmos.v1beta1.MsgJumpStart", MsgJumpStart], ["/pstake.lscosmos.v1beta1.MsgChangeModuleState", MsgChangeModuleState], ["/pstake.lscosmos.v1beta1.MsgReportSlashing", MsgReportSlashing]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    liquidStake(value: MsgLiquidStake) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidStake",
        value: MsgLiquidStake.encode(value).finish()
      };
    },
    liquidUnstake(value: MsgLiquidUnstake) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidUnstake",
        value: MsgLiquidUnstake.encode(value).finish()
      };
    },
    redeem(value: MsgRedeem) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgRedeem",
        value: MsgRedeem.encode(value).finish()
      };
    },
    claim(value: MsgClaim) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgClaim",
        value: MsgClaim.encode(value).finish()
      };
    },
    recreateICA(value: MsgRecreateICA) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgRecreateICA",
        value: MsgRecreateICA.encode(value).finish()
      };
    },
    jumpStart(value: MsgJumpStart) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgJumpStart",
        value: MsgJumpStart.encode(value).finish()
      };
    },
    changeModuleState(value: MsgChangeModuleState) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgChangeModuleState",
        value: MsgChangeModuleState.encode(value).finish()
      };
    },
    reportSlashing(value: MsgReportSlashing) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgReportSlashing",
        value: MsgReportSlashing.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    liquidStake(value: MsgLiquidStake) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidStake",
        value
      };
    },
    liquidUnstake(value: MsgLiquidUnstake) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidUnstake",
        value
      };
    },
    redeem(value: MsgRedeem) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgRedeem",
        value
      };
    },
    claim(value: MsgClaim) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgClaim",
        value
      };
    },
    recreateICA(value: MsgRecreateICA) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgRecreateICA",
        value
      };
    },
    jumpStart(value: MsgJumpStart) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgJumpStart",
        value
      };
    },
    changeModuleState(value: MsgChangeModuleState) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgChangeModuleState",
        value
      };
    },
    reportSlashing(value: MsgReportSlashing) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgReportSlashing",
        value
      };
    }
  },
  fromPartial: {
    liquidStake(value: MsgLiquidStake) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidStake",
        value: MsgLiquidStake.fromPartial(value)
      };
    },
    liquidUnstake(value: MsgLiquidUnstake) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidUnstake",
        value: MsgLiquidUnstake.fromPartial(value)
      };
    },
    redeem(value: MsgRedeem) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgRedeem",
        value: MsgRedeem.fromPartial(value)
      };
    },
    claim(value: MsgClaim) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgClaim",
        value: MsgClaim.fromPartial(value)
      };
    },
    recreateICA(value: MsgRecreateICA) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgRecreateICA",
        value: MsgRecreateICA.fromPartial(value)
      };
    },
    jumpStart(value: MsgJumpStart) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgJumpStart",
        value: MsgJumpStart.fromPartial(value)
      };
    },
    changeModuleState(value: MsgChangeModuleState) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgChangeModuleState",
        value: MsgChangeModuleState.fromPartial(value)
      };
    },
    reportSlashing(value: MsgReportSlashing) {
      return {
        typeUrl: "/pstake.lscosmos.v1beta1.MsgReportSlashing",
        value: MsgReportSlashing.fromPartial(value)
      };
    }
  }
};