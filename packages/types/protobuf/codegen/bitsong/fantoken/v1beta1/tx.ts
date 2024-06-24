//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** MsgIssue defines a message for issuing a new fan token */
export interface MsgIssue {
  /** symbol which corresponds to the symbol of the fan token. It is a string and cannot change for the whole life of the fan token */
  symbol: string;
  /** name which corresponds to the name of the fan token. It is a string and cannot change for the whole life of the fan token */
  name: string;
  /** max_supply that represents the maximum number of possible mintable tokens. It is an integer number, expressed in micro unit 10^6 */
  maxSupply: string;
  /** authority which is who can set a new uri metadata */
  authority: string;
  /** minter who is who can mint new fantoken and disable the minter process, the minter key also pay the gas fee */
  minter: string;
  /** URI which is the current uri of the fan token. It is a string can change during the fan token lifecycle thanks to the MsgEdit */
  uri: string;
}
export interface MsgIssueProtoMsg {
  typeUrl: "/bitsong.fantoken.MsgIssue";
  value: Uint8Array;
}
/** MsgIssue defines a message for issuing a new fan token */
export interface MsgIssueAmino {
  /** symbol which corresponds to the symbol of the fan token. It is a string and cannot change for the whole life of the fan token */
  symbol?: string;
  /** name which corresponds to the name of the fan token. It is a string and cannot change for the whole life of the fan token */
  name?: string;
  /** max_supply that represents the maximum number of possible mintable tokens. It is an integer number, expressed in micro unit 10^6 */
  max_supply?: string;
  /** authority which is who can set a new uri metadata */
  authority?: string;
  /** minter who is who can mint new fantoken and disable the minter process, the minter key also pay the gas fee */
  minter?: string;
  /** URI which is the current uri of the fan token. It is a string can change during the fan token lifecycle thanks to the MsgEdit */
  uri?: string;
}
export interface MsgIssueAminoMsg {
  type: "/bitsong.fantoken.MsgIssue";
  value: MsgIssueAmino;
}
/** MsgIssue defines a message for issuing a new fan token */
export interface MsgIssueSDKType {
  symbol: string;
  name: string;
  max_supply: string;
  authority: string;
  minter: string;
  uri: string;
}
/** MsgIssueResponse defines the MsgIssue response type */
export interface MsgIssueResponse {}
export interface MsgIssueResponseProtoMsg {
  typeUrl: "/bitsong.fantoken.MsgIssueResponse";
  value: Uint8Array;
}
/** MsgIssueResponse defines the MsgIssue response type */
export interface MsgIssueResponseAmino {}
export interface MsgIssueResponseAminoMsg {
  type: "/bitsong.fantoken.MsgIssueResponse";
  value: MsgIssueResponseAmino;
}
/** MsgIssueResponse defines the MsgIssue response type */
export interface MsgIssueResponseSDKType {}
/** MsgDisableMint defines a message for disable the mint function */
export interface MsgDisableMint {
  denom: string;
  minter: string;
}
export interface MsgDisableMintProtoMsg {
  typeUrl: "/bitsong.fantoken.MsgDisableMint";
  value: Uint8Array;
}
/** MsgDisableMint defines a message for disable the mint function */
export interface MsgDisableMintAmino {
  denom?: string;
  minter?: string;
}
export interface MsgDisableMintAminoMsg {
  type: "/bitsong.fantoken.MsgDisableMint";
  value: MsgDisableMintAmino;
}
/** MsgDisableMint defines a message for disable the mint function */
export interface MsgDisableMintSDKType {
  denom: string;
  minter: string;
}
/** MsgDisableMintResponse defines the MsgDisableMint response type */
export interface MsgDisableMintResponse {}
export interface MsgDisableMintResponseProtoMsg {
  typeUrl: "/bitsong.fantoken.MsgDisableMintResponse";
  value: Uint8Array;
}
/** MsgDisableMintResponse defines the MsgDisableMint response type */
export interface MsgDisableMintResponseAmino {}
export interface MsgDisableMintResponseAminoMsg {
  type: "/bitsong.fantoken.MsgDisableMintResponse";
  value: MsgDisableMintResponseAmino;
}
/** MsgDisableMintResponse defines the MsgDisableMint response type */
export interface MsgDisableMintResponseSDKType {}
/** MsgMint defines a message for minting a new fan token */
export interface MsgMint {
  recipient: string;
  /** coin mean the amount + denom, eg: 10000ftFADJID34MCDM */
  coin: Coin | undefined;
  minter: string;
}
export interface MsgMintProtoMsg {
  typeUrl: "/bitsong.fantoken.MsgMint";
  value: Uint8Array;
}
/** MsgMint defines a message for minting a new fan token */
export interface MsgMintAmino {
  recipient?: string;
  /** coin mean the amount + denom, eg: 10000ftFADJID34MCDM */
  coin?: CoinAmino | undefined;
  minter?: string;
}
export interface MsgMintAminoMsg {
  type: "/bitsong.fantoken.MsgMint";
  value: MsgMintAmino;
}
/** MsgMint defines a message for minting a new fan token */
export interface MsgMintSDKType {
  recipient: string;
  coin: CoinSDKType | undefined;
  minter: string;
}
/** MsgMintResponse defines the MsgMint response type */
export interface MsgMintResponse {}
export interface MsgMintResponseProtoMsg {
  typeUrl: "/bitsong.fantoken.MsgMintResponse";
  value: Uint8Array;
}
/** MsgMintResponse defines the MsgMint response type */
export interface MsgMintResponseAmino {}
export interface MsgMintResponseAminoMsg {
  type: "/bitsong.fantoken.MsgMintResponse";
  value: MsgMintResponseAmino;
}
/** MsgMintResponse defines the MsgMint response type */
export interface MsgMintResponseSDKType {}
/** MsgBurn defines a message for burning some fan tokens */
export interface MsgBurn {
  /** coin mean the amount + denom, eg: 10000ftFADJID34MCDM */
  coin: Coin | undefined;
  sender: string;
}
export interface MsgBurnProtoMsg {
  typeUrl: "/bitsong.fantoken.MsgBurn";
  value: Uint8Array;
}
/** MsgBurn defines a message for burning some fan tokens */
export interface MsgBurnAmino {
  /** coin mean the amount + denom, eg: 10000ftFADJID34MCDM */
  coin?: CoinAmino | undefined;
  sender?: string;
}
export interface MsgBurnAminoMsg {
  type: "/bitsong.fantoken.MsgBurn";
  value: MsgBurnAmino;
}
/** MsgBurn defines a message for burning some fan tokens */
export interface MsgBurnSDKType {
  coin: CoinSDKType | undefined;
  sender: string;
}
/** MsgBurnResponse defines the MsgBurn response type */
export interface MsgBurnResponse {}
export interface MsgBurnResponseProtoMsg {
  typeUrl: "/bitsong.fantoken.MsgBurnResponse";
  value: Uint8Array;
}
/** MsgBurnResponse defines the MsgBurn response type */
export interface MsgBurnResponseAmino {}
export interface MsgBurnResponseAminoMsg {
  type: "/bitsong.fantoken.MsgBurnResponse";
  value: MsgBurnResponseAmino;
}
/** MsgBurnResponse defines the MsgBurn response type */
export interface MsgBurnResponseSDKType {}
/** MsgSetMinter defines a message for changing the fan token minter address */
export interface MsgSetMinter {
  /** denom the fan token denom */
  denom: string;
  /** old_minter, the actual minter */
  oldMinter: string;
  /** new_minter, the new fan token minter */
  newMinter: string;
}
export interface MsgSetMinterProtoMsg {
  typeUrl: "/bitsong.fantoken.MsgSetMinter";
  value: Uint8Array;
}
/** MsgSetMinter defines a message for changing the fan token minter address */
export interface MsgSetMinterAmino {
  /** denom the fan token denom */
  denom?: string;
  /** old_minter, the actual minter */
  old_minter?: string;
  /** new_minter, the new fan token minter */
  new_minter?: string;
}
export interface MsgSetMinterAminoMsg {
  type: "/bitsong.fantoken.MsgSetMinter";
  value: MsgSetMinterAmino;
}
/** MsgSetMinter defines a message for changing the fan token minter address */
export interface MsgSetMinterSDKType {
  denom: string;
  old_minter: string;
  new_minter: string;
}
/** MsgSetMinterResponse defines the MsgTransferAuthority response type */
export interface MsgSetMinterResponse {}
export interface MsgSetMinterResponseProtoMsg {
  typeUrl: "/bitsong.fantoken.MsgSetMinterResponse";
  value: Uint8Array;
}
/** MsgSetMinterResponse defines the MsgTransferAuthority response type */
export interface MsgSetMinterResponseAmino {}
export interface MsgSetMinterResponseAminoMsg {
  type: "/bitsong.fantoken.MsgSetMinterResponse";
  value: MsgSetMinterResponseAmino;
}
/** MsgSetMinterResponse defines the MsgTransferAuthority response type */
export interface MsgSetMinterResponseSDKType {}
/** MsgSetAuthority defines a message for changing the fan token minter address */
export interface MsgSetAuthority {
  /** denom the fan token denom */
  denom: string;
  /** old_authority, the actual metadata authority */
  oldAuthority: string;
  /** new_authority, the new fan token metadata authority */
  newAuthority: string;
}
export interface MsgSetAuthorityProtoMsg {
  typeUrl: "/bitsong.fantoken.MsgSetAuthority";
  value: Uint8Array;
}
/** MsgSetAuthority defines a message for changing the fan token minter address */
export interface MsgSetAuthorityAmino {
  /** denom the fan token denom */
  denom?: string;
  /** old_authority, the actual metadata authority */
  old_authority?: string;
  /** new_authority, the new fan token metadata authority */
  new_authority?: string;
}
export interface MsgSetAuthorityAminoMsg {
  type: "/bitsong.fantoken.MsgSetAuthority";
  value: MsgSetAuthorityAmino;
}
/** MsgSetAuthority defines a message for changing the fan token minter address */
export interface MsgSetAuthoritySDKType {
  denom: string;
  old_authority: string;
  new_authority: string;
}
/** MsgSetAuthorityResponse defines the MsgTransferAuthority response type */
export interface MsgSetAuthorityResponse {}
export interface MsgSetAuthorityResponseProtoMsg {
  typeUrl: "/bitsong.fantoken.MsgSetAuthorityResponse";
  value: Uint8Array;
}
/** MsgSetAuthorityResponse defines the MsgTransferAuthority response type */
export interface MsgSetAuthorityResponseAmino {}
export interface MsgSetAuthorityResponseAminoMsg {
  type: "/bitsong.fantoken.MsgSetAuthorityResponse";
  value: MsgSetAuthorityResponseAmino;
}
/** MsgSetAuthorityResponse defines the MsgTransferAuthority response type */
export interface MsgSetAuthorityResponseSDKType {}
export interface MsgSetUri {
  authority: string;
  denom: string;
  uri: string;
}
export interface MsgSetUriProtoMsg {
  typeUrl: "/bitsong.fantoken.MsgSetUri";
  value: Uint8Array;
}
export interface MsgSetUriAmino {
  authority?: string;
  denom?: string;
  uri?: string;
}
export interface MsgSetUriAminoMsg {
  type: "/bitsong.fantoken.MsgSetUri";
  value: MsgSetUriAmino;
}
export interface MsgSetUriSDKType {
  authority: string;
  denom: string;
  uri: string;
}
export interface MsgSetUriResponse {}
export interface MsgSetUriResponseProtoMsg {
  typeUrl: "/bitsong.fantoken.MsgSetUriResponse";
  value: Uint8Array;
}
export interface MsgSetUriResponseAmino {}
export interface MsgSetUriResponseAminoMsg {
  type: "/bitsong.fantoken.MsgSetUriResponse";
  value: MsgSetUriResponseAmino;
}
export interface MsgSetUriResponseSDKType {}
function createBaseMsgIssue(): MsgIssue {
  return {
    symbol: "",
    name: "",
    maxSupply: "",
    authority: "",
    minter: "",
    uri: ""
  };
}
export const MsgIssue = {
  typeUrl: "/bitsong.fantoken.MsgIssue",
  encode(message: MsgIssue, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.symbol !== "") {
      writer.uint32(10).string(message.symbol);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.maxSupply !== "") {
      writer.uint32(26).string(message.maxSupply);
    }
    if (message.authority !== "") {
      writer.uint32(34).string(message.authority);
    }
    if (message.minter !== "") {
      writer.uint32(42).string(message.minter);
    }
    if (message.uri !== "") {
      writer.uint32(50).string(message.uri);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgIssue {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIssue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.symbol = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.maxSupply = reader.string();
          break;
        case 4:
          message.authority = reader.string();
          break;
        case 5:
          message.minter = reader.string();
          break;
        case 6:
          message.uri = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgIssue>): MsgIssue {
    const message = createBaseMsgIssue();
    message.symbol = object.symbol ?? "";
    message.name = object.name ?? "";
    message.maxSupply = object.maxSupply ?? "";
    message.authority = object.authority ?? "";
    message.minter = object.minter ?? "";
    message.uri = object.uri ?? "";
    return message;
  },
  fromAmino(object: MsgIssueAmino): MsgIssue {
    const message = createBaseMsgIssue();
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = object.symbol;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.max_supply !== undefined && object.max_supply !== null) {
      message.maxSupply = object.max_supply;
    }
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.minter !== undefined && object.minter !== null) {
      message.minter = object.minter;
    }
    if (object.uri !== undefined && object.uri !== null) {
      message.uri = object.uri;
    }
    return message;
  },
  toAmino(message: MsgIssue, useInterfaces: boolean = false): MsgIssueAmino {
    const obj: any = {};
    obj.symbol = message.symbol === "" ? undefined : message.symbol;
    obj.name = message.name === "" ? undefined : message.name;
    obj.max_supply = message.maxSupply === "" ? undefined : message.maxSupply;
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.minter = message.minter === "" ? undefined : message.minter;
    obj.uri = message.uri === "" ? undefined : message.uri;
    return obj;
  },
  fromAminoMsg(object: MsgIssueAminoMsg): MsgIssue {
    return MsgIssue.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgIssueProtoMsg, useInterfaces: boolean = false): MsgIssue {
    return MsgIssue.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgIssue): Uint8Array {
    return MsgIssue.encode(message).finish();
  },
  toProtoMsg(message: MsgIssue): MsgIssueProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.MsgIssue",
      value: MsgIssue.encode(message).finish()
    };
  }
};
function createBaseMsgIssueResponse(): MsgIssueResponse {
  return {};
}
export const MsgIssueResponse = {
  typeUrl: "/bitsong.fantoken.MsgIssueResponse",
  encode(_: MsgIssueResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgIssueResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgIssueResponse();
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
  fromPartial(_: Partial<MsgIssueResponse>): MsgIssueResponse {
    const message = createBaseMsgIssueResponse();
    return message;
  },
  fromAmino(_: MsgIssueResponseAmino): MsgIssueResponse {
    const message = createBaseMsgIssueResponse();
    return message;
  },
  toAmino(_: MsgIssueResponse, useInterfaces: boolean = false): MsgIssueResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgIssueResponseAminoMsg): MsgIssueResponse {
    return MsgIssueResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgIssueResponseProtoMsg, useInterfaces: boolean = false): MsgIssueResponse {
    return MsgIssueResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgIssueResponse): Uint8Array {
    return MsgIssueResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgIssueResponse): MsgIssueResponseProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.MsgIssueResponse",
      value: MsgIssueResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDisableMint(): MsgDisableMint {
  return {
    denom: "",
    minter: ""
  };
}
export const MsgDisableMint = {
  typeUrl: "/bitsong.fantoken.MsgDisableMint",
  encode(message: MsgDisableMint, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.minter !== "") {
      writer.uint32(18).string(message.minter);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDisableMint {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDisableMint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.minter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDisableMint>): MsgDisableMint {
    const message = createBaseMsgDisableMint();
    message.denom = object.denom ?? "";
    message.minter = object.minter ?? "";
    return message;
  },
  fromAmino(object: MsgDisableMintAmino): MsgDisableMint {
    const message = createBaseMsgDisableMint();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.minter !== undefined && object.minter !== null) {
      message.minter = object.minter;
    }
    return message;
  },
  toAmino(message: MsgDisableMint, useInterfaces: boolean = false): MsgDisableMintAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.minter = message.minter === "" ? undefined : message.minter;
    return obj;
  },
  fromAminoMsg(object: MsgDisableMintAminoMsg): MsgDisableMint {
    return MsgDisableMint.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDisableMintProtoMsg, useInterfaces: boolean = false): MsgDisableMint {
    return MsgDisableMint.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDisableMint): Uint8Array {
    return MsgDisableMint.encode(message).finish();
  },
  toProtoMsg(message: MsgDisableMint): MsgDisableMintProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.MsgDisableMint",
      value: MsgDisableMint.encode(message).finish()
    };
  }
};
function createBaseMsgDisableMintResponse(): MsgDisableMintResponse {
  return {};
}
export const MsgDisableMintResponse = {
  typeUrl: "/bitsong.fantoken.MsgDisableMintResponse",
  encode(_: MsgDisableMintResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDisableMintResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDisableMintResponse();
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
  fromPartial(_: Partial<MsgDisableMintResponse>): MsgDisableMintResponse {
    const message = createBaseMsgDisableMintResponse();
    return message;
  },
  fromAmino(_: MsgDisableMintResponseAmino): MsgDisableMintResponse {
    const message = createBaseMsgDisableMintResponse();
    return message;
  },
  toAmino(_: MsgDisableMintResponse, useInterfaces: boolean = false): MsgDisableMintResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDisableMintResponseAminoMsg): MsgDisableMintResponse {
    return MsgDisableMintResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDisableMintResponseProtoMsg, useInterfaces: boolean = false): MsgDisableMintResponse {
    return MsgDisableMintResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDisableMintResponse): Uint8Array {
    return MsgDisableMintResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDisableMintResponse): MsgDisableMintResponseProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.MsgDisableMintResponse",
      value: MsgDisableMintResponse.encode(message).finish()
    };
  }
};
function createBaseMsgMint(): MsgMint {
  return {
    recipient: "",
    coin: Coin.fromPartial({}),
    minter: ""
  };
}
export const MsgMint = {
  typeUrl: "/bitsong.fantoken.MsgMint",
  encode(message: MsgMint, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.recipient !== "") {
      writer.uint32(10).string(message.recipient);
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(18).fork()).ldelim();
    }
    if (message.minter !== "") {
      writer.uint32(26).string(message.minter);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgMint {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recipient = reader.string();
          break;
        case 2:
          message.coin = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.minter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgMint>): MsgMint {
    const message = createBaseMsgMint();
    message.recipient = object.recipient ?? "";
    message.coin = object.coin !== undefined && object.coin !== null ? Coin.fromPartial(object.coin) : undefined;
    message.minter = object.minter ?? "";
    return message;
  },
  fromAmino(object: MsgMintAmino): MsgMint {
    const message = createBaseMsgMint();
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = object.recipient;
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = Coin.fromAmino(object.coin);
    }
    if (object.minter !== undefined && object.minter !== null) {
      message.minter = object.minter;
    }
    return message;
  },
  toAmino(message: MsgMint, useInterfaces: boolean = false): MsgMintAmino {
    const obj: any = {};
    obj.recipient = message.recipient === "" ? undefined : message.recipient;
    obj.coin = message.coin ? Coin.toAmino(message.coin, useInterfaces) : undefined;
    obj.minter = message.minter === "" ? undefined : message.minter;
    return obj;
  },
  fromAminoMsg(object: MsgMintAminoMsg): MsgMint {
    return MsgMint.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgMintProtoMsg, useInterfaces: boolean = false): MsgMint {
    return MsgMint.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgMint): Uint8Array {
    return MsgMint.encode(message).finish();
  },
  toProtoMsg(message: MsgMint): MsgMintProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.MsgMint",
      value: MsgMint.encode(message).finish()
    };
  }
};
function createBaseMsgMintResponse(): MsgMintResponse {
  return {};
}
export const MsgMintResponse = {
  typeUrl: "/bitsong.fantoken.MsgMintResponse",
  encode(_: MsgMintResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgMintResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintResponse();
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
  fromPartial(_: Partial<MsgMintResponse>): MsgMintResponse {
    const message = createBaseMsgMintResponse();
    return message;
  },
  fromAmino(_: MsgMintResponseAmino): MsgMintResponse {
    const message = createBaseMsgMintResponse();
    return message;
  },
  toAmino(_: MsgMintResponse, useInterfaces: boolean = false): MsgMintResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgMintResponseAminoMsg): MsgMintResponse {
    return MsgMintResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgMintResponseProtoMsg, useInterfaces: boolean = false): MsgMintResponse {
    return MsgMintResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgMintResponse): Uint8Array {
    return MsgMintResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgMintResponse): MsgMintResponseProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.MsgMintResponse",
      value: MsgMintResponse.encode(message).finish()
    };
  }
};
function createBaseMsgBurn(): MsgBurn {
  return {
    coin: Coin.fromPartial({}),
    sender: ""
  };
}
export const MsgBurn = {
  typeUrl: "/bitsong.fantoken.MsgBurn",
  encode(message: MsgBurn, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(10).fork()).ldelim();
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgBurn {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coin = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgBurn>): MsgBurn {
    const message = createBaseMsgBurn();
    message.coin = object.coin !== undefined && object.coin !== null ? Coin.fromPartial(object.coin) : undefined;
    message.sender = object.sender ?? "";
    return message;
  },
  fromAmino(object: MsgBurnAmino): MsgBurn {
    const message = createBaseMsgBurn();
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = Coin.fromAmino(object.coin);
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    return message;
  },
  toAmino(message: MsgBurn, useInterfaces: boolean = false): MsgBurnAmino {
    const obj: any = {};
    obj.coin = message.coin ? Coin.toAmino(message.coin, useInterfaces) : undefined;
    obj.sender = message.sender === "" ? undefined : message.sender;
    return obj;
  },
  fromAminoMsg(object: MsgBurnAminoMsg): MsgBurn {
    return MsgBurn.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgBurnProtoMsg, useInterfaces: boolean = false): MsgBurn {
    return MsgBurn.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgBurn): Uint8Array {
    return MsgBurn.encode(message).finish();
  },
  toProtoMsg(message: MsgBurn): MsgBurnProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.MsgBurn",
      value: MsgBurn.encode(message).finish()
    };
  }
};
function createBaseMsgBurnResponse(): MsgBurnResponse {
  return {};
}
export const MsgBurnResponse = {
  typeUrl: "/bitsong.fantoken.MsgBurnResponse",
  encode(_: MsgBurnResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgBurnResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnResponse();
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
  fromPartial(_: Partial<MsgBurnResponse>): MsgBurnResponse {
    const message = createBaseMsgBurnResponse();
    return message;
  },
  fromAmino(_: MsgBurnResponseAmino): MsgBurnResponse {
    const message = createBaseMsgBurnResponse();
    return message;
  },
  toAmino(_: MsgBurnResponse, useInterfaces: boolean = false): MsgBurnResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgBurnResponseAminoMsg): MsgBurnResponse {
    return MsgBurnResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgBurnResponseProtoMsg, useInterfaces: boolean = false): MsgBurnResponse {
    return MsgBurnResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgBurnResponse): Uint8Array {
    return MsgBurnResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgBurnResponse): MsgBurnResponseProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.MsgBurnResponse",
      value: MsgBurnResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetMinter(): MsgSetMinter {
  return {
    denom: "",
    oldMinter: "",
    newMinter: ""
  };
}
export const MsgSetMinter = {
  typeUrl: "/bitsong.fantoken.MsgSetMinter",
  encode(message: MsgSetMinter, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.oldMinter !== "") {
      writer.uint32(18).string(message.oldMinter);
    }
    if (message.newMinter !== "") {
      writer.uint32(26).string(message.newMinter);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetMinter {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetMinter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.oldMinter = reader.string();
          break;
        case 3:
          message.newMinter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetMinter>): MsgSetMinter {
    const message = createBaseMsgSetMinter();
    message.denom = object.denom ?? "";
    message.oldMinter = object.oldMinter ?? "";
    message.newMinter = object.newMinter ?? "";
    return message;
  },
  fromAmino(object: MsgSetMinterAmino): MsgSetMinter {
    const message = createBaseMsgSetMinter();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.old_minter !== undefined && object.old_minter !== null) {
      message.oldMinter = object.old_minter;
    }
    if (object.new_minter !== undefined && object.new_minter !== null) {
      message.newMinter = object.new_minter;
    }
    return message;
  },
  toAmino(message: MsgSetMinter, useInterfaces: boolean = false): MsgSetMinterAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.old_minter = message.oldMinter === "" ? undefined : message.oldMinter;
    obj.new_minter = message.newMinter === "" ? undefined : message.newMinter;
    return obj;
  },
  fromAminoMsg(object: MsgSetMinterAminoMsg): MsgSetMinter {
    return MsgSetMinter.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetMinterProtoMsg, useInterfaces: boolean = false): MsgSetMinter {
    return MsgSetMinter.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetMinter): Uint8Array {
    return MsgSetMinter.encode(message).finish();
  },
  toProtoMsg(message: MsgSetMinter): MsgSetMinterProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.MsgSetMinter",
      value: MsgSetMinter.encode(message).finish()
    };
  }
};
function createBaseMsgSetMinterResponse(): MsgSetMinterResponse {
  return {};
}
export const MsgSetMinterResponse = {
  typeUrl: "/bitsong.fantoken.MsgSetMinterResponse",
  encode(_: MsgSetMinterResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetMinterResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetMinterResponse();
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
  fromPartial(_: Partial<MsgSetMinterResponse>): MsgSetMinterResponse {
    const message = createBaseMsgSetMinterResponse();
    return message;
  },
  fromAmino(_: MsgSetMinterResponseAmino): MsgSetMinterResponse {
    const message = createBaseMsgSetMinterResponse();
    return message;
  },
  toAmino(_: MsgSetMinterResponse, useInterfaces: boolean = false): MsgSetMinterResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetMinterResponseAminoMsg): MsgSetMinterResponse {
    return MsgSetMinterResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetMinterResponseProtoMsg, useInterfaces: boolean = false): MsgSetMinterResponse {
    return MsgSetMinterResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetMinterResponse): Uint8Array {
    return MsgSetMinterResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetMinterResponse): MsgSetMinterResponseProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.MsgSetMinterResponse",
      value: MsgSetMinterResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetAuthority(): MsgSetAuthority {
  return {
    denom: "",
    oldAuthority: "",
    newAuthority: ""
  };
}
export const MsgSetAuthority = {
  typeUrl: "/bitsong.fantoken.MsgSetAuthority",
  encode(message: MsgSetAuthority, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.oldAuthority !== "") {
      writer.uint32(18).string(message.oldAuthority);
    }
    if (message.newAuthority !== "") {
      writer.uint32(26).string(message.newAuthority);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetAuthority {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetAuthority();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.oldAuthority = reader.string();
          break;
        case 3:
          message.newAuthority = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetAuthority>): MsgSetAuthority {
    const message = createBaseMsgSetAuthority();
    message.denom = object.denom ?? "";
    message.oldAuthority = object.oldAuthority ?? "";
    message.newAuthority = object.newAuthority ?? "";
    return message;
  },
  fromAmino(object: MsgSetAuthorityAmino): MsgSetAuthority {
    const message = createBaseMsgSetAuthority();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.old_authority !== undefined && object.old_authority !== null) {
      message.oldAuthority = object.old_authority;
    }
    if (object.new_authority !== undefined && object.new_authority !== null) {
      message.newAuthority = object.new_authority;
    }
    return message;
  },
  toAmino(message: MsgSetAuthority, useInterfaces: boolean = false): MsgSetAuthorityAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.old_authority = message.oldAuthority === "" ? undefined : message.oldAuthority;
    obj.new_authority = message.newAuthority === "" ? undefined : message.newAuthority;
    return obj;
  },
  fromAminoMsg(object: MsgSetAuthorityAminoMsg): MsgSetAuthority {
    return MsgSetAuthority.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetAuthorityProtoMsg, useInterfaces: boolean = false): MsgSetAuthority {
    return MsgSetAuthority.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetAuthority): Uint8Array {
    return MsgSetAuthority.encode(message).finish();
  },
  toProtoMsg(message: MsgSetAuthority): MsgSetAuthorityProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.MsgSetAuthority",
      value: MsgSetAuthority.encode(message).finish()
    };
  }
};
function createBaseMsgSetAuthorityResponse(): MsgSetAuthorityResponse {
  return {};
}
export const MsgSetAuthorityResponse = {
  typeUrl: "/bitsong.fantoken.MsgSetAuthorityResponse",
  encode(_: MsgSetAuthorityResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetAuthorityResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetAuthorityResponse();
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
  fromPartial(_: Partial<MsgSetAuthorityResponse>): MsgSetAuthorityResponse {
    const message = createBaseMsgSetAuthorityResponse();
    return message;
  },
  fromAmino(_: MsgSetAuthorityResponseAmino): MsgSetAuthorityResponse {
    const message = createBaseMsgSetAuthorityResponse();
    return message;
  },
  toAmino(_: MsgSetAuthorityResponse, useInterfaces: boolean = false): MsgSetAuthorityResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetAuthorityResponseAminoMsg): MsgSetAuthorityResponse {
    return MsgSetAuthorityResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetAuthorityResponseProtoMsg, useInterfaces: boolean = false): MsgSetAuthorityResponse {
    return MsgSetAuthorityResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetAuthorityResponse): Uint8Array {
    return MsgSetAuthorityResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetAuthorityResponse): MsgSetAuthorityResponseProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.MsgSetAuthorityResponse",
      value: MsgSetAuthorityResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetUri(): MsgSetUri {
  return {
    authority: "",
    denom: "",
    uri: ""
  };
}
export const MsgSetUri = {
  typeUrl: "/bitsong.fantoken.MsgSetUri",
  encode(message: MsgSetUri, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.uri !== "") {
      writer.uint32(26).string(message.uri);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetUri {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetUri();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.uri = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetUri>): MsgSetUri {
    const message = createBaseMsgSetUri();
    message.authority = object.authority ?? "";
    message.denom = object.denom ?? "";
    message.uri = object.uri ?? "";
    return message;
  },
  fromAmino(object: MsgSetUriAmino): MsgSetUri {
    const message = createBaseMsgSetUri();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.uri !== undefined && object.uri !== null) {
      message.uri = object.uri;
    }
    return message;
  },
  toAmino(message: MsgSetUri, useInterfaces: boolean = false): MsgSetUriAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.uri = message.uri === "" ? undefined : message.uri;
    return obj;
  },
  fromAminoMsg(object: MsgSetUriAminoMsg): MsgSetUri {
    return MsgSetUri.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetUriProtoMsg, useInterfaces: boolean = false): MsgSetUri {
    return MsgSetUri.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetUri): Uint8Array {
    return MsgSetUri.encode(message).finish();
  },
  toProtoMsg(message: MsgSetUri): MsgSetUriProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.MsgSetUri",
      value: MsgSetUri.encode(message).finish()
    };
  }
};
function createBaseMsgSetUriResponse(): MsgSetUriResponse {
  return {};
}
export const MsgSetUriResponse = {
  typeUrl: "/bitsong.fantoken.MsgSetUriResponse",
  encode(_: MsgSetUriResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetUriResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetUriResponse();
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
  fromPartial(_: Partial<MsgSetUriResponse>): MsgSetUriResponse {
    const message = createBaseMsgSetUriResponse();
    return message;
  },
  fromAmino(_: MsgSetUriResponseAmino): MsgSetUriResponse {
    const message = createBaseMsgSetUriResponse();
    return message;
  },
  toAmino(_: MsgSetUriResponse, useInterfaces: boolean = false): MsgSetUriResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetUriResponseAminoMsg): MsgSetUriResponse {
    return MsgSetUriResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetUriResponseProtoMsg, useInterfaces: boolean = false): MsgSetUriResponse {
    return MsgSetUriResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetUriResponse): Uint8Array {
    return MsgSetUriResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetUriResponse): MsgSetUriResponseProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.MsgSetUriResponse",
      value: MsgSetUriResponse.encode(message).finish()
    };
  }
};