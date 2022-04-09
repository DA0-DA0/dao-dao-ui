import React, { useEffect, useState } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { InstantiateResult } from '@cosmjs/cosmwasm-stargate'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { InstantiateMsg } from '@dao-dao/types/contracts/cw3-dao'
import { PlusIcon } from '@heroicons/react/outline'
import { useFieldArray, useForm, Validate } from 'react-hook-form'
import { Button } from 'ui'

import { GradientHero } from '@components/ContractView'
import { FormCard } from '@components/FormCard'
import SvgAirplane from '@components/icons/Airplane'
import { AddressInput } from '@components/input/AddressInput'
import { ImageSelector } from '@components/input/ImageSelector'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { InputLabel } from '@components/input/InputLabel'
import { NumberInput } from '@components/input/NumberInput'
import { TextareaInput } from '@components/input/TextAreaInput'
import { TextInput } from '@components/input/TextInput'
import { ToggleInput } from '@components/input/ToggleInput'
import { TokenAmountInput } from '@components/input/TokenAmountInput'
import TooltipsDisplay, {
  useTooltipsRegister,
} from '@components/TooltipsDisplay'
import { pinnedDaosAtom } from 'atoms/pinned'
import { Breadcrumbs } from 'components/Breadcrumbs'
import {
  daoCreateTooltipsGetter,
  daoCreateTooltipsDefault,
} from 'components/TooltipsDisplay/daoCreate'
import {
  cosmWasmSigningClient,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import { cleanChainError } from 'util/cleanChainError'
import { DAO_CODE_ID, NATIVE_DECIMALS } from 'util/constants'
import {
  convertDenomToMicroDenomWithDecimals,
  secondsToWdhms,
} from 'util/conversion'
import {
  validateContractAddress,
  validateNonNegative,
  validatePercent,
  validatePositive,
  validateRequired,
  validateUrl,
} from 'util/formValidation'
import { isValidName, isValidTicker } from 'util/isValidTicker'
import {
  makeDaoInstantiateWithExistingTokenMessage,
  makeDaoInstantiateWithNewTokenMessage,
} from 'util/messagehelpers'
import { errorNotify, successNotify } from 'util/toast'
import { ImageSelectorModal } from '@components/input/ImageSelector'

interface DaoCreateData {
  deposit: string
  description: string
  duration: string

  // The `tokenMode` state varaible inside of `CreateDAO` determines
  // which of these fields we use to instantiate the DAO.

  // Fields for creating a DAO with a new token.
  name: string

  threshold: string
  // Quorum if the threshold quorum passing threshold type is selected. Consult
  // `ThresholdMode` to determine if this type is selected.
  quorum: string

  tokenName: string
  tokenSymbol: string
  tokenImage: string
  daoInitialBalance: string

  // Field for creating a DAO with an existing token.
  existingTokenAddress: string

  unstakingDuration: string
  refund: string | boolean
  imageUrl: string

  balances: { addr: string; amount: string }[]
}

const DEFAULT_MAX_VOTING_PERIOD_SECONDS = '604800'
const DEFAULT_UNSTAKING_DURATION_SECONDS = '0' // 12 hours

enum TokenMode {
  UseExisting,
  Create,
}

const CreateDao: NextPage = () => {
  const router = useRouter()
  const walletAddress = useRecoilValue(walletAddressSelector)
  const signingClient = useRecoilValue(cosmWasmSigningClient)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [showTokenImageModal, setShowTokenImageModal] = useState(false)

  const {
    watch,
    control,
    setValue,
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<DaoCreateData>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'balances',
  })
  useEffect(() => append({ addr: '', amount: '0' }), [append])

  const [selectedTooltip, register] = useTooltipsRegister(
    formRegister,
    daoCreateTooltipsGetter,
    daoCreateTooltipsDefault
  )

  const votingPeriodSeconds = watch('duration')
  const unstakingDurationSeconds = watch('unstakingDuration')
  const daoInitialBalance = watch('daoInitialBalance')
  const tokenSymbol = watch('tokenSymbol')
  const imageUrl = watch('imageUrl')
  const tokenImage = watch('tokenImage')

  const threshold = watch('threshold')
  const quorum = watch('quorum')

  const [tokenMode, setTokenMode] = useState(TokenMode.Create)

  const setPinnedDaos = useSetRecoilState(pinnedDaosAtom)

  useEffect(() => {
    if (error) errorNotify(cleanChainError(error))
  }, [error])

  const onSubmit = async (data: DaoCreateData) => {
    setError('')
    setLoading(true)

    const owners = data.balances.map(({ addr, amount }) => ({
      address: addr,
      amount: convertDenomToMicroDenomWithDecimals(amount, NATIVE_DECIMALS),
    }))
    const threshold = Number(data.threshold)
    const quorum = Number(data.quorum)
    const maxVotingPeriod = {
      time: Number(data.duration),
    }
    const unstakingDuration = {
      time: Number(data.unstakingDuration),
    }
    const refund =
      typeof data.refund === 'string'
        ? Number(data.refund) === 1
        : !!data.refund

    const imgUrl = data.imageUrl !== '' ? data.imageUrl : undefined
    let tokenDecimals = 6
    if (tokenMode == TokenMode.UseExisting) {
      const tokenInfo = (await signingClient?.queryContractSmart(
        data.existingTokenAddress,
        {
          token_info: {},
        }
      )) as TokenInfoResponse
      tokenDecimals = tokenInfo.decimals
    }
    const proposalDeposit = convertDenomToMicroDenomWithDecimals(
      Number(data.deposit) || 0,
      tokenDecimals
    )

    const msg: InstantiateMsg =
      tokenMode == TokenMode.Create
        ? makeDaoInstantiateWithNewTokenMessage(
            data.name,
            data.description,
            data.tokenName,
            data.tokenSymbol,
            owners,
            convertDenomToMicroDenomWithDecimals(
              data.daoInitialBalance,
              NATIVE_DECIMALS
            ),
            threshold / 100, // Conversion to decimal percentage
            quorum / 100,
            maxVotingPeriod,
            unstakingDuration,
            proposalDeposit,
            refund,
            imgUrl
          )
        : makeDaoInstantiateWithExistingTokenMessage(
            data.name,
            data.description,
            data.existingTokenAddress,
            threshold / 100, // Conversion to decimal percentage
            quorum / 100,
            maxVotingPeriod,
            unstakingDuration,
            proposalDeposit,
            refund,
            imgUrl
          )

    console.log('instantiating DAO with message:')
    console.log(msg)

    if (!signingClient || !walletAddress) {
      setLoading(false)
      setError('Wallet not connected')
      return
    }

    signingClient
      .instantiate(walletAddress, DAO_CODE_ID, msg, data.name, 'auto')
      .then((response: InstantiateResult) => {
        setLoading(false)
        if (response.contractAddress.length > 0) {
          setPinnedDaos((p) => {
            const daos = p.concat([response.contractAddress])
            console.log(`setting pinned DAOS: (${daos})`)
            console.log(daos)
            return daos
          })
          router.push(
            `/dao/${encodeURIComponent(
              response.contractAddress
            )}?add_token=true`
          )
        }

        successNotify('New DAO Created')
      })
      .catch((err: any) => {
        setLoading(false)
        setError(err.message)
        console.log(err.message)
      })
  }

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-4">
        <form
          className="mx-auto max-w-[800px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <GradientHero>
            <Breadcrumbs
              crumbs={[
                ['/starred', 'Home'],
                [router.asPath, 'Create DAO'],
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
            <h2 className="title-text mt-8 mb-4">New DAO{"'"}s tokenomics</h2>
            <div className="flex gap-2 items-center mt-3">
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => setTokenMode(TokenMode.Create)}
                className={`${
                  tokenMode === TokenMode.Create
                    ? ''
                    : 'bg-transparent text-secondary'
                }`}
              >
                Create new token
              </Button>
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => setTokenMode(TokenMode.UseExisting)}
                className={`${
                  tokenMode === TokenMode.UseExisting
                    ? ''
                    : 'bg-transparent text-secondary'
                }`}
              >
                Use existing token
              </Button>
            </div>
            <FormCard>
              {tokenMode === TokenMode.Create && (
                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-1 flex gap-2">
                    <div className="flex flex-col gap-2">
                      <InputLabel name="Token designs" mono />
                      <button
                        className="flex flex-row gap-2 group items-center"
                        type="button"
                        onClick={() => setShowTokenImageModal(true)}
                      >
                        <div
                          className="rounded-full flex items-center justify-center border border-inactive w-8 h-8 group-hover:ring transition bg-center bg-cover"
                          style={{
                            backgroundImage: `url(${tokenImage})`,
                          }}
                        >
                          <PlusIcon className="w-4 h-4" />
                        </div>
                        <p className="caption-text">Add an image</p>
                      </button>
                      {showTokenImageModal && (
                        <ImageSelectorModal
                          label="tokenImage"
                          register={register}
                          error={errors.tokenImage}
                          validation={[validateUrl]}
                          imageUrl={tokenImage}
                          onClose={() => setShowTokenImageModal(false)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-span-1 flex flex-col gap-1">
                    <InputLabel name="Symbol" mono />
                    <TextInput
                      label="tokenSymbol"
                      register={register}
                      error={errors.tokenSymbol}
                      validation={[isValidTicker]}
                    />
                    <InputErrorMessage error={errors.tokenSymbol} />
                  </div>
                  <div className="col-span-2 flex flex-col gap-1">
                    <InputLabel name="Name" mono />
                    <TextInput
                      label="tokenName"
                      register={register}
                      error={errors.tokenName}
                      validation={[isValidName]}
                    />
                    <InputErrorMessage error={errors.tokenName} />
                  </div>
                </div>
              )}
              {tokenMode === TokenMode.UseExisting && (
                <div className="flex gap-3">
                  <div className="flex items-center basis-1/4">
                    <InputLabel name="Existing token address" mono />
                  </div>
                  <div className="flex flex-col basis-3/4">
                    <AddressInput
                      label="existingTokenAddress"
                      register={register}
                      error={errors.existingTokenAddress}
                      validation={[validateContractAddress, validateRequired]}
                    />
                    <InputErrorMessage error={errors.existingTokenAddress} />
                  </div>
                </div>
              )}
            </FormCard>
            {tokenMode === TokenMode.Create && (
              <>
                {' '}
                <h2 className="title-text mt-8 mb-4">Distribution</h2>
                <FormCard>
                  <div className="flex gap-3 justify-between items-center py-3">
                    <p className="primary-text">DAO Initial Balance</p>
                    <div className="flex flex-col gap-1 basis-3/5">
                      <NumberInput
                        onPlusMinus={[
                          () =>
                            setValue(
                              'daoInitialBalance',
                              (Number(daoInitialBalance) + 1).toString()
                            ),
                          () =>
                            setValue(
                              'daoInitialBalance',
                              (Number(daoInitialBalance) - 1).toString()
                            ),
                        ]}
                        label="daoInitialBalance"
                        register={register}
                        error={errors.daoInitialBalance}
                        validation={[validateRequired, validateNonNegative]}
                        defaultValue="0"
                        step={0.000001}
                      />
                      <InputErrorMessage error={errors.daoInitialBalance} />
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full border border-default bg-center bg-cover"
                        style={{
                          backgroundImage: `url(${tokenImage})`,
                        }}
                      ></div>
                      <p className="body-text">{tokenSymbol}</p>
                    </div>
                  </div>
                </FormCard>
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
                      tokenImage={tokenImage}
                      addrLabel={`balances.${index}.addr`}
                      onRemove={() => remove(index)}
                      tokenSymbol={tokenSymbol}
                      hideRemove={fields.length === 1}
                      title={`Recepient ${index}`}
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
              </>
            )}
            <h2 className="title-text mt-8 mb-4">Voting configuration</h2>
            <FormCard>
              <div className="grid grid-cols-5 gap-y-8 gap-x-1">
                <div className="col-span-3">
                  <p className="body-text">Passing threshold (%)</p>
                  <p className="caption-text">
                    Percentage of yes votes required for a proposal to pass.
                  </p>
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <NumberInput
                    onPlusMinus={[
                      () =>
                        setValue(
                          'threshold',
                          (Number(threshold) + 1).toString()
                        ),
                      () =>
                        setValue(
                          'threshold',
                          (Number(threshold) - 1).toString()
                        ),
                    ]}
                    label="threshold"
                    register={register}
                    error={errors.threshold}
                    validation={[validateRequired, validatePercent]}
                    defaultValue="51"
                    step="any"
                  />
                  <InputErrorMessage error={errors.threshold} />
                </div>

                <div className="col-span-3">
                  <p className="body-text">Quorum (%)</p>
                  <p className="caption-text">
                    Minimum percentage of voting power that must participate in
                    a proposal for it to pass.
                  </p>
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <NumberInput
                    onPlusMinus={[
                      () => setValue('quorum', (Number(quorum) + 1).toString()),
                      () => setValue('quorum', (Number(quorum) - 1).toString()),
                    ]}
                    label="quorum"
                    register={register}
                    error={errors.quorum}
                    validation={[validateRequired, validatePercent]}
                    defaultValue="33"
                    step="any"
                  />
                  <InputErrorMessage error={errors.quorum} />
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
                    validation={[validateRequired, validatePositive]}
                  />
                  <InputErrorMessage error={errors.duration} />
                </div>
                <div className="col-span-1 flex items-center justify-center rounded-lg bg-disabled">
                  <p className="secondary-text">
                    {secondsToWdhms(votingPeriodSeconds)}
                  </p>
                </div>

                <div className="col-span-3">
                  <p className="body-text">Unstaking duration (seconds)</p>
                  <p className="caption-text">
                    Amount of time between unstaking and those tokens being
                    claimable.
                  </p>
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                  <NumberInput
                    label="unstakingDuration"
                    register={register}
                    error={errors.unstakingDuration}
                    validation={[validateRequired]}
                    defaultValue={DEFAULT_UNSTAKING_DURATION_SECONDS}
                  />
                  <InputErrorMessage error={errors.unstakingDuration} />
                </div>
                <div className="col-span-1 flex items-center justify-center rounded-lg bg-disabled">
                  <p className="secondary-text">
                    {secondsToWdhms(unstakingDurationSeconds)}
                  </p>
                </div>

                <div className="col-span-3">
                  <p className="body-text">Proposal deposit</p>
                  <p className="caption-text">
                    Number of governance tokens that must be deposited to create
                    a proposal.
                  </p>
                </div>
                <div className="col-span-2 flex gap-1">
                  <div className="flex flex-col gap-1 basis-1/2">
                    <NumberInput
                      label="deposit"
                      register={register}
                      error={errors.deposit}
                      validation={[validateRequired]}
                      step={0.000001}
                      defaultValue="0"
                    />
                    <InputErrorMessage error={errors.deposit} />
                  </div>
                  <div className="col-span-1 flex items-center justify-center gap-2 basis-1/2">
                    <InputLabel name="Refund" mono />
                    <ToggleInput label="refund" register={register} />
                  </div>
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
      </div>

      <div className="col-span-2">
        <div className="sticky top-0 p-6 w-full">
          <TooltipsDisplay selected={selectedTooltip} />
        </div>
      </div>
    </div>
  )
}

export default CreateDao
