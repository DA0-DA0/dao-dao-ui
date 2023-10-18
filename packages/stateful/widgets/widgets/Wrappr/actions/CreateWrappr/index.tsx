// TODO: 
// - Call the contract that interacts with Axelar GMP
// - handle fees & responses of GMP

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

import { wrapprSelector } from '../../state'
import { WrapprData } from '../../types'
import { CreateWrapprComponent, CreateWrapprData } from './Component'

const useDefaults: UseDefaults<CreateWrapprData> = () => ({
  // key of the type of Wrappr 
  key: '',
  // chain name of message destination: https://docs.axelar.dev/dev/reference/mainnet-chain-names
  destination_chain: '',
  // address of message destination
  destination_address: '',
  uploaded: false,
  // wrappr data 
  data: {
    name: '',
    symbol: '',
    description: '',
    admin: '',
    mintFee: '',
    baseURI: '',
    agreement: '',
    attributes: {
      trait_types: '',
      value: '',
    }
  },
})

const Component: ActionComponent = (props) => {
  const { watch } = useFormContext<CreateWrapprData>()
  const tokenId = watch((props.fieldNamePrefix + 'tokenId') as 'tokenId')
  const tokenUri = watch((props.fieldNamePrefix + 'tokenUri') as 'tokenUri')
  const uploaded = watch((props.fieldNamePrefix + 'uploaded') as 'uploaded')

  const wrapprLoading = useCachedLoading(
    uploaded && tokenId && tokenUri
      ? wrapprSelector({
          id: tokenId,
          metadataUri: tokenUri,
        })
      : undefined,
    undefined
  )

  return (
    <CreateWrapprComponent
      {...props}
      options={{
        wrapprLoading,
      }}
    />
  )
}

export const makeCreateWrapprActionMaker =
  ({ contract }: WrapprData): ActionMaker<CreateWrapprData> =>
  ({ t, context, address }) => {
    // Only available in DAO context.
    if (context.type !== ActionContextType.Dao) {
      return null
    }

    const useDecodedCosmosMsg: UseDecodedCosmosMsg<CreateWrapprData> = (
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

    const useTransformToCosmos: UseTransformToCosmos<CreateWrapprData> = () =>
      useCallback(
        ({ tokenId, tokenUri }) =>
          makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: contract,
                funds: [],
                msg: {
                  send_msg_evm: {
                    destination_chain: address,
                    destination_address: tokenId,
                    message: tokenUri,
                  },
                },
              },
            },
          }),
        []
      )

    return {
      key: ActionKey.CreateWrappr,
      Icon: MemoEmoji,
      label: t('title.createWrappr'),
      description: t('info.createWrapprDescription'),
      Component,
      useDefaults,
      useTransformToCosmos,
      useDecodedCosmosMsg,
    }
  }
