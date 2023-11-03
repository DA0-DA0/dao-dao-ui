import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryAccountsRequest, QueryAccountsResponse, QueryAccountRequest, QueryAccountResponse, QueryAccountAddressByIDRequest, QueryAccountAddressByIDResponse, QueryParamsRequest, QueryParamsResponse, QueryModuleAccountsRequest, QueryModuleAccountsResponse, QueryModuleAccountByNameRequest, QueryModuleAccountByNameResponse, Bech32PrefixRequest, Bech32PrefixResponse, AddressBytesToStringRequest, AddressBytesToStringResponse, AddressStringToBytesRequest, AddressStringToBytesResponse, QueryAccountInfoRequest, QueryAccountInfoResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /**
   * Accounts returns all the existing accounts.
   * 
   * When called from another module, this query might consume a high amount of
   * gas if the pagination field is incorrectly set.
   * 
   * Since: cosmos-sdk 0.43
   */
  accounts(request?: QueryAccountsRequest): Promise<QueryAccountsResponse>;
  /** Account returns account details based on address. */
  account(request: QueryAccountRequest): Promise<QueryAccountResponse>;
  /**
   * AccountAddressByID returns account address based on account number.
   * 
   * Since: cosmos-sdk 0.46.2
   */
  accountAddressByID(request: QueryAccountAddressByIDRequest): Promise<QueryAccountAddressByIDResponse>;
  /** Params queries all parameters. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /**
   * ModuleAccounts returns all the existing module accounts.
   * 
   * Since: cosmos-sdk 0.46
   */
  moduleAccounts(request?: QueryModuleAccountsRequest): Promise<QueryModuleAccountsResponse>;
  /** ModuleAccountByName returns the module account info by module name */
  moduleAccountByName(request: QueryModuleAccountByNameRequest): Promise<QueryModuleAccountByNameResponse>;
  /**
   * Bech32Prefix queries bech32Prefix
   * 
   * Since: cosmos-sdk 0.46
   */
  bech32Prefix(request?: Bech32PrefixRequest): Promise<Bech32PrefixResponse>;
  /**
   * AddressBytesToString converts Account Address bytes to string
   * 
   * Since: cosmos-sdk 0.46
   */
  addressBytesToString(request: AddressBytesToStringRequest): Promise<AddressBytesToStringResponse>;
  /**
   * AddressStringToBytes converts Address string to bytes
   * 
   * Since: cosmos-sdk 0.46
   */
  addressStringToBytes(request: AddressStringToBytesRequest): Promise<AddressStringToBytesResponse>;
  /**
   * AccountInfo queries account info which is common to all account types.
   * 
   * Since: cosmos-sdk 0.47
   */
  accountInfo(request: QueryAccountInfoRequest): Promise<QueryAccountInfoResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.accounts = this.accounts.bind(this);
    this.account = this.account.bind(this);
    this.accountAddressByID = this.accountAddressByID.bind(this);
    this.params = this.params.bind(this);
    this.moduleAccounts = this.moduleAccounts.bind(this);
    this.moduleAccountByName = this.moduleAccountByName.bind(this);
    this.bech32Prefix = this.bech32Prefix.bind(this);
    this.addressBytesToString = this.addressBytesToString.bind(this);
    this.addressStringToBytes = this.addressStringToBytes.bind(this);
    this.accountInfo = this.accountInfo.bind(this);
  }
  accounts(request: QueryAccountsRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAccountsResponse> {
    const data = QueryAccountsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.auth.v1beta1.Query", "Accounts", data);
    return promise.then(data => QueryAccountsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  account(request: QueryAccountRequest, useInterfaces: boolean = true): Promise<QueryAccountResponse> {
    const data = QueryAccountRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.auth.v1beta1.Query", "Account", data);
    return promise.then(data => QueryAccountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountAddressByID(request: QueryAccountAddressByIDRequest, useInterfaces: boolean = true): Promise<QueryAccountAddressByIDResponse> {
    const data = QueryAccountAddressByIDRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.auth.v1beta1.Query", "AccountAddressByID", data);
    return promise.then(data => QueryAccountAddressByIDResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.auth.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  moduleAccounts(request: QueryModuleAccountsRequest = {}, useInterfaces: boolean = true): Promise<QueryModuleAccountsResponse> {
    const data = QueryModuleAccountsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.auth.v1beta1.Query", "ModuleAccounts", data);
    return promise.then(data => QueryModuleAccountsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  moduleAccountByName(request: QueryModuleAccountByNameRequest, useInterfaces: boolean = true): Promise<QueryModuleAccountByNameResponse> {
    const data = QueryModuleAccountByNameRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.auth.v1beta1.Query", "ModuleAccountByName", data);
    return promise.then(data => QueryModuleAccountByNameResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  bech32Prefix(request: Bech32PrefixRequest = {}, useInterfaces: boolean = true): Promise<Bech32PrefixResponse> {
    const data = Bech32PrefixRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.auth.v1beta1.Query", "Bech32Prefix", data);
    return promise.then(data => Bech32PrefixResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addressBytesToString(request: AddressBytesToStringRequest, useInterfaces: boolean = true): Promise<AddressBytesToStringResponse> {
    const data = AddressBytesToStringRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.auth.v1beta1.Query", "AddressBytesToString", data);
    return promise.then(data => AddressBytesToStringResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addressStringToBytes(request: AddressStringToBytesRequest, useInterfaces: boolean = true): Promise<AddressStringToBytesResponse> {
    const data = AddressStringToBytesRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.auth.v1beta1.Query", "AddressStringToBytes", data);
    return promise.then(data => AddressStringToBytesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  accountInfo(request: QueryAccountInfoRequest, useInterfaces: boolean = true): Promise<QueryAccountInfoResponse> {
    const data = QueryAccountInfoRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.auth.v1beta1.Query", "AccountInfo", data);
    return promise.then(data => QueryAccountInfoResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    accounts(request?: QueryAccountsRequest, useInterfaces: boolean = true): Promise<QueryAccountsResponse> {
      return queryService.accounts(request, useInterfaces);
    },
    account(request: QueryAccountRequest, useInterfaces: boolean = true): Promise<QueryAccountResponse> {
      return queryService.account(request, useInterfaces);
    },
    accountAddressByID(request: QueryAccountAddressByIDRequest, useInterfaces: boolean = true): Promise<QueryAccountAddressByIDResponse> {
      return queryService.accountAddressByID(request, useInterfaces);
    },
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    moduleAccounts(request?: QueryModuleAccountsRequest, useInterfaces: boolean = true): Promise<QueryModuleAccountsResponse> {
      return queryService.moduleAccounts(request, useInterfaces);
    },
    moduleAccountByName(request: QueryModuleAccountByNameRequest, useInterfaces: boolean = true): Promise<QueryModuleAccountByNameResponse> {
      return queryService.moduleAccountByName(request, useInterfaces);
    },
    bech32Prefix(request?: Bech32PrefixRequest, useInterfaces: boolean = true): Promise<Bech32PrefixResponse> {
      return queryService.bech32Prefix(request, useInterfaces);
    },
    addressBytesToString(request: AddressBytesToStringRequest, useInterfaces: boolean = true): Promise<AddressBytesToStringResponse> {
      return queryService.addressBytesToString(request, useInterfaces);
    },
    addressStringToBytes(request: AddressStringToBytesRequest, useInterfaces: boolean = true): Promise<AddressStringToBytesResponse> {
      return queryService.addressStringToBytes(request, useInterfaces);
    },
    accountInfo(request: QueryAccountInfoRequest, useInterfaces: boolean = true): Promise<QueryAccountInfoResponse> {
      return queryService.accountInfo(request, useInterfaces);
    }
  };
};