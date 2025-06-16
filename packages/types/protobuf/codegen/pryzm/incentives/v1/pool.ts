import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface PoolRewardToken {
  denom: string;
  amount: string;
  globalIndex: string;
  weight: string;
}
export interface PoolRewardTokenProtoMsg {
  typeUrl: "/pryzm.incentives.v1.PoolRewardToken";
  value: Uint8Array;
}
export interface PoolRewardTokenAmino {
  denom?: string;
  amount?: string;
  global_index?: string;
  weight?: string;
}
export interface PoolRewardTokenAminoMsg {
  type: "/pryzm.incentives.v1.PoolRewardToken";
  value: PoolRewardTokenAmino;
}
export interface PoolRewardTokenSDKType {
  denom: string;
  amount: string;
  global_index: string;
  weight: string;
}
export interface Pool {
  bondedToken: Coin | undefined;
  rewards: PoolRewardToken[];
}
export interface PoolProtoMsg {
  typeUrl: "/pryzm.incentives.v1.Pool";
  value: Uint8Array;
}
export interface PoolAmino {
  bonded_token?: CoinAmino | undefined;
  rewards?: PoolRewardTokenAmino[];
}
export interface PoolAminoMsg {
  type: "/pryzm.incentives.v1.Pool";
  value: PoolAmino;
}
export interface PoolSDKType {
  bonded_token: CoinSDKType | undefined;
  rewards: PoolRewardTokenSDKType[];
}
function createBasePoolRewardToken(): PoolRewardToken {
  return {
    denom: "",
    amount: "",
    globalIndex: "",
    weight: ""
  };
}
export const PoolRewardToken = {
  typeUrl: "/pryzm.incentives.v1.PoolRewardToken",
  encode(message: PoolRewardToken, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    if (message.globalIndex !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.globalIndex, 18).atomics);
    }
    if (message.weight !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.weight, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PoolRewardToken {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolRewardToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.globalIndex = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.weight = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PoolRewardToken>): PoolRewardToken {
    const message = createBasePoolRewardToken();
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? "";
    message.globalIndex = object.globalIndex ?? "";
    message.weight = object.weight ?? "";
    return message;
  },
  fromAmino(object: PoolRewardTokenAmino): PoolRewardToken {
    const message = createBasePoolRewardToken();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.global_index !== undefined && object.global_index !== null) {
      message.globalIndex = object.global_index;
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = object.weight;
    }
    return message;
  },
  toAmino(message: PoolRewardToken, useInterfaces: boolean = false): PoolRewardTokenAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.amount = message.amount === "" ? undefined : message.amount;
    obj.global_index = message.globalIndex === "" ? undefined : message.globalIndex;
    obj.weight = message.weight === "" ? undefined : message.weight;
    return obj;
  },
  fromAminoMsg(object: PoolRewardTokenAminoMsg): PoolRewardToken {
    return PoolRewardToken.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolRewardTokenProtoMsg, useInterfaces: boolean = false): PoolRewardToken {
    return PoolRewardToken.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PoolRewardToken): Uint8Array {
    return PoolRewardToken.encode(message).finish();
  },
  toProtoMsg(message: PoolRewardToken): PoolRewardTokenProtoMsg {
    return {
      typeUrl: "/pryzm.incentives.v1.PoolRewardToken",
      value: PoolRewardToken.encode(message).finish()
    };
  }
};
function createBasePool(): Pool {
  return {
    bondedToken: Coin.fromPartial({}),
    rewards: []
  };
}
export const Pool = {
  typeUrl: "/pryzm.incentives.v1.Pool",
  encode(message: Pool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.bondedToken !== undefined) {
      Coin.encode(message.bondedToken, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.rewards) {
      PoolRewardToken.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Pool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bondedToken = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.rewards.push(PoolRewardToken.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Pool>): Pool {
    const message = createBasePool();
    message.bondedToken = object.bondedToken !== undefined && object.bondedToken !== null ? Coin.fromPartial(object.bondedToken) : undefined;
    message.rewards = object.rewards?.map(e => PoolRewardToken.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: PoolAmino): Pool {
    const message = createBasePool();
    if (object.bonded_token !== undefined && object.bonded_token !== null) {
      message.bondedToken = Coin.fromAmino(object.bonded_token);
    }
    message.rewards = object.rewards?.map(e => PoolRewardToken.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: Pool, useInterfaces: boolean = false): PoolAmino {
    const obj: any = {};
    obj.bonded_token = message.bondedToken ? Coin.toAmino(message.bondedToken, useInterfaces) : undefined;
    if (message.rewards) {
      obj.rewards = message.rewards.map(e => e ? PoolRewardToken.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.rewards = message.rewards;
    }
    return obj;
  },
  fromAminoMsg(object: PoolAminoMsg): Pool {
    return Pool.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolProtoMsg, useInterfaces: boolean = false): Pool {
    return Pool.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Pool): Uint8Array {
    return Pool.encode(message).finish();
  },
  toProtoMsg(message: Pool): PoolProtoMsg {
    return {
      typeUrl: "/pryzm.incentives.v1.Pool",
      value: Pool.encode(message).finish()
    };
  }
};