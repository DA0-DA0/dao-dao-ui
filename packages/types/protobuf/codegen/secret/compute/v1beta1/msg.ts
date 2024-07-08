import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
import { fromBase64, toBase64 } from "@cosmjs/encoding";
export interface MsgStoreCode {
  /** sender is the canonical address of the sender */
  sender: Uint8Array;
  /** WASMByteCode can be raw or gzip compressed */
  wasmByteCode: Uint8Array;
  /** Source is a valid absolute HTTPS URI to the contract's source code, optional */
  source: string;
  /** Builder is a valid docker image name with tag, optional */
  builder: string;
}
export interface MsgStoreCodeProtoMsg {
  typeUrl: "/secret.compute.v1beta1.MsgStoreCode";
  value: Uint8Array;
}
export interface MsgStoreCodeAmino {
  /** sender is the canonical address of the sender */
  sender?: string;
  /** WASMByteCode can be raw or gzip compressed */
  wasm_byte_code?: string;
  /** Source is a valid absolute HTTPS URI to the contract's source code, optional */
  source?: string;
  /** Builder is a valid docker image name with tag, optional */
  builder?: string;
}
export interface MsgStoreCodeAminoMsg {
  type: "/secret.compute.v1beta1.MsgStoreCode";
  value: MsgStoreCodeAmino;
}
export interface MsgStoreCodeSDKType {
  sender: Uint8Array;
  wasm_byte_code: Uint8Array;
  source: string;
  builder: string;
}
/** MsgStoreCodeResponse returns store result data. */
export interface MsgStoreCodeResponse {
  /** CodeID is the reference to the stored WASM code */
  codeId: bigint;
}
export interface MsgStoreCodeResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.MsgStoreCodeResponse";
  value: Uint8Array;
}
/** MsgStoreCodeResponse returns store result data. */
export interface MsgStoreCodeResponseAmino {
  /** CodeID is the reference to the stored WASM code */
  code_id?: string;
}
export interface MsgStoreCodeResponseAminoMsg {
  type: "/secret.compute.v1beta1.MsgStoreCodeResponse";
  value: MsgStoreCodeResponseAmino;
}
/** MsgStoreCodeResponse returns store result data. */
export interface MsgStoreCodeResponseSDKType {
  code_id: bigint;
}
export interface MsgInstantiateContract {
  /** sender is the canonical address of the sender */
  sender: Uint8Array;
  callbackCodeHash: string;
  codeId: bigint;
  label: string;
  /** init_msg is an encrypted input to pass to the contract on init */
  initMsg: Uint8Array;
  initFunds: Coin[];
  /** used internally for encryption, should always be empty in a signed transaction */
  callbackSig: Uint8Array;
  /** Admin is an optional address that can execute migrations */
  admin: string;
}
export interface MsgInstantiateContractProtoMsg {
  typeUrl: "/secret.compute.v1beta1.MsgInstantiateContract";
  value: Uint8Array;
}
export interface MsgInstantiateContractAmino {
  /** sender is the canonical address of the sender */
  sender?: string;
  callback_code_hash?: string;
  code_id?: string;
  label?: string;
  /** init_msg is an encrypted input to pass to the contract on init */
  init_msg?: string;
  init_funds?: CoinAmino[];
  /** used internally for encryption, should always be empty in a signed transaction */
  callback_sig?: string;
  /** Admin is an optional address that can execute migrations */
  admin?: string;
}
export interface MsgInstantiateContractAminoMsg {
  type: "/secret.compute.v1beta1.MsgInstantiateContract";
  value: MsgInstantiateContractAmino;
}
export interface MsgInstantiateContractSDKType {
  sender: Uint8Array;
  callback_code_hash: string;
  code_id: bigint;
  label: string;
  init_msg: Uint8Array;
  init_funds: CoinSDKType[];
  callback_sig: Uint8Array;
  admin: string;
}
/** MsgInstantiateContractResponse return instantiation result data */
export interface MsgInstantiateContractResponse {
  /** Address is the bech32 address of the new contract instance. */
  address: string;
  /** Data contains base64-encoded bytes to returned from the contract */
  data: Uint8Array;
}
export interface MsgInstantiateContractResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.MsgInstantiateContractResponse";
  value: Uint8Array;
}
/** MsgInstantiateContractResponse return instantiation result data */
export interface MsgInstantiateContractResponseAmino {
  /** Address is the bech32 address of the new contract instance. */
  address?: string;
  /** Data contains base64-encoded bytes to returned from the contract */
  data?: string;
}
export interface MsgInstantiateContractResponseAminoMsg {
  type: "/secret.compute.v1beta1.MsgInstantiateContractResponse";
  value: MsgInstantiateContractResponseAmino;
}
/** MsgInstantiateContractResponse return instantiation result data */
export interface MsgInstantiateContractResponseSDKType {
  address: string;
  data: Uint8Array;
}
export interface MsgExecuteContract {
  /** sender is the canonical address of the sender */
  sender: Uint8Array;
  /** contract is the canonical address of the contract */
  contract: Uint8Array;
  /** msg is an encrypted input to pass to the contract on execute */
  msg: Uint8Array;
  /** used internally for encryption, should always be empty in a signed transaction */
  callbackCodeHash: string;
  sentFunds: Coin[];
  /** used internally for encryption, should always be empty in a signed transaction */
  callbackSig: Uint8Array;
}
export interface MsgExecuteContractProtoMsg {
  typeUrl: "/secret.compute.v1beta1.MsgExecuteContract";
  value: Uint8Array;
}
export interface MsgExecuteContractAmino {
  /** sender is the canonical address of the sender */
  sender?: string;
  /** contract is the canonical address of the contract */
  contract?: string;
  /** msg is an encrypted input to pass to the contract on execute */
  msg?: string;
  /** used internally for encryption, should always be empty in a signed transaction */
  callback_code_hash?: string;
  sent_funds?: CoinAmino[];
  /** used internally for encryption, should always be empty in a signed transaction */
  callback_sig?: string;
}
export interface MsgExecuteContractAminoMsg {
  type: "/secret.compute.v1beta1.MsgExecuteContract";
  value: MsgExecuteContractAmino;
}
export interface MsgExecuteContractSDKType {
  sender: Uint8Array;
  contract: Uint8Array;
  msg: Uint8Array;
  callback_code_hash: string;
  sent_funds: CoinSDKType[];
  callback_sig: Uint8Array;
}
/** MsgExecuteContractResponse returns execution result data. */
export interface MsgExecuteContractResponse {
  /** Data contains base64-encoded bytes to returned from the contract */
  data: Uint8Array;
}
export interface MsgExecuteContractResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.MsgExecuteContractResponse";
  value: Uint8Array;
}
/** MsgExecuteContractResponse returns execution result data. */
export interface MsgExecuteContractResponseAmino {
  /** Data contains base64-encoded bytes to returned from the contract */
  data?: string;
}
export interface MsgExecuteContractResponseAminoMsg {
  type: "/secret.compute.v1beta1.MsgExecuteContractResponse";
  value: MsgExecuteContractResponseAmino;
}
/** MsgExecuteContractResponse returns execution result data. */
export interface MsgExecuteContractResponseSDKType {
  data: Uint8Array;
}
/** MsgMigrateContract runs a code upgrade/ downgrade for a smart contract */
export interface MsgMigrateContract {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** Contract is the address of the smart contract */
  contract: string;
  /** CodeID references the new WASM code */
  codeId: bigint;
  /** msg is an encrypted input to pass to the contract on migration */
  msg: Uint8Array;
  /** used internally for encryption, should always be empty in a signed transaction */
  callbackSig: Uint8Array;
  /** used internally for encryption, should always be empty in a signed transaction */
  callbackCodeHash: string;
}
export interface MsgMigrateContractProtoMsg {
  typeUrl: "/secret.compute.v1beta1.MsgMigrateContract";
  value: Uint8Array;
}
/** MsgMigrateContract runs a code upgrade/ downgrade for a smart contract */
export interface MsgMigrateContractAmino {
  /** Sender is the that actor that signed the messages */
  sender?: string;
  /** Contract is the address of the smart contract */
  contract?: string;
  /** CodeID references the new WASM code */
  code_id?: string;
  /** msg is an encrypted input to pass to the contract on migration */
  msg?: string;
  /** used internally for encryption, should always be empty in a signed transaction */
  callback_sig?: string;
  /** used internally for encryption, should always be empty in a signed transaction */
  callback_code_hash?: string;
}
export interface MsgMigrateContractAminoMsg {
  type: "/secret.compute.v1beta1.MsgMigrateContract";
  value: MsgMigrateContractAmino;
}
/** MsgMigrateContract runs a code upgrade/ downgrade for a smart contract */
export interface MsgMigrateContractSDKType {
  sender: string;
  contract: string;
  code_id: bigint;
  msg: Uint8Array;
  callback_sig: Uint8Array;
  callback_code_hash: string;
}
/** MsgMigrateContractResponse returns contract migration result data. */
export interface MsgMigrateContractResponse {
  /**
   * Data contains same raw bytes returned as data from the wasm contract.
   * (May be empty)
   */
  data: Uint8Array;
}
export interface MsgMigrateContractResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.MsgMigrateContractResponse";
  value: Uint8Array;
}
/** MsgMigrateContractResponse returns contract migration result data. */
export interface MsgMigrateContractResponseAmino {
  /**
   * Data contains same raw bytes returned as data from the wasm contract.
   * (May be empty)
   */
  data?: string;
}
export interface MsgMigrateContractResponseAminoMsg {
  type: "/secret.compute.v1beta1.MsgMigrateContractResponse";
  value: MsgMigrateContractResponseAmino;
}
/** MsgMigrateContractResponse returns contract migration result data. */
export interface MsgMigrateContractResponseSDKType {
  data: Uint8Array;
}
/** MsgUpdateAdmin sets a new admin for a smart contract */
export interface MsgUpdateAdmin {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** NewAdmin address to be set */
  newAdmin: string;
  /** Contract is the address of the smart contract */
  contract: string;
  /** used internally for encryption, should always be empty in a signed transaction */
  callbackSig: Uint8Array;
}
export interface MsgUpdateAdminProtoMsg {
  typeUrl: "/secret.compute.v1beta1.MsgUpdateAdmin";
  value: Uint8Array;
}
/** MsgUpdateAdmin sets a new admin for a smart contract */
export interface MsgUpdateAdminAmino {
  /** Sender is the that actor that signed the messages */
  sender?: string;
  /** NewAdmin address to be set */
  new_admin?: string;
  /** Contract is the address of the smart contract */
  contract?: string;
  /** used internally for encryption, should always be empty in a signed transaction */
  callback_sig?: string;
}
export interface MsgUpdateAdminAminoMsg {
  type: "/secret.compute.v1beta1.MsgUpdateAdmin";
  value: MsgUpdateAdminAmino;
}
/** MsgUpdateAdmin sets a new admin for a smart contract */
export interface MsgUpdateAdminSDKType {
  sender: string;
  new_admin: string;
  contract: string;
  callback_sig: Uint8Array;
}
/** MsgUpdateAdminResponse returns empty data */
export interface MsgUpdateAdminResponse {}
export interface MsgUpdateAdminResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.MsgUpdateAdminResponse";
  value: Uint8Array;
}
/** MsgUpdateAdminResponse returns empty data */
export interface MsgUpdateAdminResponseAmino {}
export interface MsgUpdateAdminResponseAminoMsg {
  type: "/secret.compute.v1beta1.MsgUpdateAdminResponse";
  value: MsgUpdateAdminResponseAmino;
}
/** MsgUpdateAdminResponse returns empty data */
export interface MsgUpdateAdminResponseSDKType {}
/** MsgClearAdmin removes any admin stored for a smart contract */
export interface MsgClearAdmin {
  /** Sender is the that actor that signed the messages */
  sender: string;
  /** Contract is the address of the smart contract */
  contract: string;
  /** used internally for encryption, should always be empty in a signed transaction */
  callbackSig: Uint8Array;
}
export interface MsgClearAdminProtoMsg {
  typeUrl: "/secret.compute.v1beta1.MsgClearAdmin";
  value: Uint8Array;
}
/** MsgClearAdmin removes any admin stored for a smart contract */
export interface MsgClearAdminAmino {
  /** Sender is the that actor that signed the messages */
  sender?: string;
  /** Contract is the address of the smart contract */
  contract?: string;
  /** used internally for encryption, should always be empty in a signed transaction */
  callback_sig?: string;
}
export interface MsgClearAdminAminoMsg {
  type: "/secret.compute.v1beta1.MsgClearAdmin";
  value: MsgClearAdminAmino;
}
/** MsgClearAdmin removes any admin stored for a smart contract */
export interface MsgClearAdminSDKType {
  sender: string;
  contract: string;
  callback_sig: Uint8Array;
}
/** MsgClearAdminResponse returns empty data */
export interface MsgClearAdminResponse {}
export interface MsgClearAdminResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.MsgClearAdminResponse";
  value: Uint8Array;
}
/** MsgClearAdminResponse returns empty data */
export interface MsgClearAdminResponseAmino {}
export interface MsgClearAdminResponseAminoMsg {
  type: "/secret.compute.v1beta1.MsgClearAdminResponse";
  value: MsgClearAdminResponseAmino;
}
/** MsgClearAdminResponse returns empty data */
export interface MsgClearAdminResponseSDKType {}
function createBaseMsgStoreCode(): MsgStoreCode {
  return {
    sender: new Uint8Array(),
    wasmByteCode: new Uint8Array(),
    source: "",
    builder: ""
  };
}
export const MsgStoreCode = {
  typeUrl: "/secret.compute.v1beta1.MsgStoreCode",
  encode(message: MsgStoreCode, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender.length !== 0) {
      writer.uint32(10).bytes(message.sender);
    }
    if (message.wasmByteCode.length !== 0) {
      writer.uint32(18).bytes(message.wasmByteCode);
    }
    if (message.source !== "") {
      writer.uint32(26).string(message.source);
    }
    if (message.builder !== "") {
      writer.uint32(34).string(message.builder);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgStoreCode {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreCode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.bytes();
          break;
        case 2:
          message.wasmByteCode = reader.bytes();
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
  fromPartial(object: Partial<MsgStoreCode>): MsgStoreCode {
    const message = createBaseMsgStoreCode();
    message.sender = object.sender ?? new Uint8Array();
    message.wasmByteCode = object.wasmByteCode ?? new Uint8Array();
    message.source = object.source ?? "";
    message.builder = object.builder ?? "";
    return message;
  },
  fromAmino(object: MsgStoreCodeAmino): MsgStoreCode {
    const message = createBaseMsgStoreCode();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = bytesFromBase64(object.sender);
    }
    if (object.wasm_byte_code !== undefined && object.wasm_byte_code !== null) {
      message.wasmByteCode = fromBase64(object.wasm_byte_code);
    }
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    }
    if (object.builder !== undefined && object.builder !== null) {
      message.builder = object.builder;
    }
    return message;
  },
  toAmino(message: MsgStoreCode, useInterfaces: boolean = false): MsgStoreCodeAmino {
    const obj: any = {};
    obj.sender = message.sender ? base64FromBytes(message.sender) : undefined;
    obj.wasm_byte_code = message.wasmByteCode ? toBase64(message.wasmByteCode) : undefined;
    obj.source = message.source;
    obj.builder = message.builder;
    return obj;
  },
  fromAminoMsg(object: MsgStoreCodeAminoMsg): MsgStoreCode {
    return MsgStoreCode.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgStoreCodeProtoMsg, useInterfaces: boolean = false): MsgStoreCode {
    return MsgStoreCode.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgStoreCode): Uint8Array {
    return MsgStoreCode.encode(message).finish();
  },
  toProtoMsg(message: MsgStoreCode): MsgStoreCodeProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.MsgStoreCode",
      value: MsgStoreCode.encode(message).finish()
    };
  }
};
function createBaseMsgStoreCodeResponse(): MsgStoreCodeResponse {
  return {
    codeId: BigInt(0)
  };
}
export const MsgStoreCodeResponse = {
  typeUrl: "/secret.compute.v1beta1.MsgStoreCodeResponse",
  encode(message: MsgStoreCodeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.codeId !== BigInt(0)) {
      writer.uint32(8).uint64(message.codeId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgStoreCodeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStoreCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgStoreCodeResponse>): MsgStoreCodeResponse {
    const message = createBaseMsgStoreCodeResponse();
    message.codeId = object.codeId !== undefined && object.codeId !== null ? BigInt(object.codeId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgStoreCodeResponseAmino): MsgStoreCodeResponse {
    const message = createBaseMsgStoreCodeResponse();
    if (object.code_id !== undefined && object.code_id !== null) {
      message.codeId = BigInt(object.code_id);
    }
    return message;
  },
  toAmino(message: MsgStoreCodeResponse, useInterfaces: boolean = false): MsgStoreCodeResponseAmino {
    const obj: any = {};
    obj.code_id = message.codeId ? message.codeId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgStoreCodeResponseAminoMsg): MsgStoreCodeResponse {
    return MsgStoreCodeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgStoreCodeResponseProtoMsg, useInterfaces: boolean = false): MsgStoreCodeResponse {
    return MsgStoreCodeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgStoreCodeResponse): Uint8Array {
    return MsgStoreCodeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgStoreCodeResponse): MsgStoreCodeResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.MsgStoreCodeResponse",
      value: MsgStoreCodeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgInstantiateContract(): MsgInstantiateContract {
  return {
    sender: new Uint8Array(),
    callbackCodeHash: "",
    codeId: BigInt(0),
    label: "",
    initMsg: new Uint8Array(),
    initFunds: [],
    callbackSig: new Uint8Array(),
    admin: ""
  };
}
export const MsgInstantiateContract = {
  typeUrl: "/secret.compute.v1beta1.MsgInstantiateContract",
  encode(message: MsgInstantiateContract, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender.length !== 0) {
      writer.uint32(10).bytes(message.sender);
    }
    if (message.callbackCodeHash !== "") {
      writer.uint32(18).string(message.callbackCodeHash);
    }
    if (message.codeId !== BigInt(0)) {
      writer.uint32(24).uint64(message.codeId);
    }
    if (message.label !== "") {
      writer.uint32(34).string(message.label);
    }
    if (message.initMsg.length !== 0) {
      writer.uint32(42).bytes(message.initMsg);
    }
    for (const v of message.initFunds) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.callbackSig.length !== 0) {
      writer.uint32(58).bytes(message.callbackSig);
    }
    if (message.admin !== "") {
      writer.uint32(66).string(message.admin);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgInstantiateContract {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInstantiateContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.bytes();
          break;
        case 2:
          message.callbackCodeHash = reader.string();
          break;
        case 3:
          message.codeId = reader.uint64();
          break;
        case 4:
          message.label = reader.string();
          break;
        case 5:
          message.initMsg = reader.bytes();
          break;
        case 6:
          message.initFunds.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 7:
          message.callbackSig = reader.bytes();
          break;
        case 8:
          message.admin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgInstantiateContract>): MsgInstantiateContract {
    const message = createBaseMsgInstantiateContract();
    message.sender = object.sender ?? new Uint8Array();
    message.callbackCodeHash = object.callbackCodeHash ?? "";
    message.codeId = object.codeId !== undefined && object.codeId !== null ? BigInt(object.codeId.toString()) : BigInt(0);
    message.label = object.label ?? "";
    message.initMsg = object.initMsg ?? new Uint8Array();
    message.initFunds = object.initFunds?.map(e => Coin.fromPartial(e)) || [];
    message.callbackSig = object.callbackSig ?? new Uint8Array();
    message.admin = object.admin ?? "";
    return message;
  },
  fromAmino(object: MsgInstantiateContractAmino): MsgInstantiateContract {
    const message = createBaseMsgInstantiateContract();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = bytesFromBase64(object.sender);
    }
    if (object.callback_code_hash !== undefined && object.callback_code_hash !== null) {
      message.callbackCodeHash = object.callback_code_hash;
    }
    if (object.code_id !== undefined && object.code_id !== null) {
      message.codeId = BigInt(object.code_id);
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    }
    if (object.init_msg !== undefined && object.init_msg !== null) {
      message.initMsg = bytesFromBase64(object.init_msg);
    }
    message.initFunds = object.init_funds?.map(e => Coin.fromAmino(e)) || [];
    if (object.callback_sig !== undefined && object.callback_sig !== null) {
      message.callbackSig = bytesFromBase64(object.callback_sig);
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin;
    }
    return message;
  },
  toAmino(message: MsgInstantiateContract, useInterfaces: boolean = false): MsgInstantiateContractAmino {
    const obj: any = {};
    obj.sender = message.sender ? base64FromBytes(message.sender) : undefined;
    obj.callback_code_hash = message.callbackCodeHash;
    obj.code_id = message.codeId ? message.codeId.toString() : undefined;
    obj.label = message.label;
    obj.init_msg = message.initMsg ? base64FromBytes(message.initMsg) : undefined;
    if (message.initFunds) {
      obj.init_funds = message.initFunds.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.init_funds = [];
    }
    obj.callback_sig = message.callbackSig ? base64FromBytes(message.callbackSig) : undefined;
    obj.admin = message.admin;
    return obj;
  },
  fromAminoMsg(object: MsgInstantiateContractAminoMsg): MsgInstantiateContract {
    return MsgInstantiateContract.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgInstantiateContractProtoMsg, useInterfaces: boolean = false): MsgInstantiateContract {
    return MsgInstantiateContract.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgInstantiateContract): Uint8Array {
    return MsgInstantiateContract.encode(message).finish();
  },
  toProtoMsg(message: MsgInstantiateContract): MsgInstantiateContractProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.MsgInstantiateContract",
      value: MsgInstantiateContract.encode(message).finish()
    };
  }
};
function createBaseMsgInstantiateContractResponse(): MsgInstantiateContractResponse {
  return {
    address: "",
    data: new Uint8Array()
  };
}
export const MsgInstantiateContractResponse = {
  typeUrl: "/secret.compute.v1beta1.MsgInstantiateContractResponse",
  encode(message: MsgInstantiateContractResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgInstantiateContractResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInstantiateContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgInstantiateContractResponse>): MsgInstantiateContractResponse {
    const message = createBaseMsgInstantiateContractResponse();
    message.address = object.address ?? "";
    message.data = object.data ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgInstantiateContractResponseAmino): MsgInstantiateContractResponse {
    const message = createBaseMsgInstantiateContractResponse();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  toAmino(message: MsgInstantiateContractResponse, useInterfaces: boolean = false): MsgInstantiateContractResponseAmino {
    const obj: any = {};
    obj.address = message.address;
    obj.data = message.data ? base64FromBytes(message.data) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgInstantiateContractResponseAminoMsg): MsgInstantiateContractResponse {
    return MsgInstantiateContractResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgInstantiateContractResponseProtoMsg, useInterfaces: boolean = false): MsgInstantiateContractResponse {
    return MsgInstantiateContractResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgInstantiateContractResponse): Uint8Array {
    return MsgInstantiateContractResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgInstantiateContractResponse): MsgInstantiateContractResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.MsgInstantiateContractResponse",
      value: MsgInstantiateContractResponse.encode(message).finish()
    };
  }
};
function createBaseMsgExecuteContract(): MsgExecuteContract {
  return {
    sender: new Uint8Array(),
    contract: new Uint8Array(),
    msg: new Uint8Array(),
    callbackCodeHash: "",
    sentFunds: [],
    callbackSig: new Uint8Array()
  };
}
export const MsgExecuteContract = {
  typeUrl: "/secret.compute.v1beta1.MsgExecuteContract",
  encode(message: MsgExecuteContract, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender.length !== 0) {
      writer.uint32(10).bytes(message.sender);
    }
    if (message.contract.length !== 0) {
      writer.uint32(18).bytes(message.contract);
    }
    if (message.msg.length !== 0) {
      writer.uint32(26).bytes(message.msg);
    }
    if (message.callbackCodeHash !== "") {
      writer.uint32(34).string(message.callbackCodeHash);
    }
    for (const v of message.sentFunds) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.callbackSig.length !== 0) {
      writer.uint32(50).bytes(message.callbackSig);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgExecuteContract {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.bytes();
          break;
        case 2:
          message.contract = reader.bytes();
          break;
        case 3:
          message.msg = reader.bytes();
          break;
        case 4:
          message.callbackCodeHash = reader.string();
          break;
        case 5:
          message.sentFunds.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 6:
          message.callbackSig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExecuteContract>): MsgExecuteContract {
    const message = createBaseMsgExecuteContract();
    message.sender = object.sender ?? new Uint8Array();
    message.contract = object.contract ?? new Uint8Array();
    message.msg = object.msg ?? new Uint8Array();
    message.callbackCodeHash = object.callbackCodeHash ?? "";
    message.sentFunds = object.sentFunds?.map(e => Coin.fromPartial(e)) || [];
    message.callbackSig = object.callbackSig ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgExecuteContractAmino): MsgExecuteContract {
    const message = createBaseMsgExecuteContract();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = bytesFromBase64(object.sender);
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = bytesFromBase64(object.contract);
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = bytesFromBase64(object.msg);
    }
    if (object.callback_code_hash !== undefined && object.callback_code_hash !== null) {
      message.callbackCodeHash = object.callback_code_hash;
    }
    message.sentFunds = object.sent_funds?.map(e => Coin.fromAmino(e)) || [];
    if (object.callback_sig !== undefined && object.callback_sig !== null) {
      message.callbackSig = bytesFromBase64(object.callback_sig);
    }
    return message;
  },
  toAmino(message: MsgExecuteContract, useInterfaces: boolean = false): MsgExecuteContractAmino {
    const obj: any = {};
    obj.sender = message.sender ? base64FromBytes(message.sender) : undefined;
    obj.contract = message.contract ? base64FromBytes(message.contract) : undefined;
    obj.msg = message.msg ? base64FromBytes(message.msg) : undefined;
    obj.callback_code_hash = message.callbackCodeHash;
    if (message.sentFunds) {
      obj.sent_funds = message.sentFunds.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.sent_funds = [];
    }
    obj.callback_sig = message.callbackSig ? base64FromBytes(message.callbackSig) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgExecuteContractAminoMsg): MsgExecuteContract {
    return MsgExecuteContract.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgExecuteContractProtoMsg, useInterfaces: boolean = false): MsgExecuteContract {
    return MsgExecuteContract.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgExecuteContract): Uint8Array {
    return MsgExecuteContract.encode(message).finish();
  },
  toProtoMsg(message: MsgExecuteContract): MsgExecuteContractProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.MsgExecuteContract",
      value: MsgExecuteContract.encode(message).finish()
    };
  }
};
function createBaseMsgExecuteContractResponse(): MsgExecuteContractResponse {
  return {
    data: new Uint8Array()
  };
}
export const MsgExecuteContractResponse = {
  typeUrl: "/secret.compute.v1beta1.MsgExecuteContractResponse",
  encode(message: MsgExecuteContractResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgExecuteContractResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExecuteContractResponse>): MsgExecuteContractResponse {
    const message = createBaseMsgExecuteContractResponse();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgExecuteContractResponseAmino): MsgExecuteContractResponse {
    const message = createBaseMsgExecuteContractResponse();
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  toAmino(message: MsgExecuteContractResponse, useInterfaces: boolean = false): MsgExecuteContractResponseAmino {
    const obj: any = {};
    obj.data = message.data ? base64FromBytes(message.data) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgExecuteContractResponseAminoMsg): MsgExecuteContractResponse {
    return MsgExecuteContractResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgExecuteContractResponseProtoMsg, useInterfaces: boolean = false): MsgExecuteContractResponse {
    return MsgExecuteContractResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgExecuteContractResponse): Uint8Array {
    return MsgExecuteContractResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgExecuteContractResponse): MsgExecuteContractResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.MsgExecuteContractResponse",
      value: MsgExecuteContractResponse.encode(message).finish()
    };
  }
};
function createBaseMsgMigrateContract(): MsgMigrateContract {
  return {
    sender: "",
    contract: "",
    codeId: BigInt(0),
    msg: new Uint8Array(),
    callbackSig: new Uint8Array(),
    callbackCodeHash: ""
  };
}
export const MsgMigrateContract = {
  typeUrl: "/secret.compute.v1beta1.MsgMigrateContract",
  encode(message: MsgMigrateContract, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.contract !== "") {
      writer.uint32(18).string(message.contract);
    }
    if (message.codeId !== BigInt(0)) {
      writer.uint32(24).uint64(message.codeId);
    }
    if (message.msg.length !== 0) {
      writer.uint32(34).bytes(message.msg);
    }
    if (message.callbackSig.length !== 0) {
      writer.uint32(58).bytes(message.callbackSig);
    }
    if (message.callbackCodeHash !== "") {
      writer.uint32(66).string(message.callbackCodeHash);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgMigrateContract {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMigrateContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.contract = reader.string();
          break;
        case 3:
          message.codeId = reader.uint64();
          break;
        case 4:
          message.msg = reader.bytes();
          break;
        case 7:
          message.callbackSig = reader.bytes();
          break;
        case 8:
          message.callbackCodeHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgMigrateContract>): MsgMigrateContract {
    const message = createBaseMsgMigrateContract();
    message.sender = object.sender ?? "";
    message.contract = object.contract ?? "";
    message.codeId = object.codeId !== undefined && object.codeId !== null ? BigInt(object.codeId.toString()) : BigInt(0);
    message.msg = object.msg ?? new Uint8Array();
    message.callbackSig = object.callbackSig ?? new Uint8Array();
    message.callbackCodeHash = object.callbackCodeHash ?? "";
    return message;
  },
  fromAmino(object: MsgMigrateContractAmino): MsgMigrateContract {
    const message = createBaseMsgMigrateContract();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    }
    if (object.code_id !== undefined && object.code_id !== null) {
      message.codeId = BigInt(object.code_id);
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = bytesFromBase64(object.msg);
    }
    if (object.callback_sig !== undefined && object.callback_sig !== null) {
      message.callbackSig = bytesFromBase64(object.callback_sig);
    }
    if (object.callback_code_hash !== undefined && object.callback_code_hash !== null) {
      message.callbackCodeHash = object.callback_code_hash;
    }
    return message;
  },
  toAmino(message: MsgMigrateContract, useInterfaces: boolean = false): MsgMigrateContractAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.contract = message.contract;
    obj.code_id = message.codeId ? message.codeId.toString() : undefined;
    obj.msg = message.msg ? base64FromBytes(message.msg) : undefined;
    obj.callback_sig = message.callbackSig ? base64FromBytes(message.callbackSig) : undefined;
    obj.callback_code_hash = message.callbackCodeHash;
    return obj;
  },
  fromAminoMsg(object: MsgMigrateContractAminoMsg): MsgMigrateContract {
    return MsgMigrateContract.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgMigrateContractProtoMsg, useInterfaces: boolean = false): MsgMigrateContract {
    return MsgMigrateContract.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgMigrateContract): Uint8Array {
    return MsgMigrateContract.encode(message).finish();
  },
  toProtoMsg(message: MsgMigrateContract): MsgMigrateContractProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.MsgMigrateContract",
      value: MsgMigrateContract.encode(message).finish()
    };
  }
};
function createBaseMsgMigrateContractResponse(): MsgMigrateContractResponse {
  return {
    data: new Uint8Array()
  };
}
export const MsgMigrateContractResponse = {
  typeUrl: "/secret.compute.v1beta1.MsgMigrateContractResponse",
  encode(message: MsgMigrateContractResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgMigrateContractResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMigrateContractResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgMigrateContractResponse>): MsgMigrateContractResponse {
    const message = createBaseMsgMigrateContractResponse();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgMigrateContractResponseAmino): MsgMigrateContractResponse {
    const message = createBaseMsgMigrateContractResponse();
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  toAmino(message: MsgMigrateContractResponse, useInterfaces: boolean = false): MsgMigrateContractResponseAmino {
    const obj: any = {};
    obj.data = message.data ? base64FromBytes(message.data) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgMigrateContractResponseAminoMsg): MsgMigrateContractResponse {
    return MsgMigrateContractResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgMigrateContractResponseProtoMsg, useInterfaces: boolean = false): MsgMigrateContractResponse {
    return MsgMigrateContractResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgMigrateContractResponse): Uint8Array {
    return MsgMigrateContractResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgMigrateContractResponse): MsgMigrateContractResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.MsgMigrateContractResponse",
      value: MsgMigrateContractResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateAdmin(): MsgUpdateAdmin {
  return {
    sender: "",
    newAdmin: "",
    contract: "",
    callbackSig: new Uint8Array()
  };
}
export const MsgUpdateAdmin = {
  typeUrl: "/secret.compute.v1beta1.MsgUpdateAdmin",
  encode(message: MsgUpdateAdmin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.newAdmin !== "") {
      writer.uint32(18).string(message.newAdmin);
    }
    if (message.contract !== "") {
      writer.uint32(26).string(message.contract);
    }
    if (message.callbackSig.length !== 0) {
      writer.uint32(58).bytes(message.callbackSig);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateAdmin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.newAdmin = reader.string();
          break;
        case 3:
          message.contract = reader.string();
          break;
        case 7:
          message.callbackSig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateAdmin>): MsgUpdateAdmin {
    const message = createBaseMsgUpdateAdmin();
    message.sender = object.sender ?? "";
    message.newAdmin = object.newAdmin ?? "";
    message.contract = object.contract ?? "";
    message.callbackSig = object.callbackSig ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgUpdateAdminAmino): MsgUpdateAdmin {
    const message = createBaseMsgUpdateAdmin();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.new_admin !== undefined && object.new_admin !== null) {
      message.newAdmin = object.new_admin;
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    }
    if (object.callback_sig !== undefined && object.callback_sig !== null) {
      message.callbackSig = bytesFromBase64(object.callback_sig);
    }
    return message;
  },
  toAmino(message: MsgUpdateAdmin, useInterfaces: boolean = false): MsgUpdateAdminAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.new_admin = message.newAdmin;
    obj.contract = message.contract;
    obj.callback_sig = message.callbackSig ? base64FromBytes(message.callbackSig) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateAdminAminoMsg): MsgUpdateAdmin {
    return MsgUpdateAdmin.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateAdminProtoMsg, useInterfaces: boolean = false): MsgUpdateAdmin {
    return MsgUpdateAdmin.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateAdmin): Uint8Array {
    return MsgUpdateAdmin.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateAdmin): MsgUpdateAdminProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.MsgUpdateAdmin",
      value: MsgUpdateAdmin.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateAdminResponse(): MsgUpdateAdminResponse {
  return {};
}
export const MsgUpdateAdminResponse = {
  typeUrl: "/secret.compute.v1beta1.MsgUpdateAdminResponse",
  encode(_: MsgUpdateAdminResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateAdminResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAdminResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateAdminResponse>): MsgUpdateAdminResponse {
    const message = createBaseMsgUpdateAdminResponse();
    return message;
  },
  fromAmino(_: MsgUpdateAdminResponseAmino): MsgUpdateAdminResponse {
    const message = createBaseMsgUpdateAdminResponse();
    return message;
  },
  toAmino(_: MsgUpdateAdminResponse, useInterfaces: boolean = false): MsgUpdateAdminResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateAdminResponseAminoMsg): MsgUpdateAdminResponse {
    return MsgUpdateAdminResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateAdminResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateAdminResponse {
    return MsgUpdateAdminResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateAdminResponse): Uint8Array {
    return MsgUpdateAdminResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateAdminResponse): MsgUpdateAdminResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.MsgUpdateAdminResponse",
      value: MsgUpdateAdminResponse.encode(message).finish()
    };
  }
};
function createBaseMsgClearAdmin(): MsgClearAdmin {
  return {
    sender: "",
    contract: "",
    callbackSig: new Uint8Array()
  };
}
export const MsgClearAdmin = {
  typeUrl: "/secret.compute.v1beta1.MsgClearAdmin",
  encode(message: MsgClearAdmin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.contract !== "") {
      writer.uint32(26).string(message.contract);
    }
    if (message.callbackSig.length !== 0) {
      writer.uint32(58).bytes(message.callbackSig);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgClearAdmin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClearAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 3:
          message.contract = reader.string();
          break;
        case 7:
          message.callbackSig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgClearAdmin>): MsgClearAdmin {
    const message = createBaseMsgClearAdmin();
    message.sender = object.sender ?? "";
    message.contract = object.contract ?? "";
    message.callbackSig = object.callbackSig ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgClearAdminAmino): MsgClearAdmin {
    const message = createBaseMsgClearAdmin();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    }
    if (object.callback_sig !== undefined && object.callback_sig !== null) {
      message.callbackSig = bytesFromBase64(object.callback_sig);
    }
    return message;
  },
  toAmino(message: MsgClearAdmin, useInterfaces: boolean = false): MsgClearAdminAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.contract = message.contract;
    obj.callback_sig = message.callbackSig ? base64FromBytes(message.callbackSig) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgClearAdminAminoMsg): MsgClearAdmin {
    return MsgClearAdmin.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgClearAdminProtoMsg, useInterfaces: boolean = false): MsgClearAdmin {
    return MsgClearAdmin.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgClearAdmin): Uint8Array {
    return MsgClearAdmin.encode(message).finish();
  },
  toProtoMsg(message: MsgClearAdmin): MsgClearAdminProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.MsgClearAdmin",
      value: MsgClearAdmin.encode(message).finish()
    };
  }
};
function createBaseMsgClearAdminResponse(): MsgClearAdminResponse {
  return {};
}
export const MsgClearAdminResponse = {
  typeUrl: "/secret.compute.v1beta1.MsgClearAdminResponse",
  encode(_: MsgClearAdminResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgClearAdminResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClearAdminResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgClearAdminResponse>): MsgClearAdminResponse {
    const message = createBaseMsgClearAdminResponse();
    return message;
  },
  fromAmino(_: MsgClearAdminResponseAmino): MsgClearAdminResponse {
    const message = createBaseMsgClearAdminResponse();
    return message;
  },
  toAmino(_: MsgClearAdminResponse, useInterfaces: boolean = false): MsgClearAdminResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgClearAdminResponseAminoMsg): MsgClearAdminResponse {
    return MsgClearAdminResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgClearAdminResponseProtoMsg, useInterfaces: boolean = false): MsgClearAdminResponse {
    return MsgClearAdminResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgClearAdminResponse): Uint8Array {
    return MsgClearAdminResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgClearAdminResponse): MsgClearAdminResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.MsgClearAdminResponse",
      value: MsgClearAdminResponse.encode(message).finish()
    };
  }
};