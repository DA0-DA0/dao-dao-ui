import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryListPrivilegedRequest, QueryListPrivilegedResponse, QueryParamsRequest, QueryParamsResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** ListPrivileged queries the contracts which have the priviledge status */
  listPrivileged(request?: QueryListPrivilegedRequest): Promise<QueryListPrivilegedResponse>;
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.listPrivileged = this.listPrivileged.bind(this);
    this.params = this.params.bind(this);
  }
  listPrivileged(request: QueryListPrivilegedRequest = {}): Promise<QueryListPrivilegedResponse> {
    const data = QueryListPrivilegedRequest.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.cron.v1.Query", "ListPrivileged", data);
    return promise.then(data => QueryListPrivilegedResponse.decode(new BinaryReader(data)));
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.cron.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    listPrivileged(request?: QueryListPrivilegedRequest): Promise<QueryListPrivilegedResponse> {
      return queryService.listPrivileged(request);
    },
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    }
  };
};