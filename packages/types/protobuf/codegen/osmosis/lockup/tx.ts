//@ts-nocheck
import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { PeriodLock, PeriodLockAmino, PeriodLockSDKType } from "./lock";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface MsgLockTokens {
  owner: string;
  duration: Duration | undefined;
  coins: Coin[];
}
export interface MsgLockTokensProtoMsg {
  typeUrl: "/osmosis.lockup.MsgLockTokens";
  value: Uint8Array;
}
export interface MsgLockTokensAmino {
  owner?: string;
  duration?: DurationAmino | undefined;
  coins?: CoinAmino[];
}
export interface MsgLockTokensAminoMsg {
  type: "osmosis/lockup/lock-tokens";
  value: MsgLockTokensAmino;
}
export interface MsgLockTokensSDKType {
  owner: string;
  duration: DurationSDKType | undefined;
  coins: CoinSDKType[];
}
export interface MsgLockTokensResponse {
  iD: bigint;
}
export interface MsgLockTokensResponseProtoMsg {
  typeUrl: "/osmosis.lockup.MsgLockTokensResponse";
  value: Uint8Array;
}
export interface MsgLockTokensResponseAmino {
  ID?: string;
}
export interface MsgLockTokensResponseAminoMsg {
  type: "osmosis/lockup/lock-tokens-response";
  value: MsgLockTokensResponseAmino;
}
export interface MsgLockTokensResponseSDKType {
  ID: bigint;
}
export interface MsgBeginUnlockingAll {
  owner: string;
}
export interface MsgBeginUnlockingAllProtoMsg {
  typeUrl: "/osmosis.lockup.MsgBeginUnlockingAll";
  value: Uint8Array;
}
export interface MsgBeginUnlockingAllAmino {
  owner?: string;
}
export interface MsgBeginUnlockingAllAminoMsg {
  type: "osmosis/lockup/begin-unlock-tokens";
  value: MsgBeginUnlockingAllAmino;
}
export interface MsgBeginUnlockingAllSDKType {
  owner: string;
}
export interface MsgBeginUnlockingAllResponse {
  unlocks: PeriodLock[];
}
export interface MsgBeginUnlockingAllResponseProtoMsg {
  typeUrl: "/osmosis.lockup.MsgBeginUnlockingAllResponse";
  value: Uint8Array;
}
export interface MsgBeginUnlockingAllResponseAmino {
  unlocks?: PeriodLockAmino[];
}
export interface MsgBeginUnlockingAllResponseAminoMsg {
  type: "osmosis/lockup/begin-unlocking-all-response";
  value: MsgBeginUnlockingAllResponseAmino;
}
export interface MsgBeginUnlockingAllResponseSDKType {
  unlocks: PeriodLockSDKType[];
}
export interface MsgBeginUnlocking {
  owner: string;
  iD: bigint;
  /** Amount of unlocking coins. Unlock all if not set. */
  coins: Coin[];
}
export interface MsgBeginUnlockingProtoMsg {
  typeUrl: "/osmosis.lockup.MsgBeginUnlocking";
  value: Uint8Array;
}
export interface MsgBeginUnlockingAmino {
  owner?: string;
  ID?: string;
  /** Amount of unlocking coins. Unlock all if not set. */
  coins?: CoinAmino[];
}
export interface MsgBeginUnlockingAminoMsg {
  type: "osmosis/lockup/begin-unlock-period-lock";
  value: MsgBeginUnlockingAmino;
}
export interface MsgBeginUnlockingSDKType {
  owner: string;
  ID: bigint;
  coins: CoinSDKType[];
}
export interface MsgBeginUnlockingResponse {
  success: boolean;
  unlockingLockID: bigint;
}
export interface MsgBeginUnlockingResponseProtoMsg {
  typeUrl: "/osmosis.lockup.MsgBeginUnlockingResponse";
  value: Uint8Array;
}
export interface MsgBeginUnlockingResponseAmino {
  success?: boolean;
  unlockingLockID?: string;
}
export interface MsgBeginUnlockingResponseAminoMsg {
  type: "osmosis/lockup/begin-unlocking-response";
  value: MsgBeginUnlockingResponseAmino;
}
export interface MsgBeginUnlockingResponseSDKType {
  success: boolean;
  unlockingLockID: bigint;
}
/**
 * MsgExtendLockup extends the existing lockup's duration.
 * The new duration is longer than the original.
 */
