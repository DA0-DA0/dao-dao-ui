import { useQueries } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'

import { nftQueries } from '@dao-dao/state/query'
import {
  lazyNftCardInfosForDaoSelector,
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
  makeCombineQueryResultsIntoLoadingDataWithError,
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

  const nfts = watch((props.fieldNamePrefix + 'nfts') as 'nfts')

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
  const nftInfos = useQueries({
    queries: nfts.length
      ? nfts.map(({ chainId, collection, tokenId }) =>
          nftQueries.cardInfo({ chainId, collection, tokenId })
        )
      : [],
    combine: makeCombineQueryResultsIntoLoadingDataWithError(),
  })

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
        nftInfos: nfts.length ? nftInfos : undefined,
        NftSelectionModal,
      }}
    />
  )
}

export class BurnNftAction extends ActionBase<BurnNftData> {
  public readonly key = ActionKey.BurnNft
  public readonly Component = Component

  protected _defaults: BurnNftData = {
    nfts: [],
  }

  constructor(options: ActionOptions) {
    super(options, {
      Icon: FireEmoji,
      label: options.t('title.burnNfts'),
      description: options.t('info.burnNftsDescription'),
      // This must be after the Press module's Delete Post action.
      matchPriority: -80,
    })
  }

  encode({ nfts }: BurnNftData): UnifiedCosmosMsg[] {
    // Group NFTs by chain.
    const nftsByChain = Object.entries(
      nfts.reduce(
        (acc, nft) => ({
          ...acc,
          [nft.chainId]: [...(acc[nft.chainId] ?? []), nft],
        }),
        {} as Record<string, BurnNftData['nfts']>
      )
    )

    return nftsByChain.flatMap(([chainId, nfts]) =>
      maybeMakePolytoneExecuteMessages(
        this.options.chain.chainId,
        chainId,
        nfts.map(({ collection, tokenId }) =>
          makeExecuteSmartContractMessage({
            chainId,
            sender:
              getChainAddressForActionOptions(this.options, chainId) || '',
            contractAddress: collection,
            msg: {
              burn: {
                token_id: tokenId,
              },
            },
          })
        )
      )
    )
  }

  // This should match one or more burns, including wrapped/cross-chain messages
  // with one or more burns.
  handleMessages(messages: ProcessedMessage[]) {
    const all = messages.map(
      ({ isWrapped, decodedMessages, account: { chainId } }) => {
        const burns = decodedMessages.map((decodedMessage) =>
          objectMatchesStructure(decodedMessage, {
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
                chainId,
                collection: decodedMessage.wasm.execute.contract_addr,
                tokenId: decodedMessage.wasm.execute.msg.burn.token_id,
              }
            : null
        )

        // All messages must be burns for this to match. Otherwise, we may match
        // a cross-chain execute and accidentally conceal other messages.
        return burns.every(Boolean)
          ? {
              isWrapped,
              burns: burns as {
                chainId: string
                collection: any
                tokenId: any
              }[],
            }
          : null
      }
    )

    // If the first is not a burn, match none.
    if (!all.length || !all[0]) {
      return []
    }

    // Select all adjacent burns starting with the first.
    const burns = [all[0]]
    for (const burn of all.slice(1)) {
      if (!burn) {
        break
      }

      burns.push(burn)
    }

    return burns
  }

  match(messages: ProcessedMessage[]): ActionMatch {
    const burns = this.handleMessages(messages)
    return burns.reduce(
      // If wrapped execute, only match the one wrapped execute that contains
      // the other burns.
      (acc, group) => acc + (group.isWrapped ? 1 : group.burns.length),
      0
    )
  }

  decode(messages: ProcessedMessage[]): BurnNftData {
    const burns = this.handleMessages(messages)
    return {
      nfts: burns.flatMap(({ burns }) =>
        burns.map(({ chainId, collection, tokenId }) => ({
          chainId,
          collection,
          tokenId,
        }))
      ),
    }
  }
}
