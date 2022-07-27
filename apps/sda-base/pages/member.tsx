import type { NextPage } from 'next'
import React from 'react'

import { makeGetDaoStaticProps } from '@dao-dao/common/server'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { Loader, PageWrapper, PageWrapperProps } from '@/components'
import { DAO_ADDRESS, DEFAULT_IMAGE_URL } from '@/util'

const InnerMembershipPage = () => {
  const {
    components: { SdaMembershipPage },
  } = useVotingModuleAdapter()

  return (
    <SdaMembershipPage Loader={Loader} defaultImageUrl={DEFAULT_IMAGE_URL} />
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

export const getStaticProps = makeGetDaoStaticProps({
  coreAddress: DAO_ADDRESS,
})
