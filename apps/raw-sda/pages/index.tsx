import { useWallet } from '@noahsaso/cosmodal'
import type { NextPage } from 'next'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ConnectWalletButton,
  SuspenseLoader,
  useDaoInfoContext,
} from '@dao-dao/common'
import { makeGetDaoStaticProps } from '@dao-dao/common/server'
import { Pie } from '@dao-dao/icons'
import { StakingMode, TooltipIcon } from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import {
  BalanceCardLoader,
  Loader,
  PageWrapper,
  PageWrapperProps,
  StakeHeader,
  StakeHeaderLoader,
  StakedBalanceCard,
  UnstakedBalanceCard,
} from '@/components'
import { DAO_ADDRESS, DEFAULT_IMAGE_URL } from '@/util'

const InnerStake = () => {
  const { t } = useTranslation()
  const { imageUrl } = useDaoInfoContext()
  const { connected } = useWallet()
  const {
    hooks: { useGovernanceTokenInfo },
    components: { StakingModal, ClaimsPendingList },
  } = useVotingModuleAdapter()

  const governanceTokenInfo = useGovernanceTokenInfo?.().governanceTokenInfo
  if (!governanceTokenInfo || !StakingModal || !ClaimsPendingList) {
    throw new Error(t('error.loadingData'))
  }

  // Set to default mode to display, and undefined to hide.
  const [showStakingMode, setShowStakingMode] = useState<StakingMode>()

  return (
    <>
      <div className="space-y-8">
        <div className="flex relative flex-col items-center mt-16 bg-primary rounded-b-lg border-t border-inactive lg:mt-32">
          <SuspenseLoader fallback={<StakeHeaderLoader />}>
            <StakeHeader />
          </SuspenseLoader>
        </div>

        <div className="flex flex-row gap-2 items-center text-lg title-text">
          <Pie height={22} width={22} />
          <p>{t('title.yourTokens')}</p>
        </div>

        {connected ? (
          <>
            <div className="flex flex-col gap-4 justify-start items-stretch !mt-4 lg:flex-row">
              <div className="flex-1 p-6 rounded-lg border border-default">
                <p className="mb-2 font-mono text-sm text-tertiary">
                  {t('title.balanceUnstaked', {
                    name: governanceTokenInfo.name,
                  })}
                </p>

                <SuspenseLoader fallback={<BalanceCardLoader />}>
                  <UnstakedBalanceCard
                    setShowStakingMode={() =>
                      setShowStakingMode(StakingMode.Stake)
                    }
                  />
                </SuspenseLoader>
              </div>

              <div className="flex-1 p-6 rounded-lg border border-default">
                <p className="flex gap-2 mb-2 font-mono text-sm text-tertiary">
                  <span>
                    {t('title.votingPowerStakedAndRewards', {
                      name: governanceTokenInfo.name,
                    })}
                  </span>
                  <TooltipIcon
                    title={t('info.autoCompoundStakingRewardsTooltip')}
                  />
                </p>

                <SuspenseLoader fallback={<BalanceCardLoader />}>
                  <StakedBalanceCard
                    setShowStakingMode={() =>
                      setShowStakingMode(StakingMode.Unstake)
                    }
                  />
                </SuspenseLoader>
              </div>
            </div>

            <SuspenseLoader
              fallback={
                <>
                  <p className="text-lg title-text">
                    {t('title.unstakingNamedTokens', {
                      name: governanceTokenInfo.name,
                    })}
                  </p>
                  <Loader />
                </>
              }
            >
              <ClaimsPendingList
                fallbackImageUrl={imageUrl ?? DEFAULT_IMAGE_URL}
                showClaim={() => setShowStakingMode(StakingMode.Claim)}
              />
            </SuspenseLoader>
          </>
        ) : (
          <ConnectWalletButton />
        )}
      </div>

      {showStakingMode !== undefined && (
        <StakingModal
          mode={showStakingMode}
          onClose={() => setShowStakingMode(undefined)}
        />
      )}
    </>
  )
}

const MembersOrStakePage: NextPage<PageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <PageWrapper {...props}>
    <InnerStake />
  </PageWrapper>
)

export default MembersOrStakePage

export const getStaticProps = makeGetDaoStaticProps({
  coreAddress: DAO_ADDRESS,
})
