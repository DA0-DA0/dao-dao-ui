import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryAllStateRequest, QueryAllStateResponse, QueryHostChainParamsRequest, QueryHostChainParamsResponse, QueryDelegationStateRequest, QueryDelegationStateResponse, QueryAllowListedValidatorsRequest, QueryAllowListedValidatorsResponse, QueryCValueRequest, QueryCValueResponse, QueryModuleStateRequest, QueryModuleStateResponse, QueryIBCTransientStoreRequest, QueryIBCTransientStoreResponse, QueryUnclaimedRequest, QueryUnclaimedResponse, QueryFailedUnbondingsRequest, QueryFailedUnbondingsResponse, QueryPendingUnbondingsRequest, QueryPendingUnbondingsResponse, QueryUnbondingEpochCValueRequest, QueryUnbondingEpochCValueResponse, QueryHostAccountUndelegationRequest, QueryHostAccountUndelegationResponse, QueryDelegatorUnbondingEpochEntryRequest, QueryDelegatorUnbondingEpochEntryResponse, QueryHostAccountsRequest, QueryHostAccountsResponse, QueryDepositModuleAccountRequest, QueryDepositModuleAccountResponse, QueryAllDelegatorUnbondingEpochEntriesRequest, QueryAllDelegatorUnbondingEpochEntriesResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** AllState returns all state of module, aka, genesis export. */
  allState(request?: QueryAllStateRequest): Promise<QueryAllStateResponse>;
  hostChainParams(request?: QueryHostChainParamsRequest): Promise<QueryHostChainParamsResponse>;
  delegationState(request?: QueryDelegationStateRequest): Promise<QueryDelegationStateResponse>;
  allowListedValidators(request?: QueryAllowListedValidatorsRequest): Promise<QueryAllowListedValidatorsResponse>;
  cValue(request?: QueryCValueRequest): Promise<QueryCValueResponse>;
  moduleState(request?: QueryModuleStateRequest): Promise<QueryModuleStateResponse>;
  iBCTransientStore(request?: QueryIBCTransientStoreRequest): Promise<QueryIBCTransientStoreResponse>;
  unclaimed(request: QueryUnclaimedRequest): Promise<QueryUnclaimedResponse>;
  failedUnbondings(request: QueryFailedUnbondingsRequest): Promise<QueryFailedUnbondingsResponse>;
  pendingUnbondings(request: QueryPendingUnbondingsRequest): Promise<QueryPendingUnbondingsResponse>;
  unbondingEpochCValue(request: QueryUnbondingEpochCValueRequest): Promise<QueryUnbondingEpochCValueResponse>;
  hostAccountUndelegation(request: QueryHostAccountUndelegationRequest): Promise<QueryHostAccountUndelegationResponse>;
  delegatorUnbondingEpochEntry(request: QueryDelegatorUnbondingEpochEntryRequest): Promise<QueryDelegatorUnbondingEpochEntryResponse>;
  hostAccounts(request?: QueryHostAccountsRequest): Promise<QueryHostAccountsResponse>;
  depositModuleAccount(request?: QueryDepositModuleAccountRequest): Promise<QueryDepositModuleAccountResponse>;
  delegatorUnbondingEpochEntries(request: QueryAllDelegatorUnbondingEpochEntriesRequest): Promise<QueryAllDelegatorUnbondingEpochEntriesResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.allState = this.allState.bind(this);
    this.hostChainParams = this.hostChainParams.bind(this);
    this.delegationState = this.delegationState.bind(this);
    this.allowListedValidators = this.allowListedValidators.bind(this);
    this.cValue = this.cValue.bind(this);
    this.moduleState = this.moduleState.bind(this);
    this.iBCTransientStore = this.iBCTransientStore.bind(this);
    this.unclaimed = this.unclaimed.bind(this);
    this.failedUnbondings = this.failedUnbondings.bind(this);
    this.pendingUnbondings = this.pendingUnbondings.bind(this);
    this.unbondingEpochCValue = this.unbondingEpochCValue.bind(this);
    this.hostAccountUndelegation = this.hostAccountUndelegation.bind(this);
    this.delegatorUnbondingEpochEntry = this.delegatorUnbondingEpochEntry.bind(this);
    this.hostAccounts = this.hostAccounts.bind(this);
    this.depositModuleAccount = this.depositModuleAccount.bind(this);
    this.delegatorUnbondingEpochEntries = this.delegatorUnbondingEpochEntries.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allState(request: QueryAllStateRequest = {}, useInterfaces: boolean = true): Promise<QueryAllStateResponse> {
    const data = QueryAllStateRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "AllState", data);
    return promise.then(data => QueryAllStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hostChainParams(request: QueryHostChainParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryHostChainParamsResponse> {
    const data = QueryHostChainParamsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "HostChainParams", data);
    return promise.then(data => QueryHostChainParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  delegationState(request: QueryDelegationStateRequest = {}, useInterfaces: boolean = true): Promise<QueryDelegationStateResponse> {
    const data = QueryDelegationStateRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "DelegationState", data);
    return promise.then(data => QueryDelegationStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allowListedValidators(request: QueryAllowListedValidatorsRequest = {}, useInterfaces: boolean = true): Promise<QueryAllowListedValidatorsResponse> {
    const data = QueryAllowListedValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "AllowListedValidators", data);
    return promise.then(data => QueryAllowListedValidatorsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  cValue(request: QueryCValueRequest = {}, useInterfaces: boolean = true): Promise<QueryCValueResponse> {
    const data = QueryCValueRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "CValue", data);
    return promise.then(data => QueryCValueResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  moduleState(request: QueryModuleStateRequest = {}, useInterfaces: boolean = true): Promise<QueryModuleStateResponse> {
    const data = QueryModuleStateRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "ModuleState", data);
    return promise.then(data => QueryModuleStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  iBCTransientStore(request: QueryIBCTransientStoreRequest = {}, useInterfaces: boolean = true): Promise<QueryIBCTransientStoreResponse> {
    const data = QueryIBCTransientStoreRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "IBCTransientStore", data);
    return promise.then(data => QueryIBCTransientStoreResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unclaimed(request: QueryUnclaimedRequest, useInterfaces: boolean = true): Promise<QueryUnclaimedResponse> {
    const data = QueryUnclaimedRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "Unclaimed", data);
    return promise.then(data => QueryUnclaimedResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  failedUnbondings(request: QueryFailedUnbondingsRequest, useInterfaces: boolean = true): Promise<QueryFailedUnbondingsResponse> {
    const data = QueryFailedUnbondingsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "FailedUnbondings", data);
    return promise.then(data => QueryFailedUnbondingsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  pendingUnbondings(request: QueryPendingUnbondingsRequest, useInterfaces: boolean = true): Promise<QueryPendingUnbondingsResponse> {
    const data = QueryPendingUnbondingsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "PendingUnbondings", data);
    return promise.then(data => QueryPendingUnbondingsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unbondingEpochCValue(request: QueryUnbondingEpochCValueRequest, useInterfaces: boolean = true): Promise<QueryUnbondingEpochCValueResponse> {
    const data = QueryUnbondingEpochCValueRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "UnbondingEpochCValue", data);
    return promise.then(data => QueryUnbondingEpochCValueResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hostAccountUndelegation(request: QueryHostAccountUndelegationRequest, useInterfaces: boolean = true): Promise<QueryHostAccountUndelegationResponse> {
    const data = QueryHostAccountUndelegationRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "HostAccountUndelegation", data);
    return promise.then(data => QueryHostAccountUndelegationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  delegatorUnbondingEpochEntry(request: QueryDelegatorUnbondingEpochEntryRequest, useInterfaces: boolean = true): Promise<QueryDelegatorUnbondingEpochEntryResponse> {
    const data = QueryDelegatorUnbondingEpochEntryRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "DelegatorUnbondingEpochEntry", data);
    return promise.then(data => QueryDelegatorUnbondingEpochEntryResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hostAccounts(request: QueryHostAccountsRequest = {}, useInterfaces: boolean = true): Promise<QueryHostAccountsResponse> {
    const data = QueryHostAccountsRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "HostAccounts", data);
    return promise.then(data => QueryHostAccountsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  depositModuleAccount(request: QueryDepositModuleAccountRequest = {}, useInterfaces: boolean = true): Promise<QueryDepositModuleAccountResponse> {
    const data = QueryDepositModuleAccountRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "DepositModuleAccount", data);
    return promise.then(data => QueryDepositModuleAccountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  delegatorUnbondingEpochEntries(request: QueryAllDelegatorUnbondingEpochEntriesRequest, useInterfaces: boolean = true): Promise<QueryAllDelegatorUnbondingEpochEntriesResponse> {
    const data = QueryAllDelegatorUnbondingEpochEntriesRequest.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Query", "DelegatorUnbondingEpochEntries", data);
    return promise.then(data => QueryAllDelegatorUnbondingEpochEntriesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    allState(request?: QueryAllStateRequest, useInterfaces: boolean = true): Promise<QueryAllStateResponse> {
      return queryService.allState(request, useInterfaces);
    },
    hostChainParams(request?: QueryHostChainParamsRequest, useInterfaces: boolean = true): Promise<QueryHostChainParamsResponse> {
      return queryService.hostChainParams(request, useInterfaces);
    },
    delegationState(request?: QueryDelegationStateRequest, useInterfaces: boolean = true): Promise<QueryDelegationStateResponse> {
      return queryService.delegationState(request, useInterfaces);
    },
    allowListedValidators(request?: QueryAllowListedValidatorsRequest, useInterfaces: boolean = true): Promise<QueryAllowListedValidatorsResponse> {
      return queryService.allowListedValidators(request, useInterfaces);
    },
    cValue(request?: QueryCValueRequest, useInterfaces: boolean = true): Promise<QueryCValueResponse> {
      return queryService.cValue(request, useInterfaces);
    },
    moduleState(request?: QueryModuleStateRequest, useInterfaces: boolean = true): Promise<QueryModuleStateResponse> {
      return queryService.moduleState(request, useInterfaces);
    },
    iBCTransientStore(request?: QueryIBCTransientStoreRequest, useInterfaces: boolean = true): Promise<QueryIBCTransientStoreResponse> {
      return queryService.iBCTransientStore(request, useInterfaces);
    },
    unclaimed(request: QueryUnclaimedRequest, useInterfaces: boolean = true): Promise<QueryUnclaimedResponse> {
      return queryService.unclaimed(request, useInterfaces);
    },
    failedUnbondings(request: QueryFailedUnbondingsRequest, useInterfaces: boolean = true): Promise<QueryFailedUnbondingsResponse> {
      return queryService.failedUnbondings(request, useInterfaces);
    },
    pendingUnbondings(request: QueryPendingUnbondingsRequest, useInterfaces: boolean = true): Promise<QueryPendingUnbondingsResponse> {
      return queryService.pendingUnbondings(request, useInterfaces);
    },
    unbondingEpochCValue(request: QueryUnbondingEpochCValueRequest, useInterfaces: boolean = true): Promise<QueryUnbondingEpochCValueResponse> {
      return queryService.unbondingEpochCValue(request, useInterfaces);
    },
    hostAccountUndelegation(request: QueryHostAccountUndelegationRequest, useInterfaces: boolean = true): Promise<QueryHostAccountUndelegationResponse> {
      return queryService.hostAccountUndelegation(request, useInterfaces);
    },
    delegatorUnbondingEpochEntry(request: QueryDelegatorUnbondingEpochEntryRequest, useInterfaces: boolean = true): Promise<QueryDelegatorUnbondingEpochEntryResponse> {
      return queryService.delegatorUnbondingEpochEntry(request, useInterfaces);
    },
    hostAccounts(request?: QueryHostAccountsRequest, useInterfaces: boolean = true): Promise<QueryHostAccountsResponse> {
      return queryService.hostAccounts(request, useInterfaces);
    },
    depositModuleAccount(request?: QueryDepositModuleAccountRequest, useInterfaces: boolean = true): Promise<QueryDepositModuleAccountResponse> {
      return queryService.depositModuleAccount(request, useInterfaces);
    },
    delegatorUnbondingEpochEntries(request: QueryAllDelegatorUnbondingEpochEntriesRequest, useInterfaces: boolean = true): Promise<QueryAllDelegatorUnbondingEpochEntriesResponse> {
      return queryService.delegatorUnbondingEpochEntries(request, useInterfaces);
    }
  };
};