//@ts-nocheck
import { ConsumerParams, ConsumerParamsAmino, ConsumerParamsSDKType, ProviderInfo, ProviderInfoAmino, ProviderInfoSDKType } from "../../v1/shared_consumer";
import { ClientState, ClientStateAmino, ClientStateSDKType, ConsensusState, ConsensusStateAmino, ConsensusStateSDKType } from "../../../../ibc/lightclients/tendermint/v1/tendermint";
import { ValidatorUpdate, ValidatorUpdateAmino, ValidatorUpdateSDKType } from "../../../../tendermint/abci/types";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { ConsumerPacketData, ConsumerPacketDataAmino, ConsumerPacketDataSDKType } from "../../v1/wire";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { toTimestamp, fromTimestamp } from "../../../../helpers";
/**
 * GenesisState defines the CCV consumer genesis state
 * 
 * Note: this type is only used on consumer side and references shared types with
 * provider
 */
export interface GenesisState {
  /** ConsumerParams is a shared type with provider module */
  params: ConsumerParams | undefined;
  /** Client ID of the provider. Empty for a new chain, filled in on restart. */
  providerClientId: string;
  /** Channel ID of the provider. Empty for a new chain, filled in on restart. */
  providerChannelId: string;
  /** true for new chain, false for chain restart. */
  newChain: boolean;
  /** !!! DEPRECATED !!! ProviderClientState is deprecated. Use provider.client_state instead */
  /** @deprecated */
  providerClientState?: ClientState | undefined;
  /** !!! DEPRECATED !!! ProviderConsensusState is deprecated. Use provider.consensus_state instead */
  /** @deprecated */
  providerConsensusState?: ConsensusState | undefined;
  /** MaturingPackets nil on new chain, filled in on restart. */
  maturingPackets: MaturingVSCPacket[];
  /** !!! DEPRECATED !!!! InitialValset is deprecated. Use provider.initial_val_set instead */
  /** @deprecated */
  initialValSet: ValidatorUpdate[];
  /** HeightToValsetUpdateId nil on new chain, filled in on restart. */
  heightToValsetUpdateId: HeightToValsetUpdateID[];
  /** OutstandingDowntimes nil on new chain, filled  in on restart. */
  outstandingDowntimeSlashing: OutstandingDowntime[];
  /** PendingConsumerPackets nil on new chain, filled in on restart. */
  pendingConsumerPackets: ConsumerPacketDataList | undefined;
  /** LastTransmissionBlockHeight nil on new chain, filled in on restart. */
  lastTransmissionBlockHeight: LastTransmissionBlockHeight | undefined;
  /** flag indicating whether the consumer CCV module starts in pre-CCV state */
  preCCV: boolean;
  provider: ProviderInfo | undefined;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.GenesisState";
  value: Uint8Array;
}
/**
 * GenesisState defines the CCV consumer genesis state
 * 
 * Note: this type is only used on consumer side and references shared types with
 * provider
 */
export interface GenesisStateAmino {
  /** ConsumerParams is a shared type with provider module */
  params?: ConsumerParamsAmino | undefined;
  /** Client ID of the provider. Empty for a new chain, filled in on restart. */
  provider_client_id?: string;
  /** Channel ID of the provider. Empty for a new chain, filled in on restart. */
  provider_channel_id?: string;
  /** true for new chain, false for chain restart. */
  new_chain?: boolean;
  /** !!! DEPRECATED !!! ProviderClientState is deprecated. Use provider.client_state instead */
  /** @deprecated */
  provider_client_state?: ClientStateAmino | undefined;
  /** !!! DEPRECATED !!! ProviderConsensusState is deprecated. Use provider.consensus_state instead */
  /** @deprecated */
  provider_consensus_state?: ConsensusStateAmino | undefined;
  /** MaturingPackets nil on new chain, filled in on restart. */
  maturing_packets?: MaturingVSCPacketAmino[];
  /** !!! DEPRECATED !!!! InitialValset is deprecated. Use provider.initial_val_set instead */
  /** @deprecated */
  initial_val_set?: ValidatorUpdateAmino[];
  /** HeightToValsetUpdateId nil on new chain, filled in on restart. */
  height_to_valset_update_id?: HeightToValsetUpdateIDAmino[];
  /** OutstandingDowntimes nil on new chain, filled  in on restart. */
  outstanding_downtime_slashing?: OutstandingDowntimeAmino[];
  /** PendingConsumerPackets nil on new chain, filled in on restart. */
  pending_consumer_packets?: ConsumerPacketDataListAmino | undefined;
  /** LastTransmissionBlockHeight nil on new chain, filled in on restart. */
  last_transmission_block_height?: LastTransmissionBlockHeightAmino | undefined;
  /** flag indicating whether the consumer CCV module starts in pre-CCV state */
  preCCV?: boolean;
  provider?: ProviderInfoAmino | undefined;
}
export interface GenesisStateAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.GenesisState";
  value: GenesisStateAmino;
}
/**
 * GenesisState defines the CCV consumer genesis state
 * 
 * Note: this type is only used on consumer side and references shared types with
 * provider
 */
