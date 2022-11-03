import clsx from 'clsx'
import { ComponentType, ReactNode } from 'react'

import { LinkWrapperProps } from '@dao-dao/types'

import { ProposalIdDisplay } from './ProposalIdDisplay'

export interface ProposalLineProps {
  proposalPrefix: string
  proposalNumber: number
  title: string
  timestampDisplay: ReactNode
  Status: ComponentType<{ dimmed?: boolean }>
  vote: ReactNode
  votingOpen: boolean
  href: string
  className?: string
  LinkWrapper: ComponentType<LinkWrapperProps>
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
}: ProposalLineProps) => (
  <LinkWrapper
    className={clsx(
      'bg-background-secondary hover:bg-background-interactive-hover active:bg-background-interactive-pressed block cursor-pointer rounded-md transition',
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
      <p className="body-text grow truncate">{title}</p>
      <p className="caption-text shrink-0 break-words text-right font-mono">
        {timestampDisplay}
      </p>
      {vote}
    </div>

    {/* Mobile */}
    <div className="flex min-h-[9.5rem] flex-col justify-between gap-2 rounded-md p-4 text-sm md:hidden">
      <div className="flex flex-col gap-2">
        <p className="caption-text font-mono">
          <ProposalIdDisplay
            proposalNumber={proposalNumber}
            proposalPrefix={proposalPrefix}
          />
        </p>

        <p className="body-text line-clamp-2 col-span-3 break-words">{title}</p>
      </div>

      <div className="flex flex-row items-center justify-between gap-6">
        <div className="flex flex-row items-center gap-2">
          <Status dimmed />

          <p
            className={clsx(
              'link-text text-text-tertiary break-words text-center font-mono leading-5',
              !votingOpen && 'xs:inline-block hidden'
            )}
          >
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <span className="mr-2 inline-block">–</span>
            {timestampDisplay}
          </p>
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
  <div className="bg-background-primary hidden h-12 animate-pulse rounded-md md:block"></div>
)

const ProposalLineLoaderMobile = () => (
  <div className="bg-background-primary h-[9.5rem] animate-pulse rounded-md md:hidden"></div>
)
