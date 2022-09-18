import { selector, selectorFamily, waitForAll } from 'recoil'

import {
  CwProposalSingleSelectors,
  blockHeightTimestampSafeSelector,
} from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import {
  CommonProposalListInfo,
  DepositInfoSelector,
  IProposalModuleAdapterCommonOptions,
  ReverseProposalInfosSelector,
} from '@dao-dao/tstypes/proposal-module-adapter'

export const makeReverseProposalInfos = ({
  proposalModule: { address, prefix },
}: IProposalModuleAdapterCommonOptions): ReverseProposalInfosSelector =>
  selectorFamily({
    key: 'cwProposalSingleReverseProposalInfos',
    get:
      ({ startBefore, limit }) =>
      async ({ get }) => {
        const proposalResponses = get(
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

        const timestamps = get(
          waitForAll(
            proposalResponses.map(({ proposal: { start_height } }) =>
              blockHeightTimestampSafeSelector(start_height)
            )
          )
        )

        const proposalInfos: CommonProposalListInfo[] = proposalResponses.map(
          ({ id, proposal: { status } }, index) => ({
            id: `${prefix}${id}`,
            proposalNumber: id,
            timestamp: timestamps[index],
            isOpen: status === Status.Open,
          })
        )

        return proposalInfos
      },
  })

export const makeDepositInfo = ({
  proposalModule: { address },
}: IProposalModuleAdapterCommonOptions): DepositInfoSelector =>
  selector({
    key: 'cwProposalSingleDepositInfo',
    get: ({ get }) =>
      get(
        CwProposalSingleSelectors.configSelector({
          contractAddress: address,
        })
      ).deposit_info ?? undefined,
  })