export interface GenesisStateSDKType {
  params: ConsumerParamsSDKType | undefined;
  provider_client_id: string;
  provider_channel_id: string;
  new_chain: boolean;
  /** @deprecated */
  provider_client_state?: ClientStateSDKType | undefined;
  /** @deprecated */
  provider_consensus_state?: ConsensusStateSDKType | undefined;
  maturing_packets: MaturingVSCPacketSDKType[];
  /** @deprecated */
  initial_val_set: ValidatorUpdateSDKType[];
  height_to_valset_update_id: HeightToValsetUpdateIDSDKType[];
  outstanding_downtime_slashing: OutstandingDowntimeSDKType[];
  pending_consumer_packets: ConsumerPacketDataListSDKType | undefined;
  last_transmission_block_height: LastTransmissionBlockHeightSDKType | undefined;
  preCCV: boolean;
  provider: ProviderInfoSDKType | undefined;
}
/**
 * HeightValsetUpdateID represents a mapping internal to the consumer CCV module
 * which links a block height to each recv valset update id.
 */
export interface HeightToValsetUpdateID {
  height: bigint;
  valsetUpdateId: bigint;
}
export interface HeightToValsetUpdateIDProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.HeightToValsetUpdateID";
  value: Uint8Array;
}
/**
 * HeightValsetUpdateID represents a mapping internal to the consumer CCV module
 * which links a block height to each recv valset update id.
 */
export interface HeightToValsetUpdateIDAmino {
  height?: string;
  valset_update_id?: string;
}
export interface HeightToValsetUpdateIDAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.HeightToValsetUpdateID";
  value: HeightToValsetUpdateIDAmino;
}
/**
 * HeightValsetUpdateID represents a mapping internal to the consumer CCV module
 * which links a block height to each recv valset update id.
 */
export interface HeightToValsetUpdateIDSDKType {
  height: bigint;
  valset_update_id: bigint;
}
/**
 * OutstandingDowntime defines the type used internally to the consumer CCV
 * module and is used in order to not send multiple slashing requests for
 * the same downtime infraction.
 */
export interface OutstandingDowntime {
  validatorConsensusAddress: string;
}
export interface OutstandingDowntimeProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.OutstandingDowntime";
  value: Uint8Array;
}
/**
 * OutstandingDowntime defines the type used internally to the consumer CCV
 * module and is used in order to not send multiple slashing requests for
 * the same downtime infraction.
 */
export interface OutstandingDowntimeAmino {
  validator_consensus_address?: string;
}
export interface OutstandingDowntimeAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.OutstandingDowntime";
  value: OutstandingDowntimeAmino;
}
/**
 * OutstandingDowntime defines the type used internally to the consumer CCV
 * module and is used in order to not send multiple slashing requests for
 * the same downtime infraction.
 */
export interface OutstandingDowntimeSDKType {
  validator_consensus_address: string;
}
/**
 * LastTransmissionBlockHeight is the last time validator holding
 * pools were transmitted to the provider chain. This type is used internally
 * to the consumer CCV module.
 */
export interface LastTransmissionBlockHeight {
  height: bigint;
}
export interface LastTransmissionBlockHeightProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.LastTransmissionBlockHeight";
  value: Uint8Array;
}
/**
 * LastTransmissionBlockHeight is the last time validator holding
 * pools were transmitted to the provider chain. This type is used internally
 * to the consumer CCV module.
 */
