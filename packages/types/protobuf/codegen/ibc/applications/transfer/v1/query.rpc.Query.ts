import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryDenomTraceRequest, QueryDenomTraceResponse, QueryDenomTracesRequest, QueryDenomTracesResponse, QueryParamsRequest, QueryParamsResponse, QueryDenomsRequest, QueryDenomsResponse, QueryDenomRequest, QueryDenomResponse, QueryDenomHashRequest, QueryDenomHashResponse, QueryEscrowAddressRequest, QueryEscrowAddressResponse, QueryTotalEscrowForDenomRequest, QueryTotalEscrowForDenomResponse } from "./query";
/** Query provides defines the gRPC querier service. */
export interface Query {
  /** DenomTrace queries a denomination trace information. */
  denomTrace(request: QueryDenomTraceRequest): Promise<QueryDenomTraceResponse>;
  /** DenomTraces queries all denomination traces. */
  denomTraces(request?: QueryDenomTracesRequest): Promise<QueryDenomTracesResponse>;
  /** Params queries all parameters of the ibc-transfer module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Denoms queries all denominations */
  denoms(request?: QueryDenomsRequest): Promise<QueryDenomsResponse>;
  /** Denom queries a denomination */
  denom(request: QueryDenomRequest): Promise<QueryDenomResponse>;
  /** DenomHash queries a denomination hash information. */
  denomHash(request: QueryDenomHashRequest): Promise<QueryDenomHashResponse>;
  /** EscrowAddress returns the escrow address for a particular port and channel id. */
  escrowAddress(request: QueryEscrowAddressRequest): Promise<QueryEscrowAddressResponse>;
  /** TotalEscrowForDenom returns the total amount of tokens in escrow based on the denom. */
  totalEscrowForDenom(request: QueryTotalEscrowForDenomRequest): Promise<QueryTotalEscrowForDenomResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.denomTrace = this.denomTrace.bind(this);
    this.denomTraces = this.denomTraces.bind(this);
    this.params = this.params.bind(this);
    this.denoms = this.denoms.bind(this);
    this.denom = this.denom.bind(this);
    this.denomHash = this.denomHash.bind(this);
    this.escrowAddress = this.escrowAddress.bind(this);
    this.totalEscrowForDenom = this.totalEscrowForDenom.bind(this);
  }
  denomTrace(request: QueryDenomTraceRequest, useInterfaces: boolean = true): Promise<QueryDenomTraceResponse> {
    const data = QueryDenomTraceRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.transfer.v1.Query", "DenomTrace", data);
    return promise.then(data => QueryDenomTraceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denomTraces(request: QueryDenomTracesRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryDenomTracesResponse> {
    const data = QueryDenomTracesRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.transfer.v1.Query", "DenomTraces", data);
    return promise.then(data => QueryDenomTracesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.transfer.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denoms(request: QueryDenomsRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryDenomsResponse> {
    const data = QueryDenomsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.transfer.v1.Query", "Denoms", data);
    return promise.then(data => QueryDenomsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denom(request: QueryDenomRequest, useInterfaces: boolean = true): Promise<QueryDenomResponse> {
    const data = QueryDenomRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.transfer.v1.Query", "Denom", data);
    return promise.then(data => QueryDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denomHash(request: QueryDenomHashRequest, useInterfaces: boolean = true): Promise<QueryDenomHashResponse> {
    const data = QueryDenomHashRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.transfer.v1.Query", "DenomHash", data);
    return promise.then(data => QueryDenomHashResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  escrowAddress(request: QueryEscrowAddressRequest, useInterfaces: boolean = true): Promise<QueryEscrowAddressResponse> {
    const data = QueryEscrowAddressRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.transfer.v1.Query", "EscrowAddress", data);
    return promise.then(data => QueryEscrowAddressResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  totalEscrowForDenom(request: QueryTotalEscrowForDenomRequest, useInterfaces: boolean = true): Promise<QueryTotalEscrowForDenomResponse> {
    const data = QueryTotalEscrowForDenomRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.applications.transfer.v1.Query", "TotalEscrowForDenom", data);
    return promise.then(data => QueryTotalEscrowForDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
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
    denoms(request?: QueryDenomsRequest, useInterfaces: boolean = true): Promise<QueryDenomsResponse> {
      return queryService.denoms(request, useInterfaces);
    },
    denom(request: QueryDenomRequest, useInterfaces: boolean = true): Promise<QueryDenomResponse> {
      return queryService.denom(request, useInterfaces);
    },
    denomHash(request: QueryDenomHashRequest, useInterfaces: boolean = true): Promise<QueryDenomHashResponse> {
      return queryService.denomHash(request, useInterfaces);
    },
    escrowAddress(request: QueryEscrowAddressRequest, useInterfaces: boolean = true): Promise<QueryEscrowAddressResponse> {
      return queryService.escrowAddress(request, useInterfaces);
    },
    totalEscrowForDenom(request: QueryTotalEscrowForDenomRequest, useInterfaces: boolean = true): Promise<QueryTotalEscrowForDenomResponse> {
      return queryService.totalEscrowForDenom(request, useInterfaces);
    }
  };
};