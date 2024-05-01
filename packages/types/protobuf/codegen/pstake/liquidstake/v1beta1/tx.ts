//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Params, ParamsAmino, ParamsSDKType, WhitelistedValidator, WhitelistedValidatorAmino, WhitelistedValidatorSDKType } from "./liquidstake";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
/**
 * MsgLiquidStake defines a SDK message for performing a liquid stake of coins
 * from a delegator to whitelisted validators.
 */
export interface MsgLiquidStake {
  delegatorAddress: string;
  amount: Coin | undefined;
}
export interface MsgLiquidStakeProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgLiquidStake";
  value: Uint8Array;
}
/**
 * MsgLiquidStake defines a SDK message for performing a liquid stake of coins
 * from a delegator to whitelisted validators.
 */
export interface MsgLiquidStakeAmino {
  delegator_address?: string;
  amount?: CoinAmino | undefined;
}
export interface MsgLiquidStakeAminoMsg {
  type: "/pstake.liquidstake.v1beta1.MsgLiquidStake";
  value: MsgLiquidStakeAmino;
}
/**
 * MsgLiquidStake defines a SDK message for performing a liquid stake of coins
 * from a delegator to whitelisted validators.
 */
export interface MsgLiquidStakeSDKType {
  delegator_address: string;
  amount: CoinSDKType | undefined;
}
/** MsgLiquidStakeResponse defines the MsgLiquidStake response type. */
export interface MsgLiquidStakeResponse {}
export interface MsgLiquidStakeResponseProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgLiquidStakeResponse";
  value: Uint8Array;
}
/** MsgLiquidStakeResponse defines the MsgLiquidStake response type. */
export interface MsgLiquidStakeResponseAmino {}
export interface MsgLiquidStakeResponseAminoMsg {
  type: "/pstake.liquidstake.v1beta1.MsgLiquidStakeResponse";
  value: MsgLiquidStakeResponseAmino;
}
/** MsgLiquidStakeResponse defines the MsgLiquidStake response type. */
export interface MsgLiquidStakeResponseSDKType {}
/**
 * MsgStakeToLP defines a SDK message for performing an LSM-transfer of staked
 * XPRT into stkXPRT with locking into an LP.
 */
export interface MsgStakeToLP {
  delegatorAddress: string;
  validatorAddress: string;
  stakedAmount: Coin | undefined;
  liquidAmount: Coin | undefined;
}
export interface MsgStakeToLPProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgStakeToLP";
  value: Uint8Array;
}
/**
 * MsgStakeToLP defines a SDK message for performing an LSM-transfer of staked
 * XPRT into stkXPRT with locking into an LP.
 */
export interface MsgStakeToLPAmino {
  delegator_address?: string;
  validator_address?: string;
  staked_amount?: CoinAmino | undefined;
  liquid_amount?: CoinAmino | undefined;
}
export interface MsgStakeToLPAminoMsg {
  type: "/pstake.liquidstake.v1beta1.MsgStakeToLP";
  value: MsgStakeToLPAmino;
}
/**
 * MsgStakeToLP defines a SDK message for performing an LSM-transfer of staked
 * XPRT into stkXPRT with locking into an LP.
 */
export interface MsgStakeToLPSDKType {
  delegator_address: string;
  validator_address: string;
  staked_amount: CoinSDKType | undefined;
  liquid_amount: CoinSDKType | undefined;
}
/** MsgStakeToLPResponse defines the MsgStakeToLP response type. */
export interface MsgStakeToLPResponse {}
export interface MsgStakeToLPResponseProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgStakeToLPResponse";
  value: Uint8Array;
}
/** MsgStakeToLPResponse defines the MsgStakeToLP response type. */
export interface MsgStakeToLPResponseAmino {}
export interface MsgStakeToLPResponseAminoMsg {
  type: "/pstake.liquidstake.v1beta1.MsgStakeToLPResponse";
  value: MsgStakeToLPResponseAmino;
}
/** MsgStakeToLPResponse defines the MsgStakeToLP response type. */
export interface MsgStakeToLPResponseSDKType {}
/**
 * MsgLiquidUnstake defines a SDK message for performing an undelegation of
 * liquid staking from a delegate.
 */
export interface MsgLiquidUnstake {
  delegatorAddress: string;
  amount: Coin | undefined;
}
export interface MsgLiquidUnstakeProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgLiquidUnstake";
  value: Uint8Array;
}
/**
 * MsgLiquidUnstake defines a SDK message for performing an undelegation of
 * liquid staking from a delegate.
 */
