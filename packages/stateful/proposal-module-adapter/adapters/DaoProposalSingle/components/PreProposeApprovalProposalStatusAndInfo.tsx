import {
  AccountCircleOutlined,
  HourglassTopRounded,
  RotateRightOutlined,
  ThumbUpOutlined,
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
} from '@dao-dao/stateless'
import {
  BasePreProposeProposalStatusAndInfoProps,
  PreProposeModuleType,
} from '@dao-dao/types'
import { keyFromPreProposeStatus } from '@dao-dao/utils'

import { EntityDisplay, SuspenseLoader } from '../../../../components'
import { useProposalModuleAdapterOptions } from '../../../react'
import { useLoadingPreProposeProposal } from '../hooks'
import { PreProposeProposalWithMeteadata } from '../types'
import { ProposalStatusAndInfoLoader } from './ProposalStatusAndInfoLoader'

export const PreProposeApprovalProposalStatusAndInfo = (
  props: BasePreProposeProposalStatusAndInfoProps
) => {
  const loadingProposal = useLoadingPreProposeProposal()

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
  proposal: PreProposeProposalWithMeteadata
}) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()
  const {
    proposalModule: { prePropose },
  } = useProposalModuleAdapterOptions()

  if (!prePropose || prePropose.type !== PreProposeModuleType.Approval) {
    return null
  }

  const statusKey = keyFromPreProposeStatus(proposal.status)

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
    {
      Icon: ThumbUpOutlined,
      label: t('title.approver'),
      Value: (props) => (
        <EntityDisplay {...props} address={prePropose.config.approver} />
      ),
    },
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
  ]

  const status = t('info.approvalProposalExplanation', {
    context: statusKey,
  })

  return (
    <StatelessProposalStatusAndInfo {...props} info={info} status={status} />
  )
}
