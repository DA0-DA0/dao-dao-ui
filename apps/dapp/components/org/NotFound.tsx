import Link from 'next/link'

import i18n from '@dao-dao/i18n'
import { ErrorPage } from '@dao-dao/ui'

import { useOrgInfoContext } from '../OrgPageWrapper'

export const OrgNotFound = () => (
  <ErrorPage title={i18n.t('error.DAONotFound')}>
    <p>
      We couldn{"'"}t find an org with that address. See all orgs on the{' '}
      <Link href="/org/explore">
        <a className="underline link-text">explore page</a>
      </Link>
      .
    </p>
  </ErrorPage>
)

export const ProposalNotFound = () => {
  const { coreAddress } = useOrgInfoContext()

  return (
    <ErrorPage title={i18n.t('error.proposalNotFound')}>
      <p>
        We couldn{"'"}t find a proposal with that ID. See all proposals on the{' '}
        <Link href={`/org/${coreAddress}`}>
          <a className="underline link-text">org&apos;s home page</a>
        </Link>
        .
      </p>
    </ErrorPage>
  )
}
