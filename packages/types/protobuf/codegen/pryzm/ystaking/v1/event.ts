import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { UserStakeState, UserStakeStateAmino, UserStakeStateSDKType } from "./user_stake_state";
import { AssetPoolState, AssetPoolStateAmino, AssetPoolStateSDKType, AssetMaturityPoolState, AssetMaturityPoolStateAmino, AssetMaturityPoolStateSDKType } from "./asset_pool_state";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface EventYStakingBond {
  accountAddress: string;
  amount: Coin | undefined;
}
export interface EventYStakingBondProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.EventYStakingBond";
  value: Uint8Array;
}
export interface EventYStakingBondAmino {
  account_address?: string;
  amount?: CoinAmino | undefined;
}
export interface EventYStakingBondAminoMsg {
  type: "/pryzm.ystaking.v1.EventYStakingBond";
  value: EventYStakingBondAmino;
}
export interface EventYStakingBondSDKType {
  account_address: string;
  amount: CoinSDKType | undefined;
}
export interface EventYStakingUnbond {
  accountAddress: string;
  amount: Coin | undefined;
  accruedReward: Coin | undefined;
  fee: Coin | undefined;
}
export interface EventYStakingUnbondProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.EventYStakingUnbond";
  value: Uint8Array;
}
export interface EventYStakingUnbondAmino {
  account_address?: string;
  amount?: CoinAmino | undefined;
  accrued_reward?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface EventYStakingUnbondAminoMsg {
  type: "/pryzm.ystaking.v1.EventYStakingUnbond";
  value: EventYStakingUnbondAmino;
}
export interface EventYStakingUnbondSDKType {
  account_address: string;
  amount: CoinSDKType | undefined;
  accrued_reward: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface EventYStakingExitPool {
  accountAddress: string;
  accruedReward: Coin | undefined;
  fee: Coin | undefined;
}
export interface EventYStakingExitPoolProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.EventYStakingExitPool";
  value: Uint8Array;
}
export interface EventYStakingExitPoolAmino {
  account_address?: string;
  accrued_reward?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface EventYStakingExitPoolAminoMsg {
  type: "/pryzm.ystaking.v1.EventYStakingExitPool";
  value: EventYStakingExitPoolAmino;
}
export interface EventYStakingExitPoolSDKType {
  account_address: string;
  accrued_reward: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface EventYStakingClaimReward {
  accountAddress: string;
  accruedReward: Coin | undefined;
  fee: Coin | undefined;
}
export interface EventYStakingClaimRewardProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.EventYStakingClaimReward";
  value: Uint8Array;
}
export interface EventYStakingClaimRewardAmino {
  account_address?: string;
  accrued_reward?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface EventYStakingClaimRewardAminoMsg {
  type: "/pryzm.ystaking.v1.EventYStakingClaimReward";
  value: EventYStakingClaimRewardAmino;
}
export interface EventYStakingClaimRewardSDKType {
  account_address: string;
  accrued_reward: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface EventDeactivateYStakingMaturityPool {
  burntBondedAmount: Coin | undefined;
  assetId: string;
  maturitySymbol: string;
}
export interface EventDeactivateYStakingMaturityPoolProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.EventDeactivateYStakingMaturityPool";
  value: Uint8Array;
}
export interface EventDeactivateYStakingMaturityPoolAmino {
  burnt_bonded_amount?: CoinAmino | undefined;
  asset_id?: string;
  maturity_symbol?: string;
}
export interface EventDeactivateYStakingMaturityPoolAminoMsg {
  type: "/pryzm.ystaking.v1.EventDeactivateYStakingMaturityPool";
  value: EventDeactivateYStakingMaturityPoolAmino;
}
export interface EventDeactivateYStakingMaturityPoolSDKType {
  burnt_bonded_amount: CoinSDKType | undefined;
  asset_id: string;
  maturity_symbol: string;
}
export interface EventSetUserStakeState {
  userStakeState: UserStakeState | undefined;
}
export interface EventSetUserStakeStateProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.EventSetUserStakeState";
  value: Uint8Array;
}
export interface EventSetUserStakeStateAmino {
  user_stake_state?: UserStakeStateAmino | undefined;
}
export interface EventSetUserStakeStateAminoMsg {
  type: "/pryzm.ystaking.v1.EventSetUserStakeState";
  value: EventSetUserStakeStateAmino;
}
export interface EventSetUserStakeStateSDKType {
  user_stake_state: UserStakeStateSDKType | undefined;
}
export interface EventSetAssetPoolState {
  assetPoolState: AssetPoolState | undefined;
}
export interface EventSetAssetPoolStateProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.EventSetAssetPoolState";
  value: Uint8Array;
}
export interface EventSetAssetPoolStateAmino {
  asset_pool_state?: AssetPoolStateAmino | undefined;
}
export interface EventSetAssetPoolStateAminoMsg {
  type: "/pryzm.ystaking.v1.EventSetAssetPoolState";
  value: EventSetAssetPoolStateAmino;
}
export interface EventSetAssetPoolStateSDKType {
  asset_pool_state: AssetPoolStateSDKType | undefined;
}
export interface EventSetAssetMaturityPoolState {
  assetMaturityPoolState: AssetMaturityPoolState | undefined;
}
export interface EventSetAssetMaturityPoolStateProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.EventSetAssetMaturityPoolState";
  value: Uint8Array;
}
export interface EventSetAssetMaturityPoolStateAmino {
  asset_maturity_pool_state?: AssetMaturityPoolStateAmino | undefined;
}
export interface EventSetAssetMaturityPoolStateAminoMsg {
  type: "/pryzm.ystaking.v1.EventSetAssetMaturityPoolState";
  value: EventSetAssetMaturityPoolStateAmino;
}
export interface EventSetAssetMaturityPoolStateSDKType {
  asset_maturity_pool_state: AssetMaturityPoolStateSDKType | undefined;
}
export interface EventDeleteUserStakeState {
  address: string;
  assetId: string;
  maturitySymbol: string;
}
export interface EventDeleteUserStakeStateProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.EventDeleteUserStakeState";
  value: Uint8Array;
}
export interface EventDeleteUserStakeStateAmino {
  address?: string;
  asset_id?: string;
  maturity_symbol?: string;
}
export interface EventDeleteUserStakeStateAminoMsg {
  type: "/pryzm.ystaking.v1.EventDeleteUserStakeState";
  value: EventDeleteUserStakeStateAmino;
}
export interface EventDeleteUserStakeStateSDKType {
  address: string;
  asset_id: string;
  maturity_symbol: string;
}
export interface EventDeleteAssetPoolState {
  assetId: string;
}
export interface EventDeleteAssetPoolStateProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.EventDeleteAssetPoolState";
  value: Uint8Array;
}
export interface EventDeleteAssetPoolStateAmino {
  asset_id?: string;
}
export interface EventDeleteAssetPoolStateAminoMsg {
  type: "/pryzm.ystaking.v1.EventDeleteAssetPoolState";
  value: EventDeleteAssetPoolStateAmino;
}
export interface EventDeleteAssetPoolStateSDKType {
  asset_id: string;
}
export interface EventDeleteAssetMaturityPoolState {
  assetId: string;
  maturitySymbol: string;
}
export interface EventDeleteAssetMaturityPoolStateProtoMsg {
  typeUrl: "/pryzm.ystaking.v1.EventDeleteAssetMaturityPoolState";
  value: Uint8Array;
}
export interface EventDeleteAssetMaturityPoolStateAmino {
  asset_id?: string;
  maturity_symbol?: string;
}
export interface EventDeleteAssetMaturityPoolStateAminoMsg {
  type: "/pryzm.ystaking.v1.EventDeleteAssetMaturityPoolState";
  value: EventDeleteAssetMaturityPoolStateAmino;
}
export interface EventDeleteAssetMaturityPoolStateSDKType {
  asset_id: string;
  maturity_symbol: string;
}
function createBaseEventYStakingBond(): EventYStakingBond {
  return {
    accountAddress: "",
    amount: Coin.fromPartial({})
  };
}
export const EventYStakingBond = {
  typeUrl: "/pryzm.ystaking.v1.EventYStakingBond",
  encode(message: EventYStakingBond, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.accountAddress !== "") {
      writer.uint32(10).string(message.accountAddress);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventYStakingBond {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventYStakingBond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountAddress = reader.string();
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
  fromPartial(object: Partial<EventYStakingBond>): EventYStakingBond {
    const message = createBaseEventYStakingBond();
    message.accountAddress = object.accountAddress ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: EventYStakingBondAmino): EventYStakingBond {
    const message = createBaseEventYStakingBond();
    if (object.account_address !== undefined && object.account_address !== null) {
      message.accountAddress = object.account_address;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: EventYStakingBond, useInterfaces: boolean = false): EventYStakingBondAmino {
    const obj: any = {};
    obj.account_address = message.accountAddress === "" ? undefined : message.accountAddress;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventYStakingBondAminoMsg): EventYStakingBond {
    return EventYStakingBond.fromAmino(object.value);
  },
  fromProtoMsg(message: EventYStakingBondProtoMsg, useInterfaces: boolean = false): EventYStakingBond {
    return EventYStakingBond.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventYStakingBond): Uint8Array {
    return EventYStakingBond.encode(message).finish();
  },
  toProtoMsg(message: EventYStakingBond): EventYStakingBondProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.EventYStakingBond",
      value: EventYStakingBond.encode(message).finish()
    };
  }
};
function createBaseEventYStakingUnbond(): EventYStakingUnbond {
  return {
    accountAddress: "",
    amount: Coin.fromPartial({}),
    accruedReward: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const EventYStakingUnbond = {
  typeUrl: "/pryzm.ystaking.v1.EventYStakingUnbond",
  encode(message: EventYStakingUnbond, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.accountAddress !== "") {
      writer.uint32(10).string(message.accountAddress);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.accruedReward !== undefined) {
      Coin.encode(message.accruedReward, writer.uint32(26).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventYStakingUnbond {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventYStakingUnbond();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountAddress = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.accruedReward = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventYStakingUnbond>): EventYStakingUnbond {
    const message = createBaseEventYStakingUnbond();
    message.accountAddress = object.accountAddress ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.accruedReward = object.accruedReward !== undefined && object.accruedReward !== null ? Coin.fromPartial(object.accruedReward) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: EventYStakingUnbondAmino): EventYStakingUnbond {
    const message = createBaseEventYStakingUnbond();
    if (object.account_address !== undefined && object.account_address !== null) {
      message.accountAddress = object.account_address;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    if (object.accrued_reward !== undefined && object.accrued_reward !== null) {
      message.accruedReward = Coin.fromAmino(object.accrued_reward);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: EventYStakingUnbond, useInterfaces: boolean = false): EventYStakingUnbondAmino {
    const obj: any = {};
    obj.account_address = message.accountAddress === "" ? undefined : message.accountAddress;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    obj.accrued_reward = message.accruedReward ? Coin.toAmino(message.accruedReward, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventYStakingUnbondAminoMsg): EventYStakingUnbond {
    return EventYStakingUnbond.fromAmino(object.value);
  },
  fromProtoMsg(message: EventYStakingUnbondProtoMsg, useInterfaces: boolean = false): EventYStakingUnbond {
    return EventYStakingUnbond.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventYStakingUnbond): Uint8Array {
    return EventYStakingUnbond.encode(message).finish();
  },
  toProtoMsg(message: EventYStakingUnbond): EventYStakingUnbondProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.EventYStakingUnbond",
      value: EventYStakingUnbond.encode(message).finish()
    };
  }
};
function createBaseEventYStakingExitPool(): EventYStakingExitPool {
  return {
    accountAddress: "",
    accruedReward: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const EventYStakingExitPool = {
  typeUrl: "/pryzm.ystaking.v1.EventYStakingExitPool",
  encode(message: EventYStakingExitPool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.accountAddress !== "") {
      writer.uint32(10).string(message.accountAddress);
    }
    if (message.accruedReward !== undefined) {
      Coin.encode(message.accruedReward, writer.uint32(18).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventYStakingExitPool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventYStakingExitPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountAddress = reader.string();
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
  fromPartial(object: Partial<EventYStakingExitPool>): EventYStakingExitPool {
    const message = createBaseEventYStakingExitPool();
    message.accountAddress = object.accountAddress ?? "";
    message.accruedReward = object.accruedReward !== undefined && object.accruedReward !== null ? Coin.fromPartial(object.accruedReward) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: EventYStakingExitPoolAmino): EventYStakingExitPool {
    const message = createBaseEventYStakingExitPool();
    if (object.account_address !== undefined && object.account_address !== null) {
      message.accountAddress = object.account_address;
    }
    if (object.accrued_reward !== undefined && object.accrued_reward !== null) {
      message.accruedReward = Coin.fromAmino(object.accrued_reward);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: EventYStakingExitPool, useInterfaces: boolean = false): EventYStakingExitPoolAmino {
    const obj: any = {};
    obj.account_address = message.accountAddress === "" ? undefined : message.accountAddress;
    obj.accrued_reward = message.accruedReward ? Coin.toAmino(message.accruedReward, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventYStakingExitPoolAminoMsg): EventYStakingExitPool {
    return EventYStakingExitPool.fromAmino(object.value);
  },
  fromProtoMsg(message: EventYStakingExitPoolProtoMsg, useInterfaces: boolean = false): EventYStakingExitPool {
    return EventYStakingExitPool.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventYStakingExitPool): Uint8Array {
    return EventYStakingExitPool.encode(message).finish();
  },
  toProtoMsg(message: EventYStakingExitPool): EventYStakingExitPoolProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.EventYStakingExitPool",
      value: EventYStakingExitPool.encode(message).finish()
    };
  }
};
function createBaseEventYStakingClaimReward(): EventYStakingClaimReward {
  return {
    accountAddress: "",
    accruedReward: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const EventYStakingClaimReward = {
  typeUrl: "/pryzm.ystaking.v1.EventYStakingClaimReward",
  encode(message: EventYStakingClaimReward, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.accountAddress !== "") {
      writer.uint32(10).string(message.accountAddress);
    }
    if (message.accruedReward !== undefined) {
      Coin.encode(message.accruedReward, writer.uint32(18).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventYStakingClaimReward {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventYStakingClaimReward();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountAddress = reader.string();
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
  fromPartial(object: Partial<EventYStakingClaimReward>): EventYStakingClaimReward {
    const message = createBaseEventYStakingClaimReward();
    message.accountAddress = object.accountAddress ?? "";
    message.accruedReward = object.accruedReward !== undefined && object.accruedReward !== null ? Coin.fromPartial(object.accruedReward) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: EventYStakingClaimRewardAmino): EventYStakingClaimReward {
    const message = createBaseEventYStakingClaimReward();
    if (object.account_address !== undefined && object.account_address !== null) {
      message.accountAddress = object.account_address;
    }
    if (object.accrued_reward !== undefined && object.accrued_reward !== null) {
      message.accruedReward = Coin.fromAmino(object.accrued_reward);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: EventYStakingClaimReward, useInterfaces: boolean = false): EventYStakingClaimRewardAmino {
    const obj: any = {};
    obj.account_address = message.accountAddress === "" ? undefined : message.accountAddress;
    obj.accrued_reward = message.accruedReward ? Coin.toAmino(message.accruedReward, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventYStakingClaimRewardAminoMsg): EventYStakingClaimReward {
    return EventYStakingClaimReward.fromAmino(object.value);
  },
  fromProtoMsg(message: EventYStakingClaimRewardProtoMsg, useInterfaces: boolean = false): EventYStakingClaimReward {
    return EventYStakingClaimReward.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventYStakingClaimReward): Uint8Array {
    return EventYStakingClaimReward.encode(message).finish();
  },
  toProtoMsg(message: EventYStakingClaimReward): EventYStakingClaimRewardProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.EventYStakingClaimReward",
      value: EventYStakingClaimReward.encode(message).finish()
    };
  }
};
function createBaseEventDeactivateYStakingMaturityPool(): EventDeactivateYStakingMaturityPool {
  return {
    burntBondedAmount: Coin.fromPartial({}),
    assetId: "",
    maturitySymbol: ""
  };
}
export const EventDeactivateYStakingMaturityPool = {
  typeUrl: "/pryzm.ystaking.v1.EventDeactivateYStakingMaturityPool",
  encode(message: EventDeactivateYStakingMaturityPool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.burntBondedAmount !== undefined) {
      Coin.encode(message.burntBondedAmount, writer.uint32(10).fork()).ldelim();
    }
    if (message.assetId !== "") {
      writer.uint32(18).string(message.assetId);
    }
    if (message.maturitySymbol !== "") {
      writer.uint32(26).string(message.maturitySymbol);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventDeactivateYStakingMaturityPool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDeactivateYStakingMaturityPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.burntBondedAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.assetId = reader.string();
          break;
        case 3:
          message.maturitySymbol = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventDeactivateYStakingMaturityPool>): EventDeactivateYStakingMaturityPool {
    const message = createBaseEventDeactivateYStakingMaturityPool();
    message.burntBondedAmount = object.burntBondedAmount !== undefined && object.burntBondedAmount !== null ? Coin.fromPartial(object.burntBondedAmount) : undefined;
    message.assetId = object.assetId ?? "";
    message.maturitySymbol = object.maturitySymbol ?? "";
    return message;
  },
  fromAmino(object: EventDeactivateYStakingMaturityPoolAmino): EventDeactivateYStakingMaturityPool {
    const message = createBaseEventDeactivateYStakingMaturityPool();
    if (object.burnt_bonded_amount !== undefined && object.burnt_bonded_amount !== null) {
      message.burntBondedAmount = Coin.fromAmino(object.burnt_bonded_amount);
    }
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    if (object.maturity_symbol !== undefined && object.maturity_symbol !== null) {
      message.maturitySymbol = object.maturity_symbol;
    }
    return message;
  },
  toAmino(message: EventDeactivateYStakingMaturityPool, useInterfaces: boolean = false): EventDeactivateYStakingMaturityPoolAmino {
    const obj: any = {};
    obj.burnt_bonded_amount = message.burntBondedAmount ? Coin.toAmino(message.burntBondedAmount, useInterfaces) : undefined;
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    obj.maturity_symbol = message.maturitySymbol === "" ? undefined : message.maturitySymbol;
    return obj;
  },
  fromAminoMsg(object: EventDeactivateYStakingMaturityPoolAminoMsg): EventDeactivateYStakingMaturityPool {
    return EventDeactivateYStakingMaturityPool.fromAmino(object.value);
  },
  fromProtoMsg(message: EventDeactivateYStakingMaturityPoolProtoMsg, useInterfaces: boolean = false): EventDeactivateYStakingMaturityPool {
    return EventDeactivateYStakingMaturityPool.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventDeactivateYStakingMaturityPool): Uint8Array {
    return EventDeactivateYStakingMaturityPool.encode(message).finish();
  },
  toProtoMsg(message: EventDeactivateYStakingMaturityPool): EventDeactivateYStakingMaturityPoolProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.EventDeactivateYStakingMaturityPool",
      value: EventDeactivateYStakingMaturityPool.encode(message).finish()
    };
  }
};
function createBaseEventSetUserStakeState(): EventSetUserStakeState {
  return {
    userStakeState: UserStakeState.fromPartial({})
  };
}
export const EventSetUserStakeState = {
  typeUrl: "/pryzm.ystaking.v1.EventSetUserStakeState",
  encode(message: EventSetUserStakeState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.userStakeState !== undefined) {
      UserStakeState.encode(message.userStakeState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetUserStakeState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetUserStakeState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userStakeState = UserStakeState.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetUserStakeState>): EventSetUserStakeState {
    const message = createBaseEventSetUserStakeState();
    message.userStakeState = object.userStakeState !== undefined && object.userStakeState !== null ? UserStakeState.fromPartial(object.userStakeState) : undefined;
    return message;
  },
  fromAmino(object: EventSetUserStakeStateAmino): EventSetUserStakeState {
    const message = createBaseEventSetUserStakeState();
    if (object.user_stake_state !== undefined && object.user_stake_state !== null) {
      message.userStakeState = UserStakeState.fromAmino(object.user_stake_state);
    }
    return message;
  },
  toAmino(message: EventSetUserStakeState, useInterfaces: boolean = false): EventSetUserStakeStateAmino {
    const obj: any = {};
    obj.user_stake_state = message.userStakeState ? UserStakeState.toAmino(message.userStakeState, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetUserStakeStateAminoMsg): EventSetUserStakeState {
    return EventSetUserStakeState.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetUserStakeStateProtoMsg, useInterfaces: boolean = false): EventSetUserStakeState {
    return EventSetUserStakeState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetUserStakeState): Uint8Array {
    return EventSetUserStakeState.encode(message).finish();
  },
  toProtoMsg(message: EventSetUserStakeState): EventSetUserStakeStateProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.EventSetUserStakeState",
      value: EventSetUserStakeState.encode(message).finish()
    };
  }
};
function createBaseEventSetAssetPoolState(): EventSetAssetPoolState {
  return {
    assetPoolState: AssetPoolState.fromPartial({})
  };
}
export const EventSetAssetPoolState = {
  typeUrl: "/pryzm.ystaking.v1.EventSetAssetPoolState",
  encode(message: EventSetAssetPoolState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetPoolState !== undefined) {
      AssetPoolState.encode(message.assetPoolState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetAssetPoolState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetAssetPoolState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetPoolState = AssetPoolState.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetAssetPoolState>): EventSetAssetPoolState {
    const message = createBaseEventSetAssetPoolState();
    message.assetPoolState = object.assetPoolState !== undefined && object.assetPoolState !== null ? AssetPoolState.fromPartial(object.assetPoolState) : undefined;
    return message;
  },
  fromAmino(object: EventSetAssetPoolStateAmino): EventSetAssetPoolState {
    const message = createBaseEventSetAssetPoolState();
    if (object.asset_pool_state !== undefined && object.asset_pool_state !== null) {
      message.assetPoolState = AssetPoolState.fromAmino(object.asset_pool_state);
    }
    return message;
  },
  toAmino(message: EventSetAssetPoolState, useInterfaces: boolean = false): EventSetAssetPoolStateAmino {
    const obj: any = {};
    obj.asset_pool_state = message.assetPoolState ? AssetPoolState.toAmino(message.assetPoolState, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetAssetPoolStateAminoMsg): EventSetAssetPoolState {
    return EventSetAssetPoolState.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetAssetPoolStateProtoMsg, useInterfaces: boolean = false): EventSetAssetPoolState {
    return EventSetAssetPoolState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetAssetPoolState): Uint8Array {
    return EventSetAssetPoolState.encode(message).finish();
  },
  toProtoMsg(message: EventSetAssetPoolState): EventSetAssetPoolStateProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.EventSetAssetPoolState",
      value: EventSetAssetPoolState.encode(message).finish()
    };
  }
};
function createBaseEventSetAssetMaturityPoolState(): EventSetAssetMaturityPoolState {
  return {
    assetMaturityPoolState: AssetMaturityPoolState.fromPartial({})
  };
}
export const EventSetAssetMaturityPoolState = {
  typeUrl: "/pryzm.ystaking.v1.EventSetAssetMaturityPoolState",
  encode(message: EventSetAssetMaturityPoolState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetMaturityPoolState !== undefined) {
      AssetMaturityPoolState.encode(message.assetMaturityPoolState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetAssetMaturityPoolState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetAssetMaturityPoolState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetMaturityPoolState = AssetMaturityPoolState.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetAssetMaturityPoolState>): EventSetAssetMaturityPoolState {
    const message = createBaseEventSetAssetMaturityPoolState();
    message.assetMaturityPoolState = object.assetMaturityPoolState !== undefined && object.assetMaturityPoolState !== null ? AssetMaturityPoolState.fromPartial(object.assetMaturityPoolState) : undefined;
    return message;
  },
  fromAmino(object: EventSetAssetMaturityPoolStateAmino): EventSetAssetMaturityPoolState {
    const message = createBaseEventSetAssetMaturityPoolState();
    if (object.asset_maturity_pool_state !== undefined && object.asset_maturity_pool_state !== null) {
      message.assetMaturityPoolState = AssetMaturityPoolState.fromAmino(object.asset_maturity_pool_state);
    }
    return message;
  },
  toAmino(message: EventSetAssetMaturityPoolState, useInterfaces: boolean = false): EventSetAssetMaturityPoolStateAmino {
    const obj: any = {};
    obj.asset_maturity_pool_state = message.assetMaturityPoolState ? AssetMaturityPoolState.toAmino(message.assetMaturityPoolState, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetAssetMaturityPoolStateAminoMsg): EventSetAssetMaturityPoolState {
    return EventSetAssetMaturityPoolState.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetAssetMaturityPoolStateProtoMsg, useInterfaces: boolean = false): EventSetAssetMaturityPoolState {
    return EventSetAssetMaturityPoolState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetAssetMaturityPoolState): Uint8Array {
    return EventSetAssetMaturityPoolState.encode(message).finish();
  },
  toProtoMsg(message: EventSetAssetMaturityPoolState): EventSetAssetMaturityPoolStateProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.EventSetAssetMaturityPoolState",
      value: EventSetAssetMaturityPoolState.encode(message).finish()
    };
  }
};
function createBaseEventDeleteUserStakeState(): EventDeleteUserStakeState {
  return {
    address: "",
    assetId: "",
    maturitySymbol: ""
  };
}
export const EventDeleteUserStakeState = {
  typeUrl: "/pryzm.ystaking.v1.EventDeleteUserStakeState",
  encode(message: EventDeleteUserStakeState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.assetId !== "") {
      writer.uint32(18).string(message.assetId);
    }
    if (message.maturitySymbol !== "") {
      writer.uint32(26).string(message.maturitySymbol);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventDeleteUserStakeState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDeleteUserStakeState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.assetId = reader.string();
          break;
        case 3:
          message.maturitySymbol = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventDeleteUserStakeState>): EventDeleteUserStakeState {
    const message = createBaseEventDeleteUserStakeState();
    message.address = object.address ?? "";
    message.assetId = object.assetId ?? "";
    message.maturitySymbol = object.maturitySymbol ?? "";
    return message;
  },
  fromAmino(object: EventDeleteUserStakeStateAmino): EventDeleteUserStakeState {
    const message = createBaseEventDeleteUserStakeState();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    if (object.maturity_symbol !== undefined && object.maturity_symbol !== null) {
      message.maturitySymbol = object.maturity_symbol;
    }
    return message;
  },
  toAmino(message: EventDeleteUserStakeState, useInterfaces: boolean = false): EventDeleteUserStakeStateAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    obj.maturity_symbol = message.maturitySymbol === "" ? undefined : message.maturitySymbol;
    return obj;
  },
  fromAminoMsg(object: EventDeleteUserStakeStateAminoMsg): EventDeleteUserStakeState {
    return EventDeleteUserStakeState.fromAmino(object.value);
  },
  fromProtoMsg(message: EventDeleteUserStakeStateProtoMsg, useInterfaces: boolean = false): EventDeleteUserStakeState {
    return EventDeleteUserStakeState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventDeleteUserStakeState): Uint8Array {
    return EventDeleteUserStakeState.encode(message).finish();
  },
  toProtoMsg(message: EventDeleteUserStakeState): EventDeleteUserStakeStateProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.EventDeleteUserStakeState",
      value: EventDeleteUserStakeState.encode(message).finish()
    };
  }
};
function createBaseEventDeleteAssetPoolState(): EventDeleteAssetPoolState {
  return {
    assetId: ""
  };
}
export const EventDeleteAssetPoolState = {
  typeUrl: "/pryzm.ystaking.v1.EventDeleteAssetPoolState",
  encode(message: EventDeleteAssetPoolState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetId !== "") {
      writer.uint32(10).string(message.assetId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventDeleteAssetPoolState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDeleteAssetPoolState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventDeleteAssetPoolState>): EventDeleteAssetPoolState {
    const message = createBaseEventDeleteAssetPoolState();
    message.assetId = object.assetId ?? "";
    return message;
  },
  fromAmino(object: EventDeleteAssetPoolStateAmino): EventDeleteAssetPoolState {
    const message = createBaseEventDeleteAssetPoolState();
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    return message;
  },
  toAmino(message: EventDeleteAssetPoolState, useInterfaces: boolean = false): EventDeleteAssetPoolStateAmino {
    const obj: any = {};
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    return obj;
  },
  fromAminoMsg(object: EventDeleteAssetPoolStateAminoMsg): EventDeleteAssetPoolState {
    return EventDeleteAssetPoolState.fromAmino(object.value);
  },
  fromProtoMsg(message: EventDeleteAssetPoolStateProtoMsg, useInterfaces: boolean = false): EventDeleteAssetPoolState {
    return EventDeleteAssetPoolState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventDeleteAssetPoolState): Uint8Array {
    return EventDeleteAssetPoolState.encode(message).finish();
  },
  toProtoMsg(message: EventDeleteAssetPoolState): EventDeleteAssetPoolStateProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.EventDeleteAssetPoolState",
      value: EventDeleteAssetPoolState.encode(message).finish()
    };
  }
};
function createBaseEventDeleteAssetMaturityPoolState(): EventDeleteAssetMaturityPoolState {
  return {
    assetId: "",
    maturitySymbol: ""
  };
}
export const EventDeleteAssetMaturityPoolState = {
  typeUrl: "/pryzm.ystaking.v1.EventDeleteAssetMaturityPoolState",
  encode(message: EventDeleteAssetMaturityPoolState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetId !== "") {
      writer.uint32(10).string(message.assetId);
    }
    if (message.maturitySymbol !== "") {
      writer.uint32(18).string(message.maturitySymbol);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventDeleteAssetMaturityPoolState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDeleteAssetMaturityPoolState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetId = reader.string();
          break;
        case 2:
          message.maturitySymbol = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventDeleteAssetMaturityPoolState>): EventDeleteAssetMaturityPoolState {
    const message = createBaseEventDeleteAssetMaturityPoolState();
    message.assetId = object.assetId ?? "";
    message.maturitySymbol = object.maturitySymbol ?? "";
    return message;
  },
  fromAmino(object: EventDeleteAssetMaturityPoolStateAmino): EventDeleteAssetMaturityPoolState {
    const message = createBaseEventDeleteAssetMaturityPoolState();
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    if (object.maturity_symbol !== undefined && object.maturity_symbol !== null) {
      message.maturitySymbol = object.maturity_symbol;
    }
    return message;
  },
  toAmino(message: EventDeleteAssetMaturityPoolState, useInterfaces: boolean = false): EventDeleteAssetMaturityPoolStateAmino {
    const obj: any = {};
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    obj.maturity_symbol = message.maturitySymbol === "" ? undefined : message.maturitySymbol;
    return obj;
  },
  fromAminoMsg(object: EventDeleteAssetMaturityPoolStateAminoMsg): EventDeleteAssetMaturityPoolState {
    return EventDeleteAssetMaturityPoolState.fromAmino(object.value);
  },
  fromProtoMsg(message: EventDeleteAssetMaturityPoolStateProtoMsg, useInterfaces: boolean = false): EventDeleteAssetMaturityPoolState {
    return EventDeleteAssetMaturityPoolState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventDeleteAssetMaturityPoolState): Uint8Array {
    return EventDeleteAssetMaturityPoolState.encode(message).finish();
  },
  toProtoMsg(message: EventDeleteAssetMaturityPoolState): EventDeleteAssetMaturityPoolStateProtoMsg {
    return {
      typeUrl: "/pryzm.ystaking.v1.EventDeleteAssetMaturityPoolState",
      value: EventDeleteAssetMaturityPoolState.encode(message).finish()
    };
  }
};