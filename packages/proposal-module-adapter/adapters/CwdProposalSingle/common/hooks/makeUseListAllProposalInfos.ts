import { useMemo } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import { blockHeightTimestampSafeSelector } from '@dao-dao/state'
import { ProposalModule } from '@dao-dao/tstypes'
import { Status } from '@dao-dao/tstypes/contracts/CwdProposalSingle.common'

import { CommonProposalListInfo } from '../../../../types'
import { listAllProposalsSelector } from '../../contracts/CwdProposalSingle.common.recoil'

export const makeUseListAllProposalInfos =
  ({ address, prefix }: ProposalModule) =>
  (startAfter: number | undefined): CommonProposalListInfo[] => {
    const proposalResponses = useRecoilValue(
      listAllProposalsSelector({
        contractAddress: address,
        params: [
          {
            startAfter,
          },
        ],
      })
    ).proposals

    const timestamps = useRecoilValue(
      waitForAll(
        proposalResponses.map(({ proposal: { start_height } }) =>
          blockHeightTimestampSafeSelector({ blockHeight: start_height })
        )
      )
    )

    const proposalInfos = useMemo(
      () =>
        proposalResponses.map(({ id, proposal: { status } }, index) => ({
          id: `${prefix}${id}`,
          proposalNumber: id,
          timestamp: timestamps[index],
          isOpen: status === Status.Open,
        })),
      [proposalResponses, timestamps]
    )

    return proposalInfos
  }
