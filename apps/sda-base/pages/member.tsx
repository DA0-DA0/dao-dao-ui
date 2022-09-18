import type { NextPage } from 'next'
import React, { useMemo } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import { useDaoInfoContext } from '@dao-dao/common'
import { makeGetDaoStaticProps } from '@dao-dao/common/server'
import { matchAndLoadCommon } from '@dao-dao/proposal-module-adapter'
import { CheckedDepositInfo } from '@dao-dao/state/clients/cw-proposal-single'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { Loader, Logo, PageWrapper, PageWrapperProps } from '@/components'
import { DAO_ADDRESS, DEFAULT_IMAGE_URL } from '@/util'

const InnerMembershipPage = () => {
  const {
    components: { SdaMembershipPage },
  } = useVotingModuleAdapter()

  const { coreAddress, proposalModules } = useDaoInfoContext()
  const depositInfoSelectors = useMemo(
    () =>
      proposalModules.map(
        (proposalModule) =>
          matchAndLoadCommon(proposalModule, {
            coreAddress,
            Loader,
            Logo,
          }).selectors.depositInfo
      ),
    [coreAddress, proposalModules]
  )
  const proposalModuleDepositInfos = useRecoilValue(
    waitForAll(depositInfoSelectors)
  ).filter(Boolean) as CheckedDepositInfo[]

  return (
    <SdaMembershipPage
      Loader={Loader}
      defaultImageUrl={DEFAULT_IMAGE_URL}
      proposalModuleDepositInfos={proposalModuleDepositInfos}
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

export const getStaticProps = makeGetDaoStaticProps({
  coreAddress: DAO_ADDRESS,
})
