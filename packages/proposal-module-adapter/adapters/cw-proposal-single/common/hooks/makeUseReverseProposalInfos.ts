import { useMemo } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  CwProposalSingleSelectors,
  blockHeightTimestampSafeSelector,
} from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { ProposalModule } from '@dao-dao/utils'

import { CommonProposalListInfo } from '../../../../types'

export const makeUseReverseProposalInfos =
  ({ address, prefix }: ProposalModule) =>
  (
    startBefore: number | undefined,
    limit: number | undefined
  ): CommonProposalListInfo[] => {
    const proposalResponses = useRecoilValue(
      CwProposalSingleSelectors.reverseProposalsSelector({
        contractAddress: address,
        params: [
          {
            startBefore,
            limit,
          },
        ],
      })
    ).proposals

    const timestamps = useRecoilValue(
      waitForAll(
        proposalResponses.map(({ proposal: { start_height } }) =>
          blockHeightTimestampSafeSelector(start_height)
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
