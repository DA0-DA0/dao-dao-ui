import type { NextPage } from 'next'
import React from 'react'

import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { Loader, PageWrapper, PageWrapperProps } from '@/components'
import { makeGetStaticProps } from '@/server/makeGetStaticProps'
import { DEFAULT_IMAGE_URL } from '@/util'

const InnerMembershipPage = () => {
  const {
    ui: { SdaMembershipPage },
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

export const getStaticProps = makeGetStaticProps()
