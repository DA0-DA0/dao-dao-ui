import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import WalletLoader from 'components/WalletLoader'
import { useDaoConfig } from 'hooks/dao'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import LinkCard from 'components/LinkCard'

const DaoHome: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  let { daoInfo, loading } = useDaoConfig(contractAddress)

  return (
    <WalletLoader loading={loading}>
      {daoInfo ? (
        <>
          <h1 className="text-6xl font-bold">{daoInfo.config.name}</h1>
          <h4 className="text-xl">{daoInfo.config.description}</h4>
          <LinkCard href={`/dao/${contractAddress}/proposals`}>
            <h3 className="text-2xl font-bold">
              Proposals{' '}
              <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
            </h3>
            <p className="mt-4 text-xl">
              Create and vote on proposals for the DAO to execute.
            </p>
          </LinkCard>
          <LinkCard href={`/dao/${contractAddress}/treasury`}>
            <h3 className="text-2xl font-bold">
              Treasury{' '}
              <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
            </h3>
            <p className="mt-4 text-xl">Manage DAO finances.</p>
          </LinkCard>
        </>
      ) : (
        <p>DAO not found</p>
      )}
    </WalletLoader>
  )
}

export default DaoHome
