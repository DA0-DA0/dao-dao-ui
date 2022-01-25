import React, { useEffect, useState } from 'react'
import { InstantiateResult } from '@cosmjs/cosmwasm-stargate'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { MULTISIG_CODE_ID } from 'util/constants'
import { defaultExecuteFee } from 'util/fee'
import { errorNotify, successNotify } from 'util/toast'
import { cleanChainError } from 'util/cleanChainError'
import { Breadcrumbs } from 'components/Breadcrumbs'
import { useForm } from 'react-hook-form'
import { ScaleIcon, UsersIcon } from '@heroicons/react/outline'
import {
  InputErrorMessage,
  InputLabel,
  NumberInput,
  TextInput,
} from 'components/InputField'
import {
  validateAddress,
  validatePercent,
  validatePositive,
  validateRequired,
} from 'util/formValidation'
import { secondsToHms } from 'pages/dao/create'
import { makeMultisigInstantiateMessage } from 'util/messagehelpers'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { pinnedMultisigsAtom } from 'atoms/pinned'
import { walletAddress as walletAddressSelector } from 'selectors/treasury'
import { cosmWasmSigningClient } from 'selectors/cosm'

const DEFAULT_MAX_VOTING_PERIOD_SECONDS = '604800'

interface MultisigCreateData {
  name: string
  description: string

  duration: string
  threshold: string

  [key: string]: string
}

const CreateMultisig: NextPage = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [votingPeriodSeconds, setVotingPeriodSeconds] = useState(
    DEFAULT_MAX_VOTING_PERIOD_SECONDS
  )
  // The number of addresses involved in the multisig.
  const [count, setCount] = useState(1)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const walletAddress = useRecoilValue(walletAddressSelector)
  const signingClient = useRecoilValue(cosmWasmSigningClient)

  useEffect(() => {
    if (error) errorNotify(cleanChainError(error))
  }, [error])

  const setPinnedMultisigs = useSetRecoilState(pinnedMultisigsAtom)

  const onSubmit = (data: MultisigCreateData) => {
    setError('')
    setLoading(true)

    function getStringValue(key: string): string {
      const val = data[key]
      if (typeof val === 'string') {
        return val.trim()
      }
      return ''
    }
    function getIndexedValue(prefix: string, index: number): string {
      return getStringValue(`${prefix}_${index}`)
    }
    const voters = [...Array(count)].map((_item, index) => ({
      addr: getIndexedValue('address', index),
      // Convert human readable amount to micro denom amount
      weight: Number(getIndexedValue('weight', index)),
    }))

    const msg = makeMultisigInstantiateMessage(
      data.name,
      data.description,
      voters,
      Number(data.threshold),
      Number(data.duration)
    )
    console.log('instantiating multisig with message:')
    console.log(msg)

    if (!signingClient || !walletAddress) {
      setLoading(false)
      setError('Wallet not connected')
      return
    }

    signingClient
      .instantiate(
        walletAddress,
        MULTISIG_CODE_ID,
        msg,
        data.name,
        defaultExecuteFee
      )
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
      <div className="p-6 w-full col-span-4">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [router.asPath, 'Create multisig'],
          ]}
        />
        <form
          className="mb-8"
          onSubmit={handleSubmit<MultisigCreateData>(onSubmit)}
        >
          <h2 className="pl-4 mt-10 text-lg">Name and description</h2>
          <div className="px-3">
            <div className="form-control">
              <InputLabel name="Name" />
              <TextInput
                label="name"
                register={register}
                error={errors.name}
                validation={[validateRequired]}
              />
              <InputErrorMessage error={errors.name} />
            </div>

            <div className="form-control">
              <InputLabel name="Description" />
              <TextInput
                label="description"
                register={register}
                error={errors.description}
                validation={[validateRequired]}
              />
              <InputErrorMessage error={errors.description} />
            </div>
          </div>

          <h2 className="mb-2 text-lg mt-8">
            <UsersIcon className="inline w-5 h-5 mr-2 mb-1" />
            Members
          </h2>

          <div className="px-3">
            <div className="grid grid-cols-3 gap-2 mt-3">
              <h3 className="label-text col-span-2 text-secondary">Address</h3>
              <h3 className="label-text text-secondary">Weight</h3>
            </div>
            <ul className="list-none">
              {[...Array(count).keys()].map((idx) => {
                // These labels are later used in conjunction
                // with `count` to extract the input addresses
                // and weights.
                const addressLabel = `address_${idx}`
                const weightLabel = `weight_${idx}`

                return (
                  <li key={idx} className="grid grid-cols-3 gap-2 my-2">
                    <div className="form-control col-span-2">
                      <TextInput
                        label={addressLabel}
                        register={register}
                        error={errors[addressLabel]}
                        validation={[validateAddress, validateRequired]}
                      />
                      <InputErrorMessage error={errors[addressLabel]} />
                    </div>
                    <div className="form-control">
                      <NumberInput
                        label={weightLabel}
                        register={register}
                        error={errors[weightLabel]}
                        validation={[validateRequired, validatePositive]}
                        defaultValue="1"
                      />
                      <InputErrorMessage error={errors[weightLabel]} />
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="btn-group">
              <button
                className="btn btn-outline btn-sm text-md normal-case"
                onClick={(e) => {
                  e.preventDefault()
                  setCount(count + 1)
                }}
              >
                +
              </button>
              <button
                className={
                  'btn btn-outline btn-primary btn-sm text-md normal-case' +
                  (count <= 1 ? ' btn-disabled btn-secondary' : '')
                }
                onClick={(e) => {
                  e.preventDefault()
                  setCount(count - 1)
                }}
              >
                -
              </button>
            </div>
          </div>

          <h2 className="mt-8 text-lg">
            <ScaleIcon className="inline w-5 h-5 mr-2 mb-1" />
            Voting configuration
          </h2>
          <div className="grid grid-cols-2 gap-x-3 mb-8 px-3 mt-1">
            <div className="form-control">
              <InputLabel name="Passing Threshold" />
              <NumberInput
                label="threshold"
                register={register}
                error={errors.threshold}
                validation={[validateRequired, validatePercent]}
                defaultValue="1"
              />
              <InputErrorMessage error={errors.threshold} />
            </div>

            <div className="form-control">
              <InputLabel name="Voting Duration (seconds)" />
              <NumberInput
                label="duration"
                register={register}
                error={errors.duration}
                validation={[validateRequired, validatePositive]}
                onChange={(e) => setVotingPeriodSeconds(e?.target?.value)}
                defaultValue={DEFAULT_MAX_VOTING_PERIOD_SECONDS}
              />
              <InputErrorMessage error={errors.duration} />
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
          </div>

          <button
            className={`mt-3 w-48 btn btn-primary btn-md font-semibold normal-case hover:text-base-100 text-lg ${
              loading ? 'loading' : ''
            }`}
            style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            type="submit"
            disabled={loading}
          >
            Create multisig
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateMultisig
