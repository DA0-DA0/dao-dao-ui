import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgCreateHostChain, MsgCreateHostChainResponse, MsgUpdateHostChain, MsgUpdateHostChainResponse, MsgDeleteHostChain, MsgDeleteHostChainResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  createHostChain(request: MsgCreateHostChain): Promise<MsgCreateHostChainResponse>;
  updateHostChain(request: MsgUpdateHostChain): Promise<MsgUpdateHostChainResponse>;
  deleteHostChain(request: MsgDeleteHostChain): Promise<MsgDeleteHostChainResponse>;
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createHostChain = this.createHostChain.bind(this);
    this.updateHostChain = this.updateHostChain.bind(this);
    this.deleteHostChain = this.deleteHostChain.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  createHostChain(request: MsgCreateHostChain, useInterfaces: boolean = true): Promise<MsgCreateHostChainResponse> {
    const data = MsgCreateHostChain.encode(request).finish();
    const promise = this.rpc.request("pstake.ratesync.v1beta1.Msg", "CreateHostChain", data);
    return promise.then(data => MsgCreateHostChainResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateHostChain(request: MsgUpdateHostChain, useInterfaces: boolean = true): Promise<MsgUpdateHostChainResponse> {
    const data = MsgUpdateHostChain.encode(request).finish();
    const promise = this.rpc.request("pstake.ratesync.v1beta1.Msg", "UpdateHostChain", data);
    return promise.then(data => MsgUpdateHostChainResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  deleteHostChain(request: MsgDeleteHostChain, useInterfaces: boolean = true): Promise<MsgDeleteHostChainResponse> {
    const data = MsgDeleteHostChain.encode(request).finish();
    const promise = this.rpc.request("pstake.ratesync.v1beta1.Msg", "DeleteHostChain", data);
    return promise.then(data => MsgDeleteHostChainResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("pstake.ratesync.v1beta1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}