export interface MsgLiquidUnstakeAmino {
  delegator_address?: string;
  amount?: CoinAmino | undefined;
}
export interface MsgLiquidUnstakeAminoMsg {
  type: "/pstake.liquidstake.v1beta1.MsgLiquidUnstake";
  value: MsgLiquidUnstakeAmino;
}
/**
 * MsgLiquidUnstake defines a SDK message for performing an undelegation of
 * liquid staking from a delegate.
 */
export interface MsgLiquidUnstakeSDKType {
  delegator_address: string;
  amount: CoinSDKType | undefined;
}
/** MsgLiquidUnstakeResponse defines the MsgLiquidUnstake response type. */
export interface MsgLiquidUnstakeResponse {
  completionTime: Date | undefined;
}
export interface MsgLiquidUnstakeResponseProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgLiquidUnstakeResponse";
  value: Uint8Array;
}
/** MsgLiquidUnstakeResponse defines the MsgLiquidUnstake response type. */
export interface MsgLiquidUnstakeResponseAmino {
  completion_time?: string | undefined;
}
export interface MsgLiquidUnstakeResponseAminoMsg {
  type: "/pstake.liquidstake.v1beta1.MsgLiquidUnstakeResponse";
  value: MsgLiquidUnstakeResponseAmino;
}
/** MsgLiquidUnstakeResponse defines the MsgLiquidUnstake response type. */
export interface MsgLiquidUnstakeResponseSDKType {
  completion_time: Date | undefined;
}
export interface MsgUpdateParams {
  /**
   * authority is the address that controls the module (defaults to x/gov unless
   * overwritten).
   */
  authority: string;
  /**
   * params defines the parameters to update.
   * 
   * NOTE: denom and whitelisted validators are not updated.
   */
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgUpdateParams";
  value: Uint8Array;
}
export interface MsgUpdateParamsAmino {
  /**
   * authority is the address that controls the module (defaults to x/gov unless
   * overwritten).
   */
  authority?: string;
  /**
   * params defines the parameters to update.
   * 
   * NOTE: denom and whitelisted validators are not updated.
   */
  params?: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "/pstake.liquidstake.v1beta1.MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
/** MsgUpdateParamsResponse defines the response structure for executing a */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/** MsgUpdateParamsResponse defines the response structure for executing a */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/pstake.liquidstake.v1beta1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/** MsgUpdateParamsResponse defines the response structure for executing a */
export interface MsgUpdateParamsResponseSDKType {}
export interface MsgUpdateWhitelistedValidators {
  /**
   * Authority is the address that is allowed to update whitelisted validators,
   * defined as admin address in params (WhitelistAdminAddress).
   */
  authority: string;
  /**
   * WhitelistedValidators specifies the validators elected to become Active
   * Liquid Validators.
   */
  whitelistedValidators: WhitelistedValidator[];
}
export interface MsgUpdateWhitelistedValidatorsProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgUpdateWhitelistedValidators";
  value: Uint8Array;
}
export interface MsgUpdateWhitelistedValidatorsAmino {
  /**
   * Authority is the address that is allowed to update whitelisted validators,
   * defined as admin address in params (WhitelistAdminAddress).
   */
  authority?: string;
  /**
   * WhitelistedValidators specifies the validators elected to become Active
   * Liquid Validators.
   */
  whitelisted_validators?: WhitelistedValidatorAmino[];
}
export interface MsgUpdateWhitelistedValidatorsAminoMsg {
  type: "/pstake.liquidstake.v1beta1.MsgUpdateWhitelistedValidators";
  value: MsgUpdateWhitelistedValidatorsAmino;
}
export interface MsgUpdateWhitelistedValidatorsSDKType {
  authority: string;
  whitelisted_validators: WhitelistedValidatorSDKType[];
}
/**
 * MsgUpdateWhitelistedValidatorsResponse defines the response structure for
 * executing a
 */
export interface MsgUpdateWhitelistedValidatorsResponse {}
export interface MsgUpdateWhitelistedValidatorsResponseProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgUpdateWhitelistedValidatorsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateWhitelistedValidatorsResponse defines the response structure for
 * executing a
 */
