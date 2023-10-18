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
  codeAuthorization(request: QueryCodeAuthorizationRequest): Promise<QueryCodeAuthorizationResponse> {
    const data = QueryCodeAuthorizationRequest.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.globalfee.v1.Query", "CodeAuthorization", data);
    return promise.then(data => QueryCodeAuthorizationResponse.decode(new BinaryReader(data)));
  }
  contractAuthorization(request: QueryContractAuthorizationRequest): Promise<QueryContractAuthorizationResponse> {
    const data = QueryContractAuthorizationRequest.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.globalfee.v1.Query", "ContractAuthorization", data);
    return promise.then(data => QueryContractAuthorizationResponse.decode(new BinaryReader(data)));
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.globalfee.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  authorizations(request: QueryAuthorizationsRequest = {}): Promise<QueryAuthorizationsResponse> {
    const data = QueryAuthorizationsRequest.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.globalfee.v1.Query", "Authorizations", data);
    return promise.then(data => QueryAuthorizationsResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    codeAuthorization(request: QueryCodeAuthorizationRequest): Promise<QueryCodeAuthorizationResponse> {
      return queryService.codeAuthorization(request);
    },
    contractAuthorization(request: QueryContractAuthorizationRequest): Promise<QueryContractAuthorizationResponse> {
      return queryService.contractAuthorization(request);
    },
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    authorizations(request?: QueryAuthorizationsRequest): Promise<QueryAuthorizationsResponse> {
      return queryService.authorizations(request);
    }
  };
};