import { ChainId } from './chain'
import { ContractInfoResponse } from './contracts/Cw721Base'
import { WithChainId } from './state'
import { LoadingDataWithError } from './stateless'

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
  [key: string]: any
}

export type NftCardInfo = {
  chainId: string
  collection: {
    address: string
    name: string
  }
  tokenId: string
  owner?: string
  externalLink?: {
    href: string
    name: string
  }
  imageUrl?: string
  // Metadata loaded from the token URI.
  metadata?: Record<string, any>
  floorPrice?: {
    amount: number
    denom: string
  }
  name: string
  description: string | undefined

  // This indicates whether or not the NFT is staked in a DAO. It is manually
  // set in `walletStakedNftCardInfosSelector`.
  staked?: boolean
}

// Map chain ID to loading NFTs on that chain.
export type LoadingNfts<N extends object> = Partial<
  Record<ChainId | string, LoadingDataWithError<N[]>>
>

export type LazyNftCardProps = WithChainId<{
  // Whether to show the collection or the owner/staker. Default is owner.
  type?: 'collection' | 'owner'
  collectionAddress: string
  tokenId: string
  // If passed and the NFT is staked, get staker info from this contract.
  stakingContractAddress?: string
}>
