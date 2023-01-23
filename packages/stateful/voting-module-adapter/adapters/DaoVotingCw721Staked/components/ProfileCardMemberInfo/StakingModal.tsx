import { useWallet } from '@noahsaso/cosmodal'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilState, useSetRecoilState } from 'recoil'

import {
  DaoVotingCw721StakedSelectors,
  refreshDaoVotingPowerAtom,
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

import { SuspenseLoader } from '../../../../../components'
import {
  Cw721BaseHooks,
  DaoVotingCw721StakedHooks,
  useAwaitNextBlock,
  useWalletInfo,
} from '../../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../../react/context'
import { useGovernanceTokenInfo, useStakingInfo } from '../../hooks'

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
  const { refreshBalances } = useWalletInfo()
  const { coreAddress } = useVotingModuleAdapterOptions()

  const [mode, setMode] = useState<StakingMode | undefined>(undefined)

  const [tokenIds, setTokenIds] = useState([] as string[])

  const [stakingLoading, setStakingLoading] = useRecoilState(stakingLoadingAtom)

  const {
    governanceTokenAddress,
    governanceTokenInfo,
    loadingWalletBalance: loadingUnstakedBalance,
  } = useGovernanceTokenInfo({
    fetchLoadingWalletBalance: true,
  })
  const {
    stakingContractAddress,
    refreshTotals,
    sumClaimsAvailable,
    loadingWalletStakedValue,
    refreshClaims,
    loadingWalletStakedNfts,
    loadingWalletUnstakedNfts,
    walletStakedValue,
  } = useStakingInfo({
    fetchClaims: true,
    fetchTotalStakedValue: false,
    fetchWalletStakedValue: true,
    fetchLoadingWalletStakedValue: true,
    fetchLoadingWalletUnstakedValue: true,
  })

  const hasStake = walletStakedValue !== undefined && walletStakedValue > 0

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
    contractAddress: governanceTokenAddress,
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
            tokenIds,
          })

          // New balances will not appear until the next block.
          await awaitNextBlock()

          refreshBalances()
          refreshTotals()
          refreshDaoVotingPower()

          setTokenIds([])
          toast.success(
            `Staked ${tokenIds.length} $${governanceTokenInfo.symbol}`
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
        if (walletStakedBalance === undefined) {
          toast.error(t('error.loadingData'))
          return
        }

        setStakingLoading(true)

        try {
          await doUnstake({
            tokenIds,
          })

          // New balances will not appear until the next block.
          await awaitNextBlock()

          refreshBalances()
          refreshTotals()
          refreshClaims?.()
          refreshDaoVotingPower()

          setTokenIds([])
          toast.success(
            `Unstaked ${tokenIds.length} $${governanceTokenInfo.symbol}`
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
      default:
        toast.error('Internal error while staking. Unrecognized mode.')
    }
  }

  const onNftClick = (nft: NftCardInfo) => {
    let tokenId = getIdForNft(nft)
    let _tokenIds = [...tokenIds]

    if (_tokenIds.includes(tokenId)) {
      _tokenIds = _tokenIds.filter((_tokenId) => {
        return _tokenId !== tokenId
      })
    } else {
      _tokenIds.push(getIdForNft(nft))
    }

    setTokenIds(_tokenIds)
  }

  const onDeselectAll = () => {
    setTokenIds([])
  }

  const onSelectAll = () => {
    let _tokenIds =
      !nfts.loading && !nfts.errored
        ? nfts.data.map((nft) => {
            return getIdForNft(nft)
          })
        : []

    setTokenIds(_tokenIds)
  }

  const getIdForNft = (nft: NftCardInfo) => {
    return nft.tokenId
  }

  const nfts =
    (mode === StakingMode.Stake
      ? loadingWalletUnstakedNfts
      : mode === StakingMode.Unstake
      ? loadingWalletStakedNfts
      : undefined) ??
    ({ loading: false, errored: true } as LoadingDataWithError<NftCardInfo[]>)

  useEffect(() => {
    if (mode === undefined) {
      setMode(initialMode)
    }
  }, [initialMode, mode])

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
            className="mt-5"
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
      selectedIds={tokenIds}
      visible={true}
    />
  )
}
