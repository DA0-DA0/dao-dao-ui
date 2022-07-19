import { useMemo } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  CwProposalSingleSelectors,
  blockHeightTimestampSelector,
} from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import { ProposalModule } from '@dao-dao/utils'

import { CommonProposalListInfo } from '../../../../types'

export const makeUseListAllProposalInfos =
  ({ address, prefix }: ProposalModule) =>
  (startAfter: number | undefined): CommonProposalListInfo[] => {
    const proposalResponses = useRecoilValue(
      CwProposalSingleSelectors.listAllProposalsSelector({
        contractAddress: address,
        params: [
          {
            startAfter,
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
        proposalResponses?.map(({ id, proposal: { status } }, index) => ({
          id: `${prefix}${id}`,
          proposalNumber: id,
          timestamp: timestamps[index],
          isOpen: status === Status.Open,
        })) ?? [],
      [proposalResponses, timestamps]
    )

    return proposalInfos
  }
