import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { CheckIcon } from '@heroicons/react/outline'
import { X } from '@dao-dao/icons'

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
    ? t('profile.member.memberOf', { daoName })
    : t('profile.notMember.notAMember')
  const Icon = isMember ? CheckIcon : X

  return (
    <div
      className={clsx(
        'link-text',
        ghost
          ? 'text-text-secondary caption-text'
          : 'flex flex-row gap-2 items-center py-1 px-[10px] rounded-full border-2 border-border-primary',
        !isMember && 'text-text-interactive-disabled'
      )}
    >
      <div className="shrink-0">{text}</div>
      {!ghost && <Icon className="w-[16px]" />}
    </div>
  )
}
