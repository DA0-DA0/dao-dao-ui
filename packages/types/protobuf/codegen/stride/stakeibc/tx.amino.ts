import { MsgLiquidStake, MsgLSMLiquidStake, MsgRedeemStake, MsgRegisterHostZone, MsgClaimUndelegatedTokens, MsgRebalanceValidators, MsgAddValidators, MsgChangeValidatorWeights, MsgDeleteValidator, MsgRestoreInterchainAccount, MsgCloseDelegationChannel, MsgUpdateValidatorSharesExchRate, MsgCalibrateDelegation, MsgClearBalance, MsgUpdateInnerRedemptionRateBounds, MsgResumeHostZone, MsgCreateTradeRoute, MsgDeleteTradeRoute, MsgUpdateTradeRoute, MsgSetCommunityPoolRebate, MsgToggleTradeController, MsgUpdateHostZoneParams, MsgDeprecateHostZone } from "./tx";
export const AminoConverter = {
  "/stride.stakeibc.MsgLiquidStake": {
    aminoType: "stakeibc/MsgLiquidStake",
    toAmino: MsgLiquidStake.toAmino,
    fromAmino: MsgLiquidStake.fromAmino
  },
  "/stride.stakeibc.MsgLSMLiquidStake": {
    aminoType: "stakeibc/MsgLSMLiquidStake",
    toAmino: MsgLSMLiquidStake.toAmino,
    fromAmino: MsgLSMLiquidStake.fromAmino
  },
  "/stride.stakeibc.MsgRedeemStake": {
    aminoType: "stakeibc/MsgRedeemStake",
    toAmino: MsgRedeemStake.toAmino,
    fromAmino: MsgRedeemStake.fromAmino
  },
  "/stride.stakeibc.MsgRegisterHostZone": {
    aminoType: "stakeibc/MsgRegisterHostZone",
    toAmino: MsgRegisterHostZone.toAmino,
    fromAmino: MsgRegisterHostZone.fromAmino
  },
  "/stride.stakeibc.MsgClaimUndelegatedTokens": {
    aminoType: "stakeibc/MsgClaimUndelegatedTokens",
    toAmino: MsgClaimUndelegatedTokens.toAmino,
    fromAmino: MsgClaimUndelegatedTokens.fromAmino
  },
  "/stride.stakeibc.MsgRebalanceValidators": {
    aminoType: "stakeibc/MsgRebalanceValidators",
    toAmino: MsgRebalanceValidators.toAmino,
    fromAmino: MsgRebalanceValidators.fromAmino
  },
  "/stride.stakeibc.MsgAddValidators": {
    aminoType: "stakeibc/MsgAddValidators",
    toAmino: MsgAddValidators.toAmino,
    fromAmino: MsgAddValidators.fromAmino
  },
  "/stride.stakeibc.MsgChangeValidatorWeights": {
    aminoType: "stakeibc/MsgChangeValidatorWeights",
    toAmino: MsgChangeValidatorWeights.toAmino,
    fromAmino: MsgChangeValidatorWeights.fromAmino
  },
  "/stride.stakeibc.MsgDeleteValidator": {
    aminoType: "stakeibc/MsgDeleteValidator",
    toAmino: MsgDeleteValidator.toAmino,
    fromAmino: MsgDeleteValidator.fromAmino
  },
  "/stride.stakeibc.MsgRestoreInterchainAccount": {
    aminoType: "stakeibc/MsgRestoreInterchainAcco",
    toAmino: MsgRestoreInterchainAccount.toAmino,
    fromAmino: MsgRestoreInterchainAccount.fromAmino
  },
  "/stride.stakeibc.MsgCloseDelegationChannel": {
    aminoType: "stakeibc/MsgCloseDelegationChanne",
    toAmino: MsgCloseDelegationChannel.toAmino,
    fromAmino: MsgCloseDelegationChannel.fromAmino
  },
  "/stride.stakeibc.MsgUpdateValidatorSharesExchRate": {
    aminoType: "stakeibc/MsgUpdateValSharesExchRate",
    toAmino: MsgUpdateValidatorSharesExchRate.toAmino,
    fromAmino: MsgUpdateValidatorSharesExchRate.fromAmino
  },
  "/stride.stakeibc.MsgCalibrateDelegation": {
    aminoType: "stakeibc/MsgCalibrateDelegation",
    toAmino: MsgCalibrateDelegation.toAmino,
    fromAmino: MsgCalibrateDelegation.fromAmino
  },
  "/stride.stakeibc.MsgClearBalance": {
    aminoType: "stakeibc/MsgClearBalance",
    toAmino: MsgClearBalance.toAmino,
    fromAmino: MsgClearBalance.fromAmino
  },
  "/stride.stakeibc.MsgUpdateInnerRedemptionRateBounds": {
    aminoType: "stakeibc/MsgUpdateRedemptionRateBounds",
    toAmino: MsgUpdateInnerRedemptionRateBounds.toAmino,
    fromAmino: MsgUpdateInnerRedemptionRateBounds.fromAmino
  },
  "/stride.stakeibc.MsgResumeHostZone": {
    aminoType: "stakeibc/MsgResumeHostZone",
    toAmino: MsgResumeHostZone.toAmino,
    fromAmino: MsgResumeHostZone.fromAmino
  },
  "/stride.stakeibc.MsgCreateTradeRoute": {
    aminoType: "stakeibc/MsgCreateTradeRoute",
    toAmino: MsgCreateTradeRoute.toAmino,
    fromAmino: MsgCreateTradeRoute.fromAmino
  },
  "/stride.stakeibc.MsgDeleteTradeRoute": {
    aminoType: "stakeibc/MsgDeleteTradeRoute",
    toAmino: MsgDeleteTradeRoute.toAmino,
    fromAmino: MsgDeleteTradeRoute.fromAmino
  },
  "/stride.stakeibc.MsgUpdateTradeRoute": {
    aminoType: "stakeibc/MsgUpdateTradeRoute",
    toAmino: MsgUpdateTradeRoute.toAmino,
    fromAmino: MsgUpdateTradeRoute.fromAmino
  },
  "/stride.stakeibc.MsgSetCommunityPoolRebate": {
    aminoType: "stakeibc/MsgSetCommunityPoolRebate",
    toAmino: MsgSetCommunityPoolRebate.toAmino,
    fromAmino: MsgSetCommunityPoolRebate.fromAmino
  },
  "/stride.stakeibc.MsgToggleTradeController": {
    aminoType: "stakeibc/MsgToggleTradeController",
    toAmino: MsgToggleTradeController.toAmino,
    fromAmino: MsgToggleTradeController.fromAmino
  },
  "/stride.stakeibc.MsgUpdateHostZoneParams": {
    aminoType: "stakeibc/MsgUpdateHostZoneParams",
    toAmino: MsgUpdateHostZoneParams.toAmino,
    fromAmino: MsgUpdateHostZoneParams.fromAmino
  },
  "/stride.stakeibc.MsgDeprecateHostZone": {
    aminoType: "stakeibc/MsgDeprecateHostZone",
    toAmino: MsgDeprecateHostZone.toAmino,
    fromAmino: MsgDeprecateHostZone.fromAmino
  }
};