export interface MsgExtendLockup {
  owner: string;
  iD: bigint;
  /**
   * duration to be set. fails if lower than the current duration, or is
   * unlocking
   */
  duration: Duration | undefined;
}
export interface MsgExtendLockupProtoMsg {
  typeUrl: "/osmosis.lockup.MsgExtendLockup";
  value: Uint8Array;
}
/**
 * MsgExtendLockup extends the existing lockup's duration.
 * The new duration is longer than the original.
 */
export interface MsgExtendLockupAmino {
  owner?: string;
  ID?: string;
  /**
   * duration to be set. fails if lower than the current duration, or is
   * unlocking
   */
  duration?: DurationAmino | undefined;
}
export interface MsgExtendLockupAminoMsg {
  type: "osmosis/lockup/extend-lockup";
  value: MsgExtendLockupAmino;
}
/**
 * MsgExtendLockup extends the existing lockup's duration.
 * The new duration is longer than the original.
 */
export interface MsgExtendLockupSDKType {
  owner: string;
  ID: bigint;
  duration: DurationSDKType | undefined;
}
export interface MsgExtendLockupResponse {
  success: boolean;
}
export interface MsgExtendLockupResponseProtoMsg {
  typeUrl: "/osmosis.lockup.MsgExtendLockupResponse";
  value: Uint8Array;
}
export interface MsgExtendLockupResponseAmino {
  success?: boolean;
}
export interface MsgExtendLockupResponseAminoMsg {
  type: "osmosis/lockup/extend-lockup-response";
  value: MsgExtendLockupResponseAmino;
}
export interface MsgExtendLockupResponseSDKType {
  success: boolean;
}
/**
 * MsgForceUnlock unlocks locks immediately for
 * addresses registered via governance.
 */
export interface MsgForceUnlock {
  owner: string;
  iD: bigint;
  /** Amount of unlocking coins. Unlock all if not set. */
  coins: Coin[];
}
export interface MsgForceUnlockProtoMsg {
  typeUrl: "/osmosis.lockup.MsgForceUnlock";
  value: Uint8Array;
}
/**
 * MsgForceUnlock unlocks locks immediately for
 * addresses registered via governance.
 */
export interface MsgForceUnlockAmino {
  owner?: string;
  ID?: string;
  /** Amount of unlocking coins. Unlock all if not set. */
  coins?: CoinAmino[];
}
export interface MsgForceUnlockAminoMsg {
  type: "osmosis/lockup/force-unlock-tokens";
  value: MsgForceUnlockAmino;
}
/**
 * MsgForceUnlock unlocks locks immediately for
 * addresses registered via governance.
 */
