import { Height, HeightAmino, HeightSDKType } from "../../../ibc/core/client/v1/client";
import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
export interface MultiSigConnection {
  /** identifier for a multi-sig connection */
  id: string;
  /**
   * the operator address of the multi-sig connection on Pryzm, allowed to acknowledge packets
   * this address must be a multi-sig to be secure
   */
  operator: string;
  /** the last packet sequence sent on this connection */
  lastSequence: bigint;
  /**
   * the latest height of host chain known on Pryzm
   * this is the host chain block when the last packet is executed and Pryzm have got the acknowledgment
   */
  latestHostHeight: Height | undefined;
}
export interface MultiSigConnectionProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MultiSigConnection";
  value: Uint8Array;
}
export interface MultiSigConnectionAmino {
  /** identifier for a multi-sig connection */
  id?: string;
  /**
   * the operator address of the multi-sig connection on Pryzm, allowed to acknowledge packets
   * this address must be a multi-sig to be secure
   */
  operator?: string;
  /** the last packet sequence sent on this connection */
  last_sequence?: string;
  /**
   * the latest height of host chain known on Pryzm
   * this is the host chain block when the last packet is executed and Pryzm have got the acknowledgment
   */
  latest_host_height?: HeightAmino | undefined;
}
export interface MultiSigConnectionAminoMsg {
  type: "/pryzm.icstaking.v1.MultiSigConnection";
  value: MultiSigConnectionAmino;
}
export interface MultiSigConnectionSDKType {
  id: string;
  operator: string;
  last_sequence: bigint;
  latest_host_height: HeightSDKType | undefined;
}
export interface MultiSigPacket {
  connectionId: string;
  /** the sequence number of the packet, used to make sure that the messages are executed with proper ordering */
  sequence: bigint;
  /** messages that must be executed on the host chain */
  messages: Any[];
}
export interface MultiSigPacketProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MultiSigPacket";
  value: Uint8Array;
}
export interface MultiSigPacketAmino {
  connection_id?: string;
  /** the sequence number of the packet, used to make sure that the messages are executed with proper ordering */
  sequence?: string;
  /** messages that must be executed on the host chain */
  messages?: AnyAmino[];
}
export interface MultiSigPacketAminoMsg {
  type: "/pryzm.icstaking.v1.MultiSigPacket";
  value: MultiSigPacketAmino;
}
export interface MultiSigPacketSDKType {
  connection_id: string;
  sequence: bigint;
  messages: AnySDKType[];
}
/** This is copied from ibc-go */
export interface Acknowledgement {
  result?: Uint8Array;
  error?: string;
}
export interface AcknowledgementProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.Acknowledgement";
  value: Uint8Array;
}
/** This is copied from ibc-go */
export interface AcknowledgementAmino {
  result?: string;
  error?: string;
}
export interface AcknowledgementAminoMsg {
  type: "/pryzm.icstaking.v1.Acknowledgement";
  value: AcknowledgementAmino;
}
/** This is copied from ibc-go */
export interface AcknowledgementSDKType {
  result?: Uint8Array;
  error?: string;
}
function createBaseMultiSigConnection(): MultiSigConnection {
  return {
    id: "",
    operator: "",
    lastSequence: BigInt(0),
    latestHostHeight: Height.fromPartial({})
  };
}
export const MultiSigConnection = {
  typeUrl: "/pryzm.icstaking.v1.MultiSigConnection",
  encode(message: MultiSigConnection, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.operator !== "") {
      writer.uint32(18).string(message.operator);
    }
    if (message.lastSequence !== BigInt(0)) {
      writer.uint32(24).uint64(message.lastSequence);
    }
    if (message.latestHostHeight !== undefined) {
      Height.encode(message.latestHostHeight, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MultiSigConnection {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultiSigConnection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.operator = reader.string();
          break;
        case 3:
          message.lastSequence = reader.uint64();
          break;
        case 4:
          message.latestHostHeight = Height.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MultiSigConnection>): MultiSigConnection {
    const message = createBaseMultiSigConnection();
    message.id = object.id ?? "";
    message.operator = object.operator ?? "";
    message.lastSequence = object.lastSequence !== undefined && object.lastSequence !== null ? BigInt(object.lastSequence.toString()) : BigInt(0);
    message.latestHostHeight = object.latestHostHeight !== undefined && object.latestHostHeight !== null ? Height.fromPartial(object.latestHostHeight) : undefined;
    return message;
  },
  fromAmino(object: MultiSigConnectionAmino): MultiSigConnection {
    const message = createBaseMultiSigConnection();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.operator !== undefined && object.operator !== null) {
      message.operator = object.operator;
    }
    if (object.last_sequence !== undefined && object.last_sequence !== null) {
      message.lastSequence = BigInt(object.last_sequence);
    }
    if (object.latest_host_height !== undefined && object.latest_host_height !== null) {
      message.latestHostHeight = Height.fromAmino(object.latest_host_height);
    }
    return message;
  },
  toAmino(message: MultiSigConnection, useInterfaces: boolean = false): MultiSigConnectionAmino {
    const obj: any = {};
    obj.id = message.id === "" ? undefined : message.id;
    obj.operator = message.operator === "" ? undefined : message.operator;
    obj.last_sequence = message.lastSequence !== BigInt(0) ? message.lastSequence.toString() : undefined;
    obj.latest_host_height = message.latestHostHeight ? Height.toAmino(message.latestHostHeight, useInterfaces) : {};
    return obj;
  },
  fromAminoMsg(object: MultiSigConnectionAminoMsg): MultiSigConnection {
    return MultiSigConnection.fromAmino(object.value);
  },
  fromProtoMsg(message: MultiSigConnectionProtoMsg, useInterfaces: boolean = false): MultiSigConnection {
    return MultiSigConnection.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MultiSigConnection): Uint8Array {
    return MultiSigConnection.encode(message).finish();
  },
  toProtoMsg(message: MultiSigConnection): MultiSigConnectionProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MultiSigConnection",
      value: MultiSigConnection.encode(message).finish()
    };
  }
};
function createBaseMultiSigPacket(): MultiSigPacket {
  return {
    connectionId: "",
    sequence: BigInt(0),
    messages: []
  };
}
export const MultiSigPacket = {
  typeUrl: "/pryzm.icstaking.v1.MultiSigPacket",
  encode(message: MultiSigPacket, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.connectionId !== "") {
      writer.uint32(10).string(message.connectionId);
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(16).uint64(message.sequence);
    }
    for (const v of message.messages) {
      Any.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MultiSigPacket {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultiSigPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connectionId = reader.string();
          break;
        case 2:
          message.sequence = reader.uint64();
          break;
        case 3:
          message.messages.push(Any.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MultiSigPacket>): MultiSigPacket {
    const message = createBaseMultiSigPacket();
    message.connectionId = object.connectionId ?? "";
    message.sequence = object.sequence !== undefined && object.sequence !== null ? BigInt(object.sequence.toString()) : BigInt(0);
    message.messages = object.messages?.map(e => Any.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MultiSigPacketAmino): MultiSigPacket {
    const message = createBaseMultiSigPacket();
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence);
    }
    message.messages = object.messages?.map(e => Any.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MultiSigPacket, useInterfaces: boolean = false): MultiSigPacketAmino {
    const obj: any = {};
    obj.connection_id = message.connectionId === "" ? undefined : message.connectionId;
    obj.sequence = message.sequence !== BigInt(0) ? message.sequence.toString() : undefined;
    if (message.messages) {
      obj.messages = message.messages.map(e => e ? Any.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.messages = message.messages;
    }
    return obj;
  },
  fromAminoMsg(object: MultiSigPacketAminoMsg): MultiSigPacket {
    return MultiSigPacket.fromAmino(object.value);
  },
  fromProtoMsg(message: MultiSigPacketProtoMsg, useInterfaces: boolean = false): MultiSigPacket {
    return MultiSigPacket.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MultiSigPacket): Uint8Array {
    return MultiSigPacket.encode(message).finish();
  },
  toProtoMsg(message: MultiSigPacket): MultiSigPacketProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MultiSigPacket",
      value: MultiSigPacket.encode(message).finish()
    };
  }
};
function createBaseAcknowledgement(): Acknowledgement {
  return {
    result: undefined,
    error: undefined
  };
}
export const Acknowledgement = {
  typeUrl: "/pryzm.icstaking.v1.Acknowledgement",
  encode(message: Acknowledgement, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.result !== undefined) {
      writer.uint32(170).bytes(message.result);
    }
    if (message.error !== undefined) {
      writer.uint32(178).string(message.error);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Acknowledgement {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcknowledgement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 21:
          message.result = reader.bytes();
          break;
        case 22:
          message.error = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Acknowledgement>): Acknowledgement {
    const message = createBaseAcknowledgement();
    message.result = object.result ?? undefined;
    message.error = object.error ?? undefined;
    return message;
  },
  fromAmino(object: AcknowledgementAmino): Acknowledgement {
    const message = createBaseAcknowledgement();
    if (object.result !== undefined && object.result !== null) {
      message.result = bytesFromBase64(object.result);
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error;
    }
    return message;
  },
  toAmino(message: Acknowledgement, useInterfaces: boolean = false): AcknowledgementAmino {
    const obj: any = {};
    obj.result = message.result ? base64FromBytes(message.result) : undefined;
    obj.error = message.error === null ? undefined : message.error;
    return obj;
  },
  fromAminoMsg(object: AcknowledgementAminoMsg): Acknowledgement {
    return Acknowledgement.fromAmino(object.value);
  },
  fromProtoMsg(message: AcknowledgementProtoMsg, useInterfaces: boolean = false): Acknowledgement {
    return Acknowledgement.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Acknowledgement): Uint8Array {
    return Acknowledgement.encode(message).finish();
  },
  toProtoMsg(message: Acknowledgement): AcknowledgementProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.Acknowledgement",
      value: Acknowledgement.encode(message).finish()
    };
  }
};