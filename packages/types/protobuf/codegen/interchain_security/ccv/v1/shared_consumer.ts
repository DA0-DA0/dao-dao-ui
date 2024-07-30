import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { ClientState, ClientStateAmino, ClientStateSDKType, ConsensusState, ConsensusStateAmino, ConsensusStateSDKType } from "../../../ibc/lightclients/tendermint/v1/tendermint";
import { ValidatorUpdate, ValidatorUpdateAmino, ValidatorUpdateSDKType } from "../../../tendermint/abci/types";
import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * ConsumerParams defines the parameters for CCV consumer module.
 * 
 * Note this type is referenced in both the consumer and provider CCV modules,
 * and persisted on the provider, see MakeConsumerGenesis and
 * SetConsumerGenesis.
 */
export interface ConsumerParams {
  /**
   * TODO: Remove enabled flag and find a better way to setup integration tests
   * See: https://github.com/cosmos/interchain-security/issues/339
   */
  enabled: boolean;
  /**
   * Distribution Params
   * Number of blocks between ibc-token-transfers from the consumer chain to
   * the provider chain. Note that at this transmission event a fraction of
   * the accumulated tokens are divided and sent consumer redistribution
   * address.
   */
  blocksPerDistributionTransmission: bigint;
  /**
   * Channel, and provider-chain receiving address to send distribution token
   * transfers over. These parameters is auto-set during the consumer <->
   * provider handshake procedure.
   */
  distributionTransmissionChannel: string;
  providerFeePoolAddrStr: string;
  /** Sent CCV related IBC packets will timeout after this duration */
  ccvTimeoutPeriod: Duration | undefined;
  /** Sent transfer related IBC packets will timeout after this duration */
  transferTimeoutPeriod: Duration | undefined;
  /**
   * The fraction of tokens allocated to the consumer redistribution address
   * during distribution events. The fraction is a string representing a
   * decimal number. For example "0.75" would represent 75%.
   */
  consumerRedistributionFraction: string;
  /**
   * The number of historical info entries to persist in store.
   * This param is a part of the cosmos sdk staking module. In the case of
   * a ccv enabled consumer chain, the ccv module acts as the staking module.
   */
  historicalEntries: bigint;
  /**
   * Unbonding period for the consumer,
   * which should be smaller than that of the provider in general.
   */
  unbondingPeriod: Duration | undefined;
  /** !!! DEPRECATED !!! soft_opt_out_threshold is deprecated. see docs/docs/adrs/adr-015-partial-set-security.md */
  /** @deprecated */
  softOptOutThreshold: string;
  /**
   * Reward denoms. These are the denominations which are allowed to be sent to
   * the provider as rewards.
   */
  rewardDenoms: string[];
  /**
   * Provider-originated reward denoms. These are denoms coming from the
   * provider which are allowed to be used as rewards. e.g. "uatom"
   */
  providerRewardDenoms: string[];
  /** The period after which a consumer can retry sending a throttled packet. */
  retryDelayPeriod: Duration | undefined;
}
export interface ConsumerParamsProtoMsg {
  typeUrl: "/interchain_security.ccv.v1.ConsumerParams";
  value: Uint8Array;
}
/**
 * ConsumerParams defines the parameters for CCV consumer module.
 * 
 * Note this type is referenced in both the consumer and provider CCV modules,
 * and persisted on the provider, see MakeConsumerGenesis and
 * SetConsumerGenesis.
 */
