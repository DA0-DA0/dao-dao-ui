import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetHostChainRequest, QueryGetHostChainResponse, QueryAllHostChainRequest, QueryAllHostChainResponse, QueryGetHostChainStateRequest, QueryGetHostChainStateResponse, QueryAllHostChainStateRequest, QueryAllHostChainStateResponse, QueryGetUndelegationRequest, QueryGetUndelegationResponse, QueryAllUndelegationRequest, QueryAllUndelegationResponse, QueryIncompleteUndelegationRequest, QueryIncompleteUndelegationResponse, QueryGetChannelUndelegationRequest, QueryGetChannelUndelegationResponse, QueryAllChannelUndelegationRequest, QueryAllChannelUndelegationResponse, QueryDelegationQueueBalanceRequest, QueryDelegationQueueBalanceResponse, QueryEpochInfoRequest, QueryEpochInfoResponse, QueryAllReplyDataRequest, QueryAllReplyDataResponse, QueryAllRedeemableLsmRequest, QueryAllRedeemableLsmResponse, QueryAllFailedLsmTransferRequest, QueryAllFailedLsmTransferResponse, QueryGetMultiSigConnectionRequest, QueryGetMultiSigConnectionResponse, QueryAllMultiSigConnectionRequest, QueryAllMultiSigConnectionResponse, QueryGetMultiSigPacketRequest, QueryGetMultiSigPacketResponse, QueryAllMultiSigPacketRequest, QueryAllMultiSigPacketResponse, QueryAllSweepTransferRequest, QueryAllSweepTransferResponse, QuerySimulateStakeRequest, QuerySimulateStakeResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a HostChain by index. */
  hostChain(request: QueryGetHostChainRequest): Promise<QueryGetHostChainResponse>;
  /** Queries a list of HostChain items. */
  hostChainAll(request?: QueryAllHostChainRequest): Promise<QueryAllHostChainResponse>;
  /** Queries a HostChainState by index. */
  hostChainState(request: QueryGetHostChainStateRequest): Promise<QueryGetHostChainStateResponse>;
  /** Queries a list of HostChainState items. */
  hostChainStateAll(request?: QueryAllHostChainStateRequest): Promise<QueryAllHostChainStateResponse>;
  /** Queries a Undelegation by index. */
  undelegation(request: QueryGetUndelegationRequest): Promise<QueryGetUndelegationResponse>;
  /** Queries a list of Undelegation items. */
  undelegationAll(request: QueryAllUndelegationRequest): Promise<QueryAllUndelegationResponse>;
  /** Queries a list of incomplete undelegations sorted by completion time. */
  incompleteUndelegationAll(request: QueryIncompleteUndelegationRequest): Promise<QueryIncompleteUndelegationResponse>;
  /** Queries a ChannelUndelegation by index. */
  channelUndelegation(request: QueryGetChannelUndelegationRequest): Promise<QueryGetChannelUndelegationResponse>;
  /** Queries a list of ChannelUndelegation items. */
  channelUndelegationAll(request: QueryAllChannelUndelegationRequest): Promise<QueryAllChannelUndelegationResponse>;
  /** Queries the balance of the delegation queue. */
  delegationQueueBalance(request: QueryDelegationQueueBalanceRequest): Promise<QueryDelegationQueueBalanceResponse>;
  /** Queries the information about last delegation and undelegation times */
  epochInfo(request: QueryEpochInfoRequest): Promise<QueryEpochInfoResponse>;
  /** Queries the list of reply data */
  replyDataAll(request?: QueryAllReplyDataRequest): Promise<QueryAllReplyDataResponse>;
  /** Queries a list of FailedLsmTransfer items. */
  redeemableLsmAll(request: QueryAllRedeemableLsmRequest): Promise<QueryAllRedeemableLsmResponse>;
  /** Queries a list of FailedLsmTransfer items. */
  failedLsmTransferAll(request: QueryAllFailedLsmTransferRequest): Promise<QueryAllFailedLsmTransferResponse>;
  /** Queries a MultiSigConnection by index. */
  multiSigConnection(request: QueryGetMultiSigConnectionRequest): Promise<QueryGetMultiSigConnectionResponse>;
  /** Queries a list of MultiSigConnection items. */
  multiSigConnectionAll(request?: QueryAllMultiSigConnectionRequest): Promise<QueryAllMultiSigConnectionResponse>;
  /** Queries a MultiSigPacket by index. */
  multiSigPacket(request: QueryGetMultiSigPacketRequest): Promise<QueryGetMultiSigPacketResponse>;
  /** Queries a list of MultiSigPacket items. */
  multiSigPacketAll(request: QueryAllMultiSigPacketRequest): Promise<QueryAllMultiSigPacketResponse>;
  /** Queries the list of sweep transfer */
  sweepTransferAll(request?: QueryAllSweepTransferRequest): Promise<QueryAllSweepTransferResponse>;
  /** Simulates the stake message */
  simulateStake(request: QuerySimulateStakeRequest): Promise<QuerySimulateStakeResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.hostChain = this.hostChain.bind(this);
    this.hostChainAll = this.hostChainAll.bind(this);
    this.hostChainState = this.hostChainState.bind(this);
    this.hostChainStateAll = this.hostChainStateAll.bind(this);
    this.undelegation = this.undelegation.bind(this);
    this.undelegationAll = this.undelegationAll.bind(this);
    this.incompleteUndelegationAll = this.incompleteUndelegationAll.bind(this);
    this.channelUndelegation = this.channelUndelegation.bind(this);
    this.channelUndelegationAll = this.channelUndelegationAll.bind(this);
    this.delegationQueueBalance = this.delegationQueueBalance.bind(this);
    this.epochInfo = this.epochInfo.bind(this);
    this.replyDataAll = this.replyDataAll.bind(this);
    this.redeemableLsmAll = this.redeemableLsmAll.bind(this);
    this.failedLsmTransferAll = this.failedLsmTransferAll.bind(this);
    this.multiSigConnection = this.multiSigConnection.bind(this);
    this.multiSigConnectionAll = this.multiSigConnectionAll.bind(this);
    this.multiSigPacket = this.multiSigPacket.bind(this);
    this.multiSigPacketAll = this.multiSigPacketAll.bind(this);
    this.sweepTransferAll = this.sweepTransferAll.bind(this);
    this.simulateStake = this.simulateStake.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hostChain(request: QueryGetHostChainRequest, useInterfaces: boolean = true): Promise<QueryGetHostChainResponse> {
    const data = QueryGetHostChainRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "HostChain", data);
    return promise.then(data => QueryGetHostChainResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hostChainAll(request: QueryAllHostChainRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllHostChainResponse> {
    const data = QueryAllHostChainRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "HostChainAll", data);
    return promise.then(data => QueryAllHostChainResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hostChainState(request: QueryGetHostChainStateRequest, useInterfaces: boolean = true): Promise<QueryGetHostChainStateResponse> {
    const data = QueryGetHostChainStateRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "HostChainState", data);
    return promise.then(data => QueryGetHostChainStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hostChainStateAll(request: QueryAllHostChainStateRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllHostChainStateResponse> {
    const data = QueryAllHostChainStateRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "HostChainStateAll", data);
    return promise.then(data => QueryAllHostChainStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  undelegation(request: QueryGetUndelegationRequest, useInterfaces: boolean = true): Promise<QueryGetUndelegationResponse> {
    const data = QueryGetUndelegationRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "Undelegation", data);
    return promise.then(data => QueryGetUndelegationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  undelegationAll(request: QueryAllUndelegationRequest, useInterfaces: boolean = true): Promise<QueryAllUndelegationResponse> {
    const data = QueryAllUndelegationRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "UndelegationAll", data);
    return promise.then(data => QueryAllUndelegationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  incompleteUndelegationAll(request: QueryIncompleteUndelegationRequest, useInterfaces: boolean = true): Promise<QueryIncompleteUndelegationResponse> {
    const data = QueryIncompleteUndelegationRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "IncompleteUndelegationAll", data);
    return promise.then(data => QueryIncompleteUndelegationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  channelUndelegation(request: QueryGetChannelUndelegationRequest, useInterfaces: boolean = true): Promise<QueryGetChannelUndelegationResponse> {
    const data = QueryGetChannelUndelegationRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "ChannelUndelegation", data);
    return promise.then(data => QueryGetChannelUndelegationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  channelUndelegationAll(request: QueryAllChannelUndelegationRequest, useInterfaces: boolean = true): Promise<QueryAllChannelUndelegationResponse> {
    const data = QueryAllChannelUndelegationRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "ChannelUndelegationAll", data);
    return promise.then(data => QueryAllChannelUndelegationResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  delegationQueueBalance(request: QueryDelegationQueueBalanceRequest, useInterfaces: boolean = true): Promise<QueryDelegationQueueBalanceResponse> {
    const data = QueryDelegationQueueBalanceRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "DelegationQueueBalance", data);
    return promise.then(data => QueryDelegationQueueBalanceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  epochInfo(request: QueryEpochInfoRequest, useInterfaces: boolean = true): Promise<QueryEpochInfoResponse> {
    const data = QueryEpochInfoRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "EpochInfo", data);
    return promise.then(data => QueryEpochInfoResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  replyDataAll(request: QueryAllReplyDataRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllReplyDataResponse> {
    const data = QueryAllReplyDataRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "ReplyDataAll", data);
    return promise.then(data => QueryAllReplyDataResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  redeemableLsmAll(request: QueryAllRedeemableLsmRequest, useInterfaces: boolean = true): Promise<QueryAllRedeemableLsmResponse> {
    const data = QueryAllRedeemableLsmRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "RedeemableLsmAll", data);
    return promise.then(data => QueryAllRedeemableLsmResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  failedLsmTransferAll(request: QueryAllFailedLsmTransferRequest, useInterfaces: boolean = true): Promise<QueryAllFailedLsmTransferResponse> {
    const data = QueryAllFailedLsmTransferRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "FailedLsmTransferAll", data);
    return promise.then(data => QueryAllFailedLsmTransferResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  multiSigConnection(request: QueryGetMultiSigConnectionRequest, useInterfaces: boolean = true): Promise<QueryGetMultiSigConnectionResponse> {
    const data = QueryGetMultiSigConnectionRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "MultiSigConnection", data);
    return promise.then(data => QueryGetMultiSigConnectionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  multiSigConnectionAll(request: QueryAllMultiSigConnectionRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllMultiSigConnectionResponse> {
    const data = QueryAllMultiSigConnectionRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "MultiSigConnectionAll", data);
    return promise.then(data => QueryAllMultiSigConnectionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  multiSigPacket(request: QueryGetMultiSigPacketRequest, useInterfaces: boolean = true): Promise<QueryGetMultiSigPacketResponse> {
    const data = QueryGetMultiSigPacketRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "MultiSigPacket", data);
    return promise.then(data => QueryGetMultiSigPacketResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  multiSigPacketAll(request: QueryAllMultiSigPacketRequest, useInterfaces: boolean = true): Promise<QueryAllMultiSigPacketResponse> {
    const data = QueryAllMultiSigPacketRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "MultiSigPacketAll", data);
    return promise.then(data => QueryAllMultiSigPacketResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  sweepTransferAll(request: QueryAllSweepTransferRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllSweepTransferResponse> {
    const data = QueryAllSweepTransferRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "SweepTransferAll", data);
    return promise.then(data => QueryAllSweepTransferResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  simulateStake(request: QuerySimulateStakeRequest, useInterfaces: boolean = true): Promise<QuerySimulateStakeResponse> {
    const data = QuerySimulateStakeRequest.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Query", "SimulateStake", data);
    return promise.then(data => QuerySimulateStakeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    hostChain(request: QueryGetHostChainRequest, useInterfaces: boolean = true): Promise<QueryGetHostChainResponse> {
      return queryService.hostChain(request, useInterfaces);
    },
    hostChainAll(request?: QueryAllHostChainRequest, useInterfaces: boolean = true): Promise<QueryAllHostChainResponse> {
      return queryService.hostChainAll(request, useInterfaces);
    },
    hostChainState(request: QueryGetHostChainStateRequest, useInterfaces: boolean = true): Promise<QueryGetHostChainStateResponse> {
      return queryService.hostChainState(request, useInterfaces);
    },
    hostChainStateAll(request?: QueryAllHostChainStateRequest, useInterfaces: boolean = true): Promise<QueryAllHostChainStateResponse> {
      return queryService.hostChainStateAll(request, useInterfaces);
    },
    undelegation(request: QueryGetUndelegationRequest, useInterfaces: boolean = true): Promise<QueryGetUndelegationResponse> {
      return queryService.undelegation(request, useInterfaces);
    },
    undelegationAll(request: QueryAllUndelegationRequest, useInterfaces: boolean = true): Promise<QueryAllUndelegationResponse> {
      return queryService.undelegationAll(request, useInterfaces);
    },
    incompleteUndelegationAll(request: QueryIncompleteUndelegationRequest, useInterfaces: boolean = true): Promise<QueryIncompleteUndelegationResponse> {
      return queryService.incompleteUndelegationAll(request, useInterfaces);
    },
    channelUndelegation(request: QueryGetChannelUndelegationRequest, useInterfaces: boolean = true): Promise<QueryGetChannelUndelegationResponse> {
      return queryService.channelUndelegation(request, useInterfaces);
    },
    channelUndelegationAll(request: QueryAllChannelUndelegationRequest, useInterfaces: boolean = true): Promise<QueryAllChannelUndelegationResponse> {
      return queryService.channelUndelegationAll(request, useInterfaces);
    },
    delegationQueueBalance(request: QueryDelegationQueueBalanceRequest, useInterfaces: boolean = true): Promise<QueryDelegationQueueBalanceResponse> {
      return queryService.delegationQueueBalance(request, useInterfaces);
    },
    epochInfo(request: QueryEpochInfoRequest, useInterfaces: boolean = true): Promise<QueryEpochInfoResponse> {
      return queryService.epochInfo(request, useInterfaces);
    },
    replyDataAll(request?: QueryAllReplyDataRequest, useInterfaces: boolean = true): Promise<QueryAllReplyDataResponse> {
      return queryService.replyDataAll(request, useInterfaces);
    },
    redeemableLsmAll(request: QueryAllRedeemableLsmRequest, useInterfaces: boolean = true): Promise<QueryAllRedeemableLsmResponse> {
      return queryService.redeemableLsmAll(request, useInterfaces);
    },
    failedLsmTransferAll(request: QueryAllFailedLsmTransferRequest, useInterfaces: boolean = true): Promise<QueryAllFailedLsmTransferResponse> {
      return queryService.failedLsmTransferAll(request, useInterfaces);
    },
    multiSigConnection(request: QueryGetMultiSigConnectionRequest, useInterfaces: boolean = true): Promise<QueryGetMultiSigConnectionResponse> {
      return queryService.multiSigConnection(request, useInterfaces);
    },
    multiSigConnectionAll(request?: QueryAllMultiSigConnectionRequest, useInterfaces: boolean = true): Promise<QueryAllMultiSigConnectionResponse> {
      return queryService.multiSigConnectionAll(request, useInterfaces);
    },
    multiSigPacket(request: QueryGetMultiSigPacketRequest, useInterfaces: boolean = true): Promise<QueryGetMultiSigPacketResponse> {
      return queryService.multiSigPacket(request, useInterfaces);
    },
    multiSigPacketAll(request: QueryAllMultiSigPacketRequest, useInterfaces: boolean = true): Promise<QueryAllMultiSigPacketResponse> {
      return queryService.multiSigPacketAll(request, useInterfaces);
    },
    sweepTransferAll(request?: QueryAllSweepTransferRequest, useInterfaces: boolean = true): Promise<QueryAllSweepTransferResponse> {
      return queryService.sweepTransferAll(request, useInterfaces);
    },
    simulateStake(request: QuerySimulateStakeRequest, useInterfaces: boolean = true): Promise<QuerySimulateStakeResponse> {
      return queryService.simulateStake(request, useInterfaces);
    }
  };
};