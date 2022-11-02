import { constSelector } from 'recoil'

import { useCachedLoadable } from '@dao-dao/stateless'
import { CheckedDepositInfo, LoadingData } from '@dao-dao/types'
import { DepositInfoResponse as DepositInfoPreProposeResponse } from '@dao-dao/types/contracts/CwdPreProposeMultiple'

import { useProposalModuleAdapterOptions } from '../../../react/context'
import { depositInfoSelector } from '../contracts/CwdPreProposeMultiple.recoil'

// Multiple choice proposal module adapter begins from v2.
export const useLoadingDepositInfo = (): LoadingData<
  CheckedDepositInfo | undefined
> => {
  const {
    proposalModule: { preProposeAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const selectorValue = useCachedLoadable<
    DepositInfoPreProposeResponse | undefined
  >(
    preProposeAddress
      ? depositInfoSelector({
          contractAddress: preProposeAddress,
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

  // Type-checked below.

  const depositInfoResponse = selectorValue.contents as
    | DepositInfoPreProposeResponse
    | undefined

  const depositInfo: CheckedDepositInfo | undefined =
    depositInfoResponse?.deposit_info ?? undefined

  return {
    loading: false,
    data: depositInfo,
  }
}
