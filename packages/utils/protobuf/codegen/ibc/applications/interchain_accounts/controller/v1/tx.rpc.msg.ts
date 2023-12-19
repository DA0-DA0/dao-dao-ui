import { Rpc } from "../../../../../helpers";
import { BinaryReader } from "../../../../../binary";
import { MsgRegisterInterchainAccount, MsgRegisterInterchainAccountResponse, MsgSendTx, MsgSendTxResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the 27-interchain-accounts/controller Msg service. */
export interface Msg {
  /** RegisterInterchainAccount defines a rpc handler for MsgRegisterInterchainAccount. */
  registerInterchainAccount(request: MsgRegisterInterchainAccount): Promise<MsgRegisterInterchainAccountResponse>;
  /** SendTx defines a rpc handler for MsgSendTx. */
  sendTx(request: MsgSendTx): Promise<MsgSendTxResponse>;
  /** UpdateParams defines a rpc handler for MsgUpdateParams. */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.registerInterchainAccount = this.registerInterchainAccount.bind(this);
    this.sendTx = this.sendTx.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  registerInterchainAccount(request: MsgRegisterInterchainAccount, useInterfaces: boolean = true): Promise<MsgRegisterInterchainAccountResponse> {
    const data = MsgRegisterInterchainAccount.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_accounts.controller.v1.Msg", "RegisterInterchainAccount", data);
    return promise.then(data => MsgRegisterInterchainAccountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  sendTx(request: MsgSendTx, useInterfaces: boolean = true): Promise<MsgSendTxResponse> {
    const data = MsgSendTx.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_accounts.controller.v1.Msg", "SendTx", data);
    return promise.then(data => MsgSendTxResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.interchain_accounts.controller.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}