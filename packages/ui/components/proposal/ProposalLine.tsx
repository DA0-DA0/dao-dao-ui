import clsx from 'clsx'
import { ComponentType, ReactNode, useMemo } from 'react'

import { ContractVersion } from '@dao-dao/utils'

import { LogoProps } from '../Logo'
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
  className,
}: ProposalLineProps) => {
  const msSinceUpdated = new Date().getTime() - lastUpdated.getTime()

  // Class names shared between desktop and mobile containers.
  const sharedContainerClassNames = useMemo(
    () =>
      clsx(
        'bg-background-secondary hover:bg-background-interactive-hover active:bg-background-interactive-pressed rounded-md transition cursor-pointer',
        // If updated in the last day, highlight.
        msSinceUpdated < 24 * 60 * 60 * 1000 && 'bg-purple-300/30',
        className
      ),
    [msSinceUpdated, className]
  )

  const contents = (
    <>
      {/* Desktop */}
      <div
        className={clsx(
          sharedContainerClassNames,
          'hidden flex-row gap-6 items-center p-3 md:flex'
        )}
      >
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
      <div
        className={clsx(
          sharedContainerClassNames,
          'flex flex-col gap-2 justify-between p-4 min-h-[9.5rem] text-sm rounded-md md:hidden'
        )}
      >
        <div className="flex flex-col gap-2">
          {status}
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
          {vote}
        </div>
      </div>
    </>
  )

  return proposalModuleVersion === ContractVersion.V0_2_0 ? (
    <Tooltip label={`Last updated: ${lastUpdated.toLocaleDateString()}`}>
      {contents}
    </Tooltip>
  ) : (
    contents
  )
}

export interface ProposalLineLoaderProps {
  Logo: ComponentType<LogoProps>
}

export const ProposalLineLoader = (props: ProposalLineLoaderProps) => (
  <>
    <ProposalLineLoaderDesktop {...props} />
    <ProposalLineLoaderMobile {...props} />
  </>
)

const ProposalLineLoaderDesktop = ({ Logo }: ProposalLineLoaderProps) => (
  <div className="hidden justify-center items-center h-12 bg-primary rounded-md md:flex">
    <Logo className="animate-spin-medium" />
  </div>
)

const ProposalLineLoaderMobile = ({ Logo }: ProposalLineLoaderProps) => (
  <div className="flex justify-center items-center h-[9.5rem] bg-primary rounded-md md:hidden">
    <Logo className="animate-spin-medium" />
  </div>
)
