import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes, toTimestamp, fromTimestamp } from "../../../helpers";
/** DataID stores a compact data ID and its full IRI. */
export interface DataID {
  /** id is the compact automatically-generated data ID. */
  id: Uint8Array;
  /** iri is the IRI of the data which contains its full ContentHash. */
  iri: string;
}
export interface DataIDProtoMsg {
  typeUrl: "/regen.data.v2.DataID";
  value: Uint8Array;
}
/** DataID stores a compact data ID and its full IRI. */
export interface DataIDAmino {
  /** id is the compact automatically-generated data ID. */
  id?: string;
  /** iri is the IRI of the data which contains its full ContentHash. */
  iri?: string;
}
export interface DataIDAminoMsg {
  type: "/regen.data.v2.DataID";
  value: DataIDAmino;
}
/** DataID stores a compact data ID and its full IRI. */
export interface DataIDSDKType {
  id: Uint8Array;
  iri: string;
}
/** DataAnchor stores the anchor timestamp for a data object. */
export interface DataAnchor {
  /** id is the compact data ID. */
  id: Uint8Array;
  /**
   * timestamp is the anchor timestamp for this object - the time at which
   * it was first known to the blockchain.
   */
  timestamp?: Date | undefined;
}
export interface DataAnchorProtoMsg {
  typeUrl: "/regen.data.v2.DataAnchor";
  value: Uint8Array;
}
/** DataAnchor stores the anchor timestamp for a data object. */
export interface DataAnchorAmino {
  /** id is the compact data ID. */
  id?: string;
  /**
   * timestamp is the anchor timestamp for this object - the time at which
   * it was first known to the blockchain.
   */
  timestamp?: string | undefined;
}
export interface DataAnchorAminoMsg {
  type: "/regen.data.v2.DataAnchor";
  value: DataAnchorAmino;
}
/** DataAnchor stores the anchor timestamp for a data object. */
export interface DataAnchorSDKType {
  id: Uint8Array;
  timestamp?: Date | undefined;
}
/** DataAttestor is a join table for associating data IDs and attestors. */
export interface DataAttestor {
  /** id is the compact data ID. */
  id: Uint8Array;
  /** attestor is the account address of the attestor. */
  attestor: Uint8Array;
  /** timestamp is the time at which the attestor signed this data object. */
  timestamp?: Date | undefined;
}
export interface DataAttestorProtoMsg {
  typeUrl: "/regen.data.v2.DataAttestor";
  value: Uint8Array;
}
/** DataAttestor is a join table for associating data IDs and attestors. */
export interface DataAttestorAmino {
  /** id is the compact data ID. */
  id?: string;
  /** attestor is the account address of the attestor. */
  attestor?: string;
  /** timestamp is the time at which the attestor signed this data object. */
  timestamp?: string | undefined;
}
export interface DataAttestorAminoMsg {
  type: "/regen.data.v2.DataAttestor";
  value: DataAttestorAmino;
}
/** DataAttestor is a join table for associating data IDs and attestors. */
export interface DataAttestorSDKType {
  id: Uint8Array;
  attestor: Uint8Array;
  timestamp?: Date | undefined;
}
/** Resolver describes a data resolver. */
export interface Resolver {
  /** id is the ID of the resolver. */
  id: bigint;
  /** url is the URL of the resolver. */
  url: string;
  /**
   * manager is the bytes address of the resolver manager who is allowed
   * to make calls to Msg/RegisterResolver for this resolver.
   */
  manager: Uint8Array;
}
export interface ResolverProtoMsg {
  typeUrl: "/regen.data.v2.Resolver";
  value: Uint8Array;
}
/** Resolver describes a data resolver. */
export interface ResolverAmino {
  /** id is the ID of the resolver. */
  id?: string;
  /** url is the URL of the resolver. */
  url?: string;
  /**
   * manager is the bytes address of the resolver manager who is allowed
   * to make calls to Msg/RegisterResolver for this resolver.
   */
  manager?: string;
}
export interface ResolverAminoMsg {
  type: "/regen.data.v2.Resolver";
  value: ResolverAmino;
}
/** Resolver describes a data resolver. */
export interface ResolverSDKType {
  id: bigint;
  url: string;
  manager: Uint8Array;
}
/**
 * DataResolver is a join table between data objects and resolvers and indicates
 * that a resolver claims to be able to resolve this data object.
 */
export interface DataResolver {
  /** id is the compact data ID. */
  id: Uint8Array;
  /** resolver_id is the ID of the resolver. */
  resolverId: bigint;
}
export interface DataResolverProtoMsg {
  typeUrl: "/regen.data.v2.DataResolver";
  value: Uint8Array;
}
/**
 * DataResolver is a join table between data objects and resolvers and indicates
 * that a resolver claims to be able to resolve this data object.
 */
