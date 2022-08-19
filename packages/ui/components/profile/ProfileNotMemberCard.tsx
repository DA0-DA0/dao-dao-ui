import { XIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { MemberCheck } from '@dao-dao/icons'

import { Button } from '../Button'

export interface ProfileCardMembershipStatusProps {
  isMember: boolean
  daoName: string
}
const ProfileCardMembershipStatus = ({
  isMember,
  daoName,
}: ProfileCardMembershipStatusProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row gap-2 items-center p-2 mb-6 rounded-full border border-width-2 border-default">
      {isMember && (
        <div className="shrink-0">{t('profile.member.memberOf')}</div>
      )}
      {isMember && <MemberCheck className="w-[16px]" />}
      {!isMember && (
        <div className="shrink-0">
          {t('profile.notMember.notAMember', { daoName })}
        </div>
      )}
      {!isMember && <XIcon className="w-[16px]" />}
    </div>
  )
}

export interface ProfileCardProps {
  children: any
  imgUrl: string
  walletName: string
  dateEstablished: Date
  isMember: boolean
  daoName: string
}
const ProfileCard = ({
  children,
  imgUrl,
  walletName,
  dateEstablished,
  isMember,
  daoName,
}: ProfileCardProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-center items-center pt-8 rounded-lg border border-default">
      <div
        className="w-[64px] h-[64px] bg-center rounded-full"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
      <div className="pt-4 primary-text">{walletName}</div>
      <div className="py-2 mb-2 secondary-text">
        {t('profile.est')}
        {new Intl.DateTimeFormat('default', {
          month: 'long',
          day: undefined,
          year: 'numeric',
        }).format(dateEstablished)}
      </div>
      <ProfileCardMembershipStatus daoName={daoName} isMember={isMember} />
      {children}
    </div>
  )
}

export interface ProfileNotMemberCardProps {
  tokenSymbol: string
  tokenBalance: number
  daoName: string
  walletName: string
  profileImgUrl: string
  dateEstablished: Date
}
export const ProfileNotMemberCard = ({
  tokenSymbol,
  tokenBalance,
  daoName,
  walletName,
  profileImgUrl,
  dateEstablished,
}: ProfileNotMemberCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCard
      daoName={daoName}
      dateEstablished={dateEstablished}
      imgUrl={profileImgUrl}
      isMember={false}
      walletName={walletName}
    >
      <div className="p-6 border-t border-t-default">
        <div className="body-text">{t('profile.notMember.membership')}</div>
        <p className="py-2 secondary-text">
          {t('profile.notMember.stakeYourTokens', { tokenSymbol, daoName })}
        </p>
        <div className="flex flex-row justify-between pb-4 secondary-text">
          <div>{t('profile.notMember.yourHoldings')}</div>
          <div className="font-mono">
            {t('format.token', { val: tokenBalance, tokenSymbol })}
          </div>
        </div>
        <Button className="mb-2 w-full" disabled={true}>
          {t('profile.notMember.stakeToken', { tokenSymbol })}
        </Button>
        <Button className="w-full">{t('profile.notMember.getTokens')}</Button>
      </div>
    </ProfileCard>
  )
}
