import Link from 'next/link'

import i18n from '@dao-dao/i18n'
import { ErrorPage } from '@dao-dao/ui'

import { useDAOInfoContext } from '../DAOPageWrapper'

// TODO: i18n
export const DAONotFound = () => (
  <ErrorPage title={i18n.t('error.DAONotFound')}>
    <p>
      We couldn{"'"}t find a DAO with that address. Search DAOs on the{' '}
      <Link href="/home">
        <a className="underline link-text">home page</a>
      </Link>
      .
    </p>
  </ErrorPage>
)

export const ProposalNotFound = () => {
  const { coreAddress } = useDAOInfoContext()

  return (
    <ErrorPage title={i18n.t('error.proposalNotFound')}>
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
