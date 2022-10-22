import { selector, selectorFamily, waitForAll } from 'recoil'

import { blockHeightTimestampSafeSelector } from '@dao-dao/state'
import {
  CheckedDepositInfo,
  ContractVersion,
  DepositRefundPolicy,
} from '@dao-dao/types'
import { Status } from '@dao-dao/types/contracts/CwdProposalSingle.common'
import {
  CommonProposalListInfo,
  DepositInfoSelector,
  IProposalModuleAdapterCommonOptions,
  ReverseProposalInfosSelector,
} from '@dao-dao/types/proposal-module-adapter'

import { configSelector as configPreProposeSelector } from '../contracts/CwdPreProposeSingle.recoil'
import { reverseProposalsSelector } from '../contracts/CwdProposalSingle.common.recoil'
import { configSelector as configV1Selector } from '../contracts/CwProposalSingle.v1.recoil'

export const makeReverseProposalInfos = ({
  chainId,
  proposalModule: { address, prefix },
}: IProposalModuleAdapterCommonOptions): ReverseProposalInfosSelector =>
  selectorFamily({
    // Unique for inputs.
    key: `cwdProposalSingleReverseProposalInfos_${address}_${prefix}`,
    get:
      ({ startBefore, limit }) =>
      async ({ get }) => {
        const proposalResponses = get(
          reverseProposalsSelector({
            contractAddress: address,
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
            proposalResponses.map(({ proposal: { start_height } }) =>
              blockHeightTimestampSafeSelector({
                blockHeight: start_height,
                chainId,
              })
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
  chainId,
  proposalModule: { address, version, preProposeAddress },
}: IProposalModuleAdapterCommonOptions): DepositInfoSelector =>
  selector({
    // Unique for inputs.
    key: `cwdProposalSingleDepositInfo_${address}_${version}_${preProposeAddress}`,
    get: ({ get }) => {
      let depositInfo: CheckedDepositInfo | undefined
      //! V1
      if (version === ContractVersion.V0_1_0) {
        const config = get(
          configV1Selector({
            contractAddress: address,
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
