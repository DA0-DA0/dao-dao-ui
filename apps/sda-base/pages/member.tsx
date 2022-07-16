import type { NextPage } from 'next'
import React from 'react'

import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter/react'

import { Loader, PageWrapper, PageWrapperProps } from '@/components'
import { makeGetStaticProps } from '@/server/makeGetStaticProps'
import { DAO_ADDRESS, DEFAULT_IMAGE_URL } from '@/util'

const InnerMembershipPage = () => {
  const {
    ui: { SdaMembershipPage },
  } = useVotingModuleAdapter()

  return (
    <SdaMembershipPage
      Loader={Loader}
      coreAddress={DAO_ADDRESS}
      defaultImageUrl={DEFAULT_IMAGE_URL}
    />
  )
}

const MembershipPage: NextPage<PageWrapperProps> = ({
  children: _,
  ...props
}) => (
  <PageWrapper {...props}>
    <InnerMembershipPage />
  </PageWrapper>
)

export default MembershipPage

export const getStaticProps = makeGetStaticProps()
