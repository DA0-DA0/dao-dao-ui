import { coins } from '@cosmjs/stargate'
import { findAttribute } from '@cosmjs/stargate/build/logs'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  Cw20BaseSelectors,
  blockHeightSelector,
  nativeDenomBalanceSelector,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { ContractVersion } from '@dao-dao/types'
import { expirationExpired, processError } from '@dao-dao/utils'

import {
  Cw20BaseHooks,
  useAwaitNextBlock,
  useSimulateCosmosMsgs,
  useVotingModule,
} from '../../../../../hooks'
import { usePropose as useProposePrePropose } from '../../contracts/CwdPreProposeSingle.hooks'
import { usePropose as useProposeV2 } from '../../contracts/CwdProposalSingle.v2.hooks'
import { usePropose as useProposeV1 } from '../../contracts/CwProposalSingle.v1.hooks'
import {
  MakeUsePublishProposalOptions,
  PublishProposal,
  UsePublishProposal,
} from '../../types'

export const makeUsePublishProposal =
  ({
    options: { chainId, coreAddress, proposalModule },
    depositInfoSelector,
  }: MakeUsePublishProposalOptions): UsePublishProposal =>
  () => {
    const { t } = useTranslation()
    const { connected, address: walletAddress } = useWallet()
    const { isMember = false } = useVotingModule(coreAddress, {
      fetchMembership: true,
    })

    const depositInfo = useRecoilValue(depositInfoSelector)
    const depositInfoCw20TokenAddress =
      depositInfo?.denom && 'cw20' in depositInfo.denom
        ? depositInfo.denom.cw20
        : undefined
    const depositInfoNativeTokenDenom =
      depositInfo?.denom && 'native' in depositInfo.denom
        ? depositInfo.denom.native
        : undefined

    const blockHeightLoadable = useCachedLoadable(blockHeightSelector({}))
    const blockHeight =
      blockHeightLoadable.state === 'hasValue'
        ? blockHeightLoadable.contents
        : undefined

    const requiredProposalDeposit = Number(depositInfo?.amount ?? '0')

    // For checking allowance and increasing if necessary.
    const cw20DepositTokenAllowanceResponseLoadable = useCachedLoadable(
      depositInfoCw20TokenAddress && requiredProposalDeposit && walletAddress
        ? Cw20BaseSelectors.allowanceSelector({
            contractAddress: depositInfoCw20TokenAddress,
            params: [
              {
                owner: walletAddress,
                // If pre-propose address set, give that one deposit allowance
                // instead of proposal module.
                spender:
                  proposalModule.preProposeAddress || proposalModule.address,
              },
            ],
          })
        : constSelector(undefined)
    )
    const cw20DepositTokenAllowanceResponse =
      cw20DepositTokenAllowanceResponseLoadable.state === 'hasValue'
        ? cw20DepositTokenAllowanceResponseLoadable.contents
        : undefined

    const cw20DepositTokenBalanceLoadable = useCachedLoadable(
      requiredProposalDeposit && walletAddress && depositInfoCw20TokenAddress
        ? Cw20BaseSelectors.balanceSelector({
            contractAddress: depositInfoCw20TokenAddress,
            params: [{ address: walletAddress }],
          })
        : constSelector(undefined)
    )
    const cw20DepositTokenBalance =
      cw20DepositTokenBalanceLoadable.state === 'hasValue'
        ? cw20DepositTokenBalanceLoadable.contents
        : undefined

    const nativeDepositTokenBalanceLoadable = useCachedLoadable(
      requiredProposalDeposit && walletAddress && depositInfoNativeTokenDenom
        ? nativeDenomBalanceSelector({
            walletAddress,
            denom: depositInfoNativeTokenDenom,
          })
        : constSelector(undefined)
    )
    const nativeDepositTokenBalance =
      nativeDepositTokenBalanceLoadable.state === 'hasValue'
        ? nativeDepositTokenBalanceLoadable.contents
        : undefined

    // True if deposit is needed and cannot be paid.
    const depositUnsatisfied =
      // Requires deposit.
      requiredProposalDeposit > 0 &&
      // Has cw20 deposit and insufficient balance.
      ((!!depositInfoCw20TokenAddress &&
        (!cw20DepositTokenBalance ||
          Number(cw20DepositTokenBalance.balance) < requiredProposalDeposit)) ||
        // Has native deposit and insufficient balance.
        (!!depositInfoNativeTokenDenom &&
          (!nativeDepositTokenBalance ||
            Number(nativeDepositTokenBalance.amount) <
              requiredProposalDeposit)))

    const setRefreshWalletBalancesId = useSetRecoilState(
      refreshWalletBalancesIdAtom(walletAddress ?? '')
    )
    const refreshBalances = useCallback(
      () => setRefreshWalletBalancesId((id) => id + 1),
      [setRefreshWalletBalancesId]
    )

    const increaseCw20DepositAllowance = Cw20BaseHooks.useIncreaseAllowance({
      contractAddress: depositInfoCw20TokenAddress ?? '',
      sender: walletAddress ?? '',
    })
    const doProposeV1 = useProposeV1({
      contractAddress: proposalModule.address,
      sender: walletAddress ?? '',
    })
    const doProposeV2 = useProposeV2({
      contractAddress: proposalModule.address,
      sender: walletAddress ?? '',
    })
    const doProposePrePropose = useProposePrePropose({
      contractAddress: proposalModule.preProposeAddress ?? '',
      sender: walletAddress ?? '',
    })

    const awaitNextBlock = useAwaitNextBlock()

    const simulateMsgs = useSimulateCosmosMsgs({
      senderAddress: coreAddress,
      chainId,
    })

    const publishProposal: PublishProposal = useCallback(
      async (newProposalData, { bypassSimulation = false } = {}) => {
        if (!connected) {
          throw new Error(t('error.connectWalletToContinue'))
        }
        if (blockHeight === undefined) {
          throw new Error(t('error.loadingData'))
        }
        if (!isMember) {
          throw new Error(t('error.mustBeMemberToCreateProposal'))
        }
        if (depositUnsatisfied) {
          throw new Error(t('error.notEnoughForDeposit'))
        }

        // Only simulate messages if any exist. Allow proposals without
        // messages. Also allow bypassing simulation check.
        if (newProposalData.msgs.length > 0 && !bypassSimulation) {
          try {
            // Throws error if simulation fails, indicating invalid message.
            await simulateMsgs(newProposalData.msgs)
          } catch (err) {
            throw new Error(
              `${t('error.simulationFailedInvalidProposalActions')} ${
                // Don't send to Sentry, but still format SDK errors nicely.
                processError(err, { forceCapture: false })
              }`
            )
          }
        }

        // Increase CW20 deposit token allowance if necessary.
        if (requiredProposalDeposit && depositInfoCw20TokenAddress) {
          // CW20 allowance response must be checked.
          if (!cw20DepositTokenAllowanceResponse) {
            throw new Error(t('error.loadingData'))
          }

          const remainingAllowanceNeeded =
            requiredProposalDeposit -
            // If allowance expired, none.
            (expirationExpired(
              cw20DepositTokenAllowanceResponse.expires,
              blockHeight
            )
              ? 0
              : Number(cw20DepositTokenAllowanceResponse.allowance))

          // Request to increase the contract's allowance for the proposal
          // deposit if needed.
          if (remainingAllowanceNeeded) {
            try {
              await increaseCw20DepositAllowance({
                amount: remainingAllowanceNeeded.toString(),
                spender:
                  // If pre-propose address set, give that one deposit allowance
                  // instead of proposal module.
                  proposalModule.preProposeAddress || proposalModule.address,
              })

              // Allowances will not update until the next block has been added.
              awaitNextBlock().then(refreshBalances)
            } catch (err) {
              throw new Error(
                `Failed to increase allowance to pay proposal deposit: (${processError(
                  err,
                  // Don't send to Sentry, but still format SDK errors nicely.
                  { forceCapture: true }
                )})`
              )
            }
          }
        }

        // Native token deposit if exists.
        const proposeFunds =
          requiredProposalDeposit && depositInfoNativeTokenDenom
            ? coins(requiredProposalDeposit, depositInfoNativeTokenDenom)
            : undefined

        let response
        //! V1
        if (proposalModule.version === ContractVersion.V1) {
          response = await doProposeV1(
            newProposalData,
            'auto',
            undefined,
            proposeFunds
          )
          //! V2 supports pre-propose
        } else {
          response = proposalModule.preProposeAddress
            ? await doProposePrePropose(
                {
                  msg: {
                    propose: newProposalData,
                  },
                },
                'auto',
                undefined,
                proposeFunds
              )
            : await doProposeV2(
                newProposalData,
                'auto',
                undefined,
                proposeFunds
              )
        }

        if (proposeFunds?.length) {
          refreshBalances()
        }

        const proposalNumber = Number(
          findAttribute(response.logs, 'wasm', 'proposal_id').value
        )
        const proposalId = `${proposalModule.prefix}${proposalNumber}`

        return {
          proposalNumber,
          proposalId,
        }
      },
      [
        connected,
        blockHeight,
        isMember,
        depositUnsatisfied,
        requiredProposalDeposit,
        depositInfoCw20TokenAddress,
        depositInfoNativeTokenDenom,
        t,
        simulateMsgs,
        cw20DepositTokenAllowanceResponse,
        increaseCw20DepositAllowance,
        awaitNextBlock,
        refreshBalances,
        doProposeV1,
        doProposePrePropose,
        doProposeV2,
      ]
    )

    return {
      publishProposal,
      depositUnsatisfied,
    }
  }
