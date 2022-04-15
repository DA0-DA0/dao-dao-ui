import React, { useEffect, useState } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { InstantiateResult } from '@cosmjs/cosmwasm-stargate'
import { Airplane } from '@dao-dao/icons'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { InstantiateMsg } from '@dao-dao/types/contracts/cw3-dao'
import { Button, Tooltip } from '@dao-dao/ui'
import {
  AddressInput,
  ImageSelector,
  ImageSelectorModal,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  TextareaInput,
  TextInput,
  ToggleInput,
  TokenAmountInput,
} from '@dao-dao/ui'
import {
  DAO_CODE_ID,
  NATIVE_DECIMALS,
  convertDenomToMicroDenomWithDecimals,
  secondsToWdhms,
} from '@dao-dao/utils'
import { PlusIcon } from '@heroicons/react/outline'
import { useFieldArray, useForm } from 'react-hook-form'

import { GradientHero } from '@components/ContractView'
import { FormCard } from '@components/FormCard'
import SvgAirplane from '@components/icons/Airplane'
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

export interface DaoCreateData {
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

export const DEFAULT_MAX_VOTING_PERIOD_SECONDS = '604800'
export const DEFAULT_UNSTAKING_DURATION_SECONDS = '0' // 12 hours

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
            data.tokenImage,
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
              error={errors.imageUrl}
              imageUrl={imageUrl}
              label="imageUrl"
              register={register}
            />

