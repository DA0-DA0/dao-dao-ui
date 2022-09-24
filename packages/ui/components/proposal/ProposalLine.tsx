import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

import { ContractVersion } from '@dao-dao/tstypes'

import { Tooltip } from '../Tooltip'
import { ProposalIdDisplay } from './ProposalIdDisplay'

export interface ProposalLineProps {
  proposalPrefix: string
  proposalNumber: number
  proposalModuleVersion: ContractVersion
  title: string
  expiration: string
  status: ReactNode
  vote: ReactNode
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
  status,
  vote,
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
        <div className="hidden flex-row gap-6 items-center p-3 md:flex">
          <p className="font-mono caption-text">
            <ProposalIdDisplay
              proposalNumber={proposalNumber}
              proposalPrefix={proposalPrefix}
            />
          </p>
          {status}
          <p className="grow truncate body-text">{title}</p>
          <p className="font-mono text-right break-words caption-text">
            {expiration}
          </p>
          {vote}
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-2 justify-between p-4 min-h-[9.5rem] text-sm rounded-md md:hidden">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-start">
              {status}
              {vote}
            </div>

            <p className="col-span-3 break-words body-text">{title}</p>
          </div>

          <div className="flex flex-row gap-6 justify-between items-center">
            <p className="font-mono caption-text">
              <ProposalIdDisplay
                proposalNumber={proposalNumber}
                proposalPrefix={proposalPrefix}
              />
            </p>
            <p className="font-mono text-center break-words caption-text">
              {expiration}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )

  return proposalModuleVersion === ContractVersion.V0_2_0 ? (
    <Tooltip title={`Last updated: ${lastUpdated.toLocaleDateString()}`}>
      {contents}
    </Tooltip>
  ) : (
    contents
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
