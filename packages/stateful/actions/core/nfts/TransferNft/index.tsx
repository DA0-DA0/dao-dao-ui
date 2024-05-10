import JSON5 from 'json5'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector } from 'recoil'

import { BoxEmoji, useCachedLoadingWithError } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  LazyNftCardInfo,
  LoadingDataWithError,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  combineLoadingDataWithErrors,
  decodeJsonFromBase64,
  decodePolytoneExecuteMsg,
  encodeJsonToBase64,
  makeWasmMessage,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput, NftSelectionModal } from '../../../../components'
import { useWallet } from '../../../../hooks'
import {
  lazyNftCardInfosForDaoSelector,
  nftCardInfoSelector,
  walletLazyNftCardInfosSelector,
} from '../../../../recoil/selectors/nft'
import { useCw721CommonGovernanceTokenInfoIfExists } from '../../../../voting-module-adapter'
import { useActionOptions } from '../../../react'
import { TransferNftComponent, TransferNftData } from './Component'

const useDefaults: UseDefaults<TransferNftData> = () => {
  const {
    chain: { chain_id: currentChainId },
  } = useActionOptions()
  const { address: walletAddress = '' } = useWallet()

  return {
    chainId: currentChainId,
    collection: '',
    tokenId: '',
    recipient: walletAddress,

    executeSmartContract: false,
    smartContractMsg: '{}',
  }
}

const useTransformToCosmos: UseTransformToCosmos<TransferNftData> = () => {
  const {
    chain: { chain_id: currentChainId },
  } = useActionOptions()

  return useCallback(
    ({
      chainId,
      collection,
      tokenId,
      recipient,
      executeSmartContract,
      smartContractMsg,
    }: TransferNftData) =>
      maybeMakePolytoneExecuteMessage(
        currentChainId,
        chainId,
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: collection,
              funds: [],
              msg: executeSmartContract
                ? {
                    send_nft: {
                      contract: recipient,
                      msg: encodeJsonToBase64(JSON5.parse(smartContractMsg)),
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
        })
      ),
    [currentChainId]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<TransferNftData> = (
  msg: Record<string, any>
) => {
  let chainId = useActionOptions().chain.chain_id
  const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
  if (decodedPolytone.match) {
    chainId = decodedPolytone.chainId
    msg = decodedPolytone.msg
  }

  return objectMatchesStructure(msg, {
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
          chainId,
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
          chainId,
          collection: msg.wasm.execute.contract_addr,
          tokenId: msg.wasm.execute.msg.send_nft.token_id,
          recipient: msg.wasm.execute.msg.send_nft.contract,

          executeSmartContract: true,
          smartContractMsg: JSON.stringify(
            decodeJsonFromBase64(msg.wasm.execute.msg.send_nft.msg, true),
            null,
            2
          ),
        },
      }
    : { match: false }
}

const Component: ActionComponent = (props) => {
  const {
    context,
    address,
    chain: { chain_id: currentChainId },
  } = useActionOptions()
  const { watch } = useFormContext<TransferNftData>()
  const { denomOrAddress: governanceCollectionAddress } =
    useCw721CommonGovernanceTokenInfoIfExists() ?? {}

  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const tokenId = watch((props.fieldNamePrefix + 'tokenId') as 'tokenId')
  const collection = watch(
    (props.fieldNamePrefix + 'collection') as 'collection'
  )

  const options = useCachedLoadingWithError(
    props.isCreating
      ? context.type === ActionContextType.Wallet
        ? walletLazyNftCardInfosSelector({
            walletAddress: address,
            chainId: currentChainId,
          })
        : lazyNftCardInfosForDaoSelector({
            chainId: currentChainId,
            coreAddress: address,
            governanceCollectionAddress,
          })
      : undefined
  )
  const nftInfo = useCachedLoadingWithError(
    chainId && collection && tokenId
      ? nftCardInfoSelector({ chainId, collection, tokenId })
      : constSelector(undefined)
  )

  const allChainOptions =
    options.loading || options.errored
      ? options
      : combineLoadingDataWithErrors(
          ...Object.values(options.data).filter(
            (data): data is LoadingDataWithError<LazyNftCardInfo[]> => !!data
          )
        )

  return (
    <TransferNftComponent
      {...props}
      options={{
        options: allChainOptions,
        nftInfo,
        AddressInput,
        NftSelectionModal,
      }}
    />
  )
}

export const makeTransferNftAction: ActionMaker<TransferNftData> = ({
  t,
  context: { type },
}) => ({
  key: ActionKey.TransferNft,
  Icon: BoxEmoji,
  label: t('title.transferNft'),
  description: t('info.transferNftDescription', { context: type }),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
