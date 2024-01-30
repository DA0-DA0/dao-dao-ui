import { DaoInfoCards as StatelessDaoInfoCards } from '@dao-dao/stateless'

import { useProposalModuleAdapterCommon } from '../../proposal-module-adapter/react/context'

export const ProposalDaoInfoCards = () => {
  const {
    hooks: { useProposalDaoInfoCards },
  } = useProposalModuleAdapterCommon()

  return <StatelessDaoInfoCards cards={useProposalDaoInfoCards()} />
}
