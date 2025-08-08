import { usePlausible } from 'next-plausible'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import { stakingLoadingAtom } from '@dao-dao/state'
import { useDao, useUpdatingRef } from '@dao-dao/stateless'
import {
  BaseProfileCardMemberInfoProps,
  Feature,
  PlausibleEvents,
  UnstakingTask,
  UnstakingTaskStatus,
} from '@dao-dao/types'
import {
  executeSmartContracts,
  isFeatureSupportedByVersion,
  processError,
} from '@dao-dao/utils'

import { useAwaitNextBlock, useWallet } from '../../../../hooks'
import { ProfileCardMemberInfoTokens } from '../../../components'
import { useGovernanceCollectionInfo, useStakingInfo } from '../hooks'
import { StakingModal } from './StakingModal'

export const ProfileCardMemberInfo = ({
  maxGovernanceTokenDeposit,
  ...props
}: BaseProfileCardMemberInfoProps) => {
  const { t } = useTranslation()
  const { chainId, name: daoName, coreAddress, votingModule } = useDao()
  const {
    address: walletAddress = '',
    isWalletConnected,
    refreshBalances,
    getSigningClient,
  } = useWallet()
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [claimingLoading, setClaimingLoading] = useState(false)
  const stakingLoading = useRecoilValue(stakingLoadingAtom)
  const plausible = usePlausible<PlausibleEvents>()

  const {
    collectionInfo,
    token,
    loadingWalletBalance: loadingUnstakedBalance,
  } = useGovernanceCollectionInfo({
    fetchWalletBalance: true,
  })

  const {
    stakingContractAddress,
    unstakingDuration,
    claimsPending,
    claimsAvailable,
    loadingWalletStakedValue,
    loadingTotalStakedValue,
    refreshClaims,
  } = useStakingInfo({
    fetchClaims: true,
    fetchWalletStakedValue: true,
    fetchTotalStakedValue: true,
  })

  const claimsAvailableRef = useUpdatingRef(claimsAvailable)
  const awaitNextBlock = useAwaitNextBlock()
  const onClaim = useCallback(async () => {
    if (!isWalletConnected || !walletAddress) {
      return toast.error(t('error.logInToContinue'))
    }

    const claimsAvailable = claimsAvailableRef.current
    if (!claimsAvailable?.length) {
      return toast.error(t('error.noClaimsAvailable'))
    }

    setClaimingLoading(true)
    try {
      await executeSmartContracts({
        client: getSigningClient,
        sender: walletAddress,
        instructions: isFeatureSupportedByVersion(
          Feature.UnlimitedNftClaims,
          votingModule.version
        )
          ? [
              // If legacy claims exist, claim them.
              ...(claimsAvailable.some(({ legacy }) => legacy)
                ? [
                    {
                      contractAddress: stakingContractAddress,
                      msg: {
                        claim_nfts: {
                          type: 'legacy',
                        },
                      },
                    },
                  ]
                : []),
              // If non-legacy claims exist, claim them specifically.
              ...(claimsAvailable.some(({ legacy }) => !legacy)
                ? [
                    {
                      contractAddress: stakingContractAddress,
                      msg: {
                        claim_nfts: {
                          type: {
                            specific: claimsAvailable
                              .filter(({ legacy }) => !legacy)
                              .map(({ token_id }) => token_id),
                          },
                        },
                      },
                    },
                  ]
                : []),
            ]
          : [
              {
                contractAddress: stakingContractAddress,
                msg: {
                  claim_nfts: {},
                },
              },
            ],
      })

      plausible('daoVotingClaim', {
        props: {
          chainId,
          dao: coreAddress,
          walletAddress,
          votingModule: votingModule.address,
          votingModuleType: votingModule.contractName,
        },
      })

      // New balances will not appear until the next block.
      await awaitNextBlock()

      // Refresh wallet and staking contract balances.
      refreshBalances()
      refreshBalances({
        chainId: votingModule.chainId,
        address: stakingContractAddress,
      })
      refreshClaims?.()

      toast.success(
        t('success.claimedTokens', {
          amount: HugeDecimal.from(claimsAvailable.length).toFormattedString(),
          tokenSymbol: collectionInfo.symbol,
        })
      )
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setClaimingLoading(false)
    }
  }, [
    isWalletConnected,
    walletAddress,
    claimsAvailableRef,
    t,
    getSigningClient,
    votingModule.version,
    votingModule.address,
    votingModule.contractName,
    votingModule.chainId,
    stakingContractAddress,
    plausible,
    chainId,
    coreAddress,
    awaitNextBlock,
    refreshBalances,
    refreshClaims,
    collectionInfo.symbol,
  ])

  const unstakingTasks: UnstakingTask[] = [
    ...(claimsPending ?? []).map(({ release_at }) => ({
      token,
      status: UnstakingTaskStatus.Unstaking,
      amount: HugeDecimal.one,
      expiration: release_at,
    })),
    ...(claimsAvailable ?? []).map(({ release_at }) => ({
      token,
      status: UnstakingTaskStatus.ReadyToClaim,
      amount: HugeDecimal.one,
      expiration: release_at,
    })),
  ]

  return (
    <>
      <ProfileCardMemberInfoTokens
        claimingLoading={claimingLoading}
        daoName={daoName}
        loadingTokens={
          !loadingWalletStakedValue ||
          loadingWalletStakedValue.loading ||
          !loadingUnstakedBalance ||
          loadingUnstakedBalance.loading
            ? {
                loading: true,
              }
            : {
                loading: false,
                data: [
                  {
                    token,
                    staked: loadingWalletStakedValue.data,
                    unstaked: loadingUnstakedBalance.data,
                  },
                ],
              }
        }
        loadingVotingPower={
          !loadingWalletStakedValue ||
          loadingWalletStakedValue.loading ||
          !loadingTotalStakedValue ||
          loadingTotalStakedValue.loading
            ? { loading: true }
            : {
                loading: false,
                data: loadingWalletStakedValue.data
                  .div(loadingTotalStakedValue.data)
                  .times(100)
                  .toNumber(),
              }
        }
        onClaim={onClaim}
        onStake={() => setShowStakingModal(true)}
        refreshUnstakingTasks={() => refreshClaims?.()}
        stakingLoading={stakingLoading}
        unstakingDuration={unstakingDuration}
        unstakingTasks={unstakingTasks}
        {...props}
      />

      <StakingModal
        maxDeposit={maxGovernanceTokenDeposit}
        onClose={() => setShowStakingModal(false)}
        visible={showStakingModal}
      />
    </>
  )
}
