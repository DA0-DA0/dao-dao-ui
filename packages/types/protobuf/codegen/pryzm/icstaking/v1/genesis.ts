//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { HostChain, HostChainAmino, HostChainSDKType, HostChainState, HostChainStateAmino, HostChainStateSDKType } from "./host_chain";
import { Undelegation, UndelegationAmino, UndelegationSDKType, ChannelUndelegation, ChannelUndelegationAmino, ChannelUndelegationSDKType } from "./undelegation";
import { ReplyData, ReplyDataAmino, ReplyDataSDKType, DelegateTransferSession, DelegateTransferSessionAmino, DelegateTransferSessionSDKType } from "./reply";
import { RedeemableLsm, RedeemableLsmAmino, RedeemableLsmSDKType, FailedLsmTransfer, FailedLsmTransferAmino, FailedLsmTransferSDKType } from "./lsm";
import { MultiSigConnection, MultiSigConnectionAmino, MultiSigConnectionSDKType, MultiSigPacket, MultiSigPacketAmino, MultiSigPacketSDKType } from "./multisig";
import { LoopBackPacket, LoopBackPacketAmino, LoopBackPacketSDKType } from "./loopback";
import { SweepTransfer, SweepTransferAmino, SweepTransferSDKType } from "./sweep";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
/** GenesisState defines the icstaking module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  hostChainList: HostChain[];
  hostChainStateList: HostChainState[];
  undelegationList: Undelegation[];
  channelUndelegationList: ChannelUndelegation[];
  replyDataList: ReplyData[];
  redeemableLsmList: RedeemableLsm[];
  failedLsmTransferList: FailedLsmTransfer[];
  multiSigConnectionList: MultiSigConnection[];
  multiSigPacketList: MultiSigPacket[];
  loopBackPacketList: LoopBackPacket[];
  loopBackPacketLastId: bigint;
  lastDelegationTimeList: HostChainEpochTime[];
  lastRedelegationTimeList: HostChainEpochTime[];
  lastLsmRedeemTimeList: HostChainEpochTime[];
  lastUndelegationTimeList: HostChainEpochTime[];
  undelegationEpochList: HostChainUndelegationEpoch[];
  delegateTransferSessionList: DelegateTransferSession[];
  sweepTransferList: SweepTransfer[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the icstaking module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  host_chain_list?: HostChainAmino[];
  host_chain_state_list?: HostChainStateAmino[];
  undelegation_list?: UndelegationAmino[];
  channel_undelegation_list?: ChannelUndelegationAmino[];
  reply_data_list?: ReplyDataAmino[];
  redeemable_lsm_list?: RedeemableLsmAmino[];
  failed_lsm_transfer_list?: FailedLsmTransferAmino[];
  multi_sig_connection_list?: MultiSigConnectionAmino[];
  multi_sig_packet_list?: MultiSigPacketAmino[];
  loop_back_packet_list?: LoopBackPacketAmino[];
  loop_back_packet_last_id?: string;
  last_delegation_time_list?: HostChainEpochTimeAmino[];
  last_redelegation_time_list?: HostChainEpochTimeAmino[];
  last_lsm_redeem_time_list?: HostChainEpochTimeAmino[];
  last_undelegation_time_list?: HostChainEpochTimeAmino[];
  undelegation_epoch_list?: HostChainUndelegationEpochAmino[];
  delegate_transfer_session_list?: DelegateTransferSessionAmino[];
  sweep_transfer_list?: SweepTransferAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/pryzm.icstaking.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the icstaking module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  host_chain_list: HostChainSDKType[];
  host_chain_state_list: HostChainStateSDKType[];
  undelegation_list: UndelegationSDKType[];
  channel_undelegation_list: ChannelUndelegationSDKType[];
  reply_data_list: ReplyDataSDKType[];
  redeemable_lsm_list: RedeemableLsmSDKType[];
  failed_lsm_transfer_list: FailedLsmTransferSDKType[];
  multi_sig_connection_list: MultiSigConnectionSDKType[];
  multi_sig_packet_list: MultiSigPacketSDKType[];
  loop_back_packet_list: LoopBackPacketSDKType[];
  loop_back_packet_last_id: bigint;
  last_delegation_time_list: HostChainEpochTimeSDKType[];
  last_redelegation_time_list: HostChainEpochTimeSDKType[];
  last_lsm_redeem_time_list: HostChainEpochTimeSDKType[];
  last_undelegation_time_list: HostChainEpochTimeSDKType[];
  undelegation_epoch_list: HostChainUndelegationEpochSDKType[];
  delegate_transfer_session_list: DelegateTransferSessionSDKType[];
  sweep_transfer_list: SweepTransferSDKType[];
}
export interface HostChainEpochTime {
  hostChainId: string;
  epochTime: Date | undefined;
}
export interface HostChainEpochTimeProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.HostChainEpochTime";
  value: Uint8Array;
}
export interface HostChainEpochTimeAmino {
  host_chain_id?: string;
  epoch_time?: string | undefined;
}
export interface HostChainEpochTimeAminoMsg {
  type: "/pryzm.icstaking.v1.HostChainEpochTime";
  value: HostChainEpochTimeAmino;
}
export interface HostChainEpochTimeSDKType {
  host_chain_id: string;
  epoch_time: Date | undefined;
}
export interface HostChainUndelegationEpoch {
  hostChainId: string;
  undelegationEpoch: bigint;
}
export interface HostChainUndelegationEpochProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.HostChainUndelegationEpoch";
  value: Uint8Array;
}
export interface HostChainUndelegationEpochAmino {
  host_chain_id?: string;
  undelegation_epoch?: string;
}
export interface HostChainUndelegationEpochAminoMsg {
  type: "/pryzm.icstaking.v1.HostChainUndelegationEpoch";
  value: HostChainUndelegationEpochAmino;
}
export interface HostChainUndelegationEpochSDKType {
  host_chain_id: string;
  undelegation_epoch: bigint;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    hostChainList: [],
    hostChainStateList: [],
    undelegationList: [],
    channelUndelegationList: [],
    replyDataList: [],
    redeemableLsmList: [],
    failedLsmTransferList: [],
    multiSigConnectionList: [],
    multiSigPacketList: [],
    loopBackPacketList: [],
    loopBackPacketLastId: BigInt(0),
    lastDelegationTimeList: [],
    lastRedelegationTimeList: [],
    lastLsmRedeemTimeList: [],
    lastUndelegationTimeList: [],
    undelegationEpochList: [],
    delegateTransferSessionList: [],
    sweepTransferList: []
  };
}
export const GenesisState = {
  typeUrl: "/pryzm.icstaking.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.hostChainList) {
      HostChain.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.hostChainStateList) {
      HostChainState.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.undelegationList) {
      Undelegation.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.channelUndelegationList) {
      ChannelUndelegation.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.replyDataList) {
      ReplyData.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.redeemableLsmList) {
      RedeemableLsm.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.failedLsmTransferList) {
      FailedLsmTransfer.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.multiSigConnectionList) {
      MultiSigConnection.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.multiSigPacketList) {
      MultiSigPacket.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    for (const v of message.loopBackPacketList) {
      LoopBackPacket.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    if (message.loopBackPacketLastId !== BigInt(0)) {
      writer.uint32(104).uint64(message.loopBackPacketLastId);
    }
    for (const v of message.lastDelegationTimeList) {
      HostChainEpochTime.encode(v!, writer.uint32(114).fork()).ldelim();
    }
    for (const v of message.lastRedelegationTimeList) {
      HostChainEpochTime.encode(v!, writer.uint32(122).fork()).ldelim();
    }
    for (const v of message.lastLsmRedeemTimeList) {
      HostChainEpochTime.encode(v!, writer.uint32(130).fork()).ldelim();
    }
    for (const v of message.lastUndelegationTimeList) {
      HostChainEpochTime.encode(v!, writer.uint32(138).fork()).ldelim();
    }
    for (const v of message.undelegationEpochList) {
      HostChainUndelegationEpoch.encode(v!, writer.uint32(146).fork()).ldelim();
    }
    for (const v of message.delegateTransferSessionList) {
      DelegateTransferSession.encode(v!, writer.uint32(154).fork()).ldelim();
    }
    for (const v of message.sweepTransferList) {
      SweepTransfer.encode(v!, writer.uint32(162).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.hostChainList.push(HostChain.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.hostChainStateList.push(HostChainState.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.undelegationList.push(Undelegation.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 6:
          message.channelUndelegationList.push(ChannelUndelegation.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 7:
          message.replyDataList.push(ReplyData.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 8:
          message.redeemableLsmList.push(RedeemableLsm.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 9:
          message.failedLsmTransferList.push(FailedLsmTransfer.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 10:
          message.multiSigConnectionList.push(MultiSigConnection.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 11:
          message.multiSigPacketList.push(MultiSigPacket.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 12:
          message.loopBackPacketList.push(LoopBackPacket.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 13:
          message.loopBackPacketLastId = reader.uint64();
          break;
        case 14:
          message.lastDelegationTimeList.push(HostChainEpochTime.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 15:
          message.lastRedelegationTimeList.push(HostChainEpochTime.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 16:
          message.lastLsmRedeemTimeList.push(HostChainEpochTime.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 17:
          message.lastUndelegationTimeList.push(HostChainEpochTime.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 18:
          message.undelegationEpochList.push(HostChainUndelegationEpoch.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 19:
          message.delegateTransferSessionList.push(DelegateTransferSession.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 20:
          message.sweepTransferList.push(SweepTransfer.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.hostChainList = object.hostChainList?.map(e => HostChain.fromPartial(e)) || [];
    message.hostChainStateList = object.hostChainStateList?.map(e => HostChainState.fromPartial(e)) || [];
    message.undelegationList = object.undelegationList?.map(e => Undelegation.fromPartial(e)) || [];
    message.channelUndelegationList = object.channelUndelegationList?.map(e => ChannelUndelegation.fromPartial(e)) || [];
    message.replyDataList = object.replyDataList?.map(e => ReplyData.fromPartial(e)) || [];
    message.redeemableLsmList = object.redeemableLsmList?.map(e => RedeemableLsm.fromPartial(e)) || [];
    message.failedLsmTransferList = object.failedLsmTransferList?.map(e => FailedLsmTransfer.fromPartial(e)) || [];
    message.multiSigConnectionList = object.multiSigConnectionList?.map(e => MultiSigConnection.fromPartial(e)) || [];
    message.multiSigPacketList = object.multiSigPacketList?.map(e => MultiSigPacket.fromPartial(e)) || [];
    message.loopBackPacketList = object.loopBackPacketList?.map(e => LoopBackPacket.fromPartial(e)) || [];
    message.loopBackPacketLastId = object.loopBackPacketLastId !== undefined && object.loopBackPacketLastId !== null ? BigInt(object.loopBackPacketLastId.toString()) : BigInt(0);
    message.lastDelegationTimeList = object.lastDelegationTimeList?.map(e => HostChainEpochTime.fromPartial(e)) || [];
    message.lastRedelegationTimeList = object.lastRedelegationTimeList?.map(e => HostChainEpochTime.fromPartial(e)) || [];
    message.lastLsmRedeemTimeList = object.lastLsmRedeemTimeList?.map(e => HostChainEpochTime.fromPartial(e)) || [];
    message.lastUndelegationTimeList = object.lastUndelegationTimeList?.map(e => HostChainEpochTime.fromPartial(e)) || [];
    message.undelegationEpochList = object.undelegationEpochList?.map(e => HostChainUndelegationEpoch.fromPartial(e)) || [];
    message.delegateTransferSessionList = object.delegateTransferSessionList?.map(e => DelegateTransferSession.fromPartial(e)) || [];
    message.sweepTransferList = object.sweepTransferList?.map(e => SweepTransfer.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.hostChainList = object.host_chain_list?.map(e => HostChain.fromAmino(e)) || [];
    message.hostChainStateList = object.host_chain_state_list?.map(e => HostChainState.fromAmino(e)) || [];
    message.undelegationList = object.undelegation_list?.map(e => Undelegation.fromAmino(e)) || [];
    message.channelUndelegationList = object.channel_undelegation_list?.map(e => ChannelUndelegation.fromAmino(e)) || [];
    message.replyDataList = object.reply_data_list?.map(e => ReplyData.fromAmino(e)) || [];
    message.redeemableLsmList = object.redeemable_lsm_list?.map(e => RedeemableLsm.fromAmino(e)) || [];
    message.failedLsmTransferList = object.failed_lsm_transfer_list?.map(e => FailedLsmTransfer.fromAmino(e)) || [];
    message.multiSigConnectionList = object.multi_sig_connection_list?.map(e => MultiSigConnection.fromAmino(e)) || [];
    message.multiSigPacketList = object.multi_sig_packet_list?.map(e => MultiSigPacket.fromAmino(e)) || [];
    message.loopBackPacketList = object.loop_back_packet_list?.map(e => LoopBackPacket.fromAmino(e)) || [];
    if (object.loop_back_packet_last_id !== undefined && object.loop_back_packet_last_id !== null) {
      message.loopBackPacketLastId = BigInt(object.loop_back_packet_last_id);
    }
    message.lastDelegationTimeList = object.last_delegation_time_list?.map(e => HostChainEpochTime.fromAmino(e)) || [];
    message.lastRedelegationTimeList = object.last_redelegation_time_list?.map(e => HostChainEpochTime.fromAmino(e)) || [];
    message.lastLsmRedeemTimeList = object.last_lsm_redeem_time_list?.map(e => HostChainEpochTime.fromAmino(e)) || [];
    message.lastUndelegationTimeList = object.last_undelegation_time_list?.map(e => HostChainEpochTime.fromAmino(e)) || [];
    message.undelegationEpochList = object.undelegation_epoch_list?.map(e => HostChainUndelegationEpoch.fromAmino(e)) || [];
    message.delegateTransferSessionList = object.delegate_transfer_session_list?.map(e => DelegateTransferSession.fromAmino(e)) || [];
    message.sweepTransferList = object.sweep_transfer_list?.map(e => SweepTransfer.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.hostChainList) {
      obj.host_chain_list = message.hostChainList.map(e => e ? HostChain.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.host_chain_list = message.hostChainList;
    }
    if (message.hostChainStateList) {
      obj.host_chain_state_list = message.hostChainStateList.map(e => e ? HostChainState.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.host_chain_state_list = message.hostChainStateList;
    }
    if (message.undelegationList) {
      obj.undelegation_list = message.undelegationList.map(e => e ? Undelegation.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.undelegation_list = message.undelegationList;
    }
    if (message.channelUndelegationList) {
      obj.channel_undelegation_list = message.channelUndelegationList.map(e => e ? ChannelUndelegation.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.channel_undelegation_list = message.channelUndelegationList;
    }
    if (message.replyDataList) {
      obj.reply_data_list = message.replyDataList.map(e => e ? ReplyData.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.reply_data_list = message.replyDataList;
    }
    if (message.redeemableLsmList) {
      obj.redeemable_lsm_list = message.redeemableLsmList.map(e => e ? RedeemableLsm.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.redeemable_lsm_list = message.redeemableLsmList;
    }
    if (message.failedLsmTransferList) {
      obj.failed_lsm_transfer_list = message.failedLsmTransferList.map(e => e ? FailedLsmTransfer.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.failed_lsm_transfer_list = message.failedLsmTransferList;
    }
    if (message.multiSigConnectionList) {
      obj.multi_sig_connection_list = message.multiSigConnectionList.map(e => e ? MultiSigConnection.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.multi_sig_connection_list = message.multiSigConnectionList;
    }
    if (message.multiSigPacketList) {
      obj.multi_sig_packet_list = message.multiSigPacketList.map(e => e ? MultiSigPacket.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.multi_sig_packet_list = message.multiSigPacketList;
    }
    if (message.loopBackPacketList) {
      obj.loop_back_packet_list = message.loopBackPacketList.map(e => e ? LoopBackPacket.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.loop_back_packet_list = message.loopBackPacketList;
    }
    obj.loop_back_packet_last_id = message.loopBackPacketLastId !== BigInt(0) ? message.loopBackPacketLastId.toString() : undefined;
    if (message.lastDelegationTimeList) {
      obj.last_delegation_time_list = message.lastDelegationTimeList.map(e => e ? HostChainEpochTime.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.last_delegation_time_list = message.lastDelegationTimeList;
    }
    if (message.lastRedelegationTimeList) {
      obj.last_redelegation_time_list = message.lastRedelegationTimeList.map(e => e ? HostChainEpochTime.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.last_redelegation_time_list = message.lastRedelegationTimeList;
    }
    if (message.lastLsmRedeemTimeList) {
      obj.last_lsm_redeem_time_list = message.lastLsmRedeemTimeList.map(e => e ? HostChainEpochTime.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.last_lsm_redeem_time_list = message.lastLsmRedeemTimeList;
    }
    if (message.lastUndelegationTimeList) {
      obj.last_undelegation_time_list = message.lastUndelegationTimeList.map(e => e ? HostChainEpochTime.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.last_undelegation_time_list = message.lastUndelegationTimeList;
    }
    if (message.undelegationEpochList) {
      obj.undelegation_epoch_list = message.undelegationEpochList.map(e => e ? HostChainUndelegationEpoch.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.undelegation_epoch_list = message.undelegationEpochList;
    }
    if (message.delegateTransferSessionList) {
      obj.delegate_transfer_session_list = message.delegateTransferSessionList.map(e => e ? DelegateTransferSession.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.delegate_transfer_session_list = message.delegateTransferSessionList;
    }
    if (message.sweepTransferList) {
      obj.sweep_transfer_list = message.sweepTransferList.map(e => e ? SweepTransfer.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.sweep_transfer_list = message.sweepTransferList;
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg, useInterfaces: boolean = false): GenesisState {
    return GenesisState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseHostChainEpochTime(): HostChainEpochTime {
  return {
    hostChainId: "",
    epochTime: new Date()
  };
}
export const HostChainEpochTime = {
  typeUrl: "/pryzm.icstaking.v1.HostChainEpochTime",
  encode(message: HostChainEpochTime, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChainId !== "") {
      writer.uint32(10).string(message.hostChainId);
    }
    if (message.epochTime !== undefined) {
      Timestamp.encode(toTimestamp(message.epochTime), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): HostChainEpochTime {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostChainEpochTime();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChainId = reader.string();
          break;
        case 2:
          message.epochTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HostChainEpochTime>): HostChainEpochTime {
    const message = createBaseHostChainEpochTime();
    message.hostChainId = object.hostChainId ?? "";
    message.epochTime = object.epochTime ?? undefined;
    return message;
  },
  fromAmino(object: HostChainEpochTimeAmino): HostChainEpochTime {
    const message = createBaseHostChainEpochTime();
    if (object.host_chain_id !== undefined && object.host_chain_id !== null) {
      message.hostChainId = object.host_chain_id;
    }
    if (object.epoch_time !== undefined && object.epoch_time !== null) {
      message.epochTime = fromTimestamp(Timestamp.fromAmino(object.epoch_time));
    }
    return message;
  },
  toAmino(message: HostChainEpochTime, useInterfaces: boolean = false): HostChainEpochTimeAmino {
    const obj: any = {};
    obj.host_chain_id = message.hostChainId === "" ? undefined : message.hostChainId;
    obj.epoch_time = message.epochTime ? Timestamp.toAmino(toTimestamp(message.epochTime)) : undefined;
    return obj;
  },
  fromAminoMsg(object: HostChainEpochTimeAminoMsg): HostChainEpochTime {
    return HostChainEpochTime.fromAmino(object.value);
  },
  fromProtoMsg(message: HostChainEpochTimeProtoMsg, useInterfaces: boolean = false): HostChainEpochTime {
    return HostChainEpochTime.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: HostChainEpochTime): Uint8Array {
    return HostChainEpochTime.encode(message).finish();
  },
  toProtoMsg(message: HostChainEpochTime): HostChainEpochTimeProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.HostChainEpochTime",
      value: HostChainEpochTime.encode(message).finish()
    };
  }
};
function createBaseHostChainUndelegationEpoch(): HostChainUndelegationEpoch {
  return {
    hostChainId: "",
    undelegationEpoch: BigInt(0)
  };
}
export const HostChainUndelegationEpoch = {
  typeUrl: "/pryzm.icstaking.v1.HostChainUndelegationEpoch",
  encode(message: HostChainUndelegationEpoch, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostChainId !== "") {
      writer.uint32(10).string(message.hostChainId);
    }
    if (message.undelegationEpoch !== BigInt(0)) {
      writer.uint32(16).uint64(message.undelegationEpoch);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): HostChainUndelegationEpoch {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostChainUndelegationEpoch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostChainId = reader.string();
          break;
        case 2:
          message.undelegationEpoch = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HostChainUndelegationEpoch>): HostChainUndelegationEpoch {
    const message = createBaseHostChainUndelegationEpoch();
    message.hostChainId = object.hostChainId ?? "";
    message.undelegationEpoch = object.undelegationEpoch !== undefined && object.undelegationEpoch !== null ? BigInt(object.undelegationEpoch.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: HostChainUndelegationEpochAmino): HostChainUndelegationEpoch {
    const message = createBaseHostChainUndelegationEpoch();
    if (object.host_chain_id !== undefined && object.host_chain_id !== null) {
      message.hostChainId = object.host_chain_id;
    }
    if (object.undelegation_epoch !== undefined && object.undelegation_epoch !== null) {
      message.undelegationEpoch = BigInt(object.undelegation_epoch);
    }
    return message;
  },
  toAmino(message: HostChainUndelegationEpoch, useInterfaces: boolean = false): HostChainUndelegationEpochAmino {
    const obj: any = {};
    obj.host_chain_id = message.hostChainId === "" ? undefined : message.hostChainId;
    obj.undelegation_epoch = message.undelegationEpoch !== BigInt(0) ? message.undelegationEpoch.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: HostChainUndelegationEpochAminoMsg): HostChainUndelegationEpoch {
    return HostChainUndelegationEpoch.fromAmino(object.value);
  },
  fromProtoMsg(message: HostChainUndelegationEpochProtoMsg, useInterfaces: boolean = false): HostChainUndelegationEpoch {
    return HostChainUndelegationEpoch.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: HostChainUndelegationEpoch): Uint8Array {
    return HostChainUndelegationEpoch.encode(message).finish();
  },
  toProtoMsg(message: HostChainUndelegationEpoch): HostChainUndelegationEpochProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.HostChainUndelegationEpoch",
      value: HostChainUndelegationEpoch.encode(message).finish()
    };
  }
};