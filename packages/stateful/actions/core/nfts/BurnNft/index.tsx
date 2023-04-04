import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector } from 'recoil'

import { FireEmoji, useCachedLoadingWithError } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import {
  nftCardInfoSelector,
  nftCardInfosForDaoSelector,
  walletNftCardInfos,
} from '../../../../recoil/selectors/nft'
import { useCw721CommonGovernanceTokenInfoIfExists } from '../../../../voting-module-adapter'
import { useActionOptions } from '../../../react'
import { BurnNft, BurnNftData } from './Component'

const useDefaults: UseDefaults<BurnNftData> = () => ({
  collection: '',
  tokenId: '',
})

const useTransformToCosmos: UseTransformToCosmos<BurnNftData> = () =>
  useCallback(
    ({ collection, tokenId }: BurnNftData) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: collection,
            funds: [],
            msg: {
              burn: {
                token_id: tokenId,
              },
            },
          },
        },
      }),
    []
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<BurnNftData> = (
  msg: Record<string, any>
) =>
  objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        funds: {},
        msg: {
          burn: {
            token_id: {},
          },
        },
      },
    },
  })
    ? {
        match: true,
        data: {
          collection: msg.wasm.execute.contract_addr,
          tokenId: msg.wasm.execute.msg.burn.token_id,
        },
      }
    : { match: false }

const Component: ActionComponent = (props) => {
  const { context, address, chainId } = useActionOptions()
  const { watch } = useFormContext()
  const { denomOrAddress: governanceCollectionAddress } =
    useCw721CommonGovernanceTokenInfoIfExists() ?? {}

  const tokenId = watch(props.fieldNamePrefix + 'tokenId')
  const collection = watch(props.fieldNamePrefix + 'collection')

  const options = useCachedLoadingWithError(
    props.isCreating
      ? context.type === ActionContextType.Dao
        ? nftCardInfosForDaoSelector({
            coreAddress: address,
            chainId,
            governanceCollectionAddress,
          })
        : walletNftCardInfos({
            walletAddress: address,
            chainId,
          })
      : undefined
  )
  const nftInfo = useCachedLoadingWithError(
    !!tokenId && !!collection
      ? nftCardInfoSelector({ chainId, collection, tokenId })
      : constSelector(undefined)
  )

  return (
    <BurnNft
      {...props}
      options={{
        options,
        nftInfo,
      }}
    />
  )
}

export const makeBurnNftAction: ActionMaker<BurnNftData> = ({ t }) => ({
  key: ActionKey.BurnNft,
  Icon: FireEmoji,
  label: t('title.burnNft'),
  description: t('info.burnNftDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
