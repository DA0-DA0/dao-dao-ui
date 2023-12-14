import { useCallback } from 'react'

import {
  ArtistPaletteEmoji,
  DaoSupportedChainPickerInput,
} from '@dao-dao/stateless'
import { ChainId } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  getSupportedChainConfig,
  makeWasmMessage,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  InstantiateNftCollectionAction,
  InstantiateNftCollectionData,
} from '../../../../components'
import { useActionOptions } from '../../../react'

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          excludeChainIds={[ChainId.StargazeMainnet, ChainId.StargazeTestnet]}
          fieldName={props.fieldNamePrefix + 'chainId'}
        />
      )}

      <InstantiateNftCollectionAction {...props} />
    </>
  )
}

export const makeCreateNftCollectionAction: ActionMaker<
  InstantiateNftCollectionData
> = (options) => {
  const {
    t,
    chain: { chain_id: currentChainId },
    context,
  } = options

  const useDefaults: UseDefaults<InstantiateNftCollectionData> = () => ({
    chainId: currentChainId,
    name: '',
    symbol: '',
  })

  const useTransformToCosmos: UseTransformToCosmos<
    InstantiateNftCollectionData
  > = () =>
    useCallback(({ chainId, name, symbol }: InstantiateNftCollectionData) => {
      if (
        chainId === ChainId.StargazeMainnet ||
        chainId === ChainId.StargazeTestnet
      ) {
        throw new Error(t('error.cannotUseCreateNftCollectionOnStargaze'))
      }

      const creator = getChainAddressForActionOptions(options, chainId)
      if (!creator) {
        throw new Error(t('error.loadingData'))
      }

      return maybeMakePolytoneExecuteMessage(
        currentChainId,
        chainId,
        makeWasmMessage({
          wasm: {
            instantiate: {
              admin: creator,
              code_id:
                getSupportedChainConfig(chainId)?.codeIds.Cw721Base ?? -1,
              funds: [],
              label: name,
              msg: {
                minter: creator,
                name,
                symbol,
              },
            },
          },
        })
      )
    }, [])

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<
    InstantiateNftCollectionData
  > = (msg: Record<string, any>) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
    if (decodedPolytone.match) {
      chainId = decodedPolytone.chainId
      msg = decodedPolytone.msg
    }

    return objectMatchesStructure(msg, {
      wasm: {
        instantiate: {
          code_id: {},
          label: {},
          msg: {
            minter: {},
            name: {},
            symbol: {},
          },
          funds: {},
        },
      },
    })
      ? {
          match: true,
          data: {
            chainId,
            name: msg.wasm.instantiate.name,
            symbol: msg.wasm.instantiate.symbol,
          },
        }
      : {
          match: false,
        }
  }

  return {
    key: ActionKey.CreateNftCollection,
    Icon: ArtistPaletteEmoji,
    label: t('title.createNftCollection'),
    description: t('info.createNftCollectionDescription', {
      context: context.type,
    }),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
