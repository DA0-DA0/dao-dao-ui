import React, {
  ChangeEventHandler,
  ReactElement,
  useEffect,
  useState,
} from 'react'
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
  tokenName: string
  tokenSymbol: string
  proposalDepositAmount: string
  [key: string]: string | boolean
}

const CreateDao: NextPage = () => {
  const router = useRouter()
  const { walletAddress, signingClient } = useSigningClient()
  const [count, setCount] = useState(2)
  const [contractAddress, setContractAddress] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // const [name, setName] = useState('')
  // const [description, setDescription] = useState('')
  // const [tokenName, setTokenName] = useState('')
  // const [tokenSymbol, setTokenSymbol] = useState('')
  const [refund, setRefund] = useState(true)
  // const [proposalDepositAmount, setProposalDepositAmount] = useState(0)
  const [threshold, setThreshold] = useState(THRESHOLD_GRANULARITY)
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
    const threshold = parseInt(getStringValue('threshold') || '0', 10)
    const maxVotingPeriod = {
      height: getIntValue('duration'),
    }

    const msg: InstantiateMsg = makeDaoInstantiateMessage(
      data.label,
      data.description,
      data.tokenName,
      data.tokenSymbol,
      owners,
      threshold / THRESHOLD_GRANULARITY,
      {
        time: parseInt(data.duration ?? '0', 10),
      },
      data.proposalDepositAmount
    )

    // Shouldn't the wallet component take care of this?
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
        console.log('err', err)
        setError(err.message)
      })
  }

  const complete = contractAddress.length > 0

  const InputField = ({
    fieldName,
    checked,
    label,
    toolTip,
    type,
    placeholder,
    readOnly,
    value,
    errorMessage,
    onChange,
    size,
    defaultValue,
    required,
    min,
    max,
    showErrorMessage,
  }: {
    fieldName: string
    checked?: boolean
    label?: string
    toolTip?: string
    type?: string
    placeholder?: string
    readOnly?: boolean
    value?: string | number
    errorMessage?: string
    size?: number
    defaultValue?: string | number
    required?: boolean
    min?: number
    max?: number
    showErrorMessage?: boolean
    onChange?: ChangeEventHandler<HTMLInputElement>
  }) => {
    let options = undefined
    if (typeof required === 'undefined') {
      required = true
    }
    if (required) {
      options = { required }
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
    let inputComponent
    if (type === 'checkbox') {      
      inputComponent = (
        <input
          {...register(fieldName, options)}
          checked={true}
          className="toggle"
          type={type}
          readOnly={readOnly}
          onChange={(e) => {
            console.log(
              `onChange called ${e?.target?.value}/ checked: ${e.target.checked}`
            )
            console.dir(e)
            if (onChange) {
              onChange(e)
            }
          }}
        />
      )
    } else {
      inputComponent = (
        <input
          {...register(fieldName, options)}
          className={
            errorText
              ? `block box-border m-0 w-full rounded input input-bordered focus:input-primary input-error`
              : `block box-border m-0 w-full rounded input input-bordered focus:input-primary`
          }
          defaultValue={defaultValue}
          type={type || 'text'}
          placeholder={placeholder || label}
          readOnly={readOnly}
          onChange={(e) => {
            console.log(
              `onChange called ${e?.target?.value}/ checked: ${e.target.checked}`
            )
            console.dir(e)
            if (onChange) {
              onChange(e)
            }
          }}
          size={size}
          min={min}
          max={max}
        />
      )
    }
    return <div className="form-control">{labelComponent}{inputComponent}</div>
  }

  function AddressErrorRow({ idx }: { idx: number }) {
    const addressName = `address_${idx}`
    const weightName = `weight_${idx}`
    const addressErrorMessage =
      fieldErrorMessage(addressName, 'Address Required') || ''
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
                <th className="text-left">Address</th>
                <th className="text-left">Amount</th>
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
          />

          <InputField
            fieldName="refund"
            label="Refund Proposal Deposits"
            toolTip="Whether deposits are refunded after proposal voting"
            type="checkbox"
            defaultValue={1}
            //onChange={(e) => setRefund(!refund)}
            readOnly={complete}
          />

          {/* <div className="p-6 card bordered">
            <div className="form-control">
              <label className="cursor-pointer label" htmlFor="refund">
                <span className="label-text">Refund Proposal Deposits</span>
              </label>
              <input
                type="checkbox"
                className="toggle"
                {...register('refund')}
              />
              <HelpTooltip
                text={'Whether deposits are refunded after proposal voting'}
              />
            </div>
          </div> */}

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
