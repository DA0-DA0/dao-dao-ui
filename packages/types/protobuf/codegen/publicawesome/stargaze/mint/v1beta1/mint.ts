import { Timestamp } from "../../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { Decimal } from "@cosmjs/math";
import { toTimestamp, fromTimestamp } from "../../../../helpers";
/** Minter represents the minting state. */
export interface Minter {
  /** current annual expected provisions */
  annualProvisions: string;
}
export interface MinterProtoMsg {
  typeUrl: "/publicawesome.stargaze.mint.v1beta1.Minter";
  value: Uint8Array;
}
/** Minter represents the minting state. */
export interface MinterAmino {
  /** current annual expected provisions */
  annual_provisions?: string;
}
export interface MinterAminoMsg {
  type: "/publicawesome.stargaze.mint.v1beta1.Minter";
  value: MinterAmino;
}
/** Minter represents the minting state. */
export interface MinterSDKType {
  annual_provisions: string;
}
/** Params holds parameters for the mint module. */
export interface Params {
  /** type of coin to mint */
  mintDenom: string;
  /** the time the chain starts */
  startTime: Date | undefined;
  /** initial annual provisions */
  initialAnnualProvisions: string;
  /** factor to reduce inflation by each year */
  reductionFactor: string;
  /** expected blocks per year */
  blocksPerYear: bigint;
}
export interface ParamsProtoMsg {
  typeUrl: "/publicawesome.stargaze.mint.v1beta1.Params";
  value: Uint8Array;
}
/** Params holds parameters for the mint module. */
export interface ParamsAmino {
  /** type of coin to mint */
  mint_denom?: string;
  /** the time the chain starts */
  start_time?: string | undefined;
  /** initial annual provisions */
  initial_annual_provisions?: string;
  /** factor to reduce inflation by each year */
  reduction_factor?: string;
  /** expected blocks per year */
  blocks_per_year?: string;
}
export interface ParamsAminoMsg {
  type: "/publicawesome.stargaze.mint.v1beta1.Params";
  value: ParamsAmino;
}
/** Params holds parameters for the mint module. */
export interface ParamsSDKType {
  mint_denom: string;
  start_time: Date | undefined;
  initial_annual_provisions: string;
  reduction_factor: string;
  blocks_per_year: bigint;
}
function createBaseMinter(): Minter {
  return {
    annualProvisions: ""
  };
}
export const Minter = {
  typeUrl: "/publicawesome.stargaze.mint.v1beta1.Minter",
  encode(message: Minter, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.annualProvisions !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.annualProvisions, 18).atomics);
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
    message.annualProvisions = object.annualProvisions ?? "";
    return message;
  },
  fromAmino(object: MinterAmino): Minter {
    const message = createBaseMinter();
    if (object.annual_provisions !== undefined && object.annual_provisions !== null) {
      message.annualProvisions = object.annual_provisions;
    }
    return message;
  },
  toAmino(message: Minter, useInterfaces: boolean = false): MinterAmino {
    const obj: any = {};
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
      typeUrl: "/publicawesome.stargaze.mint.v1beta1.Minter",
      value: Minter.encode(message).finish()
    };
  }
};
function createBaseParams(): Params {
  return {
    mintDenom: "",
    startTime: new Date(),
    initialAnnualProvisions: "",
    reductionFactor: "",
    blocksPerYear: BigInt(0)
  };
}
export const Params = {
  typeUrl: "/publicawesome.stargaze.mint.v1beta1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.mintDenom !== "") {
      writer.uint32(10).string(message.mintDenom);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.initialAnnualProvisions !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.initialAnnualProvisions, 18).atomics);
    }
    if (message.reductionFactor !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.reductionFactor, 18).atomics);
    }
    if (message.blocksPerYear !== BigInt(0)) {
      writer.uint32(40).uint64(message.blocksPerYear);
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
          message.mintDenom = reader.string();
          break;
        case 2:
          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.initialAnnualProvisions = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.reductionFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.blocksPerYear = reader.uint64();
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
    message.mintDenom = object.mintDenom ?? "";
    message.startTime = object.startTime ?? undefined;
    message.initialAnnualProvisions = object.initialAnnualProvisions ?? "";
    message.reductionFactor = object.reductionFactor ?? "";
    message.blocksPerYear = object.blocksPerYear !== undefined && object.blocksPerYear !== null ? BigInt(object.blocksPerYear.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.mint_denom !== undefined && object.mint_denom !== null) {
      message.mintDenom = object.mint_denom;
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.startTime = fromTimestamp(Timestamp.fromAmino(object.start_time));
    }
    if (object.initial_annual_provisions !== undefined && object.initial_annual_provisions !== null) {
      message.initialAnnualProvisions = object.initial_annual_provisions;
    }
    if (object.reduction_factor !== undefined && object.reduction_factor !== null) {
      message.reductionFactor = object.reduction_factor;
    }
    if (object.blocks_per_year !== undefined && object.blocks_per_year !== null) {
      message.blocksPerYear = BigInt(object.blocks_per_year);
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.mint_denom = message.mintDenom === "" ? undefined : message.mintDenom;
    obj.start_time = message.startTime ? Timestamp.toAmino(toTimestamp(message.startTime)) : undefined;
    obj.initial_annual_provisions = message.initialAnnualProvisions === "" ? undefined : message.initialAnnualProvisions;
    obj.reduction_factor = message.reductionFactor === "" ? undefined : message.reductionFactor;
    obj.blocks_per_year = message.blocksPerYear !== BigInt(0) ? message.blocksPerYear.toString() : undefined;
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
      typeUrl: "/publicawesome.stargaze.mint.v1beta1.Params",
      value: Params.encode(message).finish()
    };
  }
};