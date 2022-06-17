import { HandIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { FC, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { ConnectWalletButton, StakingModal } from '@dao-dao/common'
import i18n, { Trans } from '@dao-dao/i18n'
import {
  stakingLoadingAtom,
  useGovernanceTokenInfo,
  useStakingInfo,
  useWallet,
} from '@dao-dao/state'
import {
  BalanceCard,
  BalanceIcon,
  StakingMode,
  SuspenseLoader,
} from '@dao-dao/ui'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { ClaimsPendingList } from './ClaimsPendingList'
import { useDAOInfoContext } from './DAOPageWrapper'
import { Loader } from './Loader'

const InnerCw20StakedBalanceVotingPowerDisplay: FC = () => {
  const { coreAddress, name } = useDAOInfoContext()
  const {
    governanceTokenInfo,
    governanceTokenMarketingInfo,
    walletBalance: unstakedGovTokenBalance,
  } = useGovernanceTokenInfo(coreAddress, { fetchWalletBalance: true })
  const {
    walletStakedValue,
    totalStakedValue,
    blockHeight,
    sumClaimsAvailable,
  } = useStakingInfo(coreAddress, {
    fetchWalletStakedValue: true,
    fetchTotalStakedValue: true,
    fetchClaims: true,
  })

  const { connected, refreshBalances } = useWallet()

  // Set to a StakingMode to display modal.
  const [showStakingMode, setShowStakingMode] = useState<StakingMode>()
  const stakingLoading = useRecoilValue(stakingLoadingAtom)

  if (!governanceTokenInfo || blockHeight === undefined) {
    throw new Error('Failed to load data.')
  }

  if (
    !connected ||
    unstakedGovTokenBalance === undefined ||
    walletStakedValue === undefined ||
    totalStakedValue === undefined
  ) {
    return <ConnectWalletButton />
  }

  const tokenImageUrl =
    !!governanceTokenMarketingInfo?.logo &&
    governanceTokenMarketingInfo.logo !== 'embedded' &&
    'url' in governanceTokenMarketingInfo.logo
      ? governanceTokenMarketingInfo.logo.url
      : undefined

  return (
    <>
      <div className="flex flex-col gap-2 items-stretch">
        {unstakedGovTokenBalance > 0 && walletStakedValue === 0 && (
          <BalanceCard
            buttonLabel={i18n.t('Stake tokens')}
            icon={<PlusSmIcon className="w-4 h-4" />}
            loading={stakingLoading}
            onClick={() => setShowStakingMode(StakingMode.Stake)}
            title={i18n.t('You are not a member yet!', { daoName: name })}
          >
            <p className="body-text">
              <Trans i18nKey="stakeTokensToJoin">
                Stake your{' '}
                <span className="font-bold">
                  {{
                    amount: convertMicroDenomToDenomWithDecimals(
                      unstakedGovTokenBalance,
                      governanceTokenInfo.decimals
                    ).toLocaleString(undefined, {
                      maximumFractionDigits: governanceTokenInfo.decimals,
                    }),
                  }}{' '}
                  ${{ tokenSymbol: governanceTokenInfo.symbol }}
                </span>{' '}
                to join and vote in {{ daoName: name }}.
              </Trans>
            </p>
          </BalanceCard>
        )}
        {walletStakedValue > 0 && (
          <BalanceCard
            buttonLabel={i18n.t('Unstake tokens')}
            icon={<MinusSmIcon className="w-4 h-4" />}
            loading={stakingLoading}
            onClick={() => setShowStakingMode(StakingMode.Unstake)}
            title={i18n.t('You are a member!', { daoName: name })}
          >
            <p className="body-text">
              <Trans i18nKey="votingPowerStakedTokens">
                Your voting power is{' '}
                <span className="font-bold">
                  {{
                    powerPercent: (totalStakedValue
                      ? (walletStakedValue / totalStakedValue) * 100
                      : 0
                    ).toLocaleString(undefined, {
                      maximumSignificantDigits: 4,
                    }),
                  }}
                  %
                </span>{' '}
                (
                <span className="font-bold">
                  {{
                    amount: convertMicroDenomToDenomWithDecimals(
                      walletStakedValue,
                      governanceTokenInfo.decimals
                    ).toLocaleString(undefined, {
                      maximumFractionDigits: governanceTokenInfo.decimals,
                    }),
                  }}{' '}
                  ${{ tokenSymbol: governanceTokenInfo.symbol }}
                </span>
                ).
              </Trans>
            </p>
          </BalanceCard>
        )}
        {walletStakedValue > 0 && unstakedGovTokenBalance > 0 && (
          <BalanceCard
            buttonLabel={i18n.t('Stake tokens')}
            icon={<PlusSmIcon className="w-4 h-4" />}
            loading={stakingLoading}
            onClick={() => setShowStakingMode(StakingMode.Stake)}
            title={i18n.t('You could have more voting power')}
          >
            <p className="body-text">
              <Trans i18nKey="stakeRemainingForVotingPower">
                Stake your{' '}
                <span className="font-bold">
                  remaining{' '}
                  {{
                    amount: convertMicroDenomToDenomWithDecimals(
                      unstakedGovTokenBalance,
                      governanceTokenInfo.decimals
                    ).toLocaleString(undefined, {
                      maximumFractionDigits: governanceTokenInfo.decimals,
                    }),
                  }}{' '}
                  ${{ tokenSymbol: governanceTokenInfo.symbol }}
                </span>{' '}
                to gain voting power in {{ daoName: name }}.
              </Trans>
            </p>
          </BalanceCard>
        )}
        {!!sumClaimsAvailable && (
          <BalanceCard
            buttonLabel={i18n.t('Claim tokens')}
            icon={<HandIcon className="w-4 h-4" />}
            loading={stakingLoading}
            onClick={() => setShowStakingMode(StakingMode.Claim)}
            title={i18n.t('Your tokens have unstaked', {
              tokenSymbol: governanceTokenInfo.symbol,
            })}
          >
            <div className="flex flex-row flex-wrap gap-2 items-center primary-text">
              <BalanceIcon iconURI={tokenImageUrl} />
              {convertMicroDenomToDenomWithDecimals(
                sumClaimsAvailable,
                governanceTokenInfo.decimals
              ).toLocaleString(undefined, {
                maximumFractionDigits: governanceTokenInfo.decimals,
              })}{' '}
              ${governanceTokenInfo.symbol}
            </div>
          </BalanceCard>
        )}
      </div>

      <ClaimsPendingList onClaimAvailable={refreshBalances} />

      {showStakingMode !== undefined && (
        <StakingModal
          connectWalletButton={<ConnectWalletButton />}
          coreAddress={coreAddress}
          loader={<Loader />}
          mode={showStakingMode}
          onClose={() => setShowStakingMode(undefined)}
        />
      )}
    </>
  )
}

interface Cw20StakedBalanceVotingPowerDisplayProps {
  primaryText?: boolean
}

export const Cw20StakedBalanceVotingPowerDisplay: FC<
  Cw20StakedBalanceVotingPowerDisplayProps
> = ({ primaryText }) => (
  <>
    <h2 className={clsx('mb-2', primaryText ? 'primary-text' : 'title-text')}>
      {i18n.t('Your voting power')}
    </h2>

    <SuspenseLoader fallback={<Loader className="mt-4 h-min" />}>
      <InnerCw20StakedBalanceVotingPowerDisplay />
    </SuspenseLoader>
  </>
)
