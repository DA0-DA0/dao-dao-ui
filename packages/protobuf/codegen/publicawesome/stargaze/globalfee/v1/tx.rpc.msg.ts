import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { MsgSetCodeAuthorization, MsgSetCodeAuthorizationResponse, MsgRemoveCodeAuthorization, MsgRemoveCodeAuthorizationResponse, MsgSetContractAuthorization, MsgSetContractAuthorizationResponse, MsgRemoveContractAuthorization, MsgRemoveContractAuthorizationResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the alloc Msg service. */
export interface Msg {
  setCodeAuthorization(request: MsgSetCodeAuthorization): Promise<MsgSetCodeAuthorizationResponse>;
  removeCodeAuthorization(request: MsgRemoveCodeAuthorization): Promise<MsgRemoveCodeAuthorizationResponse>;
  setContractAuthorization(request: MsgSetContractAuthorization): Promise<MsgSetContractAuthorizationResponse>;
  removeContractAuthorization(request: MsgRemoveContractAuthorization): Promise<MsgRemoveContractAuthorizationResponse>;
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.setCodeAuthorization = this.setCodeAuthorization.bind(this);
    this.removeCodeAuthorization = this.removeCodeAuthorization.bind(this);
    this.setContractAuthorization = this.setContractAuthorization.bind(this);
    this.removeContractAuthorization = this.removeContractAuthorization.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  setCodeAuthorization(request: MsgSetCodeAuthorization): Promise<MsgSetCodeAuthorizationResponse> {
    const data = MsgSetCodeAuthorization.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.globalfee.v1.Msg", "SetCodeAuthorization", data);
    return promise.then(data => MsgSetCodeAuthorizationResponse.decode(new BinaryReader(data)));
  }
  removeCodeAuthorization(request: MsgRemoveCodeAuthorization): Promise<MsgRemoveCodeAuthorizationResponse> {
    const data = MsgRemoveCodeAuthorization.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.globalfee.v1.Msg", "RemoveCodeAuthorization", data);
    return promise.then(data => MsgRemoveCodeAuthorizationResponse.decode(new BinaryReader(data)));
  }
  setContractAuthorization(request: MsgSetContractAuthorization): Promise<MsgSetContractAuthorizationResponse> {
    const data = MsgSetContractAuthorization.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.globalfee.v1.Msg", "SetContractAuthorization", data);
    return promise.then(data => MsgSetContractAuthorizationResponse.decode(new BinaryReader(data)));
  }
  removeContractAuthorization(request: MsgRemoveContractAuthorization): Promise<MsgRemoveContractAuthorizationResponse> {
    const data = MsgRemoveContractAuthorization.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.globalfee.v1.Msg", "RemoveContractAuthorization", data);
    return promise.then(data => MsgRemoveContractAuthorizationResponse.decode(new BinaryReader(data)));
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.globalfee.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
}