export interface ConsumerParamsAmino {
  /**
   * TODO: Remove enabled flag and find a better way to setup integration tests
   * See: https://github.com/cosmos/interchain-security/issues/339
   */
  enabled?: boolean;
  /**
   * Distribution Params
   * Number of blocks between ibc-token-transfers from the consumer chain to
   * the provider chain. Note that at this transmission event a fraction of
   * the accumulated tokens are divided and sent consumer redistribution
   * address.
   */
  blocks_per_distribution_transmission?: string;
  /**
   * Channel, and provider-chain receiving address to send distribution token
   * transfers over. These parameters is auto-set during the consumer <->
   * provider handshake procedure.
   */
  distribution_transmission_channel?: string;
  provider_fee_pool_addr_str?: string;
  /** Sent CCV related IBC packets will timeout after this duration */
  ccv_timeout_period?: DurationAmino | undefined;
  /** Sent transfer related IBC packets will timeout after this duration */
  transfer_timeout_period?: DurationAmino | undefined;
  /**
   * The fraction of tokens allocated to the consumer redistribution address
   * during distribution events. The fraction is a string representing a
   * decimal number. For example "0.75" would represent 75%.
   */
  consumer_redistribution_fraction?: string;
  /**
   * The number of historical info entries to persist in store.
   * This param is a part of the cosmos sdk staking module. In the case of
   * a ccv enabled consumer chain, the ccv module acts as the staking module.
   */
  historical_entries?: string;
  /**
   * Unbonding period for the consumer,
   * which should be smaller than that of the provider in general.
   */
  unbonding_period?: DurationAmino | undefined;
  /** !!! DEPRECATED !!! soft_opt_out_threshold is deprecated. see docs/docs/adrs/adr-015-partial-set-security.md */
  /** @deprecated */
  soft_opt_out_threshold?: string;
  /**
   * Reward denoms. These are the denominations which are allowed to be sent to
   * the provider as rewards.
   */
  reward_denoms?: string[];
  /**
   * Provider-originated reward denoms. These are denoms coming from the
   * provider which are allowed to be used as rewards. e.g. "uatom"
   */
  provider_reward_denoms?: string[];
  /** The period after which a consumer can retry sending a throttled packet. */
  retry_delay_period?: DurationAmino | undefined;
}
export interface ConsumerParamsAminoMsg {
  type: "/interchain_security.ccv.v1.ConsumerParams";
  value: ConsumerParamsAmino;
}
/**
 * ConsumerParams defines the parameters for CCV consumer module.
 * 
 * Note this type is referenced in both the consumer and provider CCV modules,
 * and persisted on the provider, see MakeConsumerGenesis and
 * SetConsumerGenesis.
 */
export interface ConsumerParamsSDKType {
  enabled: boolean;
  blocks_per_distribution_transmission: bigint;
  distribution_transmission_channel: string;
  provider_fee_pool_addr_str: string;
  ccv_timeout_period: DurationSDKType | undefined;
  transfer_timeout_period: DurationSDKType | undefined;
  consumer_redistribution_fraction: string;
  historical_entries: bigint;
  unbonding_period: DurationSDKType | undefined;
  /** @deprecated */
  soft_opt_out_threshold: string;
  reward_denoms: string[];
  provider_reward_denoms: string[];
  retry_delay_period: DurationSDKType | undefined;
}
/**
 * ConsumerGenesisState defines shared genesis information between provider and
 * consumer
 */
export interface ConsumerGenesisState {
  params: ConsumerParams | undefined;
  provider: ProviderInfo | undefined;
  /** true for new chain, false for chain restart. */
  newChain: boolean;
}
export interface ConsumerGenesisStateProtoMsg {
  typeUrl: "/interchain_security.ccv.v1.ConsumerGenesisState";
  value: Uint8Array;
}
/**
 * ConsumerGenesisState defines shared genesis information between provider and
 * consumer
 */
export interface ConsumerGenesisStateAmino {
  params?: ConsumerParamsAmino | undefined;
  provider?: ProviderInfoAmino | undefined;
  /** true for new chain, false for chain restart. */
  new_chain?: boolean;
}
export interface ConsumerGenesisStateAminoMsg {
  type: "/interchain_security.ccv.v1.ConsumerGenesisState";
  value: ConsumerGenesisStateAmino;
}
/**
 * ConsumerGenesisState defines shared genesis information between provider and
 * consumer
 */
export interface ConsumerGenesisStateSDKType {
  params: ConsumerParamsSDKType | undefined;
  provider: ProviderInfoSDKType | undefined;
  new_chain: boolean;
}
/**
 * ProviderInfo defines all information a consumer needs from a provider
 * Shared data type between provider and consumer
 */
