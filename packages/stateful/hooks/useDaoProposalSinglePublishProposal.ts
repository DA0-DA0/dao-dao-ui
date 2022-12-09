import { useMemo } from 'react'

import { useDaoInfoContext } from '@dao-dao/stateless'

import {
  DaoProposalSingleAdapter,
  matchAndLoadCommon,
  matchAdapter as matchProposalModuleAdapter,
} from '../proposal-module-adapter'
import { makeUsePublishProposal } from '../proposal-module-adapter/adapters/DaoProposalSingle/common/hooks/makeUsePublishProposal'
import { PublishProposal } from '../proposal-module-adapter/adapters/DaoProposalSingle/types'

// Returns the publishProposal function for the DaoProposalSingle module on the
// current DAO. If the DAO does not have a DaoProposalSingle module, returns
// undefined. This hook makes it easy to publish a proposal from anywhere.
export const useDaoProposalSinglePublishProposal = ():
  | PublishProposal
  | undefined => {
  const { coreAddress, chainId, proposalModules } = useDaoInfoContext()

  // Memoize hook getter since we don't want to create the hook more than once.
  // `useDaoInfoContext` always returns the same instances of the data, so no
  // hook rules are violated here.
  const useProposalModule = useMemo(() => {
    const daoProposalSingleModule = proposalModules.find(
      ({ contractName }) =>
        matchProposalModuleAdapter(contractName)?.id ===
        DaoProposalSingleAdapter.id
    )
    if (!daoProposalSingleModule) {
      return undefined
    }

    const common = matchAndLoadCommon(daoProposalSingleModule, {
      coreAddress,
      chainId,
    })

    return makeUsePublishProposal({
      options: {
        proposalModule: daoProposalSingleModule,
        coreAddress,
        chainId,
      },
      depositInfoSelector: common.selectors.depositInfo,
    })
  }, [proposalModules, coreAddress, chainId])

  const { publishProposal } = useProposalModule?.() ?? {}

  return publishProposal
}
