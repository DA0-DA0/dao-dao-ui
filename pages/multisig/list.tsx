import React, { FunctionComponent } from 'react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import WalletLoader from 'components/WalletLoader'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useMultisigsList } from 'hooks/multisig'
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
  const { multisigs, loading } = useMultisigsList(MULTISIG_CODE_ID)
  return (
    <WalletLoader loading={loading}>
      <h1 className="text-6xl font-bold">Multisigs</h1>
      {multisigs.length > 0 ? (
        multisigs.map((multisig, key) => (
          <MultisigListComponent
            address={multisig?.address}
            label={multisig?.label}
            key={key}
          />
        ))
      ) : (
        <>
          <p className="text-xl my-8">No multisigs found.</p>
          <Link href="/multisig/create" passHref>
            <button className="btn btn-primary btn-lg font-semibold hover:text-base-100 text-2xl">
              Create Multisig
            </button>
          </Link>
        </>
      )}
    </WalletLoader>
  )
}

export default MultisigList
