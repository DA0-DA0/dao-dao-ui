import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { ContractVersion } from '@dao-dao/types'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { processError } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { useVote as useVoteV1 } from '../contracts/CwProposalSingle.v1.hooks'
import { useVote as useVoteV2 } from '../contracts/DaoProposalSingle.v2.hooks'
import { useLoadingWalletVoteInfo } from './useLoadingWalletVoteInfo'

export const useCastVote = (onSuccess?: () => void | Promise<void>) => {
  const { proposalModule, proposalNumber } = useProposalModuleAdapterOptions()
  const { connected, address: walletAddress = '' } = useWallet()

  const castVote = (
    proposalModule.version === ContractVersion.V1 ? useVoteV1 : useVoteV2
  )({
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

  return {
    castVote: useCallback(
      async (vote: Vote) => {
        if (!connected) return

        setCastingVote(true)

        try {
          await castVote({
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
      [connected, setCastingVote, castVote, proposalNumber, onSuccess]
    ),
    castingVote,
  }
}
