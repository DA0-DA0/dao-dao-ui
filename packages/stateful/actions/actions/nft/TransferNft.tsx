import { toBase64, toUtf8 } from '@cosmjs/encoding'
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
import {
  loadableToLoadingDataWithError,
  makeWasmMessage,
  objectMatchesStructure,
  parseEncodedMessage,
} from '@dao-dao/utils'

import { ProfileDisplay } from '../../../components'
import {
  nftCardInfoSelector,
  nftCardInfosSelector,
} from '../../../recoil/selectors/nft'
import { TransferNftComponent, TransferNftData } from '../../components/nft'
import { useActionOptions } from '../../react'

const useDefaults: UseDefaults<TransferNftData> = () => ({
  collection: '',
  tokenId: '',
  recipient: '',

  executeSmartContract: false,
  smartContractMsg: '{}',
})

const useTransformToCosmos: UseTransformToCosmos<TransferNftData> = () =>
  useCallback(
    ({
      collection,
      tokenId,
      recipient,
      executeSmartContract,
      smartContractMsg,
    }: TransferNftData) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: collection,
            funds: [],
            msg: executeSmartContract
              ? {
                  send_nft: {
                    contract: recipient,
                    msg: toBase64(toUtf8(JSON.stringify(smartContractMsg))),
                    token_id: tokenId,
                  },
                }
              : {
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
  objectMatchesStructure(msg, {
    wasm: {
      execute: {
        contract_addr: {},
        funds: {},
        msg: {
          transfer_nft: {
            recipient: {},
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
          tokenId: msg.wasm.execute.msg.transfer_nft.token_id,
          recipient: msg.wasm.execute.msg.transfer_nft.recipient,

          executeSmartContract: false,
          smartContractMsg: '{}',
        },
      }
    : objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              send_nft: {
                contract: {},
                msg: {},
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
          tokenId: msg.wasm.execute.msg.send_nft.token_id,
          recipient: msg.wasm.execute.msg.send_nft.contract,

          executeSmartContract: true,
          smartContractMsg: parseEncodedMessage(
            msg.wasm.execute.msg.send_nft.msg
          ),
        },
      }
    : { match: false }

const Component: ActionComponent = (props) => {
  const { address, chainId } = useActionOptions()
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

  return (
    <TransferNftComponent
      {...props}
      options={{ options, nftInfo, ProfileDisplay }}
    />
  )
}

export const makeTransferNftAction: ActionMaker<TransferNftData> = ({ t }) => ({
  key: CoreActionKey.TransferNft,
  Icon: ImageEmoji,
  label: t('title.transferNft'),
  description: t('info.transferNftDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
