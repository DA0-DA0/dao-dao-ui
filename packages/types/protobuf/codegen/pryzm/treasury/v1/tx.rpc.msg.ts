import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgSetAction, MsgSetActionResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  setAction(request: MsgSetAction): Promise<MsgSetActionResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.setAction = this.setAction.bind(this);
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("pryzm.treasury.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setAction(request: MsgSetAction, useInterfaces: boolean = true): Promise<MsgSetActionResponse> {
    const data = MsgSetAction.encode(request).finish();
    const promise = this.rpc.request("pryzm.treasury.v1.Msg", "SetAction", data);
    return promise.then(data => MsgSetActionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}