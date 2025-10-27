import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgLiquidStake, MsgLiquidStakeResponse, MsgLSMLiquidStake, MsgLSMLiquidStakeResponse, MsgRedeemStake, MsgRedeemStakeResponse, MsgRegisterHostZone, MsgRegisterHostZoneResponse, MsgClaimUndelegatedTokens, MsgClaimUndelegatedTokensResponse, MsgRebalanceValidators, MsgRebalanceValidatorsResponse, MsgAddValidators, MsgAddValidatorsResponse, MsgChangeValidatorWeights, MsgChangeValidatorWeightsResponse, MsgDeleteValidator, MsgDeleteValidatorResponse, MsgRestoreInterchainAccount, MsgRestoreInterchainAccountResponse, MsgCloseDelegationChannel, MsgCloseDelegationChannelResponse, MsgUpdateValidatorSharesExchRate, MsgUpdateValidatorSharesExchRateResponse, MsgCalibrateDelegation, MsgCalibrateDelegationResponse, MsgClearBalance, MsgClearBalanceResponse, MsgUpdateInnerRedemptionRateBounds, MsgUpdateInnerRedemptionRateBoundsResponse, MsgResumeHostZone, MsgResumeHostZoneResponse, MsgCreateTradeRoute, MsgCreateTradeRouteResponse, MsgDeleteTradeRoute, MsgDeleteTradeRouteResponse, MsgUpdateTradeRoute, MsgUpdateTradeRouteResponse, MsgSetCommunityPoolRebate, MsgSetCommunityPoolRebateResponse, MsgToggleTradeController, MsgToggleTradeControllerResponse, MsgUpdateHostZoneParams, MsgUpdateHostZoneParamsResponse, MsgDeprecateHostZone, MsgDeprecateHostZoneResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  liquidStake(request: MsgLiquidStake): Promise<MsgLiquidStakeResponse>;
  lSMLiquidStake(request: MsgLSMLiquidStake): Promise<MsgLSMLiquidStakeResponse>;
  redeemStake(request: MsgRedeemStake): Promise<MsgRedeemStakeResponse>;
  registerHostZone(request: MsgRegisterHostZone): Promise<MsgRegisterHostZoneResponse>;
  claimUndelegatedTokens(request: MsgClaimUndelegatedTokens): Promise<MsgClaimUndelegatedTokensResponse>;
  rebalanceValidators(request: MsgRebalanceValidators): Promise<MsgRebalanceValidatorsResponse>;
  addValidators(request: MsgAddValidators): Promise<MsgAddValidatorsResponse>;
  changeValidatorWeight(request: MsgChangeValidatorWeights): Promise<MsgChangeValidatorWeightsResponse>;
  deleteValidator(request: MsgDeleteValidator): Promise<MsgDeleteValidatorResponse>;
  restoreInterchainAccount(request: MsgRestoreInterchainAccount): Promise<MsgRestoreInterchainAccountResponse>;
  closeDelegationChannel(request: MsgCloseDelegationChannel): Promise<MsgCloseDelegationChannelResponse>;
  updateValidatorSharesExchRate(request: MsgUpdateValidatorSharesExchRate): Promise<MsgUpdateValidatorSharesExchRateResponse>;
  calibrateDelegation(request: MsgCalibrateDelegation): Promise<MsgCalibrateDelegationResponse>;
  clearBalance(request: MsgClearBalance): Promise<MsgClearBalanceResponse>;
  updateInnerRedemptionRateBounds(request: MsgUpdateInnerRedemptionRateBounds): Promise<MsgUpdateInnerRedemptionRateBoundsResponse>;
  resumeHostZone(request: MsgResumeHostZone): Promise<MsgResumeHostZoneResponse>;
  createTradeRoute(request: MsgCreateTradeRoute): Promise<MsgCreateTradeRouteResponse>;
  deleteTradeRoute(request: MsgDeleteTradeRoute): Promise<MsgDeleteTradeRouteResponse>;
  updateTradeRoute(request: MsgUpdateTradeRoute): Promise<MsgUpdateTradeRouteResponse>;
  setCommunityPoolRebate(request: MsgSetCommunityPoolRebate): Promise<MsgSetCommunityPoolRebateResponse>;
  toggleTradeController(request: MsgToggleTradeController): Promise<MsgToggleTradeControllerResponse>;
  updateHostZoneParams(request: MsgUpdateHostZoneParams): Promise<MsgUpdateHostZoneParamsResponse>;
  deprecateHostZone(request: MsgDeprecateHostZone): Promise<MsgDeprecateHostZoneResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.liquidStake = this.liquidStake.bind(this);
    this.lSMLiquidStake = this.lSMLiquidStake.bind(this);
    this.redeemStake = this.redeemStake.bind(this);
    this.registerHostZone = this.registerHostZone.bind(this);
    this.claimUndelegatedTokens = this.claimUndelegatedTokens.bind(this);
    this.rebalanceValidators = this.rebalanceValidators.bind(this);
    this.addValidators = this.addValidators.bind(this);
    this.changeValidatorWeight = this.changeValidatorWeight.bind(this);
    this.deleteValidator = this.deleteValidator.bind(this);
    this.restoreInterchainAccount = this.restoreInterchainAccount.bind(this);
    this.closeDelegationChannel = this.closeDelegationChannel.bind(this);
    this.updateValidatorSharesExchRate = this.updateValidatorSharesExchRate.bind(this);
    this.calibrateDelegation = this.calibrateDelegation.bind(this);
    this.clearBalance = this.clearBalance.bind(this);
    this.updateInnerRedemptionRateBounds = this.updateInnerRedemptionRateBounds.bind(this);
    this.resumeHostZone = this.resumeHostZone.bind(this);
    this.createTradeRoute = this.createTradeRoute.bind(this);
    this.deleteTradeRoute = this.deleteTradeRoute.bind(this);
    this.updateTradeRoute = this.updateTradeRoute.bind(this);
    this.setCommunityPoolRebate = this.setCommunityPoolRebate.bind(this);
    this.toggleTradeController = this.toggleTradeController.bind(this);
    this.updateHostZoneParams = this.updateHostZoneParams.bind(this);
    this.deprecateHostZone = this.deprecateHostZone.bind(this);
  }
  liquidStake(request: MsgLiquidStake, useInterfaces: boolean = true): Promise<MsgLiquidStakeResponse> {
    const data = MsgLiquidStake.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "LiquidStake", data);
    return promise.then(data => MsgLiquidStakeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  lSMLiquidStake(request: MsgLSMLiquidStake, useInterfaces: boolean = true): Promise<MsgLSMLiquidStakeResponse> {
    const data = MsgLSMLiquidStake.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "LSMLiquidStake", data);
    return promise.then(data => MsgLSMLiquidStakeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  redeemStake(request: MsgRedeemStake, useInterfaces: boolean = true): Promise<MsgRedeemStakeResponse> {
    const data = MsgRedeemStake.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "RedeemStake", data);
    return promise.then(data => MsgRedeemStakeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  registerHostZone(request: MsgRegisterHostZone, useInterfaces: boolean = true): Promise<MsgRegisterHostZoneResponse> {
    const data = MsgRegisterHostZone.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "RegisterHostZone", data);
    return promise.then(data => MsgRegisterHostZoneResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  claimUndelegatedTokens(request: MsgClaimUndelegatedTokens, useInterfaces: boolean = true): Promise<MsgClaimUndelegatedTokensResponse> {
    const data = MsgClaimUndelegatedTokens.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "ClaimUndelegatedTokens", data);
    return promise.then(data => MsgClaimUndelegatedTokensResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  rebalanceValidators(request: MsgRebalanceValidators, useInterfaces: boolean = true): Promise<MsgRebalanceValidatorsResponse> {
    const data = MsgRebalanceValidators.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "RebalanceValidators", data);
    return promise.then(data => MsgRebalanceValidatorsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addValidators(request: MsgAddValidators, useInterfaces: boolean = true): Promise<MsgAddValidatorsResponse> {
    const data = MsgAddValidators.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "AddValidators", data);
    return promise.then(data => MsgAddValidatorsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  changeValidatorWeight(request: MsgChangeValidatorWeights, useInterfaces: boolean = true): Promise<MsgChangeValidatorWeightsResponse> {
    const data = MsgChangeValidatorWeights.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "ChangeValidatorWeight", data);
    return promise.then(data => MsgChangeValidatorWeightsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  deleteValidator(request: MsgDeleteValidator, useInterfaces: boolean = true): Promise<MsgDeleteValidatorResponse> {
    const data = MsgDeleteValidator.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "DeleteValidator", data);
    return promise.then(data => MsgDeleteValidatorResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  restoreInterchainAccount(request: MsgRestoreInterchainAccount, useInterfaces: boolean = true): Promise<MsgRestoreInterchainAccountResponse> {
    const data = MsgRestoreInterchainAccount.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "RestoreInterchainAccount", data);
    return promise.then(data => MsgRestoreInterchainAccountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  closeDelegationChannel(request: MsgCloseDelegationChannel, useInterfaces: boolean = true): Promise<MsgCloseDelegationChannelResponse> {
    const data = MsgCloseDelegationChannel.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "CloseDelegationChannel", data);
    return promise.then(data => MsgCloseDelegationChannelResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateValidatorSharesExchRate(request: MsgUpdateValidatorSharesExchRate, useInterfaces: boolean = true): Promise<MsgUpdateValidatorSharesExchRateResponse> {
    const data = MsgUpdateValidatorSharesExchRate.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "UpdateValidatorSharesExchRate", data);
    return promise.then(data => MsgUpdateValidatorSharesExchRateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  calibrateDelegation(request: MsgCalibrateDelegation, useInterfaces: boolean = true): Promise<MsgCalibrateDelegationResponse> {
    const data = MsgCalibrateDelegation.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "CalibrateDelegation", data);
    return promise.then(data => MsgCalibrateDelegationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  clearBalance(request: MsgClearBalance, useInterfaces: boolean = true): Promise<MsgClearBalanceResponse> {
    const data = MsgClearBalance.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "ClearBalance", data);
    return promise.then(data => MsgClearBalanceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateInnerRedemptionRateBounds(request: MsgUpdateInnerRedemptionRateBounds, useInterfaces: boolean = true): Promise<MsgUpdateInnerRedemptionRateBoundsResponse> {
    const data = MsgUpdateInnerRedemptionRateBounds.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "UpdateInnerRedemptionRateBounds", data);
    return promise.then(data => MsgUpdateInnerRedemptionRateBoundsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  resumeHostZone(request: MsgResumeHostZone, useInterfaces: boolean = true): Promise<MsgResumeHostZoneResponse> {
    const data = MsgResumeHostZone.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "ResumeHostZone", data);
    return promise.then(data => MsgResumeHostZoneResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  createTradeRoute(request: MsgCreateTradeRoute, useInterfaces: boolean = true): Promise<MsgCreateTradeRouteResponse> {
    const data = MsgCreateTradeRoute.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "CreateTradeRoute", data);
    return promise.then(data => MsgCreateTradeRouteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  deleteTradeRoute(request: MsgDeleteTradeRoute, useInterfaces: boolean = true): Promise<MsgDeleteTradeRouteResponse> {
    const data = MsgDeleteTradeRoute.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "DeleteTradeRoute", data);
    return promise.then(data => MsgDeleteTradeRouteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateTradeRoute(request: MsgUpdateTradeRoute, useInterfaces: boolean = true): Promise<MsgUpdateTradeRouteResponse> {
    const data = MsgUpdateTradeRoute.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "UpdateTradeRoute", data);
    return promise.then(data => MsgUpdateTradeRouteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setCommunityPoolRebate(request: MsgSetCommunityPoolRebate, useInterfaces: boolean = true): Promise<MsgSetCommunityPoolRebateResponse> {
    const data = MsgSetCommunityPoolRebate.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "SetCommunityPoolRebate", data);
    return promise.then(data => MsgSetCommunityPoolRebateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  toggleTradeController(request: MsgToggleTradeController, useInterfaces: boolean = true): Promise<MsgToggleTradeControllerResponse> {
    const data = MsgToggleTradeController.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "ToggleTradeController", data);
    return promise.then(data => MsgToggleTradeControllerResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateHostZoneParams(request: MsgUpdateHostZoneParams, useInterfaces: boolean = true): Promise<MsgUpdateHostZoneParamsResponse> {
    const data = MsgUpdateHostZoneParams.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "UpdateHostZoneParams", data);
    return promise.then(data => MsgUpdateHostZoneParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  deprecateHostZone(request: MsgDeprecateHostZone, useInterfaces: boolean = true): Promise<MsgDeprecateHostZoneResponse> {
    const data = MsgDeprecateHostZone.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Msg", "DeprecateHostZone", data);
    return promise.then(data => MsgDeprecateHostZoneResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}