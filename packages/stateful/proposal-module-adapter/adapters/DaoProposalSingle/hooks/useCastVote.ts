import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { ContractVersion } from '@dao-dao/types'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { processError } from '@dao-dao/utils'

import {
  CwProposalSingleV1Hooks,
  DaoProposalSingleV2Hooks,
  useWallet,
} from '../../../../hooks'
import { useProposalModuleAdapterContext } from '../../../react'
import { useLoadingWalletVoteInfo } from './useLoadingWalletVoteInfo'

export const useCastVote = (onSuccess?: () => void | Promise<void>) => {
  const {
    proposalModule,
    options: { proposalNumber },
  } = useProposalModuleAdapterContext()
  const {
    isWalletConnected,
    address: walletAddress = '',
    getSigningClient,
  } = useWallet()

  const _castVote = (
    proposalModule.version === ContractVersion.V1
      ? CwProposalSingleV1Hooks.useVote
      : DaoProposalSingleV2Hooks.useVote
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

  const castVote = useCallback(
    async (vote: Vote) => {
      if (!isWalletConnected) {
        toast.error('Log in to continue.')
        return
      }

      setCastingVote(true)

      try {
        await proposalModule.vote({
          proposalId: proposalNumber,
          vote,
          getSigningClient,
          sender: walletAddress,
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
    [
      isWalletConnected,
      proposalModule,
      proposalNumber,
      getSigningClient,
      walletAddress,
      onSuccess,
    ]
  )

  return {
    castVote,
    castingVote,
  }
}
