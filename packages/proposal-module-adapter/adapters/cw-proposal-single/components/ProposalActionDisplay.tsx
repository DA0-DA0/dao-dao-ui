import { AnalyticsOutlined, CopyAllOutlined } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { ActionsRenderer } from '@dao-dao/actions'
import { useVotingModule } from '@dao-dao/state'
import {
  ActionAndData,
  BaseProposalActionDisplayProps,
  ContractVersion,
} from '@dao-dao/tstypes'
import { DepositRefundPolicy } from '@dao-dao/tstypes/contracts/CwPreProposeSingle'
import { Status } from '@dao-dao/tstypes/contracts/CwProposalSingle.common'
import {
  Button,
  CloseProposal,
  CosmosMessageDisplay,
  ExecuteProposal,
} from '@dao-dao/ui'
import { decodeMessages, processError } from '@dao-dao/utils'

import { useProposalModuleAdapterContext } from '../../../react'
import { configSelector } from '../contracts/CwProposalSingle.common.recoil'
import {
  useClose as useCloseV1,
  useExecute as useExecuteV1,
} from '../contracts/CwProposalSingle.v1.hooks'
import {
  useClose as useCloseV2,
  useExecute as useExecuteV2,
} from '../contracts/CwProposalSingle.v2.hooks'
import { useDepositInfo, useProposal } from '../hooks'
import { NewProposalForm } from '../types'

export const ProposalActionDisplay = ({
  onDuplicate,
  availableActions,
  onCloseSuccess,
  onExecuteSuccess,
}: BaseProposalActionDisplayProps<NewProposalForm>) => {
  const { t } = useTranslation()
  const [showRaw, setShowRaw] = useState(false)
  const {
    id: proposalModuleAdapterId,
    options: { coreAddress, Logo, Loader, proposalModule, proposalNumber },
  } = useProposalModuleAdapterContext()
  const { connected, address: walletAddress = '' } = useWallet()
  const { isMember = false } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })

  const config = useRecoilValue(
    configSelector({
      contractAddress: proposalModule.address,
    })
  )
  const proposal = useProposal()
  const depositInfo = useDepositInfo()

  const decodedMessages = useMemo(
    () => decodeMessages(proposal.msgs),
    [proposal.msgs]
  )

  // Call relevant action hooks in the same order every time.
  const actionData: ActionAndData[] = decodedMessages.map((message) => {
    const actionMatch = availableActions
      .map((action) => ({
        action,
        ...action.useDecodedCosmosMsg(message, coreAddress),
      }))
      .find(({ match }) => match)

    // There should always be a match since custom matches all. This should
    // never happen as long as the Custom action exists.
    if (!actionMatch?.match) {
      throw new Error(t('error.loadingData'))
    }

    return {
      action: actionMatch.action,
      data: actionMatch.data,
    }
  })

  const executeProposal = (
    proposalModule.version === ContractVersion.V0_1_0
      ? useExecuteV1
      : useExecuteV2
  )({
    contractAddress: proposalModule.address,
    sender: walletAddress,
  })
  const closeProposal = (
    proposalModule.version === ContractVersion.V0_1_0 ? useCloseV1 : useCloseV2
  )({
    contractAddress: proposalModule.address,
    sender: walletAddress,
  })

  const [loading, setLoading] = useState(false)

  const onExecute = useCallback(async () => {
    if (!connected) return

    setLoading(true)

    try {
      await executeProposal({
        proposalId: proposalNumber,
      })

      await onExecuteSuccess()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setLoading(false)
    }
  }, [connected, executeProposal, proposalNumber, onExecuteSuccess])

  const onClose = useCallback(async () => {
    if (!connected) return

    setLoading(true)

    try {
      await closeProposal({
        proposalId: proposalNumber,
      })

      await onCloseSuccess()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setLoading(false)
    }
  }, [connected, closeProposal, proposalNumber, onCloseSuccess])

  return (
    <div className="space-y-6">
      {decodedMessages?.length ? (
        <div className="space-y-3">
          <ActionsRenderer
            Loader={Loader}
            Logo={Logo}
            actionData={actionData}
            coreAddress={coreAddress}
          />

          <div className="flex flex-row gap-7 items-center">
            <Button onClick={() => setShowRaw((s) => !s)} variant="ghost">
              <AnalyticsOutlined className="text-icon-secondary" />
              <p className="secondary-text">
                {showRaw ? t('button.hideRawData') : t('button.showRawData')}
              </p>
            </Button>

            <Button
              onClick={() =>
                onDuplicate({
                  id: proposalModuleAdapterId,
                  data: {
                    title: proposal.title,
                    description: proposal.description,
                    actionData: actionData.map(({ action: { key }, data }) => ({
                      key,
                      data,
                    })),
                  },
                })
              }
              variant="ghost"
            >
              <CopyAllOutlined className="text-icon-secondary" />
              <p className="secondary-text">{t('button.duplicate')}</p>
            </Button>
          </div>

          {showRaw && (
            <CosmosMessageDisplay
              value={JSON.stringify(decodedMessages, undefined, 2)}
            />
          )}
        </div>
      ) : null}

      {proposal.status === Status.Passed &&
        // Show if anyone can execute OR if the wallet is a member.
        (!config.only_members_execute || isMember) && (
          <ExecuteProposal
            loading={loading}
            messages={proposal.msgs.length}
            onExecute={onExecute}
          />
        )}
      {proposal.status === Status.Rejected && (
        <CloseProposal
          loading={loading}
          onClose={onClose}
          willRefundProposalDeposit={
            depositInfo?.refund_policy === DepositRefundPolicy.Always ?? false
          }
        />
      )}
    </div>
  )
}
