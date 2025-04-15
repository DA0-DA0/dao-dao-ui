import {
  AccountCircleOutlined,
  HourglassTopRounded,
  RotateRightOutlined,
  ThumbDown,
  ThumbUp,
  ThumbUpOutlined,
  WhereToVoteOutlined,
} from '@mui/icons-material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  ApprovalProposalStatusMap,
  Button,
  Logo,
  ProposalStatusAndInfoProps,
  ProposalStatusAndInfo as StatelessProposalStatusAndInfo,
  Tooltip,
  useDao,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  ApprovalProposalWithMetadata,
  BasePreProposeProposalStatusAndInfoProps,
  PreProposeModuleType,
} from '@dao-dao/types'
import { SingleChoiceApprovalProposal } from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import {
  findWasmAttributeValue,
  keyFromPreProposeStatus,
  processError,
} from '@dao-dao/utils'

import {
  ButtonLink,
  EntityDisplay,
  SuspenseLoader,
} from '../../../../components'
import { DaoPreProposeApprovalSingleHooks } from '../../../../hooks'
import { useWallet } from '../../../../hooks/useWallet'
import { useProposalModuleAdapterOptions } from '../../../react'
import { useLoadingApprovalProposal, useProposalRefreshers } from '../hooks'
import { ProposalStatusAndInfoLoader } from './ProposalStatusAndInfoLoader'

export const ApprovalProposalStatusAndInfo = (
  props: BasePreProposeProposalStatusAndInfoProps
) => {
  const loadingProposal = useLoadingApprovalProposal()

  return (
    <SuspenseLoader
      fallback={<ProposalStatusAndInfoLoader {...props} />}
      forceFallback={loadingProposal.loading}
    >
      {!loadingProposal.loading && (
        <InnerApprovalProposalStatusAndInfo
          {...props}
          proposal={loadingProposal.data}
        />
      )}
    </SuspenseLoader>
  )
}

const InnerApprovalProposalStatusAndInfo = ({
  proposal: { proposer, timestampDisplay, ...proposal },
  ...props
}: BasePreProposeProposalStatusAndInfoProps & {
  proposal: ApprovalProposalWithMetadata<SingleChoiceApprovalProposal>
}) => {
  const { t } = useTranslation()
  const { chainId, coreAddress } = useDao()
  const { getDaoProposalPath, goToDaoProposal } = useDaoNavHelpers()
  const {
    proposalModule: { prefix, prePropose },
  } = useProposalModuleAdapterOptions()
  const { isWalletConnected, address = '' } = useWallet()
  const { refreshProposalAndAll } = useProposalRefreshers()

  const [loading, setLoading] = useState<'approve' | 'reject' | false>(false)
  const doExtension = DaoPreProposeApprovalSingleHooks.useExtension({
    contractAddress: prePropose?.address ?? '',
    sender: address,
  })

  if (!prePropose || prePropose.type !== PreProposeModuleType.Approval) {
    return null
  }

  const statusKey = keyFromPreProposeStatus(proposal.status)

  const approverProposalPath =
    prePropose.config.preProposeApproverContract && proposal.approverProposalId
      ? getDaoProposalPath(
          prePropose.config.approver,
          proposal.approverProposalId
        )
      : undefined
  const createdProposalId =
    'approved' in proposal.status
      ? `${prefix}${proposal.status.approved.created_proposal_id}`
      : undefined

  const info: ProposalStatusAndInfoProps['info'] = [
    {
      Icon: (props) => <Logo {...props} />,
      label: t('title.dao'),
      Value: (props) => <EntityDisplay {...props} address={coreAddress} />,
    },
    {
      Icon: AccountCircleOutlined,
      label: t('title.creator'),
      Value: (props) => <EntityDisplay {...props} address={proposer} />,
    },
    ...(approverProposalPath
      ? ([
          {
            Icon: ThumbUpOutlined,
            label: t('title.approval'),
            Value: (props) => (
              <Tooltip
                morePadding
                title={<EntityDisplay address={prePropose.config.approver} />}
              >
                <ButtonLink
                  href={approverProposalPath}
                  variant="underline"
                  {...props}
                >
                  {t('title.proposalId', {
                    id: proposal.approverProposalId,
                  })}
                </ButtonLink>
              </Tooltip>
            ),
          },
        ] as ProposalStatusAndInfoProps['info'])
      : ([
          {
            Icon: ThumbUpOutlined,
            label: t('title.approver'),
            Value: (props) => (
              <EntityDisplay {...props} address={prePropose.config.approver} />
            ),
          },
        ] as ProposalStatusAndInfoProps['info'])),
    {
      Icon: RotateRightOutlined,
      label: t('title.status'),
      Value: (props) => (
        <p {...props}>{t(ApprovalProposalStatusMap[statusKey].labelI18nKey)}</p>
      ),
    },
    ...(timestampDisplay
      ? ([
          {
            Icon: HourglassTopRounded,
            label: timestampDisplay.label,
            Value: (props) => (
              <Tooltip title={timestampDisplay!.tooltip}>
                <p {...props}>{timestampDisplay!.content}</p>
              </Tooltip>
            ),
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
    ...(createdProposalId
      ? ([
          {
            Icon: WhereToVoteOutlined,
            label: t('title.proposal'),
            Value: (props) => (
              <ButtonLink
                href={getDaoProposalPath(coreAddress, createdProposalId)}
                variant="underline"
                {...props}
              >
                {t('title.proposalId', {
                  id: createdProposalId,
                })}
              </ButtonLink>
            ),
          },
        ] as ProposalStatusAndInfoProps['info'])
      : []),
  ]

  const status = t('info.approvalProposalExplanation', {
    context: statusKey,
  })

  const approve = async () => {
    if (!isWalletConnected) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setLoading('approve')
    try {
      const { events } = await doExtension({
        msg: {
          approve: {
            id: proposal.approval_id,
          },
        },
      })

      // Find created proposal ID from events.
      const proposalId = Number(
        findWasmAttributeValue(
          chainId,
          events,
          prePropose.address,
          'proposal_id'
        ) ?? -1
      )

      toast.success(t('success.proposalApproved'))

      refreshProposalAndAll()

      await goToDaoProposal(coreAddress, prefix + proposalId)

      // Don't stop loading on success since we're redirecting to the proposal.
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
      setLoading(false)
    }
  }

  const reject = async () => {
    if (!isWalletConnected) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setLoading('reject')
    try {
      await doExtension({
        msg: {
          reject: {
            id: proposal.approval_id,
          },
        },
      })

      toast.success(t('success.proposalRejected'))

      refreshProposalAndAll()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <StatelessProposalStatusAndInfo
      {...props}
      action={
        // If connected wallet is the approver, and the proposal is pending,
        // show buttons to approve or reject the pending proposal.
        isWalletConnected &&
        address === prePropose.config.approver &&
        statusKey === 'pending'
          ? {
              header: (
                <div className="flex flex-col gap-2">
                  <Button
                    center
                    loading={loading === 'approve'}
                    onClick={approve}
                    size="lg"
                    variant="secondary"
                  >
                    <ThumbUp className="!h-5 !w-5" />
                    {t('button.approve')}
                  </Button>

                  <Button
                    center
                    loading={loading === 'reject'}
                    onClick={reject}
                    size="lg"
                    variant="secondary"
                  >
                    <ThumbDown className="!h-5 !w-5" />
                    {t('button.reject')}
                  </Button>
                </div>
              ),
            }
          : undefined
      }
      info={info}
      status={status}
    />
  )
}
