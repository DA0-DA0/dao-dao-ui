import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryAllowanceRequest, QueryAllowanceResponse, QueryAllowancesRequest, QueryAllowancesResponse, QueryAllowancesByGranterRequest, QueryAllowancesByGranterResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Allowance returns granted allowance to the grantee by the granter. */
  allowance(request: QueryAllowanceRequest): Promise<QueryAllowanceResponse>;
  /** Allowances returns all the grants for the given grantee address. */
  allowances(request: QueryAllowancesRequest): Promise<QueryAllowancesResponse>;
  /** AllowancesByGranter returns all the grants given by an address */
  allowancesByGranter(request: QueryAllowancesByGranterRequest): Promise<QueryAllowancesByGranterResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.allowance = this.allowance.bind(this);
    this.allowances = this.allowances.bind(this);
    this.allowancesByGranter = this.allowancesByGranter.bind(this);
  }
  allowance(request: QueryAllowanceRequest, useInterfaces: boolean = true): Promise<QueryAllowanceResponse> {
    const data = QueryAllowanceRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.feegrant.v1beta1.Query", "Allowance", data);
    return promise.then(data => QueryAllowanceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allowances(request: QueryAllowancesRequest, useInterfaces: boolean = true): Promise<QueryAllowancesResponse> {
    const data = QueryAllowancesRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.feegrant.v1beta1.Query", "Allowances", data);
    return promise.then(data => QueryAllowancesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allowancesByGranter(request: QueryAllowancesByGranterRequest, useInterfaces: boolean = true): Promise<QueryAllowancesByGranterResponse> {
    const data = QueryAllowancesByGranterRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.feegrant.v1beta1.Query", "AllowancesByGranter", data);
    return promise.then(data => QueryAllowancesByGranterResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    allowance(request: QueryAllowanceRequest, useInterfaces: boolean = true): Promise<QueryAllowanceResponse> {
      return queryService.allowance(request, useInterfaces);
    },
    allowances(request: QueryAllowancesRequest, useInterfaces: boolean = true): Promise<QueryAllowancesResponse> {
      return queryService.allowances(request, useInterfaces);
    },
    allowancesByGranter(request: QueryAllowancesByGranterRequest, useInterfaces: boolean = true): Promise<QueryAllowancesByGranterResponse> {
      return queryService.allowancesByGranter(request, useInterfaces);
    }
  };
};