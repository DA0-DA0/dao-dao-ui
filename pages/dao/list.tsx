import React, { FunctionComponent, useEffect, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import WalletLoader from 'components/WalletLoader'
import type { NextPage } from 'next'
import Link from 'next/link'
import { DAO_CODE_ID } from 'util/constants'
import { useDaosList, DaoListType } from 'hooks/dao'
import LinkCard from 'components/LinkCard'

const DaoListComponent: FunctionComponent<DaoListType> = ({
  address,
  name,
  description,
}) => {
  return (
    <LinkCard href={`/dao/${address}`}>
      <h3 className="text-2xl font-bold">
        {name}{' '}
        <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
      </h3>
      <p className="mt-4 text-xl">{description}</p>
    </LinkCard>
  )
}

const DaoList: NextPage = () => {
  const { daos, loading } = useDaosList(DAO_CODE_ID)

  return (
    <WalletLoader loading={loading}>
      <h1 className="text-6xl font-bold">DAOs</h1>
      {daos.length > 0 ? (
        daos.map((dao, key) => (
          <DaoListComponent
            address={dao?.address}
            name={dao?.name}
            description={dao?.description}
            key={key}
          />
        ))
      ) : (
        <>
          <p className="text-xl my-8">No DAOs</p>
          <Link href="/multisig/create" passHref>
            <button className="btn btn-primary btn-lg font-semibold hover:text-base-100 text-2xl">
              Create a DAO
            </button>
          </Link>
        </>
      )}
    </WalletLoader>
  )
}

export default DaoList
