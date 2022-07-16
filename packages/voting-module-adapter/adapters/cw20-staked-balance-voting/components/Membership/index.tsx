import { HandIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import { useWalletManager } from '@noahsaso/cosmodal'
import clsx from 'clsx'
import { ComponentType, FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { ConnectWalletButton, StakingModal } from '@dao-dao/common'
import {
  stakingLoadingAtom,
  useGovernanceTokenInfo,
  useStakingInfo,
} from '@dao-dao/state'
import {
  BalanceCard,
  BalanceIcon,
  Loader,
  StakingMode,
  SuspenseLoader,
} from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
  formatPercentOf100,
} from '@dao-dao/utils'

import { BaseMembershipProps } from '../../../../types'
import { ClaimsPendingList as DefaultClaimsPendingList } from './ClaimsPendingList'

interface MembershipProps extends BaseMembershipProps {
  primaryText?: boolean
  // If displayed in the SDA, we want to hide the title and claim card as
  // well as make the balance cards responsive. This is because it is laid
  // out differently, taking up a full page, and the title and claim are
  // handled separately. See ../SdaMembershipPage/index.tsx
  sdaMode?: boolean
  ClaimsPendingList?: ComponentType<{
    coreAddress: string
    showClaim: () => void
  }>
}

export const Membership = ({ primaryText, ...props }: MembershipProps) => {
  const { t } = useTranslation()

  return (
    <>
      <h2
        className={clsx('mb-4', primaryText ? 'primary-text' : 'title-text', {
          hidden: props.sdaMode,
        })}
      >
        {t('title.yourVotingPower')}
      </h2>

      <SuspenseLoader fallback={<Loader className="mt-4 h-min" />}>
        <InnerMembership {...props} />
      </SuspenseLoader>
    </>
  )
}

const InnerMembership: FC<Omit<MembershipProps, 'primaryText'>> = ({
  coreAddress,
  sdaMode,
  ClaimsPendingList = DefaultClaimsPendingList,
}) => {
  const { t } = useTranslation()
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

  const { connected } = useWalletManager()

  // Set to a StakingMode to display modal.
  const [showStakingMode, setShowStakingMode] = useState<StakingMode>()
  const stakingLoading = useRecoilValue(stakingLoadingAtom)

  if (!connected) {
    return <ConnectWalletButton />
  }

  if (
    !governanceTokenInfo ||
    blockHeight === undefined ||
    unstakedGovTokenBalance === undefined ||
    walletStakedValue === undefined ||
    totalStakedValue === undefined
  ) {
    throw new Error(t('error.loadingData'))
  }

  const tokenImageUrl =
    !!governanceTokenMarketingInfo?.logo &&
    governanceTokenMarketingInfo.logo !== 'embedded' &&
    'url' in governanceTokenMarketingInfo.logo
      ? governanceTokenMarketingInfo.logo.url
      : undefined

  return (
    <>
      <div
        className={clsx('flex flex-col gap-2 items-stretch lg:gap-4', {
          'md:flex-row': sdaMode,
        })}
      >
        {!unstakedGovTokenBalance &&
          !walletStakedValue &&
          !sumClaimsAvailable &&
          !sdaMode && <p className="caption-text">{t('info.notAMember')}</p>}
        {unstakedGovTokenBalance > 0 && walletStakedValue === 0 && (
          <BalanceCard
            buttonLabel={t('button.stakeTokens')}
            icon={<PlusSmIcon className="w-4 h-4" />}
            loading={stakingLoading}
            onClick={() => setShowStakingMode(StakingMode.Stake)}
            opaque
            title={t('info.notAMemberYet')}
          >
            <div className="flex flex-row gap-2 items-center mb-2">
              <BalanceIcon iconURI={tokenImageUrl} />

              <p className="font-bold">
                {convertMicroDenomToDenomWithDecimals(
                  unstakedGovTokenBalance,
                  governanceTokenInfo.decimals
                ).toLocaleString(undefined, {
                  maximumFractionDigits: governanceTokenInfo.decimals,
                })}{' '}
                ${governanceTokenInfo.symbol}
                <span className="ml-1 secondary-text">
                  {t('info.unstaked')}
                </span>
              </p>
            </div>

            <p className="secondary-text">{t('button.stakeToJoinAndVote')}</p>
          </BalanceCard>
        )}
        {walletStakedValue > 0 && (
          <BalanceCard
            buttonLabel={t('button.unstakeTokens')}
            icon={<MinusSmIcon className="w-4 h-4" />}
            loading={stakingLoading}
            onClick={() => setShowStakingMode(StakingMode.Unstake)}
            title={t('title.votingPower')}
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-center">
                <BalanceIcon iconURI={tokenImageUrl} />
                <p className="title-text">
                  {formatPercentOf100(
                    totalStakedValue
                      ? (walletStakedValue / totalStakedValue) * 100
                      : 0
                  )}
                </p>
              </div>

              <p className="ml-6 secondary-text">
                {t('info.tokensStaked', {
                  amount: convertMicroDenomToDenomWithDecimals(
                    walletStakedValue,
                    governanceTokenInfo.decimals
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: governanceTokenInfo.decimals,
                  }),
                  tokenSymbol: governanceTokenInfo.symbol,
                })}
              </p>
            </div>
          </BalanceCard>
        )}
        {!!sumClaimsAvailable && !sdaMode && (
          <BalanceCard
            buttonLabel={t('button.claimTokens')}
            icon={<HandIcon className="w-4 h-4" />}
            loading={stakingLoading}
            onClick={() => setShowStakingMode(StakingMode.Claim)}
            title={t('info.yourTokensUnstaked', {
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
        {walletStakedValue > 0 && unstakedGovTokenBalance > 0 && (
          <BalanceCard
            buttonLabel={t('button.stakeTokens')}
            icon={<PlusSmIcon className="w-4 h-4" />}
            loading={stakingLoading}
            onClick={() => setShowStakingMode(StakingMode.Stake)}
            opaque
            title={t('info.couldHaveMoreVotingPower')}
          >
            <div className="flex flex-row gap-2 items-center mb-2">
              <BalanceIcon iconURI={tokenImageUrl} />

              <p className="font-bold">
                {convertMicroDenomToDenomWithDecimals(
                  unstakedGovTokenBalance,
                  governanceTokenInfo.decimals
                ).toLocaleString(undefined, {
                  maximumFractionDigits: governanceTokenInfo.decimals,
                })}{' '}
                ${governanceTokenInfo.symbol}
                <span className="ml-1 secondary-text">
                  {t('info.unstaked')}
                </span>
              </p>
            </div>

            <p className="secondary-text">
              {t('info.stakeToIncreaseVotingPower')}
            </p>
          </BalanceCard>
        )}
      </div>

      <ClaimsPendingList
        coreAddress={coreAddress}
        showClaim={() => setShowStakingMode(StakingMode.Claim)}
      />

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
