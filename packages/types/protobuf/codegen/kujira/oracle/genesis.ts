//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType, ExchangeRateTuple, ExchangeRateTupleAmino, ExchangeRateTupleSDKType, AggregateExchangeRatePrevote, AggregateExchangeRatePrevoteAmino, AggregateExchangeRatePrevoteSDKType, AggregateExchangeRateVote, AggregateExchangeRateVoteAmino, AggregateExchangeRateVoteSDKType } from "./oracle";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the oracle module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  feederDelegations: FeederDelegation[];
  exchangeRates: ExchangeRateTuple[];
  missCounters: MissCounter[];
  aggregateExchangeRatePrevotes: AggregateExchangeRatePrevote[];
  aggregateExchangeRateVotes: AggregateExchangeRateVote[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/kujira.oracle.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the oracle module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  feeder_delegations?: FeederDelegationAmino[];
  exchange_rates?: ExchangeRateTupleAmino[];
  miss_counters?: MissCounterAmino[];
  aggregate_exchange_rate_prevotes?: AggregateExchangeRatePrevoteAmino[];
  aggregate_exchange_rate_votes?: AggregateExchangeRateVoteAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/kujira.oracle.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the oracle module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  feeder_delegations: FeederDelegationSDKType[];
  exchange_rates: ExchangeRateTupleSDKType[];
  miss_counters: MissCounterSDKType[];
  aggregate_exchange_rate_prevotes: AggregateExchangeRatePrevoteSDKType[];
  aggregate_exchange_rate_votes: AggregateExchangeRateVoteSDKType[];
}
/**
 * FeederDelegation is the address for where oracle feeder authority are
 * delegated to. By default this struct is only used at genesis to feed in
 * default feeder addresses.
 */
export interface FeederDelegation {
  feederAddress: string;
  validatorAddress: string;
}
export interface FeederDelegationProtoMsg {
  typeUrl: "/kujira.oracle.FeederDelegation";
  value: Uint8Array;
}
/**
 * FeederDelegation is the address for where oracle feeder authority are
 * delegated to. By default this struct is only used at genesis to feed in
 * default feeder addresses.
 */
export interface FeederDelegationAmino {
  feeder_address?: string;
  validator_address?: string;
}
export interface FeederDelegationAminoMsg {
  type: "/kujira.oracle.FeederDelegation";
  value: FeederDelegationAmino;
}
/**
 * FeederDelegation is the address for where oracle feeder authority are
 * delegated to. By default this struct is only used at genesis to feed in
 * default feeder addresses.
 */
export interface FeederDelegationSDKType {
  feeder_address: string;
  validator_address: string;
}
/**
 * MissCounter defines an miss counter and validator address pair used in
 * oracle module's genesis state
 */
export interface MissCounter {
  validatorAddress: string;
  missCounter: bigint;
}
export interface MissCounterProtoMsg {
  typeUrl: "/kujira.oracle.MissCounter";
  value: Uint8Array;
}
/**
 * MissCounter defines an miss counter and validator address pair used in
 * oracle module's genesis state
 */
export interface MissCounterAmino {
  validator_address?: string;
  miss_counter?: string;
}
export interface MissCounterAminoMsg {
  type: "/kujira.oracle.MissCounter";
  value: MissCounterAmino;
}
/**
 * MissCounter defines an miss counter and validator address pair used in
 * oracle module's genesis state
 */
