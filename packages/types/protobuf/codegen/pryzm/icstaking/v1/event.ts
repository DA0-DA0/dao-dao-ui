import { HostChain, HostChainAmino, HostChainSDKType, HostChainState, HostChainStateAmino, HostChainStateSDKType } from "./host_chain";
import { Params, ParamsAmino, ParamsSDKType, Height, HeightAmino, HeightSDKType } from "../../../ibc/core/client/v1/client";
import { Undelegation, UndelegationAmino, UndelegationSDKType, ChannelUndelegation, ChannelUndelegationAmino, ChannelUndelegationSDKType } from "./undelegation";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { MultiSigConnection, MultiSigConnectionAmino, MultiSigConnectionSDKType, MultiSigPacket, MultiSigPacketAmino, MultiSigPacketSDKType, Acknowledgement, AcknowledgementAmino, AcknowledgementSDKType } from "./multisig";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface EventSetHostChain {
  hostChain: HostChain | undefined;
}
export interface EventSetHostChainProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.EventSetHostChain";
  value: Uint8Array;
}
export interface EventSetHostChainAmino {
  host_chain?: HostChainAmino | undefined;
}
export interface EventSetHostChainAminoMsg {
  type: "/pryzm.icstaking.v1.EventSetHostChain";
  value: EventSetHostChainAmino;
}
export interface EventSetHostChainSDKType {
  host_chain: HostChainSDKType | undefined;
}
export interface EventSetHostChainState {
  hostChainState: HostChainState | undefined;
}
export interface EventSetHostChainStateProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.EventSetHostChainState";
  value: Uint8Array;
}
export interface EventSetHostChainStateAmino {
  host_chain_state?: HostChainStateAmino | undefined;
}
export interface EventSetHostChainStateAminoMsg {
  type: "/pryzm.icstaking.v1.EventSetHostChainState";
  value: EventSetHostChainStateAmino;
}
export interface EventSetHostChainStateSDKType {
  host_chain_state: HostChainStateSDKType | undefined;
}
export interface EventSetParams {
  params: Params | undefined;
}
export interface EventSetParamsProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.EventSetParams";
  value: Uint8Array;
}
export interface EventSetParamsAmino {
  params?: ParamsAmino | undefined;
}
export interface EventSetParamsAminoMsg {
  type: "/pryzm.icstaking.v1.EventSetParams";
  value: EventSetParamsAmino;
}
export interface EventSetParamsSDKType {
  params: ParamsSDKType | undefined;
}
export interface EventSetUndelegation {
  undelegation: Undelegation | undefined;
}
export interface EventSetUndelegationProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.EventSetUndelegation";
  value: Uint8Array;
}
export interface EventSetUndelegationAmino {
  undelegation?: UndelegationAmino | undefined;
}
export interface EventSetUndelegationAminoMsg {
  type: "/pryzm.icstaking.v1.EventSetUndelegation";
  value: EventSetUndelegationAmino;
}
export interface EventSetUndelegationSDKType {
  undelegation: UndelegationSDKType | undefined;
}
export interface EventSetChannelUndelegation {
  channelUndelegation: ChannelUndelegation | undefined;
}
export interface EventSetChannelUndelegationProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.EventSetChannelUndelegation";
  value: Uint8Array;
}
export interface EventSetChannelUndelegationAmino {
  channel_undelegation?: ChannelUndelegationAmino | undefined;
}
export interface EventSetChannelUndelegationAminoMsg {
  type: "/pryzm.icstaking.v1.EventSetChannelUndelegation";
  value: EventSetChannelUndelegationAmino;
}
export interface EventSetChannelUndelegationSDKType {
  channel_undelegation: ChannelUndelegationSDKType | undefined;
}
export interface EventStake {
  creator: string;
  hostChain: string;
  transferChannel: string;
  amount: string;
  fee: Coin | undefined;
  cAmount: Coin | undefined;
}
export interface EventStakeProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.EventStake";
  value: Uint8Array;
}
export interface EventStakeAmino {
  creator?: string;
  host_chain?: string;
  transfer_channel?: string;
  amount?: string;
  fee?: CoinAmino | undefined;
  c_amount?: CoinAmino | undefined;
}
export interface EventStakeAminoMsg {
  type: "/pryzm.icstaking.v1.EventStake";
  value: EventStakeAmino;
}
export interface EventStakeSDKType {
  creator: string;
  host_chain: string;
  transfer_channel: string;
  amount: string;
  fee: CoinSDKType | undefined;
  c_amount: CoinSDKType | undefined;
}
export interface EventStakeLsmShares {
  creator: string;
  hostChain: string;
  transferChannel: string;
  lsmDenom: string;
  amount: string;
  fee: Coin | undefined;
  cAmount: Coin | undefined;
}
export interface EventStakeLsmSharesProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.EventStakeLsmShares";
  value: Uint8Array;
}
export interface EventStakeLsmSharesAmino {
  creator?: string;
  host_chain?: string;
  transfer_channel?: string;
  lsm_denom?: string;
  amount?: string;
  fee?: CoinAmino | undefined;
  c_amount?: CoinAmino | undefined;
}
export interface EventStakeLsmSharesAminoMsg {
  type: "/pryzm.icstaking.v1.EventStakeLsmShares";
  value: EventStakeLsmSharesAmino;
}
export interface EventStakeLsmSharesSDKType {
  creator: string;
  host_chain: string;
  transfer_channel: string;
  lsm_denom: string;
  amount: string;
  fee: CoinSDKType | undefined;
  c_amount: CoinSDKType | undefined;
}
export interface EventUnstake {
  creator: string;
  hostChain: string;
  transferChannel: string;
  cAmount: string;
  uAmount: Coin | undefined;
}
export interface EventUnstakeProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.EventUnstake";
  value: Uint8Array;
}
export interface EventUnstakeAmino {
  creator?: string;
  host_chain?: string;
  transfer_channel?: string;
  c_amount?: string;
  u_amount?: CoinAmino | undefined;
}
export interface EventUnstakeAminoMsg {
  type: "/pryzm.icstaking.v1.EventUnstake";
  value: EventUnstakeAmino;
}
export interface EventUnstakeSDKType {
  creator: string;
  host_chain: string;
  transfer_channel: string;
  c_amount: string;
  u_amount: CoinSDKType | undefined;
}
export interface EventRedeemUnstaked {
  creator: string;
  hostChain: string;
  transferChannel: string;
  epoch: bigint;
  uAmount: string;
  amount: Coin | undefined;
  fee: Coin | undefined;
}
export interface EventRedeemUnstakedProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.EventRedeemUnstaked";
  value: Uint8Array;
}
export interface EventRedeemUnstakedAmino {
  creator?: string;
  host_chain?: string;
  transfer_channel?: string;
  epoch?: string;
  u_amount?: string;
  amount?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface EventRedeemUnstakedAminoMsg {
  type: "/pryzm.icstaking.v1.EventRedeemUnstaked";
  value: EventRedeemUnstakedAmino;
}
export interface EventRedeemUnstakedSDKType {
  creator: string;
  host_chain: string;
  transfer_channel: string;
  epoch: bigint;
  u_amount: string;
  amount: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface EventInstantUnstake {
  creator: string;
  hostChain: string;
  transferChannel: string;
  minCAmount: string;
  maxCAmount: string;
  amount: Coin | undefined;
  fee: Coin | undefined;
}
export interface EventInstantUnstakeProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.EventInstantUnstake";
  value: Uint8Array;
}
export interface EventInstantUnstakeAmino {
  creator?: string;
  host_chain?: string;
  transfer_channel?: string;
  min_c_amount?: string;
  max_c_amount?: string;
  amount?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface EventInstantUnstakeAminoMsg {
  type: "/pryzm.icstaking.v1.EventInstantUnstake";
  value: EventInstantUnstakeAmino;
}
export interface EventInstantUnstakeSDKType {
  creator: string;
  host_chain: string;
  transfer_channel: string;
  min_c_amount: string;
  max_c_amount: string;
  amount: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface EventSetMultiSigConnection {
  connection: MultiSigConnection | undefined;
}
export interface EventSetMultiSigConnectionProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.EventSetMultiSigConnection";
  value: Uint8Array;
}
export interface EventSetMultiSigConnectionAmino {
  connection?: MultiSigConnectionAmino | undefined;
}
export interface EventSetMultiSigConnectionAminoMsg {
  type: "/pryzm.icstaking.v1.EventSetMultiSigConnection";
  value: EventSetMultiSigConnectionAmino;
}
export interface EventSetMultiSigConnectionSDKType {
  connection: MultiSigConnectionSDKType | undefined;
}
export interface EventSetMultiSigPacket {
  packet: MultiSigPacket | undefined;
}
export interface EventSetMultiSigPacketProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.EventSetMultiSigPacket";
  value: Uint8Array;
}
export interface EventSetMultiSigPacketAmino {
  packet?: MultiSigPacketAmino | undefined;
}
export interface EventSetMultiSigPacketAminoMsg {
  type: "/pryzm.icstaking.v1.EventSetMultiSigPacket";
  value: EventSetMultiSigPacketAmino;
}
export interface EventSetMultiSigPacketSDKType {
  packet: MultiSigPacketSDKType | undefined;
}
export interface EventAcknowledgeMultiSigPacket {
  connectionId: string;
  sequence: bigint;
  ack: Acknowledgement | undefined;
  height: Height | undefined;
  txHash: string;
}
export interface EventAcknowledgeMultiSigPacketProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.EventAcknowledgeMultiSigPacket";
  value: Uint8Array;
}
export interface EventAcknowledgeMultiSigPacketAmino {
  connection_id?: string;
  sequence?: string;
  ack?: AcknowledgementAmino | undefined;
  height?: HeightAmino | undefined;
  tx_hash?: string;
}
export interface EventAcknowledgeMultiSigPacketAminoMsg {
  type: "/pryzm.icstaking.v1.EventAcknowledgeMultiSigPacket";
  value: EventAcknowledgeMultiSigPacketAmino;
}
export interface EventAcknowledgeMultiSigPacketSDKType {
  connection_id: string;
  sequence: bigint;
  ack: AcknowledgementSDKType | undefined;
  height: HeightSDKType | undefined;
  tx_hash: string;
}
function createBaseEventSetHostChain(): EventSetHostChain {
  return {
    hostChain: HostChain.fromPartial({})
  };
}
export const EventSetHostChain = {
  typeUrl: "/pryzm.icstaking.v1.EventSetHostChain",
  encode(message: EventSetHostChain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChain !== undefined) {
      HostChain.encode(message.hostChain, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetHostChain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetHostChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChain = HostChain.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetHostChain>): EventSetHostChain {
    const message = createBaseEventSetHostChain();
    message.hostChain = object.hostChain !== undefined && object.hostChain !== null ? HostChain.fromPartial(object.hostChain) : undefined;
    return message;
  },
  fromAmino(object: EventSetHostChainAmino): EventSetHostChain {
    const message = createBaseEventSetHostChain();
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = HostChain.fromAmino(object.host_chain);
    }
    return message;
  },
  toAmino(message: EventSetHostChain, useInterfaces: boolean = false): EventSetHostChainAmino {
    const obj: any = {};
    obj.host_chain = message.hostChain ? HostChain.toAmino(message.hostChain, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetHostChainAminoMsg): EventSetHostChain {
    return EventSetHostChain.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetHostChainProtoMsg, useInterfaces: boolean = false): EventSetHostChain {
    return EventSetHostChain.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetHostChain): Uint8Array {
    return EventSetHostChain.encode(message).finish();
  },
  toProtoMsg(message: EventSetHostChain): EventSetHostChainProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.EventSetHostChain",
      value: EventSetHostChain.encode(message).finish()
    };
  }
};
function createBaseEventSetHostChainState(): EventSetHostChainState {
  return {
    hostChainState: HostChainState.fromPartial({})
  };
}
export const EventSetHostChainState = {
  typeUrl: "/pryzm.icstaking.v1.EventSetHostChainState",
  encode(message: EventSetHostChainState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChainState !== undefined) {
      HostChainState.encode(message.hostChainState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetHostChainState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetHostChainState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChainState = HostChainState.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetHostChainState>): EventSetHostChainState {
    const message = createBaseEventSetHostChainState();
    message.hostChainState = object.hostChainState !== undefined && object.hostChainState !== null ? HostChainState.fromPartial(object.hostChainState) : undefined;
    return message;
  },
  fromAmino(object: EventSetHostChainStateAmino): EventSetHostChainState {
    const message = createBaseEventSetHostChainState();
    if (object.host_chain_state !== undefined && object.host_chain_state !== null) {
      message.hostChainState = HostChainState.fromAmino(object.host_chain_state);
    }
    return message;
  },
  toAmino(message: EventSetHostChainState, useInterfaces: boolean = false): EventSetHostChainStateAmino {
    const obj: any = {};
    obj.host_chain_state = message.hostChainState ? HostChainState.toAmino(message.hostChainState, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetHostChainStateAminoMsg): EventSetHostChainState {
    return EventSetHostChainState.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetHostChainStateProtoMsg, useInterfaces: boolean = false): EventSetHostChainState {
    return EventSetHostChainState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetHostChainState): Uint8Array {
    return EventSetHostChainState.encode(message).finish();
  },
  toProtoMsg(message: EventSetHostChainState): EventSetHostChainStateProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.EventSetHostChainState",
      value: EventSetHostChainState.encode(message).finish()
    };
  }
};
function createBaseEventSetParams(): EventSetParams {
  return {
    params: Params.fromPartial({})
  };
}
export const EventSetParams = {
  typeUrl: "/pryzm.icstaking.v1.EventSetParams",
  encode(message: EventSetParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetParams>): EventSetParams {
    const message = createBaseEventSetParams();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: EventSetParamsAmino): EventSetParams {
    const message = createBaseEventSetParams();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: EventSetParams, useInterfaces: boolean = false): EventSetParamsAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetParamsAminoMsg): EventSetParams {
    return EventSetParams.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetParamsProtoMsg, useInterfaces: boolean = false): EventSetParams {
    return EventSetParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetParams): Uint8Array {
    return EventSetParams.encode(message).finish();
  },
  toProtoMsg(message: EventSetParams): EventSetParamsProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.EventSetParams",
      value: EventSetParams.encode(message).finish()
    };
  }
};
function createBaseEventSetUndelegation(): EventSetUndelegation {
  return {
    undelegation: Undelegation.fromPartial({})
  };
}
export const EventSetUndelegation = {
  typeUrl: "/pryzm.icstaking.v1.EventSetUndelegation",
  encode(message: EventSetUndelegation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.undelegation !== undefined) {
      Undelegation.encode(message.undelegation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetUndelegation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetUndelegation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.undelegation = Undelegation.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetUndelegation>): EventSetUndelegation {
    const message = createBaseEventSetUndelegation();
    message.undelegation = object.undelegation !== undefined && object.undelegation !== null ? Undelegation.fromPartial(object.undelegation) : undefined;
    return message;
  },
  fromAmino(object: EventSetUndelegationAmino): EventSetUndelegation {
    const message = createBaseEventSetUndelegation();
    if (object.undelegation !== undefined && object.undelegation !== null) {
      message.undelegation = Undelegation.fromAmino(object.undelegation);
    }
    return message;
  },
  toAmino(message: EventSetUndelegation, useInterfaces: boolean = false): EventSetUndelegationAmino {
    const obj: any = {};
    obj.undelegation = message.undelegation ? Undelegation.toAmino(message.undelegation, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetUndelegationAminoMsg): EventSetUndelegation {
    return EventSetUndelegation.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetUndelegationProtoMsg, useInterfaces: boolean = false): EventSetUndelegation {
    return EventSetUndelegation.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetUndelegation): Uint8Array {
    return EventSetUndelegation.encode(message).finish();
  },
  toProtoMsg(message: EventSetUndelegation): EventSetUndelegationProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.EventSetUndelegation",
      value: EventSetUndelegation.encode(message).finish()
    };
  }
};
function createBaseEventSetChannelUndelegation(): EventSetChannelUndelegation {
  return {
    channelUndelegation: ChannelUndelegation.fromPartial({})
  };
}
export const EventSetChannelUndelegation = {
  typeUrl: "/pryzm.icstaking.v1.EventSetChannelUndelegation",
  encode(message: EventSetChannelUndelegation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.channelUndelegation !== undefined) {
      ChannelUndelegation.encode(message.channelUndelegation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetChannelUndelegation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetChannelUndelegation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelUndelegation = ChannelUndelegation.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetChannelUndelegation>): EventSetChannelUndelegation {
    const message = createBaseEventSetChannelUndelegation();
    message.channelUndelegation = object.channelUndelegation !== undefined && object.channelUndelegation !== null ? ChannelUndelegation.fromPartial(object.channelUndelegation) : undefined;
    return message;
  },
  fromAmino(object: EventSetChannelUndelegationAmino): EventSetChannelUndelegation {
    const message = createBaseEventSetChannelUndelegation();
    if (object.channel_undelegation !== undefined && object.channel_undelegation !== null) {
      message.channelUndelegation = ChannelUndelegation.fromAmino(object.channel_undelegation);
    }
    return message;
  },
  toAmino(message: EventSetChannelUndelegation, useInterfaces: boolean = false): EventSetChannelUndelegationAmino {
    const obj: any = {};
    obj.channel_undelegation = message.channelUndelegation ? ChannelUndelegation.toAmino(message.channelUndelegation, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetChannelUndelegationAminoMsg): EventSetChannelUndelegation {
    return EventSetChannelUndelegation.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetChannelUndelegationProtoMsg, useInterfaces: boolean = false): EventSetChannelUndelegation {
    return EventSetChannelUndelegation.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetChannelUndelegation): Uint8Array {
    return EventSetChannelUndelegation.encode(message).finish();
  },
  toProtoMsg(message: EventSetChannelUndelegation): EventSetChannelUndelegationProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.EventSetChannelUndelegation",
      value: EventSetChannelUndelegation.encode(message).finish()
    };
  }
};
function createBaseEventStake(): EventStake {
  return {
    creator: "",
    hostChain: "",
    transferChannel: "",
    amount: "",
    fee: Coin.fromPartial({}),
    cAmount: Coin.fromPartial({})
  };
}
export const EventStake = {
  typeUrl: "/pryzm.icstaking.v1.EventStake",
  encode(message: EventStake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    if (message.transferChannel !== "") {
      writer.uint32(26).string(message.transferChannel);
    }
    if (message.amount !== "") {
      writer.uint32(34).string(message.amount);
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(42).fork()).ldelim();
    }
    if (message.cAmount !== undefined) {
      Coin.encode(message.cAmount, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventStake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventStake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.transferChannel = reader.string();
          break;
        case 4:
          message.amount = reader.string();
          break;
        case 5:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.cAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventStake>): EventStake {
    const message = createBaseEventStake();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    message.transferChannel = object.transferChannel ?? "";
    message.amount = object.amount ?? "";
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    message.cAmount = object.cAmount !== undefined && object.cAmount !== null ? Coin.fromPartial(object.cAmount) : undefined;
    return message;
  },
  fromAmino(object: EventStakeAmino): EventStake {
    const message = createBaseEventStake();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    if (object.c_amount !== undefined && object.c_amount !== null) {
      message.cAmount = Coin.fromAmino(object.c_amount);
    }
    return message;
  },
  toAmino(message: EventStake, useInterfaces: boolean = false): EventStakeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    obj.amount = message.amount === "" ? undefined : message.amount;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    obj.c_amount = message.cAmount ? Coin.toAmino(message.cAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventStakeAminoMsg): EventStake {
    return EventStake.fromAmino(object.value);
  },
  fromProtoMsg(message: EventStakeProtoMsg, useInterfaces: boolean = false): EventStake {
    return EventStake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventStake): Uint8Array {
    return EventStake.encode(message).finish();
  },
  toProtoMsg(message: EventStake): EventStakeProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.EventStake",
      value: EventStake.encode(message).finish()
    };
  }
};
function createBaseEventStakeLsmShares(): EventStakeLsmShares {
  return {
    creator: "",
    hostChain: "",
    transferChannel: "",
    lsmDenom: "",
    amount: "",
    fee: Coin.fromPartial({}),
    cAmount: Coin.fromPartial({})
  };
}
export const EventStakeLsmShares = {
  typeUrl: "/pryzm.icstaking.v1.EventStakeLsmShares",
  encode(message: EventStakeLsmShares, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    if (message.transferChannel !== "") {
      writer.uint32(26).string(message.transferChannel);
    }
    if (message.lsmDenom !== "") {
      writer.uint32(34).string(message.lsmDenom);
    }
    if (message.amount !== "") {
      writer.uint32(42).string(message.amount);
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(50).fork()).ldelim();
    }
    if (message.cAmount !== undefined) {
      Coin.encode(message.cAmount, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventStakeLsmShares {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventStakeLsmShares();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.transferChannel = reader.string();
          break;
        case 4:
          message.lsmDenom = reader.string();
          break;
        case 5:
          message.amount = reader.string();
          break;
        case 6:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.cAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventStakeLsmShares>): EventStakeLsmShares {
    const message = createBaseEventStakeLsmShares();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    message.transferChannel = object.transferChannel ?? "";
    message.lsmDenom = object.lsmDenom ?? "";
    message.amount = object.amount ?? "";
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    message.cAmount = object.cAmount !== undefined && object.cAmount !== null ? Coin.fromPartial(object.cAmount) : undefined;
    return message;
  },
  fromAmino(object: EventStakeLsmSharesAmino): EventStakeLsmShares {
    const message = createBaseEventStakeLsmShares();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    if (object.lsm_denom !== undefined && object.lsm_denom !== null) {
      message.lsmDenom = object.lsm_denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    if (object.c_amount !== undefined && object.c_amount !== null) {
      message.cAmount = Coin.fromAmino(object.c_amount);
    }
    return message;
  },
  toAmino(message: EventStakeLsmShares, useInterfaces: boolean = false): EventStakeLsmSharesAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    obj.lsm_denom = message.lsmDenom === "" ? undefined : message.lsmDenom;
    obj.amount = message.amount === "" ? undefined : message.amount;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    obj.c_amount = message.cAmount ? Coin.toAmino(message.cAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventStakeLsmSharesAminoMsg): EventStakeLsmShares {
    return EventStakeLsmShares.fromAmino(object.value);
  },
  fromProtoMsg(message: EventStakeLsmSharesProtoMsg, useInterfaces: boolean = false): EventStakeLsmShares {
    return EventStakeLsmShares.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventStakeLsmShares): Uint8Array {
    return EventStakeLsmShares.encode(message).finish();
  },
  toProtoMsg(message: EventStakeLsmShares): EventStakeLsmSharesProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.EventStakeLsmShares",
      value: EventStakeLsmShares.encode(message).finish()
    };
  }
};
function createBaseEventUnstake(): EventUnstake {
  return {
    creator: "",
    hostChain: "",
    transferChannel: "",
    cAmount: "",
    uAmount: Coin.fromPartial({})
  };
}
export const EventUnstake = {
  typeUrl: "/pryzm.icstaking.v1.EventUnstake",
  encode(message: EventUnstake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    if (message.transferChannel !== "") {
      writer.uint32(26).string(message.transferChannel);
    }
    if (message.cAmount !== "") {
      writer.uint32(34).string(message.cAmount);
    }
    if (message.uAmount !== undefined) {
      Coin.encode(message.uAmount, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventUnstake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUnstake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.transferChannel = reader.string();
          break;
        case 4:
          message.cAmount = reader.string();
          break;
        case 5:
          message.uAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventUnstake>): EventUnstake {
    const message = createBaseEventUnstake();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    message.transferChannel = object.transferChannel ?? "";
    message.cAmount = object.cAmount ?? "";
    message.uAmount = object.uAmount !== undefined && object.uAmount !== null ? Coin.fromPartial(object.uAmount) : undefined;
    return message;
  },
  fromAmino(object: EventUnstakeAmino): EventUnstake {
    const message = createBaseEventUnstake();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    if (object.c_amount !== undefined && object.c_amount !== null) {
      message.cAmount = object.c_amount;
    }
    if (object.u_amount !== undefined && object.u_amount !== null) {
      message.uAmount = Coin.fromAmino(object.u_amount);
    }
    return message;
  },
  toAmino(message: EventUnstake, useInterfaces: boolean = false): EventUnstakeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    obj.c_amount = message.cAmount === "" ? undefined : message.cAmount;
    obj.u_amount = message.uAmount ? Coin.toAmino(message.uAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventUnstakeAminoMsg): EventUnstake {
    return EventUnstake.fromAmino(object.value);
  },
  fromProtoMsg(message: EventUnstakeProtoMsg, useInterfaces: boolean = false): EventUnstake {
    return EventUnstake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventUnstake): Uint8Array {
    return EventUnstake.encode(message).finish();
  },
  toProtoMsg(message: EventUnstake): EventUnstakeProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.EventUnstake",
      value: EventUnstake.encode(message).finish()
    };
  }
};
function createBaseEventRedeemUnstaked(): EventRedeemUnstaked {
  return {
    creator: "",
    hostChain: "",
    transferChannel: "",
    epoch: BigInt(0),
    uAmount: "",
    amount: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const EventRedeemUnstaked = {
  typeUrl: "/pryzm.icstaking.v1.EventRedeemUnstaked",
  encode(message: EventRedeemUnstaked, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    if (message.transferChannel !== "") {
      writer.uint32(26).string(message.transferChannel);
    }
    if (message.epoch !== BigInt(0)) {
      writer.uint32(32).uint64(message.epoch);
    }
    if (message.uAmount !== "") {
      writer.uint32(42).string(message.uAmount);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(50).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRedeemUnstaked {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRedeemUnstaked();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.transferChannel = reader.string();
          break;
        case 4:
          message.epoch = reader.uint64();
          break;
        case 5:
          message.uAmount = reader.string();
          break;
        case 6:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRedeemUnstaked>): EventRedeemUnstaked {
    const message = createBaseEventRedeemUnstaked();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    message.transferChannel = object.transferChannel ?? "";
    message.epoch = object.epoch !== undefined && object.epoch !== null ? BigInt(object.epoch.toString()) : BigInt(0);
    message.uAmount = object.uAmount ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: EventRedeemUnstakedAmino): EventRedeemUnstaked {
    const message = createBaseEventRedeemUnstaked();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    if (object.epoch !== undefined && object.epoch !== null) {
      message.epoch = BigInt(object.epoch);
    }
    if (object.u_amount !== undefined && object.u_amount !== null) {
      message.uAmount = object.u_amount;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: EventRedeemUnstaked, useInterfaces: boolean = false): EventRedeemUnstakedAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    obj.epoch = message.epoch !== BigInt(0) ? message.epoch.toString() : undefined;
    obj.u_amount = message.uAmount === "" ? undefined : message.uAmount;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventRedeemUnstakedAminoMsg): EventRedeemUnstaked {
    return EventRedeemUnstaked.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRedeemUnstakedProtoMsg, useInterfaces: boolean = false): EventRedeemUnstaked {
    return EventRedeemUnstaked.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRedeemUnstaked): Uint8Array {
    return EventRedeemUnstaked.encode(message).finish();
  },
  toProtoMsg(message: EventRedeemUnstaked): EventRedeemUnstakedProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.EventRedeemUnstaked",
      value: EventRedeemUnstaked.encode(message).finish()
    };
  }
};
function createBaseEventInstantUnstake(): EventInstantUnstake {
  return {
    creator: "",
    hostChain: "",
    transferChannel: "",
    minCAmount: "",
    maxCAmount: "",
    amount: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const EventInstantUnstake = {
  typeUrl: "/pryzm.icstaking.v1.EventInstantUnstake",
  encode(message: EventInstantUnstake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    if (message.transferChannel !== "") {
      writer.uint32(26).string(message.transferChannel);
    }
    if (message.minCAmount !== "") {
      writer.uint32(34).string(message.minCAmount);
    }
    if (message.maxCAmount !== "") {
      writer.uint32(42).string(message.maxCAmount);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(50).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventInstantUnstake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventInstantUnstake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.transferChannel = reader.string();
          break;
        case 4:
          message.minCAmount = reader.string();
          break;
        case 5:
          message.maxCAmount = reader.string();
          break;
        case 6:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventInstantUnstake>): EventInstantUnstake {
    const message = createBaseEventInstantUnstake();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    message.transferChannel = object.transferChannel ?? "";
    message.minCAmount = object.minCAmount ?? "";
    message.maxCAmount = object.maxCAmount ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: EventInstantUnstakeAmino): EventInstantUnstake {
    const message = createBaseEventInstantUnstake();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    if (object.min_c_amount !== undefined && object.min_c_amount !== null) {
      message.minCAmount = object.min_c_amount;
    }
    if (object.max_c_amount !== undefined && object.max_c_amount !== null) {
      message.maxCAmount = object.max_c_amount;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: EventInstantUnstake, useInterfaces: boolean = false): EventInstantUnstakeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    obj.min_c_amount = message.minCAmount === "" ? undefined : message.minCAmount;
    obj.max_c_amount = message.maxCAmount === "" ? undefined : message.maxCAmount;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventInstantUnstakeAminoMsg): EventInstantUnstake {
    return EventInstantUnstake.fromAmino(object.value);
  },
  fromProtoMsg(message: EventInstantUnstakeProtoMsg, useInterfaces: boolean = false): EventInstantUnstake {
    return EventInstantUnstake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventInstantUnstake): Uint8Array {
    return EventInstantUnstake.encode(message).finish();
  },
  toProtoMsg(message: EventInstantUnstake): EventInstantUnstakeProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.EventInstantUnstake",
      value: EventInstantUnstake.encode(message).finish()
    };
  }
};
function createBaseEventSetMultiSigConnection(): EventSetMultiSigConnection {
  return {
    connection: MultiSigConnection.fromPartial({})
  };
}
export const EventSetMultiSigConnection = {
  typeUrl: "/pryzm.icstaking.v1.EventSetMultiSigConnection",
  encode(message: EventSetMultiSigConnection, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.connection !== undefined) {
      MultiSigConnection.encode(message.connection, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetMultiSigConnection {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetMultiSigConnection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connection = MultiSigConnection.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetMultiSigConnection>): EventSetMultiSigConnection {
    const message = createBaseEventSetMultiSigConnection();
    message.connection = object.connection !== undefined && object.connection !== null ? MultiSigConnection.fromPartial(object.connection) : undefined;
    return message;
  },
  fromAmino(object: EventSetMultiSigConnectionAmino): EventSetMultiSigConnection {
    const message = createBaseEventSetMultiSigConnection();
    if (object.connection !== undefined && object.connection !== null) {
      message.connection = MultiSigConnection.fromAmino(object.connection);
    }
    return message;
  },
  toAmino(message: EventSetMultiSigConnection, useInterfaces: boolean = false): EventSetMultiSigConnectionAmino {
    const obj: any = {};
    obj.connection = message.connection ? MultiSigConnection.toAmino(message.connection, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetMultiSigConnectionAminoMsg): EventSetMultiSigConnection {
    return EventSetMultiSigConnection.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetMultiSigConnectionProtoMsg, useInterfaces: boolean = false): EventSetMultiSigConnection {
    return EventSetMultiSigConnection.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetMultiSigConnection): Uint8Array {
    return EventSetMultiSigConnection.encode(message).finish();
  },
  toProtoMsg(message: EventSetMultiSigConnection): EventSetMultiSigConnectionProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.EventSetMultiSigConnection",
      value: EventSetMultiSigConnection.encode(message).finish()
    };
  }
};
function createBaseEventSetMultiSigPacket(): EventSetMultiSigPacket {
  return {
    packet: MultiSigPacket.fromPartial({})
  };
}
export const EventSetMultiSigPacket = {
  typeUrl: "/pryzm.icstaking.v1.EventSetMultiSigPacket",
  encode(message: EventSetMultiSigPacket, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.packet !== undefined) {
      MultiSigPacket.encode(message.packet, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetMultiSigPacket {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetMultiSigPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packet = MultiSigPacket.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetMultiSigPacket>): EventSetMultiSigPacket {
    const message = createBaseEventSetMultiSigPacket();
    message.packet = object.packet !== undefined && object.packet !== null ? MultiSigPacket.fromPartial(object.packet) : undefined;
    return message;
  },
  fromAmino(object: EventSetMultiSigPacketAmino): EventSetMultiSigPacket {
    const message = createBaseEventSetMultiSigPacket();
    if (object.packet !== undefined && object.packet !== null) {
      message.packet = MultiSigPacket.fromAmino(object.packet);
    }
    return message;
  },
  toAmino(message: EventSetMultiSigPacket, useInterfaces: boolean = false): EventSetMultiSigPacketAmino {
    const obj: any = {};
    obj.packet = message.packet ? MultiSigPacket.toAmino(message.packet, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetMultiSigPacketAminoMsg): EventSetMultiSigPacket {
    return EventSetMultiSigPacket.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetMultiSigPacketProtoMsg, useInterfaces: boolean = false): EventSetMultiSigPacket {
    return EventSetMultiSigPacket.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetMultiSigPacket): Uint8Array {
    return EventSetMultiSigPacket.encode(message).finish();
  },
  toProtoMsg(message: EventSetMultiSigPacket): EventSetMultiSigPacketProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.EventSetMultiSigPacket",
      value: EventSetMultiSigPacket.encode(message).finish()
    };
  }
};
function createBaseEventAcknowledgeMultiSigPacket(): EventAcknowledgeMultiSigPacket {
  return {
    connectionId: "",
    sequence: BigInt(0),
    ack: Acknowledgement.fromPartial({}),
    height: Height.fromPartial({}),
    txHash: ""
  };
}
export const EventAcknowledgeMultiSigPacket = {
  typeUrl: "/pryzm.icstaking.v1.EventAcknowledgeMultiSigPacket",
  encode(message: EventAcknowledgeMultiSigPacket, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.connectionId !== "") {
      writer.uint32(10).string(message.connectionId);
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(16).uint64(message.sequence);
    }
    if (message.ack !== undefined) {
      Acknowledgement.encode(message.ack, writer.uint32(26).fork()).ldelim();
    }
    if (message.height !== undefined) {
      Height.encode(message.height, writer.uint32(34).fork()).ldelim();
    }
    if (message.txHash !== "") {
      writer.uint32(42).string(message.txHash);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventAcknowledgeMultiSigPacket {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventAcknowledgeMultiSigPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connectionId = reader.string();
          break;
        case 2:
          message.sequence = reader.uint64();
          break;
        case 3:
          message.ack = Acknowledgement.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.height = Height.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.txHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventAcknowledgeMultiSigPacket>): EventAcknowledgeMultiSigPacket {
    const message = createBaseEventAcknowledgeMultiSigPacket();
    message.connectionId = object.connectionId ?? "";
    message.sequence = object.sequence !== undefined && object.sequence !== null ? BigInt(object.sequence.toString()) : BigInt(0);
    message.ack = object.ack !== undefined && object.ack !== null ? Acknowledgement.fromPartial(object.ack) : undefined;
    message.height = object.height !== undefined && object.height !== null ? Height.fromPartial(object.height) : undefined;
    message.txHash = object.txHash ?? "";
    return message;
  },
  fromAmino(object: EventAcknowledgeMultiSigPacketAmino): EventAcknowledgeMultiSigPacket {
    const message = createBaseEventAcknowledgeMultiSigPacket();
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence);
    }
    if (object.ack !== undefined && object.ack !== null) {
      message.ack = Acknowledgement.fromAmino(object.ack);
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Height.fromAmino(object.height);
    }
    if (object.tx_hash !== undefined && object.tx_hash !== null) {
      message.txHash = object.tx_hash;
    }
    return message;
  },
  toAmino(message: EventAcknowledgeMultiSigPacket, useInterfaces: boolean = false): EventAcknowledgeMultiSigPacketAmino {
    const obj: any = {};
    obj.connection_id = message.connectionId === "" ? undefined : message.connectionId;
    obj.sequence = message.sequence !== BigInt(0) ? message.sequence.toString() : undefined;
    obj.ack = message.ack ? Acknowledgement.toAmino(message.ack, useInterfaces) : undefined;
    obj.height = message.height ? Height.toAmino(message.height, useInterfaces) : {};
    obj.tx_hash = message.txHash === "" ? undefined : message.txHash;
    return obj;
  },
  fromAminoMsg(object: EventAcknowledgeMultiSigPacketAminoMsg): EventAcknowledgeMultiSigPacket {
    return EventAcknowledgeMultiSigPacket.fromAmino(object.value);
  },
  fromProtoMsg(message: EventAcknowledgeMultiSigPacketProtoMsg, useInterfaces: boolean = false): EventAcknowledgeMultiSigPacket {
    return EventAcknowledgeMultiSigPacket.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventAcknowledgeMultiSigPacket): Uint8Array {
    return EventAcknowledgeMultiSigPacket.encode(message).finish();
  },
  toProtoMsg(message: EventAcknowledgeMultiSigPacket): EventAcknowledgeMultiSigPacketProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.EventAcknowledgeMultiSigPacket",
      value: EventAcknowledgeMultiSigPacket.encode(message).finish()
    };
  }
};