import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
export interface MaturityLevel {
  active: boolean;
  assetId: string;
  symbol: string;
  introductionTime: Date | undefined;
  expirationTime: Date | undefined;
}
export interface MaturityLevelProtoMsg {
  typeUrl: "/pryzm.assets.v1.MaturityLevel";
  value: Uint8Array;
}
export interface MaturityLevelAmino {
  active?: boolean;
  asset_id?: string;
  symbol?: string;
  introduction_time?: string | undefined;
  expiration_time?: string | undefined;
}
export interface MaturityLevelAminoMsg {
  type: "/pryzm.assets.v1.MaturityLevel";
  value: MaturityLevelAmino;
}
export interface MaturityLevelSDKType {
  active: boolean;
  asset_id: string;
  symbol: string;
  introduction_time: Date | undefined;
  expiration_time: Date | undefined;
}
function createBaseMaturityLevel(): MaturityLevel {
  return {
    active: false,
    assetId: "",
    symbol: "",
    introductionTime: new Date(),
    expirationTime: new Date()
  };
}
export const MaturityLevel = {
  typeUrl: "/pryzm.assets.v1.MaturityLevel",
  encode(message: MaturityLevel, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.active === true) {
      writer.uint32(8).bool(message.active);
    }
    if (message.assetId !== "") {
      writer.uint32(18).string(message.assetId);
    }
    if (message.symbol !== "") {
      writer.uint32(26).string(message.symbol);
    }
    if (message.introductionTime !== undefined) {
      Timestamp.encode(toTimestamp(message.introductionTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.expirationTime !== undefined) {
      Timestamp.encode(toTimestamp(message.expirationTime), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MaturityLevel {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaturityLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.active = reader.bool();
          break;
        case 2:
          message.assetId = reader.string();
          break;
        case 3:
          message.symbol = reader.string();
          break;
        case 4:
          message.introductionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.expirationTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MaturityLevel>): MaturityLevel {
    const message = createBaseMaturityLevel();
    message.active = object.active ?? false;
    message.assetId = object.assetId ?? "";
    message.symbol = object.symbol ?? "";
    message.introductionTime = object.introductionTime ?? undefined;
    message.expirationTime = object.expirationTime ?? undefined;
    return message;
  },
  fromAmino(object: MaturityLevelAmino): MaturityLevel {
    const message = createBaseMaturityLevel();
    if (object.active !== undefined && object.active !== null) {
      message.active = object.active;
    }
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = object.symbol;
    }
    if (object.introduction_time !== undefined && object.introduction_time !== null) {
      message.introductionTime = fromTimestamp(Timestamp.fromAmino(object.introduction_time));
    }
    if (object.expiration_time !== undefined && object.expiration_time !== null) {
      message.expirationTime = fromTimestamp(Timestamp.fromAmino(object.expiration_time));
    }
    return message;
  },
  toAmino(message: MaturityLevel, useInterfaces: boolean = false): MaturityLevelAmino {
    const obj: any = {};
    obj.active = message.active === false ? undefined : message.active;
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    obj.symbol = message.symbol === "" ? undefined : message.symbol;
    obj.introduction_time = message.introductionTime ? Timestamp.toAmino(toTimestamp(message.introductionTime)) : undefined;
    obj.expiration_time = message.expirationTime ? Timestamp.toAmino(toTimestamp(message.expirationTime)) : undefined;
    return obj;
  },
  fromAminoMsg(object: MaturityLevelAminoMsg): MaturityLevel {
    return MaturityLevel.fromAmino(object.value);
  },
  fromProtoMsg(message: MaturityLevelProtoMsg, useInterfaces: boolean = false): MaturityLevel {
    return MaturityLevel.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MaturityLevel): Uint8Array {
    return MaturityLevel.encode(message).finish();
  },
  toProtoMsg(message: MaturityLevel): MaturityLevelProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.MaturityLevel",
      value: MaturityLevel.encode(message).finish()
    };
  }
};