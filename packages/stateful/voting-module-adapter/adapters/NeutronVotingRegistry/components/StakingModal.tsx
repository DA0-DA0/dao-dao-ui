import { coins } from '@cosmjs/stargate'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  NeutronVaultSelectors,
  genericTokenBalanceSelector,
  refreshDaoVotingPowerAtom,
  refreshFollowingDaosAtom,
  refreshWalletBalancesIdAtom,
  stakingLoadingAtom,
} from '@dao-dao/state'
import {
  ModalLoader,
  StakingMode,
  StakingModal as StatelessStakingModal,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { BaseStakingModalProps } from '@dao-dao/types'
import {
  CHAIN_GAS_MULTIPLIER,
  convertDenomToMicroDenomStringWithDecimals,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  processError,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import {
  NeutronVaultHooks,
  useAwaitNextBlock,
  useWallet,
  useWalletInfo,
} from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useVotingModule } from '../hooks'

export const StakingModal = (props: BaseStakingModalProps) => (
  <SuspenseLoader fallback={<ModalLoader onClose={props.onClose} />}>
    <InnerStakingModal {...props} />
  </SuspenseLoader>
)

const InnerStakingModal = ({
  initialMode = StakingMode.Stake,
  onClose,
}: BaseStakingModalProps) => {
  const { t } = useTranslation()
  const { address: walletAddress, isWalletConnected } = useWallet()
  const { refreshBalances } = useWalletInfo()
  const { coreAddress, chainId } = useVotingModuleAdapterOptions()

  const { neutronToken, loadingVaults } = useVotingModule()
  const loadingNeutronBalance = useCachedLoadingWithError(
    !walletAddress
      ? undefined
      : genericTokenBalanceSelector({
          chainId: neutronToken.chainId,
          type: neutronToken.type,
          denomOrAddress: neutronToken.denomOrAddress,
          address: walletAddress,
        })
  )
  const loadingWalletVotingBondedTokens = useCachedLoadingWithError(
    loadingVaults.loading || loadingVaults.errored || !walletAddress
      ? undefined
      : NeutronVaultSelectors.votingPowerAtHeightSelector({
          contractAddress: loadingVaults.data.neutronVault.address,
          chainId,
          params: [
            {
              address: walletAddress,
            },
          ],
        })
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

  const [amount, setAmount] = useState(0)

  const doStake = NeutronVaultHooks.useBond({
    contractAddress:
      !loadingVaults.loading && !loadingVaults.errored
        ? loadingVaults.data.neutronVault.address
        : ' ',
    sender: walletAddress ?? '',
  })
  const doUnstake = NeutronVaultHooks.useUnbond({
    contractAddress:
      !loadingVaults.loading && !loadingVaults.errored
        ? loadingVaults.data.neutronVault.address
        : ' ',
    sender: walletAddress ?? '',
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
              convertDenomToMicroDenomStringWithDecimals(
                amount,
                neutronToken.decimals
              ),
              neutronToken.denomOrAddress
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
              maximumFractionDigits: neutronToken.decimals,
            })} $${neutronToken.symbol}`
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
            amount: convertDenomToMicroDenomWithDecimals(
              amount,
              neutronToken.decimals
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
              maximumFractionDigits: neutronToken.decimals,
            })} $${neutronToken.symbol}`
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

  return (
    <StatelessStakingModal
      amount={amount}
      claimableTokens={0}
      error={isWalletConnected ? undefined : t('error.logInToContinue')}
      initialMode={initialMode}
      loading={stakingLoading}
      loadingStakableTokens={
        loadingNeutronBalance.loading || loadingNeutronBalance.errored
          ? { loading: true }
          : {
              loading: false,
              data: convertMicroDenomToDenomWithDecimals(
                loadingNeutronBalance.data.balance,
                neutronToken.decimals
              ),
            }
      }
      loadingUnstakableTokens={
        loadingWalletVotingBondedTokens.loading ||
        loadingWalletVotingBondedTokens.errored
          ? { loading: true }
          : {
              loading: false,
              data: convertMicroDenomToDenomWithDecimals(
                loadingWalletVotingBondedTokens.data.power,
                neutronToken.decimals
              ),
            }
      }
      onAction={onAction}
      onClose={onClose}
      setAmount={(newAmount) => setAmount(newAmount)}
      token={neutronToken}
      unstakingDuration={
        // No unstaking duration for neutron vault.
        null
      }
    />
  )
}
