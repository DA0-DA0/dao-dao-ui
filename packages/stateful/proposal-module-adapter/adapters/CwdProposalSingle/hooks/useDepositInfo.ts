import { constSelector, useRecoilValue } from 'recoil'

import {
  CheckedDepositInfo,
  ContractVersion,
  DepositRefundPolicy,
} from '@dao-dao/types'
import { DepositInfoResponse as DepositInfoPreProposeResponse } from '@dao-dao/types/contracts/CwdPreProposeSingle'
import { ProposalResponse as ProposalV1Response } from '@dao-dao/types/contracts/CwProposalSingle.v1'

import { useProposalModuleAdapterOptions } from '../../../react/context'
import { depositInfoSelector as depositInfoV2Selector } from '../contracts/CwdPreProposeSingle.recoil'
import { proposalSelector as proposalV1Selector } from '../contracts/CwProposalSingle.v1.recoil'

export const useDepositInfo = (): CheckedDepositInfo | undefined => {
  const {
    proposalModule: { address, version, preProposeAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const selectorValue = useRecoilValue<
    ProposalV1Response | DepositInfoPreProposeResponse | undefined
  >(
    //! V1
    version === ContractVersion.V1
      ? proposalV1Selector({
          contractAddress: address,
          params: [
            {
              proposalId: proposalNumber,
            },
          ],
        })
      : //! V2
      preProposeAddress
      ? depositInfoV2Selector({
          contractAddress: preProposeAddress,
          params: [
            {
              proposalId: proposalNumber,
            },
          ],
        })
      : constSelector(undefined)
  )

  // Type-checked below.
  const proposalResponse = selectorValue as ProposalV1Response | undefined
  const depositInfoResponse = selectorValue as
    | DepositInfoPreProposeResponse
    | undefined

  const depositInfo: CheckedDepositInfo | undefined =
    //! V1
    version === ContractVersion.V1 && proposalResponse?.proposal?.deposit_info
      ? {
          amount: proposalResponse.proposal.deposit_info.deposit,
          denom: {
            cw20: proposalResponse.proposal.deposit_info.token,
          },
          refund_policy: proposalResponse.proposal.deposit_info
            .refund_failed_proposals
            ? DepositRefundPolicy.Always
            : DepositRefundPolicy.OnlyPassed,
        }
      : //! V2
        depositInfoResponse?.deposit_info ?? undefined

  return depositInfo
}
