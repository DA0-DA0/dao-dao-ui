import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { CwProposalSingleHooks } from '@dao-dao/state'
import { Vote } from '@dao-dao/state/clients/cw-proposal-single'
import { processError } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'

export const useCastVote = (onSuccess?: () => void | Promise<void>) => {
  const { proposalModule, proposalNumber } = useProposalModuleAdapterOptions()
  const { connected, address: walletAddress = '' } = useWallet()

  const castVote = CwProposalSingleHooks.useCastVote({
    contractAddress: proposalModule.address,
    sender: walletAddress ?? '',
  })

  const [castingVote, setCastingVote] = useState(false)

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
        } finally {
          setCastingVote(false)
        }
      },
      [connected, setCastingVote, castVote, proposalNumber, onSuccess]
    ),
    castingVote,
  }
}
