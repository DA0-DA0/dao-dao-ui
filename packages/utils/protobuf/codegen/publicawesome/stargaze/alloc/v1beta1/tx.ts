//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting
 * account.
 */
export interface MsgCreateVestingAccount {
  fromAddress: string;
  toAddress: string;
  amount: Coin[];
  startTime: bigint;
  endTime: bigint;
  delayed: boolean;
}
export interface MsgCreateVestingAccountProtoMsg {
  typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccount";
  value: Uint8Array;
}
/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting
 * account.
 */
export interface MsgCreateVestingAccountAmino {
  from_address?: string;
  to_address?: string;
  amount?: CoinAmino[];
  start_time?: string;
  end_time?: string;
  delayed?: boolean;
}
export interface MsgCreateVestingAccountAminoMsg {
  type: "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccount";
  value: MsgCreateVestingAccountAmino;
}
/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting
 * account.
 */
export interface MsgCreateVestingAccountSDKType {
  from_address: string;
  to_address: string;
  amount: CoinSDKType[];
  start_time: bigint;
  end_time: bigint;
  delayed: boolean;
}
/**
 * MsgCreateVestingAccountResponse defines the Msg/CreateVestingAccount response
 * type.
 */
export interface MsgCreateVestingAccountResponse {}
export interface MsgCreateVestingAccountResponseProtoMsg {
  typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccountResponse";
  value: Uint8Array;
}
/**
 * MsgCreateVestingAccountResponse defines the Msg/CreateVestingAccount response
 * type.
 */
export interface MsgCreateVestingAccountResponseAmino {}
export interface MsgCreateVestingAccountResponseAminoMsg {
  type: "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccountResponse";
  value: MsgCreateVestingAccountResponseAmino;
}
/**
 * MsgCreateVestingAccountResponse defines the Msg/CreateVestingAccount response
 * type.
 */
export interface MsgCreateVestingAccountResponseSDKType {}
/**
 * MsgFundFairburnPool allows an account to directly
 * fund the fee collector pool.
 */
export interface MsgFundFairburnPool {
  sender: string;
  amount: Coin[];
}
export interface MsgFundFairburnPoolProtoMsg {
  typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgFundFairburnPool";
  value: Uint8Array;
}
/**
 * MsgFundFairburnPool allows an account to directly
 * fund the fee collector pool.
 */
export interface MsgFundFairburnPoolAmino {
  sender?: string;
  amount?: CoinAmino[];
}
export interface MsgFundFairburnPoolAminoMsg {
  type: "/publicawesome.stargaze.alloc.v1beta1.MsgFundFairburnPool";
  value: MsgFundFairburnPoolAmino;
}
/**
 * MsgFundFairburnPool allows an account to directly
 * fund the fee collector pool.
 */
export interface MsgFundFairburnPoolSDKType {
  sender: string;
  amount: CoinSDKType[];
}
/**
 * MsgFundFairburnPoolResponse defines the Msg/MsgFundFairburnPool response
 * type.
 */
export interface MsgFundFairburnPoolResponse {}
export interface MsgFundFairburnPoolResponseProtoMsg {
  typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgFundFairburnPoolResponse";
  value: Uint8Array;
}
/**
 * MsgFundFairburnPoolResponse defines the Msg/MsgFundFairburnPool response
 * type.
 */
export interface MsgFundFairburnPoolResponseAmino {}
export interface MsgFundFairburnPoolResponseAminoMsg {
  type: "/publicawesome.stargaze.alloc.v1beta1.MsgFundFairburnPoolResponse";
  value: MsgFundFairburnPoolResponseAmino;
}
/**
 * MsgFundFairburnPoolResponse defines the Msg/MsgFundFairburnPool response
 * type.
 */
