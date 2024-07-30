//@ts-nocheck
import { KVKey, KVKeyAmino, KVKeySDKType } from "./genesis";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { ProofOps, ProofOpsAmino, ProofOpsSDKType, Proof, ProofAmino, ProofSDKType } from "../../tendermint/crypto/proof";
import { Any, AnyAmino, AnySDKType } from "../../google/protobuf/any";
import { ExecTxResult, ExecTxResultAmino, ExecTxResultSDKType } from "../../tendermint/abci/types";
import { BinaryReader, BinaryWriter } from "../../binary";
import { bytesFromBase64, base64FromBytes } from "../../helpers";
export interface MsgRegisterInterchainQuery {
  /** defines a query type: `kv` or `tx` now */
  queryType: string;
  /**
   * is used to define KV-storage keys for which we want to get values from
   * remote chain
   */
  keys: KVKey[];
  /** is used to define a filter for transaction search ICQ */
  transactionsFilter: string;
  /** is IBC connection ID for getting ConsensusState to verify proofs */
  connectionId: string;
  /** is used to specify how often (in neutron blocks) the query must be updated */
  updatePeriod: bigint;
  /** is the signer of the message */
  sender: string;
}
export interface MsgRegisterInterchainQueryProtoMsg {
  typeUrl: "/neutron.interchainqueries.MsgRegisterInterchainQuery";
  value: Uint8Array;
}
export interface MsgRegisterInterchainQueryAmino {
  /** defines a query type: `kv` or `tx` now */
  query_type?: string;
  /**
   * is used to define KV-storage keys for which we want to get values from
   * remote chain
   */
  keys?: KVKeyAmino[];
  /** is used to define a filter for transaction search ICQ */
  transactions_filter?: string;
  /** is IBC connection ID for getting ConsensusState to verify proofs */
  connection_id?: string;
  /** is used to specify how often (in neutron blocks) the query must be updated */
  update_period?: string;
  /** is the signer of the message */
  sender?: string;
}
export interface MsgRegisterInterchainQueryAminoMsg {
  type: "/neutron.interchainqueries.MsgRegisterInterchainQuery";
  value: MsgRegisterInterchainQueryAmino;
}
export interface MsgRegisterInterchainQuerySDKType {
  query_type: string;
  keys: KVKeySDKType[];
  transactions_filter: string;
  connection_id: string;
  update_period: bigint;
  sender: string;
}
export interface MsgRegisterInterchainQueryResponse {
  id: bigint;
}
export interface MsgRegisterInterchainQueryResponseProtoMsg {
  typeUrl: "/neutron.interchainqueries.MsgRegisterInterchainQueryResponse";
  value: Uint8Array;
}
export interface MsgRegisterInterchainQueryResponseAmino {
  id?: string;
}
export interface MsgRegisterInterchainQueryResponseAminoMsg {
  type: "/neutron.interchainqueries.MsgRegisterInterchainQueryResponse";
  value: MsgRegisterInterchainQueryResponseAmino;
}
export interface MsgRegisterInterchainQueryResponseSDKType {
  id: bigint;
}
export interface MsgSubmitQueryResult {
  queryId: bigint;
  sender: string;
  /**
   * is the IBC client ID for an IBC connection between Neutron chain and target
   * chain (where the result was obtained from)
   */
  clientId: string;
  result?: QueryResult | undefined;
}
export interface MsgSubmitQueryResultProtoMsg {
  typeUrl: "/neutron.interchainqueries.MsgSubmitQueryResult";
  value: Uint8Array;
}
export interface MsgSubmitQueryResultAmino {
  query_id?: string;
  sender?: string;
  /**
   * is the IBC client ID for an IBC connection between Neutron chain and target
   * chain (where the result was obtained from)
   */
  client_id?: string;
  result?: QueryResultAmino | undefined;
}
export interface MsgSubmitQueryResultAminoMsg {
  type: "/neutron.interchainqueries.MsgSubmitQueryResult";
  value: MsgSubmitQueryResultAmino;
}
export interface MsgSubmitQueryResultSDKType {
  query_id: bigint;
  sender: string;
  client_id: string;
  result?: QueryResultSDKType | undefined;
}
export interface QueryResult {
  kvResults: StorageValue[];
  block?: Block | undefined;
  height: bigint;
  revision: bigint;
  allowKvCallbacks: boolean;
}
export interface QueryResultProtoMsg {
  typeUrl: "/neutron.interchainqueries.QueryResult";
  value: Uint8Array;
}
export interface QueryResultAmino {
  kv_results?: StorageValueAmino[];
  block?: BlockAmino | undefined;
  height?: string;
  revision?: string;
  allow_kv_callbacks?: boolean;
}
export interface QueryResultAminoMsg {
  type: "/neutron.interchainqueries.QueryResult";
  value: QueryResultAmino;
}
export interface QueryResultSDKType {
  kv_results: StorageValueSDKType[];
  block?: BlockSDKType | undefined;
  height: bigint;
  revision: bigint;
  allow_kv_callbacks: boolean;
}
export interface StorageValue {
  /** is the substore name (acc, staking, etc.) */
  storagePrefix: string;
  /** is the key in IAVL store */
  key: Uint8Array;
  /** is the value in IAVL store */
  value: Uint8Array;
  /**
   * is the Merkle Proof which proves existence of key-value pair in IAVL
   * storage
   */
  proof?: ProofOps | undefined;
}
export interface StorageValueProtoMsg {
  typeUrl: "/neutron.interchainqueries.StorageValue";
  value: Uint8Array;
}
export interface StorageValueAmino {
  /** is the substore name (acc, staking, etc.) */
  storage_prefix?: string;
  /** is the key in IAVL store */
  key?: string;
  /** is the value in IAVL store */
  value?: string;
  /**
   * is the Merkle Proof which proves existence of key-value pair in IAVL
   * storage
   */
  Proof?: ProofOpsAmino | undefined;
}
export interface StorageValueAminoMsg {
  type: "/neutron.interchainqueries.StorageValue";
  value: StorageValueAmino;
}
export interface StorageValueSDKType {
  storage_prefix: string;
  key: Uint8Array;
  value: Uint8Array;
  Proof?: ProofOpsSDKType | undefined;
}
export interface Block {
  /**
   * We need to know block X+1 to verify response of transaction for block X
   * since LastResultsHash is root hash of all results from the txs from the
   * previous block
   */
  nextBlockHeader?: Any | undefined;
  /** We need to know block X to verify inclusion of transaction for block X */
  header?: Any | undefined;
  tx?: TxValue | undefined;
}
export interface BlockProtoMsg {
  typeUrl: "/neutron.interchainqueries.Block";
  value: Uint8Array;
}
export interface BlockAmino {
  /**
   * We need to know block X+1 to verify response of transaction for block X
   * since LastResultsHash is root hash of all results from the txs from the
   * previous block
   */
  next_block_header?: AnyAmino | undefined;
  /** We need to know block X to verify inclusion of transaction for block X */
  header?: AnyAmino | undefined;
  tx?: TxValueAmino | undefined;
}
export interface BlockAminoMsg {
  type: "/neutron.interchainqueries.Block";
  value: BlockAmino;
}
export interface BlockSDKType {
  next_block_header?: AnySDKType | undefined;
  header?: AnySDKType | undefined;
  tx?: TxValueSDKType | undefined;
}
export interface TxValue {
  response?: ExecTxResult | undefined;
  /**
   * is the Merkle Proof which proves existence of response in block with height
   * next_block_header.Height
   */
  deliveryProof?: Proof | undefined;
  /**
   * is the Merkle Proof which proves existence of data in block with height
   * header.Height
   */
  inclusionProof?: Proof | undefined;
  /** is body of the transaction */
  data: Uint8Array;
}
export interface TxValueProtoMsg {
  typeUrl: "/neutron.interchainqueries.TxValue";
  value: Uint8Array;
}
export interface TxValueAmino {
  response?: ExecTxResultAmino | undefined;
  /**
   * is the Merkle Proof which proves existence of response in block with height
   * next_block_header.Height
   */
  delivery_proof?: ProofAmino | undefined;
  /**
   * is the Merkle Proof which proves existence of data in block with height
   * header.Height
   */
  inclusion_proof?: ProofAmino | undefined;
  /** is body of the transaction */
  data?: string;
}
export interface TxValueAminoMsg {
  type: "/neutron.interchainqueries.TxValue";
  value: TxValueAmino;
}
export interface TxValueSDKType {
  response?: ExecTxResultSDKType | undefined;
  delivery_proof?: ProofSDKType | undefined;
  inclusion_proof?: ProofSDKType | undefined;
  data: Uint8Array;
}
export interface MsgSubmitQueryResultResponse {}
export interface MsgSubmitQueryResultResponseProtoMsg {
  typeUrl: "/neutron.interchainqueries.MsgSubmitQueryResultResponse";
  value: Uint8Array;
}
export interface MsgSubmitQueryResultResponseAmino {}
export interface MsgSubmitQueryResultResponseAminoMsg {
  type: "/neutron.interchainqueries.MsgSubmitQueryResultResponse";
  value: MsgSubmitQueryResultResponseAmino;
}
export interface MsgSubmitQueryResultResponseSDKType {}
export interface MsgRemoveInterchainQueryRequest {
  queryId: bigint;
  /** is the signer of the message */
  sender: string;
}
export interface MsgRemoveInterchainQueryRequestProtoMsg {
  typeUrl: "/neutron.interchainqueries.MsgRemoveInterchainQueryRequest";
  value: Uint8Array;
}
export interface MsgRemoveInterchainQueryRequestAmino {
  query_id?: string;
  /** is the signer of the message */
  sender?: string;
}
export interface MsgRemoveInterchainQueryRequestAminoMsg {
  type: "/neutron.interchainqueries.MsgRemoveInterchainQueryRequest";
  value: MsgRemoveInterchainQueryRequestAmino;
}
export interface MsgRemoveInterchainQueryRequestSDKType {
  query_id: bigint;
  sender: string;
}
export interface MsgRemoveInterchainQueryResponse {}
export interface MsgRemoveInterchainQueryResponseProtoMsg {
  typeUrl: "/neutron.interchainqueries.MsgRemoveInterchainQueryResponse";
  value: Uint8Array;
}
export interface MsgRemoveInterchainQueryResponseAmino {}
export interface MsgRemoveInterchainQueryResponseAminoMsg {
  type: "/neutron.interchainqueries.MsgRemoveInterchainQueryResponse";
  value: MsgRemoveInterchainQueryResponseAmino;
}
export interface MsgRemoveInterchainQueryResponseSDKType {}
export interface MsgUpdateInterchainQueryRequest {
  queryId: bigint;
  newKeys: KVKey[];
  newUpdatePeriod: bigint;
  newTransactionsFilter: string;
  /** is the signer of the message */
  sender: string;
}
export interface MsgUpdateInterchainQueryRequestProtoMsg {
  typeUrl: "/neutron.interchainqueries.MsgUpdateInterchainQueryRequest";
  value: Uint8Array;
}
export interface MsgUpdateInterchainQueryRequestAmino {
  query_id?: string;
  new_keys?: KVKeyAmino[];
  new_update_period?: string;
  new_transactions_filter?: string;
  /** is the signer of the message */
  sender?: string;
}
export interface MsgUpdateInterchainQueryRequestAminoMsg {
  type: "/neutron.interchainqueries.MsgUpdateInterchainQueryRequest";
  value: MsgUpdateInterchainQueryRequestAmino;
}
export interface MsgUpdateInterchainQueryRequestSDKType {
  query_id: bigint;
  new_keys: KVKeySDKType[];
  new_update_period: bigint;
  new_transactions_filter: string;
  sender: string;
}
export interface MsgUpdateInterchainQueryResponse {}
export interface MsgUpdateInterchainQueryResponseProtoMsg {
  typeUrl: "/neutron.interchainqueries.MsgUpdateInterchainQueryResponse";
  value: Uint8Array;
}
export interface MsgUpdateInterchainQueryResponseAmino {}
export interface MsgUpdateInterchainQueryResponseAminoMsg {
  type: "/neutron.interchainqueries.MsgUpdateInterchainQueryResponse";
  value: MsgUpdateInterchainQueryResponseAmino;
}
export interface MsgUpdateInterchainQueryResponseSDKType {}
/**
 * MsgUpdateParams is the MsgUpdateParams request type.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParams {
  /** Authority is the address of the governance account. */
  authority: string;
  /**
   * params defines the x/interchainqueries parameters to update.
   * 
   * NOTE: All parameters must be supplied.
   */
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/neutron.interchainqueries.MsgUpdateParams";
  value: Uint8Array;
}
/**
 * MsgUpdateParams is the MsgUpdateParams request type.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParamsAmino {
  /** Authority is the address of the governance account. */
  authority?: string;
  /**
   * params defines the x/interchainqueries parameters to update.
   * 
   * NOTE: All parameters must be supplied.
   */
  params: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "interchainqueries/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/**
 * MsgUpdateParams is the MsgUpdateParams request type.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/neutron.interchainqueries.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/neutron.interchainqueries.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * 
 * Since: 0.47
 */
