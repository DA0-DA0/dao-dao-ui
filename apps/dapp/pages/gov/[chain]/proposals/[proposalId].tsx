// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import {
  GovPageWrapper,
  GovProposal,
  GovProposalPageWrapperProps,
} from '@dao-dao/stateful'
import { makeGetGovProposalStaticProps } from '@dao-dao/stateful/server'

const ProposalPage: NextPage<GovProposalPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <GovPageWrapper {...props}>
    <GovProposal {...props} />
  </GovPageWrapper>
)

export default ProposalPage

// Fallback to loading screen if page has not yet been statically
// generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps = makeGetGovProposalStaticProps()
