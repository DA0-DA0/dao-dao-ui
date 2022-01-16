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
import { useRecoilState, useRecoilValue } from 'recoil'
import { sigsSelector, MultisigListType } from 'selectors/multisigs'
import { ContractCard, MysteryContractCard } from 'components/ContractCard'
import { pinnedMultisigsAtom } from 'atoms/pinned'

export function MultisigCard({
  multisig,
  address,
}: {
  multisig: MultisigListType
  address: string
}) {
  const [pinnedSigs, setPinnedSigs] = useRecoilState(pinnedMultisigsAtom)
  const pinned = pinnedSigs.includes(address)

  return (
    <ContractCard
      name={multisig.name}
      description={multisig.description}
      href={`/multisig/${address}`}
      weight={multisig.weight}
      pinned={pinned}
      onPin={() => {
        if (pinned) {
          setPinnedSigs((p) => p.filter((a) => a !== address))
        } else {
          setPinnedSigs((p) => p.concat([address]))
        }
      }}
    />
  )
}

export function MysteryMultisigCard() {
  return (
    <MysteryContractCard
      title="Create a multisig"
      body="You are not a member of any multisigs. Why not create one?"
      href="/multisig/create"
    />
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
              {memberSigs.length != 1 && 's'}
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
