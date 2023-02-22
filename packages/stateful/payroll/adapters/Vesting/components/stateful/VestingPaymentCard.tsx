import { useWallet } from '@noahsaso/cosmodal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { refreshVestingAtom } from '@dao-dao/state/recoil'
import { useCachedLoadable, useDaoInfoContext } from '@dao-dao/stateless'
import {
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  loadableToLoadingData,
  processError,
  useAddToken,
} from '@dao-dao/utils'

import { ButtonLink } from '../../../../../components'
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
import { VestingPaymentCard as StatelessVestingPaymentCard } from '../stateless/VestingPaymentCard'
import { VestingInfo } from '../types'
import { getWithdrawableAmount } from '../utils'
import { NativeStakingModal } from './NativeStakingModal'

export const VestingPaymentCard = (vestingInfo: VestingInfo) => {
  const { t } = useTranslation()
  const { chainId } = useDaoInfoContext()
  const { refreshBalances } = useWalletInfo()

  const { vestingContractAddress, vestingPayment, vestedAmount, token } =
    vestingInfo

  const recipientEntity = useEntity({
    address: vestingPayment.recipient,
    chainId,
  })

  const lazyInfoLoading = loadableToLoadingData(
    useCachedLoadable(
      tokenCardLazyInfoSelector({
        walletAddress: vestingContractAddress,
        token,
        chainId,
      })
    ),
    {
      usdUnitPrice: undefined,
      stakingInfo: undefined,
    }
  )

  const setRefresh = useSetRecoilState(
    refreshVestingAtom(vestingContractAddress)
  )
  const refresh = () => setRefresh((r) => r + 1)

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
      await distribute()
      toast.success(t('success.withdrewPayment'))

      // Give time for indexer to update and then refresh.
      await awaitNextBlock()

      refresh()
      refreshBalances()
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
        toast.success(t('success.claimedRewards'))

        // Give time for indexer to update and then refresh.
        await awaitNextBlock()

        refresh()
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      } finally {
        setClaiming(false)
      }
    })

  const addToken = useAddToken()
  const cw20Address =
    'cw20' in vestingPayment.denom ? vestingPayment.denom.cw20 : undefined
  const onAddToken =
    addToken && cw20Address ? () => addToken(cw20Address) : undefined

  const recipientIsWallet = vestingPayment.recipient === walletAddress

  const [showStakingModal, setShowStakingModal] = useState(false)

  return (
    <>
      <StatelessVestingPaymentCard
        ButtonLink={ButtonLink}
        claimedAmount={convertMicroDenomToDenomWithDecimals(
          vestingPayment.claimed_amount,
          token.decimals
        )}
        claiming={claiming}
        cw20Address={cw20Address}
        description={vestingPayment.description}
        endDate={
          'saturating_linear' in vestingPayment.vesting_schedule
            ? new Date(
                vestingPayment.vesting_schedule.saturating_linear.max_x * 1000
              )
            : undefined
        }
        lazyInfo={lazyInfoLoading}
        onAddToken={onAddToken}
        onClaim={onClaim}
        onManageStake={
          recipientIsWallet ? () => setShowStakingModal(true) : undefined
        }
        onWithdraw={onWithdraw}
        recipient={vestingPayment.recipient}
        recipientEntity={recipientEntity}
        recipientIsWallet={recipientIsWallet}
        remainingBalanceVesting={convertMicroDenomToDenomWithDecimals(
          vestedAmount,
          token.decimals
        )}
        startDate={
          'saturating_linear' in vestingPayment.vesting_schedule
            ? new Date(
                vestingPayment.vesting_schedule.saturating_linear.min_x * 1000
              )
            : undefined
        }
        title={vestingPayment.title}
        token={token}
        withdrawableAmount={getWithdrawableAmount(vestingInfo)}
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
          vestingContractAddress={vestingContractAddress}
          visible={showStakingModal}
        />
      )}
    </>
  )
}
