import { Check } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import removeMarkdown from 'remove-markdown'

import {
  DaoCardPin,
  DaoCardProposals,
  Governance,
  ParentDaoArrow,
} from '@dao-dao/icons'
import { DaoCardProps } from '@dao-dao/tstypes/ui/DaoCard'
import { formatDate } from '@dao-dao/utils'

import { IconButton, IconButtonLink } from '../IconButton'
import { LinkWrapper } from '../LinkWrapper'
import { Tooltip } from '../Tooltip'
import { DaoImage } from './DaoImage'

export * from '@dao-dao/tstypes/ui/DaoCard'

export const DaoCard = ({
  coreAddress,
  name,
  description,
  imageUrl,
  established,
  pinned,
  onPin,
  parentDao,
  lazyData,
  showIsMember = true,
  className,
  onMouseOver,
  onMouseLeave,
}: DaoCardProps) => {
  const { t } = useTranslation()

  return (
    <LinkWrapper
      className={clsx(
        'flex relative flex-col justify-between items-center py-7 px-6 w-full h-[328px] bg-background-secondary hover:bg-background-interactive-hover active:bg-background-interactive-pressed rounded-md ring-1 ring-inset ring-transparent hover:ring-border-interactive-hover active:ring-border-interactive-focus transition-all',
        className
      )}
      href={`/dao/${coreAddress}`}
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
            href={`/dao/${parentDao.coreAddress}`}
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

          {showIsMember && !lazyData.loading && lazyData.data.isMember && (
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
          {removeMarkdown(description)}
        </p>

        <div
          className={clsx(
            'flex flex-row gap-3 items-center mb-2 font-mono caption-text',
            lazyData.loading && 'animate-pulse'
          )}
        >
          <Governance className="w-3 h-4" />
          <p>
            {lazyData.loading
              ? '...'
              : t('format.token', {
                  val: lazyData.data.tokenBalance,
                  tokenSymbol: lazyData.data.tokenSymbol,
                })}
          </p>
        </div>

        <div
          className={clsx(
            'flex flex-row gap-3 items-center font-mono caption-text',
            lazyData.loading && 'animate-pulse'
          )}
        >
          <DaoCardProposals className="w-3 h-4" />
          <p>
            {lazyData.loading
              ? '...'
              : t('info.numProposals', {
                  count: lazyData.data.proposalCount,
                })}
          </p>
        </div>
      </div>
    </LinkWrapper>
  )
}
