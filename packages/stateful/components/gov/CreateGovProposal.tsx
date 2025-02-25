import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { CreateProposal, useDaoIfAvailable } from '@dao-dao/stateless'
import { DaoTabId } from '@dao-dao/types'

import { PageHeaderContent } from '../PageHeaderContent'
import { NewGovProposal } from './NewGovProposal'

export const CreateGovProposal = () => {
  const { t } = useTranslation()
  const dao = useDaoIfAvailable()

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
          dao,
        }}
      />

      <CreateProposal
        clear={() => clearRef.current()}
        copyDraftLink={() => copyDraftLinkRef.current()}
        newProposal={
          <NewGovProposal
            clearRef={clearRef}
            copyDraftLinkRef={copyDraftLinkRef}
          />
        }
      />
    </>
  )
}
