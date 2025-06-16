import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgBond, MsgBondResponse, MsgUnbond, MsgUnbondResponse, MsgClaimReward, MsgClaimRewardResponse, MsgExitPool, MsgExitPoolResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  bond(request: MsgBond): Promise<MsgBondResponse>;
  unbond(request: MsgUnbond): Promise<MsgUnbondResponse>;
  claimReward(request: MsgClaimReward): Promise<MsgClaimRewardResponse>;
  exitPool(request: MsgExitPool): Promise<MsgExitPoolResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.bond = this.bond.bind(this);
    this.unbond = this.unbond.bind(this);
    this.claimReward = this.claimReward.bind(this);
    this.exitPool = this.exitPool.bind(this);
  }
  bond(request: MsgBond, useInterfaces: boolean = true): Promise<MsgBondResponse> {
    const data = MsgBond.encode(request).finish();
    const promise = this.rpc.request("pryzm.ystaking.v1.Msg", "Bond", data);
    return promise.then(data => MsgBondResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unbond(request: MsgUnbond, useInterfaces: boolean = true): Promise<MsgUnbondResponse> {
    const data = MsgUnbond.encode(request).finish();
    const promise = this.rpc.request("pryzm.ystaking.v1.Msg", "Unbond", data);
    return promise.then(data => MsgUnbondResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  claimReward(request: MsgClaimReward, useInterfaces: boolean = true): Promise<MsgClaimRewardResponse> {
    const data = MsgClaimReward.encode(request).finish();
    const promise = this.rpc.request("pryzm.ystaking.v1.Msg", "ClaimReward", data);
    return promise.then(data => MsgClaimRewardResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  exitPool(request: MsgExitPool, useInterfaces: boolean = true): Promise<MsgExitPoolResponse> {
    const data = MsgExitPool.encode(request).finish();
    const promise = this.rpc.request("pryzm.ystaking.v1.Msg", "ExitPool", data);
    return promise.then(data => MsgExitPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}