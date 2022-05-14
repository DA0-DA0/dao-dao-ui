/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next'
import React, { useState } from 'react'

import { Pie } from '@dao-dao/icons'
import { useWallet, useGovernanceTokenInfo } from '@dao-dao/state'
import { StakingMode, TooltipIcon } from '@dao-dao/ui'

import {
  StakeHeader,
  PageWrapper,
  PageWrapperProps,
  StakingModal,
  makeGetStaticProps,
  Loader,
  SuspenseLoader,
  StakedBalanceCard,
  UnstakedBalanceCard,
  ClaimsList,
  StakeHeaderLoader,
  BalanceCardLoader,
  WalletConnectButton,
} from '@/components'
import { DAO_ADDRESS } from '@/util'

const InnerStake = () => {
  const { connected } = useWallet()
  const { governanceTokenInfo } = useGovernanceTokenInfo(DAO_ADDRESS)

  // Set to default mode to display, and undefined to hide.
  const [showStakingDefaultMode, setShowStakingDefaultMode] =
    useState<StakingMode>()

  if (!governanceTokenInfo) {
    throw new Error('Failed to load page data.')
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex relative flex-col items-center mt-16 bg-primary rounded-b-lg border-t border-inactive lg:mt-32">
          <SuspenseLoader fallback={<StakeHeaderLoader />}>
            <StakeHeader />
          </SuspenseLoader>
        </div>

        <div className="flex flex-row gap-2 items-center text-lg title-text">
          <Pie color="rgb(var(--dark))" height={22} width={22} />
          <p>Your Tokens</p>
        </div>

        {connected ? (
          <>
            <div className="flex flex-col gap-4 justify-start items-stretch !mt-4 lg:flex-row">
              <div className="flex-1 p-6 rounded-lg border border-default">
                <p className="mb-2 font-mono text-sm text-tertiary">
                  Balance (unstaked {governanceTokenInfo.name})
                </p>

                <SuspenseLoader fallback={<BalanceCardLoader />}>
                  <UnstakedBalanceCard
                    setShowStakingMode={() =>
                      setShowStakingDefaultMode(StakingMode.Stake)
                    }
                  />
                </SuspenseLoader>
              </div>

              <div className="flex-1 p-6 rounded-lg border border-default">
                <p className="flex gap-2 mb-2 font-mono text-sm text-tertiary">
                  <span>
                    Voting power (staked {governanceTokenInfo.name} + rewards)
                  </span>
                  <TooltipIcon label="This will automatically compound as staking rewards are distributed." />
                </p>

                <SuspenseLoader fallback={<BalanceCardLoader />}>
                  <StakedBalanceCard
                    setShowStakingMode={() =>
                      setShowStakingDefaultMode(StakingMode.Unstake)
                    }
                  />
                </SuspenseLoader>
              </div>
            </div>

            <SuspenseLoader
              fallback={
                <>
                  <p className="text-lg title-text">
                    Unstaking {governanceTokenInfo.name} tokens
                  </p>
                  <Loader />
                </>
              }
            >
              <ClaimsList
                showClaim={() => setShowStakingDefaultMode(StakingMode.Claim)}
              />
            </SuspenseLoader>
          </>
        ) : (
          <WalletConnectButton />
        )}
      </div>

      {showStakingDefaultMode !== undefined && (
        <StakingModal
          defaultMode={showStakingDefaultMode}
          onClose={() => setShowStakingDefaultMode(undefined)}
        />
      )}
    </>
  )
}

const StakePage: NextPage<PageWrapperProps> = ({ children: _, ...props }) => (
  <PageWrapper {...props}>
    <InnerStake />
  </PageWrapper>
)

export default StakePage

export const getStaticProps = makeGetStaticProps()
