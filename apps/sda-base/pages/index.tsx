import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { ConnectWalletButton } from '@dao-dao/common'

import { PageWrapper, PageWrapperProps } from '@/components'
import { makeGetStaticProps } from '@/server/makeGetStaticProps'

const InnerHome = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      {/* eslint-disable-next-line i18next/no-literal-string */}
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
