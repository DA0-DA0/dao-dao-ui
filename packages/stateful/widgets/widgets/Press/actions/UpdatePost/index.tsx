import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { PencilEmoji, useCachedLoading } from '@dao-dao/stateless'
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

import { postSelector, postsSelector } from '../../state'
import { PressData } from '../../types'
import { UpdatePostComponent, UpdatePostData } from './Component'

const useDefaults: UseDefaults<UpdatePostData> = () => ({
  tokenId: '',
  tokenUri: '',
  uploaded: false,
  data: {
    title: '',
    description: '',
    content: '',
  },
})

export const makeUpdatePostActionMaker =
  ({ contract }: PressData): ActionMaker<UpdatePostData> =>
  ({ t, context, address, chain: { chain_id: chainId } }) => {
    // Only available in DAO context.
    if (context.type !== ActionContextType.Dao) {
      return null
    }

    const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdatePostData> = (
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

    const useTransformToCosmos: UseTransformToCosmos<UpdatePostData> = () =>
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
    const Component: ActionComponent = useCallback(
      (props) => {
        const { watch } = useFormContext<UpdatePostData>()
        const tokenId = watch((props.fieldNamePrefix + 'tokenId') as 'tokenId')
        const tokenUri = watch(
          (props.fieldNamePrefix + 'tokenUri') as 'tokenUri'
        )
        const uploaded = watch(
          (props.fieldNamePrefix + 'uploaded') as 'uploaded'
        )

        const postLoading = useCachedLoading(
          uploaded && tokenId && tokenUri
            ? postSelector({
                id: tokenId,
                metadataUri: tokenUri,
              })
            : undefined,
          undefined
        )

        const postsLoading = useCachedLoading(
          postsSelector({
            contractAddress: contract,
            chainId,
          }),
          []
        )

        return (
          <UpdatePostComponent
            {...props}
            options={{
              postLoading,
              postsLoading,
            }}
          />
        )
      },
      [chainId]
    )

    return {
      key: ActionKey.UpdatePost,
      Icon: PencilEmoji,
      label: t('title.updatePost'),
      description: t('info.updatePostDescription'),
      Component,
      useDefaults,
      useTransformToCosmos,
      useDecodedCosmosMsg,
    }
  }
