//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { RouteStatistics, RouteStatisticsAmino, RouteStatisticsSDKType, TokenPairArbRoutes, TokenPairArbRoutesAmino, TokenPairArbRoutesSDKType, InfoByPoolType, InfoByPoolTypeAmino, InfoByPoolTypeSDKType, BaseDenom, BaseDenomAmino, BaseDenomSDKType, AllProtocolRevenue, AllProtocolRevenueAmino, AllProtocolRevenueSDKType } from "./protorev";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "osmosis/protorev/query-params-request";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "osmosis/protorev/query-params-response";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
/**
 * QueryGetProtoRevNumberOfTradesRequest is request type for the
 * Query/GetProtoRevNumberOfTrades RPC method.
 */
export interface QueryGetProtoRevNumberOfTradesRequest {}
export interface QueryGetProtoRevNumberOfTradesRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevNumberOfTradesRequest";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevNumberOfTradesRequest is request type for the
 * Query/GetProtoRevNumberOfTrades RPC method.
 */
export interface QueryGetProtoRevNumberOfTradesRequestAmino {}
export interface QueryGetProtoRevNumberOfTradesRequestAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-number-of-trades-request";
  value: QueryGetProtoRevNumberOfTradesRequestAmino;
}
/**
 * QueryGetProtoRevNumberOfTradesRequest is request type for the
 * Query/GetProtoRevNumberOfTrades RPC method.
 */
export interface QueryGetProtoRevNumberOfTradesRequestSDKType {}
/**
 * QueryGetProtoRevNumberOfTradesResponse is response type for the
 * Query/GetProtoRevNumberOfTrades RPC method.
 */
export interface QueryGetProtoRevNumberOfTradesResponse {
  /** number_of_trades is the number of trades the module has executed */
  numberOfTrades: string;
}
export interface QueryGetProtoRevNumberOfTradesResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevNumberOfTradesResponse";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevNumberOfTradesResponse is response type for the
 * Query/GetProtoRevNumberOfTrades RPC method.
 */
export interface QueryGetProtoRevNumberOfTradesResponseAmino {
  /** number_of_trades is the number of trades the module has executed */
  number_of_trades?: string;
}
export interface QueryGetProtoRevNumberOfTradesResponseAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-number-of-trades-response";
  value: QueryGetProtoRevNumberOfTradesResponseAmino;
}
/**
 * QueryGetProtoRevNumberOfTradesResponse is response type for the
 * Query/GetProtoRevNumberOfTrades RPC method.
 */
export interface QueryGetProtoRevNumberOfTradesResponseSDKType {
  number_of_trades: string;
}
/**
 * QueryGetProtoRevProfitsByDenomRequest is request type for the
 * Query/GetProtoRevProfitsByDenom RPC method.
 */
export interface QueryGetProtoRevProfitsByDenomRequest {
  /** denom is the denom to query profits by */
  denom: string;
}
export interface QueryGetProtoRevProfitsByDenomRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevProfitsByDenomRequest";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevProfitsByDenomRequest is request type for the
 * Query/GetProtoRevProfitsByDenom RPC method.
 */
export interface QueryGetProtoRevProfitsByDenomRequestAmino {
  /** denom is the denom to query profits by */
  denom?: string;
}
export interface QueryGetProtoRevProfitsByDenomRequestAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-profits-by-denom-request";
  value: QueryGetProtoRevProfitsByDenomRequestAmino;
}
/**
 * QueryGetProtoRevProfitsByDenomRequest is request type for the
 * Query/GetProtoRevProfitsByDenom RPC method.
 */
export interface QueryGetProtoRevProfitsByDenomRequestSDKType {
  denom: string;
}
/**
 * QueryGetProtoRevProfitsByDenomResponse is response type for the
 * Query/GetProtoRevProfitsByDenom RPC method.
 */
export interface QueryGetProtoRevProfitsByDenomResponse {
  /** profit is the profits of the module by the selected denom */
  profit?: Coin | undefined;
}
export interface QueryGetProtoRevProfitsByDenomResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevProfitsByDenomResponse";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevProfitsByDenomResponse is response type for the
 * Query/GetProtoRevProfitsByDenom RPC method.
 */
export interface QueryGetProtoRevProfitsByDenomResponseAmino {
  /** profit is the profits of the module by the selected denom */
  profit?: CoinAmino | undefined;
}
export interface QueryGetProtoRevProfitsByDenomResponseAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-profits-by-denom-response";
  value: QueryGetProtoRevProfitsByDenomResponseAmino;
}
/**
 * QueryGetProtoRevProfitsByDenomResponse is response type for the
 * Query/GetProtoRevProfitsByDenom RPC method.
 */
export interface QueryGetProtoRevProfitsByDenomResponseSDKType {
  profit?: CoinSDKType | undefined;
}
/**
 * QueryGetProtoRevAllProfitsRequest is request type for the
 * Query/GetProtoRevAllProfits RPC method.
 */
export interface QueryGetProtoRevAllProfitsRequest {}
export interface QueryGetProtoRevAllProfitsRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllProfitsRequest";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevAllProfitsRequest is request type for the
 * Query/GetProtoRevAllProfits RPC method.
 */
export interface QueryGetProtoRevAllProfitsRequestAmino {}
export interface QueryGetProtoRevAllProfitsRequestAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-all-profits-request";
  value: QueryGetProtoRevAllProfitsRequestAmino;
}
/**
 * QueryGetProtoRevAllProfitsRequest is request type for the
 * Query/GetProtoRevAllProfits RPC method.
 */
export interface QueryGetProtoRevAllProfitsRequestSDKType {}
/**
 * QueryGetProtoRevAllProfitsResponse is response type for the
 * Query/GetProtoRevAllProfits RPC method.
 */
export interface QueryGetProtoRevAllProfitsResponse {
  /** profits is a list of all of the profits from the module */
  profits: Coin[];
}
export interface QueryGetProtoRevAllProfitsResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllProfitsResponse";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevAllProfitsResponse is response type for the
 * Query/GetProtoRevAllProfits RPC method.
 */
export interface QueryGetProtoRevAllProfitsResponseAmino {
  /** profits is a list of all of the profits from the module */
  profits?: CoinAmino[];
}
export interface QueryGetProtoRevAllProfitsResponseAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-all-profits-response";
  value: QueryGetProtoRevAllProfitsResponseAmino;
}
/**
 * QueryGetProtoRevAllProfitsResponse is response type for the
 * Query/GetProtoRevAllProfits RPC method.
 */
export interface QueryGetProtoRevAllProfitsResponseSDKType {
  profits: CoinSDKType[];
}
/**
 * QueryGetProtoRevStatisticsByPoolRequest is request type for the
 * Query/GetProtoRevStatisticsByRoute RPC method.
 */
export interface QueryGetProtoRevStatisticsByRouteRequest {
  /** route is the set of pool ids to query statistics by i.e. 1,2,3 */
  route: bigint[];
}
export interface QueryGetProtoRevStatisticsByRouteRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevStatisticsByRouteRequest";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevStatisticsByPoolRequest is request type for the
 * Query/GetProtoRevStatisticsByRoute RPC method.
 */
export interface QueryGetProtoRevStatisticsByRouteRequestAmino {
  /** route is the set of pool ids to query statistics by i.e. 1,2,3 */
  route?: string[];
}
export interface QueryGetProtoRevStatisticsByRouteRequestAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-statistics-by-route-request";
  value: QueryGetProtoRevStatisticsByRouteRequestAmino;
}
/**
 * QueryGetProtoRevStatisticsByPoolRequest is request type for the
 * Query/GetProtoRevStatisticsByRoute RPC method.
 */
export interface QueryGetProtoRevStatisticsByRouteRequestSDKType {
  route: bigint[];
}
/**
 * QueryGetProtoRevStatisticsByRouteResponse is response type for the
 * Query/GetProtoRevStatisticsByRoute RPC method.
 */
export interface QueryGetProtoRevStatisticsByRouteResponse {
  /**
   * statistics contains the number of trades the module has executed after a
   * swap on a given pool and the profits from the trades
   */
  statistics: RouteStatistics | undefined;
}
export interface QueryGetProtoRevStatisticsByRouteResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevStatisticsByRouteResponse";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevStatisticsByRouteResponse is response type for the
 * Query/GetProtoRevStatisticsByRoute RPC method.
 */
export interface QueryGetProtoRevStatisticsByRouteResponseAmino {
  /**
   * statistics contains the number of trades the module has executed after a
   * swap on a given pool and the profits from the trades
   */
  statistics?: RouteStatisticsAmino | undefined;
}
export interface QueryGetProtoRevStatisticsByRouteResponseAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-statistics-by-route-response";
  value: QueryGetProtoRevStatisticsByRouteResponseAmino;
}
/**
 * QueryGetProtoRevStatisticsByRouteResponse is response type for the
 * Query/GetProtoRevStatisticsByRoute RPC method.
 */
export interface QueryGetProtoRevStatisticsByRouteResponseSDKType {
  statistics: RouteStatisticsSDKType | undefined;
}
/**
 * QueryGetProtoRevAllRouteStatisticsRequest is request type for the
 * Query/GetProtoRevAllRouteStatistics RPC method.
 */
export interface QueryGetProtoRevAllRouteStatisticsRequest {}
export interface QueryGetProtoRevAllRouteStatisticsRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllRouteStatisticsRequest";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevAllRouteStatisticsRequest is request type for the
 * Query/GetProtoRevAllRouteStatistics RPC method.
 */
export interface QueryGetProtoRevAllRouteStatisticsRequestAmino {}
export interface QueryGetProtoRevAllRouteStatisticsRequestAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-all-route-statistics-request";
  value: QueryGetProtoRevAllRouteStatisticsRequestAmino;
}
/**
 * QueryGetProtoRevAllRouteStatisticsRequest is request type for the
 * Query/GetProtoRevAllRouteStatistics RPC method.
 */
export interface QueryGetProtoRevAllRouteStatisticsRequestSDKType {}
/**
 * QueryGetProtoRevAllRouteStatisticsResponse is response type for the
 * Query/GetProtoRevAllRouteStatistics RPC method.
 */
export interface QueryGetProtoRevAllRouteStatisticsResponse {
  /**
   * statistics contains the number of trades/profits the module has executed on
   * all routes it has successfully executed a trade on
   */
  statistics: RouteStatistics[];
}
export interface QueryGetProtoRevAllRouteStatisticsResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllRouteStatisticsResponse";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevAllRouteStatisticsResponse is response type for the
 * Query/GetProtoRevAllRouteStatistics RPC method.
 */
export interface QueryGetProtoRevAllRouteStatisticsResponseAmino {
  /**
   * statistics contains the number of trades/profits the module has executed on
   * all routes it has successfully executed a trade on
   */
  statistics?: RouteStatisticsAmino[];
}
export interface QueryGetProtoRevAllRouteStatisticsResponseAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-all-route-statistics-response";
  value: QueryGetProtoRevAllRouteStatisticsResponseAmino;
}
/**
 * QueryGetProtoRevAllRouteStatisticsResponse is response type for the
 * Query/GetProtoRevAllRouteStatistics RPC method.
 */
