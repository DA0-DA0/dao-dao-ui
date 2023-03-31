import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { BrokenHeartEmoji, InputErrorMessage, Loader } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../../components'
import { useMsgExecutesContract } from '../../../../hooks'
import { ChooseExistingTokenSwap } from '../stateful/ChooseExistingTokenSwap'
import { WithdrawTokenSwap } from './Component'

export interface WithdrawTokenSwapData {
  // Whether or not the contract has been chosen. When this is `false`, shows
  // form allowing user to enter an existing address. When `true`, it shows the
  // status of the swap. `tokenSwapContractAddress` should be defined and valid
  // when this is `true`.
  contractChosen: boolean
  tokenSwapContractAddress?: string
}

const useDefaults: UseDefaults<WithdrawTokenSwapData> = () => ({
  contractChosen: false,
  tokenSwapContractAddress: undefined,
})

const Component: ActionComponent<undefined, WithdrawTokenSwapData> = (
  props
) => {
  const { t } = useTranslation()
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
      validate: (value) => !!value || t('error.tokenSwapContractNotChosen'),
    })
  }, [props.fieldNamePrefix, register, t])

  return (
    <>
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
    </>
  )
}

export const makeWithdrawTokenSwapAction: ActionMaker<
  WithdrawTokenSwapData
> = ({ t }) => {
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
    const isTokenSwapExecute = useMsgExecutesContract(msg, 'cw-token-swap')

    if (
      isTokenSwapExecute &&
      objectMatchesStructure(msg.wasm.execute.msg, {
        withdraw: {},
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
