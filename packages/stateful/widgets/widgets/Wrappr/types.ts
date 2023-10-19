import {
  AssetConfig,
  AssetInfoForChain,
} from "@axelar-network/axelarjs-sdk";


export type WrapprData = {
  // Wrappr  contract address.
  contract: string
}

export type LLCJurisdictionOptions = {
  value: string;
  label: string;
};

// general types for Wrappr Widget
export interface Contracts {
  testnet?: boolean
  factory: string
  deLLC: string
  wyLLC: string
  miLLC: string
  deUNA: string
  wyUNA: string
  lexCharter: string
  orCharter: string
  subgraph?: string
}

export type Wrappr = {
  id: string
  name: string
  baseURI: string
  mintFee: string
}

export type WrapprLong = {
  id: string
  name: string
  symbol: string
  baseURI: string
  mintFee: string
  admin: string
}

// create wrappr template keys

export type Create = {
  image: FileList
  name: string
  symbol: string
  description: string
  admin: string
  mintFee: number
  baseURI: string
  agreement: FileList
  attributes: {
      trait_type: string
      value: string
  }[]
}

export interface Templates {
  [key: string]: string[]
}

// Axelar GMP types: [source - https://github.com/axelarnetwork/axelar-satellite/blob/main/src/types/index.ts#L34 ] 

export type AssetAlias = Pick<
  AssetInfoForChain,
  | "assetSymbol"
  | "assetName"
  | "minDepositAmt"
  | "tokenAddress"
  | "ibcDenom"
  | "fullDenomPath"
  | "common_key"
> & {
  mintLimit: number;
  iconSrc?: string;
  decimals?: number;
  addedViaSquid?: boolean;
};

export interface AssetConfigExtended extends AssetConfig {
  id: string;
  native_chain: string;
  gas_token_id?: string;
  wrapped_erc20: string;
  is_gas_token: boolean;
  isSquidAsset: boolean;
  isSquidOnlyAsset?: boolean;
  chain_aliases: Record<
    // this overwrites the AssetInfo in the sdk because the sdk does not have all the values eg: mintLimit
    string,
    AssetAlias
  >;
  iconSrc?: string;
}