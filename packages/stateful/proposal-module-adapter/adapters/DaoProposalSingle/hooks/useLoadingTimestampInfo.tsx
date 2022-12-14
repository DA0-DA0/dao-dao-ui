import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  blockHeightSelector,
  blocksPerYearSelector,
  useGetProposalQuery,
} from '@dao-dao/state'
import {
  useCachedLoadable,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'
import { Status } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { convertExpirationToDate, formatDate } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react/context'
import { TimestampInfo } from '../types'
import { useLoadingProposal } from './useLoadingProposal'

export const useLoadingTimestampInfo = (): LoadingData<
  TimestampInfo | undefined
> => {
  const { t } = useTranslation()
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
    chainId,
  } = useProposalModuleAdapterOptions()
  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ suffix: false })

  const loadingProposal = useLoadingProposal()
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
  const proposalSubquery = useGetProposalQuery(
    proposalModuleAddress,
    proposalNumber
  )

  if (
    loadingProposal.loading ||
    blocksPerYearLoadable.state !== 'hasValue' ||
    blockHeightLoadable.state !== 'hasValue'
  ) {
    return {
      loading: true,
    }
  }

  const proposal = loadingProposal.data

  const proposalSubqueryData =
    proposalSubquery.data?.proposal ??
    proposalSubquery.previousData?.proposal ??
    undefined

  const expirationDate = convertExpirationToDate(
    blocksPerYearLoadable.contents,
    proposal.expiration,
    blockHeightLoadable.contents
  )

  const completionDate =
    proposalSubqueryData?.completedAt &&
    // Interpret as UTC.
    new Date(proposalSubqueryData.completedAt + 'Z')
  const executionDate =
    proposalSubqueryData?.executedAt &&
    // Interpret as UTC.
    new Date(proposalSubqueryData.executedAt + 'Z')
  const closeDate =
    proposalSubqueryData?.closedAt &&
    // Interpret as UTC.
    new Date(proposalSubqueryData.closedAt + 'Z')

  const dateDisplay: { label: string; content: ReactNode } | undefined =
    proposal.status === Status.Open
      ? expirationDate && expirationDate.getTime() > Date.now()
        ? {
            label: t('title.timeLeft'),
            content: (
              <TimeAgo date={expirationDate} formatter={timeAgoFormatter} />
            ),
          }
        : undefined
      : executionDate
      ? {
          label: t('proposalStatusTitle.executed'),
          content: formatDate(executionDate),
        }
      : closeDate
      ? {
          label: t('proposalStatusTitle.closed'),
          content: formatDate(closeDate),
        }
      : completionDate
      ? {
          label: t('info.completed'),
          content: formatDate(completionDate),
        }
      : expirationDate
      ? {
          label: t('title.expires'),
          content: formatDate(expirationDate),
        }
      : undefined

  return {
    loading: false,
    data: dateDisplay &&
      expirationDate && {
        display: dateDisplay,
        expirationDate,
      },
  }
}
