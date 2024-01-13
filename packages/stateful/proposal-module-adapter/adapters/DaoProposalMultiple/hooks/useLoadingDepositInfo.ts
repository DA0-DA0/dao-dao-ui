import { constSelector } from 'recoil'

import { DaoPreProposeMultipleSelectors } from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { CheckedDepositInfo, LoadingData } from '@dao-dao/types'
import { DepositInfoResponse as DepositInfoPreProposeResponse } from '@dao-dao/types/contracts/DaoPreProposeMultiple'

import { useProposalModuleAdapterOptions } from '../../../react/context'

// Multiple choice proposal module adapter begins from v2.
export const useLoadingDepositInfo = (): LoadingData<
  CheckedDepositInfo | undefined
> => {
  const {
    proposalModule: { prePropose },
    proposalNumber,
    chain: { chain_id: chainId },
  } = useProposalModuleAdapterOptions()

  const selectorValue = useCachedLoadable<
    DepositInfoPreProposeResponse | undefined
  >(
    prePropose
      ? DaoPreProposeMultipleSelectors.depositInfoSelector({
          chainId,
          contractAddress: prePropose.address,
          params: [
            {
              proposalId: proposalNumber,
            },
          ],
        })
      : constSelector(undefined)
  )

  if (selectorValue.state !== 'hasValue') {
    return { loading: true }
  }

  const depositInfo: CheckedDepositInfo | undefined =
    selectorValue.contents?.deposit_info ?? undefined

  return {
    loading: false,
    data: depositInfo,
  }
}
