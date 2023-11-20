import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  nativeUnstakingDurationSecondsSelector,
  refreshNativeTokenStakingInfoAtom,
  refreshVestingAtom,
  refreshWalletBalancesIdAtom,
  validatorsSelector,
} from '@dao-dao/state/recoil'
import {
  StakingModal,
  StakingModalProps,
  StakingMode,
  useCachedLoadable,
  useChain,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, TokenStake, VestingInfo } from '@dao-dao/types'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  getDaoProposalSinglePrefill,
  getNativeTokenForChainId,
  processError,
} from '@dao-dao/utils'

import { useAwaitNextBlock, useWallet } from '../../hooks'
import {
  useDelegate,
  useRedelegate,
  useUndelegate,
} from '../../hooks/contracts/CwVesting'

export type VestingStakingModalProps = Pick<
  StakingModalProps,
  'visible' | 'onClose'
> & {
  vestingInfo: VestingInfo
  stakes: TokenStake[] | undefined
  recipientIsDao: boolean
}

export const VestingStakingModal = ({
  vestingInfo: {
    vestingContractAddress,
    stakable,
    vest: { recipient },
  },
  stakes,
  recipientIsDao,
  ...props
}: VestingStakingModalProps) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const { goToDaoProposal } = useDaoNavHelpers()

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

  // Refreshes validator balances.
  const setRefreshValidatorBalances = useSetRecoilState(
    refreshWalletBalancesIdAtom('')
  )
  const setRefreshVesting = useSetRecoilState(
    refreshVestingAtom(vestingContractAddress)
  )
  const setRefreshStaking = useSetRecoilState(
    refreshNativeTokenStakingInfoAtom(vestingContractAddress)
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
  const redelegate = useRedelegate({
    contractAddress: vestingContractAddress,
    sender: walletAddress,
  })

  if (validatorsLoadable.state !== 'hasValue') {
    return null
  }

  const nativeToken = getNativeTokenForChainId(chainId)

  const onAction = async (
    mode: StakingMode,
    amount: number,
    validator?: string,
    fromValidator?: string
  ) => {
    // Should never happen.
    if (!validator) {
      toast.error(t('error.noValidatorSelected'))
      return
    }

    setLoading(true)
    try {
      if (mode === StakingMode.Stake) {
        const data = {
          amount: convertDenomToMicroDenomWithDecimals(
            amount,
            nativeToken.decimals
          ).toString(),
          validator,
        }

        if (recipientIsDao) {
          await goToDaoProposal(recipient, 'create', {
            prefill: getDaoProposalSinglePrefill({
              actions: [
                {
                  actionKey: ActionKey.Execute,
                  data: {
                    chainId,
                    address: vestingContractAddress,
                    message: JSON.stringify(
                      {
                        delegate: data,
                      },
                      null,
                      2
                    ),
                    funds: [],
                    cw20: false,
                  },
                },
              ],
            }),
          })
        } else {
          await delegate(data)
        }
      } else if (mode === StakingMode.Unstake) {
        const data = {
          amount: convertDenomToMicroDenomWithDecimals(
            amount,
            nativeToken.decimals
          ).toString(),
          validator,
        }

        if (recipientIsDao) {
          await goToDaoProposal(recipient, 'create', {
            prefill: getDaoProposalSinglePrefill({
              actions: [
                {
                  actionKey: ActionKey.Execute,
                  data: {
                    chainId,
                    address: vestingContractAddress,
                    message: JSON.stringify(
                      {
                        undelegate: data,
                      },
                      null,
                      2
                    ),
                    funds: [],
                    cw20: false,
                  },
                },
              ],
            }),
          })
        } else {
          await undelegate(data)
        }
      } else if (mode === StakingMode.Restake) {
        if (!fromValidator) {
          toast.error(t('error.noFromValidatorSelected'))
          return
        }

        const data = {
          amount: convertDenomToMicroDenomWithDecimals(
            amount,
            nativeToken.decimals
          ).toString(),
          dstValidator: validator,
          srcValidator: fromValidator,
        }

        if (recipientIsDao) {
          await goToDaoProposal(recipient, 'create', {
            prefill: getDaoProposalSinglePrefill({
              actions: [
                {
                  actionKey: ActionKey.Execute,
                  data: {
                    chainId,
                    address: vestingContractAddress,
                    message: JSON.stringify(
                      {
                        redelegate: data,
                      },
                      null,
                      2
                    ),
                    funds: [],
                    cw20: false,
                  },
                },
              ],
            }),
          })
        } else {
          await redelegate(data)
        }
      }

      if (!recipientIsDao) {
        // Wait a block for balances to update.
        await awaitNextBlock()
        setRefreshValidatorBalances((id) => id + 1)
        setRefreshVesting((id) => id + 1)
        setRefreshStaking((id) => id + 1)

        toast.success(
          mode === StakingMode.Stake
            ? t('success.staked')
            : mode === StakingMode.Restake
            ? t('success.restaked')
            : mode === StakingMode.Unstake
            ? t('success.unstaked')
            : // Should never happen.
              t('error.loadingData')
        )
      }

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
      actionPrefix={recipientIsDao ? t('button.propose') + ': ' : undefined}
      amount={amount}
      claimableTokens={
        // Tokens are claimable somewhere else.
        0
      }
      enableRestaking
      initialMode={StakingMode.Stake}
      loading={loading}
      loadingStakableTokens={{
        loading: false,
        data: convertMicroDenomToDenomWithDecimals(
          stakable,
          nativeToken.decimals
        ),
      }}
      onAction={onAction}
      setAmount={setAmount}
      token={nativeToken}
      unstakingDuration={
        unstakingDurationLoadable.state === 'hasValue'
          ? { time: unstakingDurationLoadable.contents }
          : null
      }
      validatorPicker={{
        validators: validatorsLoadable.contents,
        stakes,
      }}
      {...props}
    />
  )
}
