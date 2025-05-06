import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryPaymentInfoRequest, QueryPaymentInfoResponse, QueryValidatorStatsRequest, QueryValidatorStatsResponse, QueryValidatorsStatsRequest, QueryValidatorsStatsResponse } from "./query";
/** Defines the Query interface of the module. */
export interface Query {
  /** Fetches the current parameters of the revenue module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Fetches the current payment info of the module such as payment schedule and revenue details. */
  paymentInfo(request?: QueryPaymentInfoRequest): Promise<QueryPaymentInfoResponse>;
  /** Fetches a given validator's stats from the revenue module's state. */
  validatorStats(request: QueryValidatorStatsRequest): Promise<QueryValidatorStatsResponse>;
  /** Fetches all validators' stats from the revenue module's state. */
  validatorsStats(request?: QueryValidatorsStatsRequest): Promise<QueryValidatorsStatsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.paymentInfo = this.paymentInfo.bind(this);
    this.validatorStats = this.validatorStats.bind(this);
    this.validatorsStats = this.validatorsStats.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.revenue.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  paymentInfo(request: QueryPaymentInfoRequest = {}, useInterfaces: boolean = true): Promise<QueryPaymentInfoResponse> {
    const data = QueryPaymentInfoRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.revenue.Query", "PaymentInfo", data);
    return promise.then(data => QueryPaymentInfoResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  validatorStats(request: QueryValidatorStatsRequest, useInterfaces: boolean = true): Promise<QueryValidatorStatsResponse> {
    const data = QueryValidatorStatsRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.revenue.Query", "ValidatorStats", data);
    return promise.then(data => QueryValidatorStatsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  validatorsStats(request: QueryValidatorsStatsRequest = {}, useInterfaces: boolean = true): Promise<QueryValidatorsStatsResponse> {
    const data = QueryValidatorsStatsRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.revenue.Query", "ValidatorsStats", data);
    return promise.then(data => QueryValidatorsStatsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    paymentInfo(request?: QueryPaymentInfoRequest, useInterfaces: boolean = true): Promise<QueryPaymentInfoResponse> {
      return queryService.paymentInfo(request, useInterfaces);
    },
    validatorStats(request: QueryValidatorStatsRequest, useInterfaces: boolean = true): Promise<QueryValidatorStatsResponse> {
      return queryService.validatorStats(request, useInterfaces);
    },
    validatorsStats(request?: QueryValidatorsStatsRequest, useInterfaces: boolean = true): Promise<QueryValidatorsStatsResponse> {
      return queryService.validatorsStats(request, useInterfaces);
    }
  };
};