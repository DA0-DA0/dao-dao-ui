import { useRecoilValue } from 'recoil'

import { CwProposalSingleSelectors } from '@dao-dao/state'
import { ProposalModule } from '@dao-dao/utils'

export const makeUseProposalCount =
  ({ address }: ProposalModule) =>
  (): number =>
    useRecoilValue(
      CwProposalSingleSelectors.proposalCountSelector({
        contractAddress: address,
      })
    )
