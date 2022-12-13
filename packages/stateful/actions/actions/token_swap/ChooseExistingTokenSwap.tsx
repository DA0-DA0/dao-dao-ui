import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilCallback } from 'recoil'

import { CwTokenSwapSelectors } from '@dao-dao/state/recoil'
import { ActionComponent } from '@dao-dao/types'
import { objectMatchesStructure, processError } from '@dao-dao/utils'

import { ChooseExistingTokenSwap as StatelessChooseExistingTokenSwap } from '../../components/token_swap'
import { useActionOptions } from '../../react'

interface ChooseExistingTokenSwapOptions {
  action: 'fund' | 'withdraw'
}

export const ChooseExistingTokenSwap: ActionComponent<
  ChooseExistingTokenSwapOptions
> = ({ options: { action }, ...props }) => {
  const { address, chainId, context, t } = useActionOptions()
  const { watch, setValue, setError, clearErrors, trigger } = useFormContext()

  const tokenSwapContractAddress: string | undefined = watch(
    props.fieldNamePrefix + 'tokenSwapContractAddress'
  )

  const [chooseLoading, setChooseLoading] = useState(false)
  const onChooseExistingContract = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        setChooseLoading(true)
        try {
          clearErrors(props.fieldNamePrefix + 'tokenSwapContractAddress')

          // Manually validate the contract address.
          const valid = await trigger(
            props.fieldNamePrefix + 'tokenSwapContractAddress'
          )
          if (!valid) {
            // Error will be set by trigger.
            return
          }

          // Should never happen due to validation above; just typecheck.
          if (!tokenSwapContractAddress) {
            throw new Error(t('error.loadingData'))
          }

          // Verify contract exists and looks like a token swap contract.
          let status
          try {
            status = await snapshot.getPromise(
              CwTokenSwapSelectors.statusSelector({
                contractAddress: tokenSwapContractAddress,
                chainId,
                params: [],
              })
            )
          } catch (err) {
            console.error(err)

            // If query failed, different contract.
            if (
              err instanceof Error &&
              err.message.includes('Query failed') &&
              err.message.includes('unknown variant')
            ) {
              throw new Error(t('error.notATokenSwapContractAddress'))
            }

            // If unrecognized error, rethrow.
            throw err
          }

          // Verify status response looks correct.
          if (
            !objectMatchesStructure(status, {
              counterparty_one: {
                address: {},
                promise: {},
                provided: {},
              },
              counterparty_two: {
                address: {},
                promise: {},
                provided: {},
              },
            })
          ) {
            throw new Error(t('error.notATokenSwapContractAddress'))
          }

          // Verify we are one of the parties.
          const selfParty =
            status.counterparty_one.address === address
              ? status.counterparty_one
              : status.counterparty_two.address === address
              ? status.counterparty_two
              : undefined
          if (!selfParty) {
            throw new Error(
              t('error.notPartyInTokenSwap', {
                context: context.type,
              })
            )
          }

          // If funding, verify we have not already paid our share.
          if (action === 'fund' && selfParty.provided) {
            throw new Error(
              t('error.alreadySentTokenSwap', {
                context: context.type,
              })
            )
          }
          // If withdrawing, verify we have already paid our share.
          if (action === 'withdraw' && !selfParty.provided) {
            throw new Error(
              t('error.notYetSentTokenSwap', {
                context: context.type,
              })
            )
          }

          // Indicate contract is ready.
          setValue(props.fieldNamePrefix + 'contractChosen', true, {
            shouldValidate: true,
          })
        } catch (err) {
          console.error(err)
          setError(props.fieldNamePrefix + 'tokenSwapContractAddress', {
            type: 'custom',
            message:
              err instanceof Error ? err.message : `${processError(err)}`,
          })
          return
        } finally {
          setChooseLoading(false)
        }
      },
    [
      trigger,
      props.fieldNamePrefix,
      setValue,
      tokenSwapContractAddress,
      setError,
      clearErrors,
      setChooseLoading,
      action,
    ]
  )

  return (
    <StatelessChooseExistingTokenSwap
      {...props}
      options={{
        chooseLoading,
        onChooseExistingContract,
      }}
    />
  )
}