export interface MissCounterSDKType {
  validator_address: string;
  miss_counter: bigint;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    feederDelegations: [],
    exchangeRates: [],
    missCounters: [],
    aggregateExchangeRatePrevotes: [],
    aggregateExchangeRateVotes: []
  };
}
export const GenesisState = {
  typeUrl: "/kujira.oracle.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.feederDelegations) {
      FeederDelegation.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.exchangeRates) {
      ExchangeRateTuple.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.missCounters) {
      MissCounter.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.aggregateExchangeRatePrevotes) {
      AggregateExchangeRatePrevote.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.aggregateExchangeRateVotes) {
      AggregateExchangeRateVote.encode(v!, writer.uint32(50).fork()).ldelim();
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
        case 2:
          message.feederDelegations.push(FeederDelegation.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.exchangeRates.push(ExchangeRateTuple.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.missCounters.push(MissCounter.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.aggregateExchangeRatePrevotes.push(AggregateExchangeRatePrevote.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 6:
          message.aggregateExchangeRateVotes.push(AggregateExchangeRateVote.decode(reader, reader.uint32(), useInterfaces));
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
    message.feederDelegations = object.feederDelegations?.map(e => FeederDelegation.fromPartial(e)) || [];
    message.exchangeRates = object.exchangeRates?.map(e => ExchangeRateTuple.fromPartial(e)) || [];
    message.missCounters = object.missCounters?.map(e => MissCounter.fromPartial(e)) || [];
    message.aggregateExchangeRatePrevotes = object.aggregateExchangeRatePrevotes?.map(e => AggregateExchangeRatePrevote.fromPartial(e)) || [];
    message.aggregateExchangeRateVotes = object.aggregateExchangeRateVotes?.map(e => AggregateExchangeRateVote.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.feederDelegations = object.feeder_delegations?.map(e => FeederDelegation.fromAmino(e)) || [];
    message.exchangeRates = object.exchange_rates?.map(e => ExchangeRateTuple.fromAmino(e)) || [];
    message.missCounters = object.miss_counters?.map(e => MissCounter.fromAmino(e)) || [];
    message.aggregateExchangeRatePrevotes = object.aggregate_exchange_rate_prevotes?.map(e => AggregateExchangeRatePrevote.fromAmino(e)) || [];
    message.aggregateExchangeRateVotes = object.aggregate_exchange_rate_votes?.map(e => AggregateExchangeRateVote.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.feederDelegations) {
      obj.feeder_delegations = message.feederDelegations.map(e => e ? FeederDelegation.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.feeder_delegations = message.feederDelegations;
    }
    if (message.exchangeRates) {
      obj.exchange_rates = message.exchangeRates.map(e => e ? ExchangeRateTuple.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.exchange_rates = message.exchangeRates;
    }
    if (message.missCounters) {
      obj.miss_counters = message.missCounters.map(e => e ? MissCounter.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.miss_counters = message.missCounters;
    }
    if (message.aggregateExchangeRatePrevotes) {
      obj.aggregate_exchange_rate_prevotes = message.aggregateExchangeRatePrevotes.map(e => e ? AggregateExchangeRatePrevote.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.aggregate_exchange_rate_prevotes = message.aggregateExchangeRatePrevotes;
    }
    if (message.aggregateExchangeRateVotes) {
      obj.aggregate_exchange_rate_votes = message.aggregateExchangeRateVotes.map(e => e ? AggregateExchangeRateVote.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.aggregate_exchange_rate_votes = message.aggregateExchangeRateVotes;
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
      typeUrl: "/kujira.oracle.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseFeederDelegation(): FeederDelegation {
  return {
    feederAddress: "",
    validatorAddress: ""
  };
}
export const FeederDelegation = {
  typeUrl: "/kujira.oracle.FeederDelegation",
  encode(message: FeederDelegation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.feederAddress !== "") {
      writer.uint32(10).string(message.feederAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): FeederDelegation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeederDelegation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.feederAddress = reader.string();
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
  fromPartial(object: Partial<FeederDelegation>): FeederDelegation {
    const message = createBaseFeederDelegation();
    message.feederAddress = object.feederAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    return message;
  },
  fromAmino(object: FeederDelegationAmino): FeederDelegation {
    const message = createBaseFeederDelegation();
    if (object.feeder_address !== undefined && object.feeder_address !== null) {
      message.feederAddress = object.feeder_address;
    }
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    return message;
  },
  toAmino(message: FeederDelegation, useInterfaces: boolean = false): FeederDelegationAmino {
    const obj: any = {};
    obj.feeder_address = message.feederAddress === "" ? undefined : message.feederAddress;
    obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
    return obj;
  },
  fromAminoMsg(object: FeederDelegationAminoMsg): FeederDelegation {
    return FeederDelegation.fromAmino(object.value);
  },
  fromProtoMsg(message: FeederDelegationProtoMsg, useInterfaces: boolean = false): FeederDelegation {
    return FeederDelegation.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: FeederDelegation): Uint8Array {
    return FeederDelegation.encode(message).finish();
  },
  toProtoMsg(message: FeederDelegation): FeederDelegationProtoMsg {
    return {
      typeUrl: "/kujira.oracle.FeederDelegation",
      value: FeederDelegation.encode(message).finish()
    };
  }
};
function createBaseMissCounter(): MissCounter {
  return {
    validatorAddress: "",
    missCounter: BigInt(0)
  };
}
export const MissCounter = {
  typeUrl: "/kujira.oracle.MissCounter",
  encode(message: MissCounter, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.missCounter !== BigInt(0)) {
      writer.uint32(16).uint64(message.missCounter);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MissCounter {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMissCounter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        case 2:
          message.missCounter = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MissCounter>): MissCounter {
    const message = createBaseMissCounter();
    message.validatorAddress = object.validatorAddress ?? "";
    message.missCounter = object.missCounter !== undefined && object.missCounter !== null ? BigInt(object.missCounter.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MissCounterAmino): MissCounter {
    const message = createBaseMissCounter();
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.miss_counter !== undefined && object.miss_counter !== null) {
      message.missCounter = BigInt(object.miss_counter);
    }
    return message;
  },
  toAmino(message: MissCounter, useInterfaces: boolean = false): MissCounterAmino {
    const obj: any = {};
    obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
    obj.miss_counter = message.missCounter !== BigInt(0) ? message.missCounter.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MissCounterAminoMsg): MissCounter {
    return MissCounter.fromAmino(object.value);
  },
  fromProtoMsg(message: MissCounterProtoMsg, useInterfaces: boolean = false): MissCounter {
    return MissCounter.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MissCounter): Uint8Array {
    return MissCounter.encode(message).finish();
  },
  toProtoMsg(message: MissCounter): MissCounterProtoMsg {
    return {
      typeUrl: "/kujira.oracle.MissCounter",
      value: MissCounter.encode(message).finish()
    };
  }
};