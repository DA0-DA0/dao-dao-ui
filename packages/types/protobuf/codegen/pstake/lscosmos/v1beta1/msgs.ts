import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { AllowListedValidators, AllowListedValidatorsAmino, AllowListedValidatorsSDKType, PstakeParams, PstakeParamsAmino, PstakeParamsSDKType, HostAccounts, HostAccountsAmino, HostAccountsSDKType } from "./lscosmos";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface MsgLiquidStake {
  delegatorAddress: string;
  amount: Coin | undefined;
}
export interface MsgLiquidStakeProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidStake";
  value: Uint8Array;
}
export interface MsgLiquidStakeAmino {
  delegator_address?: string;
  amount?: CoinAmino | undefined;
}
export interface MsgLiquidStakeAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgLiquidStake";
  value: MsgLiquidStakeAmino;
}
export interface MsgLiquidStakeSDKType {
  delegator_address: string;
  amount: CoinSDKType | undefined;
}
export interface MsgLiquidStakeResponse {}
export interface MsgLiquidStakeResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidStakeResponse";
  value: Uint8Array;
}
export interface MsgLiquidStakeResponseAmino {}
export interface MsgLiquidStakeResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgLiquidStakeResponse";
  value: MsgLiquidStakeResponseAmino;
}
export interface MsgLiquidStakeResponseSDKType {}
export interface MsgLiquidUnstake {
  delegatorAddress: string;
  amount: Coin | undefined;
}
export interface MsgLiquidUnstakeProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidUnstake";
  value: Uint8Array;
}
export interface MsgLiquidUnstakeAmino {
  delegator_address?: string;
  amount?: CoinAmino | undefined;
}
export interface MsgLiquidUnstakeAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgLiquidUnstake";
  value: MsgLiquidUnstakeAmino;
}
export interface MsgLiquidUnstakeSDKType {
  delegator_address: string;
  amount: CoinSDKType | undefined;
}
export interface MsgLiquidUnstakeResponse {}
export interface MsgLiquidUnstakeResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidUnstakeResponse";
  value: Uint8Array;
}
export interface MsgLiquidUnstakeResponseAmino {}
export interface MsgLiquidUnstakeResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgLiquidUnstakeResponse";
  value: MsgLiquidUnstakeResponseAmino;
}
export interface MsgLiquidUnstakeResponseSDKType {}
export interface MsgRedeem {
  delegatorAddress: string;
  amount: Coin | undefined;
}
export interface MsgRedeemProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgRedeem";
  value: Uint8Array;
}
export interface MsgRedeemAmino {
  delegator_address?: string;
  amount?: CoinAmino | undefined;
}
export interface MsgRedeemAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgRedeem";
  value: MsgRedeemAmino;
}
export interface MsgRedeemSDKType {
  delegator_address: string;
  amount: CoinSDKType | undefined;
}
export interface MsgRedeemResponse {}
export interface MsgRedeemResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgRedeemResponse";
  value: Uint8Array;
}
export interface MsgRedeemResponseAmino {}
export interface MsgRedeemResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgRedeemResponse";
  value: MsgRedeemResponseAmino;
}
export interface MsgRedeemResponseSDKType {}
export interface MsgClaim {
  delegatorAddress: string;
}
export interface MsgClaimProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgClaim";
  value: Uint8Array;
}
export interface MsgClaimAmino {
  delegator_address?: string;
}
export interface MsgClaimAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgClaim";
  value: MsgClaimAmino;
}
export interface MsgClaimSDKType {
  delegator_address: string;
}
export interface MsgClaimResponse {}
export interface MsgClaimResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgClaimResponse";
  value: Uint8Array;
}
export interface MsgClaimResponseAmino {}
export interface MsgClaimResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgClaimResponse";
  value: MsgClaimResponseAmino;
}
export interface MsgClaimResponseSDKType {}
export interface MsgRecreateICA {
  fromAddress: string;
}
export interface MsgRecreateICAProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgRecreateICA";
  value: Uint8Array;
}
export interface MsgRecreateICAAmino {
  from_address?: string;
}
export interface MsgRecreateICAAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgRecreateICA";
  value: MsgRecreateICAAmino;
}
export interface MsgRecreateICASDKType {
  from_address: string;
}
export interface MsgRecreateICAResponse {}
export interface MsgRecreateICAResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgRecreateICAResponse";
  value: Uint8Array;
}
export interface MsgRecreateICAResponseAmino {}
export interface MsgRecreateICAResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgRecreateICAResponse";
  value: MsgRecreateICAResponseAmino;
}
export interface MsgRecreateICAResponseSDKType {}
export interface MsgJumpStart {
  pstakeAddress: string;
  chainID: string;
  connectionID: string;
  transferChannel: string;
  transferPort: string;
  baseDenom: string;
  mintDenom: string;
  minDeposit: string;
  allowListedValidators: AllowListedValidators | undefined;
  pstakeParams: PstakeParams | undefined;
  hostAccounts: HostAccounts | undefined;
}
export interface MsgJumpStartProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgJumpStart";
  value: Uint8Array;
}
export interface MsgJumpStartAmino {
  pstake_address?: string;
  chain_i_d?: string;
  connection_i_d?: string;
  transfer_channel?: string;
  transfer_port?: string;
  base_denom?: string;
  mint_denom?: string;
  min_deposit?: string;
  allow_listed_validators?: AllowListedValidatorsAmino | undefined;
  pstake_params?: PstakeParamsAmino | undefined;
  host_accounts?: HostAccountsAmino | undefined;
}
export interface MsgJumpStartAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgJumpStart";
  value: MsgJumpStartAmino;
}
export interface MsgJumpStartSDKType {
  pstake_address: string;
  chain_i_d: string;
  connection_i_d: string;
  transfer_channel: string;
  transfer_port: string;
  base_denom: string;
  mint_denom: string;
  min_deposit: string;
  allow_listed_validators: AllowListedValidatorsSDKType | undefined;
  pstake_params: PstakeParamsSDKType | undefined;
  host_accounts: HostAccountsSDKType | undefined;
}
export interface MsgJumpStartResponse {}
export interface MsgJumpStartResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgJumpStartResponse";
  value: Uint8Array;
}
export interface MsgJumpStartResponseAmino {}
export interface MsgJumpStartResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgJumpStartResponse";
  value: MsgJumpStartResponseAmino;
}
export interface MsgJumpStartResponseSDKType {}
export interface MsgChangeModuleState {
  pstakeAddress: string;
  moduleState: boolean;
}
export interface MsgChangeModuleStateProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgChangeModuleState";
  value: Uint8Array;
}
export interface MsgChangeModuleStateAmino {
  pstake_address?: string;
  module_state?: boolean;
}
export interface MsgChangeModuleStateAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgChangeModuleState";
  value: MsgChangeModuleStateAmino;
}
export interface MsgChangeModuleStateSDKType {
  pstake_address: string;
  module_state: boolean;
}
export interface MsgChangeModuleStateResponse {}
export interface MsgChangeModuleStateResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgChangeModuleStateResponse";
  value: Uint8Array;
}
export interface MsgChangeModuleStateResponseAmino {}
export interface MsgChangeModuleStateResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgChangeModuleStateResponse";
  value: MsgChangeModuleStateResponseAmino;
}
export interface MsgChangeModuleStateResponseSDKType {}
export interface MsgReportSlashing {
  pstakeAddress: string;
  validatorAddress: string;
}
export interface MsgReportSlashingProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgReportSlashing";
  value: Uint8Array;
}
export interface MsgReportSlashingAmino {
  pstake_address?: string;
  validator_address?: string;
}
export interface MsgReportSlashingAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgReportSlashing";
  value: MsgReportSlashingAmino;
}
export interface MsgReportSlashingSDKType {
  pstake_address: string;
  validator_address: string;
}
export interface MsgReportSlashingResponse {}
export interface MsgReportSlashingResponseProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgReportSlashingResponse";
  value: Uint8Array;
}
export interface MsgReportSlashingResponseAmino {}
export interface MsgReportSlashingResponseAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MsgReportSlashingResponse";
  value: MsgReportSlashingResponseAmino;
}
export interface MsgReportSlashingResponseSDKType {}
function createBaseMsgLiquidStake(): MsgLiquidStake {
  return {
    delegatorAddress: "",
    amount: Coin.fromPartial({})
  };
}
export const MsgLiquidStake = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidStake",
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
    obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
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
      typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidStake",
      value: MsgLiquidStake.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidStakeResponse(): MsgLiquidStakeResponse {
  return {};
}
export const MsgLiquidStakeResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidStakeResponse",
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
      typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidStakeResponse",
      value: MsgLiquidStakeResponse.encode(message).finish()
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
  typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidUnstake",
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
    obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
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
      typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidUnstake",
      value: MsgLiquidUnstake.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidUnstakeResponse(): MsgLiquidUnstakeResponse {
  return {};
}
export const MsgLiquidUnstakeResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidUnstakeResponse",
  encode(_: MsgLiquidUnstakeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLiquidUnstakeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidUnstakeResponse();
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
  fromPartial(_: Partial<MsgLiquidUnstakeResponse>): MsgLiquidUnstakeResponse {
    const message = createBaseMsgLiquidUnstakeResponse();
    return message;
  },
  fromAmino(_: MsgLiquidUnstakeResponseAmino): MsgLiquidUnstakeResponse {
    const message = createBaseMsgLiquidUnstakeResponse();
    return message;
  },
  toAmino(_: MsgLiquidUnstakeResponse, useInterfaces: boolean = false): MsgLiquidUnstakeResponseAmino {
    const obj: any = {};
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
      typeUrl: "/pstake.lscosmos.v1beta1.MsgLiquidUnstakeResponse",
      value: MsgLiquidUnstakeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRedeem(): MsgRedeem {
  return {
    delegatorAddress: "",
    amount: Coin.fromPartial({})
  };
}
export const MsgRedeem = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgRedeem",
  encode(message: MsgRedeem, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRedeem {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRedeem();
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
  fromPartial(object: Partial<MsgRedeem>): MsgRedeem {
    const message = createBaseMsgRedeem();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: MsgRedeemAmino): MsgRedeem {
    const message = createBaseMsgRedeem();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: MsgRedeem, useInterfaces: boolean = false): MsgRedeemAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRedeemAminoMsg): MsgRedeem {
    return MsgRedeem.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRedeemProtoMsg, useInterfaces: boolean = false): MsgRedeem {
    return MsgRedeem.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRedeem): Uint8Array {
    return MsgRedeem.encode(message).finish();
  },
  toProtoMsg(message: MsgRedeem): MsgRedeemProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.MsgRedeem",
      value: MsgRedeem.encode(message).finish()
    };
  }
};
function createBaseMsgRedeemResponse(): MsgRedeemResponse {
  return {};
}
export const MsgRedeemResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgRedeemResponse",
  encode(_: MsgRedeemResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRedeemResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRedeemResponse();
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
  fromPartial(_: Partial<MsgRedeemResponse>): MsgRedeemResponse {
    const message = createBaseMsgRedeemResponse();
    return message;
  },
  fromAmino(_: MsgRedeemResponseAmino): MsgRedeemResponse {
    const message = createBaseMsgRedeemResponse();
    return message;
  },
  toAmino(_: MsgRedeemResponse, useInterfaces: boolean = false): MsgRedeemResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRedeemResponseAminoMsg): MsgRedeemResponse {
    return MsgRedeemResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRedeemResponseProtoMsg, useInterfaces: boolean = false): MsgRedeemResponse {
    return MsgRedeemResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRedeemResponse): Uint8Array {
    return MsgRedeemResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRedeemResponse): MsgRedeemResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.MsgRedeemResponse",
      value: MsgRedeemResponse.encode(message).finish()
    };
  }
};
function createBaseMsgClaim(): MsgClaim {
  return {
    delegatorAddress: ""
  };
}
export const MsgClaim = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgClaim",
  encode(message: MsgClaim, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgClaim {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaim();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgClaim>): MsgClaim {
    const message = createBaseMsgClaim();
    message.delegatorAddress = object.delegatorAddress ?? "";
    return message;
  },
  fromAmino(object: MsgClaimAmino): MsgClaim {
    const message = createBaseMsgClaim();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    return message;
  },
  toAmino(message: MsgClaim, useInterfaces: boolean = false): MsgClaimAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress === "" ? undefined : message.delegatorAddress;
    return obj;
  },
  fromAminoMsg(object: MsgClaimAminoMsg): MsgClaim {
    return MsgClaim.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgClaimProtoMsg, useInterfaces: boolean = false): MsgClaim {
    return MsgClaim.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgClaim): Uint8Array {
    return MsgClaim.encode(message).finish();
  },
  toProtoMsg(message: MsgClaim): MsgClaimProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.MsgClaim",
      value: MsgClaim.encode(message).finish()
    };
  }
};
function createBaseMsgClaimResponse(): MsgClaimResponse {
  return {};
}
export const MsgClaimResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgClaimResponse",
  encode(_: MsgClaimResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgClaimResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimResponse();
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
  fromPartial(_: Partial<MsgClaimResponse>): MsgClaimResponse {
    const message = createBaseMsgClaimResponse();
    return message;
  },
  fromAmino(_: MsgClaimResponseAmino): MsgClaimResponse {
    const message = createBaseMsgClaimResponse();
    return message;
  },
  toAmino(_: MsgClaimResponse, useInterfaces: boolean = false): MsgClaimResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgClaimResponseAminoMsg): MsgClaimResponse {
    return MsgClaimResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgClaimResponseProtoMsg, useInterfaces: boolean = false): MsgClaimResponse {
    return MsgClaimResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgClaimResponse): Uint8Array {
    return MsgClaimResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgClaimResponse): MsgClaimResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.MsgClaimResponse",
      value: MsgClaimResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRecreateICA(): MsgRecreateICA {
  return {
    fromAddress: ""
  };
}
export const MsgRecreateICA = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgRecreateICA",
  encode(message: MsgRecreateICA, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.fromAddress !== "") {
      writer.uint32(10).string(message.fromAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRecreateICA {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecreateICA();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fromAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRecreateICA>): MsgRecreateICA {
    const message = createBaseMsgRecreateICA();
    message.fromAddress = object.fromAddress ?? "";
    return message;
  },
  fromAmino(object: MsgRecreateICAAmino): MsgRecreateICA {
    const message = createBaseMsgRecreateICA();
    if (object.from_address !== undefined && object.from_address !== null) {
      message.fromAddress = object.from_address;
    }
    return message;
  },
  toAmino(message: MsgRecreateICA, useInterfaces: boolean = false): MsgRecreateICAAmino {
    const obj: any = {};
    obj.from_address = message.fromAddress === "" ? undefined : message.fromAddress;
    return obj;
  },
  fromAminoMsg(object: MsgRecreateICAAminoMsg): MsgRecreateICA {
    return MsgRecreateICA.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRecreateICAProtoMsg, useInterfaces: boolean = false): MsgRecreateICA {
    return MsgRecreateICA.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRecreateICA): Uint8Array {
    return MsgRecreateICA.encode(message).finish();
  },
  toProtoMsg(message: MsgRecreateICA): MsgRecreateICAProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.MsgRecreateICA",
      value: MsgRecreateICA.encode(message).finish()
    };
  }
};
function createBaseMsgRecreateICAResponse(): MsgRecreateICAResponse {
  return {};
}
export const MsgRecreateICAResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgRecreateICAResponse",
  encode(_: MsgRecreateICAResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRecreateICAResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecreateICAResponse();
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
  fromPartial(_: Partial<MsgRecreateICAResponse>): MsgRecreateICAResponse {
    const message = createBaseMsgRecreateICAResponse();
    return message;
  },
  fromAmino(_: MsgRecreateICAResponseAmino): MsgRecreateICAResponse {
    const message = createBaseMsgRecreateICAResponse();
    return message;
  },
  toAmino(_: MsgRecreateICAResponse, useInterfaces: boolean = false): MsgRecreateICAResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRecreateICAResponseAminoMsg): MsgRecreateICAResponse {
    return MsgRecreateICAResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRecreateICAResponseProtoMsg, useInterfaces: boolean = false): MsgRecreateICAResponse {
    return MsgRecreateICAResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRecreateICAResponse): Uint8Array {
    return MsgRecreateICAResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRecreateICAResponse): MsgRecreateICAResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.MsgRecreateICAResponse",
      value: MsgRecreateICAResponse.encode(message).finish()
    };
  }
};
function createBaseMsgJumpStart(): MsgJumpStart {
  return {
    pstakeAddress: "",
    chainID: "",
    connectionID: "",
    transferChannel: "",
    transferPort: "",
    baseDenom: "",
    mintDenom: "",
    minDeposit: "",
    allowListedValidators: AllowListedValidators.fromPartial({}),
    pstakeParams: PstakeParams.fromPartial({}),
    hostAccounts: HostAccounts.fromPartial({})
  };
}
export const MsgJumpStart = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgJumpStart",
  encode(message: MsgJumpStart, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pstakeAddress !== "") {
      writer.uint32(10).string(message.pstakeAddress);
    }
    if (message.chainID !== "") {
      writer.uint32(18).string(message.chainID);
    }
    if (message.connectionID !== "") {
      writer.uint32(26).string(message.connectionID);
    }
    if (message.transferChannel !== "") {
      writer.uint32(34).string(message.transferChannel);
    }
    if (message.transferPort !== "") {
      writer.uint32(42).string(message.transferPort);
    }
    if (message.baseDenom !== "") {
      writer.uint32(50).string(message.baseDenom);
    }
    if (message.mintDenom !== "") {
      writer.uint32(58).string(message.mintDenom);
    }
    if (message.minDeposit !== "") {
      writer.uint32(66).string(message.minDeposit);
    }
    if (message.allowListedValidators !== undefined) {
      AllowListedValidators.encode(message.allowListedValidators, writer.uint32(74).fork()).ldelim();
    }
    if (message.pstakeParams !== undefined) {
      PstakeParams.encode(message.pstakeParams, writer.uint32(82).fork()).ldelim();
    }
    if (message.hostAccounts !== undefined) {
      HostAccounts.encode(message.hostAccounts, writer.uint32(90).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgJumpStart {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgJumpStart();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pstakeAddress = reader.string();
          break;
        case 2:
          message.chainID = reader.string();
          break;
        case 3:
          message.connectionID = reader.string();
          break;
        case 4:
          message.transferChannel = reader.string();
          break;
        case 5:
          message.transferPort = reader.string();
          break;
        case 6:
          message.baseDenom = reader.string();
          break;
        case 7:
          message.mintDenom = reader.string();
          break;
        case 8:
          message.minDeposit = reader.string();
          break;
        case 9:
          message.allowListedValidators = AllowListedValidators.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 10:
          message.pstakeParams = PstakeParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 11:
          message.hostAccounts = HostAccounts.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgJumpStart>): MsgJumpStart {
    const message = createBaseMsgJumpStart();
    message.pstakeAddress = object.pstakeAddress ?? "";
    message.chainID = object.chainID ?? "";
    message.connectionID = object.connectionID ?? "";
    message.transferChannel = object.transferChannel ?? "";
    message.transferPort = object.transferPort ?? "";
    message.baseDenom = object.baseDenom ?? "";
    message.mintDenom = object.mintDenom ?? "";
    message.minDeposit = object.minDeposit ?? "";
    message.allowListedValidators = object.allowListedValidators !== undefined && object.allowListedValidators !== null ? AllowListedValidators.fromPartial(object.allowListedValidators) : undefined;
    message.pstakeParams = object.pstakeParams !== undefined && object.pstakeParams !== null ? PstakeParams.fromPartial(object.pstakeParams) : undefined;
    message.hostAccounts = object.hostAccounts !== undefined && object.hostAccounts !== null ? HostAccounts.fromPartial(object.hostAccounts) : undefined;
    return message;
  },
  fromAmino(object: MsgJumpStartAmino): MsgJumpStart {
    const message = createBaseMsgJumpStart();
    if (object.pstake_address !== undefined && object.pstake_address !== null) {
      message.pstakeAddress = object.pstake_address;
    }
    if (object.chain_i_d !== undefined && object.chain_i_d !== null) {
      message.chainID = object.chain_i_d;
    }
    if (object.connection_i_d !== undefined && object.connection_i_d !== null) {
      message.connectionID = object.connection_i_d;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    if (object.transfer_port !== undefined && object.transfer_port !== null) {
      message.transferPort = object.transfer_port;
    }
    if (object.base_denom !== undefined && object.base_denom !== null) {
      message.baseDenom = object.base_denom;
    }
    if (object.mint_denom !== undefined && object.mint_denom !== null) {
      message.mintDenom = object.mint_denom;
    }
    if (object.min_deposit !== undefined && object.min_deposit !== null) {
      message.minDeposit = object.min_deposit;
    }
    if (object.allow_listed_validators !== undefined && object.allow_listed_validators !== null) {
      message.allowListedValidators = AllowListedValidators.fromAmino(object.allow_listed_validators);
    }
    if (object.pstake_params !== undefined && object.pstake_params !== null) {
      message.pstakeParams = PstakeParams.fromAmino(object.pstake_params);
    }
    if (object.host_accounts !== undefined && object.host_accounts !== null) {
      message.hostAccounts = HostAccounts.fromAmino(object.host_accounts);
    }
    return message;
  },
  toAmino(message: MsgJumpStart, useInterfaces: boolean = false): MsgJumpStartAmino {
    const obj: any = {};
    obj.pstake_address = message.pstakeAddress === "" ? undefined : message.pstakeAddress;
    obj.chain_i_d = message.chainID === "" ? undefined : message.chainID;
    obj.connection_i_d = message.connectionID === "" ? undefined : message.connectionID;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    obj.transfer_port = message.transferPort === "" ? undefined : message.transferPort;
    obj.base_denom = message.baseDenom === "" ? undefined : message.baseDenom;
    obj.mint_denom = message.mintDenom === "" ? undefined : message.mintDenom;
    obj.min_deposit = message.minDeposit === "" ? undefined : message.minDeposit;
    obj.allow_listed_validators = message.allowListedValidators ? AllowListedValidators.toAmino(message.allowListedValidators, useInterfaces) : undefined;
    obj.pstake_params = message.pstakeParams ? PstakeParams.toAmino(message.pstakeParams, useInterfaces) : undefined;
    obj.host_accounts = message.hostAccounts ? HostAccounts.toAmino(message.hostAccounts, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgJumpStartAminoMsg): MsgJumpStart {
    return MsgJumpStart.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgJumpStartProtoMsg, useInterfaces: boolean = false): MsgJumpStart {
    return MsgJumpStart.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgJumpStart): Uint8Array {
    return MsgJumpStart.encode(message).finish();
  },
  toProtoMsg(message: MsgJumpStart): MsgJumpStartProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.MsgJumpStart",
      value: MsgJumpStart.encode(message).finish()
    };
  }
};
function createBaseMsgJumpStartResponse(): MsgJumpStartResponse {
  return {};
}
export const MsgJumpStartResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgJumpStartResponse",
  encode(_: MsgJumpStartResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgJumpStartResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgJumpStartResponse();
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
  fromPartial(_: Partial<MsgJumpStartResponse>): MsgJumpStartResponse {
    const message = createBaseMsgJumpStartResponse();
    return message;
  },
  fromAmino(_: MsgJumpStartResponseAmino): MsgJumpStartResponse {
    const message = createBaseMsgJumpStartResponse();
    return message;
  },
  toAmino(_: MsgJumpStartResponse, useInterfaces: boolean = false): MsgJumpStartResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgJumpStartResponseAminoMsg): MsgJumpStartResponse {
    return MsgJumpStartResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgJumpStartResponseProtoMsg, useInterfaces: boolean = false): MsgJumpStartResponse {
    return MsgJumpStartResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgJumpStartResponse): Uint8Array {
    return MsgJumpStartResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgJumpStartResponse): MsgJumpStartResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.MsgJumpStartResponse",
      value: MsgJumpStartResponse.encode(message).finish()
    };
  }
};
function createBaseMsgChangeModuleState(): MsgChangeModuleState {
  return {
    pstakeAddress: "",
    moduleState: false
  };
}
export const MsgChangeModuleState = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgChangeModuleState",
  encode(message: MsgChangeModuleState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pstakeAddress !== "") {
      writer.uint32(10).string(message.pstakeAddress);
    }
    if (message.moduleState === true) {
      writer.uint32(16).bool(message.moduleState);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgChangeModuleState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChangeModuleState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pstakeAddress = reader.string();
          break;
        case 2:
          message.moduleState = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgChangeModuleState>): MsgChangeModuleState {
    const message = createBaseMsgChangeModuleState();
    message.pstakeAddress = object.pstakeAddress ?? "";
    message.moduleState = object.moduleState ?? false;
    return message;
  },
  fromAmino(object: MsgChangeModuleStateAmino): MsgChangeModuleState {
    const message = createBaseMsgChangeModuleState();
    if (object.pstake_address !== undefined && object.pstake_address !== null) {
      message.pstakeAddress = object.pstake_address;
    }
    if (object.module_state !== undefined && object.module_state !== null) {
      message.moduleState = object.module_state;
    }
    return message;
  },
  toAmino(message: MsgChangeModuleState, useInterfaces: boolean = false): MsgChangeModuleStateAmino {
    const obj: any = {};
    obj.pstake_address = message.pstakeAddress === "" ? undefined : message.pstakeAddress;
    obj.module_state = message.moduleState === false ? undefined : message.moduleState;
    return obj;
  },
  fromAminoMsg(object: MsgChangeModuleStateAminoMsg): MsgChangeModuleState {
    return MsgChangeModuleState.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgChangeModuleStateProtoMsg, useInterfaces: boolean = false): MsgChangeModuleState {
    return MsgChangeModuleState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgChangeModuleState): Uint8Array {
    return MsgChangeModuleState.encode(message).finish();
  },
  toProtoMsg(message: MsgChangeModuleState): MsgChangeModuleStateProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.MsgChangeModuleState",
      value: MsgChangeModuleState.encode(message).finish()
    };
  }
};
function createBaseMsgChangeModuleStateResponse(): MsgChangeModuleStateResponse {
  return {};
}
export const MsgChangeModuleStateResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgChangeModuleStateResponse",
  encode(_: MsgChangeModuleStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgChangeModuleStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChangeModuleStateResponse();
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
  fromPartial(_: Partial<MsgChangeModuleStateResponse>): MsgChangeModuleStateResponse {
    const message = createBaseMsgChangeModuleStateResponse();
    return message;
  },
  fromAmino(_: MsgChangeModuleStateResponseAmino): MsgChangeModuleStateResponse {
    const message = createBaseMsgChangeModuleStateResponse();
    return message;
  },
  toAmino(_: MsgChangeModuleStateResponse, useInterfaces: boolean = false): MsgChangeModuleStateResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgChangeModuleStateResponseAminoMsg): MsgChangeModuleStateResponse {
    return MsgChangeModuleStateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgChangeModuleStateResponseProtoMsg, useInterfaces: boolean = false): MsgChangeModuleStateResponse {
    return MsgChangeModuleStateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgChangeModuleStateResponse): Uint8Array {
    return MsgChangeModuleStateResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgChangeModuleStateResponse): MsgChangeModuleStateResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.MsgChangeModuleStateResponse",
      value: MsgChangeModuleStateResponse.encode(message).finish()
    };
  }
};
function createBaseMsgReportSlashing(): MsgReportSlashing {
  return {
    pstakeAddress: "",
    validatorAddress: ""
  };
}
export const MsgReportSlashing = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgReportSlashing",
  encode(message: MsgReportSlashing, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pstakeAddress !== "") {
      writer.uint32(10).string(message.pstakeAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgReportSlashing {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReportSlashing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pstakeAddress = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgReportSlashing>): MsgReportSlashing {
    const message = createBaseMsgReportSlashing();
    message.pstakeAddress = object.pstakeAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    return message;
  },
  fromAmino(object: MsgReportSlashingAmino): MsgReportSlashing {
    const message = createBaseMsgReportSlashing();
    if (object.pstake_address !== undefined && object.pstake_address !== null) {
      message.pstakeAddress = object.pstake_address;
    }
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    return message;
  },
  toAmino(message: MsgReportSlashing, useInterfaces: boolean = false): MsgReportSlashingAmino {
    const obj: any = {};
    obj.pstake_address = message.pstakeAddress === "" ? undefined : message.pstakeAddress;
    obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
    return obj;
  },
  fromAminoMsg(object: MsgReportSlashingAminoMsg): MsgReportSlashing {
    return MsgReportSlashing.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgReportSlashingProtoMsg, useInterfaces: boolean = false): MsgReportSlashing {
    return MsgReportSlashing.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgReportSlashing): Uint8Array {
    return MsgReportSlashing.encode(message).finish();
  },
  toProtoMsg(message: MsgReportSlashing): MsgReportSlashingProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.MsgReportSlashing",
      value: MsgReportSlashing.encode(message).finish()
    };
  }
};
function createBaseMsgReportSlashingResponse(): MsgReportSlashingResponse {
  return {};
}
export const MsgReportSlashingResponse = {
  typeUrl: "/pstake.lscosmos.v1beta1.MsgReportSlashingResponse",
  encode(_: MsgReportSlashingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgReportSlashingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReportSlashingResponse();
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
  fromPartial(_: Partial<MsgReportSlashingResponse>): MsgReportSlashingResponse {
    const message = createBaseMsgReportSlashingResponse();
    return message;
  },
  fromAmino(_: MsgReportSlashingResponseAmino): MsgReportSlashingResponse {
    const message = createBaseMsgReportSlashingResponse();
    return message;
  },
  toAmino(_: MsgReportSlashingResponse, useInterfaces: boolean = false): MsgReportSlashingResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgReportSlashingResponseAminoMsg): MsgReportSlashingResponse {
    return MsgReportSlashingResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgReportSlashingResponseProtoMsg, useInterfaces: boolean = false): MsgReportSlashingResponse {
    return MsgReportSlashingResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgReportSlashingResponse): Uint8Array {
    return MsgReportSlashingResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgReportSlashingResponse): MsgReportSlashingResponseProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.MsgReportSlashingResponse",
      value: MsgReportSlashingResponse.encode(message).finish()
    };
  }
};