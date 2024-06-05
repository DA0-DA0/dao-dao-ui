import uniqBy from 'lodash.uniqby'
import { useEffect, useState } from 'react'
import { useRecoilCallback } from 'recoil'

import { DaoProposalSingleCommonSelectors } from '@dao-dao/state'
import {
  ProposalVote,
  ProposalVotes as StatelessProposalVotes,
  useInfiniteScroll,
} from '@dao-dao/stateless'
import { BaseProposalVotesProps } from '@dao-dao/types'

import { EntityDisplay } from '../../../../../components/EntityDisplay'
import { useProposalModuleAdapterOptions } from '../../../../react/context'
import { useLoadingProposal } from '../../hooks'
import { VoteDisplay } from './VoteDisplay'

const VOTES_PER_PAGE = 20

export const ProposalVotes = (props: BaseProposalVotesProps) => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
    chain: { chain_id: chainId },
  } = useProposalModuleAdapterOptions()

  const loadingProposal = useLoadingProposal()

  const totalPower = loadingProposal.loading
    ? 0
    : Number(loadingProposal.data.total_power)

  const [loading, setLoading] = useState(true)
  const [noMoreVotes, setNoMoreVotes] = useState(false)
  const [votes, setVotes] = useState<ProposalVote[]>([])
  const loadVotes = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        // Don't load votes until proposal is ready so that the `totalPower`
        // calculation in the transformation function works correctly.
        if (loadingProposal.loading) {
          return
        }

        setLoading(true)
        try {
          const newVotes = (
            await snapshot.getPromise(
              DaoProposalSingleCommonSelectors.listVotesSelector({
                chainId,
                contractAddress: proposalModuleAddress,
                params: [
                  {
                    proposalId: proposalNumber,
                    limit: VOTES_PER_PAGE,
                    startAfter:
                      votes.length > 0
                        ? votes[votes.length - 1].voterAddress
                        : undefined,
                  },
                ],
              })
            )
          ).votes.map(
            ({ vote, voter, power, rationale, votedAt }): ProposalVote => ({
              voterAddress: voter,
              vote,
              votingPowerPercent:
                totalPower === 0 ? 0 : (Number(power) / totalPower) * 100,
              rationale,
              votedAt: votedAt ? new Date(votedAt) : undefined,
            })
          )

          setVotes((prev) =>
            uniqBy([...prev, ...newVotes], ({ voterAddress }) => voterAddress)
          )
          setNoMoreVotes(newVotes.length < VOTES_PER_PAGE)
        } finally {
          setLoading(false)
        }
      },
    [
      chainId,
      proposalModuleAddress,
      proposalNumber,
      totalPower,
      loadingProposal.loading,
      votes,
    ]
  )
  // Load once proposal is ready.
  useEffect(() => {
    if (!loadingProposal.loading) {
      loadVotes()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingProposal.loading])

  const getAllVotes = useRecoilCallback(
    ({ snapshot }) =>
      async () =>
        (
          await snapshot.getPromise(
            DaoProposalSingleCommonSelectors.listAllVotesSelector({
              chainId,
              contractAddress: proposalModuleAddress,
              proposalId: proposalNumber,
            })
          )
        ).map(
          ({ vote, voter, power, rationale, votedAt }): ProposalVote => ({
            voterAddress: voter,
            vote,
            votingPowerPercent:
              totalPower === 0 ? 0 : (Number(power) / totalPower) * 100,
            rationale,
            votedAt: votedAt ? new Date(votedAt) : undefined,
          })
        )
  )

  const { infiniteScrollRef } = useInfiniteScroll({
    loadMore: loadVotes,
    disabled: loading || noMoreVotes,
    infiniteScrollFactor: 0.1,
  })

  return (
    <StatelessProposalVotes
      EntityDisplay={EntityDisplay}
      VoteDisplay={VoteDisplay}
      containerRef={infiniteScrollRef}
      exportVoteTransformer={(vote) => vote}
      getAllVotes={getAllVotes}
      votes={
        loading && votes.length === 0
          ? { loading: true, errored: false }
          : {
              loading: false,
              updating: loading,
              errored: false,
              data: votes,
            }
      }
      votingOpen={!loadingProposal.loading && loadingProposal.data.votingOpen}
      {...props}
    />
  )
}
