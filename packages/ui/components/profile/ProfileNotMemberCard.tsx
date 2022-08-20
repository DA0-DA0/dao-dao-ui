import { useTranslation } from 'react-i18next'

import { ArrowUpRight, MemberCheck, X } from '@dao-dao/icons'

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
    <div
      className={`flex flex-row gap-2 items-center py-1 px-[10px] rounded-full border-2 border-default link-text ${
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
    <div className="flex flex-col justify-center items-center pt-10 rounded-lg border-2 border-border-primary">
      <div
        className="w-[64px] h-[64px] bg-center rounded-full"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
      <div className="pt-6 title-text">{walletName}</div>
      <div className="py-2 mb-4 font-mono caption-text">
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
      <div className="flex flex-col items-stretch p-6 mt-7 border-t border-t-border-primary">
        <div className="link-text text-text-body">
          {t('profile.notMember.membership')}
        </div>
        <p className="pt-1 pb-3 secondary-text">
          {t('profile.notMember.stakeYourTokens', { tokenSymbol, daoName })}
        </p>
        <div className="flex flex-row justify-between pb-7 secondary-text">
          <div>{t('profile.notMember.yourHoldings')}</div>
          <div className="font-mono">
            {t('format.token', { val: tokenBalance, tokenSymbol })}
          </div>
        </div>
        <Button
          className="mb-2"
          contentContainerClassName="justify-center primary-text"
          disabled={true}
          size="lg"
          variant="secondary"
        >
          {t('profile.notMember.stakeToken', { tokenSymbol })}
        </Button>
        <Button
          contentContainerClassName="justify-center primary-text"
          size="lg"
          variant="secondary"
        >
          {t('profile.notMember.getTokens')}
          <ArrowUpRight />
        </Button>
      </div>
    </ProfileCard>
  )
}
