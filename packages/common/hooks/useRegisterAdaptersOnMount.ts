import { useRouter } from 'next/router'
import { useEffect } from 'react'

import {
  CwProposalSingleAdapter,
  registerAdapters as registerProposalModuleAdapters,
} from '@dao-dao/proposal-module-adapter'
import {
  Cw20StakedBalanceVotingAdapter,
  Cw4VotingAdapter,
  CwNativeStakedBalanceVotingAdapter,
  HowlVotingAdapter,
  registerAdapters as registerVotingModuleAdapters,
} from '@dao-dao/voting-module-adapter'

export const useRegisterAdaptersOnMount = () => {
  const { isFallback } = useRouter()

  // Register adapters once on page load, after fallback.
  useEffect(() => {
    if (isFallback) {
      return
    }

    // Register voting module adapters.
    registerVotingModuleAdapters([
      Cw4VotingAdapter,
      Cw20StakedBalanceVotingAdapter,
      CwNativeStakedBalanceVotingAdapter,
      HowlVotingAdapter,
    ])

    // Register proposal module adapters.
    registerProposalModuleAdapters([
      CwProposalSingleAdapter,
      // When adding new proposal module adapters here, don't forget to register
      // in `makeGetDaoStaticProps` as well.
    ])
  }, [isFallback])
}
