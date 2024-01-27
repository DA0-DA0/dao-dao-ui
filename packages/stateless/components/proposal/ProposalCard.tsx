import clsx from 'clsx'
import removeMarkdown from 'remove-markdown'

import { ProposalCardProps } from '@dao-dao/types/components/ProposalCard'
import { getGovProposalPath } from '@dao-dao/utils'

import { useDaoNavHelpers } from '../../hooks'
import { DaoImage } from '../dao/DaoImage'

export * from '@dao-dao/types/components/ProposalCard'

export const ProposalCard = ({
  dao: { type, name, coreAddressOrId, imageUrl },
  id,
  title,
  description,
  info,
  className,
  onMouseOver,
  onMouseLeave,
  LinkWrapper,
}: ProposalCardProps) => {
  const { getDaoProposalPath } = useDaoNavHelpers()

  return (
    <LinkWrapper
      className={clsx(
        'relative flex w-full flex-col rounded-md bg-background-secondary ring-1 ring-inset ring-transparent transition-all hover:bg-background-interactive-hover hover:ring-border-interactive-hover active:bg-background-interactive-pressed active:ring-border-interactive-focus',
        className
      )}
      href={
        type === 'dao'
          ? getDaoProposalPath(coreAddressOrId, id)
          : type === 'gov'
          ? getGovProposalPath(coreAddressOrId, id)
          : undefined
      }
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
    >
      <div className="flex flex-col gap-4 px-6 pt-8 pb-6">
        <DaoImage
          LinkWrapper={LinkWrapper}
          blur
          className="self-center"
          coreAddress={coreAddressOrId}
          daoName={name}
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
        <p className="primary-text text-center text-text-body">{title}</p>
        <p className="secondary-text line-clamp-4 break-words">
          {removeMarkdown(description)}
        </p>
      </div>

      <div className="flex flex-col gap-2 self-stretch border-t border-border-secondary py-5 px-6">
        {info.map(({ Icon, label }, index) => (
          <div key={index} className="flex flex-row items-center gap-5">
            <Icon className="!h-5 !w-5 !text-icon-secondary" />
            <p className="caption-text font-mono text-text-secondary">
              {label}
            </p>
          </div>
        ))}
      </div>
    </LinkWrapper>
  )
}
