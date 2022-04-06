import React, { useEffect, useState } from 'react'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { InstantiateResult } from '@cosmjs/cosmwasm-stargate'
import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { InstantiateMsg } from '@dao-dao/types/contracts/cw3-dao'
import { PlusIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from 'ui'

import { GradientHero } from '@components/ContractView'
import { FormCard } from '@components/FormCard'
import SvgAirplane from '@components/icons/Airplane'
import { AddressInput } from '@components/input/AddressInput'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { InputLabel } from '@components/input/InputLabel'
import { NumberInput } from '@components/input/NumberInput'
import { TextareaInput } from '@components/input/TextAreaInput'
import { TextInput } from '@components/input/TextInput'
import { ToggleInput } from '@components/input/ToggleInput'
import { Modal } from '@components/Modal'
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
  secondsToHms,
} from 'util/conversion'
import {
  validateAddress,
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
  const [showImageSelect, setShowImageSelect] = useState(false)

  const {
    watch,
    control,
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
  const tokenSymbol = watch('tokenSymbol')
  const imageUrl = watch('imageUrl')

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
      <form className="col-span-4" onSubmit={handleSubmit(onSubmit)}>
        <GradientHero>
          <Breadcrumbs
            crumbs={[
              ['/starred', 'Home'],
              [router.asPath, 'Create DAO'],
            ]}
          />
          <button
            type="button"
            className={`w-24 h-24 rounded-full border mt-12 mx-auto border-inactive flex items-center justify-center hover:ring transition bg-center bg-cover ${
              errors.imageUrl ? 'ring ring-error' : ''
            }`}
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
            onClick={() => setShowImageSelect(true)}
          >
            <PlusIcon className="w-4" />
          </button>
          <div className={`${showImageSelect ? '' : 'hidden'}`}>
            <Modal>
              <div className="bg-white h-min max-w-md p-6 rounded-lg border border-focus relative flex flex-col items-center gap-3">
                <button
                  className="hover:bg-secondary transition rounded-full p-1 absolute right-2 top-2"
                  type="button"
                  onClick={() => setShowImageSelect(false)}
                >
                  <XIcon className="h-4 w-4" />
                </button>
                <div
                  className="rounded-full bg-center bg-cover w-[95px] h-[95px] border border-inactive"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                  }}
                  role="img"
                  aria-label="DAO's Custom Logo"
                ></div>
                <div className="flex flex-col gap-1">
                  <InputLabel name="Image URL" mono />
                  <TextInput
                    label="imageUrl"
                    register={register}
                    error={errors.imageUrl}
                    validation={[validateUrl]}
                  />
                  <InputErrorMessage error={errors.imageUrl} />
                </div>
                <div className="text-right w-full">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setShowImageSelect(false)}
                  >
                    Done <SvgAirplane color="currentColor" />
                  </Button>
                </div>
              </div>
            </Modal>
          </div>

          <div className="flex flex-col items-center justify-center max-w-prose mx-auto mt-4 rounded-lg">
            <TextInput
              label="name"
              register={register}
              error={errors.name}
              validation={[validateRequired]}
              className="text-center"
            />
            <InputErrorMessage error={errors.name} />
          </div>
        </GradientHero>

        <div className="px-6">
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
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-2 flex flex-col gap-1">
                  <InputLabel name="Symbol" mono />
                  <TextInput
                    label="tokenSymbol"
                    register={register}
                    error={errors.tokenSymbol}
                    validation={[isValidTicker]}
                  />
                  <InputErrorMessage error={errors.tokenSymbol} />
                </div>
                <div className="col-span-3 flex flex-col gap-1">
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
                    <div className="w-8 h-8 rounded-full border border-default"></div>
                    <p className="body-text">{tokenSymbol}</p>
                  </div>
                </div>
              </FormCard>
              {fields.map((field, index) => {
                return (
                  <FormCard key={field.id}>
                    <div className="flex gap-3 justify-between">
                      <p className="text-body flex items-center gap-2">
                        <UserIcon className="w-3" /> Recepient {index + 1}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-1">
                          <NumberInput
                            label={`balances.${index}.amount`}
                            register={register}
                            error={errors.daoInitialBalance}
                            validation={[validateRequired, validateNonNegative]}
                            defaultValue="0"
                            step={0.000001}
                          />
                          <InputErrorMessage
                            error={
                              (errors.balances &&
                                errors.balances[index].amount) ||
                              undefined
                            }
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded-full border border-default"></div>
                          <p className="link-text">{tokenSymbol}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="secondary-text font-mono">{'->'}</p>
                        <div className="flex flex-col gap-1">
                          <AddressInput
                            label={`balances.${index}.addr`}
                            register={register}
                            error={errors.daoInitialBalance}
                            validation={[validateRequired, validateAddress]}
                          />
                          <InputErrorMessage
                            error={
                              (errors.balances &&
                                errors.balances[index].addr) ||
                              undefined
                            }
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className={`${fields.length === 1 ? 'invisible' : ''}`}
                      >
                        <XIcon className="text-error w-4" />
                      </button>
                    </div>
                  </FormCard>
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
                  Minimum percentage of voting power that must participate in a
                  proposal for it to pass.
                </p>
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <NumberInput
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
                <InputErrorMessage error={errors.quorum} />
              </div>
              <div className="col-span-1 flex items-center justify-center rounded-lg bg-disabled">
                <p className="secondary-text">
                  {secondsToHms(votingPeriodSeconds)}
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
                  {secondsToHms(unstakingDurationSeconds)}
                </p>
              </div>

              <div className="col-span-3">
                <p className="body-text">Proposal deposit</p>
                <p className="caption-text">
                  Number of governance tokens that must be deposited to create a
                  proposal.
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

      <div className="col-span-2">
        <div className="sticky top-0 p-6 w-full">
          <TooltipsDisplay selected={selectedTooltip} />
        </div>
      </div>
    </div>
  )
}

export default CreateDao
