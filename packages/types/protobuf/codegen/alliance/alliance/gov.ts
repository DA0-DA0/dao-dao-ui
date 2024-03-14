//@ts-nocheck
import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { RewardWeightRange, RewardWeightRangeAmino, RewardWeightRangeSDKType } from "./alliance";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
export interface MsgCreateAllianceProposal {
  $typeUrl?: "/alliance.alliance.MsgCreateAllianceProposal";
  /** the title of the update proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  /** Denom of the asset. It could either be a native token or an IBC token */
  denom: string;
  /**
   * The reward weight specifies the ratio of rewards that will be given to each alliance asset
   * It does not need to sum to 1. rate = weight / total_weight
   * Native asset is always assumed to have a weight of 1.
   */
  rewardWeight: string;
  /**
   * A positive take rate is used for liquid staking derivatives. It defines an annualized reward rate that
   * will be redirected to the distribution rewards pool
   */
  takeRate: string;
  rewardChangeRate: string;
  rewardChangeInterval: Duration | undefined;
  /** set a bound of weight range to limit how much reward weights can scale. */
  rewardWeightRange: RewardWeightRange | undefined;
}
export interface MsgCreateAllianceProposalProtoMsg {
  typeUrl: "/alliance.alliance.MsgCreateAllianceProposal";
  value: Uint8Array;
}
export interface MsgCreateAllianceProposalAmino {
  /** the title of the update proposal */
  title?: string;
  /** the description of the proposal */
  description?: string;
  /** Denom of the asset. It could either be a native token or an IBC token */
  denom?: string;
  /**
   * The reward weight specifies the ratio of rewards that will be given to each alliance asset
   * It does not need to sum to 1. rate = weight / total_weight
   * Native asset is always assumed to have a weight of 1.
   */
  reward_weight?: string;
  /**
   * A positive take rate is used for liquid staking derivatives. It defines an annualized reward rate that
   * will be redirected to the distribution rewards pool
   */
  take_rate?: string;
  reward_change_rate?: string;
  reward_change_interval?: DurationAmino | undefined;
  /** set a bound of weight range to limit how much reward weights can scale. */
  reward_weight_range?: RewardWeightRangeAmino | undefined;
}
export interface MsgCreateAllianceProposalAminoMsg {
  type: "/alliance.alliance.MsgCreateAllianceProposal";
  value: MsgCreateAllianceProposalAmino;
}
export interface MsgCreateAllianceProposalSDKType {
  $typeUrl?: "/alliance.alliance.MsgCreateAllianceProposal";
  title: string;
  description: string;
  denom: string;
  reward_weight: string;
  take_rate: string;
  reward_change_rate: string;
  reward_change_interval: DurationSDKType | undefined;
  reward_weight_range: RewardWeightRangeSDKType | undefined;
}
export interface MsgUpdateAllianceProposal {
  $typeUrl?: "/alliance.alliance.MsgUpdateAllianceProposal";
  /** the title of the update proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  /** Denom of the asset. It could either be a native token or an IBC token */
  denom: string;
  /**
   * The reward weight specifies the ratio of rewards that will be given to each alliance asset
   * It does not need to sum to 1. rate = weight / total_weight
   * Native asset is always assumed to have a weight of 1.
   */
  rewardWeight: string;
  takeRate: string;
  rewardChangeRate: string;
  rewardChangeInterval: Duration | undefined;
  /** set a bound of weight range to limit how much reward weights can scale. */
  rewardWeightRange: RewardWeightRange | undefined;
}
export interface MsgUpdateAllianceProposalProtoMsg {
  typeUrl: "/alliance.alliance.MsgUpdateAllianceProposal";
  value: Uint8Array;
}
export interface MsgUpdateAllianceProposalAmino {
  /** the title of the update proposal */
  title?: string;
  /** the description of the proposal */
  description?: string;
  /** Denom of the asset. It could either be a native token or an IBC token */
  denom?: string;
  /**
   * The reward weight specifies the ratio of rewards that will be given to each alliance asset
   * It does not need to sum to 1. rate = weight / total_weight
   * Native asset is always assumed to have a weight of 1.
   */
  reward_weight?: string;
  take_rate?: string;
  reward_change_rate?: string;
  reward_change_interval?: DurationAmino | undefined;
  /** set a bound of weight range to limit how much reward weights can scale. */
  reward_weight_range?: RewardWeightRangeAmino | undefined;
}
export interface MsgUpdateAllianceProposalAminoMsg {
  type: "/alliance.alliance.MsgUpdateAllianceProposal";
  value: MsgUpdateAllianceProposalAmino;
}
export interface MsgUpdateAllianceProposalSDKType {
  $typeUrl?: "/alliance.alliance.MsgUpdateAllianceProposal";
  title: string;
  description: string;
  denom: string;
  reward_weight: string;
  take_rate: string;
  reward_change_rate: string;
  reward_change_interval: DurationSDKType | undefined;
  reward_weight_range: RewardWeightRangeSDKType | undefined;
}
export interface MsgDeleteAllianceProposal {
  $typeUrl?: "/alliance.alliance.MsgDeleteAllianceProposal";
  /** the title of the update proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  denom: string;
}
export interface MsgDeleteAllianceProposalProtoMsg {
  typeUrl: "/alliance.alliance.MsgDeleteAllianceProposal";
  value: Uint8Array;
}
export interface MsgDeleteAllianceProposalAmino {
  /** the title of the update proposal */
  title?: string;
  /** the description of the proposal */
  description?: string;
  denom?: string;
}
export interface MsgDeleteAllianceProposalAminoMsg {
  type: "/alliance.alliance.MsgDeleteAllianceProposal";
  value: MsgDeleteAllianceProposalAmino;
}
export interface MsgDeleteAllianceProposalSDKType {
  $typeUrl?: "/alliance.alliance.MsgDeleteAllianceProposal";
  title: string;
  description: string;
  denom: string;
}
function createBaseMsgCreateAllianceProposal(): MsgCreateAllianceProposal {
  return {
    $typeUrl: "/alliance.alliance.MsgCreateAllianceProposal",
    title: "",
    description: "",
    denom: "",
    rewardWeight: "",
    takeRate: "",
    rewardChangeRate: "",
    rewardChangeInterval: Duration.fromPartial({}),
    rewardWeightRange: RewardWeightRange.fromPartial({})
  };
}
export const MsgCreateAllianceProposal = {
  typeUrl: "/alliance.alliance.MsgCreateAllianceProposal",
  encode(message: MsgCreateAllianceProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.denom !== "") {
      writer.uint32(26).string(message.denom);
    }
    if (message.rewardWeight !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.rewardWeight, 18).atomics);
    }
    if (message.takeRate !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.takeRate, 18).atomics);
    }
    if (message.rewardChangeRate !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.rewardChangeRate, 18).atomics);
    }
    if (message.rewardChangeInterval !== undefined) {
      Duration.encode(message.rewardChangeInterval, writer.uint32(58).fork()).ldelim();
    }
    if (message.rewardWeightRange !== undefined) {
      RewardWeightRange.encode(message.rewardWeightRange, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateAllianceProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateAllianceProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.denom = reader.string();
          break;
        case 4:
          message.rewardWeight = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.takeRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.rewardChangeRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.rewardChangeInterval = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 8:
          message.rewardWeightRange = RewardWeightRange.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateAllianceProposal>): MsgCreateAllianceProposal {
    const message = createBaseMsgCreateAllianceProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.denom = object.denom ?? "";
    message.rewardWeight = object.rewardWeight ?? "";
    message.takeRate = object.takeRate ?? "";
    message.rewardChangeRate = object.rewardChangeRate ?? "";
    message.rewardChangeInterval = object.rewardChangeInterval !== undefined && object.rewardChangeInterval !== null ? Duration.fromPartial(object.rewardChangeInterval) : undefined;
    message.rewardWeightRange = object.rewardWeightRange !== undefined && object.rewardWeightRange !== null ? RewardWeightRange.fromPartial(object.rewardWeightRange) : undefined;
    return message;
  },
  fromAmino(object: MsgCreateAllianceProposalAmino): MsgCreateAllianceProposal {
    const message = createBaseMsgCreateAllianceProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.reward_weight !== undefined && object.reward_weight !== null) {
      message.rewardWeight = object.reward_weight;
    }
    if (object.take_rate !== undefined && object.take_rate !== null) {
      message.takeRate = object.take_rate;
    }
    if (object.reward_change_rate !== undefined && object.reward_change_rate !== null) {
      message.rewardChangeRate = object.reward_change_rate;
    }
    if (object.reward_change_interval !== undefined && object.reward_change_interval !== null) {
      message.rewardChangeInterval = Duration.fromAmino(object.reward_change_interval);
    }
    if (object.reward_weight_range !== undefined && object.reward_weight_range !== null) {
      message.rewardWeightRange = RewardWeightRange.fromAmino(object.reward_weight_range);
    }
    return message;
  },
  toAmino(message: MsgCreateAllianceProposal, useInterfaces: boolean = false): MsgCreateAllianceProposalAmino {
    const obj: any = {};
    obj.title = message.title;
    obj.description = message.description;
    obj.denom = message.denom;
    obj.reward_weight = message.rewardWeight;
    obj.take_rate = message.takeRate;
    obj.reward_change_rate = message.rewardChangeRate;
    obj.reward_change_interval = message.rewardChangeInterval ? Duration.toAmino(message.rewardChangeInterval, useInterfaces) : undefined;
    obj.reward_weight_range = message.rewardWeightRange ? RewardWeightRange.toAmino(message.rewardWeightRange, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgCreateAllianceProposalAminoMsg): MsgCreateAllianceProposal {
    return MsgCreateAllianceProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateAllianceProposalProtoMsg, useInterfaces: boolean = false): MsgCreateAllianceProposal {
    return MsgCreateAllianceProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateAllianceProposal): Uint8Array {
    return MsgCreateAllianceProposal.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateAllianceProposal): MsgCreateAllianceProposalProtoMsg {
    return {
      typeUrl: "/alliance.alliance.MsgCreateAllianceProposal",
      value: MsgCreateAllianceProposal.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateAllianceProposal(): MsgUpdateAllianceProposal {
  return {
    $typeUrl: "/alliance.alliance.MsgUpdateAllianceProposal",
    title: "",
    description: "",
    denom: "",
    rewardWeight: "",
    takeRate: "",
    rewardChangeRate: "",
    rewardChangeInterval: Duration.fromPartial({}),
    rewardWeightRange: RewardWeightRange.fromPartial({})
  };
}
export const MsgUpdateAllianceProposal = {
  typeUrl: "/alliance.alliance.MsgUpdateAllianceProposal",
  encode(message: MsgUpdateAllianceProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.denom !== "") {
      writer.uint32(26).string(message.denom);
    }
    if (message.rewardWeight !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.rewardWeight, 18).atomics);
    }
    if (message.takeRate !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.takeRate, 18).atomics);
    }
    if (message.rewardChangeRate !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.rewardChangeRate, 18).atomics);
    }
    if (message.rewardChangeInterval !== undefined) {
      Duration.encode(message.rewardChangeInterval, writer.uint32(58).fork()).ldelim();
    }
    if (message.rewardWeightRange !== undefined) {
      RewardWeightRange.encode(message.rewardWeightRange, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateAllianceProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAllianceProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.denom = reader.string();
          break;
        case 4:
          message.rewardWeight = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.takeRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.rewardChangeRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.rewardChangeInterval = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 8:
          message.rewardWeightRange = RewardWeightRange.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateAllianceProposal>): MsgUpdateAllianceProposal {
    const message = createBaseMsgUpdateAllianceProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.denom = object.denom ?? "";
    message.rewardWeight = object.rewardWeight ?? "";
    message.takeRate = object.takeRate ?? "";
    message.rewardChangeRate = object.rewardChangeRate ?? "";
    message.rewardChangeInterval = object.rewardChangeInterval !== undefined && object.rewardChangeInterval !== null ? Duration.fromPartial(object.rewardChangeInterval) : undefined;
    message.rewardWeightRange = object.rewardWeightRange !== undefined && object.rewardWeightRange !== null ? RewardWeightRange.fromPartial(object.rewardWeightRange) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateAllianceProposalAmino): MsgUpdateAllianceProposal {
    const message = createBaseMsgUpdateAllianceProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.reward_weight !== undefined && object.reward_weight !== null) {
      message.rewardWeight = object.reward_weight;
    }
    if (object.take_rate !== undefined && object.take_rate !== null) {
      message.takeRate = object.take_rate;
    }
    if (object.reward_change_rate !== undefined && object.reward_change_rate !== null) {
      message.rewardChangeRate = object.reward_change_rate;
    }
    if (object.reward_change_interval !== undefined && object.reward_change_interval !== null) {
      message.rewardChangeInterval = Duration.fromAmino(object.reward_change_interval);
    }
    if (object.reward_weight_range !== undefined && object.reward_weight_range !== null) {
      message.rewardWeightRange = RewardWeightRange.fromAmino(object.reward_weight_range);
    }
    return message;
  },
  toAmino(message: MsgUpdateAllianceProposal, useInterfaces: boolean = false): MsgUpdateAllianceProposalAmino {
    const obj: any = {};
    obj.title = message.title;
    obj.description = message.description;
    obj.denom = message.denom;
    obj.reward_weight = message.rewardWeight;
    obj.take_rate = message.takeRate;
    obj.reward_change_rate = message.rewardChangeRate;
    obj.reward_change_interval = message.rewardChangeInterval ? Duration.toAmino(message.rewardChangeInterval, useInterfaces) : undefined;
    obj.reward_weight_range = message.rewardWeightRange ? RewardWeightRange.toAmino(message.rewardWeightRange, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateAllianceProposalAminoMsg): MsgUpdateAllianceProposal {
    return MsgUpdateAllianceProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateAllianceProposalProtoMsg, useInterfaces: boolean = false): MsgUpdateAllianceProposal {
    return MsgUpdateAllianceProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateAllianceProposal): Uint8Array {
    return MsgUpdateAllianceProposal.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateAllianceProposal): MsgUpdateAllianceProposalProtoMsg {
    return {
      typeUrl: "/alliance.alliance.MsgUpdateAllianceProposal",
      value: MsgUpdateAllianceProposal.encode(message).finish()
    };
  }
};
function createBaseMsgDeleteAllianceProposal(): MsgDeleteAllianceProposal {
  return {
    $typeUrl: "/alliance.alliance.MsgDeleteAllianceProposal",
    title: "",
    description: "",
    denom: ""
  };
}
export const MsgDeleteAllianceProposal = {
  typeUrl: "/alliance.alliance.MsgDeleteAllianceProposal",
  encode(message: MsgDeleteAllianceProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.denom !== "") {
      writer.uint32(26).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDeleteAllianceProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteAllianceProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDeleteAllianceProposal>): MsgDeleteAllianceProposal {
    const message = createBaseMsgDeleteAllianceProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: MsgDeleteAllianceProposalAmino): MsgDeleteAllianceProposal {
    const message = createBaseMsgDeleteAllianceProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: MsgDeleteAllianceProposal, useInterfaces: boolean = false): MsgDeleteAllianceProposalAmino {
    const obj: any = {};
    obj.title = message.title;
    obj.description = message.description;
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: MsgDeleteAllianceProposalAminoMsg): MsgDeleteAllianceProposal {
    return MsgDeleteAllianceProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDeleteAllianceProposalProtoMsg, useInterfaces: boolean = false): MsgDeleteAllianceProposal {
    return MsgDeleteAllianceProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDeleteAllianceProposal): Uint8Array {
    return MsgDeleteAllianceProposal.encode(message).finish();
  },
  toProtoMsg(message: MsgDeleteAllianceProposal): MsgDeleteAllianceProposalProtoMsg {
    return {
      typeUrl: "/alliance.alliance.MsgDeleteAllianceProposal",
      value: MsgDeleteAllianceProposal.encode(message).finish()
    };
  }
};