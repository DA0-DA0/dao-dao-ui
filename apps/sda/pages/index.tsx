/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react'

import type { NextPage } from 'next'

import { Pie } from '@dao-dao/icons'
import { useWallet } from '@dao-dao/state'
import { StakingMode } from '@dao-dao/ui'

import {
  TokenomicsHeader,
  PageWrapper,
  PageWrapperProps,
  StakingModal,
  makeGetStaticProps,
  Loader,
  SuspenseLoader,
  StakedBalanceCard,
  UnstakedBalanceCard,
  ClaimsList,
  TokenomicsHeaderLoader,
  BalanceCardLoader,
  WalletConnectButton,
} from '@/components'
import { useGovernanceTokenInfo } from '@/hooks'

const InnerTokenomics = () => {
  const { connected } = useWallet()
  const { governanceTokenInfo } = useGovernanceTokenInfo()

  // Set to default mode to display, and undefined to hide.
  const [showStakingDefaultMode, setShowStakingDefaultMode] =
    useState<StakingMode>()

  if (!governanceTokenInfo) {
    throw new Error('Failed to load page data.')
  }

  return (
    <>
      <div className="p-8 mx-auto space-y-8 max-w-page">
        <div className="flex relative flex-col items-center mt-14 bg-primary rounded-b-lg border-t border-inactive">
          <SuspenseLoader fallback={<TokenomicsHeaderLoader />}>
            <TokenomicsHeader />
          </SuspenseLoader>
        </div>

        <div className="flex flex-row gap-2 items-center text-lg title-text">
          <Pie color="rgb(var(--dark))" height={22} width={22} />
          <p>Your Tokens</p>
        </div>

        {connected ? (
          <>
            <div className="flex flex-col gap-4 justify-start items-stretch !mt-4 lg:flex-row">
              <div className="flex-1 p-6 bg-very-light rounded-lg border border-default">
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

              <div className="flex-1 p-6 bg-very-light rounded-lg border border-default">
                <p className="mb-2 font-mono text-sm text-tertiary">
                  Voting power (staked {governanceTokenInfo.name})
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

const TokenomicsPage: NextPage<PageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <PageWrapper {...props}>
    <InnerTokenomics />
  </PageWrapper>
)

export default TokenomicsPage

export const getStaticProps = makeGetStaticProps()