export interface ProviderInfo {
  /** ProviderClientState filled in on new chain, nil on restart. */
  clientState?: ClientState | undefined;
  /** ProviderConsensusState filled in on new chain, nil on restart. */
  consensusState?: ConsensusState | undefined;
  /** InitialValset filled in on new chain and on restart. */
  initialValSet: ValidatorUpdate[];
}
export interface ProviderInfoProtoMsg {
  typeUrl: "/interchain_security.ccv.v1.ProviderInfo";
  value: Uint8Array;
}
/**
 * ProviderInfo defines all information a consumer needs from a provider
 * Shared data type between provider and consumer
 */
export interface ProviderInfoAmino {
  /** ProviderClientState filled in on new chain, nil on restart. */
  client_state?: ClientStateAmino | undefined;
  /** ProviderConsensusState filled in on new chain, nil on restart. */
  consensus_state?: ConsensusStateAmino | undefined;
  /** InitialValset filled in on new chain and on restart. */
  initial_val_set?: ValidatorUpdateAmino[];
}
export interface ProviderInfoAminoMsg {
  type: "/interchain_security.ccv.v1.ProviderInfo";
  value: ProviderInfoAmino;
}
/**
 * ProviderInfo defines all information a consumer needs from a provider
 * Shared data type between provider and consumer
 */
