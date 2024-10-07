import { ComponentType, ReactNode, RefAttributes } from 'react'

import { HugeDecimal } from '@dao-dao/math'

import { ChainId, WithChainId } from './chain'
import {
  ButtonLinkProps,
  ButtonPopupSection,
  ModalProps,
  StatefulEntityDisplayProps,
} from './components'
import { Duration } from './contracts/common'
import { ContractInfoResponse } from './contracts/Cw721Base'
import { LoadingDataWithError } from './misc'
import { GenericToken } from './token'

// Shape of type returned from Stargaze GraphQL indexer queries in
// @dao-dao/state
export type StargazeNft = {
  tokenId?: string | null
  name?: string | null
  description?: string | null
  collection: {
    contractAddress?: string | null
    name?: string | null
  }
  highestOffer?: {
    offerPrice?: {
      amount?: number | null
      amountUsd?: number | null
      denom?: string | null
    } | null
  } | null
  media?: {
    url?: string | null
    // Need to allow string values of enum because TypeScript does not think the
    // enums are compatible even with the same values.
    type?: `${StargazeNftMediaType}` | null
    visualAssets?: {
      lg?: {
        url?: string | null
      } | null
    } | null
  } | null
}

export enum StargazeNftMediaType {
  AnimatedImage = 'animated_image',
  Audio = 'audio',
  Html = 'html',
  Image = 'image',
  Pdf = 'pdf',
  Unknown = 'unknown',
  VectorGraphic = 'vector_graphic',
  Video = 'video',
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
  key: string
  collectionAddress: string
  collectionName: string
  tokenId: string
  owner?: string
  externalLink?: {
    href: string
    name: string
  }
  imageUrl?: string
  // Metadata loaded from the token URI.
  metadata?: Record<string, any>
  highestOffer?: {
    offerToken?: GenericToken | null
    amount?: HugeDecimal | null
    amountUsd?: number | null
  }
  name: string
  description: string | undefined

  // This indicates whether or not the NFT is staked in a DAO. It is manually
  // set in `walletStakedLazyNftCardInfosSelector`.
  staked?: boolean
  fetchedTimestamp?: Date
}

export type NftCardProps = NftCardInfo & {
  hideCollection?: boolean
  // Alternative label for Owner address.
  ownerLabel?: string
  checkbox?: {
    checked: boolean
    onClick: () => void
  }
  className?: string
  // Needs to be defined to show the NFT owner.
  EntityDisplay?: ComponentType<StatefulEntityDisplayProps>
  // If present, will show button popup dropdown.
  buttonPopup?: {
    sections: ButtonPopupSection[]
    ButtonLink: ComponentType<ButtonLinkProps>
  }
}

// Map chain ID to loading NFTs on that chain.
export type LoadingNfts<N extends object> = Partial<
  Record<ChainId | string, LoadingDataWithError<N[]>>
>

export type LazyNftCardInfo = WithChainId<
  {
    // Unique NFT key comprised of chain ID, collection address, and token ID.
    key: string
    // Whether to show the collection or the owner/staker. Default is owner.
    type?: 'collection' | 'owner'
    collectionAddress: string
    tokenId: string
    // If passed and the NFT is staked, get staker info from this contract.
    stakingContractAddress?: string
  } & Pick<NftCardInfo, 'staked' | 'highestOffer'>
>

export type LazyNftCardProps = LazyNftCardInfo &
  Pick<NftCardProps, 'checkbox' | 'buttonPopup'>

export type LazyNftCardPropsWithRef = LazyNftCardProps &
  RefAttributes<HTMLDivElement>

export type NftSelectionModalProps = Omit<ModalProps, 'children' | 'header'> &
  Required<Pick<ModalProps, 'header'>> & {
    nfts: LoadingDataWithError<LazyNftCardInfo[]>
    selectedKeys: string[]
    onNftClick: (nft: LazyNftCardInfo) => void
    onSelectAll?: () => void
    onDeselectAll?: () => void
    action: {
      loading?: boolean
      label: string
      onClick: () => void
    }
    secondaryAction?: {
      loading?: boolean
      label: string
      onClick: () => void
    }
    fallbackError?: string
    allowSelectingNone?: boolean
    selectedDisplay?: ReactNode
    headerDisplay?: ReactNode
    // What displays when there are no NFTs.
    noneDisplay?: ReactNode
    unstakingDuration?: Duration | null
  }
