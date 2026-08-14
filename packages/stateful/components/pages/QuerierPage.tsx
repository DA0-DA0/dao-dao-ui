// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { NextSeo } from 'next-seo'

import { PageLoader } from '@dao-dao/stateless'
import { SITE_URL } from '@dao-dao/utils'

import { Querier } from '../Querier'
import { SuspenseLoader } from '../SuspenseLoader'

export const QuerierPage = () => (
  <>
    <NextSeo
      description="Query any CosmWasm smart contract."
      openGraph={{
        url: SITE_URL + '/querier',
        title: 'Querier',
        description: 'Query any CosmWasm smart contract.',
      }}
      title="Querier"
    />

    <SuspenseLoader fallback={<PageLoader />}>
      <Querier />
    </SuspenseLoader>
  </>
)
