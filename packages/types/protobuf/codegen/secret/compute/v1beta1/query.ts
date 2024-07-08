//@ts-nocheck
import { ContractInfo, ContractInfoAmino, ContractInfoSDKType, ContractCodeHistoryEntry, ContractCodeHistoryEntryAmino, ContractCodeHistoryEntrySDKType } from "./types";
import { StringEvent, StringEventAmino, StringEventSDKType } from "../../../cosmos/base/abci/v1beta1/abci";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
export interface QuerySecretContractRequest {
  /** address is the bech32 human readable address of the contract */
  contractAddress: string;
  query: Uint8Array;
}
export interface QuerySecretContractRequestProtoMsg {
  typeUrl: "/secret.compute.v1beta1.QuerySecretContractRequest";
  value: Uint8Array;
}
export interface QuerySecretContractRequestAmino {
  /** address is the bech32 human readable address of the contract */
  contract_address?: string;
  query?: string;
}
export interface QuerySecretContractRequestAminoMsg {
  type: "/secret.compute.v1beta1.QuerySecretContractRequest";
  value: QuerySecretContractRequestAmino;
}
export interface QuerySecretContractRequestSDKType {
  contract_address: string;
  query: Uint8Array;
}
export interface QueryByLabelRequest {
  label: string;
}
export interface QueryByLabelRequestProtoMsg {
  typeUrl: "/secret.compute.v1beta1.QueryByLabelRequest";
  value: Uint8Array;
}
export interface QueryByLabelRequestAmino {
  label?: string;
}
export interface QueryByLabelRequestAminoMsg {
  type: "/secret.compute.v1beta1.QueryByLabelRequest";
  value: QueryByLabelRequestAmino;
}
export interface QueryByLabelRequestSDKType {
  label: string;
}
export interface QueryByContractAddressRequest {
  /** address is the bech32 human readable address of the contract */
  contractAddress: string;
}
export interface QueryByContractAddressRequestProtoMsg {
  typeUrl: "/secret.compute.v1beta1.QueryByContractAddressRequest";
  value: Uint8Array;
}
export interface QueryByContractAddressRequestAmino {
  /** address is the bech32 human readable address of the contract */
  contract_address?: string;
}
export interface QueryByContractAddressRequestAminoMsg {
  type: "/secret.compute.v1beta1.QueryByContractAddressRequest";
  value: QueryByContractAddressRequestAmino;
}
export interface QueryByContractAddressRequestSDKType {
  contract_address: string;
}
export interface QueryByCodeIdRequest {
  codeId: bigint;
}
export interface QueryByCodeIdRequestProtoMsg {
  typeUrl: "/secret.compute.v1beta1.QueryByCodeIdRequest";
  value: Uint8Array;
}
export interface QueryByCodeIdRequestAmino {
  code_id?: string;
}
export interface QueryByCodeIdRequestAminoMsg {
  type: "/secret.compute.v1beta1.QueryByCodeIdRequest";
  value: QueryByCodeIdRequestAmino;
}
export interface QueryByCodeIdRequestSDKType {
  code_id: bigint;
}
export interface QuerySecretContractResponse {
  data: Uint8Array;
}
export interface QuerySecretContractResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.QuerySecretContractResponse";
  value: Uint8Array;
}
export interface QuerySecretContractResponseAmino {
  data?: string;
}
export interface QuerySecretContractResponseAminoMsg {
  type: "/secret.compute.v1beta1.QuerySecretContractResponse";
  value: QuerySecretContractResponseAmino;
}
export interface QuerySecretContractResponseSDKType {
  data: Uint8Array;
}
/** QueryContractInfoResponse is the response type for the Query/ContractInfo RPC method */
export interface QueryContractInfoResponse {
  /** contract_address is the bech32 human readable address of the contract */
  contractAddress: string;
  contractInfo?: ContractInfo | undefined;
}
export interface QueryContractInfoResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.QueryContractInfoResponse";
  value: Uint8Array;
}
/** QueryContractInfoResponse is the response type for the Query/ContractInfo RPC method */
export interface QueryContractInfoResponseAmino {
  /** contract_address is the bech32 human readable address of the contract */
  contract_address?: string;
  contract_info?: ContractInfoAmino | undefined;
}
export interface QueryContractInfoResponseAminoMsg {
  type: "/secret.compute.v1beta1.QueryContractInfoResponse";
  value: QueryContractInfoResponseAmino;
}
/** QueryContractInfoResponse is the response type for the Query/ContractInfo RPC method */
export interface QueryContractInfoResponseSDKType {
  contract_address: string;
  contract_info?: ContractInfoSDKType | undefined;
}
/** ContractInfoWithAddress adds the contract address to the ContractInfo representation */
export interface ContractInfoWithAddress {
  /** contract_address is the bech32 human readable address of the contract */
  contractAddress: string;
  contractInfo?: ContractInfo | undefined;
}
export interface ContractInfoWithAddressProtoMsg {
  typeUrl: "/secret.compute.v1beta1.ContractInfoWithAddress";
  value: Uint8Array;
}
/** ContractInfoWithAddress adds the contract address to the ContractInfo representation */
export interface ContractInfoWithAddressAmino {
  /** contract_address is the bech32 human readable address of the contract */
  contract_address?: string;
  contract_info?: ContractInfoAmino | undefined;
}
export interface ContractInfoWithAddressAminoMsg {
  type: "/secret.compute.v1beta1.ContractInfoWithAddress";
  value: ContractInfoWithAddressAmino;
}
/** ContractInfoWithAddress adds the contract address to the ContractInfo representation */
export interface ContractInfoWithAddressSDKType {
  contract_address: string;
  contract_info?: ContractInfoSDKType | undefined;
}
export interface QueryContractsByCodeIdResponse {
  contractInfos: ContractInfoWithAddress[];
}
export interface QueryContractsByCodeIdResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.QueryContractsByCodeIdResponse";
  value: Uint8Array;
}
export interface QueryContractsByCodeIdResponseAmino {
  contract_infos?: ContractInfoWithAddressAmino[];
}
export interface QueryContractsByCodeIdResponseAminoMsg {
  type: "/secret.compute.v1beta1.QueryContractsByCodeIdResponse";
  value: QueryContractsByCodeIdResponseAmino;
}
export interface QueryContractsByCodeIdResponseSDKType {
  contract_infos: ContractInfoWithAddressSDKType[];
}
export interface CodeInfoResponse {
  codeId: bigint;
  /** creator is the bech32 human readable address of the contract */
  creator: string;
  codeHash: string;
  source: string;
  builder: string;
}
export interface CodeInfoResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.CodeInfoResponse";
  value: Uint8Array;
}
export interface CodeInfoResponseAmino {
  code_id?: string;
  /** creator is the bech32 human readable address of the contract */
  creator?: string;
  code_hash?: string;
  source?: string;
  builder?: string;
}
export interface CodeInfoResponseAminoMsg {
  type: "/secret.compute.v1beta1.CodeInfoResponse";
  value: CodeInfoResponseAmino;
}
export interface CodeInfoResponseSDKType {
  code_id: bigint;
  creator: string;
  code_hash: string;
  source: string;
  builder: string;
}
export interface QueryCodeResponse {
  codeInfo?: CodeInfoResponse | undefined;
  wasm: Uint8Array;
}
export interface QueryCodeResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.QueryCodeResponse";
  value: Uint8Array;
}
export interface QueryCodeResponseAmino {
  code_info?: CodeInfoResponseAmino | undefined;
  wasm?: string;
}
export interface QueryCodeResponseAminoMsg {
  type: "/secret.compute.v1beta1.QueryCodeResponse";
  value: QueryCodeResponseAmino;
}
export interface QueryCodeResponseSDKType {
  code_info?: CodeInfoResponseSDKType | undefined;
  wasm: Uint8Array;
}
export interface QueryCodesResponse {
  codeInfos: CodeInfoResponse[];
}
export interface QueryCodesResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.QueryCodesResponse";
  value: Uint8Array;
}
export interface QueryCodesResponseAmino {
  code_infos?: CodeInfoResponseAmino[];
}
export interface QueryCodesResponseAminoMsg {
  type: "/secret.compute.v1beta1.QueryCodesResponse";
  value: QueryCodesResponseAmino;
}
export interface QueryCodesResponseSDKType {
  code_infos: CodeInfoResponseSDKType[];
}
export interface QueryContractAddressResponse {
  /** address is the bech32 human readable address of the contract */
  contractAddress: string;
}
export interface QueryContractAddressResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.QueryContractAddressResponse";
  value: Uint8Array;
}
export interface QueryContractAddressResponseAmino {
  /** address is the bech32 human readable address of the contract */
  contract_address?: string;
}
export interface QueryContractAddressResponseAminoMsg {
  type: "/secret.compute.v1beta1.QueryContractAddressResponse";
  value: QueryContractAddressResponseAmino;
}
export interface QueryContractAddressResponseSDKType {
  contract_address: string;
}
export interface QueryContractLabelResponse {
  label: string;
}
export interface QueryContractLabelResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.QueryContractLabelResponse";
  value: Uint8Array;
}
export interface QueryContractLabelResponseAmino {
  label?: string;
}
export interface QueryContractLabelResponseAminoMsg {
  type: "/secret.compute.v1beta1.QueryContractLabelResponse";
  value: QueryContractLabelResponseAmino;
}
export interface QueryContractLabelResponseSDKType {
  label: string;
}
export interface QueryCodeHashResponse {
  codeHash: string;
}
export interface QueryCodeHashResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.QueryCodeHashResponse";
  value: Uint8Array;
}
export interface QueryCodeHashResponseAmino {
  code_hash?: string;
}
export interface QueryCodeHashResponseAminoMsg {
  type: "/secret.compute.v1beta1.QueryCodeHashResponse";
  value: QueryCodeHashResponseAmino;
}
export interface QueryCodeHashResponseSDKType {
  code_hash: string;
}
/** DecryptedAnswer is a struct that represents a decrypted tx-query */
export interface DecryptedAnswer {
  type: string;
  input: string;
  outputData: string;
  outputDataAsString: string;
}
export interface DecryptedAnswerProtoMsg {
  typeUrl: "/secret.compute.v1beta1.DecryptedAnswer";
  value: Uint8Array;
}
/** DecryptedAnswer is a struct that represents a decrypted tx-query */
export interface DecryptedAnswerAmino {
  type?: string;
  input?: string;
  output_data?: string;
  output_data_as_string?: string;
}
export interface DecryptedAnswerAminoMsg {
  type: "/secret.compute.v1beta1.DecryptedAnswer";
  value: DecryptedAnswerAmino;
}
/** DecryptedAnswer is a struct that represents a decrypted tx-query */
export interface DecryptedAnswerSDKType {
  type: string;
  input: string;
  output_data: string;
  output_data_as_string: string;
}
export interface DecryptedAnswers {
  answers: DecryptedAnswer[];
  outputLogs: StringEvent[];
  outputError: string;
  plaintextError: string;
}
export interface DecryptedAnswersProtoMsg {
  typeUrl: "/secret.compute.v1beta1.DecryptedAnswers";
  value: Uint8Array;
}
export interface DecryptedAnswersAmino {
  answers?: DecryptedAnswerAmino[];
  output_logs?: StringEventAmino[];
  output_error?: string;
  plaintext_error?: string;
}
export interface DecryptedAnswersAminoMsg {
  type: "/secret.compute.v1beta1.DecryptedAnswers";
  value: DecryptedAnswersAmino;
}
export interface DecryptedAnswersSDKType {
  answers: DecryptedAnswerSDKType[];
  output_logs: StringEventSDKType[];
  output_error: string;
  plaintext_error: string;
}
/**
 * QueryContractHistoryRequest is the request type for the Query/ContractHistory
 * RPC method
 */
