import React, { FormEvent, useState } from 'react'
import { InstantiateResult } from '@cosmjs/cosmwasm-stargate'
import LineAlert from 'components/LineAlert'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { defaultExecuteFee } from 'util/fee'

const DAO_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_DAO_CONTRACT_CODE_ID as string
)
const CW20_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_DAO_TOKEN_CODE_ID as string
)

function AddressRow({ idx, readOnly }: { idx: number; readOnly: boolean }) {
  return (
    <tr key={idx}>
      <td className="pr-2 pb-2">
        <input
          className="block box-border m-0 w-full rounded input input-bordered focus:input-primary font-mono"
          type="text"
          name={`address_${idx}`}
          placeholder="wallet address..."
          size={45}
          readOnly={readOnly}
        />
      </td>
      <td className="pb-2">
        <input
          type="number"
          className="block box-border m-0 w-full rounded input input-bordered focus:input-primary font-mono"
          name={`weight_${idx}`}
          defaultValue="1"
          min={1}
          max={999}
          readOnly={readOnly}
        />
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

  const handleSubmit = (event: FormEvent<DaoFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    const formEl = event.currentTarget as DaoFormElement

    const owners = [...Array(count)].map((_item, index) => ({
      address: formEl[`address_${index}`]?.value?.trim(),
      amount: formEl[`weight_${index}`]?.value?.trim(),
    }))
    const threshold = formEl.threshold.value?.trim()
    const max_voting_period = {
      height: parseInt(formEl.duration.value?.trim()),
    }

    const msg = {
      name,
      description,
      gov_token: {
        instantiate_new_cw20: {
          code_id: CW20_CODE_ID,
          label: tokenName,
          msg: {
            name: tokenName,
            symbol: tokenSymbol,
            decimals: 6,
            initial_balances: owners,
          },
        },
      },
      threshold: {
        absolute_percentage: {
          percentage: threshold,
        },
      },
      max_voting_period,
      proposal_deposit_amount: '0',
    }

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
          onSubmit={handleSubmit}
        >
          <h2 className="mt-10 mb-6 text-2xl">Basic Config</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Name</span>
            </label>
            <input
              className="block box-border m-0 w-full rounded  input input-bordered focus:input-primary"
              name="label"
              type="text"
              placeholder="Name"
              readOnly={complete}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Description</span>
            </label>
            <textarea
              className="textarea h-24 textarea-bordered"
              name="description"
              placeholder="Your DAO description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <h2 className="mt-8 mb-6 text-2xl">Governance Token Config</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Token Name</span>
            </label>
            <input
              className="block box-border m-0 w-full rounded  input input-bordered focus:input-primary"
              name="token-name"
              type="text"
              placeholder="Token name"
              readOnly={complete}
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
            />
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Symbol</span>
              </label>
              <input
                className="block box-border m-0 w-full rounded  input input-bordered focus:input-primary"
                name="token-symbol"
                type="text"
                placeholder="Token symbol"
                readOnly={complete}
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
              />
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
                <AddressRow key={index} idx={index} readOnly={complete} />
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
                <th className="text-left">Threshold</th>
                <th className="text-left box-border px-2 text-sm">
                  Max Voting Period (seconds)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    className="block box-border m-0 w-full rounded input input-bordered focus:input-primary"
                    name="threshold"
                    defaultValue={count}
                    readOnly={complete}
                  />
                </td>
                <td className="box-border px-2">
                  <input
                    className="block box-border m-0 w-full rounded input input-bordered focus:input-primary"
                    name="duration"
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
              <span className="label-text font-bold">Proposal Deposit</span>
            </label>
            <input
              className="block box-border m-0 w-full rounded  input input-bordered focus:input-primary"
              name="deposit"
              type="text"
              value={0}
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

        {error && <LineAlert variant="error" msg={error} />}
      </div>
    </WalletLoader>
  )
}

export default CreateDao
