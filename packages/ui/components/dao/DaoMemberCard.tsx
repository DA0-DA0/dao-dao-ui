import { useTranslation } from 'react-i18next'

import { formatPercentOf100 } from '@dao-dao/utils'

import { CopyToClipboardUnderline } from 'components/CopyToClipboard'
import { ProfileImage } from 'components/profile'

export interface DaoMemberCardProps {
  imageUrl?: string
  name: string
  address: string
  votingPowerPercent: number
}

export const DaoMemberCard = ({
  imageUrl,
  name,
  address,
  votingPowerPercent,
}: DaoMemberCardProps) => {
  const { t } = useTranslation()

  return (
    <div className="rounded-md border border-border-primary">
      <div className="flex flex-col items-center px-4 pt-10 pb-8 border-b border-border-interactive-disabled">
        {/* Image */}
        <ProfileImage imageUrl={imageUrl} size="lg" />
        {/* Name */}
        <p className="mt-4 mb-1 text-text-body title-text">@{name}</p>
        {/* Address */}
        <div className="flex flex-row gap-1 items-center">
          <p className="font-mono text-base italic text-text-tertiary">#</p>

          <CopyToClipboardUnderline
            className="text-text-tertiary"
            takeStartEnd={{
              start: 7,
              end: 14,
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
