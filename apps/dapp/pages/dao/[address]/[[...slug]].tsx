// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'

import {
  ChainGovernanceDappHome,
  DaoDappHome,
  DaoPageWrapper,
  DaoPageWrapperProps,
} from '@dao-dao/stateful'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import { ContractVersion, DaoPageMode } from '@dao-dao/types'
import { SITE_URL, getDaoPath } from '@dao-dao/utils'

const DaoHomePage: NextPage<DaoPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <DaoPageWrapper {...props}>
    {props.serializedInfo?.coreVersion === ContractVersion.Gov ? (
      <ChainGovernanceDappHome />
    ) : (
      <DaoDappHome />
    )}
  </DaoPageWrapper>
)

export default DaoHomePage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps = makeGetDaoStaticProps({
  appMode: DaoPageMode.Dapp,
  getProps: async ({ coreAddress }) => ({
    url: SITE_URL + getDaoPath(DaoPageMode.Dapp, coreAddress),
  }),
})
