import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryLiquidValidatorsRequest, QueryLiquidValidatorsResponse, QueryStatesRequest, QueryStatesResponse } from "./query";
/** Query defines the gRPC query service for the liquidstake module. */
export interface Query {
  /** Params returns parameters of the liquidstake module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /**
   * LiquidValidators returns liquid validators with states of the liquidstake
   * module.
   */
  liquidValidators(request?: QueryLiquidValidatorsRequest): Promise<QueryLiquidValidatorsResponse>;
  /** States returns states of the liquidstake module. */
  states(request?: QueryStatesRequest): Promise<QueryStatesResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.liquidValidators = this.liquidValidators.bind(this);
    this.states = this.states.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstake.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  liquidValidators(request: QueryLiquidValidatorsRequest = {}, useInterfaces: boolean = true): Promise<QueryLiquidValidatorsResponse> {
    const data = QueryLiquidValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstake.v1beta1.Query", "LiquidValidators", data);
    return promise.then(data => QueryLiquidValidatorsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  states(request: QueryStatesRequest = {}, useInterfaces: boolean = true): Promise<QueryStatesResponse> {
    const data = QueryStatesRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstake.v1beta1.Query", "States", data);
    return promise.then(data => QueryStatesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    liquidValidators(request?: QueryLiquidValidatorsRequest, useInterfaces: boolean = true): Promise<QueryLiquidValidatorsResponse> {
      return queryService.liquidValidators(request, useInterfaces);
    },
    states(request?: QueryStatesRequest, useInterfaces: boolean = true): Promise<QueryStatesResponse> {
      return queryService.states(request, useInterfaces);
    }
  };
};