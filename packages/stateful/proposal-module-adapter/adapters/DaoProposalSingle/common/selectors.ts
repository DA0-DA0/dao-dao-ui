import {
  RecoilValueReadOnly,
  constSelector,
  selectorFamily,
  waitForAll,
} from 'recoil'

import { blockHeightTimestampSafeSelector } from '@dao-dao/state'
import {
  CheckedDepositInfo,
  ContractVersion,
  DepositRefundPolicy,
  WithChainId,
} from '@dao-dao/types'
import { Status } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import {
  CommonProposalListInfo,
  DepositInfoSelector,
} from '@dao-dao/types/proposal-module-adapter'

import { configSelector as configV1Selector } from '../contracts/CwProposalSingle.v1.recoil'
import { configSelector as configPreProposeSelector } from '../contracts/DaoPreProposeSingle.recoil'
import { reverseProposalsSelector } from '../contracts/DaoProposalSingle.common.recoil'

export const reverseProposalInfosSelector: (
  info: WithChainId<{
    proposalModuleAddress: string
    proposalModulePrefix: string
    startBefore: number | undefined
    limit: number | undefined
  }>
) => RecoilValueReadOnly<CommonProposalListInfo[]> = selectorFamily({
  key: 'daoProposalSingleReverseProposalInfos',
  get:
    ({
      chainId,
      proposalModuleAddress,
      proposalModulePrefix,
      startBefore,
      limit,
    }) =>
    async ({ get }) => {
      const proposalResponses = get(
        reverseProposalsSelector({
          contractAddress: proposalModuleAddress,
          chainId,
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
          proposalResponses.map(({ proposal: { start_height }, ...response }) =>
            // Indexer returns createdAt, so check its existence and fetch from
            // chain if not present.
            typeof response.createdAt === 'string'
              ? constSelector(new Date(response.createdAt))
              : blockHeightTimestampSafeSelector({
                  blockHeight: start_height,
                  chainId,
                })
          )
        )
      )

      const proposalInfos: CommonProposalListInfo[] = proposalResponses.map(
        ({ id, proposal: { status } }, index) => ({
          id: `${proposalModulePrefix}${id}`,
          proposalNumber: id,
          timestamp: timestamps[index],
          isOpen: status === Status.Open,
        })
      )

      return proposalInfos
    },
})

export const makeDepositInfoSelector: (
  info: WithChainId<{
    proposalModuleAddress: string
    version: ContractVersion | null
    preProposeAddress: string | null
  }>
) => DepositInfoSelector = selectorFamily({
  key: 'daoProposalSingleDepositInfo',
  get:
    ({ chainId, proposalModuleAddress, version, preProposeAddress }) =>
    ({ get }) => {
      let depositInfo: CheckedDepositInfo | undefined
      //! V1
      if (version === ContractVersion.V1) {
        const config = get(
          configV1Selector({
            contractAddress: proposalModuleAddress,
            chainId,
          })
        )

        if (config.deposit_info) {
          depositInfo = {
            amount: config.deposit_info.deposit,
            denom: {
              cw20: config.deposit_info.token,
            },
            refund_policy: config.deposit_info.refund_failed_proposals
              ? DepositRefundPolicy.Always
              : DepositRefundPolicy.OnlyPassed,
          }
        }
        //! V2
      } else if (preProposeAddress) {
        const config = get(
          configPreProposeSelector({
            contractAddress: preProposeAddress,
            chainId,
            params: [],
          })
        )
        if (config.deposit_info) {
          depositInfo = config.deposit_info ?? undefined
        }
      }

      return depositInfo
    },
})
