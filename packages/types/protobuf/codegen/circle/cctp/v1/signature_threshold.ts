import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * SignatureThreshold is the minimum amount of signatures required to attest to
 * a message (the 'm' in a m/n multisig)
 * @param amount the number of signatures required
 */
export interface SignatureThreshold {
  amount: number;
}
export interface SignatureThresholdProtoMsg {
  typeUrl: "/circle.cctp.v1.SignatureThreshold";
  value: Uint8Array;
}
/**
 * SignatureThreshold is the minimum amount of signatures required to attest to
 * a message (the 'm' in a m/n multisig)
 * @param amount the number of signatures required
 */
export interface SignatureThresholdAmino {
  amount?: number;
}
export interface SignatureThresholdAminoMsg {
  type: "/circle.cctp.v1.SignatureThreshold";
  value: SignatureThresholdAmino;
}
/**
 * SignatureThreshold is the minimum amount of signatures required to attest to
 * a message (the 'm' in a m/n multisig)
 * @param amount the number of signatures required
 */
export interface SignatureThresholdSDKType {
  amount: number;
}
function createBaseSignatureThreshold(): SignatureThreshold {
  return {
    amount: 0
  };
}
export const SignatureThreshold = {
  typeUrl: "/circle.cctp.v1.SignatureThreshold",
  encode(message: SignatureThreshold, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.amount !== 0) {
      writer.uint32(8).uint32(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SignatureThreshold {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureThreshold();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SignatureThreshold>): SignatureThreshold {
    const message = createBaseSignatureThreshold();
    message.amount = object.amount ?? 0;
    return message;
  },
  fromAmino(object: SignatureThresholdAmino): SignatureThreshold {
    const message = createBaseSignatureThreshold();
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: SignatureThreshold, useInterfaces: boolean = false): SignatureThresholdAmino {
    const obj: any = {};
    obj.amount = message.amount;
    return obj;
  },
  fromAminoMsg(object: SignatureThresholdAminoMsg): SignatureThreshold {
    return SignatureThreshold.fromAmino(object.value);
  },
  fromProtoMsg(message: SignatureThresholdProtoMsg, useInterfaces: boolean = false): SignatureThreshold {
    return SignatureThreshold.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SignatureThreshold): Uint8Array {
    return SignatureThreshold.encode(message).finish();
  },
  toProtoMsg(message: SignatureThreshold): SignatureThresholdProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.SignatureThreshold",
      value: SignatureThreshold.encode(message).finish()
    };
  }
};