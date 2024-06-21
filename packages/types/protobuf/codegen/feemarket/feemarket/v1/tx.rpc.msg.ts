import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgParams, MsgParamsResponse } from "./tx";
/** Message service defines the types of messages supported by the feemarket
 module. */
export interface Msg {
  /** Params defines a method for updating the feemarket module parameters. */
  params(request: MsgParams): Promise<MsgParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
  }
  params(request: MsgParams, useInterfaces: boolean = true): Promise<MsgParamsResponse> {
    const data = MsgParams.encode(request).finish();
    const promise = this.rpc.request("feemarket.feemarket.v1.Msg", "Params", data);
    return promise.then(data => MsgParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}