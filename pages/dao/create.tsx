import React, { ReactElement, useEffect, useState } from 'react'
import { InstantiateResult } from '@cosmjs/cosmwasm-stargate'
import { InstantiateMsg } from '@dao-dao/types/contracts/cw3-dao'
import { XIcon } from '@heroicons/react/solid'
import HelpTooltip from 'components/HelpTooltip'
import InputField from 'components/InputField'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { DAO_CODE_ID } from 'util/constants'
import { convertDenomToMicroDenom } from 'util/conversion'
import { defaultExecuteFee } from 'util/fee'
import { isValidAddress } from 'util/isValidAddress'
import {
  makeDaoInstantiateWithExistingTokenMessage,
  makeDaoInstantiateWithNewTokenMessage,
} from 'util/messagehelpers'
import { errorNotify, successNotify } from 'util/toast'
import { isValidName, isValidTicker } from 'util/isValidTicker'
import { cleanChainError } from 'util/cleanChainError'
import { ClipboardListIcon, PaperClipIcon } from '@heroicons/react/outline'

const DEFAULT_MAX_VOTING_PERIOD_SECONDS = '604800'
const DEFAULT_UNSTAKING_DURATION_SECONDS = '43200' // 12 hours

enum TokenMode {
  UseExisting,
  Create,
}

interface DaoCreateData {
  deposit: string
  description: string
  duration: string

  // The `tokenMode` state varaible inside of `CreateDAO` determines
  // which of these fields we use to instantiate the DAO.

  // Fields for creating a DAO with a new token.
  label: string
  threshold: string
  tokenName: string
  tokenSymbol: string
  daoInitialBalance: string

  // Field for creating a DAO with an existing token.
  existingTokenAddress: string

  unstakingDuration: string
  refund: string | boolean
  proposalDepositAmount: string
  [key: string]: string | boolean
}

