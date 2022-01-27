import {
  LibraryIcon,
  PlusIcon,
  ScaleIcon,
  SparklesIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/outline'
import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import {
  ContractCard,
  MysteryContractCard,
  LoadingContractCard,
} from 'components/ContractCard'
import { pinnedMultisigsAtom } from 'atoms/pinned'
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'
import {
  MultisigListType,
  sigAddressesSelector,
  sigMemberSelector,
} from 'selectors/multisigs'
import { sidebarExpandedAtom } from 'atoms/sidebar'
import { Sidebar } from 'components/Sidebar'

interface IMembershipTotal {
  count: number
  votes: number
}

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
  const sigAddresses = useRecoilValue(sigAddressesSelector)
  const sigs = useRecoilValueLoadable(
    waitForAll(sigAddresses.map((addr) => sigMemberSelector(addr)))
  )
  const expanded = useRecoilValue(sidebarExpandedAtom)

  const [membership, setMembership] = useState<IMembershipTotal>({
    count: 0,
    votes: 0,
  })

  useEffect(() => {
    if (sigs.state != 'hasValue') {
      return
    }
    setMembership(
      sigs.contents.reduce(
        (
          { count, votes }: IMembershipTotal,
          { member, weight }: MultisigListType
        ) => ({
          count: count + (member === true ? 1 : 0),
          votes: votes + weight,
        }),
        { count: 0, votes: 0 }
      )
    )
  }, [sigs])

  const gridClassName = `grid grid-cols-${expanded ? 6 : 1}`

  return (
    <div className={gridClassName}>
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
            {sigs.state == 'hasValue' ? (
              membership.count > 0 ? (
                sigs.contents.map(
                  (sig, idx) =>
                    sig.member && (
                      <MultisigCard
                        multisig={sig}
                        address={sig.address}
                        key={idx}
                      />
                    )
                )
              ) : (
                <MysteryMultisigCard />
              )
            ) : (
              <LoadingContractCard />
            )}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg mb-2">
            <SparklesIcon className="inline w-5 h-5 mr-2 mb-1" />
            Community multisigs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {sigs.state == 'hasValue' ? (
              sigs.contents.length > 0 ? (
                sigs.contents.map(
                  (sig, idx) =>
                    !sig.member && (
                      <MultisigCard
                        multisig={sig}
                        address={sig.address}
                        key={idx}
                      />
                    )
                )
              ) : (
                <MysteryMultisigCard />
              )
            ) : (
              <LoadingContractCard />
            )}
            {sigAddresses.length === 0 && <MysteryMultisigCard />}
          </div>
        </div>
      </div>
      <Sidebar>
        <div className="col-start-5 col-span-2 border-l border-base-300 p-6 min-h-screen">
          <h2 className="font-medium">Overview</h2>
          <div className="mt-6">
            <ul className="list-none ml-2 leading-relaxed">
              <li>
                <LibraryIcon className="inline w-5 h-5 mr-2 mb-1" />
                {sigAddresses.length} active multisig
                {sigAddresses.length > 1 && 's'}
              </li>
              <li>
                <UserGroupIcon className="inline w-5 h-5 mr-2 mb-1" />
                Part of {membership.count} multisig
                {membership.count != 1 && 's'}
              </li>
              <li>
                <ScaleIcon className="inline w-5 h-5 mr-2 mb-1" />
                {membership.votes} vote{membership.votes != 1 && 's'} total
              </li>
            </ul>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}

export default MultisigList
