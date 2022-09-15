// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'react-i18next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'

const CreateDAOPage: NextPage = () => {
  const { t } = useTranslation()
  return null
}

export default CreateDAOPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
