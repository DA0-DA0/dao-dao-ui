import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgRegisterAccount, MsgRegisterAccountResponse, MsgSubmitTx, MsgSubmitTxResponse } from "./tx";
/** Msg defines the intertx Msg service. */
export interface Msg {
  /** Register defines a rpc handler for MsgRegisterAccount */
  registerAccount(request: MsgRegisterAccount): Promise<MsgRegisterAccountResponse>;
  /** SubmitTx defines a rpc handler for MsgSubmitTx */
  submitTx(request: MsgSubmitTx): Promise<MsgSubmitTxResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.registerAccount = this.registerAccount.bind(this);
    this.submitTx = this.submitTx.bind(this);
  }
  registerAccount(request: MsgRegisterAccount, useInterfaces: boolean = true): Promise<MsgRegisterAccountResponse> {
    const data = MsgRegisterAccount.encode(request).finish();
    const promise = this.rpc.request("regen.intertx.v1.Msg", "RegisterAccount", data);
    return promise.then(data => MsgRegisterAccountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  submitTx(request: MsgSubmitTx, useInterfaces: boolean = true): Promise<MsgSubmitTxResponse> {
    const data = MsgSubmitTx.encode(request).finish();
    const promise = this.rpc.request("regen.intertx.v1.Msg", "SubmitTx", data);
    return promise.then(data => MsgSubmitTxResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}