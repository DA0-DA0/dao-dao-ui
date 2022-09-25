import clsx from 'clsx'
import removeMarkdown from 'remove-markdown'

import { ProposalCardProps } from '@dao-dao/tstypes/ui/ProposalCard'

import { DaoImage } from '../dao/DaoImage'
import { LinkWrapper } from '../LinkWrapper'

export * from '@dao-dao/tstypes/ui/ProposalCard'

export const ProposalCard = ({
  dao: { coreAddress, imageUrl },
  id,
  title,
  description,
  info,
  className,
  onMouseOver,
  onMouseLeave,
}: ProposalCardProps) => (
  <LinkWrapper
    className={clsx(
      'flex relative flex-col w-full bg-background-secondary hover:bg-background-interactive-hover active:bg-background-interactive-pressed rounded-md ring-1 ring-inset ring-transparent hover:ring-border-interactive-hover active:ring-border-interactive-focus transition-all',
      className
    )}
    href={`/dao/${coreAddress}/proposals/${id}`}
    onMouseLeave={onMouseLeave}
    onMouseOver={onMouseOver}
  >
    <div className="flex flex-col gap-4 px-6 pt-8 pb-6">
      <DaoImage
        blur
        className="self-center"
        coreAddress={coreAddress}
        imageClassName="!w-full !h-full"
        imageUrl={imageUrl}
        size="sm"
      >
        <p
          className="hero-text"
          style={{
            fontSize: `${1.875 - id.length * 0.125}rem`,
          }}
        >
          {id}
        </p>
      </DaoImage>
      <p className="text-center text-text-body primary-text">{title}</p>
      <p className="break-words line-clamp-4 secondary-text">
        {removeMarkdown(description)}
      </p>
    </div>

    <div className="flex flex-col gap-2 self-stretch py-5 px-6 border-t border-border-secondary">
      {info.map(({ Icon, label }, index) => (
        <div key={index} className="flex flex-row gap-5 items-center">
          <Icon className="!w-5 !h-5 !text-icon-secondary" />
          <p className="font-mono text-text-secondary caption-text">{label}</p>
        </div>
      ))}
    </div>
  </LinkWrapper>
)
