// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticPaths, GetStaticProps } from 'next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { Home } from '@dao-dao/stateful'
import { getSupportedChains } from '@dao-dao/utils'

export default Home

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})

export const getStaticPaths: GetStaticPaths = () => ({
  paths: getSupportedChains().map(({ name }) => ({
    params: {
      chain: name,
    },
  })),
  fallback: false,
})
