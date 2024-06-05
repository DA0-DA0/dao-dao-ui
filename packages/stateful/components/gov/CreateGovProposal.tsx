import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  CreateProposal,
  PageLoader,
  useDaoInfoContextIfAvailable,
} from '@dao-dao/stateless'
import { DaoTabId } from '@dao-dao/types'

import { GovActionsProvider } from '../../actions'
import { PageHeaderContent } from '../PageHeaderContent'
import { SuspenseLoader } from '../SuspenseLoader'
import { NewGovProposal } from './NewGovProposal'

export const CreateGovProposal = () => {
  const { t } = useTranslation()
  const daoInfo = useDaoInfoContextIfAvailable()

  const clearRef = useRef(() => {})
  const copyDraftLinkRef = useRef(() => {})

  return (
    <>
      <PageHeaderContent
        breadcrumbs={{
          homeTab: {
            id: DaoTabId.Proposals,
            sdaLabel: t('title.proposals'),
          },
          current: t('title.createProposal'),
          daoInfo,
        }}
      />

      <CreateProposal
        clear={() => clearRef.current()}
        copyDraftLink={() => copyDraftLinkRef.current()}
        newProposal={
          <GovActionsProvider>
            <SuspenseLoader fallback={<PageLoader />}>
              <NewGovProposal
                clearRef={clearRef}
                copyDraftLinkRef={copyDraftLinkRef}
              />
            </SuspenseLoader>
          </GovActionsProvider>
        }
      />
    </>
  )
}
