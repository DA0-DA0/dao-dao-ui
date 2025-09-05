//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { ExternalIncentive, ExternalIncentiveAmino, ExternalIncentiveSDKType } from "./external_incentive";
import { PoolInfo, PoolInfoAmino, PoolInfoSDKType, PoolRewardInfo, PoolRewardInfoAmino, PoolRewardInfoSDKType, UserRewardInfo, UserRewardInfoAmino, UserRewardInfoSDKType, PoolRewardsAccum, PoolRewardsAccumAmino, PoolRewardsAccumSDKType } from "./pool";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the masterchef module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  externalIncentives: ExternalIncentive[];
  externalIncentiveIndex: bigint;
  poolInfos: PoolInfo[];
  poolRewardInfos: PoolRewardInfo[];
  userRewardInfos: UserRewardInfo[];
  poolRewardsAccum: PoolRewardsAccum[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/elys.masterchef.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the masterchef module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  external_incentives?: ExternalIncentiveAmino[];
  external_incentive_index?: string;
  pool_infos?: PoolInfoAmino[];
  pool_reward_infos?: PoolRewardInfoAmino[];
  user_reward_infos?: UserRewardInfoAmino[];
  pool_rewards_accum?: PoolRewardsAccumAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/elys.masterchef.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the masterchef module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  external_incentives: ExternalIncentiveSDKType[];
  external_incentive_index: bigint;
  pool_infos: PoolInfoSDKType[];
  pool_reward_infos: PoolRewardInfoSDKType[];
  user_reward_infos: UserRewardInfoSDKType[];
  pool_rewards_accum: PoolRewardsAccumSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    externalIncentives: [],
    externalIncentiveIndex: BigInt(0),
    poolInfos: [],
    poolRewardInfos: [],
    userRewardInfos: [],
    poolRewardsAccum: []
  };
}
export const GenesisState = {
  typeUrl: "/elys.masterchef.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.externalIncentives) {
      ExternalIncentive.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.externalIncentiveIndex !== BigInt(0)) {
      writer.uint32(24).uint64(message.externalIncentiveIndex);
    }
    for (const v of message.poolInfos) {
      PoolInfo.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.poolRewardInfos) {
      PoolRewardInfo.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.userRewardInfos) {
      UserRewardInfo.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.poolRewardsAccum) {
      PoolRewardsAccum.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.externalIncentives.push(ExternalIncentive.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.externalIncentiveIndex = reader.uint64();
          break;
        case 4:
          message.poolInfos.push(PoolInfo.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.poolRewardInfos.push(PoolRewardInfo.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 6:
          message.userRewardInfos.push(UserRewardInfo.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 7:
          message.poolRewardsAccum.push(PoolRewardsAccum.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.externalIncentives = object.externalIncentives?.map(e => ExternalIncentive.fromPartial(e)) || [];
    message.externalIncentiveIndex = object.externalIncentiveIndex !== undefined && object.externalIncentiveIndex !== null ? BigInt(object.externalIncentiveIndex.toString()) : BigInt(0);
    message.poolInfos = object.poolInfos?.map(e => PoolInfo.fromPartial(e)) || [];
    message.poolRewardInfos = object.poolRewardInfos?.map(e => PoolRewardInfo.fromPartial(e)) || [];
    message.userRewardInfos = object.userRewardInfos?.map(e => UserRewardInfo.fromPartial(e)) || [];
    message.poolRewardsAccum = object.poolRewardsAccum?.map(e => PoolRewardsAccum.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.externalIncentives = object.external_incentives?.map(e => ExternalIncentive.fromAmino(e)) || [];
    if (object.external_incentive_index !== undefined && object.external_incentive_index !== null) {
      message.externalIncentiveIndex = BigInt(object.external_incentive_index);
    }
    message.poolInfos = object.pool_infos?.map(e => PoolInfo.fromAmino(e)) || [];
    message.poolRewardInfos = object.pool_reward_infos?.map(e => PoolRewardInfo.fromAmino(e)) || [];
    message.userRewardInfos = object.user_reward_infos?.map(e => UserRewardInfo.fromAmino(e)) || [];
    message.poolRewardsAccum = object.pool_rewards_accum?.map(e => PoolRewardsAccum.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.externalIncentives) {
      obj.external_incentives = message.externalIncentives.map(e => e ? ExternalIncentive.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.external_incentives = message.externalIncentives;
    }
    obj.external_incentive_index = message.externalIncentiveIndex !== BigInt(0) ? message.externalIncentiveIndex.toString() : undefined;
    if (message.poolInfos) {
      obj.pool_infos = message.poolInfos.map(e => e ? PoolInfo.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pool_infos = message.poolInfos;
    }
    if (message.poolRewardInfos) {
      obj.pool_reward_infos = message.poolRewardInfos.map(e => e ? PoolRewardInfo.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pool_reward_infos = message.poolRewardInfos;
    }
    if (message.userRewardInfos) {
      obj.user_reward_infos = message.userRewardInfos.map(e => e ? UserRewardInfo.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.user_reward_infos = message.userRewardInfos;
    }
    if (message.poolRewardsAccum) {
      obj.pool_rewards_accum = message.poolRewardsAccum.map(e => e ? PoolRewardsAccum.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pool_rewards_accum = message.poolRewardsAccum;
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg, useInterfaces: boolean = false): GenesisState {
    return GenesisState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/elys.masterchef.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};