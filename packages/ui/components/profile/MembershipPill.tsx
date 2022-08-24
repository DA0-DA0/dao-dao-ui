import { useTranslation } from 'react-i18next'

import { MemberCheck, X } from '@dao-dao/icons'

export interface MembershipPillProps {
  isMember: boolean
  daoName: string
}
export const MembershipPill = ({ isMember, daoName }: MembershipPillProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={`flex flex-row gap-2 items-center py-1 px-[10px] rounded-full border-2 border-border-primary link-text ${
        isMember ? '' : 'text-text-interactive-disabled'
      }`}
    >
      {isMember && (
        <div className="shrink-0">{t('profile.member.memberOf')}</div>
      )}
      {isMember && <MemberCheck className="w-[16px]" />}
      {!isMember && (
        <div className="shrink-0">
          {t('profile.notMember.notAMember', { daoName })}
        </div>
      )}
      {!isMember && <X className="w-[16px]" />}
    </div>
  )
}
