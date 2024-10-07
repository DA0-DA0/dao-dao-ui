import uniqBy from 'lodash.uniqby'
import { useEffect, useState } from 'react'
import { useRecoilCallback } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import { DaoProposalSingleCommonSelectors } from '@dao-dao/state'
import {
  ProposalVote,
  ProposalVotes as StatelessProposalVotes,
  useInfiniteScroll,
} from '@dao-dao/stateless'
import { BaseProposalVotesProps } from '@dao-dao/types'

import { EntityDisplay } from '../../../../../components/EntityDisplay'
import { useProposalModuleAdapterOptions } from '../../../../react/context'
import { useLoadingProposal, useProposalRefreshers } from '../../hooks'
import { VoteDisplay } from './VoteDisplay'

const VOTES_PER_PAGE = 20

export const ProposalVotes = (props: BaseProposalVotesProps) => {
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
    chain: { chain_id: chainId },
  } = useProposalModuleAdapterOptions()
  const { refreshProposalId } = useProposalRefreshers()

  const loadingProposal = useLoadingProposal()

  const totalPower = loadingProposal.loading
    ? HugeDecimal.zero
    : HugeDecimal.from(loadingProposal.data.total_power)

  const [loading, setLoading] = useState(true)
  const [noMoreVotes, setNoMoreVotes] = useState(false)
  const [votes, setVotes] = useState<ProposalVote[]>([])
  const loadVotes = useRecoilCallback(
    ({ snapshot }) =>
      async (
        /**
         * Reload all existing votes.
         */
        reloadAll = false
      ) => {
        // Don't load votes until proposal is ready so that the `totalPower`
        // calculation in the transformation function works correctly.
        if (loadingProposal.loading) {
          return
        }

        setLoading(true)
        try {
          let newVotes: ProposalVote[] = []
          let noMoreVotes = false

          while (true) {
            const pageVotes = (
              await snapshot.getPromise(
                DaoProposalSingleCommonSelectors.listVotesSelector({
                  chainId,
                  contractAddress: proposalModuleAddress,
                  params: [
                    {
                      proposalId: proposalNumber,
                      limit: VOTES_PER_PAGE,
                      startAfter: reloadAll
                        ? newVotes[newVotes.length - 1]?.voterAddress
                        : votes[votes.length - 1]?.voterAddress,
                    },
                  ],
                })
              )
            ).votes.map(
              ({ vote, voter, power, rationale, votedAt }): ProposalVote => ({
                voterAddress: voter,
                vote,
                votingPowerPercent: totalPower.isZero()
                  ? 0
                  : HugeDecimal.from(power)
                      .div(totalPower)
                      .times(100)
                      .toNumber(),
                rationale,
                votedAt: votedAt ? new Date(votedAt) : undefined,
              })
            )

            newVotes.push(...pageVotes)

            // No more votes if we loaded less than the limit we requested.
            noMoreVotes = pageVotes.length < VOTES_PER_PAGE
            if (noMoreVotes) {
              break
            }

            if (reloadAll) {
              // If reloading all, stop once we load at least as many votes as
              // we already have.
              if (newVotes.length >= votes.length) {
                break
              }
            } else {
              break
            }
          }

          setVotes((prev) =>
            uniqBy(
              // Reset votes array with new votes that started from the
              // beginning if we're reloading all. Otherwise, just append.
              [...(reloadAll ? [] : prev), ...newVotes],
              ({ voterAddress }) => voterAddress
            )
          )
          setNoMoreVotes(noMoreVotes)
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
  // Load once proposal is ready or refresh proposal ID changes.
  useEffect(() => {
    if (!loadingProposal.loading) {
      loadVotes(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingProposal.loading, refreshProposalId])

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
            votingPowerPercent: totalPower.isZero()
              ? 0
              : HugeDecimal.from(power).div(totalPower).times(100).toNumber(),
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
