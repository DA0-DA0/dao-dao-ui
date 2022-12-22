import { useTranslation } from 'react-i18next'

import { useCachedLoadable } from '@dao-dao/stateless'
import { ContractVersion, LoadingData } from '@dao-dao/types'
import { Status } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { loadableToLoadingData } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { proposalSelector } from '../contracts/DaoProposalSingle.common.recoil'
import { ProposalWithMetadata } from '../types'
import { useLoadingTimestampInfo } from './useLoadingTimestampInfo'

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

  const loadingTimestampInfo = useLoadingTimestampInfo()

  // Since an error will be thrown on a selector error, this .data check is just
  // a typecheck. It will not return loading forever if the selector fails.
  if (
    loadingProposalResponse.loading ||
    !loadingProposalResponse.data ||
    loadingTimestampInfo.loading
  ) {
    return { loading: true }
  }

  const { proposal } = loadingProposalResponse.data
  const timestampInfo = loadingTimestampInfo.data

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
