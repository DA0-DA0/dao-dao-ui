import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'
import { processError } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { useVote } from '../contracts/DaoProposalMultiple.hooks'
import { useLoadingWalletVoteInfo } from './useLoadingWalletVoteInfo'

export const useCastVote = (onSuccess?: () => void | Promise<void>) => {
  const { proposalModule, proposalNumber } = useProposalModuleAdapterOptions()
  const { connected, address: walletAddress = '' } = useWallet()

  const _castVote = useVote({
    contractAddress: proposalModule.address,
    sender: walletAddress ?? '',
  })

  const [castingVote, setCastingVote] = useState(false)

  // On vote update, stop loading. This ensures the vote button doesn't stop
  // loading too early, before the vote data has been refreshed.
  const loadingWalletVoteInfo = useLoadingWalletVoteInfo()
  const vote =
    !loadingWalletVoteInfo || loadingWalletVoteInfo.loading
      ? undefined
      : loadingWalletVoteInfo.data.vote
  useEffect(() => {
    setCastingVote(false)
  }, [vote])

  const castVote = useCallback(
    async (vote: MultipleChoiceVote) => {
      if (!connected) return

      setCastingVote(true)

      try {
        await _castVote({
          proposalId: proposalNumber,
          vote,
        })

        await onSuccess?.()
      } catch (err) {
        console.error(err)
        toast.error(processError(err))

        // Stop loading if errored.
        setCastingVote(false)
      }

      // Loading will stop on success when vote data refreshes.
    },
    [connected, setCastingVote, _castVote, proposalNumber, onSuccess]
  )

  return {
    castVote,
    castingVote,
  }
}
