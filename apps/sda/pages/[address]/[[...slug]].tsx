// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, GetStaticProps } from 'next'

import { DaoSdaHome } from '@dao-dao/stateful'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import { DaoPageMode } from '@dao-dao/types'
import { SITE_URL, getDaoPath } from '@dao-dao/utils'

export default DaoSdaHome

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps = makeGetDaoStaticProps({
  appMode: DaoPageMode.Sda,
  getProps: async ({ dao: { coreAddress } }) => ({
    url: SITE_URL + getDaoPath(DaoPageMode.Sda, coreAddress),
  }),
})
