import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgCreateClass, MsgCreateClassResponse, MsgCreateProject, MsgCreateProjectResponse, MsgCreateBatch, MsgCreateBatchResponse, MsgMintBatchCredits, MsgMintBatchCreditsResponse, MsgSealBatch, MsgSealBatchResponse, MsgSend, MsgSendResponse, MsgRetire, MsgRetireResponse, MsgCancel, MsgCancelResponse, MsgUpdateClassAdmin, MsgUpdateClassAdminResponse, MsgUpdateClassIssuers, MsgUpdateClassIssuersResponse, MsgUpdateClassMetadata, MsgUpdateClassMetadataResponse, MsgUpdateProjectAdmin, MsgUpdateProjectAdminResponse, MsgUpdateProjectMetadata, MsgUpdateProjectMetadataResponse, MsgUpdateBatchMetadata, MsgUpdateBatchMetadataResponse, MsgBridge, MsgBridgeResponse, MsgBridgeReceive, MsgBridgeReceiveResponse, MsgAddCreditType, MsgAddCreditTypeResponse, MsgSetClassCreatorAllowlist, MsgSetClassCreatorAllowlistResponse, MsgAddClassCreator, MsgAddClassCreatorResponse, MsgRemoveClassCreator, MsgRemoveClassCreatorResponse, MsgUpdateClassFee, MsgUpdateClassFeeResponse, MsgAddAllowedBridgeChain, MsgAddAllowedBridgeChainResponse, MsgRemoveAllowedBridgeChain, MsgRemoveAllowedBridgeChainResponse, MsgBurnRegen, MsgBurnRegenResponse } from "./tx";
/** Msg is the regen.ecocredit.v1 Msg service. */
export interface Msg {
  /**
   * CreateClass creates a new credit class under the given credit type with an
   * approved list of issuers and optional metadata. If the class fee parameter
   * is set, the fee field must be populated with equal value. A greater fee can
   * be provided, however, the creator will only be charged the amount specified
   * in the fee parameter. The creator of the credit class becomes the admin of
   * the credit class upon creation.
   */
  createClass(request: MsgCreateClass): Promise<MsgCreateClassResponse>;
  /**
   * CreateProject creates a new project under the given credit class with a
   * jurisdiction, optional metadata, and an optional reference ID. The creator
   * of the project must be an approved credit class issuer for the given credit
   * class. The creator becomes the admin of the project upon creation.
   */
  createProject(request: MsgCreateProject): Promise<MsgCreateProjectResponse>;
  /**
   * CreateBatch creates a new batch of credits under the given project with a
   * start and end date representing the monitoring period, a list of credits to
   * be issued with each issuance specifying a recipient, the amount of tradable
   * and retired credits, and the retirement jurisdiction (if credits are to be
   * retired upon receipt), and optional metadata. The credit batch creator must
   * be listed as an approved issuer within the credit class of the project that
   * the credits are being issued under.
   * 
   * The default behavior is for a new credit batch to be "sealed" as opposed to
   * being "open". When a credit batch is "open", new credits can be dynamically
   * minted to the credit batch following the creation of the credit batch. This
   * "open" option should only be set to true when bridging credits from another
   * chain or registry as a result of a bridge operation and is not intended for
   * native credit issuance.
   */
  createBatch(request: MsgCreateBatch): Promise<MsgCreateBatchResponse>;
  /**
   * MintBatchCredits dynamically mints credits to an "open" credit batch. This
   * feature is only meant to be used when bridging credits from another chain
   * or registry and is not intended for native credit issuance. When bridging
   * credits from the same vintage (or monitoring period) as an existing credit
   * batch, the credits can be dynamically minted to the existing credit batch
   * if the credit batch is "open".
   */
  mintBatchCredits(request: MsgMintBatchCredits): Promise<MsgMintBatchCreditsResponse>;
  /**
   * MsgSealBatch seals an "open" credit batch. Once a credit batch is sealed
   * (i.e. once "open" is set to false), credits can no longer be dynamically
   * minted to the credit batch. A sealed credit batch cannot be unsealed and
   * only the credit batch issuer can seal a credit batch.
   */
  sealBatch(request: MsgSealBatch): Promise<MsgSealBatchResponse>;
  /**
   * Send sends a specified amount of tradable credits from the credit owner's
   * account to another account. Sent credits can either remain tradable or be
   * retired upon receipt.
   */
  send(request: MsgSend): Promise<MsgSendResponse>;
  /**
   * Retire retires a specified amount of tradable credits, removing the amount
   * from the credit owner's tradable balance and adding it to their retired
   * balance. Retiring credits is permanent and implies the credits are being
   * consumed as a offset.
   */
  retire(request: MsgRetire): Promise<MsgRetireResponse>;
  /**
   * Cancel cancels a specified amount of tradable credits, removing the amount
   * from the credit owner's tradable balance and removing the amount from the
   * credit batch's tradable supply. Cancelling credits is permanent and implies
   * the credits have been moved to another chain or registry.
   */
  cancel(request: MsgCancel): Promise<MsgCancelResponse>;
  /**
   * UpdateClassAdmin updates the credit class admin. Only the admin of the
   * credit class can update the credit class.
   */
  updateClassAdmin(request: MsgUpdateClassAdmin): Promise<MsgUpdateClassAdminResponse>;
  /**
   * UpdateClassIssuers updates the credit class issuer list. Only the admin of
   * the credit class can update the credit class.
   */
  updateClassIssuers(request: MsgUpdateClassIssuers): Promise<MsgUpdateClassIssuersResponse>;
  /**
   * UpdateClassMetadata updates the credit class metadata. Only the admin of
   * the credit class can update the credit class.
   */
  updateClassMetadata(request: MsgUpdateClassMetadata): Promise<MsgUpdateClassMetadataResponse>;
  /**
   * UpdateProjectAdmin updates the project admin address. Only the admin of the
   * project can update the project.
   */
  updateProjectAdmin(request: MsgUpdateProjectAdmin): Promise<MsgUpdateProjectAdminResponse>;
  /**
   * UpdateProjectMetadata updates the project metadata. Only the admin of the
   * project can update the project.
   */
  updateProjectMetadata(request: MsgUpdateProjectMetadata): Promise<MsgUpdateProjectMetadataResponse>;
  /**
   * UpdateBatchMetadata updates the batch metadata. Only an "open" batch can be
   * updated and only the issuer of the batch can update the batch.
   * 
   * Since Revision 2
   */
  updateBatchMetadata(request: MsgUpdateBatchMetadata): Promise<MsgUpdateBatchMetadataResponse>;
  /**
   * Bridge processes credits being sent back to the source chain. When credits
   * are sent back to the source chain, the credits are cancelled and an event
   * is emitted to be handled by an external bridge service.
   */
  bridge(request: MsgBridge): Promise<MsgBridgeResponse>;
  /**
   * BridgeReceive processes credits being sent from another chain. When the
   * credits are sent from the same vintage as an existing credit batch within
   * the scope of the provided credit class, the credits will be minted to the
   * existing credit batch, otherwise the credits will be issued in a new credit
   * batch. The new credit batch will be created under an existing project if a
   * project with a matching reference id already exists within the scope of the
   * credit class, otherwise a new project will be created.
   */
  bridgeReceive(request: MsgBridgeReceive): Promise<MsgBridgeReceiveResponse>;
  /**
   * AddCreditType is a governance method that allows the addition of new
   * credit types to the network.
   * 
   * Since Revision 2
   */
  addCreditType(request: MsgAddCreditType): Promise<MsgAddCreditTypeResponse>;
  /**
   * SetClassCreatorAllowlist is a governance method that updates the class
   * creator allowlist enabled setting. When enabled, only addresses listed in
   * the allowlist can create credit classes. When disabled, any address can
   * create credit classes.
   * 
   * Since Revision 2
   */
  setClassCreatorAllowlist(request: MsgSetClassCreatorAllowlist): Promise<MsgSetClassCreatorAllowlistResponse>;
  /**
   * AddClassCreator is a governance method that allows the addition of a new
   * address to the class creation allowlist.
   * 
   * Since Revision 2
   */
  addClassCreator(request: MsgAddClassCreator): Promise<MsgAddClassCreatorResponse>;
  /**
   * RemoveClassCreator is a governance method that removes an
   * address from the class creation allowlist.
   * 
   * Since Revision 2
   */
  removeClassCreator(request: MsgRemoveClassCreator): Promise<MsgRemoveClassCreatorResponse>;
  /**
   * UpdateClassFee is a governance method that allows for updating the credit
   * class creation fee. If no fee is specified in the request, the credit
   * class creation fee will be removed and no fee will be required to create
   * a credit class.
   * 
   * Since Revision 2
   */
  updateClassFee(request: MsgUpdateClassFee): Promise<MsgUpdateClassFeeResponse>;
  /**
   * AddAllowedBridgeChain is a governance method that allows for the
   * addition of a chain to bridge ecocredits to.
   * 
   * Since Revision 2
   */
  addAllowedBridgeChain(request: MsgAddAllowedBridgeChain): Promise<MsgAddAllowedBridgeChainResponse>;
  /**
   * RemoveAllowedBridgeChain is a governance method that allows for the
   * removal of a chain to bridge ecocredits to.
   * 
   * Since Revision 2
   */
  removeAllowedBridgeChain(request: MsgRemoveAllowedBridgeChain): Promise<MsgRemoveAllowedBridgeChainResponse>;
  /**
   * BurnRegen burns REGEN tokens to account for platform fees when creating or transferring credits.
   * 
   * Since Revision 3
   */
  burnRegen(request: MsgBurnRegen): Promise<MsgBurnRegenResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createClass = this.createClass.bind(this);
    this.createProject = this.createProject.bind(this);
    this.createBatch = this.createBatch.bind(this);
    this.mintBatchCredits = this.mintBatchCredits.bind(this);
    this.sealBatch = this.sealBatch.bind(this);
    this.send = this.send.bind(this);
    this.retire = this.retire.bind(this);
    this.cancel = this.cancel.bind(this);
    this.updateClassAdmin = this.updateClassAdmin.bind(this);
    this.updateClassIssuers = this.updateClassIssuers.bind(this);
    this.updateClassMetadata = this.updateClassMetadata.bind(this);
    this.updateProjectAdmin = this.updateProjectAdmin.bind(this);
    this.updateProjectMetadata = this.updateProjectMetadata.bind(this);
    this.updateBatchMetadata = this.updateBatchMetadata.bind(this);
    this.bridge = this.bridge.bind(this);
    this.bridgeReceive = this.bridgeReceive.bind(this);
    this.addCreditType = this.addCreditType.bind(this);
    this.setClassCreatorAllowlist = this.setClassCreatorAllowlist.bind(this);
    this.addClassCreator = this.addClassCreator.bind(this);
    this.removeClassCreator = this.removeClassCreator.bind(this);
    this.updateClassFee = this.updateClassFee.bind(this);
    this.addAllowedBridgeChain = this.addAllowedBridgeChain.bind(this);
    this.removeAllowedBridgeChain = this.removeAllowedBridgeChain.bind(this);
    this.burnRegen = this.burnRegen.bind(this);
  }
  createClass(request: MsgCreateClass, useInterfaces: boolean = true): Promise<MsgCreateClassResponse> {
    const data = MsgCreateClass.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "CreateClass", data);
    return promise.then(data => MsgCreateClassResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  createProject(request: MsgCreateProject, useInterfaces: boolean = true): Promise<MsgCreateProjectResponse> {
    const data = MsgCreateProject.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "CreateProject", data);
    return promise.then(data => MsgCreateProjectResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  createBatch(request: MsgCreateBatch, useInterfaces: boolean = true): Promise<MsgCreateBatchResponse> {
    const data = MsgCreateBatch.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "CreateBatch", data);
    return promise.then(data => MsgCreateBatchResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  mintBatchCredits(request: MsgMintBatchCredits, useInterfaces: boolean = true): Promise<MsgMintBatchCreditsResponse> {
    const data = MsgMintBatchCredits.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "MintBatchCredits", data);
    return promise.then(data => MsgMintBatchCreditsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  sealBatch(request: MsgSealBatch, useInterfaces: boolean = true): Promise<MsgSealBatchResponse> {
    const data = MsgSealBatch.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "SealBatch", data);
    return promise.then(data => MsgSealBatchResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  send(request: MsgSend, useInterfaces: boolean = true): Promise<MsgSendResponse> {
    const data = MsgSend.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "Send", data);
    return promise.then(data => MsgSendResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  retire(request: MsgRetire, useInterfaces: boolean = true): Promise<MsgRetireResponse> {
    const data = MsgRetire.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "Retire", data);
    return promise.then(data => MsgRetireResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  cancel(request: MsgCancel, useInterfaces: boolean = true): Promise<MsgCancelResponse> {
    const data = MsgCancel.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "Cancel", data);
    return promise.then(data => MsgCancelResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateClassAdmin(request: MsgUpdateClassAdmin, useInterfaces: boolean = true): Promise<MsgUpdateClassAdminResponse> {
    const data = MsgUpdateClassAdmin.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "UpdateClassAdmin", data);
    return promise.then(data => MsgUpdateClassAdminResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateClassIssuers(request: MsgUpdateClassIssuers, useInterfaces: boolean = true): Promise<MsgUpdateClassIssuersResponse> {
    const data = MsgUpdateClassIssuers.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "UpdateClassIssuers", data);
    return promise.then(data => MsgUpdateClassIssuersResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateClassMetadata(request: MsgUpdateClassMetadata, useInterfaces: boolean = true): Promise<MsgUpdateClassMetadataResponse> {
    const data = MsgUpdateClassMetadata.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "UpdateClassMetadata", data);
    return promise.then(data => MsgUpdateClassMetadataResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateProjectAdmin(request: MsgUpdateProjectAdmin, useInterfaces: boolean = true): Promise<MsgUpdateProjectAdminResponse> {
    const data = MsgUpdateProjectAdmin.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "UpdateProjectAdmin", data);
    return promise.then(data => MsgUpdateProjectAdminResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateProjectMetadata(request: MsgUpdateProjectMetadata, useInterfaces: boolean = true): Promise<MsgUpdateProjectMetadataResponse> {
    const data = MsgUpdateProjectMetadata.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "UpdateProjectMetadata", data);
    return promise.then(data => MsgUpdateProjectMetadataResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateBatchMetadata(request: MsgUpdateBatchMetadata, useInterfaces: boolean = true): Promise<MsgUpdateBatchMetadataResponse> {
    const data = MsgUpdateBatchMetadata.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "UpdateBatchMetadata", data);
    return promise.then(data => MsgUpdateBatchMetadataResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  bridge(request: MsgBridge, useInterfaces: boolean = true): Promise<MsgBridgeResponse> {
    const data = MsgBridge.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "Bridge", data);
    return promise.then(data => MsgBridgeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  bridgeReceive(request: MsgBridgeReceive, useInterfaces: boolean = true): Promise<MsgBridgeReceiveResponse> {
    const data = MsgBridgeReceive.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "BridgeReceive", data);
    return promise.then(data => MsgBridgeReceiveResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addCreditType(request: MsgAddCreditType, useInterfaces: boolean = true): Promise<MsgAddCreditTypeResponse> {
    const data = MsgAddCreditType.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "AddCreditType", data);
    return promise.then(data => MsgAddCreditTypeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setClassCreatorAllowlist(request: MsgSetClassCreatorAllowlist, useInterfaces: boolean = true): Promise<MsgSetClassCreatorAllowlistResponse> {
    const data = MsgSetClassCreatorAllowlist.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "SetClassCreatorAllowlist", data);
    return promise.then(data => MsgSetClassCreatorAllowlistResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addClassCreator(request: MsgAddClassCreator, useInterfaces: boolean = true): Promise<MsgAddClassCreatorResponse> {
    const data = MsgAddClassCreator.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "AddClassCreator", data);
    return promise.then(data => MsgAddClassCreatorResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  removeClassCreator(request: MsgRemoveClassCreator, useInterfaces: boolean = true): Promise<MsgRemoveClassCreatorResponse> {
    const data = MsgRemoveClassCreator.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "RemoveClassCreator", data);
    return promise.then(data => MsgRemoveClassCreatorResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateClassFee(request: MsgUpdateClassFee, useInterfaces: boolean = true): Promise<MsgUpdateClassFeeResponse> {
    const data = MsgUpdateClassFee.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "UpdateClassFee", data);
    return promise.then(data => MsgUpdateClassFeeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addAllowedBridgeChain(request: MsgAddAllowedBridgeChain, useInterfaces: boolean = true): Promise<MsgAddAllowedBridgeChainResponse> {
    const data = MsgAddAllowedBridgeChain.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "AddAllowedBridgeChain", data);
    return promise.then(data => MsgAddAllowedBridgeChainResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  removeAllowedBridgeChain(request: MsgRemoveAllowedBridgeChain, useInterfaces: boolean = true): Promise<MsgRemoveAllowedBridgeChainResponse> {
    const data = MsgRemoveAllowedBridgeChain.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "RemoveAllowedBridgeChain", data);
    return promise.then(data => MsgRemoveAllowedBridgeChainResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  burnRegen(request: MsgBurnRegen, useInterfaces: boolean = true): Promise<MsgBurnRegenResponse> {
    const data = MsgBurnRegen.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "BurnRegen", data);
    return promise.then(data => MsgBurnRegenResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}