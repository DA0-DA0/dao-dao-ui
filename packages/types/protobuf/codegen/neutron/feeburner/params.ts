import { BinaryReader, BinaryWriter } from "../../binary";
/** Params defines the parameters for the module. */
export interface Params {
  /**
   * Defines Neutron denom, which will be burned during fee processing, any
   * other denom will be sent to Treasury
   */
  neutronDenom: string;
  /** Deprecated in v0.4.4. Is not used anymore */
  reserveAddress: string;
  /** Defines treasury address */
  treasuryAddress: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/neutron.feeburner.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  /**
   * Defines Neutron denom, which will be burned during fee processing, any
   * other denom will be sent to Treasury
   */
  neutron_denom?: string;
  /** Deprecated in v0.4.4. Is not used anymore */
  reserve_address?: string;
  /** Defines treasury address */
  treasury_address?: string;
}
export interface ParamsAminoMsg {
  type: "/neutron.feeburner.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  neutron_denom: string;
  reserve_address: string;
  treasury_address: string;
}
function createBaseParams(): Params {
  return {
    neutronDenom: "",
    reserveAddress: "",
    treasuryAddress: ""
  };
}
export const Params = {
  typeUrl: "/neutron.feeburner.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.neutronDenom !== "") {
      writer.uint32(10).string(message.neutronDenom);
    }
    if (message.reserveAddress !== "") {
      writer.uint32(18).string(message.reserveAddress);
    }
    if (message.treasuryAddress !== "") {
      writer.uint32(26).string(message.treasuryAddress);
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
          message.neutronDenom = reader.string();
          break;
        case 2:
          message.reserveAddress = reader.string();
          break;
        case 3:
          message.treasuryAddress = reader.string();
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
    message.neutronDenom = object.neutronDenom ?? "";
    message.reserveAddress = object.reserveAddress ?? "";
    message.treasuryAddress = object.treasuryAddress ?? "";
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.neutron_denom !== undefined && object.neutron_denom !== null) {
      message.neutronDenom = object.neutron_denom;
    }
    if (object.reserve_address !== undefined && object.reserve_address !== null) {
      message.reserveAddress = object.reserve_address;
    }
    if (object.treasury_address !== undefined && object.treasury_address !== null) {
      message.treasuryAddress = object.treasury_address;
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.neutron_denom = message.neutronDenom;
    obj.reserve_address = message.reserveAddress;
    obj.treasury_address = message.treasuryAddress;
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
      typeUrl: "/neutron.feeburner.Params",
      value: Params.encode(message).finish()
    };
  }
};