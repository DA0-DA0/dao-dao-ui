import { ContractInfoResponse } from './contracts/Cw721Base'

export interface StargazeNft {
  name: string
  image: string
  description: string
  external_url: string
  tokenId: string
  creator: string
  owner: string
  tokenUri: string
  collection: {
    creator: string
    description: string
    image: string
    external_link: string
    royalty_info: {
      payment_address: string
      // Decimal
      share: string
    }
    name: string
    symbol: string
    contractAddress: string
  }
  // price: null
  // reserveFor: null
  // expiresAt: null
  // expiresAtDateTime: null
}

export interface NativeStargazeCollectionInfo {
  native: {
    address: string
    info: ContractInfoResponse
  }
  stargaze?: {
    address: string
    info: ContractInfoResponse
  }
}

export type NftUriData = {
  name: string | undefined
  description: string | undefined
  imageUrl: string | undefined
  externalLink: { href: string; name: string } | undefined
}
