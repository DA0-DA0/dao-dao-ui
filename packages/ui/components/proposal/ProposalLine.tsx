import clsx from 'clsx'
import Link from 'next/link'
import { ComponentType, ReactNode } from 'react'

import { ContractVersion } from '@dao-dao/tstypes'

import { Tooltip } from '../Tooltip'
import { ProposalIdDisplay } from './ProposalIdDisplay'

export interface ProposalLineProps {
  proposalPrefix: string
  proposalNumber: number
  proposalModuleVersion: ContractVersion
  title: string
  expiration: string
  Status: ComponentType<{ dimmed?: boolean }>
  vote: ReactNode
  votingOpen: boolean
  lastUpdated: Date
  href: string
  className?: string
}

export const ProposalLine = ({
  proposalPrefix,
  proposalNumber,
  proposalModuleVersion,
  title,
  expiration,
  Status,
  vote,
  votingOpen,
  lastUpdated,
  href,
  className,
}: ProposalLineProps) => {
  const msSinceUpdated = new Date().getTime() - lastUpdated.getTime()

  const contents = (
    <Link href={href}>
      <a
        className={clsx(
          'block bg-background-secondary hover:bg-background-interactive-hover active:bg-background-interactive-pressed rounded-md transition cursor-pointer',
          // If updated in the last day, highlight.
          msSinceUpdated < 24 * 60 * 60 * 1000 && 'bg-purple-300/20',
          className
        )}
      >
        {/* Desktop */}
        <div className="hidden flex-row gap-6 items-center p-3 h-12 md:flex">
          <p className="shrink-0 font-mono caption-text">
            <ProposalIdDisplay
              proposalNumber={proposalNumber}
              proposalPrefix={proposalPrefix}
            />
          </p>
          <div className="shrink-0 w-20">
            <Status />
          </div>
          <p className="grow truncate body-text">{title}</p>
          <p className="shrink-0 font-mono text-right break-words caption-text">
            {expiration}
          </p>
          {vote}
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-2 justify-between p-4 min-h-[9.5rem] text-sm rounded-md md:hidden">
          <div className="flex flex-col gap-2">
            <p className="font-mono caption-text">
              <ProposalIdDisplay
                proposalNumber={proposalNumber}
                proposalPrefix={proposalPrefix}
              />
            </p>

            <p className="col-span-3 break-words line-clamp-2 body-text">
              {title}
            </p>
          </div>

          <div className="flex flex-row gap-6 justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <Status dimmed />

              <p
                className={clsx(
                  'font-mono leading-5 text-center text-text-tertiary break-words link-text',
                  !votingOpen && 'hidden xs:inline-block'
                )}
              >
                {/* eslint-disable-next-line i18next/no-literal-string */}
                <span className="inline-block mr-2">–</span>
                {expiration}
              </p>
            </div>

            {vote}
          </div>
        </div>
      </a>
    </Link>
  )

  return proposalModuleVersion === ContractVersion.V0_1_0 ? (
    contents
  ) : (
    <Tooltip title={`Last updated: ${lastUpdated.toLocaleDateString()}`}>
      {contents}
    </Tooltip>
  )
}

export const ProposalLineLoader = () => (
  <>
    <ProposalLineLoaderDesktop />
    <ProposalLineLoaderMobile />
  </>
)

const ProposalLineLoaderDesktop = () => (
  <div className="hidden h-12 bg-primary rounded-md animate-pulse md:block"></div>
)

const ProposalLineLoaderMobile = () => (
  <div className="h-[9.5rem] bg-primary rounded-md animate-pulse md:hidden"></div>
)
