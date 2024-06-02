// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import {
  CreateDaoProposal,
  CreateGovProposal,
  DaoPageWrapper,
  DaoPageWrapperProps,
} from '@dao-dao/stateful'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import { PageLoader } from '@dao-dao/stateless'
import { ContractVersion, DaoPageMode } from '@dao-dao/types'
import { SITE_URL, getDaoProposalPath } from '@dao-dao/utils'

const ProposalCreatePage: NextPage<DaoPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <DaoPageWrapper {...props}>
    {!props.info ? (
      <PageLoader />
    ) : props.info.coreVersion === ContractVersion.Gov ? (
      <CreateGovProposal />
    ) : (
      <CreateDaoProposal />
    )}
  </DaoPageWrapper>
)

export default ProposalCreatePage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps = makeGetDaoStaticProps({
  appMode: DaoPageMode.Dapp,
  getProps: ({ t, daoInfo: { coreAddress } }) => ({
    url: SITE_URL + getDaoProposalPath(DaoPageMode.Dapp, coreAddress, 'create'),
    followingTitle: t('title.createAProposal'),
  }),
})