export interface LastTransmissionBlockHeightAmino {
  height?: string;
}
export interface LastTransmissionBlockHeightAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.LastTransmissionBlockHeight";
  value: LastTransmissionBlockHeightAmino;
}
/**
 * LastTransmissionBlockHeight is the last time validator holding
 * pools were transmitted to the provider chain. This type is used internally
 * to the consumer CCV module.
 */
export interface LastTransmissionBlockHeightSDKType {
  height: bigint;
}
/**
 * MaturingVSCPacket represents a vsc packet that is maturing internal to the
 * consumer CCV module, where the consumer has not yet relayed a VSCMatured
 * packet back to the provider.
 */
export interface MaturingVSCPacket {
  vscId: bigint;
  maturityTime: Date | undefined;
}
export interface MaturingVSCPacketProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.MaturingVSCPacket";
  value: Uint8Array;
}
/**
 * MaturingVSCPacket represents a vsc packet that is maturing internal to the
 * consumer CCV module, where the consumer has not yet relayed a VSCMatured
 * packet back to the provider.
 */
export interface MaturingVSCPacketAmino {
  vscId?: string;
  maturity_time?: string | undefined;
}
export interface MaturingVSCPacketAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.MaturingVSCPacket";
  value: MaturingVSCPacketAmino;
}
/**
 * MaturingVSCPacket represents a vsc packet that is maturing internal to the
 * consumer CCV module, where the consumer has not yet relayed a VSCMatured
 * packet back to the provider.
 */
export interface MaturingVSCPacketSDKType {
  vscId: bigint;
  maturity_time: Date | undefined;
}
/**
 * ConsumerPacketDataList is a list of consumer packet data packets.
 * 
 * Note this type is used internally to the consumer CCV module
 * for exporting / importing state in InitGenesis and ExportGenesis.
 */
export interface ConsumerPacketDataList {
  list: ConsumerPacketData[];
}
export interface ConsumerPacketDataListProtoMsg {
  typeUrl: "/interchain_security.ccv.consumer.v1.ConsumerPacketDataList";
  value: Uint8Array;
}
/**
 * ConsumerPacketDataList is a list of consumer packet data packets.
 * 
 * Note this type is used internally to the consumer CCV module
 * for exporting / importing state in InitGenesis and ExportGenesis.
 */
export interface ConsumerPacketDataListAmino {
  list?: ConsumerPacketDataAmino[];
}
export interface ConsumerPacketDataListAminoMsg {
  type: "/interchain_security.ccv.consumer.v1.ConsumerPacketDataList";
  value: ConsumerPacketDataListAmino;
}
/**
 * ConsumerPacketDataList is a list of consumer packet data packets.
 * 
 * Note this type is used internally to the consumer CCV module
 * for exporting / importing state in InitGenesis and ExportGenesis.
 */