export interface QueryGetProtoRevAllRouteStatisticsResponseSDKType {
  statistics: RouteStatisticsSDKType[];
}
/**
 * QueryGetProtoRevTokenPairArbRoutesRequest is request type for the
 * Query/GetProtoRevTokenPairArbRoutes RPC method.
 */
export interface QueryGetProtoRevTokenPairArbRoutesRequest {}
export interface QueryGetProtoRevTokenPairArbRoutesRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevTokenPairArbRoutesRequest";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevTokenPairArbRoutesRequest is request type for the
 * Query/GetProtoRevTokenPairArbRoutes RPC method.
 */
export interface QueryGetProtoRevTokenPairArbRoutesRequestAmino {}
export interface QueryGetProtoRevTokenPairArbRoutesRequestAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-token-pair-arb-routes-request";
  value: QueryGetProtoRevTokenPairArbRoutesRequestAmino;
}
/**
 * QueryGetProtoRevTokenPairArbRoutesRequest is request type for the
 * Query/GetProtoRevTokenPairArbRoutes RPC method.
 */
export interface QueryGetProtoRevTokenPairArbRoutesRequestSDKType {}
/**
 * QueryGetProtoRevTokenPairArbRoutesResponse is response type for the
 * Query/GetProtoRevTokenPairArbRoutes RPC method.
 */
export interface QueryGetProtoRevTokenPairArbRoutesResponse {
  /**
   * routes is a list of all of the hot routes that the module is currently
   * arbitraging
   */
  routes: TokenPairArbRoutes[];
}
export interface QueryGetProtoRevTokenPairArbRoutesResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevTokenPairArbRoutesResponse";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevTokenPairArbRoutesResponse is response type for the
 * Query/GetProtoRevTokenPairArbRoutes RPC method.
 */
export interface QueryGetProtoRevTokenPairArbRoutesResponseAmino {
  /**
   * routes is a list of all of the hot routes that the module is currently
   * arbitraging
   */
  routes?: TokenPairArbRoutesAmino[];
}
export interface QueryGetProtoRevTokenPairArbRoutesResponseAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-token-pair-arb-routes-response";
  value: QueryGetProtoRevTokenPairArbRoutesResponseAmino;
}
/**
 * QueryGetProtoRevTokenPairArbRoutesResponse is response type for the
 * Query/GetProtoRevTokenPairArbRoutes RPC method.
 */
export interface QueryGetProtoRevTokenPairArbRoutesResponseSDKType {
  routes: TokenPairArbRoutesSDKType[];
}
/**
 * QueryGetProtoRevAdminAccountRequest is request type for the
 * Query/GetProtoRevAdminAccount RPC method.
 */
export interface QueryGetProtoRevAdminAccountRequest {}
export interface QueryGetProtoRevAdminAccountRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAdminAccountRequest";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevAdminAccountRequest is request type for the
 * Query/GetProtoRevAdminAccount RPC method.
 */
export interface QueryGetProtoRevAdminAccountRequestAmino {}
export interface QueryGetProtoRevAdminAccountRequestAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-admin-account-request";
  value: QueryGetProtoRevAdminAccountRequestAmino;
}
/**
 * QueryGetProtoRevAdminAccountRequest is request type for the
 * Query/GetProtoRevAdminAccount RPC method.
 */
export interface QueryGetProtoRevAdminAccountRequestSDKType {}
/**
 * QueryGetProtoRevAdminAccountResponse is response type for the
 * Query/GetProtoRevAdminAccount RPC method.
 */
export interface QueryGetProtoRevAdminAccountResponse {
  /** admin_account is the admin account of the module */
  adminAccount: string;
}
export interface QueryGetProtoRevAdminAccountResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAdminAccountResponse";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevAdminAccountResponse is response type for the
 * Query/GetProtoRevAdminAccount RPC method.
 */
export interface QueryGetProtoRevAdminAccountResponseAmino {
  /** admin_account is the admin account of the module */
  admin_account?: string;
}
export interface QueryGetProtoRevAdminAccountResponseAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-admin-account-response";
  value: QueryGetProtoRevAdminAccountResponseAmino;
}
/**
 * QueryGetProtoRevAdminAccountResponse is response type for the
 * Query/GetProtoRevAdminAccount RPC method.
 */
export interface QueryGetProtoRevAdminAccountResponseSDKType {
  admin_account: string;
}
/**
 * QueryGetProtoRevDeveloperAccountRequest is request type for the
 * Query/GetProtoRevDeveloperAccount RPC method.
 */
export interface QueryGetProtoRevDeveloperAccountRequest {}
export interface QueryGetProtoRevDeveloperAccountRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevDeveloperAccountRequest";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevDeveloperAccountRequest is request type for the
 * Query/GetProtoRevDeveloperAccount RPC method.
 */
export interface QueryGetProtoRevDeveloperAccountRequestAmino {}
export interface QueryGetProtoRevDeveloperAccountRequestAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-developer-account-request";
  value: QueryGetProtoRevDeveloperAccountRequestAmino;
}
/**
 * QueryGetProtoRevDeveloperAccountRequest is request type for the
 * Query/GetProtoRevDeveloperAccount RPC method.
 */
export interface QueryGetProtoRevDeveloperAccountRequestSDKType {}
/**
 * QueryGetProtoRevDeveloperAccountResponse is response type for the
 * Query/GetProtoRevDeveloperAccount RPC method.
 */
export interface QueryGetProtoRevDeveloperAccountResponse {
  /** developer_account is the developer account of the module */
  developerAccount: string;
}
export interface QueryGetProtoRevDeveloperAccountResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevDeveloperAccountResponse";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevDeveloperAccountResponse is response type for the
 * Query/GetProtoRevDeveloperAccount RPC method.
 */
export interface QueryGetProtoRevDeveloperAccountResponseAmino {
  /** developer_account is the developer account of the module */
  developer_account?: string;
}
export interface QueryGetProtoRevDeveloperAccountResponseAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-developer-account-response";
  value: QueryGetProtoRevDeveloperAccountResponseAmino;
}
/**
 * QueryGetProtoRevDeveloperAccountResponse is response type for the
 * Query/GetProtoRevDeveloperAccount RPC method.
 */
export interface QueryGetProtoRevDeveloperAccountResponseSDKType {
  developer_account: string;
}
/**
 * QueryGetProtoRevInfoByPoolTypeRequest is request type for the
 * Query/GetProtoRevInfoByPoolType RPC method.
 */
export interface QueryGetProtoRevInfoByPoolTypeRequest {}
export interface QueryGetProtoRevInfoByPoolTypeRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevInfoByPoolTypeRequest";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevInfoByPoolTypeRequest is request type for the
 * Query/GetProtoRevInfoByPoolType RPC method.
 */
export interface QueryGetProtoRevInfoByPoolTypeRequestAmino {}
export interface QueryGetProtoRevInfoByPoolTypeRequestAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-info-by-pool-type-request";
  value: QueryGetProtoRevInfoByPoolTypeRequestAmino;
}
/**
 * QueryGetProtoRevInfoByPoolTypeRequest is request type for the
 * Query/GetProtoRevInfoByPoolType RPC method.
 */
export interface QueryGetProtoRevInfoByPoolTypeRequestSDKType {}
/**
 * QueryGetProtoRevInfoByPoolTypeResponse is response type for the
 * Query/GetProtoRevInfoByPoolType RPC method.
 */
export interface QueryGetProtoRevInfoByPoolTypeResponse {
  /**
   * InfoByPoolType contains all information pertaining to how different
   * pool types are handled by the module.
   */
  infoByPoolType: InfoByPoolType | undefined;
}
export interface QueryGetProtoRevInfoByPoolTypeResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevInfoByPoolTypeResponse";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevInfoByPoolTypeResponse is response type for the
 * Query/GetProtoRevInfoByPoolType RPC method.
 */
export interface QueryGetProtoRevInfoByPoolTypeResponseAmino {
  /**
   * InfoByPoolType contains all information pertaining to how different
   * pool types are handled by the module.
   */
  info_by_pool_type?: InfoByPoolTypeAmino | undefined;
}
export interface QueryGetProtoRevInfoByPoolTypeResponseAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-info-by-pool-type-response";
  value: QueryGetProtoRevInfoByPoolTypeResponseAmino;
}
/**
 * QueryGetProtoRevInfoByPoolTypeResponse is response type for the
 * Query/GetProtoRevInfoByPoolType RPC method.
 */
export interface QueryGetProtoRevInfoByPoolTypeResponseSDKType {
  info_by_pool_type: InfoByPoolTypeSDKType | undefined;
}
/**
 * QueryGetProtoRevMaxPoolPointsPerBlockRequest is request type for the
 * Query/GetProtoRevMaxPoolPointsPerBlock RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerBlockRequest {}
export interface QueryGetProtoRevMaxPoolPointsPerBlockRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevMaxPoolPointsPerBlockRequest";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevMaxPoolPointsPerBlockRequest is request type for the
 * Query/GetProtoRevMaxPoolPointsPerBlock RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerBlockRequestAmino {}
export interface QueryGetProtoRevMaxPoolPointsPerBlockRequestAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-max-pool-points-per-block-request";
  value: QueryGetProtoRevMaxPoolPointsPerBlockRequestAmino;
}
/**
 * QueryGetProtoRevMaxPoolPointsPerBlockRequest is request type for the
 * Query/GetProtoRevMaxPoolPointsPerBlock RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerBlockRequestSDKType {}
/**
 * QueryGetProtoRevMaxPoolPointsPerBlockResponse is response type for the
 * Query/GetProtoRevMaxPoolPointsPerBlock RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerBlockResponse {
  /**
   * max_pool_points_per_block is the maximum number of pool points that can be
   * consumed per block
   */
  maxPoolPointsPerBlock: bigint;
}
export interface QueryGetProtoRevMaxPoolPointsPerBlockResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevMaxPoolPointsPerBlockResponse";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevMaxPoolPointsPerBlockResponse is response type for the
 * Query/GetProtoRevMaxPoolPointsPerBlock RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerBlockResponseAmino {
  /**
   * max_pool_points_per_block is the maximum number of pool points that can be
   * consumed per block
   */
  max_pool_points_per_block?: string;
}
export interface QueryGetProtoRevMaxPoolPointsPerBlockResponseAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-max-pool-points-per-block-response";
  value: QueryGetProtoRevMaxPoolPointsPerBlockResponseAmino;
}
/**
 * QueryGetProtoRevMaxPoolPointsPerBlockResponse is response type for the
 * Query/GetProtoRevMaxPoolPointsPerBlock RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerBlockResponseSDKType {
  max_pool_points_per_block: bigint;
}
/**
 * QueryGetProtoRevMaxPoolPointsPerTxRequest is request type for the
 * Query/GetProtoRevMaxPoolPointsPerTx RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerTxRequest {}
export interface QueryGetProtoRevMaxPoolPointsPerTxRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevMaxPoolPointsPerTxRequest";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevMaxPoolPointsPerTxRequest is request type for the
 * Query/GetProtoRevMaxPoolPointsPerTx RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerTxRequestAmino {}
export interface QueryGetProtoRevMaxPoolPointsPerTxRequestAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-max-pool-points-per-tx-request";
  value: QueryGetProtoRevMaxPoolPointsPerTxRequestAmino;
}
/**
 * QueryGetProtoRevMaxPoolPointsPerTxRequest is request type for the
 * Query/GetProtoRevMaxPoolPointsPerTx RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerTxRequestSDKType {}
/**
 * QueryGetProtoRevMaxPoolPointsPerTxResponse is response type for the
 * Query/GetProtoRevMaxPoolPointsPerTx RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerTxResponse {
  /**
   * max_pool_points_per_tx is the maximum number of pool points that can be
   * consumed per transaction
   */
  maxPoolPointsPerTx: bigint;
}
export interface QueryGetProtoRevMaxPoolPointsPerTxResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevMaxPoolPointsPerTxResponse";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevMaxPoolPointsPerTxResponse is response type for the
 * Query/GetProtoRevMaxPoolPointsPerTx RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerTxResponseAmino {
  /**
   * max_pool_points_per_tx is the maximum number of pool points that can be
   * consumed per transaction
   */
  max_pool_points_per_tx?: string;
}
export interface QueryGetProtoRevMaxPoolPointsPerTxResponseAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-max-pool-points-per-tx-response";
  value: QueryGetProtoRevMaxPoolPointsPerTxResponseAmino;
}
/**
 * QueryGetProtoRevMaxPoolPointsPerTxResponse is response type for the
 * Query/GetProtoRevMaxPoolPointsPerTx RPC method.
 */
