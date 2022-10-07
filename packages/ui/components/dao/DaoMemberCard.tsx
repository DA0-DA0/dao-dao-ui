import { Tag } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { DaoMemberCardProps } from '@dao-dao/tstypes/ui/DaoMemberCard'
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
    <div className="rounded-md border border-border-primary">
      <div className="flex flex-col items-center px-4 pt-10 pb-8 border-b border-border-interactive-disabled">
        {/* Image */}
        <ProfileImage
          imageUrl={profile.loading ? undefined : profile.data.imageUrl}
          loading={profile.loading}
          size="lg"
        />
        {/* Name */}
        <p
          className={clsx(
            'mt-4 mb-1 text-text-body title-text',
            profile.loading && 'animate-pulse'
          )}
        >
          {profile.loading ? '...' : profile.data.name}
        </p>
        {/* Address */}
        <div className="flex flex-row gap-1 items-center">
          <Tag className="!w-5 !h-5 text-icon-tertiary" />

          <CopyToClipboardUnderline
            className="text-sm !text-text-tertiary"
            takeStartEnd={{
              start: 12,
              end: 8,
            }}
            value={address}
          />
        </div>
      </div>

      <div className="flex flex-row gap-4 justify-between items-center p-4">
        {/* Voting power */}
        <p className="secondary-text">{t('title.votingPower')}</p>
        <p className="font-mono symbol-small-body-text">
          {formatPercentOf100(votingPowerPercent)}
        </p>
      </div>
    </div>
  )
}
