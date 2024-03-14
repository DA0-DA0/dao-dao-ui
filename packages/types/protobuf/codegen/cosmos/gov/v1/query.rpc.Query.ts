import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryConstitutionRequest, QueryConstitutionResponse, QueryProposalRequest, QueryProposalResponse, QueryProposalsRequest, QueryProposalsResponse, QueryVoteRequest, QueryVoteResponse, QueryVotesRequest, QueryVotesResponse, QueryParamsRequest, QueryParamsResponse, QueryDepositRequest, QueryDepositResponse, QueryDepositsRequest, QueryDepositsResponse, QueryTallyResultRequest, QueryTallyResultResponse } from "./query";
/** Query defines the gRPC querier service for gov module */
export interface Query {
  /** Constitution queries the chain's constitution. */
  constitution(request?: QueryConstitutionRequest): Promise<QueryConstitutionResponse>;
  /** Proposal queries proposal details based on ProposalID. */
  proposal(request: QueryProposalRequest): Promise<QueryProposalResponse>;
  /** Proposals queries all proposals based on given status. */
  proposals(request: QueryProposalsRequest): Promise<QueryProposalsResponse>;
  /** Vote queries voted information based on proposalID, voterAddr. */
  vote(request: QueryVoteRequest): Promise<QueryVoteResponse>;
  /** Votes queries votes of a given proposal. */
  votes(request: QueryVotesRequest): Promise<QueryVotesResponse>;
  /** Params queries all parameters of the gov module. */
  params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Deposit queries single deposit information based on proposalID, depositAddr. */
  deposit(request: QueryDepositRequest): Promise<QueryDepositResponse>;
  /** Deposits queries all deposits of a single proposal. */
  deposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse>;
  /** TallyResult queries the tally of a proposal vote. */
  tallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.constitution = this.constitution.bind(this);
    this.proposal = this.proposal.bind(this);
    this.proposals = this.proposals.bind(this);
    this.vote = this.vote.bind(this);
    this.votes = this.votes.bind(this);
    this.params = this.params.bind(this);
    this.deposit = this.deposit.bind(this);
    this.deposits = this.deposits.bind(this);
    this.tallyResult = this.tallyResult.bind(this);
  }
  constitution(request: QueryConstitutionRequest = {}, useInterfaces: boolean = true): Promise<QueryConstitutionResponse> {
    const data = QueryConstitutionRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Constitution", data);
    return promise.then(data => QueryConstitutionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  proposal(request: QueryProposalRequest, useInterfaces: boolean = true): Promise<QueryProposalResponse> {
    const data = QueryProposalRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Proposal", data);
    return promise.then(data => QueryProposalResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  proposals(request: QueryProposalsRequest, useInterfaces: boolean = true): Promise<QueryProposalsResponse> {
    const data = QueryProposalsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Proposals", data);
    return promise.then(data => QueryProposalsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  vote(request: QueryVoteRequest, useInterfaces: boolean = true): Promise<QueryVoteResponse> {
    const data = QueryVoteRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Vote", data);
    return promise.then(data => QueryVoteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  votes(request: QueryVotesRequest, useInterfaces: boolean = true): Promise<QueryVotesResponse> {
    const data = QueryVotesRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Votes", data);
    return promise.then(data => QueryVotesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  deposit(request: QueryDepositRequest, useInterfaces: boolean = true): Promise<QueryDepositResponse> {
    const data = QueryDepositRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Deposit", data);
    return promise.then(data => QueryDepositResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  deposits(request: QueryDepositsRequest, useInterfaces: boolean = true): Promise<QueryDepositsResponse> {
    const data = QueryDepositsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Deposits", data);
    return promise.then(data => QueryDepositsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  tallyResult(request: QueryTallyResultRequest, useInterfaces: boolean = true): Promise<QueryTallyResultResponse> {
    const data = QueryTallyResultRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "TallyResult", data);
    return promise.then(data => QueryTallyResultResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    constitution(request?: QueryConstitutionRequest, useInterfaces: boolean = true): Promise<QueryConstitutionResponse> {
      return queryService.constitution(request, useInterfaces);
    },
    proposal(request: QueryProposalRequest, useInterfaces: boolean = true): Promise<QueryProposalResponse> {
      return queryService.proposal(request, useInterfaces);
    },
    proposals(request: QueryProposalsRequest, useInterfaces: boolean = true): Promise<QueryProposalsResponse> {
      return queryService.proposals(request, useInterfaces);
    },
    vote(request: QueryVoteRequest, useInterfaces: boolean = true): Promise<QueryVoteResponse> {
      return queryService.vote(request, useInterfaces);
    },
    votes(request: QueryVotesRequest, useInterfaces: boolean = true): Promise<QueryVotesResponse> {
      return queryService.votes(request, useInterfaces);
    },
    params(request: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    deposit(request: QueryDepositRequest, useInterfaces: boolean = true): Promise<QueryDepositResponse> {
      return queryService.deposit(request, useInterfaces);
    },
    deposits(request: QueryDepositsRequest, useInterfaces: boolean = true): Promise<QueryDepositsResponse> {
      return queryService.deposits(request, useInterfaces);
    },
    tallyResult(request: QueryTallyResultRequest, useInterfaces: boolean = true): Promise<QueryTallyResultResponse> {
      return queryService.tallyResult(request, useInterfaces);
    }
  };
};