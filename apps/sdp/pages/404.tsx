// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import type { GetStaticProps } from 'next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { ErrorPage404 } from '@dao-dao/stateless'

export default ErrorPage404

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
