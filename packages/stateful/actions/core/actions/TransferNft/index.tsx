import JSON5 from 'json5'
import { useFormContext } from 'react-hook-form'
import { constSelector } from 'recoil'

import {
  lazyNftCardInfosForDaoSelector,
  nftCardInfoSelector,
  walletLazyNftCardInfosSelector,
} from '@dao-dao/state/recoil'
import {
  ActionBase,
  BoxEmoji,
  useActionOptions,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  LazyNftCardInfo,
  LoadingDataWithError,
  ProcessedMessage,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import {
  combineLoadingDataWithErrors,
  decodeJsonFromBase64,
  encodeJsonToBase64,
  getChainAddressForActionOptions,
  makeExecuteSmartContractMessage,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput, NftSelectionModal } from '../../../../components'
import { useCw721CommonGovernanceTokenInfoIfExists } from '../../../../voting-module-adapter'
import { TransferNftComponent, TransferNftData } from './Component'

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

export class TransferNftAction extends ActionBase<TransferNftData> {
  public readonly key = ActionKey.TransferNft
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: BoxEmoji,
      label: options.t('title.transferNft'),
      description: options.t('info.transferNftDescription', {
        context: options.context.type,
      }),
    })

    this.defaults = {
      chainId: options.chain.chain_id,
      collection: '',
      tokenId: '',
      recipient: '',

      executeSmartContract: false,
      smartContractMsg: '{}',
    }
  }

  encode({
    chainId,
    collection,
    tokenId,
    recipient,
    executeSmartContract,
    smartContractMsg,
  }: TransferNftData): UnifiedCosmosMsg[] {
    const sender = getChainAddressForActionOptions(this.options, chainId)
    if (!sender) {
      throw new Error('No sender found for chain.')
    }

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chain_id,
      chainId,
      makeExecuteSmartContractMessage({
        chainId,
        sender,
        contractAddress: collection,
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
      })
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return (
      objectMatchesStructure(decodedMessage, {
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
      }) ||
      objectMatchesStructure(decodedMessage, {
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
    )
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): TransferNftData {
    return objectMatchesStructure(decodedMessage, {
      wasm: {
        execute: {
          msg: {
            transfer_nft: {},
          },
        },
      },
    })
      ? {
          chainId,
          collection: decodedMessage.wasm.execute.contract_addr,
          tokenId: decodedMessage.wasm.execute.msg.transfer_nft.token_id,
          recipient: decodedMessage.wasm.execute.msg.transfer_nft.recipient,
          executeSmartContract: false,
          smartContractMsg: '{}',
        }
      : // send_nft
        {
          chainId,
          collection: decodedMessage.wasm.execute.contract_addr,
          tokenId: decodedMessage.wasm.execute.msg.send_nft.token_id,
          recipient: decodedMessage.wasm.execute.msg.send_nft.contract,
          executeSmartContract: true,
          smartContractMsg: JSON.stringify(
            decodeJsonFromBase64(
              decodedMessage.wasm.execute.msg.send_nft.msg,
              true
            ),
            null,
            2
          ),
        }
  }
}
