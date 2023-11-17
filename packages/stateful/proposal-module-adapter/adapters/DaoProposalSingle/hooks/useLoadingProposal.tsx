import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import { blockHeightSelector, blocksPerYearSelector } from '@dao-dao/state'
import {
  useCachedLoadable,
  useCachedLoading,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import {
  Feature,
  LoadingData,
  ProposalStatus,
  ProposalTimestampInfo,
} from '@dao-dao/types'
import {
  convertExpirationToDate,
  formatDate,
  formatDateTimeTz,
  isFeatureSupportedByVersion,
} from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { proposalSelector } from '../contracts/DaoProposalSingle.common.recoil'
import { ProposalWithMetadata } from '../types'

// Returns a proposal wrapped in a LoadingData object to allow the UI to respond
// to its loading state.
export const useLoadingProposal = (): LoadingData<ProposalWithMetadata> => {
  const { t } = useTranslation()
  const {
    proposalModule: { address: proposalModuleAddress, version },
    proposalNumber,
    chain: { chain_id: chainId },
  } = useProposalModuleAdapterOptions()

  const loadingProposalResponse = useCachedLoading(
    proposalSelector({
      contractAddress: proposalModuleAddress,
      chainId,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    }),
    undefined,
    (err) => console.error(err)
  )

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

  if (
    loadingProposalResponse.loading ||
    !loadingProposalResponse.data ||
    blocksPerYearLoadable.state !== 'hasValue' ||
    blockHeightLoadable.state !== 'hasValue'
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

  const votingOpen =
    proposal.status === ProposalStatus.Open ||
    (!!version &&
      // Voting up until expiration on finished proposals may be supported.
      isFeatureSupportedByVersion(Feature.VoteUntilExpiration, version) &&
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
          label: t('title.timeLeft'),
          tooltip: formatDateTimeTz(expirationDate),
          content: (
            <TimeAgo date={expirationDate} formatter={timeAgoFormatter} />
          ),
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
        label: t('info.completed'),
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
            : t('info.completed'),
        tooltip: formatDateTimeTz(expirationDate),
        content: formatDate(expirationDate),
      }
    : undefined

  const timestampInfo: ProposalTimestampInfo | undefined = expirationDate && {
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
    },
  }
}
