import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
/** ExternalIncentive defines the external incentives. */
export interface ExternalIncentive {
  id: bigint;
  rewardDenom: string;
  poolId: bigint;
  fromBlock: bigint;
  toBlock: bigint;
  amountPerBlock: string;
  apr: string;
}
export interface ExternalIncentiveProtoMsg {
  typeUrl: "/elys.masterchef.ExternalIncentive";
  value: Uint8Array;
}
/** ExternalIncentive defines the external incentives. */
export interface ExternalIncentiveAmino {
  id?: string;
  reward_denom?: string;
  pool_id?: string;
  from_block?: string;
  to_block?: string;
  amount_per_block?: string;
  apr?: string;
}
export interface ExternalIncentiveAminoMsg {
  type: "/elys.masterchef.ExternalIncentive";
  value: ExternalIncentiveAmino;
}
/** ExternalIncentive defines the external incentives. */
export interface ExternalIncentiveSDKType {
  id: bigint;
  reward_denom: string;
  pool_id: bigint;
  from_block: bigint;
  to_block: bigint;
  amount_per_block: string;
  apr: string;
}
function createBaseExternalIncentive(): ExternalIncentive {
  return {
    id: BigInt(0),
    rewardDenom: "",
    poolId: BigInt(0),
    fromBlock: BigInt(0),
    toBlock: BigInt(0),
    amountPerBlock: "",
    apr: ""
  };
}
export const ExternalIncentive = {
  typeUrl: "/elys.masterchef.ExternalIncentive",
  encode(message: ExternalIncentive, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.rewardDenom !== "") {
      writer.uint32(18).string(message.rewardDenom);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(24).uint64(message.poolId);
    }
    if (message.fromBlock !== BigInt(0)) {
      writer.uint32(32).int64(message.fromBlock);
    }
    if (message.toBlock !== BigInt(0)) {
      writer.uint32(40).int64(message.toBlock);
    }
    if (message.amountPerBlock !== "") {
      writer.uint32(50).string(message.amountPerBlock);
    }
    if (message.apr !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.apr, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ExternalIncentive {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExternalIncentive();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.rewardDenom = reader.string();
          break;
        case 3:
          message.poolId = reader.uint64();
          break;
        case 4:
          message.fromBlock = reader.int64();
          break;
        case 5:
          message.toBlock = reader.int64();
          break;
        case 6:
          message.amountPerBlock = reader.string();
          break;
        case 7:
          message.apr = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ExternalIncentive>): ExternalIncentive {
    const message = createBaseExternalIncentive();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.rewardDenom = object.rewardDenom ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.fromBlock = object.fromBlock !== undefined && object.fromBlock !== null ? BigInt(object.fromBlock.toString()) : BigInt(0);
    message.toBlock = object.toBlock !== undefined && object.toBlock !== null ? BigInt(object.toBlock.toString()) : BigInt(0);
    message.amountPerBlock = object.amountPerBlock ?? "";
    message.apr = object.apr ?? "";
    return message;
  },
  fromAmino(object: ExternalIncentiveAmino): ExternalIncentive {
    const message = createBaseExternalIncentive();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.reward_denom !== undefined && object.reward_denom !== null) {
      message.rewardDenom = object.reward_denom;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.from_block !== undefined && object.from_block !== null) {
      message.fromBlock = BigInt(object.from_block);
    }
    if (object.to_block !== undefined && object.to_block !== null) {
      message.toBlock = BigInt(object.to_block);
    }
    if (object.amount_per_block !== undefined && object.amount_per_block !== null) {
      message.amountPerBlock = object.amount_per_block;
    }
    if (object.apr !== undefined && object.apr !== null) {
      message.apr = object.apr;
    }
    return message;
  },
  toAmino(message: ExternalIncentive, useInterfaces: boolean = false): ExternalIncentiveAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.reward_denom = message.rewardDenom === "" ? undefined : message.rewardDenom;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.from_block = message.fromBlock !== BigInt(0) ? message.fromBlock.toString() : undefined;
    obj.to_block = message.toBlock !== BigInt(0) ? message.toBlock.toString() : undefined;
    obj.amount_per_block = message.amountPerBlock === "" ? undefined : message.amountPerBlock;
    obj.apr = message.apr === "" ? undefined : message.apr;
    return obj;
  },
  fromAminoMsg(object: ExternalIncentiveAminoMsg): ExternalIncentive {
    return ExternalIncentive.fromAmino(object.value);
  },
  fromProtoMsg(message: ExternalIncentiveProtoMsg, useInterfaces: boolean = false): ExternalIncentive {
    return ExternalIncentive.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ExternalIncentive): Uint8Array {
    return ExternalIncentive.encode(message).finish();
  },
  toProtoMsg(message: ExternalIncentive): ExternalIncentiveProtoMsg {
    return {
      typeUrl: "/elys.masterchef.ExternalIncentive",
      value: ExternalIncentive.encode(message).finish()
    };
  }
};