export interface MsgForceUnlockSDKType {
  owner: string;
  ID: bigint;
  coins: CoinSDKType[];
}
export interface MsgForceUnlockResponse {
  success: boolean;
}
export interface MsgForceUnlockResponseProtoMsg {
  typeUrl: "/osmosis.lockup.MsgForceUnlockResponse";
  value: Uint8Array;
}
export interface MsgForceUnlockResponseAmino {
  success?: boolean;
}
export interface MsgForceUnlockResponseAminoMsg {
  type: "osmosis/lockup/force-unlock-response";
  value: MsgForceUnlockResponseAmino;
}
export interface MsgForceUnlockResponseSDKType {
  success: boolean;
}
export interface MsgSetRewardReceiverAddress {
  owner: string;
  lockID: bigint;
  rewardReceiver: string;
}
export interface MsgSetRewardReceiverAddressProtoMsg {
  typeUrl: "/osmosis.lockup.MsgSetRewardReceiverAddress";
  value: Uint8Array;
}
export interface MsgSetRewardReceiverAddressAmino {
  owner?: string;
  lockID?: string;
  reward_receiver?: string;
}
export interface MsgSetRewardReceiverAddressAminoMsg {
  type: "osmosis/lockup/set-reward-receiver-address";
  value: MsgSetRewardReceiverAddressAmino;
}
export interface MsgSetRewardReceiverAddressSDKType {
  owner: string;
  lockID: bigint;
  reward_receiver: string;
}
export interface MsgSetRewardReceiverAddressResponse {
  success: boolean;
}
export interface MsgSetRewardReceiverAddressResponseProtoMsg {
  typeUrl: "/osmosis.lockup.MsgSetRewardReceiverAddressResponse";
  value: Uint8Array;
}
export interface MsgSetRewardReceiverAddressResponseAmino {
  success?: boolean;
}
export interface MsgSetRewardReceiverAddressResponseAminoMsg {
  type: "osmosis/lockup/set-reward-receiver-address-response";
  value: MsgSetRewardReceiverAddressResponseAmino;
}
export interface MsgSetRewardReceiverAddressResponseSDKType {
  success: boolean;
}
function createBaseMsgLockTokens(): MsgLockTokens {
  return {
    owner: "",
    duration: Duration.fromPartial({}),
    coins: []
  };
}
export const MsgLockTokens = {
  typeUrl: "/osmosis.lockup.MsgLockTokens",
  encode(message: MsgLockTokens, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLockTokens {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLockTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.duration = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.coins.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLockTokens>): MsgLockTokens {
    const message = createBaseMsgLockTokens();
    message.owner = object.owner ?? "";
    message.duration = object.duration !== undefined && object.duration !== null ? Duration.fromPartial(object.duration) : undefined;
    message.coins = object.coins?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgLockTokensAmino): MsgLockTokens {
    const message = createBaseMsgLockTokens();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromAmino(object.duration);
    }
    message.coins = object.coins?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgLockTokens, useInterfaces: boolean = false): MsgLockTokensAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.duration = message.duration ? Duration.toAmino(message.duration, useInterfaces) : undefined;
    if (message.coins) {
      obj.coins = message.coins.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.coins = message.coins;
    }
    return obj;
  },
  fromAminoMsg(object: MsgLockTokensAminoMsg): MsgLockTokens {
    return MsgLockTokens.fromAmino(object.value);
  },
  toAminoMsg(message: MsgLockTokens, useInterfaces: boolean = false): MsgLockTokensAminoMsg {
    return {
      type: "osmosis/lockup/lock-tokens",
      value: MsgLockTokens.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgLockTokensProtoMsg, useInterfaces: boolean = false): MsgLockTokens {
    return MsgLockTokens.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLockTokens): Uint8Array {
    return MsgLockTokens.encode(message).finish();
  },
  toProtoMsg(message: MsgLockTokens): MsgLockTokensProtoMsg {
    return {
      typeUrl: "/osmosis.lockup.MsgLockTokens",
      value: MsgLockTokens.encode(message).finish()
    };
  }
};
function createBaseMsgLockTokensResponse(): MsgLockTokensResponse {
  return {
    iD: BigInt(0)
  };
}
export const MsgLockTokensResponse = {
  typeUrl: "/osmosis.lockup.MsgLockTokensResponse",
  encode(message: MsgLockTokensResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.iD !== BigInt(0)) {
      writer.uint32(8).uint64(message.iD);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLockTokensResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLockTokensResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iD = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLockTokensResponse>): MsgLockTokensResponse {
    const message = createBaseMsgLockTokensResponse();
    message.iD = object.iD !== undefined && object.iD !== null ? BigInt(object.iD.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgLockTokensResponseAmino): MsgLockTokensResponse {
    const message = createBaseMsgLockTokensResponse();
    if (object.ID !== undefined && object.ID !== null) {
      message.iD = BigInt(object.ID);
    }
    return message;
  },
  toAmino(message: MsgLockTokensResponse, useInterfaces: boolean = false): MsgLockTokensResponseAmino {
    const obj: any = {};
    obj.ID = message.iD !== BigInt(0) ? message.iD.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgLockTokensResponseAminoMsg): MsgLockTokensResponse {
    return MsgLockTokensResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgLockTokensResponse, useInterfaces: boolean = false): MsgLockTokensResponseAminoMsg {
    return {
      type: "osmosis/lockup/lock-tokens-response",
      value: MsgLockTokensResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgLockTokensResponseProtoMsg, useInterfaces: boolean = false): MsgLockTokensResponse {
    return MsgLockTokensResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLockTokensResponse): Uint8Array {
    return MsgLockTokensResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgLockTokensResponse): MsgLockTokensResponseProtoMsg {
    return {
      typeUrl: "/osmosis.lockup.MsgLockTokensResponse",
      value: MsgLockTokensResponse.encode(message).finish()
    };
  }
};
function createBaseMsgBeginUnlockingAll(): MsgBeginUnlockingAll {
  return {
    owner: ""
  };
}
export const MsgBeginUnlockingAll = {
  typeUrl: "/osmosis.lockup.MsgBeginUnlockingAll",
  encode(message: MsgBeginUnlockingAll, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgBeginUnlockingAll {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBeginUnlockingAll();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgBeginUnlockingAll>): MsgBeginUnlockingAll {
    const message = createBaseMsgBeginUnlockingAll();
    message.owner = object.owner ?? "";
    return message;
  },
  fromAmino(object: MsgBeginUnlockingAllAmino): MsgBeginUnlockingAll {
    const message = createBaseMsgBeginUnlockingAll();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    return message;
  },
  toAmino(message: MsgBeginUnlockingAll, useInterfaces: boolean = false): MsgBeginUnlockingAllAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    return obj;
  },
  fromAminoMsg(object: MsgBeginUnlockingAllAminoMsg): MsgBeginUnlockingAll {
    return MsgBeginUnlockingAll.fromAmino(object.value);
  },
  toAminoMsg(message: MsgBeginUnlockingAll, useInterfaces: boolean = false): MsgBeginUnlockingAllAminoMsg {
    return {
      type: "osmosis/lockup/begin-unlock-tokens",
      value: MsgBeginUnlockingAll.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgBeginUnlockingAllProtoMsg, useInterfaces: boolean = false): MsgBeginUnlockingAll {
    return MsgBeginUnlockingAll.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgBeginUnlockingAll): Uint8Array {
    return MsgBeginUnlockingAll.encode(message).finish();
  },
  toProtoMsg(message: MsgBeginUnlockingAll): MsgBeginUnlockingAllProtoMsg {
    return {
      typeUrl: "/osmosis.lockup.MsgBeginUnlockingAll",
      value: MsgBeginUnlockingAll.encode(message).finish()
    };
  }
};
function createBaseMsgBeginUnlockingAllResponse(): MsgBeginUnlockingAllResponse {
  return {
    unlocks: []
  };
}
export const MsgBeginUnlockingAllResponse = {
  typeUrl: "/osmosis.lockup.MsgBeginUnlockingAllResponse",
  encode(message: MsgBeginUnlockingAllResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.unlocks) {
      PeriodLock.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgBeginUnlockingAllResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBeginUnlockingAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unlocks.push(PeriodLock.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgBeginUnlockingAllResponse>): MsgBeginUnlockingAllResponse {
    const message = createBaseMsgBeginUnlockingAllResponse();
    message.unlocks = object.unlocks?.map(e => PeriodLock.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgBeginUnlockingAllResponseAmino): MsgBeginUnlockingAllResponse {
    const message = createBaseMsgBeginUnlockingAllResponse();
    message.unlocks = object.unlocks?.map(e => PeriodLock.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgBeginUnlockingAllResponse, useInterfaces: boolean = false): MsgBeginUnlockingAllResponseAmino {
    const obj: any = {};
    if (message.unlocks) {
      obj.unlocks = message.unlocks.map(e => e ? PeriodLock.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.unlocks = message.unlocks;
    }
    return obj;
  },
  fromAminoMsg(object: MsgBeginUnlockingAllResponseAminoMsg): MsgBeginUnlockingAllResponse {
    return MsgBeginUnlockingAllResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgBeginUnlockingAllResponse, useInterfaces: boolean = false): MsgBeginUnlockingAllResponseAminoMsg {
    return {
      type: "osmosis/lockup/begin-unlocking-all-response",
      value: MsgBeginUnlockingAllResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgBeginUnlockingAllResponseProtoMsg, useInterfaces: boolean = false): MsgBeginUnlockingAllResponse {
    return MsgBeginUnlockingAllResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgBeginUnlockingAllResponse): Uint8Array {
    return MsgBeginUnlockingAllResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgBeginUnlockingAllResponse): MsgBeginUnlockingAllResponseProtoMsg {
    return {
      typeUrl: "/osmosis.lockup.MsgBeginUnlockingAllResponse",
      value: MsgBeginUnlockingAllResponse.encode(message).finish()
    };
  }
};
function createBaseMsgBeginUnlocking(): MsgBeginUnlocking {
  return {
    owner: "",
    iD: BigInt(0),
    coins: []
  };
}
export const MsgBeginUnlocking = {
  typeUrl: "/osmosis.lockup.MsgBeginUnlocking",
  encode(message: MsgBeginUnlocking, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.iD !== BigInt(0)) {
      writer.uint32(16).uint64(message.iD);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgBeginUnlocking {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBeginUnlocking();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.iD = reader.uint64();
          break;
        case 3:
          message.coins.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgBeginUnlocking>): MsgBeginUnlocking {
    const message = createBaseMsgBeginUnlocking();
    message.owner = object.owner ?? "";
    message.iD = object.iD !== undefined && object.iD !== null ? BigInt(object.iD.toString()) : BigInt(0);
    message.coins = object.coins?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgBeginUnlockingAmino): MsgBeginUnlocking {
    const message = createBaseMsgBeginUnlocking();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.ID !== undefined && object.ID !== null) {
      message.iD = BigInt(object.ID);
    }
    message.coins = object.coins?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgBeginUnlocking, useInterfaces: boolean = false): MsgBeginUnlockingAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.ID = message.iD !== BigInt(0) ? message.iD.toString() : undefined;
    if (message.coins) {
      obj.coins = message.coins.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.coins = message.coins;
    }
    return obj;
  },
  fromAminoMsg(object: MsgBeginUnlockingAminoMsg): MsgBeginUnlocking {
    return MsgBeginUnlocking.fromAmino(object.value);
  },
  toAminoMsg(message: MsgBeginUnlocking, useInterfaces: boolean = false): MsgBeginUnlockingAminoMsg {
    return {
      type: "osmosis/lockup/begin-unlock-period-lock",
      value: MsgBeginUnlocking.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgBeginUnlockingProtoMsg, useInterfaces: boolean = false): MsgBeginUnlocking {
    return MsgBeginUnlocking.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgBeginUnlocking): Uint8Array {
    return MsgBeginUnlocking.encode(message).finish();
  },
  toProtoMsg(message: MsgBeginUnlocking): MsgBeginUnlockingProtoMsg {
    return {
      typeUrl: "/osmosis.lockup.MsgBeginUnlocking",
      value: MsgBeginUnlocking.encode(message).finish()
    };
  }
};
function createBaseMsgBeginUnlockingResponse(): MsgBeginUnlockingResponse {
  return {
    success: false,
    unlockingLockID: BigInt(0)
  };
}
export const MsgBeginUnlockingResponse = {
  typeUrl: "/osmosis.lockup.MsgBeginUnlockingResponse",
  encode(message: MsgBeginUnlockingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.unlockingLockID !== BigInt(0)) {
      writer.uint32(16).uint64(message.unlockingLockID);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgBeginUnlockingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBeginUnlockingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.unlockingLockID = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgBeginUnlockingResponse>): MsgBeginUnlockingResponse {
    const message = createBaseMsgBeginUnlockingResponse();
    message.success = object.success ?? false;
    message.unlockingLockID = object.unlockingLockID !== undefined && object.unlockingLockID !== null ? BigInt(object.unlockingLockID.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgBeginUnlockingResponseAmino): MsgBeginUnlockingResponse {
    const message = createBaseMsgBeginUnlockingResponse();
    if (object.success !== undefined && object.success !== null) {
      message.success = object.success;
    }
    if (object.unlockingLockID !== undefined && object.unlockingLockID !== null) {
      message.unlockingLockID = BigInt(object.unlockingLockID);
    }
    return message;
  },
  toAmino(message: MsgBeginUnlockingResponse, useInterfaces: boolean = false): MsgBeginUnlockingResponseAmino {
    const obj: any = {};
    obj.success = message.success === false ? undefined : message.success;
    obj.unlockingLockID = message.unlockingLockID !== BigInt(0) ? message.unlockingLockID.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgBeginUnlockingResponseAminoMsg): MsgBeginUnlockingResponse {
    return MsgBeginUnlockingResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgBeginUnlockingResponse, useInterfaces: boolean = false): MsgBeginUnlockingResponseAminoMsg {
    return {
      type: "osmosis/lockup/begin-unlocking-response",
      value: MsgBeginUnlockingResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgBeginUnlockingResponseProtoMsg, useInterfaces: boolean = false): MsgBeginUnlockingResponse {
    return MsgBeginUnlockingResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgBeginUnlockingResponse): Uint8Array {
    return MsgBeginUnlockingResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgBeginUnlockingResponse): MsgBeginUnlockingResponseProtoMsg {
    return {
      typeUrl: "/osmosis.lockup.MsgBeginUnlockingResponse",
      value: MsgBeginUnlockingResponse.encode(message).finish()
    };
  }
};
function createBaseMsgExtendLockup(): MsgExtendLockup {
  return {
    owner: "",
    iD: BigInt(0),
    duration: Duration.fromPartial({})
  };
}
export const MsgExtendLockup = {
  typeUrl: "/osmosis.lockup.MsgExtendLockup",
  encode(message: MsgExtendLockup, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.iD !== BigInt(0)) {
      writer.uint32(16).uint64(message.iD);
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgExtendLockup {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExtendLockup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.iD = reader.uint64();
          break;
        case 3:
          message.duration = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExtendLockup>): MsgExtendLockup {
    const message = createBaseMsgExtendLockup();
    message.owner = object.owner ?? "";
    message.iD = object.iD !== undefined && object.iD !== null ? BigInt(object.iD.toString()) : BigInt(0);
    message.duration = object.duration !== undefined && object.duration !== null ? Duration.fromPartial(object.duration) : undefined;
    return message;
  },
  fromAmino(object: MsgExtendLockupAmino): MsgExtendLockup {
    const message = createBaseMsgExtendLockup();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.ID !== undefined && object.ID !== null) {
      message.iD = BigInt(object.ID);
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromAmino(object.duration);
    }
    return message;
  },
  toAmino(message: MsgExtendLockup, useInterfaces: boolean = false): MsgExtendLockupAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.ID = message.iD !== BigInt(0) ? message.iD.toString() : undefined;
    obj.duration = message.duration ? Duration.toAmino(message.duration, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgExtendLockupAminoMsg): MsgExtendLockup {
    return MsgExtendLockup.fromAmino(object.value);
  },
  toAminoMsg(message: MsgExtendLockup, useInterfaces: boolean = false): MsgExtendLockupAminoMsg {
    return {
      type: "osmosis/lockup/extend-lockup",
      value: MsgExtendLockup.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgExtendLockupProtoMsg, useInterfaces: boolean = false): MsgExtendLockup {
    return MsgExtendLockup.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgExtendLockup): Uint8Array {
    return MsgExtendLockup.encode(message).finish();
  },
  toProtoMsg(message: MsgExtendLockup): MsgExtendLockupProtoMsg {
    return {
      typeUrl: "/osmosis.lockup.MsgExtendLockup",
      value: MsgExtendLockup.encode(message).finish()
    };
  }
};
function createBaseMsgExtendLockupResponse(): MsgExtendLockupResponse {
  return {
    success: false
  };
}
export const MsgExtendLockupResponse = {
  typeUrl: "/osmosis.lockup.MsgExtendLockupResponse",
  encode(message: MsgExtendLockupResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgExtendLockupResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExtendLockupResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExtendLockupResponse>): MsgExtendLockupResponse {
    const message = createBaseMsgExtendLockupResponse();
    message.success = object.success ?? false;
    return message;
  },
  fromAmino(object: MsgExtendLockupResponseAmino): MsgExtendLockupResponse {
    const message = createBaseMsgExtendLockupResponse();
    if (object.success !== undefined && object.success !== null) {
      message.success = object.success;
    }
    return message;
  },
  toAmino(message: MsgExtendLockupResponse, useInterfaces: boolean = false): MsgExtendLockupResponseAmino {
    const obj: any = {};
    obj.success = message.success === false ? undefined : message.success;
    return obj;
  },
  fromAminoMsg(object: MsgExtendLockupResponseAminoMsg): MsgExtendLockupResponse {
    return MsgExtendLockupResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgExtendLockupResponse, useInterfaces: boolean = false): MsgExtendLockupResponseAminoMsg {
    return {
      type: "osmosis/lockup/extend-lockup-response",
      value: MsgExtendLockupResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgExtendLockupResponseProtoMsg, useInterfaces: boolean = false): MsgExtendLockupResponse {
    return MsgExtendLockupResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgExtendLockupResponse): Uint8Array {
    return MsgExtendLockupResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgExtendLockupResponse): MsgExtendLockupResponseProtoMsg {
    return {
      typeUrl: "/osmosis.lockup.MsgExtendLockupResponse",
      value: MsgExtendLockupResponse.encode(message).finish()
    };
  }
};
function createBaseMsgForceUnlock(): MsgForceUnlock {
  return {
    owner: "",
    iD: BigInt(0),
    coins: []
  };
}
export const MsgForceUnlock = {
  typeUrl: "/osmosis.lockup.MsgForceUnlock",
  encode(message: MsgForceUnlock, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.iD !== BigInt(0)) {
      writer.uint32(16).uint64(message.iD);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgForceUnlock {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgForceUnlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.iD = reader.uint64();
          break;
        case 3:
          message.coins.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgForceUnlock>): MsgForceUnlock {
    const message = createBaseMsgForceUnlock();
    message.owner = object.owner ?? "";
    message.iD = object.iD !== undefined && object.iD !== null ? BigInt(object.iD.toString()) : BigInt(0);
    message.coins = object.coins?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgForceUnlockAmino): MsgForceUnlock {
    const message = createBaseMsgForceUnlock();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.ID !== undefined && object.ID !== null) {
      message.iD = BigInt(object.ID);
    }
    message.coins = object.coins?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgForceUnlock, useInterfaces: boolean = false): MsgForceUnlockAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.ID = message.iD !== BigInt(0) ? message.iD.toString() : undefined;
    if (message.coins) {
      obj.coins = message.coins.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.coins = message.coins;
    }
    return obj;
  },
  fromAminoMsg(object: MsgForceUnlockAminoMsg): MsgForceUnlock {
    return MsgForceUnlock.fromAmino(object.value);
  },
  toAminoMsg(message: MsgForceUnlock, useInterfaces: boolean = false): MsgForceUnlockAminoMsg {
    return {
      type: "osmosis/lockup/force-unlock-tokens",
      value: MsgForceUnlock.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgForceUnlockProtoMsg, useInterfaces: boolean = false): MsgForceUnlock {
    return MsgForceUnlock.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgForceUnlock): Uint8Array {
    return MsgForceUnlock.encode(message).finish();
  },
  toProtoMsg(message: MsgForceUnlock): MsgForceUnlockProtoMsg {
    return {
      typeUrl: "/osmosis.lockup.MsgForceUnlock",
      value: MsgForceUnlock.encode(message).finish()
    };
  }
};
function createBaseMsgForceUnlockResponse(): MsgForceUnlockResponse {
  return {
    success: false
  };
}
export const MsgForceUnlockResponse = {
  typeUrl: "/osmosis.lockup.MsgForceUnlockResponse",
  encode(message: MsgForceUnlockResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgForceUnlockResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgForceUnlockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgForceUnlockResponse>): MsgForceUnlockResponse {
    const message = createBaseMsgForceUnlockResponse();
    message.success = object.success ?? false;
    return message;
  },
  fromAmino(object: MsgForceUnlockResponseAmino): MsgForceUnlockResponse {
    const message = createBaseMsgForceUnlockResponse();
    if (object.success !== undefined && object.success !== null) {
      message.success = object.success;
    }
    return message;
  },
  toAmino(message: MsgForceUnlockResponse, useInterfaces: boolean = false): MsgForceUnlockResponseAmino {
    const obj: any = {};
    obj.success = message.success === false ? undefined : message.success;
    return obj;
  },
  fromAminoMsg(object: MsgForceUnlockResponseAminoMsg): MsgForceUnlockResponse {
    return MsgForceUnlockResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgForceUnlockResponse, useInterfaces: boolean = false): MsgForceUnlockResponseAminoMsg {
    return {
      type: "osmosis/lockup/force-unlock-response",
      value: MsgForceUnlockResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgForceUnlockResponseProtoMsg, useInterfaces: boolean = false): MsgForceUnlockResponse {
    return MsgForceUnlockResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgForceUnlockResponse): Uint8Array {
    return MsgForceUnlockResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgForceUnlockResponse): MsgForceUnlockResponseProtoMsg {
    return {
      typeUrl: "/osmosis.lockup.MsgForceUnlockResponse",
      value: MsgForceUnlockResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetRewardReceiverAddress(): MsgSetRewardReceiverAddress {
  return {
    owner: "",
    lockID: BigInt(0),
    rewardReceiver: ""
  };
}
export const MsgSetRewardReceiverAddress = {
  typeUrl: "/osmosis.lockup.MsgSetRewardReceiverAddress",
  encode(message: MsgSetRewardReceiverAddress, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.lockID !== BigInt(0)) {
      writer.uint32(16).uint64(message.lockID);
    }
    if (message.rewardReceiver !== "") {
      writer.uint32(26).string(message.rewardReceiver);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetRewardReceiverAddress {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetRewardReceiverAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.lockID = reader.uint64();
          break;
        case 3:
          message.rewardReceiver = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetRewardReceiverAddress>): MsgSetRewardReceiverAddress {
    const message = createBaseMsgSetRewardReceiverAddress();
    message.owner = object.owner ?? "";
    message.lockID = object.lockID !== undefined && object.lockID !== null ? BigInt(object.lockID.toString()) : BigInt(0);
    message.rewardReceiver = object.rewardReceiver ?? "";
    return message;
  },
  fromAmino(object: MsgSetRewardReceiverAddressAmino): MsgSetRewardReceiverAddress {
    const message = createBaseMsgSetRewardReceiverAddress();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.lockID !== undefined && object.lockID !== null) {
      message.lockID = BigInt(object.lockID);
    }
    if (object.reward_receiver !== undefined && object.reward_receiver !== null) {
      message.rewardReceiver = object.reward_receiver;
    }
    return message;
  },
  toAmino(message: MsgSetRewardReceiverAddress, useInterfaces: boolean = false): MsgSetRewardReceiverAddressAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.lockID = message.lockID !== BigInt(0) ? message.lockID.toString() : undefined;
    obj.reward_receiver = message.rewardReceiver === "" ? undefined : message.rewardReceiver;
    return obj;
  },
  fromAminoMsg(object: MsgSetRewardReceiverAddressAminoMsg): MsgSetRewardReceiverAddress {
    return MsgSetRewardReceiverAddress.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetRewardReceiverAddress, useInterfaces: boolean = false): MsgSetRewardReceiverAddressAminoMsg {
    return {
      type: "osmosis/lockup/set-reward-receiver-address",
      value: MsgSetRewardReceiverAddress.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetRewardReceiverAddressProtoMsg, useInterfaces: boolean = false): MsgSetRewardReceiverAddress {
    return MsgSetRewardReceiverAddress.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetRewardReceiverAddress): Uint8Array {
    return MsgSetRewardReceiverAddress.encode(message).finish();
  },
  toProtoMsg(message: MsgSetRewardReceiverAddress): MsgSetRewardReceiverAddressProtoMsg {
    return {
      typeUrl: "/osmosis.lockup.MsgSetRewardReceiverAddress",
      value: MsgSetRewardReceiverAddress.encode(message).finish()
    };
  }
};
function createBaseMsgSetRewardReceiverAddressResponse(): MsgSetRewardReceiverAddressResponse {
  return {
    success: false
  };
}
export const MsgSetRewardReceiverAddressResponse = {
  typeUrl: "/osmosis.lockup.MsgSetRewardReceiverAddressResponse",
  encode(message: MsgSetRewardReceiverAddressResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetRewardReceiverAddressResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetRewardReceiverAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetRewardReceiverAddressResponse>): MsgSetRewardReceiverAddressResponse {
    const message = createBaseMsgSetRewardReceiverAddressResponse();
    message.success = object.success ?? false;
    return message;
  },
  fromAmino(object: MsgSetRewardReceiverAddressResponseAmino): MsgSetRewardReceiverAddressResponse {
    const message = createBaseMsgSetRewardReceiverAddressResponse();
    if (object.success !== undefined && object.success !== null) {
      message.success = object.success;
    }
    return message;
  },
  toAmino(message: MsgSetRewardReceiverAddressResponse, useInterfaces: boolean = false): MsgSetRewardReceiverAddressResponseAmino {
    const obj: any = {};
    obj.success = message.success === false ? undefined : message.success;
    return obj;
  },
  fromAminoMsg(object: MsgSetRewardReceiverAddressResponseAminoMsg): MsgSetRewardReceiverAddressResponse {
    return MsgSetRewardReceiverAddressResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetRewardReceiverAddressResponse, useInterfaces: boolean = false): MsgSetRewardReceiverAddressResponseAminoMsg {
    return {
      type: "osmosis/lockup/set-reward-receiver-address-response",
      value: MsgSetRewardReceiverAddressResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetRewardReceiverAddressResponseProtoMsg, useInterfaces: boolean = false): MsgSetRewardReceiverAddressResponse {
    return MsgSetRewardReceiverAddressResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetRewardReceiverAddressResponse): Uint8Array {
    return MsgSetRewardReceiverAddressResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetRewardReceiverAddressResponse): MsgSetRewardReceiverAddressResponseProtoMsg {
    return {
      typeUrl: "/osmosis.lockup.MsgSetRewardReceiverAddressResponse",
      value: MsgSetRewardReceiverAddressResponse.encode(message).finish()
    };
  }
};