export interface DataResolverAmino {
  /** id is the compact data ID. */
  id?: string;
  /** resolver_id is the ID of the resolver. */
  resolver_id?: string;
}
export interface DataResolverAminoMsg {
  type: "/regen.data.v2.DataResolver";
  value: DataResolverAmino;
}
/**
 * DataResolver is a join table between data objects and resolvers and indicates
 * that a resolver claims to be able to resolve this data object.
 */
export interface DataResolverSDKType {
  id: Uint8Array;
  resolver_id: bigint;
}
function createBaseDataID(): DataID {
  return {
    id: new Uint8Array(),
    iri: ""
  };
}
export const DataID = {
  typeUrl: "/regen.data.v2.DataID",
  encode(message: DataID, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id.length !== 0) {
      writer.uint32(10).bytes(message.id);
    }
    if (message.iri !== "") {
      writer.uint32(18).string(message.iri);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DataID {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.bytes();
          break;
        case 2:
          message.iri = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DataID>): DataID {
    const message = createBaseDataID();
    message.id = object.id ?? new Uint8Array();
    message.iri = object.iri ?? "";
    return message;
  },
  fromAmino(object: DataIDAmino): DataID {
    const message = createBaseDataID();
    if (object.id !== undefined && object.id !== null) {
      message.id = bytesFromBase64(object.id);
    }
    if (object.iri !== undefined && object.iri !== null) {
      message.iri = object.iri;
    }
    return message;
  },
  toAmino(message: DataID, useInterfaces: boolean = false): DataIDAmino {
    const obj: any = {};
    obj.id = message.id ? base64FromBytes(message.id) : undefined;
    obj.iri = message.iri;
    return obj;
  },
  fromAminoMsg(object: DataIDAminoMsg): DataID {
    return DataID.fromAmino(object.value);
  },
  fromProtoMsg(message: DataIDProtoMsg, useInterfaces: boolean = false): DataID {
    return DataID.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DataID): Uint8Array {
    return DataID.encode(message).finish();
  },
  toProtoMsg(message: DataID): DataIDProtoMsg {
    return {
      typeUrl: "/regen.data.v2.DataID",
      value: DataID.encode(message).finish()
    };
  }
};
function createBaseDataAnchor(): DataAnchor {
  return {
    id: new Uint8Array(),
    timestamp: undefined
  };
}
export const DataAnchor = {
  typeUrl: "/regen.data.v2.DataAnchor",
  encode(message: DataAnchor, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id.length !== 0) {
      writer.uint32(10).bytes(message.id);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DataAnchor {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.bytes();
          break;
        case 2:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DataAnchor>): DataAnchor {
    const message = createBaseDataAnchor();
    message.id = object.id ?? new Uint8Array();
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
  fromAmino(object: DataAnchorAmino): DataAnchor {
    const message = createBaseDataAnchor();
    if (object.id !== undefined && object.id !== null) {
      message.id = bytesFromBase64(object.id);
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromTimestamp(Timestamp.fromAmino(object.timestamp));
    }
    return message;
  },
  toAmino(message: DataAnchor, useInterfaces: boolean = false): DataAnchorAmino {
    const obj: any = {};
    obj.id = message.id ? base64FromBytes(message.id) : undefined;
    obj.timestamp = message.timestamp ? Timestamp.toAmino(toTimestamp(message.timestamp)) : undefined;
    return obj;
  },
  fromAminoMsg(object: DataAnchorAminoMsg): DataAnchor {
    return DataAnchor.fromAmino(object.value);
  },
  fromProtoMsg(message: DataAnchorProtoMsg, useInterfaces: boolean = false): DataAnchor {
    return DataAnchor.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DataAnchor): Uint8Array {
    return DataAnchor.encode(message).finish();
  },
  toProtoMsg(message: DataAnchor): DataAnchorProtoMsg {
    return {
      typeUrl: "/regen.data.v2.DataAnchor",
      value: DataAnchor.encode(message).finish()
    };
  }
};
function createBaseDataAttestor(): DataAttestor {
  return {
    id: new Uint8Array(),
    attestor: new Uint8Array(),
    timestamp: undefined
  };
}
export const DataAttestor = {
  typeUrl: "/regen.data.v2.DataAttestor",
  encode(message: DataAttestor, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id.length !== 0) {
      writer.uint32(10).bytes(message.id);
    }
    if (message.attestor.length !== 0) {
      writer.uint32(18).bytes(message.attestor);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DataAttestor {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataAttestor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.bytes();
          break;
        case 2:
          message.attestor = reader.bytes();
          break;
        case 3:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DataAttestor>): DataAttestor {
    const message = createBaseDataAttestor();
    message.id = object.id ?? new Uint8Array();
    message.attestor = object.attestor ?? new Uint8Array();
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
  fromAmino(object: DataAttestorAmino): DataAttestor {
    const message = createBaseDataAttestor();
    if (object.id !== undefined && object.id !== null) {
      message.id = bytesFromBase64(object.id);
    }
    if (object.attestor !== undefined && object.attestor !== null) {
      message.attestor = bytesFromBase64(object.attestor);
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromTimestamp(Timestamp.fromAmino(object.timestamp));
    }
    return message;
  },
  toAmino(message: DataAttestor, useInterfaces: boolean = false): DataAttestorAmino {
    const obj: any = {};
    obj.id = message.id ? base64FromBytes(message.id) : undefined;
    obj.attestor = message.attestor ? base64FromBytes(message.attestor) : undefined;
    obj.timestamp = message.timestamp ? Timestamp.toAmino(toTimestamp(message.timestamp)) : undefined;
    return obj;
  },
  fromAminoMsg(object: DataAttestorAminoMsg): DataAttestor {
    return DataAttestor.fromAmino(object.value);
  },
  fromProtoMsg(message: DataAttestorProtoMsg, useInterfaces: boolean = false): DataAttestor {
    return DataAttestor.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DataAttestor): Uint8Array {
    return DataAttestor.encode(message).finish();
  },
  toProtoMsg(message: DataAttestor): DataAttestorProtoMsg {
    return {
      typeUrl: "/regen.data.v2.DataAttestor",
      value: DataAttestor.encode(message).finish()
    };
  }
};
function createBaseResolver(): Resolver {
  return {
    id: BigInt(0),
    url: "",
    manager: new Uint8Array()
  };
}
export const Resolver = {
  typeUrl: "/regen.data.v2.Resolver",
  encode(message: Resolver, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.manager.length !== 0) {
      writer.uint32(26).bytes(message.manager);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Resolver {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResolver();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.url = reader.string();
          break;
        case 3:
          message.manager = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Resolver>): Resolver {
    const message = createBaseResolver();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.url = object.url ?? "";
    message.manager = object.manager ?? new Uint8Array();
    return message;
  },
  fromAmino(object: ResolverAmino): Resolver {
    const message = createBaseResolver();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = object.url;
    }
    if (object.manager !== undefined && object.manager !== null) {
      message.manager = bytesFromBase64(object.manager);
    }
    return message;
  },
  toAmino(message: Resolver, useInterfaces: boolean = false): ResolverAmino {
    const obj: any = {};
    obj.id = message.id ? message.id.toString() : undefined;
    obj.url = message.url;
    obj.manager = message.manager ? base64FromBytes(message.manager) : undefined;
    return obj;
  },
  fromAminoMsg(object: ResolverAminoMsg): Resolver {
    return Resolver.fromAmino(object.value);
  },
  fromProtoMsg(message: ResolverProtoMsg, useInterfaces: boolean = false): Resolver {
    return Resolver.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Resolver): Uint8Array {
    return Resolver.encode(message).finish();
  },
  toProtoMsg(message: Resolver): ResolverProtoMsg {
    return {
      typeUrl: "/regen.data.v2.Resolver",
      value: Resolver.encode(message).finish()
    };
  }
};
function createBaseDataResolver(): DataResolver {
  return {
    id: new Uint8Array(),
    resolverId: BigInt(0)
  };
}
export const DataResolver = {
  typeUrl: "/regen.data.v2.DataResolver",
  encode(message: DataResolver, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id.length !== 0) {
      writer.uint32(10).bytes(message.id);
    }
    if (message.resolverId !== BigInt(0)) {
      writer.uint32(16).uint64(message.resolverId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DataResolver {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataResolver();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.bytes();
          break;
        case 2:
          message.resolverId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DataResolver>): DataResolver {
    const message = createBaseDataResolver();
    message.id = object.id ?? new Uint8Array();
    message.resolverId = object.resolverId !== undefined && object.resolverId !== null ? BigInt(object.resolverId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: DataResolverAmino): DataResolver {
    const message = createBaseDataResolver();
    if (object.id !== undefined && object.id !== null) {
      message.id = bytesFromBase64(object.id);
    }
    if (object.resolver_id !== undefined && object.resolver_id !== null) {
      message.resolverId = BigInt(object.resolver_id);
    }
    return message;
  },
  toAmino(message: DataResolver, useInterfaces: boolean = false): DataResolverAmino {
    const obj: any = {};
    obj.id = message.id ? base64FromBytes(message.id) : undefined;
    obj.resolver_id = message.resolverId ? message.resolverId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: DataResolverAminoMsg): DataResolver {
    return DataResolver.fromAmino(object.value);
  },
  fromProtoMsg(message: DataResolverProtoMsg, useInterfaces: boolean = false): DataResolver {
    return DataResolver.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DataResolver): Uint8Array {
    return DataResolver.encode(message).finish();
  },
  toProtoMsg(message: DataResolver): DataResolverProtoMsg {
    return {
      typeUrl: "/regen.data.v2.DataResolver",
      value: DataResolver.encode(message).finish()
    };
  }
};