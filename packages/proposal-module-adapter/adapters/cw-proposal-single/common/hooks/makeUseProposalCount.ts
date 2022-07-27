import { useRecoilValue } from 'recoil'

import { CwProposalSingleSelectors } from '@dao-dao/state'
import { ProposalModule } from '@dao-dao/utils'

export const makeUseProposalCount =
  ({ address }: ProposalModule) =>
  (): number => {
    const proposalCount = useRecoilValue(
      CwProposalSingleSelectors.proposalCountSelector({
        contractAddress: address,
      })
    )

    if (proposalCount === undefined) {
      throw new Error('Failed to load proposal count.')
    }

    return proposalCount
  }
