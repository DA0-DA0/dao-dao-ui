import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

import {
  CwdVotingCw721StakedSelectors,
  refreshDaoVotingPowerAtom,
  stakingLoadingAtom,
} from '@dao-dao/state'
import {
  ModalLoader,
  NftSelectionModal,
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
  CwdVotingCw721StakedHooks,
  useAwaitNextBlock,
  useWalletProfile,
} from '../../../../../hooks'
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
  const { refreshBalances } = useWalletProfile()

  const [actionLabel, setActionLabel] = useState(t('button.stake') as string)
  const [header, setHeader] = useState<{ title: string; subtitle?: string }>({
    title: '',
    subtitle: '',
  })
  const [mode, setMode] = useState<StakingMode | undefined>(undefined)
  const [nfts, setNfts] = useState({
    loading: true,
    errored: false,
  } as LoadingDataWithError<NftCardInfo[]>)
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

  const totalStakedBalance = useRecoilValue(
    walletAddress
      ? CwdVotingCw721StakedSelectors.votingPowerAtHeightSelector({
          contractAddress: stakingContractAddress,
          params: [{ address: walletAddress }],
        })
      : constSelector(undefined)
  )

  const walletStakedBalanceLoadable = useCachedLoadable(
    walletAddress
      ? CwdVotingCw721StakedSelectors.votingPowerAtHeightSelector({
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

  const totalValue = useRecoilValue(
    CwdVotingCw721StakedSelectors.totalPowerAtHeightSelector({
      contractAddress: stakingContractAddress,
      params: [{}],
    })
  )

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
  const doUnstake = CwdVotingCw721StakedHooks.useUnstake({
    contractAddress: stakingContractAddress,
    sender: walletAddress ?? '',
  })

  const setRefreshDaoVotingPower = useSetRecoilState(
    refreshDaoVotingPowerAtom(stakingContractAddress)
  )
  const refreshDaoVotingPower = () => setRefreshDaoVotingPower((id) => id + 1)

  const awaitNextBlock = useAwaitNextBlock()
  /*
  const onAction = useCallback(async () => {
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

        // In the UI we display staked value as `amount_staked +
        // rewards` and is the value used to compute voting power. When we actually
        // process an unstake call, the contract expects this value in terms of
        // amount_staked.
        //
        // value = amount_staked * total_value / staked_total
        //
        // => amount_staked = staked_total * value / total_value
        let amountToUnstake =
          (Number(totalStakedBalance?.power) * tokenIds.length) /
          Number(totalValue.power)

        // We have limited precision and on the contract side division rounds
        // down, so division and multiplication don't commute. Handle the common
        // case here where someone is attempting to unstake all of their funds.
        if (Math.abs(walletStakedBalance - amountToUnstake) <= 1) {
          amountToUnstake = walletStakedBalance
        }

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
  }, [
    awaitNextBlock,
    connected,
    doStakeMultiple,
    doUnstake,
    governanceTokenInfo.symbol,
    mode,
    onClose,
    refreshBalances,
    refreshClaims,
    refreshDaoVotingPower,
    refreshTotals,
    setStakingLoading,
    stakingContractAddress,
    t,
    tokenIds,
    totalStakedBalance?.power,
    totalValue.power,
    walletStakedBalance,
  ])
  */

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

        // In the UI we display staked value as `amount_staked +
        // rewards` and is the value used to compute voting power. When we actually
        // process an unstake call, the contract expects this value in terms of
        // amount_staked.
        //
        // value = amount_staked * total_value / staked_total
        //
        // => amount_staked = staked_total * value / total_value
        let amountToUnstake =
          (Number(totalStakedBalance?.power) * tokenIds.length) /
          Number(totalValue.power)

        // We have limited precision and on the contract side division rounds
        // down, so division and multiplication don't commute. Handle the common
        // case here where someone is attempting to unstake all of their funds.
        if (Math.abs(walletStakedBalance - amountToUnstake) <= 1) {
          amountToUnstake = walletStakedBalance
        }

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

  const updateStakingMode = useCallback(
    (newMode: StakingMode) => {
      setTokenIds([])

      let _header = Object.assign({}, header)

      if (walletStakedValue !== undefined && walletStakedValue > 0) {
        _header.title = t('title.manageStaking')
      } else {
        _header.title = t('title.stakingModeNfts.stake')
      }

      switch (newMode) {
        case StakingMode.Stake:
          setActionLabel(t('button.stake'))
          _header.subtitle = t('title.stakingModeNfts.stakeHeaderSubtitle')
          setHeader(_header)
          setNfts(
            loadingWalletUnstakedNfts ??
              ({ loading: false, errored: true } as LoadingDataWithError<
                NftCardInfo[]
              >)
          )
          break
        case StakingMode.Unstake:
          setActionLabel(t('title.unstake'))
          _header.subtitle = t('title.stakingModeNfts.unstakeHeaderSubtitle')
          setHeader(_header)
          setNfts(
            loadingWalletStakedNfts ??
              ({ loading: false, errored: true } as LoadingDataWithError<
                NftCardInfo[]
              >)
          )
          break
        default:
          break
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (mode === undefined) {
      setMode(initialMode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (mode !== undefined) {
      updateStakingMode(mode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  return (
    <NftSelectionModal
      actionLabel={actionLabel}
      actionLoading={stakingLoading}
      getIdForNft={getIdForNft}
      hasStake={walletStakedValue !== undefined && walletStakedValue > 0}
      header={header}
      mode={mode}
      nfts={nfts}
      onAction={onAction}
      onClose={onClose}
      onDeselectAll={onDeselectAll}
      onNftClick={onNftClick}
      onSelectAll={onSelectAll}
      selectedIds={tokenIds}
      setMode={setMode}
      visible={true}
    />
  )
}
