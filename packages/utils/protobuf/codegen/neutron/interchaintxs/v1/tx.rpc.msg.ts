import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgRegisterInterchainAccount, MsgRegisterInterchainAccountResponse, MsgSubmitTx, MsgSubmitTxResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  registerInterchainAccount(request: MsgRegisterInterchainAccount): Promise<MsgRegisterInterchainAccountResponse>;
  submitTx(request: MsgSubmitTx): Promise<MsgSubmitTxResponse>;
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.registerInterchainAccount = this.registerInterchainAccount.bind(this);
    this.submitTx = this.submitTx.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  registerInterchainAccount(request: MsgRegisterInterchainAccount, useInterfaces: boolean = true): Promise<MsgRegisterInterchainAccountResponse> {
    const data = MsgRegisterInterchainAccount.encode(request).finish();
    const promise = this.rpc.request("neutron.interchaintxs.v1.Msg", "RegisterInterchainAccount", data);
    return promise.then(data => MsgRegisterInterchainAccountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  submitTx(request: MsgSubmitTx, useInterfaces: boolean = true): Promise<MsgSubmitTxResponse> {
    const data = MsgSubmitTx.encode(request).finish();
    const promise = this.rpc.request("neutron.interchaintxs.v1.Msg", "SubmitTx", data);
    return promise.then(data => MsgSubmitTxResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("neutron.interchaintxs.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}