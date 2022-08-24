import { useTranslation } from 'react-i18next'

import { ArrowOutward } from '@dao-dao/icons'

import { Button } from '../Button'
import { ProfileCardWrapper } from './ProfileCardWrapper'

export interface ProfileNotMemberCardProps {
  tokenSymbol: string
  tokenBalance: number
  daoName: string
  walletName: string
  profileImgUrl: string
  established: Date
}

export const ProfileNotMemberCard = ({
  tokenSymbol,
  tokenBalance,
  daoName,
  walletName,
  profileImgUrl,
  established,
}: ProfileNotMemberCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      daoName={daoName}
      established={established}
      imgUrl={profileImgUrl}
      isMember={false}
      walletName={walletName}
    >
      <div className="link-text">{t('profile.notMember.membership')}</div>
      <p className="pt-1 pb-3 secondary-text">
        {t('profile.notMember.stakeYourTokens', { tokenSymbol, daoName })}
      </p>
      <div className="flex flex-row justify-between pb-7 secondary-text">
        <div>{t('profile.notMember.yourHoldings')}</div>
        <div className="font-mono text-text-interactive-disabled">
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
        <ArrowOutward height="0.625rem" width="0.625rem" />
      </Button>
    </ProfileCardWrapper>
  )
}
