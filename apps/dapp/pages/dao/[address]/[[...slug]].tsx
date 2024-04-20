// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'

import {
  ChainGovernanceDappHome,
  DaoDappHome,
  DaoPageWrapper,
  DaoPageWrapperProps,
  NeutronGovernanceHome,
} from '@dao-dao/stateful'
import { makeGetDaoStaticProps } from '@dao-dao/stateful/server'
import { ChainId, ContractVersion, DaoPageMode } from '@dao-dao/types'
import { SITE_URL, getDaoPath, getDisplayNameForChainId } from '@dao-dao/utils'

const DaoHomePage: NextPage<DaoPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <DaoPageWrapper {...props}>
    {props.serializedInfo?.coreVersion === ContractVersion.Gov ? (
      props.serializedInfo.chainId === ChainId.NeutronMainnet ? (
        <NeutronGovernanceHome />
      ) : (
        <ChainGovernanceDappHome />
      )
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
  getProps: async ({ chain, coreVersion, coreAddress }) => ({
    url: SITE_URL + getDaoPath(DaoPageMode.Dapp, coreAddress),
    followingTitle:
      coreVersion === ContractVersion.Gov ? 'Governance' : undefined,
    overrideDescription:
      coreVersion === ContractVersion.Gov
        ? `The native chain governance for ${getDisplayNameForChainId(
            chain.chain_id
          )}.`
        : undefined,
  }),
})
