import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetStakedPAssetRequest, QueryGetStakedPAssetResponse, QueryAllStakedPAssetRequest, QueryAllStakedPAssetResponse, QueryGetTotalStakedPAssetRequest, QueryGetTotalStakedPAssetResponse, QueryAllTotalStakedPAssetRequest, QueryAllTotalStakedPAssetResponse, QueryGetVoteRequest, QueryGetVoteResponse, QueryAllVoteRequest, QueryAllVoteResponse, QueryGetProposalRequest, QueryGetProposalResponse, QueryAllProposalRequest, QueryAllProposalResponse, QueryTallyResultRequest, QueryTallyResultResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a StakedPAsset by index. */
  stakedPAsset(request: QueryGetStakedPAssetRequest): Promise<QueryGetStakedPAssetResponse>;
  /** Queries a list of StakedPAsset items. */
  stakedPAssetAll(request: QueryAllStakedPAssetRequest): Promise<QueryAllStakedPAssetResponse>;
  totalStakedPAsset(request: QueryGetTotalStakedPAssetRequest): Promise<QueryGetTotalStakedPAssetResponse>;
  totalStakedPAssetAll(request: QueryAllTotalStakedPAssetRequest): Promise<QueryAllTotalStakedPAssetResponse>;
  /** Queries a Vote by index. */
  vote(request: QueryGetVoteRequest): Promise<QueryGetVoteResponse>;
  /** Queries a list of Vote items. */
  voteAll(request: QueryAllVoteRequest): Promise<QueryAllVoteResponse>;
  /** Queries a Proposal by index. */
  proposal(request: QueryGetProposalRequest): Promise<QueryGetProposalResponse>;
  /** Queries a list of Proposal items. */
  proposalAll(request: QueryAllProposalRequest): Promise<QueryAllProposalResponse>;
  /** Queries a list of Proposal items. */
  tallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.stakedPAsset = this.stakedPAsset.bind(this);
    this.stakedPAssetAll = this.stakedPAssetAll.bind(this);
    this.totalStakedPAsset = this.totalStakedPAsset.bind(this);
    this.totalStakedPAssetAll = this.totalStakedPAssetAll.bind(this);
    this.vote = this.vote.bind(this);
    this.voteAll = this.voteAll.bind(this);
    this.proposal = this.proposal.bind(this);
    this.proposalAll = this.proposalAll.bind(this);
    this.tallyResult = this.tallyResult.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  stakedPAsset(request: QueryGetStakedPAssetRequest, useInterfaces: boolean = true): Promise<QueryGetStakedPAssetResponse> {
    const data = QueryGetStakedPAssetRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Query", "StakedPAsset", data);
    return promise.then(data => QueryGetStakedPAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  stakedPAssetAll(request: QueryAllStakedPAssetRequest, useInterfaces: boolean = true): Promise<QueryAllStakedPAssetResponse> {
    const data = QueryAllStakedPAssetRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Query", "StakedPAssetAll", data);
    return promise.then(data => QueryAllStakedPAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  totalStakedPAsset(request: QueryGetTotalStakedPAssetRequest, useInterfaces: boolean = true): Promise<QueryGetTotalStakedPAssetResponse> {
    const data = QueryGetTotalStakedPAssetRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Query", "TotalStakedPAsset", data);
    return promise.then(data => QueryGetTotalStakedPAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  totalStakedPAssetAll(request: QueryAllTotalStakedPAssetRequest, useInterfaces: boolean = true): Promise<QueryAllTotalStakedPAssetResponse> {
    const data = QueryAllTotalStakedPAssetRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Query", "TotalStakedPAssetAll", data);
    return promise.then(data => QueryAllTotalStakedPAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  vote(request: QueryGetVoteRequest, useInterfaces: boolean = true): Promise<QueryGetVoteResponse> {
    const data = QueryGetVoteRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Query", "Vote", data);
    return promise.then(data => QueryGetVoteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  voteAll(request: QueryAllVoteRequest, useInterfaces: boolean = true): Promise<QueryAllVoteResponse> {
    const data = QueryAllVoteRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Query", "VoteAll", data);
    return promise.then(data => QueryAllVoteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  proposal(request: QueryGetProposalRequest, useInterfaces: boolean = true): Promise<QueryGetProposalResponse> {
    const data = QueryGetProposalRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Query", "Proposal", data);
    return promise.then(data => QueryGetProposalResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  proposalAll(request: QueryAllProposalRequest, useInterfaces: boolean = true): Promise<QueryAllProposalResponse> {
    const data = QueryAllProposalRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Query", "ProposalAll", data);
    return promise.then(data => QueryAllProposalResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  tallyResult(request: QueryTallyResultRequest, useInterfaces: boolean = true): Promise<QueryTallyResultResponse> {
    const data = QueryTallyResultRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Query", "TallyResult", data);
    return promise.then(data => QueryTallyResultResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    stakedPAsset(request: QueryGetStakedPAssetRequest, useInterfaces: boolean = true): Promise<QueryGetStakedPAssetResponse> {
      return queryService.stakedPAsset(request, useInterfaces);
    },
    stakedPAssetAll(request: QueryAllStakedPAssetRequest, useInterfaces: boolean = true): Promise<QueryAllStakedPAssetResponse> {
      return queryService.stakedPAssetAll(request, useInterfaces);
    },
    totalStakedPAsset(request: QueryGetTotalStakedPAssetRequest, useInterfaces: boolean = true): Promise<QueryGetTotalStakedPAssetResponse> {
      return queryService.totalStakedPAsset(request, useInterfaces);
    },
    totalStakedPAssetAll(request: QueryAllTotalStakedPAssetRequest, useInterfaces: boolean = true): Promise<QueryAllTotalStakedPAssetResponse> {
      return queryService.totalStakedPAssetAll(request, useInterfaces);
    },
    vote(request: QueryGetVoteRequest, useInterfaces: boolean = true): Promise<QueryGetVoteResponse> {
      return queryService.vote(request, useInterfaces);
    },
    voteAll(request: QueryAllVoteRequest, useInterfaces: boolean = true): Promise<QueryAllVoteResponse> {
      return queryService.voteAll(request, useInterfaces);
    },
    proposal(request: QueryGetProposalRequest, useInterfaces: boolean = true): Promise<QueryGetProposalResponse> {
      return queryService.proposal(request, useInterfaces);
    },
    proposalAll(request: QueryAllProposalRequest, useInterfaces: boolean = true): Promise<QueryAllProposalResponse> {
      return queryService.proposalAll(request, useInterfaces);
    },
    tallyResult(request: QueryTallyResultRequest, useInterfaces: boolean = true): Promise<QueryTallyResultResponse> {
      return queryService.tallyResult(request, useInterfaces);
    }
  };
};