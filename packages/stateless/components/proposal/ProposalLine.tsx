import clsx from 'clsx'
import { ComponentType, ReactNode } from 'react'

import {
  ApprovalProposalContext,
  LinkWrapperProps,
  ProposalTimestampInfo,
} from '@dao-dao/types'

import { ApprovalBadge } from '../ApprovalBadge'
import { Tooltip } from '../tooltip'
import { ProposalIdDisplay } from './ProposalIdDisplay'

export interface ProposalLineProps {
  proposalPrefix: string
  proposalNumber: number
  title: string
  timestampDisplay: ProposalTimestampInfo['display']
  Status: ComponentType
  vote: ReactNode
  href: string
  onClick?: () => void
  openInNewTab?: boolean
  className?: string
  LinkWrapper: ComponentType<LinkWrapperProps>
  approvalContext?: ApprovalProposalContext
}

export const ProposalLine = ({
  proposalPrefix,
  proposalNumber,
  title,
  timestampDisplay,
  Status,
  vote,
  href,
  onClick,
  openInNewTab,
  className,
  LinkWrapper,
  approvalContext,
}: ProposalLineProps) => (
  <LinkWrapper
    className={clsx(
      'block cursor-pointer rounded-md bg-background-secondary transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
      className
    )}
    href={href}
    onClick={onClick}
    openInNewTab={openInNewTab}
  >
    {/* Desktop */}
    <div className="hidden h-12 flex-row items-center gap-6 p-3 md:flex">
      <p className="caption-text shrink-0 font-mono">
        <ProposalIdDisplay
          proposalNumber={proposalNumber}
          proposalPrefix={proposalPrefix}
        />
      </p>

      <div className="w-20 shrink-0">
        <Status />
      </div>

      <div className="flex min-w-0 grow flex-row items-center gap-2">
        {approvalContext && (
          <ApprovalBadge context={approvalContext} size="sm" tooltip />
        )}

        <p className="body-text grow truncate">{title}</p>
      </div>

      {timestampDisplay && (
        <Tooltip title={timestampDisplay.tooltip}>
          <p className="caption-text shrink-0 break-words text-right font-mono">
            {timestampDisplay.content}
          </p>
        </Tooltip>
      )}

      {vote}
    </div>

    {/* Mobile */}
    <div className="flex flex-col justify-between gap-2 rounded-md p-3 text-sm md:hidden">
      <div className="-mb-1 flex flex-row items-start justify-between">
        <p className="font-mono text-sm text-text-tertiary">
          <ProposalIdDisplay
            proposalNumber={proposalNumber}
            proposalPrefix={proposalPrefix}
          />
        </p>

        <Status />
      </div>

      {approvalContext && (
        <ApprovalBadge
          className="mt-1 -mb-1"
          context={approvalContext}
          size="sm"
          tooltip
        />
      )}

      {/* Right padding to make room for status. */}
      <p className="body-text line-clamp-3 mb-2 break-words pr-24">{title}</p>

      <div className="flex flex-row flex-wrap items-end justify-between gap-2">
        {timestampDisplay && (
          <Tooltip title={timestampDisplay.tooltip}>
            <p className="link-text break-words text-center font-mono font-normal text-text-tertiary">
              {timestampDisplay.content}
            </p>
          </Tooltip>
        )}

        {vote}
      </div>
    </div>
  </LinkWrapper>
)
