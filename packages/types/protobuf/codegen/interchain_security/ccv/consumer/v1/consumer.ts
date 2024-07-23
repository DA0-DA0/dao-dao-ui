import { Any, AnyProtoMsg, AnyAmino, AnySDKType } from "../../../../google/protobuf/any";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { bytesFromBase64, base64FromBytes, toTimestamp, fromTimestamp } from "../../../../helpers";
import { encodePubkey, decodePubkey } from "@cosmjs/proto-signing";
import { Pubkey } from "@cosmjs/amino";
/**
 * CrossChainValidator defines the type used to store validator information
 * internal to the consumer CCV module.  Note one cross chain validator entry is
 * persisted for each consumer validator, where incoming VSC packets update this
 * data, which is eventually forwarded to comet for consumer chain consensus.
 * 
 * Note this type is only used internally to the consumer CCV module.
 */
export interface CrossChainValidator {
  address: Uint8Array;
  power: bigint;
  /** pubkey is the consensus public key of the validator, as a Protobuf Any. */
  pubkey?: (Any) | undefined;
  /**
   * !!! DEPRECATED !!! opted_out is deprecated because after the introduction of Partial Set Security (PSS)
   * we removed the soft opt-out feature.
   */
  /** @deprecated */
  optedOut: boolean;
}
export interface CrossChainValidatorProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.CrossChainValidator";
  value: Uint8Array;
}
export type CrossChainValidatorEncoded = Omit<CrossChainValidator, "pubkey"> & {
  /** pubkey is the consensus public key of the validator, as a Protobuf Any. */pubkey?: AnyProtoMsg | undefined;
};
/**
 * CrossChainValidator defines the type used to store validator information
 * internal to the consumer CCV module.  Note one cross chain validator entry is
 * persisted for each consumer validator, where incoming VSC packets update this
 * data, which is eventually forwarded to comet for consumer chain consensus.
 * 
 * Note this type is only used internally to the consumer CCV module.
 */
export interface CrossChainValidatorAmino {
  address?: string;
  power?: string;
  /** pubkey is the consensus public key of the validator, as a Protobuf Any. */
  pubkey?: AnyAmino | undefined;
  /**
   * !!! DEPRECATED !!! opted_out is deprecated because after the introduction of Partial Set Security (PSS)
   * we removed the soft opt-out feature.
   */
  /** @deprecated */
  opted_out?: boolean;
}
export interface CrossChainValidatorAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.CrossChainValidator";
  value: CrossChainValidatorAmino;
}
/**
 * CrossChainValidator defines the type used to store validator information
 * internal to the consumer CCV module.  Note one cross chain validator entry is
 * persisted for each consumer validator, where incoming VSC packets update this
 * data, which is eventually forwarded to comet for consumer chain consensus.
 * 
 * Note this type is only used internally to the consumer CCV module.
 */
export interface CrossChainValidatorSDKType {
  address: Uint8Array;
  power: bigint;
  pubkey?: AnySDKType | undefined;
  /** @deprecated */
  opted_out: boolean;
}
/**
 * A record storing the state of a slash packet sent to the provider chain
 * which may bounce back and forth until handled by the provider.
 * 
 * Note this type is only used internally to the consumer CCV module.
 */
export interface SlashRecord {
  waitingOnReply: boolean;
  sendTime: Date | undefined;
}
export interface SlashRecordProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.SlashRecord";
  value: Uint8Array;
}
/**
 * A record storing the state of a slash packet sent to the provider chain
 * which may bounce back and forth until handled by the provider.
 * 
 * Note this type is only used internally to the consumer CCV module.
 */
export interface SlashRecordAmino {
  waiting_on_reply?: boolean;
  send_time?: string | undefined;
}
export interface SlashRecordAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.SlashRecord";
  value: SlashRecordAmino;
}
/**
 * A record storing the state of a slash packet sent to the provider chain
 * which may bounce back and forth until handled by the provider.
 * 
 * Note this type is only used internally to the consumer CCV module.
 */
