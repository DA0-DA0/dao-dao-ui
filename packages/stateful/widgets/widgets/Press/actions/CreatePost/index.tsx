import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { MemoEmoji, useCachedLoading } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  makeWasmMessage,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { postSelector } from '../../state'
import { PressData } from '../../types'
import { CreatePostComponent, CreatePostData } from './Component'

const useDefaults: UseDefaults<CreatePostData> = () => ({
  tokenId: '',
  tokenUri: '',
  uploaded: false,
  data: {
    title: '',
    description: '',
    content: '',
  },
})

const Component: ActionComponent = (props) => {
  const { watch } = useFormContext<CreatePostData>()
  const tokenId = watch((props.fieldNamePrefix + 'tokenId') as 'tokenId')
  const tokenUri = watch((props.fieldNamePrefix + 'tokenUri') as 'tokenUri')
  const uploaded = watch((props.fieldNamePrefix + 'uploaded') as 'uploaded')

  const postLoading = useCachedLoading(
    uploaded && tokenId && tokenUri
      ? postSelector({
          id: tokenId,
          metadataUri: tokenUri,
        })
      : undefined,
    undefined
  )

  return (
    <CreatePostComponent
      {...props}
      options={{
        postLoading,
      }}
    />
  )
}

export const makeCreatePostActionMaker =
  ({
    contract,
    chainId: configuredChainId,
  }: PressData): ActionMaker<CreatePostData> =>
  (options) => {
    const {
      t,
      chain: { chain_id: daoChainId },
    } = options

    // The chain that Press is set up on. If chain ID is undefined, default to
    // native DAO chain for backwards compatibility.
    const pressChainId = configuredChainId || daoChainId

    const useDecodedCosmosMsg: UseDecodedCosmosMsg<CreatePostData> = (
      msg: Record<string, any>
    ) => {
      let chainId = daoChainId
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
              mint: {
                owner: {},
                token_id: {},
                token_uri: {},
              },
            },
          },
        },
      }) &&
        msg.wasm.execute.contract_addr === contract &&
        msg.wasm.execute.msg.mint.token_uri
        ? {
            match: true,
            data: {
              tokenId: msg.wasm.execute.msg.mint.token_id,
              tokenUri: msg.wasm.execute.msg.mint.token_uri,
              uploaded: true,
            },
          }
        : {
            match: false,
          }
    }

    const useTransformToCosmos: UseTransformToCosmos<CreatePostData> = () =>
      useCallback(
        ({ tokenId, tokenUri }) =>
          maybeMakePolytoneExecuteMessage(
            daoChainId,
            pressChainId,
            makeWasmMessage({
              wasm: {
                execute: {
                  contract_addr: contract,
                  funds: [],
                  msg: {
                    mint: {
                      owner: getChainAddressForActionOptions(
                        options,
                        pressChainId
                      ),
                      token_id: tokenId,
                      token_uri: tokenUri,
                    },
                  },
                },
              },
            })
          ),
        []
      )

    return {
      key: ActionKey.CreatePost,
      Icon: MemoEmoji,
      label: t('title.createPost'),
      description: t('info.createPostDescription'),
      Component,
      useDefaults,
      useTransformToCosmos,
      useDecodedCosmosMsg,
    }
  }
