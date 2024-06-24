import { BinaryReader, BinaryWriter } from "../../binary";
/** Params defines the parameters for the module. */
export interface Params {
  /** Security address that can remove schedules */
  securityAddress: string;
  /** Limit of schedules executed in one block */
  limit: bigint;
}
export interface ParamsProtoMsg {
  typeUrl: "/neutron.cron.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  /** Security address that can remove schedules */
  security_address?: string;
  /** Limit of schedules executed in one block */
  limit?: string;
}
export interface ParamsAminoMsg {
  type: "/neutron.cron.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  security_address: string;
  limit: bigint;
}
function createBaseParams(): Params {
  return {
    securityAddress: "",
    limit: BigInt(0)
  };
}
export const Params = {
  typeUrl: "/neutron.cron.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.securityAddress !== "") {
      writer.uint32(10).string(message.securityAddress);
    }
    if (message.limit !== BigInt(0)) {
      writer.uint32(16).uint64(message.limit);
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
          message.securityAddress = reader.string();
          break;
        case 2:
          message.limit = reader.uint64();
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
    message.securityAddress = object.securityAddress ?? "";
    message.limit = object.limit !== undefined && object.limit !== null ? BigInt(object.limit.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.security_address !== undefined && object.security_address !== null) {
      message.securityAddress = object.security_address;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = BigInt(object.limit);
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.security_address = message.securityAddress === "" ? undefined : message.securityAddress;
    obj.limit = message.limit !== BigInt(0) ? message.limit.toString() : undefined;
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
      typeUrl: "/neutron.cron.Params",
      value: Params.encode(message).finish()
    };
  }
};