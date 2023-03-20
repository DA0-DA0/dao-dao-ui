// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticProps } from 'next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { DiscordRedirect } from '@dao-dao/stateful'
import { DaoPageMode } from '@dao-dao/types'

const DiscordRedirectPage = () => (
  <DiscordRedirect overrideMode={DaoPageMode.Sda} />
)

export default DiscordRedirectPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
