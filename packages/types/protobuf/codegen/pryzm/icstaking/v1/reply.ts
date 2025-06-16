import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { RedeemableLsm, RedeemableLsmAmino, RedeemableLsmSDKType } from "./lsm";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
/** the stored data for handling the reply of a sent ibc packet */
export interface ReplyData {
  /** the identifier of the bridge */
  bridgeId: string;
  /** this was the identifier of the sent packet and the key for ReplyData, but from icstaking v3 this field is converted to key string */
  /** @deprecated */
  packetId: PacketId | undefined;
  hostChainId: string;
  /** serialized data shared when handling the packet result */
  data: Uint8Array;
  /** the identifier of the reply data */
  key: string;
}
export interface ReplyDataProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.ReplyData";
  value: Uint8Array;
}
/** the stored data for handling the reply of a sent ibc packet */
export interface ReplyDataAmino {
  /** the identifier of the bridge */
  bridge_id?: string;
  /** this was the identifier of the sent packet and the key for ReplyData, but from icstaking v3 this field is converted to key string */
  /** @deprecated */
  packet_id?: PacketIdAmino | undefined;
  host_chain_id?: string;
  /** serialized data shared when handling the packet result */
  data?: string;
  /** the identifier of the reply data */
  key?: string;
}
export interface ReplyDataAminoMsg {
  type: "/pryzm.icstaking.v1.ReplyData";
  value: ReplyDataAmino;
}
/** the stored data for handling the reply of a sent ibc packet */
export interface ReplyDataSDKType {
  bridge_id: string;
  /** @deprecated */
  packet_id: PacketIdSDKType | undefined;
  host_chain_id: string;
  data: Uint8Array;
  key: string;
}
/** the id for a sent ibc packet */
/** @deprecated */
export interface PacketId {
  portId: string;
  channelId: string;
  sequence: bigint;
}
export interface PacketIdProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.PacketId";
  value: Uint8Array;
}
/** the id for a sent ibc packet */
/** @deprecated */
export interface PacketIdAmino {
  port_id?: string;
  channel_id?: string;
  sequence?: string;
}
export interface PacketIdAminoMsg {
  type: "/pryzm.icstaking.v1.PacketId";
  value: PacketIdAmino;
}
/** the id for a sent ibc packet */
/** @deprecated */
export interface PacketIdSDKType {
  port_id: string;
  channel_id: string;
  sequence: bigint;
}
/** The reply data for DelegateTransferBridge */
export interface DelegateTransferReplyData {
  /** the identifier of the transfer session */
  transferSession: string;
  /** the amount being transferred */
  amount: Coin | undefined;
}
export interface DelegateTransferReplyDataProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.DelegateTransferReplyData";
  value: Uint8Array;
}
/** The reply data for DelegateTransferBridge */
export interface DelegateTransferReplyDataAmino {
  /** the identifier of the transfer session */
  transfer_session?: string;
  /** the amount being transferred */
  amount?: CoinAmino | undefined;
}
export interface DelegateTransferReplyDataAminoMsg {
  type: "/pryzm.icstaking.v1.DelegateTransferReplyData";
  value: DelegateTransferReplyDataAmino;
}
/** The reply data for DelegateTransferBridge */
export interface DelegateTransferReplyDataSDKType {
  transfer_session: string;
  amount: CoinSDKType | undefined;
}
/** A session of token transfer to a host chain from multiple channels, used in DelegateTransferBridge */
export interface DelegateTransferSession {
  /** a generated id for the session */
  id: string;
  /** a list of packet states, determining whether the packet is finalized (either succeeded or failed) */
  packetStates: TransferPacketState[];
}
export interface DelegateTransferSessionProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.DelegateTransferSession";
  value: Uint8Array;
}
/** A session of token transfer to a host chain from multiple channels, used in DelegateTransferBridge */
export interface DelegateTransferSessionAmino {
  /** a generated id for the session */
  id?: string;
  /** a list of packet states, determining whether the packet is finalized (either succeeded or failed) */
  packet_states?: TransferPacketStateAmino[];
}
export interface DelegateTransferSessionAminoMsg {
  type: "/pryzm.icstaking.v1.DelegateTransferSession";
  value: DelegateTransferSessionAmino;
}
/** A session of token transfer to a host chain from multiple channels, used in DelegateTransferBridge */
export interface DelegateTransferSessionSDKType {
  id: string;
  packet_states: TransferPacketStateSDKType[];
}
/** The state of a delegation transfer */
export interface TransferPacketState {
  /** packet identifier */
  packetKey: string;
  /** whether the transfer is finalized (either succeeded or failed) */
  finalized: boolean;
}
export interface TransferPacketStateProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.TransferPacketState";
  value: Uint8Array;
}
/** The state of a delegation transfer */
export interface TransferPacketStateAmino {
  /** packet identifier */
  packet_key?: string;
  /** whether the transfer is finalized (either succeeded or failed) */
  finalized?: boolean;
}
export interface TransferPacketStateAminoMsg {
  type: "/pryzm.icstaking.v1.TransferPacketState";
  value: TransferPacketStateAmino;
}
/** The state of a delegation transfer */
export interface TransferPacketStateSDKType {
  packet_key: string;
  finalized: boolean;
}
/** The reply data for DelegateBridge */
export interface DelegateReplyData {
  /** a list of delegations to different validators */
  delegations: DelegationEntry[];
}
export interface DelegateReplyDataProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.DelegateReplyData";
  value: Uint8Array;
}
/** The reply data for DelegateBridge */
export interface DelegateReplyDataAmino {
  /** a list of delegations to different validators */
  delegations?: DelegationEntryAmino[];
}
export interface DelegateReplyDataAminoMsg {
  type: "/pryzm.icstaking.v1.DelegateReplyData";
  value: DelegateReplyDataAmino;
}
/** The reply data for DelegateBridge */
export interface DelegateReplyDataSDKType {
  delegations: DelegationEntrySDKType[];
}
/** Contains info about delegating an amount of assets to a validator */
export interface DelegationEntry {
  validator: string;
  amount: string;
}
export interface DelegationEntryProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.DelegationEntry";
  value: Uint8Array;
}
/** Contains info about delegating an amount of assets to a validator */
export interface DelegationEntryAmino {
  validator?: string;
  amount?: string;
}
export interface DelegationEntryAminoMsg {
  type: "/pryzm.icstaking.v1.DelegationEntry";
  value: DelegationEntryAmino;
}
/** Contains info about delegating an amount of assets to a validator */
export interface DelegationEntrySDKType {
  validator: string;
  amount: string;
}
/** The reply data for UndelegateBridge */
export interface UndelegateReplyData {
  totalCAmount: string;
  undelegations: UndelegationEntry[];
  epochs: bigint[];
}
export interface UndelegateReplyDataProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.UndelegateReplyData";
  value: Uint8Array;
}
/** The reply data for UndelegateBridge */
export interface UndelegateReplyDataAmino {
  total_c_amount?: string;
  undelegations?: UndelegationEntryAmino[];
  epochs?: string[];
}
export interface UndelegateReplyDataAminoMsg {
  type: "/pryzm.icstaking.v1.UndelegateReplyData";
  value: UndelegateReplyDataAmino;
}
/** The reply data for UndelegateBridge */
export interface UndelegateReplyDataSDKType {
  total_c_amount: string;
  undelegations: UndelegationEntrySDKType[];
  epochs: bigint[];
}
/** Contains info about undelegating an amount of assets from a validator */
export interface UndelegationEntry {
  validator: string;
  amount: string;
}
export interface UndelegationEntryProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.UndelegationEntry";
  value: Uint8Array;
}
/** Contains info about undelegating an amount of assets from a validator */
export interface UndelegationEntryAmino {
  validator?: string;
  amount?: string;
}
export interface UndelegationEntryAminoMsg {
  type: "/pryzm.icstaking.v1.UndelegationEntry";
  value: UndelegationEntryAmino;
}
/** Contains info about undelegating an amount of assets from a validator */
export interface UndelegationEntrySDKType {
  validator: string;
  amount: string;
}
/** The reply data for RedelegateBridge */
export interface RedelegateReplyData {
  redelegations: RedelegationEntry[];
}
export interface RedelegateReplyDataProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.RedelegateReplyData";
  value: Uint8Array;
}
/** The reply data for RedelegateBridge */
export interface RedelegateReplyDataAmino {
  redelegations?: RedelegationEntryAmino[];
}
export interface RedelegateReplyDataAminoMsg {
  type: "/pryzm.icstaking.v1.RedelegateReplyData";
  value: RedelegateReplyDataAmino;
}
/** The reply data for RedelegateBridge */
export interface RedelegateReplyDataSDKType {
  redelegations: RedelegationEntrySDKType[];
}
/** Contains info about redelegating an amount of assets from a validator to another validator */
export interface RedelegationEntry {
  srcValidator: string;
  dstValidator: string;
  amount: string;
}
export interface RedelegationEntryProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.RedelegationEntry";
  value: Uint8Array;
}
/** Contains info about redelegating an amount of assets from a validator to another validator */
export interface RedelegationEntryAmino {
  src_validator?: string;
  dst_validator?: string;
  amount?: string;
}
export interface RedelegationEntryAminoMsg {
  type: "/pryzm.icstaking.v1.RedelegationEntry";
  value: RedelegationEntryAmino;
}
/** Contains info about redelegating an amount of assets from a validator to another validator */
export interface RedelegationEntrySDKType {
  src_validator: string;
  dst_validator: string;
  amount: string;
}
/** The reply data used in CompoundBridge */
export interface CompoundData {
  feeAmount: string;
  compoundAmount: string;
}
export interface CompoundDataProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.CompoundData";
  value: Uint8Array;
}
/** The reply data used in CompoundBridge */
export interface CompoundDataAmino {
  fee_amount?: string;
  compound_amount?: string;
}
export interface CompoundDataAminoMsg {
  type: "/pryzm.icstaking.v1.CompoundData";
  value: CompoundDataAmino;
}
/** The reply data used in CompoundBridge */
export interface CompoundDataSDKType {
  fee_amount: string;
  compound_amount: string;
}
export interface CollectUndelegatedReplyData {
  undelegatedAmount: string;
}
export interface CollectUndelegatedReplyDataProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.CollectUndelegatedReplyData";
  value: Uint8Array;
}
export interface CollectUndelegatedReplyDataAmino {
  undelegated_amount?: string;
}
export interface CollectUndelegatedReplyDataAminoMsg {
  type: "/pryzm.icstaking.v1.CollectUndelegatedReplyData";
  value: CollectUndelegatedReplyDataAmino;
}
export interface CollectUndelegatedReplyDataSDKType {
  undelegated_amount: string;
}
/** The reply data used in SweepBridge */
export interface SweepData {
  /** a list containing info about the sweep operation through different channel channel */
  channelSweeps: ChannelSweep[];
  feeSweep: ChannelSweep | undefined;
}
export interface SweepDataProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.SweepData";
  value: Uint8Array;
}
/** The reply data used in SweepBridge */
export interface SweepDataAmino {
  /** a list containing info about the sweep operation through different channel channel */
  channel_sweeps?: ChannelSweepAmino[];
  fee_sweep?: ChannelSweepAmino | undefined;
}
export interface SweepDataAminoMsg {
  type: "/pryzm.icstaking.v1.SweepData";
  value: SweepDataAmino;
}
/** The reply data used in SweepBridge */
export interface SweepDataSDKType {
  channel_sweeps: ChannelSweepSDKType[];
  fee_sweep: ChannelSweepSDKType | undefined;
}
/** Contains info about the sweep operation through a channel */
export interface ChannelSweep {
  channel: string;
  /** a list of epochs that the sweep is related to */
  epochs: bigint[];
  /** the amount being swept from the host chain */
  amount: string;
  /** the timeout timestamp set on the ibc transfer */
  timeout: bigint;
}
export interface ChannelSweepProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.ChannelSweep";
  value: Uint8Array;
}
/** Contains info about the sweep operation through a channel */
export interface ChannelSweepAmino {
  channel?: string;
  /** a list of epochs that the sweep is related to */
  epochs?: string[];
  /** the amount being swept from the host chain */
  amount?: string;
  /** the timeout timestamp set on the ibc transfer */
  timeout?: string;
}
export interface ChannelSweepAminoMsg {
  type: "/pryzm.icstaking.v1.ChannelSweep";
  value: ChannelSweepAmino;
}
/** Contains info about the sweep operation through a channel */
export interface ChannelSweepSDKType {
  channel: string;
  epochs: bigint[];
  amount: string;
  timeout: bigint;
}
/** Contains info about a single LSM share transfer */
export interface LsmTransferData {
  /** which channel is being used to transfer */
  channel: string;
  /** the actual denom of the lsm token */
  denom: string;
  /** the amount being transferred */
  amount: string;
  /** the value of the lsm amount in the terms of host chain's bond token */
  value: string;
}
export interface LsmTransferDataProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.LsmTransferData";
  value: Uint8Array;
}
/** Contains info about a single LSM share transfer */
export interface LsmTransferDataAmino {
  /** which channel is being used to transfer */
  channel?: string;
  /** the actual denom of the lsm token */
  denom?: string;
  /** the amount being transferred */
  amount?: string;
  /** the value of the lsm amount in the terms of host chain's bond token */
  value?: string;
}
export interface LsmTransferDataAminoMsg {
  type: "/pryzm.icstaking.v1.LsmTransferData";
  value: LsmTransferDataAmino;
}
/** Contains info about a single LSM share transfer */
export interface LsmTransferDataSDKType {
  channel: string;
  denom: string;
  amount: string;
  value: string;
}
export interface LsmReplyData {
  redeemableLsmList: RedeemableLsm[];
}
export interface LsmReplyDataProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.LsmReplyData";
  value: Uint8Array;
}
export interface LsmReplyDataAmino {
  redeemable_lsm_list?: RedeemableLsmAmino[];
}
export interface LsmReplyDataAminoMsg {
  type: "/pryzm.icstaking.v1.LsmReplyData";
  value: LsmReplyDataAmino;
}
export interface LsmReplyDataSDKType {
  redeemable_lsm_list: RedeemableLsmSDKType[];
}
function createBaseReplyData(): ReplyData {
  return {
    bridgeId: "",
    packetId: PacketId.fromPartial({}),
    hostChainId: "",
    data: new Uint8Array(),
    key: ""
  };
}
export const ReplyData = {
  typeUrl: "/pryzm.icstaking.v1.ReplyData",
  encode(message: ReplyData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.bridgeId !== "") {
      writer.uint32(10).string(message.bridgeId);
    }
    if (message.packetId !== undefined) {
      PacketId.encode(message.packetId, writer.uint32(18).fork()).ldelim();
    }
    if (message.hostChainId !== "") {
      writer.uint32(26).string(message.hostChainId);
    }
    if (message.data.length !== 0) {
      writer.uint32(34).bytes(message.data);
    }
    if (message.key !== "") {
      writer.uint32(42).string(message.key);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ReplyData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReplyData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bridgeId = reader.string();
          break;
        case 2:
          message.packetId = PacketId.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.hostChainId = reader.string();
          break;
        case 4:
          message.data = reader.bytes();
          break;
        case 5:
          message.key = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ReplyData>): ReplyData {
    const message = createBaseReplyData();
    message.bridgeId = object.bridgeId ?? "";
    message.packetId = object.packetId !== undefined && object.packetId !== null ? PacketId.fromPartial(object.packetId) : undefined;
    message.hostChainId = object.hostChainId ?? "";
    message.data = object.data ?? new Uint8Array();
    message.key = object.key ?? "";
    return message;
  },
  fromAmino(object: ReplyDataAmino): ReplyData {
    const message = createBaseReplyData();
    if (object.bridge_id !== undefined && object.bridge_id !== null) {
      message.bridgeId = object.bridge_id;
    }
    if (object.packet_id !== undefined && object.packet_id !== null) {
      message.packetId = PacketId.fromAmino(object.packet_id);
    }
    if (object.host_chain_id !== undefined && object.host_chain_id !== null) {
      message.hostChainId = object.host_chain_id;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    return message;
  },
  toAmino(message: ReplyData, useInterfaces: boolean = false): ReplyDataAmino {
    const obj: any = {};
    obj.bridge_id = message.bridgeId === "" ? undefined : message.bridgeId;
    obj.packet_id = message.packetId ? PacketId.toAmino(message.packetId, useInterfaces) : undefined;
    obj.host_chain_id = message.hostChainId === "" ? undefined : message.hostChainId;
    obj.data = message.data ? base64FromBytes(message.data) : undefined;
    obj.key = message.key === "" ? undefined : message.key;
    return obj;
  },
  fromAminoMsg(object: ReplyDataAminoMsg): ReplyData {
    return ReplyData.fromAmino(object.value);
  },
  fromProtoMsg(message: ReplyDataProtoMsg, useInterfaces: boolean = false): ReplyData {
    return ReplyData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ReplyData): Uint8Array {
    return ReplyData.encode(message).finish();
  },
  toProtoMsg(message: ReplyData): ReplyDataProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.ReplyData",
      value: ReplyData.encode(message).finish()
    };
  }
};
function createBasePacketId(): PacketId {
  return {
    portId: "",
    channelId: "",
    sequence: BigInt(0)
  };
}
export const PacketId = {
  typeUrl: "/pryzm.icstaking.v1.PacketId",
  encode(message: PacketId, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PacketId {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacketId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.sequence = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PacketId>): PacketId {
    const message = createBasePacketId();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.sequence = object.sequence !== undefined && object.sequence !== null ? BigInt(object.sequence.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: PacketIdAmino): PacketId {
    const message = createBasePacketId();
    if (object.port_id !== undefined && object.port_id !== null) {
      message.portId = object.port_id;
    }
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channelId = object.channel_id;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence);
    }
    return message;
  },
  toAmino(message: PacketId, useInterfaces: boolean = false): PacketIdAmino {
    const obj: any = {};
    obj.port_id = message.portId === "" ? undefined : message.portId;
    obj.channel_id = message.channelId === "" ? undefined : message.channelId;
    obj.sequence = message.sequence !== BigInt(0) ? message.sequence.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: PacketIdAminoMsg): PacketId {
    return PacketId.fromAmino(object.value);
  },
  fromProtoMsg(message: PacketIdProtoMsg, useInterfaces: boolean = false): PacketId {
    return PacketId.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PacketId): Uint8Array {
    return PacketId.encode(message).finish();
  },
  toProtoMsg(message: PacketId): PacketIdProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.PacketId",
      value: PacketId.encode(message).finish()
    };
  }
};
function createBaseDelegateTransferReplyData(): DelegateTransferReplyData {
  return {
    transferSession: "",
    amount: Coin.fromPartial({})
  };
}
export const DelegateTransferReplyData = {
  typeUrl: "/pryzm.icstaking.v1.DelegateTransferReplyData",
  encode(message: DelegateTransferReplyData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.transferSession !== "") {
      writer.uint32(10).string(message.transferSession);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DelegateTransferReplyData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegateTransferReplyData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transferSession = reader.string();
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
  fromPartial(object: Partial<DelegateTransferReplyData>): DelegateTransferReplyData {
    const message = createBaseDelegateTransferReplyData();
    message.transferSession = object.transferSession ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: DelegateTransferReplyDataAmino): DelegateTransferReplyData {
    const message = createBaseDelegateTransferReplyData();
    if (object.transfer_session !== undefined && object.transfer_session !== null) {
      message.transferSession = object.transfer_session;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: DelegateTransferReplyData, useInterfaces: boolean = false): DelegateTransferReplyDataAmino {
    const obj: any = {};
    obj.transfer_session = message.transferSession === "" ? undefined : message.transferSession;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: DelegateTransferReplyDataAminoMsg): DelegateTransferReplyData {
    return DelegateTransferReplyData.fromAmino(object.value);
  },
  fromProtoMsg(message: DelegateTransferReplyDataProtoMsg, useInterfaces: boolean = false): DelegateTransferReplyData {
    return DelegateTransferReplyData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DelegateTransferReplyData): Uint8Array {
    return DelegateTransferReplyData.encode(message).finish();
  },
  toProtoMsg(message: DelegateTransferReplyData): DelegateTransferReplyDataProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.DelegateTransferReplyData",
      value: DelegateTransferReplyData.encode(message).finish()
    };
  }
};
function createBaseDelegateTransferSession(): DelegateTransferSession {
  return {
    id: "",
    packetStates: []
  };
}
export const DelegateTransferSession = {
  typeUrl: "/pryzm.icstaking.v1.DelegateTransferSession",
  encode(message: DelegateTransferSession, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.packetStates) {
      TransferPacketState.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DelegateTransferSession {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegateTransferSession();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.packetStates.push(TransferPacketState.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DelegateTransferSession>): DelegateTransferSession {
    const message = createBaseDelegateTransferSession();
    message.id = object.id ?? "";
    message.packetStates = object.packetStates?.map(e => TransferPacketState.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: DelegateTransferSessionAmino): DelegateTransferSession {
    const message = createBaseDelegateTransferSession();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    message.packetStates = object.packet_states?.map(e => TransferPacketState.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: DelegateTransferSession, useInterfaces: boolean = false): DelegateTransferSessionAmino {
    const obj: any = {};
    obj.id = message.id === "" ? undefined : message.id;
    if (message.packetStates) {
      obj.packet_states = message.packetStates.map(e => e ? TransferPacketState.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.packet_states = message.packetStates;
    }
    return obj;
  },
  fromAminoMsg(object: DelegateTransferSessionAminoMsg): DelegateTransferSession {
    return DelegateTransferSession.fromAmino(object.value);
  },
  fromProtoMsg(message: DelegateTransferSessionProtoMsg, useInterfaces: boolean = false): DelegateTransferSession {
    return DelegateTransferSession.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DelegateTransferSession): Uint8Array {
    return DelegateTransferSession.encode(message).finish();
  },
  toProtoMsg(message: DelegateTransferSession): DelegateTransferSessionProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.DelegateTransferSession",
      value: DelegateTransferSession.encode(message).finish()
    };
  }
};
function createBaseTransferPacketState(): TransferPacketState {
  return {
    packetKey: "",
    finalized: false
  };
}
export const TransferPacketState = {
  typeUrl: "/pryzm.icstaking.v1.TransferPacketState",
  encode(message: TransferPacketState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.packetKey !== "") {
      writer.uint32(10).string(message.packetKey);
    }
    if (message.finalized === true) {
      writer.uint32(16).bool(message.finalized);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TransferPacketState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransferPacketState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packetKey = reader.string();
          break;
        case 2:
          message.finalized = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TransferPacketState>): TransferPacketState {
    const message = createBaseTransferPacketState();
    message.packetKey = object.packetKey ?? "";
    message.finalized = object.finalized ?? false;
    return message;
  },
  fromAmino(object: TransferPacketStateAmino): TransferPacketState {
    const message = createBaseTransferPacketState();
    if (object.packet_key !== undefined && object.packet_key !== null) {
      message.packetKey = object.packet_key;
    }
    if (object.finalized !== undefined && object.finalized !== null) {
      message.finalized = object.finalized;
    }
    return message;
  },
  toAmino(message: TransferPacketState, useInterfaces: boolean = false): TransferPacketStateAmino {
    const obj: any = {};
    obj.packet_key = message.packetKey === "" ? undefined : message.packetKey;
    obj.finalized = message.finalized === false ? undefined : message.finalized;
    return obj;
  },
  fromAminoMsg(object: TransferPacketStateAminoMsg): TransferPacketState {
    return TransferPacketState.fromAmino(object.value);
  },
  fromProtoMsg(message: TransferPacketStateProtoMsg, useInterfaces: boolean = false): TransferPacketState {
    return TransferPacketState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TransferPacketState): Uint8Array {
    return TransferPacketState.encode(message).finish();
  },
  toProtoMsg(message: TransferPacketState): TransferPacketStateProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.TransferPacketState",
      value: TransferPacketState.encode(message).finish()
    };
  }
};
function createBaseDelegateReplyData(): DelegateReplyData {
  return {
    delegations: []
  };
}
export const DelegateReplyData = {
  typeUrl: "/pryzm.icstaking.v1.DelegateReplyData",
  encode(message: DelegateReplyData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.delegations) {
      DelegationEntry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DelegateReplyData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegateReplyData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegations.push(DelegationEntry.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DelegateReplyData>): DelegateReplyData {
    const message = createBaseDelegateReplyData();
    message.delegations = object.delegations?.map(e => DelegationEntry.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: DelegateReplyDataAmino): DelegateReplyData {
    const message = createBaseDelegateReplyData();
    message.delegations = object.delegations?.map(e => DelegationEntry.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: DelegateReplyData, useInterfaces: boolean = false): DelegateReplyDataAmino {
    const obj: any = {};
    if (message.delegations) {
      obj.delegations = message.delegations.map(e => e ? DelegationEntry.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.delegations = message.delegations;
    }
    return obj;
  },
  fromAminoMsg(object: DelegateReplyDataAminoMsg): DelegateReplyData {
    return DelegateReplyData.fromAmino(object.value);
  },
  fromProtoMsg(message: DelegateReplyDataProtoMsg, useInterfaces: boolean = false): DelegateReplyData {
    return DelegateReplyData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DelegateReplyData): Uint8Array {
    return DelegateReplyData.encode(message).finish();
  },
  toProtoMsg(message: DelegateReplyData): DelegateReplyDataProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.DelegateReplyData",
      value: DelegateReplyData.encode(message).finish()
    };
  }
};
function createBaseDelegationEntry(): DelegationEntry {
  return {
    validator: "",
    amount: ""
  };
}
export const DelegationEntry = {
  typeUrl: "/pryzm.icstaking.v1.DelegationEntry",
  encode(message: DelegationEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validator !== "") {
      writer.uint32(10).string(message.validator);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DelegationEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegationEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DelegationEntry>): DelegationEntry {
    const message = createBaseDelegationEntry();
    message.validator = object.validator ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: DelegationEntryAmino): DelegationEntry {
    const message = createBaseDelegationEntry();
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = object.validator;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: DelegationEntry, useInterfaces: boolean = false): DelegationEntryAmino {
    const obj: any = {};
    obj.validator = message.validator === "" ? undefined : message.validator;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: DelegationEntryAminoMsg): DelegationEntry {
    return DelegationEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: DelegationEntryProtoMsg, useInterfaces: boolean = false): DelegationEntry {
    return DelegationEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DelegationEntry): Uint8Array {
    return DelegationEntry.encode(message).finish();
  },
  toProtoMsg(message: DelegationEntry): DelegationEntryProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.DelegationEntry",
      value: DelegationEntry.encode(message).finish()
    };
  }
};
function createBaseUndelegateReplyData(): UndelegateReplyData {
  return {
    totalCAmount: "",
    undelegations: [],
    epochs: []
  };
}
export const UndelegateReplyData = {
  typeUrl: "/pryzm.icstaking.v1.UndelegateReplyData",
  encode(message: UndelegateReplyData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.totalCAmount !== "") {
      writer.uint32(10).string(message.totalCAmount);
    }
    for (const v of message.undelegations) {
      UndelegationEntry.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(26).fork();
    for (const v of message.epochs) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UndelegateReplyData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUndelegateReplyData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalCAmount = reader.string();
          break;
        case 2:
          message.undelegations.push(UndelegationEntry.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.epochs.push(reader.uint64());
            }
          } else {
            message.epochs.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UndelegateReplyData>): UndelegateReplyData {
    const message = createBaseUndelegateReplyData();
    message.totalCAmount = object.totalCAmount ?? "";
    message.undelegations = object.undelegations?.map(e => UndelegationEntry.fromPartial(e)) || [];
    message.epochs = object.epochs?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: UndelegateReplyDataAmino): UndelegateReplyData {
    const message = createBaseUndelegateReplyData();
    if (object.total_c_amount !== undefined && object.total_c_amount !== null) {
      message.totalCAmount = object.total_c_amount;
    }
    message.undelegations = object.undelegations?.map(e => UndelegationEntry.fromAmino(e)) || [];
    message.epochs = object.epochs?.map(e => BigInt(e)) || [];
    return message;
  },
  toAmino(message: UndelegateReplyData, useInterfaces: boolean = false): UndelegateReplyDataAmino {
    const obj: any = {};
    obj.total_c_amount = message.totalCAmount === "" ? undefined : message.totalCAmount;
    if (message.undelegations) {
      obj.undelegations = message.undelegations.map(e => e ? UndelegationEntry.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.undelegations = message.undelegations;
    }
    if (message.epochs) {
      obj.epochs = message.epochs.map(e => e.toString());
    } else {
      obj.epochs = message.epochs;
    }
    return obj;
  },
  fromAminoMsg(object: UndelegateReplyDataAminoMsg): UndelegateReplyData {
    return UndelegateReplyData.fromAmino(object.value);
  },
  fromProtoMsg(message: UndelegateReplyDataProtoMsg, useInterfaces: boolean = false): UndelegateReplyData {
    return UndelegateReplyData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UndelegateReplyData): Uint8Array {
    return UndelegateReplyData.encode(message).finish();
  },
  toProtoMsg(message: UndelegateReplyData): UndelegateReplyDataProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.UndelegateReplyData",
      value: UndelegateReplyData.encode(message).finish()
    };
  }
};
function createBaseUndelegationEntry(): UndelegationEntry {
  return {
    validator: "",
    amount: ""
  };
}
export const UndelegationEntry = {
  typeUrl: "/pryzm.icstaking.v1.UndelegationEntry",
  encode(message: UndelegationEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validator !== "") {
      writer.uint32(10).string(message.validator);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UndelegationEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUndelegationEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UndelegationEntry>): UndelegationEntry {
    const message = createBaseUndelegationEntry();
    message.validator = object.validator ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: UndelegationEntryAmino): UndelegationEntry {
    const message = createBaseUndelegationEntry();
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = object.validator;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: UndelegationEntry, useInterfaces: boolean = false): UndelegationEntryAmino {
    const obj: any = {};
    obj.validator = message.validator === "" ? undefined : message.validator;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: UndelegationEntryAminoMsg): UndelegationEntry {
    return UndelegationEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: UndelegationEntryProtoMsg, useInterfaces: boolean = false): UndelegationEntry {
    return UndelegationEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UndelegationEntry): Uint8Array {
    return UndelegationEntry.encode(message).finish();
  },
  toProtoMsg(message: UndelegationEntry): UndelegationEntryProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.UndelegationEntry",
      value: UndelegationEntry.encode(message).finish()
    };
  }
};
function createBaseRedelegateReplyData(): RedelegateReplyData {
  return {
    redelegations: []
  };
}
export const RedelegateReplyData = {
  typeUrl: "/pryzm.icstaking.v1.RedelegateReplyData",
  encode(message: RedelegateReplyData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.redelegations) {
      RedelegationEntry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RedelegateReplyData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedelegateReplyData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.redelegations.push(RedelegationEntry.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RedelegateReplyData>): RedelegateReplyData {
    const message = createBaseRedelegateReplyData();
    message.redelegations = object.redelegations?.map(e => RedelegationEntry.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: RedelegateReplyDataAmino): RedelegateReplyData {
    const message = createBaseRedelegateReplyData();
    message.redelegations = object.redelegations?.map(e => RedelegationEntry.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: RedelegateReplyData, useInterfaces: boolean = false): RedelegateReplyDataAmino {
    const obj: any = {};
    if (message.redelegations) {
      obj.redelegations = message.redelegations.map(e => e ? RedelegationEntry.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.redelegations = message.redelegations;
    }
    return obj;
  },
  fromAminoMsg(object: RedelegateReplyDataAminoMsg): RedelegateReplyData {
    return RedelegateReplyData.fromAmino(object.value);
  },
  fromProtoMsg(message: RedelegateReplyDataProtoMsg, useInterfaces: boolean = false): RedelegateReplyData {
    return RedelegateReplyData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RedelegateReplyData): Uint8Array {
    return RedelegateReplyData.encode(message).finish();
  },
  toProtoMsg(message: RedelegateReplyData): RedelegateReplyDataProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.RedelegateReplyData",
      value: RedelegateReplyData.encode(message).finish()
    };
  }
};
function createBaseRedelegationEntry(): RedelegationEntry {
  return {
    srcValidator: "",
    dstValidator: "",
    amount: ""
  };
}
export const RedelegationEntry = {
  typeUrl: "/pryzm.icstaking.v1.RedelegationEntry",
  encode(message: RedelegationEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.srcValidator !== "") {
      writer.uint32(10).string(message.srcValidator);
    }
    if (message.dstValidator !== "") {
      writer.uint32(18).string(message.dstValidator);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RedelegationEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedelegationEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.srcValidator = reader.string();
          break;
        case 2:
          message.dstValidator = reader.string();
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
  fromPartial(object: Partial<RedelegationEntry>): RedelegationEntry {
    const message = createBaseRedelegationEntry();
    message.srcValidator = object.srcValidator ?? "";
    message.dstValidator = object.dstValidator ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: RedelegationEntryAmino): RedelegationEntry {
    const message = createBaseRedelegationEntry();
    if (object.src_validator !== undefined && object.src_validator !== null) {
      message.srcValidator = object.src_validator;
    }
    if (object.dst_validator !== undefined && object.dst_validator !== null) {
      message.dstValidator = object.dst_validator;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: RedelegationEntry, useInterfaces: boolean = false): RedelegationEntryAmino {
    const obj: any = {};
    obj.src_validator = message.srcValidator === "" ? undefined : message.srcValidator;
    obj.dst_validator = message.dstValidator === "" ? undefined : message.dstValidator;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: RedelegationEntryAminoMsg): RedelegationEntry {
    return RedelegationEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: RedelegationEntryProtoMsg, useInterfaces: boolean = false): RedelegationEntry {
    return RedelegationEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RedelegationEntry): Uint8Array {
    return RedelegationEntry.encode(message).finish();
  },
  toProtoMsg(message: RedelegationEntry): RedelegationEntryProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.RedelegationEntry",
      value: RedelegationEntry.encode(message).finish()
    };
  }
};
function createBaseCompoundData(): CompoundData {
  return {
    feeAmount: "",
    compoundAmount: ""
  };
}
export const CompoundData = {
  typeUrl: "/pryzm.icstaking.v1.CompoundData",
  encode(message: CompoundData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.feeAmount !== "") {
      writer.uint32(10).string(message.feeAmount);
    }
    if (message.compoundAmount !== "") {
      writer.uint32(18).string(message.compoundAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CompoundData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompoundData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.feeAmount = reader.string();
          break;
        case 2:
          message.compoundAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CompoundData>): CompoundData {
    const message = createBaseCompoundData();
    message.feeAmount = object.feeAmount ?? "";
    message.compoundAmount = object.compoundAmount ?? "";
    return message;
  },
  fromAmino(object: CompoundDataAmino): CompoundData {
    const message = createBaseCompoundData();
    if (object.fee_amount !== undefined && object.fee_amount !== null) {
      message.feeAmount = object.fee_amount;
    }
    if (object.compound_amount !== undefined && object.compound_amount !== null) {
      message.compoundAmount = object.compound_amount;
    }
    return message;
  },
  toAmino(message: CompoundData, useInterfaces: boolean = false): CompoundDataAmino {
    const obj: any = {};
    obj.fee_amount = message.feeAmount === "" ? undefined : message.feeAmount;
    obj.compound_amount = message.compoundAmount === "" ? undefined : message.compoundAmount;
    return obj;
  },
  fromAminoMsg(object: CompoundDataAminoMsg): CompoundData {
    return CompoundData.fromAmino(object.value);
  },
  fromProtoMsg(message: CompoundDataProtoMsg, useInterfaces: boolean = false): CompoundData {
    return CompoundData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CompoundData): Uint8Array {
    return CompoundData.encode(message).finish();
  },
  toProtoMsg(message: CompoundData): CompoundDataProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.CompoundData",
      value: CompoundData.encode(message).finish()
    };
  }
};
function createBaseCollectUndelegatedReplyData(): CollectUndelegatedReplyData {
  return {
    undelegatedAmount: ""
  };
}
export const CollectUndelegatedReplyData = {
  typeUrl: "/pryzm.icstaking.v1.CollectUndelegatedReplyData",
  encode(message: CollectUndelegatedReplyData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.undelegatedAmount !== "") {
      writer.uint32(10).string(message.undelegatedAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CollectUndelegatedReplyData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCollectUndelegatedReplyData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.undelegatedAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CollectUndelegatedReplyData>): CollectUndelegatedReplyData {
    const message = createBaseCollectUndelegatedReplyData();
    message.undelegatedAmount = object.undelegatedAmount ?? "";
    return message;
  },
  fromAmino(object: CollectUndelegatedReplyDataAmino): CollectUndelegatedReplyData {
    const message = createBaseCollectUndelegatedReplyData();
    if (object.undelegated_amount !== undefined && object.undelegated_amount !== null) {
      message.undelegatedAmount = object.undelegated_amount;
    }
    return message;
  },
  toAmino(message: CollectUndelegatedReplyData, useInterfaces: boolean = false): CollectUndelegatedReplyDataAmino {
    const obj: any = {};
    obj.undelegated_amount = message.undelegatedAmount === "" ? undefined : message.undelegatedAmount;
    return obj;
  },
  fromAminoMsg(object: CollectUndelegatedReplyDataAminoMsg): CollectUndelegatedReplyData {
    return CollectUndelegatedReplyData.fromAmino(object.value);
  },
  fromProtoMsg(message: CollectUndelegatedReplyDataProtoMsg, useInterfaces: boolean = false): CollectUndelegatedReplyData {
    return CollectUndelegatedReplyData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CollectUndelegatedReplyData): Uint8Array {
    return CollectUndelegatedReplyData.encode(message).finish();
  },
  toProtoMsg(message: CollectUndelegatedReplyData): CollectUndelegatedReplyDataProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.CollectUndelegatedReplyData",
      value: CollectUndelegatedReplyData.encode(message).finish()
    };
  }
};
function createBaseSweepData(): SweepData {
  return {
    channelSweeps: [],
    feeSweep: ChannelSweep.fromPartial({})
  };
}
export const SweepData = {
  typeUrl: "/pryzm.icstaking.v1.SweepData",
  encode(message: SweepData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.channelSweeps) {
      ChannelSweep.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.feeSweep !== undefined) {
      ChannelSweep.encode(message.feeSweep, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SweepData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSweepData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelSweeps.push(ChannelSweep.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.feeSweep = ChannelSweep.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SweepData>): SweepData {
    const message = createBaseSweepData();
    message.channelSweeps = object.channelSweeps?.map(e => ChannelSweep.fromPartial(e)) || [];
    message.feeSweep = object.feeSweep !== undefined && object.feeSweep !== null ? ChannelSweep.fromPartial(object.feeSweep) : undefined;
    return message;
  },
  fromAmino(object: SweepDataAmino): SweepData {
    const message = createBaseSweepData();
    message.channelSweeps = object.channel_sweeps?.map(e => ChannelSweep.fromAmino(e)) || [];
    if (object.fee_sweep !== undefined && object.fee_sweep !== null) {
      message.feeSweep = ChannelSweep.fromAmino(object.fee_sweep);
    }
    return message;
  },
  toAmino(message: SweepData, useInterfaces: boolean = false): SweepDataAmino {
    const obj: any = {};
    if (message.channelSweeps) {
      obj.channel_sweeps = message.channelSweeps.map(e => e ? ChannelSweep.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.channel_sweeps = message.channelSweeps;
    }
    obj.fee_sweep = message.feeSweep ? ChannelSweep.toAmino(message.feeSweep, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: SweepDataAminoMsg): SweepData {
    return SweepData.fromAmino(object.value);
  },
  fromProtoMsg(message: SweepDataProtoMsg, useInterfaces: boolean = false): SweepData {
    return SweepData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SweepData): Uint8Array {
    return SweepData.encode(message).finish();
  },
  toProtoMsg(message: SweepData): SweepDataProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.SweepData",
      value: SweepData.encode(message).finish()
    };
  }
};
function createBaseChannelSweep(): ChannelSweep {
  return {
    channel: "",
    epochs: [],
    amount: "",
    timeout: BigInt(0)
  };
}
export const ChannelSweep = {
  typeUrl: "/pryzm.icstaking.v1.ChannelSweep",
  encode(message: ChannelSweep, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.channel !== "") {
      writer.uint32(10).string(message.channel);
    }
    writer.uint32(18).fork();
    for (const v of message.epochs) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    if (message.timeout !== BigInt(0)) {
      writer.uint32(32).uint64(message.timeout);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ChannelSweep {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelSweep();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.epochs.push(reader.uint64());
            }
          } else {
            message.epochs.push(reader.uint64());
          }
          break;
        case 3:
          message.amount = reader.string();
          break;
        case 4:
          message.timeout = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ChannelSweep>): ChannelSweep {
    const message = createBaseChannelSweep();
    message.channel = object.channel ?? "";
    message.epochs = object.epochs?.map(e => BigInt(e.toString())) || [];
    message.amount = object.amount ?? "";
    message.timeout = object.timeout !== undefined && object.timeout !== null ? BigInt(object.timeout.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ChannelSweepAmino): ChannelSweep {
    const message = createBaseChannelSweep();
    if (object.channel !== undefined && object.channel !== null) {
      message.channel = object.channel;
    }
    message.epochs = object.epochs?.map(e => BigInt(e)) || [];
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.timeout !== undefined && object.timeout !== null) {
      message.timeout = BigInt(object.timeout);
    }
    return message;
  },
  toAmino(message: ChannelSweep, useInterfaces: boolean = false): ChannelSweepAmino {
    const obj: any = {};
    obj.channel = message.channel === "" ? undefined : message.channel;
    if (message.epochs) {
      obj.epochs = message.epochs.map(e => e.toString());
    } else {
      obj.epochs = message.epochs;
    }
    obj.amount = message.amount === "" ? undefined : message.amount;
    obj.timeout = message.timeout !== BigInt(0) ? message.timeout.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ChannelSweepAminoMsg): ChannelSweep {
    return ChannelSweep.fromAmino(object.value);
  },
  fromProtoMsg(message: ChannelSweepProtoMsg, useInterfaces: boolean = false): ChannelSweep {
    return ChannelSweep.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ChannelSweep): Uint8Array {
    return ChannelSweep.encode(message).finish();
  },
  toProtoMsg(message: ChannelSweep): ChannelSweepProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.ChannelSweep",
      value: ChannelSweep.encode(message).finish()
    };
  }
};
function createBaseLsmTransferData(): LsmTransferData {
  return {
    channel: "",
    denom: "",
    amount: "",
    value: ""
  };
}
export const LsmTransferData = {
  typeUrl: "/pryzm.icstaking.v1.LsmTransferData",
  encode(message: LsmTransferData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.channel !== "") {
      writer.uint32(10).string(message.channel);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    if (message.value !== "") {
      writer.uint32(34).string(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LsmTransferData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLsmTransferData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channel = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        case 4:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LsmTransferData>): LsmTransferData {
    const message = createBaseLsmTransferData();
    message.channel = object.channel ?? "";
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? "";
    message.value = object.value ?? "";
    return message;
  },
  fromAmino(object: LsmTransferDataAmino): LsmTransferData {
    const message = createBaseLsmTransferData();
    if (object.channel !== undefined && object.channel !== null) {
      message.channel = object.channel;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toAmino(message: LsmTransferData, useInterfaces: boolean = false): LsmTransferDataAmino {
    const obj: any = {};
    obj.channel = message.channel === "" ? undefined : message.channel;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.amount = message.amount === "" ? undefined : message.amount;
    obj.value = message.value === "" ? undefined : message.value;
    return obj;
  },
  fromAminoMsg(object: LsmTransferDataAminoMsg): LsmTransferData {
    return LsmTransferData.fromAmino(object.value);
  },
  fromProtoMsg(message: LsmTransferDataProtoMsg, useInterfaces: boolean = false): LsmTransferData {
    return LsmTransferData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LsmTransferData): Uint8Array {
    return LsmTransferData.encode(message).finish();
  },
  toProtoMsg(message: LsmTransferData): LsmTransferDataProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.LsmTransferData",
      value: LsmTransferData.encode(message).finish()
    };
  }
};
function createBaseLsmReplyData(): LsmReplyData {
  return {
    redeemableLsmList: []
  };
}
export const LsmReplyData = {
  typeUrl: "/pryzm.icstaking.v1.LsmReplyData",
  encode(message: LsmReplyData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.redeemableLsmList) {
      RedeemableLsm.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LsmReplyData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLsmReplyData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.redeemableLsmList.push(RedeemableLsm.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LsmReplyData>): LsmReplyData {
    const message = createBaseLsmReplyData();
    message.redeemableLsmList = object.redeemableLsmList?.map(e => RedeemableLsm.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: LsmReplyDataAmino): LsmReplyData {
    const message = createBaseLsmReplyData();
    message.redeemableLsmList = object.redeemable_lsm_list?.map(e => RedeemableLsm.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: LsmReplyData, useInterfaces: boolean = false): LsmReplyDataAmino {
    const obj: any = {};
    if (message.redeemableLsmList) {
      obj.redeemable_lsm_list = message.redeemableLsmList.map(e => e ? RedeemableLsm.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.redeemable_lsm_list = message.redeemableLsmList;
    }
    return obj;
  },
  fromAminoMsg(object: LsmReplyDataAminoMsg): LsmReplyData {
    return LsmReplyData.fromAmino(object.value);
  },
  fromProtoMsg(message: LsmReplyDataProtoMsg, useInterfaces: boolean = false): LsmReplyData {
    return LsmReplyData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LsmReplyData): Uint8Array {
    return LsmReplyData.encode(message).finish();
  },
  toProtoMsg(message: LsmReplyData): LsmReplyDataProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.LsmReplyData",
      value: LsmReplyData.encode(message).finish()
    };
  }
};