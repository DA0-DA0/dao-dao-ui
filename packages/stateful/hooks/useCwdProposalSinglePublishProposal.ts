import { useMemo } from 'react'

import { useDaoInfoContext } from '@dao-dao/stateless'

import {
  CwdProposalSingleAdapter,
  matchAndLoadCommon,
  matchAdapter as matchProposalModuleAdapter,
} from '../proposal-module-adapter'
import { makeUsePublishProposal } from '../proposal-module-adapter/adapters/CwdProposalSingle/common/hooks/makeUsePublishProposal'
import { PublishProposal } from '../proposal-module-adapter/adapters/CwdProposalSingle/types'

// Returns the publishProposal function for the CwdProposalSingle module on the
// current DAO. If the DAO does not have a CwdProposalSingle module, returns
// undefined. This hook makes it easy to publish a proposal from anywhere.
export const useCwdProposalSinglePublishProposal = ():
  | PublishProposal
  | undefined => {
  const { coreAddress, chainId, proposalModules } = useDaoInfoContext()

  // Memoize hook getter since we don't want to create the hook more than once.
  // `useDaoInfoContext` always returns the same instances of the data, so no
  // hook rules are violated here.
  const useProposalModule = useMemo(() => {
    const cwdProposalSingleModule = proposalModules.find(
      ({ contractName }) =>
        matchProposalModuleAdapter(contractName)?.id ===
        CwdProposalSingleAdapter.id
    )
    if (!cwdProposalSingleModule) {
      return undefined
    }

    const common = matchAndLoadCommon(cwdProposalSingleModule, {
      coreAddress,
      chainId,
    })

    return makeUsePublishProposal({
      options: {
        proposalModule: cwdProposalSingleModule,
        coreAddress,
        chainId,
      },
      depositInfoSelector: common.selectors.depositInfo,
    })
  }, [proposalModules, coreAddress, chainId])

  const { publishProposal } = useProposalModule?.() ?? {}

  return publishProposal
}
