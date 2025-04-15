import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  blockHeightSelector,
  blocksPerYearSelector,
  proposalQueries,
} from '@dao-dao/state'
import {
  useCachedLoadable,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
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
  convertExpirationToDate,
  formatDate,
  formatDateTimeTz,
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
  const queryClient = useQueryClient()

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
      ? proposalQueries.neutronTimelockOverrule(queryClient, {
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

  const blocksPerYearLoadable = useCachedLoadable(
    blocksPerYearSelector({
      chainId,
    })
  )
  const blockHeightLoadable = useCachedLoadable(
    blockHeightSelector({
      chainId,
    })
  )

  //! If this proposal was approved by another proposal via the
  //! pre-propose-approver setup.
  const approverProposalId = useQueryLoadingDataWithError(
    prePropose?.type === PreProposeModuleType.Approval &&
      !!prePropose.config.preProposeApproverContract
      ? proposalQueries.approverIdForPreProposeApprovalId(queryClient, {
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
      ? proposalQueries.approvedIdForPreProposeApproverId(queryClient, {
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
    blocksPerYearLoadable.state !== 'hasValue' ||
    blockHeightLoadable.state !== 'hasValue' ||
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

  const expirationDate = convertExpirationToDate(
    blocksPerYearLoadable.contents,
    proposal.expiration,
    blockHeightLoadable.contents
  )

  const vetoTimelockExpiration =
    typeof proposalStatus === 'object' && 'veto_timelock' in proposalStatus
      ? convertExpirationToDate(
          blocksPerYearLoadable.contents,
          proposalStatus.veto_timelock.expiration,
          blockHeightLoadable.contents
        )
      : proposalStatus === ProposalStatusEnum.NeutronTimelocked &&
          !loadingNeutronTimelockOverrule.loading &&
          !loadingNeutronTimelockOverrule.errored
        ? convertExpirationToDate(
            blocksPerYearLoadable.contents,
            loadingNeutronTimelockOverrule.data.overruleProposal.proposal
              .expiration,
            blockHeightLoadable.contents
          )
        : undefined

  const votingOpen =
    proposalStatus === ProposalStatusEnum.Open ||
    // Voting up until expiration on finished proposals may be supported.
    (proposalModule.supports(Feature.VoteUntilExpiration) &&
      // `expirationDate` will be undefined if expiration is set to never, which
      // the contract does not allow, so this is just a type-check.
      !!expirationDate &&
      expirationDate.getTime() > Date.now())

  const completionDate =
    typeof completedAt === 'string' && new Date(completedAt)
  const executionDate = typeof executedAt === 'string' && new Date(executedAt)
  const closeDate = typeof closedAt === 'string' && new Date(closedAt)

  const dateDisplay: ProposalTimestampInfo['display'] | undefined = votingOpen
    ? expirationDate && expirationDate.getTime() > Date.now()
      ? {
          label: vetoTimelockExpiration
            ? t('title.votingTimeLeft')
            : t('title.timeLeft'),
          tooltip: formatDateTimeTz(expirationDate),
          content: (
            <TimeAgo date={expirationDate} formatter={timeAgoFormatter} />
          ),
        }
      : 'at_height' in proposal.expiration &&
          proposal.expiration.at_height > blockHeightLoadable.contents
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
                  // If voting is closed, expiration should not be in the future, but
                  // just in case...
                  expirationDate.getTime() > Date.now()
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
      vetoTimelockExpiration,
      neutronTimelockOverrule:
        loadingNeutronTimelockOverrule.loading ||
        loadingNeutronTimelockOverrule.errored
          ? undefined
          : loadingNeutronTimelockOverrule.data,
    },
  }
}
