import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { PoolsRequest, PoolsResponse, ParamsRequest, ParamsResponse, ContractInfoByPoolIdRequest, ContractInfoByPoolIdResponse } from "./query";
export interface Query {
  /** Pools returns all cosmwasm pools */
  pools(request?: PoolsRequest): Promise<PoolsResponse>;
  /** Params returns the parameters of the x/cosmwasmpool module. */
  params(request?: ParamsRequest): Promise<ParamsResponse>;
  contractInfoByPoolId(request: ContractInfoByPoolIdRequest): Promise<ContractInfoByPoolIdResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.pools = this.pools.bind(this);
    this.params = this.params.bind(this);
    this.contractInfoByPoolId = this.contractInfoByPoolId.bind(this);
  }
  pools(request: PoolsRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<PoolsResponse> {
    const data = PoolsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.cosmwasmpool.v1beta1.Query", "Pools", data);
    return promise.then(data => PoolsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: ParamsRequest = {}, useInterfaces: boolean = true): Promise<ParamsResponse> {
    const data = ParamsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.cosmwasmpool.v1beta1.Query", "Params", data);
    return promise.then(data => ParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  contractInfoByPoolId(request: ContractInfoByPoolIdRequest, useInterfaces: boolean = true): Promise<ContractInfoByPoolIdResponse> {
    const data = ContractInfoByPoolIdRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.cosmwasmpool.v1beta1.Query", "ContractInfoByPoolId", data);
    return promise.then(data => ContractInfoByPoolIdResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    pools(request?: PoolsRequest, useInterfaces: boolean = true): Promise<PoolsResponse> {
      return queryService.pools(request, useInterfaces);
    },
    params(request?: ParamsRequest, useInterfaces: boolean = true): Promise<ParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    contractInfoByPoolId(request: ContractInfoByPoolIdRequest, useInterfaces: boolean = true): Promise<ContractInfoByPoolIdResponse> {
      return queryService.contractInfoByPoolId(request, useInterfaces);
    }
  };
};