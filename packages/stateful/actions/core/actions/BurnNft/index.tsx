import { useFormContext } from 'react-hook-form'
import { constSelector } from 'recoil'

import {
  lazyNftCardInfosForDaoSelector,
  nftCardInfoSelector,
  walletLazyNftCardInfosSelector,
} from '@dao-dao/state/recoil'
import {
  ActionBase,
  FireEmoji,
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
  getChainAddressForActionOptions,
  makeExecuteSmartContractMessage,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { NftSelectionModal } from '../../../../components'
import { useCw721CommonGovernanceTokenInfoIfExists } from '../../../../voting-module-adapter'
import { BurnNft, BurnNftData } from './Component'

const Component: ActionComponent = (props) => {
  const {
    context,
    address,
    chain: { chainId: currentChainId },
  } = useActionOptions()
  const { watch } = useFormContext<BurnNftData>()
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
    !!tokenId && !!collection
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
    <BurnNft
      {...props}
      options={{
        options: allChainOptions,
        nftInfo,
        NftSelectionModal,
      }}
    />
  )
}

export class BurnNftAction extends ActionBase<BurnNftData> {
  public readonly key = ActionKey.BurnNft
  public readonly Component = Component

  protected _defaults: BurnNftData = {
    chainId: '',
    collection: '',
    tokenId: '',
  }

  constructor(options: ActionOptions) {
    super(options, {
      Icon: FireEmoji,
      label: options.t('title.burnNft'),
      description: options.t('info.burnNftDescription'),
      // This must be after the Press widget's Delete Post action.
      matchPriority: -80,
    })
  }

  encode({ chainId, collection, tokenId }: BurnNftData): UnifiedCosmosMsg[] {
    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chainId,
      chainId,
      makeExecuteSmartContractMessage({
        chainId,
        sender: getChainAddressForActionOptions(this.options, chainId) || '',
        contractAddress: collection,
        msg: {
          burn: {
            token_id: tokenId,
          },
        },
      })
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return objectMatchesStructure(decodedMessage, {
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
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): BurnNftData {
    return {
      chainId,
      collection: decodedMessage.wasm.execute.contract_addr,
      tokenId: decodedMessage.wasm.execute.msg.burn.token_id,
    }
  }
}
