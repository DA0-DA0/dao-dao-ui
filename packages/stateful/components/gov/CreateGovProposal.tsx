import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  CreateProposal,
  useDaoInfoContextIfAvailable,
} from '@dao-dao/stateless'
import { DaoTabId } from '@dao-dao/types'

import { GovActionsProvider } from '../../actions'
import { PageHeaderContent } from '../PageHeaderContent'
import { NewGovProposal } from './NewGovProposal'

export const CreateGovProposal = () => {
  const { t } = useTranslation()
  const daoInfo = useDaoInfoContextIfAvailable()

  const clearRef = useRef(() => {})
  const copyDraftLinkRef = useRef(async () => {})

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
            <NewGovProposal
              clearRef={clearRef}
              copyDraftLinkRef={copyDraftLinkRef}
            />
          </GovActionsProvider>
        }
      />
    </>
  )
}
