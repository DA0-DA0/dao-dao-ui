import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'
import { processError } from '@dao-dao/utils'

import {
  DaoProposalMultipleHooks,
  useWalletWithSecretNetworkPermit,
} from '../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../react'
import { useLoadingWalletVoteInfo } from './useLoadingWalletVoteInfo'

export const useCastVote = (onSuccess?: () => void | Promise<void>) => {
  const { coreAddress, proposalModule, proposalNumber } =
    useProposalModuleAdapterOptions()
  const {
    isSecretNetwork,
    isWalletConnected,
    address: walletAddress = '',
    getPermit,
  } = useWalletWithSecretNetworkPermit({
    dao: coreAddress,
  })

  const _castVote = DaoProposalMultipleHooks.useVote({
    contractAddress: proposalModule.address,
    sender: walletAddress,
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
      if (!isWalletConnected) {
        toast.error('Log in to continue.')
        return
      }

      setCastingVote(true)

      try {
        const permit = await getPermit()

        await _castVote({
          proposalId: proposalNumber,
          vote,
          ...(isSecretNetwork && {
            auth: {
              permit,
            },
          }),
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
      getPermit,
      _castVote,
      proposalNumber,
      isSecretNetwork,
      onSuccess,
    ]
  )

  return {
    castVote,
    castingVote,
  }
}
