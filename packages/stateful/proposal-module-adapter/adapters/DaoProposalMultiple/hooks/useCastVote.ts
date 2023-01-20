import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'
import { processError } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { useVote } from '../contracts/DaoProposalMultiple.hooks'

export const useCastVote = (onSuccess?: () => void | Promise<void>) => {
  const { proposalModule, proposalNumber } = useProposalModuleAdapterOptions()
  const { connected, address: walletAddress = '' } = useWallet()

  const castVote = useVote({
    contractAddress: proposalModule.address,
    sender: walletAddress ?? '',
  })

  const [castingVote, setCastingVote] = useState(false)

  return {
    castVote: useCallback(
      async (vote: MultipleChoiceVote) => {
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
        } finally {
          setCastingVote(false)
        }
      },
      [connected, setCastingVote, castVote, proposalNumber, onSuccess]
    ),
    castingVote,
  }
}