const CreateDao: NextPage = () => {
  const router = useRouter()
  const { walletAddress, signingClient } = useSigningClient()
  const [count, setCount] = useState(1)
  const [contractAddress, _setContractAddress] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [votingPeriodSeconds, setVotingPeriodSeconds] = useState(
    DEFAULT_MAX_VOTING_PERIOD_SECONDS
  )
  const [unstakingDurationSeconds, setUnstakingDurationSeconds] = useState(
    DEFAULT_UNSTAKING_DURATION_SECONDS
  )

  const [tokenMode, setTokenMode] = useState(TokenMode.Create)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (error) errorNotify(cleanChainError(error))
  }, [error])

  function fieldErrorMessage(fieldName: string, msg?: string) {
    const err = errors[fieldName]
    if (err) {
      if (!msg) {
        if (err.type === 'required') {
          msg = `"${fieldName}" is required`
        } else {
          msg = `bad input for ${fieldName} (${err.type})`
        }
      }
      return msg
    }
    return ''
  }

  function secondsToHms(seconds: string): string {
    const secondsInt = Number(seconds)
    var h = Math.floor(secondsInt / 3600)
    var m = Math.floor((secondsInt % 3600) / 60)
    var s = Math.floor((secondsInt % 3600) % 60)

    var hDisplay =
      h > 0 ? h + (h == 1 ? ' hr' : ' hrs') + (m > 0 || s > 0 ? ', ' : '') : ''
    var mDisplay =
      m > 0 ? m + (m == 1 ? ' min' : ' mins') + (s > 0 ? ', ' : '') : ''
    var sDisplay = s > 0 ? s + (s == 1 ? ' sec' : ' secs') : ''
    return hDisplay + mDisplay + sDisplay
  }

  const onSubmit = (data: DaoCreateData) => {
    setError('')
    setLoading(true)
    function getStringValue(key: string): string {
      const val = data[key]
      if (typeof val === 'string') {
        return val.trim()
      }
      return ''
    }
    function getIntValue(key: string): number {
      return parseInt(getStringValue(key) || '0', 10)
    }
    function getIndexedValue(prefix: string, index: number): string {
      return getStringValue(`${prefix}_${index}`)
    }
    const owners = [...Array(count)].map((_item, index) => ({
      address: getIndexedValue('address', index),
      // Convert human readable amount to micro denom amount
      amount: convertDenomToMicroDenom(getIndexedValue('weight', index)),
    }))
    const threshold = getIntValue('threshold')
    const maxVotingPeriod = {
      time: getIntValue('duration'),
    }
    const unstakingDuration = {
      time: getIntValue('unstakingDuration'),
    }
    const refund =
      typeof data.refund === 'string'
        ? getIntValue('refund') === 1
        : !!data.refund

    const msg: InstantiateMsg =
      tokenMode == TokenMode.Create
        ? makeDaoInstantiateWithNewTokenMessage(
            data.label,
            data.description,
            data.tokenName,
            data.tokenSymbol,
            owners,
            convertDenomToMicroDenom(data.daoInitialBalance),
            threshold / 100, // Conversion to decimal percentage
            maxVotingPeriod,
            unstakingDuration,
            getIntValue('deposit') || 0,
            refund
          )
        : makeDaoInstantiateWithExistingTokenMessage(
            data.label,
            data.description,
            data.existingTokenAddress,
            threshold / 100, // Conversion to decimal percentage
            maxVotingPeriod,
            unstakingDuration,
            getIntValue('deposit') || 0,
            refund
          )

    console.log('instantiating DAO with message:')
    console.log(msg)

    if (!signingClient) {
      setLoading(false)
      setError('Please try reconnecting your wallet.')
      return
    }

    signingClient
      .instantiate(
        walletAddress,
        DAO_CODE_ID,
        msg,
        data.label,
        defaultExecuteFee
      )
      .then((response: InstantiateResult) => {
        setLoading(false)
        if (response.contractAddress.length > 0) {
          router.push(`/dao/${encodeURIComponent(response.contractAddress)}`)
        }

        successNotify('New DAO Created')
      })
      .catch((err: any) => {
        setLoading(false)
        setError(err.message)
        console.log(err.message)
      })
  }

  const complete = contractAddress.length > 0

  function AddressErrorRow({ idx }: { idx: number }) {
    const addressName = `address_${idx}`
    const weightName = `weight_${idx}`
    const addressErrorMessage =
      fieldErrorMessage(addressName, 'Valid wallet address required') || ''
    const weightErrorMessage =
      fieldErrorMessage(weightName, 'Weight must be non-zero') || ''
    return (
      <tr>
        <td className="pr-2 pb-2">
          <div className="label-text text-error flex-1 text-right">
            {addressErrorMessage}
          </div>
        </td>
        <td className="pb-2">
          <div className="label-text text-error flex-1 text-right">
            {weightErrorMessage}
          </div>
        </td>
      </tr>
    )
  }

  function AddressRow({ idx, readOnly }: { idx: number; readOnly: boolean }) {
    const addressName = `address_${idx}`
    const weightName = `weight_${idx}`
    return (
      <tr>
        <td className="pr-2 pb-2">
          <InputField
            fieldName={addressName}
            placeholder="wallet address..."
            size={45}
            readOnly={readOnly}
            showErrorMessage={false}
            validate={isValidAddress}
            register={register}
            fieldErrorMessage={fieldErrorMessage}
          />
        </td>
        <td className="pb-2">
          <InputField
            fieldName={weightName}
            size={45}
            readOnly={readOnly}
            type="number"
            defaultValue="1"
            showErrorMessage={false}
            register={register}
            fieldErrorMessage={fieldErrorMessage}
          />
        </td>
        {idx > 0 && (
          <td className="p-2.5">
            <button
              className="btn btn-outline btn-circle btn-xs mb-1.5"
              onClick={(e) => {
                e.preventDefault()
                setCount(count - 1)
              }}
            >
              <XIcon className="inline-block w-4 h-4 stroke-current" />
            </button>
          </td>
        )}
      </tr>
    )
  }

  const addressRows: ReactElement[] = []
  for (let index = 0; index < count; index++) {
    addressRows.push(<AddressErrorRow key={`${index}_err_row`} idx={index} />)
    addressRows.push(<AddressRow key={index} idx={index} readOnly={complete} />)
  }
  return (
    <WalletLoader>
      <div className="text-left container max-w-lg p-6">
        <h1 className="text-3xl font-semibold">New DAO</h1>
        <form
          className="container mx-auto max-w-lg mb-8"
          onSubmit={handleSubmit<DaoCreateData>(onSubmit)}
        >
          <h2 className="mt-10 mb-6 text-lg">
            <PaperClipIcon className="inline w-5 h-5 mr-2 mb-1" />
            Basic config
          </h2>
          <div className="px-3">
            <InputField
              fieldName="label"
              label="Name"
              toolTip="Name the DAO"
              errorMessage="DAO name required"
              readOnly={complete}
              register={register}
              fieldErrorMessage={fieldErrorMessage}
            />
            <InputField
              fieldName="description"
              label="Description"
              toolTip="Your DAO description"
              errorMessage="DAO description required"
              readOnly={complete}
              register={register}
              fieldErrorMessage={fieldErrorMessage}
            />
          </div>

          <div className="tabs mt-8">
            <button
              className={
                'tab tab-lifted tab-lg' +
                (tokenMode == TokenMode.Create ? ' tab-active' : '')
              }
              onClick={() => setTokenMode(TokenMode.Create)}
              type="button"
            >
              Create new token
            </button>
            <button
              className={
                'tab tab-lifted tab-lg' +
                (tokenMode == TokenMode.UseExisting ? ' tab-active' : '')
              }
              onClick={() => setTokenMode(TokenMode.UseExisting)}
              type="button"
            >
              Use existing token
            </button>
            <div className="flex-1 cursor-default tab tab-lifted"></div>
          </div>

          <div className="border-r border-b border-l border-solid p-3 border-base-300 rounded-b-lg">
            {tokenMode == TokenMode.Create ? (
              <>
                <InputField
                  fieldName="tokenName"
                  label="Token Name"
                  toolTip="The full name of your token. 3-50 characters."
                  errorMessage="Valid token name required"
                  readOnly={complete}
                  register={register}
                  fieldErrorMessage={fieldErrorMessage}
                  validate={isValidName}
                />
                <InputField
                  fieldName="tokenSymbol"
                  label="Token Symbol"
                  toolTip="The short symbol name of your token. 3-12 non-numeric characters or dashes."
                  errorMessage="Valid token symbol required"
                  readOnly={complete}
                  register={register}
                  fieldErrorMessage={fieldErrorMessage}
                  validate={isValidTicker}
                />

                <h2 className="mt-8 mb-4 text-lg">Token distribution</h2>

                <InputField
                  label="DAO Initial Balance"
                  toolTip="The number of governance tokens the DAO should be initialized with."
                  fieldName="daoInitialBalance"
                  readOnly={complete}
                  type="number"
                  defaultValue="0"
                  register={register}
                  fieldErrorMessage={fieldErrorMessage}
                />

                <table className="w-full mb-4 mt-6">
                  <thead>
                    <tr>
                      <th className="text-left">
                        Address{' '}
                        <HelpTooltip
                          text={'Wallet address to receive initial tokens'}
                        />
                      </th>
                      <th className="text-left">
                        Amount{' '}
                        <HelpTooltip
                          text={'Initial tokens minted for this address'}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {addressRows}
                    <tr>
                      <td colSpan={2} className="text-right">
                        <button
                          className="btn btn-outline btn-primary btn-sm text-md"
                          onClick={(e) => {
                            e.preventDefault()
                            setCount(count + 1)
                          }}
                        >
                          + Add another
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : (
              <InputField
                label="Existing Token Address"
                toolTip="The address of the cw20 token that you would like to govern your DAO with."
                fieldName="existingTokenAddress"
                placeholder="token address"
                errorMessage="Valid token address required"
                readOnly={complete}
                validate={isValidAddress}
                register={register}
                fieldErrorMessage={fieldErrorMessage}
              />
            )}
          </div>

          <h2 className="my-8 text-lg">
            <ClipboardListIcon className="inline w-5 h-5 mr-2 mb-1" />
            Voting Config
          </h2>
          <div className="grid grid-cols-2 gap-x-4 mb-8 px-3">
            <InputField
              fieldName="threshold"
              label="Passing Threshold (%)"
              toolTip="The percentage of tokens that must vote yes for a proposal to pass"
              type="number"
              readOnly={complete}
              defaultValue={75}
              min={1}
              max={100}
              register={register}
              fieldErrorMessage={fieldErrorMessage}
            />
            <div>
              <InputField
                fieldName="duration"
                label="Voting Duration (seconds)"
                toolTip="The time during which a proposal is open for voting. Proposals expire after this period passes"
                type="number"
                placeholder="duration in seconds"
                readOnly={complete}
                defaultValue={DEFAULT_MAX_VOTING_PERIOD_SECONDS}
                min={1}
                max={2147483647}
                register={register}
                fieldErrorMessage={fieldErrorMessage}
                onChange={(e) =>
                  setVotingPeriodSeconds(parseInt(e.target?.value).toString())
                }
              />
              <div
                style={{
                  textAlign: 'end',
                  padding: '5px 0 0 17px',
                  fontSize: ' 12px',
                  color: 'grey',
                }}
              >
                {secondsToHms(votingPeriodSeconds)}
              </div>
            </div>
            <InputField
              fieldName="deposit"
              label="Proposal Deposit"
              toolTip="The number of tokens that must be deposited to create a proposal"
              type="number"
              readOnly={complete}
              required={false}
              defaultValue={0}
              min={0}
              register={register}
              fieldErrorMessage={fieldErrorMessage}
            />
            <div>
              <InputField
                fieldName="unstakingDuration"
                label="Unstaking Duration (seconds)"
                toolTip="The amount of time that unstaking governance tokens takes in seconds"
                type="number"
                placeholder="duration in seconds"
                readOnly={complete}
                defaultValue={DEFAULT_UNSTAKING_DURATION_SECONDS}
                min={0}
                register={register}
                fieldErrorMessage={fieldErrorMessage}
                onChange={(e) =>
                  setUnstakingDurationSeconds(
                    parseInt(e.target?.value).toString()
                  )
                }
              />
              <div
                style={{
                  textAlign: 'end',
                  padding: '5px 0 0 17px',
                  fontSize: ' 12px',
                  color: 'grey',
                }}
              >
                {secondsToHms(unstakingDurationSeconds)}
              </div>
            </div>
            <InputField
              fieldName="refund"
              label="Refund Proposal Deposits"
              toolTip="Refund deposits if proposal fails"
              type="checkbox"
              defaultValue={1}
              readOnly={complete}
              required={false}
              register={register}
              fieldErrorMessage={fieldErrorMessage}
            />
          </div>
          {!complete && (
            <button
              className={`mt-3 btn btn-primary btn-md font-semibold normal-case hover:text-base-100 text-lg w-full ${
                loading ? 'loading' : ''
              }`}
              style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
              type="submit"
              disabled={loading}
            >
              Create DAO
            </button>
          )}
        </form>
      </div>
    </WalletLoader>
  )
}

export default CreateDao
