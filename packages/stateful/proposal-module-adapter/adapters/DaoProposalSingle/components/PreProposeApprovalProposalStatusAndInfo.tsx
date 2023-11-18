import {
  AccountCircleOutlined,
  HourglassTopRounded,
  RotateRightOutlined,
  ThumbUpOutlined,
  WhereToVoteOutlined,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import {
  Logo,
  PreProposeApprovalProposalStatusMap,
  ProposalStatusAndInfoProps,
  ProposalStatusAndInfo as StatelessProposalStatusAndInfo,
  Tooltip,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  BasePreProposeProposalStatusAndInfoProps,
  PreProposeApprovalProposalWithMeteadata,
  PreProposeModuleType,
} from '@dao-dao/types'
import { keyFromPreProposeStatus } from '@dao-dao/utils'

import {
  ButtonLink,
  EntityDisplay,
  SuspenseLoader,
} from '../../../../components'
import { useProposalModuleAdapterOptions } from '../../../react'
import { useLoadingPreProposeApprovalProposal } from '../hooks'
import { ProposalStatusAndInfoLoader } from './ProposalStatusAndInfoLoader'

export const PreProposeApprovalProposalStatusAndInfo = (
  props: BasePreProposeProposalStatusAndInfoProps
) => {
  const loadingProposal = useLoadingPreProposeApprovalProposal()

  return (
    <SuspenseLoader
      fallback={<ProposalStatusAndInfoLoader {...props} />}
      forceFallback={loadingProposal.loading}
    >
      {!loadingProposal.loading && (
        <InnerPreProposeApprovalProposalStatusAndInfo
          {...props}
          proposal={loadingProposal.data}
        />
      )}
    </SuspenseLoader>
  )
}

const InnerPreProposeApprovalProposalStatusAndInfo = ({
  proposal: { proposer, timestampDisplay, ...proposal },
  ...props
}: BasePreProposeProposalStatusAndInfoProps & {
  proposal: PreProposeApprovalProposalWithMeteadata
}) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const {
    proposalModule: { prefix, prePropose },
  } = useProposalModuleAdapterOptions()

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
      Icon: ({ className }) => (
        <Logo className={clsx('m-[0.125rem] !h-5 !w-5', className)} />
      ),
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
        <p {...props}>
          {t(PreProposeApprovalProposalStatusMap[statusKey].labelI18nKey)}
        </p>
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

  return (
    <StatelessProposalStatusAndInfo {...props} info={info} status={status} />
  )
}
