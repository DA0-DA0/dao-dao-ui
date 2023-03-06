// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticPaths, GetStaticProps } from 'next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { Me } from '@dao-dao/stateful'
import { MeTabId } from '@dao-dao/types'

// This is the dynamic Me page that allows specifying a tab. It can be accessed
// via `/me/[tab]`.
export default Me

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})

export const getStaticPaths: GetStaticPaths = () => ({
  paths: Object.values(MeTabId).map((tab) => ({
    params: {
      tab,
    },
  })),
  fallback: false,
})
