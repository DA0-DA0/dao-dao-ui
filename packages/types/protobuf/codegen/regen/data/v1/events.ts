import { BinaryReader, BinaryWriter } from "../../../binary";
/** EventAnchor is an event emitted when data is anchored on chain. */
export interface EventAnchor {
  /** iri is the IRI of the data anchored on chain. */
  iri: string;
}
export interface EventAnchorProtoMsg {
  typeUrl: "/regen.data.v1.EventAnchor";
  value: Uint8Array;
}
/** EventAnchor is an event emitted when data is anchored on chain. */
export interface EventAnchorAmino {
  /** iri is the IRI of the data anchored on chain. */
  iri?: string;
}
export interface EventAnchorAminoMsg {
  type: "/regen.data.v1.EventAnchor";
  value: EventAnchorAmino;
}
/** EventAnchor is an event emitted when data is anchored on chain. */
export interface EventAnchorSDKType {
  iri: string;
}
/** EventAttest is an event emitted when data is attested to on chain. */
export interface EventAttest {
  /** iri is the IRI of the data attested to. */
  iri: string;
  /**
   * attestor is the address of the account that has attested to the veracity of
   * the data.
   */
  attestor: string;
}
export interface EventAttestProtoMsg {
  typeUrl: "/regen.data.v1.EventAttest";
  value: Uint8Array;
}
/** EventAttest is an event emitted when data is attested to on chain. */
export interface EventAttestAmino {
  /** iri is the IRI of the data attested to. */
  iri?: string;
  /**
   * attestor is the address of the account that has attested to the veracity of
   * the data.
   */
  attestor?: string;
}
export interface EventAttestAminoMsg {
  type: "/regen.data.v1.EventAttest";
  value: EventAttestAmino;
}
/** EventAttest is an event emitted when data is attested to on chain. */
export interface EventAttestSDKType {
  iri: string;
  attestor: string;
}
/** EventDefineResolver is an event emitted when a resolved is defined on chain. */
export interface EventDefineResolver {
  /** id is the ID of the defined resolver. */
  id: bigint;
}
export interface EventDefineResolverProtoMsg {
  typeUrl: "/regen.data.v1.EventDefineResolver";
  value: Uint8Array;
}
/** EventDefineResolver is an event emitted when a resolved is defined on chain. */
export interface EventDefineResolverAmino {
  /** id is the ID of the defined resolver. */
  id?: string;
}
export interface EventDefineResolverAminoMsg {
  type: "/regen.data.v1.EventDefineResolver";
  value: EventDefineResolverAmino;
}
/** EventDefineResolver is an event emitted when a resolved is defined on chain. */
export interface EventDefineResolverSDKType {
  id: bigint;
}
/**
 * EventRegisterResolver is an event emitted when data is registered to a
 * resolver on chain.
 */
export interface EventRegisterResolver {
  /** id is the ID of the resolver that the data was registered to. */
  id: bigint;
  /** iri is the IRI of the data that was registered. */
  iri: string;
}
export interface EventRegisterResolverProtoMsg {
  typeUrl: "/regen.data.v1.EventRegisterResolver";
  value: Uint8Array;
}
/**
 * EventRegisterResolver is an event emitted when data is registered to a
 * resolver on chain.
 */
export interface EventRegisterResolverAmino {
  /** id is the ID of the resolver that the data was registered to. */
  id?: string;
  /** iri is the IRI of the data that was registered. */
  iri?: string;
}
export interface EventRegisterResolverAminoMsg {
  type: "/regen.data.v1.EventRegisterResolver";
  value: EventRegisterResolverAmino;
}
/**
 * EventRegisterResolver is an event emitted when data is registered to a
 * resolver on chain.
 */
