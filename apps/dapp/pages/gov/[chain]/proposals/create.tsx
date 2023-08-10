// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, NextPage } from 'next'

import {
  CreateGovProposal,
  GovPageWrapper,
  GovPageWrapperProps,
} from '@dao-dao/stateful'
import { makeGetGovStaticProps } from '@dao-dao/stateful/server'
import { SITE_URL, getGovProposalPath } from '@dao-dao/utils'

const ProposalCreatePage: NextPage<GovPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <GovPageWrapper {...props}>
    <CreateGovProposal />
  </GovPageWrapper>
)

export default ProposalCreatePage

// Fallback to loading screen if page has not yet been statically
// generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = makeGetGovStaticProps({
  getProps: ({ t, chainName }) => ({
    url: SITE_URL + getGovProposalPath(chainName, 'create'),
    followingTitle: t('title.createAProposal'),
  }),
})
