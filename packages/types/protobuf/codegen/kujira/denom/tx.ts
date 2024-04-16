//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * MsgCreateDenom is the sdk.Msg type for allowing an account to create
 * a new denom.  It requires a sender address and a unique nonce
 * (to allow accounts to create multiple denoms)
 */
export interface MsgCreateDenom {
  sender: string;
  nonce: string;
}
export interface MsgCreateDenomProtoMsg {
  typeUrl: "/kujira.denom.MsgCreateDenom";
  value: Uint8Array;
}
/**
 * MsgCreateDenom is the sdk.Msg type for allowing an account to create
 * a new denom.  It requires a sender address and a unique nonce
 * (to allow accounts to create multiple denoms)
 */
export interface MsgCreateDenomAmino {
  sender?: string;
  nonce?: string;
}
export interface MsgCreateDenomAminoMsg {
  type: "/kujira.denom.MsgCreateDenom";
  value: MsgCreateDenomAmino;
}
/**
 * MsgCreateDenom is the sdk.Msg type for allowing an account to create
 * a new denom.  It requires a sender address and a unique nonce
 * (to allow accounts to create multiple denoms)
 */
export interface MsgCreateDenomSDKType {
  sender: string;
  nonce: string;
}
/**
 * MsgCreateDenomResponse is the return value of MsgCreateDenom
 * It returns the full string of the newly created denom
 */
export interface MsgCreateDenomResponse {
  newTokenDenom: string;
}
export interface MsgCreateDenomResponseProtoMsg {
  typeUrl: "/kujira.denom.MsgCreateDenomResponse";
  value: Uint8Array;
}
/**
 * MsgCreateDenomResponse is the return value of MsgCreateDenom
 * It returns the full string of the newly created denom
 */
export interface MsgCreateDenomResponseAmino {
  new_token_denom?: string;
}
export interface MsgCreateDenomResponseAminoMsg {
  type: "/kujira.denom.MsgCreateDenomResponse";
  value: MsgCreateDenomResponseAmino;
}
/**
 * MsgCreateDenomResponse is the return value of MsgCreateDenom
 * It returns the full string of the newly created denom
 */
export interface MsgCreateDenomResponseSDKType {
  new_token_denom: string;
}
/**
 * MsgMint is the sdk.Msg type for allowing an admin account to mint
 * more of a token.
 */
export interface MsgMint {
  sender: string;
  amount: Coin | undefined;
  recipient: string;
}
export interface MsgMintProtoMsg {
  typeUrl: "/kujira.denom.MsgMint";
  value: Uint8Array;
}
/**
 * MsgMint is the sdk.Msg type for allowing an admin account to mint
 * more of a token.
 */
export interface MsgMintAmino {
  sender?: string;
  amount?: CoinAmino | undefined;
  recipient?: string;
}
export interface MsgMintAminoMsg {
  type: "/kujira.denom.MsgMint";
  value: MsgMintAmino;
}
/**
 * MsgMint is the sdk.Msg type for allowing an admin account to mint
 * more of a token.
 */
export interface MsgMintSDKType {
  sender: string;
  amount: CoinSDKType | undefined;
  recipient: string;
}
export interface MsgMintResponse {}
export interface MsgMintResponseProtoMsg {
  typeUrl: "/kujira.denom.MsgMintResponse";
  value: Uint8Array;
}
export interface MsgMintResponseAmino {}
export interface MsgMintResponseAminoMsg {
  type: "/kujira.denom.MsgMintResponse";
  value: MsgMintResponseAmino;
}
export interface MsgMintResponseSDKType {}
/**
 * MsgBurn is the sdk.Msg type for allowing an admin account to burn
 * a token.  For now, we only support burning from the sender account.
 */
export interface MsgBurn {
  sender: string;
  amount: Coin | undefined;
}
export interface MsgBurnProtoMsg {
  typeUrl: "/kujira.denom.MsgBurn";
  value: Uint8Array;
}
/**
 * MsgBurn is the sdk.Msg type for allowing an admin account to burn
 * a token.  For now, we only support burning from the sender account.
 */
export interface MsgBurnAmino {
  sender?: string;
  amount?: CoinAmino | undefined;
}
export interface MsgBurnAminoMsg {
  type: "/kujira.denom.MsgBurn";
  value: MsgBurnAmino;
}
/**
 * MsgBurn is the sdk.Msg type for allowing an admin account to burn
 * a token.  For now, we only support burning from the sender account.
 */
export interface MsgBurnSDKType {
  sender: string;
  amount: CoinSDKType | undefined;
}
export interface MsgBurnResponse {}
export interface MsgBurnResponseProtoMsg {
  typeUrl: "/kujira.denom.MsgBurnResponse";
  value: Uint8Array;
}
export interface MsgBurnResponseAmino {}
export interface MsgBurnResponseAminoMsg {
  type: "/kujira.denom.MsgBurnResponse";
  value: MsgBurnResponseAmino;
}
export interface MsgBurnResponseSDKType {}
/**
 * MsgChangeAdmin is the sdk.Msg type for allowing an admin account to reassign
 * adminship of a denom to a new account
 */