export interface QueryGetProtoRevMaxPoolPointsPerTxResponseSDKType {
  max_pool_points_per_tx: bigint;
}
/**
 * QueryGetProtoRevBaseDenomsRequest is request type for the
 * Query/GetProtoRevBaseDenoms RPC method.
 */
export interface QueryGetProtoRevBaseDenomsRequest {}
export interface QueryGetProtoRevBaseDenomsRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevBaseDenomsRequest";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevBaseDenomsRequest is request type for the
 * Query/GetProtoRevBaseDenoms RPC method.
 */
export interface QueryGetProtoRevBaseDenomsRequestAmino {}
export interface QueryGetProtoRevBaseDenomsRequestAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-base-denoms-request";
  value: QueryGetProtoRevBaseDenomsRequestAmino;
}
/**
 * QueryGetProtoRevBaseDenomsRequest is request type for the
 * Query/GetProtoRevBaseDenoms RPC method.
 */
export interface QueryGetProtoRevBaseDenomsRequestSDKType {}
/**
 * QueryGetProtoRevBaseDenomsResponse is response type for the
 * Query/GetProtoRevBaseDenoms RPC method.
 */
export interface QueryGetProtoRevBaseDenomsResponse {
  /** base_denoms is a list of all of the base denoms and step sizes */
  baseDenoms: BaseDenom[];
}
export interface QueryGetProtoRevBaseDenomsResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevBaseDenomsResponse";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevBaseDenomsResponse is response type for the
 * Query/GetProtoRevBaseDenoms RPC method.
 */
export interface QueryGetProtoRevBaseDenomsResponseAmino {
  /** base_denoms is a list of all of the base denoms and step sizes */
  base_denoms?: BaseDenomAmino[];
}
export interface QueryGetProtoRevBaseDenomsResponseAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-base-denoms-response";
  value: QueryGetProtoRevBaseDenomsResponseAmino;
}
/**
 * QueryGetProtoRevBaseDenomsResponse is response type for the
 * Query/GetProtoRevBaseDenoms RPC method.
 */
export interface QueryGetProtoRevBaseDenomsResponseSDKType {
  base_denoms: BaseDenomSDKType[];
}
/**
 * QueryGetProtoRevEnabledRequest is request type for the
 * Query/GetProtoRevEnabled RPC method.
 */
export interface QueryGetProtoRevEnabledRequest {}
export interface QueryGetProtoRevEnabledRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevEnabledRequest";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevEnabledRequest is request type for the
 * Query/GetProtoRevEnabled RPC method.
 */
export interface QueryGetProtoRevEnabledRequestAmino {}
export interface QueryGetProtoRevEnabledRequestAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-enabled-request";
  value: QueryGetProtoRevEnabledRequestAmino;
}
/**
 * QueryGetProtoRevEnabledRequest is request type for the
 * Query/GetProtoRevEnabled RPC method.
 */
export interface QueryGetProtoRevEnabledRequestSDKType {}
/**
 * QueryGetProtoRevEnabledResponse is response type for the
 * Query/GetProtoRevEnabled RPC method.
 */
export interface QueryGetProtoRevEnabledResponse {
  /** enabled is whether the module is enabled */
  enabled: boolean;
}
export interface QueryGetProtoRevEnabledResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevEnabledResponse";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevEnabledResponse is response type for the
 * Query/GetProtoRevEnabled RPC method.
 */
export interface QueryGetProtoRevEnabledResponseAmino {
  /** enabled is whether the module is enabled */
  enabled?: boolean;
}
export interface QueryGetProtoRevEnabledResponseAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-enabled-response";
  value: QueryGetProtoRevEnabledResponseAmino;
}
/**
 * QueryGetProtoRevEnabledResponse is response type for the
 * Query/GetProtoRevEnabled RPC method.
 */
export interface QueryGetProtoRevEnabledResponseSDKType {
  enabled: boolean;
}
/**
 * QueryGetProtoRevPoolRequest is request type for the
 * Query/GetProtoRevPool RPC method.
 */
export interface QueryGetProtoRevPoolRequest {
  /**
   * base_denom is the base denom set in protorev for the denom pair to pool
   * mapping
   */
  baseDenom: string;
  /** other_denom is the other denom for the denom pair to pool mapping */
  otherDenom: string;
}
export interface QueryGetProtoRevPoolRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevPoolRequest";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevPoolRequest is request type for the
 * Query/GetProtoRevPool RPC method.
 */
export interface QueryGetProtoRevPoolRequestAmino {
  /**
   * base_denom is the base denom set in protorev for the denom pair to pool
   * mapping
   */
  base_denom?: string;
  /** other_denom is the other denom for the denom pair to pool mapping */
  other_denom?: string;
}
export interface QueryGetProtoRevPoolRequestAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-pool-request";
  value: QueryGetProtoRevPoolRequestAmino;
}
/**
 * QueryGetProtoRevPoolRequest is request type for the
 * Query/GetProtoRevPool RPC method.
 */
export interface QueryGetProtoRevPoolRequestSDKType {
  base_denom: string;
  other_denom: string;
}
/**
 * QueryGetProtoRevPoolResponse is response type for the
 * Query/GetProtoRevPool RPC method.
 */
export interface QueryGetProtoRevPoolResponse {
  /** pool_id is the pool_id stored for the denom pair */
  poolId: bigint;
}
export interface QueryGetProtoRevPoolResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevPoolResponse";
  value: Uint8Array;
}
/**
 * QueryGetProtoRevPoolResponse is response type for the
 * Query/GetProtoRevPool RPC method.
 */
export interface QueryGetProtoRevPoolResponseAmino {
  /** pool_id is the pool_id stored for the denom pair */
  pool_id?: string;
}
export interface QueryGetProtoRevPoolResponseAminoMsg {
  type: "osmosis/protorev/query-get-proto-rev-pool-response";
  value: QueryGetProtoRevPoolResponseAmino;
}
/**
 * QueryGetProtoRevPoolResponse is response type for the
 * Query/GetProtoRevPool RPC method.
 */