export interface MsgUpdateParamsResponseSDKType {}
function createBaseMsgRegisterInterchainQuery(): MsgRegisterInterchainQuery {
  return {
    queryType: "",
    keys: [],
    transactionsFilter: "",
    connectionId: "",
    updatePeriod: BigInt(0),
    sender: ""
  };
}
export const MsgRegisterInterchainQuery = {
  typeUrl: "/neutron.interchainqueries.MsgRegisterInterchainQuery",
  encode(message: MsgRegisterInterchainQuery, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.queryType !== "") {
      writer.uint32(10).string(message.queryType);
    }
    for (const v of message.keys) {
      KVKey.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.transactionsFilter !== "") {
      writer.uint32(26).string(message.transactionsFilter);
    }
    if (message.connectionId !== "") {
      writer.uint32(34).string(message.connectionId);
    }
    if (message.updatePeriod !== BigInt(0)) {
      writer.uint32(40).uint64(message.updatePeriod);
    }
    if (message.sender !== "") {
      writer.uint32(50).string(message.sender);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterInterchainQuery {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterInterchainQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.queryType = reader.string();
          break;
        case 2:
          message.keys.push(KVKey.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.transactionsFilter = reader.string();
          break;
        case 4:
          message.connectionId = reader.string();
          break;
        case 5:
          message.updatePeriod = reader.uint64();
          break;
        case 6:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRegisterInterchainQuery>): MsgRegisterInterchainQuery {
    const message = createBaseMsgRegisterInterchainQuery();
    message.queryType = object.queryType ?? "";
    message.keys = object.keys?.map(e => KVKey.fromPartial(e)) || [];
    message.transactionsFilter = object.transactionsFilter ?? "";
    message.connectionId = object.connectionId ?? "";
    message.updatePeriod = object.updatePeriod !== undefined && object.updatePeriod !== null ? BigInt(object.updatePeriod.toString()) : BigInt(0);
    message.sender = object.sender ?? "";
    return message;
  },
  fromAmino(object: MsgRegisterInterchainQueryAmino): MsgRegisterInterchainQuery {
    const message = createBaseMsgRegisterInterchainQuery();
    if (object.query_type !== undefined && object.query_type !== null) {
      message.queryType = object.query_type;
    }
    message.keys = object.keys?.map(e => KVKey.fromAmino(e)) || [];
    if (object.transactions_filter !== undefined && object.transactions_filter !== null) {
      message.transactionsFilter = object.transactions_filter;
    }
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.update_period !== undefined && object.update_period !== null) {
      message.updatePeriod = BigInt(object.update_period);
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    return message;
  },
  toAmino(message: MsgRegisterInterchainQuery, useInterfaces: boolean = false): MsgRegisterInterchainQueryAmino {
    const obj: any = {};
    obj.query_type = message.queryType === "" ? undefined : message.queryType;
    if (message.keys) {
      obj.keys = message.keys.map(e => e ? KVKey.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.keys = message.keys;
    }
    obj.transactions_filter = message.transactionsFilter === "" ? undefined : message.transactionsFilter;
    obj.connection_id = message.connectionId === "" ? undefined : message.connectionId;
    obj.update_period = message.updatePeriod !== BigInt(0) ? message.updatePeriod.toString() : undefined;
    obj.sender = message.sender === "" ? undefined : message.sender;
    return obj;
  },
  fromAminoMsg(object: MsgRegisterInterchainQueryAminoMsg): MsgRegisterInterchainQuery {
    return MsgRegisterInterchainQuery.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterInterchainQueryProtoMsg, useInterfaces: boolean = false): MsgRegisterInterchainQuery {
    return MsgRegisterInterchainQuery.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterInterchainQuery): Uint8Array {
    return MsgRegisterInterchainQuery.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterInterchainQuery): MsgRegisterInterchainQueryProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.MsgRegisterInterchainQuery",
      value: MsgRegisterInterchainQuery.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterInterchainQueryResponse(): MsgRegisterInterchainQueryResponse {
  return {
    id: BigInt(0)
  };
}
export const MsgRegisterInterchainQueryResponse = {
  typeUrl: "/neutron.interchainqueries.MsgRegisterInterchainQueryResponse",
  encode(message: MsgRegisterInterchainQueryResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterInterchainQueryResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterInterchainQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRegisterInterchainQueryResponse>): MsgRegisterInterchainQueryResponse {
    const message = createBaseMsgRegisterInterchainQueryResponse();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgRegisterInterchainQueryResponseAmino): MsgRegisterInterchainQueryResponse {
    const message = createBaseMsgRegisterInterchainQueryResponse();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: MsgRegisterInterchainQueryResponse, useInterfaces: boolean = false): MsgRegisterInterchainQueryResponseAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRegisterInterchainQueryResponseAminoMsg): MsgRegisterInterchainQueryResponse {
    return MsgRegisterInterchainQueryResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterInterchainQueryResponseProtoMsg, useInterfaces: boolean = false): MsgRegisterInterchainQueryResponse {
    return MsgRegisterInterchainQueryResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterInterchainQueryResponse): Uint8Array {
    return MsgRegisterInterchainQueryResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterInterchainQueryResponse): MsgRegisterInterchainQueryResponseProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.MsgRegisterInterchainQueryResponse",
      value: MsgRegisterInterchainQueryResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitQueryResult(): MsgSubmitQueryResult {
  return {
    queryId: BigInt(0),
    sender: "",
    clientId: "",
    result: undefined
  };
}
export const MsgSubmitQueryResult = {
  typeUrl: "/neutron.interchainqueries.MsgSubmitQueryResult",
  encode(message: MsgSubmitQueryResult, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.queryId !== BigInt(0)) {
      writer.uint32(8).uint64(message.queryId);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.clientId !== "") {
      writer.uint32(26).string(message.clientId);
    }
    if (message.result !== undefined) {
      QueryResult.encode(message.result, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSubmitQueryResult {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitQueryResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.queryId = reader.uint64();
          break;
        case 2:
          message.sender = reader.string();
          break;
        case 3:
          message.clientId = reader.string();
          break;
        case 4:
          message.result = QueryResult.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitQueryResult>): MsgSubmitQueryResult {
    const message = createBaseMsgSubmitQueryResult();
    message.queryId = object.queryId !== undefined && object.queryId !== null ? BigInt(object.queryId.toString()) : BigInt(0);
    message.sender = object.sender ?? "";
    message.clientId = object.clientId ?? "";
    message.result = object.result !== undefined && object.result !== null ? QueryResult.fromPartial(object.result) : undefined;
    return message;
  },
  fromAmino(object: MsgSubmitQueryResultAmino): MsgSubmitQueryResult {
    const message = createBaseMsgSubmitQueryResult();
    if (object.query_id !== undefined && object.query_id !== null) {
      message.queryId = BigInt(object.query_id);
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.client_id !== undefined && object.client_id !== null) {
      message.clientId = object.client_id;
    }
    if (object.result !== undefined && object.result !== null) {
      message.result = QueryResult.fromAmino(object.result);
    }
    return message;
  },
  toAmino(message: MsgSubmitQueryResult, useInterfaces: boolean = false): MsgSubmitQueryResultAmino {
    const obj: any = {};
    obj.query_id = message.queryId !== BigInt(0) ? message.queryId.toString() : undefined;
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.client_id = message.clientId === "" ? undefined : message.clientId;
    obj.result = message.result ? QueryResult.toAmino(message.result, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitQueryResultAminoMsg): MsgSubmitQueryResult {
    return MsgSubmitQueryResult.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitQueryResultProtoMsg, useInterfaces: boolean = false): MsgSubmitQueryResult {
    return MsgSubmitQueryResult.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSubmitQueryResult): Uint8Array {
    return MsgSubmitQueryResult.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitQueryResult): MsgSubmitQueryResultProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.MsgSubmitQueryResult",
      value: MsgSubmitQueryResult.encode(message).finish()
    };
  }
};
function createBaseQueryResult(): QueryResult {
  return {
    kvResults: [],
    block: undefined,
    height: BigInt(0),
    revision: BigInt(0),
    allowKvCallbacks: false
  };
}
export const QueryResult = {
  typeUrl: "/neutron.interchainqueries.QueryResult",
  encode(message: QueryResult, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.kvResults) {
      StorageValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.block !== undefined) {
      Block.encode(message.block, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(24).uint64(message.height);
    }
    if (message.revision !== BigInt(0)) {
      writer.uint32(32).uint64(message.revision);
    }
    if (message.allowKvCallbacks === true) {
      writer.uint32(40).bool(message.allowKvCallbacks);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryResult {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kvResults.push(StorageValue.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.block = Block.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.height = reader.uint64();
          break;
        case 4:
          message.revision = reader.uint64();
          break;
        case 5:
          message.allowKvCallbacks = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryResult>): QueryResult {
    const message = createBaseQueryResult();
    message.kvResults = object.kvResults?.map(e => StorageValue.fromPartial(e)) || [];
    message.block = object.block !== undefined && object.block !== null ? Block.fromPartial(object.block) : undefined;
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    message.revision = object.revision !== undefined && object.revision !== null ? BigInt(object.revision.toString()) : BigInt(0);
    message.allowKvCallbacks = object.allowKvCallbacks ?? false;
    return message;
  },
  fromAmino(object: QueryResultAmino): QueryResult {
    const message = createBaseQueryResult();
    message.kvResults = object.kv_results?.map(e => StorageValue.fromAmino(e)) || [];
    if (object.block !== undefined && object.block !== null) {
      message.block = Block.fromAmino(object.block);
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    if (object.revision !== undefined && object.revision !== null) {
      message.revision = BigInt(object.revision);
    }
    if (object.allow_kv_callbacks !== undefined && object.allow_kv_callbacks !== null) {
      message.allowKvCallbacks = object.allow_kv_callbacks;
    }
    return message;
  },
  toAmino(message: QueryResult, useInterfaces: boolean = false): QueryResultAmino {
    const obj: any = {};
    if (message.kvResults) {
      obj.kv_results = message.kvResults.map(e => e ? StorageValue.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.kv_results = message.kvResults;
    }
    obj.block = message.block ? Block.toAmino(message.block, useInterfaces) : undefined;
    obj.height = message.height !== BigInt(0) ? message.height.toString() : undefined;
    obj.revision = message.revision !== BigInt(0) ? message.revision.toString() : undefined;
    obj.allow_kv_callbacks = message.allowKvCallbacks === false ? undefined : message.allowKvCallbacks;
    return obj;
  },
  fromAminoMsg(object: QueryResultAminoMsg): QueryResult {
    return QueryResult.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryResultProtoMsg, useInterfaces: boolean = false): QueryResult {
    return QueryResult.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryResult): Uint8Array {
    return QueryResult.encode(message).finish();
  },
  toProtoMsg(message: QueryResult): QueryResultProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.QueryResult",
      value: QueryResult.encode(message).finish()
    };
  }
};
function createBaseStorageValue(): StorageValue {
  return {
    storagePrefix: "",
    key: new Uint8Array(),
    value: new Uint8Array(),
    proof: undefined
  };
}
export const StorageValue = {
  typeUrl: "/neutron.interchainqueries.StorageValue",
  encode(message: StorageValue, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.storagePrefix !== "") {
      writer.uint32(10).string(message.storagePrefix);
    }
    if (message.key.length !== 0) {
      writer.uint32(18).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(26).bytes(message.value);
    }
    if (message.proof !== undefined) {
      ProofOps.encode(message.proof, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): StorageValue {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.storagePrefix = reader.string();
          break;
        case 2:
          message.key = reader.bytes();
          break;
        case 3:
          message.value = reader.bytes();
          break;
        case 4:
          message.proof = ProofOps.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<StorageValue>): StorageValue {
    const message = createBaseStorageValue();
    message.storagePrefix = object.storagePrefix ?? "";
    message.key = object.key ?? new Uint8Array();
    message.value = object.value ?? new Uint8Array();
    message.proof = object.proof !== undefined && object.proof !== null ? ProofOps.fromPartial(object.proof) : undefined;
    return message;
  },
  fromAmino(object: StorageValueAmino): StorageValue {
    const message = createBaseStorageValue();
    if (object.storage_prefix !== undefined && object.storage_prefix !== null) {
      message.storagePrefix = object.storage_prefix;
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = bytesFromBase64(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    if (object.Proof !== undefined && object.Proof !== null) {
      message.proof = ProofOps.fromAmino(object.Proof);
    }
    return message;
  },
  toAmino(message: StorageValue, useInterfaces: boolean = false): StorageValueAmino {
    const obj: any = {};
    obj.storage_prefix = message.storagePrefix === "" ? undefined : message.storagePrefix;
    obj.key = message.key ? base64FromBytes(message.key) : undefined;
    obj.value = message.value ? base64FromBytes(message.value) : undefined;
    obj.Proof = message.proof ? ProofOps.toAmino(message.proof, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: StorageValueAminoMsg): StorageValue {
    return StorageValue.fromAmino(object.value);
  },
  fromProtoMsg(message: StorageValueProtoMsg, useInterfaces: boolean = false): StorageValue {
    return StorageValue.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: StorageValue): Uint8Array {
    return StorageValue.encode(message).finish();
  },
  toProtoMsg(message: StorageValue): StorageValueProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.StorageValue",
      value: StorageValue.encode(message).finish()
    };
  }
};
function createBaseBlock(): Block {
  return {
    nextBlockHeader: undefined,
    header: undefined,
    tx: undefined
  };
}
export const Block = {
  typeUrl: "/neutron.interchainqueries.Block",
  encode(message: Block, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nextBlockHeader !== undefined) {
      Any.encode(message.nextBlockHeader, writer.uint32(10).fork()).ldelim();
    }
    if (message.header !== undefined) {
      Any.encode(message.header, writer.uint32(18).fork()).ldelim();
    }
    if (message.tx !== undefined) {
      TxValue.encode(message.tx, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Block {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nextBlockHeader = Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.header = Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.tx = TxValue.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Block>): Block {
    const message = createBaseBlock();
    message.nextBlockHeader = object.nextBlockHeader !== undefined && object.nextBlockHeader !== null ? Any.fromPartial(object.nextBlockHeader) : undefined;
    message.header = object.header !== undefined && object.header !== null ? Any.fromPartial(object.header) : undefined;
    message.tx = object.tx !== undefined && object.tx !== null ? TxValue.fromPartial(object.tx) : undefined;
    return message;
  },
  fromAmino(object: BlockAmino): Block {
    const message = createBaseBlock();
    if (object.next_block_header !== undefined && object.next_block_header !== null) {
      message.nextBlockHeader = Any.fromAmino(object.next_block_header);
    }
    if (object.header !== undefined && object.header !== null) {
      message.header = Any.fromAmino(object.header);
    }
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = TxValue.fromAmino(object.tx);
    }
    return message;
  },
  toAmino(message: Block, useInterfaces: boolean = false): BlockAmino {
    const obj: any = {};
    obj.next_block_header = message.nextBlockHeader ? Any.toAmino(message.nextBlockHeader, useInterfaces) : undefined;
    obj.header = message.header ? Any.toAmino(message.header, useInterfaces) : undefined;
    obj.tx = message.tx ? TxValue.toAmino(message.tx, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: BlockAminoMsg): Block {
    return Block.fromAmino(object.value);
  },
  fromProtoMsg(message: BlockProtoMsg, useInterfaces: boolean = false): Block {
    return Block.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Block): Uint8Array {
    return Block.encode(message).finish();
  },
  toProtoMsg(message: Block): BlockProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.Block",
      value: Block.encode(message).finish()
    };
  }
};
function createBaseTxValue(): TxValue {
  return {
    response: undefined,
    deliveryProof: undefined,
    inclusionProof: undefined,
    data: new Uint8Array()
  };
}
export const TxValue = {
  typeUrl: "/neutron.interchainqueries.TxValue",
  encode(message: TxValue, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.response !== undefined) {
      ExecTxResult.encode(message.response, writer.uint32(10).fork()).ldelim();
    }
    if (message.deliveryProof !== undefined) {
      Proof.encode(message.deliveryProof, writer.uint32(18).fork()).ldelim();
    }
    if (message.inclusionProof !== undefined) {
      Proof.encode(message.inclusionProof, writer.uint32(26).fork()).ldelim();
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TxValue {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.response = ExecTxResult.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.deliveryProof = Proof.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.inclusionProof = Proof.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TxValue>): TxValue {
    const message = createBaseTxValue();
    message.response = object.response !== undefined && object.response !== null ? ExecTxResult.fromPartial(object.response) : undefined;
    message.deliveryProof = object.deliveryProof !== undefined && object.deliveryProof !== null ? Proof.fromPartial(object.deliveryProof) : undefined;
    message.inclusionProof = object.inclusionProof !== undefined && object.inclusionProof !== null ? Proof.fromPartial(object.inclusionProof) : undefined;
    message.data = object.data ?? new Uint8Array();
    return message;
  },
  fromAmino(object: TxValueAmino): TxValue {
    const message = createBaseTxValue();
    if (object.response !== undefined && object.response !== null) {
      message.response = ExecTxResult.fromAmino(object.response);
    }
    if (object.delivery_proof !== undefined && object.delivery_proof !== null) {
      message.deliveryProof = Proof.fromAmino(object.delivery_proof);
    }
    if (object.inclusion_proof !== undefined && object.inclusion_proof !== null) {
      message.inclusionProof = Proof.fromAmino(object.inclusion_proof);
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  toAmino(message: TxValue, useInterfaces: boolean = false): TxValueAmino {
    const obj: any = {};
    obj.response = message.response ? ExecTxResult.toAmino(message.response, useInterfaces) : undefined;
    obj.delivery_proof = message.deliveryProof ? Proof.toAmino(message.deliveryProof, useInterfaces) : undefined;
    obj.inclusion_proof = message.inclusionProof ? Proof.toAmino(message.inclusionProof, useInterfaces) : undefined;
    obj.data = message.data ? base64FromBytes(message.data) : undefined;
    return obj;
  },
  fromAminoMsg(object: TxValueAminoMsg): TxValue {
    return TxValue.fromAmino(object.value);
  },
  fromProtoMsg(message: TxValueProtoMsg, useInterfaces: boolean = false): TxValue {
    return TxValue.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TxValue): Uint8Array {
    return TxValue.encode(message).finish();
  },
  toProtoMsg(message: TxValue): TxValueProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.TxValue",
      value: TxValue.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitQueryResultResponse(): MsgSubmitQueryResultResponse {
  return {};
}
export const MsgSubmitQueryResultResponse = {
  typeUrl: "/neutron.interchainqueries.MsgSubmitQueryResultResponse",
  encode(_: MsgSubmitQueryResultResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSubmitQueryResultResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitQueryResultResponse();
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
  fromPartial(_: Partial<MsgSubmitQueryResultResponse>): MsgSubmitQueryResultResponse {
    const message = createBaseMsgSubmitQueryResultResponse();
    return message;
  },
  fromAmino(_: MsgSubmitQueryResultResponseAmino): MsgSubmitQueryResultResponse {
    const message = createBaseMsgSubmitQueryResultResponse();
    return message;
  },
  toAmino(_: MsgSubmitQueryResultResponse, useInterfaces: boolean = false): MsgSubmitQueryResultResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitQueryResultResponseAminoMsg): MsgSubmitQueryResultResponse {
    return MsgSubmitQueryResultResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitQueryResultResponseProtoMsg, useInterfaces: boolean = false): MsgSubmitQueryResultResponse {
    return MsgSubmitQueryResultResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSubmitQueryResultResponse): Uint8Array {
    return MsgSubmitQueryResultResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitQueryResultResponse): MsgSubmitQueryResultResponseProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.MsgSubmitQueryResultResponse",
      value: MsgSubmitQueryResultResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveInterchainQueryRequest(): MsgRemoveInterchainQueryRequest {
  return {
    queryId: BigInt(0),
    sender: ""
  };
}
export const MsgRemoveInterchainQueryRequest = {
  typeUrl: "/neutron.interchainqueries.MsgRemoveInterchainQueryRequest",
  encode(message: MsgRemoveInterchainQueryRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.queryId !== BigInt(0)) {
      writer.uint32(8).uint64(message.queryId);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveInterchainQueryRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveInterchainQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.queryId = reader.uint64();
          break;
        case 2:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRemoveInterchainQueryRequest>): MsgRemoveInterchainQueryRequest {
    const message = createBaseMsgRemoveInterchainQueryRequest();
    message.queryId = object.queryId !== undefined && object.queryId !== null ? BigInt(object.queryId.toString()) : BigInt(0);
    message.sender = object.sender ?? "";
    return message;
  },
  fromAmino(object: MsgRemoveInterchainQueryRequestAmino): MsgRemoveInterchainQueryRequest {
    const message = createBaseMsgRemoveInterchainQueryRequest();
    if (object.query_id !== undefined && object.query_id !== null) {
      message.queryId = BigInt(object.query_id);
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    return message;
  },
  toAmino(message: MsgRemoveInterchainQueryRequest, useInterfaces: boolean = false): MsgRemoveInterchainQueryRequestAmino {
    const obj: any = {};
    obj.query_id = message.queryId !== BigInt(0) ? message.queryId.toString() : undefined;
    obj.sender = message.sender === "" ? undefined : message.sender;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveInterchainQueryRequestAminoMsg): MsgRemoveInterchainQueryRequest {
    return MsgRemoveInterchainQueryRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveInterchainQueryRequestProtoMsg, useInterfaces: boolean = false): MsgRemoveInterchainQueryRequest {
    return MsgRemoveInterchainQueryRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveInterchainQueryRequest): Uint8Array {
    return MsgRemoveInterchainQueryRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveInterchainQueryRequest): MsgRemoveInterchainQueryRequestProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.MsgRemoveInterchainQueryRequest",
      value: MsgRemoveInterchainQueryRequest.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveInterchainQueryResponse(): MsgRemoveInterchainQueryResponse {
  return {};
}
export const MsgRemoveInterchainQueryResponse = {
  typeUrl: "/neutron.interchainqueries.MsgRemoveInterchainQueryResponse",
  encode(_: MsgRemoveInterchainQueryResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveInterchainQueryResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveInterchainQueryResponse();
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
  fromPartial(_: Partial<MsgRemoveInterchainQueryResponse>): MsgRemoveInterchainQueryResponse {
    const message = createBaseMsgRemoveInterchainQueryResponse();
    return message;
  },
  fromAmino(_: MsgRemoveInterchainQueryResponseAmino): MsgRemoveInterchainQueryResponse {
    const message = createBaseMsgRemoveInterchainQueryResponse();
    return message;
  },
  toAmino(_: MsgRemoveInterchainQueryResponse, useInterfaces: boolean = false): MsgRemoveInterchainQueryResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRemoveInterchainQueryResponseAminoMsg): MsgRemoveInterchainQueryResponse {
    return MsgRemoveInterchainQueryResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveInterchainQueryResponseProtoMsg, useInterfaces: boolean = false): MsgRemoveInterchainQueryResponse {
    return MsgRemoveInterchainQueryResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveInterchainQueryResponse): Uint8Array {
    return MsgRemoveInterchainQueryResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveInterchainQueryResponse): MsgRemoveInterchainQueryResponseProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.MsgRemoveInterchainQueryResponse",
      value: MsgRemoveInterchainQueryResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateInterchainQueryRequest(): MsgUpdateInterchainQueryRequest {
  return {
    queryId: BigInt(0),
    newKeys: [],
    newUpdatePeriod: BigInt(0),
    newTransactionsFilter: "",
    sender: ""
  };
}
export const MsgUpdateInterchainQueryRequest = {
  typeUrl: "/neutron.interchainqueries.MsgUpdateInterchainQueryRequest",
  encode(message: MsgUpdateInterchainQueryRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.queryId !== BigInt(0)) {
      writer.uint32(8).uint64(message.queryId);
    }
    for (const v of message.newKeys) {
      KVKey.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.newUpdatePeriod !== BigInt(0)) {
      writer.uint32(24).uint64(message.newUpdatePeriod);
    }
    if (message.newTransactionsFilter !== "") {
      writer.uint32(34).string(message.newTransactionsFilter);
    }
    if (message.sender !== "") {
      writer.uint32(42).string(message.sender);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateInterchainQueryRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateInterchainQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.queryId = reader.uint64();
          break;
        case 2:
          message.newKeys.push(KVKey.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.newUpdatePeriod = reader.uint64();
          break;
        case 4:
          message.newTransactionsFilter = reader.string();
          break;
        case 5:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateInterchainQueryRequest>): MsgUpdateInterchainQueryRequest {
    const message = createBaseMsgUpdateInterchainQueryRequest();
    message.queryId = object.queryId !== undefined && object.queryId !== null ? BigInt(object.queryId.toString()) : BigInt(0);
    message.newKeys = object.newKeys?.map(e => KVKey.fromPartial(e)) || [];
    message.newUpdatePeriod = object.newUpdatePeriod !== undefined && object.newUpdatePeriod !== null ? BigInt(object.newUpdatePeriod.toString()) : BigInt(0);
    message.newTransactionsFilter = object.newTransactionsFilter ?? "";
    message.sender = object.sender ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateInterchainQueryRequestAmino): MsgUpdateInterchainQueryRequest {
    const message = createBaseMsgUpdateInterchainQueryRequest();
    if (object.query_id !== undefined && object.query_id !== null) {
      message.queryId = BigInt(object.query_id);
    }
    message.newKeys = object.new_keys?.map(e => KVKey.fromAmino(e)) || [];
    if (object.new_update_period !== undefined && object.new_update_period !== null) {
      message.newUpdatePeriod = BigInt(object.new_update_period);
    }
    if (object.new_transactions_filter !== undefined && object.new_transactions_filter !== null) {
      message.newTransactionsFilter = object.new_transactions_filter;
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    return message;
  },
  toAmino(message: MsgUpdateInterchainQueryRequest, useInterfaces: boolean = false): MsgUpdateInterchainQueryRequestAmino {
    const obj: any = {};
    obj.query_id = message.queryId !== BigInt(0) ? message.queryId.toString() : undefined;
    if (message.newKeys) {
      obj.new_keys = message.newKeys.map(e => e ? KVKey.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.new_keys = message.newKeys;
    }
    obj.new_update_period = message.newUpdatePeriod !== BigInt(0) ? message.newUpdatePeriod.toString() : undefined;
    obj.new_transactions_filter = message.newTransactionsFilter === "" ? undefined : message.newTransactionsFilter;
    obj.sender = message.sender === "" ? undefined : message.sender;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateInterchainQueryRequestAminoMsg): MsgUpdateInterchainQueryRequest {
    return MsgUpdateInterchainQueryRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateInterchainQueryRequestProtoMsg, useInterfaces: boolean = false): MsgUpdateInterchainQueryRequest {
    return MsgUpdateInterchainQueryRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateInterchainQueryRequest): Uint8Array {
    return MsgUpdateInterchainQueryRequest.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateInterchainQueryRequest): MsgUpdateInterchainQueryRequestProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.MsgUpdateInterchainQueryRequest",
      value: MsgUpdateInterchainQueryRequest.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateInterchainQueryResponse(): MsgUpdateInterchainQueryResponse {
  return {};
}
export const MsgUpdateInterchainQueryResponse = {
  typeUrl: "/neutron.interchainqueries.MsgUpdateInterchainQueryResponse",
  encode(_: MsgUpdateInterchainQueryResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateInterchainQueryResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateInterchainQueryResponse();
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
  fromPartial(_: Partial<MsgUpdateInterchainQueryResponse>): MsgUpdateInterchainQueryResponse {
    const message = createBaseMsgUpdateInterchainQueryResponse();
    return message;
  },
  fromAmino(_: MsgUpdateInterchainQueryResponseAmino): MsgUpdateInterchainQueryResponse {
    const message = createBaseMsgUpdateInterchainQueryResponse();
    return message;
  },
  toAmino(_: MsgUpdateInterchainQueryResponse, useInterfaces: boolean = false): MsgUpdateInterchainQueryResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateInterchainQueryResponseAminoMsg): MsgUpdateInterchainQueryResponse {
    return MsgUpdateInterchainQueryResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateInterchainQueryResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateInterchainQueryResponse {
    return MsgUpdateInterchainQueryResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateInterchainQueryResponse): Uint8Array {
    return MsgUpdateInterchainQueryResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateInterchainQueryResponse): MsgUpdateInterchainQueryResponseProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.MsgUpdateInterchainQueryResponse",
      value: MsgUpdateInterchainQueryResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/neutron.interchainqueries.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAminoMsg {
    return {
      type: "interchainqueries/MsgUpdateParams",
      value: MsgUpdateParams.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg, useInterfaces: boolean = false): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/neutron.interchainqueries.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse, useInterfaces: boolean = false): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};