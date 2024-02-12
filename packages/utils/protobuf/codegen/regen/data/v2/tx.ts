//@ts-nocheck
import { ContentHash, ContentHashAmino, ContentHashSDKType, ContentHash_Graph } from "./types";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
/** MsgAnchor is the Msg/Anchor request type. */
export interface MsgAnchor {
  /**
   * sender is the address of the sender of the transaction. The sender in
   * Anchor is not attesting to the veracity of the underlying data. They
   * can simply be an intermediary providing services.
   */
  sender: string;
  /** content_hash is the content hash for the data to anchor. */
  contentHash?: ContentHash | undefined;
}
export interface MsgAnchorProtoMsg {
  typeUrl: "/regen.data.v2.MsgAnchor";
  value: Uint8Array;
}
/** MsgAnchor is the Msg/Anchor request type. */
export interface MsgAnchorAmino {
  /**
   * sender is the address of the sender of the transaction. The sender in
   * Anchor is not attesting to the veracity of the underlying data. They
   * can simply be an intermediary providing services.
   */
  sender?: string;
  /** content_hash is the content hash for the data to anchor. */
  content_hash?: ContentHashAmino | undefined;
}
export interface MsgAnchorAminoMsg {
  type: "/regen.data.v2.MsgAnchor";
  value: MsgAnchorAmino;
}
/** MsgAnchor is the Msg/Anchor request type. */
export interface MsgAnchorSDKType {
  sender: string;
  content_hash?: ContentHashSDKType | undefined;
}
/** MsgAnchor is the Msg/Anchor response type. */
export interface MsgAnchorResponse {
  /** iri is the IRI of the data that was anchored. */
  iri: string;
  /** timestamp is the time at which the data was anchored. */
  timestamp?: Date | undefined;
}
export interface MsgAnchorResponseProtoMsg {
  typeUrl: "/regen.data.v2.MsgAnchorResponse";
  value: Uint8Array;
}
/** MsgAnchor is the Msg/Anchor response type. */
export interface MsgAnchorResponseAmino {
  /** iri is the IRI of the data that was anchored. */
  iri?: string;
  /** timestamp is the time at which the data was anchored. */
  timestamp?: string | undefined;
}
export interface MsgAnchorResponseAminoMsg {
  type: "/regen.data.v2.MsgAnchorResponse";
  value: MsgAnchorResponseAmino;
}
/** MsgAnchor is the Msg/Anchor response type. */
export interface MsgAnchorResponseSDKType {
  iri: string;
  timestamp?: Date | undefined;
}
/** MsgAttest is the Msg/Attest request type. */
export interface MsgAttest {
  /**
   * attestor is the addresses of the account attesting to the veracity of the
   * data. By making an Attest request, the attestor is attesting to the
   * veracity of the data referenced by the IRI. The precise meaning of this may
   * vary depending on the underlying data.
   */
  attestor: string;
  /**
   * content_hashes are the content hashes for anchored data. Only RDF graph
   * data can be signed as its data model is intended to specifically convey
   * semantic meaning.
   */
  contentHashes: ContentHash_Graph[];
}
export interface MsgAttestProtoMsg {
  typeUrl: "/regen.data.v2.MsgAttest";
  value: Uint8Array;
}
/** MsgAttest is the Msg/Attest request type. */
export interface MsgAttestAmino {
  /**
   * attestor is the addresses of the account attesting to the veracity of the
   * data. By making an Attest request, the attestor is attesting to the
   * veracity of the data referenced by the IRI. The precise meaning of this may
   * vary depending on the underlying data.
   */
  attestor?: string;
  /**
   * content_hashes are the content hashes for anchored data. Only RDF graph
   * data can be signed as its data model is intended to specifically convey
   * semantic meaning.
   */
  content_hashes?: ContentHash_GraphAmino[];
}
export interface MsgAttestAminoMsg {
  type: "/regen.data.v2.MsgAttest";
  value: MsgAttestAmino;
}
/** MsgAttest is the Msg/Attest request type. */
export interface MsgAttestSDKType {
  attestor: string;
  content_hashes: ContentHash_GraphSDKType[];
}
/** MsgAttestResponse is the Msg/Attest response type. */
export interface MsgAttestResponse {
  /**
   * iris are the IRIs of the data that was attested to. If the attestor attests
   * to the same piece of data, the previous attestation will not be updated and
   * the IRI will not be included in this list.
   */
  iris: string[];
  /** timestamp is the time at which any new attestations were made. */
  timestamp?: Date | undefined;
}
export interface MsgAttestResponseProtoMsg {
  typeUrl: "/regen.data.v2.MsgAttestResponse";
  value: Uint8Array;
}
/** MsgAttestResponse is the Msg/Attest response type. */
export interface MsgAttestResponseAmino {
  /**
   * iris are the IRIs of the data that was attested to. If the attestor attests
   * to the same piece of data, the previous attestation will not be updated and
   * the IRI will not be included in this list.
   */
  iris?: string[];
  /** timestamp is the time at which any new attestations were made. */
  timestamp?: string | undefined;
}
export interface MsgAttestResponseAminoMsg {
  type: "/regen.data.v2.MsgAttestResponse";
  value: MsgAttestResponseAmino;
}
/** MsgAttestResponse is the Msg/Attest response type. */
export interface MsgAttestResponseSDKType {
  iris: string[];
  timestamp?: Date | undefined;
}
/** MsgDefineResolver is the Msg/DefineResolver request type. */
export interface MsgDefineResolver {
  /**
   * manager is the address of the resolver manager. The manager is able
   * to make future calls using the ID returned by this operation with
   * Msg/RegisterResolver. To authorize other accounts to register resolvers,
   * the manager should make use of cosmos.authz.
   */
  manager: string;
  /**
   * resolver_url is a resolver URL which should refer to an HTTP service
   * which will respond to a GET request with the IRI of a ContentHash
   * and return the content if it exists or a 404. For graph data, resolvers
   * should use the HTTP Accept header to negotiate the RDF serialization
   * format.
   */
  resolverUrl: string;
}
export interface MsgDefineResolverProtoMsg {
  typeUrl: "/regen.data.v2.MsgDefineResolver";
  value: Uint8Array;
}
/** MsgDefineResolver is the Msg/DefineResolver request type. */
export interface MsgDefineResolverAmino {
  /**
   * manager is the address of the resolver manager. The manager is able
   * to make future calls using the ID returned by this operation with
   * Msg/RegisterResolver. To authorize other accounts to register resolvers,
   * the manager should make use of cosmos.authz.
   */
  manager?: string;
  /**
   * resolver_url is a resolver URL which should refer to an HTTP service
   * which will respond to a GET request with the IRI of a ContentHash
   * and return the content if it exists or a 404. For graph data, resolvers
   * should use the HTTP Accept header to negotiate the RDF serialization
   * format.
   */
  resolver_url?: string;
}
export interface MsgDefineResolverAminoMsg {
  type: "/regen.data.v2.MsgDefineResolver";
  value: MsgDefineResolverAmino;
}
/** MsgDefineResolver is the Msg/DefineResolver request type. */
export interface MsgDefineResolverSDKType {
  manager: string;
  resolver_url: string;
}
/** MsgDefineResolverResponse is the Msg/DefineResolver response type. */
export interface MsgDefineResolverResponse {
  /**
   * resolver_id is the integer ID of the resolver to be used in
   * MsgRegisterResolver.
   */
  resolverId: bigint;
}
export interface MsgDefineResolverResponseProtoMsg {
  typeUrl: "/regen.data.v2.MsgDefineResolverResponse";
  value: Uint8Array;
}
/** MsgDefineResolverResponse is the Msg/DefineResolver response type. */
export interface MsgDefineResolverResponseAmino {
  /**
   * resolver_id is the integer ID of the resolver to be used in
   * MsgRegisterResolver.
   */
  resolver_id?: string;
}
export interface MsgDefineResolverResponseAminoMsg {
  type: "/regen.data.v2.MsgDefineResolverResponse";
  value: MsgDefineResolverResponseAmino;
}
/** MsgDefineResolverResponse is the Msg/DefineResolver response type. */
export interface MsgDefineResolverResponseSDKType {
  resolver_id: bigint;
}
/** MsgRegisterResolver is the Msg/RegisterResolver request type. */
export interface MsgRegisterResolver {
  /**
   * manager is the address of the resolver manager who registered this
   * resolver with Msg/DefinedResolver.
   */
  manager: string;
  /** resolver_id is the ID of a resolver defined with Msg/DefineResolver. */
  resolverId: bigint;
  /**
   * content_hashes is a list of content hashes which the resolver claims to
   * serve.
   */
  contentHashes: ContentHash[];
}
export interface MsgRegisterResolverProtoMsg {
  typeUrl: "/regen.data.v2.MsgRegisterResolver";
  value: Uint8Array;
}
/** MsgRegisterResolver is the Msg/RegisterResolver request type. */
export interface MsgRegisterResolverAmino {
  /**
   * manager is the address of the resolver manager who registered this
   * resolver with Msg/DefinedResolver.
   */
  manager?: string;
  /** resolver_id is the ID of a resolver defined with Msg/DefineResolver. */
  resolver_id?: string;
  /**
   * content_hashes is a list of content hashes which the resolver claims to
   * serve.
   */
  content_hashes?: ContentHashAmino[];
}
export interface MsgRegisterResolverAminoMsg {
  type: "/regen.data.v2.MsgRegisterResolver";
  value: MsgRegisterResolverAmino;
}
/** MsgRegisterResolver is the Msg/RegisterResolver request type. */
export interface MsgRegisterResolverSDKType {
  manager: string;
  resolver_id: bigint;
  content_hashes: ContentHashSDKType[];
}
/** MsgRegisterResolverResponse is the Msg/RegisterResolver response type. */
export interface MsgRegisterResolverResponse {}
export interface MsgRegisterResolverResponseProtoMsg {
  typeUrl: "/regen.data.v2.MsgRegisterResolverResponse";
  value: Uint8Array;
}
/** MsgRegisterResolverResponse is the Msg/RegisterResolver response type. */
export interface MsgRegisterResolverResponseAmino {}
export interface MsgRegisterResolverResponseAminoMsg {
  type: "/regen.data.v2.MsgRegisterResolverResponse";
  value: MsgRegisterResolverResponseAmino;
}
/** MsgRegisterResolverResponse is the Msg/RegisterResolver response type. */
export interface MsgRegisterResolverResponseSDKType {}
function createBaseMsgAnchor(): MsgAnchor {
  return {
    sender: "",
    contentHash: undefined
  };
}
export const MsgAnchor = {
  typeUrl: "/regen.data.v2.MsgAnchor",
  encode(message: MsgAnchor, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.contentHash !== undefined) {
      ContentHash.encode(message.contentHash, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAnchor {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.contentHash = ContentHash.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAnchor>): MsgAnchor {
    const message = createBaseMsgAnchor();
    message.sender = object.sender ?? "";
    message.contentHash = object.contentHash !== undefined && object.contentHash !== null ? ContentHash.fromPartial(object.contentHash) : undefined;
    return message;
  },
  fromAmino(object: MsgAnchorAmino): MsgAnchor {
    const message = createBaseMsgAnchor();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.content_hash !== undefined && object.content_hash !== null) {
      message.contentHash = ContentHash.fromAmino(object.content_hash);
    }
    return message;
  },
  toAmino(message: MsgAnchor, useInterfaces: boolean = false): MsgAnchorAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.content_hash = message.contentHash ? ContentHash.toAmino(message.contentHash, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgAnchorAminoMsg): MsgAnchor {
    return MsgAnchor.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAnchorProtoMsg, useInterfaces: boolean = false): MsgAnchor {
    return MsgAnchor.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAnchor): Uint8Array {
    return MsgAnchor.encode(message).finish();
  },
  toProtoMsg(message: MsgAnchor): MsgAnchorProtoMsg {
    return {
      typeUrl: "/regen.data.v2.MsgAnchor",
      value: MsgAnchor.encode(message).finish()
    };
  }
};
function createBaseMsgAnchorResponse(): MsgAnchorResponse {
  return {
    iri: "",
    timestamp: undefined
  };
}
export const MsgAnchorResponse = {
  typeUrl: "/regen.data.v2.MsgAnchorResponse",
  encode(message: MsgAnchorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.iri !== "") {
      writer.uint32(10).string(message.iri);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAnchorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAnchorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iri = reader.string();
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
  fromPartial(object: Partial<MsgAnchorResponse>): MsgAnchorResponse {
    const message = createBaseMsgAnchorResponse();
    message.iri = object.iri ?? "";
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
  fromAmino(object: MsgAnchorResponseAmino): MsgAnchorResponse {
    const message = createBaseMsgAnchorResponse();
    if (object.iri !== undefined && object.iri !== null) {
      message.iri = object.iri;
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromTimestamp(Timestamp.fromAmino(object.timestamp));
    }
    return message;
  },
  toAmino(message: MsgAnchorResponse, useInterfaces: boolean = false): MsgAnchorResponseAmino {
    const obj: any = {};
    obj.iri = message.iri;
    obj.timestamp = message.timestamp ? Timestamp.toAmino(toTimestamp(message.timestamp)) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgAnchorResponseAminoMsg): MsgAnchorResponse {
    return MsgAnchorResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAnchorResponseProtoMsg, useInterfaces: boolean = false): MsgAnchorResponse {
    return MsgAnchorResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAnchorResponse): Uint8Array {
    return MsgAnchorResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAnchorResponse): MsgAnchorResponseProtoMsg {
    return {
      typeUrl: "/regen.data.v2.MsgAnchorResponse",
      value: MsgAnchorResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAttest(): MsgAttest {
  return {
    attestor: "",
    contentHashes: []
  };
}
export const MsgAttest = {
  typeUrl: "/regen.data.v2.MsgAttest",
  encode(message: MsgAttest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.attestor !== "") {
      writer.uint32(10).string(message.attestor);
    }
    for (const v of message.contentHashes) {
      ContentHash_Graph.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAttest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAttest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attestor = reader.string();
          break;
        case 2:
          message.contentHashes.push(ContentHash_Graph.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAttest>): MsgAttest {
    const message = createBaseMsgAttest();
    message.attestor = object.attestor ?? "";
    message.contentHashes = object.contentHashes?.map(e => ContentHash_Graph.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgAttestAmino): MsgAttest {
    const message = createBaseMsgAttest();
    if (object.attestor !== undefined && object.attestor !== null) {
      message.attestor = object.attestor;
    }
    message.contentHashes = object.content_hashes?.map(e => ContentHash_Graph.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgAttest, useInterfaces: boolean = false): MsgAttestAmino {
    const obj: any = {};
    obj.attestor = message.attestor;
    if (message.contentHashes) {
      obj.content_hashes = message.contentHashes.map(e => e ? ContentHash_Graph.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.content_hashes = [];
    }
    return obj;
  },
  fromAminoMsg(object: MsgAttestAminoMsg): MsgAttest {
    return MsgAttest.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAttestProtoMsg, useInterfaces: boolean = false): MsgAttest {
    return MsgAttest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAttest): Uint8Array {
    return MsgAttest.encode(message).finish();
  },
  toProtoMsg(message: MsgAttest): MsgAttestProtoMsg {
    return {
      typeUrl: "/regen.data.v2.MsgAttest",
      value: MsgAttest.encode(message).finish()
    };
  }
};
function createBaseMsgAttestResponse(): MsgAttestResponse {
  return {
    iris: [],
    timestamp: undefined
  };
}
export const MsgAttestResponse = {
  typeUrl: "/regen.data.v2.MsgAttestResponse",
  encode(message: MsgAttestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.iris) {
      writer.uint32(10).string(v!);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAttestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAttestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iris.push(reader.string());
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
  fromPartial(object: Partial<MsgAttestResponse>): MsgAttestResponse {
    const message = createBaseMsgAttestResponse();
    message.iris = object.iris?.map(e => e) || [];
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
  fromAmino(object: MsgAttestResponseAmino): MsgAttestResponse {
    const message = createBaseMsgAttestResponse();
    message.iris = object.iris?.map(e => e) || [];
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromTimestamp(Timestamp.fromAmino(object.timestamp));
    }
    return message;
  },
  toAmino(message: MsgAttestResponse, useInterfaces: boolean = false): MsgAttestResponseAmino {
    const obj: any = {};
    if (message.iris) {
      obj.iris = message.iris.map(e => e);
    } else {
      obj.iris = [];
    }
    obj.timestamp = message.timestamp ? Timestamp.toAmino(toTimestamp(message.timestamp)) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgAttestResponseAminoMsg): MsgAttestResponse {
    return MsgAttestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAttestResponseProtoMsg, useInterfaces: boolean = false): MsgAttestResponse {
    return MsgAttestResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAttestResponse): Uint8Array {
    return MsgAttestResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAttestResponse): MsgAttestResponseProtoMsg {
    return {
      typeUrl: "/regen.data.v2.MsgAttestResponse",
      value: MsgAttestResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDefineResolver(): MsgDefineResolver {
  return {
    manager: "",
    resolverUrl: ""
  };
}
export const MsgDefineResolver = {
  typeUrl: "/regen.data.v2.MsgDefineResolver",
  encode(message: MsgDefineResolver, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.manager !== "") {
      writer.uint32(10).string(message.manager);
    }
    if (message.resolverUrl !== "") {
      writer.uint32(18).string(message.resolverUrl);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDefineResolver {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDefineResolver();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.manager = reader.string();
          break;
        case 2:
          message.resolverUrl = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDefineResolver>): MsgDefineResolver {
    const message = createBaseMsgDefineResolver();
    message.manager = object.manager ?? "";
    message.resolverUrl = object.resolverUrl ?? "";
    return message;
  },
  fromAmino(object: MsgDefineResolverAmino): MsgDefineResolver {
    const message = createBaseMsgDefineResolver();
    if (object.manager !== undefined && object.manager !== null) {
      message.manager = object.manager;
    }
    if (object.resolver_url !== undefined && object.resolver_url !== null) {
      message.resolverUrl = object.resolver_url;
    }
    return message;
  },
  toAmino(message: MsgDefineResolver, useInterfaces: boolean = false): MsgDefineResolverAmino {
    const obj: any = {};
    obj.manager = message.manager;
    obj.resolver_url = message.resolverUrl;
    return obj;
  },
  fromAminoMsg(object: MsgDefineResolverAminoMsg): MsgDefineResolver {
    return MsgDefineResolver.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDefineResolverProtoMsg, useInterfaces: boolean = false): MsgDefineResolver {
    return MsgDefineResolver.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDefineResolver): Uint8Array {
    return MsgDefineResolver.encode(message).finish();
  },
  toProtoMsg(message: MsgDefineResolver): MsgDefineResolverProtoMsg {
    return {
      typeUrl: "/regen.data.v2.MsgDefineResolver",
      value: MsgDefineResolver.encode(message).finish()
    };
  }
};
function createBaseMsgDefineResolverResponse(): MsgDefineResolverResponse {
  return {
    resolverId: BigInt(0)
  };
}
export const MsgDefineResolverResponse = {
  typeUrl: "/regen.data.v2.MsgDefineResolverResponse",
  encode(message: MsgDefineResolverResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.resolverId !== BigInt(0)) {
      writer.uint32(8).uint64(message.resolverId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDefineResolverResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDefineResolverResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resolverId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDefineResolverResponse>): MsgDefineResolverResponse {
    const message = createBaseMsgDefineResolverResponse();
    message.resolverId = object.resolverId !== undefined && object.resolverId !== null ? BigInt(object.resolverId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgDefineResolverResponseAmino): MsgDefineResolverResponse {
    const message = createBaseMsgDefineResolverResponse();
    if (object.resolver_id !== undefined && object.resolver_id !== null) {
      message.resolverId = BigInt(object.resolver_id);
    }
    return message;
  },
  toAmino(message: MsgDefineResolverResponse, useInterfaces: boolean = false): MsgDefineResolverResponseAmino {
    const obj: any = {};
    obj.resolver_id = message.resolverId ? message.resolverId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgDefineResolverResponseAminoMsg): MsgDefineResolverResponse {
    return MsgDefineResolverResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDefineResolverResponseProtoMsg, useInterfaces: boolean = false): MsgDefineResolverResponse {
    return MsgDefineResolverResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDefineResolverResponse): Uint8Array {
    return MsgDefineResolverResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDefineResolverResponse): MsgDefineResolverResponseProtoMsg {
    return {
      typeUrl: "/regen.data.v2.MsgDefineResolverResponse",
      value: MsgDefineResolverResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterResolver(): MsgRegisterResolver {
  return {
    manager: "",
    resolverId: BigInt(0),
    contentHashes: []
  };
}
export const MsgRegisterResolver = {
  typeUrl: "/regen.data.v2.MsgRegisterResolver",
  encode(message: MsgRegisterResolver, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.manager !== "") {
      writer.uint32(10).string(message.manager);
    }
    if (message.resolverId !== BigInt(0)) {
      writer.uint32(16).uint64(message.resolverId);
    }
    for (const v of message.contentHashes) {
      ContentHash.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterResolver {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterResolver();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.manager = reader.string();
          break;
        case 2:
          message.resolverId = reader.uint64();
          break;
        case 3:
          message.contentHashes.push(ContentHash.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRegisterResolver>): MsgRegisterResolver {
    const message = createBaseMsgRegisterResolver();
    message.manager = object.manager ?? "";
    message.resolverId = object.resolverId !== undefined && object.resolverId !== null ? BigInt(object.resolverId.toString()) : BigInt(0);
    message.contentHashes = object.contentHashes?.map(e => ContentHash.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgRegisterResolverAmino): MsgRegisterResolver {
    const message = createBaseMsgRegisterResolver();
    if (object.manager !== undefined && object.manager !== null) {
      message.manager = object.manager;
    }
    if (object.resolver_id !== undefined && object.resolver_id !== null) {
      message.resolverId = BigInt(object.resolver_id);
    }
    message.contentHashes = object.content_hashes?.map(e => ContentHash.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgRegisterResolver, useInterfaces: boolean = false): MsgRegisterResolverAmino {
    const obj: any = {};
    obj.manager = message.manager;
    obj.resolver_id = message.resolverId ? message.resolverId.toString() : undefined;
    if (message.contentHashes) {
      obj.content_hashes = message.contentHashes.map(e => e ? ContentHash.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.content_hashes = [];
    }
    return obj;
  },
  fromAminoMsg(object: MsgRegisterResolverAminoMsg): MsgRegisterResolver {
    return MsgRegisterResolver.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterResolverProtoMsg, useInterfaces: boolean = false): MsgRegisterResolver {
    return MsgRegisterResolver.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterResolver): Uint8Array {
    return MsgRegisterResolver.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterResolver): MsgRegisterResolverProtoMsg {
    return {
      typeUrl: "/regen.data.v2.MsgRegisterResolver",
      value: MsgRegisterResolver.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterResolverResponse(): MsgRegisterResolverResponse {
  return {};
}
export const MsgRegisterResolverResponse = {
  typeUrl: "/regen.data.v2.MsgRegisterResolverResponse",
  encode(_: MsgRegisterResolverResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterResolverResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterResolverResponse();
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
  fromPartial(_: Partial<MsgRegisterResolverResponse>): MsgRegisterResolverResponse {
    const message = createBaseMsgRegisterResolverResponse();
    return message;
  },
  fromAmino(_: MsgRegisterResolverResponseAmino): MsgRegisterResolverResponse {
    const message = createBaseMsgRegisterResolverResponse();
    return message;
  },
  toAmino(_: MsgRegisterResolverResponse, useInterfaces: boolean = false): MsgRegisterResolverResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRegisterResolverResponseAminoMsg): MsgRegisterResolverResponse {
    return MsgRegisterResolverResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterResolverResponseProtoMsg, useInterfaces: boolean = false): MsgRegisterResolverResponse {
    return MsgRegisterResolverResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterResolverResponse): Uint8Array {
    return MsgRegisterResolverResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterResolverResponse): MsgRegisterResolverResponseProtoMsg {
    return {
      typeUrl: "/regen.data.v2.MsgRegisterResolverResponse",
      value: MsgRegisterResolverResponse.encode(message).finish()
    };
  }
};