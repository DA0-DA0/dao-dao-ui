// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import {
  ChainGovernanceHome,
  GovPageWrapper,
  GovPageWrapperProps,
  NeutronGovernanceHome,
} from '@dao-dao/stateful'
import { makeGetGovStaticProps } from '@dao-dao/stateful/server'
import { ChainId } from '@dao-dao/types'
import { SITE_URL, getDisplayNameForChainId, getGovPath } from '@dao-dao/utils'

const GovHomePage: NextPage<GovPageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <GovPageWrapper {...props}>
    {props.serializedInfo?.chainId === ChainId.NeutronMainnet ? (
      <NeutronGovernanceHome />
    ) : (
      <ChainGovernanceHome />
    )}
  </GovPageWrapper>
)

export default GovHomePage

// Fallback to loading screen if page has not yet been statically generated.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps = makeGetGovStaticProps({
  getProps: async ({ chain, chainName }) => ({
    url: SITE_URL + getGovPath(chainName),
    followingTitle: `${getDisplayNameForChainId(chain.chain_id)} Governance`,
    overrideDescription: `The native chain governance for ${getDisplayNameForChainId(
      chain.chain_id
    )}.`,
  }),
})
