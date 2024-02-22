import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
import { toTimestamp, fromTimestamp } from "../../helpers";
export interface DelegateAllianceEvent {
  allianceSender: string;
  validator: string;
  coin: Coin | undefined;
  newShares: string;
}
export interface DelegateAllianceEventProtoMsg {
  typeUrl: "/alliance.alliance.DelegateAllianceEvent";
  value: Uint8Array;
}
export interface DelegateAllianceEventAmino {
  allianceSender?: string;
  validator?: string;
  coin?: CoinAmino | undefined;
  newShares?: string;
}
export interface DelegateAllianceEventAminoMsg {
  type: "/alliance.alliance.DelegateAllianceEvent";
  value: DelegateAllianceEventAmino;
}
export interface DelegateAllianceEventSDKType {
  allianceSender: string;
  validator: string;
  coin: CoinSDKType | undefined;
  newShares: string;
}
export interface UndelegateAllianceEvent {
  allianceSender: string;
  validator: string;
  coin: Coin | undefined;
  completionTime: Date | undefined;
}
export interface UndelegateAllianceEventProtoMsg {
  typeUrl: "/alliance.alliance.UndelegateAllianceEvent";
  value: Uint8Array;
}
export interface UndelegateAllianceEventAmino {
  allianceSender?: string;
  validator?: string;
  coin?: CoinAmino | undefined;
  completionTime?: string | undefined;
}
export interface UndelegateAllianceEventAminoMsg {
  type: "/alliance.alliance.UndelegateAllianceEvent";
  value: UndelegateAllianceEventAmino;
}
export interface UndelegateAllianceEventSDKType {
  allianceSender: string;
  validator: string;
  coin: CoinSDKType | undefined;
  completionTime: Date | undefined;
}
export interface RedelegateAllianceEvent {
  allianceSender: string;
  sourceValidator: string;
  destinationValidator: string;
  coin: Coin | undefined;
  completionTime: Date | undefined;
}
export interface RedelegateAllianceEventProtoMsg {
  typeUrl: "/alliance.alliance.RedelegateAllianceEvent";
  value: Uint8Array;
}
export interface RedelegateAllianceEventAmino {
  allianceSender?: string;
  sourceValidator?: string;
  destinationValidator?: string;
  coin?: CoinAmino | undefined;
  completionTime?: string | undefined;
}
export interface RedelegateAllianceEventAminoMsg {
  type: "/alliance.alliance.RedelegateAllianceEvent";
  value: RedelegateAllianceEventAmino;
}
export interface RedelegateAllianceEventSDKType {
  allianceSender: string;
  sourceValidator: string;
  destinationValidator: string;
  coin: CoinSDKType | undefined;
  completionTime: Date | undefined;
}
export interface ClaimAllianceRewardsEvent {
  allianceSender: string;
  validator: string;
  coins: Coin[];
}
export interface ClaimAllianceRewardsEventProtoMsg {
  typeUrl: "/alliance.alliance.ClaimAllianceRewardsEvent";
  value: Uint8Array;
}
export interface ClaimAllianceRewardsEventAmino {
  allianceSender?: string;
  validator?: string;
  coins?: CoinAmino[];
}
export interface ClaimAllianceRewardsEventAminoMsg {
  type: "/alliance.alliance.ClaimAllianceRewardsEvent";
  value: ClaimAllianceRewardsEventAmino;
}
export interface ClaimAllianceRewardsEventSDKType {
  allianceSender: string;
  validator: string;
  coins: CoinSDKType[];
}
export interface DeductAllianceAssetsEvent {
  coins: Coin[];
}
export interface DeductAllianceAssetsEventProtoMsg {
  typeUrl: "/alliance.alliance.DeductAllianceAssetsEvent";
  value: Uint8Array;
}
export interface DeductAllianceAssetsEventAmino {
  coins?: CoinAmino[];
}
export interface DeductAllianceAssetsEventAminoMsg {
  type: "/alliance.alliance.DeductAllianceAssetsEvent";
  value: DeductAllianceAssetsEventAmino;
}
export interface DeductAllianceAssetsEventSDKType {
  coins: CoinSDKType[];
}
function createBaseDelegateAllianceEvent(): DelegateAllianceEvent {
  return {
    allianceSender: "",
    validator: "",
    coin: Coin.fromPartial({}),
    newShares: ""
  };
}
export const DelegateAllianceEvent = {
  typeUrl: "/alliance.alliance.DelegateAllianceEvent",
  encode(message: DelegateAllianceEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.allianceSender !== "") {
      writer.uint32(10).string(message.allianceSender);
    }
    if (message.validator !== "") {
      writer.uint32(18).string(message.validator);
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(26).fork()).ldelim();
    }
    if (message.newShares !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.newShares, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DelegateAllianceEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegateAllianceEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.allianceSender = reader.string();
          break;
        case 2:
          message.validator = reader.string();
          break;
        case 3:
          message.coin = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.newShares = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DelegateAllianceEvent>): DelegateAllianceEvent {
    const message = createBaseDelegateAllianceEvent();
    message.allianceSender = object.allianceSender ?? "";
    message.validator = object.validator ?? "";
    message.coin = object.coin !== undefined && object.coin !== null ? Coin.fromPartial(object.coin) : undefined;
    message.newShares = object.newShares ?? "";
    return message;
  },
  fromAmino(object: DelegateAllianceEventAmino): DelegateAllianceEvent {
    const message = createBaseDelegateAllianceEvent();
    if (object.allianceSender !== undefined && object.allianceSender !== null) {
      message.allianceSender = object.allianceSender;
    }
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = object.validator;
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = Coin.fromAmino(object.coin);
    }
    if (object.newShares !== undefined && object.newShares !== null) {
      message.newShares = object.newShares;
    }
    return message;
  },
  toAmino(message: DelegateAllianceEvent, useInterfaces: boolean = false): DelegateAllianceEventAmino {
    const obj: any = {};
    obj.allianceSender = message.allianceSender;
    obj.validator = message.validator;
    obj.coin = message.coin ? Coin.toAmino(message.coin, useInterfaces) : undefined;
    obj.newShares = message.newShares;
    return obj;
  },
  fromAminoMsg(object: DelegateAllianceEventAminoMsg): DelegateAllianceEvent {
    return DelegateAllianceEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: DelegateAllianceEventProtoMsg, useInterfaces: boolean = false): DelegateAllianceEvent {
    return DelegateAllianceEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DelegateAllianceEvent): Uint8Array {
    return DelegateAllianceEvent.encode(message).finish();
  },
  toProtoMsg(message: DelegateAllianceEvent): DelegateAllianceEventProtoMsg {
    return {
      typeUrl: "/alliance.alliance.DelegateAllianceEvent",
      value: DelegateAllianceEvent.encode(message).finish()
    };
  }
};
function createBaseUndelegateAllianceEvent(): UndelegateAllianceEvent {
  return {
    allianceSender: "",
    validator: "",
    coin: Coin.fromPartial({}),
    completionTime: new Date()
  };
}
export const UndelegateAllianceEvent = {
  typeUrl: "/alliance.alliance.UndelegateAllianceEvent",
  encode(message: UndelegateAllianceEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.allianceSender !== "") {
      writer.uint32(10).string(message.allianceSender);
    }
    if (message.validator !== "") {
      writer.uint32(18).string(message.validator);
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(26).fork()).ldelim();
    }
    if (message.completionTime !== undefined) {
      Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UndelegateAllianceEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUndelegateAllianceEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.allianceSender = reader.string();
          break;
        case 2:
          message.validator = reader.string();
          break;
        case 3:
          message.coin = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UndelegateAllianceEvent>): UndelegateAllianceEvent {
    const message = createBaseUndelegateAllianceEvent();
    message.allianceSender = object.allianceSender ?? "";
    message.validator = object.validator ?? "";
    message.coin = object.coin !== undefined && object.coin !== null ? Coin.fromPartial(object.coin) : undefined;
    message.completionTime = object.completionTime ?? undefined;
    return message;
  },
  fromAmino(object: UndelegateAllianceEventAmino): UndelegateAllianceEvent {
    const message = createBaseUndelegateAllianceEvent();
    if (object.allianceSender !== undefined && object.allianceSender !== null) {
      message.allianceSender = object.allianceSender;
    }
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = object.validator;
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = Coin.fromAmino(object.coin);
    }
    if (object.completionTime !== undefined && object.completionTime !== null) {
      message.completionTime = fromTimestamp(Timestamp.fromAmino(object.completionTime));
    }
    return message;
  },
  toAmino(message: UndelegateAllianceEvent, useInterfaces: boolean = false): UndelegateAllianceEventAmino {
    const obj: any = {};
    obj.allianceSender = message.allianceSender;
    obj.validator = message.validator;
    obj.coin = message.coin ? Coin.toAmino(message.coin, useInterfaces) : undefined;
    obj.completionTime = message.completionTime ? Timestamp.toAmino(toTimestamp(message.completionTime)) : undefined;
    return obj;
  },
  fromAminoMsg(object: UndelegateAllianceEventAminoMsg): UndelegateAllianceEvent {
    return UndelegateAllianceEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: UndelegateAllianceEventProtoMsg, useInterfaces: boolean = false): UndelegateAllianceEvent {
    return UndelegateAllianceEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UndelegateAllianceEvent): Uint8Array {
    return UndelegateAllianceEvent.encode(message).finish();
  },
  toProtoMsg(message: UndelegateAllianceEvent): UndelegateAllianceEventProtoMsg {
    return {
      typeUrl: "/alliance.alliance.UndelegateAllianceEvent",
      value: UndelegateAllianceEvent.encode(message).finish()
    };
  }
};
function createBaseRedelegateAllianceEvent(): RedelegateAllianceEvent {
  return {
    allianceSender: "",
    sourceValidator: "",
    destinationValidator: "",
    coin: Coin.fromPartial({}),
    completionTime: new Date()
  };
}
export const RedelegateAllianceEvent = {
  typeUrl: "/alliance.alliance.RedelegateAllianceEvent",
  encode(message: RedelegateAllianceEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.allianceSender !== "") {
      writer.uint32(10).string(message.allianceSender);
    }
    if (message.sourceValidator !== "") {
      writer.uint32(18).string(message.sourceValidator);
    }
    if (message.destinationValidator !== "") {
      writer.uint32(26).string(message.destinationValidator);
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(34).fork()).ldelim();
    }
    if (message.completionTime !== undefined) {
      Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RedelegateAllianceEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedelegateAllianceEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.allianceSender = reader.string();
          break;
        case 2:
          message.sourceValidator = reader.string();
          break;
        case 3:
          message.destinationValidator = reader.string();
          break;
        case 4:
          message.coin = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RedelegateAllianceEvent>): RedelegateAllianceEvent {
    const message = createBaseRedelegateAllianceEvent();
    message.allianceSender = object.allianceSender ?? "";
    message.sourceValidator = object.sourceValidator ?? "";
    message.destinationValidator = object.destinationValidator ?? "";
    message.coin = object.coin !== undefined && object.coin !== null ? Coin.fromPartial(object.coin) : undefined;
    message.completionTime = object.completionTime ?? undefined;
    return message;
  },
  fromAmino(object: RedelegateAllianceEventAmino): RedelegateAllianceEvent {
    const message = createBaseRedelegateAllianceEvent();
    if (object.allianceSender !== undefined && object.allianceSender !== null) {
      message.allianceSender = object.allianceSender;
    }
    if (object.sourceValidator !== undefined && object.sourceValidator !== null) {
      message.sourceValidator = object.sourceValidator;
    }
    if (object.destinationValidator !== undefined && object.destinationValidator !== null) {
      message.destinationValidator = object.destinationValidator;
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = Coin.fromAmino(object.coin);
    }
    if (object.completionTime !== undefined && object.completionTime !== null) {
      message.completionTime = fromTimestamp(Timestamp.fromAmino(object.completionTime));
    }
    return message;
  },
  toAmino(message: RedelegateAllianceEvent, useInterfaces: boolean = false): RedelegateAllianceEventAmino {
    const obj: any = {};
    obj.allianceSender = message.allianceSender;
    obj.sourceValidator = message.sourceValidator;
    obj.destinationValidator = message.destinationValidator;
    obj.coin = message.coin ? Coin.toAmino(message.coin, useInterfaces) : undefined;
    obj.completionTime = message.completionTime ? Timestamp.toAmino(toTimestamp(message.completionTime)) : undefined;
    return obj;
  },
  fromAminoMsg(object: RedelegateAllianceEventAminoMsg): RedelegateAllianceEvent {
    return RedelegateAllianceEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: RedelegateAllianceEventProtoMsg, useInterfaces: boolean = false): RedelegateAllianceEvent {
    return RedelegateAllianceEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RedelegateAllianceEvent): Uint8Array {
    return RedelegateAllianceEvent.encode(message).finish();
  },
  toProtoMsg(message: RedelegateAllianceEvent): RedelegateAllianceEventProtoMsg {
    return {
      typeUrl: "/alliance.alliance.RedelegateAllianceEvent",
      value: RedelegateAllianceEvent.encode(message).finish()
    };
  }
};
function createBaseClaimAllianceRewardsEvent(): ClaimAllianceRewardsEvent {
  return {
    allianceSender: "",
    validator: "",
    coins: []
  };
}
export const ClaimAllianceRewardsEvent = {
  typeUrl: "/alliance.alliance.ClaimAllianceRewardsEvent",
  encode(message: ClaimAllianceRewardsEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.allianceSender !== "") {
      writer.uint32(10).string(message.allianceSender);
    }
    if (message.validator !== "") {
      writer.uint32(18).string(message.validator);
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ClaimAllianceRewardsEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaimAllianceRewardsEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.allianceSender = reader.string();
          break;
        case 2:
          message.validator = reader.string();
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
  fromPartial(object: Partial<ClaimAllianceRewardsEvent>): ClaimAllianceRewardsEvent {
    const message = createBaseClaimAllianceRewardsEvent();
    message.allianceSender = object.allianceSender ?? "";
    message.validator = object.validator ?? "";
    message.coins = object.coins?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ClaimAllianceRewardsEventAmino): ClaimAllianceRewardsEvent {
    const message = createBaseClaimAllianceRewardsEvent();
    if (object.allianceSender !== undefined && object.allianceSender !== null) {
      message.allianceSender = object.allianceSender;
    }
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = object.validator;
    }
    message.coins = object.coins?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: ClaimAllianceRewardsEvent, useInterfaces: boolean = false): ClaimAllianceRewardsEventAmino {
    const obj: any = {};
    obj.allianceSender = message.allianceSender;
    obj.validator = message.validator;
    if (message.coins) {
      obj.coins = message.coins.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.coins = [];
    }
    return obj;
  },
  fromAminoMsg(object: ClaimAllianceRewardsEventAminoMsg): ClaimAllianceRewardsEvent {
    return ClaimAllianceRewardsEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: ClaimAllianceRewardsEventProtoMsg, useInterfaces: boolean = false): ClaimAllianceRewardsEvent {
    return ClaimAllianceRewardsEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ClaimAllianceRewardsEvent): Uint8Array {
    return ClaimAllianceRewardsEvent.encode(message).finish();
  },
  toProtoMsg(message: ClaimAllianceRewardsEvent): ClaimAllianceRewardsEventProtoMsg {
    return {
      typeUrl: "/alliance.alliance.ClaimAllianceRewardsEvent",
      value: ClaimAllianceRewardsEvent.encode(message).finish()
    };
  }
};
function createBaseDeductAllianceAssetsEvent(): DeductAllianceAssetsEvent {
  return {
    coins: []
  };
}
export const DeductAllianceAssetsEvent = {
  typeUrl: "/alliance.alliance.DeductAllianceAssetsEvent",
  encode(message: DeductAllianceAssetsEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DeductAllianceAssetsEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeductAllianceAssetsEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DeductAllianceAssetsEvent>): DeductAllianceAssetsEvent {
    const message = createBaseDeductAllianceAssetsEvent();
    message.coins = object.coins?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: DeductAllianceAssetsEventAmino): DeductAllianceAssetsEvent {
    const message = createBaseDeductAllianceAssetsEvent();
    message.coins = object.coins?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: DeductAllianceAssetsEvent, useInterfaces: boolean = false): DeductAllianceAssetsEventAmino {
    const obj: any = {};
    if (message.coins) {
      obj.coins = message.coins.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.coins = [];
    }
    return obj;
  },
  fromAminoMsg(object: DeductAllianceAssetsEventAminoMsg): DeductAllianceAssetsEvent {
    return DeductAllianceAssetsEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: DeductAllianceAssetsEventProtoMsg, useInterfaces: boolean = false): DeductAllianceAssetsEvent {
    return DeductAllianceAssetsEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DeductAllianceAssetsEvent): Uint8Array {
    return DeductAllianceAssetsEvent.encode(message).finish();
  },
  toProtoMsg(message: DeductAllianceAssetsEvent): DeductAllianceAssetsEventProtoMsg {
    return {
      typeUrl: "/alliance.alliance.DeductAllianceAssetsEvent",
      value: DeductAllianceAssetsEvent.encode(message).finish()
    };
  }
};