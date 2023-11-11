import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryMinimumGasPricesRequest, QueryMinimumGasPricesResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  minimumGasPrices(request?: QueryMinimumGasPricesRequest): Promise<QueryMinimumGasPricesResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.minimumGasPrices = this.minimumGasPrices.bind(this);
  }
  minimumGasPrices(request: QueryMinimumGasPricesRequest = {}): Promise<QueryMinimumGasPricesResponse> {
    const data = QueryMinimumGasPricesRequest.encode(request).finish();
    const promise = this.rpc.request("gaia.globalfee.v1beta1.Query", "MinimumGasPrices", data);
    return promise.then(data => QueryMinimumGasPricesResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    minimumGasPrices(request?: QueryMinimumGasPricesRequest): Promise<QueryMinimumGasPricesResponse> {
      return queryService.minimumGasPrices(request);
    }
  };
};