//@ts-nocheck
import { CodeInfo, CodeInfoAmino, CodeInfoSDKType, ContractInfo, ContractInfoAmino, ContractInfoSDKType, Model, ModelAmino, ModelSDKType, ContractCustomInfo, ContractCustomInfoAmino, ContractCustomInfoSDKType } from "./types";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
/** GenesisState - genesis state of x/wasm */
export interface GenesisState {
  /** Params params = 1 [(gogoproto.nullable) = false]; */
  codes: Code[];
  contracts: Contract[];
  sequences: Sequence[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/secret.compute.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState - genesis state of x/wasm */
export interface GenesisStateAmino {
  /** Params params = 1 [(gogoproto.nullable) = false]; */
  codes?: CodeAmino[];
  contracts?: ContractAmino[];
  sequences?: SequenceAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/secret.compute.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState - genesis state of x/wasm */
export interface GenesisStateSDKType {
  codes: CodeSDKType[];
  contracts: ContractSDKType[];
  sequences: SequenceSDKType[];
}
/** Code struct encompasses CodeInfo and CodeBytes */
export interface Code {
  codeId: bigint;
  codeInfo: CodeInfo | undefined;
  codeBytes: Uint8Array;
}
export interface CodeProtoMsg {
  typeUrl: "/secret.compute.v1beta1.Code";
  value: Uint8Array;
}
/** Code struct encompasses CodeInfo and CodeBytes */
export interface CodeAmino {
  code_id?: string;
  code_info?: CodeInfoAmino | undefined;
  code_bytes?: string;
}
export interface CodeAminoMsg {
  type: "/secret.compute.v1beta1.Code";
  value: CodeAmino;
}
/** Code struct encompasses CodeInfo and CodeBytes */
export interface CodeSDKType {
  code_id: bigint;
  code_info: CodeInfoSDKType | undefined;
  code_bytes: Uint8Array;
}
/** Contract struct encompasses ContractAddress, ContractInfo, and ContractState */
export interface Contract {
  contractAddress: Uint8Array;
  contractInfo: ContractInfo | undefined;
  contractState: Model[];
  contractCustomInfo?: ContractCustomInfo | undefined;
}
export interface ContractProtoMsg {
  typeUrl: "/secret.compute.v1beta1.Contract";
  value: Uint8Array;
}
/** Contract struct encompasses ContractAddress, ContractInfo, and ContractState */
export interface ContractAmino {
  contract_address?: string;
  contract_info?: ContractInfoAmino | undefined;
  contract_state?: ModelAmino[];
  contract_custom_info?: ContractCustomInfoAmino | undefined;
}
export interface ContractAminoMsg {
  type: "/secret.compute.v1beta1.Contract";
  value: ContractAmino;
}
/** Contract struct encompasses ContractAddress, ContractInfo, and ContractState */
export interface ContractSDKType {
  contract_address: Uint8Array;
  contract_info: ContractInfoSDKType | undefined;
  contract_state: ModelSDKType[];
  contract_custom_info?: ContractCustomInfoSDKType | undefined;
}
/** Sequence id and value of a counter */
export interface Sequence {
  idKey: Uint8Array;
  value: bigint;
}
export interface SequenceProtoMsg {
  typeUrl: "/secret.compute.v1beta1.Sequence";
  value: Uint8Array;
}
/** Sequence id and value of a counter */
export interface SequenceAmino {
  id_key?: string;
  value?: string;
}
export interface SequenceAminoMsg {
  type: "/secret.compute.v1beta1.Sequence";
  value: SequenceAmino;
}
/** Sequence id and value of a counter */
export interface SequenceSDKType {
  id_key: Uint8Array;
  value: bigint;
}
function createBaseGenesisState(): GenesisState {
  return {
    codes: [],
    contracts: [],
    sequences: []
  };
}
export const GenesisState = {
  typeUrl: "/secret.compute.v1beta1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.codes) {
      Code.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.contracts) {
      Contract.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.sequences) {
      Sequence.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.codes.push(Code.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.contracts.push(Contract.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.sequences.push(Sequence.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.codes = object.codes?.map(e => Code.fromPartial(e)) || [];
    message.contracts = object.contracts?.map(e => Contract.fromPartial(e)) || [];
    message.sequences = object.sequences?.map(e => Sequence.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    message.codes = object.codes?.map(e => Code.fromAmino(e)) || [];
    message.contracts = object.contracts?.map(e => Contract.fromAmino(e)) || [];
    message.sequences = object.sequences?.map(e => Sequence.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    if (message.codes) {
      obj.codes = message.codes.map(e => e ? Code.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.codes = [];
    }
    if (message.contracts) {
      obj.contracts = message.contracts.map(e => e ? Contract.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.contracts = [];
    }
    if (message.sequences) {
      obj.sequences = message.sequences.map(e => e ? Sequence.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.sequences = [];
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg, useInterfaces: boolean = false): GenesisState {
    return GenesisState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseCode(): Code {
  return {
    codeId: BigInt(0),
    codeInfo: CodeInfo.fromPartial({}),
    codeBytes: new Uint8Array()
  };
}
export const Code = {
  typeUrl: "/secret.compute.v1beta1.Code",
  encode(message: Code, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.codeId !== BigInt(0)) {
      writer.uint32(8).uint64(message.codeId);
    }
    if (message.codeInfo !== undefined) {
      CodeInfo.encode(message.codeInfo, writer.uint32(18).fork()).ldelim();
    }
    if (message.codeBytes.length !== 0) {
      writer.uint32(26).bytes(message.codeBytes);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Code {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeId = reader.uint64();
          break;
        case 2:
          message.codeInfo = CodeInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.codeBytes = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Code>): Code {
    const message = createBaseCode();
    message.codeId = object.codeId !== undefined && object.codeId !== null ? BigInt(object.codeId.toString()) : BigInt(0);
    message.codeInfo = object.codeInfo !== undefined && object.codeInfo !== null ? CodeInfo.fromPartial(object.codeInfo) : undefined;
    message.codeBytes = object.codeBytes ?? new Uint8Array();
    return message;
  },
  fromAmino(object: CodeAmino): Code {
    const message = createBaseCode();
    if (object.code_id !== undefined && object.code_id !== null) {
      message.codeId = BigInt(object.code_id);
    }
    if (object.code_info !== undefined && object.code_info !== null) {
      message.codeInfo = CodeInfo.fromAmino(object.code_info);
    }
    if (object.code_bytes !== undefined && object.code_bytes !== null) {
      message.codeBytes = bytesFromBase64(object.code_bytes);
    }
    return message;
  },
  toAmino(message: Code, useInterfaces: boolean = false): CodeAmino {
    const obj: any = {};
    obj.code_id = message.codeId ? message.codeId.toString() : undefined;
    obj.code_info = message.codeInfo ? CodeInfo.toAmino(message.codeInfo, useInterfaces) : undefined;
    obj.code_bytes = message.codeBytes ? base64FromBytes(message.codeBytes) : undefined;
    return obj;
  },
  fromAminoMsg(object: CodeAminoMsg): Code {
    return Code.fromAmino(object.value);
  },
  fromProtoMsg(message: CodeProtoMsg, useInterfaces: boolean = false): Code {
    return Code.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Code): Uint8Array {
    return Code.encode(message).finish();
  },
  toProtoMsg(message: Code): CodeProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.Code",
      value: Code.encode(message).finish()
    };
  }
};
function createBaseContract(): Contract {
  return {
    contractAddress: new Uint8Array(),
    contractInfo: ContractInfo.fromPartial({}),
    contractState: [],
    contractCustomInfo: undefined
  };
}
export const Contract = {
  typeUrl: "/secret.compute.v1beta1.Contract",
  encode(message: Contract, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.contractAddress.length !== 0) {
      writer.uint32(10).bytes(message.contractAddress);
    }
    if (message.contractInfo !== undefined) {
      ContractInfo.encode(message.contractInfo, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.contractState) {
      Model.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.contractCustomInfo !== undefined) {
      ContractCustomInfo.encode(message.contractCustomInfo, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Contract {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.bytes();
          break;
        case 2:
          message.contractInfo = ContractInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.contractState.push(Model.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.contractCustomInfo = ContractCustomInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Contract>): Contract {
    const message = createBaseContract();
    message.contractAddress = object.contractAddress ?? new Uint8Array();
    message.contractInfo = object.contractInfo !== undefined && object.contractInfo !== null ? ContractInfo.fromPartial(object.contractInfo) : undefined;
    message.contractState = object.contractState?.map(e => Model.fromPartial(e)) || [];
    message.contractCustomInfo = object.contractCustomInfo !== undefined && object.contractCustomInfo !== null ? ContractCustomInfo.fromPartial(object.contractCustomInfo) : undefined;
    return message;
  },
  fromAmino(object: ContractAmino): Contract {
    const message = createBaseContract();
    if (object.contract_address !== undefined && object.contract_address !== null) {
      message.contractAddress = bytesFromBase64(object.contract_address);
    }
    if (object.contract_info !== undefined && object.contract_info !== null) {
      message.contractInfo = ContractInfo.fromAmino(object.contract_info);
    }
    message.contractState = object.contract_state?.map(e => Model.fromAmino(e)) || [];
    if (object.contract_custom_info !== undefined && object.contract_custom_info !== null) {
      message.contractCustomInfo = ContractCustomInfo.fromAmino(object.contract_custom_info);
    }
    return message;
  },
  toAmino(message: Contract, useInterfaces: boolean = false): ContractAmino {
    const obj: any = {};
    obj.contract_address = message.contractAddress ? base64FromBytes(message.contractAddress) : undefined;
    obj.contract_info = message.contractInfo ? ContractInfo.toAmino(message.contractInfo, useInterfaces) : undefined;
    if (message.contractState) {
      obj.contract_state = message.contractState.map(e => e ? Model.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.contract_state = [];
    }
    obj.contract_custom_info = message.contractCustomInfo ? ContractCustomInfo.toAmino(message.contractCustomInfo, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ContractAminoMsg): Contract {
    return Contract.fromAmino(object.value);
  },
  fromProtoMsg(message: ContractProtoMsg, useInterfaces: boolean = false): Contract {
    return Contract.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Contract): Uint8Array {
    return Contract.encode(message).finish();
  },
  toProtoMsg(message: Contract): ContractProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.Contract",
      value: Contract.encode(message).finish()
    };
  }
};
function createBaseSequence(): Sequence {
  return {
    idKey: new Uint8Array(),
    value: BigInt(0)
  };
}
export const Sequence = {
  typeUrl: "/secret.compute.v1beta1.Sequence",
  encode(message: Sequence, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.idKey.length !== 0) {
      writer.uint32(10).bytes(message.idKey);
    }
    if (message.value !== BigInt(0)) {
      writer.uint32(16).uint64(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Sequence {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSequence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.idKey = reader.bytes();
          break;
        case 2:
          message.value = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Sequence>): Sequence {
    const message = createBaseSequence();
    message.idKey = object.idKey ?? new Uint8Array();
    message.value = object.value !== undefined && object.value !== null ? BigInt(object.value.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: SequenceAmino): Sequence {
    const message = createBaseSequence();
    if (object.id_key !== undefined && object.id_key !== null) {
      message.idKey = bytesFromBase64(object.id_key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = BigInt(object.value);
    }
    return message;
  },
  toAmino(message: Sequence, useInterfaces: boolean = false): SequenceAmino {
    const obj: any = {};
    obj.id_key = message.idKey ? base64FromBytes(message.idKey) : undefined;
    obj.value = message.value ? message.value.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: SequenceAminoMsg): Sequence {
    return Sequence.fromAmino(object.value);
  },
  fromProtoMsg(message: SequenceProtoMsg, useInterfaces: boolean = false): Sequence {
    return Sequence.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Sequence): Uint8Array {
    return Sequence.encode(message).finish();
  },
  toProtoMsg(message: Sequence): SequenceProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.Sequence",
      value: Sequence.encode(message).finish()
    };
  }
};