export interface QueryGetProtoRevPoolResponseSDKType {
  pool_id: bigint;
}
export interface QueryGetAllProtocolRevenueRequest {}
export interface QueryGetAllProtocolRevenueRequestProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetAllProtocolRevenueRequest";
  value: Uint8Array;
}
export interface QueryGetAllProtocolRevenueRequestAmino {}
export interface QueryGetAllProtocolRevenueRequestAminoMsg {
  type: "osmosis/protorev/query-get-all-protocol-revenue-request";
  value: QueryGetAllProtocolRevenueRequestAmino;
}
export interface QueryGetAllProtocolRevenueRequestSDKType {}
export interface QueryGetAllProtocolRevenueResponse {
  allProtocolRevenue: AllProtocolRevenue | undefined;
}
export interface QueryGetAllProtocolRevenueResponseProtoMsg {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetAllProtocolRevenueResponse";
  value: Uint8Array;
}
export interface QueryGetAllProtocolRevenueResponseAmino {
  all_protocol_revenue?: AllProtocolRevenueAmino | undefined;
}
export interface QueryGetAllProtocolRevenueResponseAminoMsg {
  type: "osmosis/protorev/query-get-all-protocol-revenue-response";
  value: QueryGetAllProtocolRevenueResponseAmino;
}
export interface QueryGetAllProtocolRevenueResponseSDKType {
  all_protocol_revenue: AllProtocolRevenueSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-params-request",
      value: QueryParamsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg, useInterfaces: boolean = false): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-params-response",
      value: QueryParamsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg, useInterfaces: boolean = false): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevNumberOfTradesRequest(): QueryGetProtoRevNumberOfTradesRequest {
  return {};
}
export const QueryGetProtoRevNumberOfTradesRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevNumberOfTradesRequest",
  encode(_: QueryGetProtoRevNumberOfTradesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevNumberOfTradesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevNumberOfTradesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryGetProtoRevNumberOfTradesRequest>): QueryGetProtoRevNumberOfTradesRequest {
    const message = createBaseQueryGetProtoRevNumberOfTradesRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevNumberOfTradesRequestAmino): QueryGetProtoRevNumberOfTradesRequest {
    const message = createBaseQueryGetProtoRevNumberOfTradesRequest();
    return message;
  },
  toAmino(_: QueryGetProtoRevNumberOfTradesRequest, useInterfaces: boolean = false): QueryGetProtoRevNumberOfTradesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevNumberOfTradesRequestAminoMsg): QueryGetProtoRevNumberOfTradesRequest {
    return QueryGetProtoRevNumberOfTradesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevNumberOfTradesRequest, useInterfaces: boolean = false): QueryGetProtoRevNumberOfTradesRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-number-of-trades-request",
      value: QueryGetProtoRevNumberOfTradesRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevNumberOfTradesRequestProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevNumberOfTradesRequest {
    return QueryGetProtoRevNumberOfTradesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevNumberOfTradesRequest): Uint8Array {
    return QueryGetProtoRevNumberOfTradesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevNumberOfTradesRequest): QueryGetProtoRevNumberOfTradesRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevNumberOfTradesRequest",
      value: QueryGetProtoRevNumberOfTradesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevNumberOfTradesResponse(): QueryGetProtoRevNumberOfTradesResponse {
  return {
    numberOfTrades: ""
  };
}
export const QueryGetProtoRevNumberOfTradesResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevNumberOfTradesResponse",
  encode(message: QueryGetProtoRevNumberOfTradesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.numberOfTrades !== "") {
      writer.uint32(10).string(message.numberOfTrades);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevNumberOfTradesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevNumberOfTradesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.numberOfTrades = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevNumberOfTradesResponse>): QueryGetProtoRevNumberOfTradesResponse {
    const message = createBaseQueryGetProtoRevNumberOfTradesResponse();
    message.numberOfTrades = object.numberOfTrades ?? "";
    return message;
  },
  fromAmino(object: QueryGetProtoRevNumberOfTradesResponseAmino): QueryGetProtoRevNumberOfTradesResponse {
    const message = createBaseQueryGetProtoRevNumberOfTradesResponse();
    if (object.number_of_trades !== undefined && object.number_of_trades !== null) {
      message.numberOfTrades = object.number_of_trades;
    }
    return message;
  },
  toAmino(message: QueryGetProtoRevNumberOfTradesResponse, useInterfaces: boolean = false): QueryGetProtoRevNumberOfTradesResponseAmino {
    const obj: any = {};
    obj.number_of_trades = message.numberOfTrades === "" ? undefined : message.numberOfTrades;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevNumberOfTradesResponseAminoMsg): QueryGetProtoRevNumberOfTradesResponse {
    return QueryGetProtoRevNumberOfTradesResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevNumberOfTradesResponse, useInterfaces: boolean = false): QueryGetProtoRevNumberOfTradesResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-number-of-trades-response",
      value: QueryGetProtoRevNumberOfTradesResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevNumberOfTradesResponseProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevNumberOfTradesResponse {
    return QueryGetProtoRevNumberOfTradesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevNumberOfTradesResponse): Uint8Array {
    return QueryGetProtoRevNumberOfTradesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevNumberOfTradesResponse): QueryGetProtoRevNumberOfTradesResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevNumberOfTradesResponse",
      value: QueryGetProtoRevNumberOfTradesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevProfitsByDenomRequest(): QueryGetProtoRevProfitsByDenomRequest {
  return {
    denom: ""
  };
}
export const QueryGetProtoRevProfitsByDenomRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevProfitsByDenomRequest",
  encode(message: QueryGetProtoRevProfitsByDenomRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevProfitsByDenomRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevProfitsByDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevProfitsByDenomRequest>): QueryGetProtoRevProfitsByDenomRequest {
    const message = createBaseQueryGetProtoRevProfitsByDenomRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryGetProtoRevProfitsByDenomRequestAmino): QueryGetProtoRevProfitsByDenomRequest {
    const message = createBaseQueryGetProtoRevProfitsByDenomRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryGetProtoRevProfitsByDenomRequest, useInterfaces: boolean = false): QueryGetProtoRevProfitsByDenomRequestAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevProfitsByDenomRequestAminoMsg): QueryGetProtoRevProfitsByDenomRequest {
    return QueryGetProtoRevProfitsByDenomRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevProfitsByDenomRequest, useInterfaces: boolean = false): QueryGetProtoRevProfitsByDenomRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-profits-by-denom-request",
      value: QueryGetProtoRevProfitsByDenomRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevProfitsByDenomRequestProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevProfitsByDenomRequest {
    return QueryGetProtoRevProfitsByDenomRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevProfitsByDenomRequest): Uint8Array {
    return QueryGetProtoRevProfitsByDenomRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevProfitsByDenomRequest): QueryGetProtoRevProfitsByDenomRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevProfitsByDenomRequest",
      value: QueryGetProtoRevProfitsByDenomRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevProfitsByDenomResponse(): QueryGetProtoRevProfitsByDenomResponse {
  return {
    profit: undefined
  };
}
export const QueryGetProtoRevProfitsByDenomResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevProfitsByDenomResponse",
  encode(message: QueryGetProtoRevProfitsByDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.profit !== undefined) {
      Coin.encode(message.profit, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevProfitsByDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevProfitsByDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.profit = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevProfitsByDenomResponse>): QueryGetProtoRevProfitsByDenomResponse {
    const message = createBaseQueryGetProtoRevProfitsByDenomResponse();
    message.profit = object.profit !== undefined && object.profit !== null ? Coin.fromPartial(object.profit) : undefined;
    return message;
  },
  fromAmino(object: QueryGetProtoRevProfitsByDenomResponseAmino): QueryGetProtoRevProfitsByDenomResponse {
    const message = createBaseQueryGetProtoRevProfitsByDenomResponse();
    if (object.profit !== undefined && object.profit !== null) {
      message.profit = Coin.fromAmino(object.profit);
    }
    return message;
  },
  toAmino(message: QueryGetProtoRevProfitsByDenomResponse, useInterfaces: boolean = false): QueryGetProtoRevProfitsByDenomResponseAmino {
    const obj: any = {};
    obj.profit = message.profit ? Coin.toAmino(message.profit, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevProfitsByDenomResponseAminoMsg): QueryGetProtoRevProfitsByDenomResponse {
    return QueryGetProtoRevProfitsByDenomResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevProfitsByDenomResponse, useInterfaces: boolean = false): QueryGetProtoRevProfitsByDenomResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-profits-by-denom-response",
      value: QueryGetProtoRevProfitsByDenomResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevProfitsByDenomResponseProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevProfitsByDenomResponse {
    return QueryGetProtoRevProfitsByDenomResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevProfitsByDenomResponse): Uint8Array {
    return QueryGetProtoRevProfitsByDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevProfitsByDenomResponse): QueryGetProtoRevProfitsByDenomResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevProfitsByDenomResponse",
      value: QueryGetProtoRevProfitsByDenomResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevAllProfitsRequest(): QueryGetProtoRevAllProfitsRequest {
  return {};
}
export const QueryGetProtoRevAllProfitsRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllProfitsRequest",
  encode(_: QueryGetProtoRevAllProfitsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevAllProfitsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAllProfitsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryGetProtoRevAllProfitsRequest>): QueryGetProtoRevAllProfitsRequest {
    const message = createBaseQueryGetProtoRevAllProfitsRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevAllProfitsRequestAmino): QueryGetProtoRevAllProfitsRequest {
    const message = createBaseQueryGetProtoRevAllProfitsRequest();
    return message;
  },
  toAmino(_: QueryGetProtoRevAllProfitsRequest, useInterfaces: boolean = false): QueryGetProtoRevAllProfitsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevAllProfitsRequestAminoMsg): QueryGetProtoRevAllProfitsRequest {
    return QueryGetProtoRevAllProfitsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevAllProfitsRequest, useInterfaces: boolean = false): QueryGetProtoRevAllProfitsRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-all-profits-request",
      value: QueryGetProtoRevAllProfitsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevAllProfitsRequestProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevAllProfitsRequest {
    return QueryGetProtoRevAllProfitsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevAllProfitsRequest): Uint8Array {
    return QueryGetProtoRevAllProfitsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevAllProfitsRequest): QueryGetProtoRevAllProfitsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllProfitsRequest",
      value: QueryGetProtoRevAllProfitsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevAllProfitsResponse(): QueryGetProtoRevAllProfitsResponse {
  return {
    profits: []
  };
}
export const QueryGetProtoRevAllProfitsResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllProfitsResponse",
  encode(message: QueryGetProtoRevAllProfitsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.profits) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevAllProfitsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAllProfitsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.profits.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevAllProfitsResponse>): QueryGetProtoRevAllProfitsResponse {
    const message = createBaseQueryGetProtoRevAllProfitsResponse();
    message.profits = object.profits?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryGetProtoRevAllProfitsResponseAmino): QueryGetProtoRevAllProfitsResponse {
    const message = createBaseQueryGetProtoRevAllProfitsResponse();
    message.profits = object.profits?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryGetProtoRevAllProfitsResponse, useInterfaces: boolean = false): QueryGetProtoRevAllProfitsResponseAmino {
    const obj: any = {};
    if (message.profits) {
      obj.profits = message.profits.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.profits = message.profits;
    }
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevAllProfitsResponseAminoMsg): QueryGetProtoRevAllProfitsResponse {
    return QueryGetProtoRevAllProfitsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevAllProfitsResponse, useInterfaces: boolean = false): QueryGetProtoRevAllProfitsResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-all-profits-response",
      value: QueryGetProtoRevAllProfitsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevAllProfitsResponseProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevAllProfitsResponse {
    return QueryGetProtoRevAllProfitsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevAllProfitsResponse): Uint8Array {
    return QueryGetProtoRevAllProfitsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevAllProfitsResponse): QueryGetProtoRevAllProfitsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllProfitsResponse",
      value: QueryGetProtoRevAllProfitsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevStatisticsByRouteRequest(): QueryGetProtoRevStatisticsByRouteRequest {
  return {
    route: []
  };
}
export const QueryGetProtoRevStatisticsByRouteRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevStatisticsByRouteRequest",
  encode(message: QueryGetProtoRevStatisticsByRouteRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    writer.uint32(10).fork();
    for (const v of message.route) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevStatisticsByRouteRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevStatisticsByRouteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.route.push(reader.uint64());
            }
          } else {
            message.route.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevStatisticsByRouteRequest>): QueryGetProtoRevStatisticsByRouteRequest {
    const message = createBaseQueryGetProtoRevStatisticsByRouteRequest();
    message.route = object.route?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: QueryGetProtoRevStatisticsByRouteRequestAmino): QueryGetProtoRevStatisticsByRouteRequest {
    const message = createBaseQueryGetProtoRevStatisticsByRouteRequest();
    message.route = object.route?.map(e => BigInt(e)) || [];
    return message;
  },
  toAmino(message: QueryGetProtoRevStatisticsByRouteRequest, useInterfaces: boolean = false): QueryGetProtoRevStatisticsByRouteRequestAmino {
    const obj: any = {};
    if (message.route) {
      obj.route = message.route.map(e => e.toString());
    } else {
      obj.route = message.route;
    }
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevStatisticsByRouteRequestAminoMsg): QueryGetProtoRevStatisticsByRouteRequest {
    return QueryGetProtoRevStatisticsByRouteRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevStatisticsByRouteRequest, useInterfaces: boolean = false): QueryGetProtoRevStatisticsByRouteRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-statistics-by-route-request",
      value: QueryGetProtoRevStatisticsByRouteRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevStatisticsByRouteRequestProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevStatisticsByRouteRequest {
    return QueryGetProtoRevStatisticsByRouteRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevStatisticsByRouteRequest): Uint8Array {
    return QueryGetProtoRevStatisticsByRouteRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevStatisticsByRouteRequest): QueryGetProtoRevStatisticsByRouteRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevStatisticsByRouteRequest",
      value: QueryGetProtoRevStatisticsByRouteRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevStatisticsByRouteResponse(): QueryGetProtoRevStatisticsByRouteResponse {
  return {
    statistics: RouteStatistics.fromPartial({})
  };
}
export const QueryGetProtoRevStatisticsByRouteResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevStatisticsByRouteResponse",
  encode(message: QueryGetProtoRevStatisticsByRouteResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.statistics !== undefined) {
      RouteStatistics.encode(message.statistics, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevStatisticsByRouteResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevStatisticsByRouteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.statistics = RouteStatistics.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevStatisticsByRouteResponse>): QueryGetProtoRevStatisticsByRouteResponse {
    const message = createBaseQueryGetProtoRevStatisticsByRouteResponse();
    message.statistics = object.statistics !== undefined && object.statistics !== null ? RouteStatistics.fromPartial(object.statistics) : undefined;
    return message;
  },
  fromAmino(object: QueryGetProtoRevStatisticsByRouteResponseAmino): QueryGetProtoRevStatisticsByRouteResponse {
    const message = createBaseQueryGetProtoRevStatisticsByRouteResponse();
    if (object.statistics !== undefined && object.statistics !== null) {
      message.statistics = RouteStatistics.fromAmino(object.statistics);
    }
    return message;
  },
  toAmino(message: QueryGetProtoRevStatisticsByRouteResponse, useInterfaces: boolean = false): QueryGetProtoRevStatisticsByRouteResponseAmino {
    const obj: any = {};
    obj.statistics = message.statistics ? RouteStatistics.toAmino(message.statistics, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevStatisticsByRouteResponseAminoMsg): QueryGetProtoRevStatisticsByRouteResponse {
    return QueryGetProtoRevStatisticsByRouteResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevStatisticsByRouteResponse, useInterfaces: boolean = false): QueryGetProtoRevStatisticsByRouteResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-statistics-by-route-response",
      value: QueryGetProtoRevStatisticsByRouteResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevStatisticsByRouteResponseProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevStatisticsByRouteResponse {
    return QueryGetProtoRevStatisticsByRouteResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevStatisticsByRouteResponse): Uint8Array {
    return QueryGetProtoRevStatisticsByRouteResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevStatisticsByRouteResponse): QueryGetProtoRevStatisticsByRouteResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevStatisticsByRouteResponse",
      value: QueryGetProtoRevStatisticsByRouteResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevAllRouteStatisticsRequest(): QueryGetProtoRevAllRouteStatisticsRequest {
  return {};
}
export const QueryGetProtoRevAllRouteStatisticsRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllRouteStatisticsRequest",
  encode(_: QueryGetProtoRevAllRouteStatisticsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevAllRouteStatisticsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAllRouteStatisticsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryGetProtoRevAllRouteStatisticsRequest>): QueryGetProtoRevAllRouteStatisticsRequest {
    const message = createBaseQueryGetProtoRevAllRouteStatisticsRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevAllRouteStatisticsRequestAmino): QueryGetProtoRevAllRouteStatisticsRequest {
    const message = createBaseQueryGetProtoRevAllRouteStatisticsRequest();
    return message;
  },
  toAmino(_: QueryGetProtoRevAllRouteStatisticsRequest, useInterfaces: boolean = false): QueryGetProtoRevAllRouteStatisticsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevAllRouteStatisticsRequestAminoMsg): QueryGetProtoRevAllRouteStatisticsRequest {
    return QueryGetProtoRevAllRouteStatisticsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevAllRouteStatisticsRequest, useInterfaces: boolean = false): QueryGetProtoRevAllRouteStatisticsRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-all-route-statistics-request",
      value: QueryGetProtoRevAllRouteStatisticsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevAllRouteStatisticsRequestProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevAllRouteStatisticsRequest {
    return QueryGetProtoRevAllRouteStatisticsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevAllRouteStatisticsRequest): Uint8Array {
    return QueryGetProtoRevAllRouteStatisticsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevAllRouteStatisticsRequest): QueryGetProtoRevAllRouteStatisticsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllRouteStatisticsRequest",
      value: QueryGetProtoRevAllRouteStatisticsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevAllRouteStatisticsResponse(): QueryGetProtoRevAllRouteStatisticsResponse {
  return {
    statistics: []
  };
}
export const QueryGetProtoRevAllRouteStatisticsResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllRouteStatisticsResponse",
  encode(message: QueryGetProtoRevAllRouteStatisticsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.statistics) {
      RouteStatistics.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevAllRouteStatisticsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAllRouteStatisticsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.statistics.push(RouteStatistics.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevAllRouteStatisticsResponse>): QueryGetProtoRevAllRouteStatisticsResponse {
    const message = createBaseQueryGetProtoRevAllRouteStatisticsResponse();
    message.statistics = object.statistics?.map(e => RouteStatistics.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryGetProtoRevAllRouteStatisticsResponseAmino): QueryGetProtoRevAllRouteStatisticsResponse {
    const message = createBaseQueryGetProtoRevAllRouteStatisticsResponse();
    message.statistics = object.statistics?.map(e => RouteStatistics.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryGetProtoRevAllRouteStatisticsResponse, useInterfaces: boolean = false): QueryGetProtoRevAllRouteStatisticsResponseAmino {
    const obj: any = {};
    if (message.statistics) {
      obj.statistics = message.statistics.map(e => e ? RouteStatistics.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.statistics = message.statistics;
    }
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevAllRouteStatisticsResponseAminoMsg): QueryGetProtoRevAllRouteStatisticsResponse {
    return QueryGetProtoRevAllRouteStatisticsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevAllRouteStatisticsResponse, useInterfaces: boolean = false): QueryGetProtoRevAllRouteStatisticsResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-all-route-statistics-response",
      value: QueryGetProtoRevAllRouteStatisticsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevAllRouteStatisticsResponseProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevAllRouteStatisticsResponse {
    return QueryGetProtoRevAllRouteStatisticsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevAllRouteStatisticsResponse): Uint8Array {
    return QueryGetProtoRevAllRouteStatisticsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevAllRouteStatisticsResponse): QueryGetProtoRevAllRouteStatisticsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllRouteStatisticsResponse",
      value: QueryGetProtoRevAllRouteStatisticsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevTokenPairArbRoutesRequest(): QueryGetProtoRevTokenPairArbRoutesRequest {
  return {};
}
export const QueryGetProtoRevTokenPairArbRoutesRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevTokenPairArbRoutesRequest",
  encode(_: QueryGetProtoRevTokenPairArbRoutesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevTokenPairArbRoutesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevTokenPairArbRoutesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryGetProtoRevTokenPairArbRoutesRequest>): QueryGetProtoRevTokenPairArbRoutesRequest {
    const message = createBaseQueryGetProtoRevTokenPairArbRoutesRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevTokenPairArbRoutesRequestAmino): QueryGetProtoRevTokenPairArbRoutesRequest {
    const message = createBaseQueryGetProtoRevTokenPairArbRoutesRequest();
    return message;
  },
  toAmino(_: QueryGetProtoRevTokenPairArbRoutesRequest, useInterfaces: boolean = false): QueryGetProtoRevTokenPairArbRoutesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevTokenPairArbRoutesRequestAminoMsg): QueryGetProtoRevTokenPairArbRoutesRequest {
    return QueryGetProtoRevTokenPairArbRoutesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevTokenPairArbRoutesRequest, useInterfaces: boolean = false): QueryGetProtoRevTokenPairArbRoutesRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-token-pair-arb-routes-request",
      value: QueryGetProtoRevTokenPairArbRoutesRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevTokenPairArbRoutesRequestProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevTokenPairArbRoutesRequest {
    return QueryGetProtoRevTokenPairArbRoutesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevTokenPairArbRoutesRequest): Uint8Array {
    return QueryGetProtoRevTokenPairArbRoutesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevTokenPairArbRoutesRequest): QueryGetProtoRevTokenPairArbRoutesRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevTokenPairArbRoutesRequest",
      value: QueryGetProtoRevTokenPairArbRoutesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevTokenPairArbRoutesResponse(): QueryGetProtoRevTokenPairArbRoutesResponse {
  return {
    routes: []
  };
}
export const QueryGetProtoRevTokenPairArbRoutesResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevTokenPairArbRoutesResponse",
  encode(message: QueryGetProtoRevTokenPairArbRoutesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.routes) {
      TokenPairArbRoutes.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevTokenPairArbRoutesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevTokenPairArbRoutesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.routes.push(TokenPairArbRoutes.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevTokenPairArbRoutesResponse>): QueryGetProtoRevTokenPairArbRoutesResponse {
    const message = createBaseQueryGetProtoRevTokenPairArbRoutesResponse();
    message.routes = object.routes?.map(e => TokenPairArbRoutes.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryGetProtoRevTokenPairArbRoutesResponseAmino): QueryGetProtoRevTokenPairArbRoutesResponse {
    const message = createBaseQueryGetProtoRevTokenPairArbRoutesResponse();
    message.routes = object.routes?.map(e => TokenPairArbRoutes.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryGetProtoRevTokenPairArbRoutesResponse, useInterfaces: boolean = false): QueryGetProtoRevTokenPairArbRoutesResponseAmino {
    const obj: any = {};
    if (message.routes) {
      obj.routes = message.routes.map(e => e ? TokenPairArbRoutes.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.routes = message.routes;
    }
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevTokenPairArbRoutesResponseAminoMsg): QueryGetProtoRevTokenPairArbRoutesResponse {
    return QueryGetProtoRevTokenPairArbRoutesResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevTokenPairArbRoutesResponse, useInterfaces: boolean = false): QueryGetProtoRevTokenPairArbRoutesResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-token-pair-arb-routes-response",
      value: QueryGetProtoRevTokenPairArbRoutesResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevTokenPairArbRoutesResponseProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevTokenPairArbRoutesResponse {
    return QueryGetProtoRevTokenPairArbRoutesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevTokenPairArbRoutesResponse): Uint8Array {
    return QueryGetProtoRevTokenPairArbRoutesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevTokenPairArbRoutesResponse): QueryGetProtoRevTokenPairArbRoutesResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevTokenPairArbRoutesResponse",
      value: QueryGetProtoRevTokenPairArbRoutesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevAdminAccountRequest(): QueryGetProtoRevAdminAccountRequest {
  return {};
}
export const QueryGetProtoRevAdminAccountRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAdminAccountRequest",
  encode(_: QueryGetProtoRevAdminAccountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevAdminAccountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAdminAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryGetProtoRevAdminAccountRequest>): QueryGetProtoRevAdminAccountRequest {
    const message = createBaseQueryGetProtoRevAdminAccountRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevAdminAccountRequestAmino): QueryGetProtoRevAdminAccountRequest {
    const message = createBaseQueryGetProtoRevAdminAccountRequest();
    return message;
  },
  toAmino(_: QueryGetProtoRevAdminAccountRequest, useInterfaces: boolean = false): QueryGetProtoRevAdminAccountRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevAdminAccountRequestAminoMsg): QueryGetProtoRevAdminAccountRequest {
    return QueryGetProtoRevAdminAccountRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevAdminAccountRequest, useInterfaces: boolean = false): QueryGetProtoRevAdminAccountRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-admin-account-request",
      value: QueryGetProtoRevAdminAccountRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevAdminAccountRequestProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevAdminAccountRequest {
    return QueryGetProtoRevAdminAccountRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevAdminAccountRequest): Uint8Array {
    return QueryGetProtoRevAdminAccountRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevAdminAccountRequest): QueryGetProtoRevAdminAccountRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAdminAccountRequest",
      value: QueryGetProtoRevAdminAccountRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevAdminAccountResponse(): QueryGetProtoRevAdminAccountResponse {
  return {
    adminAccount: ""
  };
}
export const QueryGetProtoRevAdminAccountResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAdminAccountResponse",
  encode(message: QueryGetProtoRevAdminAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.adminAccount !== "") {
      writer.uint32(10).string(message.adminAccount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevAdminAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAdminAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.adminAccount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevAdminAccountResponse>): QueryGetProtoRevAdminAccountResponse {
    const message = createBaseQueryGetProtoRevAdminAccountResponse();
    message.adminAccount = object.adminAccount ?? "";
    return message;
  },
  fromAmino(object: QueryGetProtoRevAdminAccountResponseAmino): QueryGetProtoRevAdminAccountResponse {
    const message = createBaseQueryGetProtoRevAdminAccountResponse();
    if (object.admin_account !== undefined && object.admin_account !== null) {
      message.adminAccount = object.admin_account;
    }
    return message;
  },
  toAmino(message: QueryGetProtoRevAdminAccountResponse, useInterfaces: boolean = false): QueryGetProtoRevAdminAccountResponseAmino {
    const obj: any = {};
    obj.admin_account = message.adminAccount === "" ? undefined : message.adminAccount;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevAdminAccountResponseAminoMsg): QueryGetProtoRevAdminAccountResponse {
    return QueryGetProtoRevAdminAccountResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevAdminAccountResponse, useInterfaces: boolean = false): QueryGetProtoRevAdminAccountResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-admin-account-response",
      value: QueryGetProtoRevAdminAccountResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevAdminAccountResponseProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevAdminAccountResponse {
    return QueryGetProtoRevAdminAccountResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevAdminAccountResponse): Uint8Array {
    return QueryGetProtoRevAdminAccountResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevAdminAccountResponse): QueryGetProtoRevAdminAccountResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAdminAccountResponse",
      value: QueryGetProtoRevAdminAccountResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevDeveloperAccountRequest(): QueryGetProtoRevDeveloperAccountRequest {
  return {};
}
export const QueryGetProtoRevDeveloperAccountRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevDeveloperAccountRequest",
  encode(_: QueryGetProtoRevDeveloperAccountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevDeveloperAccountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevDeveloperAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryGetProtoRevDeveloperAccountRequest>): QueryGetProtoRevDeveloperAccountRequest {
    const message = createBaseQueryGetProtoRevDeveloperAccountRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevDeveloperAccountRequestAmino): QueryGetProtoRevDeveloperAccountRequest {
    const message = createBaseQueryGetProtoRevDeveloperAccountRequest();
    return message;
  },
  toAmino(_: QueryGetProtoRevDeveloperAccountRequest, useInterfaces: boolean = false): QueryGetProtoRevDeveloperAccountRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevDeveloperAccountRequestAminoMsg): QueryGetProtoRevDeveloperAccountRequest {
    return QueryGetProtoRevDeveloperAccountRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevDeveloperAccountRequest, useInterfaces: boolean = false): QueryGetProtoRevDeveloperAccountRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-developer-account-request",
      value: QueryGetProtoRevDeveloperAccountRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevDeveloperAccountRequestProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevDeveloperAccountRequest {
    return QueryGetProtoRevDeveloperAccountRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevDeveloperAccountRequest): Uint8Array {
    return QueryGetProtoRevDeveloperAccountRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevDeveloperAccountRequest): QueryGetProtoRevDeveloperAccountRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevDeveloperAccountRequest",
      value: QueryGetProtoRevDeveloperAccountRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevDeveloperAccountResponse(): QueryGetProtoRevDeveloperAccountResponse {
  return {
    developerAccount: ""
  };
}
export const QueryGetProtoRevDeveloperAccountResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevDeveloperAccountResponse",
  encode(message: QueryGetProtoRevDeveloperAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.developerAccount !== "") {
      writer.uint32(10).string(message.developerAccount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevDeveloperAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevDeveloperAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.developerAccount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevDeveloperAccountResponse>): QueryGetProtoRevDeveloperAccountResponse {
    const message = createBaseQueryGetProtoRevDeveloperAccountResponse();
    message.developerAccount = object.developerAccount ?? "";
    return message;
  },
  fromAmino(object: QueryGetProtoRevDeveloperAccountResponseAmino): QueryGetProtoRevDeveloperAccountResponse {
    const message = createBaseQueryGetProtoRevDeveloperAccountResponse();
    if (object.developer_account !== undefined && object.developer_account !== null) {
      message.developerAccount = object.developer_account;
    }
    return message;
  },
  toAmino(message: QueryGetProtoRevDeveloperAccountResponse, useInterfaces: boolean = false): QueryGetProtoRevDeveloperAccountResponseAmino {
    const obj: any = {};
    obj.developer_account = message.developerAccount === "" ? undefined : message.developerAccount;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevDeveloperAccountResponseAminoMsg): QueryGetProtoRevDeveloperAccountResponse {
    return QueryGetProtoRevDeveloperAccountResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevDeveloperAccountResponse, useInterfaces: boolean = false): QueryGetProtoRevDeveloperAccountResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-developer-account-response",
      value: QueryGetProtoRevDeveloperAccountResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevDeveloperAccountResponseProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevDeveloperAccountResponse {
    return QueryGetProtoRevDeveloperAccountResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevDeveloperAccountResponse): Uint8Array {
    return QueryGetProtoRevDeveloperAccountResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevDeveloperAccountResponse): QueryGetProtoRevDeveloperAccountResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevDeveloperAccountResponse",
      value: QueryGetProtoRevDeveloperAccountResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevInfoByPoolTypeRequest(): QueryGetProtoRevInfoByPoolTypeRequest {
  return {};
}
export const QueryGetProtoRevInfoByPoolTypeRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevInfoByPoolTypeRequest",
  encode(_: QueryGetProtoRevInfoByPoolTypeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevInfoByPoolTypeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevInfoByPoolTypeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryGetProtoRevInfoByPoolTypeRequest>): QueryGetProtoRevInfoByPoolTypeRequest {
    const message = createBaseQueryGetProtoRevInfoByPoolTypeRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevInfoByPoolTypeRequestAmino): QueryGetProtoRevInfoByPoolTypeRequest {
    const message = createBaseQueryGetProtoRevInfoByPoolTypeRequest();
    return message;
  },
  toAmino(_: QueryGetProtoRevInfoByPoolTypeRequest, useInterfaces: boolean = false): QueryGetProtoRevInfoByPoolTypeRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevInfoByPoolTypeRequestAminoMsg): QueryGetProtoRevInfoByPoolTypeRequest {
    return QueryGetProtoRevInfoByPoolTypeRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevInfoByPoolTypeRequest, useInterfaces: boolean = false): QueryGetProtoRevInfoByPoolTypeRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-info-by-pool-type-request",
      value: QueryGetProtoRevInfoByPoolTypeRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevInfoByPoolTypeRequestProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevInfoByPoolTypeRequest {
    return QueryGetProtoRevInfoByPoolTypeRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevInfoByPoolTypeRequest): Uint8Array {
    return QueryGetProtoRevInfoByPoolTypeRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevInfoByPoolTypeRequest): QueryGetProtoRevInfoByPoolTypeRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevInfoByPoolTypeRequest",
      value: QueryGetProtoRevInfoByPoolTypeRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevInfoByPoolTypeResponse(): QueryGetProtoRevInfoByPoolTypeResponse {
  return {
    infoByPoolType: InfoByPoolType.fromPartial({})
  };
}
export const QueryGetProtoRevInfoByPoolTypeResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevInfoByPoolTypeResponse",
  encode(message: QueryGetProtoRevInfoByPoolTypeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.infoByPoolType !== undefined) {
      InfoByPoolType.encode(message.infoByPoolType, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevInfoByPoolTypeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevInfoByPoolTypeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.infoByPoolType = InfoByPoolType.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevInfoByPoolTypeResponse>): QueryGetProtoRevInfoByPoolTypeResponse {
    const message = createBaseQueryGetProtoRevInfoByPoolTypeResponse();
    message.infoByPoolType = object.infoByPoolType !== undefined && object.infoByPoolType !== null ? InfoByPoolType.fromPartial(object.infoByPoolType) : undefined;
    return message;
  },
  fromAmino(object: QueryGetProtoRevInfoByPoolTypeResponseAmino): QueryGetProtoRevInfoByPoolTypeResponse {
    const message = createBaseQueryGetProtoRevInfoByPoolTypeResponse();
    if (object.info_by_pool_type !== undefined && object.info_by_pool_type !== null) {
      message.infoByPoolType = InfoByPoolType.fromAmino(object.info_by_pool_type);
    }
    return message;
  },
  toAmino(message: QueryGetProtoRevInfoByPoolTypeResponse, useInterfaces: boolean = false): QueryGetProtoRevInfoByPoolTypeResponseAmino {
    const obj: any = {};
    obj.info_by_pool_type = message.infoByPoolType ? InfoByPoolType.toAmino(message.infoByPoolType, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevInfoByPoolTypeResponseAminoMsg): QueryGetProtoRevInfoByPoolTypeResponse {
    return QueryGetProtoRevInfoByPoolTypeResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevInfoByPoolTypeResponse, useInterfaces: boolean = false): QueryGetProtoRevInfoByPoolTypeResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-info-by-pool-type-response",
      value: QueryGetProtoRevInfoByPoolTypeResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevInfoByPoolTypeResponseProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevInfoByPoolTypeResponse {
    return QueryGetProtoRevInfoByPoolTypeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevInfoByPoolTypeResponse): Uint8Array {
    return QueryGetProtoRevInfoByPoolTypeResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevInfoByPoolTypeResponse): QueryGetProtoRevInfoByPoolTypeResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevInfoByPoolTypeResponse",
      value: QueryGetProtoRevInfoByPoolTypeResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevMaxPoolPointsPerBlockRequest(): QueryGetProtoRevMaxPoolPointsPerBlockRequest {
  return {};
}
export const QueryGetProtoRevMaxPoolPointsPerBlockRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevMaxPoolPointsPerBlockRequest",
  encode(_: QueryGetProtoRevMaxPoolPointsPerBlockRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerBlockRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerBlockRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryGetProtoRevMaxPoolPointsPerBlockRequest>): QueryGetProtoRevMaxPoolPointsPerBlockRequest {
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerBlockRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevMaxPoolPointsPerBlockRequestAmino): QueryGetProtoRevMaxPoolPointsPerBlockRequest {
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerBlockRequest();
    return message;
  },
  toAmino(_: QueryGetProtoRevMaxPoolPointsPerBlockRequest, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerBlockRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevMaxPoolPointsPerBlockRequestAminoMsg): QueryGetProtoRevMaxPoolPointsPerBlockRequest {
    return QueryGetProtoRevMaxPoolPointsPerBlockRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevMaxPoolPointsPerBlockRequest, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerBlockRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-max-pool-points-per-block-request",
      value: QueryGetProtoRevMaxPoolPointsPerBlockRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevMaxPoolPointsPerBlockRequestProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerBlockRequest {
    return QueryGetProtoRevMaxPoolPointsPerBlockRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevMaxPoolPointsPerBlockRequest): Uint8Array {
    return QueryGetProtoRevMaxPoolPointsPerBlockRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevMaxPoolPointsPerBlockRequest): QueryGetProtoRevMaxPoolPointsPerBlockRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevMaxPoolPointsPerBlockRequest",
      value: QueryGetProtoRevMaxPoolPointsPerBlockRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevMaxPoolPointsPerBlockResponse(): QueryGetProtoRevMaxPoolPointsPerBlockResponse {
  return {
    maxPoolPointsPerBlock: BigInt(0)
  };
}
export const QueryGetProtoRevMaxPoolPointsPerBlockResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevMaxPoolPointsPerBlockResponse",
  encode(message: QueryGetProtoRevMaxPoolPointsPerBlockResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.maxPoolPointsPerBlock !== BigInt(0)) {
      writer.uint32(8).uint64(message.maxPoolPointsPerBlock);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerBlockResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerBlockResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxPoolPointsPerBlock = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevMaxPoolPointsPerBlockResponse>): QueryGetProtoRevMaxPoolPointsPerBlockResponse {
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerBlockResponse();
    message.maxPoolPointsPerBlock = object.maxPoolPointsPerBlock !== undefined && object.maxPoolPointsPerBlock !== null ? BigInt(object.maxPoolPointsPerBlock.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetProtoRevMaxPoolPointsPerBlockResponseAmino): QueryGetProtoRevMaxPoolPointsPerBlockResponse {
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerBlockResponse();
    if (object.max_pool_points_per_block !== undefined && object.max_pool_points_per_block !== null) {
      message.maxPoolPointsPerBlock = BigInt(object.max_pool_points_per_block);
    }
    return message;
  },
  toAmino(message: QueryGetProtoRevMaxPoolPointsPerBlockResponse, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerBlockResponseAmino {
    const obj: any = {};
    obj.max_pool_points_per_block = message.maxPoolPointsPerBlock !== BigInt(0) ? message.maxPoolPointsPerBlock.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevMaxPoolPointsPerBlockResponseAminoMsg): QueryGetProtoRevMaxPoolPointsPerBlockResponse {
    return QueryGetProtoRevMaxPoolPointsPerBlockResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevMaxPoolPointsPerBlockResponse, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerBlockResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-max-pool-points-per-block-response",
      value: QueryGetProtoRevMaxPoolPointsPerBlockResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevMaxPoolPointsPerBlockResponseProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerBlockResponse {
    return QueryGetProtoRevMaxPoolPointsPerBlockResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevMaxPoolPointsPerBlockResponse): Uint8Array {
    return QueryGetProtoRevMaxPoolPointsPerBlockResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevMaxPoolPointsPerBlockResponse): QueryGetProtoRevMaxPoolPointsPerBlockResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevMaxPoolPointsPerBlockResponse",
      value: QueryGetProtoRevMaxPoolPointsPerBlockResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevMaxPoolPointsPerTxRequest(): QueryGetProtoRevMaxPoolPointsPerTxRequest {
  return {};
}
export const QueryGetProtoRevMaxPoolPointsPerTxRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevMaxPoolPointsPerTxRequest",
  encode(_: QueryGetProtoRevMaxPoolPointsPerTxRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerTxRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerTxRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryGetProtoRevMaxPoolPointsPerTxRequest>): QueryGetProtoRevMaxPoolPointsPerTxRequest {
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerTxRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevMaxPoolPointsPerTxRequestAmino): QueryGetProtoRevMaxPoolPointsPerTxRequest {
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerTxRequest();
    return message;
  },
  toAmino(_: QueryGetProtoRevMaxPoolPointsPerTxRequest, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerTxRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevMaxPoolPointsPerTxRequestAminoMsg): QueryGetProtoRevMaxPoolPointsPerTxRequest {
    return QueryGetProtoRevMaxPoolPointsPerTxRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevMaxPoolPointsPerTxRequest, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerTxRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-max-pool-points-per-tx-request",
      value: QueryGetProtoRevMaxPoolPointsPerTxRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevMaxPoolPointsPerTxRequestProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerTxRequest {
    return QueryGetProtoRevMaxPoolPointsPerTxRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevMaxPoolPointsPerTxRequest): Uint8Array {
    return QueryGetProtoRevMaxPoolPointsPerTxRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevMaxPoolPointsPerTxRequest): QueryGetProtoRevMaxPoolPointsPerTxRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevMaxPoolPointsPerTxRequest",
      value: QueryGetProtoRevMaxPoolPointsPerTxRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevMaxPoolPointsPerTxResponse(): QueryGetProtoRevMaxPoolPointsPerTxResponse {
  return {
    maxPoolPointsPerTx: BigInt(0)
  };
}
export const QueryGetProtoRevMaxPoolPointsPerTxResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevMaxPoolPointsPerTxResponse",
  encode(message: QueryGetProtoRevMaxPoolPointsPerTxResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.maxPoolPointsPerTx !== BigInt(0)) {
      writer.uint32(8).uint64(message.maxPoolPointsPerTx);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerTxResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxPoolPointsPerTx = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevMaxPoolPointsPerTxResponse>): QueryGetProtoRevMaxPoolPointsPerTxResponse {
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerTxResponse();
    message.maxPoolPointsPerTx = object.maxPoolPointsPerTx !== undefined && object.maxPoolPointsPerTx !== null ? BigInt(object.maxPoolPointsPerTx.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetProtoRevMaxPoolPointsPerTxResponseAmino): QueryGetProtoRevMaxPoolPointsPerTxResponse {
    const message = createBaseQueryGetProtoRevMaxPoolPointsPerTxResponse();
    if (object.max_pool_points_per_tx !== undefined && object.max_pool_points_per_tx !== null) {
      message.maxPoolPointsPerTx = BigInt(object.max_pool_points_per_tx);
    }
    return message;
  },
  toAmino(message: QueryGetProtoRevMaxPoolPointsPerTxResponse, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerTxResponseAmino {
    const obj: any = {};
    obj.max_pool_points_per_tx = message.maxPoolPointsPerTx !== BigInt(0) ? message.maxPoolPointsPerTx.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevMaxPoolPointsPerTxResponseAminoMsg): QueryGetProtoRevMaxPoolPointsPerTxResponse {
    return QueryGetProtoRevMaxPoolPointsPerTxResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevMaxPoolPointsPerTxResponse, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerTxResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-max-pool-points-per-tx-response",
      value: QueryGetProtoRevMaxPoolPointsPerTxResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevMaxPoolPointsPerTxResponseProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevMaxPoolPointsPerTxResponse {
    return QueryGetProtoRevMaxPoolPointsPerTxResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevMaxPoolPointsPerTxResponse): Uint8Array {
    return QueryGetProtoRevMaxPoolPointsPerTxResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevMaxPoolPointsPerTxResponse): QueryGetProtoRevMaxPoolPointsPerTxResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevMaxPoolPointsPerTxResponse",
      value: QueryGetProtoRevMaxPoolPointsPerTxResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevBaseDenomsRequest(): QueryGetProtoRevBaseDenomsRequest {
  return {};
}
export const QueryGetProtoRevBaseDenomsRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevBaseDenomsRequest",
  encode(_: QueryGetProtoRevBaseDenomsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevBaseDenomsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevBaseDenomsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryGetProtoRevBaseDenomsRequest>): QueryGetProtoRevBaseDenomsRequest {
    const message = createBaseQueryGetProtoRevBaseDenomsRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevBaseDenomsRequestAmino): QueryGetProtoRevBaseDenomsRequest {
    const message = createBaseQueryGetProtoRevBaseDenomsRequest();
    return message;
  },
  toAmino(_: QueryGetProtoRevBaseDenomsRequest, useInterfaces: boolean = false): QueryGetProtoRevBaseDenomsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevBaseDenomsRequestAminoMsg): QueryGetProtoRevBaseDenomsRequest {
    return QueryGetProtoRevBaseDenomsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevBaseDenomsRequest, useInterfaces: boolean = false): QueryGetProtoRevBaseDenomsRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-base-denoms-request",
      value: QueryGetProtoRevBaseDenomsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevBaseDenomsRequestProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevBaseDenomsRequest {
    return QueryGetProtoRevBaseDenomsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevBaseDenomsRequest): Uint8Array {
    return QueryGetProtoRevBaseDenomsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevBaseDenomsRequest): QueryGetProtoRevBaseDenomsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevBaseDenomsRequest",
      value: QueryGetProtoRevBaseDenomsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevBaseDenomsResponse(): QueryGetProtoRevBaseDenomsResponse {
  return {
    baseDenoms: []
  };
}
export const QueryGetProtoRevBaseDenomsResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevBaseDenomsResponse",
  encode(message: QueryGetProtoRevBaseDenomsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.baseDenoms) {
      BaseDenom.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevBaseDenomsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevBaseDenomsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseDenoms.push(BaseDenom.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevBaseDenomsResponse>): QueryGetProtoRevBaseDenomsResponse {
    const message = createBaseQueryGetProtoRevBaseDenomsResponse();
    message.baseDenoms = object.baseDenoms?.map(e => BaseDenom.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryGetProtoRevBaseDenomsResponseAmino): QueryGetProtoRevBaseDenomsResponse {
    const message = createBaseQueryGetProtoRevBaseDenomsResponse();
    message.baseDenoms = object.base_denoms?.map(e => BaseDenom.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryGetProtoRevBaseDenomsResponse, useInterfaces: boolean = false): QueryGetProtoRevBaseDenomsResponseAmino {
    const obj: any = {};
    if (message.baseDenoms) {
      obj.base_denoms = message.baseDenoms.map(e => e ? BaseDenom.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.base_denoms = message.baseDenoms;
    }
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevBaseDenomsResponseAminoMsg): QueryGetProtoRevBaseDenomsResponse {
    return QueryGetProtoRevBaseDenomsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevBaseDenomsResponse, useInterfaces: boolean = false): QueryGetProtoRevBaseDenomsResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-base-denoms-response",
      value: QueryGetProtoRevBaseDenomsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevBaseDenomsResponseProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevBaseDenomsResponse {
    return QueryGetProtoRevBaseDenomsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevBaseDenomsResponse): Uint8Array {
    return QueryGetProtoRevBaseDenomsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevBaseDenomsResponse): QueryGetProtoRevBaseDenomsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevBaseDenomsResponse",
      value: QueryGetProtoRevBaseDenomsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevEnabledRequest(): QueryGetProtoRevEnabledRequest {
  return {};
}
export const QueryGetProtoRevEnabledRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevEnabledRequest",
  encode(_: QueryGetProtoRevEnabledRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevEnabledRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevEnabledRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryGetProtoRevEnabledRequest>): QueryGetProtoRevEnabledRequest {
    const message = createBaseQueryGetProtoRevEnabledRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevEnabledRequestAmino): QueryGetProtoRevEnabledRequest {
    const message = createBaseQueryGetProtoRevEnabledRequest();
    return message;
  },
  toAmino(_: QueryGetProtoRevEnabledRequest, useInterfaces: boolean = false): QueryGetProtoRevEnabledRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevEnabledRequestAminoMsg): QueryGetProtoRevEnabledRequest {
    return QueryGetProtoRevEnabledRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevEnabledRequest, useInterfaces: boolean = false): QueryGetProtoRevEnabledRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-enabled-request",
      value: QueryGetProtoRevEnabledRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevEnabledRequestProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevEnabledRequest {
    return QueryGetProtoRevEnabledRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevEnabledRequest): Uint8Array {
    return QueryGetProtoRevEnabledRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevEnabledRequest): QueryGetProtoRevEnabledRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevEnabledRequest",
      value: QueryGetProtoRevEnabledRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevEnabledResponse(): QueryGetProtoRevEnabledResponse {
  return {
    enabled: false
  };
}
export const QueryGetProtoRevEnabledResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevEnabledResponse",
  encode(message: QueryGetProtoRevEnabledResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.enabled === true) {
      writer.uint32(8).bool(message.enabled);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevEnabledResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevEnabledResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.enabled = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevEnabledResponse>): QueryGetProtoRevEnabledResponse {
    const message = createBaseQueryGetProtoRevEnabledResponse();
    message.enabled = object.enabled ?? false;
    return message;
  },
  fromAmino(object: QueryGetProtoRevEnabledResponseAmino): QueryGetProtoRevEnabledResponse {
    const message = createBaseQueryGetProtoRevEnabledResponse();
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = object.enabled;
    }
    return message;
  },
  toAmino(message: QueryGetProtoRevEnabledResponse, useInterfaces: boolean = false): QueryGetProtoRevEnabledResponseAmino {
    const obj: any = {};
    obj.enabled = message.enabled === false ? undefined : message.enabled;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevEnabledResponseAminoMsg): QueryGetProtoRevEnabledResponse {
    return QueryGetProtoRevEnabledResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevEnabledResponse, useInterfaces: boolean = false): QueryGetProtoRevEnabledResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-enabled-response",
      value: QueryGetProtoRevEnabledResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevEnabledResponseProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevEnabledResponse {
    return QueryGetProtoRevEnabledResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevEnabledResponse): Uint8Array {
    return QueryGetProtoRevEnabledResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevEnabledResponse): QueryGetProtoRevEnabledResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevEnabledResponse",
      value: QueryGetProtoRevEnabledResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevPoolRequest(): QueryGetProtoRevPoolRequest {
  return {
    baseDenom: "",
    otherDenom: ""
  };
}
export const QueryGetProtoRevPoolRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevPoolRequest",
  encode(message: QueryGetProtoRevPoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.baseDenom !== "") {
      writer.uint32(10).string(message.baseDenom);
    }
    if (message.otherDenom !== "") {
      writer.uint32(18).string(message.otherDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevPoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseDenom = reader.string();
          break;
        case 2:
          message.otherDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevPoolRequest>): QueryGetProtoRevPoolRequest {
    const message = createBaseQueryGetProtoRevPoolRequest();
    message.baseDenom = object.baseDenom ?? "";
    message.otherDenom = object.otherDenom ?? "";
    return message;
  },
  fromAmino(object: QueryGetProtoRevPoolRequestAmino): QueryGetProtoRevPoolRequest {
    const message = createBaseQueryGetProtoRevPoolRequest();
    if (object.base_denom !== undefined && object.base_denom !== null) {
      message.baseDenom = object.base_denom;
    }
    if (object.other_denom !== undefined && object.other_denom !== null) {
      message.otherDenom = object.other_denom;
    }
    return message;
  },
  toAmino(message: QueryGetProtoRevPoolRequest, useInterfaces: boolean = false): QueryGetProtoRevPoolRequestAmino {
    const obj: any = {};
    obj.base_denom = message.baseDenom === "" ? undefined : message.baseDenom;
    obj.other_denom = message.otherDenom === "" ? undefined : message.otherDenom;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevPoolRequestAminoMsg): QueryGetProtoRevPoolRequest {
    return QueryGetProtoRevPoolRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevPoolRequest, useInterfaces: boolean = false): QueryGetProtoRevPoolRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-pool-request",
      value: QueryGetProtoRevPoolRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevPoolRequestProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevPoolRequest {
    return QueryGetProtoRevPoolRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevPoolRequest): Uint8Array {
    return QueryGetProtoRevPoolRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevPoolRequest): QueryGetProtoRevPoolRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevPoolRequest",
      value: QueryGetProtoRevPoolRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevPoolResponse(): QueryGetProtoRevPoolResponse {
  return {
    poolId: BigInt(0)
  };
}
export const QueryGetProtoRevPoolResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevPoolResponse",
  encode(message: QueryGetProtoRevPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetProtoRevPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevPoolResponse>): QueryGetProtoRevPoolResponse {
    const message = createBaseQueryGetProtoRevPoolResponse();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetProtoRevPoolResponseAmino): QueryGetProtoRevPoolResponse {
    const message = createBaseQueryGetProtoRevPoolResponse();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: QueryGetProtoRevPoolResponse, useInterfaces: boolean = false): QueryGetProtoRevPoolResponseAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevPoolResponseAminoMsg): QueryGetProtoRevPoolResponse {
    return QueryGetProtoRevPoolResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevPoolResponse, useInterfaces: boolean = false): QueryGetProtoRevPoolResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-pool-response",
      value: QueryGetProtoRevPoolResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevPoolResponseProtoMsg, useInterfaces: boolean = false): QueryGetProtoRevPoolResponse {
    return QueryGetProtoRevPoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetProtoRevPoolResponse): Uint8Array {
    return QueryGetProtoRevPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevPoolResponse): QueryGetProtoRevPoolResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevPoolResponse",
      value: QueryGetProtoRevPoolResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetAllProtocolRevenueRequest(): QueryGetAllProtocolRevenueRequest {
  return {};
}
export const QueryGetAllProtocolRevenueRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetAllProtocolRevenueRequest",
  encode(_: QueryGetAllProtocolRevenueRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetAllProtocolRevenueRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAllProtocolRevenueRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryGetAllProtocolRevenueRequest>): QueryGetAllProtocolRevenueRequest {
    const message = createBaseQueryGetAllProtocolRevenueRequest();
    return message;
  },
  fromAmino(_: QueryGetAllProtocolRevenueRequestAmino): QueryGetAllProtocolRevenueRequest {
    const message = createBaseQueryGetAllProtocolRevenueRequest();
    return message;
  },
  toAmino(_: QueryGetAllProtocolRevenueRequest, useInterfaces: boolean = false): QueryGetAllProtocolRevenueRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetAllProtocolRevenueRequestAminoMsg): QueryGetAllProtocolRevenueRequest {
    return QueryGetAllProtocolRevenueRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetAllProtocolRevenueRequest, useInterfaces: boolean = false): QueryGetAllProtocolRevenueRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-all-protocol-revenue-request",
      value: QueryGetAllProtocolRevenueRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetAllProtocolRevenueRequestProtoMsg, useInterfaces: boolean = false): QueryGetAllProtocolRevenueRequest {
    return QueryGetAllProtocolRevenueRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetAllProtocolRevenueRequest): Uint8Array {
    return QueryGetAllProtocolRevenueRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetAllProtocolRevenueRequest): QueryGetAllProtocolRevenueRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetAllProtocolRevenueRequest",
      value: QueryGetAllProtocolRevenueRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetAllProtocolRevenueResponse(): QueryGetAllProtocolRevenueResponse {
  return {
    allProtocolRevenue: AllProtocolRevenue.fromPartial({})
  };
}
export const QueryGetAllProtocolRevenueResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetAllProtocolRevenueResponse",
  encode(message: QueryGetAllProtocolRevenueResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.allProtocolRevenue !== undefined) {
      AllProtocolRevenue.encode(message.allProtocolRevenue, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGetAllProtocolRevenueResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAllProtocolRevenueResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.allProtocolRevenue = AllProtocolRevenue.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetAllProtocolRevenueResponse>): QueryGetAllProtocolRevenueResponse {
    const message = createBaseQueryGetAllProtocolRevenueResponse();
    message.allProtocolRevenue = object.allProtocolRevenue !== undefined && object.allProtocolRevenue !== null ? AllProtocolRevenue.fromPartial(object.allProtocolRevenue) : undefined;
    return message;
  },
  fromAmino(object: QueryGetAllProtocolRevenueResponseAmino): QueryGetAllProtocolRevenueResponse {
    const message = createBaseQueryGetAllProtocolRevenueResponse();
    if (object.all_protocol_revenue !== undefined && object.all_protocol_revenue !== null) {
      message.allProtocolRevenue = AllProtocolRevenue.fromAmino(object.all_protocol_revenue);
    }
    return message;
  },
  toAmino(message: QueryGetAllProtocolRevenueResponse, useInterfaces: boolean = false): QueryGetAllProtocolRevenueResponseAmino {
    const obj: any = {};
    obj.all_protocol_revenue = message.allProtocolRevenue ? AllProtocolRevenue.toAmino(message.allProtocolRevenue, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetAllProtocolRevenueResponseAminoMsg): QueryGetAllProtocolRevenueResponse {
    return QueryGetAllProtocolRevenueResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetAllProtocolRevenueResponse, useInterfaces: boolean = false): QueryGetAllProtocolRevenueResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-all-protocol-revenue-response",
      value: QueryGetAllProtocolRevenueResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGetAllProtocolRevenueResponseProtoMsg, useInterfaces: boolean = false): QueryGetAllProtocolRevenueResponse {
    return QueryGetAllProtocolRevenueResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGetAllProtocolRevenueResponse): Uint8Array {
    return QueryGetAllProtocolRevenueResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetAllProtocolRevenueResponse): QueryGetAllProtocolRevenueResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetAllProtocolRevenueResponse",
      value: QueryGetAllProtocolRevenueResponse.encode(message).finish()
    };
  }
};