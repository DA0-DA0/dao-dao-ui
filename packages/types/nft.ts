import { ComponentType, ReactNode, RefAttributes } from 'react'

import { ChainId } from './chain'
import { ContractInfoResponse } from './contracts/Cw721Base'
import { WithChainId } from './state'
import {
  ButtonLinkProps,
  ButtonPopupSection,
  LoadingDataWithError,
  ModalProps,
  StatefulEntityDisplayProps,
} from './stateless'

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
  floorPrice?: {
    amount: number
    denom: string
  }
  name: string
  description: string | undefined

  // This indicates whether or not the NFT is staked in a DAO. It is manually
  // set in `walletStakedLazyNftCardInfosSelector`.
  staked?: boolean
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
  } & Pick<NftCardInfo, 'staked'>
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
  }
