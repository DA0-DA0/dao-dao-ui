import type { NextPage } from 'next'
import React from 'react'

import { ConnectWalletButton } from '@dao-dao/common'
import { useTranslation } from '@dao-dao/i18n'

import { PageWrapper, PageWrapperProps } from '@/components'
import { makeGetStaticProps } from '@/server/makeGetStaticProps'

const InnerHome = () => {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <p className="text-xl">Welcome to the DAO!</p>

      <ConnectWalletButton className="!w-auto" />
    </div>
  )
}

const Home: NextPage<PageWrapperProps> = ({ children: _, ...props }) => (
  <PageWrapper {...props}>
    <InnerHome />
  </PageWrapper>
)

export default Home

export const getStaticProps = makeGetStaticProps()
