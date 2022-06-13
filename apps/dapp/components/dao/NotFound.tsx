import Link from 'next/link'

import { ErrorPage } from '@dao-dao/ui'

import { useDAOInfoContext } from '../DAOPageWrapper'

export const DAONotFound = () => (
  <ErrorPage title="DAO Not Found">
    <p>
      We couldn{"'"}t find a DAO with that address. See all DAOs on the{' '}
      <Link href="/dao/explore">
        <a className="underline link-text">explore page</a>
      </Link>
      .
    </p>
  </ErrorPage>
)

export const ProposalNotFound = () => {
  const { coreAddress } = useDAOInfoContext()

  return (
    <ErrorPage title="Proposal Not Found">
      <p>
        We couldn{"'"}t find a proposal with that ID. See all proposals on the{' '}
        <Link href={`/dao/${coreAddress}`}>
          <a className="underline link-text">DAO&apos;s home page</a>
        </Link>
        .
      </p>
    </ErrorPage>
  )
}
