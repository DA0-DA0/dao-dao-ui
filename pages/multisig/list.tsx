import React, { FunctionComponent, useEffect, useState } from 'react'
import { Contract } from '@cosmjs/cosmwasm-stargate'
import { ChevronRightIcon } from '@heroicons/react/solid'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MULTISIG_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_FIXED_MULTISIG_CODE_ID as string
)

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
  let [multisigs, setMultisigs] = useState<Array<Contract>>([])
  let { signingClient } = useSigningClient()

  // Get list of MULTISIG info
  useEffect(() => {
    let getMultisigs = async () => {
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
      }
    }
    getMultisigs()
  }, [signingClient])

  return (
    <WalletLoader>
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
