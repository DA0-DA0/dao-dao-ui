import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryConnectionRequest, QueryConnectionResponse, QueryConnectionsRequest, QueryConnectionsResponse, QueryClientConnectionsRequest, QueryClientConnectionsResponse, QueryConnectionClientStateRequest, QueryConnectionClientStateResponse, QueryConnectionConsensusStateRequest, QueryConnectionConsensusStateResponse, QueryConnectionParamsRequest, QueryConnectionParamsResponse } from "./query";
/** Query provides defines the gRPC querier service */
export interface Query {
  /** Connection queries an IBC connection end. */
  connection(request: QueryConnectionRequest): Promise<QueryConnectionResponse>;
  /** Connections queries all the IBC connections of a chain. */
  connections(request?: QueryConnectionsRequest): Promise<QueryConnectionsResponse>;
  /**
   * ClientConnections queries the connection paths associated with a client
   * state.
   */
  clientConnections(request: QueryClientConnectionsRequest): Promise<QueryClientConnectionsResponse>;
  /**
   * ConnectionClientState queries the client state associated with the
   * connection.
   */
  connectionClientState(request: QueryConnectionClientStateRequest): Promise<QueryConnectionClientStateResponse>;
  /**
   * ConnectionConsensusState queries the consensus state associated with the
   * connection.
   */
  connectionConsensusState(request: QueryConnectionConsensusStateRequest): Promise<QueryConnectionConsensusStateResponse>;
  /** ConnectionParams queries all parameters of the ibc connection submodule. */
  connectionParams(request?: QueryConnectionParamsRequest): Promise<QueryConnectionParamsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.connection = this.connection.bind(this);
    this.connections = this.connections.bind(this);
    this.clientConnections = this.clientConnections.bind(this);
    this.connectionClientState = this.connectionClientState.bind(this);
    this.connectionConsensusState = this.connectionConsensusState.bind(this);
    this.connectionParams = this.connectionParams.bind(this);
  }
  connection(request: QueryConnectionRequest, useInterfaces: boolean = true): Promise<QueryConnectionResponse> {
    const data = QueryConnectionRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.connection.v1.Query", "Connection", data);
    return promise.then(data => QueryConnectionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  connections(request: QueryConnectionsRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryConnectionsResponse> {
    const data = QueryConnectionsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.connection.v1.Query", "Connections", data);
    return promise.then(data => QueryConnectionsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  clientConnections(request: QueryClientConnectionsRequest, useInterfaces: boolean = true): Promise<QueryClientConnectionsResponse> {
    const data = QueryClientConnectionsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.connection.v1.Query", "ClientConnections", data);
    return promise.then(data => QueryClientConnectionsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  connectionClientState(request: QueryConnectionClientStateRequest, useInterfaces: boolean = true): Promise<QueryConnectionClientStateResponse> {
    const data = QueryConnectionClientStateRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.connection.v1.Query", "ConnectionClientState", data);
    return promise.then(data => QueryConnectionClientStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  connectionConsensusState(request: QueryConnectionConsensusStateRequest, useInterfaces: boolean = true): Promise<QueryConnectionConsensusStateResponse> {
    const data = QueryConnectionConsensusStateRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.connection.v1.Query", "ConnectionConsensusState", data);
    return promise.then(data => QueryConnectionConsensusStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  connectionParams(request: QueryConnectionParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryConnectionParamsResponse> {
    const data = QueryConnectionParamsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.connection.v1.Query", "ConnectionParams", data);
    return promise.then(data => QueryConnectionParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    connection(request: QueryConnectionRequest, useInterfaces: boolean = true): Promise<QueryConnectionResponse> {
      return queryService.connection(request, useInterfaces);
    },
    connections(request?: QueryConnectionsRequest, useInterfaces: boolean = true): Promise<QueryConnectionsResponse> {
      return queryService.connections(request, useInterfaces);
    },
    clientConnections(request: QueryClientConnectionsRequest, useInterfaces: boolean = true): Promise<QueryClientConnectionsResponse> {
      return queryService.clientConnections(request, useInterfaces);
    },
    connectionClientState(request: QueryConnectionClientStateRequest, useInterfaces: boolean = true): Promise<QueryConnectionClientStateResponse> {
      return queryService.connectionClientState(request, useInterfaces);
    },
    connectionConsensusState(request: QueryConnectionConsensusStateRequest, useInterfaces: boolean = true): Promise<QueryConnectionConsensusStateResponse> {
      return queryService.connectionConsensusState(request, useInterfaces);
    },
    connectionParams(request?: QueryConnectionParamsRequest, useInterfaces: boolean = true): Promise<QueryConnectionParamsResponse> {
      return queryService.connectionParams(request, useInterfaces);
    }
  };
};