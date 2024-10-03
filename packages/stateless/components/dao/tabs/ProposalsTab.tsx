import { Add } from '@mui/icons-material'
import { isMobile } from '@walletconnect/browser-utils'
import { ComponentType, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ButtonLinkProps,
  IDaoBase,
  StatefulProposalListProps,
} from '@dao-dao/types'

import { useDaoNavHelpers, usePlatform } from '../../../hooks'
import { Tooltip } from '../../tooltip/Tooltip'

export interface ProposalsTabProps {
  dao: IDaoBase
  ProposalList: ComponentType<StatefulProposalListProps>
  ButtonLink: ComponentType<ButtonLinkProps>
}

export const ProposalsTab = ({
  dao,
  ProposalList,
  ButtonLink,
}: ProposalsTabProps) => {
  const { t } = useTranslation()

  const { goToDaoProposal, getDaoProposalPath } = useDaoNavHelpers()
  // Detect if Mac for checking keypress.
  const { isMac } = usePlatform()

  // Add keypress listener.
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (((!isMac && event.ctrlKey) || event.metaKey) && event.shiftKey) {
        if (event.key === 'p') {
          event.preventDefault()
          goToDaoProposal(dao.coreAddress, 'create')
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isMac, dao.coreAddress, goToDaoProposal])

  return (
    <>
      {/* header min-height of 3.5rem standardized across all tabs */}
      <div className="flex min-h-[3.5rem] flex-row items-center justify-between gap-8 pb-6">
        <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
          <p className="title-text text-text-body">
            {t('title.createAProposal')}
          </p>
        </div>

        <Tooltip
          title={
            isMobile()
              ? undefined
              : // eslint-disable-next-line i18next/no-literal-string
                (isMac ? '⌘' : '⌃') + '⇧P'
          }
        >
          <ButtonLink
            className="shrink-0"
            href={getDaoProposalPath(dao.coreAddress, 'create')}
          >
            <Add className="!h-4 !w-4" />
            <span className="hidden md:inline">{t('button.newProposal')}</span>
            <span className="md:hidden">{t('button.new')}</span>
          </ButtonLink>
        </Tooltip>
      </div>

      <ProposalList className="border-t border-border-secondary py-6" />
    </>
  )
}
