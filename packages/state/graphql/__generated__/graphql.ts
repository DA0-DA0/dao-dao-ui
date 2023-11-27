/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** MicroAmount custom scalar type */
  MicroAmount: { input: any; output: any; }
  /** UnixNanoseconds custom scalar type */
  UnixNanoseconds: { input: any; output: any; }
};

/** Enumerates different types of token-related activities. */
export enum ActivityType {
  Airdrop = 'AIRDROP',
  Bid = 'BID',
  CancelAuction = 'CANCEL_AUCTION',
  CreateAuction = 'CREATE_AUCTION',
  List = 'LIST',
  Mint = 'MINT',
  Offer = 'OFFER',
  PriceChange = 'PRICE_CHANGE',
  RejectOffer = 'REJECT_OFFER',
  RemoveOffer = 'REMOVE_OFFER',
  Sale = 'SALE',
  Transfer = 'TRANSFER',
  Unlist = 'UNLIST'
}

export type Analytics = {
  __typename?: 'Analytics';
  collectionOwnerDistributon: Array<AnalyticsCollectionOwnerDistributon>;
  dailyMetrics: AnalyticsDailyMetricsResult;
  metricsSummary: AnalyticsMetricsSummaryByCurrency;
  platformTotals: AnalyticsPlatformTotals;
  topCollectionHolders: Array<AnalyticsTopCollectionHolder>;
  topTokenSales?: Maybe<AnalyticsTopTokenSalesResult>;
};


export type AnalyticsCollectionOwnerDistributonArgs = {
  collectionAddr: Scalars['String']['input'];
};


export type AnalyticsDailyMetricsArgs = {
  aggregation?: InputMaybe<AnalyticsTimeScale>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AnalyticsDateOrderByInput>;
  where?: InputMaybe<AnalyticsDateRangeInput>;
};


export type AnalyticsMetricsSummaryArgs = {
  where?: InputMaybe<AnalyticsDateRangeInput>;
};


export type AnalyticsTopCollectionHoldersArgs = {
  collectionAddr: Scalars['String']['input'];
};


export type AnalyticsTopTokenSalesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export enum AnalyticsAscDesc {
  Asc = 'asc',
  Desc = 'desc'
}

export type AnalyticsCollectionOwnerDistributon = {
  __typename?: 'AnalyticsCollectionOwnerDistributon';
  ownedTokensRange: Scalars['String']['output'];
  ownerCount?: Maybe<Scalars['Int']['output']>;
  ownerPercent?: Maybe<Scalars['Float']['output']>;
};

/** Various Metrics for a particular day */
export type AnalyticsDailyMetrics = {
  __typename?: 'AnalyticsDailyMetrics';
  collectionCreationFeesStarsAmount: Scalars['MicroAmount']['output'];
  collectionCreationFeesUsdAmount: Scalars['Float']['output'];
  dailyBurnedStarsAmount: Scalars['MicroAmount']['output'];
  dailyBurnedUsdAmount: Scalars['Float']['output'];
  dailyCommunityPoolStarsAmount: Scalars['MicroAmount']['output'];
  dailyCommunityPoolUsdAmount: Scalars['Float']['output'];
  dailyDistributedStarsAmount: Scalars['MicroAmount']['output'];
  dailyDistributedUsdAmount: Scalars['Float']['output'];
  date: Scalars['String']['output'];
  /** Unique ID */
  id: Scalars['Int']['output'];
  listingFeesStarsAmount: Scalars['MicroAmount']['output'];
  listingFeesUsdAmount: Scalars['Float']['output'];
  marketplaceFeesStarsAmount: Scalars['MicroAmount']['output'];
  marketplaceFeesUsdAmount: Scalars['Float']['output'];
  marketplaceVolumeStarsAmount: Scalars['MicroAmount']['output'];
  marketplaceVolumeUsdAmount: Scalars['Float']['output'];
  mintFeesStarsAmount: Scalars['MicroAmount']['output'];
  mintFeesUsdAmount: Scalars['Float']['output'];
  mintVolumeStarsAmount: Scalars['MicroAmount']['output'];
  mintVolumeUsdAmount: Scalars['Float']['output'];
  mintsCount: Scalars['Int']['output'];
  namesMintFeesStarsAmount: Scalars['MicroAmount']['output'];
  namesMintFeesUsdAmount: Scalars['Float']['output'];
  numberOfBuyersCount: Scalars['Int']['output'];
  numberOfMintersCount: Scalars['Int']['output'];
  salesCount: Scalars['Int']['output'];
};

export type AnalyticsDailyMetricsResult = PaginatedQuery & {
  __typename?: 'AnalyticsDailyMetricsResult';
  dailyMetrics: Array<AnalyticsDailyMetrics>;
  pageInfo: PageInfo;
};

export type AnalyticsDateOrderByInput = {
  date: AnalyticsAscDesc;
};

export type AnalyticsDateRangeInput = {
  date: DateRangeInput;
};

/** Sum of AnalyticsDailyMetrics for a given date range  */
export type AnalyticsMetricsSummary = {
  __typename?: 'AnalyticsMetricsSummary';
  averageDailyRevenue: Scalars['MicroAmount']['output'];
  burned: Scalars['MicroAmount']['output'];
  communityPool: Scalars['MicroAmount']['output'];
  distributedToStakers: Scalars['MicroAmount']['output'];
  marketplaceVolume: Scalars['MicroAmount']['output'];
  medianDailyRevenue: Scalars['MicroAmount']['output'];
  mintVolume: Scalars['MicroAmount']['output'];
  mints: Scalars['Int']['output'];
  sales: Scalars['Int']['output'];
  totalRevenue: Scalars['MicroAmount']['output'];
};

export type AnalyticsMetricsSummaryByCurrency = {
  __typename?: 'AnalyticsMetricsSummaryByCurrency';
  stars: AnalyticsMetricsSummary;
  usd: AnalyticsMetricsSummary;
};

export type AnalyticsPlatformTotals = {
  __typename?: 'AnalyticsPlatformTotals';
  id: Scalars['String']['output'];
  numCollections: Scalars['Int']['output'];
  numNames: Scalars['Int']['output'];
  numNftHolders: Scalars['Int']['output'];
  numNfts: Scalars['Int']['output'];
  totalCreatorEarningsUsd: Scalars['Float']['output'];
  usdValueLockedInBids: Scalars['Float']['output'];
};

export enum AnalyticsTimeScale {
  Day = 'day',
  Month = 'month',
  Week = 'week'
}

export type AnalyticsTokenSale = {
  __typename?: 'AnalyticsTokenSale';
  id: Scalars['Int']['output'];
  rarity?: Maybe<Scalars['Int']['output']>;
  saleDate: Scalars['String']['output'];
  stars: Scalars['MicroAmount']['output'];
  token: Token;
  usd: Scalars['Float']['output'];
};

export type AnalyticsTopCollectionHolder = {
  __typename?: 'AnalyticsTopCollectionHolder';
  change30Day?: Maybe<Scalars['Int']['output']>;
  owner?: Maybe<WalletAccount>;
  ownerAddr: Scalars['String']['output'];
  tokensListedCount?: Maybe<Scalars['Int']['output']>;
  tokensOwnedCount: Scalars['Int']['output'];
  tokensOwnedPercent: Scalars['Float']['output'];
  volume30Day?: Maybe<Scalars['MicroAmount']['output']>;
};

export type AnalyticsTopTokenSalesResult = PaginatedQuery & {
  __typename?: 'AnalyticsTopTokenSalesResult';
  pageInfo: PageInfo;
  topTokenSales: Array<AnalyticsTokenSale>;
};

