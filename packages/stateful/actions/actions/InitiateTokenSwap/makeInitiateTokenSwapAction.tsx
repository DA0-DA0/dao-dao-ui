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
  tokenSwapContract: undefined,
})

export const makeInitiateTokenSwapAction: ActionMaker<
  InitiateTokenSwapData
> = ({ t }) => {
  const Component: ActionComponent<undefined, InitiateTokenSwapData> = (
    props
  ) => {
    const { watch } = useFormContext()
    const tokenSwapContract = watch(props.fieldNamePrefix + 'tokenSwapContract')

    return (
      <ActionCard
        Icon={HandshakeEmoji}
        onRemove={props.onRemove}
        title={t('title.initiateTokenSwap')}
      >
        <SuspenseLoader fallback={<Loader />}>
          {tokenSwapContract ? (
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
    useCallback(({ tokenSwapContract }: InitiateTokenSwapData) => {
      // Should never happen if form validation is working correctly.
      if (!tokenSwapContract) {
        throw new Error(t('error.loadingData'))
      }

      return tokenSwapContract.type === 'cw20'
        ? makeWasmMessage({
            wasm: {
              execute: {
                // Execute CW20 send message.
                contract_addr: tokenSwapContract.denomOrAddress,
                funds: [],
                msg: {
                  amount: tokenSwapContract.amount,
                  contract: tokenSwapContract.address,
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
          })
        : makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: tokenSwapContract.address,
                funds: coins(
                  tokenSwapContract.amount,
                  tokenSwapContract.denomOrAddress
                ),
                msg: {
                  fund: {},
                },
              },
            },
          })
    }, [])

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
          tokenSwapContract: {
            address: msg.wasm.execute.contract_addr,
            type: 'native',
            denomOrAddress: msg.wasm.execute.funds[0].denom,
            amount: Number(msg.wasm.execute.funds[0].amount),
          },
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
              amount: {},
              contract: {},
              msg: {},
            },
          },
        },
      }) &&
      // Use common key to identify CW20s being sent to token swaps from this
      // DAO DAO action.
      CW20_SEND_MSG_KEY in parseEncodedMessage(msg.wasm.execute.msg.msg)
    ) {
      return {
        match: true,
        data: {
          tokenSwapContract: {
            address: msg.wasm.execute.msg.contract,
            type: 'cw20',
            denomOrAddress: msg.wasm.execute.contract_addr,
            amount: Number(msg.wasm.execute.msg.amount),
          },
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