export interface MsgFundFairburnPoolResponseSDKType {}
function createBaseMsgCreateVestingAccount(): MsgCreateVestingAccount {
  return {
    fromAddress: "",
    toAddress: "",
    amount: [],
    startTime: BigInt(0),
    endTime: BigInt(0),
    delayed: false
  };
}
export const MsgCreateVestingAccount = {
  typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccount",
  encode(message: MsgCreateVestingAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.fromAddress !== "") {
      writer.uint32(10).string(message.fromAddress);
    }
    if (message.toAddress !== "") {
      writer.uint32(18).string(message.toAddress);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.startTime !== BigInt(0)) {
      writer.uint32(32).int64(message.startTime);
    }
    if (message.endTime !== BigInt(0)) {
      writer.uint32(40).int64(message.endTime);
    }
    if (message.delayed === true) {
      writer.uint32(48).bool(message.delayed);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateVestingAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateVestingAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fromAddress = reader.string();
          break;
        case 2:
          message.toAddress = reader.string();
          break;
        case 3:
          message.amount.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.startTime = reader.int64();
          break;
        case 5:
          message.endTime = reader.int64();
          break;
        case 6:
          message.delayed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateVestingAccount>): MsgCreateVestingAccount {
    const message = createBaseMsgCreateVestingAccount();
    message.fromAddress = object.fromAddress ?? "";
    message.toAddress = object.toAddress ?? "";
    message.amount = object.amount?.map(e => Coin.fromPartial(e)) || [];
    message.startTime = object.startTime !== undefined && object.startTime !== null ? BigInt(object.startTime.toString()) : BigInt(0);
    message.endTime = object.endTime !== undefined && object.endTime !== null ? BigInt(object.endTime.toString()) : BigInt(0);
    message.delayed = object.delayed ?? false;
    return message;
  },
  fromAmino(object: MsgCreateVestingAccountAmino): MsgCreateVestingAccount {
    const message = createBaseMsgCreateVestingAccount();
    if (object.from_address !== undefined && object.from_address !== null) {
      message.fromAddress = object.from_address;
    }
    if (object.to_address !== undefined && object.to_address !== null) {
      message.toAddress = object.to_address;
    }
    message.amount = object.amount?.map(e => Coin.fromAmino(e)) || [];
    if (object.start_time !== undefined && object.start_time !== null) {
      message.startTime = BigInt(object.start_time);
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.endTime = BigInt(object.end_time);
    }
    if (object.delayed !== undefined && object.delayed !== null) {
      message.delayed = object.delayed;
    }
    return message;
  },
  toAmino(message: MsgCreateVestingAccount, useInterfaces: boolean = false): MsgCreateVestingAccountAmino {
    const obj: any = {};
    obj.from_address = message.fromAddress;
    obj.to_address = message.toAddress;
    if (message.amount) {
      obj.amount = message.amount.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amount = [];
    }
    obj.start_time = message.startTime ? message.startTime.toString() : undefined;
    obj.end_time = message.endTime ? message.endTime.toString() : undefined;
    obj.delayed = message.delayed;
    return obj;
  },
  fromAminoMsg(object: MsgCreateVestingAccountAminoMsg): MsgCreateVestingAccount {
    return MsgCreateVestingAccount.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateVestingAccountProtoMsg, useInterfaces: boolean = false): MsgCreateVestingAccount {
    return MsgCreateVestingAccount.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateVestingAccount): Uint8Array {
    return MsgCreateVestingAccount.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateVestingAccount): MsgCreateVestingAccountProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccount",
      value: MsgCreateVestingAccount.encode(message).finish()
    };
  }
};
function createBaseMsgCreateVestingAccountResponse(): MsgCreateVestingAccountResponse {
  return {};
}
export const MsgCreateVestingAccountResponse = {
  typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccountResponse",
  encode(_: MsgCreateVestingAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateVestingAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateVestingAccountResponse();
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
  fromPartial(_: Partial<MsgCreateVestingAccountResponse>): MsgCreateVestingAccountResponse {
    const message = createBaseMsgCreateVestingAccountResponse();
    return message;
  },
  fromAmino(_: MsgCreateVestingAccountResponseAmino): MsgCreateVestingAccountResponse {
    const message = createBaseMsgCreateVestingAccountResponse();
    return message;
  },
  toAmino(_: MsgCreateVestingAccountResponse, useInterfaces: boolean = false): MsgCreateVestingAccountResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCreateVestingAccountResponseAminoMsg): MsgCreateVestingAccountResponse {
    return MsgCreateVestingAccountResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateVestingAccountResponseProtoMsg, useInterfaces: boolean = false): MsgCreateVestingAccountResponse {
    return MsgCreateVestingAccountResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateVestingAccountResponse): Uint8Array {
    return MsgCreateVestingAccountResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateVestingAccountResponse): MsgCreateVestingAccountResponseProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccountResponse",
      value: MsgCreateVestingAccountResponse.encode(message).finish()
    };
  }
};
function createBaseMsgFundFairburnPool(): MsgFundFairburnPool {
  return {
    sender: "",
    amount: []
  };
}
export const MsgFundFairburnPool = {
  typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgFundFairburnPool",
  encode(message: MsgFundFairburnPool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgFundFairburnPool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFundFairburnPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgFundFairburnPool>): MsgFundFairburnPool {
    const message = createBaseMsgFundFairburnPool();
    message.sender = object.sender ?? "";
    message.amount = object.amount?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgFundFairburnPoolAmino): MsgFundFairburnPool {
    const message = createBaseMsgFundFairburnPool();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.amount = object.amount?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgFundFairburnPool, useInterfaces: boolean = false): MsgFundFairburnPoolAmino {
    const obj: any = {};
    obj.sender = message.sender;
    if (message.amount) {
      obj.amount = message.amount.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amount = [];
    }
    return obj;
  },
  fromAminoMsg(object: MsgFundFairburnPoolAminoMsg): MsgFundFairburnPool {
    return MsgFundFairburnPool.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgFundFairburnPoolProtoMsg, useInterfaces: boolean = false): MsgFundFairburnPool {
    return MsgFundFairburnPool.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgFundFairburnPool): Uint8Array {
    return MsgFundFairburnPool.encode(message).finish();
  },
  toProtoMsg(message: MsgFundFairburnPool): MsgFundFairburnPoolProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgFundFairburnPool",
      value: MsgFundFairburnPool.encode(message).finish()
    };
  }
};
function createBaseMsgFundFairburnPoolResponse(): MsgFundFairburnPoolResponse {
  return {};
}
export const MsgFundFairburnPoolResponse = {
  typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgFundFairburnPoolResponse",
  encode(_: MsgFundFairburnPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgFundFairburnPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFundFairburnPoolResponse();
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
  fromPartial(_: Partial<MsgFundFairburnPoolResponse>): MsgFundFairburnPoolResponse {
    const message = createBaseMsgFundFairburnPoolResponse();
    return message;
  },
  fromAmino(_: MsgFundFairburnPoolResponseAmino): MsgFundFairburnPoolResponse {
    const message = createBaseMsgFundFairburnPoolResponse();
    return message;
  },
  toAmino(_: MsgFundFairburnPoolResponse, useInterfaces: boolean = false): MsgFundFairburnPoolResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgFundFairburnPoolResponseAminoMsg): MsgFundFairburnPoolResponse {
    return MsgFundFairburnPoolResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgFundFairburnPoolResponseProtoMsg, useInterfaces: boolean = false): MsgFundFairburnPoolResponse {
    return MsgFundFairburnPoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgFundFairburnPoolResponse): Uint8Array {
    return MsgFundFairburnPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgFundFairburnPoolResponse): MsgFundFairburnPoolResponseProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.alloc.v1beta1.MsgFundFairburnPoolResponse",
      value: MsgFundFairburnPoolResponse.encode(message).finish()
    };
  }
};