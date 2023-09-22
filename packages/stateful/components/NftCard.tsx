import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

import {
  NftCardProps,
  NftCard as StatelessNftCard,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { LazyNftCardProps } from '@dao-dao/types'

import {
  nftCardInfoSelector,
  nftStakerOrOwnerSelector,
} from '../recoil/selectors/nft'
import { EntityDisplay } from './EntityDisplay'

export const NftCard = (props: Omit<NftCardProps, 'EntityDisplay'>) => (
  <StatelessNftCard {...props} EntityDisplay={EntityDisplay} />
)

export const NftCardNoCollection = (props: ComponentProps<typeof NftCard>) => (
  <NftCard hideCollection {...props} />
)

export const StakedNftCard = (props: ComponentProps<typeof NftCard>) => {
  const { t } = useTranslation()
  return <NftCard hideCollection ownerLabel={t('title.staker')} {...props} />
}

export const LazyNftCard = ({
  type = 'owner',
  collectionAddress,
  tokenId,
  stakingContractAddress,
  chainId,
}: LazyNftCardProps) => {
  const info = useCachedLoadingWithError(
    nftCardInfoSelector({
      collection: collectionAddress,
      tokenId,
      chainId,
    })
  )

  const stakerOrOwner = useCachedLoadingWithError(
    type === 'owner'
      ? nftStakerOrOwnerSelector({
          collectionAddress,
          tokenId,
          stakingContractAddress,
          chainId,
        })
      : undefined
  )

  const staked =
    !stakerOrOwner.loading &&
    !stakerOrOwner.errored &&
    stakerOrOwner.data.staked

  const NftCardToUse = staked
    ? StakedNftCard
    : type === 'owner'
    ? NftCardNoCollection
    : NftCard

  return info.loading || info.errored ? (
    <NftCardToUse
      chainId={chainId}
      className="animate-pulse"
      collection={{
        address: collectionAddress,
        name: 'Loading...',
      }}
      description={undefined}
      name="Loading..."
      tokenId={tokenId}
    />
  ) : (
    <NftCardToUse
      owner={
        stakerOrOwner.loading || stakerOrOwner.errored
          ? undefined
          : stakerOrOwner.data.address
      }
      {...info.data}
    />
  )
}
