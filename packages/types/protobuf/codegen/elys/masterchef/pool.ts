import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
export interface PoolInfo {
  poolId: bigint;
  /** reward wallet address */
  rewardWallet: string;
  /** multiplier for lp rewards */
  multiplier: string;
  /** Eden APR, updated at every distribution */
  edenApr: string;
  /** Dex APR, updated based on 24hr accumulation */
  dexApr: string;
  /** Gas APR, updated based on 24hr accumulation */
  gasApr: string;
  /** External Incentive APR, updated at every distribution */
  externalIncentiveApr: string;
  /** external reward denoms on the pool */
  externalRewardDenoms: string[];
  /** Enable or disable eden rewards */
  enableEdenRewards: boolean;
}
export interface PoolInfoProtoMsg {
  typeUrl: "/elys.masterchef.PoolInfo";
  value: Uint8Array;
}
export interface PoolInfoAmino {
  pool_id?: string;
  /** reward wallet address */
  reward_wallet?: string;
  /** multiplier for lp rewards */
  multiplier?: string;
  /** Eden APR, updated at every distribution */
  eden_apr?: string;
  /** Dex APR, updated based on 24hr accumulation */
  dex_apr?: string;
  /** Gas APR, updated based on 24hr accumulation */
  gas_apr?: string;
  /** External Incentive APR, updated at every distribution */
  external_incentive_apr?: string;
  /** external reward denoms on the pool */
  external_reward_denoms?: string[];
  /** Enable or disable eden rewards */
  enable_eden_rewards?: boolean;
}
export interface PoolInfoAminoMsg {
  type: "/elys.masterchef.PoolInfo";
  value: PoolInfoAmino;
}
export interface PoolInfoSDKType {
  pool_id: bigint;
  reward_wallet: string;
  multiplier: string;
  eden_apr: string;
  dex_apr: string;
  gas_apr: string;
  external_incentive_apr: string;
  external_reward_denoms: string[];
  enable_eden_rewards: boolean;
}
export interface LegacyPoolInfo {
  poolId: bigint;
  /** reward wallet address */
  rewardWallet: string;
  /** multiplier for lp rewards */
  multiplier: string;
  /** Eden APR, updated at every distribution */
  edenApr: string;
  /** Dex APR, updated based on 24hr accumulation */
  dexApr: string;
  /** Gas APR, updated based on 24hr accumulation */
  gasApr: string;
  /** External Incentive APR, updated at every distribution */
  externalIncentiveApr: string;
  /** external reward denoms on the pool */
  externalRewardDenoms: string[];
}
export interface LegacyPoolInfoProtoMsg {
  typeUrl: "/elys.masterchef.LegacyPoolInfo";
  value: Uint8Array;
}
export interface LegacyPoolInfoAmino {
  pool_id?: string;
  /** reward wallet address */
  reward_wallet?: string;
  /** multiplier for lp rewards */
  multiplier?: string;
  /** Eden APR, updated at every distribution */
  eden_apr?: string;
  /** Dex APR, updated based on 24hr accumulation */
  dex_apr?: string;
  /** Gas APR, updated based on 24hr accumulation */
  gas_apr?: string;
  /** External Incentive APR, updated at every distribution */
  external_incentive_apr?: string;
  /** external reward denoms on the pool */
  external_reward_denoms?: string[];
}
export interface LegacyPoolInfoAminoMsg {
  type: "/elys.masterchef.LegacyPoolInfo";
  value: LegacyPoolInfoAmino;
}
export interface LegacyPoolInfoSDKType {
  pool_id: bigint;
  reward_wallet: string;
  multiplier: string;
  eden_apr: string;
  dex_apr: string;
  gas_apr: string;
  external_incentive_apr: string;
  external_reward_denoms: string[];
}
export interface PoolRewardInfo {
  poolId: bigint;
  rewardDenom: string;
  poolAccRewardPerShare: string;
  lastUpdatedBlock: bigint;
}
export interface PoolRewardInfoProtoMsg {
  typeUrl: "/elys.masterchef.PoolRewardInfo";
  value: Uint8Array;
}
export interface PoolRewardInfoAmino {
  pool_id?: string;
  reward_denom?: string;
  pool_acc_reward_per_share?: string;
  last_updated_block?: string;
}
export interface PoolRewardInfoAminoMsg {
  type: "/elys.masterchef.PoolRewardInfo";
  value: PoolRewardInfoAmino;
}
export interface PoolRewardInfoSDKType {
  pool_id: bigint;
  reward_denom: string;
  pool_acc_reward_per_share: string;
  last_updated_block: bigint;
}
export interface UserRewardInfo {
  user: string;
  poolId: bigint;
  rewardDenom: string;
  rewardDebt: string;
  rewardPending: string;
}
export interface UserRewardInfoProtoMsg {
  typeUrl: "/elys.masterchef.UserRewardInfo";
  value: Uint8Array;
}
export interface UserRewardInfoAmino {
  user?: string;
  pool_id?: string;
  reward_denom?: string;
  reward_debt?: string;
  reward_pending?: string;
}
export interface UserRewardInfoAminoMsg {
  type: "/elys.masterchef.UserRewardInfo";
  value: UserRewardInfoAmino;
}
export interface UserRewardInfoSDKType {
  user: string;
  pool_id: bigint;
  reward_denom: string;
  reward_debt: string;
  reward_pending: string;
}
export interface PoolRewardsAccum {
  poolId: bigint;
  blockHeight: bigint;
  timestamp: bigint;
  dexReward: string;
  gasReward: string;
  edenReward: string;
}
export interface PoolRewardsAccumProtoMsg {
  typeUrl: "/elys.masterchef.PoolRewardsAccum";
  value: Uint8Array;
}
export interface PoolRewardsAccumAmino {
  pool_id?: string;
  block_height?: string;
  timestamp?: string;
  dex_reward?: string;
  gas_reward?: string;
  eden_reward?: string;
}
export interface PoolRewardsAccumAminoMsg {
  type: "/elys.masterchef.PoolRewardsAccum";
  value: PoolRewardsAccumAmino;
}
export interface PoolRewardsAccumSDKType {
  pool_id: bigint;
  block_height: bigint;
  timestamp: bigint;
  dex_reward: string;
  gas_reward: string;
  eden_reward: string;
}
function createBasePoolInfo(): PoolInfo {
  return {
    poolId: BigInt(0),
    rewardWallet: "",
    multiplier: "",
    edenApr: "",
    dexApr: "",
    gasApr: "",
    externalIncentiveApr: "",
    externalRewardDenoms: [],
    enableEdenRewards: false
  };
}
export const PoolInfo = {
  typeUrl: "/elys.masterchef.PoolInfo",
  encode(message: PoolInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.rewardWallet !== "") {
      writer.uint32(18).string(message.rewardWallet);
    }
    if (message.multiplier !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.multiplier, 18).atomics);
    }
    if (message.edenApr !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.edenApr, 18).atomics);
    }
    if (message.dexApr !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.dexApr, 18).atomics);
    }
    if (message.gasApr !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.gasApr, 18).atomics);
    }
    if (message.externalIncentiveApr !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.externalIncentiveApr, 18).atomics);
    }
    for (const v of message.externalRewardDenoms) {
      writer.uint32(66).string(v!);
    }
    if (message.enableEdenRewards === true) {
      writer.uint32(72).bool(message.enableEdenRewards);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PoolInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.rewardWallet = reader.string();
          break;
        case 3:
          message.multiplier = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.edenApr = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.dexApr = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.gasApr = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.externalIncentiveApr = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 8:
          message.externalRewardDenoms.push(reader.string());
          break;
        case 9:
          message.enableEdenRewards = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolInfo>): PoolInfo {
    const message = createBasePoolInfo();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.rewardWallet = object.rewardWallet ?? "";
    message.multiplier = object.multiplier ?? "";
    message.edenApr = object.edenApr ?? "";
    message.dexApr = object.dexApr ?? "";
    message.gasApr = object.gasApr ?? "";
    message.externalIncentiveApr = object.externalIncentiveApr ?? "";
    message.externalRewardDenoms = object.externalRewardDenoms?.map(e => e) || [];
    message.enableEdenRewards = object.enableEdenRewards ?? false;
    return message;
  },
  fromAmino(object: PoolInfoAmino): PoolInfo {
    const message = createBasePoolInfo();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.reward_wallet !== undefined && object.reward_wallet !== null) {
      message.rewardWallet = object.reward_wallet;
    }
    if (object.multiplier !== undefined && object.multiplier !== null) {
      message.multiplier = object.multiplier;
    }
    if (object.eden_apr !== undefined && object.eden_apr !== null) {
      message.edenApr = object.eden_apr;
    }
    if (object.dex_apr !== undefined && object.dex_apr !== null) {
      message.dexApr = object.dex_apr;
    }
    if (object.gas_apr !== undefined && object.gas_apr !== null) {
      message.gasApr = object.gas_apr;
    }
    if (object.external_incentive_apr !== undefined && object.external_incentive_apr !== null) {
      message.externalIncentiveApr = object.external_incentive_apr;
    }
    message.externalRewardDenoms = object.external_reward_denoms?.map(e => e) || [];
    if (object.enable_eden_rewards !== undefined && object.enable_eden_rewards !== null) {
      message.enableEdenRewards = object.enable_eden_rewards;
    }
    return message;
  },
  toAmino(message: PoolInfo, useInterfaces: boolean = false): PoolInfoAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.reward_wallet = message.rewardWallet === "" ? undefined : message.rewardWallet;
    obj.multiplier = message.multiplier === "" ? undefined : message.multiplier;
    obj.eden_apr = message.edenApr === "" ? undefined : message.edenApr;
    obj.dex_apr = message.dexApr === "" ? undefined : message.dexApr;
    obj.gas_apr = message.gasApr === "" ? undefined : message.gasApr;
    obj.external_incentive_apr = message.externalIncentiveApr === "" ? undefined : message.externalIncentiveApr;
    if (message.externalRewardDenoms) {
      obj.external_reward_denoms = message.externalRewardDenoms.map(e => e);
    } else {
      obj.external_reward_denoms = message.externalRewardDenoms;
    }
    obj.enable_eden_rewards = message.enableEdenRewards === false ? undefined : message.enableEdenRewards;
    return obj;
  },
  fromAminoMsg(object: PoolInfoAminoMsg): PoolInfo {
    return PoolInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolInfoProtoMsg, useInterfaces: boolean = false): PoolInfo {
    return PoolInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PoolInfo): Uint8Array {
    return PoolInfo.encode(message).finish();
  },
  toProtoMsg(message: PoolInfo): PoolInfoProtoMsg {
    return {
      typeUrl: "/elys.masterchef.PoolInfo",
      value: PoolInfo.encode(message).finish()
    };
  }
};
function createBaseLegacyPoolInfo(): LegacyPoolInfo {
  return {
    poolId: BigInt(0),
    rewardWallet: "",
    multiplier: "",
    edenApr: "",
    dexApr: "",
    gasApr: "",
    externalIncentiveApr: "",
    externalRewardDenoms: []
  };
}
export const LegacyPoolInfo = {
  typeUrl: "/elys.masterchef.LegacyPoolInfo",
  encode(message: LegacyPoolInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.rewardWallet !== "") {
      writer.uint32(18).string(message.rewardWallet);
    }
    if (message.multiplier !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.multiplier, 18).atomics);
    }
    if (message.edenApr !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.edenApr, 18).atomics);
    }
    if (message.dexApr !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.dexApr, 18).atomics);
    }
    if (message.gasApr !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.gasApr, 18).atomics);
    }
    if (message.externalIncentiveApr !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.externalIncentiveApr, 18).atomics);
    }
    for (const v of message.externalRewardDenoms) {
      writer.uint32(66).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LegacyPoolInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyPoolInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.rewardWallet = reader.string();
          break;
        case 3:
          message.multiplier = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.edenApr = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.dexApr = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.gasApr = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.externalIncentiveApr = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 8:
          message.externalRewardDenoms.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LegacyPoolInfo>): LegacyPoolInfo {
    const message = createBaseLegacyPoolInfo();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.rewardWallet = object.rewardWallet ?? "";
    message.multiplier = object.multiplier ?? "";
    message.edenApr = object.edenApr ?? "";
    message.dexApr = object.dexApr ?? "";
    message.gasApr = object.gasApr ?? "";
    message.externalIncentiveApr = object.externalIncentiveApr ?? "";
    message.externalRewardDenoms = object.externalRewardDenoms?.map(e => e) || [];
    return message;
  },
  fromAmino(object: LegacyPoolInfoAmino): LegacyPoolInfo {
    const message = createBaseLegacyPoolInfo();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.reward_wallet !== undefined && object.reward_wallet !== null) {
      message.rewardWallet = object.reward_wallet;
    }
    if (object.multiplier !== undefined && object.multiplier !== null) {
      message.multiplier = object.multiplier;
    }
    if (object.eden_apr !== undefined && object.eden_apr !== null) {
      message.edenApr = object.eden_apr;
    }
    if (object.dex_apr !== undefined && object.dex_apr !== null) {
      message.dexApr = object.dex_apr;
    }
    if (object.gas_apr !== undefined && object.gas_apr !== null) {
      message.gasApr = object.gas_apr;
    }
    if (object.external_incentive_apr !== undefined && object.external_incentive_apr !== null) {
      message.externalIncentiveApr = object.external_incentive_apr;
    }
    message.externalRewardDenoms = object.external_reward_denoms?.map(e => e) || [];
    return message;
  },
  toAmino(message: LegacyPoolInfo, useInterfaces: boolean = false): LegacyPoolInfoAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.reward_wallet = message.rewardWallet === "" ? undefined : message.rewardWallet;
    obj.multiplier = message.multiplier === "" ? undefined : message.multiplier;
    obj.eden_apr = message.edenApr === "" ? undefined : message.edenApr;
    obj.dex_apr = message.dexApr === "" ? undefined : message.dexApr;
    obj.gas_apr = message.gasApr === "" ? undefined : message.gasApr;
    obj.external_incentive_apr = message.externalIncentiveApr === "" ? undefined : message.externalIncentiveApr;
    if (message.externalRewardDenoms) {
      obj.external_reward_denoms = message.externalRewardDenoms.map(e => e);
    } else {
      obj.external_reward_denoms = message.externalRewardDenoms;
    }
    return obj;
  },
  fromAminoMsg(object: LegacyPoolInfoAminoMsg): LegacyPoolInfo {
    return LegacyPoolInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: LegacyPoolInfoProtoMsg, useInterfaces: boolean = false): LegacyPoolInfo {
    return LegacyPoolInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LegacyPoolInfo): Uint8Array {
    return LegacyPoolInfo.encode(message).finish();
  },
  toProtoMsg(message: LegacyPoolInfo): LegacyPoolInfoProtoMsg {
    return {
      typeUrl: "/elys.masterchef.LegacyPoolInfo",
      value: LegacyPoolInfo.encode(message).finish()
    };
  }
};
function createBasePoolRewardInfo(): PoolRewardInfo {
  return {
    poolId: BigInt(0),
    rewardDenom: "",
    poolAccRewardPerShare: "",
    lastUpdatedBlock: BigInt(0)
  };
}
export const PoolRewardInfo = {
  typeUrl: "/elys.masterchef.PoolRewardInfo",
  encode(message: PoolRewardInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.rewardDenom !== "") {
      writer.uint32(18).string(message.rewardDenom);
    }
    if (message.poolAccRewardPerShare !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.poolAccRewardPerShare, 18).atomics);
    }
    if (message.lastUpdatedBlock !== BigInt(0)) {
      writer.uint32(32).uint64(message.lastUpdatedBlock);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PoolRewardInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolRewardInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.rewardDenom = reader.string();
          break;
        case 3:
          message.poolAccRewardPerShare = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.lastUpdatedBlock = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolRewardInfo>): PoolRewardInfo {
    const message = createBasePoolRewardInfo();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.rewardDenom = object.rewardDenom ?? "";
    message.poolAccRewardPerShare = object.poolAccRewardPerShare ?? "";
    message.lastUpdatedBlock = object.lastUpdatedBlock !== undefined && object.lastUpdatedBlock !== null ? BigInt(object.lastUpdatedBlock.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: PoolRewardInfoAmino): PoolRewardInfo {
    const message = createBasePoolRewardInfo();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.reward_denom !== undefined && object.reward_denom !== null) {
      message.rewardDenom = object.reward_denom;
    }
    if (object.pool_acc_reward_per_share !== undefined && object.pool_acc_reward_per_share !== null) {
      message.poolAccRewardPerShare = object.pool_acc_reward_per_share;
    }
    if (object.last_updated_block !== undefined && object.last_updated_block !== null) {
      message.lastUpdatedBlock = BigInt(object.last_updated_block);
    }
    return message;
  },
  toAmino(message: PoolRewardInfo, useInterfaces: boolean = false): PoolRewardInfoAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.reward_denom = message.rewardDenom === "" ? undefined : message.rewardDenom;
    obj.pool_acc_reward_per_share = message.poolAccRewardPerShare === "" ? undefined : message.poolAccRewardPerShare;
    obj.last_updated_block = message.lastUpdatedBlock !== BigInt(0) ? message.lastUpdatedBlock.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: PoolRewardInfoAminoMsg): PoolRewardInfo {
    return PoolRewardInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolRewardInfoProtoMsg, useInterfaces: boolean = false): PoolRewardInfo {
    return PoolRewardInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PoolRewardInfo): Uint8Array {
    return PoolRewardInfo.encode(message).finish();
  },
  toProtoMsg(message: PoolRewardInfo): PoolRewardInfoProtoMsg {
    return {
      typeUrl: "/elys.masterchef.PoolRewardInfo",
      value: PoolRewardInfo.encode(message).finish()
    };
  }
};
function createBaseUserRewardInfo(): UserRewardInfo {
  return {
    user: "",
    poolId: BigInt(0),
    rewardDenom: "",
    rewardDebt: "",
    rewardPending: ""
  };
}
export const UserRewardInfo = {
  typeUrl: "/elys.masterchef.UserRewardInfo",
  encode(message: UserRewardInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.user !== "") {
      writer.uint32(10).string(message.user);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.rewardDenom !== "") {
      writer.uint32(26).string(message.rewardDenom);
    }
    if (message.rewardDebt !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.rewardDebt, 18).atomics);
    }
    if (message.rewardPending !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.rewardPending, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UserRewardInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserRewardInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.rewardDenom = reader.string();
          break;
        case 4:
          message.rewardDebt = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.rewardPending = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UserRewardInfo>): UserRewardInfo {
    const message = createBaseUserRewardInfo();
    message.user = object.user ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.rewardDenom = object.rewardDenom ?? "";
    message.rewardDebt = object.rewardDebt ?? "";
    message.rewardPending = object.rewardPending ?? "";
    return message;
  },
  fromAmino(object: UserRewardInfoAmino): UserRewardInfo {
    const message = createBaseUserRewardInfo();
    if (object.user !== undefined && object.user !== null) {
      message.user = object.user;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.reward_denom !== undefined && object.reward_denom !== null) {
      message.rewardDenom = object.reward_denom;
    }
    if (object.reward_debt !== undefined && object.reward_debt !== null) {
      message.rewardDebt = object.reward_debt;
    }
    if (object.reward_pending !== undefined && object.reward_pending !== null) {
      message.rewardPending = object.reward_pending;
    }
    return message;
  },
  toAmino(message: UserRewardInfo, useInterfaces: boolean = false): UserRewardInfoAmino {
    const obj: any = {};
    obj.user = message.user === "" ? undefined : message.user;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.reward_denom = message.rewardDenom === "" ? undefined : message.rewardDenom;
    obj.reward_debt = message.rewardDebt === "" ? undefined : message.rewardDebt;
    obj.reward_pending = message.rewardPending === "" ? undefined : message.rewardPending;
    return obj;
  },
  fromAminoMsg(object: UserRewardInfoAminoMsg): UserRewardInfo {
    return UserRewardInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: UserRewardInfoProtoMsg, useInterfaces: boolean = false): UserRewardInfo {
    return UserRewardInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UserRewardInfo): Uint8Array {
    return UserRewardInfo.encode(message).finish();
  },
  toProtoMsg(message: UserRewardInfo): UserRewardInfoProtoMsg {
    return {
      typeUrl: "/elys.masterchef.UserRewardInfo",
      value: UserRewardInfo.encode(message).finish()
    };
  }
};
function createBasePoolRewardsAccum(): PoolRewardsAccum {
  return {
    poolId: BigInt(0),
    blockHeight: BigInt(0),
    timestamp: BigInt(0),
    dexReward: "",
    gasReward: "",
    edenReward: ""
  };
}
export const PoolRewardsAccum = {
  typeUrl: "/elys.masterchef.PoolRewardsAccum",
  encode(message: PoolRewardsAccum, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.blockHeight !== BigInt(0)) {
      writer.uint32(16).int64(message.blockHeight);
    }
    if (message.timestamp !== BigInt(0)) {
      writer.uint32(24).uint64(message.timestamp);
    }
    if (message.dexReward !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.dexReward, 18).atomics);
    }
    if (message.gasReward !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.gasReward, 18).atomics);
    }
    if (message.edenReward !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.edenReward, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PoolRewardsAccum {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolRewardsAccum();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.blockHeight = reader.int64();
          break;
        case 3:
          message.timestamp = reader.uint64();
          break;
        case 4:
          message.dexReward = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.gasReward = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.edenReward = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolRewardsAccum>): PoolRewardsAccum {
    const message = createBasePoolRewardsAccum();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.blockHeight = object.blockHeight !== undefined && object.blockHeight !== null ? BigInt(object.blockHeight.toString()) : BigInt(0);
    message.timestamp = object.timestamp !== undefined && object.timestamp !== null ? BigInt(object.timestamp.toString()) : BigInt(0);
    message.dexReward = object.dexReward ?? "";
    message.gasReward = object.gasReward ?? "";
    message.edenReward = object.edenReward ?? "";
    return message;
  },
  fromAmino(object: PoolRewardsAccumAmino): PoolRewardsAccum {
    const message = createBasePoolRewardsAccum();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.block_height !== undefined && object.block_height !== null) {
      message.blockHeight = BigInt(object.block_height);
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = BigInt(object.timestamp);
    }
    if (object.dex_reward !== undefined && object.dex_reward !== null) {
      message.dexReward = object.dex_reward;
    }
    if (object.gas_reward !== undefined && object.gas_reward !== null) {
      message.gasReward = object.gas_reward;
    }
    if (object.eden_reward !== undefined && object.eden_reward !== null) {
      message.edenReward = object.eden_reward;
    }
    return message;
  },
  toAmino(message: PoolRewardsAccum, useInterfaces: boolean = false): PoolRewardsAccumAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.block_height = message.blockHeight !== BigInt(0) ? message.blockHeight.toString() : undefined;
    obj.timestamp = message.timestamp !== BigInt(0) ? message.timestamp.toString() : undefined;
    obj.dex_reward = message.dexReward === "" ? undefined : message.dexReward;
    obj.gas_reward = message.gasReward === "" ? undefined : message.gasReward;
    obj.eden_reward = message.edenReward === "" ? undefined : message.edenReward;
    return obj;
  },
  fromAminoMsg(object: PoolRewardsAccumAminoMsg): PoolRewardsAccum {
    return PoolRewardsAccum.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolRewardsAccumProtoMsg, useInterfaces: boolean = false): PoolRewardsAccum {
    return PoolRewardsAccum.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PoolRewardsAccum): Uint8Array {
    return PoolRewardsAccum.encode(message).finish();
  },
  toProtoMsg(message: PoolRewardsAccum): PoolRewardsAccumProtoMsg {
    return {
      typeUrl: "/elys.masterchef.PoolRewardsAccum",
      value: PoolRewardsAccum.encode(message).finish()
    };
  }
};