export interface ProviderInfoSDKType {
  client_state?: ClientStateSDKType | undefined;
  consensus_state?: ConsensusStateSDKType | undefined;
  initial_val_set: ValidatorUpdateSDKType[];
}
function createBaseConsumerParams(): ConsumerParams {
  return {
    enabled: false,
    blocksPerDistributionTransmission: BigInt(0),
    distributionTransmissionChannel: "",
    providerFeePoolAddrStr: "",
    ccvTimeoutPeriod: Duration.fromPartial({}),
    transferTimeoutPeriod: Duration.fromPartial({}),
    consumerRedistributionFraction: "",
    historicalEntries: BigInt(0),
    unbondingPeriod: Duration.fromPartial({}),
    softOptOutThreshold: "",
    rewardDenoms: [],
    providerRewardDenoms: [],
    retryDelayPeriod: Duration.fromPartial({})
  };
}
export const ConsumerParams = {
  typeUrl: "/interchain_security.ccv.v1.ConsumerParams",
  encode(message: ConsumerParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.enabled === true) {
      writer.uint32(8).bool(message.enabled);
    }
    if (message.blocksPerDistributionTransmission !== BigInt(0)) {
      writer.uint32(16).int64(message.blocksPerDistributionTransmission);
    }
    if (message.distributionTransmissionChannel !== "") {
      writer.uint32(26).string(message.distributionTransmissionChannel);
    }
    if (message.providerFeePoolAddrStr !== "") {
      writer.uint32(34).string(message.providerFeePoolAddrStr);
    }
    if (message.ccvTimeoutPeriod !== undefined) {
      Duration.encode(message.ccvTimeoutPeriod, writer.uint32(42).fork()).ldelim();
    }
    if (message.transferTimeoutPeriod !== undefined) {
      Duration.encode(message.transferTimeoutPeriod, writer.uint32(50).fork()).ldelim();
    }
    if (message.consumerRedistributionFraction !== "") {
      writer.uint32(58).string(message.consumerRedistributionFraction);
    }
    if (message.historicalEntries !== BigInt(0)) {
      writer.uint32(64).int64(message.historicalEntries);
    }
    if (message.unbondingPeriod !== undefined) {
      Duration.encode(message.unbondingPeriod, writer.uint32(74).fork()).ldelim();
    }
    if (message.softOptOutThreshold !== "") {
      writer.uint32(82).string(message.softOptOutThreshold);
    }
    for (const v of message.rewardDenoms) {
      writer.uint32(90).string(v!);
    }
    for (const v of message.providerRewardDenoms) {
      writer.uint32(98).string(v!);
    }
    if (message.retryDelayPeriod !== undefined) {
      Duration.encode(message.retryDelayPeriod, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsumerParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.enabled = reader.bool();
          break;
        case 2:
          message.blocksPerDistributionTransmission = reader.int64();
          break;
        case 3:
          message.distributionTransmissionChannel = reader.string();
          break;
        case 4:
          message.providerFeePoolAddrStr = reader.string();
          break;
        case 5:
          message.ccvTimeoutPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.transferTimeoutPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.consumerRedistributionFraction = reader.string();
          break;
        case 8:
          message.historicalEntries = reader.int64();
          break;
        case 9:
          message.unbondingPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 10:
          message.softOptOutThreshold = reader.string();
          break;
        case 11:
          message.rewardDenoms.push(reader.string());
          break;
        case 12:
          message.providerRewardDenoms.push(reader.string());
          break;
        case 13:
          message.retryDelayPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerParams>): ConsumerParams {
    const message = createBaseConsumerParams();
    message.enabled = object.enabled ?? false;
    message.blocksPerDistributionTransmission = object.blocksPerDistributionTransmission !== undefined && object.blocksPerDistributionTransmission !== null ? BigInt(object.blocksPerDistributionTransmission.toString()) : BigInt(0);
    message.distributionTransmissionChannel = object.distributionTransmissionChannel ?? "";
    message.providerFeePoolAddrStr = object.providerFeePoolAddrStr ?? "";
    message.ccvTimeoutPeriod = object.ccvTimeoutPeriod !== undefined && object.ccvTimeoutPeriod !== null ? Duration.fromPartial(object.ccvTimeoutPeriod) : undefined;
    message.transferTimeoutPeriod = object.transferTimeoutPeriod !== undefined && object.transferTimeoutPeriod !== null ? Duration.fromPartial(object.transferTimeoutPeriod) : undefined;
    message.consumerRedistributionFraction = object.consumerRedistributionFraction ?? "";
    message.historicalEntries = object.historicalEntries !== undefined && object.historicalEntries !== null ? BigInt(object.historicalEntries.toString()) : BigInt(0);
    message.unbondingPeriod = object.unbondingPeriod !== undefined && object.unbondingPeriod !== null ? Duration.fromPartial(object.unbondingPeriod) : undefined;
    message.softOptOutThreshold = object.softOptOutThreshold ?? "";
    message.rewardDenoms = object.rewardDenoms?.map(e => e) || [];
    message.providerRewardDenoms = object.providerRewardDenoms?.map(e => e) || [];
    message.retryDelayPeriod = object.retryDelayPeriod !== undefined && object.retryDelayPeriod !== null ? Duration.fromPartial(object.retryDelayPeriod) : undefined;
    return message;
  },
  fromAmino(object: ConsumerParamsAmino): ConsumerParams {
    const message = createBaseConsumerParams();
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = object.enabled;
    }
    if (object.blocks_per_distribution_transmission !== undefined && object.blocks_per_distribution_transmission !== null) {
      message.blocksPerDistributionTransmission = BigInt(object.blocks_per_distribution_transmission);
    }
    if (object.distribution_transmission_channel !== undefined && object.distribution_transmission_channel !== null) {
      message.distributionTransmissionChannel = object.distribution_transmission_channel;
    }
    if (object.provider_fee_pool_addr_str !== undefined && object.provider_fee_pool_addr_str !== null) {
      message.providerFeePoolAddrStr = object.provider_fee_pool_addr_str;
    }
    if (object.ccv_timeout_period !== undefined && object.ccv_timeout_period !== null) {
      message.ccvTimeoutPeriod = Duration.fromAmino(object.ccv_timeout_period);
    }
    if (object.transfer_timeout_period !== undefined && object.transfer_timeout_period !== null) {
      message.transferTimeoutPeriod = Duration.fromAmino(object.transfer_timeout_period);
    }
    if (object.consumer_redistribution_fraction !== undefined && object.consumer_redistribution_fraction !== null) {
      message.consumerRedistributionFraction = object.consumer_redistribution_fraction;
    }
    if (object.historical_entries !== undefined && object.historical_entries !== null) {
      message.historicalEntries = BigInt(object.historical_entries);
    }
    if (object.unbonding_period !== undefined && object.unbonding_period !== null) {
      message.unbondingPeriod = Duration.fromAmino(object.unbonding_period);
    }
    if (object.soft_opt_out_threshold !== undefined && object.soft_opt_out_threshold !== null) {
      message.softOptOutThreshold = object.soft_opt_out_threshold;
    }
    message.rewardDenoms = object.reward_denoms?.map(e => e) || [];
    message.providerRewardDenoms = object.provider_reward_denoms?.map(e => e) || [];
    if (object.retry_delay_period !== undefined && object.retry_delay_period !== null) {
      message.retryDelayPeriod = Duration.fromAmino(object.retry_delay_period);
    }
    return message;
  },
  toAmino(message: ConsumerParams, useInterfaces: boolean = false): ConsumerParamsAmino {
    const obj: any = {};
    obj.enabled = message.enabled === false ? undefined : message.enabled;
    obj.blocks_per_distribution_transmission = message.blocksPerDistributionTransmission !== BigInt(0) ? message.blocksPerDistributionTransmission.toString() : undefined;
    obj.distribution_transmission_channel = message.distributionTransmissionChannel === "" ? undefined : message.distributionTransmissionChannel;
    obj.provider_fee_pool_addr_str = message.providerFeePoolAddrStr === "" ? undefined : message.providerFeePoolAddrStr;
    obj.ccv_timeout_period = message.ccvTimeoutPeriod ? Duration.toAmino(message.ccvTimeoutPeriod, useInterfaces) : undefined;
    obj.transfer_timeout_period = message.transferTimeoutPeriod ? Duration.toAmino(message.transferTimeoutPeriod, useInterfaces) : undefined;
    obj.consumer_redistribution_fraction = message.consumerRedistributionFraction === "" ? undefined : message.consumerRedistributionFraction;
    obj.historical_entries = message.historicalEntries !== BigInt(0) ? message.historicalEntries.toString() : undefined;
    obj.unbonding_period = message.unbondingPeriod ? Duration.toAmino(message.unbondingPeriod, useInterfaces) : undefined;
    obj.soft_opt_out_threshold = message.softOptOutThreshold === "" ? undefined : message.softOptOutThreshold;
    if (message.rewardDenoms) {
      obj.reward_denoms = message.rewardDenoms.map(e => e);
    } else {
      obj.reward_denoms = message.rewardDenoms;
    }
    if (message.providerRewardDenoms) {
      obj.provider_reward_denoms = message.providerRewardDenoms.map(e => e);
    } else {
      obj.provider_reward_denoms = message.providerRewardDenoms;
    }
    obj.retry_delay_period = message.retryDelayPeriod ? Duration.toAmino(message.retryDelayPeriod, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ConsumerParamsAminoMsg): ConsumerParams {
    return ConsumerParams.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerParamsProtoMsg, useInterfaces: boolean = false): ConsumerParams {
    return ConsumerParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsumerParams): Uint8Array {
    return ConsumerParams.encode(message).finish();
  },
  toProtoMsg(message: ConsumerParams): ConsumerParamsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.ConsumerParams",
      value: ConsumerParams.encode(message).finish()
    };
  }
};
function createBaseConsumerGenesisState(): ConsumerGenesisState {
  return {
    params: ConsumerParams.fromPartial({}),
    provider: ProviderInfo.fromPartial({}),
    newChain: false
  };
}
export const ConsumerGenesisState = {
  typeUrl: "/interchain_security.ccv.v1.ConsumerGenesisState",
  encode(message: ConsumerGenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      ConsumerParams.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.provider !== undefined) {
      ProviderInfo.encode(message.provider, writer.uint32(18).fork()).ldelim();
    }
    if (message.newChain === true) {
      writer.uint32(24).bool(message.newChain);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsumerGenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = ConsumerParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.provider = ProviderInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.newChain = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerGenesisState>): ConsumerGenesisState {
    const message = createBaseConsumerGenesisState();
    message.params = object.params !== undefined && object.params !== null ? ConsumerParams.fromPartial(object.params) : undefined;
    message.provider = object.provider !== undefined && object.provider !== null ? ProviderInfo.fromPartial(object.provider) : undefined;
    message.newChain = object.newChain ?? false;
    return message;
  },
  fromAmino(object: ConsumerGenesisStateAmino): ConsumerGenesisState {
    const message = createBaseConsumerGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = ConsumerParams.fromAmino(object.params);
    }
    if (object.provider !== undefined && object.provider !== null) {
      message.provider = ProviderInfo.fromAmino(object.provider);
    }
    if (object.new_chain !== undefined && object.new_chain !== null) {
      message.newChain = object.new_chain;
    }
    return message;
  },
  toAmino(message: ConsumerGenesisState, useInterfaces: boolean = false): ConsumerGenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? ConsumerParams.toAmino(message.params, useInterfaces) : undefined;
    obj.provider = message.provider ? ProviderInfo.toAmino(message.provider, useInterfaces) : undefined;
    obj.new_chain = message.newChain === false ? undefined : message.newChain;
    return obj;
  },
  fromAminoMsg(object: ConsumerGenesisStateAminoMsg): ConsumerGenesisState {
    return ConsumerGenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerGenesisStateProtoMsg, useInterfaces: boolean = false): ConsumerGenesisState {
    return ConsumerGenesisState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsumerGenesisState): Uint8Array {
    return ConsumerGenesisState.encode(message).finish();
  },
  toProtoMsg(message: ConsumerGenesisState): ConsumerGenesisStateProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.ConsumerGenesisState",
      value: ConsumerGenesisState.encode(message).finish()
    };
  }
};
function createBaseProviderInfo(): ProviderInfo {
  return {
    clientState: undefined,
    consensusState: undefined,
    initialValSet: []
  };
}
export const ProviderInfo = {
  typeUrl: "/interchain_security.ccv.v1.ProviderInfo",
  encode(message: ProviderInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientState !== undefined) {
      ClientState.encode(message.clientState, writer.uint32(10).fork()).ldelim();
    }
    if (message.consensusState !== undefined) {
      ConsensusState.encode(message.consensusState, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.initialValSet) {
      ValidatorUpdate.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ProviderInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProviderInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientState = ClientState.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.consensusState = ConsensusState.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.initialValSet.push(ValidatorUpdate.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ProviderInfo>): ProviderInfo {
    const message = createBaseProviderInfo();
    message.clientState = object.clientState !== undefined && object.clientState !== null ? ClientState.fromPartial(object.clientState) : undefined;
    message.consensusState = object.consensusState !== undefined && object.consensusState !== null ? ConsensusState.fromPartial(object.consensusState) : undefined;
    message.initialValSet = object.initialValSet?.map(e => ValidatorUpdate.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ProviderInfoAmino): ProviderInfo {
    const message = createBaseProviderInfo();
    if (object.client_state !== undefined && object.client_state !== null) {
      message.clientState = ClientState.fromAmino(object.client_state);
    }
    if (object.consensus_state !== undefined && object.consensus_state !== null) {
      message.consensusState = ConsensusState.fromAmino(object.consensus_state);
    }
    message.initialValSet = object.initial_val_set?.map(e => ValidatorUpdate.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: ProviderInfo, useInterfaces: boolean = false): ProviderInfoAmino {
    const obj: any = {};
    obj.client_state = message.clientState ? ClientState.toAmino(message.clientState, useInterfaces) : undefined;
    obj.consensus_state = message.consensusState ? ConsensusState.toAmino(message.consensusState, useInterfaces) : undefined;
    if (message.initialValSet) {
      obj.initial_val_set = message.initialValSet.map(e => e ? ValidatorUpdate.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.initial_val_set = message.initialValSet;
    }
    return obj;
  },
  fromAminoMsg(object: ProviderInfoAminoMsg): ProviderInfo {
    return ProviderInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: ProviderInfoProtoMsg, useInterfaces: boolean = false): ProviderInfo {
    return ProviderInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ProviderInfo): Uint8Array {
    return ProviderInfo.encode(message).finish();
  },
  toProtoMsg(message: ProviderInfo): ProviderInfoProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.v1.ProviderInfo",
      value: ProviderInfo.encode(message).finish()
    };
  }
};