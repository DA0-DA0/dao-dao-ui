import { Timestamp } from "../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../binary";
import { toTimestamp, fromTimestamp, bytesFromBase64, base64FromBytes } from "../../helpers";
export interface LimitOrderExpiration {
  /** see limitOrderTranche.proto for details on goodTilDate */
  expirationTime: Date | undefined;
  trancheRef: Uint8Array;
}
export interface LimitOrderExpirationProtoMsg {
  typeUrl: "/neutron.dex.LimitOrderExpiration";
  value: Uint8Array;
}
export interface LimitOrderExpirationAmino {
  /** see limitOrderTranche.proto for details on goodTilDate */
  expiration_time?: string | undefined;
  tranche_ref?: string;
}
export interface LimitOrderExpirationAminoMsg {
  type: "/neutron.dex.LimitOrderExpiration";
  value: LimitOrderExpirationAmino;
}
export interface LimitOrderExpirationSDKType {
  expiration_time: Date | undefined;
  tranche_ref: Uint8Array;
}
function createBaseLimitOrderExpiration(): LimitOrderExpiration {
  return {
    expirationTime: new Date(),
    trancheRef: new Uint8Array()
  };
}
export const LimitOrderExpiration = {
  typeUrl: "/neutron.dex.LimitOrderExpiration",
  encode(message: LimitOrderExpiration, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.expirationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.expirationTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.trancheRef.length !== 0) {
      writer.uint32(18).bytes(message.trancheRef);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LimitOrderExpiration {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimitOrderExpiration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.expirationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.trancheRef = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LimitOrderExpiration>): LimitOrderExpiration {
    const message = createBaseLimitOrderExpiration();
    message.expirationTime = object.expirationTime ?? undefined;
    message.trancheRef = object.trancheRef ?? new Uint8Array();
    return message;
  },
  fromAmino(object: LimitOrderExpirationAmino): LimitOrderExpiration {
    const message = createBaseLimitOrderExpiration();
    if (object.expiration_time !== undefined && object.expiration_time !== null) {
      message.expirationTime = fromTimestamp(Timestamp.fromAmino(object.expiration_time));
    }
    if (object.tranche_ref !== undefined && object.tranche_ref !== null) {
      message.trancheRef = bytesFromBase64(object.tranche_ref);
    }
    return message;
  },
  toAmino(message: LimitOrderExpiration, useInterfaces: boolean = false): LimitOrderExpirationAmino {
    const obj: any = {};
    obj.expiration_time = message.expirationTime ? Timestamp.toAmino(toTimestamp(message.expirationTime)) : undefined;
    obj.tranche_ref = message.trancheRef ? base64FromBytes(message.trancheRef) : undefined;
    return obj;
  },
  fromAminoMsg(object: LimitOrderExpirationAminoMsg): LimitOrderExpiration {
    return LimitOrderExpiration.fromAmino(object.value);
  },
  fromProtoMsg(message: LimitOrderExpirationProtoMsg, useInterfaces: boolean = false): LimitOrderExpiration {
    return LimitOrderExpiration.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LimitOrderExpiration): Uint8Array {
    return LimitOrderExpiration.encode(message).finish();
  },
  toProtoMsg(message: LimitOrderExpiration): LimitOrderExpirationProtoMsg {
    return {
      typeUrl: "/neutron.dex.LimitOrderExpiration",
      value: LimitOrderExpiration.encode(message).finish()
    };
  }
};