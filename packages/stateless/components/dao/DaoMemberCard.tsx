import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { EntityType } from '@dao-dao/types'
import { DaoMemberCardProps } from '@dao-dao/types/components/DaoMemberCard'
import { formatPercentOf100 } from '@dao-dao/utils'

import { useDaoNavHelpers } from '../../hooks'
import { ButtonLink } from '../buttons'
import { CopyableAddress } from '../CopyableAddress'
import { ProfileImage } from '../profile'

export const DaoMemberCard = ({
  address,
  balance,
  votingPowerPercent,
  loadingEntity,
}: DaoMemberCardProps) => {
  const { t } = useTranslation()
  const { getDaoPath } = useDaoNavHelpers()

  const title = (
    <p
      className={clsx(
        'title-text text-text-body',
        (loadingEntity.loading || loadingEntity.updating) && 'animate-pulse'
      )}
    >
      {loadingEntity.loading ||
      (loadingEntity.updating && !loadingEntity.data.name)
        ? '...'
        : loadingEntity.data.name}
    </p>
  )

  return (
    <div className="flex flex-col justify-between rounded-md border border-border-primary">
      <div className="flex flex-col items-center px-6 pt-10 pb-8">
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
        <div className="mt-4 mb-2 flex flex-row items-center gap-2">
          {!loadingEntity.loading &&
          loadingEntity.data.type === EntityType.Dao ? (
            <ButtonLink href={getDaoPath(address)} size="none" variant="none">
              {title}
            </ButtonLink>
          ) : (
            title
          )}
        </div>

        {/* Address */}
        <CopyableAddress address={address} />
      </div>

      <div className="flex flex-col gap-2 border-t border-border-interactive-disabled p-4">
        {/* Voting power */}
        <div className="flex flex-row flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <p className="secondary-text">{t('title.votingPower')}</p>

          <p
            className={clsx(
              'body-text font-mono',
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
          <p className="secondary-text text-text-tertiary">{balance.label}</p>
          <p
            className={clsx(
              'caption-text font-mono',
              balance.value.loading && 'animate-pulse'
            )}
          >
            {balance.value.loading
              ? '...'
              : balance.value.data + (balance.unit ? ' ' + balance.unit : '')}
          </p>
        </div>
      </div>
    </div>
  )
}
