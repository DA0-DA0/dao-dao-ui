import React, { FormEvent, useState } from 'react'
import { InstantiateResult } from '@cosmjs/cosmwasm-stargate'
import {
  InstantiateMsg,
  Member,
} from '@dao-dao/types/contracts/cw3-flex-multisig'
import { XIcon } from '@heroicons/react/solid'
import HelpTooltip from 'components/HelpTooltip'
import LineAlert from 'components/LineAlert'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { C4_GROUP_CODE_ID, MULTISIG_CODE_ID } from 'util/constants'
import { defaultExecuteFee } from 'util/fee'

function validateNonEmpty(msg: InstantiateMsg, label: string) {
  const { threshold, max_voting_period, group } = msg
  const absoluteCount = (threshold as any)?.absolute_count
  const time = (max_voting_period as any)?.time
  if (absoluteCount === undefined || time === undefined) {
    return false
  }
  if (isNaN(absoluteCount.weight) || isNaN(time)) {
    return false
  }
  if (label.length === 0) {
    return false
  }
  const voters = (group as any)?.instantiate_new_group?.voters
  if (!voters?.length) {
    return false
  }
  if (
    voters.some(
      ({ addr, weight }: Member) => addr.length === 0 || isNaN(weight)
    )
  ) {
    return false
  }
  return true
}

interface FormElements extends HTMLFormControlsCollection {
  duration: HTMLInputElement
  threshold: HTMLInputElement
  label: HTMLInputElement
  [key: string]: any
}

interface MultisigFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const CreateMultisig: NextPage = () => {
  const router = useRouter()
  const { walletAddress, signingClient } = useSigningClient()
  const [count, setCount] = useState(2)
  const [contractAddress, setContractAddress] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = (event: FormEvent<MultisigFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    const formEl = event.currentTarget as MultisigFormElement

    const voters = [...Array(count)].map((_item, index) => ({
      addr: formEl[`address_${index}`]?.value?.trim(),
      weight: parseInt(formEl[`weight_${index}`]?.value?.trim()),
    }))
    const required_weight = parseInt(formEl.threshold.value?.trim(), 10)
    const max_voting_period = {
      time: parseInt(formEl.duration.value?.trim() ?? '0', 10),
    }

    const label = formEl.label.value.trim()
    const description = formEl.description.value.trim()

    const msg: InstantiateMsg = {
      name: label,
      description,
      group: {
        instantiate_new_group: {
          code_id: C4_GROUP_CODE_ID,
          label,
          voters,
        },
      },
      threshold: {
        absolute_count: {
          weight: required_weight,
        },
      },
      max_voting_period,
    }

    // @ebaker TODO: add more validation
    if (!validateNonEmpty(msg, label)) {
      setLoading(false)
      setError('All fields are required.')
      return
    }

    if (!signingClient) {
      setLoading(false)
      setError('Please try reconnecting your wallet.')
      return
    }

    signingClient
      .instantiate(
        walletAddress,
        MULTISIG_CODE_ID,
        msg,
        label,
        defaultExecuteFee
      )
      .then((response: InstantiateResult) => {
        setLoading(false)
        if (response.contractAddress.length > 0) {
          setContractAddress(response.contractAddress)
        }
      })
      .catch((err: any) => {
        setLoading(false)
        console.log('err', err)
        setError(err.message)
      })
  }

  const complete = contractAddress.length > 0

  function AddressRow({ idx, readOnly }: { idx: number; readOnly: boolean }) {
    return (
      <tr key={idx}>
        <td className="pr-2 pb-2">
          <input
            className="block box-border m-0 w-full rounded input input-bordered font-mono"
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
            className="block box-border m-0 w-full rounded input input-bordered font-mono"
            name={`weight_${idx}`}
            defaultValue="1"
            min={1}
            max={999}
            readOnly={readOnly}
          />
        </td>
        {idx > 1 && (
          <td className="absolute p-2.5">
            <button
              className="btn btn-outline btn-circle btn-sm"
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

  return (
    <WalletLoader>
      <div className="text-left container mx-auto max-w-lg">
        <h1 className="text-5xl font-bold mb-8">New Multisig</h1>
        <form className="container mx-auto max-w-lg mb-8" onSubmit={onSubmit}>
          <table className="w-full mb-8">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <td>
                <input
                  autoComplete="false"
                  className="block box-border m-0 w-full rounded input input-bordered "
                  name="label"
                  type="text"
                  placeholder="My multisig name"
                  readOnly={complete}
                />
              </td>
            </tbody>
          </table>
          <table className="w-full mb-8">
            <thead>
              <tr>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <td>
                <input
                  autoComplete="false"
                  className="block box-border m-0 w-full rounded input input-bordered "
                  name="description"
                  type="text"
                  placeholder="What is this multisig for?"
                  readOnly={complete}
                />
              </td>
            </tbody>
          </table>
          <table className="w-full mb-8">
            <thead>
              <tr>
                <th>Address</th>
                <th>Weight</th>
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

          <table className="w-full my-4">
            <thead>
              <tr>
                <th className="text-left">
                  Threshold
                  <HelpTooltip text="The amount of voting weight that must commit to a proposal before it's executed" />
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
                    className="block box-border m-0 w-full rounded input input-bordered"
                    name="threshold"
                    type="number"
                    defaultValue={count}
                    min={1}
                    max={999}
                    readOnly={complete}
                  />
                </td>
                <td className="box-border px-2">
                  <input
                    className="block box-border m-0 w-full rounded input input-bordered"
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
          {!complete && (
            <button
              className={`btn btn-primary btn-lg font-semibold hover:text-base-100 text-2xl w-full ${
                loading ? 'loading' : ''
              }`}
              style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
              type="submit"
              disabled={loading}
            >
              Create Multisig
            </button>
          )}
        </form>

        {error && <LineAlert variant="error" msg={error} />}

        {contractAddress !== '' && (
          <div className="text-right">
            <LineAlert variant="success" msg={`Success!`} />
            <button
              className="mt-4 box-border px-4 py-2 btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                router.push(`/multisig/${encodeURIComponent(contractAddress)}`)
              }}
            >
              View Multisig &#8599;
            </button>
          </div>
        )}
      </div>
    </WalletLoader>
  )
}

export default CreateMultisig
