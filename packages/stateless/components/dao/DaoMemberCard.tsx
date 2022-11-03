import { Tag } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { DaoMemberCardProps } from '@dao-dao/types/components/DaoMemberCard'
import { formatPercentOf100 } from '@dao-dao/utils'

import { CopyToClipboardUnderline } from '../CopyToClipboard'
import { ProfileImage } from '../profile'

export const DaoMemberCard = ({
  address,
  votingPowerPercent,
  profile,
}: DaoMemberCardProps) => {
  const { t } = useTranslation()

  return (
    <div className="border-border-primary flex flex-col justify-between rounded-md border">
      <div className="flex flex-col items-center px-4 pt-10 pb-8">
        {/* Image */}
        <ProfileImage
          imageUrl={profile.loading ? undefined : profile.data.imageUrl}
          loading={profile.loading}
          size="lg"
        />
        {/* Name */}
        <p
          className={clsx(
            'title-text text-text-body mt-4 mb-1',
            profile.loading && 'animate-pulse'
          )}
        >
          {profile.loading ? '...' : profile.data.name}
        </p>
        {/* Address */}
        <div className="flex flex-row items-center gap-1">
          <Tag className="text-icon-tertiary !h-5 !w-5" />

          <CopyToClipboardUnderline
            className="!text-text-tertiary text-sm"
            takeStartEnd={{
              start: 12,
              end: 8,
            }}
            value={address}
          />
        </div>
      </div>

      <div className="border-border-interactive-disabled flex flex-row items-center justify-between gap-4 border-t p-4">
        {/* Voting power */}
        <p className="secondary-text">{t('title.votingPower')}</p>
        <p className="symbol-small-body-text font-mono">
          {formatPercentOf100(votingPowerPercent)}
        </p>
      </div>
    </div>
  )
}
