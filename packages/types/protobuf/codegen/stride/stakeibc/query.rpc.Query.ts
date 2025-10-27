import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryParamsRequest, QueryParamsResponse, QueryGetValidatorsRequest, QueryGetValidatorsResponse, QueryGetHostZoneRequest, QueryGetHostZoneResponse, QueryAllHostZoneRequest, QueryAllHostZoneResponse, QueryModuleAddressRequest, QueryModuleAddressResponse, QueryInterchainAccountFromAddressRequest, QueryInterchainAccountFromAddressResponse, QueryGetEpochTrackerRequest, QueryGetEpochTrackerResponse, QueryAllEpochTrackerRequest, QueryAllEpochTrackerResponse, QueryGetNextPacketSequenceRequest, QueryGetNextPacketSequenceResponse, QueryAddressUnbondings, QueryAddressUnbondingsResponse, QueryAllTradeRoutes, QueryAllTradeRoutesResponse } from "./query";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a Validator by host zone. */
  validators(request: QueryGetValidatorsRequest): Promise<QueryGetValidatorsResponse>;
  /** Queries a HostZone by id. */
  hostZone(request: QueryGetHostZoneRequest): Promise<QueryGetHostZoneResponse>;
  /** Queries a list of HostZone items. */
  hostZoneAll(request?: QueryAllHostZoneRequest): Promise<QueryAllHostZoneResponse>;
  /** Queries a list of ModuleAddress items. */
  moduleAddress(request: QueryModuleAddressRequest): Promise<QueryModuleAddressResponse>;
  /**
   * QueryInterchainAccountFromAddress returns the interchain account for given
   * owner address on a given connection pair
   */
  interchainAccountFromAddress(request: QueryInterchainAccountFromAddressRequest): Promise<QueryInterchainAccountFromAddressResponse>;
  /** Queries a EpochTracker by index. */
  epochTracker(request: QueryGetEpochTrackerRequest): Promise<QueryGetEpochTrackerResponse>;
  /** Queries a list of EpochTracker items. */
  epochTrackerAll(request?: QueryAllEpochTrackerRequest): Promise<QueryAllEpochTrackerResponse>;
  /** Queries the next packet sequence for one for a given channel */
  nextPacketSequence(request: QueryGetNextPacketSequenceRequest): Promise<QueryGetNextPacketSequenceResponse>;
  /** Queries an address's unbondings */
  addressUnbondings(request: QueryAddressUnbondings): Promise<QueryAddressUnbondingsResponse>;
  /** Queries all trade routes */
  allTradeRoutes(request?: QueryAllTradeRoutes): Promise<QueryAllTradeRoutesResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.validators = this.validators.bind(this);
    this.hostZone = this.hostZone.bind(this);
    this.hostZoneAll = this.hostZoneAll.bind(this);
    this.moduleAddress = this.moduleAddress.bind(this);
    this.interchainAccountFromAddress = this.interchainAccountFromAddress.bind(this);
    this.epochTracker = this.epochTracker.bind(this);
    this.epochTrackerAll = this.epochTrackerAll.bind(this);
    this.nextPacketSequence = this.nextPacketSequence.bind(this);
    this.addressUnbondings = this.addressUnbondings.bind(this);
    this.allTradeRoutes = this.allTradeRoutes.bind(this);
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  validators(request: QueryGetValidatorsRequest, useInterfaces: boolean = true): Promise<QueryGetValidatorsResponse> {
    const data = QueryGetValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Query", "Validators", data);
    return promise.then(data => QueryGetValidatorsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hostZone(request: QueryGetHostZoneRequest, useInterfaces: boolean = true): Promise<QueryGetHostZoneResponse> {
    const data = QueryGetHostZoneRequest.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Query", "HostZone", data);
    return promise.then(data => QueryGetHostZoneResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  hostZoneAll(request: QueryAllHostZoneRequest = {
    pagination: undefined
  }, useInterfaces: boolean = true): Promise<QueryAllHostZoneResponse> {
    const data = QueryAllHostZoneRequest.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Query", "HostZoneAll", data);
    return promise.then(data => QueryAllHostZoneResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  moduleAddress(request: QueryModuleAddressRequest, useInterfaces: boolean = true): Promise<QueryModuleAddressResponse> {
    const data = QueryModuleAddressRequest.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Query", "ModuleAddress", data);
    return promise.then(data => QueryModuleAddressResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  interchainAccountFromAddress(request: QueryInterchainAccountFromAddressRequest, useInterfaces: boolean = true): Promise<QueryInterchainAccountFromAddressResponse> {
    const data = QueryInterchainAccountFromAddressRequest.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Query", "InterchainAccountFromAddress", data);
    return promise.then(data => QueryInterchainAccountFromAddressResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  epochTracker(request: QueryGetEpochTrackerRequest, useInterfaces: boolean = true): Promise<QueryGetEpochTrackerResponse> {
    const data = QueryGetEpochTrackerRequest.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Query", "EpochTracker", data);
    return promise.then(data => QueryGetEpochTrackerResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  epochTrackerAll(request: QueryAllEpochTrackerRequest = {}, useInterfaces: boolean = true): Promise<QueryAllEpochTrackerResponse> {
    const data = QueryAllEpochTrackerRequest.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Query", "EpochTrackerAll", data);
    return promise.then(data => QueryAllEpochTrackerResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  nextPacketSequence(request: QueryGetNextPacketSequenceRequest, useInterfaces: boolean = true): Promise<QueryGetNextPacketSequenceResponse> {
    const data = QueryGetNextPacketSequenceRequest.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Query", "NextPacketSequence", data);
    return promise.then(data => QueryGetNextPacketSequenceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addressUnbondings(request: QueryAddressUnbondings, useInterfaces: boolean = true): Promise<QueryAddressUnbondingsResponse> {
    const data = QueryAddressUnbondings.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Query", "AddressUnbondings", data);
    return promise.then(data => QueryAddressUnbondingsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  allTradeRoutes(request: QueryAllTradeRoutes = {}, useInterfaces: boolean = true): Promise<QueryAllTradeRoutesResponse> {
    const data = QueryAllTradeRoutes.encode(request).finish();
    const promise = this.rpc.request("stride.stakeibc.Query", "AllTradeRoutes", data);
    return promise.then(data => QueryAllTradeRoutesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    },
    validators(request: QueryGetValidatorsRequest, useInterfaces: boolean = true): Promise<QueryGetValidatorsResponse> {
      return queryService.validators(request, useInterfaces);
    },
    hostZone(request: QueryGetHostZoneRequest, useInterfaces: boolean = true): Promise<QueryGetHostZoneResponse> {
      return queryService.hostZone(request, useInterfaces);
    },
    hostZoneAll(request?: QueryAllHostZoneRequest, useInterfaces: boolean = true): Promise<QueryAllHostZoneResponse> {
      return queryService.hostZoneAll(request, useInterfaces);
    },
    moduleAddress(request: QueryModuleAddressRequest, useInterfaces: boolean = true): Promise<QueryModuleAddressResponse> {
      return queryService.moduleAddress(request, useInterfaces);
    },
    interchainAccountFromAddress(request: QueryInterchainAccountFromAddressRequest, useInterfaces: boolean = true): Promise<QueryInterchainAccountFromAddressResponse> {
      return queryService.interchainAccountFromAddress(request, useInterfaces);
    },
    epochTracker(request: QueryGetEpochTrackerRequest, useInterfaces: boolean = true): Promise<QueryGetEpochTrackerResponse> {
      return queryService.epochTracker(request, useInterfaces);
    },
    epochTrackerAll(request?: QueryAllEpochTrackerRequest, useInterfaces: boolean = true): Promise<QueryAllEpochTrackerResponse> {
      return queryService.epochTrackerAll(request, useInterfaces);
    },
    nextPacketSequence(request: QueryGetNextPacketSequenceRequest, useInterfaces: boolean = true): Promise<QueryGetNextPacketSequenceResponse> {
      return queryService.nextPacketSequence(request, useInterfaces);
    },
    addressUnbondings(request: QueryAddressUnbondings, useInterfaces: boolean = true): Promise<QueryAddressUnbondingsResponse> {
      return queryService.addressUnbondings(request, useInterfaces);
    },
    allTradeRoutes(request?: QueryAllTradeRoutes, useInterfaces: boolean = true): Promise<QueryAllTradeRoutesResponse> {
      return queryService.allTradeRoutes(request, useInterfaces);
    }
  };
};