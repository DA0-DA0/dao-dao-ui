//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
export interface MsgAddExternalRewardDenom {
  authority: string;
  rewardDenom: string;
  minAmount: string;
  supported: boolean;
}
export interface MsgAddExternalRewardDenomProtoMsg {
  typeUrl: "/elys.masterchef.MsgAddExternalRewardDenom";
  value: Uint8Array;
}
export interface MsgAddExternalRewardDenomAmino {
  authority?: string;
  reward_denom?: string;
  min_amount?: string;
  supported?: boolean;
}
export interface MsgAddExternalRewardDenomAminoMsg {
  type: "masterchef/MsgAddExternalRewardDenom";
  value: MsgAddExternalRewardDenomAmino;
}
export interface MsgAddExternalRewardDenomSDKType {
  authority: string;
  reward_denom: string;
  min_amount: string;
  supported: boolean;
}
export interface MsgAddExternalRewardDenomResponse {}
export interface MsgAddExternalRewardDenomResponseProtoMsg {
  typeUrl: "/elys.masterchef.MsgAddExternalRewardDenomResponse";
  value: Uint8Array;
}
export interface MsgAddExternalRewardDenomResponseAmino {}
export interface MsgAddExternalRewardDenomResponseAminoMsg {
  type: "/elys.masterchef.MsgAddExternalRewardDenomResponse";
  value: MsgAddExternalRewardDenomResponseAmino;
}
export interface MsgAddExternalRewardDenomResponseSDKType {}
export interface MsgAddExternalIncentive {
  sender: string;
  rewardDenom: string;
  poolId: bigint;
  fromBlock: bigint;
  toBlock: bigint;
  amountPerBlock: string;
}
export interface MsgAddExternalIncentiveProtoMsg {
  typeUrl: "/elys.masterchef.MsgAddExternalIncentive";
  value: Uint8Array;
}
export interface MsgAddExternalIncentiveAmino {
  sender?: string;
  reward_denom?: string;
  pool_id?: string;
  from_block?: string;
  to_block?: string;
  amount_per_block?: string;
}
export interface MsgAddExternalIncentiveAminoMsg {
  type: "masterchef/MsgAddExternalIncentive";
  value: MsgAddExternalIncentiveAmino;
}
export interface MsgAddExternalIncentiveSDKType {
  sender: string;
  reward_denom: string;
  pool_id: bigint;
  from_block: bigint;
  to_block: bigint;
  amount_per_block: string;
}
export interface MsgAddExternalIncentiveResponse {}
export interface MsgAddExternalIncentiveResponseProtoMsg {
  typeUrl: "/elys.masterchef.MsgAddExternalIncentiveResponse";
  value: Uint8Array;
}
export interface MsgAddExternalIncentiveResponseAmino {}
export interface MsgAddExternalIncentiveResponseAminoMsg {
  type: "/elys.masterchef.MsgAddExternalIncentiveResponse";
  value: MsgAddExternalIncentiveResponseAmino;
}
export interface MsgAddExternalIncentiveResponseSDKType {}
export interface MsgUpdateParams {
  authority: string;
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/elys.masterchef.MsgUpdateParams";
  value: Uint8Array;
}
export interface MsgUpdateParamsAmino {
  authority?: string;
  params?: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "masterchef/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/elys.masterchef.MsgUpdateParamsResponse";
  value: Uint8Array;
}
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/elys.masterchef.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
export interface MsgUpdateParamsResponseSDKType {}
export interface PoolMultiplier {
  poolId: bigint;
  multiplier: string;
}
export interface PoolMultiplierProtoMsg {
  typeUrl: "/elys.masterchef.PoolMultiplier";
  value: Uint8Array;
}
export interface PoolMultiplierAmino {
  pool_id?: string;
  multiplier?: string;
}
export interface PoolMultiplierAminoMsg {
  type: "/elys.masterchef.PoolMultiplier";
  value: PoolMultiplierAmino;
}
export interface PoolMultiplierSDKType {
  pool_id: bigint;
  multiplier: string;
}
export interface MsgUpdatePoolMultipliers {
  authority: string;
  poolMultipliers: PoolMultiplier[];
}
export interface MsgUpdatePoolMultipliersProtoMsg {
  typeUrl: "/elys.masterchef.MsgUpdatePoolMultipliers";
  value: Uint8Array;
}
export interface MsgUpdatePoolMultipliersAmino {
  authority?: string;
  pool_multipliers?: PoolMultiplierAmino[];
}
export interface MsgUpdatePoolMultipliersAminoMsg {
  type: "masterchef/MsgUpdatePoolMultipliers";
  value: MsgUpdatePoolMultipliersAmino;
}
export interface MsgUpdatePoolMultipliersSDKType {
  authority: string;
  pool_multipliers: PoolMultiplierSDKType[];
}
export interface MsgUpdatePoolMultipliersResponse {}
export interface MsgUpdatePoolMultipliersResponseProtoMsg {
  typeUrl: "/elys.masterchef.MsgUpdatePoolMultipliersResponse";
  value: Uint8Array;
}
export interface MsgUpdatePoolMultipliersResponseAmino {}
export interface MsgUpdatePoolMultipliersResponseAminoMsg {
  type: "/elys.masterchef.MsgUpdatePoolMultipliersResponse";
  value: MsgUpdatePoolMultipliersResponseAmino;
}
export interface MsgUpdatePoolMultipliersResponseSDKType {}
export interface MsgClaimRewards {
  sender: string;
  poolIds: bigint[];
}
export interface MsgClaimRewardsProtoMsg {
  typeUrl: "/elys.masterchef.MsgClaimRewards";
  value: Uint8Array;
}
export interface MsgClaimRewardsAmino {
  sender?: string;
  pool_ids?: string[];
}
export interface MsgClaimRewardsAminoMsg {
  type: "masterchef/MsgClaimRewards";
  value: MsgClaimRewardsAmino;
}
export interface MsgClaimRewardsSDKType {
  sender: string;
  pool_ids: bigint[];
}
export interface MsgClaimRewardsResponse {}
export interface MsgClaimRewardsResponseProtoMsg {
  typeUrl: "/elys.masterchef.MsgClaimRewardsResponse";
  value: Uint8Array;
}
export interface MsgClaimRewardsResponseAmino {}
export interface MsgClaimRewardsResponseAminoMsg {
  type: "/elys.masterchef.MsgClaimRewardsResponse";
  value: MsgClaimRewardsResponseAmino;
}
export interface MsgClaimRewardsResponseSDKType {}
export interface MsgTogglePoolEdenRewards {
  authority: string;
  poolId: bigint;
  enable: boolean;
}
export interface MsgTogglePoolEdenRewardsProtoMsg {
  typeUrl: "/elys.masterchef.MsgTogglePoolEdenRewards";
  value: Uint8Array;
}
export interface MsgTogglePoolEdenRewardsAmino {
  authority?: string;
  pool_id?: string;
  enable?: boolean;
}
export interface MsgTogglePoolEdenRewardsAminoMsg {
  type: "masterchef/MsgTogglePoolEdenRewards";
  value: MsgTogglePoolEdenRewardsAmino;
}
export interface MsgTogglePoolEdenRewardsSDKType {
  authority: string;
  pool_id: bigint;
  enable: boolean;
}
export interface MsgTogglePoolEdenRewardsResponse {}
export interface MsgTogglePoolEdenRewardsResponseProtoMsg {
  typeUrl: "/elys.masterchef.MsgTogglePoolEdenRewardsResponse";
  value: Uint8Array;
}
export interface MsgTogglePoolEdenRewardsResponseAmino {}
export interface MsgTogglePoolEdenRewardsResponseAminoMsg {
  type: "/elys.masterchef.MsgTogglePoolEdenRewardsResponse";
  value: MsgTogglePoolEdenRewardsResponseAmino;
}
export interface MsgTogglePoolEdenRewardsResponseSDKType {}
function createBaseMsgAddExternalRewardDenom(): MsgAddExternalRewardDenom {
  return {
    authority: "",
    rewardDenom: "",
    minAmount: "",
    supported: false
  };
}
export const MsgAddExternalRewardDenom = {
  typeUrl: "/elys.masterchef.MsgAddExternalRewardDenom",
  encode(message: MsgAddExternalRewardDenom, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.rewardDenom !== "") {
      writer.uint32(18).string(message.rewardDenom);
    }
    if (message.minAmount !== "") {
      writer.uint32(26).string(message.minAmount);
    }
    if (message.supported === true) {
      writer.uint32(32).bool(message.supported);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddExternalRewardDenom {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddExternalRewardDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.rewardDenom = reader.string();
          break;
        case 3:
          message.minAmount = reader.string();
          break;
        case 4:
          message.supported = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAddExternalRewardDenom>): MsgAddExternalRewardDenom {
    const message = createBaseMsgAddExternalRewardDenom();
    message.authority = object.authority ?? "";
    message.rewardDenom = object.rewardDenom ?? "";
    message.minAmount = object.minAmount ?? "";
    message.supported = object.supported ?? false;
    return message;
  },
  fromAmino(object: MsgAddExternalRewardDenomAmino): MsgAddExternalRewardDenom {
    const message = createBaseMsgAddExternalRewardDenom();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.reward_denom !== undefined && object.reward_denom !== null) {
      message.rewardDenom = object.reward_denom;
    }
    if (object.min_amount !== undefined && object.min_amount !== null) {
      message.minAmount = object.min_amount;
    }
    if (object.supported !== undefined && object.supported !== null) {
      message.supported = object.supported;
    }
    return message;
  },
  toAmino(message: MsgAddExternalRewardDenom, useInterfaces: boolean = false): MsgAddExternalRewardDenomAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.reward_denom = message.rewardDenom === "" ? undefined : message.rewardDenom;
    obj.min_amount = message.minAmount === "" ? undefined : message.minAmount;
    obj.supported = message.supported === false ? undefined : message.supported;
    return obj;
  },
  fromAminoMsg(object: MsgAddExternalRewardDenomAminoMsg): MsgAddExternalRewardDenom {
    return MsgAddExternalRewardDenom.fromAmino(object.value);
  },
  toAminoMsg(message: MsgAddExternalRewardDenom, useInterfaces: boolean = false): MsgAddExternalRewardDenomAminoMsg {
    return {
      type: "masterchef/MsgAddExternalRewardDenom",
      value: MsgAddExternalRewardDenom.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgAddExternalRewardDenomProtoMsg, useInterfaces: boolean = false): MsgAddExternalRewardDenom {
    return MsgAddExternalRewardDenom.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddExternalRewardDenom): Uint8Array {
    return MsgAddExternalRewardDenom.encode(message).finish();
  },
  toProtoMsg(message: MsgAddExternalRewardDenom): MsgAddExternalRewardDenomProtoMsg {
    return {
      typeUrl: "/elys.masterchef.MsgAddExternalRewardDenom",
      value: MsgAddExternalRewardDenom.encode(message).finish()
    };
  }
};
function createBaseMsgAddExternalRewardDenomResponse(): MsgAddExternalRewardDenomResponse {
  return {};
}
export const MsgAddExternalRewardDenomResponse = {
  typeUrl: "/elys.masterchef.MsgAddExternalRewardDenomResponse",
  encode(_: MsgAddExternalRewardDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddExternalRewardDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddExternalRewardDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgAddExternalRewardDenomResponse>): MsgAddExternalRewardDenomResponse {
    const message = createBaseMsgAddExternalRewardDenomResponse();
    return message;
  },
  fromAmino(_: MsgAddExternalRewardDenomResponseAmino): MsgAddExternalRewardDenomResponse {
    const message = createBaseMsgAddExternalRewardDenomResponse();
    return message;
  },
  toAmino(_: MsgAddExternalRewardDenomResponse, useInterfaces: boolean = false): MsgAddExternalRewardDenomResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAddExternalRewardDenomResponseAminoMsg): MsgAddExternalRewardDenomResponse {
    return MsgAddExternalRewardDenomResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddExternalRewardDenomResponseProtoMsg, useInterfaces: boolean = false): MsgAddExternalRewardDenomResponse {
    return MsgAddExternalRewardDenomResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddExternalRewardDenomResponse): Uint8Array {
    return MsgAddExternalRewardDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddExternalRewardDenomResponse): MsgAddExternalRewardDenomResponseProtoMsg {
    return {
      typeUrl: "/elys.masterchef.MsgAddExternalRewardDenomResponse",
      value: MsgAddExternalRewardDenomResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAddExternalIncentive(): MsgAddExternalIncentive {
  return {
    sender: "",
    rewardDenom: "",
    poolId: BigInt(0),
    fromBlock: BigInt(0),
    toBlock: BigInt(0),
    amountPerBlock: ""
  };
}
export const MsgAddExternalIncentive = {
  typeUrl: "/elys.masterchef.MsgAddExternalIncentive",
  encode(message: MsgAddExternalIncentive, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
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
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddExternalIncentive {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddExternalIncentive();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAddExternalIncentive>): MsgAddExternalIncentive {
    const message = createBaseMsgAddExternalIncentive();
    message.sender = object.sender ?? "";
    message.rewardDenom = object.rewardDenom ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.fromBlock = object.fromBlock !== undefined && object.fromBlock !== null ? BigInt(object.fromBlock.toString()) : BigInt(0);
    message.toBlock = object.toBlock !== undefined && object.toBlock !== null ? BigInt(object.toBlock.toString()) : BigInt(0);
    message.amountPerBlock = object.amountPerBlock ?? "";
    return message;
  },
  fromAmino(object: MsgAddExternalIncentiveAmino): MsgAddExternalIncentive {
    const message = createBaseMsgAddExternalIncentive();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
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
    return message;
  },
  toAmino(message: MsgAddExternalIncentive, useInterfaces: boolean = false): MsgAddExternalIncentiveAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.reward_denom = message.rewardDenom === "" ? undefined : message.rewardDenom;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.from_block = message.fromBlock !== BigInt(0) ? message.fromBlock.toString() : undefined;
    obj.to_block = message.toBlock !== BigInt(0) ? message.toBlock.toString() : undefined;
    obj.amount_per_block = message.amountPerBlock === "" ? undefined : message.amountPerBlock;
    return obj;
  },
  fromAminoMsg(object: MsgAddExternalIncentiveAminoMsg): MsgAddExternalIncentive {
    return MsgAddExternalIncentive.fromAmino(object.value);
  },
  toAminoMsg(message: MsgAddExternalIncentive, useInterfaces: boolean = false): MsgAddExternalIncentiveAminoMsg {
    return {
      type: "masterchef/MsgAddExternalIncentive",
      value: MsgAddExternalIncentive.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgAddExternalIncentiveProtoMsg, useInterfaces: boolean = false): MsgAddExternalIncentive {
    return MsgAddExternalIncentive.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddExternalIncentive): Uint8Array {
    return MsgAddExternalIncentive.encode(message).finish();
  },
  toProtoMsg(message: MsgAddExternalIncentive): MsgAddExternalIncentiveProtoMsg {
    return {
      typeUrl: "/elys.masterchef.MsgAddExternalIncentive",
      value: MsgAddExternalIncentive.encode(message).finish()
    };
  }
};
function createBaseMsgAddExternalIncentiveResponse(): MsgAddExternalIncentiveResponse {
  return {};
}
export const MsgAddExternalIncentiveResponse = {
  typeUrl: "/elys.masterchef.MsgAddExternalIncentiveResponse",
  encode(_: MsgAddExternalIncentiveResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddExternalIncentiveResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddExternalIncentiveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgAddExternalIncentiveResponse>): MsgAddExternalIncentiveResponse {
    const message = createBaseMsgAddExternalIncentiveResponse();
    return message;
  },
  fromAmino(_: MsgAddExternalIncentiveResponseAmino): MsgAddExternalIncentiveResponse {
    const message = createBaseMsgAddExternalIncentiveResponse();
    return message;
  },
  toAmino(_: MsgAddExternalIncentiveResponse, useInterfaces: boolean = false): MsgAddExternalIncentiveResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAddExternalIncentiveResponseAminoMsg): MsgAddExternalIncentiveResponse {
    return MsgAddExternalIncentiveResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddExternalIncentiveResponseProtoMsg, useInterfaces: boolean = false): MsgAddExternalIncentiveResponse {
    return MsgAddExternalIncentiveResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddExternalIncentiveResponse): Uint8Array {
    return MsgAddExternalIncentiveResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddExternalIncentiveResponse): MsgAddExternalIncentiveResponseProtoMsg {
    return {
      typeUrl: "/elys.masterchef.MsgAddExternalIncentiveResponse",
      value: MsgAddExternalIncentiveResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/elys.masterchef.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAminoMsg {
    return {
      type: "masterchef/MsgUpdateParams",
      value: MsgUpdateParams.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg, useInterfaces: boolean = false): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/elys.masterchef.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/elys.masterchef.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse, useInterfaces: boolean = false): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/elys.masterchef.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBasePoolMultiplier(): PoolMultiplier {
  return {
    poolId: BigInt(0),
    multiplier: ""
  };
}
export const PoolMultiplier = {
  typeUrl: "/elys.masterchef.PoolMultiplier",
  encode(message: PoolMultiplier, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.multiplier !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.multiplier, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PoolMultiplier {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolMultiplier();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.multiplier = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolMultiplier>): PoolMultiplier {
    const message = createBasePoolMultiplier();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.multiplier = object.multiplier ?? "";
    return message;
  },
  fromAmino(object: PoolMultiplierAmino): PoolMultiplier {
    const message = createBasePoolMultiplier();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.multiplier !== undefined && object.multiplier !== null) {
      message.multiplier = object.multiplier;
    }
    return message;
  },
  toAmino(message: PoolMultiplier, useInterfaces: boolean = false): PoolMultiplierAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.multiplier = message.multiplier === "" ? undefined : message.multiplier;
    return obj;
  },
  fromAminoMsg(object: PoolMultiplierAminoMsg): PoolMultiplier {
    return PoolMultiplier.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolMultiplierProtoMsg, useInterfaces: boolean = false): PoolMultiplier {
    return PoolMultiplier.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PoolMultiplier): Uint8Array {
    return PoolMultiplier.encode(message).finish();
  },
  toProtoMsg(message: PoolMultiplier): PoolMultiplierProtoMsg {
    return {
      typeUrl: "/elys.masterchef.PoolMultiplier",
      value: PoolMultiplier.encode(message).finish()
    };
  }
};
function createBaseMsgUpdatePoolMultipliers(): MsgUpdatePoolMultipliers {
  return {
    authority: "",
    poolMultipliers: []
  };
}
export const MsgUpdatePoolMultipliers = {
  typeUrl: "/elys.masterchef.MsgUpdatePoolMultipliers",
  encode(message: MsgUpdatePoolMultipliers, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.poolMultipliers) {
      PoolMultiplier.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdatePoolMultipliers {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePoolMultipliers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.poolMultipliers.push(PoolMultiplier.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdatePoolMultipliers>): MsgUpdatePoolMultipliers {
    const message = createBaseMsgUpdatePoolMultipliers();
    message.authority = object.authority ?? "";
    message.poolMultipliers = object.poolMultipliers?.map(e => PoolMultiplier.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgUpdatePoolMultipliersAmino): MsgUpdatePoolMultipliers {
    const message = createBaseMsgUpdatePoolMultipliers();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    message.poolMultipliers = object.pool_multipliers?.map(e => PoolMultiplier.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgUpdatePoolMultipliers, useInterfaces: boolean = false): MsgUpdatePoolMultipliersAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    if (message.poolMultipliers) {
      obj.pool_multipliers = message.poolMultipliers.map(e => e ? PoolMultiplier.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pool_multipliers = message.poolMultipliers;
    }
    return obj;
  },
  fromAminoMsg(object: MsgUpdatePoolMultipliersAminoMsg): MsgUpdatePoolMultipliers {
    return MsgUpdatePoolMultipliers.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdatePoolMultipliers, useInterfaces: boolean = false): MsgUpdatePoolMultipliersAminoMsg {
    return {
      type: "masterchef/MsgUpdatePoolMultipliers",
      value: MsgUpdatePoolMultipliers.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdatePoolMultipliersProtoMsg, useInterfaces: boolean = false): MsgUpdatePoolMultipliers {
    return MsgUpdatePoolMultipliers.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdatePoolMultipliers): Uint8Array {
    return MsgUpdatePoolMultipliers.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdatePoolMultipliers): MsgUpdatePoolMultipliersProtoMsg {
    return {
      typeUrl: "/elys.masterchef.MsgUpdatePoolMultipliers",
      value: MsgUpdatePoolMultipliers.encode(message).finish()
    };
  }
};
function createBaseMsgUpdatePoolMultipliersResponse(): MsgUpdatePoolMultipliersResponse {
  return {};
}
export const MsgUpdatePoolMultipliersResponse = {
  typeUrl: "/elys.masterchef.MsgUpdatePoolMultipliersResponse",
  encode(_: MsgUpdatePoolMultipliersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdatePoolMultipliersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdatePoolMultipliersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdatePoolMultipliersResponse>): MsgUpdatePoolMultipliersResponse {
    const message = createBaseMsgUpdatePoolMultipliersResponse();
    return message;
  },
  fromAmino(_: MsgUpdatePoolMultipliersResponseAmino): MsgUpdatePoolMultipliersResponse {
    const message = createBaseMsgUpdatePoolMultipliersResponse();
    return message;
  },
  toAmino(_: MsgUpdatePoolMultipliersResponse, useInterfaces: boolean = false): MsgUpdatePoolMultipliersResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdatePoolMultipliersResponseAminoMsg): MsgUpdatePoolMultipliersResponse {
    return MsgUpdatePoolMultipliersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdatePoolMultipliersResponseProtoMsg, useInterfaces: boolean = false): MsgUpdatePoolMultipliersResponse {
    return MsgUpdatePoolMultipliersResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdatePoolMultipliersResponse): Uint8Array {
    return MsgUpdatePoolMultipliersResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdatePoolMultipliersResponse): MsgUpdatePoolMultipliersResponseProtoMsg {
    return {
      typeUrl: "/elys.masterchef.MsgUpdatePoolMultipliersResponse",
      value: MsgUpdatePoolMultipliersResponse.encode(message).finish()
    };
  }
};
function createBaseMsgClaimRewards(): MsgClaimRewards {
  return {
    sender: "",
    poolIds: []
  };
}
export const MsgClaimRewards = {
  typeUrl: "/elys.masterchef.MsgClaimRewards",
  encode(message: MsgClaimRewards, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    writer.uint32(18).fork();
    for (const v of message.poolIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgClaimRewards {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimRewards();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.poolIds.push(reader.uint64());
            }
          } else {
            message.poolIds.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgClaimRewards>): MsgClaimRewards {
    const message = createBaseMsgClaimRewards();
    message.sender = object.sender ?? "";
    message.poolIds = object.poolIds?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: MsgClaimRewardsAmino): MsgClaimRewards {
    const message = createBaseMsgClaimRewards();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.poolIds = object.pool_ids?.map(e => BigInt(e)) || [];
    return message;
  },
  toAmino(message: MsgClaimRewards, useInterfaces: boolean = false): MsgClaimRewardsAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    if (message.poolIds) {
      obj.pool_ids = message.poolIds.map(e => e.toString());
    } else {
      obj.pool_ids = message.poolIds;
    }
    return obj;
  },
  fromAminoMsg(object: MsgClaimRewardsAminoMsg): MsgClaimRewards {
    return MsgClaimRewards.fromAmino(object.value);
  },
  toAminoMsg(message: MsgClaimRewards, useInterfaces: boolean = false): MsgClaimRewardsAminoMsg {
    return {
      type: "masterchef/MsgClaimRewards",
      value: MsgClaimRewards.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgClaimRewardsProtoMsg, useInterfaces: boolean = false): MsgClaimRewards {
    return MsgClaimRewards.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgClaimRewards): Uint8Array {
    return MsgClaimRewards.encode(message).finish();
  },
  toProtoMsg(message: MsgClaimRewards): MsgClaimRewardsProtoMsg {
    return {
      typeUrl: "/elys.masterchef.MsgClaimRewards",
      value: MsgClaimRewards.encode(message).finish()
    };
  }
};
function createBaseMsgClaimRewardsResponse(): MsgClaimRewardsResponse {
  return {};
}
export const MsgClaimRewardsResponse = {
  typeUrl: "/elys.masterchef.MsgClaimRewardsResponse",
  encode(_: MsgClaimRewardsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgClaimRewardsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimRewardsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgClaimRewardsResponse>): MsgClaimRewardsResponse {
    const message = createBaseMsgClaimRewardsResponse();
    return message;
  },
  fromAmino(_: MsgClaimRewardsResponseAmino): MsgClaimRewardsResponse {
    const message = createBaseMsgClaimRewardsResponse();
    return message;
  },
  toAmino(_: MsgClaimRewardsResponse, useInterfaces: boolean = false): MsgClaimRewardsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgClaimRewardsResponseAminoMsg): MsgClaimRewardsResponse {
    return MsgClaimRewardsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgClaimRewardsResponseProtoMsg, useInterfaces: boolean = false): MsgClaimRewardsResponse {
    return MsgClaimRewardsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgClaimRewardsResponse): Uint8Array {
    return MsgClaimRewardsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgClaimRewardsResponse): MsgClaimRewardsResponseProtoMsg {
    return {
      typeUrl: "/elys.masterchef.MsgClaimRewardsResponse",
      value: MsgClaimRewardsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgTogglePoolEdenRewards(): MsgTogglePoolEdenRewards {
  return {
    authority: "",
    poolId: BigInt(0),
    enable: false
  };
}
export const MsgTogglePoolEdenRewards = {
  typeUrl: "/elys.masterchef.MsgTogglePoolEdenRewards",
  encode(message: MsgTogglePoolEdenRewards, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.enable === true) {
      writer.uint32(24).bool(message.enable);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgTogglePoolEdenRewards {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTogglePoolEdenRewards();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.enable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgTogglePoolEdenRewards>): MsgTogglePoolEdenRewards {
    const message = createBaseMsgTogglePoolEdenRewards();
    message.authority = object.authority ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.enable = object.enable ?? false;
    return message;
  },
  fromAmino(object: MsgTogglePoolEdenRewardsAmino): MsgTogglePoolEdenRewards {
    const message = createBaseMsgTogglePoolEdenRewards();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.enable !== undefined && object.enable !== null) {
      message.enable = object.enable;
    }
    return message;
  },
  toAmino(message: MsgTogglePoolEdenRewards, useInterfaces: boolean = false): MsgTogglePoolEdenRewardsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.enable = message.enable === false ? undefined : message.enable;
    return obj;
  },
  fromAminoMsg(object: MsgTogglePoolEdenRewardsAminoMsg): MsgTogglePoolEdenRewards {
    return MsgTogglePoolEdenRewards.fromAmino(object.value);
  },
  toAminoMsg(message: MsgTogglePoolEdenRewards, useInterfaces: boolean = false): MsgTogglePoolEdenRewardsAminoMsg {
    return {
      type: "masterchef/MsgTogglePoolEdenRewards",
      value: MsgTogglePoolEdenRewards.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgTogglePoolEdenRewardsProtoMsg, useInterfaces: boolean = false): MsgTogglePoolEdenRewards {
    return MsgTogglePoolEdenRewards.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgTogglePoolEdenRewards): Uint8Array {
    return MsgTogglePoolEdenRewards.encode(message).finish();
  },
  toProtoMsg(message: MsgTogglePoolEdenRewards): MsgTogglePoolEdenRewardsProtoMsg {
    return {
      typeUrl: "/elys.masterchef.MsgTogglePoolEdenRewards",
      value: MsgTogglePoolEdenRewards.encode(message).finish()
    };
  }
};
function createBaseMsgTogglePoolEdenRewardsResponse(): MsgTogglePoolEdenRewardsResponse {
  return {};
}
export const MsgTogglePoolEdenRewardsResponse = {
  typeUrl: "/elys.masterchef.MsgTogglePoolEdenRewardsResponse",
  encode(_: MsgTogglePoolEdenRewardsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgTogglePoolEdenRewardsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTogglePoolEdenRewardsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgTogglePoolEdenRewardsResponse>): MsgTogglePoolEdenRewardsResponse {
    const message = createBaseMsgTogglePoolEdenRewardsResponse();
    return message;
  },
  fromAmino(_: MsgTogglePoolEdenRewardsResponseAmino): MsgTogglePoolEdenRewardsResponse {
    const message = createBaseMsgTogglePoolEdenRewardsResponse();
    return message;
  },
  toAmino(_: MsgTogglePoolEdenRewardsResponse, useInterfaces: boolean = false): MsgTogglePoolEdenRewardsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgTogglePoolEdenRewardsResponseAminoMsg): MsgTogglePoolEdenRewardsResponse {
    return MsgTogglePoolEdenRewardsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgTogglePoolEdenRewardsResponseProtoMsg, useInterfaces: boolean = false): MsgTogglePoolEdenRewardsResponse {
    return MsgTogglePoolEdenRewardsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgTogglePoolEdenRewardsResponse): Uint8Array {
    return MsgTogglePoolEdenRewardsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgTogglePoolEdenRewardsResponse): MsgTogglePoolEdenRewardsResponseProtoMsg {
    return {
      typeUrl: "/elys.masterchef.MsgTogglePoolEdenRewardsResponse",
      value: MsgTogglePoolEdenRewardsResponse.encode(message).finish()
    };
  }
};