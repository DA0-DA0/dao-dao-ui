import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryRegisteredQueriesRequest, QueryRegisteredQueriesResponse, QueryRegisteredQueryRequest, QueryRegisteredQueryResponse, QueryRegisteredQueryResultRequest, QueryRegisteredQueryResultResponse, QueryLastRemoteHeight, QueryLastRemoteHeightResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  registeredQueries(request: QueryRegisteredQueriesRequest): Promise<QueryRegisteredQueriesResponse>;
  registeredQuery(request: QueryRegisteredQueryRequest): Promise<QueryRegisteredQueryResponse>;
  queryResult(request: QueryRegisteredQueryResultRequest): Promise<QueryRegisteredQueryResultResponse>;
  lastRemoteHeight(request: QueryLastRemoteHeight): Promise<QueryLastRemoteHeightResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.registeredQueries = this.registeredQueries.bind(this);
    this.registeredQuery = this.registeredQuery.bind(this);
    this.queryResult = this.queryResult.bind(this);
    this.lastRemoteHeight = this.lastRemoteHeight.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.interchainqueries.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  registeredQueries(request: QueryRegisteredQueriesRequest, useInterfaces: boolean = true): Promise<QueryRegisteredQueriesResponse> {
    const data = QueryRegisteredQueriesRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.interchainqueries.Query", "RegisteredQueries", data);
    return promise.then(data => QueryRegisteredQueriesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  registeredQuery(request: QueryRegisteredQueryRequest, useInterfaces: boolean = true): Promise<QueryRegisteredQueryResponse> {
    const data = QueryRegisteredQueryRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.interchainqueries.Query", "RegisteredQuery", data);
    return promise.then(data => QueryRegisteredQueryResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  queryResult(request: QueryRegisteredQueryResultRequest, useInterfaces: boolean = true): Promise<QueryRegisteredQueryResultResponse> {
    const data = QueryRegisteredQueryResultRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.interchainqueries.Query", "QueryResult", data);
    return promise.then(data => QueryRegisteredQueryResultResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  lastRemoteHeight(request: QueryLastRemoteHeight, useInterfaces: boolean = true): Promise<QueryLastRemoteHeightResponse> {
    const data = QueryLastRemoteHeight.encode(request).finish();
    const promise = this.rpc.request("neutron.interchainqueries.Query", "LastRemoteHeight", data);
    return promise.then(data => QueryLastRemoteHeightResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    registeredQueries(request: QueryRegisteredQueriesRequest, useInterfaces: boolean = true): Promise<QueryRegisteredQueriesResponse> {
      return queryService.registeredQueries(request, useInterfaces);
    },
    registeredQuery(request: QueryRegisteredQueryRequest, useInterfaces: boolean = true): Promise<QueryRegisteredQueryResponse> {
      return queryService.registeredQuery(request, useInterfaces);
    },
    queryResult(request: QueryRegisteredQueryResultRequest, useInterfaces: boolean = true): Promise<QueryRegisteredQueryResultResponse> {
      return queryService.queryResult(request, useInterfaces);
    },
    lastRemoteHeight(request: QueryLastRemoteHeight, useInterfaces: boolean = true): Promise<QueryLastRemoteHeightResponse> {
      return queryService.lastRemoteHeight(request, useInterfaces);
    }
  };
};