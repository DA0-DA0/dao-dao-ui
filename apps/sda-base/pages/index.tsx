import type { NextPage } from 'next'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ConnectWalletButton } from '@dao-dao/common'
import { makeGetDaoStaticProps } from '@dao-dao/common/server'

import { PageWrapper, PageWrapperProps } from '@/components'
import { DAO_ADDRESS } from '@/util'

const InnerHome = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <p className="text-xl">Welcome to the DAO!</p>

      <ConnectWalletButton />
    </div>
  )
}

const Home: NextPage<PageWrapperProps> = ({ children: _, ...props }) => (
  <PageWrapper {...props}>
    <InnerHome />
  </PageWrapper>
)

export default Home

export const getStaticProps = makeGetDaoStaticProps({
  coreAddress: DAO_ADDRESS,
})
