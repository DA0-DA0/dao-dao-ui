import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { GetNodeInfoRequest, GetNodeInfoResponse, GetSyncingRequest, GetSyncingResponse, GetLatestBlockRequest, GetLatestBlockResponse, GetBlockByHeightRequest, GetBlockByHeightResponse, GetLatestValidatorSetRequest, GetLatestValidatorSetResponse, GetValidatorSetByHeightRequest, GetValidatorSetByHeightResponse, ABCIQueryRequest, ABCIQueryResponse } from "./query";
/** Service defines the gRPC querier service for tendermint queries. */
export interface Service {
  /** GetNodeInfo queries the current node info. */
  getNodeInfo(request?: GetNodeInfoRequest): Promise<GetNodeInfoResponse>;
  /** GetSyncing queries node syncing. */
  getSyncing(request?: GetSyncingRequest): Promise<GetSyncingResponse>;
  /** GetLatestBlock returns the latest block. */
  getLatestBlock(request?: GetLatestBlockRequest): Promise<GetLatestBlockResponse>;
  /** GetBlockByHeight queries block for given height. */
  getBlockByHeight(request: GetBlockByHeightRequest): Promise<GetBlockByHeightResponse>;
  /** GetLatestValidatorSet queries latest validator-set. */
  getLatestValidatorSet(request?: GetLatestValidatorSetRequest): Promise<GetLatestValidatorSetResponse>;
  /** GetValidatorSetByHeight queries validator-set at a given height. */
  getValidatorSetByHeight(request: GetValidatorSetByHeightRequest): Promise<GetValidatorSetByHeightResponse>;
  /**
   * ABCIQuery defines a query handler that supports ABCI queries directly to the
   * application, bypassing Tendermint completely. The ABCI query must contain
   * a valid and supported path, including app, custom, p2p, and store.
   * 
   * Since: cosmos-sdk 0.46
   */
  aBCIQuery(request: ABCIQueryRequest): Promise<ABCIQueryResponse>;
}
export class ServiceClientImpl implements Service {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.getNodeInfo = this.getNodeInfo.bind(this);
    this.getSyncing = this.getSyncing.bind(this);
    this.getLatestBlock = this.getLatestBlock.bind(this);
    this.getBlockByHeight = this.getBlockByHeight.bind(this);
    this.getLatestValidatorSet = this.getLatestValidatorSet.bind(this);
    this.getValidatorSetByHeight = this.getValidatorSetByHeight.bind(this);
    this.aBCIQuery = this.aBCIQuery.bind(this);
  }
  getNodeInfo(request: GetNodeInfoRequest = {}, useInterfaces: boolean = true): Promise<GetNodeInfoResponse> {
    const data = GetNodeInfoRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.base.tendermint.v1beta1.Service", "GetNodeInfo", data);
    return promise.then(data => GetNodeInfoResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getSyncing(request: GetSyncingRequest = {}, useInterfaces: boolean = true): Promise<GetSyncingResponse> {
    const data = GetSyncingRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.base.tendermint.v1beta1.Service", "GetSyncing", data);
    return promise.then(data => GetSyncingResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getLatestBlock(request: GetLatestBlockRequest = {}, useInterfaces: boolean = true): Promise<GetLatestBlockResponse> {
    const data = GetLatestBlockRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.base.tendermint.v1beta1.Service", "GetLatestBlock", data);
    return promise.then(data => GetLatestBlockResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getBlockByHeight(request: GetBlockByHeightRequest, useInterfaces: boolean = true): Promise<GetBlockByHeightResponse> {
    const data = GetBlockByHeightRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.base.tendermint.v1beta1.Service", "GetBlockByHeight", data);
    return promise.then(data => GetBlockByHeightResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getLatestValidatorSet(request: GetLatestValidatorSetRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<GetLatestValidatorSetResponse> {
    const data = GetLatestValidatorSetRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.base.tendermint.v1beta1.Service", "GetLatestValidatorSet", data);
    return promise.then(data => GetLatestValidatorSetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getValidatorSetByHeight(request: GetValidatorSetByHeightRequest, useInterfaces: boolean = true): Promise<GetValidatorSetByHeightResponse> {
    const data = GetValidatorSetByHeightRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.base.tendermint.v1beta1.Service", "GetValidatorSetByHeight", data);
    return promise.then(data => GetValidatorSetByHeightResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  aBCIQuery(request: ABCIQueryRequest, useInterfaces: boolean = true): Promise<ABCIQueryResponse> {
    const data = ABCIQueryRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.base.tendermint.v1beta1.Service", "ABCIQuery", data);
    return promise.then(data => ABCIQueryResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new ServiceClientImpl(rpc);
  return {
    getNodeInfo(request?: GetNodeInfoRequest, useInterfaces: boolean = true): Promise<GetNodeInfoResponse> {
      return queryService.getNodeInfo(request, useInterfaces);
    },
    getSyncing(request?: GetSyncingRequest, useInterfaces: boolean = true): Promise<GetSyncingResponse> {
      return queryService.getSyncing(request, useInterfaces);
    },
    getLatestBlock(request?: GetLatestBlockRequest, useInterfaces: boolean = true): Promise<GetLatestBlockResponse> {
      return queryService.getLatestBlock(request, useInterfaces);
    },
    getBlockByHeight(request: GetBlockByHeightRequest, useInterfaces: boolean = true): Promise<GetBlockByHeightResponse> {
      return queryService.getBlockByHeight(request, useInterfaces);
    },
    getLatestValidatorSet(request?: GetLatestValidatorSetRequest, useInterfaces: boolean = true): Promise<GetLatestValidatorSetResponse> {
      return queryService.getLatestValidatorSet(request, useInterfaces);
    },
    getValidatorSetByHeight(request: GetValidatorSetByHeightRequest, useInterfaces: boolean = true): Promise<GetValidatorSetByHeightResponse> {
      return queryService.getValidatorSetByHeight(request, useInterfaces);
    },
    aBCIQuery(request: ABCIQueryRequest, useInterfaces: boolean = true): Promise<ABCIQueryResponse> {
      return queryService.aBCIQuery(request, useInterfaces);
    }
  };
};