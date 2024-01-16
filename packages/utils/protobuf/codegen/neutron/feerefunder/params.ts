import { Fee, FeeAmino, FeeSDKType } from "./fee";
import { BinaryReader, BinaryWriter } from "../../binary";
/** Params defines the parameters for the module. */
export interface Params {
  minFee: Fee | undefined;
}
export interface ParamsProtoMsg {
  typeUrl: "/neutron.feerefunder.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  min_fee?: FeeAmino | undefined;
}
export interface ParamsAminoMsg {
  type: "/neutron.feerefunder.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  min_fee: FeeSDKType | undefined;
}
function createBaseParams(): Params {
  return {
    minFee: Fee.fromPartial({})
  };
}
export const Params = {
  typeUrl: "/neutron.feerefunder.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.minFee !== undefined) {
      Fee.encode(message.minFee, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.minFee = Fee.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.minFee = object.minFee !== undefined && object.minFee !== null ? Fee.fromPartial(object.minFee) : undefined;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.min_fee !== undefined && object.min_fee !== null) {
      message.minFee = Fee.fromAmino(object.min_fee);
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.min_fee = message.minFee ? Fee.toAmino(message.minFee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg, useInterfaces: boolean = false): Params {
    return Params.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/neutron.feerefunder.Params",
      value: Params.encode(message).finish()
    };
  }
};