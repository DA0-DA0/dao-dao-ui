import { Height, HeightAmino, HeightSDKType } from "../../../ibc/core/client/v1/client";
import { Pair, PairAmino, PairSDKType } from "./oracle_price_pair";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface OraclePayloadDataSourceBlockHeight {
  dataSource: string;
  blockHeight: Height | undefined;
}
export interface OraclePayloadDataSourceBlockHeightProtoMsg {
  typeUrl: "/pryzm.amm.v1.OraclePayloadDataSourceBlockHeight";
  value: Uint8Array;
}
export interface OraclePayloadDataSourceBlockHeightAmino {
  data_source?: string;
  block_height?: HeightAmino | undefined;
}
export interface OraclePayloadDataSourceBlockHeightAminoMsg {
  type: "/pryzm.amm.v1.OraclePayloadDataSourceBlockHeight";
  value: OraclePayloadDataSourceBlockHeightAmino;
}
export interface OraclePayloadDataSourceBlockHeightSDKType {
  data_source: string;
  block_height: HeightSDKType | undefined;
}
/** OraclePayload defines the structure of oracle vote payload */
export interface OraclePayload {
  dataSourceBlockHeights: OraclePayloadDataSourceBlockHeight[];
  price: string;
  pairs: Pair[];
  quoteToken: string;
}
export interface OraclePayloadProtoMsg {
  typeUrl: "/pryzm.amm.v1.OraclePayload";
  value: Uint8Array;
}
/** OraclePayload defines the structure of oracle vote payload */
export interface OraclePayloadAmino {
  data_source_block_heights?: OraclePayloadDataSourceBlockHeightAmino[];
  price?: string;
  pairs?: PairAmino[];
  quote_token?: string;
}
export interface OraclePayloadAminoMsg {
  type: "/pryzm.amm.v1.OraclePayload";
  value: OraclePayloadAmino;
}
/** OraclePayload defines the structure of oracle vote payload */
export interface OraclePayloadSDKType {
  data_source_block_heights: OraclePayloadDataSourceBlockHeightSDKType[];
  price: string;
  pairs: PairSDKType[];
  quote_token: string;
}
function createBaseOraclePayloadDataSourceBlockHeight(): OraclePayloadDataSourceBlockHeight {
  return {
    dataSource: "",
    blockHeight: Height.fromPartial({})
  };
}
export const OraclePayloadDataSourceBlockHeight = {
  typeUrl: "/pryzm.amm.v1.OraclePayloadDataSourceBlockHeight",
  encode(message: OraclePayloadDataSourceBlockHeight, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.dataSource !== "") {
      writer.uint32(10).string(message.dataSource);
    }
    if (message.blockHeight !== undefined) {
      Height.encode(message.blockHeight, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): OraclePayloadDataSourceBlockHeight {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOraclePayloadDataSourceBlockHeight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dataSource = reader.string();
          break;
        case 2:
          message.blockHeight = Height.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OraclePayloadDataSourceBlockHeight>): OraclePayloadDataSourceBlockHeight {
    const message = createBaseOraclePayloadDataSourceBlockHeight();
    message.dataSource = object.dataSource ?? "";
    message.blockHeight = object.blockHeight !== undefined && object.blockHeight !== null ? Height.fromPartial(object.blockHeight) : undefined;
    return message;
  },
  fromAmino(object: OraclePayloadDataSourceBlockHeightAmino): OraclePayloadDataSourceBlockHeight {
    const message = createBaseOraclePayloadDataSourceBlockHeight();
    if (object.data_source !== undefined && object.data_source !== null) {
      message.dataSource = object.data_source;
    }
    if (object.block_height !== undefined && object.block_height !== null) {
      message.blockHeight = Height.fromAmino(object.block_height);
    }
    return message;
  },
  toAmino(message: OraclePayloadDataSourceBlockHeight, useInterfaces: boolean = false): OraclePayloadDataSourceBlockHeightAmino {
    const obj: any = {};
    obj.data_source = message.dataSource === "" ? undefined : message.dataSource;
    obj.block_height = message.blockHeight ? Height.toAmino(message.blockHeight, useInterfaces) : {};
    return obj;
  },
  fromAminoMsg(object: OraclePayloadDataSourceBlockHeightAminoMsg): OraclePayloadDataSourceBlockHeight {
    return OraclePayloadDataSourceBlockHeight.fromAmino(object.value);
  },
  fromProtoMsg(message: OraclePayloadDataSourceBlockHeightProtoMsg, useInterfaces: boolean = false): OraclePayloadDataSourceBlockHeight {
    return OraclePayloadDataSourceBlockHeight.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: OraclePayloadDataSourceBlockHeight): Uint8Array {
    return OraclePayloadDataSourceBlockHeight.encode(message).finish();
  },
  toProtoMsg(message: OraclePayloadDataSourceBlockHeight): OraclePayloadDataSourceBlockHeightProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.OraclePayloadDataSourceBlockHeight",
      value: OraclePayloadDataSourceBlockHeight.encode(message).finish()
    };
  }
};
function createBaseOraclePayload(): OraclePayload {
  return {
    dataSourceBlockHeights: [],
    price: "",
    pairs: [],
    quoteToken: ""
  };
}
export const OraclePayload = {
  typeUrl: "/pryzm.amm.v1.OraclePayload",
  encode(message: OraclePayload, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.dataSourceBlockHeights) {
      OraclePayloadDataSourceBlockHeight.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.price !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.price, 18).atomics);
    }
    for (const v of message.pairs) {
      Pair.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.quoteToken !== "") {
      writer.uint32(34).string(message.quoteToken);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): OraclePayload {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOraclePayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dataSourceBlockHeights.push(OraclePayloadDataSourceBlockHeight.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.price = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.pairs.push(Pair.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.quoteToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OraclePayload>): OraclePayload {
    const message = createBaseOraclePayload();
    message.dataSourceBlockHeights = object.dataSourceBlockHeights?.map(e => OraclePayloadDataSourceBlockHeight.fromPartial(e)) || [];
    message.price = object.price ?? "";
    message.pairs = object.pairs?.map(e => Pair.fromPartial(e)) || [];
    message.quoteToken = object.quoteToken ?? "";
    return message;
  },
  fromAmino(object: OraclePayloadAmino): OraclePayload {
    const message = createBaseOraclePayload();
    message.dataSourceBlockHeights = object.data_source_block_heights?.map(e => OraclePayloadDataSourceBlockHeight.fromAmino(e)) || [];
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    }
    message.pairs = object.pairs?.map(e => Pair.fromAmino(e)) || [];
    if (object.quote_token !== undefined && object.quote_token !== null) {
      message.quoteToken = object.quote_token;
    }
    return message;
  },
  toAmino(message: OraclePayload, useInterfaces: boolean = false): OraclePayloadAmino {
    const obj: any = {};
    if (message.dataSourceBlockHeights) {
      obj.data_source_block_heights = message.dataSourceBlockHeights.map(e => e ? OraclePayloadDataSourceBlockHeight.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.data_source_block_heights = message.dataSourceBlockHeights;
    }
    obj.price = message.price === "" ? undefined : message.price;
    if (message.pairs) {
      obj.pairs = message.pairs.map(e => e ? Pair.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pairs = message.pairs;
    }
    obj.quote_token = message.quoteToken === "" ? undefined : message.quoteToken;
    return obj;
  },
  fromAminoMsg(object: OraclePayloadAminoMsg): OraclePayload {
    return OraclePayload.fromAmino(object.value);
  },
  fromProtoMsg(message: OraclePayloadProtoMsg, useInterfaces: boolean = false): OraclePayload {
    return OraclePayload.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: OraclePayload): Uint8Array {
    return OraclePayload.encode(message).finish();
  },
  toProtoMsg(message: OraclePayload): OraclePayloadProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.OraclePayload",
      value: OraclePayload.encode(message).finish()
    };
  }
};