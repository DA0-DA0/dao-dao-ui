import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryHostChainRequest, QueryHostChainResponse, QueryHostChainsRequest, QueryHostChainsResponse, QueryDepositsRequest, QueryDepositsResponse, QueryLSMDepositsRequest, QueryLSMDepositsResponse, QueryUnbondingsRequest, QueryUnbondingsResponse, QueryUnbondingRequest, QueryUnbondingResponse, QueryUserUnbondingsRequest, QueryUserUnbondingsResponse, QueryHostChainUserUnbondingsRequest, QueryHostChainUserUnbondingsResponse, QueryValidatorUnbondingRequest, QueryValidatorUnbondingResponse, QueryDepositAccountBalanceRequest, QueryDepositAccountBalanceResponse, QueryExchangeRateRequest, QueryExchangeRateResponse, QueryRedelegationsRequest, QueryRedelegationsResponse, QueryRedelegationTxRequest, QueryRedelegationTxResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a HostChain by id. */
  hostChain(request: QueryHostChainRequest): Promise<QueryHostChainResponse>;
  /** Queries for all the HostChains. */
  hostChains(request?: QueryHostChainsRequest): Promise<QueryHostChainsResponse>;
  /** Queries for all the deposits for a host chain. */
  deposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse>;
  /** Queries for all the deposits for a host chain. */
  lSMDeposits(request: QueryLSMDepositsRequest): Promise<QueryLSMDepositsResponse>;
  /** Queries all unbondings for a host chain. */
  unbondings(request: QueryUnbondingsRequest): Promise<QueryUnbondingsResponse>;
  /** Queries an unbonding for a host chain. */
  unbonding(request: QueryUnbondingRequest): Promise<QueryUnbondingResponse>;
  /** Queries all unbondings for a delegator address. */
  userUnbondings(request: QueryUserUnbondingsRequest): Promise<QueryUserUnbondingsResponse>;
  /** Queries all unbondings for a host chain. */
  hostChainUserUnbondings(request: QueryHostChainUserUnbondingsRequest): Promise<QueryHostChainUserUnbondingsResponse>;
  /** Queries all validator unbondings for a host chain. */
  validatorUnbondings(request: QueryValidatorUnbondingRequest): Promise<QueryValidatorUnbondingResponse>;
  /** Queries for a host chain deposit account balance. */
  depositAccountBalance(request: QueryDepositAccountBalanceRequest): Promise<QueryDepositAccountBalanceResponse>;
  /**
   * Queries for a host chain exchange rate between the host token and the stk
   * token.
   */
  exchangeRate(request: QueryExchangeRateRequest): Promise<QueryExchangeRateResponse>;
  /**
   * Queries for a host chain redelegation entries on the host token delegation
   * acct.
   */
  redelegations(request: QueryRedelegationsRequest): Promise<QueryRedelegationsResponse>;
  /** Queries for a host chain redelegation-txs for the host token. */
  redelegationTx(request: QueryRedelegationTxRequest): Promise<QueryRedelegationTxResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.hostChain = this.hostChain.bind(this);
    this.hostChains = this.hostChains.bind(this);
    this.deposits = this.deposits.bind(this);
    this.lSMDeposits = this.lSMDeposits.bind(this);
    this.unbondings = this.unbondings.bind(this);
    this.unbonding = this.unbonding.bind(this);
    this.userUnbondings = this.userUnbondings.bind(this);
    this.hostChainUserUnbondings = this.hostChainUserUnbondings.bind(this);
    this.validatorUnbondings = this.validatorUnbondings.bind(this);
    this.depositAccountBalance = this.depositAccountBalance.bind(this);
    this.exchangeRate = this.exchangeRate.bind(this);
    this.redelegations = this.redelegations.bind(this);
    this.redelegationTx = this.redelegationTx.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hostChain(request: QueryHostChainRequest, useInterfaces: boolean = true): Promise<QueryHostChainResponse> {
    const data = QueryHostChainRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Query", "HostChain", data);
    return promise.then(data => QueryHostChainResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hostChains(request: QueryHostChainsRequest = {}, useInterfaces: boolean = true): Promise<QueryHostChainsResponse> {
    const data = QueryHostChainsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Query", "HostChains", data);
    return promise.then(data => QueryHostChainsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  deposits(request: QueryDepositsRequest, useInterfaces: boolean = true): Promise<QueryDepositsResponse> {
    const data = QueryDepositsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Query", "Deposits", data);
    return promise.then(data => QueryDepositsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  lSMDeposits(request: QueryLSMDepositsRequest, useInterfaces: boolean = true): Promise<QueryLSMDepositsResponse> {
    const data = QueryLSMDepositsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Query", "LSMDeposits", data);
    return promise.then(data => QueryLSMDepositsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unbondings(request: QueryUnbondingsRequest, useInterfaces: boolean = true): Promise<QueryUnbondingsResponse> {
    const data = QueryUnbondingsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Query", "Unbondings", data);
    return promise.then(data => QueryUnbondingsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unbonding(request: QueryUnbondingRequest, useInterfaces: boolean = true): Promise<QueryUnbondingResponse> {
    const data = QueryUnbondingRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Query", "Unbonding", data);
    return promise.then(data => QueryUnbondingResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  userUnbondings(request: QueryUserUnbondingsRequest, useInterfaces: boolean = true): Promise<QueryUserUnbondingsResponse> {
    const data = QueryUserUnbondingsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Query", "UserUnbondings", data);
    return promise.then(data => QueryUserUnbondingsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hostChainUserUnbondings(request: QueryHostChainUserUnbondingsRequest, useInterfaces: boolean = true): Promise<QueryHostChainUserUnbondingsResponse> {
    const data = QueryHostChainUserUnbondingsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Query", "HostChainUserUnbondings", data);
    return promise.then(data => QueryHostChainUserUnbondingsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  validatorUnbondings(request: QueryValidatorUnbondingRequest, useInterfaces: boolean = true): Promise<QueryValidatorUnbondingResponse> {
    const data = QueryValidatorUnbondingRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Query", "ValidatorUnbondings", data);
    return promise.then(data => QueryValidatorUnbondingResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  depositAccountBalance(request: QueryDepositAccountBalanceRequest, useInterfaces: boolean = true): Promise<QueryDepositAccountBalanceResponse> {
    const data = QueryDepositAccountBalanceRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Query", "DepositAccountBalance", data);
    return promise.then(data => QueryDepositAccountBalanceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  exchangeRate(request: QueryExchangeRateRequest, useInterfaces: boolean = true): Promise<QueryExchangeRateResponse> {
    const data = QueryExchangeRateRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Query", "ExchangeRate", data);
    return promise.then(data => QueryExchangeRateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  redelegations(request: QueryRedelegationsRequest, useInterfaces: boolean = true): Promise<QueryRedelegationsResponse> {
    const data = QueryRedelegationsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Query", "Redelegations", data);
    return promise.then(data => QueryRedelegationsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  redelegationTx(request: QueryRedelegationTxRequest, useInterfaces: boolean = true): Promise<QueryRedelegationTxResponse> {
    const data = QueryRedelegationTxRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Query", "RedelegationTx", data);
    return promise.then(data => QueryRedelegationTxResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    hostChain(request: QueryHostChainRequest, useInterfaces: boolean = true): Promise<QueryHostChainResponse> {
      return queryService.hostChain(request, useInterfaces);
    },
    hostChains(request?: QueryHostChainsRequest, useInterfaces: boolean = true): Promise<QueryHostChainsResponse> {
      return queryService.hostChains(request, useInterfaces);
    },
    deposits(request: QueryDepositsRequest, useInterfaces: boolean = true): Promise<QueryDepositsResponse> {
      return queryService.deposits(request, useInterfaces);
    },
    lSMDeposits(request: QueryLSMDepositsRequest, useInterfaces: boolean = true): Promise<QueryLSMDepositsResponse> {
      return queryService.lSMDeposits(request, useInterfaces);
    },
    unbondings(request: QueryUnbondingsRequest, useInterfaces: boolean = true): Promise<QueryUnbondingsResponse> {
      return queryService.unbondings(request, useInterfaces);
    },
    unbonding(request: QueryUnbondingRequest, useInterfaces: boolean = true): Promise<QueryUnbondingResponse> {
      return queryService.unbonding(request, useInterfaces);
    },
    userUnbondings(request: QueryUserUnbondingsRequest, useInterfaces: boolean = true): Promise<QueryUserUnbondingsResponse> {
      return queryService.userUnbondings(request, useInterfaces);
    },
    hostChainUserUnbondings(request: QueryHostChainUserUnbondingsRequest, useInterfaces: boolean = true): Promise<QueryHostChainUserUnbondingsResponse> {
      return queryService.hostChainUserUnbondings(request, useInterfaces);
    },
    validatorUnbondings(request: QueryValidatorUnbondingRequest, useInterfaces: boolean = true): Promise<QueryValidatorUnbondingResponse> {
      return queryService.validatorUnbondings(request, useInterfaces);
    },
    depositAccountBalance(request: QueryDepositAccountBalanceRequest, useInterfaces: boolean = true): Promise<QueryDepositAccountBalanceResponse> {
      return queryService.depositAccountBalance(request, useInterfaces);
    },
    exchangeRate(request: QueryExchangeRateRequest, useInterfaces: boolean = true): Promise<QueryExchangeRateResponse> {
      return queryService.exchangeRate(request, useInterfaces);
    },
    redelegations(request: QueryRedelegationsRequest, useInterfaces: boolean = true): Promise<QueryRedelegationsResponse> {
      return queryService.redelegations(request, useInterfaces);
    },
    redelegationTx(request: QueryRedelegationTxRequest, useInterfaces: boolean = true): Promise<QueryRedelegationTxResponse> {
      return queryService.redelegationTx(request, useInterfaces);
    }
  };
};