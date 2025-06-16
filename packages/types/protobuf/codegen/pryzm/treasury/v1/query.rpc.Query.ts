import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetActionRequest, QueryGetActionResponse, QueryGetFlowTradeRequest, QueryGetFlowTradeResponse, QueryAllFlowTradeRequest, QueryAllFlowTradeResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Action by index. */
  action(request?: QueryGetActionRequest): Promise<QueryGetActionResponse>;
  /** Queries a FlowTrade by index. */
  flowTrade(request: QueryGetFlowTradeRequest): Promise<QueryGetFlowTradeResponse>;
  /** Queries a list of FlowTrade items. */
  flowTradeAll(request?: QueryAllFlowTradeRequest): Promise<QueryAllFlowTradeResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.action = this.action.bind(this);
    this.flowTrade = this.flowTrade.bind(this);
    this.flowTradeAll = this.flowTradeAll.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.treasury.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  action(request: QueryGetActionRequest = {}, useInterfaces: boolean = true): Promise<QueryGetActionResponse> {
    const data = QueryGetActionRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.treasury.v1.Query", "Action", data);
    return promise.then(data => QueryGetActionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  flowTrade(request: QueryGetFlowTradeRequest, useInterfaces: boolean = true): Promise<QueryGetFlowTradeResponse> {
    const data = QueryGetFlowTradeRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.treasury.v1.Query", "FlowTrade", data);
    return promise.then(data => QueryGetFlowTradeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  flowTradeAll(request: QueryAllFlowTradeRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllFlowTradeResponse> {
    const data = QueryAllFlowTradeRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.treasury.v1.Query", "FlowTradeAll", data);
    return promise.then(data => QueryAllFlowTradeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    action(request?: QueryGetActionRequest, useInterfaces: boolean = true): Promise<QueryGetActionResponse> {
      return queryService.action(request, useInterfaces);
    },
    flowTrade(request: QueryGetFlowTradeRequest, useInterfaces: boolean = true): Promise<QueryGetFlowTradeResponse> {
      return queryService.flowTrade(request, useInterfaces);
    },
    flowTradeAll(request?: QueryAllFlowTradeRequest, useInterfaces: boolean = true): Promise<QueryAllFlowTradeResponse> {
      return queryService.flowTradeAll(request, useInterfaces);
    }
  };
};