import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { Pie } from '@dao-dao/icons'
import { CwCoreSelectors, useGovernanceTokenInfo } from '@dao-dao/state'
import { SuspenseLoader } from '@dao-dao/ui'

import { BaseSdaMembershipPageProps } from '../../../../types'
import { Membership } from '../Membership'
import { ClaimsPendingList } from './ClaimsPendingList'
import { StakeHeader, StakeHeaderLoader } from './StakeHeader'

export const SdaMembershipPage = ({
  coreAddress,
  defaultImageUrl,
  Loader,
}: BaseSdaMembershipPageProps) => {
  const { t } = useTranslation()
  // const { connected } = useWallet()
  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)
  const daoConfig = useRecoilValue(
    CwCoreSelectors.configSelector({ contractAddress: coreAddress })
  )

  // Set to default mode to display, and undefined to hide.

  if (!daoConfig || !governanceTokenInfo) {
    throw new Error('Failed to load page data.')
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex relative flex-col items-center mt-16 rounded-b-lg border-t lg:mt-32 bg-primary border-inactive">
          <SuspenseLoader fallback={<StakeHeaderLoader Loader={Loader} />}>
            <StakeHeader
              coreAddress={coreAddress}
              defaultImageUrl={defaultImageUrl}
            />
          </SuspenseLoader>
        </div>

        <div className="flex flex-row gap-2 items-center text-lg title-text">
          <Pie color="rgb(var(--dark))" height={22} width={22} />
          <p>{t('title.yourTokens')}</p>
        </div>

        <Membership
          ClaimsPendingList={(props) => (
            <ClaimsPendingList
              fallbackImageUrl={daoConfig.image_url ?? defaultImageUrl}
              {...props}
            />
          )}
          coreAddress={coreAddress}
          sdaMode
        />

        {/* {connected ? (
          <>
            <div className="flex flex-col gap-4 justify-start items-stretch !mt-4 lg:flex-row">
              <div className="flex-1 p-6 rounded-lg border border-default">
                <p className="mb-2 font-mono text-sm text-tertiary">
                  {t('title.balanceUnstaked', {
                    name: '$' + governanceTokenInfo.symbol,
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
                <p className="mb-2 font-mono text-sm text-tertiary">
                  {t('title.votingPowerStaked', {
                    name: '$' + governanceTokenInfo.symbol,
                  })}
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
                      name: '$' + governanceTokenInfo.symbol,
                    })}
                  </p>
                  <Loader />
                </>
              }
            >
              <ClaimsList
                showClaim={() => setShowStakingMode(StakingMode.Claim)}
              />
            </SuspenseLoader>
          </>
        ) : (
          <ConnectWalletButton className="!w-auto" />
        )} */}
      </div>

      {/* {showStakingMode !== undefined && (
        <StakingModal
          connectWalletButton={<ConnectWalletButton className="!w-auto" />}
          coreAddress={coreAddress}
          loader={<Loader />}
          mode={showStakingMode}
          onClose={() => setShowStakingMode(undefined)}
        />
      )} */}
    </>
  )
}
