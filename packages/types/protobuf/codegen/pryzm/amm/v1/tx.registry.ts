//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSingleSwap, MsgJoinAllTokensExactLpt, MsgJoinTokenExactLpt, MsgJoinExactTokens, MsgZeroImpactJoinYamm, MsgExitExactTokens, MsgExitTokenExactLpt, MsgExitAllTokensExactLpt, MsgCreateWeightedPool, MsgUpdateSwapFee, MsgInitializePool, MsgUpdateWeights, MsgBatchSwap, MsgSetYammConfiguration, MsgWhitelistRoute, MsgSetWhitelistedRouteEnabled, MsgSubmitOrder, MsgCancelOrder, MsgProposeMatch, MsgSetCircuitBreakers, MsgSetRecoveryMode, MsgRecoveryExit, MsgSetPauseMode, MsgSetVaultPauseMode, MsgCreateOraclePricePair, MsgUpdateOraclePricePair, MsgDeleteOraclePricePair, MsgSetSwapProtocolFee, MsgSetJoinExitProtocolFee, MsgIntroduceYammLpToWeightedPool, MsgIntroduceAssetBaseTokenToWeightedPool, MsgCancelPendingTokenIntroduction, MsgRemoveTokenFromWeightedPool, MsgUpdateParams, MsgAddMaturityToYamm, MsgSetInitializationAllowList, MsgSetPoolAdmins, MsgSetPoolJoinBlocked, MsgSetPauseAllowList, MsgSetPauseWindow, MsgSetOrderPairDisabled } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/pryzm.amm.v1.MsgSingleSwap", MsgSingleSwap], ["/pryzm.amm.v1.MsgJoinAllTokensExactLpt", MsgJoinAllTokensExactLpt], ["/pryzm.amm.v1.MsgJoinTokenExactLpt", MsgJoinTokenExactLpt], ["/pryzm.amm.v1.MsgJoinExactTokens", MsgJoinExactTokens], ["/pryzm.amm.v1.MsgZeroImpactJoinYamm", MsgZeroImpactJoinYamm], ["/pryzm.amm.v1.MsgExitExactTokens", MsgExitExactTokens], ["/pryzm.amm.v1.MsgExitTokenExactLpt", MsgExitTokenExactLpt], ["/pryzm.amm.v1.MsgExitAllTokensExactLpt", MsgExitAllTokensExactLpt], ["/pryzm.amm.v1.MsgCreateWeightedPool", MsgCreateWeightedPool], ["/pryzm.amm.v1.MsgUpdateSwapFee", MsgUpdateSwapFee], ["/pryzm.amm.v1.MsgInitializePool", MsgInitializePool], ["/pryzm.amm.v1.MsgUpdateWeights", MsgUpdateWeights], ["/pryzm.amm.v1.MsgBatchSwap", MsgBatchSwap], ["/pryzm.amm.v1.MsgSetYammConfiguration", MsgSetYammConfiguration], ["/pryzm.amm.v1.MsgWhitelistRoute", MsgWhitelistRoute], ["/pryzm.amm.v1.MsgSetWhitelistedRouteEnabled", MsgSetWhitelistedRouteEnabled], ["/pryzm.amm.v1.MsgSubmitOrder", MsgSubmitOrder], ["/pryzm.amm.v1.MsgCancelOrder", MsgCancelOrder], ["/pryzm.amm.v1.MsgProposeMatch", MsgProposeMatch], ["/pryzm.amm.v1.MsgSetCircuitBreakers", MsgSetCircuitBreakers], ["/pryzm.amm.v1.MsgSetRecoveryMode", MsgSetRecoveryMode], ["/pryzm.amm.v1.MsgRecoveryExit", MsgRecoveryExit], ["/pryzm.amm.v1.MsgSetPauseMode", MsgSetPauseMode], ["/pryzm.amm.v1.MsgSetVaultPauseMode", MsgSetVaultPauseMode], ["/pryzm.amm.v1.MsgCreateOraclePricePair", MsgCreateOraclePricePair], ["/pryzm.amm.v1.MsgUpdateOraclePricePair", MsgUpdateOraclePricePair], ["/pryzm.amm.v1.MsgDeleteOraclePricePair", MsgDeleteOraclePricePair], ["/pryzm.amm.v1.MsgSetSwapProtocolFee", MsgSetSwapProtocolFee], ["/pryzm.amm.v1.MsgSetJoinExitProtocolFee", MsgSetJoinExitProtocolFee], ["/pryzm.amm.v1.MsgIntroduceYammLpToWeightedPool", MsgIntroduceYammLpToWeightedPool], ["/pryzm.amm.v1.MsgIntroduceAssetBaseTokenToWeightedPool", MsgIntroduceAssetBaseTokenToWeightedPool], ["/pryzm.amm.v1.MsgCancelPendingTokenIntroduction", MsgCancelPendingTokenIntroduction], ["/pryzm.amm.v1.MsgRemoveTokenFromWeightedPool", MsgRemoveTokenFromWeightedPool], ["/pryzm.amm.v1.MsgUpdateParams", MsgUpdateParams], ["/pryzm.amm.v1.MsgAddMaturityToYamm", MsgAddMaturityToYamm], ["/pryzm.amm.v1.MsgSetInitializationAllowList", MsgSetInitializationAllowList], ["/pryzm.amm.v1.MsgSetPoolAdmins", MsgSetPoolAdmins], ["/pryzm.amm.v1.MsgSetPoolJoinBlocked", MsgSetPoolJoinBlocked], ["/pryzm.amm.v1.MsgSetPauseAllowList", MsgSetPauseAllowList], ["/pryzm.amm.v1.MsgSetPauseWindow", MsgSetPauseWindow], ["/pryzm.amm.v1.MsgSetOrderPairDisabled", MsgSetOrderPairDisabled]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    singleSwap(value: MsgSingleSwap) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSingleSwap",
        value: MsgSingleSwap.encode(value).finish()
      };
    },
    joinAllTokensExactLpt(value: MsgJoinAllTokensExactLpt) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgJoinAllTokensExactLpt",
        value: MsgJoinAllTokensExactLpt.encode(value).finish()
      };
    },
    joinTokenExactLpt(value: MsgJoinTokenExactLpt) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgJoinTokenExactLpt",
        value: MsgJoinTokenExactLpt.encode(value).finish()
      };
    },
    joinExactTokens(value: MsgJoinExactTokens) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgJoinExactTokens",
        value: MsgJoinExactTokens.encode(value).finish()
      };
    },
    zeroImpactJoinYamm(value: MsgZeroImpactJoinYamm) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgZeroImpactJoinYamm",
        value: MsgZeroImpactJoinYamm.encode(value).finish()
      };
    },
    exitExactTokens(value: MsgExitExactTokens) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgExitExactTokens",
        value: MsgExitExactTokens.encode(value).finish()
      };
    },
    exitTokenExactLpt(value: MsgExitTokenExactLpt) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgExitTokenExactLpt",
        value: MsgExitTokenExactLpt.encode(value).finish()
      };
    },
    exitAllTokensExactLpt(value: MsgExitAllTokensExactLpt) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgExitAllTokensExactLpt",
        value: MsgExitAllTokensExactLpt.encode(value).finish()
      };
    },
    createWeightedPool(value: MsgCreateWeightedPool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgCreateWeightedPool",
        value: MsgCreateWeightedPool.encode(value).finish()
      };
    },
    updateSwapFee(value: MsgUpdateSwapFee) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgUpdateSwapFee",
        value: MsgUpdateSwapFee.encode(value).finish()
      };
    },
    initializePool(value: MsgInitializePool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgInitializePool",
        value: MsgInitializePool.encode(value).finish()
      };
    },
    updateWeights(value: MsgUpdateWeights) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgUpdateWeights",
        value: MsgUpdateWeights.encode(value).finish()
      };
    },
    batchSwap(value: MsgBatchSwap) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgBatchSwap",
        value: MsgBatchSwap.encode(value).finish()
      };
    },
    setYammConfiguration(value: MsgSetYammConfiguration) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetYammConfiguration",
        value: MsgSetYammConfiguration.encode(value).finish()
      };
    },
    whitelistRoute(value: MsgWhitelistRoute) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgWhitelistRoute",
        value: MsgWhitelistRoute.encode(value).finish()
      };
    },
    setWhitelistedRouteEnabled(value: MsgSetWhitelistedRouteEnabled) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetWhitelistedRouteEnabled",
        value: MsgSetWhitelistedRouteEnabled.encode(value).finish()
      };
    },
    submitOrder(value: MsgSubmitOrder) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSubmitOrder",
        value: MsgSubmitOrder.encode(value).finish()
      };
    },
    cancelOrder(value: MsgCancelOrder) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgCancelOrder",
        value: MsgCancelOrder.encode(value).finish()
      };
    },
    proposeMatch(value: MsgProposeMatch) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgProposeMatch",
        value: MsgProposeMatch.encode(value).finish()
      };
    },
    setCircuitBreakers(value: MsgSetCircuitBreakers) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetCircuitBreakers",
        value: MsgSetCircuitBreakers.encode(value).finish()
      };
    },
    setRecoveryMode(value: MsgSetRecoveryMode) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetRecoveryMode",
        value: MsgSetRecoveryMode.encode(value).finish()
      };
    },
    recoveryExit(value: MsgRecoveryExit) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgRecoveryExit",
        value: MsgRecoveryExit.encode(value).finish()
      };
    },
    setPauseMode(value: MsgSetPauseMode) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPauseMode",
        value: MsgSetPauseMode.encode(value).finish()
      };
    },
    setVaultPauseMode(value: MsgSetVaultPauseMode) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetVaultPauseMode",
        value: MsgSetVaultPauseMode.encode(value).finish()
      };
    },
    createOraclePricePair(value: MsgCreateOraclePricePair) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgCreateOraclePricePair",
        value: MsgCreateOraclePricePair.encode(value).finish()
      };
    },
    updateOraclePricePair(value: MsgUpdateOraclePricePair) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgUpdateOraclePricePair",
        value: MsgUpdateOraclePricePair.encode(value).finish()
      };
    },
    deleteOraclePricePair(value: MsgDeleteOraclePricePair) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgDeleteOraclePricePair",
        value: MsgDeleteOraclePricePair.encode(value).finish()
      };
    },
    setSwapProtocolFee(value: MsgSetSwapProtocolFee) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetSwapProtocolFee",
        value: MsgSetSwapProtocolFee.encode(value).finish()
      };
    },
    setJoinExitProtocolFee(value: MsgSetJoinExitProtocolFee) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetJoinExitProtocolFee",
        value: MsgSetJoinExitProtocolFee.encode(value).finish()
      };
    },
    introduceYammLpToWeightedPool(value: MsgIntroduceYammLpToWeightedPool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgIntroduceYammLpToWeightedPool",
        value: MsgIntroduceYammLpToWeightedPool.encode(value).finish()
      };
    },
    introduceAssetBaseTokenToWeightedPool(value: MsgIntroduceAssetBaseTokenToWeightedPool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgIntroduceAssetBaseTokenToWeightedPool",
        value: MsgIntroduceAssetBaseTokenToWeightedPool.encode(value).finish()
      };
    },
    cancelPendingTokenIntroduction(value: MsgCancelPendingTokenIntroduction) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgCancelPendingTokenIntroduction",
        value: MsgCancelPendingTokenIntroduction.encode(value).finish()
      };
    },
    removeTokenFromWeightedPool(value: MsgRemoveTokenFromWeightedPool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgRemoveTokenFromWeightedPool",
        value: MsgRemoveTokenFromWeightedPool.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    addMaturityToYamm(value: MsgAddMaturityToYamm) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgAddMaturityToYamm",
        value: MsgAddMaturityToYamm.encode(value).finish()
      };
    },
    setInitializationAllowList(value: MsgSetInitializationAllowList) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetInitializationAllowList",
        value: MsgSetInitializationAllowList.encode(value).finish()
      };
    },
    setPoolAdmins(value: MsgSetPoolAdmins) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPoolAdmins",
        value: MsgSetPoolAdmins.encode(value).finish()
      };
    },
    setPoolJoinBlocked(value: MsgSetPoolJoinBlocked) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPoolJoinBlocked",
        value: MsgSetPoolJoinBlocked.encode(value).finish()
      };
    },
    setPauseAllowList(value: MsgSetPauseAllowList) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPauseAllowList",
        value: MsgSetPauseAllowList.encode(value).finish()
      };
    },
    setPauseWindow(value: MsgSetPauseWindow) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPauseWindow",
        value: MsgSetPauseWindow.encode(value).finish()
      };
    },
    setOrderPairDisabled(value: MsgSetOrderPairDisabled) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetOrderPairDisabled",
        value: MsgSetOrderPairDisabled.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    singleSwap(value: MsgSingleSwap) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSingleSwap",
        value
      };
    },
    joinAllTokensExactLpt(value: MsgJoinAllTokensExactLpt) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgJoinAllTokensExactLpt",
        value
      };
    },
    joinTokenExactLpt(value: MsgJoinTokenExactLpt) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgJoinTokenExactLpt",
        value
      };
    },
    joinExactTokens(value: MsgJoinExactTokens) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgJoinExactTokens",
        value
      };
    },
    zeroImpactJoinYamm(value: MsgZeroImpactJoinYamm) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgZeroImpactJoinYamm",
        value
      };
    },
    exitExactTokens(value: MsgExitExactTokens) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgExitExactTokens",
        value
      };
    },
    exitTokenExactLpt(value: MsgExitTokenExactLpt) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgExitTokenExactLpt",
        value
      };
    },
    exitAllTokensExactLpt(value: MsgExitAllTokensExactLpt) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgExitAllTokensExactLpt",
        value
      };
    },
    createWeightedPool(value: MsgCreateWeightedPool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgCreateWeightedPool",
        value
      };
    },
    updateSwapFee(value: MsgUpdateSwapFee) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgUpdateSwapFee",
        value
      };
    },
    initializePool(value: MsgInitializePool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgInitializePool",
        value
      };
    },
    updateWeights(value: MsgUpdateWeights) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgUpdateWeights",
        value
      };
    },
    batchSwap(value: MsgBatchSwap) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgBatchSwap",
        value
      };
    },
    setYammConfiguration(value: MsgSetYammConfiguration) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetYammConfiguration",
        value
      };
    },
    whitelistRoute(value: MsgWhitelistRoute) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgWhitelistRoute",
        value
      };
    },
    setWhitelistedRouteEnabled(value: MsgSetWhitelistedRouteEnabled) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetWhitelistedRouteEnabled",
        value
      };
    },
    submitOrder(value: MsgSubmitOrder) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSubmitOrder",
        value
      };
    },
    cancelOrder(value: MsgCancelOrder) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgCancelOrder",
        value
      };
    },
    proposeMatch(value: MsgProposeMatch) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgProposeMatch",
        value
      };
    },
    setCircuitBreakers(value: MsgSetCircuitBreakers) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetCircuitBreakers",
        value
      };
    },
    setRecoveryMode(value: MsgSetRecoveryMode) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetRecoveryMode",
        value
      };
    },
    recoveryExit(value: MsgRecoveryExit) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgRecoveryExit",
        value
      };
    },
    setPauseMode(value: MsgSetPauseMode) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPauseMode",
        value
      };
    },
    setVaultPauseMode(value: MsgSetVaultPauseMode) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetVaultPauseMode",
        value
      };
    },
    createOraclePricePair(value: MsgCreateOraclePricePair) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgCreateOraclePricePair",
        value
      };
    },
    updateOraclePricePair(value: MsgUpdateOraclePricePair) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgUpdateOraclePricePair",
        value
      };
    },
    deleteOraclePricePair(value: MsgDeleteOraclePricePair) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgDeleteOraclePricePair",
        value
      };
    },
    setSwapProtocolFee(value: MsgSetSwapProtocolFee) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetSwapProtocolFee",
        value
      };
    },
    setJoinExitProtocolFee(value: MsgSetJoinExitProtocolFee) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetJoinExitProtocolFee",
        value
      };
    },
    introduceYammLpToWeightedPool(value: MsgIntroduceYammLpToWeightedPool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgIntroduceYammLpToWeightedPool",
        value
      };
    },
    introduceAssetBaseTokenToWeightedPool(value: MsgIntroduceAssetBaseTokenToWeightedPool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgIntroduceAssetBaseTokenToWeightedPool",
        value
      };
    },
    cancelPendingTokenIntroduction(value: MsgCancelPendingTokenIntroduction) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgCancelPendingTokenIntroduction",
        value
      };
    },
    removeTokenFromWeightedPool(value: MsgRemoveTokenFromWeightedPool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgRemoveTokenFromWeightedPool",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgUpdateParams",
        value
      };
    },
    addMaturityToYamm(value: MsgAddMaturityToYamm) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgAddMaturityToYamm",
        value
      };
    },
    setInitializationAllowList(value: MsgSetInitializationAllowList) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetInitializationAllowList",
        value
      };
    },
    setPoolAdmins(value: MsgSetPoolAdmins) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPoolAdmins",
        value
      };
    },
    setPoolJoinBlocked(value: MsgSetPoolJoinBlocked) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPoolJoinBlocked",
        value
      };
    },
    setPauseAllowList(value: MsgSetPauseAllowList) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPauseAllowList",
        value
      };
    },
    setPauseWindow(value: MsgSetPauseWindow) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPauseWindow",
        value
      };
    },
    setOrderPairDisabled(value: MsgSetOrderPairDisabled) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetOrderPairDisabled",
        value
      };
    }
  },
  fromPartial: {
    singleSwap(value: MsgSingleSwap) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSingleSwap",
        value: MsgSingleSwap.fromPartial(value)
      };
    },
    joinAllTokensExactLpt(value: MsgJoinAllTokensExactLpt) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgJoinAllTokensExactLpt",
        value: MsgJoinAllTokensExactLpt.fromPartial(value)
      };
    },
    joinTokenExactLpt(value: MsgJoinTokenExactLpt) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgJoinTokenExactLpt",
        value: MsgJoinTokenExactLpt.fromPartial(value)
      };
    },
    joinExactTokens(value: MsgJoinExactTokens) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgJoinExactTokens",
        value: MsgJoinExactTokens.fromPartial(value)
      };
    },
    zeroImpactJoinYamm(value: MsgZeroImpactJoinYamm) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgZeroImpactJoinYamm",
        value: MsgZeroImpactJoinYamm.fromPartial(value)
      };
    },
    exitExactTokens(value: MsgExitExactTokens) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgExitExactTokens",
        value: MsgExitExactTokens.fromPartial(value)
      };
    },
    exitTokenExactLpt(value: MsgExitTokenExactLpt) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgExitTokenExactLpt",
        value: MsgExitTokenExactLpt.fromPartial(value)
      };
    },
    exitAllTokensExactLpt(value: MsgExitAllTokensExactLpt) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgExitAllTokensExactLpt",
        value: MsgExitAllTokensExactLpt.fromPartial(value)
      };
    },
    createWeightedPool(value: MsgCreateWeightedPool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgCreateWeightedPool",
        value: MsgCreateWeightedPool.fromPartial(value)
      };
    },
    updateSwapFee(value: MsgUpdateSwapFee) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgUpdateSwapFee",
        value: MsgUpdateSwapFee.fromPartial(value)
      };
    },
    initializePool(value: MsgInitializePool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgInitializePool",
        value: MsgInitializePool.fromPartial(value)
      };
    },
    updateWeights(value: MsgUpdateWeights) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgUpdateWeights",
        value: MsgUpdateWeights.fromPartial(value)
      };
    },
    batchSwap(value: MsgBatchSwap) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgBatchSwap",
        value: MsgBatchSwap.fromPartial(value)
      };
    },
    setYammConfiguration(value: MsgSetYammConfiguration) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetYammConfiguration",
        value: MsgSetYammConfiguration.fromPartial(value)
      };
    },
    whitelistRoute(value: MsgWhitelistRoute) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgWhitelistRoute",
        value: MsgWhitelistRoute.fromPartial(value)
      };
    },
    setWhitelistedRouteEnabled(value: MsgSetWhitelistedRouteEnabled) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetWhitelistedRouteEnabled",
        value: MsgSetWhitelistedRouteEnabled.fromPartial(value)
      };
    },
    submitOrder(value: MsgSubmitOrder) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSubmitOrder",
        value: MsgSubmitOrder.fromPartial(value)
      };
    },
    cancelOrder(value: MsgCancelOrder) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgCancelOrder",
        value: MsgCancelOrder.fromPartial(value)
      };
    },
    proposeMatch(value: MsgProposeMatch) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgProposeMatch",
        value: MsgProposeMatch.fromPartial(value)
      };
    },
    setCircuitBreakers(value: MsgSetCircuitBreakers) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetCircuitBreakers",
        value: MsgSetCircuitBreakers.fromPartial(value)
      };
    },
    setRecoveryMode(value: MsgSetRecoveryMode) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetRecoveryMode",
        value: MsgSetRecoveryMode.fromPartial(value)
      };
    },
    recoveryExit(value: MsgRecoveryExit) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgRecoveryExit",
        value: MsgRecoveryExit.fromPartial(value)
      };
    },
    setPauseMode(value: MsgSetPauseMode) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPauseMode",
        value: MsgSetPauseMode.fromPartial(value)
      };
    },
    setVaultPauseMode(value: MsgSetVaultPauseMode) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetVaultPauseMode",
        value: MsgSetVaultPauseMode.fromPartial(value)
      };
    },
    createOraclePricePair(value: MsgCreateOraclePricePair) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgCreateOraclePricePair",
        value: MsgCreateOraclePricePair.fromPartial(value)
      };
    },
    updateOraclePricePair(value: MsgUpdateOraclePricePair) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgUpdateOraclePricePair",
        value: MsgUpdateOraclePricePair.fromPartial(value)
      };
    },
    deleteOraclePricePair(value: MsgDeleteOraclePricePair) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgDeleteOraclePricePair",
        value: MsgDeleteOraclePricePair.fromPartial(value)
      };
    },
    setSwapProtocolFee(value: MsgSetSwapProtocolFee) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetSwapProtocolFee",
        value: MsgSetSwapProtocolFee.fromPartial(value)
      };
    },
    setJoinExitProtocolFee(value: MsgSetJoinExitProtocolFee) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetJoinExitProtocolFee",
        value: MsgSetJoinExitProtocolFee.fromPartial(value)
      };
    },
    introduceYammLpToWeightedPool(value: MsgIntroduceYammLpToWeightedPool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgIntroduceYammLpToWeightedPool",
        value: MsgIntroduceYammLpToWeightedPool.fromPartial(value)
      };
    },
    introduceAssetBaseTokenToWeightedPool(value: MsgIntroduceAssetBaseTokenToWeightedPool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgIntroduceAssetBaseTokenToWeightedPool",
        value: MsgIntroduceAssetBaseTokenToWeightedPool.fromPartial(value)
      };
    },
    cancelPendingTokenIntroduction(value: MsgCancelPendingTokenIntroduction) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgCancelPendingTokenIntroduction",
        value: MsgCancelPendingTokenIntroduction.fromPartial(value)
      };
    },
    removeTokenFromWeightedPool(value: MsgRemoveTokenFromWeightedPool) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgRemoveTokenFromWeightedPool",
        value: MsgRemoveTokenFromWeightedPool.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    addMaturityToYamm(value: MsgAddMaturityToYamm) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgAddMaturityToYamm",
        value: MsgAddMaturityToYamm.fromPartial(value)
      };
    },
    setInitializationAllowList(value: MsgSetInitializationAllowList) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetInitializationAllowList",
        value: MsgSetInitializationAllowList.fromPartial(value)
      };
    },
    setPoolAdmins(value: MsgSetPoolAdmins) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPoolAdmins",
        value: MsgSetPoolAdmins.fromPartial(value)
      };
    },
    setPoolJoinBlocked(value: MsgSetPoolJoinBlocked) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPoolJoinBlocked",
        value: MsgSetPoolJoinBlocked.fromPartial(value)
      };
    },
    setPauseAllowList(value: MsgSetPauseAllowList) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPauseAllowList",
        value: MsgSetPauseAllowList.fromPartial(value)
      };
    },
    setPauseWindow(value: MsgSetPauseWindow) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetPauseWindow",
        value: MsgSetPauseWindow.fromPartial(value)
      };
    },
    setOrderPairDisabled(value: MsgSetOrderPairDisabled) {
      return {
        typeUrl: "/pryzm.amm.v1.MsgSetOrderPairDisabled",
        value: MsgSetOrderPairDisabled.fromPartial(value)
      };
    }
  }
};