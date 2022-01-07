import { PlusIcon, SparklesIcon, UserIcon } from '@heroicons/react/outline'
import Logo from 'components/Logo'
import { DaoListType } from 'hooks/dao'
import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { daosSelector } from 'selectors/daos'

function DaoCard({ dao, address }: { dao: any; address: string }) {
  return (
    <Link href={`/dao/${address}`}>
      <a>
        <div className="shadow hover:shadow-sm p-6 rounded-lg flex flex-col items-center w-60 h-72 m-2 bg-gradient-to-b from-base-300 to-base-200">
          <div className="mt-6">
            <Logo height={70} width={70} alt={dao.name} />
          </div>
          <h3 className="text-lg font-semibold mt-3">{dao.name}</h3>
          <p className="text-secondary text-sm font-mono text-center mt-1 break-words">
            {dao.description}
          </p>
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

  return (
    <div className="grid grid-cols-6">
      <div className="p-6 w-full col-span-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">DAOs</h1>
          <button className="btn btn-sm bg-primary text-primary-content normal-case text-left">
            Create a Dao <PlusIcon className="inline w-5 h-5 ml-1" />
          </button>
        </div>
        <div className="mt-6">
          <h2 className="text-lg mb-2">
            <UserIcon className="inline w-5 h-5 mr-2 mb-1" />
            Your DAOs
          </h2>
          <div className="flex flex-wrap">
            {memberDaos.length ? (
              memberDaos.map((dao, idx) => (
                <DaoCard dao={dao.dao} address={dao.address} key={idx} />
              ))
            ) : (
              <MysteryDaoCard />
            )}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg mb-2">
            <SparklesIcon className="inline w-5 h-5 mr-2 mb-1" />
            Other DAOs
          </h2>
          <div className="flex flex-wrap">
            {nonMemberDaos.map((dao, idx) => (
              <DaoCard dao={dao.dao} address={dao.address} key={idx} />
            ))}
          </div>
        </div>
      </div>
      <div className="col-start-5 col-span-2 border p-6 h-screen"></div>
    </div>
  )
}

export default DaoList
