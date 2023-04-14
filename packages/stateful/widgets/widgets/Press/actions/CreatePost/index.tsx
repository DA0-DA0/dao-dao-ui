import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { MemoEmoji, useCachedLoading } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

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

export const makeCreatePostActionMaker =
  ({ contract }: PressData): ActionMaker<CreatePostData> =>
  ({ t, context, address }) => {
    // Only available in DAO context.
    if (context.type !== ActionContextType.Dao) {
      return null
    }

    const useDecodedCosmosMsg: UseDecodedCosmosMsg<CreatePostData> = (
      msg: Record<string, any>
    ) =>
      objectMatchesStructure(msg, {
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

    const useTransformToCosmos: UseTransformToCosmos<CreatePostData> = () =>
      useCallback(
        ({ tokenId, tokenUri }) =>
          makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: contract,
                funds: [],
                msg: {
                  mint: {
                    owner: address,
                    token_id: tokenId,
                    token_uri: tokenUri,
                  },
                },
              },
            },
          }),
        []
      )

    // Memoize to prevent unnecessary re-renders.
    const Component: ActionComponent = useCallback((props) => {
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
    }, [])

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
