import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
export interface BalanceBorrowed {
  usdAmount: string;
  percentage: string;
}
export interface BalanceBorrowedProtoMsg {
  typeUrl: "/elys.stablestake.BalanceBorrowed";
  value: Uint8Array;
}
export interface BalanceBorrowedAmino {
  usd_amount?: string;
  percentage?: string;
}
export interface BalanceBorrowedAminoMsg {
  type: "/elys.stablestake.BalanceBorrowed";
  value: BalanceBorrowedAmino;
}
export interface BalanceBorrowedSDKType {
  usd_amount: string;
  percentage: string;
}
export interface InterestBlock {
  interestRate: string;
  blockTime: bigint;
  blockHeight: bigint;
  poolId: bigint;
}
export interface InterestBlockProtoMsg {
  typeUrl: "/elys.stablestake.InterestBlock";
  value: Uint8Array;
}
export interface InterestBlockAmino {
  interest_rate?: string;
  block_time?: string;
  block_height?: string;
  pool_id?: string;
}
export interface InterestBlockAminoMsg {
  type: "/elys.stablestake.InterestBlock";
  value: InterestBlockAmino;
}
export interface InterestBlockSDKType {
  interest_rate: string;
  block_time: bigint;
  block_height: bigint;
  pool_id: bigint;
}
function createBaseBalanceBorrowed(): BalanceBorrowed {
  return {
    usdAmount: "",
    percentage: ""
  };
}
export const BalanceBorrowed = {
  typeUrl: "/elys.stablestake.BalanceBorrowed",
  encode(message: BalanceBorrowed, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.usdAmount !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.usdAmount, 18).atomics);
    }
    if (message.percentage !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.percentage, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BalanceBorrowed {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBalanceBorrowed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.usdAmount = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.percentage = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BalanceBorrowed>): BalanceBorrowed {
    const message = createBaseBalanceBorrowed();
    message.usdAmount = object.usdAmount ?? "";
    message.percentage = object.percentage ?? "";
    return message;
  },
  fromAmino(object: BalanceBorrowedAmino): BalanceBorrowed {
    const message = createBaseBalanceBorrowed();
    if (object.usd_amount !== undefined && object.usd_amount !== null) {
      message.usdAmount = object.usd_amount;
    }
    if (object.percentage !== undefined && object.percentage !== null) {
      message.percentage = object.percentage;
    }
    return message;
  },
  toAmino(message: BalanceBorrowed, useInterfaces: boolean = false): BalanceBorrowedAmino {
    const obj: any = {};
    obj.usd_amount = message.usdAmount === "" ? undefined : message.usdAmount;
    obj.percentage = message.percentage === "" ? undefined : message.percentage;
    return obj;
  },
  fromAminoMsg(object: BalanceBorrowedAminoMsg): BalanceBorrowed {
    return BalanceBorrowed.fromAmino(object.value);
  },
  fromProtoMsg(message: BalanceBorrowedProtoMsg, useInterfaces: boolean = false): BalanceBorrowed {
    return BalanceBorrowed.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BalanceBorrowed): Uint8Array {
    return BalanceBorrowed.encode(message).finish();
  },
  toProtoMsg(message: BalanceBorrowed): BalanceBorrowedProtoMsg {
    return {
      typeUrl: "/elys.stablestake.BalanceBorrowed",
      value: BalanceBorrowed.encode(message).finish()
    };
  }
};
function createBaseInterestBlock(): InterestBlock {
  return {
    interestRate: "",
    blockTime: BigInt(0),
    blockHeight: BigInt(0),
    poolId: BigInt(0)
  };
}
export const InterestBlock = {
  typeUrl: "/elys.stablestake.InterestBlock",
  encode(message: InterestBlock, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.interestRate !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.interestRate, 18).atomics);
    }
    if (message.blockTime !== BigInt(0)) {
      writer.uint32(16).int64(message.blockTime);
    }
    if (message.blockHeight !== BigInt(0)) {
      writer.uint32(24).uint64(message.blockHeight);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(32).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): InterestBlock {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInterestBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interestRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.blockTime = reader.int64();
          break;
        case 3:
          message.blockHeight = reader.uint64();
          break;
        case 4:
          message.poolId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<InterestBlock>): InterestBlock {
    const message = createBaseInterestBlock();
    message.interestRate = object.interestRate ?? "";
    message.blockTime = object.blockTime !== undefined && object.blockTime !== null ? BigInt(object.blockTime.toString()) : BigInt(0);
    message.blockHeight = object.blockHeight !== undefined && object.blockHeight !== null ? BigInt(object.blockHeight.toString()) : BigInt(0);
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: InterestBlockAmino): InterestBlock {
    const message = createBaseInterestBlock();
    if (object.interest_rate !== undefined && object.interest_rate !== null) {
      message.interestRate = object.interest_rate;
    }
    if (object.block_time !== undefined && object.block_time !== null) {
      message.blockTime = BigInt(object.block_time);
    }
    if (object.block_height !== undefined && object.block_height !== null) {
      message.blockHeight = BigInt(object.block_height);
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: InterestBlock, useInterfaces: boolean = false): InterestBlockAmino {
    const obj: any = {};
    obj.interest_rate = message.interestRate === "" ? undefined : message.interestRate;
    obj.block_time = message.blockTime !== BigInt(0) ? message.blockTime.toString() : undefined;
    obj.block_height = message.blockHeight !== BigInt(0) ? message.blockHeight.toString() : undefined;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: InterestBlockAminoMsg): InterestBlock {
    return InterestBlock.fromAmino(object.value);
  },
  fromProtoMsg(message: InterestBlockProtoMsg, useInterfaces: boolean = false): InterestBlock {
    return InterestBlock.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: InterestBlock): Uint8Array {
    return InterestBlock.encode(message).finish();
  },
  toProtoMsg(message: InterestBlock): InterestBlockProtoMsg {
    return {
      typeUrl: "/elys.stablestake.InterestBlock",
      value: InterestBlock.encode(message).finish()
    };
  }
};