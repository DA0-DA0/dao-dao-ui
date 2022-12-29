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
import { ContractVersion, LoadingData } from '@dao-dao/types'
import { Status } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import {
  convertExpirationToDate,
  formatDate,
  loadableToLoadingData,
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
  const proposalSubquery = useGetProposalQuery(
    proposalModuleAddress,
    proposalNumber
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

  const { proposal } = loadingProposalResponse.data

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

  const timestampInfo = expirationDate && {
    display: dateDisplay,
    expirationDate,
  }

  // V2 allows voting up to the expiration date, even if the decision has
  // finalized due to sufficient votes cast.
  const votingOpen =
    // `timestampInfo` will be undefined if expiration is set to never, which
    // the contract does not allow, so this is just a typecheck.
    timestampInfo && version !== ContractVersion.V1
      ? timestampInfo.expirationDate.getTime() > Date.now()
      : proposal.status === Status.Open

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
