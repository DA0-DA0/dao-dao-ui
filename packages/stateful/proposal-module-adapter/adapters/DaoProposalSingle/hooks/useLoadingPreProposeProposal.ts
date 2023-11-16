import { useTranslation } from 'react-i18next'

import { DaoPreProposeApprovalSingleSelectors } from '@dao-dao/state/recoil'
import { useCachedLoading } from '@dao-dao/stateless'
import { LoadingData, ProposalTimestampInfo } from '@dao-dao/types'
import { Proposal as DaoPreProposeApprovalSingleProposal } from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import { formatDate, formatDateTimeTz } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { PreProposeProposalWithMeteadata } from '../types'

export const useLoadingPreProposeProposal =
  (): LoadingData<PreProposeProposalWithMeteadata> => {
    const { t } = useTranslation()
    const {
      chain: { chain_id: chainId },
      proposalModule,
      proposalNumber,
    } = useProposalModuleAdapterOptions()

    const loadingProposal = useCachedLoading(
      DaoPreProposeApprovalSingleSelectors.queryExtensionSelector({
        chainId,
        contractAddress: proposalModule.prePropose!.address,
        params: [
          {
            msg: {
              proposal: {
                id: proposalNumber,
              },
            },
          },
        ],
      }),
      undefined,
      // If proposal undefined (due to a selector error), an error will be thrown.
      () => {
        throw new Error(t('error.loadingData'))
      }
    ) as LoadingData<DaoPreProposeApprovalSingleProposal>

    // Since an error will be thrown on a selector error, this .data check is
    // just a typecheck. It will not return loading forever if the selector
    // fails.
    if (loadingProposal.loading || !loadingProposal.data) {
      return { loading: true }
    }

    const { status, createdAt, completedAt } = loadingProposal.data

    const createdDate = typeof createdAt === 'string' && new Date(createdAt)
    const completedDate =
      typeof completedAt === 'string' && new Date(completedAt)

    const timestampDisplay: ProposalTimestampInfo['display'] | undefined =
      'pending' in status && createdDate
        ? {
            label: t('title.proposed'),
            tooltip: formatDateTimeTz(createdDate),
            content: formatDate(createdDate),
          }
        : completedDate
        ? {
            label:
              'rejected' in status ? t('title.denied') : t('title.accepted'),
            tooltip: formatDateTimeTz(completedDate),
            content: formatDate(completedDate),
          }
        : undefined

    return {
      loading: false,
      updating: loadingProposal.updating,
      data: {
        ...loadingProposal.data,
        timestampDisplay,
      },
    }
  }
