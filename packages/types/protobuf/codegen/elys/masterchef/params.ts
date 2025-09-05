import { LegacyIncentiveInfo, LegacyIncentiveInfoAmino, LegacyIncentiveInfoSDKType, IncentiveInfo, IncentiveInfoAmino, IncentiveInfoSDKType } from "./incentive";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
/** Params defines the parameters for the module. */
export interface LegacyParams {
  lpIncentives?: LegacyIncentiveInfo | undefined;
  /**
   * gas fees and swap fees portion for lps, `100 - reward_portion_for_lps -
   * reward_portion_for_stakers = revenue percent for protocol`.
   */
  rewardPortionForLps: string;
  /**
   * gas fees and swap fees portion for stakers, `100 - reward_portion_for_lps -
   * reward_portion_for_stakers = revenue percent for protocol`.
   */
  rewardPortionForStakers: string;
  /** Maximum eden reward apr for lps - [0 - 0.3] */
  maxEdenRewardAprLps: string;
  supportedRewardDenoms: SupportedRewardDenom[];
  protocolRevenueAddress: string;
}
export interface LegacyParamsProtoMsg {
  typeUrl: "/elys.masterchef.LegacyParams";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface LegacyParamsAmino {
  lp_incentives?: LegacyIncentiveInfoAmino | undefined;
  /**
   * gas fees and swap fees portion for lps, `100 - reward_portion_for_lps -
   * reward_portion_for_stakers = revenue percent for protocol`.
   */
  reward_portion_for_lps?: string;
  /**
   * gas fees and swap fees portion for stakers, `100 - reward_portion_for_lps -
   * reward_portion_for_stakers = revenue percent for protocol`.
   */
  reward_portion_for_stakers?: string;
  /** Maximum eden reward apr for lps - [0 - 0.3] */
  max_eden_reward_apr_lps?: string;
  supported_reward_denoms?: SupportedRewardDenomAmino[];
  protocol_revenue_address?: string;
}
export interface LegacyParamsAminoMsg {
  type: "/elys.masterchef.LegacyParams";
  value: LegacyParamsAmino;
}
/** Params defines the parameters for the module. */
export interface LegacyParamsSDKType {
  lp_incentives?: LegacyIncentiveInfoSDKType | undefined;
  reward_portion_for_lps: string;
  reward_portion_for_stakers: string;
  max_eden_reward_apr_lps: string;
  supported_reward_denoms: SupportedRewardDenomSDKType[];
  protocol_revenue_address: string;
}
export interface Params {
  lpIncentives?: IncentiveInfo | undefined;
  /**
   * gas fees and swap fees portion for lps, `100 - reward_portion_for_lps -
   * reward_portion_for_stakers = revenue percent for protocol`.
   */
  rewardPortionForLps: string;
  /**
   * gas fees and swap fees portion for stakers, `100 - reward_portion_for_lps -
   * reward_portion_for_stakers = revenue percent for protocol`.
   */
  rewardPortionForStakers: string;
  /** Maximum eden reward apr for lps - [0 - 0.3] */
  maxEdenRewardAprLps: string;
  supportedRewardDenoms: SupportedRewardDenom[];
  protocolRevenueAddress: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/elys.masterchef.Params";
  value: Uint8Array;
}
export interface ParamsAmino {
  lp_incentives?: IncentiveInfoAmino | undefined;
  /**
   * gas fees and swap fees portion for lps, `100 - reward_portion_for_lps -
   * reward_portion_for_stakers = revenue percent for protocol`.
   */
  reward_portion_for_lps?: string;
  /**
   * gas fees and swap fees portion for stakers, `100 - reward_portion_for_lps -
   * reward_portion_for_stakers = revenue percent for protocol`.
   */
  reward_portion_for_stakers?: string;
  /** Maximum eden reward apr for lps - [0 - 0.3] */
  max_eden_reward_apr_lps?: string;
  supported_reward_denoms?: SupportedRewardDenomAmino[];
  protocol_revenue_address?: string;
}
export interface ParamsAminoMsg {
  type: "/elys.masterchef.Params";
  value: ParamsAmino;
}
export interface ParamsSDKType {
  lp_incentives?: IncentiveInfoSDKType | undefined;
  reward_portion_for_lps: string;
  reward_portion_for_stakers: string;
  max_eden_reward_apr_lps: string;
  supported_reward_denoms: SupportedRewardDenomSDKType[];
  protocol_revenue_address: string;
}
export interface SupportedRewardDenom {
  denom: string;
  minAmount: string;
}
export interface SupportedRewardDenomProtoMsg {
  typeUrl: "/elys.masterchef.SupportedRewardDenom";
  value: Uint8Array;
}
export interface SupportedRewardDenomAmino {
  denom?: string;
  min_amount?: string;
}
export interface SupportedRewardDenomAminoMsg {
  type: "/elys.masterchef.SupportedRewardDenom";
  value: SupportedRewardDenomAmino;
}
export interface SupportedRewardDenomSDKType {
  denom: string;
  min_amount: string;
}
function createBaseLegacyParams(): LegacyParams {
  return {
    lpIncentives: undefined,
    rewardPortionForLps: "",
    rewardPortionForStakers: "",
    maxEdenRewardAprLps: "",
    supportedRewardDenoms: [],
    protocolRevenueAddress: ""
  };
}
export const LegacyParams = {
  typeUrl: "/elys.masterchef.LegacyParams",
  encode(message: LegacyParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lpIncentives !== undefined) {
      LegacyIncentiveInfo.encode(message.lpIncentives, writer.uint32(10).fork()).ldelim();
    }
    if (message.rewardPortionForLps !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.rewardPortionForLps, 18).atomics);
    }
    if (message.rewardPortionForStakers !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.rewardPortionForStakers, 18).atomics);
    }
    if (message.maxEdenRewardAprLps !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.maxEdenRewardAprLps, 18).atomics);
    }
    for (const v of message.supportedRewardDenoms) {
      SupportedRewardDenom.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.protocolRevenueAddress !== "") {
      writer.uint32(50).string(message.protocolRevenueAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LegacyParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lpIncentives = LegacyIncentiveInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.rewardPortionForLps = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.rewardPortionForStakers = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.maxEdenRewardAprLps = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.supportedRewardDenoms.push(SupportedRewardDenom.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 6:
          message.protocolRevenueAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LegacyParams>): LegacyParams {
    const message = createBaseLegacyParams();
    message.lpIncentives = object.lpIncentives !== undefined && object.lpIncentives !== null ? LegacyIncentiveInfo.fromPartial(object.lpIncentives) : undefined;
    message.rewardPortionForLps = object.rewardPortionForLps ?? "";
    message.rewardPortionForStakers = object.rewardPortionForStakers ?? "";
    message.maxEdenRewardAprLps = object.maxEdenRewardAprLps ?? "";
    message.supportedRewardDenoms = object.supportedRewardDenoms?.map(e => SupportedRewardDenom.fromPartial(e)) || [];
    message.protocolRevenueAddress = object.protocolRevenueAddress ?? "";
    return message;
  },
  fromAmino(object: LegacyParamsAmino): LegacyParams {
    const message = createBaseLegacyParams();
    if (object.lp_incentives !== undefined && object.lp_incentives !== null) {
      message.lpIncentives = LegacyIncentiveInfo.fromAmino(object.lp_incentives);
    }
    if (object.reward_portion_for_lps !== undefined && object.reward_portion_for_lps !== null) {
      message.rewardPortionForLps = object.reward_portion_for_lps;
    }
    if (object.reward_portion_for_stakers !== undefined && object.reward_portion_for_stakers !== null) {
      message.rewardPortionForStakers = object.reward_portion_for_stakers;
    }
    if (object.max_eden_reward_apr_lps !== undefined && object.max_eden_reward_apr_lps !== null) {
      message.maxEdenRewardAprLps = object.max_eden_reward_apr_lps;
    }
    message.supportedRewardDenoms = object.supported_reward_denoms?.map(e => SupportedRewardDenom.fromAmino(e)) || [];
    if (object.protocol_revenue_address !== undefined && object.protocol_revenue_address !== null) {
      message.protocolRevenueAddress = object.protocol_revenue_address;
    }
    return message;
  },
  toAmino(message: LegacyParams, useInterfaces: boolean = false): LegacyParamsAmino {
    const obj: any = {};
    obj.lp_incentives = message.lpIncentives ? LegacyIncentiveInfo.toAmino(message.lpIncentives, useInterfaces) : undefined;
    obj.reward_portion_for_lps = message.rewardPortionForLps === "" ? undefined : message.rewardPortionForLps;
    obj.reward_portion_for_stakers = message.rewardPortionForStakers === "" ? undefined : message.rewardPortionForStakers;
    obj.max_eden_reward_apr_lps = message.maxEdenRewardAprLps === "" ? undefined : message.maxEdenRewardAprLps;
    if (message.supportedRewardDenoms) {
      obj.supported_reward_denoms = message.supportedRewardDenoms.map(e => e ? SupportedRewardDenom.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.supported_reward_denoms = message.supportedRewardDenoms;
    }
    obj.protocol_revenue_address = message.protocolRevenueAddress === "" ? undefined : message.protocolRevenueAddress;
    return obj;
  },
  fromAminoMsg(object: LegacyParamsAminoMsg): LegacyParams {
    return LegacyParams.fromAmino(object.value);
  },
  fromProtoMsg(message: LegacyParamsProtoMsg, useInterfaces: boolean = false): LegacyParams {
    return LegacyParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LegacyParams): Uint8Array {
    return LegacyParams.encode(message).finish();
  },
  toProtoMsg(message: LegacyParams): LegacyParamsProtoMsg {
    return {
      typeUrl: "/elys.masterchef.LegacyParams",
      value: LegacyParams.encode(message).finish()
    };
  }
};
function createBaseParams(): Params {
  return {
    lpIncentives: undefined,
    rewardPortionForLps: "",
    rewardPortionForStakers: "",
    maxEdenRewardAprLps: "",
    supportedRewardDenoms: [],
    protocolRevenueAddress: ""
  };
}
export const Params = {
  typeUrl: "/elys.masterchef.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lpIncentives !== undefined) {
      IncentiveInfo.encode(message.lpIncentives, writer.uint32(10).fork()).ldelim();
    }
    if (message.rewardPortionForLps !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.rewardPortionForLps, 18).atomics);
    }
    if (message.rewardPortionForStakers !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.rewardPortionForStakers, 18).atomics);
    }
    if (message.maxEdenRewardAprLps !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.maxEdenRewardAprLps, 18).atomics);
    }
    for (const v of message.supportedRewardDenoms) {
      SupportedRewardDenom.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.protocolRevenueAddress !== "") {
      writer.uint32(50).string(message.protocolRevenueAddress);
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
          message.lpIncentives = IncentiveInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.rewardPortionForLps = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.rewardPortionForStakers = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.maxEdenRewardAprLps = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.supportedRewardDenoms.push(SupportedRewardDenom.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 6:
          message.protocolRevenueAddress = reader.string();
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
    message.lpIncentives = object.lpIncentives !== undefined && object.lpIncentives !== null ? IncentiveInfo.fromPartial(object.lpIncentives) : undefined;
    message.rewardPortionForLps = object.rewardPortionForLps ?? "";
    message.rewardPortionForStakers = object.rewardPortionForStakers ?? "";
    message.maxEdenRewardAprLps = object.maxEdenRewardAprLps ?? "";
    message.supportedRewardDenoms = object.supportedRewardDenoms?.map(e => SupportedRewardDenom.fromPartial(e)) || [];
    message.protocolRevenueAddress = object.protocolRevenueAddress ?? "";
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.lp_incentives !== undefined && object.lp_incentives !== null) {
      message.lpIncentives = IncentiveInfo.fromAmino(object.lp_incentives);
    }
    if (object.reward_portion_for_lps !== undefined && object.reward_portion_for_lps !== null) {
      message.rewardPortionForLps = object.reward_portion_for_lps;
    }
    if (object.reward_portion_for_stakers !== undefined && object.reward_portion_for_stakers !== null) {
      message.rewardPortionForStakers = object.reward_portion_for_stakers;
    }
    if (object.max_eden_reward_apr_lps !== undefined && object.max_eden_reward_apr_lps !== null) {
      message.maxEdenRewardAprLps = object.max_eden_reward_apr_lps;
    }
    message.supportedRewardDenoms = object.supported_reward_denoms?.map(e => SupportedRewardDenom.fromAmino(e)) || [];
    if (object.protocol_revenue_address !== undefined && object.protocol_revenue_address !== null) {
      message.protocolRevenueAddress = object.protocol_revenue_address;
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.lp_incentives = message.lpIncentives ? IncentiveInfo.toAmino(message.lpIncentives, useInterfaces) : undefined;
    obj.reward_portion_for_lps = message.rewardPortionForLps === "" ? undefined : message.rewardPortionForLps;
    obj.reward_portion_for_stakers = message.rewardPortionForStakers === "" ? undefined : message.rewardPortionForStakers;
    obj.max_eden_reward_apr_lps = message.maxEdenRewardAprLps === "" ? undefined : message.maxEdenRewardAprLps;
    if (message.supportedRewardDenoms) {
      obj.supported_reward_denoms = message.supportedRewardDenoms.map(e => e ? SupportedRewardDenom.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.supported_reward_denoms = message.supportedRewardDenoms;
    }
    obj.protocol_revenue_address = message.protocolRevenueAddress === "" ? undefined : message.protocolRevenueAddress;
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
      typeUrl: "/elys.masterchef.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseSupportedRewardDenom(): SupportedRewardDenom {
  return {
    denom: "",
    minAmount: ""
  };
}
export const SupportedRewardDenom = {
  typeUrl: "/elys.masterchef.SupportedRewardDenom",
  encode(message: SupportedRewardDenom, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.minAmount !== "") {
      writer.uint32(18).string(message.minAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SupportedRewardDenom {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSupportedRewardDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.minAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SupportedRewardDenom>): SupportedRewardDenom {
    const message = createBaseSupportedRewardDenom();
    message.denom = object.denom ?? "";
    message.minAmount = object.minAmount ?? "";
    return message;
  },
  fromAmino(object: SupportedRewardDenomAmino): SupportedRewardDenom {
    const message = createBaseSupportedRewardDenom();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.min_amount !== undefined && object.min_amount !== null) {
      message.minAmount = object.min_amount;
    }
    return message;
  },
  toAmino(message: SupportedRewardDenom, useInterfaces: boolean = false): SupportedRewardDenomAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.min_amount = message.minAmount === "" ? undefined : message.minAmount;
    return obj;
  },
  fromAminoMsg(object: SupportedRewardDenomAminoMsg): SupportedRewardDenom {
    return SupportedRewardDenom.fromAmino(object.value);
  },
  fromProtoMsg(message: SupportedRewardDenomProtoMsg, useInterfaces: boolean = false): SupportedRewardDenom {
    return SupportedRewardDenom.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SupportedRewardDenom): Uint8Array {
    return SupportedRewardDenom.encode(message).finish();
  },
  toProtoMsg(message: SupportedRewardDenom): SupportedRewardDenomProtoMsg {
    return {
      typeUrl: "/elys.masterchef.SupportedRewardDenom",
      value: SupportedRewardDenom.encode(message).finish()
    };
  }
};