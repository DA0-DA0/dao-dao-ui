import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector } from 'recoil'

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

import { useActionOptions } from '../../../../../actions'
import { wrapprSelector, wrapprsSelector } from '../../state'
import { WrapprData } from '../../types'
import { DeleteWrapprComponent, DeleteWrapprData } from './Component'

const useDefaults: UseDefaults<DeleteWrapprData> = () => ({
  id: '',
})

export const makeDeleteWrapprActionMaker = ({
  contract,
}: WrapprData): ActionMaker<DeleteWrapprData> => {
  // Make outside of the maker function returned below so it doesn't get
  // redefined and thus remounted on every render.
  const Component: ActionComponent = (props) => {
    const {
      chain: { chain_id: chainId },
    } = useActionOptions()

    const { watch } = useFormContext()
    const id = watch((props.fieldNamePrefix + 'id') as 'id')

    const wrapprsLoading = useCachedLoading(
      wrapprsSelector({
        contractAddress: contract,
        chainId,
      }),
      []
    )

    // Once created, manually load metadata; it won't be retrievable from
    // the contract if it was successfully removed since the token was
    // burned.
    const wrapprLoading = useCachedLoading(
      !props.isCreating
        ? wrapprSelector({
            id,
            metadataUri: `ipfs://${id}/metadata.json`,
          })
        : constSelector(undefined),
      undefined
    )

    return (
      <DeleteWrapprComponent
        {...props}
        options={{
          wrapprsLoading,
          wrapprLoading,
        }}
      />
    )
  }

  return ({ t, context }) => {
    // Only available in DAO context.
    if (context.type !== ActionContextType.Dao) {
      return null
    }

    const useDecodedCosmosMsg: UseDecodedCosmosMsg<DeleteWrapprData> = (
      msg: Record<string, any>
    ) =>
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              send_msg_evm: {
                destination_chain: {},
                destination_address: {},
                message: {},
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

    const useTransformToCosmos: UseTransformToCosmos<DeleteWrapprData> = () =>
      useCallback(
        ({ id }) =>
          makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: contract,
                funds: [],
                msg: {
                  send_msg_evm: {
                    destination_chain: {},
                    destination_address: {},
                    message: {},
                  },
                },
              },
            },
          }),
        []
      )

    return {
      key: ActionKey.DeleteWrappr,
      Icon: TrashEmoji,
      label: t('title.deleteWrappr'),
      description: t('info.deleteWrapprDescription'),
      Component,
      useDefaults,
      useTransformToCosmos,
      useDecodedCosmosMsg,
    }
  }
}
