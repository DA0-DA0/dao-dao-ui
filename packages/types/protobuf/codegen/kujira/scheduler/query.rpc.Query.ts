import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetHookRequest, QueryGetHookResponse, QueryAllHookRequest, QueryAllHookResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Hook by id. */
  hook(request: QueryGetHookRequest): Promise<QueryGetHookResponse>;
  /** Queries a list of Hook items. */
  hookAll(request?: QueryAllHookRequest): Promise<QueryAllHookResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.hook = this.hook.bind(this);
    this.hookAll = this.hookAll.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.scheduler.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hook(request: QueryGetHookRequest, useInterfaces: boolean = true): Promise<QueryGetHookResponse> {
    const data = QueryGetHookRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.scheduler.Query", "Hook", data);
    return promise.then(data => QueryGetHookResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hookAll(request: QueryAllHookRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllHookResponse> {
    const data = QueryAllHookRequest.encode(request).finish();
    const promise = this.rpc.request("kujira.scheduler.Query", "HookAll", data);
    return promise.then(data => QueryAllHookResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    hook(request: QueryGetHookRequest, useInterfaces: boolean = true): Promise<QueryGetHookResponse> {
      return queryService.hook(request, useInterfaces);
    },
    hookAll(request?: QueryAllHookRequest, useInterfaces: boolean = true): Promise<QueryAllHookResponse> {
      return queryService.hookAll(request, useInterfaces);
    }
  };
};