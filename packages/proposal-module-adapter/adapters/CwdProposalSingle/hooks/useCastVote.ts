import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { ContractVersion } from '@dao-dao/tstypes'
import { Vote } from '@dao-dao/tstypes/contracts/CwdProposalSingle.common'
import { processError } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react'
import { useVote as useVoteV2 } from '../contracts/CwdProposalSingle.v2.hooks'
import { useVote as useVoteV1 } from '../contracts/CwProposalSingle.v1.hooks'

export const useCastVote = (onSuccess?: () => void | Promise<void>) => {
  const { proposalModule, proposalNumber } = useProposalModuleAdapterOptions()
  const { connected, address: walletAddress = '' } = useWallet()

  const castVote = (
    proposalModule.version === ContractVersion.V0_1_0 ? useVoteV1 : useVoteV2
  )({
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