export interface QueryContractHistoryRequest {
  /** address is the address of the contract to query */
  contractAddress: string;
}
export interface QueryContractHistoryRequestProtoMsg {
  typeUrl: "/secret.compute.v1beta1.QueryContractHistoryRequest";
  value: Uint8Array;
}
/**
 * QueryContractHistoryRequest is the request type for the Query/ContractHistory
 * RPC method
 */
export interface QueryContractHistoryRequestAmino {
  /** address is the address of the contract to query */
  contract_address?: string;
}
export interface QueryContractHistoryRequestAminoMsg {
  type: "/secret.compute.v1beta1.QueryContractHistoryRequest";
  value: QueryContractHistoryRequestAmino;
}
/**
 * QueryContractHistoryRequest is the request type for the Query/ContractHistory
 * RPC method
 */
export interface QueryContractHistoryRequestSDKType {
  contract_address: string;
}
/**
 * QueryContractHistoryResponse is the response type for the
 * Query/ContractHistory RPC method
 */
export interface QueryContractHistoryResponse {
  entries: ContractCodeHistoryEntry[];
}
export interface QueryContractHistoryResponseProtoMsg {
  typeUrl: "/secret.compute.v1beta1.QueryContractHistoryResponse";
  value: Uint8Array;
}
/**
 * QueryContractHistoryResponse is the response type for the
 * Query/ContractHistory RPC method
 */
