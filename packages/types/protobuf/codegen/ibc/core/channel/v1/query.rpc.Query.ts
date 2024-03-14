import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryChannelRequest, QueryChannelResponse, QueryChannelsRequest, QueryChannelsResponse, QueryConnectionChannelsRequest, QueryConnectionChannelsResponse, QueryChannelClientStateRequest, QueryChannelClientStateResponse, QueryChannelConsensusStateRequest, QueryChannelConsensusStateResponse, QueryPacketCommitmentRequest, QueryPacketCommitmentResponse, QueryPacketCommitmentsRequest, QueryPacketCommitmentsResponse, QueryPacketReceiptRequest, QueryPacketReceiptResponse, QueryPacketAcknowledgementRequest, QueryPacketAcknowledgementResponse, QueryPacketAcknowledgementsRequest, QueryPacketAcknowledgementsResponse, QueryUnreceivedPacketsRequest, QueryUnreceivedPacketsResponse, QueryUnreceivedAcksRequest, QueryUnreceivedAcksResponse, QueryNextSequenceReceiveRequest, QueryNextSequenceReceiveResponse, QueryNextSequenceSendRequest, QueryNextSequenceSendResponse } from "./query";
/** Query provides defines the gRPC querier service */
export interface Query {
  /** Channel queries an IBC Channel. */
  channel(request: QueryChannelRequest): Promise<QueryChannelResponse>;
  /** Channels queries all the IBC channels of a chain. */
  channels(request?: QueryChannelsRequest): Promise<QueryChannelsResponse>;
  /**
   * ConnectionChannels queries all the channels associated with a connection
   * end.
   */
  connectionChannels(request: QueryConnectionChannelsRequest): Promise<QueryConnectionChannelsResponse>;
  /**
   * ChannelClientState queries for the client state for the channel associated
   * with the provided channel identifiers.
   */
  channelClientState(request: QueryChannelClientStateRequest): Promise<QueryChannelClientStateResponse>;
  /**
   * ChannelConsensusState queries for the consensus state for the channel
   * associated with the provided channel identifiers.
   */
  channelConsensusState(request: QueryChannelConsensusStateRequest): Promise<QueryChannelConsensusStateResponse>;
  /** PacketCommitment queries a stored packet commitment hash. */
  packetCommitment(request: QueryPacketCommitmentRequest): Promise<QueryPacketCommitmentResponse>;
  /**
   * PacketCommitments returns all the packet commitments hashes associated
   * with a channel.
   */
  packetCommitments(request: QueryPacketCommitmentsRequest): Promise<QueryPacketCommitmentsResponse>;
  /**
   * PacketReceipt queries if a given packet sequence has been received on the
   * queried chain
   */
  packetReceipt(request: QueryPacketReceiptRequest): Promise<QueryPacketReceiptResponse>;
  /** PacketAcknowledgement queries a stored packet acknowledgement hash. */
  packetAcknowledgement(request: QueryPacketAcknowledgementRequest): Promise<QueryPacketAcknowledgementResponse>;
  /**
   * PacketAcknowledgements returns all the packet acknowledgements associated
   * with a channel.
   */
  packetAcknowledgements(request: QueryPacketAcknowledgementsRequest): Promise<QueryPacketAcknowledgementsResponse>;
  /**
   * UnreceivedPackets returns all the unreceived IBC packets associated with a
   * channel and sequences.
   */
  unreceivedPackets(request: QueryUnreceivedPacketsRequest): Promise<QueryUnreceivedPacketsResponse>;
  /**
   * UnreceivedAcks returns all the unreceived IBC acknowledgements associated
   * with a channel and sequences.
   */
  unreceivedAcks(request: QueryUnreceivedAcksRequest): Promise<QueryUnreceivedAcksResponse>;
  /** NextSequenceReceive returns the next receive sequence for a given channel. */
  nextSequenceReceive(request: QueryNextSequenceReceiveRequest): Promise<QueryNextSequenceReceiveResponse>;
  /** NextSequenceSend returns the next send sequence for a given channel. */
  nextSequenceSend(request: QueryNextSequenceSendRequest): Promise<QueryNextSequenceSendResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.channel = this.channel.bind(this);
    this.channels = this.channels.bind(this);
    this.connectionChannels = this.connectionChannels.bind(this);
    this.channelClientState = this.channelClientState.bind(this);
    this.channelConsensusState = this.channelConsensusState.bind(this);
    this.packetCommitment = this.packetCommitment.bind(this);
    this.packetCommitments = this.packetCommitments.bind(this);
    this.packetReceipt = this.packetReceipt.bind(this);
    this.packetAcknowledgement = this.packetAcknowledgement.bind(this);
    this.packetAcknowledgements = this.packetAcknowledgements.bind(this);
    this.unreceivedPackets = this.unreceivedPackets.bind(this);
    this.unreceivedAcks = this.unreceivedAcks.bind(this);
    this.nextSequenceReceive = this.nextSequenceReceive.bind(this);
    this.nextSequenceSend = this.nextSequenceSend.bind(this);
  }
  channel(request: QueryChannelRequest, useInterfaces: boolean = true): Promise<QueryChannelResponse> {
    const data = QueryChannelRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "Channel", data);
    return promise.then(data => QueryChannelResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  channels(request: QueryChannelsRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryChannelsResponse> {
    const data = QueryChannelsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "Channels", data);
    return promise.then(data => QueryChannelsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  connectionChannels(request: QueryConnectionChannelsRequest, useInterfaces: boolean = true): Promise<QueryConnectionChannelsResponse> {
    const data = QueryConnectionChannelsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "ConnectionChannels", data);
    return promise.then(data => QueryConnectionChannelsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  channelClientState(request: QueryChannelClientStateRequest, useInterfaces: boolean = true): Promise<QueryChannelClientStateResponse> {
    const data = QueryChannelClientStateRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "ChannelClientState", data);
    return promise.then(data => QueryChannelClientStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  channelConsensusState(request: QueryChannelConsensusStateRequest, useInterfaces: boolean = true): Promise<QueryChannelConsensusStateResponse> {
    const data = QueryChannelConsensusStateRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "ChannelConsensusState", data);
    return promise.then(data => QueryChannelConsensusStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  packetCommitment(request: QueryPacketCommitmentRequest, useInterfaces: boolean = true): Promise<QueryPacketCommitmentResponse> {
    const data = QueryPacketCommitmentRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketCommitment", data);
    return promise.then(data => QueryPacketCommitmentResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  packetCommitments(request: QueryPacketCommitmentsRequest, useInterfaces: boolean = true): Promise<QueryPacketCommitmentsResponse> {
    const data = QueryPacketCommitmentsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketCommitments", data);
    return promise.then(data => QueryPacketCommitmentsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  packetReceipt(request: QueryPacketReceiptRequest, useInterfaces: boolean = true): Promise<QueryPacketReceiptResponse> {
    const data = QueryPacketReceiptRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketReceipt", data);
    return promise.then(data => QueryPacketReceiptResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  packetAcknowledgement(request: QueryPacketAcknowledgementRequest, useInterfaces: boolean = true): Promise<QueryPacketAcknowledgementResponse> {
    const data = QueryPacketAcknowledgementRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketAcknowledgement", data);
    return promise.then(data => QueryPacketAcknowledgementResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  packetAcknowledgements(request: QueryPacketAcknowledgementsRequest, useInterfaces: boolean = true): Promise<QueryPacketAcknowledgementsResponse> {
    const data = QueryPacketAcknowledgementsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketAcknowledgements", data);
    return promise.then(data => QueryPacketAcknowledgementsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unreceivedPackets(request: QueryUnreceivedPacketsRequest, useInterfaces: boolean = true): Promise<QueryUnreceivedPacketsResponse> {
    const data = QueryUnreceivedPacketsRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "UnreceivedPackets", data);
    return promise.then(data => QueryUnreceivedPacketsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unreceivedAcks(request: QueryUnreceivedAcksRequest, useInterfaces: boolean = true): Promise<QueryUnreceivedAcksResponse> {
    const data = QueryUnreceivedAcksRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "UnreceivedAcks", data);
    return promise.then(data => QueryUnreceivedAcksResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  nextSequenceReceive(request: QueryNextSequenceReceiveRequest, useInterfaces: boolean = true): Promise<QueryNextSequenceReceiveResponse> {
    const data = QueryNextSequenceReceiveRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "NextSequenceReceive", data);
    return promise.then(data => QueryNextSequenceReceiveResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  nextSequenceSend(request: QueryNextSequenceSendRequest, useInterfaces: boolean = true): Promise<QueryNextSequenceSendResponse> {
    const data = QueryNextSequenceSendRequest.encode(request).finish();
    const promise = this.rpc.request("ibc.core.channel.v1.Query", "NextSequenceSend", data);
    return promise.then(data => QueryNextSequenceSendResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    channel(request: QueryChannelRequest, useInterfaces: boolean = true): Promise<QueryChannelResponse> {
      return queryService.channel(request, useInterfaces);
    },
    channels(request?: QueryChannelsRequest, useInterfaces: boolean = true): Promise<QueryChannelsResponse> {
      return queryService.channels(request, useInterfaces);
    },
    connectionChannels(request: QueryConnectionChannelsRequest, useInterfaces: boolean = true): Promise<QueryConnectionChannelsResponse> {
      return queryService.connectionChannels(request, useInterfaces);
    },
    channelClientState(request: QueryChannelClientStateRequest, useInterfaces: boolean = true): Promise<QueryChannelClientStateResponse> {
      return queryService.channelClientState(request, useInterfaces);
    },
    channelConsensusState(request: QueryChannelConsensusStateRequest, useInterfaces: boolean = true): Promise<QueryChannelConsensusStateResponse> {
      return queryService.channelConsensusState(request, useInterfaces);
    },
    packetCommitment(request: QueryPacketCommitmentRequest, useInterfaces: boolean = true): Promise<QueryPacketCommitmentResponse> {
      return queryService.packetCommitment(request, useInterfaces);
    },
    packetCommitments(request: QueryPacketCommitmentsRequest, useInterfaces: boolean = true): Promise<QueryPacketCommitmentsResponse> {
      return queryService.packetCommitments(request, useInterfaces);
    },
    packetReceipt(request: QueryPacketReceiptRequest, useInterfaces: boolean = true): Promise<QueryPacketReceiptResponse> {
      return queryService.packetReceipt(request, useInterfaces);
    },
    packetAcknowledgement(request: QueryPacketAcknowledgementRequest, useInterfaces: boolean = true): Promise<QueryPacketAcknowledgementResponse> {
      return queryService.packetAcknowledgement(request, useInterfaces);
    },
    packetAcknowledgements(request: QueryPacketAcknowledgementsRequest, useInterfaces: boolean = true): Promise<QueryPacketAcknowledgementsResponse> {
      return queryService.packetAcknowledgements(request, useInterfaces);
    },
    unreceivedPackets(request: QueryUnreceivedPacketsRequest, useInterfaces: boolean = true): Promise<QueryUnreceivedPacketsResponse> {
      return queryService.unreceivedPackets(request, useInterfaces);
    },
    unreceivedAcks(request: QueryUnreceivedAcksRequest, useInterfaces: boolean = true): Promise<QueryUnreceivedAcksResponse> {
      return queryService.unreceivedAcks(request, useInterfaces);
    },
    nextSequenceReceive(request: QueryNextSequenceReceiveRequest, useInterfaces: boolean = true): Promise<QueryNextSequenceReceiveResponse> {
      return queryService.nextSequenceReceive(request, useInterfaces);
    },
    nextSequenceSend(request: QueryNextSequenceSendRequest, useInterfaces: boolean = true): Promise<QueryNextSequenceSendResponse> {
      return queryService.nextSequenceSend(request, useInterfaces);
    }
  };
};