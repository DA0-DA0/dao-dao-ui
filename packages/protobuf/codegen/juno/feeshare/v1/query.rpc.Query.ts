import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryFeeSharesRequest, QueryFeeSharesResponse, QueryFeeShareRequest, QueryFeeShareResponse, QueryParamsRequest, QueryParamsResponse, QueryDeployerFeeSharesRequest, QueryDeployerFeeSharesResponse, QueryWithdrawerFeeSharesRequest, QueryWithdrawerFeeSharesResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** FeeShares retrieves all registered FeeShares */
  feeShares(request?: QueryFeeSharesRequest): Promise<QueryFeeSharesResponse>;
  /** FeeShare retrieves a registered FeeShare for a given contract address */
  feeShare(request: QueryFeeShareRequest): Promise<QueryFeeShareResponse>;
  /** Params retrieves the FeeShare module params */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /**
   * DeployerFeeShares retrieves all FeeShares that a given deployer has
   * registered
   */
  deployerFeeShares(request: QueryDeployerFeeSharesRequest): Promise<QueryDeployerFeeSharesResponse>;
  /**
   * WithdrawerFeeShares retrieves all FeeShares with a given withdrawer
   * address
   */
  withdrawerFeeShares(request: QueryWithdrawerFeeSharesRequest): Promise<QueryWithdrawerFeeSharesResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.feeShares = this.feeShares.bind(this);
    this.feeShare = this.feeShare.bind(this);
    this.params = this.params.bind(this);
    this.deployerFeeShares = this.deployerFeeShares.bind(this);
    this.withdrawerFeeShares = this.withdrawerFeeShares.bind(this);
  }
  feeShares(request: QueryFeeSharesRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryFeeSharesResponse> {
    const data = QueryFeeSharesRequest.encode(request).finish();
    const promise = this.rpc.request("juno.feeshare.v1.Query", "FeeShares", data);
    return promise.then(data => QueryFeeSharesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  feeShare(request: QueryFeeShareRequest, useInterfaces: boolean = true): Promise<QueryFeeShareResponse> {
    const data = QueryFeeShareRequest.encode(request).finish();
    const promise = this.rpc.request("juno.feeshare.v1.Query", "FeeShare", data);
    return promise.then(data => QueryFeeShareResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("juno.feeshare.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  deployerFeeShares(request: QueryDeployerFeeSharesRequest, useInterfaces: boolean = true): Promise<QueryDeployerFeeSharesResponse> {
    const data = QueryDeployerFeeSharesRequest.encode(request).finish();
    const promise = this.rpc.request("juno.feeshare.v1.Query", "DeployerFeeShares", data);
    return promise.then(data => QueryDeployerFeeSharesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  withdrawerFeeShares(request: QueryWithdrawerFeeSharesRequest, useInterfaces: boolean = true): Promise<QueryWithdrawerFeeSharesResponse> {
    const data = QueryWithdrawerFeeSharesRequest.encode(request).finish();
    const promise = this.rpc.request("juno.feeshare.v1.Query", "WithdrawerFeeShares", data);
    return promise.then(data => QueryWithdrawerFeeSharesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    feeShares(request?: QueryFeeSharesRequest, useInterfaces: boolean = true): Promise<QueryFeeSharesResponse> {
      return queryService.feeShares(request, useInterfaces);
    },
    feeShare(request: QueryFeeShareRequest, useInterfaces: boolean = true): Promise<QueryFeeShareResponse> {
      return queryService.feeShare(request, useInterfaces);
    },
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    deployerFeeShares(request: QueryDeployerFeeSharesRequest, useInterfaces: boolean = true): Promise<QueryDeployerFeeSharesResponse> {
      return queryService.deployerFeeShares(request, useInterfaces);
    },
    withdrawerFeeShares(request: QueryWithdrawerFeeSharesRequest, useInterfaces: boolean = true): Promise<QueryWithdrawerFeeSharesResponse> {
      return queryService.withdrawerFeeShares(request, useInterfaces);
    }
  };
};