export interface MsgChangeAdmin {
  sender: string;
  denom: string;
  newAdmin: string;
}
export interface MsgChangeAdminProtoMsg {
  typeUrl: "/kujira.denom.MsgChangeAdmin";
  value: Uint8Array;
}
/**
 * MsgChangeAdmin is the sdk.Msg type for allowing an admin account to reassign
 * adminship of a denom to a new account
 */
export interface MsgChangeAdminAmino {
  sender?: string;
  denom?: string;
  newAdmin?: string;
}
export interface MsgChangeAdminAminoMsg {
  type: "/kujira.denom.MsgChangeAdmin";
  value: MsgChangeAdminAmino;
}
/**
 * MsgChangeAdmin is the sdk.Msg type for allowing an admin account to reassign
 * adminship of a denom to a new account
 */
export interface MsgChangeAdminSDKType {
  sender: string;
  denom: string;
  newAdmin: string;
}
export interface MsgChangeAdminResponse {}
export interface MsgChangeAdminResponseProtoMsg {
  typeUrl: "/kujira.denom.MsgChangeAdminResponse";
  value: Uint8Array;
}
export interface MsgChangeAdminResponseAmino {}
export interface MsgChangeAdminResponseAminoMsg {
  type: "/kujira.denom.MsgChangeAdminResponse";
  value: MsgChangeAdminResponseAmino;
}
export interface MsgChangeAdminResponseSDKType {}
function createBaseMsgCreateDenom(): MsgCreateDenom {
  return {
    sender: "",
    nonce: ""
  };
}
export const MsgCreateDenom = {
  typeUrl: "/kujira.denom.MsgCreateDenom",
  encode(message: MsgCreateDenom, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.nonce !== "") {
      writer.uint32(18).string(message.nonce);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateDenom {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.nonce = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateDenom>): MsgCreateDenom {
    const message = createBaseMsgCreateDenom();
    message.sender = object.sender ?? "";
    message.nonce = object.nonce ?? "";
    return message;
  },
  fromAmino(object: MsgCreateDenomAmino): MsgCreateDenom {
    const message = createBaseMsgCreateDenom();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.nonce !== undefined && object.nonce !== null) {
      message.nonce = object.nonce;
    }
    return message;
  },
  toAmino(message: MsgCreateDenom, useInterfaces: boolean = false): MsgCreateDenomAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.nonce = message.nonce;
    return obj;
  },
  fromAminoMsg(object: MsgCreateDenomAminoMsg): MsgCreateDenom {
    return MsgCreateDenom.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateDenomProtoMsg, useInterfaces: boolean = false): MsgCreateDenom {
    return MsgCreateDenom.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateDenom): Uint8Array {
    return MsgCreateDenom.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateDenom): MsgCreateDenomProtoMsg {
    return {
      typeUrl: "/kujira.denom.MsgCreateDenom",
      value: MsgCreateDenom.encode(message).finish()
    };
  }
};
function createBaseMsgCreateDenomResponse(): MsgCreateDenomResponse {
  return {
    newTokenDenom: ""
  };
}
export const MsgCreateDenomResponse = {
  typeUrl: "/kujira.denom.MsgCreateDenomResponse",
  encode(message: MsgCreateDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.newTokenDenom !== "") {
      writer.uint32(10).string(message.newTokenDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.newTokenDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateDenomResponse>): MsgCreateDenomResponse {
    const message = createBaseMsgCreateDenomResponse();
    message.newTokenDenom = object.newTokenDenom ?? "";
    return message;
  },
  fromAmino(object: MsgCreateDenomResponseAmino): MsgCreateDenomResponse {
    const message = createBaseMsgCreateDenomResponse();
    if (object.new_token_denom !== undefined && object.new_token_denom !== null) {
      message.newTokenDenom = object.new_token_denom;
    }
    return message;
  },
  toAmino(message: MsgCreateDenomResponse, useInterfaces: boolean = false): MsgCreateDenomResponseAmino {
    const obj: any = {};
    obj.new_token_denom = message.newTokenDenom;
    return obj;
  },
  fromAminoMsg(object: MsgCreateDenomResponseAminoMsg): MsgCreateDenomResponse {
    return MsgCreateDenomResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateDenomResponseProtoMsg, useInterfaces: boolean = false): MsgCreateDenomResponse {
    return MsgCreateDenomResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateDenomResponse): Uint8Array {
    return MsgCreateDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateDenomResponse): MsgCreateDenomResponseProtoMsg {
    return {
      typeUrl: "/kujira.denom.MsgCreateDenomResponse",
      value: MsgCreateDenomResponse.encode(message).finish()
    };
  }
};
function createBaseMsgMint(): MsgMint {
  return {
    sender: "",
    amount: Coin.fromPartial({}),
    recipient: ""
  };
}
export const MsgMint = {
  typeUrl: "/kujira.denom.MsgMint",
  encode(message: MsgMint, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.recipient !== "") {
      writer.uint32(26).string(message.recipient);
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
          message.sender = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.recipient = reader.string();
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
    message.sender = object.sender ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.recipient = object.recipient ?? "";
    return message;
  },
  fromAmino(object: MsgMintAmino): MsgMint {
    const message = createBaseMsgMint();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = object.recipient;
    }
    return message;
  },
  toAmino(message: MsgMint, useInterfaces: boolean = false): MsgMintAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    obj.recipient = message.recipient;
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
      typeUrl: "/kujira.denom.MsgMint",
      value: MsgMint.encode(message).finish()
    };
  }
};
function createBaseMsgMintResponse(): MsgMintResponse {
  return {};
}
export const MsgMintResponse = {
  typeUrl: "/kujira.denom.MsgMintResponse",
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
      typeUrl: "/kujira.denom.MsgMintResponse",
      value: MsgMintResponse.encode(message).finish()
    };
  }
};
function createBaseMsgBurn(): MsgBurn {
  return {
    sender: "",
    amount: Coin.fromPartial({})
  };
}
export const MsgBurn = {
  typeUrl: "/kujira.denom.MsgBurn",
  encode(message: MsgBurn, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
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
          message.sender = reader.string();
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
  fromPartial(object: Partial<MsgBurn>): MsgBurn {
    const message = createBaseMsgBurn();
    message.sender = object.sender ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: MsgBurnAmino): MsgBurn {
    const message = createBaseMsgBurn();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: MsgBurn, useInterfaces: boolean = false): MsgBurnAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
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
      typeUrl: "/kujira.denom.MsgBurn",
      value: MsgBurn.encode(message).finish()
    };
  }
};
function createBaseMsgBurnResponse(): MsgBurnResponse {
  return {};
}
export const MsgBurnResponse = {
  typeUrl: "/kujira.denom.MsgBurnResponse",
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
      typeUrl: "/kujira.denom.MsgBurnResponse",
      value: MsgBurnResponse.encode(message).finish()
    };
  }
};
function createBaseMsgChangeAdmin(): MsgChangeAdmin {
  return {
    sender: "",
    denom: "",
    newAdmin: ""
  };
}
export const MsgChangeAdmin = {
  typeUrl: "/kujira.denom.MsgChangeAdmin",
  encode(message: MsgChangeAdmin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.newAdmin !== "") {
      writer.uint32(26).string(message.newAdmin);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgChangeAdmin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChangeAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.newAdmin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgChangeAdmin>): MsgChangeAdmin {
    const message = createBaseMsgChangeAdmin();
    message.sender = object.sender ?? "";
    message.denom = object.denom ?? "";
    message.newAdmin = object.newAdmin ?? "";
    return message;
  },
  fromAmino(object: MsgChangeAdminAmino): MsgChangeAdmin {
    const message = createBaseMsgChangeAdmin();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.newAdmin !== undefined && object.newAdmin !== null) {
      message.newAdmin = object.newAdmin;
    }
    return message;
  },
  toAmino(message: MsgChangeAdmin, useInterfaces: boolean = false): MsgChangeAdminAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.denom = message.denom;
    obj.newAdmin = message.newAdmin;
    return obj;
  },
  fromAminoMsg(object: MsgChangeAdminAminoMsg): MsgChangeAdmin {
    return MsgChangeAdmin.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgChangeAdminProtoMsg, useInterfaces: boolean = false): MsgChangeAdmin {
    return MsgChangeAdmin.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgChangeAdmin): Uint8Array {
    return MsgChangeAdmin.encode(message).finish();
  },
  toProtoMsg(message: MsgChangeAdmin): MsgChangeAdminProtoMsg {
    return {
      typeUrl: "/kujira.denom.MsgChangeAdmin",
      value: MsgChangeAdmin.encode(message).finish()
    };
  }
};
function createBaseMsgChangeAdminResponse(): MsgChangeAdminResponse {
  return {};
}
export const MsgChangeAdminResponse = {
  typeUrl: "/kujira.denom.MsgChangeAdminResponse",
  encode(_: MsgChangeAdminResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgChangeAdminResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChangeAdminResponse();
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
  fromPartial(_: Partial<MsgChangeAdminResponse>): MsgChangeAdminResponse {
    const message = createBaseMsgChangeAdminResponse();
    return message;
  },
  fromAmino(_: MsgChangeAdminResponseAmino): MsgChangeAdminResponse {
    const message = createBaseMsgChangeAdminResponse();
    return message;
  },
  toAmino(_: MsgChangeAdminResponse, useInterfaces: boolean = false): MsgChangeAdminResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgChangeAdminResponseAminoMsg): MsgChangeAdminResponse {
    return MsgChangeAdminResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgChangeAdminResponseProtoMsg, useInterfaces: boolean = false): MsgChangeAdminResponse {
    return MsgChangeAdminResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgChangeAdminResponse): Uint8Array {
    return MsgChangeAdminResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgChangeAdminResponse): MsgChangeAdminResponseProtoMsg {
    return {
      typeUrl: "/kujira.denom.MsgChangeAdminResponse",
      value: MsgChangeAdminResponse.encode(message).finish()
    };
  }
};