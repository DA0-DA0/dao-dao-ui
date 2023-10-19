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
import { useTokenBalances } from '../../../../../actions'
import { ChainId, TokenType } from '@dao-dao/types'

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
  const destinationChain = watch ((props.fieldNamePrefix + 'destinationChain') as 'destinationChain')
  const destinationAddress = watch ((props.fieldNamePrefix + 'destinationAddress') as 'destinationAddress')
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

  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const denom = watch((props.fieldNamePrefix + 'denom') as 'denom')

  const tokens = useTokenBalances({
    filter: TokenType.Native,
    allChains: true,
    // Load selected token when not creating, in case it is no longer returned
    // in the list of all tokens for the given account.
    additionalTokens: props.isCreating
      ? undefined
      : [
          {
            chainId,
            type: TokenType.Native,
            denomOrAddress: denom,
          },
        ],
  })
  
  return (
    <CreateWrapprComponent
      {...props}
      options={{
        tokens,
        wrapprLoading,
      }}
    />
  )
}

export const makeCreateWrapprActionMaker =
  ({ contract }: WrapprData): ActionMaker<CreateWrapprData> =>
  ({ t, 
    context,
    address,
    chain: { chain_id: currentChainId },
  chainContext: { nativeToken },
 }) => {
    // Only available in DAO context.
    if (context.type !== ActionContextType.Dao) {
      return null
    }
      // Neutron does not use the x/distribution community pool.
  if (currentChainId === ChainId.NeutronMainnet) {
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
      msg.wasm.execute.msg.send_msg_evm.destinationChain && 
      msg.wasm.execute.msg.send_msg_evm.destinationAddress
        ? {
            match: true,
            data: {
              destinationChain: msg.wasm.execute.msg.send_msg_evm.destinationChain,
              destinationAddress: msg.wasm.execute.msg.send_msg_evm.destinationAddress,
              uploaded: true,
            },
          }
        : {
            match: false,
          }

    const useTransformToCosmos: UseTransformToCosmos<CreateWrapprData> = () =>
      useCallback(
        ({ destinationChain, destinationAddress, solidityMessage }) =>
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