export enum AuctionEndPreset {
  /** Auctions ending in the next 1 hour. */
  Next_1Hour = 'NEXT_1_HOUR',
  /** Auctions ending in the next 6 hours. */
  Next_6Hours = 'NEXT_6_HOURS',
  /** Auctions ending in the next 7 days. */
  Next_7Days = 'NEXT_7_DAYS',
  /** Auctions ending in the next 24 hours. */
  Next_24Hours = 'NEXT_24_HOURS',
  /** Auctions ending in the next 48 hours. */
  Next_48Hours = 'NEXT_48_HOURS'
}

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CoinAmount = {
  __typename?: 'CoinAmount';
  amount?: Maybe<Scalars['MicroAmount']['output']>;
  denom?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export type Collection = {
  __typename?: 'Collection';
  categories?: Maybe<CollectionCategories>;
  contractAddress: Scalars['ID']['output'];
  contractUri?: Maybe<Scalars['String']['output']>;
  creationTime?: Maybe<Scalars['UnixNanoseconds']['output']>;
  creator?: Maybe<WalletAccount>;
  description?: Maybe<Scalars['String']['output']>;
  featured?: Maybe<CollectionFeaturedType>;
  floorPrice?: Maybe<Scalars['MicroAmount']['output']>;
  highestOffer?: Maybe<Offer>;
  isExplicit?: Maybe<Scalars['Boolean']['output']>;
  media?: Maybe<Media>;
  mintStatus?: Maybe<CollectionMintStatus>;
  minter?: Maybe<Minter>;
  minterAddress?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  offers?: Maybe<Array<Offer>>;
  royaltyInfo?: Maybe<RoyaltyInfo>;
  startTradingTime?: Maybe<Scalars['UnixNanoseconds']['output']>;
  stats?: Maybe<CollectionStats>;
  symbol?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  tokenCounts?: Maybe<CollectionTokenCounts>;
  traits?: Maybe<Array<CollectionTrait>>;
  website?: Maybe<Scalars['String']['output']>;
};


export type CollectionHighestOfferArgs = {
  filterByAddr?: InputMaybe<Scalars['String']['input']>;
};


export type CollectionMinterArgs = {
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};


export type CollectionOffersArgs = {
  filterByAddr?: InputMaybe<Scalars['String']['input']>;
};

export type CollectionCategories = {
  __typename?: 'CollectionCategories';
  private?: Maybe<Array<Scalars['String']['output']>>;
  public?: Maybe<Array<Scalars['String']['output']>>;
};

export type CollectionCategoryInfo = {
  __typename?: 'CollectionCategoryInfo';
  count?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CollectionCount = {
  __typename?: 'CollectionCount';
  collection?: Maybe<Collection>;
  count: Scalars['Int']['output'];
};

export type CollectionCountsResult = PaginatedQuery & {
  __typename?: 'CollectionCountsResult';
  collectionCounts: Array<CollectionCount>;
  pageInfo?: Maybe<PageInfo>;
};

export enum CollectionFeaturedType {
  CommunityVote = 'COMMUNITY_VOTE',
  TeamPick = 'TEAM_PICK'
}

export type CollectionMinMaxFilters = {
  bestOfferMax?: InputMaybe<Scalars['MicroAmount']['input']>;
  bestOfferMin?: InputMaybe<Scalars['MicroAmount']['input']>;
  change6hourPercentMax?: InputMaybe<Scalars['Float']['input']>;
  change6hourPercentMin?: InputMaybe<Scalars['Float']['input']>;
  change7dayPercentMax?: InputMaybe<Scalars['Float']['input']>;
  change7dayPercentMin?: InputMaybe<Scalars['Float']['input']>;
  change24hourPercentMax?: InputMaybe<Scalars['Float']['input']>;
  change24hourPercentMin?: InputMaybe<Scalars['Float']['input']>;
  creationTimeMax?: InputMaybe<Scalars['UnixNanoseconds']['input']>;
  creationTimeMin?: InputMaybe<Scalars['UnixNanoseconds']['input']>;
  floorPriceMax?: InputMaybe<Scalars['MicroAmount']['input']>;
  floorPriceMin?: InputMaybe<Scalars['MicroAmount']['input']>;
  mintChange14dayPercentMax?: InputMaybe<Scalars['Float']['input']>;
  mintChange14dayPercentMin?: InputMaybe<Scalars['Float']['input']>;
  mintChange24hourPercentMax?: InputMaybe<Scalars['Float']['input']>;
  mintChange24hourPercentMin?: InputMaybe<Scalars['Float']['input']>;
  mintCount14dayMax?: InputMaybe<Scalars['Float']['input']>;
  mintCount14dayMin?: InputMaybe<Scalars['Float']['input']>;
  mintCount24hourMax?: InputMaybe<Scalars['Float']['input']>;
  mintCount24hourMin?: InputMaybe<Scalars['Float']['input']>;
  mintPriceMax?: InputMaybe<Scalars['MicroAmount']['input']>;
  mintPriceMin?: InputMaybe<Scalars['MicroAmount']['input']>;
  mintStartTimeMax?: InputMaybe<Scalars['UnixNanoseconds']['input']>;
  mintStartTimeMin?: InputMaybe<Scalars['UnixNanoseconds']['input']>;
  mintVolume14dayMax?: InputMaybe<Scalars['MicroAmount']['input']>;
  mintVolume14dayMin?: InputMaybe<Scalars['MicroAmount']['input']>;
  mintVolume24hourMax?: InputMaybe<Scalars['MicroAmount']['input']>;
  mintVolume24hourMin?: InputMaybe<Scalars['MicroAmount']['input']>;
  numOwnersMax?: InputMaybe<Scalars['Int']['input']>;
  numOwnersMin?: InputMaybe<Scalars['Int']['input']>;
  numTokensAirdroppedMax?: InputMaybe<Scalars['Int']['input']>;
  numTokensAirdroppedMin?: InputMaybe<Scalars['Int']['input']>;
  numTokensForSaleMax?: InputMaybe<Scalars['Int']['input']>;
  numTokensForSaleMin?: InputMaybe<Scalars['Int']['input']>;
  numTokensLeftToMintMax?: InputMaybe<Scalars['Int']['input']>;
  numTokensLeftToMintMin?: InputMaybe<Scalars['Int']['input']>;
  numTokensMintedMax?: InputMaybe<Scalars['Int']['input']>;
  numTokensMintedMin?: InputMaybe<Scalars['Int']['input']>;
  numTokensTotalMax?: InputMaybe<Scalars['Int']['input']>;
  numTokensTotalMin?: InputMaybe<Scalars['Int']['input']>;
  royaltyPercentMax?: InputMaybe<Scalars['Float']['input']>;
  royaltyPercentMin?: InputMaybe<Scalars['Float']['input']>;
  tokensMintedPercentMax?: InputMaybe<Scalars['Float']['input']>;
  tokensMintedPercentMin?: InputMaybe<Scalars['Float']['input']>;
  uniqueOwnerPercentMax?: InputMaybe<Scalars['Float']['input']>;
  uniqueOwnerPercentMin?: InputMaybe<Scalars['Float']['input']>;
  uniquePaidMintersPercentMax?: InputMaybe<Scalars['Float']['input']>;
  uniquePaidMintersPercentMin?: InputMaybe<Scalars['Float']['input']>;
  volume6hourMax?: InputMaybe<Scalars['MicroAmount']['input']>;
  volume6hourMin?: InputMaybe<Scalars['MicroAmount']['input']>;
  volume7dayMax?: InputMaybe<Scalars['MicroAmount']['input']>;
  volume7dayMin?: InputMaybe<Scalars['MicroAmount']['input']>;
  volume24hourMax?: InputMaybe<Scalars['MicroAmount']['input']>;
  volume24hourMin?: InputMaybe<Scalars['MicroAmount']['input']>;
};

export enum CollectionMintStatus {
  FullyMinted = 'FULLY_MINTED',
  Minting = 'MINTING',
  Upcoming = 'UPCOMING'
}

export type CollectionOffersResult = CursorPaginatedQuery & {
  __typename?: 'CollectionOffersResult';
  offers: Array<Offer>;
  pageInfo: CursorPageInfo;
};

export type CollectionSales = {
  __typename?: 'CollectionSales';
  stats?: Maybe<Array<CollectionTimePeriodSalesStat>>;
  total?: Maybe<CollectionSalesStatsTotal>;
};

export type CollectionSalesResult = PaginatedQuery & {
  __typename?: 'CollectionSalesResult';
  collectionSales: CollectionSales;
  pageInfo?: Maybe<PageInfo>;
};

export type CollectionSalesStat = {
  averagePriceStars?: Maybe<Scalars['MicroAmount']['output']>;
  averagePriceUsd?: Maybe<Scalars['Float']['output']>;
  salesCount?: Maybe<Scalars['Int']['output']>;
  volumeStars?: Maybe<Scalars['MicroAmount']['output']>;
  volumeUsd?: Maybe<Scalars['Float']['output']>;
};

export type CollectionSalesStatsTotal = CollectionSalesStat & {
  __typename?: 'CollectionSalesStatsTotal';
  averagePriceStars?: Maybe<Scalars['MicroAmount']['output']>;
  averagePriceUsd?: Maybe<Scalars['Float']['output']>;
  salesCount?: Maybe<Scalars['Int']['output']>;
  volumeStars?: Maybe<Scalars['MicroAmount']['output']>;
  volumeUsd?: Maybe<Scalars['Float']['output']>;
};

export enum CollectionSort {
  BestOfferAsc = 'BEST_OFFER_ASC',
  BestOfferDesc = 'BEST_OFFER_DESC',
  Change_6HourAsc = 'CHANGE_6_HOUR_ASC',
  Change_6HourDesc = 'CHANGE_6_HOUR_DESC',
  Change_7DayAsc = 'CHANGE_7_DAY_ASC',
  Change_7DayDesc = 'CHANGE_7_DAY_DESC',
  Change_24HourAsc = 'CHANGE_24_HOUR_ASC',
  Change_24HourDesc = 'CHANGE_24_HOUR_DESC',
  Change_30DayAsc = 'CHANGE_30_DAY_ASC',
  Change_30DayDesc = 'CHANGE_30_DAY_DESC',
  ChangeUsd_6HourAsc = 'CHANGE_USD_6_HOUR_ASC',
  ChangeUsd_6HourDesc = 'CHANGE_USD_6_HOUR_DESC',
  ChangeUsd_7DayAsc = 'CHANGE_USD_7_DAY_ASC',
  ChangeUsd_7DayDesc = 'CHANGE_USD_7_DAY_DESC',
  ChangeUsd_24HourAsc = 'CHANGE_USD_24_HOUR_ASC',
  ChangeUsd_24HourDesc = 'CHANGE_USD_24_HOUR_DESC',
  ChangeUsd_30DayAsc = 'CHANGE_USD_30_DAY_ASC',
  ChangeUsd_30DayDesc = 'CHANGE_USD_30_DAY_DESC',
  CreationTimeAsc = 'CREATION_TIME_ASC',
  CreationTimeDesc = 'CREATION_TIME_DESC',
  FloorPriceAsc = 'FLOOR_PRICE_ASC',
  FloorPriceDesc = 'FLOOR_PRICE_DESC',
  /**
   * Custom display order for Launchpad:
   * 1. >100 mints in last 24 hours
   * 2. 14d mint volume
   * 3. Sold out to bottom
   */
  LaunchpadDisplayOrder = 'LAUNCHPAD_DISPLAY_ORDER',
  ListedTokensAsc = 'LISTED_TOKENS_ASC',
  ListedTokensDesc = 'LISTED_TOKENS_DESC',
  MarketCapAsc = 'MARKET_CAP_ASC',
  MarketCapDesc = 'MARKET_CAP_DESC',
  MintCount_14DayAsc = 'MINT_COUNT_14_DAY_ASC',
  MintCount_14DayDesc = 'MINT_COUNT_14_DAY_DESC',
  MintCount_24HourAsc = 'MINT_COUNT_24_HOUR_ASC',
  MintCount_24HourDesc = 'MINT_COUNT_24_HOUR_DESC',
  MintPriceAsc = 'MINT_PRICE_ASC',
  MintPriceDesc = 'MINT_PRICE_DESC',
  MintStartTimeAsc = 'MINT_START_TIME_ASC',
  MintStartTimeDesc = 'MINT_START_TIME_DESC',
  MintVolume_14DayAsc = 'MINT_VOLUME_14_DAY_ASC',
  MintVolume_14DayDesc = 'MINT_VOLUME_14_DAY_DESC',
  MintVolume_24HourAsc = 'MINT_VOLUME_24_HOUR_ASC',
  MintVolume_24HourDesc = 'MINT_VOLUME_24_HOUR_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  NumOwnersAsc = 'NUM_OWNERS_ASC',
  NumOwnersDesc = 'NUM_OWNERS_DESC',
  NumTokensAirdroppedAsc = 'NUM_TOKENS_AIRDROPPED_ASC',
  NumTokensAirdroppedDesc = 'NUM_TOKENS_AIRDROPPED_DESC',
  NumTokensMintedAsc = 'NUM_TOKENS_MINTED_ASC',
  NumTokensMintedDesc = 'NUM_TOKENS_MINTED_DESC',
  NumTokensTotalAsc = 'NUM_TOKENS_TOTAL_ASC',
  NumTokensTotalDesc = 'NUM_TOKENS_TOTAL_DESC',
  PercentMintedAsc = 'PERCENT_MINTED_ASC',
  PercentMintedDesc = 'PERCENT_MINTED_DESC',
  RoyaltyPercentAsc = 'ROYALTY_PERCENT_ASC',
  RoyaltyPercentDesc = 'ROYALTY_PERCENT_DESC',
  SalesCountAsc = 'SALES_COUNT_ASC',
  SalesCountDesc = 'SALES_COUNT_DESC',
  UniquePaidMintersPercentAsc = 'UNIQUE_PAID_MINTERS_PERCENT_ASC',
  UniquePaidMintersPercentDesc = 'UNIQUE_PAID_MINTERS_PERCENT_DESC',
  Volume_6HourAsc = 'VOLUME_6_HOUR_ASC',
  Volume_6HourDesc = 'VOLUME_6_HOUR_DESC',
  Volume_7DayAsc = 'VOLUME_7_DAY_ASC',
  Volume_7DayDesc = 'VOLUME_7_DAY_DESC',
  Volume_24HourAsc = 'VOLUME_24_HOUR_ASC',
  Volume_24HourDesc = 'VOLUME_24_HOUR_DESC',
  Volume_30DayAsc = 'VOLUME_30_DAY_ASC',
  Volume_30DayDesc = 'VOLUME_30_DAY_DESC',
  VolumeAllTimeAsc = 'VOLUME_ALL_TIME_ASC',
  VolumeAllTimeDesc = 'VOLUME_ALL_TIME_DESC',
  VolumeUsd_6HourAsc = 'VOLUME_USD_6_HOUR_ASC',
  VolumeUsd_6HourDesc = 'VOLUME_USD_6_HOUR_DESC',
  VolumeUsd_7DayAsc = 'VOLUME_USD_7_DAY_ASC',
  VolumeUsd_7DayDesc = 'VOLUME_USD_7_DAY_DESC',
  VolumeUsd_24HourAsc = 'VOLUME_USD_24_HOUR_ASC',
  VolumeUsd_24HourDesc = 'VOLUME_USD_24_HOUR_DESC',
  VolumeUsd_30DayAsc = 'VOLUME_USD_30_DAY_ASC',
  VolumeUsd_30DayDesc = 'VOLUME_USD_30_DAY_DESC',
  VolumeUsdAllTimeAsc = 'VOLUME_USD_ALL_TIME_ASC',
  VolumeUsdAllTimeDesc = 'VOLUME_USD_ALL_TIME_DESC'
}

/** Stats are refreshed every 15 mins with the worker process. */
export type CollectionStats = {
  __typename?: 'CollectionStats';
  bestOffer?: Maybe<Scalars['MicroAmount']['output']>;
  category?: Maybe<CollectionCategories>;
  change6HourPercent?: Maybe<Scalars['Float']['output']>;
  change7DayPercent?: Maybe<Scalars['Float']['output']>;
  change24HourPercent?: Maybe<Scalars['Float']['output']>;
  change30dayPercent?: Maybe<Scalars['Float']['output']>;
  changeUsd6hourPercent?: Maybe<Scalars['Float']['output']>;
  changeUsd7dayPercent?: Maybe<Scalars['Float']['output']>;
  changeUsd24hourPercent?: Maybe<Scalars['Float']['output']>;
  changeUsd30dayPercent?: Maybe<Scalars['Float']['output']>;
  collectionAddr: Scalars['ID']['output'];
  marketCap?: Maybe<Scalars['MicroAmount']['output']>;
  mintChange14DayPercent?: Maybe<Scalars['Float']['output']>;
  mintChange24HourPercent?: Maybe<Scalars['Float']['output']>;
  mintCount14day?: Maybe<Scalars['Int']['output']>;
  mintCount24hour?: Maybe<Scalars['Int']['output']>;
  mintVolume14day?: Maybe<Scalars['MicroAmount']['output']>;
  mintVolume24hour?: Maybe<Scalars['MicroAmount']['output']>;
  numOwners?: Maybe<Scalars['Int']['output']>;
  salesCountTotal?: Maybe<Scalars['Int']['output']>;
  tokensMintedPercent?: Maybe<Scalars['Float']['output']>;
  uniqueOwnerPercent?: Maybe<Scalars['Float']['output']>;
  uniquePaidMintersPercent?: Maybe<Scalars['Float']['output']>;
  volume6Hour?: Maybe<Scalars['MicroAmount']['output']>;
  volume7Day?: Maybe<Scalars['MicroAmount']['output']>;
  volume24Hour?: Maybe<Scalars['MicroAmount']['output']>;
  volume30Day?: Maybe<Scalars['MicroAmount']['output']>;
  volumeTotal?: Maybe<Scalars['MicroAmount']['output']>;
  volumeUsd6hour?: Maybe<Scalars['Float']['output']>;
  volumeUsd7day?: Maybe<Scalars['Float']['output']>;
  volumeUsd24hour?: Maybe<Scalars['Float']['output']>;
  volumeUsd30day?: Maybe<Scalars['Float']['output']>;
  volumeUsdTotal?: Maybe<Scalars['Float']['output']>;
};

export type CollectionTimePeriodSalesStat = CollectionSalesStat & {
  __typename?: 'CollectionTimePeriodSalesStat';
  averagePriceStars?: Maybe<Scalars['MicroAmount']['output']>;
  averagePriceUsd?: Maybe<Scalars['Float']['output']>;
  salesCount?: Maybe<Scalars['Int']['output']>;
  timePeriod?: Maybe<Scalars['String']['output']>;
  volumeStars?: Maybe<Scalars['MicroAmount']['output']>;
  volumeUsd?: Maybe<Scalars['Float']['output']>;
};

export type CollectionTokenCounts = {
  __typename?: 'CollectionTokenCounts';
  /** Number of tokens that are minted and not burned. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Number of tokens airdropped. */
  airdropped?: Maybe<Scalars['Int']['output']>;
  /** Number of tokens burned. */
  burned?: Maybe<Scalars['Int']['output']>;
  /**
   * Number of tokens that are returned from collectionsWithCounts query.
   * @deprecated Use collectionCounts query instead.
   */
  current?: Maybe<Scalars['Int']['output']>;
  /** Number of tokens for sale. */
  listed?: Maybe<Scalars['Int']['output']>;
  /** Number of tokens remaining to mint. */
  mintable?: Maybe<Scalars['Int']['output']>;
  /** Number of tokens minted. */
  minted?: Maybe<Scalars['Int']['output']>;
  /** Total number of tokens possible (from the minter). */
  total?: Maybe<Scalars['Int']['output']>;
};

export type CollectionTrait = {
  __typename?: 'CollectionTrait';
  name: Scalars['String']['output'];
  values: Array<CollectionTraitValue>;
};

export type CollectionTraitValue = {
  __typename?: 'CollectionTraitValue';
  numTokens: Scalars['Int']['output'];
  numTokensForSale: Scalars['Int']['output'];
  rarityPercent?: Maybe<Scalars['Float']['output']>;
  value: Scalars['String']['output'];
};

export type CollectionsResult = PaginatedQuery & {
  __typename?: 'CollectionsResult';
  collections: Array<Collection>;
  pageInfo?: Maybe<PageInfo>;
};

export type CursorPageInfo = {
  __typename?: 'CursorPageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type CursorPaginatedQuery = {
  pageInfo?: Maybe<CursorPageInfo>;
};

export enum DateGranularity {
  Day = 'DAY',
  Hour = 'HOUR',
  Month = 'MONTH',
  Quarter = 'QUARTER',
  Week = 'WEEK',
  Year = 'YEAR'
}

export enum DatePreset {
  AllTime = 'ALL_TIME',
  Last_7Days = 'LAST_7_DAYS',
  Last_24Hours = 'LAST_24_HOURS',
  Last_30Days = 'LAST_30_DAYS',
  Last_90Days = 'LAST_90_DAYS',
  LastYear = 'LAST_YEAR'
}

export type DateRange = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type DateRangeInput = {
  gte?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
};

export type Event = {
  cursor?: Maybe<Scalars['ID']['output']>;
};

export enum EventSort {
  BlockHeightAsc = 'BLOCK_HEIGHT_ASC',
  BlockHeightDesc = 'BLOCK_HEIGHT_DESC'
}

export type Image = {
  __typename?: 'Image';
  baseUrl?: Maybe<Scalars['String']['output']>;
  format?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  isAnimated?: Maybe<Scalars['Boolean']['output']>;
  jpgLink?: Maybe<Scalars['String']['output']>;
  mp4Link?: Maybe<Scalars['String']['output']>;
  webmLink?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export enum ImageSize {
  Lg = 'LG',
  Md = 'MD',
  Sm = 'SM',
  Xl = 'XL',
  Xs = 'XS'
}

export type LiveAuction = {
  __typename?: 'LiveAuction';
  /** Auction duration in seconds. */
  duration?: Maybe<Scalars['Int']['output']>;
  /** End time of the live auction. */
  endTime?: Maybe<Scalars['String']['output']>;
  /** The current highest bid details in the auction. */
  highestBid?: Maybe<Offer>;
  /** Seller wallet details including address and name. */
  seller?: Maybe<WalletAccount>;
  /** Start time of the live auction. */
  startTime?: Maybe<Scalars['String']['output']>;
};

export type Media = {
  __typename?: 'Media';
  /** @deprecated No longer supported */
  fileExtension?: Maybe<Scalars['String']['output']>;
  /** @deprecated No longer supported */
  format?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  /** @deprecated No longer supported */
  image?: Maybe<Image>;
  /** @deprecated No longer supported */
  isPixel?: Maybe<Scalars['Boolean']['output']>;
  /** @deprecated No longer supported */
  originalUrl?: Maybe<Scalars['String']['output']>;
  type?: Maybe<MediaType>;
  url?: Maybe<Scalars['String']['output']>;
  visualAssets?: Maybe<SizedVisualAssets>;
  width?: Maybe<Scalars['Int']['output']>;
};


export type MediaImageArgs = {
  size?: InputMaybe<ImageSize>;
};

export enum MediaType {
  AnimatedImage = 'animated_image',
  Audio = 'audio',
  Html = 'html',
  Image = 'image',
  Pdf = 'pdf',
  Unknown = 'unknown',
  VectorGraphic = 'vector_graphic',
  Video = 'video'
}

export type MintCount = {
  __typename?: 'MintCount';
  publicLimit: Scalars['Int']['output'];
  publicMintCount: Scalars['Int']['output'];
  whitelistLimit: Scalars['Int']['output'];
  whitelistMintCount: Scalars['Int']['output'];
  whitelistType: WhitelistType;
};

export type Minter = {
  __typename?: 'Minter';
  /** Minter contract address */
  contractAddress?: Maybe<Scalars['String']['output']>;
  preSale?: Maybe<MinterPreSale>;
  publicSale?: Maybe<MinterPublicSale>;
  type?: Maybe<Scalars['String']['output']>;
};

export type MinterPreSale = MinterSale & {
  __typename?: 'MinterPreSale';
  contractAddress?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['UnixNanoseconds']['output']>;
  /** @deprecated use isMember instead and pass walletAddress to minter. */
  hasMember?: Maybe<Scalars['Boolean']['output']>;
  isMember?: Maybe<Scalars['Boolean']['output']>;
  mintPrice?: Maybe<CoinAmount>;
  numMembers?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use tokenCounts instead with/without walletAddress */
  perAddressLimit?: Maybe<Scalars['Int']['output']>;
  startTime?: Maybe<Scalars['UnixNanoseconds']['output']>;
  tokenCounts?: Maybe<MinterTokenCounts>;
  type?: Maybe<PresaleType>;
};


export type MinterPreSaleHasMemberArgs = {
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

export type MinterPublicSale = MinterSale & {
  __typename?: 'MinterPublicSale';
  contractAddress?: Maybe<Scalars['String']['output']>;
  discountPrice?: Maybe<CoinAmount>;
  endTime?: Maybe<Scalars['UnixNanoseconds']['output']>;
  mintPrice?: Maybe<CoinAmount>;
  numMembers?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use tokenCounts instead with/without walletAddress */
  perAddressLimit?: Maybe<Scalars['Int']['output']>;
  startTime?: Maybe<Scalars['UnixNanoseconds']['output']>;
  tokenCounts?: Maybe<MinterTokenCounts>;
};

export type MinterSale = {
  endTime?: Maybe<Scalars['UnixNanoseconds']['output']>;
  mintPrice?: Maybe<CoinAmount>;
  numMembers?: Maybe<Scalars['Int']['output']>;
  /** @deprecated Use tokenCounts instead with/without walletAddress */
  perAddressLimit?: Maybe<Scalars['Int']['output']>;
  startTime?: Maybe<Scalars['UnixNanoseconds']['output']>;
  tokenCounts?: Maybe<MinterTokenCounts>;
};

export type MinterTokenCounts = {
  __typename?: 'MinterTokenCounts';
  limit?: Maybe<Scalars['Int']['output']>;
  mintable?: Maybe<Scalars['Int']['output']>;
  minted?: Maybe<Scalars['Int']['output']>;
};

export type Name = {
  __typename?: 'Name';
  associatedAddr?: Maybe<Scalars['String']['output']>;
  highestOffer?: Maybe<Offer>;
  image?: Maybe<Scalars['String']['output']>;
  media?: Maybe<Media>;
  mintedAt?: Maybe<Scalars['String']['output']>;
  name: Scalars['ID']['output'];
  ownerAddr?: Maybe<Scalars['String']['output']>;
  records?: Maybe<Array<NameRecord>>;
};

export type NameRecord = {
  __typename?: 'NameRecord';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export enum NameSortBy {
  MintedAtAsc = 'MINTED_AT_ASC',
  MintedAtDesc = 'MINTED_AT_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  OffersAsc = 'OFFERS_ASC',
  OffersDesc = 'OFFERS_DESC'
}

export type NamesResult = {
  __typename?: 'NamesResult';
  names: Array<Name>;
  pageInfo?: Maybe<PageInfo>;
};

export type Offer = {
  __typename?: 'Offer';
  collection?: Maybe<Collection>;
  collectionAddr?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  expires?: Maybe<Scalars['String']['output']>;
  floorPriceDifferencePercent?: Maybe<Scalars['Float']['output']>;
  from?: Maybe<WalletAccount>;
  fromAddr?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Name>;
  price: Scalars['MicroAmount']['output'];
  saleType?: Maybe<SaleType>;
  token?: Maybe<Token>;
  tokenId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<OfferType>;
};

export enum OfferType {
  CollectionOffer = 'COLLECTION_OFFER',
  LiveAuctionOffer = 'LIVE_AUCTION_OFFER',
  NameOffer = 'NAME_OFFER',
  TokenOffer = 'TOKEN_OFFER'
}

export type OffersResult = PaginatedQuery & {
  __typename?: 'OffersResult';
  offers?: Maybe<Array<Offer>>;
  pageInfo?: Maybe<PageInfo>;
};

export type OwnedCollection = {
  __typename?: 'OwnedCollection';
  collection: Collection;
  items: Scalars['Int']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  limit?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PaginatedQuery = {
  pageInfo?: Maybe<PageInfo>;
};

export enum PresaleType {
  /** FLEX - Presale mints don't count towards total mintable */
  Flex = 'FLEX',
  /** REGULAR - Presale mints DO count towards total mintable */
  Regular = 'REGULAR'
}

export type PriceFilter = {
  /** Maximum listed token price for filtering. */
  max?: InputMaybe<Scalars['Float']['input']>;
  /** Minimum listed token price for filtering. */
  min?: InputMaybe<Scalars['Float']['input']>;
};

export type Query = {
  __typename?: 'Query';
  analytics?: Maybe<Analytics>;
  /** Retrieve a list of badges owned by a specific wallet. */
  badges?: Maybe<TokensResult>;
  collection?: Maybe<Collection>;
  collectionCategories?: Maybe<Array<CollectionCategoryInfo>>;
  collectionCounts?: Maybe<CollectionCountsResult>;
  collectionOffers?: Maybe<CollectionOffersResult>;
  collectionSales?: Maybe<CollectionSalesResult>;
  collections?: Maybe<CollectionsResult>;
  /** @deprecated Use collectionsCounts query instead. */
  collectionsWithCounts?: Maybe<CollectionsResult>;
  /** @deprecated No longer supported */
  media?: Maybe<Media>;
  name?: Maybe<Name>;
  names?: Maybe<NamesResult>;
  offers?: Maybe<OffersResult>;
  /** Retrieve a single token by its collection address and token ID. */
  token?: Maybe<Token>;
  /** Retrieve a list of token events which aren't included in the standard tokens query based on various filters. */
  tokenEvents?: Maybe<TokenEvents>;
  /** Retrieve a list of token sales based on various filters and sorting criteria. */
  tokenSales?: Maybe<TokenSalesResults>;
  /** Retrieve a list of tokens based on various filters and sorting criteria. */
  tokens?: Maybe<TokensResult>;
  wallet?: Maybe<WalletAccount>;
  wallets?: Maybe<WalletsResult>;
};


export type QueryBadgesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ownerAddrOrName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionArgs = {
  address: Scalars['String']['input'];
};


export type QueryCollectionCountsArgs = {
  filterForSale?: InputMaybe<SaleType>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  seller?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionOffersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  collectionAddr: Scalars['String']['input'];
};


export type QueryCollectionSalesArgs = {
  address: Scalars['String']['input'];
  filterByDatePreset?: InputMaybe<DatePreset>;
  filterByDateRange?: InputMaybe<DateRange>;
  granularity: DateGranularity;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCollectionsArgs = {
  filterByAddrs?: InputMaybe<Array<Scalars['String']['input']>>;
  filterByCategories?: InputMaybe<Array<Scalars['String']['input']>>;
  filterByCreators?: InputMaybe<Array<Scalars['String']['input']>>;
  filterByFeatured?: InputMaybe<Array<CollectionFeaturedType>>;
  filterByMintStatus?: InputMaybe<Array<CollectionMintStatus>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  minMaxFilters?: InputMaybe<CollectionMinMaxFilters>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<CollectionSort>;
};


export type QueryCollectionsWithCountsArgs = {
  filterForSale?: InputMaybe<SaleType>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  seller?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMediaArgs = {
  url: Scalars['String']['input'];
};


export type QueryNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryNamesArgs = {
  associatedAddr?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ownerAddr?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<NameSortBy>;
};


export type QueryOffersArgs = {
  filterByTypes?: InputMaybe<Array<InputMaybe<OfferType>>>;
  fromAddr?: InputMaybe<Scalars['String']['input']>;
  toAddr?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTokenArgs = {
  collectionAddr: Scalars['String']['input'];
  tokenId: Scalars['String']['input'];
};


export type QueryTokenEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  collectionAddr?: InputMaybe<Scalars['String']['input']>;
  filterByTokenEventTypes?: InputMaybe<Array<ActivityType>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTokenSalesArgs = {
  filterByCollectionAddrs?: InputMaybe<Array<Scalars['String']['input']>>;
  filterByDatePreset?: InputMaybe<DatePreset>;
  filterByDateRange?: InputMaybe<DateRange>;
  filterBySale?: InputMaybe<Array<TokenSaleType>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<TokenSaleSort>;
};


export type QueryTokensArgs = {
  collectionAddr?: InputMaybe<Scalars['String']['input']>;
  filterAuctionEndByDate?: InputMaybe<DateRange>;
  filterAuctionEndByPreset?: InputMaybe<AuctionEndPreset>;
  filterByCollectionAddrs?: InputMaybe<Array<Scalars['String']['input']>>;
  filterByPrice?: InputMaybe<PriceFilter>;
  filterByTraits?: InputMaybe<Array<TraitFilter>>;
  filterForSale?: InputMaybe<SaleType>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ownerAddrOrName?: InputMaybe<Scalars['String']['input']>;
  sellerAddrOrName?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<TokenSort>;
};


export type QueryWalletArgs = {
  address: Scalars['String']['input'];
  filterByTime?: InputMaybe<WalletStatsTimeSeries>;
};


export type QueryWalletsArgs = {
  filterByTime?: InputMaybe<WalletStatsTimeSeries>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<WalletSort>;
};

export type RoyaltyInfo = {
  __typename?: 'RoyaltyInfo';
  paymentAddress?: Maybe<Scalars['String']['output']>;
  sharePercent?: Maybe<Scalars['Float']['output']>;
};

export enum SaleType {
  /** Any type of sale. */
  Any = 'ANY',
  /** Tokens available in a non-live auction. */
  Auction = 'AUCTION',
  /** Listings that have expired. */
  Expired = 'EXPIRED',
  /** Tokens with a fixed price. */
  FixedPrice = 'FIXED_PRICE',
  /** Tokens that are currently listed. */
  Listed = 'LISTED',
  /** Tokens available in a live auction. */
  LiveAuction = 'LIVE_AUCTION',
  /** Tokens that are not currently listed. */
  Unlisted = 'UNLISTED'
}

export type SizedVisualAssets = {
  __typename?: 'SizedVisualAssets';
  lg?: Maybe<VisualAsset>;
  md?: Maybe<VisualAsset>;
  sm?: Maybe<VisualAsset>;
  xl?: Maybe<VisualAsset>;
  xs?: Maybe<VisualAsset>;
};

/** Represents the main structure of an NFT token. */
export type Token = {
  __typename?: 'Token';
  /** Activity history associated with the token, filterable by activity type and sorting criteria. */
  activity?: Maybe<Array<TokenActivity>>;
  /** Current live auction details, if applicable. */
  auction?: Maybe<LiveAuction>;
  /** Collection to which the token belongs. */
  collection: Collection;
  /** Description of the token. */
  description?: Maybe<Scalars['String']['output']>;
  /** Edition number of the token. */
  edition?: Maybe<Scalars['Int']['output']>;
  /** The expiry date and time of the token listing or offer. */
  expiresAtDateTime?: Maybe<Scalars['String']['output']>;
  /** Retrieves the highest offer made on this token, filterable by address. */
  highestOffer?: Maybe<Offer>;
  /** Unique identifier in format: "<collection addr>/<token id>". */
  id: Scalars['ID']['output'];
  /** Indicates if the token contains explicit content. */
  isExplicit?: Maybe<Scalars['Boolean']['output']>;
  /**
   * (Deprecated) The price at which the token last sold for.
   * @deprecated Use lastSalePrice instead for denom support
   */
  lastSale?: Maybe<Scalars['MicroAmount']['output']>;
  /** The price at which the token last sold for. */
  lastSalePrice?: Maybe<CoinAmount>;
  /** Current listed price of the token. */
  listPrice?: Maybe<CoinAmount>;
  /** Date when the token was listed for sale. */
  listedAt?: Maybe<Scalars['String']['output']>;
  /** Media associated with the token. */
  media?: Maybe<Media>;
  /** Price at which the token was minted. */
  mintPrice?: Maybe<Scalars['MicroAmount']['output']>;
  /** Date when the token was minted. */
  mintedAt?: Maybe<Scalars['String']['output']>;
  /** Token's name. */
  name?: Maybe<Scalars['String']['output']>;
  /** List of offers made on this token, filterable by offer type and wallet address. */
  offers?: Maybe<Array<Offer>>;
  /** Indicates if actions on the token are restricted to its owner only. */
  onlyOwner?: Maybe<Scalars['Boolean']['output']>;
  /** The wallet address of the Current owner of the token. */
  owner?: Maybe<WalletAccount>;
  /**
   * Current listed price of the token. (deprecated)
   * @deprecated Use listPrice for denom support.
   */
  price?: Maybe<Scalars['MicroAmount']['output']>;
  /** Order based on rarity. */
  rarityOrder?: Maybe<Scalars['Int']['output']>;
  /** Score based on rarity. */
  rarityScore?: Maybe<Scalars['Float']['output']>;
  /** The address for which this token is reserved, if applicable. */
  reserveFor?: Maybe<WalletAccount>;
  /** Type of sale (e.g., fixed price, auction) the token is currently listed under. */
  saleType?: Maybe<SaleType>;
  /** Per-collection unique token ID. */
  tokenId: Scalars['String']['output'];
  /** URI for token data. */
  tokenUri?: Maybe<Scalars['String']['output']>;
  /** List of token traits. */
  traits?: Maybe<Array<TokenTrait>>;
};


/** Represents the main structure of an NFT token. */
export type TokenActivityArgs = {
  filterByActivity?: InputMaybe<ActivityType>;
  sortBy?: InputMaybe<EventSort>;
};


/** Represents the main structure of an NFT token. */
export type TokenHighestOfferArgs = {
  filterByAddr?: InputMaybe<Scalars['String']['input']>;
};


/** Represents the main structure of an NFT token. */
export type TokenOffersArgs = {
  filterByAddr?: InputMaybe<Scalars['String']['input']>;
  filterByOffer?: InputMaybe<OfferType>;
};

/** Represents detailed token activity. */
export type TokenActivity = {
  __typename?: 'TokenActivity';
  /** Price associated with the activity. */
  activityPrice?: Maybe<CoinAmount>;
  /** Date of the activity. */
  date?: Maybe<Scalars['String']['output']>;
  /** Expiry date/time. */
  expires?: Maybe<Scalars['String']['output']>;
  /** Wallet account of the sender. */
  from?: Maybe<WalletAccount>;
  /** Unique identifier. */
  id: Scalars['ID']['output'];
  /**
   * Deprecated: Price associated with the activity.
   * @deprecated Use activityPrice for denom support.
   */
  price?: Maybe<Scalars['MicroAmount']['output']>;
  /** Wallet account of the receiver. */
  to?: Maybe<WalletAccount>;
  /** Transaction ID. */
  txId?: Maybe<Scalars['String']['output']>;
  /** Type of activity. */
  type?: Maybe<ActivityType>;
};

/** Represents an individual token event. */
export type TokenEvent = Event & {
  __typename?: 'TokenEvent';
  /** Unique cursor for pagination. */
  cursor?: Maybe<Scalars['ID']['output']>;
  /** Date of the event. */
  date?: Maybe<Scalars['String']['output']>;
  /** Price associated with the event. */
  price?: Maybe<Scalars['MicroAmount']['output']>;
  /** Price in USD. */
  priceUsd?: Maybe<Scalars['String']['output']>;
  /** The associated token. */
  token?: Maybe<Token>;
  /** Type of token activity. */
  type?: Maybe<ActivityType>;
};

/** Represents a paginated result of token events. */
export type TokenEvents = CursorPaginatedQuery & {
  __typename?: 'TokenEvents';
  /** List of token events. */
  events?: Maybe<Array<Maybe<TokenEvent>>>;
  /** Pagination info. */
  pageInfo?: Maybe<CursorPageInfo>;
};

export type TokenSale = {
  __typename?: 'TokenSale';
  /** Wallet info of the buyer including wallet address and name. */
  buyer?: Maybe<WalletAccount>;
  /** Wallet address of the buyer. */
  buyerAddr?: Maybe<Scalars['String']['output']>;
  /** Details of the token's collection. */
  collection?: Maybe<Collection>;
  /** Address of the token's collection. */
  collectionAddr?: Maybe<Scalars['String']['output']>;
  /** Date of the sale. */
  date?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the token sale. */
  id: Scalars['ID']['output'];
  /** Price at which the token was sold. */
  price?: Maybe<Scalars['MicroAmount']['output']>;
  /** Price in USD at which the token was sold. */
  priceUsd?: Maybe<Scalars['Float']['output']>;
  /** Type of the token sale. */
  saleType?: Maybe<TokenSaleType>;
  /** Wallet info of the seller including wallet address and name. */
  seller?: Maybe<WalletAccount>;
  /** Wallet address of the seller. */
  sellerAddr?: Maybe<Scalars['String']['output']>;
  /** Details of the sold token. */
  token?: Maybe<Token>;
  /** ID of the sold token. */
  tokenId?: Maybe<Scalars['String']['output']>;
};

export enum TokenSaleSort {
  RarityAsc = 'RARITY_ASC',
  RarityDesc = 'RARITY_DESC',
  SaleTimeAsc = 'SALE_TIME_ASC',
  SaleTimeDesc = 'SALE_TIME_DESC',
  StarsPriceAsc = 'STARS_PRICE_ASC',
  StarsPriceDesc = 'STARS_PRICE_DESC',
  TokenIdAsc = 'TOKEN_ID_ASC',
  TokenIdDesc = 'TOKEN_ID_DESC',
  UsdPriceAsc = 'USD_PRICE_ASC',
  UsdPriceDesc = 'USD_PRICE_DESC'
}

export enum TokenSaleType {
  /** Tokens sold in an auction. */
  Auction = 'AUCTION',
  /** Offers made for any token in a collection. */
  CollectionOffer = 'COLLECTION_OFFER',
  /** Tokens sold at a fixed price. */
  FixedPrice = 'FIXED_PRICE',
  /** Tokens sold via an offer. */
  Offer = 'OFFER'
}

export type TokenSalesResults = PaginatedQuery & {
  __typename?: 'TokenSalesResults';
  /** Pagination information. */
  pageInfo?: Maybe<PageInfo>;
  /** List of token sales as per query. */
  tokenSales: Array<TokenSale>;
};

export enum TokenSort {
  /** Sort tokens by collection address and token ID in ascending order. */
  CollectionAddrTokenIdAsc = 'COLLECTION_ADDR_TOKEN_ID_ASC',
  /** Sort tokens by their listing date/time in ascending order. */
  ListedAsc = 'LISTED_ASC',
  /** Sort tokens by their listing date/time in descending order. */
  ListedDesc = 'LISTED_DESC',
  /** Sort tokens by the end time of live auctions in ascending order. */
  LiveAuctionEndTimeAsc = 'LIVE_AUCTION_END_TIME_ASC',
  /** Sort tokens by the highest bid in live auctions in ascending order. */
  LiveAuctionHighestBidAsc = 'LIVE_AUCTION_HIGHEST_BID_ASC',
  /** Sort tokens by the highest bid in live auctions in descending order. */
  LiveAuctionHighestBidDesc = 'LIVE_AUCTION_HIGHEST_BID_DESC',
  /** Sort tokens by their minting date/time in ascending order. */
  MintedAsc = 'MINTED_ASC',
  /** Sort tokens by their minting date/time in descending order. */
  MintedDesc = 'MINTED_DESC',
  /** Sort tokens by their name in ascending order. */
  NameAsc = 'NAME_ASC',
  /** Sort tokens by their name in descending order. */
  NameDesc = 'NAME_DESC',
  /** Sort tokens by price in ascending order. */
  PriceAsc = 'PRICE_ASC',
  /** Sort tokens by price in descending order. */
  PriceDesc = 'PRICE_DESC',
  /** Sort tokens by rarity in ascending order. */
  RarityAsc = 'RARITY_ASC',
  /** Sort tokens by rarity in descending order. */
  RarityDesc = 'RARITY_DESC',
  /** Sort tokens by their ID in descending order. */
  TokenIdDesc = 'TOKEN_ID_DESC'
}

/** Represents the traits of an NFT token. */
export type TokenTrait = {
  __typename?: 'TokenTrait';
  /** The name of the trait. */
  name: Scalars['String']['output'];
  /** A metric to represent the overall rarity. */
  rarity?: Maybe<Scalars['Float']['output']>;
  /** The rarity percentage associated with the trait. */
  rarityPercent?: Maybe<Scalars['Float']['output']>;
  /** The rarity score associated with the trait. */
  rarityScore?: Maybe<Scalars['Float']['output']>;
  /** The value of the trait. */
  value: Scalars['String']['output'];
};

export type TokensResult = PaginatedQuery & {
  __typename?: 'TokensResult';
  /** Pagination information. */
  pageInfo?: Maybe<PageInfo>;
  /** List of tokens as per query. */
  tokens: Array<Token>;
};

export type TraitFilter = {
  /** Name of the trait to filter by. */
  name: Scalars['String']['input'];
  /** Value of the trait to filter by. */
  value: Scalars['String']['input'];
};

/** Can be an image or video asset. */
export type VisualAsset = {
  __typename?: 'VisualAsset';
  height?: Maybe<Scalars['Int']['output']>;
  /** Static version of this visual asset. Still image if video, or identical to url for images. */
  staticUrl?: Maybe<Scalars['String']['output']>;
  /** The type of media of the main url. */
  type?: Maybe<MediaType>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type WalletAccount = {
  __typename?: 'WalletAccount';
  address: Scalars['ID']['output'];
  name?: Maybe<Name>;
  stats?: Maybe<WalletStats>;
};

export enum WalletSort {
  BuyVolume_7DayAsc = 'BUY_VOLUME_7_DAY_ASC',
  BuyVolume_7DayDesc = 'BUY_VOLUME_7_DAY_DESC',
  BuyVolume_24HourAsc = 'BUY_VOLUME_24_HOUR_ASC',
  BuyVolume_24HourDesc = 'BUY_VOLUME_24_HOUR_DESC',
  BuyVolume_30DayAsc = 'BUY_VOLUME_30_DAY_ASC',
  BuyVolume_30DayDesc = 'BUY_VOLUME_30_DAY_DESC',
  BuyVolumeAllTimeAsc = 'BUY_VOLUME_ALL_TIME_ASC',
  BuyVolumeAllTimeDesc = 'BUY_VOLUME_ALL_TIME_DESC',
  BuyVolumeUsd_7DayAsc = 'BUY_VOLUME_USD_7_DAY_ASC',
  BuyVolumeUsd_7DayDesc = 'BUY_VOLUME_USD_7_DAY_DESC',
  BuyVolumeUsd_24HourAsc = 'BUY_VOLUME_USD_24_HOUR_ASC',
  BuyVolumeUsd_24HourDesc = 'BUY_VOLUME_USD_24_HOUR_DESC',
  BuyVolumeUsd_30DayAsc = 'BUY_VOLUME_USD_30_DAY_ASC',
  BuyVolumeUsd_30DayDesc = 'BUY_VOLUME_USD_30_DAY_DESC',
  BuyVolumeUsdAllTimeAsc = 'BUY_VOLUME_USD_ALL_TIME_ASC',
  BuyVolumeUsdAllTimeDesc = 'BUY_VOLUME_USD_ALL_TIME_DESC',
  MintVolume_7DayAsc = 'MINT_VOLUME_7_DAY_ASC',
  MintVolume_7DayDesc = 'MINT_VOLUME_7_DAY_DESC',
  MintVolume_24HourAsc = 'MINT_VOLUME_24_HOUR_ASC',
  MintVolume_24HourDesc = 'MINT_VOLUME_24_HOUR_DESC',
  MintVolume_30DayAsc = 'MINT_VOLUME_30_DAY_ASC',
  MintVolume_30DayDesc = 'MINT_VOLUME_30_DAY_DESC',
  MintVolumeAllTimeAsc = 'MINT_VOLUME_ALL_TIME_ASC',
  MintVolumeAllTimeDesc = 'MINT_VOLUME_ALL_TIME_DESC',
  MintVolumeUsd_7DayAsc = 'MINT_VOLUME_USD_7_DAY_ASC',
  MintVolumeUsd_7DayDesc = 'MINT_VOLUME_USD_7_DAY_DESC',
  MintVolumeUsd_24HourAsc = 'MINT_VOLUME_USD_24_HOUR_ASC',
  MintVolumeUsd_24HourDesc = 'MINT_VOLUME_USD_24_HOUR_DESC',
  MintVolumeUsd_30DayAsc = 'MINT_VOLUME_USD_30_DAY_ASC',
  MintVolumeUsd_30DayDesc = 'MINT_VOLUME_USD_30_DAY_DESC',
  MintVolumeUsdAllTimeAsc = 'MINT_VOLUME_USD_ALL_TIME_ASC',
  MintVolumeUsdAllTimeDesc = 'MINT_VOLUME_USD_ALL_TIME_DESC',
  NumBuys_7DayAsc = 'NUM_BUYS_7_DAY_ASC',
  NumBuys_7DayDesc = 'NUM_BUYS_7_DAY_DESC',
  NumBuys_24HourAsc = 'NUM_BUYS_24_HOUR_ASC',
  NumBuys_24HourDesc = 'NUM_BUYS_24_HOUR_DESC',
  NumBuys_30DayAsc = 'NUM_BUYS_30_DAY_ASC',
  NumBuys_30DayDesc = 'NUM_BUYS_30_DAY_DESC',
  NumBuysAllTimeAsc = 'NUM_BUYS_ALL_TIME_ASC',
  NumBuysAllTimeDesc = 'NUM_BUYS_ALL_TIME_DESC',
  NumMints_7DayAsc = 'NUM_MINTS_7_DAY_ASC',
  NumMints_7DayDesc = 'NUM_MINTS_7_DAY_DESC',
  NumMints_24HourAsc = 'NUM_MINTS_24_HOUR_ASC',
  NumMints_24HourDesc = 'NUM_MINTS_24_HOUR_DESC',
  NumMints_30DayAsc = 'NUM_MINTS_30_DAY_ASC',
  NumMints_30DayDesc = 'NUM_MINTS_30_DAY_DESC',
  NumMintsAllTimeAsc = 'NUM_MINTS_ALL_TIME_ASC',
  NumMintsAllTimeDesc = 'NUM_MINTS_ALL_TIME_DESC',
  NumSells_7DayAsc = 'NUM_SELLS_7_DAY_ASC',
  NumSells_7DayDesc = 'NUM_SELLS_7_DAY_DESC',
  NumSells_24HourAsc = 'NUM_SELLS_24_HOUR_ASC',
  NumSells_24HourDesc = 'NUM_SELLS_24_HOUR_DESC',
  NumSells_30DayAsc = 'NUM_SELLS_30_DAY_ASC',
  NumSells_30DayDesc = 'NUM_SELLS_30_DAY_DESC',
  NumSellsAllTimeAsc = 'NUM_SELLS_ALL_TIME_ASC',
  NumSellsAllTimeDesc = 'NUM_SELLS_ALL_TIME_DESC',
  NumTrades_7DayAsc = 'NUM_TRADES_7_DAY_ASC',
  NumTrades_7DayDesc = 'NUM_TRADES_7_DAY_DESC',
  NumTrades_24HourAsc = 'NUM_TRADES_24_HOUR_ASC',
  NumTrades_24HourDesc = 'NUM_TRADES_24_HOUR_DESC',
  NumTrades_30DayAsc = 'NUM_TRADES_30_DAY_ASC',
  NumTrades_30DayDesc = 'NUM_TRADES_30_DAY_DESC',
  NumTradesAllTimeAsc = 'NUM_TRADES_ALL_TIME_ASC',
  NumTradesAllTimeDesc = 'NUM_TRADES_ALL_TIME_DESC',
  SellVolume_7DayAsc = 'SELL_VOLUME_7_DAY_ASC',
  SellVolume_7DayDesc = 'SELL_VOLUME_7_DAY_DESC',
  SellVolume_24HourAsc = 'SELL_VOLUME_24_HOUR_ASC',
  SellVolume_24HourDesc = 'SELL_VOLUME_24_HOUR_DESC',
  SellVolume_30DayAsc = 'SELL_VOLUME_30_DAY_ASC',
  SellVolume_30DayDesc = 'SELL_VOLUME_30_DAY_DESC',
  SellVolumeAllTimeAsc = 'SELL_VOLUME_ALL_TIME_ASC',
  SellVolumeAllTimeDesc = 'SELL_VOLUME_ALL_TIME_DESC',
  SellVolumeUsd_7DayAsc = 'SELL_VOLUME_USD_7_DAY_ASC',
  SellVolumeUsd_7DayDesc = 'SELL_VOLUME_USD_7_DAY_DESC',
  SellVolumeUsd_24HourAsc = 'SELL_VOLUME_USD_24_HOUR_ASC',
  SellVolumeUsd_24HourDesc = 'SELL_VOLUME_USD_24_HOUR_DESC',
  SellVolumeUsd_30DayAsc = 'SELL_VOLUME_USD_30_DAY_ASC',
  SellVolumeUsd_30DayDesc = 'SELL_VOLUME_USD_30_DAY_DESC',
  SellVolumeUsdAllTimeAsc = 'SELL_VOLUME_USD_ALL_TIME_ASC',
  SellVolumeUsdAllTimeDesc = 'SELL_VOLUME_USD_ALL_TIME_DESC',
  TotalRealizedProfit_7DayAsc = 'TOTAL_REALIZED_PROFIT_7_DAY_ASC',
  TotalRealizedProfit_7DayDesc = 'TOTAL_REALIZED_PROFIT_7_DAY_DESC',
  TotalRealizedProfit_24HourAsc = 'TOTAL_REALIZED_PROFIT_24_HOUR_ASC',
  TotalRealizedProfit_24HourDesc = 'TOTAL_REALIZED_PROFIT_24_HOUR_DESC',
  TotalRealizedProfit_30DayAsc = 'TOTAL_REALIZED_PROFIT_30_DAY_ASC',
  TotalRealizedProfit_30DayDesc = 'TOTAL_REALIZED_PROFIT_30_DAY_DESC',
  TotalRealizedProfitAllTimeDayAsc = 'TOTAL_REALIZED_PROFIT_ALL_TIME_DAY_ASC',
  TotalRealizedProfitAllTimeDayDesc = 'TOTAL_REALIZED_PROFIT_ALL_TIME_DAY_DESC',
  TotalRealizedUsdProfit_7DayAsc = 'TOTAL_REALIZED_USD_PROFIT_7_DAY_ASC',
  TotalRealizedUsdProfit_7DayDesc = 'TOTAL_REALIZED_USD_PROFIT_7_DAY_DESC',
  TotalRealizedUsdProfit_24HourAsc = 'TOTAL_REALIZED_USD_PROFIT_24_HOUR_ASC',
  TotalRealizedUsdProfit_24HourDesc = 'TOTAL_REALIZED_USD_PROFIT_24_HOUR_DESC',
  TotalRealizedUsdProfit_30DayAsc = 'TOTAL_REALIZED_USD_PROFIT_30_DAY_ASC',
  TotalRealizedUsdProfit_30DayDesc = 'TOTAL_REALIZED_USD_PROFIT_30_DAY_DESC',
  TotalRealizedUsdProfitAllTimeDayAsc = 'TOTAL_REALIZED_USD_PROFIT_ALL_TIME_DAY_ASC',
  TotalRealizedUsdProfitAllTimeDayDesc = 'TOTAL_REALIZED_USD_PROFIT_ALL_TIME_DAY_DESC',
  TotalUnrealizedProfit_7DayAsc = 'TOTAL_UNREALIZED_PROFIT_7_DAY_ASC',
  TotalUnrealizedProfit_7DayDesc = 'TOTAL_UNREALIZED_PROFIT_7_DAY_DESC',
  TotalUnrealizedProfit_24HourAsc = 'TOTAL_UNREALIZED_PROFIT_24_HOUR_ASC',
  TotalUnrealizedProfit_24HourDesc = 'TOTAL_UNREALIZED_PROFIT_24_HOUR_DESC',
  TotalUnrealizedProfit_30DayAsc = 'TOTAL_UNREALIZED_PROFIT_30_DAY_ASC',
  TotalUnrealizedProfit_30DayDesc = 'TOTAL_UNREALIZED_PROFIT_30_DAY_DESC',
  TotalUnrealizedProfitAllTimeDayAsc = 'TOTAL_UNREALIZED_PROFIT_ALL_TIME_DAY_ASC',
  TotalUnrealizedProfitAllTimeDayDesc = 'TOTAL_UNREALIZED_PROFIT_ALL_TIME_DAY_DESC',
  TotalUnrealizedUsdProfit_7DayAsc = 'TOTAL_UNREALIZED_USD_PROFIT_7_DAY_ASC',
  TotalUnrealizedUsdProfit_7DayDesc = 'TOTAL_UNREALIZED_USD_PROFIT_7_DAY_DESC',
  TotalUnrealizedUsdProfit_24HourAsc = 'TOTAL_UNREALIZED_USD_PROFIT_24_HOUR_ASC',
  TotalUnrealizedUsdProfit_24HourDesc = 'TOTAL_UNREALIZED_USD_PROFIT_24_HOUR_DESC',
  TotalUnrealizedUsdProfit_30DayAsc = 'TOTAL_UNREALIZED_USD_PROFIT_30_DAY_ASC',
  TotalUnrealizedUsdProfit_30DayDesc = 'TOTAL_UNREALIZED_USD_PROFIT_30_DAY_DESC',
  TotalUnrealizedUsdProfitAllTimeDayAsc = 'TOTAL_UNREALIZED_USD_PROFIT_ALL_TIME_DAY_ASC',
  TotalUnrealizedUsdProfitAllTimeDayDesc = 'TOTAL_UNREALIZED_USD_PROFIT_ALL_TIME_DAY_DESC',
  TotalValueAsc = 'TOTAL_VALUE_ASC',
  TotalValueDesc = 'TOTAL_VALUE_DESC',
  TotalValueUsdAsc = 'TOTAL_VALUE_USD_ASC',
  TotalValueUsdDesc = 'TOTAL_VALUE_USD_DESC',
  TotalVolume_7DayAsc = 'TOTAL_VOLUME_7_DAY_ASC',
  TotalVolume_7DayDesc = 'TOTAL_VOLUME_7_DAY_DESC',
  TotalVolume_24HourAsc = 'TOTAL_VOLUME_24_HOUR_ASC',
  TotalVolume_24HourDesc = 'TOTAL_VOLUME_24_HOUR_DESC',
  TotalVolume_30DayAsc = 'TOTAL_VOLUME_30_DAY_ASC',
  TotalVolume_30DayDesc = 'TOTAL_VOLUME_30_DAY_DESC',
  TotalVolumeAllTimeAsc = 'TOTAL_VOLUME_ALL_TIME_ASC',
  TotalVolumeAllTimeDesc = 'TOTAL_VOLUME_ALL_TIME_DESC',
  TotalVolumeUsd_7DayAsc = 'TOTAL_VOLUME_USD_7_DAY_ASC',
  TotalVolumeUsd_7DayDesc = 'TOTAL_VOLUME_USD_7_DAY_DESC',
  TotalVolumeUsd_24HourAsc = 'TOTAL_VOLUME_USD_24_HOUR_ASC',
  TotalVolumeUsd_24HourDesc = 'TOTAL_VOLUME_USD_24_HOUR_DESC',
  TotalVolumeUsd_30DayAsc = 'TOTAL_VOLUME_USD_30_DAY_ASC',
  TotalVolumeUsd_30DayDesc = 'TOTAL_VOLUME_USD_30_DAY_DESC',
  TotalVolumeUsdAllTimeAsc = 'TOTAL_VOLUME_USD_ALL_TIME_ASC',
  TotalVolumeUsdAllTimeDesc = 'TOTAL_VOLUME_USD_ALL_TIME_DESC'
}

/** Stats are refreshed every 15 mins with the worker process. */
export type WalletStats = {
  __typename?: 'WalletStats';
  address: Scalars['ID']['output'];
  buyVolume?: Maybe<Scalars['MicroAmount']['output']>;
  buyVolumeUsd?: Maybe<Scalars['Float']['output']>;
  mintVolume?: Maybe<Scalars['MicroAmount']['output']>;
  mintVolumeUsd?: Maybe<Scalars['Float']['output']>;
  numBuys?: Maybe<Scalars['Int']['output']>;
  numMints?: Maybe<Scalars['Int']['output']>;
  numSells?: Maybe<Scalars['Int']['output']>;
  numTrades?: Maybe<Scalars['Int']['output']>;
  sellVolume?: Maybe<Scalars['MicroAmount']['output']>;
  sellVolumeUsd?: Maybe<Scalars['Float']['output']>;
  totalRealizedProfit?: Maybe<Scalars['MicroAmount']['output']>;
  totalRealizedUsdProfit?: Maybe<Scalars['Float']['output']>;
  totalUnrealizedProfit?: Maybe<Scalars['MicroAmount']['output']>;
  totalUnrealizedUsdProfit?: Maybe<Scalars['Float']['output']>;
  totalValue?: Maybe<Scalars['MicroAmount']['output']>;
  totalValueUsd?: Maybe<Scalars['Float']['output']>;
  totalVolume?: Maybe<Scalars['MicroAmount']['output']>;
  totalVolumeUsd?: Maybe<Scalars['Float']['output']>;
};

export enum WalletStatsTimeSeries {
  AllTime = 'ALL_TIME',
  OneDay = 'ONE_DAY',
  SevenDay = 'SEVEN_DAY',
  ThirtyDay = 'THIRTY_DAY'
}

export type WalletsResult = PaginatedQuery & {
  __typename?: 'WalletsResult';
  pageInfo?: Maybe<PageInfo>;
  wallets: Array<WalletAccount>;
};

export enum WhitelistType {
  Flex = 'FLEX',
  None = 'NONE',
  Regular = 'REGULAR'
}

export type CollectionTokensQueryQueryVariables = Exact<{
  collectionAddr: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CollectionTokensQueryQuery = { __typename?: 'Query', tokens?: { __typename?: 'TokensResult', pageInfo?: { __typename?: 'PageInfo', limit?: number | null, offset?: number | null, total?: number | null } | null, tokens: Array<{ __typename?: 'Token', tokenId: string }> } | null };

export type CollectionTokensForOwnerQueryQueryVariables = Exact<{
  collectionAddr: Scalars['String']['input'];
  ownerAddrOrName: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CollectionTokensForOwnerQueryQuery = { __typename?: 'Query', tokens?: { __typename?: 'TokensResult', pageInfo?: { __typename?: 'PageInfo', limit?: number | null, offset?: number | null, total?: number | null } | null, tokens: Array<{ __typename?: 'Token', tokenId: string }> } | null };

export type TokenQueryQueryVariables = Exact<{
  collectionAddr: Scalars['String']['input'];
  tokenId: Scalars['String']['input'];
}>;


export type TokenQueryQuery = { __typename?: 'Query', token?: { __typename?: 'Token', tokenId: string, name?: string | null, description?: string | null, collection: { __typename?: 'Collection', contractAddress: string, name?: string | null }, media?: { __typename?: 'Media', url?: string | null } | null } | null };

export type TokensForOwnerQueryQueryVariables = Exact<{
  ownerAddrOrName: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TokensForOwnerQueryQuery = { __typename?: 'Query', tokens?: { __typename?: 'TokensResult', pageInfo?: { __typename?: 'PageInfo', limit?: number | null, offset?: number | null, total?: number | null } | null, tokens: Array<{ __typename?: 'Token', tokenId: string, name?: string | null, description?: string | null, collection: { __typename?: 'Collection', contractAddress: string, name?: string | null }, media?: { __typename?: 'Media', url?: string | null } | null }> } | null };


export const CollectionTokensQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"collectionTokensQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionAddr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionAddr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionAddr"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenId"}}]}}]}}]}}]} as unknown as DocumentNode<CollectionTokensQueryQuery, CollectionTokensQueryQueryVariables>;
export const CollectionTokensForOwnerQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"collectionTokensForOwnerQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionAddr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ownerAddrOrName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionAddr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionAddr"}}},{"kind":"Argument","name":{"kind":"Name","value":"ownerAddrOrName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ownerAddrOrName"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenId"}}]}}]}}]}}]} as unknown as DocumentNode<CollectionTokensForOwnerQueryQuery, CollectionTokensForOwnerQueryQueryVariables>;
export const TokenQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tokenQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionAddr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionAddr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionAddr"}}},{"kind":"Argument","name":{"kind":"Name","value":"tokenId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contractAddress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<TokenQueryQuery, TokenQueryQueryVariables>;
export const TokensForOwnerQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"tokensForOwnerQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ownerAddrOrName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ownerAddrOrName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ownerAddrOrName"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"offset"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contractAddress"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<TokensForOwnerQueryQuery, TokensForOwnerQueryQueryVariables>;