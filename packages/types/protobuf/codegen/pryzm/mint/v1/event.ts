import { Minter, MinterAmino, MinterSDKType } from "./minter";
import { DistributionProportions, DistributionProportionsAmino, DistributionProportionsSDKType, Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface EventMint {
  minter: Minter | undefined;
  bondedRatio: string;
  totalMinted: string;
  distributedAmounts: DistributionProportions | undefined;
  epochNumber: bigint;
}
export interface EventMintProtoMsg {
  typeUrl: "/pryzm.mint.v1.EventMint";
  value: Uint8Array;
}
export interface EventMintAmino {
  minter?: MinterAmino | undefined;
  bonded_ratio?: string;
  total_minted?: string;
  distributed_amounts?: DistributionProportionsAmino | undefined;
  epoch_number?: string;
}
export interface EventMintAminoMsg {
  type: "/pryzm.mint.v1.EventMint";
  value: EventMintAmino;
}
export interface EventMintSDKType {
  minter: MinterSDKType | undefined;
  bonded_ratio: string;
  total_minted: string;
  distributed_amounts: DistributionProportionsSDKType | undefined;
  epoch_number: bigint;
}
export interface EventSetParams {
  params: Params | undefined;
}
export interface EventSetParamsProtoMsg {
  typeUrl: "/pryzm.mint.v1.EventSetParams";
  value: Uint8Array;
}
export interface EventSetParamsAmino {
  params?: ParamsAmino | undefined;
}
export interface EventSetParamsAminoMsg {
  type: "/pryzm.mint.v1.EventSetParams";
  value: EventSetParamsAmino;
}
export interface EventSetParamsSDKType {
  params: ParamsSDKType | undefined;
}
function createBaseEventMint(): EventMint {
  return {
    minter: Minter.fromPartial({}),
    bondedRatio: "",
    totalMinted: "",
    distributedAmounts: DistributionProportions.fromPartial({}),
    epochNumber: BigInt(0)
  };
}
export const EventMint = {
  typeUrl: "/pryzm.mint.v1.EventMint",
  encode(message: EventMint, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.minter !== undefined) {
      Minter.encode(message.minter, writer.uint32(10).fork()).ldelim();
    }
    if (message.bondedRatio !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.bondedRatio, 18).atomics);
    }
    if (message.totalMinted !== "") {
      writer.uint32(26).string(message.totalMinted);
    }
    if (message.distributedAmounts !== undefined) {
      DistributionProportions.encode(message.distributedAmounts, writer.uint32(34).fork()).ldelim();
    }
    if (message.epochNumber !== BigInt(0)) {
      writer.uint32(40).int64(message.epochNumber);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventMint {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventMint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.minter = Minter.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.bondedRatio = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.totalMinted = reader.string();
          break;
        case 4:
          message.distributedAmounts = DistributionProportions.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.epochNumber = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventMint>): EventMint {
    const message = createBaseEventMint();
    message.minter = object.minter !== undefined && object.minter !== null ? Minter.fromPartial(object.minter) : undefined;
    message.bondedRatio = object.bondedRatio ?? "";
    message.totalMinted = object.totalMinted ?? "";
    message.distributedAmounts = object.distributedAmounts !== undefined && object.distributedAmounts !== null ? DistributionProportions.fromPartial(object.distributedAmounts) : undefined;
    message.epochNumber = object.epochNumber !== undefined && object.epochNumber !== null ? BigInt(object.epochNumber.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventMintAmino): EventMint {
    const message = createBaseEventMint();
    if (object.minter !== undefined && object.minter !== null) {
      message.minter = Minter.fromAmino(object.minter);
    }
    if (object.bonded_ratio !== undefined && object.bonded_ratio !== null) {
      message.bondedRatio = object.bonded_ratio;
    }
    if (object.total_minted !== undefined && object.total_minted !== null) {
      message.totalMinted = object.total_minted;
    }
    if (object.distributed_amounts !== undefined && object.distributed_amounts !== null) {
      message.distributedAmounts = DistributionProportions.fromAmino(object.distributed_amounts);
    }
    if (object.epoch_number !== undefined && object.epoch_number !== null) {
      message.epochNumber = BigInt(object.epoch_number);
    }
    return message;
  },
  toAmino(message: EventMint, useInterfaces: boolean = false): EventMintAmino {
    const obj: any = {};
    obj.minter = message.minter ? Minter.toAmino(message.minter, useInterfaces) : undefined;
    obj.bonded_ratio = message.bondedRatio === "" ? undefined : message.bondedRatio;
    obj.total_minted = message.totalMinted === "" ? undefined : message.totalMinted;
    obj.distributed_amounts = message.distributedAmounts ? DistributionProportions.toAmino(message.distributedAmounts, useInterfaces) : undefined;
    obj.epoch_number = message.epochNumber !== BigInt(0) ? message.epochNumber.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventMintAminoMsg): EventMint {
    return EventMint.fromAmino(object.value);
  },
  fromProtoMsg(message: EventMintProtoMsg, useInterfaces: boolean = false): EventMint {
    return EventMint.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventMint): Uint8Array {
    return EventMint.encode(message).finish();
  },
  toProtoMsg(message: EventMint): EventMintProtoMsg {
    return {
      typeUrl: "/pryzm.mint.v1.EventMint",
      value: EventMint.encode(message).finish()
    };
  }
};
function createBaseEventSetParams(): EventSetParams {
  return {
    params: Params.fromPartial({})
  };
}
export const EventSetParams = {
  typeUrl: "/pryzm.mint.v1.EventSetParams",
  encode(message: EventSetParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetParams>): EventSetParams {
    const message = createBaseEventSetParams();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: EventSetParamsAmino): EventSetParams {
    const message = createBaseEventSetParams();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: EventSetParams, useInterfaces: boolean = false): EventSetParamsAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetParamsAminoMsg): EventSetParams {
    return EventSetParams.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetParamsProtoMsg, useInterfaces: boolean = false): EventSetParams {
    return EventSetParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetParams): Uint8Array {
    return EventSetParams.encode(message).finish();
  },
  toProtoMsg(message: EventSetParams): EventSetParamsProtoMsg {
    return {
      typeUrl: "/pryzm.mint.v1.EventSetParams",
      value: EventSetParams.encode(message).finish()
    };
  }
};