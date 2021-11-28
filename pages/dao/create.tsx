import React, { FormEvent, useEffect, useState } from 'react'
import { InstantiateResult } from '@cosmjs/cosmwasm-stargate'
import LineAlert from 'components/LineAlert'
import { useForm } from 'react-hook-form'
import WalletLoader from 'components/WalletLoader'
import HelpTooltip from 'components/HelpTooltip'
import { useSigningClient } from 'contexts/cosmwasm'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { DAO_CODE_ID } from 'util/constants'
import { defaultExecuteFee } from 'util/fee'
import { errorNotify, successNotify } from 'util/toast'
import { InstantiateMsg } from 'types/contracts/dao-contracts/cw-dao'
import { makeDaoInstantiateMessage } from 'util/messagehelpers'

const THRESHOLD_GRANULARITY = 1000

function AddressRow({
  idx,
  readOnly,
  register,
  fieldError,
}: {
  idx: number
  readOnly: boolean
  register: any
  fieldError: any
}) {
  const addressName = `address_${idx}`
  const weightName = `weight_${idx}`
  return (
    <tr key={idx}>
      <td className="pr-2 pb-2">
        <input
          className="block box-border m-0 w-full rounded input input-bordered focus:input-primary font-mono"
          type="text"
          {...register(addressName, { required: true })}
          placeholder="wallet address..."
          size={45}
          readOnly={readOnly}
        />
        {fieldError(addressName, 'Address Required')}
      </td>
      <td className="pb-2">
        <input
          type="number"
          className="block box-border m-0 w-full rounded input input-bordered focus:input-primary font-mono"
          {...register(weightName, { required: true })}
          defaultValue="1"
          min={1}
          max={999}
          readOnly={readOnly}
        />
        {fieldError(weightName, 'Weight must be non-zero')}
      </td>
    </tr>
  )
}

interface FormElements extends HTMLFormControlsCollection {
  duration: HTMLInputElement
  threshold: HTMLInputElement
  label: HTMLInputElement
  [key: string]: any
}

interface DaoFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

interface DaoCreateData {
  deposit: string
  description: string
  duration: string
  label: string
  refund: boolean
  threshold: string
  'token-name': string
  'token-symbol': string
  [key: string]: string | boolean
}

