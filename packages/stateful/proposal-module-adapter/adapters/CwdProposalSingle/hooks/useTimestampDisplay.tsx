import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'
import { useRecoilValue } from 'recoil'

import {
  blockHeightSelector,
  blocksPerYearSelector,
  useGetProposalQuery,
} from '@dao-dao/state'
import {
  useCachedLoadable,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import { Status } from '@dao-dao/types/contracts/CwdProposalSingle.common'
import { convertExpirationToDate, formatDate } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react/context'
import { useProposal } from './useProposal'

export const useTimestampDisplay = () => {
  const { t } = useTranslation()
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const proposal = useProposal()

  const proposalSubquery = useGetProposalQuery(
    proposalModuleAddress,
    proposalNumber
  )
  const proposalSubqueryData =
    proposalSubquery.data?.proposal ??
    proposalSubquery.previousData?.proposal ??
    undefined

  const blocksPerYear = useRecoilValue(blocksPerYearSelector({}))
  const blockHeightLoadable = useCachedLoadable(blockHeightSelector({}))
  const expirationDate = convertExpirationToDate(
    blocksPerYear,
    proposal.expiration,
    blockHeightLoadable.state === 'hasValue' ? blockHeightLoadable.contents : 0
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

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ suffix: false })

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

  return dateDisplay
}
