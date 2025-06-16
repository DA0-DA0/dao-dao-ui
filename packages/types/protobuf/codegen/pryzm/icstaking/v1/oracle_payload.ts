import { Height, HeightAmino, HeightSDKType } from "../../../ibc/core/client/v1/client";
import { ValidatorState, ValidatorStateAmino, ValidatorStateSDKType } from "./host_chain";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** OraclePayload defines the structure of oracle vote payload */
export interface OraclePayload {
  /**
   * Oracle is reporting the data based on the host chain’s time which may have a time difference with Pryzm.
   * In order to be accurate, we use a reference of host chain’s latest block in which Pryzm's state has changed to idle,
   * and oracle feeders' reported block height is checked to be after that specific block
   */
  blockHeight: Height | undefined;
  /** list of validators and their state containing the delegation amount */
  validatorStates: ValidatorState[];
  /** balance of delegation interchain account */
  delegationAccountBalance: string;
  /** balance of reward interchain account */
  rewardAccountBalance: string;
  /** balance of sweep interchain account */
  sweepAccountBalance: string;
  /**
   * the largest undelegation epoch number for which the undelegation is completed and is ready to be swept to PRYZM
   * reporting this with zero means that none of incomplete undelegations are completed.
   */
  lastCompletedUndelegationEpoch: bigint;
}
export interface OraclePayloadProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.OraclePayload";
  value: Uint8Array;
}
/** OraclePayload defines the structure of oracle vote payload */
export interface OraclePayloadAmino {
  /**
   * Oracle is reporting the data based on the host chain’s time which may have a time difference with Pryzm.
   * In order to be accurate, we use a reference of host chain’s latest block in which Pryzm's state has changed to idle,
   * and oracle feeders' reported block height is checked to be after that specific block
   */
  block_height?: HeightAmino | undefined;
  /** list of validators and their state containing the delegation amount */
  validator_states?: ValidatorStateAmino[];
  /** balance of delegation interchain account */
  delegation_account_balance?: string;
  /** balance of reward interchain account */
  reward_account_balance?: string;
  /** balance of sweep interchain account */
  sweep_account_balance?: string;
  /**
   * the largest undelegation epoch number for which the undelegation is completed and is ready to be swept to PRYZM
   * reporting this with zero means that none of incomplete undelegations are completed.
   */
  last_completed_undelegation_epoch?: string;
}
export interface OraclePayloadAminoMsg {
  type: "/pryzm.icstaking.v1.OraclePayload";
  value: OraclePayloadAmino;
}
/** OraclePayload defines the structure of oracle vote payload */
export interface OraclePayloadSDKType {
  block_height: HeightSDKType | undefined;
  validator_states: ValidatorStateSDKType[];
  delegation_account_balance: string;
  reward_account_balance: string;
  sweep_account_balance: string;
  last_completed_undelegation_epoch: bigint;
}
function createBaseOraclePayload(): OraclePayload {
  return {
    blockHeight: Height.fromPartial({}),
    validatorStates: [],
    delegationAccountBalance: "",
    rewardAccountBalance: "",
    sweepAccountBalance: "",
    lastCompletedUndelegationEpoch: BigInt(0)
  };
}
export const OraclePayload = {
  typeUrl: "/pryzm.icstaking.v1.OraclePayload",
  encode(message: OraclePayload, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blockHeight !== undefined) {
      Height.encode(message.blockHeight, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.validatorStates) {
      ValidatorState.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.delegationAccountBalance !== "") {
      writer.uint32(34).string(message.delegationAccountBalance);
    }
    if (message.rewardAccountBalance !== "") {
      writer.uint32(42).string(message.rewardAccountBalance);
    }
    if (message.sweepAccountBalance !== "") {
      writer.uint32(50).string(message.sweepAccountBalance);
    }
    if (message.lastCompletedUndelegationEpoch !== BigInt(0)) {
      writer.uint32(56).uint64(message.lastCompletedUndelegationEpoch);
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
          message.blockHeight = Height.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.validatorStates.push(ValidatorState.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.delegationAccountBalance = reader.string();
          break;
        case 5:
          message.rewardAccountBalance = reader.string();
          break;
        case 6:
          message.sweepAccountBalance = reader.string();
          break;
        case 7:
          message.lastCompletedUndelegationEpoch = reader.uint64();
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
    message.blockHeight = object.blockHeight !== undefined && object.blockHeight !== null ? Height.fromPartial(object.blockHeight) : undefined;
    message.validatorStates = object.validatorStates?.map(e => ValidatorState.fromPartial(e)) || [];
    message.delegationAccountBalance = object.delegationAccountBalance ?? "";
    message.rewardAccountBalance = object.rewardAccountBalance ?? "";
    message.sweepAccountBalance = object.sweepAccountBalance ?? "";
    message.lastCompletedUndelegationEpoch = object.lastCompletedUndelegationEpoch !== undefined && object.lastCompletedUndelegationEpoch !== null ? BigInt(object.lastCompletedUndelegationEpoch.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: OraclePayloadAmino): OraclePayload {
    const message = createBaseOraclePayload();
    if (object.block_height !== undefined && object.block_height !== null) {
      message.blockHeight = Height.fromAmino(object.block_height);
    }
    message.validatorStates = object.validator_states?.map(e => ValidatorState.fromAmino(e)) || [];
    if (object.delegation_account_balance !== undefined && object.delegation_account_balance !== null) {
      message.delegationAccountBalance = object.delegation_account_balance;
    }
    if (object.reward_account_balance !== undefined && object.reward_account_balance !== null) {
      message.rewardAccountBalance = object.reward_account_balance;
    }
    if (object.sweep_account_balance !== undefined && object.sweep_account_balance !== null) {
      message.sweepAccountBalance = object.sweep_account_balance;
    }
    if (object.last_completed_undelegation_epoch !== undefined && object.last_completed_undelegation_epoch !== null) {
      message.lastCompletedUndelegationEpoch = BigInt(object.last_completed_undelegation_epoch);
    }
    return message;
  },
  toAmino(message: OraclePayload, useInterfaces: boolean = false): OraclePayloadAmino {
    const obj: any = {};
    obj.block_height = message.blockHeight ? Height.toAmino(message.blockHeight, useInterfaces) : {};
    if (message.validatorStates) {
      obj.validator_states = message.validatorStates.map(e => e ? ValidatorState.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validator_states = message.validatorStates;
    }
    obj.delegation_account_balance = message.delegationAccountBalance === "" ? undefined : message.delegationAccountBalance;
    obj.reward_account_balance = message.rewardAccountBalance === "" ? undefined : message.rewardAccountBalance;
    obj.sweep_account_balance = message.sweepAccountBalance === "" ? undefined : message.sweepAccountBalance;
    obj.last_completed_undelegation_epoch = message.lastCompletedUndelegationEpoch !== BigInt(0) ? message.lastCompletedUndelegationEpoch.toString() : undefined;
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
      typeUrl: "/pryzm.icstaking.v1.OraclePayload",
      value: OraclePayload.encode(message).finish()
    };
  }
};