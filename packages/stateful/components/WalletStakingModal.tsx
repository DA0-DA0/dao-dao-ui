import { coin } from '@cosmjs/stargate'
import { useWallet } from '@noahsaso/cosmodal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  genericTokenSelector,
  nativeDelegationInfoSelector,
  nativeUnstakingDurationSecondsSelector,
  validatorsSelector,
} from '@dao-dao/state/recoil'
import {
  StakingModal,
  StakingModalProps,
  StakingMode,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { TokenType } from '@dao-dao/types'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  cwMsgToEncodeObject,
  processError,
} from '@dao-dao/utils'

import { useAwaitNextBlock, useWalletInfo } from '../hooks'

export type WalletStakingModalProps = Pick<
  StakingModalProps,
  'visible' | 'onClose'
>

export const WalletStakingModal = (props: WalletStakingModalProps) => {
  const { t } = useTranslation()
  const {
    chainInfo: { chainId } = {},
    address: walletAddress = '',
    signingCosmWasmClient,
  } = useWallet()

  const { walletBalance, refreshBalances } = useWalletInfo()

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

  const token = useRecoilValue(
    genericTokenSelector({
      type: TokenType.Native,
      denomOrAddress: NATIVE_DENOM,
    })
  )
  const nativeDelegationInfo = useCachedLoadable(
    nativeDelegationInfoSelector({
      address: walletAddress,
      chainId,
    })
  )
  const stakes =
    nativeDelegationInfo.state === 'hasValue' && nativeDelegationInfo.contents
      ? nativeDelegationInfo.contents.delegations.map(
          ({ validator, delegated, pendingReward }) => ({
            token,
            validator,
            amount: convertMicroDenomToDenomWithDecimals(
              delegated.amount,
              token.decimals
            ),
            rewards: convertMicroDenomToDenomWithDecimals(
              pendingReward.amount,
              token.decimals
            ),
          })
        )
      : []

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
    if (!signingCosmWasmClient || !walletAddress) {
      toast.error(t('error.connectWalletToContinue'))
      return
    }

    setLoading(true)
    try {
      const microAmount = convertDenomToMicroDenomWithDecimals(
        amount,
        NATIVE_DECIMALS
      ).toString()

      if (mode === StakingMode.Stake) {
        await signingCosmWasmClient.signAndBroadcast(
          walletAddress,
          [
            cwMsgToEncodeObject(
              {
                staking: {
                  delegate: {
                    amount: coin(microAmount, NATIVE_DENOM),
                    validator,
                  },
                },
              },
              walletAddress
            ),
          ],
          'auto'
        )
      } else if (mode === StakingMode.Unstake) {
        await signingCosmWasmClient.signAndBroadcast(
          walletAddress,
          [
            cwMsgToEncodeObject(
              {
                staking: {
                  undelegate: {
                    amount: coin(microAmount, NATIVE_DENOM),
                    validator,
                  },
                },
              },
              walletAddress
            ),
          ],
          'auto'
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
      loadingStakableTokens={
        walletBalance === undefined
          ? { loading: true }
          : {
              loading: false,
              data: walletBalance,
            }
      }
      onAction={onAction}
      setAmount={setAmount}
      tokenDecimals={token.decimals}
      tokenDenom={token.denomOrAddress}
      tokenSymbol={token.symbol}
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
