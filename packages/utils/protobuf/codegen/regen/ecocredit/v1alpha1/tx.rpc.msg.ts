import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgCreateClass, MsgCreateClassResponse, MsgCreateBatch, MsgCreateBatchResponse, MsgSend, MsgSendResponse, MsgRetire, MsgRetireResponse, MsgCancel, MsgCancelResponse, MsgUpdateClassAdmin, MsgUpdateClassAdminResponse, MsgUpdateClassIssuers, MsgUpdateClassIssuersResponse, MsgUpdateClassMetadata, MsgUpdateClassMetadataResponse } from "./tx";
/** Msg is the regen.ecocredit.v1alpha1 Msg service. */
export interface Msg {
  /**
   * CreateClass creates a new credit class with an approved list of issuers and
   * optional metadata.
   */
  createClass(request: MsgCreateClass): Promise<MsgCreateClassResponse>;
  /**
   * CreateBatch creates a new batch of credits for an existing credit class.
   * This will create a new batch denom with a fixed supply. Issued credits can
   * be distributed to recipients in either tradable or retired form.
   */
  createBatch(request: MsgCreateBatch): Promise<MsgCreateBatchResponse>;
  /**
   * Send sends tradable credits from one account to another account. Sent
   * credits can either be tradable or retired on receipt.
   */
  send(request: MsgSend): Promise<MsgSendResponse>;
  /** Retire retires a specified number of credits in the holder's account. */
  retire(request: MsgRetire): Promise<MsgRetireResponse>;
  /**
   * Cancel removes a number of credits from the holder's account and also
   * deducts them from the tradable supply, effectively cancelling their
   * issuance on Regen Ledger
   */
  cancel(request: MsgCancel): Promise<MsgCancelResponse>;
  /** UpdateClassAdmin updates the credit class admin */
  updateClassAdmin(request: MsgUpdateClassAdmin): Promise<MsgUpdateClassAdminResponse>;
  /** UpdateClassIssuers updates the credit class issuer list */
  updateClassIssuers(request: MsgUpdateClassIssuers): Promise<MsgUpdateClassIssuersResponse>;
  /** UpdateClassMetadata updates the credit class metadata */
  updateClassMetadata(request: MsgUpdateClassMetadata): Promise<MsgUpdateClassMetadataResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createClass = this.createClass.bind(this);
    this.createBatch = this.createBatch.bind(this);
    this.send = this.send.bind(this);
    this.retire = this.retire.bind(this);
    this.cancel = this.cancel.bind(this);
    this.updateClassAdmin = this.updateClassAdmin.bind(this);
    this.updateClassIssuers = this.updateClassIssuers.bind(this);
    this.updateClassMetadata = this.updateClassMetadata.bind(this);
  }
  createClass(request: MsgCreateClass, useInterfaces: boolean = true): Promise<MsgCreateClassResponse> {
    const data = MsgCreateClass.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1alpha1.Msg", "CreateClass", data);
    return promise.then(data => MsgCreateClassResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  createBatch(request: MsgCreateBatch, useInterfaces: boolean = true): Promise<MsgCreateBatchResponse> {
    const data = MsgCreateBatch.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1alpha1.Msg", "CreateBatch", data);
    return promise.then(data => MsgCreateBatchResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  send(request: MsgSend, useInterfaces: boolean = true): Promise<MsgSendResponse> {
    const data = MsgSend.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1alpha1.Msg", "Send", data);
    return promise.then(data => MsgSendResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  retire(request: MsgRetire, useInterfaces: boolean = true): Promise<MsgRetireResponse> {
    const data = MsgRetire.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1alpha1.Msg", "Retire", data);
    return promise.then(data => MsgRetireResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  cancel(request: MsgCancel, useInterfaces: boolean = true): Promise<MsgCancelResponse> {
    const data = MsgCancel.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1alpha1.Msg", "Cancel", data);
    return promise.then(data => MsgCancelResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateClassAdmin(request: MsgUpdateClassAdmin, useInterfaces: boolean = true): Promise<MsgUpdateClassAdminResponse> {
    const data = MsgUpdateClassAdmin.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1alpha1.Msg", "UpdateClassAdmin", data);
    return promise.then(data => MsgUpdateClassAdminResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateClassIssuers(request: MsgUpdateClassIssuers, useInterfaces: boolean = true): Promise<MsgUpdateClassIssuersResponse> {
    const data = MsgUpdateClassIssuers.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1alpha1.Msg", "UpdateClassIssuers", data);
    return promise.then(data => MsgUpdateClassIssuersResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateClassMetadata(request: MsgUpdateClassMetadata, useInterfaces: boolean = true): Promise<MsgUpdateClassMetadataResponse> {
    const data = MsgUpdateClassMetadata.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1alpha1.Msg", "UpdateClassMetadata", data);
    return promise.then(data => MsgUpdateClassMetadataResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}