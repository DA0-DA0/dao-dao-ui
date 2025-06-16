import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgDappAccountSpend, MsgDappAccountSpendResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  dappAccountSpend(request: MsgDappAccountSpend): Promise<MsgDappAccountSpendResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.dappAccountSpend = this.dappAccountSpend.bind(this);
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("pryzm.mint.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  dappAccountSpend(request: MsgDappAccountSpend, useInterfaces: boolean = true): Promise<MsgDappAccountSpendResponse> {
    const data = MsgDappAccountSpend.encode(request).finish();
    const promise = this.rpc.request("pryzm.mint.v1.Msg", "DappAccountSpend", data);
    return promise.then(data => MsgDappAccountSpendResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}