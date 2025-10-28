//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgLiquidStake, MsgLSMLiquidStake, MsgRedeemStake, MsgRegisterHostZone, MsgClaimUndelegatedTokens, MsgRebalanceValidators, MsgAddValidators, MsgChangeValidatorWeights, MsgDeleteValidator, MsgRestoreInterchainAccount, MsgCloseDelegationChannel, MsgUpdateValidatorSharesExchRate, MsgCalibrateDelegation, MsgClearBalance, MsgUpdateInnerRedemptionRateBounds, MsgResumeHostZone, MsgCreateTradeRoute, MsgDeleteTradeRoute, MsgUpdateTradeRoute, MsgSetCommunityPoolRebate, MsgToggleTradeController, MsgUpdateHostZoneParams, MsgDeprecateHostZone } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/stride.stakeibc.MsgLiquidStake", MsgLiquidStake], ["/stride.stakeibc.MsgLSMLiquidStake", MsgLSMLiquidStake], ["/stride.stakeibc.MsgRedeemStake", MsgRedeemStake], ["/stride.stakeibc.MsgRegisterHostZone", MsgRegisterHostZone], ["/stride.stakeibc.MsgClaimUndelegatedTokens", MsgClaimUndelegatedTokens], ["/stride.stakeibc.MsgRebalanceValidators", MsgRebalanceValidators], ["/stride.stakeibc.MsgAddValidators", MsgAddValidators], ["/stride.stakeibc.MsgChangeValidatorWeights", MsgChangeValidatorWeights], ["/stride.stakeibc.MsgDeleteValidator", MsgDeleteValidator], ["/stride.stakeibc.MsgRestoreInterchainAccount", MsgRestoreInterchainAccount], ["/stride.stakeibc.MsgCloseDelegationChannel", MsgCloseDelegationChannel], ["/stride.stakeibc.MsgUpdateValidatorSharesExchRate", MsgUpdateValidatorSharesExchRate], ["/stride.stakeibc.MsgCalibrateDelegation", MsgCalibrateDelegation], ["/stride.stakeibc.MsgClearBalance", MsgClearBalance], ["/stride.stakeibc.MsgUpdateInnerRedemptionRateBounds", MsgUpdateInnerRedemptionRateBounds], ["/stride.stakeibc.MsgResumeHostZone", MsgResumeHostZone], ["/stride.stakeibc.MsgCreateTradeRoute", MsgCreateTradeRoute], ["/stride.stakeibc.MsgDeleteTradeRoute", MsgDeleteTradeRoute], ["/stride.stakeibc.MsgUpdateTradeRoute", MsgUpdateTradeRoute], ["/stride.stakeibc.MsgSetCommunityPoolRebate", MsgSetCommunityPoolRebate], ["/stride.stakeibc.MsgToggleTradeController", MsgToggleTradeController], ["/stride.stakeibc.MsgUpdateHostZoneParams", MsgUpdateHostZoneParams], ["/stride.stakeibc.MsgDeprecateHostZone", MsgDeprecateHostZone]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    liquidStake(value: MsgLiquidStake) {
      return {
        typeUrl: "/stride.stakeibc.MsgLiquidStake",
        value: MsgLiquidStake.encode(value).finish()
      };
    },
    lSMLiquidStake(value: MsgLSMLiquidStake) {
      return {
        typeUrl: "/stride.stakeibc.MsgLSMLiquidStake",
        value: MsgLSMLiquidStake.encode(value).finish()
      };
    },
    redeemStake(value: MsgRedeemStake) {
      return {
        typeUrl: "/stride.stakeibc.MsgRedeemStake",
        value: MsgRedeemStake.encode(value).finish()
      };
    },
    registerHostZone(value: MsgRegisterHostZone) {
      return {
        typeUrl: "/stride.stakeibc.MsgRegisterHostZone",
        value: MsgRegisterHostZone.encode(value).finish()
      };
    },
    claimUndelegatedTokens(value: MsgClaimUndelegatedTokens) {
      return {
        typeUrl: "/stride.stakeibc.MsgClaimUndelegatedTokens",
        value: MsgClaimUndelegatedTokens.encode(value).finish()
      };
    },
    rebalanceValidators(value: MsgRebalanceValidators) {
      return {
        typeUrl: "/stride.stakeibc.MsgRebalanceValidators",
        value: MsgRebalanceValidators.encode(value).finish()
      };
    },
    addValidators(value: MsgAddValidators) {
      return {
        typeUrl: "/stride.stakeibc.MsgAddValidators",
        value: MsgAddValidators.encode(value).finish()
      };
    },
    changeValidatorWeight(value: MsgChangeValidatorWeights) {
      return {
        typeUrl: "/stride.stakeibc.MsgChangeValidatorWeights",
        value: MsgChangeValidatorWeights.encode(value).finish()
      };
    },
    deleteValidator(value: MsgDeleteValidator) {
      return {
        typeUrl: "/stride.stakeibc.MsgDeleteValidator",
        value: MsgDeleteValidator.encode(value).finish()
      };
    },
    restoreInterchainAccount(value: MsgRestoreInterchainAccount) {
      return {
        typeUrl: "/stride.stakeibc.MsgRestoreInterchainAccount",
        value: MsgRestoreInterchainAccount.encode(value).finish()
      };
    },
    closeDelegationChannel(value: MsgCloseDelegationChannel) {
      return {
        typeUrl: "/stride.stakeibc.MsgCloseDelegationChannel",
        value: MsgCloseDelegationChannel.encode(value).finish()
      };
    },
    updateValidatorSharesExchRate(value: MsgUpdateValidatorSharesExchRate) {
      return {
        typeUrl: "/stride.stakeibc.MsgUpdateValidatorSharesExchRate",
        value: MsgUpdateValidatorSharesExchRate.encode(value).finish()
      };
    },
    calibrateDelegation(value: MsgCalibrateDelegation) {
      return {
        typeUrl: "/stride.stakeibc.MsgCalibrateDelegation",
        value: MsgCalibrateDelegation.encode(value).finish()
      };
    },
    clearBalance(value: MsgClearBalance) {
      return {
        typeUrl: "/stride.stakeibc.MsgClearBalance",
        value: MsgClearBalance.encode(value).finish()
      };
    },
    updateInnerRedemptionRateBounds(value: MsgUpdateInnerRedemptionRateBounds) {
      return {
        typeUrl: "/stride.stakeibc.MsgUpdateInnerRedemptionRateBounds",
        value: MsgUpdateInnerRedemptionRateBounds.encode(value).finish()
      };
    },
    resumeHostZone(value: MsgResumeHostZone) {
      return {
        typeUrl: "/stride.stakeibc.MsgResumeHostZone",
        value: MsgResumeHostZone.encode(value).finish()
      };
    },
    createTradeRoute(value: MsgCreateTradeRoute) {
      return {
        typeUrl: "/stride.stakeibc.MsgCreateTradeRoute",
        value: MsgCreateTradeRoute.encode(value).finish()
      };
    },
    deleteTradeRoute(value: MsgDeleteTradeRoute) {
      return {
        typeUrl: "/stride.stakeibc.MsgDeleteTradeRoute",
        value: MsgDeleteTradeRoute.encode(value).finish()
      };
    },
    updateTradeRoute(value: MsgUpdateTradeRoute) {
      return {
        typeUrl: "/stride.stakeibc.MsgUpdateTradeRoute",
        value: MsgUpdateTradeRoute.encode(value).finish()
      };
    },
    setCommunityPoolRebate(value: MsgSetCommunityPoolRebate) {
      return {
        typeUrl: "/stride.stakeibc.MsgSetCommunityPoolRebate",
        value: MsgSetCommunityPoolRebate.encode(value).finish()
      };
    },
    toggleTradeController(value: MsgToggleTradeController) {
      return {
        typeUrl: "/stride.stakeibc.MsgToggleTradeController",
        value: MsgToggleTradeController.encode(value).finish()
      };
    },
    updateHostZoneParams(value: MsgUpdateHostZoneParams) {
      return {
        typeUrl: "/stride.stakeibc.MsgUpdateHostZoneParams",
        value: MsgUpdateHostZoneParams.encode(value).finish()
      };
    },
    deprecateHostZone(value: MsgDeprecateHostZone) {
      return {
        typeUrl: "/stride.stakeibc.MsgDeprecateHostZone",
        value: MsgDeprecateHostZone.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    liquidStake(value: MsgLiquidStake) {
      return {
        typeUrl: "/stride.stakeibc.MsgLiquidStake",
        value
      };
    },
    lSMLiquidStake(value: MsgLSMLiquidStake) {
      return {
        typeUrl: "/stride.stakeibc.MsgLSMLiquidStake",
        value
      };
    },
    redeemStake(value: MsgRedeemStake) {
      return {
        typeUrl: "/stride.stakeibc.MsgRedeemStake",
        value
      };
    },
    registerHostZone(value: MsgRegisterHostZone) {
      return {
        typeUrl: "/stride.stakeibc.MsgRegisterHostZone",
        value
      };
    },
    claimUndelegatedTokens(value: MsgClaimUndelegatedTokens) {
      return {
        typeUrl: "/stride.stakeibc.MsgClaimUndelegatedTokens",
        value
      };
    },
    rebalanceValidators(value: MsgRebalanceValidators) {
      return {
        typeUrl: "/stride.stakeibc.MsgRebalanceValidators",
        value
      };
    },
    addValidators(value: MsgAddValidators) {
      return {
        typeUrl: "/stride.stakeibc.MsgAddValidators",
        value
      };
    },
    changeValidatorWeight(value: MsgChangeValidatorWeights) {
      return {
        typeUrl: "/stride.stakeibc.MsgChangeValidatorWeights",
        value
      };
    },
    deleteValidator(value: MsgDeleteValidator) {
      return {
        typeUrl: "/stride.stakeibc.MsgDeleteValidator",
        value
      };
    },
    restoreInterchainAccount(value: MsgRestoreInterchainAccount) {
      return {
        typeUrl: "/stride.stakeibc.MsgRestoreInterchainAccount",
        value
      };
    },
    closeDelegationChannel(value: MsgCloseDelegationChannel) {
      return {
        typeUrl: "/stride.stakeibc.MsgCloseDelegationChannel",
        value
      };
    },
    updateValidatorSharesExchRate(value: MsgUpdateValidatorSharesExchRate) {
      return {
        typeUrl: "/stride.stakeibc.MsgUpdateValidatorSharesExchRate",
        value
      };
    },
    calibrateDelegation(value: MsgCalibrateDelegation) {
      return {
        typeUrl: "/stride.stakeibc.MsgCalibrateDelegation",
        value
      };
    },
    clearBalance(value: MsgClearBalance) {
      return {
        typeUrl: "/stride.stakeibc.MsgClearBalance",
        value
      };
    },
    updateInnerRedemptionRateBounds(value: MsgUpdateInnerRedemptionRateBounds) {
      return {
        typeUrl: "/stride.stakeibc.MsgUpdateInnerRedemptionRateBounds",
        value
      };
    },
    resumeHostZone(value: MsgResumeHostZone) {
      return {
        typeUrl: "/stride.stakeibc.MsgResumeHostZone",
        value
      };
    },
    createTradeRoute(value: MsgCreateTradeRoute) {
      return {
        typeUrl: "/stride.stakeibc.MsgCreateTradeRoute",
        value
      };
    },
    deleteTradeRoute(value: MsgDeleteTradeRoute) {
      return {
        typeUrl: "/stride.stakeibc.MsgDeleteTradeRoute",
        value
      };
    },
    updateTradeRoute(value: MsgUpdateTradeRoute) {
      return {
        typeUrl: "/stride.stakeibc.MsgUpdateTradeRoute",
        value
      };
    },
    setCommunityPoolRebate(value: MsgSetCommunityPoolRebate) {
      return {
        typeUrl: "/stride.stakeibc.MsgSetCommunityPoolRebate",
        value
      };
    },
    toggleTradeController(value: MsgToggleTradeController) {
      return {
        typeUrl: "/stride.stakeibc.MsgToggleTradeController",
        value
      };
    },
    updateHostZoneParams(value: MsgUpdateHostZoneParams) {
      return {
        typeUrl: "/stride.stakeibc.MsgUpdateHostZoneParams",
        value
      };
    },
    deprecateHostZone(value: MsgDeprecateHostZone) {
      return {
        typeUrl: "/stride.stakeibc.MsgDeprecateHostZone",
        value
      };
    }
  },
  fromPartial: {
    liquidStake(value: MsgLiquidStake) {
      return {
        typeUrl: "/stride.stakeibc.MsgLiquidStake",
        value: MsgLiquidStake.fromPartial(value)
      };
    },
    lSMLiquidStake(value: MsgLSMLiquidStake) {
      return {
        typeUrl: "/stride.stakeibc.MsgLSMLiquidStake",
        value: MsgLSMLiquidStake.fromPartial(value)
      };
    },
    redeemStake(value: MsgRedeemStake) {
      return {
        typeUrl: "/stride.stakeibc.MsgRedeemStake",
        value: MsgRedeemStake.fromPartial(value)
      };
    },
    registerHostZone(value: MsgRegisterHostZone) {
      return {
        typeUrl: "/stride.stakeibc.MsgRegisterHostZone",
        value: MsgRegisterHostZone.fromPartial(value)
      };
    },
    claimUndelegatedTokens(value: MsgClaimUndelegatedTokens) {
      return {
        typeUrl: "/stride.stakeibc.MsgClaimUndelegatedTokens",
        value: MsgClaimUndelegatedTokens.fromPartial(value)
      };
    },
    rebalanceValidators(value: MsgRebalanceValidators) {
      return {
        typeUrl: "/stride.stakeibc.MsgRebalanceValidators",
        value: MsgRebalanceValidators.fromPartial(value)
      };
    },
    addValidators(value: MsgAddValidators) {
      return {
        typeUrl: "/stride.stakeibc.MsgAddValidators",
        value: MsgAddValidators.fromPartial(value)
      };
    },
    changeValidatorWeight(value: MsgChangeValidatorWeights) {
      return {
        typeUrl: "/stride.stakeibc.MsgChangeValidatorWeights",
        value: MsgChangeValidatorWeights.fromPartial(value)
      };
    },
    deleteValidator(value: MsgDeleteValidator) {
      return {
        typeUrl: "/stride.stakeibc.MsgDeleteValidator",
        value: MsgDeleteValidator.fromPartial(value)
      };
    },
    restoreInterchainAccount(value: MsgRestoreInterchainAccount) {
      return {
        typeUrl: "/stride.stakeibc.MsgRestoreInterchainAccount",
        value: MsgRestoreInterchainAccount.fromPartial(value)
      };
    },
    closeDelegationChannel(value: MsgCloseDelegationChannel) {
      return {
        typeUrl: "/stride.stakeibc.MsgCloseDelegationChannel",
        value: MsgCloseDelegationChannel.fromPartial(value)
      };
    },
    updateValidatorSharesExchRate(value: MsgUpdateValidatorSharesExchRate) {
      return {
        typeUrl: "/stride.stakeibc.MsgUpdateValidatorSharesExchRate",
        value: MsgUpdateValidatorSharesExchRate.fromPartial(value)
      };
    },
    calibrateDelegation(value: MsgCalibrateDelegation) {
      return {
        typeUrl: "/stride.stakeibc.MsgCalibrateDelegation",
        value: MsgCalibrateDelegation.fromPartial(value)
      };
    },
    clearBalance(value: MsgClearBalance) {
      return {
        typeUrl: "/stride.stakeibc.MsgClearBalance",
        value: MsgClearBalance.fromPartial(value)
      };
    },
    updateInnerRedemptionRateBounds(value: MsgUpdateInnerRedemptionRateBounds) {
      return {
        typeUrl: "/stride.stakeibc.MsgUpdateInnerRedemptionRateBounds",
        value: MsgUpdateInnerRedemptionRateBounds.fromPartial(value)
      };
    },
    resumeHostZone(value: MsgResumeHostZone) {
      return {
        typeUrl: "/stride.stakeibc.MsgResumeHostZone",
        value: MsgResumeHostZone.fromPartial(value)
      };
    },
    createTradeRoute(value: MsgCreateTradeRoute) {
      return {
        typeUrl: "/stride.stakeibc.MsgCreateTradeRoute",
        value: MsgCreateTradeRoute.fromPartial(value)
      };
    },
    deleteTradeRoute(value: MsgDeleteTradeRoute) {
      return {
        typeUrl: "/stride.stakeibc.MsgDeleteTradeRoute",
        value: MsgDeleteTradeRoute.fromPartial(value)
      };
    },
    updateTradeRoute(value: MsgUpdateTradeRoute) {
      return {
        typeUrl: "/stride.stakeibc.MsgUpdateTradeRoute",
        value: MsgUpdateTradeRoute.fromPartial(value)
      };
    },
    setCommunityPoolRebate(value: MsgSetCommunityPoolRebate) {
      return {
        typeUrl: "/stride.stakeibc.MsgSetCommunityPoolRebate",
        value: MsgSetCommunityPoolRebate.fromPartial(value)
      };
    },
    toggleTradeController(value: MsgToggleTradeController) {
      return {
        typeUrl: "/stride.stakeibc.MsgToggleTradeController",
        value: MsgToggleTradeController.fromPartial(value)
      };
    },
    updateHostZoneParams(value: MsgUpdateHostZoneParams) {
      return {
        typeUrl: "/stride.stakeibc.MsgUpdateHostZoneParams",
        value: MsgUpdateHostZoneParams.fromPartial(value)
      };
    },
    deprecateHostZone(value: MsgDeprecateHostZone) {
      return {
        typeUrl: "/stride.stakeibc.MsgDeprecateHostZone",
        value: MsgDeprecateHostZone.fromPartial(value)
      };
    }
  }
};