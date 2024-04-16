import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryDenomAuthorityMetadataRequest, QueryDenomAuthorityMetadataResponse, QueryDenomsFromCreatorRequest, QueryDenomsFromCreatorResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params returns the total set of minting parameters. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  denomAuthorityMetadata(request: QueryDenomAuthorityMetadataRequest): Promise<QueryDenomAuthorityMetadataResponse>;
  denomsFromCreator(request: QueryDenomsFromCreatorRequest): Promise<QueryDenomsFromCreatorResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.denomAuthorityMetadata = this.denomAuthorityMetadata.bind(this);
    this.denomsFromCreator = this.denomsFromCreator.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.denom.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denomAuthorityMetadata(request: QueryDenomAuthorityMetadataRequest, useInterfaces: boolean = true): Promise<QueryDenomAuthorityMetadataResponse> {
    const data = QueryDenomAuthorityMetadataRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.denom.Query", "DenomAuthorityMetadata", data);
    return promise.then(data => QueryDenomAuthorityMetadataResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denomsFromCreator(request: QueryDenomsFromCreatorRequest, useInterfaces: boolean = true): Promise<QueryDenomsFromCreatorResponse> {
    const data = QueryDenomsFromCreatorRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.denom.Query", "DenomsFromCreator", data);
    return promise.then(data => QueryDenomsFromCreatorResponse.decode(new BinaryReader(data), undefined, useInterfaces));
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
    }
  };
};