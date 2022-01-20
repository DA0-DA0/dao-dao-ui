import {
  LibraryIcon,
  PlusIcon,
  ScaleIcon,
  SparklesIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { pinnedDaosAtom } from 'atoms/pinned'
import {
  ContractCard,
  MysteryContractCard,
  LoadingContractCard,
} from 'components/ContractCard'
import type { NextPage } from 'next'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'
import {
  daoAddressesSelector,
  DaoListType,
  memberDaoSelector,
} from 'selectors/daos'

import { convertMicroDenomToDenom } from 'util/conversion'
interface IMembershipTotal {
  count: number
  votes: number
}

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
  const daoAddresses = useRecoilValue(daoAddressesSelector)
  const daos = useRecoilValueLoadable(
    waitForAll(daoAddresses.map((addr) => memberDaoSelector(addr)))
  )
  const [membership, setMembership] = useState<IMembershipTotal>({
    count: 0,
    votes: 0,
  })

  useEffect(() => {
    if (daos.state != 'hasValue') {
      return
    }
    setMembership(
      daos.contents.reduce(
        ({ count, votes }: IMembershipTotal, dao: DaoListType) => ({
          count: count + (dao.member === true ? 1 : 0),
          votes: votes + dao.weight,
        }),
        { count: 0, votes: 0 }
      )
    )
  }, [daos])

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
            {daos.state == 'hasValue' ? (
              daos.contents.map(
                (dao, idx) =>
                  dao.member && (
                    <DaoCard
                      dao={dao.dao}
                      address={dao.address}
                      key={idx}
                      weight={dao.weight}
                    />
                  )
              )
            ) : (
              <LoadingContractCard />
            )}
            <MysteryDaoCard />
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg mb-2">
            <SparklesIcon className="inline w-5 h-5 mr-2 mb-1" />
            Community DAOs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {daos.state == 'hasValue' ? (
              daos.contents.map(
                (dao, idx) =>
                  !dao.member && (
                    <DaoCard
                      dao={dao.dao}
                      address={dao.address}
                      key={idx}
                      weight={dao.weight}
                    />
                  )
              )
            ) : (
              <LoadingContractCard />
            )}
            <MysteryDaoCard />
          </div>
        </div>
      </div>
      <div className="col-start-5 col-span-2 border-l border-base-300 p-6 min-h-screen">
        <h2 className="font-medium text-lg">Overview</h2>
        <div className="mt-6">
          <ul className="list-none ml-2 leading-relaxed">
            <li>
              <LibraryIcon className="inline w-5 h-5 mr-2 mb-1" />
              {daoAddresses.length} active DAOs
            </li>
            <li>
              <UserGroupIcon className="inline w-5 h-5 mr-2 mb-1" />
              Part of {membership.count} DAO
              {membership.count != 1 && 's'}
            </li>
            <li>
              <ScaleIcon className="inline w-5 h-5 mr-2 mb-1" />
              {membership.votes} vote{membership.votes != 1 && 's'} total
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DaoList
