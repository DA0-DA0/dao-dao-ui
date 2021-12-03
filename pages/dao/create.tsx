import { InstantiateResult } from '@cosmjs/cosmwasm-stargate'
import HelpTooltip from 'components/HelpTooltip'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, {
  ChangeEventHandler,
  ReactElement,
  useEffect,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { InstantiateMsg } from '@dao-dao/types/contracts/cw3-dao'
import { DAO_CODE_ID } from 'util/constants'
import { defaultExecuteFee } from 'util/fee'
import { isValidAddress } from 'util/isValidAddress'
import { makeDaoInstantiateMessage } from 'util/messagehelpers'
import { errorNotify, successNotify } from 'util/toast'

const THRESHOLD_GRANULARITY = 1000

interface DaoCreateData {
  deposit: string
  description: string
  duration: string
  label: string
  refund: string | boolean
  threshold: string
  tokenName: string
  tokenSymbol: string
  proposalDepositAmount: string
  [key: string]: string | boolean
}

const CreateDao: NextPage = () => {
  const router = useRouter()
  const { walletAddress, signingClient } = useSigningClient()
  const [count, setCount] = useState(2)
  const [contractAddress, _setContractAddress] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  // Default to 75% of the vote
  const [threshold, setThreshold] = useState(THRESHOLD_GRANULARITY * 0.75)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (error) errorNotify(error)
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
    const threshold = getIntValue('threshold')
    const maxVotingPeriod = {
      time: getIntValue('duration'),
    }
    const refund =
      typeof data.refund === 'string'
        ? getIntValue('refund') === 1
        : !!data.refund
    const msg: InstantiateMsg = makeDaoInstantiateMessage(
      data.label,
      data.description,
      data.tokenName,
      data.tokenSymbol,
      owners,
      threshold / THRESHOLD_GRANULARITY,
      maxVotingPeriod,
      getIntValue('proposalDepositAmount') || 0,
      refund
    )

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

        successNotify('Successfully added')
      })
      .catch((err: any) => {
        setLoading(false)
        setError(err.message)
      })
  }

  const complete = contractAddress.length > 0

  const InputField = ({
    fieldName,
    label,
    toolTip,
    type,
    placeholder,
    readOnly,
    errorMessage,
    onChange,
    size,
    defaultValue,
    required,
    min,
    max,
    showErrorMessage,
    validate,
  }: {
    fieldName: string
    label?: string
    toolTip?: string
    type?: string
    placeholder?: string
    readOnly?: boolean
    errorMessage?: string
    size?: number
    defaultValue?: string | number
    required?: boolean
    min?: number
    max?: number
    showErrorMessage?: boolean
    onChange?: ChangeEventHandler<HTMLInputElement>
    validate?: (val: string) => boolean
  }) => {
    let options = undefined
    if (typeof required === 'undefined') {
      required = true
    }
    if (required) {
      options = { required }
    }
    if (validate) {
      options = { ...options, validate }
    }
    const errorText = fieldErrorMessage(fieldName, errorMessage)
    const errorComponent =
      errorText && !(showErrorMessage === false) ? (
        <span className="label-text text-error flex-1 text-right">
          {errorText}
        </span>
      ) : null
    const tooltipComponent = toolTip ? <HelpTooltip text={toolTip} /> : null
    const labelComponent = label ? (
      <label className="label" htmlFor={fieldName}>
        <span className="label-text font-bold">{label || fieldName}</span>
        {errorComponent}
        {tooltipComponent}
      </label>
    ) : null
    const inputComponent = (
      <input
        {...register(fieldName, options)}
        className={
          type === 'checkbox'
            ? 'toggle'
            : errorText
            ? `block box-border m-0 w-full rounded input input-bordered focus:input-primary input-error`
            : `block box-border m-0 w-full rounded input input-bordered focus:input-primary`
        }
        defaultValue={defaultValue}
        defaultChecked={
          type === 'checkbox' && defaultValue === 1 ? true : undefined
        }
        type={type || 'text'}
        placeholder={placeholder || label}
        readOnly={readOnly}
        onChange={onChange}
        size={size}
        min={min}
        max={max}
      />
    )
    return (
      <div className="form-control">
        {labelComponent}
        {inputComponent}
      </div>
    )
  }

  function AddressErrorRow({ idx }: { idx: number }) {
    const addressName = `address_${idx}`
    const weightName = `weight_${idx}`
    const addressErrorMessage =
      fieldErrorMessage(addressName, 'Valid walet address required') || ''
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
          />
        </td>
        <td className="pb-2">
          <InputField
            fieldName={weightName}
            size={45}
            readOnly={readOnly}
            type="number"
            defaultValue="1"
            min={1}
            max={999}
            showErrorMessage={false}
          />
        </td>
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
      <div className="text-left container mx-auto max-w-lg">
        <h1 className="text-5xl font-bold my-8">New DAO</h1>
        <form
          className="container mx-auto max-w-lg mb-8"
          onSubmit={handleSubmit<DaoCreateData>(onSubmit)}
        >
          <h2 className="mt-10 mb-6 text-2xl">Basic Config</h2>
          <InputField
            fieldName="label"
            label="Name"
            toolTip="Name the DAO"
            errorMessage="DAO name required"
            readOnly={complete}
          />
          <InputField
            fieldName="description"
            label="Description"
            toolTip="Your DAO description"
            errorMessage="DAO description required"
            readOnly={complete}
          />

          <h2 className="mt-8 mb-6 text-2xl">Governance Token Config</h2>
          <InputField
            fieldName="tokenName"
            label="Token Name"
            toolTip="The full name of your token (My Awesome Token)"
            errorMessage="Token name required"
            readOnly={complete}
          />
          <InputField
            fieldName="tokenSymbol"
            label="Token Symbol"
            toolTip="The short symbol name of your token (MAT)"
            errorMessage="Token symbol required"
            readOnly={complete}
          />

          <h2 className="mt-8 mb-6 text-xl">Token Distribution</h2>

          <table className="w-full mb-8">
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

          <InputField
            fieldName="deposit"
            label="Proposal Deposit"
            toolTip="The number of tokens that must be deposited to create a proposal"
            type="number"
            readOnly={complete}
            required={false}
            defaultValue={0}
            min={0}
          />

          <div className="p-6 card bordered">
            <InputField
              fieldName="refund"
              label="Refund Proposal Deposits"
              toolTip="Whether deposits are refunded after proposal voting"
              type="checkbox"
              defaultValue={1}
              readOnly={complete}
              required={false}
            />
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
