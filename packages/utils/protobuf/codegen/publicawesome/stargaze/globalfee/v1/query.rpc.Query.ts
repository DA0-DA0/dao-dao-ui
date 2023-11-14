import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryCodeAuthorizationRequest, QueryCodeAuthorizationResponse, QueryContractAuthorizationRequest, QueryContractAuthorizationResponse, QueryParamsRequest, QueryParamsResponse, QueryAuthorizationsRequest, QueryAuthorizationsResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  codeAuthorization(request: QueryCodeAuthorizationRequest): Promise<QueryCodeAuthorizationResponse>;
  contractAuthorization(request: QueryContractAuthorizationRequest): Promise<QueryContractAuthorizationResponse>;
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  authorizations(request?: QueryAuthorizationsRequest): Promise<QueryAuthorizationsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.codeAuthorization = this.codeAuthorization.bind(this);
    this.contractAuthorization = this.contractAuthorization.bind(this);
    this.params = this.params.bind(this);
    this.authorizations = this.authorizations.bind(this);
  }
  codeAuthorization(request: QueryCodeAuthorizationRequest, useInterfaces: boolean = true): Promise<QueryCodeAuthorizationResponse> {
    const data = QueryCodeAuthorizationRequest.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.globalfee.v1.Query", "CodeAuthorization", data);
    return promise.then(data => QueryCodeAuthorizationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  contractAuthorization(request: QueryContractAuthorizationRequest, useInterfaces: boolean = true): Promise<QueryContractAuthorizationResponse> {
    const data = QueryContractAuthorizationRequest.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.globalfee.v1.Query", "ContractAuthorization", data);
    return promise.then(data => QueryContractAuthorizationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.globalfee.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  authorizations(request: QueryAuthorizationsRequest = {}, useInterfaces: boolean = true): Promise<QueryAuthorizationsResponse> {
    const data = QueryAuthorizationsRequest.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.globalfee.v1.Query", "Authorizations", data);
    return promise.then(data => QueryAuthorizationsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    codeAuthorization(request: QueryCodeAuthorizationRequest, useInterfaces: boolean = true): Promise<QueryCodeAuthorizationResponse> {
      return queryService.codeAuthorization(request, useInterfaces);
    },
    contractAuthorization(request: QueryContractAuthorizationRequest, useInterfaces: boolean = true): Promise<QueryContractAuthorizationResponse> {
      return queryService.contractAuthorization(request, useInterfaces);
    },
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    authorizations(request?: QueryAuthorizationsRequest, useInterfaces: boolean = true): Promise<QueryAuthorizationsResponse> {
      return queryService.authorizations(request, useInterfaces);
    }
  };
};