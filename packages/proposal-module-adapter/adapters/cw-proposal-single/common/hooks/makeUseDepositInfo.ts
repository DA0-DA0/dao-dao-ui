import { useRecoilValue } from 'recoil'

import { CwProposalSingleSelectors } from '@dao-dao/state'
import { CheckedDepositInfo } from '@dao-dao/state/clients/cw-proposal-single'
import { ProposalModule } from '@dao-dao/tstypes'

export const makeUseDepositInfo =
  ({ address }: ProposalModule) =>
  (): CheckedDepositInfo | undefined =>
    useRecoilValue(
      CwProposalSingleSelectors.configSelector({
        contractAddress: address,
      })
    ).deposit_info ?? undefined
