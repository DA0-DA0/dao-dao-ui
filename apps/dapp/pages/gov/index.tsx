// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state'
import { PageLoader } from '@dao-dao/stateless'
import {
  getConfiguredChainConfig,
  getConfiguredChains,
  getGovPath,
} from '@dao-dao/utils'

const GovRedirectPage: NextPage = () => {
  const chainId = useRecoilValue(walletChainIdAtom)

  const router = useRouter()
  useEffect(() => {
    router.push(
      getGovPath(
        getConfiguredChainConfig(chainId)?.name || getConfiguredChains()[0].name
      )
    )
  }, [chainId, router])

  return <PageLoader />
}

export default GovRedirectPage
