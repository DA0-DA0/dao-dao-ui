import { useMemo } from 'react'

import { useDao } from '@dao-dao/stateless'
import { DaoProposalSingleAdapterId } from '@dao-dao/utils'

import {
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
  const dao = useDao()

  // Memoize hook getter since we don't want to create the hook more than once.
  // `useDao` always returns the same instances of the data, so no
  // hook rules are violated here.
  const useProposalModule = useMemo(() => {
    const daoProposalSingleModule = dao.proposalModules.find(
      ({ contractName }) =>
        matchProposalModuleAdapter(contractName)?.id ===
        DaoProposalSingleAdapterId
    )
    if (!daoProposalSingleModule) {
      return undefined
    }

    const common = matchAndLoadCommon(dao, daoProposalSingleModule.address)

    return makeUsePublishProposal({
      proposalModule: daoProposalSingleModule,
      depositInfoSelector: common.selectors.depositInfo,
    })
  }, [dao])

  const { publishProposal } = useProposalModule?.() ?? {}

  return publishProposal
}
