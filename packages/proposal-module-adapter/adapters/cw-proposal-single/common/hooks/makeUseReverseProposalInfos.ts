import { useMemo } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  CwProposalSingleSelectors,
  blockHeightTimestampSelector,
} from '@dao-dao/state'
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
    )?.proposals

    const timestamps = useRecoilValue(
      waitForAll(
        proposalResponses?.map(({ proposal: { start_height } }) =>
          blockHeightTimestampSelector(start_height)
        ) ?? []
      )
    )

    const proposalInfos = useMemo(
      () =>
        proposalResponses?.map(({ id }, index) => ({
          id: `${prefix}${id}`,
          proposalNumber: id,
          timestamp: timestamps[index],
        })) ?? [],
      [proposalResponses, timestamps]
    )

    return proposalInfos
  }
