
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
  entity: string
  jurisdiction: string
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
