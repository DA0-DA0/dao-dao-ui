import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgBond, MsgBondResponse, MsgUnbond, MsgUnbondResponse, MsgUpdateParams, MsgUpdateParamsResponse, MsgAddPool, MsgAddPoolResponse, MsgUpdatePool, MsgUpdatePoolResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  bond(request: MsgBond): Promise<MsgBondResponse>;
  unbond(request: MsgUnbond): Promise<MsgUnbondResponse>;
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  addPool(request: MsgAddPool): Promise<MsgAddPoolResponse>;
  updatePool(request: MsgUpdatePool): Promise<MsgUpdatePoolResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.bond = this.bond.bind(this);
    this.unbond = this.unbond.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.addPool = this.addPool.bind(this);
    this.updatePool = this.updatePool.bind(this);
  }
  bond(request: MsgBond, useInterfaces: boolean = true): Promise<MsgBondResponse> {
    const data = MsgBond.encode(request).finish();
    const promise = this.rpc.request("elys.stablestake.Msg", "Bond", data);
    return promise.then(data => MsgBondResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unbond(request: MsgUnbond, useInterfaces: boolean = true): Promise<MsgUnbondResponse> {
    const data = MsgUnbond.encode(request).finish();
    const promise = this.rpc.request("elys.stablestake.Msg", "Unbond", data);
    return promise.then(data => MsgUnbondResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("elys.stablestake.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addPool(request: MsgAddPool, useInterfaces: boolean = true): Promise<MsgAddPoolResponse> {
    const data = MsgAddPool.encode(request).finish();
    const promise = this.rpc.request("elys.stablestake.Msg", "AddPool", data);
    return promise.then(data => MsgAddPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updatePool(request: MsgUpdatePool, useInterfaces: boolean = true): Promise<MsgUpdatePoolResponse> {
    const data = MsgUpdatePool.encode(request).finish();
    const promise = this.rpc.request("elys.stablestake.Msg", "UpdatePool", data);
    return promise.then(data => MsgUpdatePoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}