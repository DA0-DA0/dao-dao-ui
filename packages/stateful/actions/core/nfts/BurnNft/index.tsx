import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector } from 'recoil'

import { FireEmoji, useCachedLoadingWithError } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  LoadingDataWithError,
  NftCardInfo,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  combineLoadingDataWithErrors,
  decodePolytoneExecuteMsg,
  makePolytoneExecuteMessage,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  nftCardInfoSelector,
  nftCardInfosForDaoSelector,
  walletNftCardInfos,
} from '../../../../recoil/selectors/nft'
import { useCw721CommonGovernanceTokenInfoIfExists } from '../../../../voting-module-adapter'
import { useActionOptions } from '../../../react'
import { BurnNft, BurnNftData } from './Component'

const useTransformToCosmos: UseTransformToCosmos<BurnNftData> = () => {
  const {
    chain: { chain_id: currentChainId },
  } = useActionOptions()

  return useCallback(
    ({ chainId, collection, tokenId }: BurnNftData) => {
      const msg = makeWasmMessage({
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
      })

      return chainId === currentChainId
        ? msg
        : makePolytoneExecuteMessage(currentChainId, chainId, msg)
    },
    [currentChainId]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<BurnNftData> = (
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
          chainId,
          collection: msg.wasm.execute.contract_addr,
          tokenId: msg.wasm.execute.msg.burn.token_id,
        },
      }
    : {
        match: false,
      }
}

const Component: ActionComponent = (props) => {
  const {
    context,
    address,
    chain: { chain_id: currentChainId },
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
        ? walletNftCardInfos({
            walletAddress: address,
            chainId: currentChainId,
          })
        : nftCardInfosForDaoSelector({
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
            (data): data is LoadingDataWithError<NftCardInfo[]> => !!data
          )
        )

  return (
    <BurnNft
      {...props}
      options={{
        options: allChainOptions,
        nftInfo,
      }}
    />
  )
}

export const makeBurnNftAction: ActionMaker<BurnNftData> = ({
  t,
  chain: { chain_id: chainId },
}) => {
  const useDefaults: UseDefaults<BurnNftData> = () => ({
    chainId,
    collection: '',
    tokenId: '',
  })

  return {
    key: ActionKey.BurnNft,
    Icon: FireEmoji,
    label: t('title.burnNft'),
    description: t('info.burnNftDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
