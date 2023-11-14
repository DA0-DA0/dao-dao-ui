import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { ModuleBalanceRequest, ModuleBalanceResponse, ModuleLockedAmountRequest, ModuleLockedAmountResponse, AccountUnlockableCoinsRequest, AccountUnlockableCoinsResponse, AccountUnlockingCoinsRequest, AccountUnlockingCoinsResponse, AccountLockedCoinsRequest, AccountLockedCoinsResponse, AccountLockedPastTimeRequest, AccountLockedPastTimeResponse, AccountLockedPastTimeNotUnlockingOnlyRequest, AccountLockedPastTimeNotUnlockingOnlyResponse, AccountUnlockedBeforeTimeRequest, AccountUnlockedBeforeTimeResponse, AccountLockedPastTimeDenomRequest, AccountLockedPastTimeDenomResponse, LockedDenomRequest, LockedDenomResponse, LockedRequest, LockedResponse, LockRewardReceiverRequest, LockRewardReceiverResponse, NextLockIDRequest, NextLockIDResponse, SyntheticLockupsByLockupIDRequest, SyntheticLockupsByLockupIDResponse, SyntheticLockupByLockupIDRequest, SyntheticLockupByLockupIDResponse, AccountLockedLongerDurationRequest, AccountLockedLongerDurationResponse, AccountLockedDurationRequest, AccountLockedDurationResponse, AccountLockedLongerDurationNotUnlockingOnlyRequest, AccountLockedLongerDurationNotUnlockingOnlyResponse, AccountLockedLongerDurationDenomRequest, AccountLockedLongerDurationDenomResponse, QueryParamsRequest, QueryParamsResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Return full balance of the module */
  moduleBalance(request?: ModuleBalanceRequest): Promise<ModuleBalanceResponse>;
  /** Return locked balance of the module */
  moduleLockedAmount(request?: ModuleLockedAmountRequest): Promise<ModuleLockedAmountResponse>;
  /** Returns unlockable coins which are not withdrawn yet */
  accountUnlockableCoins(request: AccountUnlockableCoinsRequest): Promise<AccountUnlockableCoinsResponse>;
  /** Returns unlocking coins */
  accountUnlockingCoins(request: AccountUnlockingCoinsRequest): Promise<AccountUnlockingCoinsResponse>;
  /** Return a locked coins that can't be withdrawn */
  accountLockedCoins(request: AccountLockedCoinsRequest): Promise<AccountLockedCoinsResponse>;
  /** Returns locked records of an account with unlock time beyond timestamp */
  accountLockedPastTime(request: AccountLockedPastTimeRequest): Promise<AccountLockedPastTimeResponse>;
  /**
   * Returns locked records of an account with unlock time beyond timestamp
   * excluding tokens started unlocking
   */
  accountLockedPastTimeNotUnlockingOnly(request: AccountLockedPastTimeNotUnlockingOnlyRequest): Promise<AccountLockedPastTimeNotUnlockingOnlyResponse>;
  /** Returns unlocked records with unlock time before timestamp */
  accountUnlockedBeforeTime(request: AccountUnlockedBeforeTimeRequest): Promise<AccountUnlockedBeforeTimeResponse>;
  /** Returns lock records by address, timestamp, denom */
  accountLockedPastTimeDenom(request: AccountLockedPastTimeDenomRequest): Promise<AccountLockedPastTimeDenomResponse>;
  /** Returns total locked per denom with longer past given time */
  lockedDenom(request: LockedDenomRequest): Promise<LockedDenomResponse>;
  /** Returns lock record by id */
  lockedByID(request: LockedRequest): Promise<LockedResponse>;
  /** Returns lock record by id */
  lockRewardReceiver(request: LockRewardReceiverRequest): Promise<LockRewardReceiverResponse>;
  /** Returns next lock ID */
  nextLockID(request?: NextLockIDRequest): Promise<NextLockIDResponse>;
  /**
   * Returns synthetic lockup by native lockup id
   * Deprecated: use SyntheticLockupByLockupID instead
   */
  syntheticLockupsByLockupID(request: SyntheticLockupsByLockupIDRequest): Promise<SyntheticLockupsByLockupIDResponse>;
  /** Returns synthetic lockup by native lockup id */
  syntheticLockupByLockupID(request: SyntheticLockupByLockupIDRequest): Promise<SyntheticLockupByLockupIDResponse>;
  /** Returns account locked records with longer duration */
  accountLockedLongerDuration(request: AccountLockedLongerDurationRequest): Promise<AccountLockedLongerDurationResponse>;
  /** Returns account locked records with a specific duration */
  accountLockedDuration(request: AccountLockedDurationRequest): Promise<AccountLockedDurationResponse>;
  /**
   * Returns account locked records with longer duration excluding tokens
   * started unlocking
   */
  accountLockedLongerDurationNotUnlockingOnly(request: AccountLockedLongerDurationNotUnlockingOnlyRequest): Promise<AccountLockedLongerDurationNotUnlockingOnlyResponse>;
  /** Returns account's locked records for a denom with longer duration */
  accountLockedLongerDurationDenom(request: AccountLockedLongerDurationDenomRequest): Promise<AccountLockedLongerDurationDenomResponse>;
  /** Params returns lockup params. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.moduleBalance = this.moduleBalance.bind(this);
    this.moduleLockedAmount = this.moduleLockedAmount.bind(this);
    this.accountUnlockableCoins = this.accountUnlockableCoins.bind(this);
    this.accountUnlockingCoins = this.accountUnlockingCoins.bind(this);
    this.accountLockedCoins = this.accountLockedCoins.bind(this);
    this.accountLockedPastTime = this.accountLockedPastTime.bind(this);
    this.accountLockedPastTimeNotUnlockingOnly = this.accountLockedPastTimeNotUnlockingOnly.bind(this);
    this.accountUnlockedBeforeTime = this.accountUnlockedBeforeTime.bind(this);
    this.accountLockedPastTimeDenom = this.accountLockedPastTimeDenom.bind(this);
    this.lockedDenom = this.lockedDenom.bind(this);
    this.lockedByID = this.lockedByID.bind(this);
    this.lockRewardReceiver = this.lockRewardReceiver.bind(this);
    this.nextLockID = this.nextLockID.bind(this);
    this.syntheticLockupsByLockupID = this.syntheticLockupsByLockupID.bind(this);
    this.syntheticLockupByLockupID = this.syntheticLockupByLockupID.bind(this);
    this.accountLockedLongerDuration = this.accountLockedLongerDuration.bind(this);
    this.accountLockedDuration = this.accountLockedDuration.bind(this);
    this.accountLockedLongerDurationNotUnlockingOnly = this.accountLockedLongerDurationNotUnlockingOnly.bind(this);
    this.accountLockedLongerDurationDenom = this.accountLockedLongerDurationDenom.bind(this);
    this.params = this.params.bind(this);
  }
  moduleBalance(request: ModuleBalanceRequest = {}, useInterfaces: boolean = true): Promise<ModuleBalanceResponse> {
    const data = ModuleBalanceRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "ModuleBalance", data);
    return promise.then(data => ModuleBalanceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  moduleLockedAmount(request: ModuleLockedAmountRequest = {}, useInterfaces: boolean = true): Promise<ModuleLockedAmountResponse> {
    const data = ModuleLockedAmountRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "ModuleLockedAmount", data);
    return promise.then(data => ModuleLockedAmountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountUnlockableCoins(request: AccountUnlockableCoinsRequest, useInterfaces: boolean = true): Promise<AccountUnlockableCoinsResponse> {
    const data = AccountUnlockableCoinsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "AccountUnlockableCoins", data);
    return promise.then(data => AccountUnlockableCoinsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountUnlockingCoins(request: AccountUnlockingCoinsRequest, useInterfaces: boolean = true): Promise<AccountUnlockingCoinsResponse> {
    const data = AccountUnlockingCoinsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "AccountUnlockingCoins", data);
    return promise.then(data => AccountUnlockingCoinsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountLockedCoins(request: AccountLockedCoinsRequest, useInterfaces: boolean = true): Promise<AccountLockedCoinsResponse> {
    const data = AccountLockedCoinsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "AccountLockedCoins", data);
    return promise.then(data => AccountLockedCoinsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountLockedPastTime(request: AccountLockedPastTimeRequest, useInterfaces: boolean = true): Promise<AccountLockedPastTimeResponse> {
    const data = AccountLockedPastTimeRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "AccountLockedPastTime", data);
    return promise.then(data => AccountLockedPastTimeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountLockedPastTimeNotUnlockingOnly(request: AccountLockedPastTimeNotUnlockingOnlyRequest, useInterfaces: boolean = true): Promise<AccountLockedPastTimeNotUnlockingOnlyResponse> {
    const data = AccountLockedPastTimeNotUnlockingOnlyRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "AccountLockedPastTimeNotUnlockingOnly", data);
    return promise.then(data => AccountLockedPastTimeNotUnlockingOnlyResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountUnlockedBeforeTime(request: AccountUnlockedBeforeTimeRequest, useInterfaces: boolean = true): Promise<AccountUnlockedBeforeTimeResponse> {
    const data = AccountUnlockedBeforeTimeRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "AccountUnlockedBeforeTime", data);
    return promise.then(data => AccountUnlockedBeforeTimeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountLockedPastTimeDenom(request: AccountLockedPastTimeDenomRequest, useInterfaces: boolean = true): Promise<AccountLockedPastTimeDenomResponse> {
    const data = AccountLockedPastTimeDenomRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "AccountLockedPastTimeDenom", data);
    return promise.then(data => AccountLockedPastTimeDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  lockedDenom(request: LockedDenomRequest, useInterfaces: boolean = true): Promise<LockedDenomResponse> {
    const data = LockedDenomRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "LockedDenom", data);
    return promise.then(data => LockedDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  lockedByID(request: LockedRequest, useInterfaces: boolean = true): Promise<LockedResponse> {
    const data = LockedRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "LockedByID", data);
    return promise.then(data => LockedResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  lockRewardReceiver(request: LockRewardReceiverRequest, useInterfaces: boolean = true): Promise<LockRewardReceiverResponse> {
    const data = LockRewardReceiverRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "LockRewardReceiver", data);
    return promise.then(data => LockRewardReceiverResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  nextLockID(request: NextLockIDRequest = {}, useInterfaces: boolean = true): Promise<NextLockIDResponse> {
    const data = NextLockIDRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "NextLockID", data);
    return promise.then(data => NextLockIDResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  syntheticLockupsByLockupID(request: SyntheticLockupsByLockupIDRequest, useInterfaces: boolean = true): Promise<SyntheticLockupsByLockupIDResponse> {
    const data = SyntheticLockupsByLockupIDRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "SyntheticLockupsByLockupID", data);
    return promise.then(data => SyntheticLockupsByLockupIDResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  syntheticLockupByLockupID(request: SyntheticLockupByLockupIDRequest, useInterfaces: boolean = true): Promise<SyntheticLockupByLockupIDResponse> {
    const data = SyntheticLockupByLockupIDRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "SyntheticLockupByLockupID", data);
    return promise.then(data => SyntheticLockupByLockupIDResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountLockedLongerDuration(request: AccountLockedLongerDurationRequest, useInterfaces: boolean = true): Promise<AccountLockedLongerDurationResponse> {
    const data = AccountLockedLongerDurationRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "AccountLockedLongerDuration", data);
    return promise.then(data => AccountLockedLongerDurationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountLockedDuration(request: AccountLockedDurationRequest, useInterfaces: boolean = true): Promise<AccountLockedDurationResponse> {
    const data = AccountLockedDurationRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "AccountLockedDuration", data);
    return promise.then(data => AccountLockedDurationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountLockedLongerDurationNotUnlockingOnly(request: AccountLockedLongerDurationNotUnlockingOnlyRequest, useInterfaces: boolean = true): Promise<AccountLockedLongerDurationNotUnlockingOnlyResponse> {
    const data = AccountLockedLongerDurationNotUnlockingOnlyRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "AccountLockedLongerDurationNotUnlockingOnly", data);
    return promise.then(data => AccountLockedLongerDurationNotUnlockingOnlyResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountLockedLongerDurationDenom(request: AccountLockedLongerDurationDenomRequest, useInterfaces: boolean = true): Promise<AccountLockedLongerDurationDenomResponse> {
    const data = AccountLockedLongerDurationDenomRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "AccountLockedLongerDurationDenom", data);
    return promise.then(data => AccountLockedLongerDurationDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("osmosis.lockup.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    moduleBalance(request?: ModuleBalanceRequest, useInterfaces: boolean = true): Promise<ModuleBalanceResponse> {
      return queryService.moduleBalance(request, useInterfaces);
    },
    moduleLockedAmount(request?: ModuleLockedAmountRequest, useInterfaces: boolean = true): Promise<ModuleLockedAmountResponse> {
      return queryService.moduleLockedAmount(request, useInterfaces);
    },
    accountUnlockableCoins(request: AccountUnlockableCoinsRequest, useInterfaces: boolean = true): Promise<AccountUnlockableCoinsResponse> {
      return queryService.accountUnlockableCoins(request, useInterfaces);
    },
    accountUnlockingCoins(request: AccountUnlockingCoinsRequest, useInterfaces: boolean = true): Promise<AccountUnlockingCoinsResponse> {
      return queryService.accountUnlockingCoins(request, useInterfaces);
    },
    accountLockedCoins(request: AccountLockedCoinsRequest, useInterfaces: boolean = true): Promise<AccountLockedCoinsResponse> {
      return queryService.accountLockedCoins(request, useInterfaces);
    },
    accountLockedPastTime(request: AccountLockedPastTimeRequest, useInterfaces: boolean = true): Promise<AccountLockedPastTimeResponse> {
      return queryService.accountLockedPastTime(request, useInterfaces);
    },
    accountLockedPastTimeNotUnlockingOnly(request: AccountLockedPastTimeNotUnlockingOnlyRequest, useInterfaces: boolean = true): Promise<AccountLockedPastTimeNotUnlockingOnlyResponse> {
      return queryService.accountLockedPastTimeNotUnlockingOnly(request, useInterfaces);
    },
    accountUnlockedBeforeTime(request: AccountUnlockedBeforeTimeRequest, useInterfaces: boolean = true): Promise<AccountUnlockedBeforeTimeResponse> {
      return queryService.accountUnlockedBeforeTime(request, useInterfaces);
    },
    accountLockedPastTimeDenom(request: AccountLockedPastTimeDenomRequest, useInterfaces: boolean = true): Promise<AccountLockedPastTimeDenomResponse> {
      return queryService.accountLockedPastTimeDenom(request, useInterfaces);
    },
    lockedDenom(request: LockedDenomRequest, useInterfaces: boolean = true): Promise<LockedDenomResponse> {
      return queryService.lockedDenom(request, useInterfaces);
    },
    lockedByID(request: LockedRequest, useInterfaces: boolean = true): Promise<LockedResponse> {
      return queryService.lockedByID(request, useInterfaces);
    },
    lockRewardReceiver(request: LockRewardReceiverRequest, useInterfaces: boolean = true): Promise<LockRewardReceiverResponse> {
      return queryService.lockRewardReceiver(request, useInterfaces);
    },
    nextLockID(request?: NextLockIDRequest, useInterfaces: boolean = true): Promise<NextLockIDResponse> {
      return queryService.nextLockID(request, useInterfaces);
    },
    syntheticLockupsByLockupID(request: SyntheticLockupsByLockupIDRequest, useInterfaces: boolean = true): Promise<SyntheticLockupsByLockupIDResponse> {
      return queryService.syntheticLockupsByLockupID(request, useInterfaces);
    },
    syntheticLockupByLockupID(request: SyntheticLockupByLockupIDRequest, useInterfaces: boolean = true): Promise<SyntheticLockupByLockupIDResponse> {
      return queryService.syntheticLockupByLockupID(request, useInterfaces);
    },
    accountLockedLongerDuration(request: AccountLockedLongerDurationRequest, useInterfaces: boolean = true): Promise<AccountLockedLongerDurationResponse> {
      return queryService.accountLockedLongerDuration(request, useInterfaces);
    },
    accountLockedDuration(request: AccountLockedDurationRequest, useInterfaces: boolean = true): Promise<AccountLockedDurationResponse> {
      return queryService.accountLockedDuration(request, useInterfaces);
    },
    accountLockedLongerDurationNotUnlockingOnly(request: AccountLockedLongerDurationNotUnlockingOnlyRequest, useInterfaces: boolean = true): Promise<AccountLockedLongerDurationNotUnlockingOnlyResponse> {
      return queryService.accountLockedLongerDurationNotUnlockingOnly(request, useInterfaces);
    },
    accountLockedLongerDurationDenom(request: AccountLockedLongerDurationDenomRequest, useInterfaces: boolean = true): Promise<AccountLockedLongerDurationDenomResponse> {
      return queryService.accountLockedLongerDurationDenom(request, useInterfaces);
    },
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    }
  };
};