import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryFanTokenRequest, QueryFanTokenResponse, QueryFanTokensRequest, QueryFanTokensResponse, QueryParamsRequest, QueryParamsResponse } from "./query";
/** Query creates service with fantoken as RPC */
export interface Query {
  /** FanToken returns fantoken with fantoken name */
  fanToken(request: QueryFanTokenRequest): Promise<QueryFanTokenResponse>;
  /** FanTokens returns the fantoken list */
  fanTokens(request: QueryFanTokensRequest): Promise<QueryFanTokensResponse>;
  /** Params queries the fantoken parameters */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.fanToken = this.fanToken.bind(this);
    this.fanTokens = this.fanTokens.bind(this);
    this.params = this.params.bind(this);
  }
  fanToken(request: QueryFanTokenRequest, useInterfaces: boolean = true): Promise<QueryFanTokenResponse> {
    const data = QueryFanTokenRequest.encode(request).finish();
    const promise = this.rpc.request("bitsong.fantoken.v1beta1.Query", "FanToken", data);
    return promise.then(data => QueryFanTokenResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  fanTokens(request: QueryFanTokensRequest, useInterfaces: boolean = true): Promise<QueryFanTokensResponse> {
    const data = QueryFanTokensRequest.encode(request).finish();
    const promise = this.rpc.request("bitsong.fantoken.v1beta1.Query", "FanTokens", data);
    return promise.then(data => QueryFanTokensResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("bitsong.fantoken.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    fanToken(request: QueryFanTokenRequest, useInterfaces: boolean = true): Promise<QueryFanTokenResponse> {
      return queryService.fanToken(request, useInterfaces);
    },
    fanTokens(request: QueryFanTokensRequest, useInterfaces: boolean = true): Promise<QueryFanTokensResponse> {
      return queryService.fanTokens(request, useInterfaces);
    },
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    }
  };
};