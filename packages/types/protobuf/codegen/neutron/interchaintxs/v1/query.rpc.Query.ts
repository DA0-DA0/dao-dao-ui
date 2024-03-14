import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryInterchainAccountAddressRequest, QueryInterchainAccountAddressResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  interchainAccountAddress(request: QueryInterchainAccountAddressRequest): Promise<QueryInterchainAccountAddressResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.interchainAccountAddress = this.interchainAccountAddress.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.interchaintxs.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  interchainAccountAddress(request: QueryInterchainAccountAddressRequest, useInterfaces: boolean = true): Promise<QueryInterchainAccountAddressResponse> {
    const data = QueryInterchainAccountAddressRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.interchaintxs.v1.Query", "InterchainAccountAddress", data);
    return promise.then(data => QueryInterchainAccountAddressResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    interchainAccountAddress(request: QueryInterchainAccountAddressRequest, useInterfaces: boolean = true): Promise<QueryInterchainAccountAddressResponse> {
      return queryService.interchainAccountAddress(request, useInterfaces);
    }
  };
};