export interface MsgUpdateWhitelistedValidatorsResponseAmino {}
export interface MsgUpdateWhitelistedValidatorsResponseAminoMsg {
  type: "/pstake.liquidstake.v1beta1.MsgUpdateWhitelistedValidatorsResponse";
  value: MsgUpdateWhitelistedValidatorsResponseAmino;
}
/**
 * MsgUpdateWhitelistedValidatorsResponse defines the response structure for
 * executing a
 */
export interface MsgUpdateWhitelistedValidatorsResponseSDKType {}
export interface MsgSetModulePaused {
  /**
   * Authority is the address that is allowed to update module's paused state,
   * defined as admin address in params (WhitelistAdminAddress).
   */
  authority: string;
  /** IsPaused represents the target state of the paused flag. */
  isPaused: boolean;
}
export interface MsgSetModulePausedProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgSetModulePaused";
  value: Uint8Array;
}
export interface MsgSetModulePausedAmino {
  /**
   * Authority is the address that is allowed to update module's paused state,
   * defined as admin address in params (WhitelistAdminAddress).
   */
  authority?: string;
  /** IsPaused represents the target state of the paused flag. */
  is_paused?: boolean;
}
export interface MsgSetModulePausedAminoMsg {
  type: "/pstake.liquidstake.v1beta1.MsgSetModulePaused";
  value: MsgSetModulePausedAmino;
}
export interface MsgSetModulePausedSDKType {
  authority: string;
  is_paused: boolean;
}
/**
 * MsgSetModulePausedResponse defines the response structure for
 * executing a
 */
export interface MsgSetModulePausedResponse {}
export interface MsgSetModulePausedResponseProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgSetModulePausedResponse";
  value: Uint8Array;
}
/**
 * MsgSetModulePausedResponse defines the response structure for
 * executing a
 */
export interface MsgSetModulePausedResponseAmino {}
export interface MsgSetModulePausedResponseAminoMsg {
  type: "/pstake.liquidstake.v1beta1.MsgSetModulePausedResponse";
  value: MsgSetModulePausedResponseAmino;
}
/**
 * MsgSetModulePausedResponse defines the response structure for
 * executing a
 */
