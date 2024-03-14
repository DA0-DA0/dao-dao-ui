import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryDenomTraceRequest, QueryDenomTraceResponse, QueryDenomTracesRequest, QueryDenomTracesResponse, QueryParamsRequest, QueryParamsResponse, QueryDenomHashRequest, QueryDenomHashResponse } from "../../../ibc/applications/transfer/v1/query";
/** Query provides defines the gRPC querier service. */
export interface Query {
  /** DenomTrace queries a denomination trace information. */
  denomTrace(request: QueryDenomTraceRequest): Promise<QueryDenomTraceResponse>;
  /** DenomTraces queries all denomination traces. */
  denomTraces(request?: QueryDenomTracesRequest): Promise<QueryDenomTracesResponse>;
  /** Params queries all parameters of the ibc-transfer module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** DenomHash queries a denomination hash information. */
  denomHash(request: QueryDenomHashRequest): Promise<QueryDenomHashResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.denomTrace = this.denomTrace.bind(this);
    this.denomTraces = this.denomTraces.bind(this);
    this.params = this.params.bind(this);
    this.denomHash = this.denomHash.bind(this);
  }
  denomTrace(request: QueryDenomTraceRequest, useInterfaces: boolean = true): Promise<QueryDenomTraceResponse> {
    const data = QueryDenomTraceRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.transfer.Query", "DenomTrace", data);
    return promise.then(data => QueryDenomTraceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denomTraces(request: QueryDenomTracesRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryDenomTracesResponse> {
    const data = QueryDenomTracesRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.transfer.Query", "DenomTraces", data);
    return promise.then(data => QueryDenomTracesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.transfer.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denomHash(request: QueryDenomHashRequest, useInterfaces: boolean = true): Promise<QueryDenomHashResponse> {
    const data = QueryDenomHashRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.transfer.Query", "DenomHash", data);
    return promise.then(data => QueryDenomHashResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    denomTrace(request: QueryDenomTraceRequest, useInterfaces: boolean = true): Promise<QueryDenomTraceResponse> {
      return queryService.denomTrace(request, useInterfaces);
    },
    denomTraces(request?: QueryDenomTracesRequest, useInterfaces: boolean = true): Promise<QueryDenomTracesResponse> {
      return queryService.denomTraces(request, useInterfaces);
    },
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    denomHash(request: QueryDenomHashRequest, useInterfaces: boolean = true): Promise<QueryDenomHashResponse> {
      return queryService.denomHash(request, useInterfaces);
    }
  };
};