            <div className="flex flex-col justify-center items-center mx-auto mt-4 max-w-prose rounded-lg">
              <InputLabel
                className="pb-1"
                mono
                name="DAO Name"
                tooltip={daoCreateTooltipsGetter('name').content}
              />
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
              <InputLabel
                mono
                name="Description"
                tooltip={daoCreateTooltipsGetter('description').content}
              />
              <TextareaInput
                error={errors.description}
                label="description"
                register={register}
                validation={[validateRequired]}
              />
              <InputErrorMessage error={errors.description} />
            </div>
            <h2 className="mt-8 mb-4 title-text">New DAO{"'"}s tokenomics</h2>
            <div className="flex gap-2 items-center mt-3">
              <Button
                className={`${
                  tokenMode === TokenMode.Create
                    ? ''
                    : 'bg-transparent text-secondary'
                }`}
                onClick={() => setTokenMode(TokenMode.Create)}
                size="sm"
                type="button"
                variant="secondary"
              >
                Create new token
              </Button>
              <Button
                className={`${
                  tokenMode === TokenMode.UseExisting
                    ? ''
                    : 'bg-transparent text-secondary'
                }`}
                onClick={() => setTokenMode(TokenMode.UseExisting)}
                size="sm"
                type="button"
                variant="secondary"
              >
                Use existing token
              </Button>
            </div>
            <FormCard>
              {tokenMode === TokenMode.Create && (
                <div className="grid grid-cols-4 gap-3">
                  <div className="flex col-span-1 gap-2">
                    <div className="flex flex-col gap-2">
                      <InputLabel mono name="Token designs" />
                      <button
                        className="group flex flex-row gap-2 items-center"
                        onClick={() => setShowTokenImageModal(true)}
                        type="button"
                      >
                        <div
                          className="flex justify-center items-center w-8 h-8 bg-center bg-cover rounded-full border border-inactive group-hover:ring transition"
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
                          error={errors.tokenImage}
                          imageUrl={tokenImage}
                          label="tokenImage"
                          onClose={() => setShowTokenImageModal(false)}
                          register={register}
                          validation={[validateUrl]}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col col-span-1 gap-1">
                    <InputLabel
                      mono
                      name="Symbol"
                      tooltip={daoCreateTooltipsGetter('tokenSymbol').content}
                    />
                    <TextInput
                      error={errors.tokenSymbol}
                      label="tokenSymbol"
                      register={register}
                      validation={[isValidTicker]}
                    />
                    <InputErrorMessage error={errors.tokenSymbol} />
                  </div>
                  <div className="flex flex-col col-span-2 gap-1">
                    <InputLabel
                      mono
                      name="Name"
                      tooltip={daoCreateTooltipsGetter('tokenName').content}
                    />
                    <TextInput
                      error={errors.tokenName}
                      label="tokenName"
                      register={register}
                      validation={[isValidName]}
                    />
                    <InputErrorMessage error={errors.tokenName} />
                  </div>
                </div>
              )}
              {tokenMode === TokenMode.UseExisting && (
                <div className="flex gap-3">
                  <div className="flex basis-1/4 items-center">
                    <InputLabel
                      mono
                      name="Existing token address"
                      tooltip={
                        daoCreateTooltipsGetter('existingTokenAddress').content
                      }
                    />
                  </div>
                  <div className="flex basis-3/4 flex-col">
                    <AddressInput
                      error={errors.existingTokenAddress}
                      label="existingTokenAddress"
                      register={register}
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
                <h2 className="mt-8 mb-4 title-text">Distribution</h2>
                <FormCard>
                  <div className="flex gap-3 justify-between items-center py-3">
                    <p className="primary-text">DAO Initial Balance</p>
                    <div className="flex basis-3/5 flex-col gap-1">
                      <NumberInput
                        defaultValue="0"
                        error={errors.daoInitialBalance}
                        label="daoInitialBalance"
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
                        register={register}
                        step={0.000001}
                        validation={[validateRequired, validateNonNegative]}
                      />
                      <InputErrorMessage error={errors.daoInitialBalance} />
                    </div>
                    <div className="flex gap-3 items-center">
                      <div
                        className="w-8 h-8 bg-center bg-cover rounded-full border border-default"
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
                      title={`Recepient ${index}`}
                      tokenImage={tokenImage}
                      tokenSymbol={tokenSymbol}
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
              </>
            )}
            <h2 className="mt-8 mb-4 title-text">Voting configuration</h2>
            <FormCard>
              <div className="grid grid-cols-5 gap-x-1 gap-y-8">
                <div className="col-span-3">
                  <p className="body-text">Passing threshold (%)</p>
                  <p className="caption-text">
                    Percentage of yes votes required for a proposal to pass.
                  </p>
                </div>
                <div className="flex flex-col col-span-2 gap-1">
                  <NumberInput
                    defaultValue="51"
                    error={errors.threshold}
                    label="threshold"
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
                    register={register}
                    step="any"
                    validation={[validateRequired, validatePercent]}
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
                <div className="flex flex-col col-span-2 gap-1">
                  <NumberInput
                    defaultValue="33"
                    error={errors.quorum}
                    label="quorum"
                    onPlusMinus={[
                      () => setValue('quorum', (Number(quorum) + 1).toString()),
                      () => setValue('quorum', (Number(quorum) - 1).toString()),
                    ]}
                    register={register}
                    step="any"
                    validation={[validateRequired, validatePercent]}
                  />
                  <InputErrorMessage error={errors.quorum} />
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
                    validation={[validateRequired, validatePositive]}
                  />
                  <InputErrorMessage error={errors.duration} />
                </div>
                <div className="flex col-span-1 justify-center items-center bg-disabled rounded-lg">
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
                <div className="flex flex-col col-span-1 gap-2">
                  <NumberInput
                    defaultValue={DEFAULT_UNSTAKING_DURATION_SECONDS}
                    error={errors.unstakingDuration}
                    label="unstakingDuration"
                    register={register}
                    validation={[validateRequired]}
                  />
                  <InputErrorMessage error={errors.unstakingDuration} />
                </div>
                <div className="flex col-span-1 justify-center items-center bg-disabled rounded-lg">
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
                <div className="flex col-span-2 gap-1">
                  <div className="flex basis-1/2 flex-col gap-1">
                    <NumberInput
                      defaultValue="0"
                      error={errors.deposit}
                      label="deposit"
                      register={register}
                      step={0.000001}
                      validation={[validateRequired]}
                    />
                    <InputErrorMessage error={errors.deposit} />
                  </div>
                  <div className="flex basis-1/2 col-span-1 gap-2 justify-center items-center">
                    <InputLabel mono name="Refund" />
                    <ToggleInput label="refund" register={register} />
                  </div>
                </div>
              </div>
            </FormCard>
          </div>

          <div className="flex justify-end px-6 mt-4 mb-8 w-full">
            <Tooltip
              label={
                !walletAddress ? 'Connect your wallet to submit' : undefined
              }
            >
              <Button loading={loading} type="submit">
                Submit{' '}
                <Airplane color="currentColor" height="14px" width="14px" />
              </Button>
            </Tooltip>
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
