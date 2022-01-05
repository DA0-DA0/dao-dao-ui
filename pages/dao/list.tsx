import { CheckIcon } from '@heroicons/react/outline'
import { ChevronRightIcon } from '@heroicons/react/solid'
import LinkCard from 'components/LinkCard'
import { DaoListType } from 'hooks/dao'
import type { NextPage } from 'next'
import Link from 'next/link'
import React, { FunctionComponent, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { daoSelector, daosSelector } from 'selectors/daos'

const DaoListComponent: FunctionComponent<DaoListType> = ({
  address,
  member,
  dao,
}) => {
  const { name, description } = dao ?? {
    name: 'loading',
    description: 'loading',
  }

  return (
    <LinkCard href={`/dao/${address}`}>
      <h3 className="text-2xl font-bold">
        {name}{' '}
        <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
      </h3>
      <p className="mt-4 text-xl">{description}</p>
      {member ? (
        <p className="mt-4 text-success">
          <CheckIcon className="h-4 w-4 mb-1 mr-1 inline" />
          <i> You are a member</i>
        </p>
      ) : null}
    </LinkCard>
  )
}

const DaoList: NextPage = () => {
  const daos = useRecoilValue(daosSelector)
  let memberDaos: DaoListType[] = []
  let nonMemberDaos: DaoListType[] = []

  // useEffect(() => {
  for (const dao of daos) {
    if (dao?.member === true) {
      memberDaos.push(dao)
    } else {
      nonMemberDaos.push(dao)
    }
  }
  // })

  return (
    <div>
      <h1 className="text-6xl font-bold">DAOs</h1>
      <h2 className="text-3xl font-bold mt-8 text-left max-w-sm w-full -mb-3">
        Personal DAOs
      </h2>
      {memberDaos.length > 0 ? (
        memberDaos.map((memberDao, key) => (
          <DaoListComponent
            address={memberDao?.address}
            member={memberDao?.member}
            dao={memberDao.dao}
            key={key}
          />
        ))
      ) : (
        <>
          <p className="text-xl my-8">Not part of any DAOs</p>
          <Link href="/dao/create" passHref>
            <button className="btn btn-primary btn-lg font-semibold hover:text-base-100 text-2xl">
              Create a DAO
            </button>
          </Link>
        </>
      )}
      {nonMemberDaos.length > 0 ? (
        <>
          <hr />
          <h2 className="text-3xl font-bold mt-8 text-left max-w-sm w-full -mb-3">
            Other DAOs
          </h2>
          {nonMemberDaos.map((dao, key) => (
            <DaoListComponent
              address={dao?.address}
              member={dao?.member}
              dao={dao.dao}
              key={key}
            />
          ))}
        </>
      ) : null}
    </div>
  )
}

export default DaoList
