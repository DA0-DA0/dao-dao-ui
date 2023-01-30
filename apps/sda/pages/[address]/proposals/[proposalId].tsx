// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths } from 'next'

import { DaoProposal } from '@dao-dao/stateful'
import { makeGetDaoProposalStaticProps } from '@dao-dao/stateful/server'
import { DaoPageMode } from '@dao-dao/types'
import { SITE_URL, getDaoProposalPath } from '@dao-dao/utils'

export default DaoProposal

// Fallback to loading screen if page has not yet been statically
// generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = makeGetDaoProposalStaticProps({
  getProposalUrlPrefix: ({ address }) =>
    SITE_URL +
    getDaoProposalPath(
      DaoPageMode.Sda,
      typeof address === 'string' ? address : '',
      ''
    ),
})
