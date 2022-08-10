import { DownloadIcon } from '@heroicons/react/outline'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilCallback, useRecoilValue } from 'recoil'

import {
  CwProposalSingleSelectors,
  refreshProposalIdAtom,
} from '@dao-dao/state'
import { Button } from '@dao-dao/ui'

import { useProposalModuleAdapterOptions } from '../../../../react/context'
import { BaseProposalVotesProps } from '../../../../types'
import { VoteInfo, VoteRow } from './VoteRow'

const VOTE_LIMIT = 30

export const ProposalVotes = ({ className }: BaseProposalVotesProps) => {
  const { t } = useTranslation()
  const {
    proposalModule: { address: proposalModuleAddress },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const { proposal } = useRecoilValue(
    CwProposalSingleSelectors.proposalSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    })
  )

  const totalPower = Number(proposal.total_power)

  const _initialVotes = useRecoilValue(
    CwProposalSingleSelectors.listVotesSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          proposalId: proposalNumber,
          limit: VOTE_LIMIT,
        },
      ],
    })
  ).votes
  const initialVotes: VoteInfo[] = useMemo(
    () =>
      _initialVotes.map(({ vote, voter, power }) => ({
        vote,
        voter,
        weight: (Number(power) / totalPower) * 100,
      })),
    [_initialVotes, totalPower]
  )

  const [votes, setVotes] = useState<VoteInfo[]>(initialVotes)
  const [votesLoading, setVotesLoading] = useState(false)
  // If we get as many votes back as we ask for, there may be more.
  const [canLoadMore, setCanLoadMore] = useState(votes.length === VOTE_LIMIT)

  // When proposal updates, reset loaded votes back to initial.
  const refreshProposalId = useRecoilValue(
    refreshProposalIdAtom({
      address: proposalModuleAddress,
      proposalId: proposalNumber,
    })
  )
  useEffect(() => {
    setVotes(initialVotes)
    // Don't update every time initialVotes changes. Only refresh ID.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshProposalId])

  const loadMoreVotes = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        setVotesLoading(true)
        try {
          const startAfter = votes[votes.length - 1].voter
          const newVotes: VoteInfo[] = (
            await snapshot.getPromise(
              CwProposalSingleSelectors.listVotesSelector({
                contractAddress: proposalModuleAddress,
                params: [
                  {
                    proposalId: proposalNumber,
                    startAfter,
                    limit: VOTE_LIMIT,
                  },
                ],
              })
            )
          ).votes.map(({ vote, voter, power }) => ({
            vote,
            voter,
            weight: (Number(power) / totalPower) * 100,
          }))

          setCanLoadMore(newVotes.length === 30)
          setVotes((votes) => [...votes, ...newVotes])
        } finally {
          setVotesLoading(false)
        }
      },
    [votes, setVotes, proposalNumber, setVotesLoading]
  )

  return (
    <div className={className}>
      <hr className="border-default" />
      <h3 className="mt-8 mb-5 link-text">{t('title.allVotes')}</h3>
      <div className="flex flex-col mb-5 divide-y divide-inactive">
        {votes.map((vote, index) => (
          <VoteRow {...vote} key={index} />
        ))}
      </div>
      {canLoadMore && (
        <div className="-mt-3 mb-5">
          <Button
            loading={votesLoading}
            onClick={loadMoreVotes}
            size="sm"
            variant="secondary"
          >
            {t('button.loadMore')} <DownloadIcon className="w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
