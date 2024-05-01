import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetHostChainRequest, QueryGetHostChainResponse, QueryAllHostChainsRequest, QueryAllHostChainsResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Chain items. */
  hostChain(request: QueryGetHostChainRequest): Promise<QueryGetHostChainResponse>;
  allHostChains(request?: QueryAllHostChainsRequest): Promise<QueryAllHostChainsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.hostChain = this.hostChain.bind(this);
    this.allHostChains = this.allHostChains.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.ratesync.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hostChain(request: QueryGetHostChainRequest, useInterfaces: boolean = true): Promise<QueryGetHostChainResponse> {
    const data = QueryGetHostChainRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.ratesync.v1beta1.Query", "HostChain", data);
    return promise.then(data => QueryGetHostChainResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allHostChains(request: QueryAllHostChainsRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllHostChainsResponse> {
    const data = QueryAllHostChainsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.ratesync.v1beta1.Query", "AllHostChains", data);
    return promise.then(data => QueryAllHostChainsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    hostChain(request: QueryGetHostChainRequest, useInterfaces: boolean = true): Promise<QueryGetHostChainResponse> {
      return queryService.hostChain(request, useInterfaces);
    },
    allHostChains(request?: QueryAllHostChainsRequest, useInterfaces: boolean = true): Promise<QueryAllHostChainsResponse> {
      return queryService.allHostChains(request, useInterfaces);
    }
  };
};