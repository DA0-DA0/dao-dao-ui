import { MsgSingleSwap, MsgJoinAllTokensExactLpt, MsgJoinTokenExactLpt, MsgJoinExactTokens, MsgZeroImpactJoinYamm, MsgExitExactTokens, MsgExitTokenExactLpt, MsgExitAllTokensExactLpt, MsgCreateWeightedPool, MsgUpdateSwapFee, MsgInitializePool, MsgUpdateWeights, MsgBatchSwap, MsgSetYammConfiguration, MsgWhitelistRoute, MsgSetWhitelistedRouteEnabled, MsgSubmitOrder, MsgCancelOrder, MsgProposeMatch, MsgSetCircuitBreakers, MsgSetRecoveryMode, MsgRecoveryExit, MsgSetPauseMode, MsgSetVaultPauseMode, MsgCreateOraclePricePair, MsgUpdateOraclePricePair, MsgDeleteOraclePricePair, MsgSetSwapProtocolFee, MsgSetJoinExitProtocolFee, MsgIntroduceYammLpToWeightedPool, MsgIntroduceAssetBaseTokenToWeightedPool, MsgCancelPendingTokenIntroduction, MsgRemoveTokenFromWeightedPool, MsgUpdateParams, MsgAddMaturityToYamm, MsgSetInitializationAllowList, MsgSetPoolAdmins, MsgSetPoolJoinBlocked, MsgSetPauseAllowList, MsgSetPauseWindow, MsgSetOrderPairDisabled } from "./tx";
export const AminoConverter = {
  "/pryzm.amm.v1.MsgSingleSwap": {
    aminoType: "pryzm/amm/v1/SingleSwap",
    toAmino: MsgSingleSwap.toAmino,
    fromAmino: MsgSingleSwap.fromAmino
  },
  "/pryzm.amm.v1.MsgJoinAllTokensExactLpt": {
    aminoType: "pryzm/amm/v1/JoinAllTokensExactLpt",
    toAmino: MsgJoinAllTokensExactLpt.toAmino,
    fromAmino: MsgJoinAllTokensExactLpt.fromAmino
  },
  "/pryzm.amm.v1.MsgJoinTokenExactLpt": {
    aminoType: "pryzm/amm/v1/JoinTokenExactLpt",
    toAmino: MsgJoinTokenExactLpt.toAmino,
    fromAmino: MsgJoinTokenExactLpt.fromAmino
  },
  "/pryzm.amm.v1.MsgJoinExactTokens": {
    aminoType: "pryzm/amm/v1/JoinExactTokens",
    toAmino: MsgJoinExactTokens.toAmino,
    fromAmino: MsgJoinExactTokens.fromAmino
  },
  "/pryzm.amm.v1.MsgZeroImpactJoinYamm": {
    aminoType: "pryzm/amm/v1/ZeroImpactJoinYamm",
    toAmino: MsgZeroImpactJoinYamm.toAmino,
    fromAmino: MsgZeroImpactJoinYamm.fromAmino
  },
  "/pryzm.amm.v1.MsgExitExactTokens": {
    aminoType: "pryzm/amm/v1/ExitExactTokens",
    toAmino: MsgExitExactTokens.toAmino,
    fromAmino: MsgExitExactTokens.fromAmino
  },
  "/pryzm.amm.v1.MsgExitTokenExactLpt": {
    aminoType: "pryzm/amm/v1/ExitTokenExactLpt",
    toAmino: MsgExitTokenExactLpt.toAmino,
    fromAmino: MsgExitTokenExactLpt.fromAmino
  },
  "/pryzm.amm.v1.MsgExitAllTokensExactLpt": {
    aminoType: "pryzm/amm/v1/ExitAllTokensExactLpt",
    toAmino: MsgExitAllTokensExactLpt.toAmino,
    fromAmino: MsgExitAllTokensExactLpt.fromAmino
  },
  "/pryzm.amm.v1.MsgCreateWeightedPool": {
    aminoType: "pryzm/amm/v1/CreateWeightedPool",
    toAmino: MsgCreateWeightedPool.toAmino,
    fromAmino: MsgCreateWeightedPool.fromAmino
  },
  "/pryzm.amm.v1.MsgUpdateSwapFee": {
    aminoType: "pryzm/amm/v1/UpdateSwapFee",
    toAmino: MsgUpdateSwapFee.toAmino,
    fromAmino: MsgUpdateSwapFee.fromAmino
  },
  "/pryzm.amm.v1.MsgInitializePool": {
    aminoType: "pryzm/amm/v1/InitializePool",
    toAmino: MsgInitializePool.toAmino,
    fromAmino: MsgInitializePool.fromAmino
  },
  "/pryzm.amm.v1.MsgUpdateWeights": {
    aminoType: "pryzm/amm/v1/UpdateWeights",
    toAmino: MsgUpdateWeights.toAmino,
    fromAmino: MsgUpdateWeights.fromAmino
  },
  "/pryzm.amm.v1.MsgBatchSwap": {
    aminoType: "pryzm/amm/v1/BatchSwap",
    toAmino: MsgBatchSwap.toAmino,
    fromAmino: MsgBatchSwap.fromAmino
  },
  "/pryzm.amm.v1.MsgSetYammConfiguration": {
    aminoType: "pryzm/amm/v1/SetYammConfiguration",
    toAmino: MsgSetYammConfiguration.toAmino,
    fromAmino: MsgSetYammConfiguration.fromAmino
  },
  "/pryzm.amm.v1.MsgWhitelistRoute": {
    aminoType: "pryzm/amm/v1/WhitelistRoute",
    toAmino: MsgWhitelistRoute.toAmino,
    fromAmino: MsgWhitelistRoute.fromAmino
  },
  "/pryzm.amm.v1.MsgSetWhitelistedRouteEnabled": {
    aminoType: "pryzm/amm/v1/SetWhitelistedRouteEnabled",
    toAmino: MsgSetWhitelistedRouteEnabled.toAmino,
    fromAmino: MsgSetWhitelistedRouteEnabled.fromAmino
  },
  "/pryzm.amm.v1.MsgSubmitOrder": {
    aminoType: "pryzm/amm/v1/SubmitOrder",
    toAmino: MsgSubmitOrder.toAmino,
    fromAmino: MsgSubmitOrder.fromAmino
  },
  "/pryzm.amm.v1.MsgCancelOrder": {
    aminoType: "pryzm/amm/v1/CancelOrder",
    toAmino: MsgCancelOrder.toAmino,
    fromAmino: MsgCancelOrder.fromAmino
  },
  "/pryzm.amm.v1.MsgProposeMatch": {
    aminoType: "pryzm/amm/v1/ProposeMatch",
    toAmino: MsgProposeMatch.toAmino,
    fromAmino: MsgProposeMatch.fromAmino
  },
  "/pryzm.amm.v1.MsgSetCircuitBreakers": {
    aminoType: "pryzm/amm/v1/SetCircuitBreakers",
    toAmino: MsgSetCircuitBreakers.toAmino,
    fromAmino: MsgSetCircuitBreakers.fromAmino
  },
  "/pryzm.amm.v1.MsgSetRecoveryMode": {
    aminoType: "pryzm/amm/v1/SetRecoveryMode",
    toAmino: MsgSetRecoveryMode.toAmino,
    fromAmino: MsgSetRecoveryMode.fromAmino
  },
  "/pryzm.amm.v1.MsgRecoveryExit": {
    aminoType: "pryzm/amm/v1/RecoveryExit",
    toAmino: MsgRecoveryExit.toAmino,
    fromAmino: MsgRecoveryExit.fromAmino
  },
  "/pryzm.amm.v1.MsgSetPauseMode": {
    aminoType: "pryzm/amm/v1/SetPauseMode",
    toAmino: MsgSetPauseMode.toAmino,
    fromAmino: MsgSetPauseMode.fromAmino
  },
  "/pryzm.amm.v1.MsgSetVaultPauseMode": {
    aminoType: "pryzm/amm/v1/SetVaultPauseMode",
    toAmino: MsgSetVaultPauseMode.toAmino,
    fromAmino: MsgSetVaultPauseMode.fromAmino
  },
  "/pryzm.amm.v1.MsgCreateOraclePricePair": {
    aminoType: "pryzm/amm/v1/CreateOraclePricePair",
    toAmino: MsgCreateOraclePricePair.toAmino,
    fromAmino: MsgCreateOraclePricePair.fromAmino
  },
  "/pryzm.amm.v1.MsgUpdateOraclePricePair": {
    aminoType: "pryzm/amm/v1/UpdateOraclePricePair",
    toAmino: MsgUpdateOraclePricePair.toAmino,
    fromAmino: MsgUpdateOraclePricePair.fromAmino
  },
  "/pryzm.amm.v1.MsgDeleteOraclePricePair": {
    aminoType: "pryzm/amm/v1/DeleteOraclePricePair",
    toAmino: MsgDeleteOraclePricePair.toAmino,
    fromAmino: MsgDeleteOraclePricePair.fromAmino
  },
  "/pryzm.amm.v1.MsgSetSwapProtocolFee": {
    aminoType: "pryzm/amm/v1/SetSwapProtocolFee",
    toAmino: MsgSetSwapProtocolFee.toAmino,
    fromAmino: MsgSetSwapProtocolFee.fromAmino
  },
  "/pryzm.amm.v1.MsgSetJoinExitProtocolFee": {
    aminoType: "pryzm/amm/v1/SetJoinExitProtocolFee",
    toAmino: MsgSetJoinExitProtocolFee.toAmino,
    fromAmino: MsgSetJoinExitProtocolFee.fromAmino
  },
  "/pryzm.amm.v1.MsgIntroduceYammLpToWeightedPool": {
    aminoType: "pryzm/amm/v1/IntroYammLpToWeighted",
    toAmino: MsgIntroduceYammLpToWeightedPool.toAmino,
    fromAmino: MsgIntroduceYammLpToWeightedPool.fromAmino
  },
  "/pryzm.amm.v1.MsgIntroduceAssetBaseTokenToWeightedPool": {
    aminoType: "pryzm/amm/v1/IntroBaseTokenToWeighted",
    toAmino: MsgIntroduceAssetBaseTokenToWeightedPool.toAmino,
    fromAmino: MsgIntroduceAssetBaseTokenToWeightedPool.fromAmino
  },
  "/pryzm.amm.v1.MsgCancelPendingTokenIntroduction": {
    aminoType: "pryzm/amm/v1/CancelPendingTokenIntro",
    toAmino: MsgCancelPendingTokenIntroduction.toAmino,
    fromAmino: MsgCancelPendingTokenIntroduction.fromAmino
  },
  "/pryzm.amm.v1.MsgRemoveTokenFromWeightedPool": {
    aminoType: "pryzm/amm/v1/RemoveTokenFromWeighted",
    toAmino: MsgRemoveTokenFromWeightedPool.toAmino,
    fromAmino: MsgRemoveTokenFromWeightedPool.fromAmino
  },
  "/pryzm.amm.v1.MsgUpdateParams": {
    aminoType: "pryzm/amm/v1/UpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/pryzm.amm.v1.MsgAddMaturityToYamm": {
    aminoType: "pryzm/amm/v1/AddMaturityToYamm",
    toAmino: MsgAddMaturityToYamm.toAmino,
    fromAmino: MsgAddMaturityToYamm.fromAmino
  },
  "/pryzm.amm.v1.MsgSetInitializationAllowList": {
    aminoType: "pryzm/amm/v1/SetInitializationAllowList",
    toAmino: MsgSetInitializationAllowList.toAmino,
    fromAmino: MsgSetInitializationAllowList.fromAmino
  },
  "/pryzm.amm.v1.MsgSetPoolAdmins": {
    aminoType: "pryzm/amm/v1/SetPoolAdmins",
    toAmino: MsgSetPoolAdmins.toAmino,
    fromAmino: MsgSetPoolAdmins.fromAmino
  },
  "/pryzm.amm.v1.MsgSetPoolJoinBlocked": {
    aminoType: "pryzm/amm/v1/SetPoolJoinBlocked",
    toAmino: MsgSetPoolJoinBlocked.toAmino,
    fromAmino: MsgSetPoolJoinBlocked.fromAmino
  },
  "/pryzm.amm.v1.MsgSetPauseAllowList": {
    aminoType: "pryzm/amm/v1/SetPauseAllowList",
    toAmino: MsgSetPauseAllowList.toAmino,
    fromAmino: MsgSetPauseAllowList.fromAmino
  },
  "/pryzm.amm.v1.MsgSetPauseWindow": {
    aminoType: "pryzm/amm/v1/SetPauseWindow",
    toAmino: MsgSetPauseWindow.toAmino,
    fromAmino: MsgSetPauseWindow.fromAmino
  },
  "/pryzm.amm.v1.MsgSetOrderPairDisabled": {
    aminoType: "pryzm/amm/v1/SetOrderPairDisabled",
    toAmino: MsgSetOrderPairDisabled.toAmino,
    fromAmino: MsgSetOrderPairDisabled.fromAmino
  }
};