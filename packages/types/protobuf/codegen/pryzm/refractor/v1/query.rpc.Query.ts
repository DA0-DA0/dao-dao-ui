import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryGetAssetStateRequest, QueryGetAssetStateResponse, QueryGetCPExchangeRateRequest, QueryGetCPExchangeRateResponse, QuerySimulateRefractRequest, QuerySimulateRefractResponse, QuerySimulateRedeemRequest, QuerySimulateRedeemResponse, QueryParamsRequest, QueryParamsResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  assetState(request: QueryGetAssetStateRequest): Promise<QueryGetAssetStateResponse>;
  cPExchangeRate(request: QueryGetCPExchangeRateRequest): Promise<QueryGetCPExchangeRateResponse>;
  simulateRefract(request: QuerySimulateRefractRequest): Promise<QuerySimulateRefractResponse>;
  simulateRedeem(request: QuerySimulateRedeemRequest): Promise<QuerySimulateRedeemResponse>;
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.assetState = this.assetState.bind(this);
    this.cPExchangeRate = this.cPExchangeRate.bind(this);
    this.simulateRefract = this.simulateRefract.bind(this);
    this.simulateRedeem = this.simulateRedeem.bind(this);
    this.params = this.params.bind(this);
  }
  assetState(request: QueryGetAssetStateRequest, useInterfaces: boolean = true): Promise<QueryGetAssetStateResponse> {
    const data = QueryGetAssetStateRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.refractor.v1.Query", "AssetState", data);
    return promise.then(data => QueryGetAssetStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  cPExchangeRate(request: QueryGetCPExchangeRateRequest, useInterfaces: boolean = true): Promise<QueryGetCPExchangeRateResponse> {
    const data = QueryGetCPExchangeRateRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.refractor.v1.Query", "CPExchangeRate", data);
    return promise.then(data => QueryGetCPExchangeRateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  simulateRefract(request: QuerySimulateRefractRequest, useInterfaces: boolean = true): Promise<QuerySimulateRefractResponse> {
    const data = QuerySimulateRefractRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.refractor.v1.Query", "SimulateRefract", data);
    return promise.then(data => QuerySimulateRefractResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  simulateRedeem(request: QuerySimulateRedeemRequest, useInterfaces: boolean = true): Promise<QuerySimulateRedeemResponse> {
    const data = QuerySimulateRedeemRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.refractor.v1.Query", "SimulateRedeem", data);
    return promise.then(data => QuerySimulateRedeemResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.refractor.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    assetState(request: QueryGetAssetStateRequest, useInterfaces: boolean = true): Promise<QueryGetAssetStateResponse> {
      return queryService.assetState(request, useInterfaces);
    },
    cPExchangeRate(request: QueryGetCPExchangeRateRequest, useInterfaces: boolean = true): Promise<QueryGetCPExchangeRateResponse> {
      return queryService.cPExchangeRate(request, useInterfaces);
    },
    simulateRefract(request: QuerySimulateRefractRequest, useInterfaces: boolean = true): Promise<QuerySimulateRefractResponse> {
      return queryService.simulateRefract(request, useInterfaces);
    },
    simulateRedeem(request: QuerySimulateRedeemRequest, useInterfaces: boolean = true): Promise<QuerySimulateRedeemResponse> {
      return queryService.simulateRedeem(request, useInterfaces);
    },
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    }
  };
};