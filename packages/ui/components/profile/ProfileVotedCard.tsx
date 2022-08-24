import { useTranslation } from 'react-i18next'

import {
  ProposalYourVote,
  ProposalYourVoteProps,
} from '../proposal/ProposalYourVote'
import { ProfileCardWrapper } from './ProfileCardWrapper'

export interface ProfileVotedCardProps {
  votingPower: number
  daoName: string
  walletName: string
  profileImgUrl: string
  vote: ProposalYourVoteProps['variant']
}

export const ProfileVotedCard = ({
  votingPower,
  daoName,
  walletName,
  profileImgUrl,
  vote,
}: ProfileVotedCardProps) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      compact
      daoName={daoName}
      imgUrl={profileImgUrl}
      isMember
      walletName={walletName}
    >
      <div className="flex flex-row justify-between items-center secondary-text">
        <p>{t('title.votingPower')}</p>
        <p className="font-mono text-text-primary">{votingPower}%</p>
      </div>

      <div className="flex flex-row justify-between items-center mt-3 secondary-text">
        <p>{t('title.vote')}</p>
        <ProposalYourVote variant={vote} />
      </div>
    </ProfileCardWrapper>
  )
}