export interface SlashRecordSDKType {
  waiting_on_reply: boolean;
  send_time: Date | undefined;
}
function createBaseCrossChainValidator(): CrossChainValidator {
  return {
    address: new Uint8Array(),
    power: BigInt(0),
    pubkey: undefined,
    optedOut: false
  };
}
export const CrossChainValidator = {
  typeUrl: "/interchain_security.ccv.consumer.v1.CrossChainValidator",
  encode(message: CrossChainValidator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    if (message.power !== BigInt(0)) {
      writer.uint32(16).int64(message.power);
    }
    if (message.pubkey !== undefined) {
      Any.encode((message.pubkey as Any), writer.uint32(26).fork()).ldelim();
    }
    if (message.optedOut === true) {
      writer.uint32(32).bool(message.optedOut);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CrossChainValidator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCrossChainValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.bytes();
          break;
        case 2:
          message.power = reader.int64();
          break;
        case 3:
          message.pubkey = useInterfaces ? (Cosmos_cryptoPubKey_InterfaceDecoder(reader) as Any) : Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.optedOut = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CrossChainValidator>): CrossChainValidator {
    const message = createBaseCrossChainValidator();
    message.address = object.address ?? new Uint8Array();
    message.power = object.power !== undefined && object.power !== null ? BigInt(object.power.toString()) : BigInt(0);
    message.pubkey = object.pubkey !== undefined && object.pubkey !== null ? Any.fromPartial(object.pubkey) : undefined;
    message.optedOut = object.optedOut ?? false;
    return message;
  },
  fromAmino(object: CrossChainValidatorAmino): CrossChainValidator {
    const message = createBaseCrossChainValidator();
    if (object.address !== undefined && object.address !== null) {
      message.address = bytesFromBase64(object.address);
    }
    if (object.power !== undefined && object.power !== null) {
      message.power = BigInt(object.power);
    }
    if (object.pubkey !== undefined && object.pubkey !== null) {
      message.pubkey = encodePubkey(object.pubkey);
    }
    if (object.opted_out !== undefined && object.opted_out !== null) {
      message.optedOut = object.opted_out;
    }
    return message;
  },
  toAmino(message: CrossChainValidator, useInterfaces: boolean = false): CrossChainValidatorAmino {
    const obj: any = {};
    obj.address = message.address ? base64FromBytes(message.address) : undefined;
    obj.power = message.power ? message.power.toString() : undefined;
    obj.pubkey = message.pubkey ? decodePubkey(message.pubkey) : undefined;
    obj.opted_out = message.optedOut;
    return obj;
  },
  fromAminoMsg(object: CrossChainValidatorAminoMsg): CrossChainValidator {
    return CrossChainValidator.fromAmino(object.value);
  },
  fromProtoMsg(message: CrossChainValidatorProtoMsg, useInterfaces: boolean = false): CrossChainValidator {
    return CrossChainValidator.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CrossChainValidator): Uint8Array {
    return CrossChainValidator.encode(message).finish();
  },
  toProtoMsg(message: CrossChainValidator): CrossChainValidatorProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.CrossChainValidator",
      value: CrossChainValidator.encode(message).finish()
    };
  }
};
function createBaseSlashRecord(): SlashRecord {
  return {
    waitingOnReply: false,
    sendTime: new Date()
  };
}
export const SlashRecord = {
  typeUrl: "/interchain_security.ccv.consumer.v1.SlashRecord",
  encode(message: SlashRecord, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.waitingOnReply === true) {
      writer.uint32(8).bool(message.waitingOnReply);
    }
    if (message.sendTime !== undefined) {
      Timestamp.encode(toTimestamp(message.sendTime), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SlashRecord {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSlashRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.waitingOnReply = reader.bool();
          break;
        case 2:
          message.sendTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SlashRecord>): SlashRecord {
    const message = createBaseSlashRecord();
    message.waitingOnReply = object.waitingOnReply ?? false;
    message.sendTime = object.sendTime ?? undefined;
    return message;
  },
  fromAmino(object: SlashRecordAmino): SlashRecord {
    const message = createBaseSlashRecord();
    if (object.waiting_on_reply !== undefined && object.waiting_on_reply !== null) {
      message.waitingOnReply = object.waiting_on_reply;
    }
    if (object.send_time !== undefined && object.send_time !== null) {
      message.sendTime = fromTimestamp(Timestamp.fromAmino(object.send_time));
    }
    return message;
  },
  toAmino(message: SlashRecord, useInterfaces: boolean = false): SlashRecordAmino {
    const obj: any = {};
    obj.waiting_on_reply = message.waitingOnReply;
    obj.send_time = message.sendTime ? Timestamp.toAmino(toTimestamp(message.sendTime)) : undefined;
    return obj;
  },
  fromAminoMsg(object: SlashRecordAminoMsg): SlashRecord {
    return SlashRecord.fromAmino(object.value);
  },
  fromProtoMsg(message: SlashRecordProtoMsg, useInterfaces: boolean = false): SlashRecord {
    return SlashRecord.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SlashRecord): Uint8Array {
    return SlashRecord.encode(message).finish();
  },
  toProtoMsg(message: SlashRecord): SlashRecordProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.SlashRecord",
      value: SlashRecord.encode(message).finish()
    };
  }
};
export const Cosmos_cryptoPubKey_InterfaceDecoder = (input: BinaryReader | Uint8Array): Any => {
  const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
  const data = Any.decode(reader, reader.uint32(), true);
  switch (data.typeUrl) {
    default:
      return data;
  }
};
export const Cosmos_cryptoPubKey_FromAmino = (content: AnyAmino) => {
  return encodePubkey(content);
};
export const Cosmos_cryptoPubKey_ToAmino = (content: Any, useInterfaces: boolean = false): Pubkey | null => {
  return decodePubkey(content);
};