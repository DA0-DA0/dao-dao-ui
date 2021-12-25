import React, { FunctionComponent } from 'react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import type { NextPage } from 'next'
import Link from 'next/link'
import { DAO_CODE_ID } from 'util/constants'
import { useDaosList, DaoListType } from 'hooks/dao'
import LinkCard from 'components/LinkCard'
import { CheckIcon } from '@heroicons/react/outline'
import { useRecoilValue } from 'recoil'
import { contractsByCodeId } from 'selectors/contracts'
import { daoInfo } from 'selectors/daos'

const DaoListComponent: FunctionComponent<DaoListType> = ({
  address,
  member,
}) => {
  const { name, description } = useRecoilValue(daoInfo(address))

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
  const { daos } = useDaosList(DAO_CODE_ID)
  // const daos = useRecoilValue(contractsByCodeId(DAO_CODE_ID))

  let memberDaos = []
  let nonMemberDaos = []

  for (const dao of daos) {
    if (dao?.member === true) {
      memberDaos.push(dao)
    } else {
      nonMemberDaos.push(dao)
    }
  }

  return (
    <div>
      <h1 className="text-6xl font-bold">DAOs</h1>
      <h2 className="text-3xl font-bold mt-8 text-left max-w-sm w-full -mb-3">
        Personal DAOs
      </h2>
      {memberDaos.length > 0 ? (
        memberDaos.map((dao, key) => (
          <DaoListComponent
            address={dao?.address}
            member={dao?.member}
            key={key}
          />
        ))
      ) : (
        <>
          <p className="text-xl my-8">Not part of any DAOs</p>
          <Link href="/multisig/create" passHref>
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
              key={key}
            />
          ))}
        </>
      ) : null}
    </div>
  )
}

export default DaoList
