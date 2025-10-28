import { BinaryReader, BinaryWriter } from "../../binary";
export interface AddressUnbonding {
  address: string;
  receiver: string;
  unbondingEstimatedTime: string;
  amount: string;
  denom: string;
  claimIsPending: boolean;
  epochNumber: bigint;
}
export interface AddressUnbondingProtoMsg {
  typeUrl: "/stride.stakeibc.AddressUnbonding";
  value: Uint8Array;
}
export interface AddressUnbondingAmino {
  address?: string;
  receiver?: string;
  unbonding_estimated_time?: string;
  amount?: string;
  denom?: string;
  claim_is_pending?: boolean;
  epoch_number?: string;
}
export interface AddressUnbondingAminoMsg {
  type: "/stride.stakeibc.AddressUnbonding";
  value: AddressUnbondingAmino;
}
export interface AddressUnbondingSDKType {
  address: string;
  receiver: string;
  unbonding_estimated_time: string;
  amount: string;
  denom: string;
  claim_is_pending: boolean;
  epoch_number: bigint;
}
function createBaseAddressUnbonding(): AddressUnbonding {
  return {
    address: "",
    receiver: "",
    unbondingEstimatedTime: "",
    amount: "",
    denom: "",
    claimIsPending: false,
    epochNumber: BigInt(0)
  };
}
export const AddressUnbonding = {
  typeUrl: "/stride.stakeibc.AddressUnbonding",
  encode(message: AddressUnbonding, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.receiver !== "") {
      writer.uint32(18).string(message.receiver);
    }
    if (message.unbondingEstimatedTime !== "") {
      writer.uint32(26).string(message.unbondingEstimatedTime);
    }
    if (message.amount !== "") {
      writer.uint32(34).string(message.amount);
    }
    if (message.denom !== "") {
      writer.uint32(42).string(message.denom);
    }
    if (message.claimIsPending === true) {
      writer.uint32(64).bool(message.claimIsPending);
    }
    if (message.epochNumber !== BigInt(0)) {
      writer.uint32(72).uint64(message.epochNumber);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AddressUnbonding {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddressUnbonding();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.receiver = reader.string();
          break;
        case 3:
          message.unbondingEstimatedTime = reader.string();
          break;
        case 4:
          message.amount = reader.string();
          break;
        case 5:
          message.denom = reader.string();
          break;
        case 8:
          message.claimIsPending = reader.bool();
          break;
        case 9:
          message.epochNumber = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AddressUnbonding>): AddressUnbonding {
    const message = createBaseAddressUnbonding();
    message.address = object.address ?? "";
    message.receiver = object.receiver ?? "";
    message.unbondingEstimatedTime = object.unbondingEstimatedTime ?? "";
    message.amount = object.amount ?? "";
    message.denom = object.denom ?? "";
    message.claimIsPending = object.claimIsPending ?? false;
    message.epochNumber = object.epochNumber !== undefined && object.epochNumber !== null ? BigInt(object.epochNumber.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: AddressUnbondingAmino): AddressUnbonding {
    const message = createBaseAddressUnbonding();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver;
    }
    if (object.unbonding_estimated_time !== undefined && object.unbonding_estimated_time !== null) {
      message.unbondingEstimatedTime = object.unbonding_estimated_time;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.claim_is_pending !== undefined && object.claim_is_pending !== null) {
      message.claimIsPending = object.claim_is_pending;
    }
    if (object.epoch_number !== undefined && object.epoch_number !== null) {
      message.epochNumber = BigInt(object.epoch_number);
    }
    return message;
  },
  toAmino(message: AddressUnbonding, useInterfaces: boolean = false): AddressUnbondingAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.receiver = message.receiver === "" ? undefined : message.receiver;
    obj.unbonding_estimated_time = message.unbondingEstimatedTime === "" ? undefined : message.unbondingEstimatedTime;
    obj.amount = message.amount === "" ? undefined : message.amount;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.claim_is_pending = message.claimIsPending === false ? undefined : message.claimIsPending;
    obj.epoch_number = message.epochNumber !== BigInt(0) ? message.epochNumber.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: AddressUnbondingAminoMsg): AddressUnbonding {
    return AddressUnbonding.fromAmino(object.value);
  },
  fromProtoMsg(message: AddressUnbondingProtoMsg, useInterfaces: boolean = false): AddressUnbonding {
    return AddressUnbonding.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AddressUnbonding): Uint8Array {
    return AddressUnbonding.encode(message).finish();
  },
  toProtoMsg(message: AddressUnbonding): AddressUnbondingProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.AddressUnbonding",
      value: AddressUnbonding.encode(message).finish()
    };
  }
};