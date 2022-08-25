import { useTranslation } from 'react-i18next'

import { Button } from '../Button'
import {
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

import { ProfileCardWrapper } from './ProfileCardWrapper'

// Represents a tranch of tokens that is currently unstaking and will become
// available at some well-known later date.
export interface UnstakingTokensTranch {
  tokenSymbol: string
  unstakingTokens: number
  available: Date
}

export interface ProfileMemberCardProps {
  votingPower: number
  daoName: string
  walletName: string
  profileImgUrl: string
  tokenSymbol: string
  stakedTokens: number
  tokenDecimals: number
  unstakingTokensTranches: UnstakingTokensTranch[]
  unstakedTokens: number
}

export const ProfileMemberCard = ({
  votingPower,
  daoName,
  walletName,
  profileImgUrl,
  tokenSymbol,
  stakedTokens,
  tokenDecimals,
  unstakingTokensTranches,
  unstakedTokens,
}: ProfileMemberCardProps) => {
  const { t } = useTranslation()
 // TODO translate titles
  return (
    <ProfileCardWrapper
      childContainerClassName="p-0 border-t-0"
      daoName={daoName}
      imgUrl={profileImgUrl}
      isMember
      walletName={walletName}
    >

      <div className = "py-3 px-6 border-t border-t-border-primary">
        <div className="flex flex-row justify-between items-center pb-3 text-xs text-bold">
          <p>Contribution</p>
        </div>

        <div className="flex flex-row justify-between items-center secondary-text pb-3">
          <p>Staked tokens</p>
          <p className="font-mono text-text-primary">
          {stakedTokens.toLocaleString(undefined, {
            maximumFractionDigits: tokenDecimals,
          })}{' '} ${tokenSymbol}</p>
        </div>

        <div className="flex flex-row justify-between items-center secondary-text pb-3">
          <p>{t('title.votingPower')}</p>
          <p className="font-mono text-text-primary">{votingPower}%</p>
        </div>

        <div className="flex flex-row justify-between items-center secondary-text pb-3">
          <p>Unstaking tokens</p>
          <p className="font-mono text-text-primary">1 tranch</p>
        </div>

        <div className="flex flex-row justify-between items-center pb-6">
          <p className="secondary-text">Available tokens</p>
          <p className="font-mono text-xs text-icon-interactive-valid">
          {unstakedTokens.toLocaleString(undefined, {
            maximumFractionDigits: tokenDecimals,
          })}{' '} ${tokenSymbol}</p>
        </div>

        <Button
          className="mb-2 w-full"
          contentContainerClassName="justify-center"
          size="lg"
          variant="primary"
        >
          {`Claim your ${unstakedTokens.toLocaleString(undefined, {
            maximumFractionDigits: tokenDecimals,
          })} $${tokenSymbol}` }
        </Button>

        <Button
          className="mb-0 w-full"
          contentContainerClassName="justify-center primary-text"
          size="lg"
          variant="secondary"
        >
         {`Manage $${tokenSymbol} stake`}
        </Button>
      </div>

      <div className = "py-3 px-6 border-t border-t-border-primary">
        <Button
          className='w-full'
          contentContainerClassName="justify-center primary-text"
          size="lg"
          variant="secondary"
        >
         Open proposals
        </Button>
      </div>

    </ProfileCardWrapper>
  )
}
