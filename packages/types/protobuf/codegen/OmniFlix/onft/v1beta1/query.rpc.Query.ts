import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryCollectionRequest, QueryCollectionResponse, QueryIBCCollectionRequest, QueryDenomRequest, QueryDenomResponse, QueryIBCDenomRequest, QueryDenomsRequest, QueryDenomsResponse, QueryONFTRequest, QueryONFTResponse, QueryIBCDenomONFTRequest, QueryOwnerONFTsRequest, QueryOwnerONFTsResponse, QueryOwnerIBCDenomONFTsRequest, QuerySupplyRequest, QuerySupplyResponse, QueryIBCDenomSupplyRequest, QueryParamsRequest, QueryParamsResponse } from "./query";
export interface Query {
  collection(request: QueryCollectionRequest): Promise<QueryCollectionResponse>;
  iBCCollection(request: QueryIBCCollectionRequest): Promise<QueryCollectionResponse>;
  denom(request: QueryDenomRequest): Promise<QueryDenomResponse>;
  iBCDenom(request: QueryIBCDenomRequest): Promise<QueryDenomResponse>;
  denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse>;
  oNFT(request: QueryONFTRequest): Promise<QueryONFTResponse>;
  iBCDenomONFT(request: QueryIBCDenomONFTRequest): Promise<QueryONFTResponse>;
  ownerONFTs(request: QueryOwnerONFTsRequest): Promise<QueryOwnerONFTsResponse>;
  ownerIBCDenomONFTs(request: QueryOwnerIBCDenomONFTsRequest): Promise<QueryOwnerONFTsResponse>;
  supply(request: QuerySupplyRequest): Promise<QuerySupplyResponse>;
  iBCDenomSupply(request: QueryIBCDenomSupplyRequest): Promise<QuerySupplyResponse>;
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.collection = this.collection.bind(this);
    this.iBCCollection = this.iBCCollection.bind(this);
    this.denom = this.denom.bind(this);
    this.iBCDenom = this.iBCDenom.bind(this);
    this.denoms = this.denoms.bind(this);
    this.oNFT = this.oNFT.bind(this);
    this.iBCDenomONFT = this.iBCDenomONFT.bind(this);
    this.ownerONFTs = this.ownerONFTs.bind(this);
    this.ownerIBCDenomONFTs = this.ownerIBCDenomONFTs.bind(this);
    this.supply = this.supply.bind(this);
    this.iBCDenomSupply = this.iBCDenomSupply.bind(this);
    this.params = this.params.bind(this);
  }
  collection(request: QueryCollectionRequest, useInterfaces: boolean = true): Promise<QueryCollectionResponse> {
    const data = QueryCollectionRequest.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Query", "Collection", data);
    return promise.then(data => QueryCollectionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  iBCCollection(request: QueryIBCCollectionRequest, useInterfaces: boolean = true): Promise<QueryCollectionResponse> {
    const data = QueryIBCCollectionRequest.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Query", "IBCCollection", data);
    return promise.then(data => QueryCollectionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denom(request: QueryDenomRequest, useInterfaces: boolean = true): Promise<QueryDenomResponse> {
    const data = QueryDenomRequest.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Query", "Denom", data);
    return promise.then(data => QueryDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  iBCDenom(request: QueryIBCDenomRequest, useInterfaces: boolean = true): Promise<QueryDenomResponse> {
    const data = QueryIBCDenomRequest.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Query", "IBCDenom", data);
    return promise.then(data => QueryDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  denoms(request: QueryDenomsRequest, useInterfaces: boolean = true): Promise<QueryDenomsResponse> {
    const data = QueryDenomsRequest.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Query", "Denoms", data);
    return promise.then(data => QueryDenomsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  oNFT(request: QueryONFTRequest, useInterfaces: boolean = true): Promise<QueryONFTResponse> {
    const data = QueryONFTRequest.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Query", "ONFT", data);
    return promise.then(data => QueryONFTResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  iBCDenomONFT(request: QueryIBCDenomONFTRequest, useInterfaces: boolean = true): Promise<QueryONFTResponse> {
    const data = QueryIBCDenomONFTRequest.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Query", "IBCDenomONFT", data);
    return promise.then(data => QueryONFTResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  ownerONFTs(request: QueryOwnerONFTsRequest, useInterfaces: boolean = true): Promise<QueryOwnerONFTsResponse> {
    const data = QueryOwnerONFTsRequest.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Query", "OwnerONFTs", data);
    return promise.then(data => QueryOwnerONFTsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  ownerIBCDenomONFTs(request: QueryOwnerIBCDenomONFTsRequest, useInterfaces: boolean = true): Promise<QueryOwnerONFTsResponse> {
    const data = QueryOwnerIBCDenomONFTsRequest.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Query", "OwnerIBCDenomONFTs", data);
    return promise.then(data => QueryOwnerONFTsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  supply(request: QuerySupplyRequest, useInterfaces: boolean = true): Promise<QuerySupplyResponse> {
    const data = QuerySupplyRequest.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Query", "Supply", data);
    return promise.then(data => QuerySupplyResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  iBCDenomSupply(request: QueryIBCDenomSupplyRequest, useInterfaces: boolean = true): Promise<QuerySupplyResponse> {
    const data = QueryIBCDenomSupplyRequest.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Query", "IBCDenomSupply", data);
    return promise.then(data => QuerySupplyResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  params(request: QueryParamsRequest = {}, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    collection(request: QueryCollectionRequest, useInterfaces: boolean = true): Promise<QueryCollectionResponse> {
      return queryService.collection(request, useInterfaces);
    },
    iBCCollection(request: QueryIBCCollectionRequest, useInterfaces: boolean = true): Promise<QueryCollectionResponse> {
      return queryService.iBCCollection(request, useInterfaces);
    },
    denom(request: QueryDenomRequest, useInterfaces: boolean = true): Promise<QueryDenomResponse> {
      return queryService.denom(request, useInterfaces);
    },
    iBCDenom(request: QueryIBCDenomRequest, useInterfaces: boolean = true): Promise<QueryDenomResponse> {
      return queryService.iBCDenom(request, useInterfaces);
    },
    denoms(request: QueryDenomsRequest, useInterfaces: boolean = true): Promise<QueryDenomsResponse> {
      return queryService.denoms(request, useInterfaces);
    },
    oNFT(request: QueryONFTRequest, useInterfaces: boolean = true): Promise<QueryONFTResponse> {
      return queryService.oNFT(request, useInterfaces);
    },
    iBCDenomONFT(request: QueryIBCDenomONFTRequest, useInterfaces: boolean = true): Promise<QueryONFTResponse> {
      return queryService.iBCDenomONFT(request, useInterfaces);
    },
    ownerONFTs(request: QueryOwnerONFTsRequest, useInterfaces: boolean = true): Promise<QueryOwnerONFTsResponse> {
      return queryService.ownerONFTs(request, useInterfaces);
    },
    ownerIBCDenomONFTs(request: QueryOwnerIBCDenomONFTsRequest, useInterfaces: boolean = true): Promise<QueryOwnerONFTsResponse> {
      return queryService.ownerIBCDenomONFTs(request, useInterfaces);
    },
    supply(request: QuerySupplyRequest, useInterfaces: boolean = true): Promise<QuerySupplyResponse> {
      return queryService.supply(request, useInterfaces);
    },
    iBCDenomSupply(request: QueryIBCDenomSupplyRequest, useInterfaces: boolean = true): Promise<QuerySupplyResponse> {
      return queryService.iBCDenomSupply(request, useInterfaces);
    },
    params(request?: QueryParamsRequest, useInterfaces: boolean = true): Promise<QueryParamsResponse> {
      return queryService.params(request, useInterfaces);
    }
  };
};