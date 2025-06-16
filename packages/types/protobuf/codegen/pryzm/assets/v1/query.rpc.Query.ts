import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetRefractableAssetRequest, QueryGetRefractableAssetResponse, QueryAllRefractableAssetRequest, QueryAllRefractableAssetResponse, QueryGetMaturityLevelRequest, QueryGetMaturityLevelResponse, QueryAllMaturityLevelRequest, QueryAllMaturityLevelResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a RefractableAsset by index. */
  refractableAsset(request: QueryGetRefractableAssetRequest): Promise<QueryGetRefractableAssetResponse>;
  /** Queries a list of RefractableAsset items. */
  refractableAssetAll(request: QueryAllRefractableAssetRequest): Promise<QueryAllRefractableAssetResponse>;
  /** Queries a MaturityLevel by index. */
  maturityLevel(request: QueryGetMaturityLevelRequest): Promise<QueryGetMaturityLevelResponse>;
  /** Queries a list of MaturityLevel items. */
  maturityLevelAll(request: QueryAllMaturityLevelRequest): Promise<QueryAllMaturityLevelResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.refractableAsset = this.refractableAsset.bind(this);
    this.refractableAssetAll = this.refractableAssetAll.bind(this);
    this.maturityLevel = this.maturityLevel.bind(this);
    this.maturityLevelAll = this.maturityLevelAll.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.assets.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  refractableAsset(request: QueryGetRefractableAssetRequest, useInterfaces: boolean = true): Promise<QueryGetRefractableAssetResponse> {
    const data = QueryGetRefractableAssetRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.assets.v1.Query", "RefractableAsset", data);
    return promise.then(data => QueryGetRefractableAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  refractableAssetAll(request: QueryAllRefractableAssetRequest, useInterfaces: boolean = true): Promise<QueryAllRefractableAssetResponse> {
    const data = QueryAllRefractableAssetRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.assets.v1.Query", "RefractableAssetAll", data);
    return promise.then(data => QueryAllRefractableAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  maturityLevel(request: QueryGetMaturityLevelRequest, useInterfaces: boolean = true): Promise<QueryGetMaturityLevelResponse> {
    const data = QueryGetMaturityLevelRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.assets.v1.Query", "MaturityLevel", data);
    return promise.then(data => QueryGetMaturityLevelResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  maturityLevelAll(request: QueryAllMaturityLevelRequest, useInterfaces: boolean = true): Promise<QueryAllMaturityLevelResponse> {
    const data = QueryAllMaturityLevelRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.assets.v1.Query", "MaturityLevelAll", data);
    return promise.then(data => QueryAllMaturityLevelResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    refractableAsset(request: QueryGetRefractableAssetRequest, useInterfaces: boolean = true): Promise<QueryGetRefractableAssetResponse> {
      return queryService.refractableAsset(request, useInterfaces);
    },
    refractableAssetAll(request: QueryAllRefractableAssetRequest, useInterfaces: boolean = true): Promise<QueryAllRefractableAssetResponse> {
      return queryService.refractableAssetAll(request, useInterfaces);
    },
    maturityLevel(request: QueryGetMaturityLevelRequest, useInterfaces: boolean = true): Promise<QueryGetMaturityLevelResponse> {
      return queryService.maturityLevel(request, useInterfaces);
    },
    maturityLevelAll(request: QueryAllMaturityLevelRequest, useInterfaces: boolean = true): Promise<QueryAllMaturityLevelResponse> {
      return queryService.maturityLevelAll(request, useInterfaces);
    }
  };
};