export interface QueryContractHistoryResponseAmino {
  entries?: ContractCodeHistoryEntryAmino[];
}
export interface QueryContractHistoryResponseAminoMsg {
  type: "/secret.compute.v1beta1.QueryContractHistoryResponse";
  value: QueryContractHistoryResponseAmino;
}
/**
 * QueryContractHistoryResponse is the response type for the
 * Query/ContractHistory RPC method
 */
export interface QueryContractHistoryResponseSDKType {
  entries: ContractCodeHistoryEntrySDKType[];
}
function createBaseQuerySecretContractRequest(): QuerySecretContractRequest {
  return {
    contractAddress: "",
    query: new Uint8Array()
  };
}
export const QuerySecretContractRequest = {
  typeUrl: "/secret.compute.v1beta1.QuerySecretContractRequest",
  encode(message: QuerySecretContractRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    if (message.query.length !== 0) {
      writer.uint32(18).bytes(message.query);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySecretContractRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySecretContractRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.string();
          break;
        case 2:
          message.query = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySecretContractRequest>): QuerySecretContractRequest {
    const message = createBaseQuerySecretContractRequest();
    message.contractAddress = object.contractAddress ?? "";
    message.query = object.query ?? new Uint8Array();
    return message;
  },
  fromAmino(object: QuerySecretContractRequestAmino): QuerySecretContractRequest {
    const message = createBaseQuerySecretContractRequest();
    if (object.contract_address !== undefined && object.contract_address !== null) {
      message.contractAddress = object.contract_address;
    }
    if (object.query !== undefined && object.query !== null) {
      message.query = bytesFromBase64(object.query);
    }
    return message;
  },
  toAmino(message: QuerySecretContractRequest, useInterfaces: boolean = false): QuerySecretContractRequestAmino {
    const obj: any = {};
    obj.contract_address = message.contractAddress;
    obj.query = message.query ? base64FromBytes(message.query) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySecretContractRequestAminoMsg): QuerySecretContractRequest {
    return QuerySecretContractRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySecretContractRequestProtoMsg, useInterfaces: boolean = false): QuerySecretContractRequest {
    return QuerySecretContractRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySecretContractRequest): Uint8Array {
    return QuerySecretContractRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySecretContractRequest): QuerySecretContractRequestProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.QuerySecretContractRequest",
      value: QuerySecretContractRequest.encode(message).finish()
    };
  }
};
function createBaseQueryByLabelRequest(): QueryByLabelRequest {
  return {
    label: ""
  };
}
export const QueryByLabelRequest = {
  typeUrl: "/secret.compute.v1beta1.QueryByLabelRequest",
  encode(message: QueryByLabelRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryByLabelRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryByLabelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.label = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryByLabelRequest>): QueryByLabelRequest {
    const message = createBaseQueryByLabelRequest();
    message.label = object.label ?? "";
    return message;
  },
  fromAmino(object: QueryByLabelRequestAmino): QueryByLabelRequest {
    const message = createBaseQueryByLabelRequest();
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    }
    return message;
  },
  toAmino(message: QueryByLabelRequest, useInterfaces: boolean = false): QueryByLabelRequestAmino {
    const obj: any = {};
    obj.label = message.label;
    return obj;
  },
  fromAminoMsg(object: QueryByLabelRequestAminoMsg): QueryByLabelRequest {
    return QueryByLabelRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryByLabelRequestProtoMsg, useInterfaces: boolean = false): QueryByLabelRequest {
    return QueryByLabelRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryByLabelRequest): Uint8Array {
    return QueryByLabelRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryByLabelRequest): QueryByLabelRequestProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.QueryByLabelRequest",
      value: QueryByLabelRequest.encode(message).finish()
    };
  }
};
function createBaseQueryByContractAddressRequest(): QueryByContractAddressRequest {
  return {
    contractAddress: ""
  };
}
export const QueryByContractAddressRequest = {
  typeUrl: "/secret.compute.v1beta1.QueryByContractAddressRequest",
  encode(message: QueryByContractAddressRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryByContractAddressRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryByContractAddressRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryByContractAddressRequest>): QueryByContractAddressRequest {
    const message = createBaseQueryByContractAddressRequest();
    message.contractAddress = object.contractAddress ?? "";
    return message;
  },
  fromAmino(object: QueryByContractAddressRequestAmino): QueryByContractAddressRequest {
    const message = createBaseQueryByContractAddressRequest();
    if (object.contract_address !== undefined && object.contract_address !== null) {
      message.contractAddress = object.contract_address;
    }
    return message;
  },
  toAmino(message: QueryByContractAddressRequest, useInterfaces: boolean = false): QueryByContractAddressRequestAmino {
    const obj: any = {};
    obj.contract_address = message.contractAddress;
    return obj;
  },
  fromAminoMsg(object: QueryByContractAddressRequestAminoMsg): QueryByContractAddressRequest {
    return QueryByContractAddressRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryByContractAddressRequestProtoMsg, useInterfaces: boolean = false): QueryByContractAddressRequest {
    return QueryByContractAddressRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryByContractAddressRequest): Uint8Array {
    return QueryByContractAddressRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryByContractAddressRequest): QueryByContractAddressRequestProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.QueryByContractAddressRequest",
      value: QueryByContractAddressRequest.encode(message).finish()
    };
  }
};
function createBaseQueryByCodeIdRequest(): QueryByCodeIdRequest {
  return {
    codeId: BigInt(0)
  };
}
export const QueryByCodeIdRequest = {
  typeUrl: "/secret.compute.v1beta1.QueryByCodeIdRequest",
  encode(message: QueryByCodeIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.codeId !== BigInt(0)) {
      writer.uint32(8).uint64(message.codeId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryByCodeIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryByCodeIdRequest();
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
  fromPartial(object: Partial<QueryByCodeIdRequest>): QueryByCodeIdRequest {
    const message = createBaseQueryByCodeIdRequest();
    message.codeId = object.codeId !== undefined && object.codeId !== null ? BigInt(object.codeId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryByCodeIdRequestAmino): QueryByCodeIdRequest {
    const message = createBaseQueryByCodeIdRequest();
    if (object.code_id !== undefined && object.code_id !== null) {
      message.codeId = BigInt(object.code_id);
    }
    return message;
  },
  toAmino(message: QueryByCodeIdRequest, useInterfaces: boolean = false): QueryByCodeIdRequestAmino {
    const obj: any = {};
    obj.code_id = message.codeId ? message.codeId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryByCodeIdRequestAminoMsg): QueryByCodeIdRequest {
    return QueryByCodeIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryByCodeIdRequestProtoMsg, useInterfaces: boolean = false): QueryByCodeIdRequest {
    return QueryByCodeIdRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryByCodeIdRequest): Uint8Array {
    return QueryByCodeIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryByCodeIdRequest): QueryByCodeIdRequestProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.QueryByCodeIdRequest",
      value: QueryByCodeIdRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySecretContractResponse(): QuerySecretContractResponse {
  return {
    data: new Uint8Array()
  };
}
export const QuerySecretContractResponse = {
  typeUrl: "/secret.compute.v1beta1.QuerySecretContractResponse",
  encode(message: QuerySecretContractResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QuerySecretContractResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySecretContractResponse();
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
  fromPartial(object: Partial<QuerySecretContractResponse>): QuerySecretContractResponse {
    const message = createBaseQuerySecretContractResponse();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
  fromAmino(object: QuerySecretContractResponseAmino): QuerySecretContractResponse {
    const message = createBaseQuerySecretContractResponse();
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  toAmino(message: QuerySecretContractResponse, useInterfaces: boolean = false): QuerySecretContractResponseAmino {
    const obj: any = {};
    obj.data = message.data ? base64FromBytes(message.data) : undefined;
    return obj;
  },
  fromAminoMsg(object: QuerySecretContractResponseAminoMsg): QuerySecretContractResponse {
    return QuerySecretContractResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySecretContractResponseProtoMsg, useInterfaces: boolean = false): QuerySecretContractResponse {
    return QuerySecretContractResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QuerySecretContractResponse): Uint8Array {
    return QuerySecretContractResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySecretContractResponse): QuerySecretContractResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.QuerySecretContractResponse",
      value: QuerySecretContractResponse.encode(message).finish()
    };
  }
};
function createBaseQueryContractInfoResponse(): QueryContractInfoResponse {
  return {
    contractAddress: "",
    contractInfo: undefined
  };
}
export const QueryContractInfoResponse = {
  typeUrl: "/secret.compute.v1beta1.QueryContractInfoResponse",
  encode(message: QueryContractInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    if (message.contractInfo !== undefined) {
      ContractInfo.encode(message.contractInfo, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryContractInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.string();
          break;
        case 2:
          message.contractInfo = ContractInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryContractInfoResponse>): QueryContractInfoResponse {
    const message = createBaseQueryContractInfoResponse();
    message.contractAddress = object.contractAddress ?? "";
    message.contractInfo = object.contractInfo !== undefined && object.contractInfo !== null ? ContractInfo.fromPartial(object.contractInfo) : undefined;
    return message;
  },
  fromAmino(object: QueryContractInfoResponseAmino): QueryContractInfoResponse {
    const message = createBaseQueryContractInfoResponse();
    if (object.contract_address !== undefined && object.contract_address !== null) {
      message.contractAddress = object.contract_address;
    }
    if (object.contract_info !== undefined && object.contract_info !== null) {
      message.contractInfo = ContractInfo.fromAmino(object.contract_info);
    }
    return message;
  },
  toAmino(message: QueryContractInfoResponse, useInterfaces: boolean = false): QueryContractInfoResponseAmino {
    const obj: any = {};
    obj.contract_address = message.contractAddress;
    obj.contract_info = message.contractInfo ? ContractInfo.toAmino(message.contractInfo, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryContractInfoResponseAminoMsg): QueryContractInfoResponse {
    return QueryContractInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryContractInfoResponseProtoMsg, useInterfaces: boolean = false): QueryContractInfoResponse {
    return QueryContractInfoResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryContractInfoResponse): Uint8Array {
    return QueryContractInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryContractInfoResponse): QueryContractInfoResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.QueryContractInfoResponse",
      value: QueryContractInfoResponse.encode(message).finish()
    };
  }
};
function createBaseContractInfoWithAddress(): ContractInfoWithAddress {
  return {
    contractAddress: "",
    contractInfo: undefined
  };
}
export const ContractInfoWithAddress = {
  typeUrl: "/secret.compute.v1beta1.ContractInfoWithAddress",
  encode(message: ContractInfoWithAddress, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    if (message.contractInfo !== undefined) {
      ContractInfo.encode(message.contractInfo, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ContractInfoWithAddress {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractInfoWithAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.string();
          break;
        case 2:
          message.contractInfo = ContractInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ContractInfoWithAddress>): ContractInfoWithAddress {
    const message = createBaseContractInfoWithAddress();
    message.contractAddress = object.contractAddress ?? "";
    message.contractInfo = object.contractInfo !== undefined && object.contractInfo !== null ? ContractInfo.fromPartial(object.contractInfo) : undefined;
    return message;
  },
  fromAmino(object: ContractInfoWithAddressAmino): ContractInfoWithAddress {
    const message = createBaseContractInfoWithAddress();
    if (object.contract_address !== undefined && object.contract_address !== null) {
      message.contractAddress = object.contract_address;
    }
    if (object.contract_info !== undefined && object.contract_info !== null) {
      message.contractInfo = ContractInfo.fromAmino(object.contract_info);
    }
    return message;
  },
  toAmino(message: ContractInfoWithAddress, useInterfaces: boolean = false): ContractInfoWithAddressAmino {
    const obj: any = {};
    obj.contract_address = message.contractAddress;
    obj.contract_info = message.contractInfo ? ContractInfo.toAmino(message.contractInfo, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ContractInfoWithAddressAminoMsg): ContractInfoWithAddress {
    return ContractInfoWithAddress.fromAmino(object.value);
  },
  fromProtoMsg(message: ContractInfoWithAddressProtoMsg, useInterfaces: boolean = false): ContractInfoWithAddress {
    return ContractInfoWithAddress.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ContractInfoWithAddress): Uint8Array {
    return ContractInfoWithAddress.encode(message).finish();
  },
  toProtoMsg(message: ContractInfoWithAddress): ContractInfoWithAddressProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.ContractInfoWithAddress",
      value: ContractInfoWithAddress.encode(message).finish()
    };
  }
};
function createBaseQueryContractsByCodeIdResponse(): QueryContractsByCodeIdResponse {
  return {
    contractInfos: []
  };
}
export const QueryContractsByCodeIdResponse = {
  typeUrl: "/secret.compute.v1beta1.QueryContractsByCodeIdResponse",
  encode(message: QueryContractsByCodeIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.contractInfos) {
      ContractInfoWithAddress.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryContractsByCodeIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractsByCodeIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractInfos.push(ContractInfoWithAddress.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryContractsByCodeIdResponse>): QueryContractsByCodeIdResponse {
    const message = createBaseQueryContractsByCodeIdResponse();
    message.contractInfos = object.contractInfos?.map(e => ContractInfoWithAddress.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryContractsByCodeIdResponseAmino): QueryContractsByCodeIdResponse {
    const message = createBaseQueryContractsByCodeIdResponse();
    message.contractInfos = object.contract_infos?.map(e => ContractInfoWithAddress.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryContractsByCodeIdResponse, useInterfaces: boolean = false): QueryContractsByCodeIdResponseAmino {
    const obj: any = {};
    if (message.contractInfos) {
      obj.contract_infos = message.contractInfos.map(e => e ? ContractInfoWithAddress.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.contract_infos = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryContractsByCodeIdResponseAminoMsg): QueryContractsByCodeIdResponse {
    return QueryContractsByCodeIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryContractsByCodeIdResponseProtoMsg, useInterfaces: boolean = false): QueryContractsByCodeIdResponse {
    return QueryContractsByCodeIdResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryContractsByCodeIdResponse): Uint8Array {
    return QueryContractsByCodeIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryContractsByCodeIdResponse): QueryContractsByCodeIdResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.QueryContractsByCodeIdResponse",
      value: QueryContractsByCodeIdResponse.encode(message).finish()
    };
  }
};
function createBaseCodeInfoResponse(): CodeInfoResponse {
  return {
    codeId: BigInt(0),
    creator: "",
    codeHash: "",
    source: "",
    builder: ""
  };
}
export const CodeInfoResponse = {
  typeUrl: "/secret.compute.v1beta1.CodeInfoResponse",
  encode(message: CodeInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.codeId !== BigInt(0)) {
      writer.uint32(8).uint64(message.codeId);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.codeHash !== "") {
      writer.uint32(26).string(message.codeHash);
    }
    if (message.source !== "") {
      writer.uint32(34).string(message.source);
    }
    if (message.builder !== "") {
      writer.uint32(42).string(message.builder);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CodeInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCodeInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeId = reader.uint64();
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.codeHash = reader.string();
          break;
        case 4:
          message.source = reader.string();
          break;
        case 5:
          message.builder = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CodeInfoResponse>): CodeInfoResponse {
    const message = createBaseCodeInfoResponse();
    message.codeId = object.codeId !== undefined && object.codeId !== null ? BigInt(object.codeId.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.codeHash = object.codeHash ?? "";
    message.source = object.source ?? "";
    message.builder = object.builder ?? "";
    return message;
  },
  fromAmino(object: CodeInfoResponseAmino): CodeInfoResponse {
    const message = createBaseCodeInfoResponse();
    if (object.code_id !== undefined && object.code_id !== null) {
      message.codeId = BigInt(object.code_id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.code_hash !== undefined && object.code_hash !== null) {
      message.codeHash = object.code_hash;
    }
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    }
    if (object.builder !== undefined && object.builder !== null) {
      message.builder = object.builder;
    }
    return message;
  },
  toAmino(message: CodeInfoResponse, useInterfaces: boolean = false): CodeInfoResponseAmino {
    const obj: any = {};
    obj.code_id = message.codeId ? message.codeId.toString() : undefined;
    obj.creator = message.creator;
    obj.code_hash = message.codeHash;
    obj.source = message.source;
    obj.builder = message.builder;
    return obj;
  },
  fromAminoMsg(object: CodeInfoResponseAminoMsg): CodeInfoResponse {
    return CodeInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: CodeInfoResponseProtoMsg, useInterfaces: boolean = false): CodeInfoResponse {
    return CodeInfoResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CodeInfoResponse): Uint8Array {
    return CodeInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: CodeInfoResponse): CodeInfoResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.CodeInfoResponse",
      value: CodeInfoResponse.encode(message).finish()
    };
  }
};
function createBaseQueryCodeResponse(): QueryCodeResponse {
  return {
    codeInfo: undefined,
    wasm: new Uint8Array()
  };
}
export const QueryCodeResponse = {
  typeUrl: "/secret.compute.v1beta1.QueryCodeResponse",
  encode(message: QueryCodeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.codeInfo !== undefined) {
      CodeInfoResponse.encode(message.codeInfo, writer.uint32(10).fork()).ldelim();
    }
    if (message.wasm.length !== 0) {
      writer.uint32(18).bytes(message.wasm);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryCodeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeInfo = CodeInfoResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.wasm = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCodeResponse>): QueryCodeResponse {
    const message = createBaseQueryCodeResponse();
    message.codeInfo = object.codeInfo !== undefined && object.codeInfo !== null ? CodeInfoResponse.fromPartial(object.codeInfo) : undefined;
    message.wasm = object.wasm ?? new Uint8Array();
    return message;
  },
  fromAmino(object: QueryCodeResponseAmino): QueryCodeResponse {
    const message = createBaseQueryCodeResponse();
    if (object.code_info !== undefined && object.code_info !== null) {
      message.codeInfo = CodeInfoResponse.fromAmino(object.code_info);
    }
    if (object.wasm !== undefined && object.wasm !== null) {
      message.wasm = bytesFromBase64(object.wasm);
    }
    return message;
  },
  toAmino(message: QueryCodeResponse, useInterfaces: boolean = false): QueryCodeResponseAmino {
    const obj: any = {};
    obj.code_info = message.codeInfo ? CodeInfoResponse.toAmino(message.codeInfo, useInterfaces) : undefined;
    obj.wasm = message.wasm ? base64FromBytes(message.wasm) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryCodeResponseAminoMsg): QueryCodeResponse {
    return QueryCodeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCodeResponseProtoMsg, useInterfaces: boolean = false): QueryCodeResponse {
    return QueryCodeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryCodeResponse): Uint8Array {
    return QueryCodeResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCodeResponse): QueryCodeResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.QueryCodeResponse",
      value: QueryCodeResponse.encode(message).finish()
    };
  }
};
function createBaseQueryCodesResponse(): QueryCodesResponse {
  return {
    codeInfos: []
  };
}
export const QueryCodesResponse = {
  typeUrl: "/secret.compute.v1beta1.QueryCodesResponse",
  encode(message: QueryCodesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.codeInfos) {
      CodeInfoResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryCodesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCodesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeInfos.push(CodeInfoResponse.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCodesResponse>): QueryCodesResponse {
    const message = createBaseQueryCodesResponse();
    message.codeInfos = object.codeInfos?.map(e => CodeInfoResponse.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryCodesResponseAmino): QueryCodesResponse {
    const message = createBaseQueryCodesResponse();
    message.codeInfos = object.code_infos?.map(e => CodeInfoResponse.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryCodesResponse, useInterfaces: boolean = false): QueryCodesResponseAmino {
    const obj: any = {};
    if (message.codeInfos) {
      obj.code_infos = message.codeInfos.map(e => e ? CodeInfoResponse.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.code_infos = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryCodesResponseAminoMsg): QueryCodesResponse {
    return QueryCodesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCodesResponseProtoMsg, useInterfaces: boolean = false): QueryCodesResponse {
    return QueryCodesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryCodesResponse): Uint8Array {
    return QueryCodesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCodesResponse): QueryCodesResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.QueryCodesResponse",
      value: QueryCodesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryContractAddressResponse(): QueryContractAddressResponse {
  return {
    contractAddress: ""
  };
}
export const QueryContractAddressResponse = {
  typeUrl: "/secret.compute.v1beta1.QueryContractAddressResponse",
  encode(message: QueryContractAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryContractAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryContractAddressResponse>): QueryContractAddressResponse {
    const message = createBaseQueryContractAddressResponse();
    message.contractAddress = object.contractAddress ?? "";
    return message;
  },
  fromAmino(object: QueryContractAddressResponseAmino): QueryContractAddressResponse {
    const message = createBaseQueryContractAddressResponse();
    if (object.contract_address !== undefined && object.contract_address !== null) {
      message.contractAddress = object.contract_address;
    }
    return message;
  },
  toAmino(message: QueryContractAddressResponse, useInterfaces: boolean = false): QueryContractAddressResponseAmino {
    const obj: any = {};
    obj.contract_address = message.contractAddress;
    return obj;
  },
  fromAminoMsg(object: QueryContractAddressResponseAminoMsg): QueryContractAddressResponse {
    return QueryContractAddressResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryContractAddressResponseProtoMsg, useInterfaces: boolean = false): QueryContractAddressResponse {
    return QueryContractAddressResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryContractAddressResponse): Uint8Array {
    return QueryContractAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryContractAddressResponse): QueryContractAddressResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.QueryContractAddressResponse",
      value: QueryContractAddressResponse.encode(message).finish()
    };
  }
};
function createBaseQueryContractLabelResponse(): QueryContractLabelResponse {
  return {
    label: ""
  };
}
export const QueryContractLabelResponse = {
  typeUrl: "/secret.compute.v1beta1.QueryContractLabelResponse",
  encode(message: QueryContractLabelResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryContractLabelResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractLabelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.label = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryContractLabelResponse>): QueryContractLabelResponse {
    const message = createBaseQueryContractLabelResponse();
    message.label = object.label ?? "";
    return message;
  },
  fromAmino(object: QueryContractLabelResponseAmino): QueryContractLabelResponse {
    const message = createBaseQueryContractLabelResponse();
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    }
    return message;
  },
  toAmino(message: QueryContractLabelResponse, useInterfaces: boolean = false): QueryContractLabelResponseAmino {
    const obj: any = {};
    obj.label = message.label;
    return obj;
  },
  fromAminoMsg(object: QueryContractLabelResponseAminoMsg): QueryContractLabelResponse {
    return QueryContractLabelResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryContractLabelResponseProtoMsg, useInterfaces: boolean = false): QueryContractLabelResponse {
    return QueryContractLabelResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryContractLabelResponse): Uint8Array {
    return QueryContractLabelResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryContractLabelResponse): QueryContractLabelResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.QueryContractLabelResponse",
      value: QueryContractLabelResponse.encode(message).finish()
    };
  }
};
function createBaseQueryCodeHashResponse(): QueryCodeHashResponse {
  return {
    codeHash: ""
  };
}
export const QueryCodeHashResponse = {
  typeUrl: "/secret.compute.v1beta1.QueryCodeHashResponse",
  encode(message: QueryCodeHashResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.codeHash !== "") {
      writer.uint32(10).string(message.codeHash);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryCodeHashResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCodeHashResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCodeHashResponse>): QueryCodeHashResponse {
    const message = createBaseQueryCodeHashResponse();
    message.codeHash = object.codeHash ?? "";
    return message;
  },
  fromAmino(object: QueryCodeHashResponseAmino): QueryCodeHashResponse {
    const message = createBaseQueryCodeHashResponse();
    if (object.code_hash !== undefined && object.code_hash !== null) {
      message.codeHash = object.code_hash;
    }
    return message;
  },
  toAmino(message: QueryCodeHashResponse, useInterfaces: boolean = false): QueryCodeHashResponseAmino {
    const obj: any = {};
    obj.code_hash = message.codeHash;
    return obj;
  },
  fromAminoMsg(object: QueryCodeHashResponseAminoMsg): QueryCodeHashResponse {
    return QueryCodeHashResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCodeHashResponseProtoMsg, useInterfaces: boolean = false): QueryCodeHashResponse {
    return QueryCodeHashResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryCodeHashResponse): Uint8Array {
    return QueryCodeHashResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCodeHashResponse): QueryCodeHashResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.QueryCodeHashResponse",
      value: QueryCodeHashResponse.encode(message).finish()
    };
  }
};
function createBaseDecryptedAnswer(): DecryptedAnswer {
  return {
    type: "",
    input: "",
    outputData: "",
    outputDataAsString: ""
  };
}
export const DecryptedAnswer = {
  typeUrl: "/secret.compute.v1beta1.DecryptedAnswer",
  encode(message: DecryptedAnswer, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.input !== "") {
      writer.uint32(18).string(message.input);
    }
    if (message.outputData !== "") {
      writer.uint32(26).string(message.outputData);
    }
    if (message.outputDataAsString !== "") {
      writer.uint32(34).string(message.outputDataAsString);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DecryptedAnswer {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecryptedAnswer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.input = reader.string();
          break;
        case 3:
          message.outputData = reader.string();
          break;
        case 4:
          message.outputDataAsString = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DecryptedAnswer>): DecryptedAnswer {
    const message = createBaseDecryptedAnswer();
    message.type = object.type ?? "";
    message.input = object.input ?? "";
    message.outputData = object.outputData ?? "";
    message.outputDataAsString = object.outputDataAsString ?? "";
    return message;
  },
  fromAmino(object: DecryptedAnswerAmino): DecryptedAnswer {
    const message = createBaseDecryptedAnswer();
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    if (object.input !== undefined && object.input !== null) {
      message.input = object.input;
    }
    if (object.output_data !== undefined && object.output_data !== null) {
      message.outputData = object.output_data;
    }
    if (object.output_data_as_string !== undefined && object.output_data_as_string !== null) {
      message.outputDataAsString = object.output_data_as_string;
    }
    return message;
  },
  toAmino(message: DecryptedAnswer, useInterfaces: boolean = false): DecryptedAnswerAmino {
    const obj: any = {};
    obj.type = message.type;
    obj.input = message.input;
    obj.output_data = message.outputData;
    obj.output_data_as_string = message.outputDataAsString;
    return obj;
  },
  fromAminoMsg(object: DecryptedAnswerAminoMsg): DecryptedAnswer {
    return DecryptedAnswer.fromAmino(object.value);
  },
  fromProtoMsg(message: DecryptedAnswerProtoMsg, useInterfaces: boolean = false): DecryptedAnswer {
    return DecryptedAnswer.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DecryptedAnswer): Uint8Array {
    return DecryptedAnswer.encode(message).finish();
  },
  toProtoMsg(message: DecryptedAnswer): DecryptedAnswerProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.DecryptedAnswer",
      value: DecryptedAnswer.encode(message).finish()
    };
  }
};
function createBaseDecryptedAnswers(): DecryptedAnswers {
  return {
    answers: [],
    outputLogs: [],
    outputError: "",
    plaintextError: ""
  };
}
export const DecryptedAnswers = {
  typeUrl: "/secret.compute.v1beta1.DecryptedAnswers",
  encode(message: DecryptedAnswers, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.answers) {
      DecryptedAnswer.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.outputLogs) {
      StringEvent.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.outputError !== "") {
      writer.uint32(26).string(message.outputError);
    }
    if (message.plaintextError !== "") {
      writer.uint32(34).string(message.plaintextError);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DecryptedAnswers {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDecryptedAnswers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.answers.push(DecryptedAnswer.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.outputLogs.push(StringEvent.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.outputError = reader.string();
          break;
        case 4:
          message.plaintextError = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DecryptedAnswers>): DecryptedAnswers {
    const message = createBaseDecryptedAnswers();
    message.answers = object.answers?.map(e => DecryptedAnswer.fromPartial(e)) || [];
    message.outputLogs = object.outputLogs?.map(e => StringEvent.fromPartial(e)) || [];
    message.outputError = object.outputError ?? "";
    message.plaintextError = object.plaintextError ?? "";
    return message;
  },
  fromAmino(object: DecryptedAnswersAmino): DecryptedAnswers {
    const message = createBaseDecryptedAnswers();
    message.answers = object.answers?.map(e => DecryptedAnswer.fromAmino(e)) || [];
    message.outputLogs = object.output_logs?.map(e => StringEvent.fromAmino(e)) || [];
    if (object.output_error !== undefined && object.output_error !== null) {
      message.outputError = object.output_error;
    }
    if (object.plaintext_error !== undefined && object.plaintext_error !== null) {
      message.plaintextError = object.plaintext_error;
    }
    return message;
  },
  toAmino(message: DecryptedAnswers, useInterfaces: boolean = false): DecryptedAnswersAmino {
    const obj: any = {};
    if (message.answers) {
      obj.answers = message.answers.map(e => e ? DecryptedAnswer.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.answers = [];
    }
    if (message.outputLogs) {
      obj.output_logs = message.outputLogs.map(e => e ? StringEvent.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.output_logs = [];
    }
    obj.output_error = message.outputError;
    obj.plaintext_error = message.plaintextError;
    return obj;
  },
  fromAminoMsg(object: DecryptedAnswersAminoMsg): DecryptedAnswers {
    return DecryptedAnswers.fromAmino(object.value);
  },
  fromProtoMsg(message: DecryptedAnswersProtoMsg, useInterfaces: boolean = false): DecryptedAnswers {
    return DecryptedAnswers.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DecryptedAnswers): Uint8Array {
    return DecryptedAnswers.encode(message).finish();
  },
  toProtoMsg(message: DecryptedAnswers): DecryptedAnswersProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.DecryptedAnswers",
      value: DecryptedAnswers.encode(message).finish()
    };
  }
};
function createBaseQueryContractHistoryRequest(): QueryContractHistoryRequest {
  return {
    contractAddress: ""
  };
}
export const QueryContractHistoryRequest = {
  typeUrl: "/secret.compute.v1beta1.QueryContractHistoryRequest",
  encode(message: QueryContractHistoryRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryContractHistoryRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractHistoryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryContractHistoryRequest>): QueryContractHistoryRequest {
    const message = createBaseQueryContractHistoryRequest();
    message.contractAddress = object.contractAddress ?? "";
    return message;
  },
  fromAmino(object: QueryContractHistoryRequestAmino): QueryContractHistoryRequest {
    const message = createBaseQueryContractHistoryRequest();
    if (object.contract_address !== undefined && object.contract_address !== null) {
      message.contractAddress = object.contract_address;
    }
    return message;
  },
  toAmino(message: QueryContractHistoryRequest, useInterfaces: boolean = false): QueryContractHistoryRequestAmino {
    const obj: any = {};
    obj.contract_address = message.contractAddress;
    return obj;
  },
  fromAminoMsg(object: QueryContractHistoryRequestAminoMsg): QueryContractHistoryRequest {
    return QueryContractHistoryRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryContractHistoryRequestProtoMsg, useInterfaces: boolean = false): QueryContractHistoryRequest {
    return QueryContractHistoryRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryContractHistoryRequest): Uint8Array {
    return QueryContractHistoryRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryContractHistoryRequest): QueryContractHistoryRequestProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.QueryContractHistoryRequest",
      value: QueryContractHistoryRequest.encode(message).finish()
    };
  }
};
function createBaseQueryContractHistoryResponse(): QueryContractHistoryResponse {
  return {
    entries: []
  };
}
export const QueryContractHistoryResponse = {
  typeUrl: "/secret.compute.v1beta1.QueryContractHistoryResponse",
  encode(message: QueryContractHistoryResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.entries) {
      ContractCodeHistoryEntry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryContractHistoryResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryContractHistoryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.entries.push(ContractCodeHistoryEntry.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryContractHistoryResponse>): QueryContractHistoryResponse {
    const message = createBaseQueryContractHistoryResponse();
    message.entries = object.entries?.map(e => ContractCodeHistoryEntry.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryContractHistoryResponseAmino): QueryContractHistoryResponse {
    const message = createBaseQueryContractHistoryResponse();
    message.entries = object.entries?.map(e => ContractCodeHistoryEntry.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryContractHistoryResponse, useInterfaces: boolean = false): QueryContractHistoryResponseAmino {
    const obj: any = {};
    if (message.entries) {
      obj.entries = message.entries.map(e => e ? ContractCodeHistoryEntry.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.entries = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryContractHistoryResponseAminoMsg): QueryContractHistoryResponse {
    return QueryContractHistoryResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryContractHistoryResponseProtoMsg, useInterfaces: boolean = false): QueryContractHistoryResponse {
    return QueryContractHistoryResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryContractHistoryResponse): Uint8Array {
    return QueryContractHistoryResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryContractHistoryResponse): QueryContractHistoryResponseProtoMsg {
    return {
      typeUrl: "/secret.compute.v1beta1.QueryContractHistoryResponse",
      value: QueryContractHistoryResponse.encode(message).finish()
    };
  }
};