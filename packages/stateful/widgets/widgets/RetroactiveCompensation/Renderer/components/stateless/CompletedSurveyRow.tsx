import { DescriptionOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Tooltip,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { IconButtonLinkProps } from '@dao-dao/types/stateless/IconButtonLink'
import { formatDate } from '@dao-dao/utils'

import { CompletedSurveyListing } from '../../types'

export interface CompletedSurveyRowProps {
  survey: CompletedSurveyListing
  onClick: () => void
  IconButtonLink: ComponentType<IconButtonLinkProps>
  className?: string
}

export const CompletedSurveyRow = ({
  survey: { name, contributionCount, contributionsOpenedAt, proposalId },
  onClick,
  IconButtonLink,
  className,
}: CompletedSurveyRowProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const openedAtEpoch = Date.parse(contributionsOpenedAt)

  return (
    <div
      className={clsx(
        'cursor-pointer rounded-md bg-background-secondary transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
        className
      )}
      onClick={onClick}
    >
      {/* Desktop */}
      <div className="hidden h-12 flex-row items-center gap-6 p-3 sm:flex">
        <p className="body-text grow truncate">{name}</p>

        {!!proposalId && (
          <Tooltip title={t('button.goToProposal')}>
            <IconButtonLink
              Icon={DescriptionOutlined}
              href={getDaoProposalPath(coreAddress, proposalId)}
              onClick={
                // Don't click on row.
                (e) => e.stopPropagation()
              }
              size="sm"
              variant="ghost"
            />
          </Tooltip>
        )}

        <p className="text-right">
          {t('info.numContributors', { count: contributionCount })}
        </p>

        {!isNaN(openedAtEpoch) && (
          <p className="caption-text shrink-0 break-words text-right font-mono">
            {formatDate(new Date(contributionsOpenedAt))}
          </p>
        )}
      </div>

      {/* Mobile */}
      <div className="flex flex-col justify-between gap-2 rounded-md p-4 text-sm sm:hidden">
        <div className="flex flex-row items-start justify-between gap-3">
          <p className="body-text break-words">{name}</p>
          {!!proposalId && (
            <Tooltip title={t('button.goToProposal')}>
              <IconButtonLink
                Icon={DescriptionOutlined}
                href={getDaoProposalPath(coreAddress, proposalId)}
                size="sm"
                variant="ghost"
              />
            </Tooltip>
          )}
        </div>

        <div className="flex flex-row items-center justify-between gap-6">
          {!isNaN(openedAtEpoch) && (
            <p className="legend-text shrink-0 break-words font-mono">
              {formatDate(new Date(contributionsOpenedAt))}
            </p>
          )}

          <p className="caption-text grow text-right">
            {t('info.numContributors', { count: contributionCount })}
          </p>
        </div>
      </div>
    </div>
  )
}
