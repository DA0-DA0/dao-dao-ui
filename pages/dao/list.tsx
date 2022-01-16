import {
  LibraryIcon,
  PlusIcon,
  ScaleIcon,
  SparklesIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { pinnedDaosAtom } from 'atoms/pinned'
import { ContractCard, MysteryContractCard } from 'components/ContractCard'
import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { DaoListType, daosSelector } from 'selectors/daos'
import { convertMicroDenomToDenom } from 'util/conversion'

export function DaoCard({
  dao,
  address,
  weight,
}: {
  dao: any
  address: string
  weight: number
}) {
  const [pinnedDaos, setPinnedDaos] = useRecoilState(pinnedDaosAtom)
  const pinned = pinnedDaos.includes(address)

  return (
    <ContractCard
      name={dao.name}
      description={dao.description}
      href={`/dao/${address}`}
      weight={convertMicroDenomToDenom(weight)}
      pinned={pinned}
      onPin={() => {
        if (pinned) {
          setPinnedDaos((p) => p.filter((a) => a !== address))
        } else {
          setPinnedDaos((p) => p.concat([address]))
        }
      }}
    />
  )
}

export function MysteryDaoCard() {
  return (
    <MysteryContractCard
      title="Create a DAO"
      body="You are not staking with any DAOs. Why not create one?"
      href="/dao/create"
    />
  )
}

const DaoList: NextPage = () => {
  const daos = useRecoilValue(daosSelector)
  let memberDaos: DaoListType[] = []
  let nonMemberDaos: DaoListType[] = []

  for (const dao of daos) {
    if (dao?.member === true) {
      memberDaos.push(dao)
    } else {
      nonMemberDaos.push(dao)
    }
  }

  const totalVotes = convertMicroDenomToDenom(
    memberDaos.reduce((p, n) => p + n.weight, 0)
  )

  return (
    <div className="grid grid-cols-6">
      <div className="p-6 w-full col-span-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">DAOs</h1>
          <Link href="/dao/create" passHref>
            <button className="btn btn-sm bg-primary text-primary-content normal-case text-left">
              Create a Dao <PlusIcon className="inline w-5 h-5 ml-1" />
            </button>
          </Link>
        </div>
        <div className="mt-6">
          <h2 className="text-lg mb-2">
            <UserIcon className="inline w-5 h-5 mr-2 mb-1" />
            Your DAOs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {memberDaos.length ? (
              memberDaos.map((dao, idx) => (
                <DaoCard
                  dao={dao.dao}
                  address={dao.address}
                  key={idx}
                  weight={dao.weight}
                />
              ))
            ) : (
              <MysteryDaoCard />
            )}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg mb-2">
            <SparklesIcon className="inline w-5 h-5 mr-2 mb-1" />
            Community DAOs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {nonMemberDaos.map((dao, idx) => (
              <DaoCard
                dao={dao.dao}
                address={dao.address}
                key={idx}
                weight={dao.weight}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-start-5 col-span-2 border-l border-base-300 p-6 min-h-screen">
        <h2 className="font-medium text-lg">Overview</h2>
        <div className="mt-6">
          <ul className="list-none ml-2 leading-relaxed">
            <li>
              <LibraryIcon className="inline w-5 h-5 mr-2 mb-1" />
              {daos.length} active DAOs
            </li>
            <li>
              <UserGroupIcon className="inline w-5 h-5 mr-2 mb-1" />
              Part of {memberDaos.length} DAO
              {memberDaos.length != 1 && 's'}
            </li>
            <li>
              <ScaleIcon className="inline w-5 h-5 mr-2 mb-1" />
              {totalVotes} voting weight
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DaoList
