import { Check, Close } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

export interface MembershipPillProps {
  isMember: boolean
  daoName: string
  // Only display text.
  ghost?: boolean
}

export const MembershipPill = ({
  isMember,
  daoName,
  ghost,
}: MembershipPillProps) => {
  const { t } = useTranslation()

  const text = isMember
    ? t('title.memberOfDao', { daoName })
    : t('title.notAMember')
  const Icon = isMember ? Check : Close

  return (
    <div
      className={clsx(
        'link-text max-w-full',
        ghost
          ? 'caption-text text-text-secondary'
          : 'border-border-primary flex flex-row items-center gap-2 rounded-full border-2 py-1 px-[10px]',
        !isMember && 'text-text-interactive-disabled'
      )}
    >
      <p className="truncate">{text}</p>
      {!ghost && <Icon className="!h-4 !w-4 shrink-0" />}
    </div>
  )
}
