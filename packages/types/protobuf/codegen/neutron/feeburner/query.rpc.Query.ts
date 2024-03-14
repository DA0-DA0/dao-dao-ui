import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryTotalBurnedNeutronsAmountRequest, QueryTotalBurnedNeutronsAmountResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** TotalBurnedNeutronsAmount queries total amount of burned neutron fees. */
  totalBurnedNeutronsAmount(request?: QueryTotalBurnedNeutronsAmountRequest): Promise<QueryTotalBurnedNeutronsAmountResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.totalBurnedNeutronsAmount = this.totalBurnedNeutronsAmount.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.feeburner.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  totalBurnedNeutronsAmount(request: QueryTotalBurnedNeutronsAmountRequest = {}, useInterfaces: boolean = true): Promise<QueryTotalBurnedNeutronsAmountResponse> {
    const data = QueryTotalBurnedNeutronsAmountRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.feeburner.Query", "TotalBurnedNeutronsAmount", data);
    return promise.then(data => QueryTotalBurnedNeutronsAmountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    totalBurnedNeutronsAmount(request?: QueryTotalBurnedNeutronsAmountRequest, useInterfaces: boolean = true): Promise<QueryTotalBurnedNeutronsAmountResponse> {
      return queryService.totalBurnedNeutronsAmount(request, useInterfaces);
    }
  };
};