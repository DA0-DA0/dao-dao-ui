import { Timestamp } from "../../../google/protobuf/timestamp";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
export interface Unbonding {
  id: bigint;
  completionTime: Date | undefined;
  address: string;
  treasuryAddress: string;
  amount: Coin | undefined;
  autoClaim: boolean;
}
export interface UnbondingProtoMsg {
  typeUrl: "/pryzm.incentives.v1.Unbonding";
  value: Uint8Array;
}
export interface UnbondingAmino {
  id?: string;
  completion_time?: string | undefined;
  address?: string;
  treasury_address?: string;
  amount?: CoinAmino | undefined;
  auto_claim?: boolean;
}
export interface UnbondingAminoMsg {
  type: "/pryzm.incentives.v1.Unbonding";
  value: UnbondingAmino;
}
export interface UnbondingSDKType {
  id: bigint;
  completion_time: Date | undefined;
  address: string;
  treasury_address: string;
  amount: CoinSDKType | undefined;
  auto_claim: boolean;
}
function createBaseUnbonding(): Unbonding {
  return {
    id: BigInt(0),
    completionTime: new Date(),
    address: "",
    treasuryAddress: "",
    amount: Coin.fromPartial({}),
    autoClaim: false
  };
}
export const Unbonding = {
  typeUrl: "/pryzm.incentives.v1.Unbonding",
  encode(message: Unbonding, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.completionTime !== undefined) {
      Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (message.treasuryAddress !== "") {
      writer.uint32(34).string(message.treasuryAddress);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(42).fork()).ldelim();
    }
    if (message.autoClaim === true) {
      writer.uint32(48).bool(message.autoClaim);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Unbonding {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnbonding();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.address = reader.string();
          break;
        case 4:
          message.treasuryAddress = reader.string();
          break;
        case 5:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.autoClaim = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Unbonding>): Unbonding {
    const message = createBaseUnbonding();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.completionTime = object.completionTime ?? undefined;
    message.address = object.address ?? "";
    message.treasuryAddress = object.treasuryAddress ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.autoClaim = object.autoClaim ?? false;
    return message;
  },
  fromAmino(object: UnbondingAmino): Unbonding {
    const message = createBaseUnbonding();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.completion_time !== undefined && object.completion_time !== null) {
      message.completionTime = fromTimestamp(Timestamp.fromAmino(object.completion_time));
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.treasury_address !== undefined && object.treasury_address !== null) {
      message.treasuryAddress = object.treasury_address;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    if (object.auto_claim !== undefined && object.auto_claim !== null) {
      message.autoClaim = object.auto_claim;
    }
    return message;
  },
  toAmino(message: Unbonding, useInterfaces: boolean = false): UnbondingAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.completion_time = message.completionTime ? Timestamp.toAmino(toTimestamp(message.completionTime)) : undefined;
    obj.address = message.address === "" ? undefined : message.address;
    obj.treasury_address = message.treasuryAddress === "" ? undefined : message.treasuryAddress;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    obj.auto_claim = message.autoClaim === false ? undefined : message.autoClaim;
    return obj;
  },
  fromAminoMsg(object: UnbondingAminoMsg): Unbonding {
    return Unbonding.fromAmino(object.value);
  },
  fromProtoMsg(message: UnbondingProtoMsg, useInterfaces: boolean = false): Unbonding {
    return Unbonding.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Unbonding): Uint8Array {
    return Unbonding.encode(message).finish();
  },
  toProtoMsg(message: Unbonding): UnbondingProtoMsg {
    return {
      typeUrl: "/pryzm.incentives.v1.Unbonding",
      value: Unbonding.encode(message).finish()
    };
  }
};