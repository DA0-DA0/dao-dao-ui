import { coin } from '@cosmjs/stargate'
import { useQueryClient } from '@tanstack/react-query'
import BigNumber from 'bignumber.js'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { chainQueries } from '@dao-dao/state/query'
import {
  nativeUnstakingDurationSecondsSelector,
  validatorsSelector,
} from '@dao-dao/state/recoil'
import {
  StakingModal,
  StakingModalProps,
  StakingMode,
  useCachedLoadable,
  useChainContext,
} from '@dao-dao/stateless'
import { cwMsgToEncodeObject } from '@dao-dao/types'
import {
  CHAIN_GAS_MULTIPLIER,
  convertDenomToMicroDenomStringWithDecimals,
  processError,
} from '@dao-dao/utils'

import {
  useAwaitNextBlock,
  useQueryLoadingData,
  useQueryLoadingDataWithError,
  useWallet,
} from '../../hooks'

export type WalletStakingModalProps = Pick<
  StakingModalProps,
  'visible' | 'onClose'
>

export const WalletStakingModal = (props: WalletStakingModalProps) => {
  const { t } = useTranslation()

  const {
    chain: { chain_id: chainId },
    nativeToken,
  } = useChainContext()
  const {
    address: walletAddress = '',
    getSigningStargateClient,
    refreshBalances,
  } = useWallet()

  if (!nativeToken) {
    throw new Error(t('error.missingNativeToken'))
  }

  // Fetch wallet balance.
  const loadingStakableTokens = useQueryLoadingData(
    walletAddress
      ? chainQueries.nativeBalance({
          chainId,
          address: walletAddress,
        })
      : undefined,
    BigNumber(0),
    {
      transform: ({ amount }) => BigNumber(amount),
    }
  )

  const awaitNextBlock = useAwaitNextBlock()

  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  const validatorsLoadable = useCachedLoadable(
    validatorsSelector({
      chainId,
    })
  )
  const unstakingDurationLoadable = useCachedLoadable(
    nativeUnstakingDurationSecondsSelector({
      chainId,
    })
  )

  const queryClient = useQueryClient()
  const loadingStakes = useQueryLoadingDataWithError(
    chainQueries.nativeDelegationInfo(queryClient, {
      address: walletAddress,
      chainId,
    }),
    ({ delegations }) =>
      delegations.map(({ validator, delegated, pendingReward }) => ({
        token: nativeToken,
        validator,
        amount: BigNumber(delegated.amount),
        rewards: BigNumber(pendingReward.amount),
      }))
  )
  const stakes =
    !loadingStakes.loading && !loadingStakes.errored ? loadingStakes.data : []

  const onAction = async (
    mode: StakingMode,
    amount: number,
    validator?: string | undefined
  ) => {
    // Should never happen.
    if (!validator) {
      toast.error(t('error.noValidatorSelected'))
      return
    }
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setLoading(true)
    try {
      const signingClient = await getSigningStargateClient()

      const microAmount = convertDenomToMicroDenomStringWithDecimals(
        amount,
        nativeToken.decimals
      )

      if (mode === StakingMode.Stake) {
        await signingClient.signAndBroadcast(
          walletAddress,
          [
            cwMsgToEncodeObject(
              chainId,
              {
                staking: {
                  delegate: {
                    amount: coin(microAmount, nativeToken.denomOrAddress),
                    validator,
                  },
                },
              },
              walletAddress
            ),
          ],
          CHAIN_GAS_MULTIPLIER
        )
      } else if (mode === StakingMode.Unstake) {
        await signingClient.signAndBroadcast(
          walletAddress,
          [
            cwMsgToEncodeObject(
              chainId,
              {
                staking: {
                  undelegate: {
                    amount: coin(microAmount, nativeToken.denomOrAddress),
                    validator,
                  },
                },
              },
              walletAddress
            ),
          ],
          CHAIN_GAS_MULTIPLIER
        )
      }

      // Wait a block for balances to update.
      await awaitNextBlock()
      refreshBalances()

      toast.success(
        mode === StakingMode.Stake ? t('success.staked') : t('success.unstaked')
      )
      props.onClose()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <StakingModal
      amount={amount}
      claimableTokens={
        // Tokens are claimable somewhere else.
        0
      }
      initialMode={StakingMode.Stake}
      loading={loading}
      loadingStakableTokens={loadingStakableTokens}
      onAction={onAction}
      setAmount={setAmount}
      token={nativeToken}
      unstakingDuration={
        unstakingDurationLoadable.state === 'hasValue'
          ? { time: unstakingDurationLoadable.contents }
          : null
      }
      validatorPicker={{
        validators:
          validatorsLoadable.state !== 'hasValue'
            ? []
            : validatorsLoadable.contents,
        stakes,
      }}
      {...props}
    />
  )
}
