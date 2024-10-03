import { ComponentType } from 'react'

import { IDaoBase } from '../clients'
import { ButtonLinkProps } from './Buttonifier'
import { FollowState } from './DaoCard'
import { LinkWrapperProps } from './LinkWrapper'

export type DaoSplashHeaderProps = {
  dao: IDaoBase
  follow?: FollowState
  ButtonLink: ComponentType<ButtonLinkProps>
  LinkWrapper: ComponentType<LinkWrapperProps>
  /**
   * If this DAO is not recognized by its parent DAO as a SubDAO, and the
   * current wallet is a member of the parent DAO, link to a new proposal in the
   * parent DAO with the SubDAO recognition action pre-filled. Passed from
   * `DaoDappTabbedHome.tsx`.
   */
  parentProposalRecognizeSubDaoHref?: string
  /**
   * If this DAO has a parent DAO set but its contract-level admin is set to
   * itself, link to a new proposal that changes its admin. Passed from
   * `DaoDappTabbedHome.tsx`.
   */
  proposeUpdateAdminToParentHref?: string
}
