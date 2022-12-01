import { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue } from 'recoil'

import {
  ImageEmoji,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import { loadableToLoadingDataWithError, makeWasmMessage } from '@dao-dao/utils'

import {
  nftCardInfoSelector,
  nftCardInfosSelector,
} from '../../recoil/selectors/nft'
import { TransferCw721Component } from '../components/TransferCw721'

interface TransferCw721Data {
  collection: string
  tokenId: string
  recipient: string
}

const useDefaults: UseDefaults<TransferCw721Data> = () => ({
  collection: '',
  tokenId: '',
  recipient: '',
})

const useTransformToCosmos: UseTransformToCosmos<TransferCw721Data> = () =>
  useCallback(
    ({ collection, tokenId, recipient }: TransferCw721Data) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: collection,
            funds: [],
            msg: {
              transfer_nft: {
                recipient,
                token_id: tokenId,
              },
            },
          },
        },
      }),
    []
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<TransferCw721Data> = (
  msg: Record<string, any>
) =>
  useMemo(
    () =>
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'transfer_nft' in msg.wasm.execute.msg &&
      'recipient' in msg.wasm.execute.msg.transfer_nft &&
      'token_id' in msg.wasm.execute.msg.transfer_nft
        ? {
            match: true,
            data: {
              collection: msg.wasm.execute.contract_addr,
              tokenId: msg.wasm.execute.msg.transfer_nft.token_id,
              recipient: msg.wasm.execute.msg.transfer_nft.recipient,
            },
          }
        : { match: false },
    [msg]
  )

export const makeTransferNftAction: ActionMaker<TransferCw721Data> = ({
  t,
  address,
}) => {
  const Component: ActionComponent = (props) => {
    const { chainId } = useDaoInfoContext()
    const { watch } = useFormContext()

    const tokenId = watch(props.fieldNamePrefix + 'tokenId')
    const collection = watch(props.fieldNamePrefix + 'collection')

    const options = loadableToLoadingDataWithError(
      useCachedLoadable(
        props.isCreating
          ? nftCardInfosSelector({
              coreAddress: address,
              chainId,
            })
          : constSelector([])
      )
    )
    const nftInfo = useRecoilValue(
      !!tokenId && !!collection
        ? nftCardInfoSelector({ chainId, collection, tokenId })
        : constSelector(undefined)
    )

    return <TransferCw721Component {...props} options={{ options, nftInfo }} />
  }

  return {
    key: CoreActionKey.TransferCw721,
    Icon: ImageEmoji,
    label: t('title.transferNft'),
    description: t('info.transferNftDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
