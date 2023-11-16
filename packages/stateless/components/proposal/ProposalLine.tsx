import clsx from 'clsx'
import { ComponentType, ReactNode } from 'react'

import { LinkWrapperProps, ProposalTimestampInfo } from '@dao-dao/types'

import { ApprovalBadge } from '../ApprovalBadge'
import { Tooltip } from '../tooltip'
import { ProposalIdDisplay } from './ProposalIdDisplay'

export interface ProposalLineProps {
  proposalPrefix: string
  proposalNumber: number
  title: string
  timestampDisplay: ProposalTimestampInfo['display']
  Status: ComponentType<{ dimmed?: boolean }>
  vote: ReactNode
  votingOpen: boolean
  href: string
  className?: string
  LinkWrapper: ComponentType<LinkWrapperProps>
  // Whether or not this proposal is an approver proposal.
  approver?: boolean
}

export const ProposalLine = ({
  proposalPrefix,
  proposalNumber,
  title,
  timestampDisplay,
  Status,
  vote,
  votingOpen,
  href,
  className,
  LinkWrapper,
  approver,
}: ProposalLineProps) => (
  <LinkWrapper
    className={clsx(
      'block cursor-pointer rounded-md bg-background-secondary transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
      className
    )}
    href={href}
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

      <div className="flex grow flex-row items-center gap-2">
        {approver && <ApprovalBadge size="sm" tooltip />}
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
    <div className="flex min-h-[9.5rem] flex-col justify-between gap-2 rounded-md p-4 text-sm md:hidden">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row flex-wrap items-start justify-between gap-2">
          <p className="caption-text font-mono">
            <ProposalIdDisplay
              proposalNumber={proposalNumber}
              proposalPrefix={proposalPrefix}
            />
          </p>

          {approver && <ApprovalBadge size="sm" tooltip />}
        </div>

        <p className="body-text break-words line-clamp-2">{title}</p>
      </div>

      <div className="flex flex-row items-center justify-between gap-6">
        <div className="flex flex-row items-center gap-2">
          <Status dimmed />

          {timestampDisplay && (
            <Tooltip title={timestampDisplay.tooltip}>
              <p
                className={clsx(
                  'link-text break-words text-center font-mono leading-5 text-text-tertiary',
                  // Hide timestamp on small screens when voting is closed.
                  !votingOpen && 'hidden xs:inline-block'
                )}
              >
                {/* eslint-disable-next-line i18next/no-literal-string */}
                <span className="mr-2 inline-block">–</span>
                {timestampDisplay.content}
              </p>
            </Tooltip>
          )}
        </div>

        {vote}
      </div>
    </div>
  </LinkWrapper>
)

export const ProposalLineLoader = () => (
  <>
    <ProposalLineLoaderDesktop />
    <ProposalLineLoaderMobile />
  </>
)

const ProposalLineLoaderDesktop = () => (
  <div className="hidden h-12 animate-pulse rounded-md bg-background-primary md:block"></div>
)

const ProposalLineLoaderMobile = () => (
  <div className="h-[9.5rem] animate-pulse rounded-md bg-background-primary md:hidden"></div>
)
