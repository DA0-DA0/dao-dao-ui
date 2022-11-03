import clsx from 'clsx'
import removeMarkdown from 'remove-markdown'

import { ProposalCardProps } from '@dao-dao/types/components/ProposalCard'

import { DaoImage } from '../dao/DaoImage'

export * from '@dao-dao/types/components/ProposalCard'

export const ProposalCard = ({
  dao: { coreAddress, imageUrl },
  id,
  title,
  description,
  info,
  className,
  onMouseOver,
  onMouseLeave,
  LinkWrapper,
}: ProposalCardProps) => (
  <LinkWrapper
    className={clsx(
      'bg-background-secondary hover:bg-background-interactive-hover hover:ring-border-interactive-hover active:bg-background-interactive-pressed active:ring-border-interactive-focus relative flex w-full flex-col rounded-md ring-1 ring-inset ring-transparent transition-all',
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
      <p className="primary-text text-text-body text-center">{title}</p>
      <p className="secondary-text line-clamp-4 break-words">
        {removeMarkdown(description)}
      </p>
    </div>

    <div className="border-border-secondary flex flex-col gap-2 self-stretch border-t py-5 px-6">
      {info.map(({ Icon, label }, index) => (
        <div key={index} className="flex flex-row items-center gap-5">
          <Icon className="!text-icon-secondary !h-5 !w-5" />
          <p className="caption-text text-text-secondary font-mono">{label}</p>
        </div>
      ))}
    </div>
  </LinkWrapper>
)
