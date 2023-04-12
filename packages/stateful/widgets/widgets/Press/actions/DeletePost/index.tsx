import { useCallback } from 'react'

import { TrashEmoji, useCachedLoading } from '@dao-dao/stateless'
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

import { postsSelector } from '../../state'
import { PressData } from '../../types'
import { DeletePostComponent, DeletePostData } from './Component'

const useDefaults: UseDefaults<DeletePostData> = () => ({
  id: '',
})

export const makeDeletePostActionMaker =
  ({ contract }: PressData): ActionMaker<DeletePostData> =>
  ({ t, context, chainId }) => {
    // Only available in DAO context.
    if (context.type !== ActionContextType.Dao) {
      return null
    }

    const useDecodedCosmosMsg: UseDecodedCosmosMsg<DeletePostData> = (
      msg: Record<string, any>
    ) =>
      objectMatchesStructure(msg, {
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
      }) && msg.wasm.execute.contract_addr === contract
        ? {
            match: true,
            data: {
              id: msg.wasm.execute.msg.burn.token_id,
            },
          }
        : {
            match: false,
          }

    const useTransformToCosmos: UseTransformToCosmos<DeletePostData> = () =>
      useCallback(
        ({ id }) =>
          makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: contract,
                funds: [],
                msg: {
                  burn: {
                    token_id: id,
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
        const postsLoading = useCachedLoading(
          postsSelector({
            contractAddress: contract,
            chainId,
          }),
          []
        )

        return (
          <DeletePostComponent
            {...props}
            options={{
              postsLoading,
            }}
          />
        )
      },
      [chainId]
    )

    return {
      key: ActionKey.DeletePost,
      Icon: TrashEmoji,
      label: t('title.deletePost'),
      description: t('info.deletePostDescription'),
      Component,
      useDefaults,
      useTransformToCosmos,
      useDecodedCosmosMsg,
    }
  }
