//@ts-nocheck
import { DecCoin, DecCoinAmino, DecCoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { AggregateExchangeRatePrevote, AggregateExchangeRatePrevoteAmino, AggregateExchangeRatePrevoteSDKType, AggregateExchangeRateVote, AggregateExchangeRateVoteAmino, AggregateExchangeRateVoteSDKType, Params, ParamsAmino, ParamsSDKType } from "./oracle";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
/** QueryExchangeRateRequest is the request type for the Query/ExchangeRate RPC method. */
export interface QueryExchangeRateRequest {
  /** denom defines the denomination to query for. */
  denom: string;
}
export interface QueryExchangeRateRequestProtoMsg {
  typeUrl: "/kujira.oracle.QueryExchangeRateRequest";
  value: Uint8Array;
}
/** QueryExchangeRateRequest is the request type for the Query/ExchangeRate RPC method. */
export interface QueryExchangeRateRequestAmino {
  /** denom defines the denomination to query for. */
  denom?: string;
}
export interface QueryExchangeRateRequestAminoMsg {
  type: "/kujira.oracle.QueryExchangeRateRequest";
  value: QueryExchangeRateRequestAmino;
}
/** QueryExchangeRateRequest is the request type for the Query/ExchangeRate RPC method. */
export interface QueryExchangeRateRequestSDKType {
  denom: string;
}
/**
 * QueryExchangeRateResponse is response type for the
 * Query/ExchangeRate RPC method.
 */
export interface QueryExchangeRateResponse {
  /** exchange_rate defines the exchange rate of whitelisted assets */
  exchangeRate: string;
}
export interface QueryExchangeRateResponseProtoMsg {
  typeUrl: "/kujira.oracle.QueryExchangeRateResponse";
  value: Uint8Array;
}
/**
 * QueryExchangeRateResponse is response type for the
 * Query/ExchangeRate RPC method.
 */
export interface QueryExchangeRateResponseAmino {
  /** exchange_rate defines the exchange rate of whitelisted assets */
  exchange_rate?: string;
}
export interface QueryExchangeRateResponseAminoMsg {
  type: "/kujira.oracle.QueryExchangeRateResponse";
  value: QueryExchangeRateResponseAmino;
}
/**
 * QueryExchangeRateResponse is response type for the
 * Query/ExchangeRate RPC method.
 */
export interface QueryExchangeRateResponseSDKType {
  exchange_rate: string;
}
/** QueryExchangeRatesRequest is the request type for the Query/ExchangeRates RPC method. */
export interface QueryExchangeRatesRequest {}
export interface QueryExchangeRatesRequestProtoMsg {
  typeUrl: "/kujira.oracle.QueryExchangeRatesRequest";
  value: Uint8Array;
}
/** QueryExchangeRatesRequest is the request type for the Query/ExchangeRates RPC method. */
export interface QueryExchangeRatesRequestAmino {}
export interface QueryExchangeRatesRequestAminoMsg {
  type: "/kujira.oracle.QueryExchangeRatesRequest";
  value: QueryExchangeRatesRequestAmino;
}
/** QueryExchangeRatesRequest is the request type for the Query/ExchangeRates RPC method. */
export interface QueryExchangeRatesRequestSDKType {}
/**
 * QueryExchangeRatesResponse is response type for the
 * Query/ExchangeRates RPC method.
 */
export interface QueryExchangeRatesResponse {
  /** exchange_rates defines a list of the exchange rate for all whitelisted denoms. */
  exchangeRates: DecCoin[];
}
export interface QueryExchangeRatesResponseProtoMsg {
  typeUrl: "/kujira.oracle.QueryExchangeRatesResponse";
  value: Uint8Array;
}
/**
 * QueryExchangeRatesResponse is response type for the
 * Query/ExchangeRates RPC method.
 */
export interface QueryExchangeRatesResponseAmino {
  /** exchange_rates defines a list of the exchange rate for all whitelisted denoms. */
  exchange_rates?: DecCoinAmino[];
}
export interface QueryExchangeRatesResponseAminoMsg {
  type: "/kujira.oracle.QueryExchangeRatesResponse";
  value: QueryExchangeRatesResponseAmino;
}
/**
 * QueryExchangeRatesResponse is response type for the
 * Query/ExchangeRates RPC method.
 */
export interface QueryExchangeRatesResponseSDKType {
  exchange_rates: DecCoinSDKType[];
}
/** QueryActivesRequest is the request type for the Query/Actives RPC method. */
export interface QueryActivesRequest {}
export interface QueryActivesRequestProtoMsg {
  typeUrl: "/kujira.oracle.QueryActivesRequest";
  value: Uint8Array;
}
/** QueryActivesRequest is the request type for the Query/Actives RPC method. */
export interface QueryActivesRequestAmino {}
export interface QueryActivesRequestAminoMsg {
  type: "/kujira.oracle.QueryActivesRequest";
  value: QueryActivesRequestAmino;
}
/** QueryActivesRequest is the request type for the Query/Actives RPC method. */
export interface QueryActivesRequestSDKType {}
/**
 * QueryActivesResponse is response type for the
 * Query/Actives RPC method.
 */
export interface QueryActivesResponse {
  /** actives defines a list of the denomination which oracle prices aggreed upon. */
  actives: string[];
}
export interface QueryActivesResponseProtoMsg {
  typeUrl: "/kujira.oracle.QueryActivesResponse";
  value: Uint8Array;
}
/**
 * QueryActivesResponse is response type for the
 * Query/Actives RPC method.
 */
export interface QueryActivesResponseAmino {
  /** actives defines a list of the denomination which oracle prices aggreed upon. */
  actives?: string[];
}
export interface QueryActivesResponseAminoMsg {
  type: "/kujira.oracle.QueryActivesResponse";
  value: QueryActivesResponseAmino;
}
/**
 * QueryActivesResponse is response type for the
 * Query/Actives RPC method.
 */
export interface QueryActivesResponseSDKType {
  actives: string[];
}
/** QueryVoteTargetsRequest is the request type for the Query/VoteTargets RPC method. */
export interface QueryVoteTargetsRequest {}
export interface QueryVoteTargetsRequestProtoMsg {
  typeUrl: "/kujira.oracle.QueryVoteTargetsRequest";
  value: Uint8Array;
}
/** QueryVoteTargetsRequest is the request type for the Query/VoteTargets RPC method. */
export interface QueryVoteTargetsRequestAmino {}
export interface QueryVoteTargetsRequestAminoMsg {
  type: "/kujira.oracle.QueryVoteTargetsRequest";
  value: QueryVoteTargetsRequestAmino;
}
/** QueryVoteTargetsRequest is the request type for the Query/VoteTargets RPC method. */
export interface QueryVoteTargetsRequestSDKType {}
/**
 * QueryVoteTargetsResponse is response type for the
 * Query/VoteTargets RPC method.
 */
export interface QueryVoteTargetsResponse {
  /**
   * vote_targets defines a list of the denomination in which everyone
   * should vote in the current vote period.
   */
  voteTargets: string[];
}
export interface QueryVoteTargetsResponseProtoMsg {
  typeUrl: "/kujira.oracle.QueryVoteTargetsResponse";
  value: Uint8Array;
}
/**
 * QueryVoteTargetsResponse is response type for the
 * Query/VoteTargets RPC method.
 */
export interface QueryVoteTargetsResponseAmino {
  /**
   * vote_targets defines a list of the denomination in which everyone
   * should vote in the current vote period.
   */
  vote_targets?: string[];
}
export interface QueryVoteTargetsResponseAminoMsg {
  type: "/kujira.oracle.QueryVoteTargetsResponse";
  value: QueryVoteTargetsResponseAmino;
}
/**
 * QueryVoteTargetsResponse is response type for the
 * Query/VoteTargets RPC method.
 */
export interface QueryVoteTargetsResponseSDKType {
  vote_targets: string[];
}
/** QueryFeederDelegationRequest is the request type for the Query/FeederDelegation RPC method. */
export interface QueryFeederDelegationRequest {
  /** validator defines the validator address to query for. */
  validatorAddr: string;
}
export interface QueryFeederDelegationRequestProtoMsg {
  typeUrl: "/kujira.oracle.QueryFeederDelegationRequest";
  value: Uint8Array;
}
/** QueryFeederDelegationRequest is the request type for the Query/FeederDelegation RPC method. */
export interface QueryFeederDelegationRequestAmino {
  /** validator defines the validator address to query for. */
  validator_addr?: string;
}
export interface QueryFeederDelegationRequestAminoMsg {
  type: "/kujira.oracle.QueryFeederDelegationRequest";
  value: QueryFeederDelegationRequestAmino;
}
/** QueryFeederDelegationRequest is the request type for the Query/FeederDelegation RPC method. */
export interface QueryFeederDelegationRequestSDKType {
  validator_addr: string;
}
/**
 * QueryFeederDelegationResponse is response type for the
 * Query/FeederDelegation RPC method.
 */
export interface QueryFeederDelegationResponse {
  /** feeder_addr defines the feeder delegation of a validator */
  feederAddr: string;
}
export interface QueryFeederDelegationResponseProtoMsg {
  typeUrl: "/kujira.oracle.QueryFeederDelegationResponse";
  value: Uint8Array;
}
/**
 * QueryFeederDelegationResponse is response type for the
 * Query/FeederDelegation RPC method.
 */
export interface QueryFeederDelegationResponseAmino {
  /** feeder_addr defines the feeder delegation of a validator */
  feeder_addr?: string;
}
export interface QueryFeederDelegationResponseAminoMsg {
  type: "/kujira.oracle.QueryFeederDelegationResponse";
  value: QueryFeederDelegationResponseAmino;
}
/**
 * QueryFeederDelegationResponse is response type for the
 * Query/FeederDelegation RPC method.
 */
export interface QueryFeederDelegationResponseSDKType {
  feeder_addr: string;
}
/** QueryMissCounterRequest is the request type for the Query/MissCounter RPC method. */
export interface QueryMissCounterRequest {
  /** validator defines the validator address to query for. */
  validatorAddr: string;
}
export interface QueryMissCounterRequestProtoMsg {
  typeUrl: "/kujira.oracle.QueryMissCounterRequest";
  value: Uint8Array;
}
/** QueryMissCounterRequest is the request type for the Query/MissCounter RPC method. */
export interface QueryMissCounterRequestAmino {
  /** validator defines the validator address to query for. */
  validator_addr?: string;
}
export interface QueryMissCounterRequestAminoMsg {
  type: "/kujira.oracle.QueryMissCounterRequest";
  value: QueryMissCounterRequestAmino;
}
/** QueryMissCounterRequest is the request type for the Query/MissCounter RPC method. */
export interface QueryMissCounterRequestSDKType {
  validator_addr: string;
}
/**
 * QueryMissCounterResponse is response type for the
 * Query/MissCounter RPC method.
 */
export interface QueryMissCounterResponse {
  /** miss_counter defines the oracle miss counter of a validator */
  missCounter: bigint;
}
export interface QueryMissCounterResponseProtoMsg {
  typeUrl: "/kujira.oracle.QueryMissCounterResponse";
  value: Uint8Array;
}
/**
 * QueryMissCounterResponse is response type for the
 * Query/MissCounter RPC method.
 */
export interface QueryMissCounterResponseAmino {
  /** miss_counter defines the oracle miss counter of a validator */
  miss_counter?: string;
}
export interface QueryMissCounterResponseAminoMsg {
  type: "/kujira.oracle.QueryMissCounterResponse";
  value: QueryMissCounterResponseAmino;
}
/**
 * QueryMissCounterResponse is response type for the
 * Query/MissCounter RPC method.
 */
export interface QueryMissCounterResponseSDKType {
  miss_counter: bigint;
}
/** QueryAggregatePrevoteRequest is the request type for the Query/AggregatePrevote RPC method. */
export interface QueryAggregatePrevoteRequest {
  /** validator defines the validator address to query for. */
  validatorAddr: string;
}
export interface QueryAggregatePrevoteRequestProtoMsg {
  typeUrl: "/kujira.oracle.QueryAggregatePrevoteRequest";
  value: Uint8Array;
}
/** QueryAggregatePrevoteRequest is the request type for the Query/AggregatePrevote RPC method. */
export interface QueryAggregatePrevoteRequestAmino {
  /** validator defines the validator address to query for. */
  validator_addr?: string;
}
export interface QueryAggregatePrevoteRequestAminoMsg {
  type: "/kujira.oracle.QueryAggregatePrevoteRequest";
  value: QueryAggregatePrevoteRequestAmino;
}
/** QueryAggregatePrevoteRequest is the request type for the Query/AggregatePrevote RPC method. */
export interface QueryAggregatePrevoteRequestSDKType {
  validator_addr: string;
}
/**
 * QueryAggregatePrevoteResponse is response type for the
 * Query/AggregatePrevote RPC method.
 */
export interface QueryAggregatePrevoteResponse {
  /** aggregate_prevote defines oracle aggregate prevote submitted by a validator in the current vote period */
  aggregatePrevote: AggregateExchangeRatePrevote | undefined;
}
export interface QueryAggregatePrevoteResponseProtoMsg {
  typeUrl: "/kujira.oracle.QueryAggregatePrevoteResponse";
  value: Uint8Array;
}
/**
 * QueryAggregatePrevoteResponse is response type for the
 * Query/AggregatePrevote RPC method.
 */
export interface QueryAggregatePrevoteResponseAmino {
  /** aggregate_prevote defines oracle aggregate prevote submitted by a validator in the current vote period */
  aggregate_prevote?: AggregateExchangeRatePrevoteAmino | undefined;
}
export interface QueryAggregatePrevoteResponseAminoMsg {
  type: "/kujira.oracle.QueryAggregatePrevoteResponse";
  value: QueryAggregatePrevoteResponseAmino;
}
/**
 * QueryAggregatePrevoteResponse is response type for the
 * Query/AggregatePrevote RPC method.
 */
export interface QueryAggregatePrevoteResponseSDKType {
  aggregate_prevote: AggregateExchangeRatePrevoteSDKType | undefined;
}
/** QueryAggregatePrevotesRequest is the request type for the Query/AggregatePrevotes RPC method. */
export interface QueryAggregatePrevotesRequest {}
export interface QueryAggregatePrevotesRequestProtoMsg {
  typeUrl: "/kujira.oracle.QueryAggregatePrevotesRequest";
  value: Uint8Array;
}
/** QueryAggregatePrevotesRequest is the request type for the Query/AggregatePrevotes RPC method. */
export interface QueryAggregatePrevotesRequestAmino {}
export interface QueryAggregatePrevotesRequestAminoMsg {
  type: "/kujira.oracle.QueryAggregatePrevotesRequest";
  value: QueryAggregatePrevotesRequestAmino;
}
/** QueryAggregatePrevotesRequest is the request type for the Query/AggregatePrevotes RPC method. */
export interface QueryAggregatePrevotesRequestSDKType {}
/**
 * QueryAggregatePrevotesResponse is response type for the
 * Query/AggregatePrevotes RPC method.
 */
export interface QueryAggregatePrevotesResponse {
  /** aggregate_prevotes defines all oracle aggregate prevotes submitted in the current vote period */
  aggregatePrevotes: AggregateExchangeRatePrevote[];
}
export interface QueryAggregatePrevotesResponseProtoMsg {
  typeUrl: "/kujira.oracle.QueryAggregatePrevotesResponse";
  value: Uint8Array;
}
/**
 * QueryAggregatePrevotesResponse is response type for the
 * Query/AggregatePrevotes RPC method.
 */
export interface QueryAggregatePrevotesResponseAmino {
  /** aggregate_prevotes defines all oracle aggregate prevotes submitted in the current vote period */
  aggregate_prevotes?: AggregateExchangeRatePrevoteAmino[];
}
export interface QueryAggregatePrevotesResponseAminoMsg {
  type: "/kujira.oracle.QueryAggregatePrevotesResponse";
  value: QueryAggregatePrevotesResponseAmino;
}
/**
 * QueryAggregatePrevotesResponse is response type for the
 * Query/AggregatePrevotes RPC method.
 */
export interface QueryAggregatePrevotesResponseSDKType {
  aggregate_prevotes: AggregateExchangeRatePrevoteSDKType[];
}
/** QueryAggregateVoteRequest is the request type for the Query/AggregateVote RPC method. */
export interface QueryAggregateVoteRequest {
  /** validator defines the validator address to query for. */
  validatorAddr: string;
}
export interface QueryAggregateVoteRequestProtoMsg {
  typeUrl: "/kujira.oracle.QueryAggregateVoteRequest";
  value: Uint8Array;
}
/** QueryAggregateVoteRequest is the request type for the Query/AggregateVote RPC method. */
export interface QueryAggregateVoteRequestAmino {
  /** validator defines the validator address to query for. */
  validator_addr?: string;
}
export interface QueryAggregateVoteRequestAminoMsg {
  type: "/kujira.oracle.QueryAggregateVoteRequest";
  value: QueryAggregateVoteRequestAmino;
}
/** QueryAggregateVoteRequest is the request type for the Query/AggregateVote RPC method. */
export interface QueryAggregateVoteRequestSDKType {
  validator_addr: string;
}
/**
 * QueryAggregateVoteResponse is response type for the
 * Query/AggregateVote RPC method.
 */
export interface QueryAggregateVoteResponse {
  /** aggregate_vote defines oracle aggregate vote submitted by a validator in the current vote period */
  aggregateVote: AggregateExchangeRateVote | undefined;
}
export interface QueryAggregateVoteResponseProtoMsg {
  typeUrl: "/kujira.oracle.QueryAggregateVoteResponse";
  value: Uint8Array;
}
/**
 * QueryAggregateVoteResponse is response type for the
 * Query/AggregateVote RPC method.
 */
export interface QueryAggregateVoteResponseAmino {
  /** aggregate_vote defines oracle aggregate vote submitted by a validator in the current vote period */
  aggregate_vote?: AggregateExchangeRateVoteAmino | undefined;
}
export interface QueryAggregateVoteResponseAminoMsg {
  type: "/kujira.oracle.QueryAggregateVoteResponse";
  value: QueryAggregateVoteResponseAmino;
}
/**
 * QueryAggregateVoteResponse is response type for the
 * Query/AggregateVote RPC method.
 */
export interface QueryAggregateVoteResponseSDKType {
  aggregate_vote: AggregateExchangeRateVoteSDKType | undefined;
}
/** QueryAggregateVotesRequest is the request type for the Query/AggregateVotes RPC method. */
export interface QueryAggregateVotesRequest {}
export interface QueryAggregateVotesRequestProtoMsg {
  typeUrl: "/kujira.oracle.QueryAggregateVotesRequest";
  value: Uint8Array;
}
/** QueryAggregateVotesRequest is the request type for the Query/AggregateVotes RPC method. */
export interface QueryAggregateVotesRequestAmino {}
export interface QueryAggregateVotesRequestAminoMsg {
  type: "/kujira.oracle.QueryAggregateVotesRequest";
  value: QueryAggregateVotesRequestAmino;
}
/** QueryAggregateVotesRequest is the request type for the Query/AggregateVotes RPC method. */
export interface QueryAggregateVotesRequestSDKType {}
/**
 * QueryAggregateVotesResponse is response type for the
 * Query/AggregateVotes RPC method.
 */
export interface QueryAggregateVotesResponse {
  /** aggregate_votes defines all oracle aggregate votes submitted in the current vote period */
  aggregateVotes: AggregateExchangeRateVote[];
}
export interface QueryAggregateVotesResponseProtoMsg {
  typeUrl: "/kujira.oracle.QueryAggregateVotesResponse";
  value: Uint8Array;
}
/**
 * QueryAggregateVotesResponse is response type for the
 * Query/AggregateVotes RPC method.
 */
export interface QueryAggregateVotesResponseAmino {
  /** aggregate_votes defines all oracle aggregate votes submitted in the current vote period */
  aggregate_votes?: AggregateExchangeRateVoteAmino[];
}
export interface QueryAggregateVotesResponseAminoMsg {
  type: "/kujira.oracle.QueryAggregateVotesResponse";
  value: QueryAggregateVotesResponseAmino;
}
/**
 * QueryAggregateVotesResponse is response type for the
 * Query/AggregateVotes RPC method.
 */
export interface QueryAggregateVotesResponseSDKType {
  aggregate_votes: AggregateExchangeRateVoteSDKType[];
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/kujira.oracle.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/kujira.oracle.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/kujira.oracle.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params defines the parameters of the module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/kujira.oracle.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
function createBaseQueryExchangeRateRequest(): QueryExchangeRateRequest {
  return {
    denom: ""
  };
}
export const QueryExchangeRateRequest = {
  typeUrl: "/kujira.oracle.QueryExchangeRateRequest",
  encode(message: QueryExchangeRateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryExchangeRateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryExchangeRateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryExchangeRateRequest>): QueryExchangeRateRequest {
    const message = createBaseQueryExchangeRateRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryExchangeRateRequestAmino): QueryExchangeRateRequest {
    const message = createBaseQueryExchangeRateRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryExchangeRateRequest, useInterfaces: boolean = false): QueryExchangeRateRequestAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryExchangeRateRequestAminoMsg): QueryExchangeRateRequest {
    return QueryExchangeRateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryExchangeRateRequestProtoMsg, useInterfaces: boolean = false): QueryExchangeRateRequest {
    return QueryExchangeRateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryExchangeRateRequest): Uint8Array {
    return QueryExchangeRateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryExchangeRateRequest): QueryExchangeRateRequestProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryExchangeRateRequest",
      value: QueryExchangeRateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryExchangeRateResponse(): QueryExchangeRateResponse {
  return {
    exchangeRate: ""
  };
}
export const QueryExchangeRateResponse = {
  typeUrl: "/kujira.oracle.QueryExchangeRateResponse",
  encode(message: QueryExchangeRateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.exchangeRate !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.exchangeRate, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryExchangeRateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryExchangeRateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exchangeRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryExchangeRateResponse>): QueryExchangeRateResponse {
    const message = createBaseQueryExchangeRateResponse();
    message.exchangeRate = object.exchangeRate ?? "";
    return message;
  },
  fromAmino(object: QueryExchangeRateResponseAmino): QueryExchangeRateResponse {
    const message = createBaseQueryExchangeRateResponse();
    if (object.exchange_rate !== undefined && object.exchange_rate !== null) {
      message.exchangeRate = object.exchange_rate;
    }
    return message;
  },
  toAmino(message: QueryExchangeRateResponse, useInterfaces: boolean = false): QueryExchangeRateResponseAmino {
    const obj: any = {};
    obj.exchange_rate = message.exchangeRate === "" ? undefined : message.exchangeRate;
    return obj;
  },
  fromAminoMsg(object: QueryExchangeRateResponseAminoMsg): QueryExchangeRateResponse {
    return QueryExchangeRateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryExchangeRateResponseProtoMsg, useInterfaces: boolean = false): QueryExchangeRateResponse {
    return QueryExchangeRateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryExchangeRateResponse): Uint8Array {
    return QueryExchangeRateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryExchangeRateResponse): QueryExchangeRateResponseProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryExchangeRateResponse",
      value: QueryExchangeRateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryExchangeRatesRequest(): QueryExchangeRatesRequest {
  return {};
}
export const QueryExchangeRatesRequest = {
  typeUrl: "/kujira.oracle.QueryExchangeRatesRequest",
  encode(_: QueryExchangeRatesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryExchangeRatesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryExchangeRatesRequest();
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
  fromPartial(_: Partial<QueryExchangeRatesRequest>): QueryExchangeRatesRequest {
    const message = createBaseQueryExchangeRatesRequest();
    return message;
  },
  fromAmino(_: QueryExchangeRatesRequestAmino): QueryExchangeRatesRequest {
    const message = createBaseQueryExchangeRatesRequest();
    return message;
  },
  toAmino(_: QueryExchangeRatesRequest, useInterfaces: boolean = false): QueryExchangeRatesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryExchangeRatesRequestAminoMsg): QueryExchangeRatesRequest {
    return QueryExchangeRatesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryExchangeRatesRequestProtoMsg, useInterfaces: boolean = false): QueryExchangeRatesRequest {
    return QueryExchangeRatesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryExchangeRatesRequest): Uint8Array {
    return QueryExchangeRatesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryExchangeRatesRequest): QueryExchangeRatesRequestProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryExchangeRatesRequest",
      value: QueryExchangeRatesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryExchangeRatesResponse(): QueryExchangeRatesResponse {
  return {
    exchangeRates: []
  };
}
export const QueryExchangeRatesResponse = {
  typeUrl: "/kujira.oracle.QueryExchangeRatesResponse",
  encode(message: QueryExchangeRatesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.exchangeRates) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryExchangeRatesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryExchangeRatesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exchangeRates.push(DecCoin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryExchangeRatesResponse>): QueryExchangeRatesResponse {
    const message = createBaseQueryExchangeRatesResponse();
    message.exchangeRates = object.exchangeRates?.map(e => DecCoin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryExchangeRatesResponseAmino): QueryExchangeRatesResponse {
    const message = createBaseQueryExchangeRatesResponse();
    message.exchangeRates = object.exchange_rates?.map(e => DecCoin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryExchangeRatesResponse, useInterfaces: boolean = false): QueryExchangeRatesResponseAmino {
    const obj: any = {};
    if (message.exchangeRates) {
      obj.exchange_rates = message.exchangeRates.map(e => e ? DecCoin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.exchange_rates = message.exchangeRates;
    }
    return obj;
  },
  fromAminoMsg(object: QueryExchangeRatesResponseAminoMsg): QueryExchangeRatesResponse {
    return QueryExchangeRatesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryExchangeRatesResponseProtoMsg, useInterfaces: boolean = false): QueryExchangeRatesResponse {
    return QueryExchangeRatesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryExchangeRatesResponse): Uint8Array {
    return QueryExchangeRatesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryExchangeRatesResponse): QueryExchangeRatesResponseProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryExchangeRatesResponse",
      value: QueryExchangeRatesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryActivesRequest(): QueryActivesRequest {
  return {};
}
export const QueryActivesRequest = {
  typeUrl: "/kujira.oracle.QueryActivesRequest",
  encode(_: QueryActivesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryActivesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryActivesRequest();
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
  fromPartial(_: Partial<QueryActivesRequest>): QueryActivesRequest {
    const message = createBaseQueryActivesRequest();
    return message;
  },
  fromAmino(_: QueryActivesRequestAmino): QueryActivesRequest {
    const message = createBaseQueryActivesRequest();
    return message;
  },
  toAmino(_: QueryActivesRequest, useInterfaces: boolean = false): QueryActivesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryActivesRequestAminoMsg): QueryActivesRequest {
    return QueryActivesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryActivesRequestProtoMsg, useInterfaces: boolean = false): QueryActivesRequest {
    return QueryActivesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryActivesRequest): Uint8Array {
    return QueryActivesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryActivesRequest): QueryActivesRequestProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryActivesRequest",
      value: QueryActivesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryActivesResponse(): QueryActivesResponse {
  return {
    actives: []
  };
}
export const QueryActivesResponse = {
  typeUrl: "/kujira.oracle.QueryActivesResponse",
  encode(message: QueryActivesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.actives) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryActivesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryActivesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.actives.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryActivesResponse>): QueryActivesResponse {
    const message = createBaseQueryActivesResponse();
    message.actives = object.actives?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryActivesResponseAmino): QueryActivesResponse {
    const message = createBaseQueryActivesResponse();
    message.actives = object.actives?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryActivesResponse, useInterfaces: boolean = false): QueryActivesResponseAmino {
    const obj: any = {};
    if (message.actives) {
      obj.actives = message.actives.map(e => e);
    } else {
      obj.actives = message.actives;
    }
    return obj;
  },
  fromAminoMsg(object: QueryActivesResponseAminoMsg): QueryActivesResponse {
    return QueryActivesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryActivesResponseProtoMsg, useInterfaces: boolean = false): QueryActivesResponse {
    return QueryActivesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryActivesResponse): Uint8Array {
    return QueryActivesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryActivesResponse): QueryActivesResponseProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryActivesResponse",
      value: QueryActivesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryVoteTargetsRequest(): QueryVoteTargetsRequest {
  return {};
}
export const QueryVoteTargetsRequest = {
  typeUrl: "/kujira.oracle.QueryVoteTargetsRequest",
  encode(_: QueryVoteTargetsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryVoteTargetsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVoteTargetsRequest();
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
  fromPartial(_: Partial<QueryVoteTargetsRequest>): QueryVoteTargetsRequest {
    const message = createBaseQueryVoteTargetsRequest();
    return message;
  },
  fromAmino(_: QueryVoteTargetsRequestAmino): QueryVoteTargetsRequest {
    const message = createBaseQueryVoteTargetsRequest();
    return message;
  },
  toAmino(_: QueryVoteTargetsRequest, useInterfaces: boolean = false): QueryVoteTargetsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryVoteTargetsRequestAminoMsg): QueryVoteTargetsRequest {
    return QueryVoteTargetsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryVoteTargetsRequestProtoMsg, useInterfaces: boolean = false): QueryVoteTargetsRequest {
    return QueryVoteTargetsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryVoteTargetsRequest): Uint8Array {
    return QueryVoteTargetsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryVoteTargetsRequest): QueryVoteTargetsRequestProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryVoteTargetsRequest",
      value: QueryVoteTargetsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryVoteTargetsResponse(): QueryVoteTargetsResponse {
  return {
    voteTargets: []
  };
}
export const QueryVoteTargetsResponse = {
  typeUrl: "/kujira.oracle.QueryVoteTargetsResponse",
  encode(message: QueryVoteTargetsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.voteTargets) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryVoteTargetsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVoteTargetsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.voteTargets.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryVoteTargetsResponse>): QueryVoteTargetsResponse {
    const message = createBaseQueryVoteTargetsResponse();
    message.voteTargets = object.voteTargets?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryVoteTargetsResponseAmino): QueryVoteTargetsResponse {
    const message = createBaseQueryVoteTargetsResponse();
    message.voteTargets = object.vote_targets?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryVoteTargetsResponse, useInterfaces: boolean = false): QueryVoteTargetsResponseAmino {
    const obj: any = {};
    if (message.voteTargets) {
      obj.vote_targets = message.voteTargets.map(e => e);
    } else {
      obj.vote_targets = message.voteTargets;
    }
    return obj;
  },
  fromAminoMsg(object: QueryVoteTargetsResponseAminoMsg): QueryVoteTargetsResponse {
    return QueryVoteTargetsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryVoteTargetsResponseProtoMsg, useInterfaces: boolean = false): QueryVoteTargetsResponse {
    return QueryVoteTargetsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryVoteTargetsResponse): Uint8Array {
    return QueryVoteTargetsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryVoteTargetsResponse): QueryVoteTargetsResponseProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryVoteTargetsResponse",
      value: QueryVoteTargetsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryFeederDelegationRequest(): QueryFeederDelegationRequest {
  return {
    validatorAddr: ""
  };
}
export const QueryFeederDelegationRequest = {
  typeUrl: "/kujira.oracle.QueryFeederDelegationRequest",
  encode(message: QueryFeederDelegationRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddr !== "") {
      writer.uint32(10).string(message.validatorAddr);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryFeederDelegationRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFeederDelegationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryFeederDelegationRequest>): QueryFeederDelegationRequest {
    const message = createBaseQueryFeederDelegationRequest();
    message.validatorAddr = object.validatorAddr ?? "";
    return message;
  },
  fromAmino(object: QueryFeederDelegationRequestAmino): QueryFeederDelegationRequest {
    const message = createBaseQueryFeederDelegationRequest();
    if (object.validator_addr !== undefined && object.validator_addr !== null) {
      message.validatorAddr = object.validator_addr;
    }
    return message;
  },
  toAmino(message: QueryFeederDelegationRequest, useInterfaces: boolean = false): QueryFeederDelegationRequestAmino {
    const obj: any = {};
    obj.validator_addr = message.validatorAddr === "" ? undefined : message.validatorAddr;
    return obj;
  },
  fromAminoMsg(object: QueryFeederDelegationRequestAminoMsg): QueryFeederDelegationRequest {
    return QueryFeederDelegationRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFeederDelegationRequestProtoMsg, useInterfaces: boolean = false): QueryFeederDelegationRequest {
    return QueryFeederDelegationRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryFeederDelegationRequest): Uint8Array {
    return QueryFeederDelegationRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryFeederDelegationRequest): QueryFeederDelegationRequestProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryFeederDelegationRequest",
      value: QueryFeederDelegationRequest.encode(message).finish()
    };
  }
};
function createBaseQueryFeederDelegationResponse(): QueryFeederDelegationResponse {
  return {
    feederAddr: ""
  };
}
export const QueryFeederDelegationResponse = {
  typeUrl: "/kujira.oracle.QueryFeederDelegationResponse",
  encode(message: QueryFeederDelegationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.feederAddr !== "") {
      writer.uint32(10).string(message.feederAddr);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryFeederDelegationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFeederDelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.feederAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryFeederDelegationResponse>): QueryFeederDelegationResponse {
    const message = createBaseQueryFeederDelegationResponse();
    message.feederAddr = object.feederAddr ?? "";
    return message;
  },
  fromAmino(object: QueryFeederDelegationResponseAmino): QueryFeederDelegationResponse {
    const message = createBaseQueryFeederDelegationResponse();
    if (object.feeder_addr !== undefined && object.feeder_addr !== null) {
      message.feederAddr = object.feeder_addr;
    }
    return message;
  },
  toAmino(message: QueryFeederDelegationResponse, useInterfaces: boolean = false): QueryFeederDelegationResponseAmino {
    const obj: any = {};
    obj.feeder_addr = message.feederAddr === "" ? undefined : message.feederAddr;
    return obj;
  },
  fromAminoMsg(object: QueryFeederDelegationResponseAminoMsg): QueryFeederDelegationResponse {
    return QueryFeederDelegationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryFeederDelegationResponseProtoMsg, useInterfaces: boolean = false): QueryFeederDelegationResponse {
    return QueryFeederDelegationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryFeederDelegationResponse): Uint8Array {
    return QueryFeederDelegationResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryFeederDelegationResponse): QueryFeederDelegationResponseProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryFeederDelegationResponse",
      value: QueryFeederDelegationResponse.encode(message).finish()
    };
  }
};
function createBaseQueryMissCounterRequest(): QueryMissCounterRequest {
  return {
    validatorAddr: ""
  };
}
export const QueryMissCounterRequest = {
  typeUrl: "/kujira.oracle.QueryMissCounterRequest",
  encode(message: QueryMissCounterRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddr !== "") {
      writer.uint32(10).string(message.validatorAddr);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryMissCounterRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMissCounterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryMissCounterRequest>): QueryMissCounterRequest {
    const message = createBaseQueryMissCounterRequest();
    message.validatorAddr = object.validatorAddr ?? "";
    return message;
  },
  fromAmino(object: QueryMissCounterRequestAmino): QueryMissCounterRequest {
    const message = createBaseQueryMissCounterRequest();
    if (object.validator_addr !== undefined && object.validator_addr !== null) {
      message.validatorAddr = object.validator_addr;
    }
    return message;
  },
  toAmino(message: QueryMissCounterRequest, useInterfaces: boolean = false): QueryMissCounterRequestAmino {
    const obj: any = {};
    obj.validator_addr = message.validatorAddr === "" ? undefined : message.validatorAddr;
    return obj;
  },
  fromAminoMsg(object: QueryMissCounterRequestAminoMsg): QueryMissCounterRequest {
    return QueryMissCounterRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryMissCounterRequestProtoMsg, useInterfaces: boolean = false): QueryMissCounterRequest {
    return QueryMissCounterRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryMissCounterRequest): Uint8Array {
    return QueryMissCounterRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryMissCounterRequest): QueryMissCounterRequestProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryMissCounterRequest",
      value: QueryMissCounterRequest.encode(message).finish()
    };
  }
};
function createBaseQueryMissCounterResponse(): QueryMissCounterResponse {
  return {
    missCounter: BigInt(0)
  };
}
export const QueryMissCounterResponse = {
  typeUrl: "/kujira.oracle.QueryMissCounterResponse",
  encode(message: QueryMissCounterResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.missCounter !== BigInt(0)) {
      writer.uint32(8).uint64(message.missCounter);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryMissCounterResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryMissCounterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.missCounter = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryMissCounterResponse>): QueryMissCounterResponse {
    const message = createBaseQueryMissCounterResponse();
    message.missCounter = object.missCounter !== undefined && object.missCounter !== null ? BigInt(object.missCounter.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryMissCounterResponseAmino): QueryMissCounterResponse {
    const message = createBaseQueryMissCounterResponse();
    if (object.miss_counter !== undefined && object.miss_counter !== null) {
      message.missCounter = BigInt(object.miss_counter);
    }
    return message;
  },
  toAmino(message: QueryMissCounterResponse, useInterfaces: boolean = false): QueryMissCounterResponseAmino {
    const obj: any = {};
    obj.miss_counter = message.missCounter !== BigInt(0) ? message.missCounter.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryMissCounterResponseAminoMsg): QueryMissCounterResponse {
    return QueryMissCounterResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryMissCounterResponseProtoMsg, useInterfaces: boolean = false): QueryMissCounterResponse {
    return QueryMissCounterResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryMissCounterResponse): Uint8Array {
    return QueryMissCounterResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryMissCounterResponse): QueryMissCounterResponseProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryMissCounterResponse",
      value: QueryMissCounterResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAggregatePrevoteRequest(): QueryAggregatePrevoteRequest {
  return {
    validatorAddr: ""
  };
}
export const QueryAggregatePrevoteRequest = {
  typeUrl: "/kujira.oracle.QueryAggregatePrevoteRequest",
  encode(message: QueryAggregatePrevoteRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddr !== "") {
      writer.uint32(10).string(message.validatorAddr);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAggregatePrevoteRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAggregatePrevoteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAggregatePrevoteRequest>): QueryAggregatePrevoteRequest {
    const message = createBaseQueryAggregatePrevoteRequest();
    message.validatorAddr = object.validatorAddr ?? "";
    return message;
  },
  fromAmino(object: QueryAggregatePrevoteRequestAmino): QueryAggregatePrevoteRequest {
    const message = createBaseQueryAggregatePrevoteRequest();
    if (object.validator_addr !== undefined && object.validator_addr !== null) {
      message.validatorAddr = object.validator_addr;
    }
    return message;
  },
  toAmino(message: QueryAggregatePrevoteRequest, useInterfaces: boolean = false): QueryAggregatePrevoteRequestAmino {
    const obj: any = {};
    obj.validator_addr = message.validatorAddr === "" ? undefined : message.validatorAddr;
    return obj;
  },
  fromAminoMsg(object: QueryAggregatePrevoteRequestAminoMsg): QueryAggregatePrevoteRequest {
    return QueryAggregatePrevoteRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAggregatePrevoteRequestProtoMsg, useInterfaces: boolean = false): QueryAggregatePrevoteRequest {
    return QueryAggregatePrevoteRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAggregatePrevoteRequest): Uint8Array {
    return QueryAggregatePrevoteRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAggregatePrevoteRequest): QueryAggregatePrevoteRequestProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryAggregatePrevoteRequest",
      value: QueryAggregatePrevoteRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAggregatePrevoteResponse(): QueryAggregatePrevoteResponse {
  return {
    aggregatePrevote: AggregateExchangeRatePrevote.fromPartial({})
  };
}
export const QueryAggregatePrevoteResponse = {
  typeUrl: "/kujira.oracle.QueryAggregatePrevoteResponse",
  encode(message: QueryAggregatePrevoteResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.aggregatePrevote !== undefined) {
      AggregateExchangeRatePrevote.encode(message.aggregatePrevote, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAggregatePrevoteResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAggregatePrevoteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.aggregatePrevote = AggregateExchangeRatePrevote.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAggregatePrevoteResponse>): QueryAggregatePrevoteResponse {
    const message = createBaseQueryAggregatePrevoteResponse();
    message.aggregatePrevote = object.aggregatePrevote !== undefined && object.aggregatePrevote !== null ? AggregateExchangeRatePrevote.fromPartial(object.aggregatePrevote) : undefined;
    return message;
  },
  fromAmino(object: QueryAggregatePrevoteResponseAmino): QueryAggregatePrevoteResponse {
    const message = createBaseQueryAggregatePrevoteResponse();
    if (object.aggregate_prevote !== undefined && object.aggregate_prevote !== null) {
      message.aggregatePrevote = AggregateExchangeRatePrevote.fromAmino(object.aggregate_prevote);
    }
    return message;
  },
  toAmino(message: QueryAggregatePrevoteResponse, useInterfaces: boolean = false): QueryAggregatePrevoteResponseAmino {
    const obj: any = {};
    obj.aggregate_prevote = message.aggregatePrevote ? AggregateExchangeRatePrevote.toAmino(message.aggregatePrevote, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAggregatePrevoteResponseAminoMsg): QueryAggregatePrevoteResponse {
    return QueryAggregatePrevoteResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAggregatePrevoteResponseProtoMsg, useInterfaces: boolean = false): QueryAggregatePrevoteResponse {
    return QueryAggregatePrevoteResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAggregatePrevoteResponse): Uint8Array {
    return QueryAggregatePrevoteResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAggregatePrevoteResponse): QueryAggregatePrevoteResponseProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryAggregatePrevoteResponse",
      value: QueryAggregatePrevoteResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAggregatePrevotesRequest(): QueryAggregatePrevotesRequest {
  return {};
}
export const QueryAggregatePrevotesRequest = {
  typeUrl: "/kujira.oracle.QueryAggregatePrevotesRequest",
  encode(_: QueryAggregatePrevotesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAggregatePrevotesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAggregatePrevotesRequest();
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
  fromPartial(_: Partial<QueryAggregatePrevotesRequest>): QueryAggregatePrevotesRequest {
    const message = createBaseQueryAggregatePrevotesRequest();
    return message;
  },
  fromAmino(_: QueryAggregatePrevotesRequestAmino): QueryAggregatePrevotesRequest {
    const message = createBaseQueryAggregatePrevotesRequest();
    return message;
  },
  toAmino(_: QueryAggregatePrevotesRequest, useInterfaces: boolean = false): QueryAggregatePrevotesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryAggregatePrevotesRequestAminoMsg): QueryAggregatePrevotesRequest {
    return QueryAggregatePrevotesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAggregatePrevotesRequestProtoMsg, useInterfaces: boolean = false): QueryAggregatePrevotesRequest {
    return QueryAggregatePrevotesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAggregatePrevotesRequest): Uint8Array {
    return QueryAggregatePrevotesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAggregatePrevotesRequest): QueryAggregatePrevotesRequestProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryAggregatePrevotesRequest",
      value: QueryAggregatePrevotesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAggregatePrevotesResponse(): QueryAggregatePrevotesResponse {
  return {
    aggregatePrevotes: []
  };
}
export const QueryAggregatePrevotesResponse = {
  typeUrl: "/kujira.oracle.QueryAggregatePrevotesResponse",
  encode(message: QueryAggregatePrevotesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.aggregatePrevotes) {
      AggregateExchangeRatePrevote.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAggregatePrevotesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAggregatePrevotesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.aggregatePrevotes.push(AggregateExchangeRatePrevote.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAggregatePrevotesResponse>): QueryAggregatePrevotesResponse {
    const message = createBaseQueryAggregatePrevotesResponse();
    message.aggregatePrevotes = object.aggregatePrevotes?.map(e => AggregateExchangeRatePrevote.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAggregatePrevotesResponseAmino): QueryAggregatePrevotesResponse {
    const message = createBaseQueryAggregatePrevotesResponse();
    message.aggregatePrevotes = object.aggregate_prevotes?.map(e => AggregateExchangeRatePrevote.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAggregatePrevotesResponse, useInterfaces: boolean = false): QueryAggregatePrevotesResponseAmino {
    const obj: any = {};
    if (message.aggregatePrevotes) {
      obj.aggregate_prevotes = message.aggregatePrevotes.map(e => e ? AggregateExchangeRatePrevote.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.aggregate_prevotes = message.aggregatePrevotes;
    }
    return obj;
  },
  fromAminoMsg(object: QueryAggregatePrevotesResponseAminoMsg): QueryAggregatePrevotesResponse {
    return QueryAggregatePrevotesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAggregatePrevotesResponseProtoMsg, useInterfaces: boolean = false): QueryAggregatePrevotesResponse {
    return QueryAggregatePrevotesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAggregatePrevotesResponse): Uint8Array {
    return QueryAggregatePrevotesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAggregatePrevotesResponse): QueryAggregatePrevotesResponseProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryAggregatePrevotesResponse",
      value: QueryAggregatePrevotesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAggregateVoteRequest(): QueryAggregateVoteRequest {
  return {
    validatorAddr: ""
  };
}
export const QueryAggregateVoteRequest = {
  typeUrl: "/kujira.oracle.QueryAggregateVoteRequest",
  encode(message: QueryAggregateVoteRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddr !== "") {
      writer.uint32(10).string(message.validatorAddr);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAggregateVoteRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAggregateVoteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAggregateVoteRequest>): QueryAggregateVoteRequest {
    const message = createBaseQueryAggregateVoteRequest();
    message.validatorAddr = object.validatorAddr ?? "";
    return message;
  },
  fromAmino(object: QueryAggregateVoteRequestAmino): QueryAggregateVoteRequest {
    const message = createBaseQueryAggregateVoteRequest();
    if (object.validator_addr !== undefined && object.validator_addr !== null) {
      message.validatorAddr = object.validator_addr;
    }
    return message;
  },
  toAmino(message: QueryAggregateVoteRequest, useInterfaces: boolean = false): QueryAggregateVoteRequestAmino {
    const obj: any = {};
    obj.validator_addr = message.validatorAddr === "" ? undefined : message.validatorAddr;
    return obj;
  },
  fromAminoMsg(object: QueryAggregateVoteRequestAminoMsg): QueryAggregateVoteRequest {
    return QueryAggregateVoteRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAggregateVoteRequestProtoMsg, useInterfaces: boolean = false): QueryAggregateVoteRequest {
    return QueryAggregateVoteRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAggregateVoteRequest): Uint8Array {
    return QueryAggregateVoteRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAggregateVoteRequest): QueryAggregateVoteRequestProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryAggregateVoteRequest",
      value: QueryAggregateVoteRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAggregateVoteResponse(): QueryAggregateVoteResponse {
  return {
    aggregateVote: AggregateExchangeRateVote.fromPartial({})
  };
}
export const QueryAggregateVoteResponse = {
  typeUrl: "/kujira.oracle.QueryAggregateVoteResponse",
  encode(message: QueryAggregateVoteResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.aggregateVote !== undefined) {
      AggregateExchangeRateVote.encode(message.aggregateVote, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAggregateVoteResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAggregateVoteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.aggregateVote = AggregateExchangeRateVote.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAggregateVoteResponse>): QueryAggregateVoteResponse {
    const message = createBaseQueryAggregateVoteResponse();
    message.aggregateVote = object.aggregateVote !== undefined && object.aggregateVote !== null ? AggregateExchangeRateVote.fromPartial(object.aggregateVote) : undefined;
    return message;
  },
  fromAmino(object: QueryAggregateVoteResponseAmino): QueryAggregateVoteResponse {
    const message = createBaseQueryAggregateVoteResponse();
    if (object.aggregate_vote !== undefined && object.aggregate_vote !== null) {
      message.aggregateVote = AggregateExchangeRateVote.fromAmino(object.aggregate_vote);
    }
    return message;
  },
  toAmino(message: QueryAggregateVoteResponse, useInterfaces: boolean = false): QueryAggregateVoteResponseAmino {
    const obj: any = {};
    obj.aggregate_vote = message.aggregateVote ? AggregateExchangeRateVote.toAmino(message.aggregateVote, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAggregateVoteResponseAminoMsg): QueryAggregateVoteResponse {
    return QueryAggregateVoteResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAggregateVoteResponseProtoMsg, useInterfaces: boolean = false): QueryAggregateVoteResponse {
    return QueryAggregateVoteResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAggregateVoteResponse): Uint8Array {
    return QueryAggregateVoteResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAggregateVoteResponse): QueryAggregateVoteResponseProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryAggregateVoteResponse",
      value: QueryAggregateVoteResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAggregateVotesRequest(): QueryAggregateVotesRequest {
  return {};
}
export const QueryAggregateVotesRequest = {
  typeUrl: "/kujira.oracle.QueryAggregateVotesRequest",
  encode(_: QueryAggregateVotesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAggregateVotesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAggregateVotesRequest();
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
  fromPartial(_: Partial<QueryAggregateVotesRequest>): QueryAggregateVotesRequest {
    const message = createBaseQueryAggregateVotesRequest();
    return message;
  },
  fromAmino(_: QueryAggregateVotesRequestAmino): QueryAggregateVotesRequest {
    const message = createBaseQueryAggregateVotesRequest();
    return message;
  },
  toAmino(_: QueryAggregateVotesRequest, useInterfaces: boolean = false): QueryAggregateVotesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryAggregateVotesRequestAminoMsg): QueryAggregateVotesRequest {
    return QueryAggregateVotesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAggregateVotesRequestProtoMsg, useInterfaces: boolean = false): QueryAggregateVotesRequest {
    return QueryAggregateVotesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAggregateVotesRequest): Uint8Array {
    return QueryAggregateVotesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAggregateVotesRequest): QueryAggregateVotesRequestProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryAggregateVotesRequest",
      value: QueryAggregateVotesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAggregateVotesResponse(): QueryAggregateVotesResponse {
  return {
    aggregateVotes: []
  };
}
export const QueryAggregateVotesResponse = {
  typeUrl: "/kujira.oracle.QueryAggregateVotesResponse",
  encode(message: QueryAggregateVotesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.aggregateVotes) {
      AggregateExchangeRateVote.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAggregateVotesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAggregateVotesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.aggregateVotes.push(AggregateExchangeRateVote.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAggregateVotesResponse>): QueryAggregateVotesResponse {
    const message = createBaseQueryAggregateVotesResponse();
    message.aggregateVotes = object.aggregateVotes?.map(e => AggregateExchangeRateVote.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAggregateVotesResponseAmino): QueryAggregateVotesResponse {
    const message = createBaseQueryAggregateVotesResponse();
    message.aggregateVotes = object.aggregate_votes?.map(e => AggregateExchangeRateVote.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAggregateVotesResponse, useInterfaces: boolean = false): QueryAggregateVotesResponseAmino {
    const obj: any = {};
    if (message.aggregateVotes) {
      obj.aggregate_votes = message.aggregateVotes.map(e => e ? AggregateExchangeRateVote.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.aggregate_votes = message.aggregateVotes;
    }
    return obj;
  },
  fromAminoMsg(object: QueryAggregateVotesResponseAminoMsg): QueryAggregateVotesResponse {
    return QueryAggregateVotesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAggregateVotesResponseProtoMsg, useInterfaces: boolean = false): QueryAggregateVotesResponse {
    return QueryAggregateVotesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAggregateVotesResponse): Uint8Array {
    return QueryAggregateVotesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAggregateVotesResponse): QueryAggregateVotesResponseProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryAggregateVotesResponse",
      value: QueryAggregateVotesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/kujira.oracle.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg, useInterfaces: boolean = false): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/kujira.oracle.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
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
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg, useInterfaces: boolean = false): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/kujira.oracle.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};