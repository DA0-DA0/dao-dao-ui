import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryGrantsRequest, QueryGrantsResponse, QueryGranterGrantsRequest, QueryGranterGrantsResponse, QueryGranteeGrantsRequest, QueryGranteeGrantsResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Returns list of `Authorization`, granted to the grantee by the granter. */
  grants(request: QueryGrantsRequest): Promise<QueryGrantsResponse>;
  /**
   * GranterGrants returns list of `GrantAuthorization`, granted by granter.
   * 
   * Since: cosmos-sdk 0.46
   */
  granterGrants(request: QueryGranterGrantsRequest): Promise<QueryGranterGrantsResponse>;
  /**
   * GranteeGrants returns a list of `GrantAuthorization` by grantee.
   * 
   * Since: cosmos-sdk 0.46
   */
  granteeGrants(request: QueryGranteeGrantsRequest): Promise<QueryGranteeGrantsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.grants = this.grants.bind(this);
    this.granterGrants = this.granterGrants.bind(this);
    this.granteeGrants = this.granteeGrants.bind(this);
  }
  grants(request: QueryGrantsRequest, useInterfaces: boolean = true): Promise<QueryGrantsResponse> {
    const data = QueryGrantsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.authz.v1beta1.Query", "Grants", data);
    return promise.then(data => QueryGrantsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  granterGrants(request: QueryGranterGrantsRequest, useInterfaces: boolean = true): Promise<QueryGranterGrantsResponse> {
    const data = QueryGranterGrantsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.authz.v1beta1.Query", "GranterGrants", data);
    return promise.then(data => QueryGranterGrantsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  granteeGrants(request: QueryGranteeGrantsRequest, useInterfaces: boolean = true): Promise<QueryGranteeGrantsResponse> {
    const data = QueryGranteeGrantsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.authz.v1beta1.Query", "GranteeGrants", data);
    return promise.then(data => QueryGranteeGrantsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    grants(request: QueryGrantsRequest, useInterfaces: boolean = true): Promise<QueryGrantsResponse> {
      return queryService.grants(request, useInterfaces);
    },
    granterGrants(request: QueryGranterGrantsRequest, useInterfaces: boolean = true): Promise<QueryGranterGrantsResponse> {
      return queryService.granterGrants(request, useInterfaces);
    },
    granteeGrants(request: QueryGranteeGrantsRequest, useInterfaces: boolean = true): Promise<QueryGranteeGrantsResponse> {
      return queryService.granteeGrants(request, useInterfaces);
    }
  };
};