export interface ConsumerPacketDataListSDKType {
  list: ConsumerPacketDataSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: ConsumerParams.fromPartial({}),
    providerClientId: "",
    providerChannelId: "",
    newChain: false,
    providerClientState: undefined,
    providerConsensusState: undefined,
    maturingPackets: [],
    initialValSet: [],
    heightToValsetUpdateId: [],
    outstandingDowntimeSlashing: [],
    pendingConsumerPackets: ConsumerPacketDataList.fromPartial({}),
    lastTransmissionBlockHeight: LastTransmissionBlockHeight.fromPartial({}),
    preCCV: false,
    provider: ProviderInfo.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/interchain_security.ccv.consumer.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      ConsumerParams.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.providerClientId !== "") {
      writer.uint32(18).string(message.providerClientId);
    }
    if (message.providerChannelId !== "") {
      writer.uint32(26).string(message.providerChannelId);
    }
    if (message.newChain === true) {
      writer.uint32(32).bool(message.newChain);
    }
    if (message.providerClientState !== undefined) {
      ClientState.encode(message.providerClientState, writer.uint32(42).fork()).ldelim();
    }
    if (message.providerConsensusState !== undefined) {
      ConsensusState.encode(message.providerConsensusState, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.maturingPackets) {
      MaturingVSCPacket.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.initialValSet) {
      ValidatorUpdate.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.heightToValsetUpdateId) {
      HeightToValsetUpdateID.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.outstandingDowntimeSlashing) {
      OutstandingDowntime.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.pendingConsumerPackets !== undefined) {
      ConsumerPacketDataList.encode(message.pendingConsumerPackets, writer.uint32(90).fork()).ldelim();
    }
    if (message.lastTransmissionBlockHeight !== undefined) {
      LastTransmissionBlockHeight.encode(message.lastTransmissionBlockHeight, writer.uint32(98).fork()).ldelim();
    }
    if (message.preCCV === true) {
      writer.uint32(104).bool(message.preCCV);
    }
    if (message.provider !== undefined) {
      ProviderInfo.encode(message.provider, writer.uint32(114).fork()).ldelim();
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
          message.params = ConsumerParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.providerClientId = reader.string();
          break;
        case 3:
          message.providerChannelId = reader.string();
          break;
        case 4:
          message.newChain = reader.bool();
          break;
        case 5:
          message.providerClientState = ClientState.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.providerConsensusState = ConsensusState.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.maturingPackets.push(MaturingVSCPacket.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 8:
          message.initialValSet.push(ValidatorUpdate.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 9:
          message.heightToValsetUpdateId.push(HeightToValsetUpdateID.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 10:
          message.outstandingDowntimeSlashing.push(OutstandingDowntime.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 11:
          message.pendingConsumerPackets = ConsumerPacketDataList.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 12:
          message.lastTransmissionBlockHeight = LastTransmissionBlockHeight.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 13:
          message.preCCV = reader.bool();
          break;
        case 14:
          message.provider = ProviderInfo.decode(reader, reader.uint32(), useInterfaces);
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
    message.params = object.params !== undefined && object.params !== null ? ConsumerParams.fromPartial(object.params) : undefined;
    message.providerClientId = object.providerClientId ?? "";
    message.providerChannelId = object.providerChannelId ?? "";
    message.newChain = object.newChain ?? false;
    message.providerClientState = object.providerClientState !== undefined && object.providerClientState !== null ? ClientState.fromPartial(object.providerClientState) : undefined;
    message.providerConsensusState = object.providerConsensusState !== undefined && object.providerConsensusState !== null ? ConsensusState.fromPartial(object.providerConsensusState) : undefined;
    message.maturingPackets = object.maturingPackets?.map(e => MaturingVSCPacket.fromPartial(e)) || [];
    message.initialValSet = object.initialValSet?.map(e => ValidatorUpdate.fromPartial(e)) || [];
    message.heightToValsetUpdateId = object.heightToValsetUpdateId?.map(e => HeightToValsetUpdateID.fromPartial(e)) || [];
    message.outstandingDowntimeSlashing = object.outstandingDowntimeSlashing?.map(e => OutstandingDowntime.fromPartial(e)) || [];
    message.pendingConsumerPackets = object.pendingConsumerPackets !== undefined && object.pendingConsumerPackets !== null ? ConsumerPacketDataList.fromPartial(object.pendingConsumerPackets) : undefined;
    message.lastTransmissionBlockHeight = object.lastTransmissionBlockHeight !== undefined && object.lastTransmissionBlockHeight !== null ? LastTransmissionBlockHeight.fromPartial(object.lastTransmissionBlockHeight) : undefined;
    message.preCCV = object.preCCV ?? false;
    message.provider = object.provider !== undefined && object.provider !== null ? ProviderInfo.fromPartial(object.provider) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = ConsumerParams.fromAmino(object.params);
    }
    if (object.provider_client_id !== undefined && object.provider_client_id !== null) {
      message.providerClientId = object.provider_client_id;
    }
    if (object.provider_channel_id !== undefined && object.provider_channel_id !== null) {
      message.providerChannelId = object.provider_channel_id;
    }
    if (object.new_chain !== undefined && object.new_chain !== null) {
      message.newChain = object.new_chain;
    }
    if (object.provider_client_state !== undefined && object.provider_client_state !== null) {
      message.providerClientState = ClientState.fromAmino(object.provider_client_state);
    }
    if (object.provider_consensus_state !== undefined && object.provider_consensus_state !== null) {
      message.providerConsensusState = ConsensusState.fromAmino(object.provider_consensus_state);
    }
    message.maturingPackets = object.maturing_packets?.map(e => MaturingVSCPacket.fromAmino(e)) || [];
    message.initialValSet = object.initial_val_set?.map(e => ValidatorUpdate.fromAmino(e)) || [];
    message.heightToValsetUpdateId = object.height_to_valset_update_id?.map(e => HeightToValsetUpdateID.fromAmino(e)) || [];
    message.outstandingDowntimeSlashing = object.outstanding_downtime_slashing?.map(e => OutstandingDowntime.fromAmino(e)) || [];
    if (object.pending_consumer_packets !== undefined && object.pending_consumer_packets !== null) {
      message.pendingConsumerPackets = ConsumerPacketDataList.fromAmino(object.pending_consumer_packets);
    }
    if (object.last_transmission_block_height !== undefined && object.last_transmission_block_height !== null) {
      message.lastTransmissionBlockHeight = LastTransmissionBlockHeight.fromAmino(object.last_transmission_block_height);
    }
    if (object.preCCV !== undefined && object.preCCV !== null) {
      message.preCCV = object.preCCV;
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = ProviderInfo.fromAmino(object.provider);
    }
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? ConsumerParams.toAmino(message.params, useInterfaces) : undefined;
    obj.provider_client_id = message.providerClientId === "" ? undefined : message.providerClientId;
    obj.provider_channel_id = message.providerChannelId === "" ? undefined : message.providerChannelId;
    obj.new_chain = message.newChain === false ? undefined : message.newChain;
    obj.provider_client_state = message.providerClientState ? ClientState.toAmino(message.providerClientState, useInterfaces) : undefined;
    obj.provider_consensus_state = message.providerConsensusState ? ConsensusState.toAmino(message.providerConsensusState, useInterfaces) : undefined;
    if (message.maturingPackets) {
      obj.maturing_packets = message.maturingPackets.map(e => e ? MaturingVSCPacket.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.maturing_packets = message.maturingPackets;
    }
    if (message.initialValSet) {
      obj.initial_val_set = message.initialValSet.map(e => e ? ValidatorUpdate.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.initial_val_set = message.initialValSet;
    }
    if (message.heightToValsetUpdateId) {
      obj.height_to_valset_update_id = message.heightToValsetUpdateId.map(e => e ? HeightToValsetUpdateID.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.height_to_valset_update_id = message.heightToValsetUpdateId;
    }
    if (message.outstandingDowntimeSlashing) {
      obj.outstanding_downtime_slashing = message.outstandingDowntimeSlashing.map(e => e ? OutstandingDowntime.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.outstanding_downtime_slashing = message.outstandingDowntimeSlashing;
    }
    obj.pending_consumer_packets = message.pendingConsumerPackets ? ConsumerPacketDataList.toAmino(message.pendingConsumerPackets, useInterfaces) : undefined;
    obj.last_transmission_block_height = message.lastTransmissionBlockHeight ? LastTransmissionBlockHeight.toAmino(message.lastTransmissionBlockHeight, useInterfaces) : undefined;
    obj.preCCV = message.preCCV === false ? undefined : message.preCCV;
    obj.provider = message.provider ? ProviderInfo.toAmino(message.provider, useInterfaces) : undefined;
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
      typeUrl: "/interchain_security.ccv.consumer.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseHeightToValsetUpdateID(): HeightToValsetUpdateID {
  return {
    height: BigInt(0),
    valsetUpdateId: BigInt(0)
  };
}
export const HeightToValsetUpdateID = {
  typeUrl: "/interchain_security.ccv.consumer.v1.HeightToValsetUpdateID",
  encode(message: HeightToValsetUpdateID, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.height !== BigInt(0)) {
      writer.uint32(8).uint64(message.height);
    }
    if (message.valsetUpdateId !== BigInt(0)) {
      writer.uint32(16).uint64(message.valsetUpdateId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): HeightToValsetUpdateID {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeightToValsetUpdateID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.uint64();
          break;
        case 2:
          message.valsetUpdateId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HeightToValsetUpdateID>): HeightToValsetUpdateID {
    const message = createBaseHeightToValsetUpdateID();
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    message.valsetUpdateId = object.valsetUpdateId !== undefined && object.valsetUpdateId !== null ? BigInt(object.valsetUpdateId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: HeightToValsetUpdateIDAmino): HeightToValsetUpdateID {
    const message = createBaseHeightToValsetUpdateID();
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    if (object.valset_update_id !== undefined && object.valset_update_id !== null) {
      message.valsetUpdateId = BigInt(object.valset_update_id);
    }
    return message;
  },
  toAmino(message: HeightToValsetUpdateID, useInterfaces: boolean = false): HeightToValsetUpdateIDAmino {
    const obj: any = {};
    obj.height = message.height !== BigInt(0) ? message.height.toString() : undefined;
    obj.valset_update_id = message.valsetUpdateId !== BigInt(0) ? message.valsetUpdateId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: HeightToValsetUpdateIDAminoMsg): HeightToValsetUpdateID {
    return HeightToValsetUpdateID.fromAmino(object.value);
  },
  fromProtoMsg(message: HeightToValsetUpdateIDProtoMsg, useInterfaces: boolean = false): HeightToValsetUpdateID {
    return HeightToValsetUpdateID.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: HeightToValsetUpdateID): Uint8Array {
    return HeightToValsetUpdateID.encode(message).finish();
  },
  toProtoMsg(message: HeightToValsetUpdateID): HeightToValsetUpdateIDProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.HeightToValsetUpdateID",
      value: HeightToValsetUpdateID.encode(message).finish()
    };
  }
};
function createBaseOutstandingDowntime(): OutstandingDowntime {
  return {
    validatorConsensusAddress: ""
  };
}
export const OutstandingDowntime = {
  typeUrl: "/interchain_security.ccv.consumer.v1.OutstandingDowntime",
  encode(message: OutstandingDowntime, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorConsensusAddress !== "") {
      writer.uint32(10).string(message.validatorConsensusAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): OutstandingDowntime {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOutstandingDowntime();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorConsensusAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OutstandingDowntime>): OutstandingDowntime {
    const message = createBaseOutstandingDowntime();
    message.validatorConsensusAddress = object.validatorConsensusAddress ?? "";
    return message;
  },
  fromAmino(object: OutstandingDowntimeAmino): OutstandingDowntime {
    const message = createBaseOutstandingDowntime();
    if (object.validator_consensus_address !== undefined && object.validator_consensus_address !== null) {
      message.validatorConsensusAddress = object.validator_consensus_address;
    }
    return message;
  },
  toAmino(message: OutstandingDowntime, useInterfaces: boolean = false): OutstandingDowntimeAmino {
    const obj: any = {};
    obj.validator_consensus_address = message.validatorConsensusAddress === "" ? undefined : message.validatorConsensusAddress;
    return obj;
  },
  fromAminoMsg(object: OutstandingDowntimeAminoMsg): OutstandingDowntime {
    return OutstandingDowntime.fromAmino(object.value);
  },
  fromProtoMsg(message: OutstandingDowntimeProtoMsg, useInterfaces: boolean = false): OutstandingDowntime {
    return OutstandingDowntime.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: OutstandingDowntime): Uint8Array {
    return OutstandingDowntime.encode(message).finish();
  },
  toProtoMsg(message: OutstandingDowntime): OutstandingDowntimeProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.OutstandingDowntime",
      value: OutstandingDowntime.encode(message).finish()
    };
  }
};
function createBaseLastTransmissionBlockHeight(): LastTransmissionBlockHeight {
  return {
    height: BigInt(0)
  };
}
export const LastTransmissionBlockHeight = {
  typeUrl: "/interchain_security.ccv.consumer.v1.LastTransmissionBlockHeight",
  encode(message: LastTransmissionBlockHeight, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.height !== BigInt(0)) {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LastTransmissionBlockHeight {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLastTransmissionBlockHeight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LastTransmissionBlockHeight>): LastTransmissionBlockHeight {
    const message = createBaseLastTransmissionBlockHeight();
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: LastTransmissionBlockHeightAmino): LastTransmissionBlockHeight {
    const message = createBaseLastTransmissionBlockHeight();
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    return message;
  },
  toAmino(message: LastTransmissionBlockHeight, useInterfaces: boolean = false): LastTransmissionBlockHeightAmino {
    const obj: any = {};
    obj.height = message.height !== BigInt(0) ? message.height.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: LastTransmissionBlockHeightAminoMsg): LastTransmissionBlockHeight {
    return LastTransmissionBlockHeight.fromAmino(object.value);
  },
  fromProtoMsg(message: LastTransmissionBlockHeightProtoMsg, useInterfaces: boolean = false): LastTransmissionBlockHeight {
    return LastTransmissionBlockHeight.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LastTransmissionBlockHeight): Uint8Array {
    return LastTransmissionBlockHeight.encode(message).finish();
  },
  toProtoMsg(message: LastTransmissionBlockHeight): LastTransmissionBlockHeightProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.LastTransmissionBlockHeight",
      value: LastTransmissionBlockHeight.encode(message).finish()
    };
  }
};
function createBaseMaturingVSCPacket(): MaturingVSCPacket {
  return {
    vscId: BigInt(0),
    maturityTime: new Date()
  };
}
export const MaturingVSCPacket = {
  typeUrl: "/interchain_security.ccv.consumer.v1.MaturingVSCPacket",
  encode(message: MaturingVSCPacket, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.vscId !== BigInt(0)) {
      writer.uint32(8).uint64(message.vscId);
    }
    if (message.maturityTime !== undefined) {
      Timestamp.encode(toTimestamp(message.maturityTime), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MaturingVSCPacket {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaturingVSCPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vscId = reader.uint64();
          break;
        case 2:
          message.maturityTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MaturingVSCPacket>): MaturingVSCPacket {
    const message = createBaseMaturingVSCPacket();
    message.vscId = object.vscId !== undefined && object.vscId !== null ? BigInt(object.vscId.toString()) : BigInt(0);
    message.maturityTime = object.maturityTime ?? undefined;
    return message;
  },
  fromAmino(object: MaturingVSCPacketAmino): MaturingVSCPacket {
    const message = createBaseMaturingVSCPacket();
    if (object.vscId !== undefined && object.vscId !== null) {
      message.vscId = BigInt(object.vscId);
    }
    if (object.maturity_time !== undefined && object.maturity_time !== null) {
      message.maturityTime = fromTimestamp(Timestamp.fromAmino(object.maturity_time));
    }
    return message;
  },
  toAmino(message: MaturingVSCPacket, useInterfaces: boolean = false): MaturingVSCPacketAmino {
    const obj: any = {};
    obj.vscId = message.vscId !== BigInt(0) ? message.vscId.toString() : undefined;
    obj.maturity_time = message.maturityTime ? Timestamp.toAmino(toTimestamp(message.maturityTime)) : undefined;
    return obj;
  },
  fromAminoMsg(object: MaturingVSCPacketAminoMsg): MaturingVSCPacket {
    return MaturingVSCPacket.fromAmino(object.value);
  },
  fromProtoMsg(message: MaturingVSCPacketProtoMsg, useInterfaces: boolean = false): MaturingVSCPacket {
    return MaturingVSCPacket.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MaturingVSCPacket): Uint8Array {
    return MaturingVSCPacket.encode(message).finish();
  },
  toProtoMsg(message: MaturingVSCPacket): MaturingVSCPacketProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.MaturingVSCPacket",
      value: MaturingVSCPacket.encode(message).finish()
    };
  }
};
function createBaseConsumerPacketDataList(): ConsumerPacketDataList {
  return {
    list: []
  };
}
export const ConsumerPacketDataList = {
  typeUrl: "/interchain_security.ccv.consumer.v1.ConsumerPacketDataList",
  encode(message: ConsumerPacketDataList, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.list) {
      ConsumerPacketData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsumerPacketDataList {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerPacketDataList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.list.push(ConsumerPacketData.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerPacketDataList>): ConsumerPacketDataList {
    const message = createBaseConsumerPacketDataList();
    message.list = object.list?.map(e => ConsumerPacketData.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ConsumerPacketDataListAmino): ConsumerPacketDataList {
    const message = createBaseConsumerPacketDataList();
    message.list = object.list?.map(e => ConsumerPacketData.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: ConsumerPacketDataList, useInterfaces: boolean = false): ConsumerPacketDataListAmino {
    const obj: any = {};
    if (message.list) {
      obj.list = message.list.map(e => e ? ConsumerPacketData.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.list = message.list;
    }
    return obj;
  },
  fromAminoMsg(object: ConsumerPacketDataListAminoMsg): ConsumerPacketDataList {
    return ConsumerPacketDataList.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerPacketDataListProtoMsg, useInterfaces: boolean = false): ConsumerPacketDataList {
    return ConsumerPacketDataList.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsumerPacketDataList): Uint8Array {
    return ConsumerPacketDataList.encode(message).finish();
  },
  toProtoMsg(message: ConsumerPacketDataList): ConsumerPacketDataListProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.consumer.v1.ConsumerPacketDataList",
      value: ConsumerPacketDataList.encode(message).finish()
    };
  }
};