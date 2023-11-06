// TODO: 


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
  uploaded: false,
  // wrappr data 
  data: {
    entity: '',
    jurisdiction: '',
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
  const entity = watch ((props.fieldNamePrefix + 'entity') as 'entity')
  const jurisdiction = watch ((props.fieldNamePrefix + 'jurisdiction') as 'jurisdiction')
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
              mint_wrappr: {
                entity: {},
                jurisdiction: {},
              },
            },
          },
        },
      }) &&
      msg.wasm.execute.contract_addr === contract &&
      msg.wasm.execute.msg.mint_wrappr.entity && 
      msg.wasm.execute.msg.mint_wrappr.jurisdiction
        ? {
            match: true,
            data: {
              destinationChain: msg.wasm.execute.msg.mint_wrappr.entity,
              destinationAddress: msg.wasm.execute.msg.mint_wrappr.jurisdiction,
              uploaded: true,
            },
          }
        : {
            match: false,
          }

    const useTransformToCosmos: UseTransformToCosmos<CreateWrapprData> = () =>
      useCallback(
        ({ entity, jurisdiction }) =>
          makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: contract,
                funds: [],
                msg: {
                  mint_wrappr: {
                    entity: entity,
                    jurisdiction: jurisdiction,
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
