import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgStoreCode, MsgStoreCodeResponse, MsgInstantiateContract, MsgInstantiateContractResponse, MsgExecuteContract, MsgExecuteContractResponse, MsgMigrateContract, MsgMigrateContractResponse, MsgUpdateAdmin, MsgUpdateAdminResponse, MsgClearAdmin, MsgClearAdminResponse } from "./msg";
/** Msg defines the wasm Msg service. */
export interface Msg {
  /** StoreCode to submit Wasm code to the system */
  storeCode(request: MsgStoreCode): Promise<MsgStoreCodeResponse>;
  /** Instantiate creates a new smart contract instance for the given code id. */
  instantiateContract(request: MsgInstantiateContract): Promise<MsgInstantiateContractResponse>;
  /** Execute submits the given message data to a smart contract */
  executeContract(request: MsgExecuteContract): Promise<MsgExecuteContractResponse>;
  /** Migrate runs a code upgrade/ downgrade for a smart contract */
  migrateContract(request: MsgMigrateContract): Promise<MsgMigrateContractResponse>;
  /** UpdateAdmin sets a new   admin for a smart contract */
  updateAdmin(request: MsgUpdateAdmin): Promise<MsgUpdateAdminResponse>;
  /** ClearAdmin removes any admin stored for a smart contract */
  clearAdmin(request: MsgClearAdmin): Promise<MsgClearAdminResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.storeCode = this.storeCode.bind(this);
    this.instantiateContract = this.instantiateContract.bind(this);
    this.executeContract = this.executeContract.bind(this);
    this.migrateContract = this.migrateContract.bind(this);
    this.updateAdmin = this.updateAdmin.bind(this);
    this.clearAdmin = this.clearAdmin.bind(this);
  }
  storeCode(request: MsgStoreCode, useInterfaces: boolean = true): Promise<MsgStoreCodeResponse> {
    const data = MsgStoreCode.encode(request).finish();
    const promise = this.rpc.request("secret.compute.v1beta1.Msg", "StoreCode", data);
    return promise.then(data => MsgStoreCodeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  instantiateContract(request: MsgInstantiateContract, useInterfaces: boolean = true): Promise<MsgInstantiateContractResponse> {
    const data = MsgInstantiateContract.encode(request).finish();
    const promise = this.rpc.request("secret.compute.v1beta1.Msg", "InstantiateContract", data);
    return promise.then(data => MsgInstantiateContractResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  executeContract(request: MsgExecuteContract, useInterfaces: boolean = true): Promise<MsgExecuteContractResponse> {
    const data = MsgExecuteContract.encode(request).finish();
    const promise = this.rpc.request("secret.compute.v1beta1.Msg", "ExecuteContract", data);
    return promise.then(data => MsgExecuteContractResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  migrateContract(request: MsgMigrateContract, useInterfaces: boolean = true): Promise<MsgMigrateContractResponse> {
    const data = MsgMigrateContract.encode(request).finish();
    const promise = this.rpc.request("secret.compute.v1beta1.Msg", "MigrateContract", data);
    return promise.then(data => MsgMigrateContractResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateAdmin(request: MsgUpdateAdmin, useInterfaces: boolean = true): Promise<MsgUpdateAdminResponse> {
    const data = MsgUpdateAdmin.encode(request).finish();
    const promise = this.rpc.request("secret.compute.v1beta1.Msg", "UpdateAdmin", data);
    return promise.then(data => MsgUpdateAdminResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  clearAdmin(request: MsgClearAdmin, useInterfaces: boolean = true): Promise<MsgClearAdminResponse> {
    const data = MsgClearAdmin.encode(request).finish();
    const promise = this.rpc.request("secret.compute.v1beta1.Msg", "ClearAdmin", data);
    return promise.then(data => MsgClearAdminResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}