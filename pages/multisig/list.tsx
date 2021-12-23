import React, { FunctionComponent } from 'react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import WalletLoader from 'components/WalletLoader'
import type { NextPage } from 'next'
import Link from 'next/link'
import { MultisigListType, useMultisigsList } from 'hooks/multisig'
import { MULTISIG_CODE_ID } from 'util/constants'
import LinkCard from 'components/LinkCard'
import { CheckIcon } from '@heroicons/react/outline'

const MultisigListComponent: FunctionComponent<MultisigListType> = ({
  address,
  label,
  member,
}) => {
  return (
    <LinkCard href={`/multisig/${address}`}>
      <h3 className="text-2xl font-bold">
        {label}{' '}
        <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
      </h3>
      {member ? (
        <p className="mt-4 text-success">
          <CheckIcon className="h-4 w-4 mb-1 mr-1 inline" />
          <i> You are a member</i>
        </p>
      ) : null}
    </LinkCard>
  )
}

const MultisigList: NextPage = () => {
  const { multisigs, loading } = useMultisigsList(MULTISIG_CODE_ID)
  let memberSigs = []
  let nonMemberSigs = []

  for (const sig of multisigs) {
    if (sig?.member === true) {
      memberSigs.push(sig)
    } else {
      nonMemberSigs.push(sig)
    }
  }

  return (
    <WalletLoader loading={loading}>
      <h1 className="text-6xl font-bold">Multisigs</h1>
      <h2 className="text-3xl font-bold mt-8 text-left max-w-sm w-full -mb-3">
        Personal Multisigs
      </h2>
      {memberSigs.length > 0 ? (
        memberSigs.map((sig, key) => (
          <MultisigListComponent
            address={sig?.address}
            label={sig?.label}
            member={sig?.member}
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
      {nonMemberSigs.length > 0
        ? nonMemberSigs.map((multisig, key) => (
            <MultisigListComponent
              address={multisig?.address}
              label={multisig?.label}
              member={multisig?.member}
              key={key}
            />
          ))
        : null}
    </WalletLoader>
  )
}

export default MultisigList
