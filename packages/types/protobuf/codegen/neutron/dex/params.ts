import { BinaryReader, BinaryWriter } from "../../binary";
/** Params defines the parameters for the module. */
export interface Params {
  feeTiers: bigint[];
  paused: boolean;
  maxJitsPerBlock: bigint;
  goodTilPurgeAllowance: bigint;
  /**
   * Whitelisted_lps have special LP privileges;
   * currently, the only such privilege is depositing outside of the allowed fee_tiers.
   */
  whitelistedLps: string[];
}
export interface ParamsProtoMsg {
  typeUrl: "/neutron.dex.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  fee_tiers?: string[];
  paused: boolean;
  max_jits_per_block?: string;
  good_til_purge_allowance?: string;
  /**
   * Whitelisted_lps have special LP privileges;
   * currently, the only such privilege is depositing outside of the allowed fee_tiers.
   */
  whitelisted_lps: string[];
}
export interface ParamsAminoMsg {
  type: "/neutron.dex.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  fee_tiers: bigint[];
  paused: boolean;
  max_jits_per_block: bigint;
  good_til_purge_allowance: bigint;
  whitelisted_lps: string[];
}
function createBaseParams(): Params {
  return {
    feeTiers: [],
    paused: false,
    maxJitsPerBlock: BigInt(0),
    goodTilPurgeAllowance: BigInt(0),
    whitelistedLps: []
  };
}
export const Params = {
  typeUrl: "/neutron.dex.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    writer.uint32(10).fork();
    for (const v of message.feeTiers) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.paused === true) {
      writer.uint32(24).bool(message.paused);
    }
    if (message.maxJitsPerBlock !== BigInt(0)) {
      writer.uint32(32).uint64(message.maxJitsPerBlock);
    }
    if (message.goodTilPurgeAllowance !== BigInt(0)) {
      writer.uint32(40).uint64(message.goodTilPurgeAllowance);
    }
    for (const v of message.whitelistedLps) {
      writer.uint32(50).string(v!);
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
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.feeTiers.push(reader.uint64());
            }
          } else {
            message.feeTiers.push(reader.uint64());
          }
          break;
        case 3:
          message.paused = reader.bool();
          break;
        case 4:
          message.maxJitsPerBlock = reader.uint64();
          break;
        case 5:
          message.goodTilPurgeAllowance = reader.uint64();
          break;
        case 6:
          message.whitelistedLps.push(reader.string());
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
    message.feeTiers = object.feeTiers?.map(e => BigInt(e.toString())) || [];
    message.paused = object.paused ?? false;
    message.maxJitsPerBlock = object.maxJitsPerBlock !== undefined && object.maxJitsPerBlock !== null ? BigInt(object.maxJitsPerBlock.toString()) : BigInt(0);
    message.goodTilPurgeAllowance = object.goodTilPurgeAllowance !== undefined && object.goodTilPurgeAllowance !== null ? BigInt(object.goodTilPurgeAllowance.toString()) : BigInt(0);
    message.whitelistedLps = object.whitelistedLps?.map(e => e) || [];
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    message.feeTiers = object.fee_tiers?.map(e => BigInt(e)) || [];
    if (object.paused !== undefined && object.paused !== null) {
      message.paused = object.paused;
    }
    if (object.max_jits_per_block !== undefined && object.max_jits_per_block !== null) {
      message.maxJitsPerBlock = BigInt(object.max_jits_per_block);
    }
    if (object.good_til_purge_allowance !== undefined && object.good_til_purge_allowance !== null) {
      message.goodTilPurgeAllowance = BigInt(object.good_til_purge_allowance);
    }
    message.whitelistedLps = object.whitelisted_lps?.map(e => e) || [];
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    if (message.feeTiers) {
      obj.fee_tiers = message.feeTiers.map(e => e.toString());
    } else {
      obj.fee_tiers = message.feeTiers;
    }
    obj.paused = message.paused ?? false;
    obj.max_jits_per_block = message.maxJitsPerBlock !== BigInt(0) ? message.maxJitsPerBlock.toString() : undefined;
    obj.good_til_purge_allowance = message.goodTilPurgeAllowance !== BigInt(0) ? message.goodTilPurgeAllowance.toString() : undefined;
    if (message.whitelistedLps) {
      obj.whitelisted_lps = message.whitelistedLps.map(e => e);
    } else {
      obj.whitelisted_lps = message.whitelistedLps;
    }
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
      typeUrl: "/neutron.dex.Params",
      value: Params.encode(message).finish()
    };
  }
};