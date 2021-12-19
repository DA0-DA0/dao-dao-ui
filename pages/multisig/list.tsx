import React, { FunctionComponent } from 'react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import WalletLoader from 'components/WalletLoader'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useMultisigsList } from 'hooks/multisig'
import { MULTISIG_CODE_ID } from 'util/constants'
import LinkCard from 'components/LinkCard'

interface MultisigListType {
  address: String
  label: String
}

const MultisigListComponent: FunctionComponent<MultisigListType> = ({
  address,
  label,
}) => {
  return (
    <LinkCard href={`/multisig/${address}`}>
      <h3 className="text-2xl font-bold">
        {label}{' '}
        <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
      </h3>
    </LinkCard>
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
