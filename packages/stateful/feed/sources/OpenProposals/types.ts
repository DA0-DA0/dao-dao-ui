import {
  StatefulGovProposalLineProps,
  StatefulProposalLineProps,
} from '@dao-dao/types'

export type OpenProposalsProposalLineProps =
  | {
      type: 'dao'
      props: StatefulProposalLineProps
    }
  | {
      type: 'gov'
      props: StatefulGovProposalLineProps
    }
