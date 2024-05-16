import { coins } from '@cosmjs/stargate'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'

import {
  Cw20BaseSelectors,
  nativeDenomBalanceSelector,
  refreshWalletBalancesIdAtom,
} from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import {
  CHAIN_GAS_MULTIPLIER,
  MAX_NUM_PROPOSAL_CHOICES,
  expirationExpired,
  findWasmAttributeValue,
  processError,
} from '@dao-dao/utils'

import {
  Cw20BaseHooks,
  DaoPreProposeMultipleHooks,
  DaoProposalMultipleHooks,
  useAwaitNextBlock,
  useMembership,
  useSimulateCosmosMsgs,
  useWalletWithSecretNetworkPermit,
} from '../../../../../hooks'
import {
  MakeUsePublishProposalOptions,
  NewProposalData,
  PublishProposal,
  SimulateProposal,
  UsePublishProposal,
} from '../../types'
import { anyoneCanProposeSelector } from '../selectors'

export const makeUsePublishProposal =
  ({
    options: {
      chain: { chain_id: chainId },
      coreAddress,
      proposalModule,
    },
    depositInfoSelector,
  }: MakeUsePublishProposalOptions): UsePublishProposal =>
  () => {
    const { t } = useTranslation()
    const {
      isSecretNetwork,
      isWalletConnected,
      address: walletAddress,
      getPermit,
      getStargateClient,
    } = useWalletWithSecretNetworkPermit({
      dao: coreAddress,
    })
    const { isMember = false } = useMembership({
      coreAddress,
    })

    const anyoneCanPropose = useRecoilValueLoadable(
      anyoneCanProposeSelector({
        chainId,
        preProposeAddress: proposalModule.prePropose?.address ?? null,
      })
    )

    const depositInfo = useRecoilValueLoadable(depositInfoSelector)
    const depositInfoCw20TokenAddress =
      depositInfo.state === 'hasValue' &&
      depositInfo.contents?.denom &&
      'cw20' in depositInfo.contents.denom
        ? depositInfo.contents.denom.cw20
        : undefined
    const depositInfoNativeTokenDenom =
      depositInfo.state === 'hasValue' &&
      depositInfo.contents?.denom &&
      'native' in depositInfo.contents.denom
        ? depositInfo.contents.denom.native
        : undefined
    const requiredProposalDeposit = Number(
      depositInfo.valueMaybe()?.amount ?? '0'
    )

    // For checking allowance and increasing if necessary.
    const cw20DepositTokenAllowanceResponseLoadable = useCachedLoadable(
      depositInfoCw20TokenAddress && requiredProposalDeposit && walletAddress
        ? Cw20BaseSelectors.allowanceSelector({
            chainId,
            contractAddress: depositInfoCw20TokenAddress,
            params: [
              {
                owner: walletAddress,
                // If pre-propose address set, give that one deposit allowance
                // instead of proposal module.
                spender:
                  proposalModule.prePropose?.address || proposalModule.address,
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
            chainId,
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
            chainId,
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

    const doPropose = DaoProposalMultipleHooks.usePropose({
      contractAddress: proposalModule.address,
      sender: walletAddress ?? '',
    })
    const doProposePrePropose = DaoPreProposeMultipleHooks.usePropose({
      contractAddress: proposalModule.prePropose?.address ?? '',
      sender: walletAddress ?? '',
    })

    const awaitNextBlock = useAwaitNextBlock()
    const simulateMsgs = useSimulateCosmosMsgs(coreAddress)

    // If simulation fails and `failedSimulationBypassDuration` is defined,
    // allow bypassing for a period of time by setting this to a date in the
    // future.
    const [simulationBypassExpiration, setSimulationBypassExpiration] =
      useState<Date>()
    // Clear bypass expiration when it expires to trigger re-renders.
    useEffect(() => {
      if (simulationBypassExpiration) {
        const timeout = setTimeout(
          () => setSimulationBypassExpiration(undefined),
          simulationBypassExpiration.getTime() - Date.now()
        )
        return () => clearTimeout(timeout)
      }
    }, [simulationBypassExpiration])

    const simulateProposal: SimulateProposal = useCallback(
      async ({ choices }) => {
        try {
          if (!choices.options.filter((c) => c.msgs.length > 0)) {
            throw new Error(t('error.noActionsToSimulate'))
          }

          // Simulate each option's message set separately. If the DAO only has
          // 1 $JUNO, and two options both contain spending all 1 $JUNO, the
          // simulation will fail because the DAO does not have sufficient
          // funds. Combining all the messages into one simulation will function
          // like all messages are executed together, but in reality, only one
          // choice will be executed. Thus, just make sure each individual set
          // of messages is valid together.
          await Promise.all(
            choices.options.map(({ msgs }) => simulateMsgs(msgs))
          )

          toast.success(t('success.proposalSimulation'))
        } catch (err) {
          console.error(err)
          toast.error(processError(err, { forceCapture: false }))
        }
      },
      [simulateMsgs, t]
    )

    const publishProposal: PublishProposal = useCallback(
      async (
        { title, description, choices },
        { failedSimulationBypassSeconds = 0 } = {}
      ) => {
        if (!isWalletConnected) {
          throw new Error(t('error.logInToContinue'))
        }
        if (
          anyoneCanPropose.state === 'hasValue' &&
          !anyoneCanPropose.contents &&
          !isMember
        ) {
          throw new Error(t('error.mustBeMemberToCreateProposal'))
        }
        if (depositUnsatisfied) {
          throw new Error(t('error.notEnoughForDeposit'))
        }

        if (choices.options.length < 2) {
          throw new Error(t('error.tooFewChoices'))
        }

        if (choices.options.length > MAX_NUM_PROPOSAL_CHOICES) {
          throw new Error(
            t('error.tooManyChoices', { count: MAX_NUM_PROPOSAL_CHOICES })
          )
        }

        // Only simulate messages if any exist. Allow proposals without
        // messages. Also allow bypassing simulation check for a period of time.
        if (
          choices.options.filter((c) => c.msgs.length > 0) &&
          (!simulationBypassExpiration ||
            simulationBypassExpiration < new Date())
        ) {
          try {
            // Throws error if simulation fails, indicating invalid message.
            //
            // Simulate each option's message set separately. If the DAO only
            // has 1 $JUNO, and two options both contain spending all 1 $JUNO,
            // the simulation will fail because the DAO does not have sufficient
            // funds. Combining all the messages into one simulation will
            // function like all messages are executed together, but in reality,
            // only one choice will be executed. Thus, just make sure each
            // individual set of messages is valid together.
            await Promise.all(
              choices.options.map(({ msgs }) => simulateMsgs(msgs))
            )
          } catch (err) {
            // If failed simulation bypass duration is set, allow bypassing
            // simulation check for a period of time.
            if (failedSimulationBypassSeconds > 0) {
              setSimulationBypassExpiration(
                new Date(Date.now() + failedSimulationBypassSeconds * 1000)
              )
            }

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
              (await (await getStargateClient()).getBlock()).header.height
            )
              ? 0
              : Number(cw20DepositTokenAllowanceResponse.allowance))

          // Request to increase the contract's allowance for the proposal
          // deposit if needed.
          if (remainingAllowanceNeeded) {
            try {
              await increaseCw20DepositAllowance({
                amount: BigInt(remainingAllowanceNeeded).toString(),
                spender:
                  // If pre-propose address set, give that one deposit allowance
                  // instead of proposal module.
                  proposalModule.prePropose?.address || proposalModule.address,
              })

              // Allowances will not update until the next block has been added.
              awaitNextBlock().then(refreshBalances)
            } catch (err) {
              throw new Error(
                `Failed to increase allowance to pay proposal deposit: (${processError(
                  err,
                  // Don't send to Sentry, but still format SDK errors nicely.
                  { forceCapture: false }
                )})`
              )
            }
          }
        }

        // Native token deposit if exists.
        const proposeFunds =
          requiredProposalDeposit && depositInfoNativeTokenDenom
            ? coins(
                BigInt(requiredProposalDeposit).toString(),
                depositInfoNativeTokenDenom
              )
            : undefined

        // Recreate form data with just the expected fields to remove any fields
        // added by other proposal module forms.
        const proposalData: NewProposalData = {
          title,
          description,
          choices,
        }

        let { events } = proposalModule.prePropose
          ? await doProposePrePropose(
              {
                msg: {
                  propose: proposalData,
                },
                ...(isSecretNetwork && {
                  auth: {
                    permit: await getPermit(),
                  },
                }),
              },
              CHAIN_GAS_MULTIPLIER,
              undefined,
              proposeFunds
            )
          : await doPropose(
              proposalData,
              CHAIN_GAS_MULTIPLIER,
              undefined,
              proposeFunds
            )

        if (proposeFunds?.length) {
          refreshBalances()
        }

        const proposalNumber = Number(
          findWasmAttributeValue(
            events,
            proposalModule.address,
            'proposal_id'
          ) ?? -1
        )
        if (proposalNumber === -1) {
          throw new Error(t('error.proposalIdNotFound'))
        }
        const proposalId = `${proposalModule.prefix}${proposalNumber}`

        return {
          proposalNumber,
          proposalId,
        }
      },
      [
        isWalletConnected,
        anyoneCanPropose,
        isMember,
        depositUnsatisfied,
        simulationBypassExpiration,
        requiredProposalDeposit,
        depositInfoCw20TokenAddress,
        depositInfoNativeTokenDenom,
        doProposePrePropose,
        isSecretNetwork,
        getPermit,
        doPropose,
        t,
        simulateMsgs,
        cw20DepositTokenAllowanceResponse,
        getStargateClient,
        increaseCw20DepositAllowance,
        awaitNextBlock,
        refreshBalances,
      ]
    )

    return {
      simulateProposal,
      publishProposal,
      // Default to true while loading. This is safe because the contract will
      // reject anyone who is unauthorized. Defaulting to true here results in
      // hiding the error until the real value is ready.
      anyoneCanPropose: anyoneCanPropose.valueMaybe() ?? true,
      depositUnsatisfied,
      simulationBypassExpiration,
    }
  }
