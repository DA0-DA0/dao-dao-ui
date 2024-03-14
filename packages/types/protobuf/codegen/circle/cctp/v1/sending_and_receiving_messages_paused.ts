import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * Message format for SendingAndReceivingMessagesPaused
 * @param paused true if paused, false if not paused
 */
export interface SendingAndReceivingMessagesPaused {
  paused: boolean;
}
export interface SendingAndReceivingMessagesPausedProtoMsg {
  typeUrl: "/circle.cctp.v1.SendingAndReceivingMessagesPaused";
  value: Uint8Array;
}
/**
 * Message format for SendingAndReceivingMessagesPaused
 * @param paused true if paused, false if not paused
 */
export interface SendingAndReceivingMessagesPausedAmino {
  paused?: boolean;
}
export interface SendingAndReceivingMessagesPausedAminoMsg {
  type: "/circle.cctp.v1.SendingAndReceivingMessagesPaused";
  value: SendingAndReceivingMessagesPausedAmino;
}
/**
 * Message format for SendingAndReceivingMessagesPaused
 * @param paused true if paused, false if not paused
 */
export interface SendingAndReceivingMessagesPausedSDKType {
  paused: boolean;
}
function createBaseSendingAndReceivingMessagesPaused(): SendingAndReceivingMessagesPaused {
  return {
    paused: false
  };
}
export const SendingAndReceivingMessagesPaused = {
  typeUrl: "/circle.cctp.v1.SendingAndReceivingMessagesPaused",
  encode(message: SendingAndReceivingMessagesPaused, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.paused === true) {
      writer.uint32(8).bool(message.paused);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SendingAndReceivingMessagesPaused {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendingAndReceivingMessagesPaused();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paused = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SendingAndReceivingMessagesPaused>): SendingAndReceivingMessagesPaused {
    const message = createBaseSendingAndReceivingMessagesPaused();
    message.paused = object.paused ?? false;
    return message;
  },
  fromAmino(object: SendingAndReceivingMessagesPausedAmino): SendingAndReceivingMessagesPaused {
    const message = createBaseSendingAndReceivingMessagesPaused();
    if (object.paused !== undefined && object.paused !== null) {
      message.paused = object.paused;
    }
    return message;
  },
  toAmino(message: SendingAndReceivingMessagesPaused, useInterfaces: boolean = false): SendingAndReceivingMessagesPausedAmino {
    const obj: any = {};
    obj.paused = message.paused;
    return obj;
  },
  fromAminoMsg(object: SendingAndReceivingMessagesPausedAminoMsg): SendingAndReceivingMessagesPaused {
    return SendingAndReceivingMessagesPaused.fromAmino(object.value);
  },
  fromProtoMsg(message: SendingAndReceivingMessagesPausedProtoMsg, useInterfaces: boolean = false): SendingAndReceivingMessagesPaused {
    return SendingAndReceivingMessagesPaused.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SendingAndReceivingMessagesPaused): Uint8Array {
    return SendingAndReceivingMessagesPaused.encode(message).finish();
  },
  toProtoMsg(message: SendingAndReceivingMessagesPaused): SendingAndReceivingMessagesPausedProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.SendingAndReceivingMessagesPaused",
      value: SendingAndReceivingMessagesPaused.encode(message).finish()
    };
  }
};