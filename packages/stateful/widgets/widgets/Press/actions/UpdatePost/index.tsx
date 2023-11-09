import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { PencilEmoji, useCachedLoading } from '@dao-dao/stateless'
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

import { useActionOptions } from '../../../../../actions'
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

export const makeUpdatePostActionMaker = ({
  chainId: configuredChainId,
  contract,
}: PressData): ActionMaker<UpdatePostData> => {
  // Make outside of the maker function returned below so it doesn't get
  // redefined and thus remounted on every render.
  const Component: ActionComponent = (props) => {
    const {
      chain: { chain_id: daoChainId },
    } = useActionOptions()
    // The chain that Press is set up on. If chain ID is undefined, default to
    // native DAO chain for backwards compatibility.
    const pressChainId = configuredChainId || daoChainId

    const { watch } = useFormContext<UpdatePostData>()
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

    const postsLoading = useCachedLoading(
      postsSelector({
        contractAddress: contract,
        chainId: pressChainId,
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
  }

  return (options) => {
    const {
      t,
      chain: { chain_id: daoChainId },
    } = options

    // The chain that Press is set up on. If chain ID is undefined, default to
    // native DAO chain for backwards compatibility.
    const pressChainId = configuredChainId || daoChainId

    const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdatePostData> = (
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
        chainId === pressChainId &&
        msg.wasm.execute.contract_addr === contract &&
        msg.wasm.execute.msg.mint.token_uri
        ? {
            match: true,
            data: {
              chainId,
              tokenId: msg.wasm.execute.msg.mint.token_id,
              tokenUri: msg.wasm.execute.msg.mint.token_uri,
              uploaded: true,
            },
          }
        : {
            match: false,
          }
    }

    const useTransformToCosmos: UseTransformToCosmos<UpdatePostData> = () =>
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
}
