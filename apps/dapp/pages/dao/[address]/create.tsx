// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import {
  CreateSubDao,
  DaoPageWrapper,
  DaoPageWrapperProps,
} from '@dao-dao/stateful'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import { DaoPageMode } from '@dao-dao/types'
import { SITE_URL, getDaoPath } from '@dao-dao/utils'

const CreateSubDaoPage: NextPage<DaoPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <DaoPageWrapper {...props}>
    <CreateSubDao />
  </DaoPageWrapper>
)

export default CreateSubDaoPage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps = makeGetDaoStaticProps({
  appMode: DaoPageMode.Dapp,
  getProps: async ({ t, dao: { coreAddress } }) => ({
    url: SITE_URL + getDaoPath(DaoPageMode.Dapp, coreAddress, 'create'),
    followingTitle: t('title.createASubDao'),
  }),
})
