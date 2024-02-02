import { useTranslation } from 'react-i18next'

import { CreateProposal, PageLoader } from '@dao-dao/stateless'
import { DaoTabId } from '@dao-dao/types'

import { GovActionsProvider } from '../../actions'
import { PageHeaderContent } from '../PageHeaderContent'
import { SuspenseLoader } from '../SuspenseLoader'
import { NewGovProposal } from './NewGovProposal'

export const CreateGovProposal = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeaderContent
        breadcrumbs={{
          homeTab: {
            id: DaoTabId.Proposals,
            sdaLabel: t('title.proposals'),
          },
          current: t('title.createProposal'),
        }}
        className="mx-auto max-w-5xl"
      />

      <CreateProposal
        newProposal={
          <GovActionsProvider>
            <SuspenseLoader fallback={<PageLoader />}>
              <NewGovProposal />
            </SuspenseLoader>
          </GovActionsProvider>
        }
      />
    </>
  )
}
