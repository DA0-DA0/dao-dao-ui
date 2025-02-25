import { usePlausible } from 'next-plausible'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { chainQueries } from '@dao-dao/state/query'
import { PlausibleEvents } from '@dao-dao/types'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { processError } from '@dao-dao/utils'

import { useQueryLoadingDataWithError, useWallet } from '../../../../hooks'
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
  const plausible = usePlausible<PlausibleEvents>()

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

  const feeGrants = useQueryLoadingDataWithError(
    walletAddress
      ? chainQueries.feeGrantsByGrantee({
          chainId: proposalModule.chainId,
          address: walletAddress,
          basic: true,
        })
      : undefined
  )
  const feeGranter =
    !feeGrants.loading && !feeGrants.errored
      ? feeGrants.data[0]?.granter
      : undefined

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
          txOptions: {
            feeGranter,
          },
        })

        plausible('daoProposalVote', {
          props: {
            chainId: proposalModule.chainId,
            dao: proposalModule.dao.coreAddress,
            walletAddress,
            proposalModule: proposalModule.address,
            proposalModuleType: proposalModule.contractName,
            proposalNumber,
          },
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
      plausible,
      feeGranter,
    ]
  )

  return {
    castVote,
    castingVote,
  }
}
