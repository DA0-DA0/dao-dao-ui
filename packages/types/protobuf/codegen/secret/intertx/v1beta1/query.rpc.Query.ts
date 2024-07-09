import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryInterchainAccountFromAddressRequest, QueryInterchainAccountFromAddressResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** QueryInterchainAccountFromAddress returns the interchain account for given owner address on a given connection pair */
  interchainAccountFromAddress(request: QueryInterchainAccountFromAddressRequest): Promise<QueryInterchainAccountFromAddressResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.interchainAccountFromAddress = this.interchainAccountFromAddress.bind(this);
  }
  interchainAccountFromAddress(request: QueryInterchainAccountFromAddressRequest, useInterfaces: boolean = true): Promise<QueryInterchainAccountFromAddressResponse> {
    const data = QueryInterchainAccountFromAddressRequest.encode(request).finish();
    const promise = this.rpc.request("secret.intertx.v1beta1.Query", "InterchainAccountFromAddress", data);
    return promise.then(data => QueryInterchainAccountFromAddressResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    interchainAccountFromAddress(request: QueryInterchainAccountFromAddressRequest, useInterfaces: boolean = true): Promise<QueryInterchainAccountFromAddressResponse> {
      return queryService.interchainAccountFromAddress(request, useInterfaces);
    }
  };
};