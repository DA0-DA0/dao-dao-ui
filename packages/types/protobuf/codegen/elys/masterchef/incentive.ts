import { BinaryReader, BinaryWriter } from "../../binary";
/** Incentive Info */
export interface LegacyIncentiveInfo {
  /** reward amount in eden for 1 year */
  edenAmountPerYear: string;
  /** starting block height of the distribution */
  distributionStartBlock: string;
  /** distribution duration - block number per year */
  totalBlocksPerYear: string;
  /** blocks distributed */
  blocksDistributed: string;
}
export interface LegacyIncentiveInfoProtoMsg {
  typeUrl: "/elys.masterchef.LegacyIncentiveInfo";
  value: Uint8Array;
}
/** Incentive Info */
export interface LegacyIncentiveInfoAmino {
  /** reward amount in eden for 1 year */
  eden_amount_per_year?: string;
  /** starting block height of the distribution */
  distribution_start_block?: string;
  /** distribution duration - block number per year */
  total_blocks_per_year?: string;
  /** blocks distributed */
  blocks_distributed?: string;
}
export interface LegacyIncentiveInfoAminoMsg {
  type: "/elys.masterchef.LegacyIncentiveInfo";
  value: LegacyIncentiveInfoAmino;
}
/** Incentive Info */
export interface LegacyIncentiveInfoSDKType {
  eden_amount_per_year: string;
  distribution_start_block: string;
  total_blocks_per_year: string;
  blocks_distributed: string;
}
export interface IncentiveInfo {
  /** reward amount in eden for 1 year */
  edenAmountPerYear: string;
  /** blocks distributed */
  blocksDistributed: bigint;
}
export interface IncentiveInfoProtoMsg {
  typeUrl: "/elys.masterchef.IncentiveInfo";
  value: Uint8Array;
}
export interface IncentiveInfoAmino {
  /** reward amount in eden for 1 year */
  eden_amount_per_year?: string;
  /** blocks distributed */
  blocks_distributed?: string;
}
export interface IncentiveInfoAminoMsg {
  type: "/elys.masterchef.IncentiveInfo";
  value: IncentiveInfoAmino;
}
export interface IncentiveInfoSDKType {
  eden_amount_per_year: string;
  blocks_distributed: bigint;
}
function createBaseLegacyIncentiveInfo(): LegacyIncentiveInfo {
  return {
    edenAmountPerYear: "",
    distributionStartBlock: "",
    totalBlocksPerYear: "",
    blocksDistributed: ""
  };
}
export const LegacyIncentiveInfo = {
  typeUrl: "/elys.masterchef.LegacyIncentiveInfo",
  encode(message: LegacyIncentiveInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.edenAmountPerYear !== "") {
      writer.uint32(10).string(message.edenAmountPerYear);
    }
    if (message.distributionStartBlock !== "") {
      writer.uint32(18).string(message.distributionStartBlock);
    }
    if (message.totalBlocksPerYear !== "") {
      writer.uint32(26).string(message.totalBlocksPerYear);
    }
    if (message.blocksDistributed !== "") {
      writer.uint32(34).string(message.blocksDistributed);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LegacyIncentiveInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyIncentiveInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.edenAmountPerYear = reader.string();
          break;
        case 2:
          message.distributionStartBlock = reader.string();
          break;
        case 3:
          message.totalBlocksPerYear = reader.string();
          break;
        case 4:
          message.blocksDistributed = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LegacyIncentiveInfo>): LegacyIncentiveInfo {
    const message = createBaseLegacyIncentiveInfo();
    message.edenAmountPerYear = object.edenAmountPerYear ?? "";
    message.distributionStartBlock = object.distributionStartBlock ?? "";
    message.totalBlocksPerYear = object.totalBlocksPerYear ?? "";
    message.blocksDistributed = object.blocksDistributed ?? "";
    return message;
  },
  fromAmino(object: LegacyIncentiveInfoAmino): LegacyIncentiveInfo {
    const message = createBaseLegacyIncentiveInfo();
    if (object.eden_amount_per_year !== undefined && object.eden_amount_per_year !== null) {
      message.edenAmountPerYear = object.eden_amount_per_year;
    }
    if (object.distribution_start_block !== undefined && object.distribution_start_block !== null) {
      message.distributionStartBlock = object.distribution_start_block;
    }
    if (object.total_blocks_per_year !== undefined && object.total_blocks_per_year !== null) {
      message.totalBlocksPerYear = object.total_blocks_per_year;
    }
    if (object.blocks_distributed !== undefined && object.blocks_distributed !== null) {
      message.blocksDistributed = object.blocks_distributed;
    }
    return message;
  },
  toAmino(message: LegacyIncentiveInfo, useInterfaces: boolean = false): LegacyIncentiveInfoAmino {
    const obj: any = {};
    obj.eden_amount_per_year = message.edenAmountPerYear === "" ? undefined : message.edenAmountPerYear;
    obj.distribution_start_block = message.distributionStartBlock === "" ? undefined : message.distributionStartBlock;
    obj.total_blocks_per_year = message.totalBlocksPerYear === "" ? undefined : message.totalBlocksPerYear;
    obj.blocks_distributed = message.blocksDistributed === "" ? undefined : message.blocksDistributed;
    return obj;
  },
  fromAminoMsg(object: LegacyIncentiveInfoAminoMsg): LegacyIncentiveInfo {
    return LegacyIncentiveInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: LegacyIncentiveInfoProtoMsg, useInterfaces: boolean = false): LegacyIncentiveInfo {
    return LegacyIncentiveInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LegacyIncentiveInfo): Uint8Array {
    return LegacyIncentiveInfo.encode(message).finish();
  },
  toProtoMsg(message: LegacyIncentiveInfo): LegacyIncentiveInfoProtoMsg {
    return {
      typeUrl: "/elys.masterchef.LegacyIncentiveInfo",
      value: LegacyIncentiveInfo.encode(message).finish()
    };
  }
};
function createBaseIncentiveInfo(): IncentiveInfo {
  return {
    edenAmountPerYear: "",
    blocksDistributed: BigInt(0)
  };
}
export const IncentiveInfo = {
  typeUrl: "/elys.masterchef.IncentiveInfo",
  encode(message: IncentiveInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.edenAmountPerYear !== "") {
      writer.uint32(10).string(message.edenAmountPerYear);
    }
    if (message.blocksDistributed !== BigInt(0)) {
      writer.uint32(16).int64(message.blocksDistributed);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): IncentiveInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncentiveInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.edenAmountPerYear = reader.string();
          break;
        case 2:
          message.blocksDistributed = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<IncentiveInfo>): IncentiveInfo {
    const message = createBaseIncentiveInfo();
    message.edenAmountPerYear = object.edenAmountPerYear ?? "";
    message.blocksDistributed = object.blocksDistributed !== undefined && object.blocksDistributed !== null ? BigInt(object.blocksDistributed.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: IncentiveInfoAmino): IncentiveInfo {
    const message = createBaseIncentiveInfo();
    if (object.eden_amount_per_year !== undefined && object.eden_amount_per_year !== null) {
      message.edenAmountPerYear = object.eden_amount_per_year;
    }
    if (object.blocks_distributed !== undefined && object.blocks_distributed !== null) {
      message.blocksDistributed = BigInt(object.blocks_distributed);
    }
    return message;
  },
  toAmino(message: IncentiveInfo, useInterfaces: boolean = false): IncentiveInfoAmino {
    const obj: any = {};
    obj.eden_amount_per_year = message.edenAmountPerYear === "" ? undefined : message.edenAmountPerYear;
    obj.blocks_distributed = message.blocksDistributed !== BigInt(0) ? message.blocksDistributed.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: IncentiveInfoAminoMsg): IncentiveInfo {
    return IncentiveInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: IncentiveInfoProtoMsg, useInterfaces: boolean = false): IncentiveInfo {
    return IncentiveInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: IncentiveInfo): Uint8Array {
    return IncentiveInfo.encode(message).finish();
  },
  toProtoMsg(message: IncentiveInfo): IncentiveInfoProtoMsg {
    return {
      typeUrl: "/elys.masterchef.IncentiveInfo",
      value: IncentiveInfo.encode(message).finish()
    };
  }
};