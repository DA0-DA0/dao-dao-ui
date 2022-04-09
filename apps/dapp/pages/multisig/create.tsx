import React, { useEffect, useState } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useSetRecoilState, useRecoilValue } from 'recoil'

import { InstantiateResult } from '@cosmjs/cosmwasm-stargate'
import { PlusIcon } from '@heroicons/react/outline'
import { useFieldArray, useForm, Validate } from 'react-hook-form'
import { Button } from 'ui'

import { GradientHero } from '@components/ContractView'
import { FormCard } from '@components/FormCard'
import SvgAirplane from '@components/icons/Airplane'
import { ImageSelector } from '@components/input/ImageSelector'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { InputLabel } from '@components/input/InputLabel'
import { NumberInput } from '@components/input/NumberInput'
import { TextareaInput } from '@components/input/TextAreaInput'
import { TextInput } from '@components/input/TextInput'
import { TokenAmountInput } from '@components/input/TokenAmountInput'
import TooltipsDisplay, {
  useTooltipsRegister,
} from '@components/TooltipsDisplay'
import { pinnedMultisigsAtom } from 'atoms/pinned'
import { Breadcrumbs } from 'components/Breadcrumbs'
import {
  multisigCreateTooltipsDefault,
  multisigCreateTooltipsGetter,
} from 'components/TooltipsDisplay/multisigCreate'
import {
  cosmWasmSigningClient,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import { cleanChainError } from 'util/cleanChainError'
import { MULTISIG_CODE_ID } from 'util/constants'
import { secondsToWdhms } from 'util/conversion'
import {
  validatePercent,
  validatePositive,
  validateRequired,
} from 'util/formValidation'
import { makeMultisigInstantiateMessage } from 'util/messagehelpers'
import { errorNotify, successNotify } from 'util/toast'

const DEFAULT_MAX_VOTING_PERIOD_SECONDS = '604800'

export interface MultisigCreateData {
  name: string
  description: string

  duration: string
  threshold: string

  imageUrl: string

  balances: { addr: string; amount: string }[]
}

const CreateMultisig: NextPage = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    watch,
    control,
    setValue,
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<MultisigCreateData>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'balances',
  })
  useEffect(() => append({ addr: '', amount: '0' }), [append])

  const [selectedTooltip, register] = useTooltipsRegister(
    formRegister,
    multisigCreateTooltipsGetter,
    multisigCreateTooltipsDefault
  )

  const votingPeriodSeconds = watch('duration')
  const imageUrl = watch('imageUrl')
  const threshold = watch('threshold')

  const walletAddress = useRecoilValue(walletAddressSelector)
  const signingClient = useRecoilValue(cosmWasmSigningClient)

  useEffect(() => {
    if (error) errorNotify(cleanChainError(error))
  }, [error])

  const setPinnedMultisigs = useSetRecoilState(pinnedMultisigsAtom)

  const onSubmit = (data: MultisigCreateData) => {
    setError('')
    setLoading(true)

    const voters = data.balances.map(({ addr, amount }) => ({
      addr,
      weight: Number(amount),
    }))

    const imgUrl = data.imageUrl !== '' ? data.imageUrl : undefined

    const msg = makeMultisigInstantiateMessage(
      data.name,
      data.description,
      voters,
      Number(data.threshold),
      Number(data.duration),
      imgUrl
    )
    console.log('instantiating multisig with message:')
    console.log(msg)

    if (!signingClient || !walletAddress) {
      setLoading(false)
      setError('Wallet not connected')
      return
    }

    signingClient
      .instantiate(walletAddress, MULTISIG_CODE_ID, msg, data.name, 'auto')
      .then((response: InstantiateResult) => {
        setLoading(false)
        if (response.contractAddress.length > 0) {
          setPinnedMultisigs((p) => p.concat([response.contractAddress]))
          router.push(
            `/multisig/${encodeURIComponent(response.contractAddress)}`
          )
        }

        successNotify('New multisig created')
      })
      .catch((err: any) => {
        setLoading(false)
        setError(err.message)
        console.log(err.message)
      })
  }

  return (
    <div className="grid grid-cols-6">
      <form className="col-span-4" onSubmit={handleSubmit(onSubmit)}>
        <GradientHero>
          <Breadcrumbs
            crumbs={[
              ['/starred', 'Home'],
              [router.asPath, 'Create Multisig'],
            ]}
          />
          <ImageSelector
            imageUrl={imageUrl}
            label="imageUrl"
            register={register}
            error={errors.imageUrl}
          />

          <div className="flex flex-col items-center justify-center max-w-prose mx-auto mt-4 rounded-lg">
            <InputLabel name="DAO Name" mono className="pb-1" />
            <TextInput
              label="name"
              register={register}
              error={errors.name}
              validation={[validateRequired]}
              className="text-center font-bold"
            />
            <InputErrorMessage error={errors.name} />
          </div>
        </GradientHero>

        <div className="px-8">
          <div className="flex flex-col gap-1">
            <InputLabel name="Description" mono />
            <TextareaInput
              label="description"
              register={register}
              error={errors.description}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors.description} />
          </div>
          <h2 className="title-text mt-8 mb-4">Members</h2>
          {fields.map((field, index) => {
            const amount = watch(`balances.${index}.amount`)

            return (
              <TokenAmountInput
                onPlusMinus={[
                  () =>
                    setValue(
                      `balances.${index}.amount`,
                      (Number(amount) + 1).toString()
                    ),
                  () =>
                    setValue(
                      `balances.${index}.amount`,
                      (Number(amount) - 1).toString()
                    ),
                ]}
                amountLabel={`balances.${index}.amount`}
                addrLabel={`balances.${index}.addr`}
                onRemove={() => remove(index)}
                tokenSymbol={'weight'}
                hideRemove={fields.length === 1}
                title={`Member ${index}`}
                key={field.id}
                register={register}
                amountError={
                  (errors.balances &&
                    errors.balances[index] &&
                    errors.balances[index].amount) ||
                  undefined
                }
                addrError={
                  (errors.balances &&
                    errors.balances[index] &&
                    errors.balances[index].addr) ||
                  undefined
                }
              />
            )
          })}
          <Button
            variant="secondary"
            type="button"
            onClick={() => append({ addr: '', amount: '0' })}
          >
            <PlusIcon className="w-3" /> Add an address
          </Button>
          <h2 className="title-text mt-8 mb-4">Voting configuration</h2>
          <FormCard>
            <div className="grid grid-cols-5 gap-y-8 gap-x-1">
              <div className="col-span-3">
                <p className="body-text">Passing weight</p>
                <p className="caption-text">
                  Number of yes votes required for a proposal to pass.
                </p>
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <NumberInput
                  onPlusMinus={[
                    () =>
                      setValue('threshold', (Number(threshold) + 1).toString()),
                    () =>
                      setValue('threshold', (Number(threshold) - 1).toString()),
                  ]}
                  label="threshold"
                  register={register}
                  error={errors.threshold}
                  validation={[validateRequired, validatePercent]}
                  defaultValue="1"
                  step="any"
                />
                <InputErrorMessage error={errors.threshold} />
              </div>

              <div className="col-span-3">
                <p className="body-text">Voting duration (seconds)</p>
                <p className="caption-text">
                  Amount of time proposals will remain open for voting.
                </p>
              </div>
              <div className="col-span-1 flex flex-col gap-2">
                <NumberInput
                  label="duration"
                  register={register}
                  error={errors.duration}
                  defaultValue={DEFAULT_MAX_VOTING_PERIOD_SECONDS}
                  validation={[
                    validateRequired,
                    validatePositive as Validate<string>,
                  ]}
                />
                <InputErrorMessage error={errors.duration} />
              </div>
              <div className="col-span-1 flex items-center justify-center rounded-lg bg-disabled">
                <p className="secondary-text">
                  {secondsToWdhms(votingPeriodSeconds)}
                </p>
              </div>
            </div>
          </FormCard>
        </div>

        <div
          className="px-6 mb-8 mt-4 text-right w-full"
          data-tip={
            !walletAddress ? 'Connect your wallet to submit' : undefined
          }
        >
          <Button type="submit" loading={loading}>
            Submit{' '}
            <SvgAirplane color="currentColor" width="14px" height="14px" />
          </Button>
        </div>
      </form>

      <div className="col-span-2">
        <div className="sticky top-0 p-6 w-full">
          <TooltipsDisplay selected={selectedTooltip} />
        </div>
      </div>
    </div>
  )
}

export default CreateMultisig
