import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import { blockHeightSelector, blocksPerYearSelector } from '@dao-dao/state'
import {
  useCachedLoadable,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import { ContractVersion, LoadingData, ProposalStatus } from '@dao-dao/types'
import {
  convertExpirationToDate,
  formatDate,
  formatDateTimeTz,
  loadableToLoadingData,
} from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { proposalSelector } from '../contracts/DaoProposalSingle.common.recoil'
import { ProposalWithMetadata, TimestampInfo } from '../types'

// Returns a proposal wrapped in a LoadingData object to allow the UI to respond
// to its loading state.
export const useLoadingProposal = (): LoadingData<ProposalWithMetadata> => {
  const { t } = useTranslation()
  const {
    proposalModule: { address: proposalModuleAddress, version },
    proposalNumber,
    chainId,
  } = useProposalModuleAdapterOptions()

  const proposalCachedLoadable = useCachedLoadable(
    proposalSelector({
      contractAddress: proposalModuleAddress,
      chainId,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    })
  )
  const loadingProposalResponse = loadableToLoadingData(
    proposalCachedLoadable,
    undefined,
    // If proposal undefined (due to a selector error), an error will be thrown.
    () => {
      throw new Error(t('error.loadingData'))
    }
  )

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ suffix: false })

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

  // Since an error will be thrown on a selector error, this .data check is just
  // a typecheck. It will not return loading forever if the selector fails.
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

  // V2 allows voting up to the expiration date, even if the decision has
  // finalized due to sufficient votes cast.
  const votingOpen =
    // `expirationDate` will be undefined if expiration is set to never, which
    // the contract does not allow, so this is just a typecheck.
    expirationDate && version !== ContractVersion.V1
      ? expirationDate.getTime() > Date.now()
      : proposal.status === ProposalStatus.Open

  const completionDate =
    typeof completedAt === 'string' && new Date(completedAt)
  const executionDate = typeof executedAt === 'string' && new Date(executedAt)
  const closeDate = typeof closedAt === 'string' && new Date(closedAt)

  const dateDisplay: TimestampInfo['display'] | undefined = votingOpen
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

  const timestampInfo: TimestampInfo | undefined = expirationDate && {
    display: dateDisplay,
    expirationDate,
  }

  return {
    loading: false,
    updating:
      proposalCachedLoadable.state === 'hasValue' &&
      proposalCachedLoadable.updating,
    data: {
      ...proposal,
      timestampInfo,
      votingOpen,
    },
  }
}
