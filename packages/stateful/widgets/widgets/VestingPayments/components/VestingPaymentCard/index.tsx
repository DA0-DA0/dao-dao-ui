import { useWallet } from '@noahsaso/cosmodal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  refreshVestingAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state/recoil'
import {
  useAddToken,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  loadableToLoadingData,
  processError,
} from '@dao-dao/utils'

import { ButtonLink } from '../../../../../components/ButtonLink'
import {
  useAwaitNextBlock,
  useEntity,
  useWalletInfo,
} from '../../../../../hooks'
import {
  useDistribute,
  useWithdrawDelegatorRewards,
} from '../../../../../hooks/contracts/CwVesting'
import { tokenCardLazyInfoSelector } from '../../../../../recoil'
import { VestingInfo } from '../../types'
import { NativeStakingModal } from '../NativeStakingModal'
import { VestingPaymentCard as StatelessVestingPaymentCard } from './VestingPaymentCard'

export const VestingPaymentCard = (vestingInfo: VestingInfo) => {
  const { t } = useTranslation()
  const { chainId } = useDaoInfoContext()
  const { refreshBalances } = useWalletInfo()

  const {
    vestingContractAddress,
    vest,
    total,
    vested,
    token,
    distributable,
    startDate,
    endDate,
  } = vestingInfo

  const recipientEntity = useEntity({
    address: vest.recipient,
    chainId,
  })

  const lazyInfoLoading = loadableToLoadingData(
    useCachedLoadable(
      tokenCardLazyInfoSelector({
        walletAddress: vestingContractAddress,
        token,
        chainId,
        // Unused. We just want the USD price and staking info.
        unstakedBalance: 0,
      })
    ),
    {
      usdUnitPrice: undefined,
      stakingInfo: undefined,
      // Unused. We just want the USD price and staking info.
      totalBalance: 0,
    }
  )

  const setRefreshVestingInfo = useSetRecoilState(
    refreshVestingAtom(vestingContractAddress)
  )
  const setRefreshBalances = useSetRecoilState(
    refreshWalletBalancesIdAtom(vestingContractAddress)
  )
  const refresh = () => {
    setRefreshVestingInfo((r) => r + 1)
    setRefreshBalances((r) => r + 1)
  }

  const awaitNextBlock = useAwaitNextBlock(chainId)

  const { address: walletAddress = '' } = useWallet()
  const distribute = useDistribute({
    contractAddress: vestingContractAddress,
    sender: walletAddress,
  })
  const claim = useWithdrawDelegatorRewards({
    contractAddress: vestingContractAddress,
    sender: walletAddress,
  })

  const [withdrawing, setWithdrawing] = useState(false)
  const onWithdraw = async () => {
    setWithdrawing(true)
    try {
      await distribute({})

      // Give time for indexer to update and then refresh.
      await awaitNextBlock()

      refresh()
      refreshBalances()
      toast.success(t('success.withdrewPayment'))
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setWithdrawing(false)
    }
  }

  const [claiming, setClaiming] = useState(false)
  const validators = lazyInfoLoading.loading
    ? undefined
    : lazyInfoLoading.data.stakingInfo?.stakes.map((s) => s.validator.address)
  // If no validators or not yet loaded, don't show claim.
  const onClaim =
    validators &&
    (async () => {
      setClaiming(true)
      try {
        await claim({
          validators,
        })

        // Give time for indexer to update and then refresh.
        await awaitNextBlock()

        refresh()
        toast.success(t('success.claimedRewards'))
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      } finally {
        setClaiming(false)
      }
    })

  const addToken = useAddToken()
  const cw20Address = 'cw20' in vest.denom ? vest.denom.cw20 : undefined
  const onAddToken =
    addToken && cw20Address ? () => addToken(cw20Address) : undefined

  const recipientIsWallet = vest.recipient === walletAddress

  const [showStakingModal, setShowStakingModal] = useState(false)

  return (
    <>
      <StatelessVestingPaymentCard
        ButtonLink={ButtonLink}
        canClaimStakingRewards={
          !lazyInfoLoading.loading &&
          !!lazyInfoLoading.data.stakingInfo?.totalPendingRewards
        }
        claimedAmount={convertMicroDenomToDenomWithDecimals(
          vest.claimed,
          token.decimals
        )}
        claiming={claiming}
        cw20Address={cw20Address}
        description={vest.description}
        distributableAmount={convertMicroDenomToDenomWithDecimals(
          distributable,
          token.decimals
        )}
        endDate={endDate}
        lazyInfo={lazyInfoLoading}
        onAddToken={onAddToken}
        onClaim={onClaim}
        onManageStake={
          recipientIsWallet ? () => setShowStakingModal(true) : undefined
        }
        onWithdraw={onWithdraw}
        recipient={vest.recipient}
        recipientEntity={recipientEntity}
        recipientIsWallet={recipientIsWallet}
        remainingBalanceVesting={convertMicroDenomToDenomWithDecimals(
          Number(total) - Number(vested),
          token.decimals
        )}
        startDate={startDate}
        title={vest.title}
        token={token}
        withdrawing={withdrawing}
      />

      {recipientIsWallet && token.denomOrAddress === NATIVE_DENOM && (
        <NativeStakingModal
          onClose={() => setShowStakingModal(false)}
          stakes={
            lazyInfoLoading.loading
              ? undefined
              : lazyInfoLoading.data.stakingInfo?.stakes
          }
          vestingInfo={vestingInfo}
          visible={showStakingModal}
        />
      )}
    </>
  )
}
