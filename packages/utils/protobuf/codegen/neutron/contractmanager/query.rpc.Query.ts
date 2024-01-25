import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryFailuresRequest, QueryFailuresResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Failure by contract address and failure ID. */
  addressFailure(request: QueryFailuresRequest): Promise<QueryFailuresResponse>;
  /** Queries Failures by contract address. */
  addressFailures(request: QueryFailuresRequest): Promise<QueryFailuresResponse>;
  /** Queries a list of Failures occurred on the network. */
  failures(request: QueryFailuresRequest): Promise<QueryFailuresResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.addressFailure = this.addressFailure.bind(this);
    this.addressFailures = this.addressFailures.bind(this);
    this.failures = this.failures.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.contractmanager.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addressFailure(request: QueryFailuresRequest, useInterfaces: boolean = true): Promise<QueryFailuresResponse> {
    const data = QueryFailuresRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.contractmanager.Query", "AddressFailure", data);
    return promise.then(data => QueryFailuresResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addressFailures(request: QueryFailuresRequest, useInterfaces: boolean = true): Promise<QueryFailuresResponse> {
    const data = QueryFailuresRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.contractmanager.Query", "AddressFailures", data);
    return promise.then(data => QueryFailuresResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  failures(request: QueryFailuresRequest, useInterfaces: boolean = true): Promise<QueryFailuresResponse> {
    const data = QueryFailuresRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.contractmanager.Query", "Failures", data);
    return promise.then(data => QueryFailuresResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    addressFailure(request: QueryFailuresRequest, useInterfaces: boolean = true): Promise<QueryFailuresResponse> {
      return queryService.addressFailure(request, useInterfaces);
    },
    addressFailures(request: QueryFailuresRequest, useInterfaces: boolean = true): Promise<QueryFailuresResponse> {
      return queryService.addressFailures(request, useInterfaces);
    },
    failures(request: QueryFailuresRequest, useInterfaces: boolean = true): Promise<QueryFailuresResponse> {
      return queryService.failures(request, useInterfaces);
    }
  };
};