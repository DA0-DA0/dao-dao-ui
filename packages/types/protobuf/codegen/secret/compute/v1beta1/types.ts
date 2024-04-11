import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
export enum AccessType {
  UNDEFINED = 0,
  NOBODY = 1,
  ONLY_ADDRESS = 2,
  EVERYBODY = 3,
  UNRECOGNIZED = -1,
}
export const AccessTypeSDKType = AccessType;
export const AccessTypeAmino = AccessType;
export function accessTypeFromJSON(object: any): AccessType {
  switch (object) {
    case 0:
    case "UNDEFINED":
      return AccessType.UNDEFINED;
    case 1:
    case "NOBODY":
      return AccessType.NOBODY;
    case 2:
    case "ONLY_ADDRESS":
      return AccessType.ONLY_ADDRESS;
    case 3:
    case "EVERYBODY":
      return AccessType.EVERYBODY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AccessType.UNRECOGNIZED;
  }
}
export function accessTypeToJSON(object: AccessType): string {
  switch (object) {
    case AccessType.UNDEFINED:
      return "UNDEFINED";
    case AccessType.NOBODY:
      return "NOBODY";
    case AccessType.ONLY_ADDRESS:
      return "ONLY_ADDRESS";
    case AccessType.EVERYBODY:
      return "EVERYBODY";
    case AccessType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** ContractCodeHistoryOperationType actions that caused a code change */
export enum ContractCodeHistoryOperationType {
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED - ContractCodeHistoryOperationTypeUnspecified placeholder for empty value */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED = 0,
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT - ContractCodeHistoryOperationTypeInit on chain contract instantiation */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT = 1,
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE - ContractCodeHistoryOperationTypeMigrate code migration */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE = 2,
  /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS - ContractCodeHistoryOperationTypeGenesis based on genesis data */
  CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS = 3,
  UNRECOGNIZED = -1,
}
export const ContractCodeHistoryOperationTypeSDKType = ContractCodeHistoryOperationType;
export const ContractCodeHistoryOperationTypeAmino = ContractCodeHistoryOperationType;
export function contractCodeHistoryOperationTypeFromJSON(object: any): ContractCodeHistoryOperationType {
  switch (object) {
    case 0:
    case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED":
      return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED;
    case 1:
    case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT":
      return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT;
    case 2:
    case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE":
      return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE;
    case 3:
    case "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS":
      return ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ContractCodeHistoryOperationType.UNRECOGNIZED;
  }
}
export function contractCodeHistoryOperationTypeToJSON(object: ContractCodeHistoryOperationType): string {
  switch (object) {
    case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED:
      return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED";
    case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT:
      return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT";
    case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE:
      return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE";
    case ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS:
      return "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS";
    case ContractCodeHistoryOperationType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface AccessTypeParam {
  value: AccessType;
}
export interface AccessTypeParamProtoMsg {
  typeUrl: "/secret.compute.v1beta1.AccessTypeParam";
  value: Uint8Array;
}
export interface AccessTypeParamAmino {
  value?: AccessType;
}
export interface AccessTypeParamAminoMsg {
  type: "/secret.compute.v1beta1.AccessTypeParam";
  value: AccessTypeParamAmino;
}
export interface AccessTypeParamSDKType {
  value: AccessType;
}
/** CodeInfo is data for the uploaded contract WASM code */
export interface CodeInfo {
  codeHash: Uint8Array;
  creator: Uint8Array;
  source: string;
  builder: string;
}
export interface CodeInfoProtoMsg {
  typeUrl: "/secret.compute.v1beta1.CodeInfo";
  value: Uint8Array;
}
/** CodeInfo is data for the uploaded contract WASM code */
export interface CodeInfoAmino {
  code_hash?: string;
  creator?: string;
  source?: string;
  builder?: string;
}
export interface CodeInfoAminoMsg {
  type: "/secret.compute.v1beta1.CodeInfo";
  value: CodeInfoAmino;
}
/** CodeInfo is data for the uploaded contract WASM code */
export interface CodeInfoSDKType {
  code_hash: Uint8Array;
  creator: Uint8Array;
  source: string;
  builder: string;
}
export interface ContractKey {
  ogContractKey: Uint8Array;
  currentContractKey: Uint8Array;
  currentContractKeyProof: Uint8Array;
}
export interface ContractKeyProtoMsg {
  typeUrl: "/secret.compute.v1beta1.ContractKey";
  value: Uint8Array;
}
export interface ContractKeyAmino {
  og_contract_key?: string;
  current_contract_key?: string;
  current_contract_key_proof?: string;
}
export interface ContractKeyAminoMsg {
  type: "/secret.compute.v1beta1.ContractKey";
  value: ContractKeyAmino;
}
export interface ContractKeySDKType {
  og_contract_key: Uint8Array;
  current_contract_key: Uint8Array;
  current_contract_key_proof: Uint8Array;
}
export interface ContractCustomInfo {
  enclaveKey?: ContractKey | undefined;
  label: string;
}
export interface ContractCustomInfoProtoMsg {
  typeUrl: "/secret.compute.v1beta1.ContractCustomInfo";
  value: Uint8Array;
}
export interface ContractCustomInfoAmino {
  enclave_key?: ContractKeyAmino | undefined;
  label?: string;
}
export interface ContractCustomInfoAminoMsg {
  type: "/secret.compute.v1beta1.ContractCustomInfo";
  value: ContractCustomInfoAmino;
}
export interface ContractCustomInfoSDKType {
  enclave_key?: ContractKeySDKType | undefined;
  label: string;
}
/** ContractInfo stores a WASM contract instance */
export interface ContractInfo {
  /** CodeID is the reference to the stored Wasm code */
  codeId: bigint;
  /** Creator address who initially instantiated the contract */
  creator: Uint8Array;
  /** Label is mandatory metadata to be stored with a contract instance. */
  label: string;
  /** Created Tx position when the contract was instantiated. */
  created?: AbsoluteTxPosition | undefined;
  ibcPortId: string;
  /** Admin is an optional address that can execute migrations */
  admin: string;
  /** Proof that enclave executed the instantiate command */
  adminProof: Uint8Array;
}
export interface ContractInfoProtoMsg {
  typeUrl: "/secret.compute.v1beta1.ContractInfo";
  value: Uint8Array;
}
/** ContractInfo stores a WASM contract instance */
export interface ContractInfoAmino {
  /** CodeID is the reference to the stored Wasm code */
  code_id?: string;
  /** Creator address who initially instantiated the contract */
  creator?: string;
  /** Label is mandatory metadata to be stored with a contract instance. */
  label?: string;
  /** Created Tx position when the contract was instantiated. */
  created?: AbsoluteTxPositionAmino | undefined;
  ibc_port_id?: string;
  /** Admin is an optional address that can execute migrations */
  admin?: string;
  /** Proof that enclave executed the instantiate command */
  admin_proof?: string;
}
export interface ContractInfoAminoMsg {
  type: "/secret.compute.v1beta1.ContractInfo";
  value: ContractInfoAmino;
}
/** ContractInfo stores a WASM contract instance */
export interface ContractInfoSDKType {
  code_id: bigint;
  creator: Uint8Array;
  label: string;
  created?: AbsoluteTxPositionSDKType | undefined;
  ibc_port_id: string;
  admin: string;
  admin_proof: Uint8Array;
}
/** AbsoluteTxPosition can be used to sort contracts */
export interface AbsoluteTxPosition {
  /** BlockHeight is the block the contract was created at */
  blockHeight: bigint;
  /** TxIndex is a monotonic counter within the block (actual transaction index, or gas consumed) */
  txIndex: bigint;
}
export interface AbsoluteTxPositionProtoMsg {
  typeUrl: "/secret.compute.v1beta1.AbsoluteTxPosition";
  value: Uint8Array;
}
/** AbsoluteTxPosition can be used to sort contracts */
export interface AbsoluteTxPositionAmino {
  /** BlockHeight is the block the contract was created at */
  block_height?: string;
  /** TxIndex is a monotonic counter within the block (actual transaction index, or gas consumed) */
  tx_index?: string;
}
export interface AbsoluteTxPositionAminoMsg {
  type: "/secret.compute.v1beta1.AbsoluteTxPosition";
  value: AbsoluteTxPositionAmino;
}
/** AbsoluteTxPosition can be used to sort contracts */
export interface AbsoluteTxPositionSDKType {
  block_height: bigint;
  tx_index: bigint;
}
/** Model is a struct that holds a KV pair */
export interface Model {
  /** hex-encode key to read it better (this is often ascii) */
  Key: Uint8Array;
  /** base64-encode raw value */
  Value: Uint8Array;
}
export interface ModelProtoMsg {
  typeUrl: "/secret.compute.v1beta1.Model";
  value: Uint8Array;
}
/** Model is a struct that holds a KV pair */
export interface ModelAmino {
  /** hex-encode key to read it better (this is often ascii) */
  Key?: string;
  /** base64-encode raw value */
  Value?: string;
}
export interface ModelAminoMsg {
  type: "/secret.compute.v1beta1.Model";
  value: ModelAmino;
}
/** Model is a struct that holds a KV pair */
export interface ModelSDKType {
  Key: Uint8Array;
  Value: Uint8Array;
}
/** ContractCodeHistoryEntry metadata to a contract. */
export interface ContractCodeHistoryEntry {
  operation: ContractCodeHistoryOperationType;
  /** CodeID is the reference to the stored WASM code */
  codeId: bigint;
  /** Updated Tx position when the operation was executed. */
  updated?: AbsoluteTxPosition | undefined;
  msg: Uint8Array;
}
export interface ContractCodeHistoryEntryProtoMsg {
  typeUrl: "/secret.compute.v1beta1.ContractCodeHistoryEntry";
  value: Uint8Array;
}
/** ContractCodeHistoryEntry metadata to a contract. */
export interface ContractCodeHistoryEntryAmino {
  operation?: ContractCodeHistoryOperationType;
  /** CodeID is the reference to the stored WASM code */
  code_id?: string;
  /** Updated Tx position when the operation was executed. */
  updated?: AbsoluteTxPositionAmino | undefined;
  msg?: string;
}
export interface ContractCodeHistoryEntryAminoMsg {
  type: "/secret.compute.v1beta1.ContractCodeHistoryEntry";
  value: ContractCodeHistoryEntryAmino;
}
/** ContractCodeHistoryEntry metadata to a contract. */
export interface ContractCodeHistoryEntrySDKType {
  operation: ContractCodeHistoryOperationType;
  code_id: bigint;
  updated?: AbsoluteTxPositionSDKType | undefined;
  msg: Uint8Array;
}
function createBaseAccessTypeParam(): AccessTypeParam {
  return {
    value: 0
  };
}
export const AccessTypeParam = {
  typeUrl: "/secret.compute.v1beta1.AccessTypeParam",
  encode(message: AccessTypeParam, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.value !== 0) {
      writer.uint32(8).int32(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AccessTypeParam {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccessTypeParam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AccessTypeParam>): AccessTypeParam {
    const message = createBaseAccessTypeParam();
    message.value = object.value ?? 0;
    return message;
  },
  fromAmino(object: AccessTypeParamAmino): AccessTypeParam {
    const message = createBaseAccessTypeParam();
    if (object.value !== undefined && object.value !== null) {
      message.value = accessTypeFromJSON(object.value);
    }
    return message;
  },
  toAmino(message: AccessTypeParam, useInterfaces: boolean = false): AccessTypeParamAmino {
    const obj: any = {};
    obj.value = message.value;
    return obj;
  },
  fromAminoMsg(object: AccessTypeParamAminoMsg): AccessTypeParam {
    return AccessTypeParam.fromAmino(object.value);
  },
  fromProtoMsg(message: AccessTypeParamProtoMsg, useInterfaces: boolean = false): AccessTypeParam {
    return AccessTypeParam.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AccessTypeParam): Uint8Array {
    return AccessTypeParam.encode(message).finish();
  },
  toProtoMsg(message: AccessTypeParam): AccessTypeParamProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.AccessTypeParam",
      value: AccessTypeParam.encode(message).finish()
    };
  }
};
function createBaseCodeInfo(): CodeInfo {
  return {
    codeHash: new Uint8Array(),
    creator: new Uint8Array(),
    source: "",
    builder: ""
  };
}
export const CodeInfo = {
  typeUrl: "/secret.compute.v1beta1.CodeInfo",
  encode(message: CodeInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.codeHash.length !== 0) {
      writer.uint32(10).bytes(message.codeHash);
    }
    if (message.creator.length !== 0) {
      writer.uint32(18).bytes(message.creator);
    }
    if (message.source !== "") {
      writer.uint32(26).string(message.source);
    }
    if (message.builder !== "") {
      writer.uint32(34).string(message.builder);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CodeInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCodeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeHash = reader.bytes();
          break;
        case 2:
          message.creator = reader.bytes();
          break;
        case 3:
          message.source = reader.string();
          break;
        case 4:
          message.builder = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CodeInfo>): CodeInfo {
    const message = createBaseCodeInfo();
    message.codeHash = object.codeHash ?? new Uint8Array();
    message.creator = object.creator ?? new Uint8Array();
    message.source = object.source ?? "";
    message.builder = object.builder ?? "";
    return message;
  },
  fromAmino(object: CodeInfoAmino): CodeInfo {
    const message = createBaseCodeInfo();
    if (object.code_hash !== undefined && object.code_hash !== null) {
      message.codeHash = bytesFromBase64(object.code_hash);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator);
    }
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    }
    if (object.builder !== undefined && object.builder !== null) {
      message.builder = object.builder;
    }
    return message;
  },
  toAmino(message: CodeInfo, useInterfaces: boolean = false): CodeInfoAmino {
    const obj: any = {};
    obj.code_hash = message.codeHash ? base64FromBytes(message.codeHash) : undefined;
    obj.creator = message.creator ? base64FromBytes(message.creator) : undefined;
    obj.source = message.source;
    obj.builder = message.builder;
    return obj;
  },
  fromAminoMsg(object: CodeInfoAminoMsg): CodeInfo {
    return CodeInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: CodeInfoProtoMsg, useInterfaces: boolean = false): CodeInfo {
    return CodeInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CodeInfo): Uint8Array {
    return CodeInfo.encode(message).finish();
  },
  toProtoMsg(message: CodeInfo): CodeInfoProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.CodeInfo",
      value: CodeInfo.encode(message).finish()
    };
  }
};
function createBaseContractKey(): ContractKey {
  return {
    ogContractKey: new Uint8Array(),
    currentContractKey: new Uint8Array(),
    currentContractKeyProof: new Uint8Array()
  };
}
export const ContractKey = {
  typeUrl: "/secret.compute.v1beta1.ContractKey",
  encode(message: ContractKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.ogContractKey.length !== 0) {
      writer.uint32(10).bytes(message.ogContractKey);
    }
    if (message.currentContractKey.length !== 0) {
      writer.uint32(18).bytes(message.currentContractKey);
    }
    if (message.currentContractKeyProof.length !== 0) {
      writer.uint32(26).bytes(message.currentContractKeyProof);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ContractKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ogContractKey = reader.bytes();
          break;
        case 2:
          message.currentContractKey = reader.bytes();
          break;
        case 3:
          message.currentContractKeyProof = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ContractKey>): ContractKey {
    const message = createBaseContractKey();
    message.ogContractKey = object.ogContractKey ?? new Uint8Array();
    message.currentContractKey = object.currentContractKey ?? new Uint8Array();
    message.currentContractKeyProof = object.currentContractKeyProof ?? new Uint8Array();
    return message;
  },
  fromAmino(object: ContractKeyAmino): ContractKey {
    const message = createBaseContractKey();
    if (object.og_contract_key !== undefined && object.og_contract_key !== null) {
      message.ogContractKey = bytesFromBase64(object.og_contract_key);
    }
    if (object.current_contract_key !== undefined && object.current_contract_key !== null) {
      message.currentContractKey = bytesFromBase64(object.current_contract_key);
    }
    if (object.current_contract_key_proof !== undefined && object.current_contract_key_proof !== null) {
      message.currentContractKeyProof = bytesFromBase64(object.current_contract_key_proof);
    }
    return message;
  },
  toAmino(message: ContractKey, useInterfaces: boolean = false): ContractKeyAmino {
    const obj: any = {};
    obj.og_contract_key = message.ogContractKey ? base64FromBytes(message.ogContractKey) : undefined;
    obj.current_contract_key = message.currentContractKey ? base64FromBytes(message.currentContractKey) : undefined;
    obj.current_contract_key_proof = message.currentContractKeyProof ? base64FromBytes(message.currentContractKeyProof) : undefined;
    return obj;
  },
  fromAminoMsg(object: ContractKeyAminoMsg): ContractKey {
    return ContractKey.fromAmino(object.value);
  },
  fromProtoMsg(message: ContractKeyProtoMsg, useInterfaces: boolean = false): ContractKey {
    return ContractKey.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ContractKey): Uint8Array {
    return ContractKey.encode(message).finish();
  },
  toProtoMsg(message: ContractKey): ContractKeyProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.ContractKey",
      value: ContractKey.encode(message).finish()
    };
  }
};
function createBaseContractCustomInfo(): ContractCustomInfo {
  return {
    enclaveKey: undefined,
    label: ""
  };
}
export const ContractCustomInfo = {
  typeUrl: "/secret.compute.v1beta1.ContractCustomInfo",
  encode(message: ContractCustomInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.enclaveKey !== undefined) {
      ContractKey.encode(message.enclaveKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.label !== "") {
      writer.uint32(18).string(message.label);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ContractCustomInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractCustomInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.enclaveKey = ContractKey.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.label = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ContractCustomInfo>): ContractCustomInfo {
    const message = createBaseContractCustomInfo();
    message.enclaveKey = object.enclaveKey !== undefined && object.enclaveKey !== null ? ContractKey.fromPartial(object.enclaveKey) : undefined;
    message.label = object.label ?? "";
    return message;
  },
  fromAmino(object: ContractCustomInfoAmino): ContractCustomInfo {
    const message = createBaseContractCustomInfo();
    if (object.enclave_key !== undefined && object.enclave_key !== null) {
      message.enclaveKey = ContractKey.fromAmino(object.enclave_key);
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    }
    return message;
  },
  toAmino(message: ContractCustomInfo, useInterfaces: boolean = false): ContractCustomInfoAmino {
    const obj: any = {};
    obj.enclave_key = message.enclaveKey ? ContractKey.toAmino(message.enclaveKey, useInterfaces) : undefined;
    obj.label = message.label;
    return obj;
  },
  fromAminoMsg(object: ContractCustomInfoAminoMsg): ContractCustomInfo {
    return ContractCustomInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: ContractCustomInfoProtoMsg, useInterfaces: boolean = false): ContractCustomInfo {
    return ContractCustomInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ContractCustomInfo): Uint8Array {
    return ContractCustomInfo.encode(message).finish();
  },
  toProtoMsg(message: ContractCustomInfo): ContractCustomInfoProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.ContractCustomInfo",
      value: ContractCustomInfo.encode(message).finish()
    };
  }
};
function createBaseContractInfo(): ContractInfo {
  return {
    codeId: BigInt(0),
    creator: new Uint8Array(),
    label: "",
    created: undefined,
    ibcPortId: "",
    admin: "",
    adminProof: new Uint8Array()
  };
}
export const ContractInfo = {
  typeUrl: "/secret.compute.v1beta1.ContractInfo",
  encode(message: ContractInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.codeId !== BigInt(0)) {
      writer.uint32(8).uint64(message.codeId);
    }
    if (message.creator.length !== 0) {
      writer.uint32(18).bytes(message.creator);
    }
    if (message.label !== "") {
      writer.uint32(34).string(message.label);
    }
    if (message.created !== undefined) {
      AbsoluteTxPosition.encode(message.created, writer.uint32(42).fork()).ldelim();
    }
    if (message.ibcPortId !== "") {
      writer.uint32(50).string(message.ibcPortId);
    }
    if (message.admin !== "") {
      writer.uint32(58).string(message.admin);
    }
    if (message.adminProof.length !== 0) {
      writer.uint32(66).bytes(message.adminProof);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ContractInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeId = reader.uint64();
          break;
        case 2:
          message.creator = reader.bytes();
          break;
        case 4:
          message.label = reader.string();
          break;
        case 5:
          message.created = AbsoluteTxPosition.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.ibcPortId = reader.string();
          break;
        case 7:
          message.admin = reader.string();
          break;
        case 8:
          message.adminProof = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ContractInfo>): ContractInfo {
    const message = createBaseContractInfo();
    message.codeId = object.codeId !== undefined && object.codeId !== null ? BigInt(object.codeId.toString()) : BigInt(0);
    message.creator = object.creator ?? new Uint8Array();
    message.label = object.label ?? "";
    message.created = object.created !== undefined && object.created !== null ? AbsoluteTxPosition.fromPartial(object.created) : undefined;
    message.ibcPortId = object.ibcPortId ?? "";
    message.admin = object.admin ?? "";
    message.adminProof = object.adminProof ?? new Uint8Array();
    return message;
  },
  fromAmino(object: ContractInfoAmino): ContractInfo {
    const message = createBaseContractInfo();
    if (object.code_id !== undefined && object.code_id !== null) {
      message.codeId = BigInt(object.code_id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator);
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    }
    if (object.created !== undefined && object.created !== null) {
      message.created = AbsoluteTxPosition.fromAmino(object.created);
    }
    if (object.ibc_port_id !== undefined && object.ibc_port_id !== null) {
      message.ibcPortId = object.ibc_port_id;
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin;
    }
    if (object.admin_proof !== undefined && object.admin_proof !== null) {
      message.adminProof = bytesFromBase64(object.admin_proof);
    }
    return message;
  },
  toAmino(message: ContractInfo, useInterfaces: boolean = false): ContractInfoAmino {
    const obj: any = {};
    obj.code_id = message.codeId ? message.codeId.toString() : undefined;
    obj.creator = message.creator ? base64FromBytes(message.creator) : undefined;
    obj.label = message.label;
    obj.created = message.created ? AbsoluteTxPosition.toAmino(message.created, useInterfaces) : undefined;
    obj.ibc_port_id = message.ibcPortId;
    obj.admin = message.admin;
    obj.admin_proof = message.adminProof ? base64FromBytes(message.adminProof) : undefined;
    return obj;
  },
  fromAminoMsg(object: ContractInfoAminoMsg): ContractInfo {
    return ContractInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: ContractInfoProtoMsg, useInterfaces: boolean = false): ContractInfo {
    return ContractInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ContractInfo): Uint8Array {
    return ContractInfo.encode(message).finish();
  },
  toProtoMsg(message: ContractInfo): ContractInfoProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.ContractInfo",
      value: ContractInfo.encode(message).finish()
    };
  }
};
function createBaseAbsoluteTxPosition(): AbsoluteTxPosition {
  return {
    blockHeight: BigInt(0),
    txIndex: BigInt(0)
  };
}
export const AbsoluteTxPosition = {
  typeUrl: "/secret.compute.v1beta1.AbsoluteTxPosition",
  encode(message: AbsoluteTxPosition, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blockHeight !== BigInt(0)) {
      writer.uint32(8).int64(message.blockHeight);
    }
    if (message.txIndex !== BigInt(0)) {
      writer.uint32(16).uint64(message.txIndex);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AbsoluteTxPosition {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAbsoluteTxPosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockHeight = reader.int64();
          break;
        case 2:
          message.txIndex = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AbsoluteTxPosition>): AbsoluteTxPosition {
    const message = createBaseAbsoluteTxPosition();
    message.blockHeight = object.blockHeight !== undefined && object.blockHeight !== null ? BigInt(object.blockHeight.toString()) : BigInt(0);
    message.txIndex = object.txIndex !== undefined && object.txIndex !== null ? BigInt(object.txIndex.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: AbsoluteTxPositionAmino): AbsoluteTxPosition {
    const message = createBaseAbsoluteTxPosition();
    if (object.block_height !== undefined && object.block_height !== null) {
      message.blockHeight = BigInt(object.block_height);
    }
    if (object.tx_index !== undefined && object.tx_index !== null) {
      message.txIndex = BigInt(object.tx_index);
    }
    return message;
  },
  toAmino(message: AbsoluteTxPosition, useInterfaces: boolean = false): AbsoluteTxPositionAmino {
    const obj: any = {};
    obj.block_height = message.blockHeight ? message.blockHeight.toString() : undefined;
    obj.tx_index = message.txIndex ? message.txIndex.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: AbsoluteTxPositionAminoMsg): AbsoluteTxPosition {
    return AbsoluteTxPosition.fromAmino(object.value);
  },
  fromProtoMsg(message: AbsoluteTxPositionProtoMsg, useInterfaces: boolean = false): AbsoluteTxPosition {
    return AbsoluteTxPosition.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AbsoluteTxPosition): Uint8Array {
    return AbsoluteTxPosition.encode(message).finish();
  },
  toProtoMsg(message: AbsoluteTxPosition): AbsoluteTxPositionProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.AbsoluteTxPosition",
      value: AbsoluteTxPosition.encode(message).finish()
    };
  }
};
function createBaseModel(): Model {
  return {
    Key: new Uint8Array(),
    Value: new Uint8Array()
  };
}
export const Model = {
  typeUrl: "/secret.compute.v1beta1.Model",
  encode(message: Model, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.Key.length !== 0) {
      writer.uint32(10).bytes(message.Key);
    }
    if (message.Value.length !== 0) {
      writer.uint32(18).bytes(message.Value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Model {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Key = reader.bytes();
          break;
        case 2:
          message.Value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Model>): Model {
    const message = createBaseModel();
    message.Key = object.Key ?? new Uint8Array();
    message.Value = object.Value ?? new Uint8Array();
    return message;
  },
  fromAmino(object: ModelAmino): Model {
    const message = createBaseModel();
    if (object.Key !== undefined && object.Key !== null) {
      message.Key = bytesFromBase64(object.Key);
    }
    if (object.Value !== undefined && object.Value !== null) {
      message.Value = bytesFromBase64(object.Value);
    }
    return message;
  },
  toAmino(message: Model, useInterfaces: boolean = false): ModelAmino {
    const obj: any = {};
    obj.Key = message.Key ? base64FromBytes(message.Key) : undefined;
    obj.Value = message.Value ? base64FromBytes(message.Value) : undefined;
    return obj;
  },
  fromAminoMsg(object: ModelAminoMsg): Model {
    return Model.fromAmino(object.value);
  },
  fromProtoMsg(message: ModelProtoMsg, useInterfaces: boolean = false): Model {
    return Model.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Model): Uint8Array {
    return Model.encode(message).finish();
  },
  toProtoMsg(message: Model): ModelProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.Model",
      value: Model.encode(message).finish()
    };
  }
};
function createBaseContractCodeHistoryEntry(): ContractCodeHistoryEntry {
  return {
    operation: 0,
    codeId: BigInt(0),
    updated: undefined,
    msg: new Uint8Array()
  };
}
export const ContractCodeHistoryEntry = {
  typeUrl: "/secret.compute.v1beta1.ContractCodeHistoryEntry",
  encode(message: ContractCodeHistoryEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.operation !== 0) {
      writer.uint32(8).int32(message.operation);
    }
    if (message.codeId !== BigInt(0)) {
      writer.uint32(16).uint64(message.codeId);
    }
    if (message.updated !== undefined) {
      AbsoluteTxPosition.encode(message.updated, writer.uint32(26).fork()).ldelim();
    }
    if (message.msg.length !== 0) {
      writer.uint32(34).bytes(message.msg);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ContractCodeHistoryEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractCodeHistoryEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operation = (reader.int32() as any);
          break;
        case 2:
          message.codeId = reader.uint64();
          break;
        case 3:
          message.updated = AbsoluteTxPosition.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.msg = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ContractCodeHistoryEntry>): ContractCodeHistoryEntry {
    const message = createBaseContractCodeHistoryEntry();
    message.operation = object.operation ?? 0;
    message.codeId = object.codeId !== undefined && object.codeId !== null ? BigInt(object.codeId.toString()) : BigInt(0);
    message.updated = object.updated !== undefined && object.updated !== null ? AbsoluteTxPosition.fromPartial(object.updated) : undefined;
    message.msg = object.msg ?? new Uint8Array();
    return message;
  },
  fromAmino(object: ContractCodeHistoryEntryAmino): ContractCodeHistoryEntry {
    const message = createBaseContractCodeHistoryEntry();
    if (object.operation !== undefined && object.operation !== null) {
      message.operation = contractCodeHistoryOperationTypeFromJSON(object.operation);
    }
    if (object.code_id !== undefined && object.code_id !== null) {
      message.codeId = BigInt(object.code_id);
    }
    if (object.updated !== undefined && object.updated !== null) {
      message.updated = AbsoluteTxPosition.fromAmino(object.updated);
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = bytesFromBase64(object.msg);
    }
    return message;
  },
  toAmino(message: ContractCodeHistoryEntry, useInterfaces: boolean = false): ContractCodeHistoryEntryAmino {
    const obj: any = {};
    obj.operation = message.operation;
    obj.code_id = message.codeId ? message.codeId.toString() : undefined;
    obj.updated = message.updated ? AbsoluteTxPosition.toAmino(message.updated, useInterfaces) : undefined;
    obj.msg = message.msg ? base64FromBytes(message.msg) : undefined;
    return obj;
  },
  fromAminoMsg(object: ContractCodeHistoryEntryAminoMsg): ContractCodeHistoryEntry {
    return ContractCodeHistoryEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: ContractCodeHistoryEntryProtoMsg, useInterfaces: boolean = false): ContractCodeHistoryEntry {
    return ContractCodeHistoryEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ContractCodeHistoryEntry): Uint8Array {
    return ContractCodeHistoryEntry.encode(message).finish();
  },
  toProtoMsg(message: ContractCodeHistoryEntry): ContractCodeHistoryEntryProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.ContractCodeHistoryEntry",
      value: ContractCodeHistoryEntry.encode(message).finish()
    };
  }
};