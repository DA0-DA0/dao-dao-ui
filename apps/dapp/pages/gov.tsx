// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { walletChainIdAtom } from '@dao-dao/state'
import { PageLoader } from '@dao-dao/stateless'
import { DaoPageMode } from '@dao-dao/types'
import {
  getConfiguredChainConfig,
  getConfiguredChains,
  getDaoPath,
} from '@dao-dao/utils'

// TODO(gov): add gov landing page
const GovRedirectPage: NextPage = () => {
  const chainId = useRecoilValue(walletChainIdAtom)

  const router = useRouter()
  useEffect(() => {
    router.push(
      getDaoPath(
        DaoPageMode.Dapp,
        getConfiguredChainConfig(chainId)?.name || getConfiguredChains()[0].name
      )
    )
  }, [chainId, router])

  return <PageLoader />
}

export default GovRedirectPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
