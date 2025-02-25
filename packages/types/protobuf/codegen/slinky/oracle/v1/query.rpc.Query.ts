import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { GetAllCurrencyPairsRequest, GetAllCurrencyPairsResponse, GetPriceRequest, GetPriceResponse, GetPricesRequest, GetPricesResponse, GetCurrencyPairMappingRequest, GetCurrencyPairMappingResponse, GetCurrencyPairMappingListRequest, GetCurrencyPairMappingListResponse } from "./query";
/** Query is the query service for the x/oracle module. */
export interface Query {
  /** Get all the currency pairs the x/oracle module is tracking price-data for. */
  getAllCurrencyPairs(request?: GetAllCurrencyPairsRequest): Promise<GetAllCurrencyPairsResponse>;
  /**
   * Given a CurrencyPair (or its identifier) return the latest QuotePrice for
   * that CurrencyPair.
   */
  getPrice(request: GetPriceRequest): Promise<GetPriceResponse>;
  getPrices(request: GetPricesRequest): Promise<GetPricesResponse>;
  /**
   * Get the mapping of currency pair ID -> currency pair. This is useful for
   * indexers that have access to the ID of a currency pair, but no way to get
   * the underlying currency pair from it.
   */
  getCurrencyPairMapping(request?: GetCurrencyPairMappingRequest): Promise<GetCurrencyPairMappingResponse>;
  /**
   * Get the mapping of currency pair ID <-> currency pair as a list. This is
   * useful for indexers that have access to the ID of a currency pair, but no
   * way to get the underlying currency pair from it.
   */
  getCurrencyPairMappingList(request?: GetCurrencyPairMappingListRequest): Promise<GetCurrencyPairMappingListResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.getAllCurrencyPairs = this.getAllCurrencyPairs.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.getPrices = this.getPrices.bind(this);
    this.getCurrencyPairMapping = this.getCurrencyPairMapping.bind(this);
    this.getCurrencyPairMappingList = this.getCurrencyPairMappingList.bind(this);
  }
  getAllCurrencyPairs(request: GetAllCurrencyPairsRequest = {}, useInterfaces: boolean = true): Promise<GetAllCurrencyPairsResponse> {
    const data = GetAllCurrencyPairsRequest.encode(request).finish();
    const promise = this.rpc.request("slinky.oracle.v1.Query", "GetAllCurrencyPairs", data);
    return promise.then(data => GetAllCurrencyPairsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getPrice(request: GetPriceRequest, useInterfaces: boolean = true): Promise<GetPriceResponse> {
    const data = GetPriceRequest.encode(request).finish();
    const promise = this.rpc.request("slinky.oracle.v1.Query", "GetPrice", data);
    return promise.then(data => GetPriceResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getPrices(request: GetPricesRequest, useInterfaces: boolean = true): Promise<GetPricesResponse> {
    const data = GetPricesRequest.encode(request).finish();
    const promise = this.rpc.request("slinky.oracle.v1.Query", "GetPrices", data);
    return promise.then(data => GetPricesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getCurrencyPairMapping(request: GetCurrencyPairMappingRequest = {}, useInterfaces: boolean = true): Promise<GetCurrencyPairMappingResponse> {
    const data = GetCurrencyPairMappingRequest.encode(request).finish();
    const promise = this.rpc.request("slinky.oracle.v1.Query", "GetCurrencyPairMapping", data);
    return promise.then(data => GetCurrencyPairMappingResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  getCurrencyPairMappingList(request: GetCurrencyPairMappingListRequest = {}, useInterfaces: boolean = true): Promise<GetCurrencyPairMappingListResponse> {
    const data = GetCurrencyPairMappingListRequest.encode(request).finish();
    const promise = this.rpc.request("slinky.oracle.v1.Query", "GetCurrencyPairMappingList", data);
    return promise.then(data => GetCurrencyPairMappingListResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    getAllCurrencyPairs(request?: GetAllCurrencyPairsRequest, useInterfaces: boolean = true): Promise<GetAllCurrencyPairsResponse> {
      return queryService.getAllCurrencyPairs(request, useInterfaces);
    },
    getPrice(request: GetPriceRequest, useInterfaces: boolean = true): Promise<GetPriceResponse> {
      return queryService.getPrice(request, useInterfaces);
    },
    getPrices(request: GetPricesRequest, useInterfaces: boolean = true): Promise<GetPricesResponse> {
      return queryService.getPrices(request, useInterfaces);
    },
    getCurrencyPairMapping(request?: GetCurrencyPairMappingRequest, useInterfaces: boolean = true): Promise<GetCurrencyPairMappingResponse> {
      return queryService.getCurrencyPairMapping(request, useInterfaces);
    },
    getCurrencyPairMappingList(request?: GetCurrencyPairMappingListRequest, useInterfaces: boolean = true): Promise<GetCurrencyPairMappingListResponse> {
      return queryService.getCurrencyPairMappingList(request, useInterfaces);
    }
  };
};