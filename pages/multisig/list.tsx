import React, { FunctionComponent, useEffect, useState } from 'react'
import { Contract } from '@cosmjs/cosmwasm-stargate'
import { ChevronRightIcon } from '@heroicons/react/solid'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import type { NextPage } from 'next'
import Link from 'next/link'
import { MULTISIG_CODE_ID } from 'util/constants'

interface MultisigListType {
  address: String
  label: String
}

const MultisigListComponent: FunctionComponent<MultisigListType> = ({
  address,
  label,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 max-w-full sm:w-full">
      <Link href={`/multisig/${address}`} passHref>
        <a className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
          <h3 className="text-2xl font-bold">
            {label}{' '}
            <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
          </h3>
        </a>
      </Link>
    </div>
  )
}

const MultisigList: NextPage = () => {
  const [multisigs, setMultisigs] = useState<Array<Contract>>([])
  const { signingClient } = useSigningClient()
  const [loading, setLoading] = useState(false)

  // Get list of MULTISIG info
  useEffect(() => {
    const getMultisigs = async () => {
      setLoading(true)
      try {
        let contracts = await signingClient?.getContracts(MULTISIG_CODE_ID)

        let multisigList: Array<Contract> = []
        if (contracts) {
          for (let address of contracts) {
            signingClient?.getContract(address).then((response) => {
              multisigList.push(response)
            })
          }
          if (multisigList.length > 0) {
            setMultisigs(multisigList)
          }
          setLoading(false)
        }
      } catch (e) {
        // Handles the edge case where there are no contracts at
        // all and the API throws.
        setLoading(false)
        return []
      }
    }
    getMultisigs()
  }, [signingClient])

  return (
    <WalletLoader loading={loading}>
      <h1 className="text-6xl font-bold">MULTISIGs</h1>
      {multisigs.length > 0 ? (
        multisigs.map((multisig, key) => (
          <MultisigListComponent
            address={multisig?.address}
            label={multisig?.label}
            key={key}
          />
        ))
      ) : (
        <p>No MULTISIGs : (</p>
      )}
    </WalletLoader>
  )
}

export default MultisigList
