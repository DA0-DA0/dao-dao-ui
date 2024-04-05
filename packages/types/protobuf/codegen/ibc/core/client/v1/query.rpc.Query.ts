import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryClientStateRequest, QueryClientStateResponse, QueryClientStatesRequest, QueryClientStatesResponse, QueryConsensusStateRequest, QueryConsensusStateResponse, QueryConsensusStatesRequest, QueryConsensusStatesResponse, QueryConsensusStateHeightsRequest, QueryConsensusStateHeightsResponse, QueryClientStatusRequest, QueryClientStatusResponse, QueryClientParamsRequest, QueryClientParamsResponse, QueryUpgradedClientStateRequest, QueryUpgradedClientStateResponse, QueryUpgradedConsensusStateRequest, QueryUpgradedConsensusStateResponse } from "./query";
/** Query provides defines the gRPC querier service */
export interface Query {
  /** ClientState queries an IBC light client. */
  clientState(request: QueryClientStateRequest): Promise<QueryClientStateResponse>;
  /** ClientStates queries all the IBC light clients of a chain. */
  clientStates(request?: QueryClientStatesRequest): Promise<QueryClientStatesResponse>;
  /**
   * ConsensusState queries a consensus state associated with a client state at
   * a given height.
   */
  consensusState(request: QueryConsensusStateRequest): Promise<QueryConsensusStateResponse>;
  /**
   * ConsensusStates queries all the consensus state associated with a given
   * client.
   */
  consensusStates(request: QueryConsensusStatesRequest): Promise<QueryConsensusStatesResponse>;
  /** ConsensusStateHeights queries the height of every consensus states associated with a given client. */
  consensusStateHeights(request: QueryConsensusStateHeightsRequest): Promise<QueryConsensusStateHeightsResponse>;
  /** Status queries the status of an IBC client. */
  clientStatus(request: QueryClientStatusRequest): Promise<QueryClientStatusResponse>;
  /** ClientParams queries all parameters of the ibc client submodule. */
  clientParams(request?: QueryClientParamsRequest): Promise<QueryClientParamsResponse>;
  /** UpgradedClientState queries an Upgraded IBC light client. */
  upgradedClientState(request?: QueryUpgradedClientStateRequest): Promise<QueryUpgradedClientStateResponse>;
  /** UpgradedConsensusState queries an Upgraded IBC consensus state. */
  upgradedConsensusState(request?: QueryUpgradedConsensusStateRequest): Promise<QueryUpgradedConsensusStateResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.clientState = this.clientState.bind(this);
    this.clientStates = this.clientStates.bind(this);
    this.consensusState = this.consensusState.bind(this);
    this.consensusStates = this.consensusStates.bind(this);
    this.consensusStateHeights = this.consensusStateHeights.bind(this);
    this.clientStatus = this.clientStatus.bind(this);
    this.clientParams = this.clientParams.bind(this);
    this.upgradedClientState = this.upgradedClientState.bind(this);
    this.upgradedConsensusState = this.upgradedConsensusState.bind(this);
  }
  clientState(request: QueryClientStateRequest, useInterfaces: boolean = true): Promise<QueryClientStateResponse> {
    const data = QueryClientStateRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.client.v1.Query", "ClientState", data);
    return promise.then(data => QueryClientStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  clientStates(request: QueryClientStatesRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryClientStatesResponse> {
    const data = QueryClientStatesRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.client.v1.Query", "ClientStates", data);
    return promise.then(data => QueryClientStatesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  consensusState(request: QueryConsensusStateRequest, useInterfaces: boolean = true): Promise<QueryConsensusStateResponse> {
    const data = QueryConsensusStateRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.client.v1.Query", "ConsensusState", data);
    return promise.then(data => QueryConsensusStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  consensusStates(request: QueryConsensusStatesRequest, useInterfaces: boolean = true): Promise<QueryConsensusStatesResponse> {
    const data = QueryConsensusStatesRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.client.v1.Query", "ConsensusStates", data);
    return promise.then(data => QueryConsensusStatesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  consensusStateHeights(request: QueryConsensusStateHeightsRequest, useInterfaces: boolean = true): Promise<QueryConsensusStateHeightsResponse> {
    const data = QueryConsensusStateHeightsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.client.v1.Query", "ConsensusStateHeights", data);
    return promise.then(data => QueryConsensusStateHeightsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  clientStatus(request: QueryClientStatusRequest, useInterfaces: boolean = true): Promise<QueryClientStatusResponse> {
    const data = QueryClientStatusRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.client.v1.Query", "ClientStatus", data);
    return promise.then(data => QueryClientStatusResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  clientParams(request: QueryClientParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryClientParamsResponse> {
    const data = QueryClientParamsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.client.v1.Query", "ClientParams", data);
    return promise.then(data => QueryClientParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  upgradedClientState(request: QueryUpgradedClientStateRequest = {}, useInterfaces: boolean = true): Promise<QueryUpgradedClientStateResponse> {
    const data = QueryUpgradedClientStateRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.client.v1.Query", "UpgradedClientState", data);
    return promise.then(data => QueryUpgradedClientStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  upgradedConsensusState(request: QueryUpgradedConsensusStateRequest = {}, useInterfaces: boolean = true): Promise<QueryUpgradedConsensusStateResponse> {
    const data = QueryUpgradedConsensusStateRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.client.v1.Query", "UpgradedConsensusState", data);
    return promise.then(data => QueryUpgradedConsensusStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    clientState(request: QueryClientStateRequest, useInterfaces: boolean = true): Promise<QueryClientStateResponse> {
      return queryService.clientState(request, useInterfaces);
    },
    clientStates(request?: QueryClientStatesRequest, useInterfaces: boolean = true): Promise<QueryClientStatesResponse> {
      return queryService.clientStates(request, useInterfaces);
    },
    consensusState(request: QueryConsensusStateRequest, useInterfaces: boolean = true): Promise<QueryConsensusStateResponse> {
      return queryService.consensusState(request, useInterfaces);
    },
    consensusStates(request: QueryConsensusStatesRequest, useInterfaces: boolean = true): Promise<QueryConsensusStatesResponse> {
      return queryService.consensusStates(request, useInterfaces);
    },
    consensusStateHeights(request: QueryConsensusStateHeightsRequest, useInterfaces: boolean = true): Promise<QueryConsensusStateHeightsResponse> {
      return queryService.consensusStateHeights(request, useInterfaces);
    },
    clientStatus(request: QueryClientStatusRequest, useInterfaces: boolean = true): Promise<QueryClientStatusResponse> {
      return queryService.clientStatus(request, useInterfaces);
    },
    clientParams(request?: QueryClientParamsRequest, useInterfaces: boolean = true): Promise<QueryClientParamsResponse> {
      return queryService.clientParams(request, useInterfaces);
    },
    upgradedClientState(request?: QueryUpgradedClientStateRequest, useInterfaces: boolean = true): Promise<QueryUpgradedClientStateResponse> {
      return queryService.upgradedClientState(request, useInterfaces);
    },
    upgradedConsensusState(request?: QueryUpgradedConsensusStateRequest, useInterfaces: boolean = true): Promise<QueryUpgradedConsensusStateResponse> {
      return queryService.upgradedConsensusState(request, useInterfaces);
    }
  };
};