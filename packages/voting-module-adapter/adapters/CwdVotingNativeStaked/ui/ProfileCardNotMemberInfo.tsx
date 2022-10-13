import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { BaseProfileCardNotMemberInfoProps } from '@dao-dao/tstypes'
import { Button, TokenAmountDisplay } from '@dao-dao/ui'

export interface ProfileCardNotMemberInfoProps
  extends BaseProfileCardNotMemberInfoProps {
  tokenSymbol: string
  tokenDecimals: number
  unstakedTokenBalance: number
  stakedTokenBalance: number
  daoName: string
  onStake: () => void
}

export const ProfileCardNotMemberInfo = ({
  tokenSymbol,
  tokenDecimals,
  unstakedTokenBalance,
  stakedTokenBalance,
  daoName,
  onStake,
  proposalContext,
}: ProfileCardNotMemberInfoProps) => {
  const { t } = useTranslation()

  return (
    <>
      <p className="mb-3 secondary-text">
        {/* If currently has staked tokens but cannot vote (since this info is shown when they cannot vote and instructs them how to become a member), this means they did not have voting power at the time of proposal creation. Show proposal-specific message when in a proposal. */}
        {stakedTokenBalance > 0 && proposalContext
          ? t('info.tokenDaoNotMemberInfoProposal', { tokenSymbol, daoName })
          : t('info.stakeYourTokensToJoin', { tokenSymbol, daoName })}
      </p>

      <div className="flex flex-row justify-between items-start mb-7 secondary-text">
        <p>{t('info.yourBalance')}</p>
        <div className="flex flex-col gap-1 items-end">
          <TokenAmountDisplay
            amount={unstakedTokenBalance}
            className={clsx('font-mono text-right', {
              'text-text-interactive-disabled': unstakedTokenBalance === 0,
            })}
            maxDecimals={tokenDecimals}
            symbol={tokenSymbol}
          />

          <TokenAmountDisplay
            amount={stakedTokenBalance}
            className={clsx('font-mono text-right', {
              'text-text-interactive-disabled': stakedTokenBalance === 0,
            })}
            maxDecimals={tokenDecimals}
            suffix={` ${t('info.staked')}`}
            symbol={tokenSymbol}
          />
        </div>
      </div>

      <Button
        className="mb-2 w-full"
        contentContainerClassName="justify-center"
        disabled={unstakedTokenBalance === 0}
        onClick={onStake}
        size="lg"
        variant={unstakedTokenBalance > 0 ? 'primary' : 'secondary'}
      >
        {t('button.stakeTokenSymbol', { tokenSymbol })}
      </Button>
    </>
  )
}
