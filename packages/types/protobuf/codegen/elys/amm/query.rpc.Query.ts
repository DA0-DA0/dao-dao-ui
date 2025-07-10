import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetPoolRequest, QueryGetPoolResponse, QueryAllPoolRequest, QueryAllPoolResponse, QueryGetDenomLiquidityRequest, QueryGetDenomLiquidityResponse, QueryAllDenomLiquidityRequest, QueryAllDenomLiquidityResponse, QuerySwapEstimationRequest, QuerySwapEstimationResponse, QuerySwapEstimationExactAmountOutRequest, QuerySwapEstimationExactAmountOutResponse, QueryJoinPoolEstimationRequest, QueryJoinPoolEstimationResponse, QueryExitPoolEstimationRequest, QueryExitPoolEstimationResponse, QuerySlippageTrackRequest, QuerySlippageTrackResponse, QuerySlippageTrackAllRequest, QuerySlippageTrackAllResponse, QueryBalanceRequest, QueryBalanceResponse, QueryInRouteByDenomRequest, QueryInRouteByDenomResponse, QueryOutRouteByDenomRequest, QueryOutRouteByDenomResponse, QuerySwapEstimationByDenomRequest, QuerySwapEstimationByDenomResponse, QueryWeightAndSlippageFeeRequest, QueryWeightAndSlippageFeeResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Pool items. */
  pool(request: QueryGetPoolRequest): Promise<QueryGetPoolResponse>;
  poolAll(request: QueryAllPoolRequest): Promise<QueryAllPoolResponse>;
  /** Queries a list of DenomLiquidity items. */
  denomLiquidity(request: QueryGetDenomLiquidityRequest): Promise<QueryGetDenomLiquidityResponse>;
  denomLiquidityAll(request?: QueryAllDenomLiquidityRequest): Promise<QueryAllDenomLiquidityResponse>;
  /** Queries a list of SwapEstimation items, uses swap exact amount in route. */
  swapEstimation(request: QuerySwapEstimationRequest): Promise<QuerySwapEstimationResponse>;
  /** Queries a list of SwapEstimation items, uses swap exact amount out route. */
  swapEstimationExactAmountOut(request: QuerySwapEstimationExactAmountOutRequest): Promise<QuerySwapEstimationExactAmountOutResponse>;
  /** Queries JoinPool estimation */
  joinPoolEstimation(request: QueryJoinPoolEstimationRequest): Promise<QueryJoinPoolEstimationResponse>;
  /** Queries ExistPool estimation */
  exitPoolEstimation(request: QueryExitPoolEstimationRequest): Promise<QueryExitPoolEstimationResponse>;
  /** Queries slippage track for a week. */
  slippageTrack(request: QuerySlippageTrackRequest): Promise<QuerySlippageTrackResponse>;
  /** Queries all slippage tracks for a week. */
  slippageTrackAll(request?: QuerySlippageTrackAllRequest): Promise<QuerySlippageTrackAllResponse>;
  /** Queries a list of Balance items. */
  balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse>;
  /** Queries a list of InRouteByDenom items. */
  inRouteByDenom(request: QueryInRouteByDenomRequest): Promise<QueryInRouteByDenomResponse>;
  /** Queries a list of OutRouteByDenom items. */
  outRouteByDenom(request: QueryOutRouteByDenomRequest): Promise<QueryOutRouteByDenomResponse>;
  /** Queries a list of SwapEstimationByDenom items. */
  swapEstimationByDenom(request: QuerySwapEstimationByDenomRequest): Promise<QuerySwapEstimationByDenomResponse>;
  /** Queries WeightAndSlippageFee for a pool and date */
  weightAndSlippageFee(request: QueryWeightAndSlippageFeeRequest): Promise<QueryWeightAndSlippageFeeResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.pool = this.pool.bind(this);
    this.poolAll = this.poolAll.bind(this);
    this.denomLiquidity = this.denomLiquidity.bind(this);
    this.denomLiquidityAll = this.denomLiquidityAll.bind(this);
    this.swapEstimation = this.swapEstimation.bind(this);
    this.swapEstimationExactAmountOut = this.swapEstimationExactAmountOut.bind(this);
    this.joinPoolEstimation = this.joinPoolEstimation.bind(this);
    this.exitPoolEstimation = this.exitPoolEstimation.bind(this);
    this.slippageTrack = this.slippageTrack.bind(this);
    this.slippageTrackAll = this.slippageTrackAll.bind(this);
    this.balance = this.balance.bind(this);
    this.inRouteByDenom = this.inRouteByDenom.bind(this);
    this.outRouteByDenom = this.outRouteByDenom.bind(this);
    this.swapEstimationByDenom = this.swapEstimationByDenom.bind(this);
    this.weightAndSlippageFee = this.weightAndSlippageFee.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  pool(request: QueryGetPoolRequest, useInterfaces: boolean = true): Promise<QueryGetPoolResponse> {
    const data = QueryGetPoolRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "Pool", data);
    return promise.then(data => QueryGetPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  poolAll(request: QueryAllPoolRequest, useInterfaces: boolean = true): Promise<QueryAllPoolResponse> {
    const data = QueryAllPoolRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "PoolAll", data);
    return promise.then(data => QueryAllPoolResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denomLiquidity(request: QueryGetDenomLiquidityRequest, useInterfaces: boolean = true): Promise<QueryGetDenomLiquidityResponse> {
    const data = QueryGetDenomLiquidityRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "DenomLiquidity", data);
    return promise.then(data => QueryGetDenomLiquidityResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denomLiquidityAll(request: QueryAllDenomLiquidityRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllDenomLiquidityResponse> {
    const data = QueryAllDenomLiquidityRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "DenomLiquidityAll", data);
    return promise.then(data => QueryAllDenomLiquidityResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  swapEstimation(request: QuerySwapEstimationRequest, useInterfaces: boolean = true): Promise<QuerySwapEstimationResponse> {
    const data = QuerySwapEstimationRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "SwapEstimation", data);
    return promise.then(data => QuerySwapEstimationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  swapEstimationExactAmountOut(request: QuerySwapEstimationExactAmountOutRequest, useInterfaces: boolean = true): Promise<QuerySwapEstimationExactAmountOutResponse> {
    const data = QuerySwapEstimationExactAmountOutRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "SwapEstimationExactAmountOut", data);
    return promise.then(data => QuerySwapEstimationExactAmountOutResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  joinPoolEstimation(request: QueryJoinPoolEstimationRequest, useInterfaces: boolean = true): Promise<QueryJoinPoolEstimationResponse> {
    const data = QueryJoinPoolEstimationRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "JoinPoolEstimation", data);
    return promise.then(data => QueryJoinPoolEstimationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  exitPoolEstimation(request: QueryExitPoolEstimationRequest, useInterfaces: boolean = true): Promise<QueryExitPoolEstimationResponse> {
    const data = QueryExitPoolEstimationRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "ExitPoolEstimation", data);
    return promise.then(data => QueryExitPoolEstimationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  slippageTrack(request: QuerySlippageTrackRequest, useInterfaces: boolean = true): Promise<QuerySlippageTrackResponse> {
    const data = QuerySlippageTrackRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "SlippageTrack", data);
    return promise.then(data => QuerySlippageTrackResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  slippageTrackAll(request: QuerySlippageTrackAllRequest = {}, useInterfaces: boolean = true): Promise<QuerySlippageTrackAllResponse> {
    const data = QuerySlippageTrackAllRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "SlippageTrackAll", data);
    return promise.then(data => QuerySlippageTrackAllResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  balance(request: QueryBalanceRequest, useInterfaces: boolean = true): Promise<QueryBalanceResponse> {
    const data = QueryBalanceRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "Balance", data);
    return promise.then(data => QueryBalanceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  inRouteByDenom(request: QueryInRouteByDenomRequest, useInterfaces: boolean = true): Promise<QueryInRouteByDenomResponse> {
    const data = QueryInRouteByDenomRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "InRouteByDenom", data);
    return promise.then(data => QueryInRouteByDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  outRouteByDenom(request: QueryOutRouteByDenomRequest, useInterfaces: boolean = true): Promise<QueryOutRouteByDenomResponse> {
    const data = QueryOutRouteByDenomRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "OutRouteByDenom", data);
    return promise.then(data => QueryOutRouteByDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  swapEstimationByDenom(request: QuerySwapEstimationByDenomRequest, useInterfaces: boolean = true): Promise<QuerySwapEstimationByDenomResponse> {
    const data = QuerySwapEstimationByDenomRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "SwapEstimationByDenom", data);
    return promise.then(data => QuerySwapEstimationByDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  weightAndSlippageFee(request: QueryWeightAndSlippageFeeRequest, useInterfaces: boolean = true): Promise<QueryWeightAndSlippageFeeResponse> {
    const data = QueryWeightAndSlippageFeeRequest.encode(request).finish();
    const promise = this.rpc.request("elys.amm.Query", "WeightAndSlippageFee", data);
    return promise.then(data => QueryWeightAndSlippageFeeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    pool(request: QueryGetPoolRequest, useInterfaces: boolean = true): Promise<QueryGetPoolResponse> {
      return queryService.pool(request, useInterfaces);
    },
    poolAll(request: QueryAllPoolRequest, useInterfaces: boolean = true): Promise<QueryAllPoolResponse> {
      return queryService.poolAll(request, useInterfaces);
    },
    denomLiquidity(request: QueryGetDenomLiquidityRequest, useInterfaces: boolean = true): Promise<QueryGetDenomLiquidityResponse> {
      return queryService.denomLiquidity(request, useInterfaces);
    },
    denomLiquidityAll(request?: QueryAllDenomLiquidityRequest, useInterfaces: boolean = true): Promise<QueryAllDenomLiquidityResponse> {
      return queryService.denomLiquidityAll(request, useInterfaces);
    },
    swapEstimation(request: QuerySwapEstimationRequest, useInterfaces: boolean = true): Promise<QuerySwapEstimationResponse> {
      return queryService.swapEstimation(request, useInterfaces);
    },
    swapEstimationExactAmountOut(request: QuerySwapEstimationExactAmountOutRequest, useInterfaces: boolean = true): Promise<QuerySwapEstimationExactAmountOutResponse> {
      return queryService.swapEstimationExactAmountOut(request, useInterfaces);
    },
    joinPoolEstimation(request: QueryJoinPoolEstimationRequest, useInterfaces: boolean = true): Promise<QueryJoinPoolEstimationResponse> {
      return queryService.joinPoolEstimation(request, useInterfaces);
    },
    exitPoolEstimation(request: QueryExitPoolEstimationRequest, useInterfaces: boolean = true): Promise<QueryExitPoolEstimationResponse> {
      return queryService.exitPoolEstimation(request, useInterfaces);
    },
    slippageTrack(request: QuerySlippageTrackRequest, useInterfaces: boolean = true): Promise<QuerySlippageTrackResponse> {
      return queryService.slippageTrack(request, useInterfaces);
    },
    slippageTrackAll(request?: QuerySlippageTrackAllRequest, useInterfaces: boolean = true): Promise<QuerySlippageTrackAllResponse> {
      return queryService.slippageTrackAll(request, useInterfaces);
    },
    balance(request: QueryBalanceRequest, useInterfaces: boolean = true): Promise<QueryBalanceResponse> {
      return queryService.balance(request, useInterfaces);
    },
    inRouteByDenom(request: QueryInRouteByDenomRequest, useInterfaces: boolean = true): Promise<QueryInRouteByDenomResponse> {
      return queryService.inRouteByDenom(request, useInterfaces);
    },
    outRouteByDenom(request: QueryOutRouteByDenomRequest, useInterfaces: boolean = true): Promise<QueryOutRouteByDenomResponse> {
      return queryService.outRouteByDenom(request, useInterfaces);
    },
    swapEstimationByDenom(request: QuerySwapEstimationByDenomRequest, useInterfaces: boolean = true): Promise<QuerySwapEstimationByDenomResponse> {
      return queryService.swapEstimationByDenom(request, useInterfaces);
    },
    weightAndSlippageFee(request: QueryWeightAndSlippageFeeRequest, useInterfaces: boolean = true): Promise<QueryWeightAndSlippageFeeResponse> {
      return queryService.weightAndSlippageFee(request, useInterfaces);
    }
  };
};