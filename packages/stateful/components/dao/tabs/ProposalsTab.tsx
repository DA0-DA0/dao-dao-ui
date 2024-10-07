import {
  ProposalsTab as StatelessProposalsTab,
  useDao,
} from '@dao-dao/stateless'

import { ButtonLink } from '../../ButtonLink'
import { ProposalList } from '../../ProposalList'

export const ProposalsTab = () => {
  const dao = useDao()

  return (
    <StatelessProposalsTab
      ButtonLink={ButtonLink}
      ProposalList={ProposalList}
      dao={dao}
    />
  )
}
