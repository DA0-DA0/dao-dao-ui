import { useWallet } from '@noahsaso/cosmodal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { refreshVestingAtom } from '@dao-dao/state/recoil'
import { useCachedLoadable, useDaoInfoContext } from '@dao-dao/stateless'
import {
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

  return (
    <StatelessVestingPaymentCard
      ButtonLink={ButtonLink}
      claiming={claiming}
      cw20Address={cw20Address}
      description={vestingPayment.description}
      hasStakingInfo={false}
      initialVestedAmount={Number(vestingPayment.amount)}
      lazyInfo={lazyInfoLoading}
      onAddToken={onAddToken}
      onClaim={onClaim}
      onWithdraw={onWithdraw}
      recipient={vestingPayment.recipient}
      recipientEntity={recipientEntity}
      recipientIsWallet={vestingPayment.recipient === walletAddress}
      title={vestingPayment.title}
      tokenInfo={tokenInfo}
      withdrawableVestedAmount={Number(vestedAmount)}
      withdrawing={withdrawing}
    />
  )
}
