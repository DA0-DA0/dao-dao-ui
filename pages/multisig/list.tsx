import {
  LibraryIcon,
  PlusIcon,
  ScaleIcon,
  SparklesIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/outline'
import React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { Logo } from 'components/Logo'
import { useRecoilValue } from 'recoil'
import { sigsSelector, MultisigListType } from 'selectors/multisigs'

function MultisigCard({
  multisig,
  address,
}: {
  multisig: MultisigListType
  address: string
}) {
  return (
    <Link href={`/multisig/${address}`}>
      <a>
        <div className="shadow hover:shadow-sm p-6 rounded-lg flex flex-col items-center w-60 h-72 m-2 bg-gradient-to-b from-base-300 to-base-200 justify-between">
          <div className="flex flex-col items-center">
            <div className="mt-6">
              <Logo height={70} width={70} alt={multisig.name} />
            </div>
            <h3 className="text-lg font-semibold mt-3">{multisig.name}</h3>
            <p className="text-secondary text-sm font-mono text-center mt-1 break-words">
              {multisig.description}
            </p>
          </div>
          {multisig.weight != 0 && (
            <p className="text-success text-sm mt-3">
              <ScaleIcon className="inline w-5 h-5 mr-2 mb-1" />
              {multisig.weight} vote{multisig.weight > 1 && 's'}
            </p>
          )}
        </div>
      </a>
    </Link>
  )
}

function MysteryMultisigCard() {
  return (
    <Link href="/multisig/create">
      <a>
        <div className="shadow hover:shadow-sm p-6 rounded-lg flex flex-col items-center w-60 h-72 m-2 bg-gradient-to-b from-base-300 to-base-200">
          <div className="mt-6">
            <Logo height={70} width={70} alt="mystery multisig" />
          </div>
          <h3 className="text-lg font-semibold mt-3">???</h3>
          <p className="text-secondary text-sm font-mono text-center mt-1 break-words">
            not part of any multisigs - what will you build?
          </p>
        </div>
      </a>
    </Link>
  )
}

const MultisigList: NextPage = () => {
  const multisigs = useRecoilValue(sigsSelector)
  let memberSigs = []
  let nonMemberSigs = []

  for (const sig of multisigs) {
    if (sig?.member === true) {
      memberSigs.push(sig)
    } else {
      nonMemberSigs.push(sig)
    }
  }

  const totalVotes = memberSigs.reduce((p, n) => p + n.weight, 0)

  return (
    <div className="grid grid-cols-6">
      <div className="p-6 w-full col-span-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Multisigs</h1>
          <Link href="/multisig/create" passHref>
            <button className="btn btn-sm bg-primary text-primary-content normal-case text-left">
              Create a multisig <PlusIcon className="inline w-5 h-5 ml-1" />
            </button>
          </Link>
        </div>
        <div className="mt-6">
          <h2 className="text-lg mb-2">
            <UserIcon className="inline w-5 h-5 mr-2 mb-1" />
            Your multisigs
          </h2>
          <div className="flex flex-wrap">
            {memberSigs.length ? (
              memberSigs.map((sig, idx) => (
                <MultisigCard multisig={sig} address={sig.address} key={idx} />
              ))
            ) : (
              <MysteryMultisigCard />
            )}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg mb-2">
            <SparklesIcon className="inline w-5 h-5 mr-2 mb-1" />
            Community multisigs
          </h2>
          <div className="flex flex-wrap">
            {nonMemberSigs.map((sig, idx) => (
              <MultisigCard multisig={sig} address={sig.address} key={idx} />
            ))}
          </div>
        </div>
      </div>
      <div className="col-start-5 col-span-2 border-l border-base-300 p-6 min-h-screen">
        <h2 className="font-medium">Overview</h2>
        <div className="mt-6">
          <ul className="list-none ml-2 leading-relaxed">
            <li>
              <LibraryIcon className="inline w-5 h-5 mr-2 mb-1" />
              {multisigs.length} active multisig{multisigs.length > 1 && 's'}
            </li>
            <li>
              <UserGroupIcon className="inline w-5 h-5 mr-2 mb-1" />
              Part of {memberSigs.length} multisig
              {memberSigs.length > 1 && 's'}
            </li>
            <li>
              <ScaleIcon className="inline w-5 h-5 mr-2 mb-1" />
              {totalVotes} vote{totalVotes > 1 && 's'} total
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MultisigList
