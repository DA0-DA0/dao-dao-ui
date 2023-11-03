import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryBalanceRequest, QueryBalanceResponse, QueryAllBalancesRequest, QueryAllBalancesResponse, QuerySpendableBalancesRequest, QuerySpendableBalancesResponse, QuerySpendableBalanceByDenomRequest, QuerySpendableBalanceByDenomResponse, QueryTotalSupplyRequest, QueryTotalSupplyResponse, QuerySupplyOfRequest, QuerySupplyOfResponse, QueryParamsRequest, QueryParamsResponse, QueryDenomMetadataRequest, QueryDenomMetadataResponse, QueryDenomMetadataByQueryStringRequest, QueryDenomMetadataByQueryStringResponse, QueryDenomsMetadataRequest, QueryDenomsMetadataResponse, QueryDenomOwnersRequest, QueryDenomOwnersResponse, QuerySendEnabledRequest, QuerySendEnabledResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Balance queries the balance of a single coin for a single account. */
  balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse>;
  /**
   * AllBalances queries the balance of all coins for a single account.
   * 
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   */
  allBalances(request: QueryAllBalancesRequest): Promise<QueryAllBalancesResponse>;
  /**
   * SpendableBalances queries the spendable balance of all coins for a single
   * account.
   * 
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   * 
   * Since: cosmos-sdk 0.46
   */
  spendableBalances(request: QuerySpendableBalancesRequest): Promise<QuerySpendableBalancesResponse>;
  /**
   * SpendableBalanceByDenom queries the spendable balance of a single denom for
   * a single account.
   * 
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   * 
   * Since: cosmos-sdk 0.47
   */
  spendableBalanceByDenom(request: QuerySpendableBalanceByDenomRequest): Promise<QuerySpendableBalanceByDenomResponse>;
  /**
   * TotalSupply queries the total supply of all coins.
   * 
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   */
  totalSupply(request?: QueryTotalSupplyRequest): Promise<QueryTotalSupplyResponse>;
  /**
   * SupplyOf queries the supply of a single coin.
   * 
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   */
  supplyOf(request: QuerySupplyOfRequest): Promise<QuerySupplyOfResponse>;
  /** Params queries the parameters of x/bank module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** DenomsMetadata queries the client metadata of a given coin denomination. */
  denomMetadata(request: QueryDenomMetadataRequest): Promise<QueryDenomMetadataResponse>;
  /** DenomsMetadata queries the client metadata of a given coin denomination. */
  denomMetadataByQueryString(request: QueryDenomMetadataByQueryStringRequest): Promise<QueryDenomMetadataByQueryStringResponse>;
  /**
   * DenomsMetadata queries the client metadata for all registered coin
   * denominations.
   */
  denomsMetadata(request?: QueryDenomsMetadataRequest): Promise<QueryDenomsMetadataResponse>;
  /**
   * DenomOwners queries for all account addresses that own a particular token
   * denomination.
   * 
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   * 
   * Since: cosmos-sdk 0.46
   */
  denomOwners(request: QueryDenomOwnersRequest): Promise<QueryDenomOwnersResponse>;
  /**
   * SendEnabled queries for SendEnabled entries.
   * 
   * This query only returns denominations that have specific SendEnabled settings.
   * Any denomination that does not have a specific setting will use the default
   * params.default_send_enabled, and will not be returned by this query.
   * 
   * Since: cosmos-sdk 0.47
   */
  sendEnabled(request: QuerySendEnabledRequest): Promise<QuerySendEnabledResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.balance = this.balance.bind(this);
    this.allBalances = this.allBalances.bind(this);
    this.spendableBalances = this.spendableBalances.bind(this);
    this.spendableBalanceByDenom = this.spendableBalanceByDenom.bind(this);
    this.totalSupply = this.totalSupply.bind(this);
    this.supplyOf = this.supplyOf.bind(this);
    this.params = this.params.bind(this);
    this.denomMetadata = this.denomMetadata.bind(this);
    this.denomMetadataByQueryString = this.denomMetadataByQueryString.bind(this);
    this.denomsMetadata = this.denomsMetadata.bind(this);
    this.denomOwners = this.denomOwners.bind(this);
    this.sendEnabled = this.sendEnabled.bind(this);
  }
  balance(request: QueryBalanceRequest, useInterfaces: boolean = true): Promise<QueryBalanceResponse> {
    const data = QueryBalanceRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "Balance", data);
    return promise.then(data => QueryBalanceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allBalances(request: QueryAllBalancesRequest, useInterfaces: boolean = true): Promise<QueryAllBalancesResponse> {
    const data = QueryAllBalancesRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "AllBalances", data);
    return promise.then(data => QueryAllBalancesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  spendableBalances(request: QuerySpendableBalancesRequest, useInterfaces: boolean = true): Promise<QuerySpendableBalancesResponse> {
    const data = QuerySpendableBalancesRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "SpendableBalances", data);
    return promise.then(data => QuerySpendableBalancesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  spendableBalanceByDenom(request: QuerySpendableBalanceByDenomRequest, useInterfaces: boolean = true): Promise<QuerySpendableBalanceByDenomResponse> {
    const data = QuerySpendableBalanceByDenomRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "SpendableBalanceByDenom", data);
    return promise.then(data => QuerySpendableBalanceByDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  totalSupply(request: QueryTotalSupplyRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryTotalSupplyResponse> {
    const data = QueryTotalSupplyRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "TotalSupply", data);
    return promise.then(data => QueryTotalSupplyResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  supplyOf(request: QuerySupplyOfRequest, useInterfaces: boolean = true): Promise<QuerySupplyOfResponse> {
    const data = QuerySupplyOfRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "SupplyOf", data);
    return promise.then(data => QuerySupplyOfResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denomMetadata(request: QueryDenomMetadataRequest, useInterfaces: boolean = true): Promise<QueryDenomMetadataResponse> {
    const data = QueryDenomMetadataRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "DenomMetadata", data);
    return promise.then(data => QueryDenomMetadataResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denomMetadataByQueryString(request: QueryDenomMetadataByQueryStringRequest, useInterfaces: boolean = true): Promise<QueryDenomMetadataByQueryStringResponse> {
    const data = QueryDenomMetadataByQueryStringRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "DenomMetadataByQueryString", data);
    return promise.then(data => QueryDenomMetadataByQueryStringResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denomsMetadata(request: QueryDenomsMetadataRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryDenomsMetadataResponse> {
    const data = QueryDenomsMetadataRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "DenomsMetadata", data);
    return promise.then(data => QueryDenomsMetadataResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denomOwners(request: QueryDenomOwnersRequest, useInterfaces: boolean = true): Promise<QueryDenomOwnersResponse> {
    const data = QueryDenomOwnersRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "DenomOwners", data);
    return promise.then(data => QueryDenomOwnersResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  sendEnabled(request: QuerySendEnabledRequest, useInterfaces: boolean = true): Promise<QuerySendEnabledResponse> {
    const data = QuerySendEnabledRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.bank.v1beta1.Query", "SendEnabled", data);
    return promise.then(data => QuerySendEnabledResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    balance(request: QueryBalanceRequest, useInterfaces: boolean = true): Promise<QueryBalanceResponse> {
      return queryService.balance(request, useInterfaces);
    },
    allBalances(request: QueryAllBalancesRequest, useInterfaces: boolean = true): Promise<QueryAllBalancesResponse> {
      return queryService.allBalances(request, useInterfaces);
    },
    spendableBalances(request: QuerySpendableBalancesRequest, useInterfaces: boolean = true): Promise<QuerySpendableBalancesResponse> {
      return queryService.spendableBalances(request, useInterfaces);
    },
    spendableBalanceByDenom(request: QuerySpendableBalanceByDenomRequest, useInterfaces: boolean = true): Promise<QuerySpendableBalanceByDenomResponse> {
      return queryService.spendableBalanceByDenom(request, useInterfaces);
    },
    totalSupply(request?: QueryTotalSupplyRequest, useInterfaces: boolean = true): Promise<QueryTotalSupplyResponse> {
      return queryService.totalSupply(request, useInterfaces);
    },
    supplyOf(request: QuerySupplyOfRequest, useInterfaces: boolean = true): Promise<QuerySupplyOfResponse> {
      return queryService.supplyOf(request, useInterfaces);
    },
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    denomMetadata(request: QueryDenomMetadataRequest, useInterfaces: boolean = true): Promise<QueryDenomMetadataResponse> {
      return queryService.denomMetadata(request, useInterfaces);
    },
    denomMetadataByQueryString(request: QueryDenomMetadataByQueryStringRequest, useInterfaces: boolean = true): Promise<QueryDenomMetadataByQueryStringResponse> {
      return queryService.denomMetadataByQueryString(request, useInterfaces);
    },
    denomsMetadata(request?: QueryDenomsMetadataRequest, useInterfaces: boolean = true): Promise<QueryDenomsMetadataResponse> {
      return queryService.denomsMetadata(request, useInterfaces);
    },
    denomOwners(request: QueryDenomOwnersRequest, useInterfaces: boolean = true): Promise<QueryDenomOwnersResponse> {
      return queryService.denomOwners(request, useInterfaces);
    },
    sendEnabled(request: QuerySendEnabledRequest, useInterfaces: boolean = true): Promise<QuerySendEnabledResponse> {
      return queryService.sendEnabled(request, useInterfaces);
    }
  };
};