import { coins } from '@cosmjs/amino'
import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  HandshakeEmoji,
  InputErrorMessage,
  Loader,
  SegmentedControls,
} from '@dao-dao/stateless'
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
  encodeMessageAsBase64,
  makeWasmMessage,
  objectMatchesStructure,
  parseEncodedMessage,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../components'
import { ActionCard } from '../../components/ActionCard'
import { PerformTokenSwapData } from '../../components/token_swap'
import { useMsgExecutesContract } from '../../hooks'
import { ChooseExistingTokenSwap } from './ChooseExistingTokenSwap'
import { FundTokenSwap } from './FundTokenSwap'
import { InstantiateTokenSwap } from './InstantiateTokenSwap'

// This action requires the user to first instantiate a token swap contract
// themself, and then the user can use this action to propose funding that token
// swap to the DAO. The token swap contract instantiator is irrelevant, so
// there's no reason to make the DAO submit two proposals (one to instantiate
// and one to fund). Thus, this action has a preliminary step, in which the user
// enters the token swap contract instantiation information and executes the
// instantiation. Once done, the action is ready to submit.

// Use common key to identify CW20s being sent to token swaps from this DAO DAO
// action. This is passed into the `msg` parameter of the CW20 `send` execute
// variant, since it can take arbitrary JSON. This allows us to detect if a CW20
// send was a result of a token swap funding action in order to display this
// action accordingly.
const CW20_SEND_MSG_KEY = 'dao_dao_initiate_token_swap'

const useDefaults: UseDefaults<PerformTokenSwapData> = () => ({
  contractChosen: false,
  tokenSwapContractAddress: undefined,

  // Defaults set once data is fetched in InstantiateTokenSwap since we default
  // to specific token info.
  selfParty: undefined,
  counterparty: undefined,
})

const Component: ActionComponent<undefined, PerformTokenSwapData> = (props) => {
  const { t } = useTranslation()
  const { watch, setValue, register } = useFormContext()
  const contractChosen = watch(props.fieldNamePrefix + 'contractChosen')

  const [creatingNew, setCreatingNew] = useState(true)
  const [mounted, setMounted] = useState(false)
  // If `contractChosen` is true on mount during creation, this must have been
  // set by duplicating an existing action. In this case, we want to default
  // to using the existing contract since the address is filled in, and clear
  // `contractChosen` so the user has to confirm the contract. This may be
  // used to quickly perform a token swap with an existing contract.
  useEffect(() => {
    if (!mounted && contractChosen && props.isCreating) {
      setValue(props.fieldNamePrefix + 'contractChosen', false)
      setCreatingNew(false)
    }
    setMounted(true)
    // Only run on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Manually validate to ensure contract has been chosen.
  useEffect(() => {
    register(props.fieldNamePrefix + 'contractChosen', {
      validate: (value) => !!value || t('error.tokenSwapContractNotChosen'),
    })
  }, [props.fieldNamePrefix, register, t])

  return (
    <ActionCard
      Icon={HandshakeEmoji}
      onRemove={props.onRemove}
      title={t('title.tokenSwap')}
    >
      <SuspenseLoader fallback={<Loader />} forceFallback={!mounted}>
        {contractChosen ? (
          <FundTokenSwap {...props} />
        ) : (
          <>
            <SegmentedControls<boolean>
              onSelect={setCreatingNew}
              selected={creatingNew}
              tabs={[
                {
                  label: t('form.createNewTokenSwap'),
                  value: true,
                },
                {
                  label: t('form.fundExistingTokenSwap'),
                  value: false,
                },
              ]}
            />

            <p className="max-w-prose">{t('info.tokenSwapExplanation')}</p>

            {creatingNew ? (
              <InstantiateTokenSwap {...props} />
            ) : (
              <ChooseExistingTokenSwap
                {...props}
                options={{ action: 'fund' }}
              />
            )}
          </>
        )}

        <InputErrorMessage
          className="self-end text-right"
          error={props.errors?.contractChosen}
        />
      </SuspenseLoader>
    </ActionCard>
  )
}

const useTransformToCosmos: UseTransformToCosmos<PerformTokenSwapData> = () => {
  const { t } = useTranslation()

  return useCallback(
    ({ tokenSwapContractAddress, selfParty }: PerformTokenSwapData) => {
      // Should never happen if form validation is working correctly.
      if (!tokenSwapContractAddress || !selfParty) {
        throw new Error(t('error.loadingData'))
      }

      // Convert amount to micro amount.
      const amount = convertDenomToMicroDenomWithDecimals(
        selfParty.amount,
        selfParty.decimals
      ).toString()

      return selfParty.type === 'cw20'
        ? makeWasmMessage({
            wasm: {
              execute: {
                // Execute CW20 send message.
                contract_addr: selfParty.denomOrAddress,
                funds: [],
                msg: {
                  send: {
                    amount,
                    contract: tokenSwapContractAddress,
                    msg: encodeMessageAsBase64({
                      // Use common key to identify CW20s being sent to token
                      // swaps from this DAO DAO action.
                      [CW20_SEND_MSG_KEY]: {},
                    }),
                  },
                },
              },
            },
          })
        : makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: tokenSwapContractAddress,
                funds: coins(amount, selfParty.denomOrAddress),
                msg: {
                  fund: {},
                },
              },
            },
          })
    },
    [t]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<PerformTokenSwapData> = (
  msg: Record<string, any>
) => {
  const isTokenSwapExecute = useMsgExecutesContract(msg, 'cw-token-swap')

  // Native
  if (
    isTokenSwapExecute &&
    objectMatchesStructure(msg.wasm.execute.msg, {
      fund: {},
    }) &&
    Array.isArray(msg.wasm.execute.funds) &&
    msg.wasm.execute.funds.length === 1
  ) {
    return {
      match: true,
      data: {
        contractChosen: true,
        tokenSwapContractAddress: msg.wasm.execute.contract_addr,
        // Only used during instantiation.
        selfParty: undefined,
        counterparty: undefined,
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
        contractChosen: true,
        tokenSwapContractAddress: msg.wasm.execute.msg.send.contract,
        // Only used during instantiation.
        selfParty: undefined,
        counterparty: undefined,
      },
    }
  }

  return { match: false }
}

export const makePerformTokenSwapAction: ActionMaker<PerformTokenSwapData> = ({
  t,
}) => ({
  key: CoreActionKey.PerformTokenSwap,
  Icon: HandshakeEmoji,
  label: t('title.tokenSwap'),
  description: t('info.tokenSwapDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
