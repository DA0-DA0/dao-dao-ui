import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgSingleSwap, MsgSingleSwapResponse, MsgJoinAllTokensExactLpt, MsgJoinAllTokensExactLptResponse, MsgJoinTokenExactLpt, MsgJoinTokenExactLptResponse, MsgJoinExactTokens, MsgJoinExactTokensResponse, MsgZeroImpactJoinYamm, MsgZeroImpactJoinYammResponse, MsgExitExactTokens, MsgExitExactTokensResponse, MsgExitTokenExactLpt, MsgExitTokenExactLptResponse, MsgExitAllTokensExactLpt, MsgExitAllTokensExactLptResponse, MsgCreateWeightedPool, MsgCreateWeightedPoolResponse, MsgUpdateSwapFee, MsgUpdateSwapFeeResponse, MsgInitializePool, MsgInitializePoolResponse, MsgUpdateWeights, MsgUpdateWeightsResponse, MsgBatchSwap, MsgBatchSwapResponse, MsgSetYammConfiguration, MsgSetYammConfigurationResponse, MsgWhitelistRoute, MsgWhitelistRouteResponse, MsgSetWhitelistedRouteEnabled, MsgSetWhitelistedRouteEnabledResponse, MsgSubmitOrder, MsgSubmitOrderResponse, MsgCancelOrder, MsgCancelOrderResponse, MsgProposeMatch, MsgProposeMatchResponse, MsgSetCircuitBreakers, MsgSetCircuitBreakersResponse, MsgSetRecoveryMode, MsgSetRecoveryModeResponse, MsgRecoveryExit, MsgRecoveryExitResponse, MsgSetPauseMode, MsgSetPauseModeResponse, MsgSetVaultPauseMode, MsgSetVaultPauseModeResponse, MsgCreateOraclePricePair, MsgCreateOraclePricePairResponse, MsgUpdateOraclePricePair, MsgUpdateOraclePricePairResponse, MsgDeleteOraclePricePair, MsgDeleteOraclePricePairResponse, MsgSetSwapProtocolFee, MsgSetSwapProtocolFeeResponse, MsgSetJoinExitProtocolFee, MsgSetJoinExitProtocolFeeResponse, MsgIntroduceYammLpToWeightedPool, MsgIntroduceYammLpToWeightedPoolResponse, MsgIntroduceAssetBaseTokenToWeightedPool, MsgIntroduceAssetBaseTokenToWeightedPoolResponse, MsgCancelPendingTokenIntroduction, MsgCancelPendingTokenIntroductionResponse, MsgRemoveTokenFromWeightedPool, MsgRemoveTokenFromWeightedPoolResponse, MsgUpdateParams, MsgUpdateParamsResponse, MsgAddMaturityToYamm, MsgAddMaturityToYammResponse, MsgSetInitializationAllowList, MsgSetInitializationAllowListResponse, MsgSetPoolAdmins, MsgSetPoolAdminsResponse, MsgSetPoolJoinBlocked, MsgSetPoolJoinBlockedResponse, MsgSetPauseAllowList, MsgSetPauseAllowListResponse, MsgSetPauseWindow, MsgSetPauseWindowResponse, MsgSetOrderPairDisabled, MsgSetOrderPairDisabledResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  singleSwap(request: MsgSingleSwap): Promise<MsgSingleSwapResponse>;
  joinAllTokensExactLpt(request: MsgJoinAllTokensExactLpt): Promise<MsgJoinAllTokensExactLptResponse>;
  joinTokenExactLpt(request: MsgJoinTokenExactLpt): Promise<MsgJoinTokenExactLptResponse>;
  joinExactTokens(request: MsgJoinExactTokens): Promise<MsgJoinExactTokensResponse>;
  zeroImpactJoinYamm(request: MsgZeroImpactJoinYamm): Promise<MsgZeroImpactJoinYammResponse>;
  exitExactTokens(request: MsgExitExactTokens): Promise<MsgExitExactTokensResponse>;
  exitTokenExactLpt(request: MsgExitTokenExactLpt): Promise<MsgExitTokenExactLptResponse>;
  exitAllTokensExactLpt(request: MsgExitAllTokensExactLpt): Promise<MsgExitAllTokensExactLptResponse>;
  createWeightedPool(request: MsgCreateWeightedPool): Promise<MsgCreateWeightedPoolResponse>;
  updateSwapFee(request: MsgUpdateSwapFee): Promise<MsgUpdateSwapFeeResponse>;
  initializePool(request: MsgInitializePool): Promise<MsgInitializePoolResponse>;
  updateWeights(request: MsgUpdateWeights): Promise<MsgUpdateWeightsResponse>;
  batchSwap(request: MsgBatchSwap): Promise<MsgBatchSwapResponse>;
  setYammConfiguration(request: MsgSetYammConfiguration): Promise<MsgSetYammConfigurationResponse>;
  whitelistRoute(request: MsgWhitelistRoute): Promise<MsgWhitelistRouteResponse>;
  setWhitelistedRouteEnabled(request: MsgSetWhitelistedRouteEnabled): Promise<MsgSetWhitelistedRouteEnabledResponse>;
  submitOrder(request: MsgSubmitOrder): Promise<MsgSubmitOrderResponse>;
  cancelOrder(request: MsgCancelOrder): Promise<MsgCancelOrderResponse>;
  proposeMatch(request: MsgProposeMatch): Promise<MsgProposeMatchResponse>;
  setCircuitBreakers(request: MsgSetCircuitBreakers): Promise<MsgSetCircuitBreakersResponse>;
  setRecoveryMode(request: MsgSetRecoveryMode): Promise<MsgSetRecoveryModeResponse>;
  recoveryExit(request: MsgRecoveryExit): Promise<MsgRecoveryExitResponse>;
  setPauseMode(request: MsgSetPauseMode): Promise<MsgSetPauseModeResponse>;
  setVaultPauseMode(request: MsgSetVaultPauseMode): Promise<MsgSetVaultPauseModeResponse>;
  createOraclePricePair(request: MsgCreateOraclePricePair): Promise<MsgCreateOraclePricePairResponse>;
  updateOraclePricePair(request: MsgUpdateOraclePricePair): Promise<MsgUpdateOraclePricePairResponse>;
  deleteOraclePricePair(request: MsgDeleteOraclePricePair): Promise<MsgDeleteOraclePricePairResponse>;
  setSwapProtocolFee(request: MsgSetSwapProtocolFee): Promise<MsgSetSwapProtocolFeeResponse>;
  setJoinExitProtocolFee(request: MsgSetJoinExitProtocolFee): Promise<MsgSetJoinExitProtocolFeeResponse>;
  introduceYammLpToWeightedPool(request: MsgIntroduceYammLpToWeightedPool): Promise<MsgIntroduceYammLpToWeightedPoolResponse>;
  introduceAssetBaseTokenToWeightedPool(request: MsgIntroduceAssetBaseTokenToWeightedPool): Promise<MsgIntroduceAssetBaseTokenToWeightedPoolResponse>;
  cancelPendingTokenIntroduction(request: MsgCancelPendingTokenIntroduction): Promise<MsgCancelPendingTokenIntroductionResponse>;
  removeTokenFromWeightedPool(request: MsgRemoveTokenFromWeightedPool): Promise<MsgRemoveTokenFromWeightedPoolResponse>;
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  addMaturityToYamm(request: MsgAddMaturityToYamm): Promise<MsgAddMaturityToYammResponse>;
  setInitializationAllowList(request: MsgSetInitializationAllowList): Promise<MsgSetInitializationAllowListResponse>;
  setPoolAdmins(request: MsgSetPoolAdmins): Promise<MsgSetPoolAdminsResponse>;
  setPoolJoinBlocked(request: MsgSetPoolJoinBlocked): Promise<MsgSetPoolJoinBlockedResponse>;
  setPauseAllowList(request: MsgSetPauseAllowList): Promise<MsgSetPauseAllowListResponse>;
  setPauseWindow(request: MsgSetPauseWindow): Promise<MsgSetPauseWindowResponse>;
  setOrderPairDisabled(request: MsgSetOrderPairDisabled): Promise<MsgSetOrderPairDisabledResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.singleSwap = this.singleSwap.bind(this);
    this.joinAllTokensExactLpt = this.joinAllTokensExactLpt.bind(this);
    this.joinTokenExactLpt = this.joinTokenExactLpt.bind(this);
    this.joinExactTokens = this.joinExactTokens.bind(this);
    this.zeroImpactJoinYamm = this.zeroImpactJoinYamm.bind(this);
    this.exitExactTokens = this.exitExactTokens.bind(this);
    this.exitTokenExactLpt = this.exitTokenExactLpt.bind(this);
    this.exitAllTokensExactLpt = this.exitAllTokensExactLpt.bind(this);
    this.createWeightedPool = this.createWeightedPool.bind(this);
    this.updateSwapFee = this.updateSwapFee.bind(this);
    this.initializePool = this.initializePool.bind(this);
    this.updateWeights = this.updateWeights.bind(this);
    this.batchSwap = this.batchSwap.bind(this);
    this.setYammConfiguration = this.setYammConfiguration.bind(this);
    this.whitelistRoute = this.whitelistRoute.bind(this);
    this.setWhitelistedRouteEnabled = this.setWhitelistedRouteEnabled.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.proposeMatch = this.proposeMatch.bind(this);
    this.setCircuitBreakers = this.setCircuitBreakers.bind(this);
    this.setRecoveryMode = this.setRecoveryMode.bind(this);
    this.recoveryExit = this.recoveryExit.bind(this);
    this.setPauseMode = this.setPauseMode.bind(this);
    this.setVaultPauseMode = this.setVaultPauseMode.bind(this);
    this.createOraclePricePair = this.createOraclePricePair.bind(this);
    this.updateOraclePricePair = this.updateOraclePricePair.bind(this);
    this.deleteOraclePricePair = this.deleteOraclePricePair.bind(this);
    this.setSwapProtocolFee = this.setSwapProtocolFee.bind(this);
    this.setJoinExitProtocolFee = this.setJoinExitProtocolFee.bind(this);
    this.introduceYammLpToWeightedPool = this.introduceYammLpToWeightedPool.bind(this);
    this.introduceAssetBaseTokenToWeightedPool = this.introduceAssetBaseTokenToWeightedPool.bind(this);
    this.cancelPendingTokenIntroduction = this.cancelPendingTokenIntroduction.bind(this);
    this.removeTokenFromWeightedPool = this.removeTokenFromWeightedPool.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.addMaturityToYamm = this.addMaturityToYamm.bind(this);
    this.setInitializationAllowList = this.setInitializationAllowList.bind(this);
    this.setPoolAdmins = this.setPoolAdmins.bind(this);
    this.setPoolJoinBlocked = this.setPoolJoinBlocked.bind(this);
    this.setPauseAllowList = this.setPauseAllowList.bind(this);
    this.setPauseWindow = this.setPauseWindow.bind(this);
    this.setOrderPairDisabled = this.setOrderPairDisabled.bind(this);
  }
  singleSwap(request: MsgSingleSwap, useInterfaces: boolean = true): Promise<MsgSingleSwapResponse> {
    const data = MsgSingleSwap.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SingleSwap", data);
    return promise.then(data => MsgSingleSwapResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  joinAllTokensExactLpt(request: MsgJoinAllTokensExactLpt, useInterfaces: boolean = true): Promise<MsgJoinAllTokensExactLptResponse> {
    const data = MsgJoinAllTokensExactLpt.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "JoinAllTokensExactLpt", data);
    return promise.then(data => MsgJoinAllTokensExactLptResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  joinTokenExactLpt(request: MsgJoinTokenExactLpt, useInterfaces: boolean = true): Promise<MsgJoinTokenExactLptResponse> {
    const data = MsgJoinTokenExactLpt.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "JoinTokenExactLpt", data);
    return promise.then(data => MsgJoinTokenExactLptResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  joinExactTokens(request: MsgJoinExactTokens, useInterfaces: boolean = true): Promise<MsgJoinExactTokensResponse> {
    const data = MsgJoinExactTokens.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "JoinExactTokens", data);
    return promise.then(data => MsgJoinExactTokensResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  zeroImpactJoinYamm(request: MsgZeroImpactJoinYamm, useInterfaces: boolean = true): Promise<MsgZeroImpactJoinYammResponse> {
    const data = MsgZeroImpactJoinYamm.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "ZeroImpactJoinYamm", data);
    return promise.then(data => MsgZeroImpactJoinYammResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  exitExactTokens(request: MsgExitExactTokens, useInterfaces: boolean = true): Promise<MsgExitExactTokensResponse> {
    const data = MsgExitExactTokens.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "ExitExactTokens", data);
    return promise.then(data => MsgExitExactTokensResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  exitTokenExactLpt(request: MsgExitTokenExactLpt, useInterfaces: boolean = true): Promise<MsgExitTokenExactLptResponse> {
    const data = MsgExitTokenExactLpt.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "ExitTokenExactLpt", data);
    return promise.then(data => MsgExitTokenExactLptResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  exitAllTokensExactLpt(request: MsgExitAllTokensExactLpt, useInterfaces: boolean = true): Promise<MsgExitAllTokensExactLptResponse> {
    const data = MsgExitAllTokensExactLpt.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "ExitAllTokensExactLpt", data);
    return promise.then(data => MsgExitAllTokensExactLptResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  createWeightedPool(request: MsgCreateWeightedPool, useInterfaces: boolean = true): Promise<MsgCreateWeightedPoolResponse> {
    const data = MsgCreateWeightedPool.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "CreateWeightedPool", data);
    return promise.then(data => MsgCreateWeightedPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateSwapFee(request: MsgUpdateSwapFee, useInterfaces: boolean = true): Promise<MsgUpdateSwapFeeResponse> {
    const data = MsgUpdateSwapFee.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "UpdateSwapFee", data);
    return promise.then(data => MsgUpdateSwapFeeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  initializePool(request: MsgInitializePool, useInterfaces: boolean = true): Promise<MsgInitializePoolResponse> {
    const data = MsgInitializePool.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "InitializePool", data);
    return promise.then(data => MsgInitializePoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateWeights(request: MsgUpdateWeights, useInterfaces: boolean = true): Promise<MsgUpdateWeightsResponse> {
    const data = MsgUpdateWeights.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "UpdateWeights", data);
    return promise.then(data => MsgUpdateWeightsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  batchSwap(request: MsgBatchSwap, useInterfaces: boolean = true): Promise<MsgBatchSwapResponse> {
    const data = MsgBatchSwap.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "BatchSwap", data);
    return promise.then(data => MsgBatchSwapResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setYammConfiguration(request: MsgSetYammConfiguration, useInterfaces: boolean = true): Promise<MsgSetYammConfigurationResponse> {
    const data = MsgSetYammConfiguration.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SetYammConfiguration", data);
    return promise.then(data => MsgSetYammConfigurationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  whitelistRoute(request: MsgWhitelistRoute, useInterfaces: boolean = true): Promise<MsgWhitelistRouteResponse> {
    const data = MsgWhitelistRoute.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "WhitelistRoute", data);
    return promise.then(data => MsgWhitelistRouteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setWhitelistedRouteEnabled(request: MsgSetWhitelistedRouteEnabled, useInterfaces: boolean = true): Promise<MsgSetWhitelistedRouteEnabledResponse> {
    const data = MsgSetWhitelistedRouteEnabled.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SetWhitelistedRouteEnabled", data);
    return promise.then(data => MsgSetWhitelistedRouteEnabledResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  submitOrder(request: MsgSubmitOrder, useInterfaces: boolean = true): Promise<MsgSubmitOrderResponse> {
    const data = MsgSubmitOrder.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SubmitOrder", data);
    return promise.then(data => MsgSubmitOrderResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  cancelOrder(request: MsgCancelOrder, useInterfaces: boolean = true): Promise<MsgCancelOrderResponse> {
    const data = MsgCancelOrder.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "CancelOrder", data);
    return promise.then(data => MsgCancelOrderResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  proposeMatch(request: MsgProposeMatch, useInterfaces: boolean = true): Promise<MsgProposeMatchResponse> {
    const data = MsgProposeMatch.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "ProposeMatch", data);
    return promise.then(data => MsgProposeMatchResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setCircuitBreakers(request: MsgSetCircuitBreakers, useInterfaces: boolean = true): Promise<MsgSetCircuitBreakersResponse> {
    const data = MsgSetCircuitBreakers.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SetCircuitBreakers", data);
    return promise.then(data => MsgSetCircuitBreakersResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setRecoveryMode(request: MsgSetRecoveryMode, useInterfaces: boolean = true): Promise<MsgSetRecoveryModeResponse> {
    const data = MsgSetRecoveryMode.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SetRecoveryMode", data);
    return promise.then(data => MsgSetRecoveryModeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  recoveryExit(request: MsgRecoveryExit, useInterfaces: boolean = true): Promise<MsgRecoveryExitResponse> {
    const data = MsgRecoveryExit.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "RecoveryExit", data);
    return promise.then(data => MsgRecoveryExitResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setPauseMode(request: MsgSetPauseMode, useInterfaces: boolean = true): Promise<MsgSetPauseModeResponse> {
    const data = MsgSetPauseMode.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SetPauseMode", data);
    return promise.then(data => MsgSetPauseModeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setVaultPauseMode(request: MsgSetVaultPauseMode, useInterfaces: boolean = true): Promise<MsgSetVaultPauseModeResponse> {
    const data = MsgSetVaultPauseMode.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SetVaultPauseMode", data);
    return promise.then(data => MsgSetVaultPauseModeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  createOraclePricePair(request: MsgCreateOraclePricePair, useInterfaces: boolean = true): Promise<MsgCreateOraclePricePairResponse> {
    const data = MsgCreateOraclePricePair.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "CreateOraclePricePair", data);
    return promise.then(data => MsgCreateOraclePricePairResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateOraclePricePair(request: MsgUpdateOraclePricePair, useInterfaces: boolean = true): Promise<MsgUpdateOraclePricePairResponse> {
    const data = MsgUpdateOraclePricePair.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "UpdateOraclePricePair", data);
    return promise.then(data => MsgUpdateOraclePricePairResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  deleteOraclePricePair(request: MsgDeleteOraclePricePair, useInterfaces: boolean = true): Promise<MsgDeleteOraclePricePairResponse> {
    const data = MsgDeleteOraclePricePair.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "DeleteOraclePricePair", data);
    return promise.then(data => MsgDeleteOraclePricePairResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setSwapProtocolFee(request: MsgSetSwapProtocolFee, useInterfaces: boolean = true): Promise<MsgSetSwapProtocolFeeResponse> {
    const data = MsgSetSwapProtocolFee.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SetSwapProtocolFee", data);
    return promise.then(data => MsgSetSwapProtocolFeeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setJoinExitProtocolFee(request: MsgSetJoinExitProtocolFee, useInterfaces: boolean = true): Promise<MsgSetJoinExitProtocolFeeResponse> {
    const data = MsgSetJoinExitProtocolFee.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SetJoinExitProtocolFee", data);
    return promise.then(data => MsgSetJoinExitProtocolFeeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  introduceYammLpToWeightedPool(request: MsgIntroduceYammLpToWeightedPool, useInterfaces: boolean = true): Promise<MsgIntroduceYammLpToWeightedPoolResponse> {
    const data = MsgIntroduceYammLpToWeightedPool.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "IntroduceYammLpToWeightedPool", data);
    return promise.then(data => MsgIntroduceYammLpToWeightedPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  introduceAssetBaseTokenToWeightedPool(request: MsgIntroduceAssetBaseTokenToWeightedPool, useInterfaces: boolean = true): Promise<MsgIntroduceAssetBaseTokenToWeightedPoolResponse> {
    const data = MsgIntroduceAssetBaseTokenToWeightedPool.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "IntroduceAssetBaseTokenToWeightedPool", data);
    return promise.then(data => MsgIntroduceAssetBaseTokenToWeightedPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  cancelPendingTokenIntroduction(request: MsgCancelPendingTokenIntroduction, useInterfaces: boolean = true): Promise<MsgCancelPendingTokenIntroductionResponse> {
    const data = MsgCancelPendingTokenIntroduction.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "CancelPendingTokenIntroduction", data);
    return promise.then(data => MsgCancelPendingTokenIntroductionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  removeTokenFromWeightedPool(request: MsgRemoveTokenFromWeightedPool, useInterfaces: boolean = true): Promise<MsgRemoveTokenFromWeightedPoolResponse> {
    const data = MsgRemoveTokenFromWeightedPool.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "RemoveTokenFromWeightedPool", data);
    return promise.then(data => MsgRemoveTokenFromWeightedPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addMaturityToYamm(request: MsgAddMaturityToYamm, useInterfaces: boolean = true): Promise<MsgAddMaturityToYammResponse> {
    const data = MsgAddMaturityToYamm.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "AddMaturityToYamm", data);
    return promise.then(data => MsgAddMaturityToYammResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setInitializationAllowList(request: MsgSetInitializationAllowList, useInterfaces: boolean = true): Promise<MsgSetInitializationAllowListResponse> {
    const data = MsgSetInitializationAllowList.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SetInitializationAllowList", data);
    return promise.then(data => MsgSetInitializationAllowListResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setPoolAdmins(request: MsgSetPoolAdmins, useInterfaces: boolean = true): Promise<MsgSetPoolAdminsResponse> {
    const data = MsgSetPoolAdmins.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SetPoolAdmins", data);
    return promise.then(data => MsgSetPoolAdminsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setPoolJoinBlocked(request: MsgSetPoolJoinBlocked, useInterfaces: boolean = true): Promise<MsgSetPoolJoinBlockedResponse> {
    const data = MsgSetPoolJoinBlocked.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SetPoolJoinBlocked", data);
    return promise.then(data => MsgSetPoolJoinBlockedResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setPauseAllowList(request: MsgSetPauseAllowList, useInterfaces: boolean = true): Promise<MsgSetPauseAllowListResponse> {
    const data = MsgSetPauseAllowList.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SetPauseAllowList", data);
    return promise.then(data => MsgSetPauseAllowListResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setPauseWindow(request: MsgSetPauseWindow, useInterfaces: boolean = true): Promise<MsgSetPauseWindowResponse> {
    const data = MsgSetPauseWindow.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SetPauseWindow", data);
    return promise.then(data => MsgSetPauseWindowResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setOrderPairDisabled(request: MsgSetOrderPairDisabled, useInterfaces: boolean = true): Promise<MsgSetOrderPairDisabledResponse> {
    const data = MsgSetOrderPairDisabled.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v1.Msg", "SetOrderPairDisabled", data);
    return promise.then(data => MsgSetOrderPairDisabledResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}