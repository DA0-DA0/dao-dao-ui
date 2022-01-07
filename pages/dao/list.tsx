import {
  LibraryIcon,
  PlusIcon,
  ScaleIcon,
  SparklesIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/outline'
import Logo from 'components/Logo'
import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { DaoListType, daosSelector } from 'selectors/daos'
import { convertMicroDenomToDenom } from 'util/conversion'

function DaoCard({
  dao,
  address,
  weight,
}: {
  dao: any
  address: string
  weight: number
}) {
  return (
    <Link href={`/dao/${address}`}>
      <a>
        <div className="shadow hover:shadow-sm p-6 rounded-lg flex flex-col items-center w-60 h-72 m-2 bg-gradient-to-b from-base-300 to-base-200 justify-between">
          <div className="flex flex-col items-center">
            <div className="mt-6">
              <Logo height={70} width={70} alt={dao.name} />
            </div>
            <h3 className="text-lg font-semibold mt-3">{dao.name}</h3>
            <p className="text-secondary text-sm font-mono text-center mt-1 break-words">
              {dao.description}
            </p>
          </div>
          {weight != 0 && (
            <p className="text-success text-sm mt-3">
              <ScaleIcon className="inline w-5 h-5 mr-2 mb-1" />
              {convertMicroDenomToDenom(weight)} vote{weight > 1 && 's'}
            </p>
          )}
        </div>
      </a>
    </Link>
  )
}

function MysteryDaoCard() {
  return (
    <Link href="/dao/create">
      <a>
        <div className="shadow hover:shadow-sm p-6 rounded-lg flex flex-col items-center w-60 h-72 m-2 bg-gradient-to-b from-base-300 to-base-200">
          <div className="mt-6">
            <Logo height={70} width={70} alt="mystery dao" />
          </div>
          <h3 className="text-lg font-semibold mt-3">???</h3>
          <p className="text-secondary text-sm font-mono text-center mt-1 break-words">
            not part of any daos - what will you build?
          </p>
        </div>
      </a>
    </Link>
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
          <Link href="/dao/create">
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
          <div className="flex flex-wrap">
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
          <div className="flex flex-wrap">
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
      <div className="col-start-5 col-span-2 border border-l border-base-300 p-6 h-screen">
        <h2 className="font-medium">Overview</h2>
        <div className="mt-6">
          <ul className="list-none ml-2 leading-relaxed">
            <li>
              <LibraryIcon className="inline w-5 h-5 mr-2 mb-1" />
              {daos.length} active DAOs
            </li>
            <li>
              <UserGroupIcon className="inline w-5 h-5 mr-2 mb-1" />
              Part of {memberDaos.length} DAO
              {memberDaos.length > 1 && 's'}
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

export default DaoList
