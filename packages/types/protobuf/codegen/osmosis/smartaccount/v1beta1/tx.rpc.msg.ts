import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgAddAuthenticator, MsgAddAuthenticatorResponse, MsgRemoveAuthenticator, MsgRemoveAuthenticatorResponse, MsgSetActiveState, MsgSetActiveStateResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  addAuthenticator(request: MsgAddAuthenticator): Promise<MsgAddAuthenticatorResponse>;
  removeAuthenticator(request: MsgRemoveAuthenticator): Promise<MsgRemoveAuthenticatorResponse>;
  /**
   * SetActiveState sets the active state of the authenticator.
   * Primarily used for circuit breaking.
   */
  setActiveState(request: MsgSetActiveState): Promise<MsgSetActiveStateResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.addAuthenticator = this.addAuthenticator.bind(this);
    this.removeAuthenticator = this.removeAuthenticator.bind(this);
    this.setActiveState = this.setActiveState.bind(this);
  }
  addAuthenticator(request: MsgAddAuthenticator, useInterfaces: boolean = true): Promise<MsgAddAuthenticatorResponse> {
    const data = MsgAddAuthenticator.encode(request).finish();
    const promise = this.rpc.request("osmosis.smartaccount.v1beta1.Msg", "AddAuthenticator", data);
    return promise.then(data => MsgAddAuthenticatorResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  removeAuthenticator(request: MsgRemoveAuthenticator, useInterfaces: boolean = true): Promise<MsgRemoveAuthenticatorResponse> {
    const data = MsgRemoveAuthenticator.encode(request).finish();
    const promise = this.rpc.request("osmosis.smartaccount.v1beta1.Msg", "RemoveAuthenticator", data);
    return promise.then(data => MsgRemoveAuthenticatorResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setActiveState(request: MsgSetActiveState, useInterfaces: boolean = true): Promise<MsgSetActiveStateResponse> {
    const data = MsgSetActiveState.encode(request).finish();
    const promise = this.rpc.request("osmosis.smartaccount.v1beta1.Msg", "SetActiveState", data);
    return promise.then(data => MsgSetActiveStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}