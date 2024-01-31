import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryInterchainAccountRequest, QueryInterchainAccountResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /**
   * QueryInterchainAccount returns the interchain account for given owner
   * address on a given connection pair
   */
  interchainAccount(request: QueryInterchainAccountRequest): Promise<QueryInterchainAccountResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.interchainAccount = this.interchainAccount.bind(this);
  }
  interchainAccount(request: QueryInterchainAccountRequest, useInterfaces: boolean = true): Promise<QueryInterchainAccountResponse> {
    const data = QueryInterchainAccountRequest.encode(request).finish();
    const promise = this.rpc.request("regen.intertx.v1.Query", "InterchainAccount", data);
    return promise.then(data => QueryInterchainAccountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    interchainAccount(request: QueryInterchainAccountRequest, useInterfaces: boolean = true): Promise<QueryInterchainAccountResponse> {
      return queryService.interchainAccount(request, useInterfaces);
    }
  };
};