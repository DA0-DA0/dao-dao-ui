import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryAdminsRequest, QueryAdminsResponse, QueryArchivedProposalsRequest, QueryArchivedProposalsResponse, QueryArchivedProposalsLegacyRequest, QueryArchivedProposalsLegacyResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a list of admins items. */
  admins(request?: QueryAdminsRequest): Promise<QueryAdminsResponse>;
  /** Queries a list of archived proposals. */
  archivedProposals(request?: QueryArchivedProposalsRequest): Promise<QueryArchivedProposalsResponse>;
  /** Queries a list of archived proposals. */
  archivedProposalsLegacy(request?: QueryArchivedProposalsLegacyRequest): Promise<QueryArchivedProposalsLegacyResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.admins = this.admins.bind(this);
    this.archivedProposals = this.archivedProposals.bind(this);
    this.archivedProposalsLegacy = this.archivedProposalsLegacy.bind(this);
  }
  admins(request: QueryAdminsRequest = {}, useInterfaces: boolean = true): Promise<QueryAdminsResponse> {
    const data = QueryAdminsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.adminmodule.adminmodule.Query", "Admins", data);
    return promise.then(data => QueryAdminsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  archivedProposals(request: QueryArchivedProposalsRequest = {}, useInterfaces: boolean = true): Promise<QueryArchivedProposalsResponse> {
    const data = QueryArchivedProposalsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.adminmodule.adminmodule.Query", "ArchivedProposals", data);
    return promise.then(data => QueryArchivedProposalsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  archivedProposalsLegacy(request: QueryArchivedProposalsLegacyRequest = {}, useInterfaces: boolean = true): Promise<QueryArchivedProposalsLegacyResponse> {
    const data = QueryArchivedProposalsLegacyRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.adminmodule.adminmodule.Query", "ArchivedProposalsLegacy", data);
    return promise.then(data => QueryArchivedProposalsLegacyResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    admins(request?: QueryAdminsRequest, useInterfaces: boolean = true): Promise<QueryAdminsResponse> {
      return queryService.admins(request, useInterfaces);
    },
    archivedProposals(request?: QueryArchivedProposalsRequest, useInterfaces: boolean = true): Promise<QueryArchivedProposalsResponse> {
      return queryService.archivedProposals(request, useInterfaces);
    },
    archivedProposalsLegacy(request?: QueryArchivedProposalsLegacyRequest, useInterfaces: boolean = true): Promise<QueryArchivedProposalsLegacyResponse> {
      return queryService.archivedProposalsLegacy(request, useInterfaces);
    }
  };
};