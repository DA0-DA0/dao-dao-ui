import { BinaryReader, BinaryWriter } from "../../../binary";
/** Deprecated. Used only for migration purposes. */
export interface Failure {
  /** ChannelId */
  channelId: string;
  /** Address of the failed contract */
  address: string;
  /** id of the failure under specific address */
  id: bigint;
  /** ACK id to restore */
  ackId: bigint;
  /** Acknowledgement type */
  ackType: string;
}
export interface FailureProtoMsg {
  typeUrl: "/neutron.contractmanager.v1.Failure";
  value: Uint8Array;
}
/** Deprecated. Used only for migration purposes. */
export interface FailureAmino {
  /** ChannelId */
  channel_id?: string;
  /** Address of the failed contract */
  address?: string;
  /** id of the failure under specific address */
  id?: string;
  /** ACK id to restore */
  ack_id?: string;
  /** Acknowledgement type */
  ack_type?: string;
}
export interface FailureAminoMsg {
  type: "/neutron.contractmanager.v1.Failure";
  value: FailureAmino;
}
/** Deprecated. Used only for migration purposes. */
export interface FailureSDKType {
  channel_id: string;
  address: string;
  id: bigint;
  ack_id: bigint;
  ack_type: string;
}
function createBaseFailure(): Failure {
  return {
    channelId: "",
    address: "",
    id: BigInt(0),
    ackId: BigInt(0),
    ackType: ""
  };
}
export const Failure = {
  typeUrl: "/neutron.contractmanager.v1.Failure",
  encode(message: Failure, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.id !== BigInt(0)) {
      writer.uint32(24).uint64(message.id);
    }
    if (message.ackId !== BigInt(0)) {
      writer.uint32(32).uint64(message.ackId);
    }
    if (message.ackType !== "") {
      writer.uint32(42).string(message.ackType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Failure {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFailure();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelId = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.id = reader.uint64();
          break;
        case 4:
          message.ackId = reader.uint64();
          break;
        case 5:
          message.ackType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Failure>): Failure {
    const message = createBaseFailure();
    message.channelId = object.channelId ?? "";
    message.address = object.address ?? "";
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.ackId = object.ackId !== undefined && object.ackId !== null ? BigInt(object.ackId.toString()) : BigInt(0);
    message.ackType = object.ackType ?? "";
    return message;
  },
  fromAmino(object: FailureAmino): Failure {
    const message = createBaseFailure();
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channelId = object.channel_id;
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.ack_id !== undefined && object.ack_id !== null) {
      message.ackId = BigInt(object.ack_id);
    }
    if (object.ack_type !== undefined && object.ack_type !== null) {
      message.ackType = object.ack_type;
    }
    return message;
  },
  toAmino(message: Failure, useInterfaces: boolean = false): FailureAmino {
    const obj: any = {};
    obj.channel_id = message.channelId === "" ? undefined : message.channelId;
    obj.address = message.address === "" ? undefined : message.address;
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.ack_id = message.ackId !== BigInt(0) ? message.ackId.toString() : undefined;
    obj.ack_type = message.ackType === "" ? undefined : message.ackType;
    return obj;
  },
  fromAminoMsg(object: FailureAminoMsg): Failure {
    return Failure.fromAmino(object.value);
  },
  fromProtoMsg(message: FailureProtoMsg, useInterfaces: boolean = false): Failure {
    return Failure.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Failure): Uint8Array {
    return Failure.encode(message).finish();
  },
  toProtoMsg(message: Failure): FailureProtoMsg {
    return {
      typeUrl: "/neutron.contractmanager.v1.Failure",
      value: Failure.encode(message).finish()
    };
  }
};