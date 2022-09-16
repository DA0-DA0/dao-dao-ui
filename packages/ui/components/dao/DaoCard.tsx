import { Check } from '@mui/icons-material'
import clsx from 'clsx'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import {
  DaoCardPin,
  DaoCardProposals,
  Governance,
  ParentDaoArrow,
} from '@dao-dao/icons'
import { DaoCardInfo } from '@dao-dao/tstypes/dao'
import { formatDate } from '@dao-dao/utils'

import { IconButton, IconButtonLink } from '../IconButton'
import { Tooltip } from '../Tooltip'
import { DaoImage } from './DaoImage'

export interface DaoCardProps extends DaoCardInfo {
  pinned: boolean
  onPin: () => void
  showIsMember?: boolean
  className?: string
  onMouseOver?: () => void
  onMouseLeave?: () => void
}

export const DaoCard = ({
  coreAddress,
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
  parentDao,
  isMember,
  showIsMember = true,
  className,
  onMouseOver,
  onMouseLeave,
}: DaoCardProps) => {
  const { t } = useTranslation()

  return (
    <Link href={href}>
      <a
        className={clsx(
          'flex relative flex-col justify-between items-center py-7 px-6 w-full h-[328px] bg-background-secondary hover:bg-background-interactive-hover active:bg-background-interactive-pressed rounded-md outline-transparent hover:outline-border-interactive-hover active:outline-border-interactive-focus outline transition-all',
          className
        )}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
      >
        <div
          className={clsx(
            'flex absolute top-0 left-0 flex-row items-center p-3 w-full',
            {
              'justify-between': !!parentDao,
              'justify-end': !parentDao, // Keep the pin and member check at the end if no parent DAO.
            }
          )}
        >
          {parentDao && (
            <IconButtonLink
              Icon={ParentDaoArrow}
              className="text-icon-interactive-disabled"
              href={parentDao.href}
              // Don't click on DAO card.
              onClick={(event) => event.preventDefault()}
              title={t('info.gotoParent')}
              variant="ghost"
            />
          )}
          <div className="flex flex-row gap-3 items-center">
            <IconButton
              Icon={DaoCardPin}
              className={clsx({
                'text-icon-secondary': !pinned,
                'text-icon-interactive-active': pinned,
              })}
              onClick={(event) => {
                // Don't click on DAO card.
                event.preventDefault()
                onPin()
              }}
              variant="ghost"
            />

            {showIsMember && isMember && (
              <Tooltip title={t('info.youAreMember')}>
                <Check className="w-4 h-4 text-icon-secondary" />
              </Tooltip>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <DaoImage
            coreAddress={coreAddress}
            imageUrl={imageUrl}
            parentDao={parentDao}
            size="sm"
          />
          <p className="mt-2 primary-text">{name}</p>
          {established && (
            <p className="mt-1 caption-text">{formatDate(established)}</p>
          )}
        </div>

        <div className="self-stretch">
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
