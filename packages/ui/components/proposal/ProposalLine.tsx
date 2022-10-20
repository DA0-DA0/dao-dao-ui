import clsx from 'clsx'
import Link from 'next/link'
import { ComponentType, ReactNode } from 'react'

import { ProposalIdDisplay } from './ProposalIdDisplay'

export interface ProposalLineProps {
  proposalPrefix: string
  proposalNumber: number
  title: string
  expiration: ReactNode
  Status: ComponentType<{ dimmed?: boolean }>
  vote: ReactNode
  votingOpen: boolean
  href: string
  className?: string
}

export const ProposalLine = ({
  proposalPrefix,
  proposalNumber,
  title,
  expiration,
  Status,
  vote,
  votingOpen,
  href,
  className,
}: ProposalLineProps) => (
  <Link href={href}>
    <a
      className={clsx(
        'block cursor-pointer rounded-md bg-background-secondary transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
        className
      )}
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
          {expiration}
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

          <p className="body-text col-span-3 break-words line-clamp-2">
            {title}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between gap-6">
          <div className="flex flex-row items-center gap-2">
            <Status dimmed />

            <p
              className={clsx(
                'link-text break-words text-center font-mono leading-5 text-text-tertiary',
                !votingOpen && 'hidden xs:inline-block'
              )}
            >
              {/* eslint-disable-next-line i18next/no-literal-string */}
              <span className="mr-2 inline-block">–</span>
              {expiration}
            </p>
          </div>

          {vote}
        </div>
      </div>
    </a>
  </Link>
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
