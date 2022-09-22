import { AnalyticsOutlined, CopyAllOutlined } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { ActionsRenderer } from '@dao-dao/actions'
import {
  CwProposalSingleHooks,
  CwProposalSingleSelectors,
  useVotingModule,
} from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { ActionAndData, BaseProposalActionDisplayProps } from '@dao-dao/tstypes'
import {
  Button,
  CloseProposal,
  CosmosMessageDisplay,
  ExecuteProposal,
} from '@dao-dao/ui'
import { decodeMessages, processError } from '@dao-dao/utils'

import { useProposalModuleAdapterContext } from '../../../react'
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
    CwProposalSingleSelectors.configSelector({
      contractAddress: proposalModule.address,
    })
  )
  const { proposal } = useRecoilValue(
    CwProposalSingleSelectors.proposalSelector({
      contractAddress: proposalModule.address,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    })
  )

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

  const executeProposal = CwProposalSingleHooks.useExecute({
    contractAddress: proposalModule.address,
    sender: walletAddress,
  })
  const closeProposal = CwProposalSingleHooks.useClose({
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
    <>
      {decodedMessages?.length ? (
        <div className="my-9 space-y-3">
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
          <div className="my-6">
            <ExecuteProposal
              loading={loading}
              messages={proposal.msgs.length}
              onExecute={onExecute}
            />
          </div>
        )}
      {proposal.status === Status.Rejected && (
        <div className="my-6">
          <CloseProposal
            loading={loading}
            onClose={onClose}
            willRefundProposalDeposit={
              proposal.deposit_info?.refund_failed_proposals ?? false
            }
          />
        </div>
      )}
    </>
  )
}
