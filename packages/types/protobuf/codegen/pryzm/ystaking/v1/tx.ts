//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface MsgBond {
  creator: string;
  amount: Coin | undefined;
}
export interface MsgBondProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.MsgBond";
  value: Uint8Array;
}
export interface MsgBondAmino {
  creator?: string;
  amount?: CoinAmino | undefined;
}
export interface MsgBondAminoMsg {
  type: "pryzm/ystaking/v1/Bond";
  value: MsgBondAmino;
}
export interface MsgBondSDKType {
  creator: string;
  amount: CoinSDKType | undefined;
}
export interface MsgBondResponse {
  totalBondedAmount: Coin | undefined;
}
export interface MsgBondResponseProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.MsgBondResponse";
  value: Uint8Array;
}
export interface MsgBondResponseAmino {
  total_bonded_amount?: CoinAmino | undefined;
}
export interface MsgBondResponseAminoMsg {
  type: "/pryzm.ystaking.v1.MsgBondResponse";
  value: MsgBondResponseAmino;
}
export interface MsgBondResponseSDKType {
  total_bonded_amount: CoinSDKType | undefined;
}
export interface MsgUnbond {
  creator: string;
  amount: Coin | undefined;
}
export interface MsgUnbondProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.MsgUnbond";
  value: Uint8Array;
}
export interface MsgUnbondAmino {
  creator?: string;
  amount?: CoinAmino | undefined;
}
export interface MsgUnbondAminoMsg {
  type: "pryzm/ystaking/v1/Unbond";
  value: MsgUnbondAmino;
}
export interface MsgUnbondSDKType {
  creator: string;
  amount: CoinSDKType | undefined;
}
export interface MsgUnbondResponse {
  remainderBondedAmount: Coin | undefined;
  accruedReward: Coin | undefined;
  fee: Coin | undefined;
}
export interface MsgUnbondResponseProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.MsgUnbondResponse";
  value: Uint8Array;
}
export interface MsgUnbondResponseAmino {
  remainder_bonded_amount?: CoinAmino | undefined;
  accrued_reward?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface MsgUnbondResponseAminoMsg {
  type: "/pryzm.ystaking.v1.MsgUnbondResponse";
  value: MsgUnbondResponseAmino;
}
export interface MsgUnbondResponseSDKType {
  remainder_bonded_amount: CoinSDKType | undefined;
  accrued_reward: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface MsgClaimReward {
  creator: string;
  denom: string;
}
export interface MsgClaimRewardProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.MsgClaimReward";
  value: Uint8Array;
}
export interface MsgClaimRewardAmino {
  creator?: string;
  denom?: string;
}
export interface MsgClaimRewardAminoMsg {
  type: "pryzm/ystaking/v1/ClaimReward";
  value: MsgClaimRewardAmino;
}
export interface MsgClaimRewardSDKType {
  creator: string;
  denom: string;
}
export interface MsgClaimRewardResponse {
  accruedReward: Coin | undefined;
  fee: Coin | undefined;
}
export interface MsgClaimRewardResponseProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.MsgClaimRewardResponse";
  value: Uint8Array;
}
export interface MsgClaimRewardResponseAmino {
  accrued_reward?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface MsgClaimRewardResponseAminoMsg {
  type: "/pryzm.ystaking.v1.MsgClaimRewardResponse";
  value: MsgClaimRewardResponseAmino;
}
export interface MsgClaimRewardResponseSDKType {
  accrued_reward: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface MsgExitPool {
  creator: string;
  denom: string;
}
export interface MsgExitPoolProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.MsgExitPool";
  value: Uint8Array;
}
export interface MsgExitPoolAmino {
  creator?: string;
  denom?: string;
}
export interface MsgExitPoolAminoMsg {
  type: "pryzm/ystaking/v1/ExitPool";
  value: MsgExitPoolAmino;
}
export interface MsgExitPoolSDKType {
  creator: string;
  denom: string;
}
export interface MsgExitPoolResponse {
  accruedReward: Coin | undefined;
  fee: Coin | undefined;
}
export interface MsgExitPoolResponseProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.MsgExitPoolResponse";
  value: Uint8Array;
}
export interface MsgExitPoolResponseAmino {
  accrued_reward?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface MsgExitPoolResponseAminoMsg {
  type: "/pryzm.ystaking.v1.MsgExitPoolResponse";
  value: MsgExitPoolResponseAmino;
}
export interface MsgExitPoolResponseSDKType {
  accrued_reward: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
function createBaseMsgBond(): MsgBond {
  return {
    creator: "",
    amount: Coin.fromPartial({})
  };
}
export const MsgBond = {
  typeUrl: "/pryzm.ystaking.v1.MsgBond",
  encode(message: MsgBond, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgBond {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgBond>): MsgBond {
    const message = createBaseMsgBond();
    message.creator = object.creator ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: MsgBondAmino): MsgBond {
    const message = createBaseMsgBond();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: MsgBond, useInterfaces: boolean = false): MsgBondAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgBondAminoMsg): MsgBond {
    return MsgBond.fromAmino(object.value);
  },
  toAminoMsg(message: MsgBond, useInterfaces: boolean = false): MsgBondAminoMsg {
    return {
      type: "pryzm/ystaking/v1/Bond",
      value: MsgBond.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgBondProtoMsg, useInterfaces: boolean = false): MsgBond {
    return MsgBond.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgBond): Uint8Array {
    return MsgBond.encode(message).finish();
  },
  toProtoMsg(message: MsgBond): MsgBondProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.MsgBond",
      value: MsgBond.encode(message).finish()
    };
  }
};
function createBaseMsgBondResponse(): MsgBondResponse {
  return {
    totalBondedAmount: Coin.fromPartial({})
  };
}
export const MsgBondResponse = {
  typeUrl: "/pryzm.ystaking.v1.MsgBondResponse",
  encode(message: MsgBondResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.totalBondedAmount !== undefined) {
      Coin.encode(message.totalBondedAmount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgBondResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBondResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalBondedAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgBondResponse>): MsgBondResponse {
    const message = createBaseMsgBondResponse();
    message.totalBondedAmount = object.totalBondedAmount !== undefined && object.totalBondedAmount !== null ? Coin.fromPartial(object.totalBondedAmount) : undefined;
    return message;
  },
  fromAmino(object: MsgBondResponseAmino): MsgBondResponse {
    const message = createBaseMsgBondResponse();
    if (object.total_bonded_amount !== undefined && object.total_bonded_amount !== null) {
      message.totalBondedAmount = Coin.fromAmino(object.total_bonded_amount);
    }
    return message;
  },
  toAmino(message: MsgBondResponse, useInterfaces: boolean = false): MsgBondResponseAmino {
    const obj: any = {};
    obj.total_bonded_amount = message.totalBondedAmount ? Coin.toAmino(message.totalBondedAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgBondResponseAminoMsg): MsgBondResponse {
    return MsgBondResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgBondResponseProtoMsg, useInterfaces: boolean = false): MsgBondResponse {
    return MsgBondResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgBondResponse): Uint8Array {
    return MsgBondResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgBondResponse): MsgBondResponseProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.MsgBondResponse",
      value: MsgBondResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUnbond(): MsgUnbond {
  return {
    creator: "",
    amount: Coin.fromPartial({})
  };
}
export const MsgUnbond = {
  typeUrl: "/pryzm.ystaking.v1.MsgUnbond",
  encode(message: MsgUnbond, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUnbond {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnbond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUnbond>): MsgUnbond {
    const message = createBaseMsgUnbond();
    message.creator = object.creator ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: MsgUnbondAmino): MsgUnbond {
    const message = createBaseMsgUnbond();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: MsgUnbond, useInterfaces: boolean = false): MsgUnbondAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUnbondAminoMsg): MsgUnbond {
    return MsgUnbond.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUnbond, useInterfaces: boolean = false): MsgUnbondAminoMsg {
    return {
      type: "pryzm/ystaking/v1/Unbond",
      value: MsgUnbond.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUnbondProtoMsg, useInterfaces: boolean = false): MsgUnbond {
    return MsgUnbond.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUnbond): Uint8Array {
    return MsgUnbond.encode(message).finish();
  },
  toProtoMsg(message: MsgUnbond): MsgUnbondProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.MsgUnbond",
      value: MsgUnbond.encode(message).finish()
    };
  }
};
function createBaseMsgUnbondResponse(): MsgUnbondResponse {
  return {
    remainderBondedAmount: Coin.fromPartial({}),
    accruedReward: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const MsgUnbondResponse = {
  typeUrl: "/pryzm.ystaking.v1.MsgUnbondResponse",
  encode(message: MsgUnbondResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.remainderBondedAmount !== undefined) {
      Coin.encode(message.remainderBondedAmount, writer.uint32(10).fork()).ldelim();
    }
    if (message.accruedReward !== undefined) {
      Coin.encode(message.accruedReward, writer.uint32(18).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUnbondResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnbondResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.remainderBondedAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.accruedReward = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUnbondResponse>): MsgUnbondResponse {
    const message = createBaseMsgUnbondResponse();
    message.remainderBondedAmount = object.remainderBondedAmount !== undefined && object.remainderBondedAmount !== null ? Coin.fromPartial(object.remainderBondedAmount) : undefined;
    message.accruedReward = object.accruedReward !== undefined && object.accruedReward !== null ? Coin.fromPartial(object.accruedReward) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: MsgUnbondResponseAmino): MsgUnbondResponse {
    const message = createBaseMsgUnbondResponse();
    if (object.remainder_bonded_amount !== undefined && object.remainder_bonded_amount !== null) {
      message.remainderBondedAmount = Coin.fromAmino(object.remainder_bonded_amount);
    }
    if (object.accrued_reward !== undefined && object.accrued_reward !== null) {
      message.accruedReward = Coin.fromAmino(object.accrued_reward);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: MsgUnbondResponse, useInterfaces: boolean = false): MsgUnbondResponseAmino {
    const obj: any = {};
    obj.remainder_bonded_amount = message.remainderBondedAmount ? Coin.toAmino(message.remainderBondedAmount, useInterfaces) : undefined;
    obj.accrued_reward = message.accruedReward ? Coin.toAmino(message.accruedReward, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUnbondResponseAminoMsg): MsgUnbondResponse {
    return MsgUnbondResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUnbondResponseProtoMsg, useInterfaces: boolean = false): MsgUnbondResponse {
    return MsgUnbondResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUnbondResponse): Uint8Array {
    return MsgUnbondResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUnbondResponse): MsgUnbondResponseProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.MsgUnbondResponse",
      value: MsgUnbondResponse.encode(message).finish()
    };
  }
};
function createBaseMsgClaimReward(): MsgClaimReward {
  return {
    creator: "",
    denom: ""
  };
}
export const MsgClaimReward = {
  typeUrl: "/pryzm.ystaking.v1.MsgClaimReward",
  encode(message: MsgClaimReward, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgClaimReward {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgClaimReward>): MsgClaimReward {
    const message = createBaseMsgClaimReward();
    message.creator = object.creator ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: MsgClaimRewardAmino): MsgClaimReward {
    const message = createBaseMsgClaimReward();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: MsgClaimReward, useInterfaces: boolean = false): MsgClaimRewardAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: MsgClaimRewardAminoMsg): MsgClaimReward {
    return MsgClaimReward.fromAmino(object.value);
  },
  toAminoMsg(message: MsgClaimReward, useInterfaces: boolean = false): MsgClaimRewardAminoMsg {
    return {
      type: "pryzm/ystaking/v1/ClaimReward",
      value: MsgClaimReward.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgClaimRewardProtoMsg, useInterfaces: boolean = false): MsgClaimReward {
    return MsgClaimReward.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgClaimReward): Uint8Array {
    return MsgClaimReward.encode(message).finish();
  },
  toProtoMsg(message: MsgClaimReward): MsgClaimRewardProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.MsgClaimReward",
      value: MsgClaimReward.encode(message).finish()
    };
  }
};
function createBaseMsgClaimRewardResponse(): MsgClaimRewardResponse {
  return {
    accruedReward: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const MsgClaimRewardResponse = {
  typeUrl: "/pryzm.ystaking.v1.MsgClaimRewardResponse",
  encode(message: MsgClaimRewardResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.accruedReward !== undefined) {
      Coin.encode(message.accruedReward, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgClaimRewardResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimRewardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accruedReward = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgClaimRewardResponse>): MsgClaimRewardResponse {
    const message = createBaseMsgClaimRewardResponse();
    message.accruedReward = object.accruedReward !== undefined && object.accruedReward !== null ? Coin.fromPartial(object.accruedReward) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: MsgClaimRewardResponseAmino): MsgClaimRewardResponse {
    const message = createBaseMsgClaimRewardResponse();
    if (object.accrued_reward !== undefined && object.accrued_reward !== null) {
      message.accruedReward = Coin.fromAmino(object.accrued_reward);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: MsgClaimRewardResponse, useInterfaces: boolean = false): MsgClaimRewardResponseAmino {
    const obj: any = {};
    obj.accrued_reward = message.accruedReward ? Coin.toAmino(message.accruedReward, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgClaimRewardResponseAminoMsg): MsgClaimRewardResponse {
    return MsgClaimRewardResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgClaimRewardResponseProtoMsg, useInterfaces: boolean = false): MsgClaimRewardResponse {
    return MsgClaimRewardResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgClaimRewardResponse): Uint8Array {
    return MsgClaimRewardResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgClaimRewardResponse): MsgClaimRewardResponseProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.MsgClaimRewardResponse",
      value: MsgClaimRewardResponse.encode(message).finish()
    };
  }
};
function createBaseMsgExitPool(): MsgExitPool {
  return {
    creator: "",
    denom: ""
  };
}
export const MsgExitPool = {
  typeUrl: "/pryzm.ystaking.v1.MsgExitPool",
  encode(message: MsgExitPool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgExitPool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExitPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExitPool>): MsgExitPool {
    const message = createBaseMsgExitPool();
    message.creator = object.creator ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: MsgExitPoolAmino): MsgExitPool {
    const message = createBaseMsgExitPool();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: MsgExitPool, useInterfaces: boolean = false): MsgExitPoolAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: MsgExitPoolAminoMsg): MsgExitPool {
    return MsgExitPool.fromAmino(object.value);
  },
  toAminoMsg(message: MsgExitPool, useInterfaces: boolean = false): MsgExitPoolAminoMsg {
    return {
      type: "pryzm/ystaking/v1/ExitPool",
      value: MsgExitPool.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgExitPoolProtoMsg, useInterfaces: boolean = false): MsgExitPool {
    return MsgExitPool.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgExitPool): Uint8Array {
    return MsgExitPool.encode(message).finish();
  },
  toProtoMsg(message: MsgExitPool): MsgExitPoolProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.MsgExitPool",
      value: MsgExitPool.encode(message).finish()
    };
  }
};
function createBaseMsgExitPoolResponse(): MsgExitPoolResponse {
  return {
    accruedReward: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const MsgExitPoolResponse = {
  typeUrl: "/pryzm.ystaking.v1.MsgExitPoolResponse",
  encode(message: MsgExitPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.accruedReward !== undefined) {
      Coin.encode(message.accruedReward, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgExitPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExitPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accruedReward = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExitPoolResponse>): MsgExitPoolResponse {
    const message = createBaseMsgExitPoolResponse();
    message.accruedReward = object.accruedReward !== undefined && object.accruedReward !== null ? Coin.fromPartial(object.accruedReward) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: MsgExitPoolResponseAmino): MsgExitPoolResponse {
    const message = createBaseMsgExitPoolResponse();
    if (object.accrued_reward !== undefined && object.accrued_reward !== null) {
      message.accruedReward = Coin.fromAmino(object.accrued_reward);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: MsgExitPoolResponse, useInterfaces: boolean = false): MsgExitPoolResponseAmino {
    const obj: any = {};
    obj.accrued_reward = message.accruedReward ? Coin.toAmino(message.accruedReward, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgExitPoolResponseAminoMsg): MsgExitPoolResponse {
    return MsgExitPoolResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgExitPoolResponseProtoMsg, useInterfaces: boolean = false): MsgExitPoolResponse {
    return MsgExitPoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgExitPoolResponse): Uint8Array {
    return MsgExitPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgExitPoolResponse): MsgExitPoolResponseProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.MsgExitPoolResponse",
      value: MsgExitPoolResponse.encode(message).finish()
    };
  }
};