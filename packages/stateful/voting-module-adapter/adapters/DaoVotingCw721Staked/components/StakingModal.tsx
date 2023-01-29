import { useWallet } from '@noahsaso/cosmodal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilState, useSetRecoilState } from 'recoil'

import {
  DaoVotingCw721StakedSelectors,
  refreshDaoVotingPowerAtom,
  refreshWalletBalancesIdAtom,
  stakingLoadingAtom,
} from '@dao-dao/state'
import {
  ModalLoader,
  NftSelectionModal,
  SegmentedControls,
  StakingMode,
  useCachedLoadable,
} from '@dao-dao/stateless'
import {
  BaseStakingModalProps,
  LoadingDataWithError,
  NftCardInfo,
} from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import {
  Cw721BaseHooks,
  DaoVotingCw721StakedHooks,
  useAwaitNextBlock,
} from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'
import { useGovernanceCollectionInfo, useStakingInfo } from '../hooks'

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
  const { address: walletAddress, connected } = useWallet()
  const { coreAddress } = useVotingModuleAdapterOptions()

  const setRefreshWalletNftsId = useSetRecoilState(
    refreshWalletBalancesIdAtom(walletAddress)
  )

  const [mode, setMode] = useState<StakingMode>(initialMode)

  const [stakeTokenIds, setStakeTokenIds] = useState([] as string[])
  const [unstakeTokenIds, setUnstakeTokenIds] = useState([] as string[])

  const [stakingLoading, setStakingLoading] = useRecoilState(stakingLoadingAtom)

  const {
    collectionAddress: collectionAddress,
    collectionInfo,
    loadingWalletBalance: loadingUnstakedBalance,
  } = useGovernanceCollectionInfo({
    fetchWalletBalance: true,
  })
  const {
    stakingContractAddress,
    refreshTotals,
    sumClaimsAvailable,
    loadingWalletStakedValue,
    refreshClaims,
    loadingWalletStakedNfts,
    loadingWalletUnstakedNfts,
  } = useStakingInfo({
    fetchClaims: true,
    fetchTotalStakedValue: false,
    fetchWalletStakedValue: true,
    fetchWalletUnstakedValue: true,
  })

  const hasStake =
    loadingWalletStakedValue !== undefined &&
    !loadingWalletStakedValue.loading &&
    loadingWalletStakedValue.data > 0

  const walletStakedBalanceLoadable = useCachedLoadable(
    walletAddress
      ? DaoVotingCw721StakedSelectors.votingPowerAtHeightSelector({
          contractAddress: stakingContractAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )
  const walletStakedBalance =
    walletStakedBalanceLoadable.state === 'hasValue' &&
    walletStakedBalanceLoadable.contents
      ? Number(walletStakedBalanceLoadable.contents.power)
      : undefined

  if (
    sumClaimsAvailable === undefined ||
    loadingUnstakedBalance === undefined ||
    loadingWalletStakedValue === undefined
  ) {
    throw new Error(t('error.loadingData'))
  }

  const doStakeMultiple = Cw721BaseHooks.useSendNftMultiple({
    contractAddress: collectionAddress,
    sender: walletAddress ?? '',
  })
  const doUnstake = DaoVotingCw721StakedHooks.useUnstake({
    contractAddress: stakingContractAddress,
    sender: walletAddress ?? '',
  })

  const setRefreshDaoVotingPower = useSetRecoilState(
    refreshDaoVotingPowerAtom(coreAddress)
  )
  const refreshDaoVotingPower = () => setRefreshDaoVotingPower((id) => id + 1)

  const awaitNextBlock = useAwaitNextBlock()

  const onAction = async () => {
    if (!connected) {
      toast.error(t('error.connectWalletToContinue'))
      return
    }

    setStakingLoading(true)

    switch (mode) {
      case StakingMode.Stake: {
        setStakingLoading(true)

        try {
          await doStakeMultiple({
            contract: stakingContractAddress,
            msg: btoa('{"stake": {}}'),
            tokenIds: stakeTokenIds,
          })

          // New balances will not appear until the next block.
          await awaitNextBlock()

          setRefreshWalletNftsId((id) => id + 1)
          refreshTotals()
          refreshDaoVotingPower()

          toast.success(
            `Staked ${stakeTokenIds.length} $${collectionInfo.symbol}`
          )
          setStakeTokenIds([])

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
        if (walletStakedBalance === undefined) {
          toast.error(t('error.loadingData'))
          return
        }

        setStakingLoading(true)

        try {
          await doUnstake({
            tokenIds: unstakeTokenIds,
          })

          // New balances will not appear until the next block.
          await awaitNextBlock()

          setRefreshWalletNftsId((id) => id + 1)
          refreshTotals()
          refreshClaims?.()
          refreshDaoVotingPower()

          toast.success(
            `Unstaked ${unstakeTokenIds.length} $${collectionInfo.symbol}`
          )
          setUnstakeTokenIds([])

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
      default:
        toast.error('Internal error while staking. Unrecognized mode.')
    }
  }

  const currentTokenIds =
    mode === StakingMode.Stake ? stakeTokenIds : unstakeTokenIds
  const setCurrentTokenIds =
    mode === StakingMode.Stake ? setStakeTokenIds : setUnstakeTokenIds

  const getIdForNft = (nft: NftCardInfo) => nft.tokenId

  // Toggle on/off a token ID selection.
  const onNftClick = (nft: NftCardInfo) =>
    setCurrentTokenIds((tokenIds) => {
      const tokenId = getIdForNft(nft)
      return tokenIds.includes(tokenId)
        ? tokenIds.filter((id) => id !== tokenId)
        : [...tokenIds, tokenId]
    })

  const onDeselectAll = () => setCurrentTokenIds([])

  const nfts =
    (mode === StakingMode.Stake
      ? loadingWalletUnstakedNfts
      : mode === StakingMode.Unstake
      ? loadingWalletStakedNfts
      : undefined) ??
    ({ loading: false, errored: true } as LoadingDataWithError<NftCardInfo[]>)

  const onSelectAll = () =>
    setCurrentTokenIds(
      !nfts.loading && !nfts.errored
        ? nfts.data.map((nft) => getIdForNft(nft))
        : []
    )

  return (
    <NftSelectionModal
      actionLabel={
        mode === StakingMode.Stake
          ? t('button.stake')
          : mode === StakingMode.Unstake
          ? t('title.unstake')
          : ''
      }
      actionLoading={stakingLoading}
      getIdForNft={getIdForNft}
      header={{
        title: hasStake
          ? t('title.manageStaking')
          : t('title.stakingModeNfts.stake'),
        subtitle:
          mode === StakingMode.Stake
            ? t('title.stakingModeNfts.stakeHeaderSubtitle')
            : mode === StakingMode.Unstake
            ? t('title.stakingModeNfts.unstakeHeaderSubtitle')
            : '',
      }}
      headerDisplay={
        !(
          !hasStake ||
          mode === undefined ||
          setMode === undefined ||
          mode === StakingMode.Claim
        ) ? (
          <SegmentedControls
            onSelect={setMode}
            selected={mode}
            tabs={[
              {
                label: t(`title.stakingModeNfts.stake`),
                value: StakingMode.Stake,
              },
              {
                label: t(`title.stakingModeNfts.unstake`),
                value: StakingMode.Unstake,
              },
            ]}
          />
        ) : undefined
      }
      nfts={nfts}
      onAction={onAction}
      onClose={onClose}
      onDeselectAll={onDeselectAll}
      onNftClick={onNftClick}
      onSelectAll={onSelectAll}
      selectedIds={currentTokenIds}
      visible={true}
    />
  )
}
