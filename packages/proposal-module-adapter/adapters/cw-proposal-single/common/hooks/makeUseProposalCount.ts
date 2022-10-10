import { useRecoilValue } from 'recoil'

import { ProposalModule } from '@dao-dao/tstypes'

import { proposalCountSelector } from '../../contracts/CwProposalSingle.common.recoil'

export const makeUseProposalCount =
  ({ address }: ProposalModule) =>
  (): number =>
    useRecoilValue(
      proposalCountSelector({
        contractAddress: address,
      })
    )
