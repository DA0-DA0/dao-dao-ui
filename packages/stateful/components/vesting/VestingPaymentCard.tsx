import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  refreshVestingAtom,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state/recoil'
import {
  VestingPaymentCard as StatelessVestingPaymentCard,
  useAddToken,
  useCachedLoadable,
  useChain,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, EntityType, VestingInfo } from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  getDaoProposalSinglePrefill,
  getNativeTokenForChainId,
  loadableToLoadingData,
  processError,
} from '@dao-dao/utils'

import {
  useAwaitNextBlock,
  useEntity,
  useWallet,
  useWalletInfo,
} from '../../hooks'
import {
  useDistribute,
  useWithdrawDelegatorRewards,
} from '../../hooks/contracts/CwVesting'
import { tokenCardLazyInfoSelector } from '../../recoil'
import { ButtonLink } from '../ButtonLink'
import { EntityDisplay } from '../EntityDisplay'
import { VestingStakingModal } from './VestingStakingModal'

export const VestingPaymentCard = (vestingInfo: VestingInfo) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const { goToDaoProposal } = useDaoNavHelpers()
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
    steps,
  } = vestingInfo

  const recipientEntity = useEntity(vest.recipient)
  const recipientIsDao =
    !recipientEntity.loading && recipientEntity.data.type === EntityType.Dao

  const lazyInfoLoading = loadableToLoadingData(
    useCachedLoadable(
      tokenCardLazyInfoSelector({
        owner: vestingContractAddress,
        token,
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

  const awaitNextBlock = useAwaitNextBlock()

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
      if (recipientIsDao) {
        await goToDaoProposal(recipientEntity.data.address, 'create', {
          prefill: getDaoProposalSinglePrefill({
            actions: [
              {
                actionKey: ActionKey.Execute,
                data: {
                  chainId,
                  address: vestingContractAddress,
                  message: JSON.stringify(
                    {
                      distribute: {},
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
        await distribute({})

        // Give time for indexer to update and then refresh.
        await awaitNextBlock()

        refresh()
        refreshBalances()
        toast.success(t('success.withdrewPayment'))
      }
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
        if (recipientIsDao) {
          await goToDaoProposal(recipientEntity.data.address, 'create', {
            prefill: getDaoProposalSinglePrefill({
              actions: validators?.map((validator) => ({
                actionKey: ActionKey.Execute,
                data: {
                  chainId,
                  address: vestingContractAddress,
                  message: JSON.stringify(
                    {
                      withdraw_delegator_reward: {
                        validator,
                      },
                    },
                    null,
                    2
                  ),
                  funds: [],
                  cw20: false,
                },
              })),
            }),
          })
        } else {
          await claim({
            validators,
          })

          // Give time for indexer to update and then refresh.
          await awaitNextBlock()

          refresh()
          toast.success(t('success.claimedRewards'))
        }
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
  const canManageStaking =
    (recipientIsWallet || recipientIsDao) &&
    token.denomOrAddress === getNativeTokenForChainId(chainId).denomOrAddress

  const [showStakingModal, setShowStakingModal] = useState(false)

  return (
    <>
      <StatelessVestingPaymentCard
        ButtonLink={ButtonLink}
        EntityDisplay={EntityDisplay}
        canClaimStakingRewards={
          !lazyInfoLoading.loading &&
          !!lazyInfoLoading.data.stakingInfo?.totalPendingRewards
        }
        canceled={
          // Canceled vests have their curves set to constant.
          'constant' in vest.vested
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
          canManageStaking ? () => setShowStakingModal(true) : undefined
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
        steps={steps}
        title={vest.title}
        token={token}
        withdrawing={withdrawing}
      />

      {canManageStaking && (
        <VestingStakingModal
          onClose={() => setShowStakingModal(false)}
          recipientIsDao={recipientIsDao}
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
