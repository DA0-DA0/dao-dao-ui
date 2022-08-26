import clsx from 'clsx'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import {
  DaoCardMemberCheck,
  DaoCardPin,
  DaoCardProposals,
  Governance,
  SubDaoArrow,
} from '@dao-dao/icons'
import { formatDate } from '@dao-dao/utils'

import { IconButton } from '../IconButton'

export interface SubDaoInfo {
  parentDaoHref: string
  parentDaoImageUrl: string
}

export interface DaoCardInfo {
  coreAddress: string
  name: string
  description: string
  imageUrl: string
  established: Date
  href: string

  tokenBalance: number
  tokenSymbol: string
  proposalCount: number

  subDaoInfo?: SubDaoInfo
}

export interface DaoCardProps extends DaoCardInfo {
  pinned: boolean
  onPin: () => void

  isMember: boolean

  className?: string
}

export const DaoCard = ({
  name,
  description,
  imageUrl,
  href,
  established,
  tokenBalance,
  tokenSymbol,
  proposalCount,
  pinned,
  onPin,
  subDaoInfo,
  isMember,
  className,
}: DaoCardProps) => {
  const { t } = useTranslation()

  return (
    <Link href={href}>
      <a
        className={clsx(
          'flex relative flex-col justify-between items-center py-7 px-6 w-full max-w-[260px] h-[328px] bg-background-secondary hover:bg-background-interactive-hover active:bg-background-interactive-pressed rounded-md outline-transparent hover:outline-border-interactive-hover active:outline-border-interactive-focus outline transition-all',
          className
        )}
      >
        <div
          className={clsx(
            'flex absolute top-0 left-0 flex-row items-center p-3 w-full',
            {
              'justify-between': !!subDaoInfo,
              'justify-end': !subDaoInfo, // Keep the pin and member check at the end if no subDao info.
            }
          )}
        >
          {subDaoInfo && (
            <Link href={subDaoInfo.parentDaoHref}>
              <a title={t('info.gotoParent')}>
                <SubDaoArrow className="text-icon-interactive-disabled" />
              </a>
            </Link>
          )}
          <div className="flex flex-row gap-3 items-center">
            <IconButton
              icon={
                <DaoCardPin
                  className={clsx('w-4 h-4', {
                    'text-icon-secondary': !pinned,
                    'text-icon-interactive-active': pinned,
                  })}
                />
              }
              onClick={(event) => {
                event.preventDefault()
                onPin()
              }}
              variant="ghost"
            />

            {isMember && (
              <div title={t('info.youAreMember')}>
                <DaoCardMemberCheck className="w-4 h-4 text-icon-secondary" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative p-1 rounded-full border-2 border-border-primary">
            <div
              className="w-[72px] h-[72px] bg-center bg-cover"
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            ></div>
            {subDaoInfo && (
              <Link href={subDaoInfo.parentDaoHref}>
                <a
                  className="absolute right-0 bottom-0 w-8 h-8 bg-center bg-cover rounded-full drop-shadow"
                  style={{
                    backgroundImage: `url(${subDaoInfo.parentDaoImageUrl})`,
                  }}
                ></a>
              </Link>
            )}
          </div>
          <p className="mt-2 primary-text">{name}</p>
          <p className="mt-1 caption-text">{formatDate(established)}</p>
        </div>
        <div className="w-full">
          <p className="mb-5 w-full break-words line-clamp-3 secondary-text">
            {description}
          </p>
          <div className="flex flex-row gap-3 items-center mb-2 font-mono caption-text">
            <Governance className="w-3 h-3" />
            <p>{t('format.token', { val: tokenBalance, tokenSymbol })}</p>
          </div>
          <div className="flex flex-row gap-3 items-center font-mono caption-text">
            <DaoCardProposals className="w-3 h-3" />
            <p>{t('info.numProposals', { count: proposalCount })}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}
