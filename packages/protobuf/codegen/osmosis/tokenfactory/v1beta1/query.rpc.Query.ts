import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryDenomAuthorityMetadataRequest, QueryDenomAuthorityMetadataResponse, QueryDenomsFromCreatorRequest, QueryDenomsFromCreatorResponse, QueryBeforeSendHookAddressRequest, QueryBeforeSendHookAddressResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /**
   * Params defines a gRPC query method that returns the tokenfactory module's
   * parameters.
   */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /**
   * DenomAuthorityMetadata defines a gRPC query method for fetching
   * DenomAuthorityMetadata for a particular denom.
   */
  denomAuthorityMetadata(request: QueryDenomAuthorityMetadataRequest): Promise<QueryDenomAuthorityMetadataResponse>;
  /**
   * DenomsFromCreator defines a gRPC query method for fetching all
   * denominations created by a specific admin/creator.
   */
  denomsFromCreator(request: QueryDenomsFromCreatorRequest): Promise<QueryDenomsFromCreatorResponse>;
  /**
   * BeforeSendHookAddress defines a gRPC query method for
   * getting the address registered for the before send hook.
   */
  beforeSendHookAddress(request: QueryBeforeSendHookAddressRequest): Promise<QueryBeforeSendHookAddressResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.denomAuthorityMetadata = this.denomAuthorityMetadata.bind(this);
    this.denomsFromCreator = this.denomsFromCreator.bind(this);
    this.beforeSendHookAddress = this.beforeSendHookAddress.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.tokenfactory.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denomAuthorityMetadata(request: QueryDenomAuthorityMetadataRequest, useInterfaces: boolean = true): Promise<QueryDenomAuthorityMetadataResponse> {
    const data = QueryDenomAuthorityMetadataRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.tokenfactory.v1beta1.Query", "DenomAuthorityMetadata", data);
    return promise.then(data => QueryDenomAuthorityMetadataResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denomsFromCreator(request: QueryDenomsFromCreatorRequest, useInterfaces: boolean = true): Promise<QueryDenomsFromCreatorResponse> {
    const data = QueryDenomsFromCreatorRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.tokenfactory.v1beta1.Query", "DenomsFromCreator", data);
    return promise.then(data => QueryDenomsFromCreatorResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  beforeSendHookAddress(request: QueryBeforeSendHookAddressRequest, useInterfaces: boolean = true): Promise<QueryBeforeSendHookAddressResponse> {
    const data = QueryBeforeSendHookAddressRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.tokenfactory.v1beta1.Query", "BeforeSendHookAddress", data);
    return promise.then(data => QueryBeforeSendHookAddressResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    denomAuthorityMetadata(request: QueryDenomAuthorityMetadataRequest, useInterfaces: boolean = true): Promise<QueryDenomAuthorityMetadataResponse> {
      return queryService.denomAuthorityMetadata(request, useInterfaces);
    },
    denomsFromCreator(request: QueryDenomsFromCreatorRequest, useInterfaces: boolean = true): Promise<QueryDenomsFromCreatorResponse> {
      return queryService.denomsFromCreator(request, useInterfaces);
    },
    beforeSendHookAddress(request: QueryBeforeSendHookAddressRequest, useInterfaces: boolean = true): Promise<QueryBeforeSendHookAddressResponse> {
      return queryService.beforeSendHookAddress(request, useInterfaces);
    }
  };
};