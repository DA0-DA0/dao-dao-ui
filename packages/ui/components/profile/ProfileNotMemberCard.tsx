import { useTranslation } from 'react-i18next'

import { ArrowUpRight } from '@dao-dao/icons'

import { Button } from '../Button'
import { ProfileCardTemplate } from './ProfileCardTemplate'

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
    <ProfileCardTemplate
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
    </ProfileCardTemplate>
  )
}
