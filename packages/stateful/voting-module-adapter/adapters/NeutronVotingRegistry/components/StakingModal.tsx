import { coins } from '@cosmjs/stargate'
import { useQueries } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState, waitForAll } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  genericTokenBalanceSelector,
  neutronVaultQueries,
  refreshDaoVotingPowerAtom,
  refreshFollowingDaosAtom,
  refreshWalletBalancesIdAtom,
  stakingLoadingAtom,
} from '@dao-dao/state'
import {
  ModalLoader,
  StakingModal as StatelessStakingModal,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  BaseStakingModalProps,
  StakingMode,
  TokenInputOption,
} from '@dao-dao/types'
import {
  CHAIN_GAS_MULTIPLIER,
  makeCombineQueryResultsIntoLoadingDataWithError,
  processError,
  tokensEqual,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import {
  NeutronVaultHooks,
  useAwaitNextBlock,
  useWallet,
} from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useVotingModule } from '../hooks'

export const StakingModal = (props: BaseStakingModalProps) => (
  <SuspenseLoader
    fallback={<ModalLoader onClose={props.onClose} visible={props.visible} />}
  >
    <InnerStakingModal {...props} />
  </SuspenseLoader>
)

const InnerStakingModal = ({
  visible,
  onClose,
  initialMode = StakingMode.Stake,
}: BaseStakingModalProps) => {
  const { t } = useTranslation()
  const { address = '', isWalletConnected, refreshBalances } = useWallet()
  const { coreAddress, chainId } = useVotingModuleAdapterOptions()

  const { loadingVaults } = useVotingModule()
  const realVaults =
    loadingVaults.loading || loadingVaults.errored
      ? []
      : loadingVaults.data.flatMap(({ info, ...vault }) =>
          info.real
            ? {
                ...vault,
                ...info,
              }
            : []
        )

  const loadingStakedTokens = useQueries({
    queries:
      loadingVaults.loading || loadingVaults.errored || !address
        ? []
        : realVaults.map(({ address: contractAddress }) =>
            neutronVaultQueries.bondingStatus({
              chainId,
              contractAddress,
              args: {
                address,
              },
            })
          ),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      // Show loading if empty array is passed.
      loadIfNone: true,
    }),
  })
  const loadingUnstakedTokens = useCachedLoadingWithError(
    loadingVaults.loading || loadingVaults.errored || !address
      ? undefined
      : waitForAll(
          realVaults.map(({ bondToken: { chainId, type, denomOrAddress } }) =>
            genericTokenBalanceSelector({
              chainId,
              type,
              denomOrAddress,
              address: address,
            })
          )
        )
  )

  const setRefreshTotalBalancesId = useSetRecoilState(
    refreshWalletBalancesIdAtom(undefined)
  )
  // Refresh totals, mostly for total staked power.
  const refreshTotals = useCallback(
    () => setRefreshTotalBalancesId((id) => id + 1),
    [setRefreshTotalBalancesId]
  )

  const [stakingLoading, setStakingLoading] = useRecoilState(stakingLoadingAtom)
  const [selectedVaultIndex, setSelectedVaultIndex] = useState(0)
  const [amount, setAmount] = useState(0)

  const selectedVault =
    loadingVaults.loading || loadingVaults.errored
      ? undefined
      : realVaults[selectedVaultIndex] || realVaults[0]
  const selectedVaultStakedTokens =
    loadingStakedTokens.loading || loadingStakedTokens.errored
      ? undefined
      : loadingStakedTokens.data[selectedVaultIndex]?.unbondable_abount
  const selectedVaultUnstakedTokens =
    loadingUnstakedTokens.loading || loadingUnstakedTokens.errored
      ? undefined
      : loadingUnstakedTokens.data[selectedVaultIndex]?.balance

  const doStake = NeutronVaultHooks.useBond({
    contractAddress: selectedVault?.address ?? '',
    sender: address,
  })
  const doUnstake = NeutronVaultHooks.useUnbond({
    contractAddress: selectedVault?.address ?? '',
    sender: address,
  })

  const setRefreshDaoVotingPower = useSetRecoilState(
    refreshDaoVotingPowerAtom(coreAddress)
  )
  const setRefreshFollowedDaos = useSetRecoilState(refreshFollowingDaosAtom)
  const refreshDaoVotingPower = () => {
    setRefreshDaoVotingPower((id) => id + 1)
    setRefreshFollowedDaos((id) => id + 1)
  }

  const awaitNextBlock = useAwaitNextBlock()
  const onAction = async (mode: StakingMode, amount: number) => {
    if (!selectedVault) {
      toast.error(t('error.loadingData'))
      return
    }
    if (!isWalletConnected) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setStakingLoading(true)

    switch (mode) {
      case StakingMode.Stake: {
        setStakingLoading(true)

        try {
          await doStake(
            CHAIN_GAS_MULTIPLIER,
            undefined,
            coins(
              HugeDecimal.fromHumanReadable(
                amount,
                selectedVault.bondToken.decimals
              ).toString(),
              selectedVault.bondToken.denomOrAddress
            )
          )

          // New balances will not appear until the next block.
          await awaitNextBlock()

          refreshBalances()
          refreshTotals()
          refreshDaoVotingPower()

          setAmount(0)
          toast.success(
            `Staked ${amount.toLocaleString(undefined, {
              maximumFractionDigits: selectedVault.bondToken.decimals,
            })} $${selectedVault.bondToken.symbol}`
          )

          // Close once done.
          onClose()
        } catch (err) {
          console.error(err)
          toast.error(processError(err))
        } finally {
          setStakingLoading(false)
        }

        break
      }
      case StakingMode.Unstake: {
        setStakingLoading(true)

        try {
          await doUnstake({
            amount: HugeDecimal.fromHumanReadable(
              amount,
              selectedVault.bondToken.decimals
            ).toString(),
          })

          // New balances will not appear until the next block.
          await awaitNextBlock()

          refreshBalances()
          refreshTotals()
          refreshDaoVotingPower()

          setAmount(0)
          toast.success(
            `Unstaked ${amount.toLocaleString(undefined, {
              maximumFractionDigits: selectedVault.bondToken.decimals,
            })} $${selectedVault.bondToken.symbol}`
          )

          // Close once done.
          onClose()
        } catch (err) {
          console.error(err)
          toast.error(processError(err))
        } finally {
          setStakingLoading(false)
        }

        break
      }
      case StakingMode.Claim: {
        return toast.error('Claim unsupported.')
      }
      default:
        toast.error('Internal error while staking. Unrecognized mode.')
    }
  }

  if (!selectedVault) {
    return <ModalLoader onClose={onClose} visible={visible} />
  }

  return (
    <StatelessStakingModal
      amount={amount}
      claimableTokens={0}
      error={isWalletConnected ? undefined : t('error.logInToContinue')}
      initialMode={initialMode}
      loading={stakingLoading}
      loadingStakableTokens={
        loadingUnstakedTokens.loading ||
        loadingUnstakedTokens.errored ||
        !selectedVaultUnstakedTokens
          ? { loading: true }
          : {
              loading: false,
              data: HugeDecimal.from(selectedVaultUnstakedTokens),
            }
      }
      loadingUnstakableTokens={
        loadingStakedTokens.loading ||
        loadingStakedTokens.errored ||
        !selectedVaultStakedTokens
          ? { loading: true }
          : {
              loading: false,
              data: HugeDecimal.from(selectedVaultStakedTokens),
            }
      }
      onAction={onAction}
      onClose={onClose}
      setAmount={(newAmount) => setAmount(newAmount)}
      token={selectedVault?.bondToken}
      tokenPicker={
        loadingVaults.loading ||
        loadingVaults.errored ||
        realVaults.length === 1
          ? undefined
          : {
              tokens:
                loadingVaults.loading || loadingVaults.errored
                  ? {
                      loading: true,
                    }
                  : {
                      loading: false,
                      data: realVaults.map(({ bondToken }) => bondToken),
                    },
              onSelectToken: (token: TokenInputOption) => {
                const index =
                  loadingVaults.loading || loadingVaults.errored
                    ? -1
                    : realVaults.findIndex(({ bondToken }) =>
                        tokensEqual(token, bondToken)
                      )

                setSelectedVaultIndex(index === -1 ? 0 : index)
              },
              selectedToken:
                loadingVaults.loading || loadingVaults.errored
                  ? undefined
                  : realVaults[selectedVaultIndex]?.bondToken,
            }
      }
      unstakingDuration={
        // No unstaking duration for neutron vault.
        null
      }
      visible={visible}
    />
  )
}
