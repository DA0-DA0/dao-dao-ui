import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgDeleteAdmin, MsgDeleteAdminResponse, MsgAddAdmin, MsgAddAdminResponse, MsgSubmitProposal, MsgSubmitProposalResponse, MsgSubmitProposalLegacy, MsgSubmitProposalLegacyResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  deleteAdmin(request: MsgDeleteAdmin): Promise<MsgDeleteAdminResponse>;
  addAdmin(request: MsgAddAdmin): Promise<MsgAddAdminResponse>;
  submitProposal(request: MsgSubmitProposal): Promise<MsgSubmitProposalResponse>;
  submitProposalLegacy(request: MsgSubmitProposalLegacy): Promise<MsgSubmitProposalLegacyResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.deleteAdmin = this.deleteAdmin.bind(this);
    this.addAdmin = this.addAdmin.bind(this);
    this.submitProposal = this.submitProposal.bind(this);
    this.submitProposalLegacy = this.submitProposalLegacy.bind(this);
  }
  deleteAdmin(request: MsgDeleteAdmin, useInterfaces: boolean = true): Promise<MsgDeleteAdminResponse> {
    const data = MsgDeleteAdmin.encode(request).finish();
    const promise = this.rpc.request("cosmos.adminmodule.adminmodule.Msg", "DeleteAdmin", data);
    return promise.then(data => MsgDeleteAdminResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addAdmin(request: MsgAddAdmin, useInterfaces: boolean = true): Promise<MsgAddAdminResponse> {
    const data = MsgAddAdmin.encode(request).finish();
    const promise = this.rpc.request("cosmos.adminmodule.adminmodule.Msg", "AddAdmin", data);
    return promise.then(data => MsgAddAdminResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  submitProposal(request: MsgSubmitProposal, useInterfaces: boolean = true): Promise<MsgSubmitProposalResponse> {
    const data = MsgSubmitProposal.encode(request).finish();
    const promise = this.rpc.request("cosmos.adminmodule.adminmodule.Msg", "SubmitProposal", data);
    return promise.then(data => MsgSubmitProposalResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  submitProposalLegacy(request: MsgSubmitProposalLegacy, useInterfaces: boolean = true): Promise<MsgSubmitProposalLegacyResponse> {
    const data = MsgSubmitProposalLegacy.encode(request).finish();
    const promise = this.rpc.request("cosmos.adminmodule.adminmodule.Msg", "SubmitProposalLegacy", data);
    return promise.then(data => MsgSubmitProposalLegacyResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}