import { useWallet } from '@noahsaso/cosmodal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  CwVestingSelectors,
  nativeUnstakingDurationSecondsSelector,
  refreshVestingAtom,
  validatorsSelector,
} from '@dao-dao/state/recoil'
import {
  StakingModal,
  StakingModalProps,
  StakingMode,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
  processError,
} from '@dao-dao/utils'

import { useAwaitNextBlock } from '../../../../../hooks'
import {
  useDelegate,
  useUndelegate,
} from '../../../../../hooks/contracts/CwVesting'

export type NativeStakingModalProps = Pick<
  StakingModalProps,
  'visible' | 'onClose'
> & {
  vestingContractAddress: string
}

export const NativeStakingModal = ({
  vestingContractAddress,
  ...props
}: NativeStakingModalProps) => {
  const { t } = useTranslation()
  const { chainId } = useDaoInfoContext()

  const vestingPaymentLoadable = useCachedLoadable(
    CwVestingSelectors.infoSelector({
      contractAddress: vestingContractAddress,
      chainId,
      params: [],
    })
  )

  const vestedAmountLoadable = useCachedLoadable(
    CwVestingSelectors.vestedAmountSelector({
      contractAddress: vestingContractAddress,
      chainId,
      params: [],
    })
  )

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

  const setRefresh = useSetRecoilState(
    refreshVestingAtom(vestingContractAddress)
  )
  const awaitNextBlock = useAwaitNextBlock()

  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  const { address: walletAddress = '' } = useWallet()
  const delegate = useDelegate({
    contractAddress: vestingContractAddress,
    sender: walletAddress,
  })
  const undelegate = useUndelegate({
    contractAddress: vestingContractAddress,
    sender: walletAddress,
  })

  if (
    vestingPaymentLoadable.state !== 'hasValue' ||
    vestedAmountLoadable.state !== 'hasValue' ||
    validatorsLoadable.state !== 'hasValue'
  ) {
    return null
  }

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

    setLoading(true)
    try {
      if (mode === StakingMode.Stake) {
        await delegate({
          amount: convertDenomToMicroDenomWithDecimals(
            amount,
            NATIVE_DECIMALS
          ).toString(),
          validator,
        })
      } else if (mode === StakingMode.Unstake) {
        await undelegate({
          amount: convertDenomToMicroDenomWithDecimals(
            amount,
            NATIVE_DECIMALS
          ).toString(),
          validator,
        })
      }

      // Wait a block for balances to update.
      await awaitNextBlock()
      setRefresh((id) => id + 1)

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
      loadingStakableTokens={{
        loading: false,
        data: convertMicroDenomToDenomWithDecimals(
          Number(vestingPaymentLoadable.contents.amount) -
            Number(vestingPaymentLoadable.contents.staked_amount),
          NATIVE_DECIMALS
        ),
      }}
      onAction={onAction}
      setAmount={setAmount}
      tokenDecimals={NATIVE_DECIMALS}
      tokenDenom={NATIVE_DENOM}
      tokenSymbol={nativeTokenLabel(NATIVE_DENOM)}
      unstakingDuration={
        unstakingDurationLoadable.state === 'hasValue'
          ? { time: unstakingDurationLoadable.contents }
          : null
      }
      validatorPicker={{
        validators: validatorsLoadable.contents,
      }}
      {...props}
    />
  )
}
