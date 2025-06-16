import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgCreatePool, MsgCreatePoolResponse, MsgUpdateRewardTokenWeight, MsgUpdateRewardTokenWeightResponse, MsgAddRewardTokenToPool, MsgAddRewardTokenToPoolResponse, MsgBond, MsgBondResponse, MsgUnbond, MsgUnbondResponse, MsgClaimReward, MsgClaimRewardResponse, MsgClaimUnbonding, MsgClaimUnbondingResponse, MsgCancelUnbonding, MsgCancelUnbondingResponse, MsgIncentivizePool, MsgIncentivizePoolResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  createPool(request: MsgCreatePool): Promise<MsgCreatePoolResponse>;
  updateRewardTokenWeight(request: MsgUpdateRewardTokenWeight): Promise<MsgUpdateRewardTokenWeightResponse>;
  addRewardTokenToPool(request: MsgAddRewardTokenToPool): Promise<MsgAddRewardTokenToPoolResponse>;
  bond(request: MsgBond): Promise<MsgBondResponse>;
  unbond(request: MsgUnbond): Promise<MsgUnbondResponse>;
  claimReward(request: MsgClaimReward): Promise<MsgClaimRewardResponse>;
  claimUnbonding(request: MsgClaimUnbonding): Promise<MsgClaimUnbondingResponse>;
  cancelUnbonding(request: MsgCancelUnbonding): Promise<MsgCancelUnbondingResponse>;
  incentivizePool(request: MsgIncentivizePool): Promise<MsgIncentivizePoolResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.createPool = this.createPool.bind(this);
    this.updateRewardTokenWeight = this.updateRewardTokenWeight.bind(this);
    this.addRewardTokenToPool = this.addRewardTokenToPool.bind(this);
    this.bond = this.bond.bind(this);
    this.unbond = this.unbond.bind(this);
    this.claimReward = this.claimReward.bind(this);
    this.claimUnbonding = this.claimUnbonding.bind(this);
    this.cancelUnbonding = this.cancelUnbonding.bind(this);
    this.incentivizePool = this.incentivizePool.bind(this);
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  createPool(request: MsgCreatePool, useInterfaces: boolean = true): Promise<MsgCreatePoolResponse> {
    const data = MsgCreatePool.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Msg", "CreatePool", data);
    return promise.then(data => MsgCreatePoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateRewardTokenWeight(request: MsgUpdateRewardTokenWeight, useInterfaces: boolean = true): Promise<MsgUpdateRewardTokenWeightResponse> {
    const data = MsgUpdateRewardTokenWeight.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Msg", "UpdateRewardTokenWeight", data);
    return promise.then(data => MsgUpdateRewardTokenWeightResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addRewardTokenToPool(request: MsgAddRewardTokenToPool, useInterfaces: boolean = true): Promise<MsgAddRewardTokenToPoolResponse> {
    const data = MsgAddRewardTokenToPool.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Msg", "AddRewardTokenToPool", data);
    return promise.then(data => MsgAddRewardTokenToPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  bond(request: MsgBond, useInterfaces: boolean = true): Promise<MsgBondResponse> {
    const data = MsgBond.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Msg", "Bond", data);
    return promise.then(data => MsgBondResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unbond(request: MsgUnbond, useInterfaces: boolean = true): Promise<MsgUnbondResponse> {
    const data = MsgUnbond.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Msg", "Unbond", data);
    return promise.then(data => MsgUnbondResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  claimReward(request: MsgClaimReward, useInterfaces: boolean = true): Promise<MsgClaimRewardResponse> {
    const data = MsgClaimReward.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Msg", "ClaimReward", data);
    return promise.then(data => MsgClaimRewardResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  claimUnbonding(request: MsgClaimUnbonding, useInterfaces: boolean = true): Promise<MsgClaimUnbondingResponse> {
    const data = MsgClaimUnbonding.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Msg", "ClaimUnbonding", data);
    return promise.then(data => MsgClaimUnbondingResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  cancelUnbonding(request: MsgCancelUnbonding, useInterfaces: boolean = true): Promise<MsgCancelUnbondingResponse> {
    const data = MsgCancelUnbonding.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Msg", "CancelUnbonding", data);
    return promise.then(data => MsgCancelUnbondingResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  incentivizePool(request: MsgIncentivizePool, useInterfaces: boolean = true): Promise<MsgIncentivizePoolResponse> {
    const data = MsgIncentivizePool.encode(request).finish();
    const promise = this.rpc.request("pryzm.incentives.v1.Msg", "IncentivizePool", data);
    return promise.then(data => MsgIncentivizePoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}