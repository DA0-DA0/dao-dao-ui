import { RecoilValueReadOnly, selectorFamily } from 'recoil'

import {
  DaoPreProposeMultipleSelectors,
  DaoProposalMultipleSelectors,
  chainQueries,
  daoPreProposeApprovalMultipleQueries,
  queryClientAtom,
} from '@dao-dao/state'
import {
  CheckedDepositInfo,
  ContractVersion,
  Duration,
  ProposalStatusEnum,
  WithChainId,
} from '@dao-dao/types'
import { MultipleChoiceApprovalProposal } from '@dao-dao/types/contracts/DaoPreProposeApprovalMultiple'
import {
  CommonProposalListInfo,
  DepositInfoSelector,
} from '@dao-dao/types/proposal-module-adapter'

export const proposalCountSelector: (
  info: WithChainId<{
    proposalModuleAddress: string
  }>
) => RecoilValueReadOnly<number> = selectorFamily({
  key: 'daoProposalMultipleProposalCount',
  get:
    ({ chainId, proposalModuleAddress }) =>
    ({ get }) =>
      get(
        DaoProposalMultipleSelectors.proposalCountSelector({
          contractAddress: proposalModuleAddress,
          chainId,
        })
      ),
})

export const maxVotingPeriodSelector = selectorFamily<
  Duration,
  WithChainId<{
    proposalModuleAddress: string
  }>
>({
  key: 'daoProposalMultipleMaxVotingPeriod',
  get:
    ({ chainId, proposalModuleAddress }) =>
    ({ get }) => {
      const config = get(
        DaoProposalMultipleSelectors.configSelector({
          contractAddress: proposalModuleAddress,
          chainId,
        })
      )

      return config.max_voting_period
    },
})

export const reverseProposalInfosSelector: (
  info: WithChainId<{
    proposalModuleAddress: string
    proposalModulePrefix: string
    startBefore: number | undefined
    limit: number | undefined
  }>
) => RecoilValueReadOnly<CommonProposalListInfo[]> = selectorFamily({
  key: 'daoProposalMultipleReverseProposalInfos',
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
        DaoProposalMultipleSelectors.reverseProposalsSelector({
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

      const queryClient = get(queryClientAtom)
      const timestamps = await Promise.all(
        proposalResponses.map(({ proposal: { start_height }, ...response }) =>
          // Indexer returns createdAt, so check its existence and fetch from
          // chain if not present.
          typeof response.createdAt === 'string'
            ? new Date(response.createdAt)
            : queryClient
                .fetchQuery(
                  chainQueries.blockTimestampSafe({
                    chainId,
                    height: start_height,
                  })
                )
                .then((time) => (time ? new Date(time) : undefined))
        )
      )

      const proposalInfos: CommonProposalListInfo[] = proposalResponses.map(
        ({ id, proposal: { status, veto } }, index) => ({
          id: `${proposalModulePrefix}${id}`,
          proposalNumber: id,
          timestamp: timestamps[index],
          status,
          ...(veto?.early_execute && {
            executableEarly: true,
          }),
        })
      )

      return proposalInfos
    },
})

export const reversePreProposePendingProposalInfosSelector: (
  info: WithChainId<{
    proposalModuleAddress: string
    proposalModulePrefix: string
    startBefore: number | undefined
    limit: number | undefined
  }>
) => RecoilValueReadOnly<CommonProposalListInfo[]> = selectorFamily({
  key: 'daoProposalMultipleReversePreProposePendingProposalInfos',
  get:
    ({
      chainId,
      proposalModuleAddress,
      proposalModulePrefix,
      startBefore,
      limit,
    }) =>
    async ({ get }) => {
      const queryClient = get(queryClientAtom)
      const pendingProposals = (await queryClient.fetchQuery(
        daoPreProposeApprovalMultipleQueries.queryExtension({
          contractAddress: proposalModuleAddress,
          chainId,
          args: {
            msg: {
              reverse_pending_proposals: {
                start_before: startBefore,
                limit,
              },
            },
          },
        })
      )) as MultipleChoiceApprovalProposal[]

      const proposalInfos: CommonProposalListInfo[] = pendingProposals.map(
        ({ approval_id: id, createdAt }) => ({
          id: `${proposalModulePrefix}*${id}`,
          proposalNumber: id,
          timestamp: createdAt ? new Date(createdAt) : undefined,
          status: ProposalStatusEnum.Open,
        })
      )

      return proposalInfos
    },
})

export const reversePreProposeCompletedProposalInfosSelector: (
  info: WithChainId<{
    proposalModuleAddress: string
    proposalModulePrefix: string
    startBefore: number | undefined
    limit: number | undefined
  }>
) => RecoilValueReadOnly<CommonProposalListInfo[]> = selectorFamily({
  key: 'daoProposalMultipleReversePreProposeCompletedProposalInfos',
  get:
    ({
      chainId,
      proposalModuleAddress,
      proposalModulePrefix,
      startBefore,
      limit,
    }) =>
    async ({ get }) => {
      const queryClient = get(queryClientAtom)
      const completedProposals = (await queryClient.fetchQuery(
        daoPreProposeApprovalMultipleQueries.queryExtension({
          contractAddress: proposalModuleAddress,
          chainId,
          args: {
            msg: {
              reverse_completed_proposals: {
                start_before: startBefore,
                limit,
              },
            },
          },
        })
      )) as MultipleChoiceApprovalProposal[]

      const proposalInfos: CommonProposalListInfo[] = completedProposals.map(
        ({ approval_id: id, status, createdAt }) => ({
          id: `${proposalModulePrefix}*${id}`,
          proposalNumber: id,
          timestamp: createdAt ? new Date(createdAt) : undefined,
          status:
            'pending' in status
              ? ProposalStatusEnum.Open
              : 'approved' in status
                ? ProposalStatusEnum.Executed
                : ProposalStatusEnum.Closed,
          // Hide approved proposals from the list since they show up as normal
          // proposals. No need to show duplicates. But we still want to show
          // rejected pre-propose proposals.
          hideFromList: 'approved' in status,
        })
      )

      return proposalInfos
    },
})

export const depositInfoSelector: (
  info: WithChainId<{
    proposalModuleAddress: string
    version: ContractVersion | null
    preProposeAddress: string | null
  }>
) => DepositInfoSelector = selectorFamily({
  key: 'daoProposalMultipleDepositInfo',
  get:
    ({ chainId, preProposeAddress }) =>
    ({ get }) => {
      let depositInfo: CheckedDepositInfo | undefined
      if (preProposeAddress) {
        const config = get(
          DaoPreProposeMultipleSelectors.configSelector({
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
