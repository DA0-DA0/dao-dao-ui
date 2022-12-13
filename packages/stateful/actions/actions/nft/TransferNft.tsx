import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue } from 'recoil'

import { ImageEmoji, useCachedLoadable } from '@dao-dao/stateless'
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
} from '../../../recoil/selectors/nft'
import { TransferNftComponent } from '../../components/nft/TransferNft'

interface TransferNftData {
  collection: string
  tokenId: string
  recipient: string
}

const useDefaults: UseDefaults<TransferNftData> = () => ({
  collection: '',
  tokenId: '',
  recipient: '',
})

const useTransformToCosmos: UseTransformToCosmos<TransferNftData> = () =>
  useCallback(
    ({ collection, tokenId, recipient }: TransferNftData) =>
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

const useDecodedCosmosMsg: UseDecodedCosmosMsg<TransferNftData> = (
  msg: Record<string, any>
) =>
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
    : { match: false }

export const makeTransferNftAction: ActionMaker<TransferNftData> = ({
  t,
  address,
  chainId,
}) => {
  const Component: ActionComponent = (props) => {
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

    return <TransferNftComponent {...props} options={{ options, nftInfo }} />
  }

  return {
    key: CoreActionKey.TransferNft,
    Icon: ImageEmoji,
    label: t('title.transferNft'),
    description: t('info.transferNftDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
