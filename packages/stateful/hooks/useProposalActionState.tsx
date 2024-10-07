import { CancelOutlined, Key, Send } from '@mui/icons-material'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { DaoProposalSingleCommonSelectors } from '@dao-dao/state'
import {
  ProposalCrossChainRelayStatus,
  ProposalStatusAndInfoProps,
  TextInput,
  useConfiguredChainContext,
  useDao,
} from '@dao-dao/stateless'
import {
  ChainId,
  LoadingData,
  PreProposeModuleType,
  ProposalStatusEnum,
  ProposalStatusKey,
} from '@dao-dao/types'
import {
  DAO_CORE_ALLOW_MEMO_ON_EXECUTE_ITEM_KEY,
  NEUTRON_GOVERNANCE_DAO,
  processError,
} from '@dao-dao/utils'

import { ProfileProposalCard } from '../components'
import { useProposalModuleAdapterContext } from '../proposal-module-adapter'
import { useMembership } from './useMembership'
import { UseProposalRelayStateReturn } from './useProposalRelayState'
import { useWallet } from './useWallet'

export type UseProposalActionStateOptions = {
  relayState: UseProposalRelayStateReturn
  statusKey: ProposalStatusKey
  loadingExecutionTxHash: LoadingData<string | undefined>
  onExecuteSuccess: () => void | Promise<void>
  onCloseSuccess: () => void | Promise<void>
}

export type UseProposalActionStateReturn = Pick<
  ProposalStatusAndInfoProps,
  'action' | 'footer'
>

/**
 * This hook determines the action and footer to show on a proposal based on its
 * status. It is used in the proposal module adapters' ProposalStatusAndInfo
 * components.
 */
export const useProposalActionState = ({
  relayState,
  statusKey,
  loadingExecutionTxHash,
  onExecuteSuccess,
  onCloseSuccess,
}: UseProposalActionStateOptions): UseProposalActionStateReturn => {
  const { t } = useTranslation()
  const {
    chain: { chain_id: chainId },
  } = useConfiguredChainContext()
  const {
    coreAddress,
    info: { items },
  } = useDao()
  const {
    options: { proposalNumber },
    proposalModule,
  } = useProposalModuleAdapterContext()
  const {
    isWalletConnected,
    address: walletAddress = '',
    getSigningClient,
  } = useWallet()
  const { isMember = false } = useMembership()

  const config = useRecoilValue(
    DaoProposalSingleCommonSelectors.configSelector({
      chainId,
      contractAddress: proposalModule.address,
    })
  )

  const [actionLoading, setActionLoading] = useState(false)
  // On proposal status update, stop loading. This ensures the action button
  // doesn't stop loading too early, before the status has refreshed.
  useEffect(() => {
    setActionLoading(false)
  }, [statusKey])

  // If enabled, the user will be shown an input field to enter a memo for the
  // execution transaction.
  const allowMemoOnExecute = !!items[DAO_CORE_ALLOW_MEMO_ON_EXECUTE_ITEM_KEY]
  const [memo, setMemo] = useState('')

  const onExecute = useCallback(async () => {
    if (!isWalletConnected) {
      return
    }

    setActionLoading(true)
    try {
      await proposalModule.execute({
        proposalId: proposalNumber,
        getSigningClient,
        sender: walletAddress,
        memo: allowMemoOnExecute && memo ? memo : undefined,
      })

      await onExecuteSuccess()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))

      // Stop loading if errored.
      setActionLoading(false)
    }

    // Loading will stop on success when status refreshes.
  }, [
    isWalletConnected,
    proposalModule,
    proposalNumber,
    getSigningClient,
    walletAddress,
    allowMemoOnExecute,
    memo,
    onExecuteSuccess,
  ])

  const onClose = useCallback(async () => {
    if (!isWalletConnected) {
      return
    }

    setActionLoading(true)

    try {
      await proposalModule.close({
        proposalId: proposalNumber,
        getSigningClient,
        sender: walletAddress,
      })

      await onCloseSuccess()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))

      // Stop loading if errored.
      setActionLoading(false)
    }

    // Loading will stop on success when status refreshes.
  }, [
    isWalletConnected,
    proposalModule,
    proposalNumber,
    getSigningClient,
    walletAddress,
    onCloseSuccess,
  ])

  const showRelayStatus =
    !relayState.loading &&
    statusKey === ProposalStatusEnum.Executed &&
    relayState.data.hasCrossChainMessages

  return {
    action:
      statusKey === ProposalStatusEnum.Passed &&
      // Show if anyone can execute OR if the wallet is a member, once
      // polytone messages that need relaying are done loading.
      (!config.only_members_execute || isMember) &&
      !relayState.loading
        ? {
            label: t('button.execute'),
            Icon: Key,
            loading: actionLoading,
            doAction: relayState.data.needsSelfRelay
              ? relayState.data.openSelfRelay
              : onExecute,
            header: allowMemoOnExecute ? (
              <TextInput
                onChange={(e) => setMemo(e.target.value)}
                placeholder={t('info.memoPlaceholder')}
                value={memo}
              />
            ) : undefined,
          }
        : statusKey === ProposalStatusEnum.Rejected &&
          // Don't show for Neutron overrule proposals.
          !(
            chainId === ChainId.NeutronMainnet &&
            coreAddress === NEUTRON_GOVERNANCE_DAO &&
            proposalModule.prePropose?.type ===
              PreProposeModuleType.NeutronOverruleSingle
          )
        ? {
            label: t('button.close'),
            Icon: CancelOutlined,
            loading: actionLoading,
            doAction: onClose,
          }
        : // If executed and has polytone messages that need relaying...
        statusKey === ProposalStatusEnum.Executed &&
          !relayState.loading &&
          relayState.data.needsSelfRelay &&
          !loadingExecutionTxHash.loading &&
          loadingExecutionTxHash.data
        ? {
            label: t('button.relay'),
            Icon: Send,
            loading: actionLoading,
            doAction: relayState.data.openSelfRelay,
            description: t('error.polytoneExecutedNoRelay'),
          }
        : undefined,
    footer: (showRelayStatus || isWalletConnected) && (
      <div className="flex flex-col gap-6">
        {showRelayStatus && (
          <ProposalCrossChainRelayStatus state={relayState.data} />
        )}

        {isWalletConnected && <ProfileProposalCard />}
      </div>
    ),
  }
}
