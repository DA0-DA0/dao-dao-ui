//@ts-nocheck
import { Height, HeightAmino, HeightSDKType, Params, ParamsAmino, ParamsSDKType } from "../../ibc/core/client/v1/client";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
import { bytesFromBase64, base64FromBytes } from "../../helpers";
export interface RegisteredQuery {
  /** The unique id of the registered query. */
  id: bigint;
  /** The address that registered the query. */
  owner: string;
  /** The query type identifier: `kv` or `tx` now */
  queryType: string;
  /** The KV-storage keys for which we want to get values from remote chain */
  keys: KVKey[];
  /** The filter for transaction search ICQ */
  transactionsFilter: string;
  /** The IBC connection ID for getting ConsensusState to verify proofs */
  connectionId: string;
  /** Parameter that defines how often the query must be updated. */
  updatePeriod: bigint;
  /** The local chain last block height when the query result was updated. */
  lastSubmittedResultLocalHeight: bigint;
  /** The remote chain last block height when the query result was updated. */
  lastSubmittedResultRemoteHeight?: Height | undefined;
  /** Amount of coins deposited for the query. */
  deposit: Coin[];
  /** Timeout before query becomes available for everybody to remove. */
  submitTimeout: bigint;
  /** The local chain height when the query was registered. */
  registeredAtHeight: bigint;
}
export interface RegisteredQueryProtoMsg {
  typeUrl: "/neutron.interchainqueries.RegisteredQuery";
  value: Uint8Array;
}
export interface RegisteredQueryAmino {
  /** The unique id of the registered query. */
  id?: string;
  /** The address that registered the query. */
  owner?: string;
  /** The query type identifier: `kv` or `tx` now */
  query_type?: string;
  /** The KV-storage keys for which we want to get values from remote chain */
  keys?: KVKeyAmino[];
  /** The filter for transaction search ICQ */
  transactions_filter?: string;
  /** The IBC connection ID for getting ConsensusState to verify proofs */
  connection_id?: string;
  /** Parameter that defines how often the query must be updated. */
  update_period?: string;
  /** The local chain last block height when the query result was updated. */
  last_submitted_result_local_height?: string;
  /** The remote chain last block height when the query result was updated. */
  last_submitted_result_remote_height?: HeightAmino | undefined;
  /** Amount of coins deposited for the query. */
  deposit?: CoinAmino[];
  /** Timeout before query becomes available for everybody to remove. */
  submit_timeout?: string;
  /** The local chain height when the query was registered. */
  registered_at_height?: string;
}
export interface RegisteredQueryAminoMsg {
  type: "/neutron.interchainqueries.RegisteredQuery";
  value: RegisteredQueryAmino;
}
export interface RegisteredQuerySDKType {
  id: bigint;
  owner: string;
  query_type: string;
  keys: KVKeySDKType[];
  transactions_filter: string;
  connection_id: string;
  update_period: bigint;
  last_submitted_result_local_height: bigint;
  last_submitted_result_remote_height?: HeightSDKType | undefined;
  deposit: CoinSDKType[];
  submit_timeout: bigint;
  registered_at_height: bigint;
}
export interface KVKey {
  /**
   * Path (storage prefix) to the storage where you want to read value by key
   * (usually name of cosmos-sdk module: 'staking', 'bank', etc.)
   */
  path: string;
  /** Key you want to read from the storage */
  key: Uint8Array;
}
export interface KVKeyProtoMsg {
  typeUrl: "/neutron.interchainqueries.KVKey";
  value: Uint8Array;
}
export interface KVKeyAmino {
  /**
   * Path (storage prefix) to the storage where you want to read value by key
   * (usually name of cosmos-sdk module: 'staking', 'bank', etc.)
   */
  path?: string;
  /** Key you want to read from the storage */
  key?: string;
}
export interface KVKeyAminoMsg {
  type: "/neutron.interchainqueries.KVKey";
  value: KVKeyAmino;
}
export interface KVKeySDKType {
  path: string;
  key: Uint8Array;
}
/** GenesisState defines the interchainqueries module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  registeredQueries: RegisteredQuery[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/neutron.interchainqueries.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the interchainqueries module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  registered_queries?: RegisteredQueryAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/neutron.interchainqueries.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the interchainqueries module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  registered_queries: RegisteredQuerySDKType[];
}
function createBaseRegisteredQuery(): RegisteredQuery {
  return {
    id: BigInt(0),
    owner: "",
    queryType: "",
    keys: [],
    transactionsFilter: "",
    connectionId: "",
    updatePeriod: BigInt(0),
    lastSubmittedResultLocalHeight: BigInt(0),
    lastSubmittedResultRemoteHeight: undefined,
    deposit: [],
    submitTimeout: BigInt(0),
    registeredAtHeight: BigInt(0)
  };
}
export const RegisteredQuery = {
  typeUrl: "/neutron.interchainqueries.RegisteredQuery",
  encode(message: RegisteredQuery, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.queryType !== "") {
      writer.uint32(26).string(message.queryType);
    }
    for (const v of message.keys) {
      KVKey.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.transactionsFilter !== "") {
      writer.uint32(42).string(message.transactionsFilter);
    }
    if (message.connectionId !== "") {
      writer.uint32(50).string(message.connectionId);
    }
    if (message.updatePeriod !== BigInt(0)) {
      writer.uint32(56).uint64(message.updatePeriod);
    }
    if (message.lastSubmittedResultLocalHeight !== BigInt(0)) {
      writer.uint32(64).uint64(message.lastSubmittedResultLocalHeight);
    }
    if (message.lastSubmittedResultRemoteHeight !== undefined) {
      Height.encode(message.lastSubmittedResultRemoteHeight, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.deposit) {
      Coin.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.submitTimeout !== BigInt(0)) {
      writer.uint32(88).uint64(message.submitTimeout);
    }
    if (message.registeredAtHeight !== BigInt(0)) {
      writer.uint32(96).uint64(message.registeredAtHeight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RegisteredQuery {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisteredQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.queryType = reader.string();
          break;
        case 4:
          message.keys.push(KVKey.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.transactionsFilter = reader.string();
          break;
        case 6:
          message.connectionId = reader.string();
          break;
        case 7:
          message.updatePeriod = reader.uint64();
          break;
        case 8:
          message.lastSubmittedResultLocalHeight = reader.uint64();
          break;
        case 9:
          message.lastSubmittedResultRemoteHeight = Height.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 10:
          message.deposit.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 11:
          message.submitTimeout = reader.uint64();
          break;
        case 12:
          message.registeredAtHeight = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RegisteredQuery>): RegisteredQuery {
    const message = createBaseRegisteredQuery();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.owner = object.owner ?? "";
    message.queryType = object.queryType ?? "";
    message.keys = object.keys?.map(e => KVKey.fromPartial(e)) || [];
    message.transactionsFilter = object.transactionsFilter ?? "";
    message.connectionId = object.connectionId ?? "";
    message.updatePeriod = object.updatePeriod !== undefined && object.updatePeriod !== null ? BigInt(object.updatePeriod.toString()) : BigInt(0);
    message.lastSubmittedResultLocalHeight = object.lastSubmittedResultLocalHeight !== undefined && object.lastSubmittedResultLocalHeight !== null ? BigInt(object.lastSubmittedResultLocalHeight.toString()) : BigInt(0);
    message.lastSubmittedResultRemoteHeight = object.lastSubmittedResultRemoteHeight !== undefined && object.lastSubmittedResultRemoteHeight !== null ? Height.fromPartial(object.lastSubmittedResultRemoteHeight) : undefined;
    message.deposit = object.deposit?.map(e => Coin.fromPartial(e)) || [];
    message.submitTimeout = object.submitTimeout !== undefined && object.submitTimeout !== null ? BigInt(object.submitTimeout.toString()) : BigInt(0);
    message.registeredAtHeight = object.registeredAtHeight !== undefined && object.registeredAtHeight !== null ? BigInt(object.registeredAtHeight.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: RegisteredQueryAmino): RegisteredQuery {
    const message = createBaseRegisteredQuery();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
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
    if (object.last_submitted_result_local_height !== undefined && object.last_submitted_result_local_height !== null) {
      message.lastSubmittedResultLocalHeight = BigInt(object.last_submitted_result_local_height);
    }
    if (object.last_submitted_result_remote_height !== undefined && object.last_submitted_result_remote_height !== null) {
      message.lastSubmittedResultRemoteHeight = Height.fromAmino(object.last_submitted_result_remote_height);
    }
    message.deposit = object.deposit?.map(e => Coin.fromAmino(e)) || [];
    if (object.submit_timeout !== undefined && object.submit_timeout !== null) {
      message.submitTimeout = BigInt(object.submit_timeout);
    }
    if (object.registered_at_height !== undefined && object.registered_at_height !== null) {
      message.registeredAtHeight = BigInt(object.registered_at_height);
    }
    return message;
  },
  toAmino(message: RegisteredQuery, useInterfaces: boolean = false): RegisteredQueryAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.query_type = message.queryType === "" ? undefined : message.queryType;
    if (message.keys) {
      obj.keys = message.keys.map(e => e ? KVKey.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.keys = message.keys;
    }
    obj.transactions_filter = message.transactionsFilter === "" ? undefined : message.transactionsFilter;
    obj.connection_id = message.connectionId === "" ? undefined : message.connectionId;
    obj.update_period = message.updatePeriod !== BigInt(0) ? message.updatePeriod.toString() : undefined;
    obj.last_submitted_result_local_height = message.lastSubmittedResultLocalHeight !== BigInt(0) ? message.lastSubmittedResultLocalHeight.toString() : undefined;
    obj.last_submitted_result_remote_height = message.lastSubmittedResultRemoteHeight ? Height.toAmino(message.lastSubmittedResultRemoteHeight, useInterfaces) : {};
    if (message.deposit) {
      obj.deposit = message.deposit.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.deposit = message.deposit;
    }
    obj.submit_timeout = message.submitTimeout !== BigInt(0) ? message.submitTimeout.toString() : undefined;
    obj.registered_at_height = message.registeredAtHeight !== BigInt(0) ? message.registeredAtHeight.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: RegisteredQueryAminoMsg): RegisteredQuery {
    return RegisteredQuery.fromAmino(object.value);
  },
  fromProtoMsg(message: RegisteredQueryProtoMsg, useInterfaces: boolean = false): RegisteredQuery {
    return RegisteredQuery.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RegisteredQuery): Uint8Array {
    return RegisteredQuery.encode(message).finish();
  },
  toProtoMsg(message: RegisteredQuery): RegisteredQueryProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.RegisteredQuery",
      value: RegisteredQuery.encode(message).finish()
    };
  }
};
function createBaseKVKey(): KVKey {
  return {
    path: "",
    key: new Uint8Array()
  };
}
export const KVKey = {
  typeUrl: "/neutron.interchainqueries.KVKey",
  encode(message: KVKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    if (message.key.length !== 0) {
      writer.uint32(18).bytes(message.key);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): KVKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKVKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.path = reader.string();
          break;
        case 2:
          message.key = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<KVKey>): KVKey {
    const message = createBaseKVKey();
    message.path = object.path ?? "";
    message.key = object.key ?? new Uint8Array();
    return message;
  },
  fromAmino(object: KVKeyAmino): KVKey {
    const message = createBaseKVKey();
    if (object.path !== undefined && object.path !== null) {
      message.path = object.path;
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = bytesFromBase64(object.key);
    }
    return message;
  },
  toAmino(message: KVKey, useInterfaces: boolean = false): KVKeyAmino {
    const obj: any = {};
    obj.path = message.path === "" ? undefined : message.path;
    obj.key = message.key ? base64FromBytes(message.key) : undefined;
    return obj;
  },
  fromAminoMsg(object: KVKeyAminoMsg): KVKey {
    return KVKey.fromAmino(object.value);
  },
  fromProtoMsg(message: KVKeyProtoMsg, useInterfaces: boolean = false): KVKey {
    return KVKey.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: KVKey): Uint8Array {
    return KVKey.encode(message).finish();
  },
  toProtoMsg(message: KVKey): KVKeyProtoMsg {
    return {
      typeUrl: "/neutron.interchainqueries.KVKey",
      value: KVKey.encode(message).finish()
    };
  }
};
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    registeredQueries: []
  };
}
export const GenesisState = {
  typeUrl: "/neutron.interchainqueries.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.registeredQueries) {
      RegisteredQuery.encode(v!, writer.uint32(18).fork()).ldelim();
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
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.registeredQueries.push(RegisteredQuery.decode(reader, reader.uint32(), useInterfaces));
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
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.registeredQueries = object.registeredQueries?.map(e => RegisteredQuery.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.registeredQueries = object.registered_queries?.map(e => RegisteredQuery.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.registeredQueries) {
      obj.registered_queries = message.registeredQueries.map(e => e ? RegisteredQuery.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.registered_queries = message.registeredQueries;
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
      typeUrl: "/neutron.interchainqueries.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};