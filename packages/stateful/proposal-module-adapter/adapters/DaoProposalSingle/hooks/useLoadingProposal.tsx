import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import { chainQueries, proposalQueries } from '@dao-dao/state'
import { useTranslatedTimeDeltaFormatter } from '@dao-dao/stateless'
import {
  ChainId,
  Feature,
  LoadingData,
  PreProposeModuleType,
  ProposalStatus,
  ProposalStatusEnum,
  ProposalTimestampInfo,
} from '@dao-dao/types'
import { ProposalResponse } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  expirationToDate,
  formatDate,
  formatDateTimeTz,
  isExpired,
} from '@dao-dao/utils'

import {
  useQueryLoadingData,
  useQueryLoadingDataWithError,
} from '../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../react'
import { ProposalWithMetadata } from '../types'

// Returns a proposal wrapped in a LoadingData object to allow the UI to respond
// to its loading state.
export const useLoadingProposal = (): LoadingData<ProposalWithMetadata> => {
  const { t } = useTranslation()
  const {
    proposalModule,
    proposalNumber,
    chain: { chainId },
  } = useProposalModuleAdapterOptions()

  const { prePropose } = proposalModule

  const loadingProposalResponse: LoadingData<ProposalResponse | undefined> =
    useQueryLoadingData(
      proposalModule.getProposalQuery({
        proposalId: proposalNumber,
      }),
      undefined
    )

  let proposalStatus: ProposalStatus | undefined =
    loadingProposalResponse.loading
      ? undefined
      : loadingProposalResponse.data?.proposal.status
  // Update status to take into account Neutron pre-propose timelock/overrule
  // system.
  const usesNeutronPreProposeTimelockOverruleSystem =
    chainId === ChainId.NeutronMainnet &&
    prePropose?.type === PreProposeModuleType.NeutronSubdaoSingle &&
    proposalStatus === ProposalStatusEnum.Executed
  const loadingNeutronTimelockOverrule = useQueryLoadingDataWithError(
    usesNeutronPreProposeTimelockOverruleSystem
      ? proposalQueries.neutronTimelockOverrule({
          chainId,
          preProposeOverruleAddress:
            prePropose.config.timelockConfig.overrule_pre_propose,
          timelockAddress: prePropose.config.timelockAddress,
          subdaoProposalId: proposalNumber,
        })
      : undefined
  )

  if (
    usesNeutronPreProposeTimelockOverruleSystem &&
    !loadingNeutronTimelockOverrule.loading &&
    !loadingNeutronTimelockOverrule.errored
  ) {
    const timelockProposalStatus =
      loadingNeutronTimelockOverrule.data.timelockProposal.status
    proposalStatus =
      timelockProposalStatus === 'timelocked'
        ? ProposalStatusEnum.NeutronTimelocked
        : timelockProposalStatus === 'overruled'
          ? ProposalStatusEnum.NeutronOverruled
          : timelockProposalStatus === 'executed'
            ? ProposalStatusEnum.Executed
            : timelockProposalStatus === 'execution_failed'
              ? ProposalStatusEnum.ExecutionFailed
              : // Should never happen.
                proposalStatus
  }

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ words: false })

  const blockHeightLoading = useQueryLoadingDataWithError(
    chainQueries.block({
      chainId,
    }),
    (block) => block.header.height
  )
  const currentBlockHeight =
    !blockHeightLoading.loading && !blockHeightLoading.errored
      ? blockHeightLoading.data
      : undefined

  //! If this proposal was approved by another proposal via the
  //! pre-propose-approver setup.
  const approverProposalId = useQueryLoadingDataWithError(
    prePropose?.type === PreProposeModuleType.Approval &&
      !!prePropose.config.preProposeApproverContract
      ? proposalQueries.approverIdForPreProposeApprovalId({
          chainId,
          preProposeAddress: prePropose.address,
          proposalNumber,
          isApprovalProposal: false,
          approver: prePropose.config.approver,
          preProposeApproverContract:
            prePropose.config.preProposeApproverContract,
        })
      : {
          queryKey: ['empty_string'],
          queryFn: () => '',
        }
  )

  //! If this is an approver proposal that approved another proposal.
  const approvedProposalId = useQueryLoadingDataWithError(
    prePropose?.type === PreProposeModuleType.Approver &&
      proposalStatus === ProposalStatusEnum.Executed
      ? proposalQueries.approvedIdForPreProposeApproverId({
          chainId,
          preProposeAddress: prePropose.address,
          proposalNumber,
          approvalDao: prePropose.config.approvalDao,
          preProposeApprovalContract:
            prePropose.config.preProposeApprovalContract,
        })
      : {
          queryKey: ['empty_string'],
          queryFn: () => '',
        }
  )

  if (
    loadingProposalResponse.loading ||
    !loadingProposalResponse.data ||
    approverProposalId.loading ||
    approvedProposalId.loading ||
    (usesNeutronPreProposeTimelockOverruleSystem &&
      loadingNeutronTimelockOverrule.loading)
  ) {
    return { loading: true }
  }

  // Indexer may provide dates.
  const { proposal, completedAt, executedAt, closedAt } =
    loadingProposalResponse.data

  const proposalExpired = isExpired(proposal.expiration, currentBlockHeight)
  const expirationDate =
    'at_time' in proposal.expiration
      ? expirationToDate(proposal.expiration)
      : undefined

  const vetoTimelockExpiration =
    typeof proposalStatus === 'object' && 'veto_timelock' in proposalStatus
      ? proposalStatus.veto_timelock.expiration
      : proposalStatus === ProposalStatusEnum.NeutronTimelocked &&
          !loadingNeutronTimelockOverrule.loading &&
          !loadingNeutronTimelockOverrule.errored
        ? loadingNeutronTimelockOverrule.data.overruleProposal.proposal
            .expiration
        : undefined

  const votingOpen =
    proposalStatus === ProposalStatusEnum.Open ||
    // Voting up until expiration on finished proposals may be supported.
    (proposalModule.supports(Feature.VoteUntilExpiration) && !proposalExpired)

  const completionDate =
    typeof completedAt === 'string' && new Date(completedAt)
  const executionDate = typeof executedAt === 'string' && new Date(executedAt)
  const closeDate = typeof closedAt === 'string' && new Date(closedAt)

  const dateDisplay: ProposalTimestampInfo['display'] | undefined =
    !proposalExpired
      ? expirationDate
        ? {
            label:
              vetoTimelockExpiration || !votingOpen
                ? t('title.votingTimeLeft')
                : t('title.timeLeft'),
            tooltip: formatDateTimeTz(expirationDate),
            content: (
              <TimeAgo date={expirationDate} formatter={timeAgoFormatter} />
            ),
          }
        : 'at_height' in proposal.expiration
          ? {
              label: t('title.votingEndBlock'),
              tooltip: t('info.votingEndBlockTooltip'),
              content: BigInt(proposal.expiration.at_height).toLocaleString(),
            }
          : undefined
      : executionDate
        ? {
            label: t('proposalStatusTitle.executed'),
            tooltip: formatDateTimeTz(executionDate),
            content: formatDate(executionDate),
          }
        : closeDate
          ? {
              label: t('proposalStatusTitle.closed'),
              tooltip: formatDateTimeTz(closeDate),
              content: formatDate(closeDate),
            }
          : completionDate
            ? {
                label: t('title.completed'),
                tooltip: formatDateTimeTz(completionDate),
                content: formatDate(completionDate),
              }
            : expirationDate
              ? {
                  label:
                    // If voting is closed, expiration should not be in the
                    // future, but just in case...
                    !proposalExpired
                      ? t('title.expires')
                      : t('title.completed'),
                  tooltip: formatDateTimeTz(expirationDate),
                  content: formatDate(expirationDate),
                }
              : 'at_height' in proposal.expiration
                ? {
                    label: t('title.blockCompleted'),
                    tooltip: t('info.votingEndedBlockTooltip'),
                    content: BigInt(
                      proposal.expiration.at_height
                    ).toLocaleString(),
                  }
                : undefined

  const timestampInfo: ProposalTimestampInfo = {
    display: dateDisplay,
    expirationDate,
  }

  return {
    loading: false,
    updating:
      !loadingProposalResponse.loading && loadingProposalResponse.updating,
    data: {
      ...proposal,
      timestampInfo,
      votingOpen,
      executedAt:
        typeof executedAt === 'string' ? new Date(executedAt) : undefined,
      // On error, just return undefined so we still render the proposal.
      approverProposalId: approverProposalId.errored
        ? undefined
        : approverProposalId.data || undefined,
      // On error, just return undefined so we still render the proposal.
      approvedProposalId: approvedProposalId.errored
        ? undefined
        : approvedProposalId.data || undefined,
      vetoTimelock: vetoTimelockExpiration && {
        expiration: vetoTimelockExpiration,
        date:
          'at_time' in vetoTimelockExpiration
            ? expirationToDate(vetoTimelockExpiration)
            : undefined,
      },
      neutronTimelockOverrule:
        loadingNeutronTimelockOverrule.loading ||
        loadingNeutronTimelockOverrule.errored
          ? undefined
          : loadingNeutronTimelockOverrule.data,
    },
  }
}
