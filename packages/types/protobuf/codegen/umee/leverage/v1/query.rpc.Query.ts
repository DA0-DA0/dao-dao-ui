import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParams, QueryParamsResponse, QueryRegisteredTokens, QueryRegisteredTokensResponse, QueryRegisteredTokensWithMarkets, QueryRegisteredTokensWithMarketsResponse, QuerySpecialAssets, QuerySpecialAssetsResponse, QueryMarketSummary, QueryMarketSummaryResponse, QueryAccountBalances, QueryAccountBalancesResponse, QueryAccountSummary, QueryAccountSummaryResponse, QueryAccountSummaries, QueryAccountSummariesResponse, QueryLiquidationTargets, QueryLiquidationTargetsResponse, QueryBadDebts, QueryBadDebtsResponse, QueryMaxWithdraw, QueryMaxWithdrawResponse, QueryMaxBorrow, QueryMaxBorrowResponse, QueryInspect, QueryInspectResponse, QueryInspectAccount, QueryInspectAccountResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of the x/leverage module. */
  params(request?: QueryParams): Promise<QueryParamsResponse>;
  /** RegisteredTokens queries for all the registered tokens. */
  registeredTokens(request: QueryRegisteredTokens): Promise<QueryRegisteredTokensResponse>;
  /** RegisteredTokensWithMarkets queries for all the registered tokens and their market summaries. */
  registeredTokensWithMarkets(request?: QueryRegisteredTokensWithMarkets): Promise<QueryRegisteredTokensWithMarketsResponse>;
  /** SpecialAssets queries for all special asset pairs. */
  specialAssets(request: QuerySpecialAssets): Promise<QuerySpecialAssetsResponse>;
  /** MarketSummary queries a base asset's current borrowing and supplying conditions. */
  marketSummary(request: QueryMarketSummary): Promise<QueryMarketSummaryResponse>;
  /** AccountBalances queries an account's current supply, collateral, and borrow positions. */
  accountBalances(request: QueryAccountBalances): Promise<QueryAccountBalancesResponse>;
  /** AccountSummary queries USD values representing an account's total positions and borrowing limits. It requires oracle prices to return successfully. */
  accountSummary(request: QueryAccountSummary): Promise<QueryAccountSummaryResponse>;
  /** AccountSummaries queries USD values representing an account's total positions and borrowing limits. It requires oracle prices to return successfully. */
  accountSummaries(request?: QueryAccountSummaries): Promise<QueryAccountSummariesResponse>;
  /** LiquidationTargets queries a list of all borrower account addresses eligible for liquidation. */
  liquidationTargets(request?: QueryLiquidationTargets): Promise<QueryLiquidationTargetsResponse>;
  /** BadDebts queries a list of borrow positions that have been marked for bad debt repayment. */
  badDebts(request?: QueryBadDebts): Promise<QueryBadDebtsResponse>;
  /** MaxWithdraw queries the maximum amount of a given token an address can withdraw. */
  maxWithdraw(request: QueryMaxWithdraw): Promise<QueryMaxWithdrawResponse>;
  /** MaxBorrow queries the maximum amount of a given token an address can borrow. */
  maxBorrow(request: QueryMaxBorrow): Promise<QueryMaxBorrowResponse>;
  /**
   * Inspect is the customizable inspector query. It returns a list of all borrowers,
   * starting from the highest borrowed value, filtered by any combination of: minimum
   * borrowed value (optionally of a specified token), minimum collateral value, minimum
   * progress toward liquidation threshold, and minimum LTV. Each account is displayed
   * with its address and borrowed/liquidation/collateral USD values, as well as its
   * actual token positions in human-readable symbol denoms instead of uTokens or ibc denoms.
   */
  inspect(request: QueryInspect): Promise<QueryInspectResponse>;
  /** InspectAccount runs the inspect query on a single address */
  inspectAccount(request: QueryInspectAccount): Promise<QueryInspectAccountResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.registeredTokens = this.registeredTokens.bind(this);
    this.registeredTokensWithMarkets = this.registeredTokensWithMarkets.bind(this);
    this.specialAssets = this.specialAssets.bind(this);
    this.marketSummary = this.marketSummary.bind(this);
    this.accountBalances = this.accountBalances.bind(this);
    this.accountSummary = this.accountSummary.bind(this);
    this.accountSummaries = this.accountSummaries.bind(this);
    this.liquidationTargets = this.liquidationTargets.bind(this);
    this.badDebts = this.badDebts.bind(this);
    this.maxWithdraw = this.maxWithdraw.bind(this);
    this.maxBorrow = this.maxBorrow.bind(this);
    this.inspect = this.inspect.bind(this);
    this.inspectAccount = this.inspectAccount.bind(this);
  }
  params(request: QueryParams = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParams.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  registeredTokens(request: QueryRegisteredTokens, useInterfaces: boolean = true): Promise<QueryRegisteredTokensResponse> {
    const data = QueryRegisteredTokens.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Query", "RegisteredTokens", data);
    return promise.then(data => QueryRegisteredTokensResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  registeredTokensWithMarkets(request: QueryRegisteredTokensWithMarkets = {}, useInterfaces: boolean = true): Promise<QueryRegisteredTokensWithMarketsResponse> {
    const data = QueryRegisteredTokensWithMarkets.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Query", "RegisteredTokensWithMarkets", data);
    return promise.then(data => QueryRegisteredTokensWithMarketsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  specialAssets(request: QuerySpecialAssets, useInterfaces: boolean = true): Promise<QuerySpecialAssetsResponse> {
    const data = QuerySpecialAssets.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Query", "SpecialAssets", data);
    return promise.then(data => QuerySpecialAssetsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  marketSummary(request: QueryMarketSummary, useInterfaces: boolean = true): Promise<QueryMarketSummaryResponse> {
    const data = QueryMarketSummary.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Query", "MarketSummary", data);
    return promise.then(data => QueryMarketSummaryResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountBalances(request: QueryAccountBalances, useInterfaces: boolean = true): Promise<QueryAccountBalancesResponse> {
    const data = QueryAccountBalances.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Query", "AccountBalances", data);
    return promise.then(data => QueryAccountBalancesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountSummary(request: QueryAccountSummary, useInterfaces: boolean = true): Promise<QueryAccountSummaryResponse> {
    const data = QueryAccountSummary.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Query", "AccountSummary", data);
    return promise.then(data => QueryAccountSummaryResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountSummaries(request: QueryAccountSummaries = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAccountSummariesResponse> {
    const data = QueryAccountSummaries.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Query", "AccountSummaries", data);
    return promise.then(data => QueryAccountSummariesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  liquidationTargets(request: QueryLiquidationTargets = {}, useInterfaces: boolean = true): Promise<QueryLiquidationTargetsResponse> {
    const data = QueryLiquidationTargets.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Query", "LiquidationTargets", data);
    return promise.then(data => QueryLiquidationTargetsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  badDebts(request: QueryBadDebts = {}, useInterfaces: boolean = true): Promise<QueryBadDebtsResponse> {
    const data = QueryBadDebts.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Query", "BadDebts", data);
    return promise.then(data => QueryBadDebtsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  maxWithdraw(request: QueryMaxWithdraw, useInterfaces: boolean = true): Promise<QueryMaxWithdrawResponse> {
    const data = QueryMaxWithdraw.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Query", "MaxWithdraw", data);
    return promise.then(data => QueryMaxWithdrawResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  maxBorrow(request: QueryMaxBorrow, useInterfaces: boolean = true): Promise<QueryMaxBorrowResponse> {
    const data = QueryMaxBorrow.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Query", "MaxBorrow", data);
    return promise.then(data => QueryMaxBorrowResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  inspect(request: QueryInspect, useInterfaces: boolean = true): Promise<QueryInspectResponse> {
    const data = QueryInspect.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Query", "Inspect", data);
    return promise.then(data => QueryInspectResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  inspectAccount(request: QueryInspectAccount, useInterfaces: boolean = true): Promise<QueryInspectAccountResponse> {
    const data = QueryInspectAccount.encode(request).finish();
    const promise = this.rpc.request("umee.leverage.v1.Query", "InspectAccount", data);
    return promise.then(data => QueryInspectAccountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParams, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    registeredTokens(request: QueryRegisteredTokens, useInterfaces: boolean = true): Promise<QueryRegisteredTokensResponse> {
      return queryService.registeredTokens(request, useInterfaces);
    },
    registeredTokensWithMarkets(request?: QueryRegisteredTokensWithMarkets, useInterfaces: boolean = true): Promise<QueryRegisteredTokensWithMarketsResponse> {
      return queryService.registeredTokensWithMarkets(request, useInterfaces);
    },
    specialAssets(request: QuerySpecialAssets, useInterfaces: boolean = true): Promise<QuerySpecialAssetsResponse> {
      return queryService.specialAssets(request, useInterfaces);
    },
    marketSummary(request: QueryMarketSummary, useInterfaces: boolean = true): Promise<QueryMarketSummaryResponse> {
      return queryService.marketSummary(request, useInterfaces);
    },
    accountBalances(request: QueryAccountBalances, useInterfaces: boolean = true): Promise<QueryAccountBalancesResponse> {
      return queryService.accountBalances(request, useInterfaces);
    },
    accountSummary(request: QueryAccountSummary, useInterfaces: boolean = true): Promise<QueryAccountSummaryResponse> {
      return queryService.accountSummary(request, useInterfaces);
    },
    accountSummaries(request?: QueryAccountSummaries, useInterfaces: boolean = true): Promise<QueryAccountSummariesResponse> {
      return queryService.accountSummaries(request, useInterfaces);
    },
    liquidationTargets(request?: QueryLiquidationTargets, useInterfaces: boolean = true): Promise<QueryLiquidationTargetsResponse> {
      return queryService.liquidationTargets(request, useInterfaces);
    },
    badDebts(request?: QueryBadDebts, useInterfaces: boolean = true): Promise<QueryBadDebtsResponse> {
      return queryService.badDebts(request, useInterfaces);
    },
    maxWithdraw(request: QueryMaxWithdraw, useInterfaces: boolean = true): Promise<QueryMaxWithdrawResponse> {
      return queryService.maxWithdraw(request, useInterfaces);
    },
    maxBorrow(request: QueryMaxBorrow, useInterfaces: boolean = true): Promise<QueryMaxBorrowResponse> {
      return queryService.maxBorrow(request, useInterfaces);
    },
    inspect(request: QueryInspect, useInterfaces: boolean = true): Promise<QueryInspectResponse> {
      return queryService.inspect(request, useInterfaces);
    },
    inspectAccount(request: QueryInspectAccount, useInterfaces: boolean = true): Promise<QueryInspectAccountResponse> {
      return queryService.inspectAccount(request, useInterfaces);
    }
  };
};