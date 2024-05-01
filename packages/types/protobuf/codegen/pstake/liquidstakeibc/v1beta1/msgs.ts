import { KVUpdate, KVUpdateAmino, KVUpdateSDKType } from "./liquidstakeibc";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface MsgRegisterHostChain {
  /** authority is the address of the governance account */
  authority: string;
  connectionId: string;
  depositFee: string;
  restakeFee: string;
  unstakeFee: string;
  redemptionFee: string;
  channelId: string;
  portId: string;
  hostDenom: string;
  minimumDeposit: string;
  unbondingFactor: bigint;
  autoCompoundFactor: bigint;
}
export interface MsgRegisterHostChainProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgRegisterHostChain";
  value: Uint8Array;
}
export interface MsgRegisterHostChainAmino {
  /** authority is the address of the governance account */
  authority?: string;
  connection_id?: string;
  deposit_fee?: string;
  restake_fee?: string;
  unstake_fee?: string;
  redemption_fee?: string;
  channel_id?: string;
  port_id?: string;
  host_denom?: string;
  minimum_deposit?: string;
  unbonding_factor?: string;
  auto_compound_factor?: string;
}
export interface MsgRegisterHostChainAminoMsg {
  type: "pstake/MsgRegisterHostChain";
  value: MsgRegisterHostChainAmino;
}
export interface MsgRegisterHostChainSDKType {
  authority: string;
  connection_id: string;
  deposit_fee: string;
  restake_fee: string;
  unstake_fee: string;
  redemption_fee: string;
  channel_id: string;
  port_id: string;
  host_denom: string;
  minimum_deposit: string;
  unbonding_factor: bigint;
  auto_compound_factor: bigint;
}
export interface MsgRegisterHostChainResponse {}
export interface MsgRegisterHostChainResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgRegisterHostChainResponse";
  value: Uint8Array;
}
export interface MsgRegisterHostChainResponseAmino {}
export interface MsgRegisterHostChainResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.MsgRegisterHostChainResponse";
  value: MsgRegisterHostChainResponseAmino;
}
export interface MsgRegisterHostChainResponseSDKType {}
export interface MsgUpdateHostChain {
  /** authority is the address of the governance account */
  authority: string;
  chainId: string;
  updates: KVUpdate[];
}
export interface MsgUpdateHostChainProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgUpdateHostChain";
  value: Uint8Array;
}
export interface MsgUpdateHostChainAmino {
  /** authority is the address of the governance account */
  authority?: string;
  chain_id?: string;
  updates: KVUpdateAmino[];
}
export interface MsgUpdateHostChainAminoMsg {
  type: "pstake/MsgUpdateHostChain";
  value: MsgUpdateHostChainAmino;
}
export interface MsgUpdateHostChainSDKType {
  authority: string;
  chain_id: string;
  updates: KVUpdateSDKType[];
}
export interface MsgUpdateHostChainResponse {}
export interface MsgUpdateHostChainResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgUpdateHostChainResponse";
  value: Uint8Array;
}
export interface MsgUpdateHostChainResponseAmino {}
export interface MsgUpdateHostChainResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.MsgUpdateHostChainResponse";
  value: MsgUpdateHostChainResponseAmino;
}
export interface MsgUpdateHostChainResponseSDKType {}
export interface MsgLiquidStake {
  delegatorAddress: string;
  amount: Coin | undefined;
}
export interface MsgLiquidStakeProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidStake";
  value: Uint8Array;
}
export interface MsgLiquidStakeAmino {
  delegator_address?: string;
  amount?: CoinAmino | undefined;
}
export interface MsgLiquidStakeAminoMsg {
  type: "pstake/MsgLiquidStake";
  value: MsgLiquidStakeAmino;
}
export interface MsgLiquidStakeSDKType {
  delegator_address: string;
  amount: CoinSDKType | undefined;
}
export interface MsgLiquidStakeResponse {}
export interface MsgLiquidStakeResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidStakeResponse";
  value: Uint8Array;
}
export interface MsgLiquidStakeResponseAmino {}
export interface MsgLiquidStakeResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.MsgLiquidStakeResponse";
  value: MsgLiquidStakeResponseAmino;
}
export interface MsgLiquidStakeResponseSDKType {}
export interface MsgLiquidStakeLSM {
  delegatorAddress: string;
  delegations: Coin[];
}
export interface MsgLiquidStakeLSMProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidStakeLSM";
  value: Uint8Array;
}
export interface MsgLiquidStakeLSMAmino {
  delegator_address?: string;
  delegations?: CoinAmino[];
}
export interface MsgLiquidStakeLSMAminoMsg {
  type: "pstake/MsgLiquidStakeLSM";
  value: MsgLiquidStakeLSMAmino;
}
export interface MsgLiquidStakeLSMSDKType {
  delegator_address: string;
  delegations: CoinSDKType[];
}
export interface MsgLiquidStakeLSMResponse {}
export interface MsgLiquidStakeLSMResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidStakeLSMResponse";
  value: Uint8Array;
}
export interface MsgLiquidStakeLSMResponseAmino {}
export interface MsgLiquidStakeLSMResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.MsgLiquidStakeLSMResponse";
  value: MsgLiquidStakeLSMResponseAmino;
}
export interface MsgLiquidStakeLSMResponseSDKType {}
export interface MsgLiquidUnstake {
  delegatorAddress: string;
  amount: Coin | undefined;
}
export interface MsgLiquidUnstakeProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidUnstake";
  value: Uint8Array;
}
export interface MsgLiquidUnstakeAmino {
  delegator_address?: string;
  amount?: CoinAmino | undefined;
}
export interface MsgLiquidUnstakeAminoMsg {
  type: "pstake/MsgLiquidUnstake";
  value: MsgLiquidUnstakeAmino;
}
export interface MsgLiquidUnstakeSDKType {
  delegator_address: string;
  amount: CoinSDKType | undefined;
}
export interface MsgLiquidUnstakeResponse {}
export interface MsgLiquidUnstakeResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidUnstakeResponse";
  value: Uint8Array;
}
export interface MsgLiquidUnstakeResponseAmino {}
export interface MsgLiquidUnstakeResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.MsgLiquidUnstakeResponse";
  value: MsgLiquidUnstakeResponseAmino;
}
export interface MsgLiquidUnstakeResponseSDKType {}
export interface MsgRedeem {
  delegatorAddress: string;
  amount: Coin | undefined;
}
export interface MsgRedeemProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgRedeem";
  value: Uint8Array;
}
export interface MsgRedeemAmino {
  delegator_address?: string;
  amount?: CoinAmino | undefined;
}
export interface MsgRedeemAminoMsg {
  type: "pstake/MsgRedeem";
  value: MsgRedeemAmino;
}
export interface MsgRedeemSDKType {
  delegator_address: string;
  amount: CoinSDKType | undefined;
}
export interface MsgRedeemResponse {}
export interface MsgRedeemResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgRedeemResponse";
  value: Uint8Array;
}
export interface MsgRedeemResponseAmino {}
export interface MsgRedeemResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.MsgRedeemResponse";
  value: MsgRedeemResponseAmino;
}
export interface MsgRedeemResponseSDKType {}
export interface MsgUpdateParams {
  authority: string;
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgUpdateParams";
  value: Uint8Array;
}
export interface MsgUpdateParamsAmino {
  authority?: string;
  params: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "pstake/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
export interface MsgUpdateParamsResponseSDKType {}
function createBaseMsgRegisterHostChain(): MsgRegisterHostChain {
  return {
    authority: "",
    connectionId: "",
    depositFee: "",
    restakeFee: "",
    unstakeFee: "",
    redemptionFee: "",
    channelId: "",
    portId: "",
    hostDenom: "",
    minimumDeposit: "",
    unbondingFactor: BigInt(0),
    autoCompoundFactor: BigInt(0)
  };
}
export const MsgRegisterHostChain = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgRegisterHostChain",
  encode(message: MsgRegisterHostChain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.depositFee !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.depositFee, 18).atomics);
    }
    if (message.restakeFee !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.restakeFee, 18).atomics);
    }
    if (message.unstakeFee !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.unstakeFee, 18).atomics);
    }
    if (message.redemptionFee !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.redemptionFee, 18).atomics);
    }
    if (message.channelId !== "") {
      writer.uint32(58).string(message.channelId);
    }
    if (message.portId !== "") {
      writer.uint32(66).string(message.portId);
    }
    if (message.hostDenom !== "") {
      writer.uint32(74).string(message.hostDenom);
    }
    if (message.minimumDeposit !== "") {
      writer.uint32(82).string(message.minimumDeposit);
    }
    if (message.unbondingFactor !== BigInt(0)) {
      writer.uint32(88).int64(message.unbondingFactor);
    }
    if (message.autoCompoundFactor !== BigInt(0)) {
      writer.uint32(96).int64(message.autoCompoundFactor);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterHostChain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterHostChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.connectionId = reader.string();
          break;
        case 3:
          message.depositFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.restakeFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.unstakeFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.redemptionFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.channelId = reader.string();
          break;
        case 8:
          message.portId = reader.string();
          break;
        case 9:
          message.hostDenom = reader.string();
          break;
        case 10:
          message.minimumDeposit = reader.string();
          break;
        case 11:
          message.unbondingFactor = reader.int64();
          break;
        case 12:
          message.autoCompoundFactor = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRegisterHostChain>): MsgRegisterHostChain {
    const message = createBaseMsgRegisterHostChain();
    message.authority = object.authority ?? "";
    message.connectionId = object.connectionId ?? "";
    message.depositFee = object.depositFee ?? "";
    message.restakeFee = object.restakeFee ?? "";
    message.unstakeFee = object.unstakeFee ?? "";
    message.redemptionFee = object.redemptionFee ?? "";
    message.channelId = object.channelId ?? "";
    message.portId = object.portId ?? "";
    message.hostDenom = object.hostDenom ?? "";
    message.minimumDeposit = object.minimumDeposit ?? "";
    message.unbondingFactor = object.unbondingFactor !== undefined && object.unbondingFactor !== null ? BigInt(object.unbondingFactor.toString()) : BigInt(0);
    message.autoCompoundFactor = object.autoCompoundFactor !== undefined && object.autoCompoundFactor !== null ? BigInt(object.autoCompoundFactor.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgRegisterHostChainAmino): MsgRegisterHostChain {
    const message = createBaseMsgRegisterHostChain();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.deposit_fee !== undefined && object.deposit_fee !== null) {
      message.depositFee = object.deposit_fee;
    }
    if (object.restake_fee !== undefined && object.restake_fee !== null) {
      message.restakeFee = object.restake_fee;
    }
    if (object.unstake_fee !== undefined && object.unstake_fee !== null) {
      message.unstakeFee = object.unstake_fee;
    }
    if (object.redemption_fee !== undefined && object.redemption_fee !== null) {
      message.redemptionFee = object.redemption_fee;
    }
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channelId = object.channel_id;
    }
    if (object.port_id !== undefined && object.port_id !== null) {
      message.portId = object.port_id;
    }
    if (object.host_denom !== undefined && object.host_denom !== null) {
      message.hostDenom = object.host_denom;
    }
    if (object.minimum_deposit !== undefined && object.minimum_deposit !== null) {
      message.minimumDeposit = object.minimum_deposit;
    }
    if (object.unbonding_factor !== undefined && object.unbonding_factor !== null) {
      message.unbondingFactor = BigInt(object.unbonding_factor);
    }
    if (object.auto_compound_factor !== undefined && object.auto_compound_factor !== null) {
      message.autoCompoundFactor = BigInt(object.auto_compound_factor);
    }
    return message;
  },
  toAmino(message: MsgRegisterHostChain, useInterfaces: boolean = false): MsgRegisterHostChainAmino {
    const obj: any = {};
    obj.authority = message.authority;
    obj.connection_id = message.connectionId;
    obj.deposit_fee = message.depositFee;
    obj.restake_fee = message.restakeFee;
    obj.unstake_fee = message.unstakeFee;
    obj.redemption_fee = message.redemptionFee;
    obj.channel_id = message.channelId;
    obj.port_id = message.portId;
    obj.host_denom = message.hostDenom;
    obj.minimum_deposit = message.minimumDeposit;
    obj.unbonding_factor = message.unbondingFactor ? message.unbondingFactor.toString() : undefined;
    obj.auto_compound_factor = message.autoCompoundFactor ? message.autoCompoundFactor.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRegisterHostChainAminoMsg): MsgRegisterHostChain {
    return MsgRegisterHostChain.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRegisterHostChain, useInterfaces: boolean = false): MsgRegisterHostChainAminoMsg {
    return {
      type: "pstake/MsgRegisterHostChain",
      value: MsgRegisterHostChain.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRegisterHostChainProtoMsg, useInterfaces: boolean = false): MsgRegisterHostChain {
    return MsgRegisterHostChain.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterHostChain): Uint8Array {
    return MsgRegisterHostChain.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterHostChain): MsgRegisterHostChainProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgRegisterHostChain",
      value: MsgRegisterHostChain.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterHostChainResponse(): MsgRegisterHostChainResponse {
  return {};
}
export const MsgRegisterHostChainResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgRegisterHostChainResponse",
  encode(_: MsgRegisterHostChainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterHostChainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterHostChainResponse();
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
  fromPartial(_: Partial<MsgRegisterHostChainResponse>): MsgRegisterHostChainResponse {
    const message = createBaseMsgRegisterHostChainResponse();
    return message;
  },
  fromAmino(_: MsgRegisterHostChainResponseAmino): MsgRegisterHostChainResponse {
    const message = createBaseMsgRegisterHostChainResponse();
    return message;
  },
  toAmino(_: MsgRegisterHostChainResponse, useInterfaces: boolean = false): MsgRegisterHostChainResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRegisterHostChainResponseAminoMsg): MsgRegisterHostChainResponse {
    return MsgRegisterHostChainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterHostChainResponseProtoMsg, useInterfaces: boolean = false): MsgRegisterHostChainResponse {
    return MsgRegisterHostChainResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterHostChainResponse): Uint8Array {
    return MsgRegisterHostChainResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterHostChainResponse): MsgRegisterHostChainResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgRegisterHostChainResponse",
      value: MsgRegisterHostChainResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateHostChain(): MsgUpdateHostChain {
  return {
    authority: "",
    chainId: "",
    updates: []
  };
}
export const MsgUpdateHostChain = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgUpdateHostChain",
  encode(message: MsgUpdateHostChain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    for (const v of message.updates) {
      KVUpdate.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateHostChain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateHostChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.updates.push(KVUpdate.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateHostChain>): MsgUpdateHostChain {
    const message = createBaseMsgUpdateHostChain();
    message.authority = object.authority ?? "";
    message.chainId = object.chainId ?? "";
    message.updates = object.updates?.map(e => KVUpdate.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgUpdateHostChainAmino): MsgUpdateHostChain {
    const message = createBaseMsgUpdateHostChain();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    message.updates = object.updates?.map(e => KVUpdate.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgUpdateHostChain, useInterfaces: boolean = false): MsgUpdateHostChainAmino {
    const obj: any = {};
    obj.authority = message.authority;
    obj.chain_id = message.chainId;
    if (message.updates) {
      obj.updates = message.updates.map(e => e ? KVUpdate.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.updates = [];
    }
    return obj;
  },
  fromAminoMsg(object: MsgUpdateHostChainAminoMsg): MsgUpdateHostChain {
    return MsgUpdateHostChain.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateHostChain, useInterfaces: boolean = false): MsgUpdateHostChainAminoMsg {
    return {
      type: "pstake/MsgUpdateHostChain",
      value: MsgUpdateHostChain.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateHostChainProtoMsg, useInterfaces: boolean = false): MsgUpdateHostChain {
    return MsgUpdateHostChain.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateHostChain): Uint8Array {
    return MsgUpdateHostChain.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateHostChain): MsgUpdateHostChainProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgUpdateHostChain",
      value: MsgUpdateHostChain.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateHostChainResponse(): MsgUpdateHostChainResponse {
  return {};
}
export const MsgUpdateHostChainResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgUpdateHostChainResponse",
  encode(_: MsgUpdateHostChainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateHostChainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateHostChainResponse();
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
  fromPartial(_: Partial<MsgUpdateHostChainResponse>): MsgUpdateHostChainResponse {
    const message = createBaseMsgUpdateHostChainResponse();
    return message;
  },
  fromAmino(_: MsgUpdateHostChainResponseAmino): MsgUpdateHostChainResponse {
    const message = createBaseMsgUpdateHostChainResponse();
    return message;
  },
  toAmino(_: MsgUpdateHostChainResponse, useInterfaces: boolean = false): MsgUpdateHostChainResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateHostChainResponseAminoMsg): MsgUpdateHostChainResponse {
    return MsgUpdateHostChainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateHostChainResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateHostChainResponse {
    return MsgUpdateHostChainResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateHostChainResponse): Uint8Array {
    return MsgUpdateHostChainResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateHostChainResponse): MsgUpdateHostChainResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgUpdateHostChainResponse",
      value: MsgUpdateHostChainResponse.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidStake(): MsgLiquidStake {
  return {
    delegatorAddress: "",
    amount: Coin.fromPartial({})
  };
}
export const MsgLiquidStake = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidStake",
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
  toAminoMsg(message: MsgLiquidStake, useInterfaces: boolean = false): MsgLiquidStakeAminoMsg {
    return {
      type: "pstake/MsgLiquidStake",
      value: MsgLiquidStake.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgLiquidStakeProtoMsg, useInterfaces: boolean = false): MsgLiquidStake {
    return MsgLiquidStake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLiquidStake): Uint8Array {
    return MsgLiquidStake.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidStake): MsgLiquidStakeProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidStake",
      value: MsgLiquidStake.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidStakeResponse(): MsgLiquidStakeResponse {
  return {};
}
export const MsgLiquidStakeResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidStakeResponse",
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
      typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidStakeResponse",
      value: MsgLiquidStakeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidStakeLSM(): MsgLiquidStakeLSM {
  return {
    delegatorAddress: "",
    delegations: []
  };
}
export const MsgLiquidStakeLSM = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidStakeLSM",
  encode(message: MsgLiquidStakeLSM, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    for (const v of message.delegations) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLiquidStakeLSM {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidStakeLSM();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        case 2:
          message.delegations.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLiquidStakeLSM>): MsgLiquidStakeLSM {
    const message = createBaseMsgLiquidStakeLSM();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.delegations = object.delegations?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgLiquidStakeLSMAmino): MsgLiquidStakeLSM {
    const message = createBaseMsgLiquidStakeLSM();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    message.delegations = object.delegations?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgLiquidStakeLSM, useInterfaces: boolean = false): MsgLiquidStakeLSMAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress;
    if (message.delegations) {
      obj.delegations = message.delegations.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.delegations = [];
    }
    return obj;
  },
  fromAminoMsg(object: MsgLiquidStakeLSMAminoMsg): MsgLiquidStakeLSM {
    return MsgLiquidStakeLSM.fromAmino(object.value);
  },
  toAminoMsg(message: MsgLiquidStakeLSM, useInterfaces: boolean = false): MsgLiquidStakeLSMAminoMsg {
    return {
      type: "pstake/MsgLiquidStakeLSM",
      value: MsgLiquidStakeLSM.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgLiquidStakeLSMProtoMsg, useInterfaces: boolean = false): MsgLiquidStakeLSM {
    return MsgLiquidStakeLSM.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLiquidStakeLSM): Uint8Array {
    return MsgLiquidStakeLSM.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidStakeLSM): MsgLiquidStakeLSMProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidStakeLSM",
      value: MsgLiquidStakeLSM.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidStakeLSMResponse(): MsgLiquidStakeLSMResponse {
  return {};
}
export const MsgLiquidStakeLSMResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidStakeLSMResponse",
  encode(_: MsgLiquidStakeLSMResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLiquidStakeLSMResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidStakeLSMResponse();
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
  fromPartial(_: Partial<MsgLiquidStakeLSMResponse>): MsgLiquidStakeLSMResponse {
    const message = createBaseMsgLiquidStakeLSMResponse();
    return message;
  },
  fromAmino(_: MsgLiquidStakeLSMResponseAmino): MsgLiquidStakeLSMResponse {
    const message = createBaseMsgLiquidStakeLSMResponse();
    return message;
  },
  toAmino(_: MsgLiquidStakeLSMResponse, useInterfaces: boolean = false): MsgLiquidStakeLSMResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgLiquidStakeLSMResponseAminoMsg): MsgLiquidStakeLSMResponse {
    return MsgLiquidStakeLSMResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLiquidStakeLSMResponseProtoMsg, useInterfaces: boolean = false): MsgLiquidStakeLSMResponse {
    return MsgLiquidStakeLSMResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLiquidStakeLSMResponse): Uint8Array {
    return MsgLiquidStakeLSMResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidStakeLSMResponse): MsgLiquidStakeLSMResponseProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidStakeLSMResponse",
      value: MsgLiquidStakeLSMResponse.encode(message).finish()
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
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidUnstake",
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
  toAminoMsg(message: MsgLiquidUnstake, useInterfaces: boolean = false): MsgLiquidUnstakeAminoMsg {
    return {
      type: "pstake/MsgLiquidUnstake",
      value: MsgLiquidUnstake.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgLiquidUnstakeProtoMsg, useInterfaces: boolean = false): MsgLiquidUnstake {
    return MsgLiquidUnstake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLiquidUnstake): Uint8Array {
    return MsgLiquidUnstake.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidUnstake): MsgLiquidUnstakeProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidUnstake",
      value: MsgLiquidUnstake.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidUnstakeResponse(): MsgLiquidUnstakeResponse {
  return {};
}
export const MsgLiquidUnstakeResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidUnstakeResponse",
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
      typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgLiquidUnstakeResponse",
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
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgRedeem",
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
    obj.delegator_address = message.delegatorAddress;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRedeemAminoMsg): MsgRedeem {
    return MsgRedeem.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRedeem, useInterfaces: boolean = false): MsgRedeemAminoMsg {
    return {
      type: "pstake/MsgRedeem",
      value: MsgRedeem.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRedeemProtoMsg, useInterfaces: boolean = false): MsgRedeem {
    return MsgRedeem.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRedeem): Uint8Array {
    return MsgRedeem.encode(message).finish();
  },
  toProtoMsg(message: MsgRedeem): MsgRedeemProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgRedeem",
      value: MsgRedeem.encode(message).finish()
    };
  }
};
function createBaseMsgRedeemResponse(): MsgRedeemResponse {
  return {};
}
export const MsgRedeemResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgRedeemResponse",
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
      typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgRedeemResponse",
      value: MsgRedeemResponse.encode(message).finish()
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
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgUpdateParams",
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
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : Params.fromPartial({});
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAminoMsg {
    return {
      type: "pstake/MsgUpdateParams",
      value: MsgUpdateParams.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg, useInterfaces: boolean = false): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgUpdateParamsResponse",
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
      typeUrl: "/pstake.liquidstakeibc.v1beta1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};