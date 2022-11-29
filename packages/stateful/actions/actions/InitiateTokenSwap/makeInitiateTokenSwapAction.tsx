import { coins } from '@cosmjs/amino'
import { toBase64, toUtf8 } from '@cosmjs/encoding'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { HandshakeEmoji, Loader } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  convertDenomToMicroDenomWithDecimals,
  makeWasmMessage,
  objectMatchesStructure,
  parseEncodedMessage,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../components'
import { ActionCard } from '../../components/ActionCard'
import { InitiateTokenSwapData } from '../../components/InitiateTokenSwap'
import { InstantiatedTokenSwap } from './InstantiatedTokenSwap'
import { InstantiateTokenSwap } from './InstantiateTokenSwap'

// This action requires the user to first instantiate a token swap contract
// themself, and then the user can use this action to propose funding that token
// swap to the DAO. The token swap contract instantiator is irrelevant, so
// there's no reason to make the DAO submit two proposals (one to instantiate
// and one to fund). Thus, this action has a preliminary step, in which the user
// enters the token swap contract instantiation information and executes the
// instantiation. Once done, the action is ready to submit.

const CW20_SEND_MSG_KEY = 'dao_dao_initiate_token_swap'

const useDefaults: UseDefaults<InitiateTokenSwapData> = () => ({
  tokenSwapContractAddress: undefined,
  instantiateData: undefined,
})

export const makeInitiateTokenSwapAction: ActionMaker<
  InitiateTokenSwapData
> = ({ t }) => {
  const Component: ActionComponent<undefined, InitiateTokenSwapData> = (
    props
  ) => {
    const { watch } = useFormContext()
    const tokenSwapContractAddress = watch(
      props.fieldNamePrefix + 'tokenSwapContractAddress'
    )

    return (
      <ActionCard
        Icon={HandshakeEmoji}
        onRemove={props.onRemove}
        title={t('title.initiateTokenSwap')}
      >
        <SuspenseLoader fallback={<Loader />}>
          {tokenSwapContractAddress ? (
            <InstantiatedTokenSwap {...props} />
          ) : (
            <InstantiateTokenSwap {...props} />
          )}
        </SuspenseLoader>
      </ActionCard>
    )
  }

  const useTransformToCosmos: UseTransformToCosmos<
    InitiateTokenSwapData
  > = () =>
    useCallback(
      ({
        tokenSwapContractAddress,
        instantiateData,
      }: InitiateTokenSwapData) => {
        // Should never happen if form validation is working correctly.
        if (!tokenSwapContractAddress || !instantiateData) {
          throw new Error(t('error.loadingData'))
        }

        // Convert amount to micro amount.
        const amount = convertDenomToMicroDenomWithDecimals(
          instantiateData.selfParty.amount,
          instantiateData.selfParty.decimals
        ).toString()

        return instantiateData.selfParty.type === 'cw20'
          ? makeWasmMessage({
              wasm: {
                execute: {
                  // Execute CW20 send message.
                  contract_addr: instantiateData.selfParty.denomOrAddress,
                  funds: [],
                  msg: {
                    send: {
                      amount,
                      contract: tokenSwapContractAddress,
                      msg: toBase64(
                        toUtf8(
                          JSON.stringify({
                            // Use common key to identify CW20s being sent to token
                            // swaps from this DAO DAO action.
                            [CW20_SEND_MSG_KEY]: {},
                          })
                        )
                      ),
                    },
                  },
                },
              },
            })
          : makeWasmMessage({
              wasm: {
                execute: {
                  contract_addr: tokenSwapContractAddress,
                  funds: coins(
                    amount,
                    instantiateData.selfParty.denomOrAddress
                  ),
                  msg: {
                    fund: {},
                  },
                },
              },
            })
      },
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<InitiateTokenSwapData> = (
    msg: Record<string, any>
  ) => {
    // Native
    if (
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              fund: {},
            },
          },
        },
      }) &&
      Array.isArray(msg.wasm.execute.funds) &&
      msg.wasm.execute.funds.length === 1
    ) {
      return {
        match: true,
        data: {
          tokenSwapContractAddress: msg.wasm.execute.contract_addr,
          // Only used during instantiation.
          instantiateData: undefined,
        },
      }
    }

    // CW20
    if (
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              send: {
                amount: {},
                contract: {},
                msg: {},
              },
            },
          },
        },
      }) &&
      // Use common key to identify CW20s being sent to token swaps from this
      // DAO DAO action.
      CW20_SEND_MSG_KEY in parseEncodedMessage(msg.wasm.execute.msg.send.msg)
    ) {
      return {
        match: true,
        data: {
          tokenSwapContractAddress: msg.wasm.execute.msg.send.contract,
          // Only used during creation.
          instantiateData: undefined,
        },
      }
    }

    return { match: false }
  }

  return {
    key: CoreActionKey.InitiateTokenSwap,
    Icon: HandshakeEmoji,
    label: t('title.initiateTokenSwap'),
    description: t('info.initiateTokenSwapDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
