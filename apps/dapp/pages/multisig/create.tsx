import { InstantiateResult } from '@cosmjs/cosmwasm-stargate'
import { PlusIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useFieldArray, useForm, Validate } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'

import { Airplane } from '@dao-dao/icons'
import { useWallet } from '@dao-dao/state'
import { Button, LoadingScreen, Tooltip } from '@dao-dao/ui'
import {
  GradientHero,
  Breadcrumbs,
  ImageSelector,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  TextareaInput,
  TextInput,
  TokenAmountInput,
} from '@dao-dao/ui'
import {
  MULTISIG_CODE_ID,
  secondsToWdhms,
  validatePercent,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import '@reach/tooltip/styles.css'
import { pinnedMultisigsAtom } from '@/atoms/pinned'
import { FormCard } from '@/components/FormCard'
import { SuspenseLoader } from '@/components/SuspenseLoader'
import TooltipsDisplay, {
  useTooltipsRegister,
} from '@/components/TooltipsDisplay'
import {
  multisigCreateTooltipsGetter,
  multisigCreateTooltipsDefault,
} from '@/components/TooltipsDisplay/multisigCreate'
import { cleanChainError } from '@/util/cleanChainError'
import { makeMultisigInstantiateMessage } from '@/util/messagehelpers'
import { errorNotify, successNotify } from '@/util/toast'

const DEFAULT_MAX_VOTING_PERIOD_SECONDS = '604800'

export interface MultisigCreateData {
  name: string
  description: string

  duration: string
  threshold: string

  imageUrl: string

  balances: { addr: string; amount: string }[]
}

const InnerCreateMultisig: FC = () => {
  const router = useRouter()
  const { address: walletAddress, signingClient } = useWallet()

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
            error={errors.imageUrl}
            imageUrl={imageUrl}
            label="imageUrl"
            register={register}
          />

          <div className="flex flex-col justify-center items-center mx-auto mt-4 max-w-prose rounded-lg">
            <InputLabel className="pb-1" mono name="Multisig Name" />
            <TextInput
              className="font-bold text-center"
              error={errors.name}
              label="name"
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors.name} />
          </div>
        </GradientHero>

        <div className="px-8">
          <div className="flex flex-col gap-1">
            <InputLabel mono name="Description" />
            <TextareaInput
              error={errors.description}
              label="description"
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors.description} />
          </div>
          <h2 className="mt-8 mb-4 title-text">Members</h2>
          {fields.map((field, index) => {
            const amount = watch(`balances.${index}.amount`)

            return (
              <TokenAmountInput
                key={field.id}
                addrError={
                  (errors.balances &&
                    errors.balances[index] &&
                    errors.balances[index].addr) ||
                  undefined
                }
                addrLabel={`balances.${index}.addr`}
                amountError={
                  (errors.balances &&
                    errors.balances[index] &&
                    errors.balances[index].amount) ||
                  undefined
                }
                amountLabel={`balances.${index}.amount`}
                hideRemove={fields.length === 1}
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
                onRemove={() => remove(index)}
                register={register}
                title={`Member ${index} weight`}
              />
            )
          })}
          <Button
            onClick={() => append({ addr: '', amount: '0' })}
            type="button"
            variant="secondary"
          >
            <PlusIcon className="w-3" /> Add an address
          </Button>
          <h2 className="mt-8 mb-4 title-text">Voting configuration</h2>
          <FormCard>
            <div className="grid grid-cols-5 gap-x-1 gap-y-8">
              <div className="col-span-3">
                <p className="body-text">Passing weight</p>
                <p className="caption-text">
                  Number of yes votes required for a proposal to pass.
                </p>
              </div>
              <div className="flex flex-col col-span-2 gap-1">
                <NumberInput
                  defaultValue="1"
                  error={errors.threshold}
                  label="threshold"
                  onPlusMinus={[
                    () =>
                      setValue('threshold', (Number(threshold) + 1).toString()),
                    () =>
                      setValue('threshold', (Number(threshold) - 1).toString()),
                  ]}
                  register={register}
                  step="any"
                  validation={[validateRequired, validatePercent]}
                />
                <InputErrorMessage error={errors.threshold} />
              </div>

              <div className="col-span-3">
                <p className="body-text">Voting duration (seconds)</p>
                <p className="caption-text">
                  Amount of time proposals will remain open for voting.
                </p>
              </div>
              <div className="flex flex-col col-span-1 gap-2">
                <NumberInput
                  defaultValue={DEFAULT_MAX_VOTING_PERIOD_SECONDS}
                  error={errors.duration}
                  label="duration"
                  register={register}
                  validation={[
                    validateRequired,
                    validatePositive as Validate<string>,
                  ]}
                />
                <InputErrorMessage error={errors.duration} />
              </div>
              <div className="flex col-span-1 justify-center items-center bg-disabled rounded-lg">
                <p className="secondary-text">
                  {secondsToWdhms(votingPeriodSeconds)}
                </p>
              </div>
            </div>
          </FormCard>
        </div>
        <div className="flex justify-end px-6 mt-4 mb-8 w-full">
          <Tooltip
            label={!walletAddress ? 'Connect your wallet to submit' : undefined}
          >
            <Button disabled={!walletAddress} loading={loading} type="submit">
              Submit{' '}
              <Airplane color="currentColor" height="14px" width="14px" />
            </Button>
          </Tooltip>
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

const CreateMultisigPage: NextPage = () => (
  <SuspenseLoader fallback={<LoadingScreen />}>
    <InnerCreateMultisig />
  </SuspenseLoader>
)

export default CreateMultisigPage
