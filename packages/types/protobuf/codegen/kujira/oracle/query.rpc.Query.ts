import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryExchangeRateRequest, QueryExchangeRateResponse, QueryExchangeRatesRequest, QueryExchangeRatesResponse, QueryActivesRequest, QueryActivesResponse, QueryFeederDelegationRequest, QueryFeederDelegationResponse, QueryMissCounterRequest, QueryMissCounterResponse, QueryAggregatePrevoteRequest, QueryAggregatePrevoteResponse, QueryAggregatePrevotesRequest, QueryAggregatePrevotesResponse, QueryAggregateVoteRequest, QueryAggregateVoteResponse, QueryAggregateVotesRequest, QueryAggregateVotesResponse, QueryParamsRequest, QueryParamsResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** ExchangeRate returns exchange rate of a denom */
  exchangeRate(request: QueryExchangeRateRequest): Promise<QueryExchangeRateResponse>;
  /** ExchangeRates returns exchange rates of all denoms */
  exchangeRates(request?: QueryExchangeRatesRequest): Promise<QueryExchangeRatesResponse>;
  /** Actives returns all active denoms */
  actives(request?: QueryActivesRequest): Promise<QueryActivesResponse>;
  /** FeederDelegation returns feeder delegation of a validator */
  feederDelegation(request: QueryFeederDelegationRequest): Promise<QueryFeederDelegationResponse>;
  /** MissCounter returns oracle miss counter of a validator */
  missCounter(request: QueryMissCounterRequest): Promise<QueryMissCounterResponse>;
  /** AggregatePrevote returns an aggregate prevote of a validator */
  aggregatePrevote(request: QueryAggregatePrevoteRequest): Promise<QueryAggregatePrevoteResponse>;
  /** AggregatePrevotes returns aggregate prevotes of all validators */
  aggregatePrevotes(request?: QueryAggregatePrevotesRequest): Promise<QueryAggregatePrevotesResponse>;
  /** AggregateVote returns an aggregate vote of a validator */
  aggregateVote(request: QueryAggregateVoteRequest): Promise<QueryAggregateVoteResponse>;
  /** AggregateVotes returns aggregate votes of all validators */
  aggregateVotes(request?: QueryAggregateVotesRequest): Promise<QueryAggregateVotesResponse>;
  /** Params queries all parameters. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.exchangeRate = this.exchangeRate.bind(this);
    this.exchangeRates = this.exchangeRates.bind(this);
    this.actives = this.actives.bind(this);
    this.feederDelegation = this.feederDelegation.bind(this);
    this.missCounter = this.missCounter.bind(this);
    this.aggregatePrevote = this.aggregatePrevote.bind(this);
    this.aggregatePrevotes = this.aggregatePrevotes.bind(this);
    this.aggregateVote = this.aggregateVote.bind(this);
    this.aggregateVotes = this.aggregateVotes.bind(this);
    this.params = this.params.bind(this);
  }
  exchangeRate(request: QueryExchangeRateRequest, useInterfaces: boolean = true): Promise<QueryExchangeRateResponse> {
    const data = QueryExchangeRateRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.oracle.Query", "ExchangeRate", data);
    return promise.then(data => QueryExchangeRateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  exchangeRates(request: QueryExchangeRatesRequest = {}, useInterfaces: boolean = true): Promise<QueryExchangeRatesResponse> {
    const data = QueryExchangeRatesRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.oracle.Query", "ExchangeRates", data);
    return promise.then(data => QueryExchangeRatesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  actives(request: QueryActivesRequest = {}, useInterfaces: boolean = true): Promise<QueryActivesResponse> {
    const data = QueryActivesRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.oracle.Query", "Actives", data);
    return promise.then(data => QueryActivesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  feederDelegation(request: QueryFeederDelegationRequest, useInterfaces: boolean = true): Promise<QueryFeederDelegationResponse> {
    const data = QueryFeederDelegationRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.oracle.Query", "FeederDelegation", data);
    return promise.then(data => QueryFeederDelegationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  missCounter(request: QueryMissCounterRequest, useInterfaces: boolean = true): Promise<QueryMissCounterResponse> {
    const data = QueryMissCounterRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.oracle.Query", "MissCounter", data);
    return promise.then(data => QueryMissCounterResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  aggregatePrevote(request: QueryAggregatePrevoteRequest, useInterfaces: boolean = true): Promise<QueryAggregatePrevoteResponse> {
    const data = QueryAggregatePrevoteRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.oracle.Query", "AggregatePrevote", data);
    return promise.then(data => QueryAggregatePrevoteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  aggregatePrevotes(request: QueryAggregatePrevotesRequest = {}, useInterfaces: boolean = true): Promise<QueryAggregatePrevotesResponse> {
    const data = QueryAggregatePrevotesRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.oracle.Query", "AggregatePrevotes", data);
    return promise.then(data => QueryAggregatePrevotesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  aggregateVote(request: QueryAggregateVoteRequest, useInterfaces: boolean = true): Promise<QueryAggregateVoteResponse> {
    const data = QueryAggregateVoteRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.oracle.Query", "AggregateVote", data);
    return promise.then(data => QueryAggregateVoteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  aggregateVotes(request: QueryAggregateVotesRequest = {}, useInterfaces: boolean = true): Promise<QueryAggregateVotesResponse> {
    const data = QueryAggregateVotesRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.oracle.Query", "AggregateVotes", data);
    return promise.then(data => QueryAggregateVotesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.oracle.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    exchangeRate(request: QueryExchangeRateRequest, useInterfaces: boolean = true): Promise<QueryExchangeRateResponse> {
      return queryService.exchangeRate(request, useInterfaces);
    },
    exchangeRates(request?: QueryExchangeRatesRequest, useInterfaces: boolean = true): Promise<QueryExchangeRatesResponse> {
      return queryService.exchangeRates(request, useInterfaces);
    },
    actives(request?: QueryActivesRequest, useInterfaces: boolean = true): Promise<QueryActivesResponse> {
      return queryService.actives(request, useInterfaces);
    },
    feederDelegation(request: QueryFeederDelegationRequest, useInterfaces: boolean = true): Promise<QueryFeederDelegationResponse> {
      return queryService.feederDelegation(request, useInterfaces);
    },
    missCounter(request: QueryMissCounterRequest, useInterfaces: boolean = true): Promise<QueryMissCounterResponse> {
      return queryService.missCounter(request, useInterfaces);
    },
    aggregatePrevote(request: QueryAggregatePrevoteRequest, useInterfaces: boolean = true): Promise<QueryAggregatePrevoteResponse> {
      return queryService.aggregatePrevote(request, useInterfaces);
    },
    aggregatePrevotes(request?: QueryAggregatePrevotesRequest, useInterfaces: boolean = true): Promise<QueryAggregatePrevotesResponse> {
      return queryService.aggregatePrevotes(request, useInterfaces);
    },
    aggregateVote(request: QueryAggregateVoteRequest, useInterfaces: boolean = true): Promise<QueryAggregateVoteResponse> {
      return queryService.aggregateVote(request, useInterfaces);
    },
    aggregateVotes(request?: QueryAggregateVotesRequest, useInterfaces: boolean = true): Promise<QueryAggregateVotesResponse> {
      return queryService.aggregateVotes(request, useInterfaces);
    },
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    }
  };
};