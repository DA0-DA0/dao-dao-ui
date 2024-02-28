import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * A public key used to verify message signatures
 * @param attester ECDSA uncompressed public key, hex encoded
 */
export interface Attester {
  attester: string;
}
export interface AttesterProtoMsg {
  typeUrl: "/circle.cctp.v1.Attester";
  value: Uint8Array;
}
/**
 * A public key used to verify message signatures
 * @param attester ECDSA uncompressed public key, hex encoded
 */
export interface AttesterAmino {
  attester?: string;
}
export interface AttesterAminoMsg {
  type: "/circle.cctp.v1.Attester";
  value: AttesterAmino;
}
/**
 * A public key used to verify message signatures
 * @param attester ECDSA uncompressed public key, hex encoded
 */
export interface AttesterSDKType {
  attester: string;
}
function createBaseAttester(): Attester {
  return {
    attester: ""
  };
}
export const Attester = {
  typeUrl: "/circle.cctp.v1.Attester",
  encode(message: Attester, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.attester !== "") {
      writer.uint32(10).string(message.attester);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Attester {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttester();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attester = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Attester>): Attester {
    const message = createBaseAttester();
    message.attester = object.attester ?? "";
    return message;
  },
  fromAmino(object: AttesterAmino): Attester {
    const message = createBaseAttester();
    if (object.attester !== undefined && object.attester !== null) {
      message.attester = object.attester;
    }
    return message;
  },
  toAmino(message: Attester, useInterfaces: boolean = false): AttesterAmino {
    const obj: any = {};
    obj.attester = message.attester;
    return obj;
  },
  fromAminoMsg(object: AttesterAminoMsg): Attester {
    return Attester.fromAmino(object.value);
  },
  fromProtoMsg(message: AttesterProtoMsg, useInterfaces: boolean = false): Attester {
    return Attester.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Attester): Uint8Array {
    return Attester.encode(message).finish();
  },
  toProtoMsg(message: Attester): AttesterProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.Attester",
      value: Attester.encode(message).finish()
    };
  }
};