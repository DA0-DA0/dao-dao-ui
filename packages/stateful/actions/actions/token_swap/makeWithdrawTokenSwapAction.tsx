import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  BrokenHeartEmoji,
  HandshakeEmoji,
  InputErrorMessage,
  Loader,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../components'
import { ActionCard } from '../../components/ActionCard'
import { WithdrawTokenSwapData } from '../../components/token_swap'
import { ChooseExistingTokenSwap } from './ChooseExistingTokenSwap'
import { WithdrawTokenSwap } from './WithdrawTokenSwap'

const useDefaults: UseDefaults<WithdrawTokenSwapData> = () => ({
  contractChosen: false,
  tokenSwapContractAddress: undefined,
})

export const makeWithdrawTokenSwapAction: ActionMaker<
  WithdrawTokenSwapData
> = ({ t }) => {
  const Component: ActionComponent<undefined, WithdrawTokenSwapData> = (
    props
  ) => {
    const { watch, setValue, register } = useFormContext()
    const contractChosen = watch(props.fieldNamePrefix + 'contractChosen')

    const [mounted, setMounted] = useState(false)
    // If `contractChosen` is true on mount during creation, this must have been
    // set by duplicating an existing action. Clear the value so that the user
    // has to confirm again.
    useEffect(() => {
      if (contractChosen && props.isCreating) {
        setValue(props.fieldNamePrefix + 'contractChosen', false)
      }
      setMounted(true)
      // Only run on mount.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Manually validate to ensure contract has been chosen.
    useEffect(() => {
      register(props.fieldNamePrefix + 'contractChosen', {
        validate: (value) => value || t('error.tokenSwapContractNotChosen'),
      })
    }, [props.fieldNamePrefix, register])

    return (
      <ActionCard
        Icon={HandshakeEmoji}
        onRemove={props.onRemove}
        title={t('title.withdrawTokenSwap')}
      >
        <SuspenseLoader fallback={<Loader />} forceFallback={!mounted}>
          {contractChosen ? (
            <WithdrawTokenSwap {...props} />
          ) : (
            <ChooseExistingTokenSwap
              {...props}
              options={{ action: 'withdraw' }}
            />
          )}

          <InputErrorMessage
            className="self-end text-right"
            error={props.errors?.contractChosen}
          />
        </SuspenseLoader>
      </ActionCard>
    )
  }

  const useTransformToCosmos: UseTransformToCosmos<
    WithdrawTokenSwapData
  > = () =>
    useCallback(({ tokenSwapContractAddress }: WithdrawTokenSwapData) => {
      if (!tokenSwapContractAddress) {
        throw new Error(t('error.loadingData'))
      }

      return makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: tokenSwapContractAddress,
            funds: [],
            msg: {
              withdraw: {},
            },
          },
        },
      })
    }, [])

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<WithdrawTokenSwapData> = (
    msg: Record<string, any>
  ) => {
    if (
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              withdraw: {},
            },
          },
        },
      })
    ) {
      return {
        match: true,
        data: {
          contractChosen: true,
          tokenSwapContractAddress: msg.wasm.execute.contract_addr,
        },
      }
    }

    return { match: false }
  }

  return {
    key: CoreActionKey.WithdrawTokenSwap,
    Icon: BrokenHeartEmoji,
    label: t('title.withdrawTokenSwap'),
    description: t('info.withdrawTokenSwapDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
