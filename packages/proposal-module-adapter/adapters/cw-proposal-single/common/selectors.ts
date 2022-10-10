import { selector, selectorFamily, waitForAll } from 'recoil'

import { blockHeightTimestampSafeSelector } from '@dao-dao/state'
import {
  CheckedDepositInfo,
  ContractVersion,
  DepositRefundPolicy,
} from '@dao-dao/tstypes'
import { Status } from '@dao-dao/tstypes/contracts/CwProposalSingle.common'
import {
  CommonProposalListInfo,
  DepositInfoSelector,
  IProposalModuleAdapterCommonOptions,
  ReverseProposalInfosSelector,
} from '@dao-dao/tstypes/proposal-module-adapter'

import { configSelector as configPreProposeSelector } from '../contracts/CwPreProposeSingle.recoil'
import { reverseProposalsSelector } from '../contracts/CwProposalSingle.common.recoil'
import { configSelector as configV1Selector } from '../contracts/CwProposalSingle.v1.recoil'

export const makeReverseProposalInfos = ({
  proposalModule: { address, prefix },
}: IProposalModuleAdapterCommonOptions): ReverseProposalInfosSelector =>
  selectorFamily({
    key: 'cwProposalSingleReverseProposalInfos',
    get:
      ({ startBefore, limit }) =>
      async ({ get }) => {
        const proposalResponses = get(
          reverseProposalsSelector({
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
  proposalModule: { address, version, preProposeAddress },
}: IProposalModuleAdapterCommonOptions): DepositInfoSelector =>
  selector({
    key: 'cwProposalSingleDepositInfo',
    get: ({ get }) => {
      let depositInfo: CheckedDepositInfo | undefined
      //! V1
      if (version === ContractVersion.V0_1_0) {
        const config = get(
          configV1Selector({
            contractAddress: address,
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
