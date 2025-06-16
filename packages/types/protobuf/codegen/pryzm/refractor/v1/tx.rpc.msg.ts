import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgRefract, MsgRefractResponse, MsgRedeem, MsgRedeemResponse, MsgUpdateParams, MsgUpdateParamsResponse, MsgDepositCAsset, MsgDepositCAssetResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  refract(request: MsgRefract): Promise<MsgRefractResponse>;
  redeem(request: MsgRedeem): Promise<MsgRedeemResponse>;
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  depositCAsset(request: MsgDepositCAsset): Promise<MsgDepositCAssetResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.refract = this.refract.bind(this);
    this.redeem = this.redeem.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.depositCAsset = this.depositCAsset.bind(this);
  }
  refract(request: MsgRefract, useInterfaces: boolean = true): Promise<MsgRefractResponse> {
    const data = MsgRefract.encode(request).finish();
    const promise = this.rpc.request("pryzm.refractor.v1.Msg", "Refract", data);
    return promise.then(data => MsgRefractResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  redeem(request: MsgRedeem, useInterfaces: boolean = true): Promise<MsgRedeemResponse> {
    const data = MsgRedeem.encode(request).finish();
    const promise = this.rpc.request("pryzm.refractor.v1.Msg", "Redeem", data);
    return promise.then(data => MsgRedeemResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("pryzm.refractor.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  depositCAsset(request: MsgDepositCAsset, useInterfaces: boolean = true): Promise<MsgDepositCAssetResponse> {
    const data = MsgDepositCAsset.encode(request).finish();
    const promise = this.rpc.request("pryzm.refractor.v1.Msg", "DepositCAsset", data);
    return promise.then(data => MsgDepositCAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}