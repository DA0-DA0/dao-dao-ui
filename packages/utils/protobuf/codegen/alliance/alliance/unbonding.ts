import { Timestamp } from "../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../binary";
import { toTimestamp, fromTimestamp } from "../../helpers";
/** UnbondingDelegation defines an unbonding object with relevant metadata. */
export interface UnbondingDelegation {
  /** completion_time is the unix time for unbonding completion. */
  completionTime: Date | undefined;
  /** validator_address is the bech32-encoded address of the validator. */
  validatorAddress: string;
  /** amount defines the tokens to receive at completion. */
  amount: string;
}
export interface UnbondingDelegationProtoMsg {
  typeUrl: "/alliance.alliance.UnbondingDelegation";
  value: Uint8Array;
}
/** UnbondingDelegation defines an unbonding object with relevant metadata. */
export interface UnbondingDelegationAmino {
  /** completion_time is the unix time for unbonding completion. */
  completion_time?: string | undefined;
  /** validator_address is the bech32-encoded address of the validator. */
  validator_address?: string;
  /** amount defines the tokens to receive at completion. */
  amount?: string;
}
export interface UnbondingDelegationAminoMsg {
  type: "/alliance.alliance.UnbondingDelegation";
  value: UnbondingDelegationAmino;
}
/** UnbondingDelegation defines an unbonding object with relevant metadata. */
export interface UnbondingDelegationSDKType {
  completion_time: Date | undefined;
  validator_address: string;
  amount: string;
}
function createBaseUnbondingDelegation(): UnbondingDelegation {
  return {
    completionTime: new Date(),
    validatorAddress: "",
    amount: ""
  };
}
export const UnbondingDelegation = {
  typeUrl: "/alliance.alliance.UnbondingDelegation",
  encode(message: UnbondingDelegation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.completionTime !== undefined) {
      Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UnbondingDelegation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnbondingDelegation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UnbondingDelegation>): UnbondingDelegation {
    const message = createBaseUnbondingDelegation();
    message.completionTime = object.completionTime ?? undefined;
    message.validatorAddress = object.validatorAddress ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: UnbondingDelegationAmino): UnbondingDelegation {
    const message = createBaseUnbondingDelegation();
    if (object.completion_time !== undefined && object.completion_time !== null) {
      message.completionTime = fromTimestamp(Timestamp.fromAmino(object.completion_time));
    }
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: UnbondingDelegation, useInterfaces: boolean = false): UnbondingDelegationAmino {
    const obj: any = {};
    obj.completion_time = message.completionTime ? Timestamp.toAmino(toTimestamp(message.completionTime)) : undefined;
    obj.validator_address = message.validatorAddress;
    obj.amount = message.amount;
    return obj;
  },
  fromAminoMsg(object: UnbondingDelegationAminoMsg): UnbondingDelegation {
    return UnbondingDelegation.fromAmino(object.value);
  },
  fromProtoMsg(message: UnbondingDelegationProtoMsg, useInterfaces: boolean = false): UnbondingDelegation {
    return UnbondingDelegation.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UnbondingDelegation): Uint8Array {
    return UnbondingDelegation.encode(message).finish();
  },
  toProtoMsg(message: UnbondingDelegation): UnbondingDelegationProtoMsg {
    return {
      typeUrl: "/alliance.alliance.UnbondingDelegation",
      value: UnbondingDelegation.encode(message).finish()
    };
  }
};