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

import { useActionOptions } from '../../../../../actions'
import { wrapprSelector, wrapprsSelector } from '../../state'
import { WrapprData } from '../../types'
import { ManageWrapprComponent, ManageWrapprData } from './Component'

const useDefaults: UseDefaults<ManageWrapprData> = () => ({
  tokenId: '',
  tokenUri: '',
  uploaded: false,
  data: {
    title: '',
    description: '',
    content: '',
  },
})

export const makeManageWrapprActionMaker = ({
  contract,
}: WrapprData): ActionMaker<ManageWrapprData> => {
  // Make outside of the maker function returned below so it doesn't get
  // redefined and thus remounted on every render.
  const Component: ActionComponent = (props) => {
    const {
      chain: { chain_id: chainId },
    } = useActionOptions()

    const { watch } = useFormContext<ManageWrapprData>()
    const tokenId = watch((props.fieldNamePrefix + 'tokenId') as 'tokenId')
    const tokenUri = watch((props.fieldNamePrefix + 'tokenUri') as 'tokenUri')
    const destinationChain = wathc ((props.fieldNamePrefix + 'destinationChain') as 'destinationChain')
    const destinationAddress = wathc ((props.fieldNamePrefix + 'destinationAddress') as 'destinationAddress')
    const uploaded = watch((props.fieldNamePrefix + 'uploaded') as 'uploaded')

    const wrapprLoading = useCachedLoading(
      uploaded && tokenId && tokenUri 
      // && destinationChain && destinationAddress
        ? wrapprSelector({
            id: tokenId,
            metadataUri: tokenUri,
            // chain: destinationChain,
            // address: destinationAddress,
          })
        : undefined,
      undefined
    )

    const wrapprsLoading = useCachedLoading(
      wrapprsSelector({
        contractAddress: contract,
        chainId,
      }),
      []
    )

    return (
      <ManageWrapprComponent
        {...props}
        options={{
          wrapprLoading,
          wrapprsLoading,
        }}
      />
    )
  }

  return ({ t, context, address }) => {
    // Only available in DAO context.
    if (context.type !== ActionContextType.Dao) {
      return null
    }

    const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageWrapprData> = (
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
      }) &&
      msg.wasm.execute.contract_addr === contract &&
      msg.wasm.execute.msg.send_msg_evm.destination_chain &&
      msg.wasm.execute.msg.send_msg_evm.destination_address
        ? {
            match: true,
            data: {
              destinationChain: msg.wasm.execute.msg.send_msg_evm.destination_chain,
              destinationAddress: msg.wasm.execute.msg.send_msg_evm.destination_address,
              uploaded: true,
            },
          }
        : {
            match: false,
          }

    const useTransformToCosmos: UseTransformToCosmos<ManageWrapprData> = () =>
      useCallback(
        ({ destinationChain, destinationAddress }) =>
          makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: contract,
                funds: [],
                msg: {
                  send_msg_evm: {
                    destination_chain: destinationChain,
                    destination_address: destinationAddress,
                    message: solidityMessage,
                  },
                },
              },
            },
          }),
        []
      )

    return {
      key: ActionKey.ManageWrappr,
      Icon: PencilEmoji,
      label: t('title.manageWrappr'),
      description: t('info.manageWrapprDescription'),
      Component,
      useDefaults,
      useTransformToCosmos,
      useDecodedCosmosMsg,
    }
  }
}
