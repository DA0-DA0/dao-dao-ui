import { forwardRef, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { nftCardInfosForKeyAtom } from '@dao-dao/state/recoil'
import { useCachedLoadingWithError } from '@dao-dao/stateless'
import { LazyNftCardProps } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import {
  nftCardInfoSelector,
  nftStakerOrOwnerSelector,
} from '../../recoil/selectors/nft'
import { NftCard, NftCardNoCollection, StakedNftCard } from './NftCard'

export const LazyNftCard = forwardRef<HTMLDivElement, LazyNftCardProps>(
  function LazyNftCard(
    {
      type = 'owner',
      collectionAddress,
      tokenId,
      stakingContractAddress,
      chainId,
      ...props
    },
    ref
  ) {
    const info = useCachedLoadingWithError(
      nftCardInfoSelector({
        collection: collectionAddress,
        tokenId,
        chainId,
      })
    )

    // When info is loaded, cache so that we can use it later. This is used so
    // that the parent modal (NftSelectionModal) can filter by names without
    // having to preload all of them, for example.
    const setNftCardInfoForKey = useSetRecoilState(nftCardInfosForKeyAtom)
    useEffect(() => {
      if (!info.loading && !info.errored) {
        setNftCardInfoForKey((prev) => ({
          ...prev,
          [info.data.key]: info.data,
        }))
      }
    }, [info, setNftCardInfoForKey])

    const stakerOrOwner = useCachedLoadingWithError(
      // If showing owner instead of showing collection, load staker or owner if
      // not staker. The owner in the `type` and the owner of the NFT are
      // unrelated. Sorry... I just confused myself and then re-learned this.
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

    return info.loading ? (
      <NftCardToUse
        chainId={chainId}
        className="animate-pulse"
        collectionAddress={collectionAddress}
        collectionName="Loading..."
        description={undefined}
        name="Loading..."
        tokenId={tokenId}
        {...props}
        ref={ref}
      />
    ) : info.errored ? (
      <NftCardToUse
        chainId={chainId}
        className="animate-pulse"
        collectionAddress={collectionAddress}
        collectionName="Errored"
        description={undefined}
        name={processError(info.error, {
          forceCapture: false,
        })}
        tokenId={tokenId}
        {...props}
        ref={ref}
      />
    ) : (
      <NftCardToUse
        owner={
          stakerOrOwner.loading || stakerOrOwner.errored
            ? undefined
            : stakerOrOwner.data.address
        }
        {...props}
        {...info.data}
        ref={ref}
      />
    )
  }
)