export interface EventRegisterResolverSDKType {
  id: bigint;
  iri: string;
}
function createBaseEventAnchor(): EventAnchor {
  return {
    iri: ""
  };
}
export const EventAnchor = {
  typeUrl: "/regen.data.v1.EventAnchor",
  encode(message: EventAnchor, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.iri !== "") {
      writer.uint32(10).string(message.iri);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventAnchor {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iri = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventAnchor>): EventAnchor {
    const message = createBaseEventAnchor();
    message.iri = object.iri ?? "";
    return message;
  },
  fromAmino(object: EventAnchorAmino): EventAnchor {
    const message = createBaseEventAnchor();
    if (object.iri !== undefined && object.iri !== null) {
      message.iri = object.iri;
    }
    return message;
  },
  toAmino(message: EventAnchor, useInterfaces: boolean = false): EventAnchorAmino {
    const obj: any = {};
    obj.iri = message.iri === "" ? undefined : message.iri;
    return obj;
  },
  fromAminoMsg(object: EventAnchorAminoMsg): EventAnchor {
    return EventAnchor.fromAmino(object.value);
  },
  fromProtoMsg(message: EventAnchorProtoMsg, useInterfaces: boolean = false): EventAnchor {
    return EventAnchor.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventAnchor): Uint8Array {
    return EventAnchor.encode(message).finish();
  },
  toProtoMsg(message: EventAnchor): EventAnchorProtoMsg {
    return {
      typeUrl: "/regen.data.v1.EventAnchor",
      value: EventAnchor.encode(message).finish()
    };
  }
};
function createBaseEventAttest(): EventAttest {
  return {
    iri: "",
    attestor: ""
  };
}
export const EventAttest = {
  typeUrl: "/regen.data.v1.EventAttest",
  encode(message: EventAttest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.iri !== "") {
      writer.uint32(10).string(message.iri);
    }
    if (message.attestor !== "") {
      writer.uint32(18).string(message.attestor);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventAttest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventAttest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iri = reader.string();
          break;
        case 2:
          message.attestor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventAttest>): EventAttest {
    const message = createBaseEventAttest();
    message.iri = object.iri ?? "";
    message.attestor = object.attestor ?? "";
    return message;
  },
  fromAmino(object: EventAttestAmino): EventAttest {
    const message = createBaseEventAttest();
    if (object.iri !== undefined && object.iri !== null) {
      message.iri = object.iri;
    }
    if (object.attestor !== undefined && object.attestor !== null) {
      message.attestor = object.attestor;
    }
    return message;
  },
  toAmino(message: EventAttest, useInterfaces: boolean = false): EventAttestAmino {
    const obj: any = {};
    obj.iri = message.iri === "" ? undefined : message.iri;
    obj.attestor = message.attestor === "" ? undefined : message.attestor;
    return obj;
  },
  fromAminoMsg(object: EventAttestAminoMsg): EventAttest {
    return EventAttest.fromAmino(object.value);
  },
  fromProtoMsg(message: EventAttestProtoMsg, useInterfaces: boolean = false): EventAttest {
    return EventAttest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventAttest): Uint8Array {
    return EventAttest.encode(message).finish();
  },
  toProtoMsg(message: EventAttest): EventAttestProtoMsg {
    return {
      typeUrl: "/regen.data.v1.EventAttest",
      value: EventAttest.encode(message).finish()
    };
  }
};
function createBaseEventDefineResolver(): EventDefineResolver {
  return {
    id: BigInt(0)
  };
}
export const EventDefineResolver = {
  typeUrl: "/regen.data.v1.EventDefineResolver",
  encode(message: EventDefineResolver, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventDefineResolver {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDefineResolver();
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
  fromPartial(object: Partial<EventDefineResolver>): EventDefineResolver {
    const message = createBaseEventDefineResolver();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventDefineResolverAmino): EventDefineResolver {
    const message = createBaseEventDefineResolver();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: EventDefineResolver, useInterfaces: boolean = false): EventDefineResolverAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventDefineResolverAminoMsg): EventDefineResolver {
    return EventDefineResolver.fromAmino(object.value);
  },
  fromProtoMsg(message: EventDefineResolverProtoMsg, useInterfaces: boolean = false): EventDefineResolver {
    return EventDefineResolver.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventDefineResolver): Uint8Array {
    return EventDefineResolver.encode(message).finish();
  },
  toProtoMsg(message: EventDefineResolver): EventDefineResolverProtoMsg {
    return {
      typeUrl: "/regen.data.v1.EventDefineResolver",
      value: EventDefineResolver.encode(message).finish()
    };
  }
};
function createBaseEventRegisterResolver(): EventRegisterResolver {
  return {
    id: BigInt(0),
    iri: ""
  };
}
export const EventRegisterResolver = {
  typeUrl: "/regen.data.v1.EventRegisterResolver",
  encode(message: EventRegisterResolver, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.iri !== "") {
      writer.uint32(18).string(message.iri);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRegisterResolver {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRegisterResolver();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
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
  fromPartial(object: Partial<EventRegisterResolver>): EventRegisterResolver {
    const message = createBaseEventRegisterResolver();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.iri = object.iri ?? "";
    return message;
  },
  fromAmino(object: EventRegisterResolverAmino): EventRegisterResolver {
    const message = createBaseEventRegisterResolver();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.iri !== undefined && object.iri !== null) {
      message.iri = object.iri;
    }
    return message;
  },
  toAmino(message: EventRegisterResolver, useInterfaces: boolean = false): EventRegisterResolverAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.iri = message.iri === "" ? undefined : message.iri;
    return obj;
  },
  fromAminoMsg(object: EventRegisterResolverAminoMsg): EventRegisterResolver {
    return EventRegisterResolver.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRegisterResolverProtoMsg, useInterfaces: boolean = false): EventRegisterResolver {
    return EventRegisterResolver.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRegisterResolver): Uint8Array {
    return EventRegisterResolver.encode(message).finish();
  },
  toProtoMsg(message: EventRegisterResolver): EventRegisterResolverProtoMsg {
    return {
      typeUrl: "/regen.data.v1.EventRegisterResolver",
      value: EventRegisterResolver.encode(message).finish()
    };
  }
};