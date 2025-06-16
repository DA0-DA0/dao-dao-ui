import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** Minter represents the minting state. */
export interface Minter {
  inflation: string;
  /** current annual expected provisions */
  annualProvisions: string;
}
export interface MinterProtoMsg {
  typeUrl: "/pryzm.mint.v1.Minter";
  value: Uint8Array;
}
/** Minter represents the minting state. */
export interface MinterAmino {
  inflation?: string;
  /** current annual expected provisions */
  annual_provisions?: string;
}
export interface MinterAminoMsg {
  type: "/pryzm.mint.v1.Minter";
  value: MinterAmino;
}
/** Minter represents the minting state. */
export interface MinterSDKType {
  inflation: string;
  annual_provisions: string;
}
function createBaseMinter(): Minter {
  return {
    inflation: "",
    annualProvisions: ""
  };
}
export const Minter = {
  typeUrl: "/pryzm.mint.v1.Minter",
  encode(message: Minter, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.inflation !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.inflation, 18).atomics);
    }
    if (message.annualProvisions !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.annualProvisions, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Minter {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMinter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inflation = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.annualProvisions = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Minter>): Minter {
    const message = createBaseMinter();
    message.inflation = object.inflation ?? "";
    message.annualProvisions = object.annualProvisions ?? "";
    return message;
  },
  fromAmino(object: MinterAmino): Minter {
    const message = createBaseMinter();
    if (object.inflation !== undefined && object.inflation !== null) {
      message.inflation = object.inflation;
    }
    if (object.annual_provisions !== undefined && object.annual_provisions !== null) {
      message.annualProvisions = object.annual_provisions;
    }
    return message;
  },
  toAmino(message: Minter, useInterfaces: boolean = false): MinterAmino {
    const obj: any = {};
    obj.inflation = message.inflation === "" ? undefined : message.inflation;
    obj.annual_provisions = message.annualProvisions === "" ? undefined : message.annualProvisions;
    return obj;
  },
  fromAminoMsg(object: MinterAminoMsg): Minter {
    return Minter.fromAmino(object.value);
  },
  fromProtoMsg(message: MinterProtoMsg, useInterfaces: boolean = false): Minter {
    return Minter.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Minter): Uint8Array {
    return Minter.encode(message).finish();
  },
  toProtoMsg(message: Minter): MinterProtoMsg {
    return {
      typeUrl: "/pryzm.mint.v1.Minter",
      value: Minter.encode(message).finish()
    };
  }
};