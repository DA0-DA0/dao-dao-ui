import { coins } from '@cosmjs/amino'
import { toBase64, toUtf8 } from '@cosmjs/encoding'
import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilCallback } from 'recoil'

import { CwTokenSwapSelectors } from '@dao-dao/state/recoil'
import {
  AddressInput,
  Button,
  HandshakeEmoji,
  InputErrorMessage,
  InputLabel,
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
  makeWasmMessage,
  objectMatchesStructure,
  parseEncodedMessage,
  processError,
  validateContractAddress,
  validateRequired,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../components'
import { ActionCard } from '../../components/ActionCard'
import { PerformTokenSwapData } from '../../components/PerformTokenSwap'
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

const useDefaults: UseDefaults<PerformTokenSwapData> = () => ({
  contractChosen: false,
  tokenSwapContractAddress: undefined,

  // Defaults set once data is fetched in InstantiateTokenSwap since we default
  // to specific token info.
  selfParty: undefined,
  counterparty: undefined,
})

export const makePerformTokenSwapAction: ActionMaker<PerformTokenSwapData> = ({
  t,
  chainId,
  address,
  context,
}) => {
  const Component: ActionComponent<undefined, PerformTokenSwapData> = (
    props
  ) => {
    const { watch, setValue, register, trigger, setError, clearErrors } =
      useFormContext()
    const contractChosen = watch(props.fieldNamePrefix + 'contractChosen')

    const [creatingNew, setCreatingNew] = useState(true)
    const [mounted, setMounted] = useState(false)

    // If contractChosen is true on mount during creation, clear it. This must
    // have been set by duplicating an existing action.
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

    const tokenSwapContractAddress = watch(
      props.fieldNamePrefix + 'tokenSwapContractAddress'
    )
    const [validatingExistingContract, setValidatingExistingContract] =
      useState(false)
    const onChooseExistingContract = useRecoilCallback(
      ({ snapshot }) =>
        async () => {
          setValidatingExistingContract(true)
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

            // Verify we have not already paid our share.
            if (selfParty.provided) {
              throw new Error(
                t('error.alreadySentTokenSwap', {
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
            setValidatingExistingContract(false)
          }
        },
      [
        trigger,
        props.fieldNamePrefix,
        setValue,
        tokenSwapContractAddress,
        setError,
        clearErrors,
        setValidatingExistingContract,
      ]
    )

    return (
      <ActionCard
        Icon={HandshakeEmoji}
        onRemove={props.onRemove}
        title={t('title.performTokenSwap')}
      >
        <SuspenseLoader fallback={<Loader />} forceFallback={!mounted}>
          {contractChosen ? (
            <InstantiatedTokenSwap {...props} />
          ) : (
            <div className="flex flex-col gap-4">
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

              {creatingNew ? (
                <InstantiateTokenSwap {...props} />
              ) : (
                <>
                  <div className="space-y-2">
                    <InputLabel name={t('form.existingTokenSwapContract')} />

                    <AddressInput
                      error={props.errors?.tokenSwapContractAddress}
                      fieldName={
                        props.fieldNamePrefix + 'tokenSwapContractAddress'
                      }
                      iconType="contract"
                      register={register}
                      validation={[validateRequired, validateContractAddress]}
                    />

                    <InputErrorMessage
                      error={props.errors?.tokenSwapContractAddress}
                    />
                  </div>

                  <Button
                    className="self-end"
                    loading={validatingExistingContract}
                    onClick={onChooseExistingContract}
                    size="lg"
                  >
                    {t('button.continue')}
                  </Button>
                </>
              )}
            </div>
          )}

          <InputErrorMessage
            className="self-end text-right"
            error={props.errors?.contractChosen}
          />
        </SuspenseLoader>
      </ActionCard>
    )
  }

  const useTransformToCosmos: UseTransformToCosmos<PerformTokenSwapData> = () =>
    useCallback(
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
                  funds: coins(amount, selfParty.denomOrAddress),
                  msg: {
                    fund: {},
                  },
                },
              },
            })
      },
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<PerformTokenSwapData> = (
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

  return {
    key: CoreActionKey.PerformTokenSwap,
    Icon: HandshakeEmoji,
    label: t('title.performTokenSwap'),
    description: t('info.performTokenSwapDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
