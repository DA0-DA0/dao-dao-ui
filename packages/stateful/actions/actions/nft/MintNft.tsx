import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { Loader, useCachedLoading } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  CoreActionKey,
  NftCardInfo,
} from '@dao-dao/types'

import { AddressInput } from '../../../components'
import { nftCardInfoWithUriSelector } from '../../../recoil'
import { MintNftData, MintNft as StatelessMintNft } from '../../components/nft'
import { useActionOptions } from '../../react'

export const MintNft: ActionComponent = (props) => {
  const { chainId, context, address } = useActionOptions()
  const { watch } = useFormContext()

  const data: MintNftData = watch(props.fieldNamePrefix)
  const collectionAddress = data.collectionAddress ?? ''

  const nftInfo = useCachedLoading<NftCardInfo | undefined>(
    //  If creating, get info from form data.
    props.isCreating
      ? constSelector({
          collection: {
            address: collectionAddress,
            name: data.instantiateMsg?.name ?? '',
          },
          tokenId: data.mintMsg.token_id,
          imageUrl: data.imageUrl,
          name: data.metadata?.name ?? '',
          description: data.metadata?.description ?? '',
          chainId,
        })
      : // If viewing, get info from token URI.
        nftCardInfoWithUriSelector({
          collection: collectionAddress,
          tokenId: data.mintMsg.token_id,
          tokenUri: data.mintMsg.token_uri,
          chainId,
        }),
    undefined
  )

  // Get all collections in DAO.
  const daoCollections = useRecoilValueLoadable(
    props.isCreating && context.type === ActionContextType.Dao
      ? DaoCoreV2Selectors.allCw721TokenListSelector({
          contractAddress: address,
          chainId,
        })
      : constSelector([])
  )

  // Add action to add collection to DAO treasury if it is not already there.
  const [added, setAdded] = useState(false)
  useEffect(() => {
    // Only add once, in case the user deletes an action.
    if (added) {
      return
    }

    if (
      // Ensure we are creating a proposal in the context of a DAO.
      props.isCreating &&
      context.type === ActionContextType.Dao &&
      // Ensure the collection is not already in the DAO.
      daoCollections.state === 'hasValue' &&
      !daoCollections.contents.includes(collectionAddress) &&
      // Ensure no action already exists to add this collection.
      !props.allActionsWithData.some(
        ({ key, data }) =>
          key === CoreActionKey.ManageCw721 &&
          data.address === collectionAddress &&
          data.adding
      )
    ) {
      props.addAction({
        key: CoreActionKey.ManageCw721,
        data: {
          adding: true,
          address: collectionAddress,
        },
      })
      setAdded(true)
    }
  }, [
    added,
    collectionAddress,
    context.type,
    daoCollections.contents,
    daoCollections.state,
    props,
  ])

  return nftInfo.loading || !nftInfo.data ? (
    <Loader />
  ) : (
    <StatelessMintNft
      {...props}
      options={{
        nftInfo: nftInfo.data,
        AddressInput,
      }}
    />
  )
}