export interface MsgSetModulePausedResponseSDKType {}
function createBaseMsgLiquidStake(): MsgLiquidStake {
  return {
    delegatorAddress: "",
    amount: Coin.fromPartial({})
  };
}
export const MsgLiquidStake = {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgLiquidStake",
  encode(message: MsgLiquidStake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLiquidStake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidStake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
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
  fromPartial(object: Partial<MsgLiquidStake>): MsgLiquidStake {
    const message = createBaseMsgLiquidStake();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: MsgLiquidStakeAmino): MsgLiquidStake {
    const message = createBaseMsgLiquidStake();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: MsgLiquidStake, useInterfaces: boolean = false): MsgLiquidStakeAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgLiquidStakeAminoMsg): MsgLiquidStake {
    return MsgLiquidStake.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLiquidStakeProtoMsg, useInterfaces: boolean = false): MsgLiquidStake {
    return MsgLiquidStake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLiquidStake): Uint8Array {
    return MsgLiquidStake.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidStake): MsgLiquidStakeProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.MsgLiquidStake",
      value: MsgLiquidStake.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidStakeResponse(): MsgLiquidStakeResponse {
  return {};
}
export const MsgLiquidStakeResponse = {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgLiquidStakeResponse",
  encode(_: MsgLiquidStakeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLiquidStakeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidStakeResponse();
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
  fromPartial(_: Partial<MsgLiquidStakeResponse>): MsgLiquidStakeResponse {
    const message = createBaseMsgLiquidStakeResponse();
    return message;
  },
  fromAmino(_: MsgLiquidStakeResponseAmino): MsgLiquidStakeResponse {
    const message = createBaseMsgLiquidStakeResponse();
    return message;
  },
  toAmino(_: MsgLiquidStakeResponse, useInterfaces: boolean = false): MsgLiquidStakeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgLiquidStakeResponseAminoMsg): MsgLiquidStakeResponse {
    return MsgLiquidStakeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLiquidStakeResponseProtoMsg, useInterfaces: boolean = false): MsgLiquidStakeResponse {
    return MsgLiquidStakeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLiquidStakeResponse): Uint8Array {
    return MsgLiquidStakeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidStakeResponse): MsgLiquidStakeResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.MsgLiquidStakeResponse",
      value: MsgLiquidStakeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgStakeToLP(): MsgStakeToLP {
  return {
    delegatorAddress: "",
    validatorAddress: "",
    stakedAmount: Coin.fromPartial({}),
    liquidAmount: Coin.fromPartial({})
  };
}
export const MsgStakeToLP = {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgStakeToLP",
  encode(message: MsgStakeToLP, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.stakedAmount !== undefined) {
      Coin.encode(message.stakedAmount, writer.uint32(26).fork()).ldelim();
    }
    if (message.liquidAmount !== undefined) {
      Coin.encode(message.liquidAmount, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgStakeToLP {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStakeToLP();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        case 3:
          message.stakedAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.liquidAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgStakeToLP>): MsgStakeToLP {
    const message = createBaseMsgStakeToLP();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.stakedAmount = object.stakedAmount !== undefined && object.stakedAmount !== null ? Coin.fromPartial(object.stakedAmount) : undefined;
    message.liquidAmount = object.liquidAmount !== undefined && object.liquidAmount !== null ? Coin.fromPartial(object.liquidAmount) : undefined;
    return message;
  },
  fromAmino(object: MsgStakeToLPAmino): MsgStakeToLP {
    const message = createBaseMsgStakeToLP();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.staked_amount !== undefined && object.staked_amount !== null) {
      message.stakedAmount = Coin.fromAmino(object.staked_amount);
    }
    if (object.liquid_amount !== undefined && object.liquid_amount !== null) {
      message.liquidAmount = Coin.fromAmino(object.liquid_amount);
    }
    return message;
  },
  toAmino(message: MsgStakeToLP, useInterfaces: boolean = false): MsgStakeToLPAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress;
    obj.validator_address = message.validatorAddress;
    obj.staked_amount = message.stakedAmount ? Coin.toAmino(message.stakedAmount, useInterfaces) : undefined;
    obj.liquid_amount = message.liquidAmount ? Coin.toAmino(message.liquidAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgStakeToLPAminoMsg): MsgStakeToLP {
    return MsgStakeToLP.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgStakeToLPProtoMsg, useInterfaces: boolean = false): MsgStakeToLP {
    return MsgStakeToLP.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgStakeToLP): Uint8Array {
    return MsgStakeToLP.encode(message).finish();
  },
  toProtoMsg(message: MsgStakeToLP): MsgStakeToLPProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.MsgStakeToLP",
      value: MsgStakeToLP.encode(message).finish()
    };
  }
};
function createBaseMsgStakeToLPResponse(): MsgStakeToLPResponse {
  return {};
}
export const MsgStakeToLPResponse = {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgStakeToLPResponse",
  encode(_: MsgStakeToLPResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgStakeToLPResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStakeToLPResponse();
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
  fromPartial(_: Partial<MsgStakeToLPResponse>): MsgStakeToLPResponse {
    const message = createBaseMsgStakeToLPResponse();
    return message;
  },
  fromAmino(_: MsgStakeToLPResponseAmino): MsgStakeToLPResponse {
    const message = createBaseMsgStakeToLPResponse();
    return message;
  },
  toAmino(_: MsgStakeToLPResponse, useInterfaces: boolean = false): MsgStakeToLPResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgStakeToLPResponseAminoMsg): MsgStakeToLPResponse {
    return MsgStakeToLPResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgStakeToLPResponseProtoMsg, useInterfaces: boolean = false): MsgStakeToLPResponse {
    return MsgStakeToLPResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgStakeToLPResponse): Uint8Array {
    return MsgStakeToLPResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgStakeToLPResponse): MsgStakeToLPResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.MsgStakeToLPResponse",
      value: MsgStakeToLPResponse.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidUnstake(): MsgLiquidUnstake {
  return {
    delegatorAddress: "",
    amount: Coin.fromPartial({})
  };
}
export const MsgLiquidUnstake = {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgLiquidUnstake",
  encode(message: MsgLiquidUnstake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLiquidUnstake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidUnstake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
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
  fromPartial(object: Partial<MsgLiquidUnstake>): MsgLiquidUnstake {
    const message = createBaseMsgLiquidUnstake();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: MsgLiquidUnstakeAmino): MsgLiquidUnstake {
    const message = createBaseMsgLiquidUnstake();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: MsgLiquidUnstake, useInterfaces: boolean = false): MsgLiquidUnstakeAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgLiquidUnstakeAminoMsg): MsgLiquidUnstake {
    return MsgLiquidUnstake.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLiquidUnstakeProtoMsg, useInterfaces: boolean = false): MsgLiquidUnstake {
    return MsgLiquidUnstake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLiquidUnstake): Uint8Array {
    return MsgLiquidUnstake.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidUnstake): MsgLiquidUnstakeProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.MsgLiquidUnstake",
      value: MsgLiquidUnstake.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidUnstakeResponse(): MsgLiquidUnstakeResponse {
  return {
    completionTime: new Date()
  };
}
export const MsgLiquidUnstakeResponse = {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgLiquidUnstakeResponse",
  encode(message: MsgLiquidUnstakeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.completionTime !== undefined) {
      Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLiquidUnstakeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidUnstakeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLiquidUnstakeResponse>): MsgLiquidUnstakeResponse {
    const message = createBaseMsgLiquidUnstakeResponse();
    message.completionTime = object.completionTime ?? undefined;
    return message;
  },
  fromAmino(object: MsgLiquidUnstakeResponseAmino): MsgLiquidUnstakeResponse {
    const message = createBaseMsgLiquidUnstakeResponse();
    if (object.completion_time !== undefined && object.completion_time !== null) {
      message.completionTime = fromTimestamp(Timestamp.fromAmino(object.completion_time));
    }
    return message;
  },
  toAmino(message: MsgLiquidUnstakeResponse, useInterfaces: boolean = false): MsgLiquidUnstakeResponseAmino {
    const obj: any = {};
    obj.completion_time = message.completionTime ? Timestamp.toAmino(toTimestamp(message.completionTime)) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgLiquidUnstakeResponseAminoMsg): MsgLiquidUnstakeResponse {
    return MsgLiquidUnstakeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLiquidUnstakeResponseProtoMsg, useInterfaces: boolean = false): MsgLiquidUnstakeResponse {
    return MsgLiquidUnstakeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLiquidUnstakeResponse): Uint8Array {
    return MsgLiquidUnstakeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidUnstakeResponse): MsgLiquidUnstakeResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.MsgLiquidUnstakeResponse",
      value: MsgLiquidUnstakeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg, useInterfaces: boolean = false): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse, useInterfaces: boolean = false): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateWhitelistedValidators(): MsgUpdateWhitelistedValidators {
  return {
    authority: "",
    whitelistedValidators: []
  };
}
export const MsgUpdateWhitelistedValidators = {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgUpdateWhitelistedValidators",
  encode(message: MsgUpdateWhitelistedValidators, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.whitelistedValidators) {
      WhitelistedValidator.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateWhitelistedValidators {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateWhitelistedValidators();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.whitelistedValidators.push(WhitelistedValidator.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateWhitelistedValidators>): MsgUpdateWhitelistedValidators {
    const message = createBaseMsgUpdateWhitelistedValidators();
    message.authority = object.authority ?? "";
    message.whitelistedValidators = object.whitelistedValidators?.map(e => WhitelistedValidator.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgUpdateWhitelistedValidatorsAmino): MsgUpdateWhitelistedValidators {
    const message = createBaseMsgUpdateWhitelistedValidators();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    message.whitelistedValidators = object.whitelisted_validators?.map(e => WhitelistedValidator.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgUpdateWhitelistedValidators, useInterfaces: boolean = false): MsgUpdateWhitelistedValidatorsAmino {
    const obj: any = {};
    obj.authority = message.authority;
    if (message.whitelistedValidators) {
      obj.whitelisted_validators = message.whitelistedValidators.map(e => e ? WhitelistedValidator.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.whitelisted_validators = [];
    }
    return obj;
  },
  fromAminoMsg(object: MsgUpdateWhitelistedValidatorsAminoMsg): MsgUpdateWhitelistedValidators {
    return MsgUpdateWhitelistedValidators.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateWhitelistedValidatorsProtoMsg, useInterfaces: boolean = false): MsgUpdateWhitelistedValidators {
    return MsgUpdateWhitelistedValidators.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateWhitelistedValidators): Uint8Array {
    return MsgUpdateWhitelistedValidators.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateWhitelistedValidators): MsgUpdateWhitelistedValidatorsProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.MsgUpdateWhitelistedValidators",
      value: MsgUpdateWhitelistedValidators.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateWhitelistedValidatorsResponse(): MsgUpdateWhitelistedValidatorsResponse {
  return {};
}
export const MsgUpdateWhitelistedValidatorsResponse = {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgUpdateWhitelistedValidatorsResponse",
  encode(_: MsgUpdateWhitelistedValidatorsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateWhitelistedValidatorsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateWhitelistedValidatorsResponse();
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
  fromPartial(_: Partial<MsgUpdateWhitelistedValidatorsResponse>): MsgUpdateWhitelistedValidatorsResponse {
    const message = createBaseMsgUpdateWhitelistedValidatorsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateWhitelistedValidatorsResponseAmino): MsgUpdateWhitelistedValidatorsResponse {
    const message = createBaseMsgUpdateWhitelistedValidatorsResponse();
    return message;
  },
  toAmino(_: MsgUpdateWhitelistedValidatorsResponse, useInterfaces: boolean = false): MsgUpdateWhitelistedValidatorsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateWhitelistedValidatorsResponseAminoMsg): MsgUpdateWhitelistedValidatorsResponse {
    return MsgUpdateWhitelistedValidatorsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateWhitelistedValidatorsResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateWhitelistedValidatorsResponse {
    return MsgUpdateWhitelistedValidatorsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateWhitelistedValidatorsResponse): Uint8Array {
    return MsgUpdateWhitelistedValidatorsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateWhitelistedValidatorsResponse): MsgUpdateWhitelistedValidatorsResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.MsgUpdateWhitelistedValidatorsResponse",
      value: MsgUpdateWhitelistedValidatorsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetModulePaused(): MsgSetModulePaused {
  return {
    authority: "",
    isPaused: false
  };
}
export const MsgSetModulePaused = {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgSetModulePaused",
  encode(message: MsgSetModulePaused, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.isPaused === true) {
      writer.uint32(16).bool(message.isPaused);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetModulePaused {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetModulePaused();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.isPaused = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetModulePaused>): MsgSetModulePaused {
    const message = createBaseMsgSetModulePaused();
    message.authority = object.authority ?? "";
    message.isPaused = object.isPaused ?? false;
    return message;
  },
  fromAmino(object: MsgSetModulePausedAmino): MsgSetModulePaused {
    const message = createBaseMsgSetModulePaused();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.is_paused !== undefined && object.is_paused !== null) {
      message.isPaused = object.is_paused;
    }
    return message;
  },
  toAmino(message: MsgSetModulePaused, useInterfaces: boolean = false): MsgSetModulePausedAmino {
    const obj: any = {};
    obj.authority = message.authority;
    obj.is_paused = message.isPaused;
    return obj;
  },
  fromAminoMsg(object: MsgSetModulePausedAminoMsg): MsgSetModulePaused {
    return MsgSetModulePaused.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetModulePausedProtoMsg, useInterfaces: boolean = false): MsgSetModulePaused {
    return MsgSetModulePaused.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetModulePaused): Uint8Array {
    return MsgSetModulePaused.encode(message).finish();
  },
  toProtoMsg(message: MsgSetModulePaused): MsgSetModulePausedProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.MsgSetModulePaused",
      value: MsgSetModulePaused.encode(message).finish()
    };
  }
};
function createBaseMsgSetModulePausedResponse(): MsgSetModulePausedResponse {
  return {};
}
export const MsgSetModulePausedResponse = {
  typeUrl: "/pstake.liquidstake.v1beta1.MsgSetModulePausedResponse",
  encode(_: MsgSetModulePausedResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetModulePausedResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetModulePausedResponse();
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
  fromPartial(_: Partial<MsgSetModulePausedResponse>): MsgSetModulePausedResponse {
    const message = createBaseMsgSetModulePausedResponse();
    return message;
  },
  fromAmino(_: MsgSetModulePausedResponseAmino): MsgSetModulePausedResponse {
    const message = createBaseMsgSetModulePausedResponse();
    return message;
  },
  toAmino(_: MsgSetModulePausedResponse, useInterfaces: boolean = false): MsgSetModulePausedResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetModulePausedResponseAminoMsg): MsgSetModulePausedResponse {
    return MsgSetModulePausedResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetModulePausedResponseProtoMsg, useInterfaces: boolean = false): MsgSetModulePausedResponse {
    return MsgSetModulePausedResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetModulePausedResponse): Uint8Array {
    return MsgSetModulePausedResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetModulePausedResponse): MsgSetModulePausedResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.MsgSetModulePausedResponse",
      value: MsgSetModulePausedResponse.encode(message).finish()
    };
  }
};