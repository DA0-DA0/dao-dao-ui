import { useTranslation } from 'react-i18next'

import { useCachedLoadable } from '@dao-dao/stateless'
import { LoadingData } from '@dao-dao/types'
import { Proposal } from '@dao-dao/types/contracts/CwProposalSingle.v1'
import { SingleChoiceProposal } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import { loadableToLoadingData } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { proposalSelector } from '../contracts/DaoProposalSingle.common.recoil'

export const useLoadingProposal = (): LoadingData<
  Proposal | SingleChoiceProposal
> => {
  const { t } = useTranslation()
  const {
    proposalModule: { address: proposalModuleAddress },
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

  // Since an error will be thrown on a selector error, this .data check is just
  // a typecheck. It will not return loading forever if the selector fails.
  return loadingProposalResponse.loading || !loadingProposalResponse.data
    ? { loading: true }
    : {
        loading: false,
        updating:
          proposalCachedLoadable.state === 'hasValue' &&
          proposalCachedLoadable.updating,
        data: loadingProposalResponse.data.proposal,
      }
}