const CreateDao: NextPage = () => {
  const router = useRouter()
  const { walletAddress, signingClient } = useSigningClient()
  const [count, setCount] = useState(2)
  const [contractAddress, setContractAddress] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [refund, setRefund] = useState(true)
  const [proposalDepositAmount, setProposalDepositAmount] = useState(0)
  const [threshold, setThreshold] = useState(THRESHOLD_GRANULARITY)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (error) errorNotify(error)
  }, [error])

  function fieldError(fieldName: string, msg?: string) {
    const err = errors[fieldName]
    if (err) {
      if (!msg) {
        if (err.type === 'required') {
          msg = `"${fieldName}" is required`
        } else {
          msg = `bad input for ${fieldName} (${err.type})`
        }
      }
      return <LineAlert variant="error" msg={msg} />
    }
    return null
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
      amount: getIndexedValue('weight', index),
    }))
    const threshold = parseInt(getStringValue('threshold') || '0', 10)
    const maxVotingPeriod = {
      height: getIntValue('duration'),
    }

    const msg: InstantiateMsg = makeDaoInstantiateMessage(
      name,
      description,
      tokenName,
      tokenSymbol,
      owners,
      threshold / THRESHOLD_GRANULARITY,
      maxVotingPeriod,
      proposalDepositAmount
    )

    // Shouldn't the wallet component take care of this?
    if (!signingClient) {
      setLoading(false)
      setError('Please try reconnecting your wallet.')
      return
    }

    signingClient
      .instantiate(walletAddress, DAO_CODE_ID, msg, name, defaultExecuteFee)
      .then((response: InstantiateResult) => {
        setLoading(false)
        if (response.contractAddress.length > 0) {
          router.push(`/dao/${encodeURIComponent(response.contractAddress)}`)
        }

        successNotify('Successfully added')
      })
      .catch((err: any) => {
        setLoading(false)
        console.log('err', err)
        setError(err.message)
      })
  }

  const complete = contractAddress.length > 0

  return (
    <WalletLoader>
      <div className="text-left container mx-auto max-w-lg">
        <h1 className="text-5xl font-bold my-8">New DAO</h1>
        <form
          className="container mx-auto max-w-lg mb-8"
          onSubmit={handleSubmit<DaoCreateData>(onSubmit)}
        >
          <h2 className="mt-10 mb-6 text-2xl">Basic Config</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Name</span>
            </label>
            <input
              className="block box-border m-0 w-full rounded input input-bordered focus:input-primary"
              type="text"
              placeholder="Name"
              readOnly={complete}
              value={name}
              {...register('label', { required: true })}
              onChange={(e) => setName(e.target.value)}
            />
            {fieldError('label', 'DAO name required')}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Description</span>
            </label>
            <textarea
              className="textarea h-24 textarea-bordered"
              {...register('description', { required: true })}
              placeholder="Your DAO description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {fieldError('description', 'DAO description required')}
          </div>

          <h2 className="mt-8 mb-6 text-2xl">Governance Token Config</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Token Name</span>
            </label>
            <input
              className="block box-border m-0 w-full rounded  input input-bordered focus:input-primary"
              {...register('token-name', { required: true })}
              type="text"
              placeholder="Token name"
              readOnly={complete}
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
            />
            {fieldError('token-name', 'Token name required')}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Symbol</span>
              </label>
              <input
                className="block box-border m-0 w-full rounded  input input-bordered focus:input-primary"
                {...register('token-symbol', { required: true })}
                type="text"
                placeholder="Token symbol"
                readOnly={complete}
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
              />
              {fieldError('token-symbol', 'Token symbol required')}
            </div>
          </div>
          <h2 className="mt-8 mb-6 text-xl">Token Distribution</h2>

          <table className="w-full mb-8">
            <thead>
              <tr>
                <th className="text-left">Address</th>
                <th className="text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(count)].map((_item, index) => (
                <AddressRow
                  key={index}
                  idx={index}
                  readOnly={complete}
                  register={register}
                  fieldError={fieldError}
                />
              ))}
              <tr>
                <td colSpan={2} className="text-right">
                  <button
                    className="btn btn-outline btn-primary btn-md text-md"
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

          <h2 className="my-8 text-2xl">Voting Config</h2>
          <table className="w-full my-4">
            <thead>
              <tr>
                <th className="text-left w-65">
                  <span className="w-60 inline-block">
                    Threshold{' '}
                    {((threshold / THRESHOLD_GRANULARITY) * 100).toFixed(2)}%
                  </span>
                  <HelpTooltip text="The percentage of tokens that must vote yes for a proposal to pass" />
                </th>
                <th className="text-left box-border px-2 text-sm">
                  Max Voting Period (seconds)
                  <HelpTooltip text="The time during which a proposal is open for voting. Proposals expire after this period passes" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    className="block box-border m-0 w-full rounded input input-bordered focus:input-primary"
                    {...register('threshold')}
                    type="range"
                    min={0}
                    max={THRESHOLD_GRANULARITY}
                    onChange={(e) =>
                      setThreshold(parseInt(e.target?.value ?? '0', 10))
                    }
                    defaultValue={threshold}
                    readOnly={complete}
                  />
                </td>
                <td className="box-border px-2">
                  <input
                    className="block box-border m-0 w-full rounded input input-bordered focus:input-primary"
                    {...register('duration')}
                    type="number"
                    placeholder="duration in seconds"
                    min={1}
                    max={2147483647}
                    defaultValue={604800}
                    readOnly={complete}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">
                Proposal Deposit
                <HelpTooltip text="The number of tokens that must be deposited to create a proposal" />
              </span>
            </label>
            <input
              className="block box-border m-0 w-full rounded  input input-bordered focus:input-primary"
              {...register('deposit')}
              type="number"
              onChange={(e) =>
                setProposalDepositAmount(parseInt(e.target.value ?? '0', 10))
              }
              value={proposalDepositAmount}
              readOnly={complete}
            />
          </div>

          <div className="p-6 card bordered">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Refund Proposal Deposits</span>
                <input
                  type="checkbox"
                  checked={refund}
                  className="toggle"
                  {...register('refund')}
                  onChange={(e) => setRefund(e.target.value === 'true')}
                />
              </label>
            </div>
          </div>

          {!complete && (
            <button
              className={`btn btn-primary btn-lg font-semibold hover:text-base-100 text-2xl w-full ${
                loading ? 'loading' : ''
              }`}
              style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
              type="submit"
              disabled={loading}
            >
              Create Dao
            </button>
          )}
        </form>
      </div>
    </WalletLoader>
  )
}

export default CreateDao
