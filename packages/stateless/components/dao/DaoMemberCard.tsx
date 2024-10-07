import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { EntityType } from '@dao-dao/types'
import { DaoMemberCardProps } from '@dao-dao/types/components/DaoMemberCard'
import { abbreviateAddress, formatPercentOf100 } from '@dao-dao/utils'

import { useDaoNavHelpers } from '../../hooks'
import { ButtonLink } from '../buttons'
import { CopyToClipboard } from '../CopyToClipboard'
import { ProfileImage } from '../profile'
import { TokenAmountDisplay } from '../token'

export const DaoMemberCard = ({
  address,
  balance,
  balanceLabel,
  votingPowerPercent,
  loadingEntity,
}: DaoMemberCardProps) => {
  const { t } = useTranslation()
  const { getDaoPath } = useDaoNavHelpers()

  const loadingOrHasName =
    loadingEntity.loading ||
    (loadingEntity.updating && !loadingEntity.data.name) ||
    loadingEntity.data.name

  const title = loadingOrHasName ? (
    <p
      className={clsx(
        'title-text text-text-body !text-base',
        (loadingEntity.loading || loadingEntity.updating) && 'animate-pulse'
      )}
    >
      {loadingEntity.loading ||
      (loadingEntity.updating && !loadingEntity.data.name)
        ? '...'
        : loadingEntity.data.name}
    </p>
  ) : (
    <p className="title-text text-text-tertiary !text-base truncate">
      {abbreviateAddress(address)}
    </p>
  )

  return (
    <div className="flex flex-col justify-between rounded-md border border-border-primary">
      <div className="flex flex-col items-center p-4 gap-2">
        {/* Image */}
        <ProfileImage
          imageUrl={
            loadingEntity.loading ? undefined : loadingEntity.data.imageUrl
          }
          loading={loadingEntity.loading || loadingEntity.updating}
          rounded={
            !loadingEntity.loading &&
            loadingEntity.data.type !== EntityType.Wallet
          }
          size="lg"
        />

        {/* Name */}
        <div className="flex flex-row gap-2 items-center">
          {!loadingEntity.loading &&
          loadingEntity.data.type === EntityType.Dao ? (
            <ButtonLink href={getDaoPath(address)} size="none" variant="none">
              {title}
            </ButtonLink>
          ) : (
            title
          )}

          {!loadingEntity.loading &&
            loadingEntity.data.type !== EntityType.Dao && (
              <CopyToClipboard
                iconClassName={
                  loadingOrHasName ? undefined : '!text-icon-tertiary'
                }
                iconSize="sm"
                textClassName="hidden"
                tooltip={t('button.copyAddressToClipboard')}
                value={address}
              />
            )}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-border-interactive-disabled p-4">
        {/* Voting power */}
        <div className="flex flex-row flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <p className="caption-text">{t('title.votingPower')}</p>

          <p
            className={clsx(
              'body-text font-mono text-text-brand-secondary font-semibold',
              votingPowerPercent.loading && 'animate-pulse'
            )}
          >
            {votingPowerPercent.loading
              ? '...'
              : formatPercentOf100(votingPowerPercent.data)}
          </p>
        </div>

        {/* Balance */}
        <div className="flex flex-row flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <p className="caption-text">{balanceLabel}</p>

          <TokenAmountDisplay
            amount={balance.loading ? { loading: true } : balance.data.amount}
            className="caption-text font-mono"
            decimals={
              balance.loading || !balance.data.token
                ? 0
                : balance.data.token.decimals
            }
            hideSymbol={!balance.loading && !balance.data.token}
            symbol={balance.loading ? '...' : balance.data.token?.symbol || ''}
          />
        </div>
      </div>
    </div>
  )
}
