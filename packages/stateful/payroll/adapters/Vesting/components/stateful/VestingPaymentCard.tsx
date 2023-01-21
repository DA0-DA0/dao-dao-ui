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
import { useAwaitNextBlock, useEntity } from '../../../../../hooks'
import {
  useDistribute,
  useWithdrawDelegatorRewards,
} from '../../../../../hooks/contracts/CwVesting'
import { tokenCardLazyInfoSelector } from '../../../../../recoil'
import { VestingPaymentCard as StatelessVestingPaymentCard } from '../stateless/VestingPaymentCard'
import { StatefulVestingPaymentCardProps } from '../types'
import { NativeStakingModal } from './NativeStakingModal'

export const VestingPaymentCard = ({
  vestingContractAddress,
  vestingPayment,
  vestedAmount,
  tokenInfo,
}: StatefulVestingPaymentCardProps) => {
  const { t } = useTranslation()
  const { chainId } = useDaoInfoContext()

  const recipientEntity = useEntity({
    address: vestingPayment.recipient,
    chainId,
  })

  const lazyInfoLoading = loadableToLoadingData(
    useCachedLoadable(
      tokenCardLazyInfoSelector({
        walletAddress: vestingContractAddress,
        denom:
          'cw20' in vestingPayment.denom
            ? vestingPayment.denom.cw20
            : vestingPayment.denom.native,
        tokenDecimals: tokenInfo.decimals,
        tokenSymbol: tokenInfo.symbol,
        chainId,
      })
    ),
    {
      usdcUnitPrice: undefined,
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

      // Give time for indexer to update.
      awaitNextBlock().then(refresh)
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

        // Give time for indexer to update.
        awaitNextBlock().then(refresh)
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
        claiming={claiming}
        cw20Address={cw20Address}
        description={vestingPayment.description}
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
          tokenInfo.decimals
        )}
        title={vestingPayment.title}
        tokenInfo={tokenInfo}
        withdrawableAmount={convertMicroDenomToDenomWithDecimals(
          // Remaining balance held by vesting contract.
          Number(vestingPayment.amount) -
            // Remaining balance to vest.
            Number(vestedAmount) -
            // Take into account vested tokens that are staked. If fewer tokens
            // are staked than have unvested, no vested tokens are staked and
            // thus all vested tokens can be claimed.
            Math.max(
              0,
              Number(vestingPayment.staked_amount) - Number(vestedAmount)
            ),
          tokenInfo.decimals
        )}
        withdrawing={withdrawing}
      />

      {recipientIsWallet && tokenInfo.denomOrAddress === NATIVE_DENOM && (
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
