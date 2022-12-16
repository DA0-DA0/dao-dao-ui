import { ComponentType } from 'react'

import {
  LoadingDataWithError,
  NftCardInfo,
  StatefulProfileDisplayProps,
} from '@dao-dao/types'
import {
  InstantiateMsg as Cw721InstantiateMsg,
  MintMsgForNullable_Empty,
} from '@dao-dao/types/contracts/Cw721Base'

export interface MintNftData {
  // Whether or not the contract has been chosen. When this is `false`, shows
  // form allowing user to create a new collection or enter an existing address.
  // When `true`, it shows the minting UI. `collectionAddress` should be defined
  // and valid when this is `true`.
  contractChosen: boolean
  // Set once collection created or chosen.
  collectionAddress?: string

  // Set when creating a new collection by InstantiateNftCollection component.
  instantiateMsg?: Cw721InstantiateMsg
  // Set when entering metadata for IPFS by UploadNftMetadata component.
  metadata?: {
    name: string
    description: string
  }
  // Set after uploading metadata to IPFS by UploadNftMetadata component, for
  // displaying during final step by MintNft component.
  imageUrl?: string
  // Set in final step by MintNft component.
  mintMsg: MintMsgForNullable_Empty
}

export interface TransferNftData {
  collection: string
  tokenId: string
  recipient: string

  // When true, uses `send` instead of `transfer_nft` to transfer the NFT.
  executeSmartContract: boolean
  smartContractMsg: string
}

export interface BurnNftData {
  collection: string
  tokenId: string
}

//! Stateless component options

export interface TransferNftOptions {
  // The set of NFTs that may be transfered as part of this action.
  options: LoadingDataWithError<NftCardInfo[]>
  // Information about the NFT currently selected.
  nftInfo: NftCardInfo | undefined

  ProfileDisplay: ComponentType<StatefulProfileDisplayProps>
}

export interface BurnNftOptions {
  // The set of NFTs that may be burned as part of this action.
  options: LoadingDataWithError<NftCardInfo[]>
  // Information about the NFT currently selected.
  nftInfo: NftCardInfo | undefined
}

export interface InstantiateNftCollectionOptions {
  instantiating: boolean
  onInstantiate: () => Promise<void>

  ProfileDisplay: ComponentType<StatefulProfileDisplayProps>
}

export interface ChooseExistingNftCollectionOptions {
  chooseLoading: boolean
  onChooseExistingContract: () => Promise<void>
  existingCollections: {
    address: string
    name: string
  }[]
}

export interface MintNftOptions {
  nftInfo: NftCardInfo
  addCollectionToDao?: () => void
  ProfileDisplay: ComponentType<StatefulProfileDisplayProps>
}
