import { BinaryReader, BinaryWriter } from "../../binary";
export interface StakeibcPacketData {
  noData?: NoData | undefined;
}
export interface StakeibcPacketDataProtoMsg {
  typeUrl: "/stride.stakeibc.StakeibcPacketData";
  value: Uint8Array;
}
export interface StakeibcPacketDataAmino {
  no_data?: NoDataAmino | undefined;
}
export interface StakeibcPacketDataAminoMsg {
  type: "/stride.stakeibc.StakeibcPacketData";
  value: StakeibcPacketDataAmino;
}
export interface StakeibcPacketDataSDKType {
  no_data?: NoDataSDKType | undefined;
}
export interface NoData {}
export interface NoDataProtoMsg {
  typeUrl: "/stride.stakeibc.NoData";
  value: Uint8Array;
}
export interface NoDataAmino {}
export interface NoDataAminoMsg {
  type: "/stride.stakeibc.NoData";
  value: NoDataAmino;
}
export interface NoDataSDKType {}
function createBaseStakeibcPacketData(): StakeibcPacketData {
  return {
    noData: undefined
  };
}
export const StakeibcPacketData = {
  typeUrl: "/stride.stakeibc.StakeibcPacketData",
  encode(message: StakeibcPacketData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.noData !== undefined) {
      NoData.encode(message.noData, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): StakeibcPacketData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStakeibcPacketData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.noData = NoData.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<StakeibcPacketData>): StakeibcPacketData {
    const message = createBaseStakeibcPacketData();
    message.noData = object.noData !== undefined && object.noData !== null ? NoData.fromPartial(object.noData) : undefined;
    return message;
  },
  fromAmino(object: StakeibcPacketDataAmino): StakeibcPacketData {
    const message = createBaseStakeibcPacketData();
    if (object.no_data !== undefined && object.no_data !== null) {
      message.noData = NoData.fromAmino(object.no_data);
    }
    return message;
  },
  toAmino(message: StakeibcPacketData, useInterfaces: boolean = false): StakeibcPacketDataAmino {
    const obj: any = {};
    obj.no_data = message.noData ? NoData.toAmino(message.noData, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: StakeibcPacketDataAminoMsg): StakeibcPacketData {
    return StakeibcPacketData.fromAmino(object.value);
  },
  fromProtoMsg(message: StakeibcPacketDataProtoMsg, useInterfaces: boolean = false): StakeibcPacketData {
    return StakeibcPacketData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: StakeibcPacketData): Uint8Array {
    return StakeibcPacketData.encode(message).finish();
  },
  toProtoMsg(message: StakeibcPacketData): StakeibcPacketDataProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.StakeibcPacketData",
      value: StakeibcPacketData.encode(message).finish()
    };
  }
};
function createBaseNoData(): NoData {
  return {};
}
export const NoData = {
  typeUrl: "/stride.stakeibc.NoData",
  encode(_: NoData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): NoData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNoData();
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
  fromPartial(_: Partial<NoData>): NoData {
    const message = createBaseNoData();
    return message;
  },
  fromAmino(_: NoDataAmino): NoData {
    const message = createBaseNoData();
    return message;
  },
  toAmino(_: NoData, useInterfaces: boolean = false): NoDataAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: NoDataAminoMsg): NoData {
    return NoData.fromAmino(object.value);
  },
  fromProtoMsg(message: NoDataProtoMsg, useInterfaces: boolean = false): NoData {
    return NoData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: NoData): Uint8Array {
    return NoData.encode(message).finish();
  },
  toProtoMsg(message: NoData): NoDataProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.NoData",
      value: NoData.encode(message).finish()
    };
  }
};