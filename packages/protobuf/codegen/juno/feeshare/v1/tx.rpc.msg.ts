import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgRegisterFeeShare, MsgRegisterFeeShareResponse, MsgUpdateFeeShare, MsgUpdateFeeShareResponse, MsgCancelFeeShare, MsgCancelFeeShareResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the fees Msg service. */
export interface Msg {
  /** RegisterFeeShare registers a new contract for receiving transaction fees */
  registerFeeShare(request: MsgRegisterFeeShare): Promise<MsgRegisterFeeShareResponse>;
  /** UpdateFeeShare updates the withdrawer address of a FeeShare */
  updateFeeShare(request: MsgUpdateFeeShare): Promise<MsgUpdateFeeShareResponse>;
  /**
   * CancelFeeShare cancels a contract's fee registration and further receival
   * of transaction fees
   */
  cancelFeeShare(request: MsgCancelFeeShare): Promise<MsgCancelFeeShareResponse>;
  /** Update the params of the module through gov v1 type. */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.registerFeeShare = this.registerFeeShare.bind(this);
    this.updateFeeShare = this.updateFeeShare.bind(this);
    this.cancelFeeShare = this.cancelFeeShare.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  registerFeeShare(request: MsgRegisterFeeShare): Promise<MsgRegisterFeeShareResponse> {
    const data = MsgRegisterFeeShare.encode(request).finish();
    const promise = this.rpc.request("juno.feeshare.v1.Msg", "RegisterFeeShare", data);
    return promise.then(data => MsgRegisterFeeShareResponse.decode(new BinaryReader(data)));
  }
  updateFeeShare(request: MsgUpdateFeeShare): Promise<MsgUpdateFeeShareResponse> {
    const data = MsgUpdateFeeShare.encode(request).finish();
    const promise = this.rpc.request("juno.feeshare.v1.Msg", "UpdateFeeShare", data);
    return promise.then(data => MsgUpdateFeeShareResponse.decode(new BinaryReader(data)));
  }
  cancelFeeShare(request: MsgCancelFeeShare): Promise<MsgCancelFeeShareResponse> {
    const data = MsgCancelFeeShare.encode(request).finish();
    const promise = this.rpc.request("juno.feeshare.v1.Msg", "CancelFeeShare", data);
    return promise.then(data => MsgCancelFeeShareResponse.decode(new BinaryReader(data)));
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("juno.feeshare.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
}