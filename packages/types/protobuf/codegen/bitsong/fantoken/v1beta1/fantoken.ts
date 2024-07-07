import { BinaryReader, BinaryWriter } from "../../../binary";
export interface Metadata {
  /** name defines the name of the fantoken (eg: Kitty Punk) */
  name: string;
  /** symbol is the token symbol usually shown on exchanges (eg: KITTY) */
  symbol: string;
  /**
   * URI to a document (on or off-chain) that contains additional
   * information.Optional.
   */
  uri: string;
  /** sdk.AccAddress allowed to set a new uri */
  authority: string;
}
export interface MetadataProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.Metadata";
  value: Uint8Array;
}
export interface MetadataAmino {
  /** name defines the name of the fantoken (eg: Kitty Punk) */
  name?: string;
  /** symbol is the token symbol usually shown on exchanges (eg: KITTY) */
  symbol?: string;
  /**
   * URI to a document (on or off-chain) that contains additional
   * information.Optional.
   */
  uri?: string;
  /** sdk.AccAddress allowed to set a new uri */
  authority?: string;
}
export interface MetadataAminoMsg {
  type: "/bitsong.fantoken.v1beta1.Metadata";
  value: MetadataAmino;
}
export interface MetadataSDKType {
  name: string;
  symbol: string;
  uri: string;
  authority: string;
}
/** FanToken defines a standard for the fungible token */
export interface FanToken {
  /** denom represents the string name of the given denom unit (e.g ft<hash>). */
  denom: string;
  maxSupply: string;
  /** sdk.AccAddress allowed to mint new fantoken */
  minter: string;
  metaData: Metadata | undefined;
}
export interface FanTokenProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.FanToken";
  value: Uint8Array;
}
/** FanToken defines a standard for the fungible token */
export interface FanTokenAmino {
  /** denom represents the string name of the given denom unit (e.g ft<hash>). */
  denom?: string;
  max_supply?: string;
  /** sdk.AccAddress allowed to mint new fantoken */
  minter?: string;
  meta_data?: MetadataAmino | undefined;
}
export interface FanTokenAminoMsg {
  type: "/bitsong.fantoken.v1beta1.FanToken";
  value: FanTokenAmino;
}
/** FanToken defines a standard for the fungible token */
export interface FanTokenSDKType {
  denom: string;
  max_supply: string;
  minter: string;
  meta_data: MetadataSDKType | undefined;
}
function createBaseMetadata(): Metadata {
  return {
    name: "",
    symbol: "",
    uri: "",
    authority: ""
  };
}
export const Metadata = {
  typeUrl: "/bitsong.fantoken.v1beta1.Metadata",
  encode(message: Metadata, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.symbol !== "") {
      writer.uint32(18).string(message.symbol);
    }
    if (message.uri !== "") {
      writer.uint32(26).string(message.uri);
    }
    if (message.authority !== "") {
      writer.uint32(34).string(message.authority);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Metadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.symbol = reader.string();
          break;
        case 3:
          message.uri = reader.string();
          break;
        case 4:
          message.authority = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Metadata>): Metadata {
    const message = createBaseMetadata();
    message.name = object.name ?? "";
    message.symbol = object.symbol ?? "";
    message.uri = object.uri ?? "";
    message.authority = object.authority ?? "";
    return message;
  },
  fromAmino(object: MetadataAmino): Metadata {
    const message = createBaseMetadata();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = object.symbol;
    }
    if (object.uri !== undefined && object.uri !== null) {
      message.uri = object.uri;
    }
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    return message;
  },
  toAmino(message: Metadata, useInterfaces: boolean = false): MetadataAmino {
    const obj: any = {};
    obj.name = message.name;
    obj.symbol = message.symbol;
    obj.uri = message.uri;
    obj.authority = message.authority;
    return obj;
  },
  fromAminoMsg(object: MetadataAminoMsg): Metadata {
    return Metadata.fromAmino(object.value);
  },
  fromProtoMsg(message: MetadataProtoMsg, useInterfaces: boolean = false): Metadata {
    return Metadata.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Metadata): Uint8Array {
    return Metadata.encode(message).finish();
  },
  toProtoMsg(message: Metadata): MetadataProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.Metadata",
      value: Metadata.encode(message).finish()
    };
  }
};
function createBaseFanToken(): FanToken {
  return {
    denom: "",
    maxSupply: "",
    minter: "",
    metaData: Metadata.fromPartial({})
  };
}
export const FanToken = {
  typeUrl: "/bitsong.fantoken.v1beta1.FanToken",
  encode(message: FanToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.maxSupply !== "") {
      writer.uint32(18).string(message.maxSupply);
    }
    if (message.minter !== "") {
      writer.uint32(26).string(message.minter);
    }
    if (message.metaData !== undefined) {
      Metadata.encode(message.metaData, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): FanToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFanToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.maxSupply = reader.string();
          break;
        case 3:
          message.minter = reader.string();
          break;
        case 4:
          message.metaData = Metadata.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<FanToken>): FanToken {
    const message = createBaseFanToken();
    message.denom = object.denom ?? "";
    message.maxSupply = object.maxSupply ?? "";
    message.minter = object.minter ?? "";
    message.metaData = object.metaData !== undefined && object.metaData !== null ? Metadata.fromPartial(object.metaData) : undefined;
    return message;
  },
  fromAmino(object: FanTokenAmino): FanToken {
    const message = createBaseFanToken();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.max_supply !== undefined && object.max_supply !== null) {
      message.maxSupply = object.max_supply;
    }
    if (object.minter !== undefined && object.minter !== null) {
      message.minter = object.minter;
    }
    if (object.meta_data !== undefined && object.meta_data !== null) {
      message.metaData = Metadata.fromAmino(object.meta_data);
    }
    return message;
  },
  toAmino(message: FanToken, useInterfaces: boolean = false): FanTokenAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.max_supply = message.maxSupply;
    obj.minter = message.minter;
    obj.meta_data = message.metaData ? Metadata.toAmino(message.metaData, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: FanTokenAminoMsg): FanToken {
    return FanToken.fromAmino(object.value);
  },
  fromProtoMsg(message: FanTokenProtoMsg, useInterfaces: boolean = false): FanToken {
    return FanToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: FanToken): Uint8Array {
    return FanToken.encode(message).finish();
  },
  toProtoMsg(message: FanToken): FanTokenProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.FanToken",
      value: FanToken.encode(message).finish()
    };
  }
};