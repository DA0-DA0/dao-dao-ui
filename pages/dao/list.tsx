import React, { FunctionComponent, useEffect, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import WalletLoader from 'components/WalletLoader'
import type { NextPage } from 'next'
import Link from 'next/link'
import { DAO_CODE_ID } from 'util/constants'
import { useDaosList, DaoListType } from 'hooks/dao'

const DaoListComponent: FunctionComponent<DaoListType> = ({
  address,
  name,
  description,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 max-w-full sm:w-full">
      <Link href={`/dao/${address}`} passHref>
        <a className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
          <h3 className="text-2xl font-bold">
            {name}{' '}
            <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
          </h3>
          <p className="mt-4 text-xl">{description}</p>
        </a>
      </Link>
    </div>
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
        <p>No DAOs : (</p>
      )}
    </WalletLoader>
  )
}

export default DaoList
