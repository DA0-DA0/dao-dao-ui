import { PlusIcon } from '@heroicons/react/outline'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ProposalList, useDaoInfoContext } from '@dao-dao/common'
import { makeGetDaoStaticProps } from '@dao-dao/common/server'
import { matchAndLoadCommon } from '@dao-dao/proposal-module-adapter'

import {
  Button,
  Loader,
  Logo,
  PageWrapper,
  PageWrapperProps,
  PausedBanner,
  VoteHero,
} from '@/components'
import { DAO_ADDRESS } from '@/util'

const InnerVote = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const { coreAddress, proposalModules } = useDaoInfoContext()
  const proposalModuleInfos = useMemo(
    () =>
      proposalModules.map(
        (proposalModule) =>
          matchAndLoadCommon(proposalModule, {
            coreAddress,
            Loader,
            Logo,
          }).components.ProposalModuleInfo
      ),
    [coreAddress, proposalModules]
  )

  return (
    <div className="space-y-8">
      <VoteHero />

      <div className="flex flex-row justify-between items-center">
        <h3 className="title-text">{t('title.proposals')}</h3>

        <Button
          className="shrink-0"
          onClick={() => router.push('/propose')}
          size="sm"
          type="button"
        >
          {t('button.newProposal')} <PlusIcon className="w-[10px]" />
        </Button>
      </div>

      <div className="mt-4 mb-6 space-y-2">
        {proposalModuleInfos.map((ProposalModuleInfo, index) => (
          <ProposalModuleInfo key={index} />
        ))}
      </div>

      <PausedBanner />

      <ProposalList
        Loader={Loader}
        Logo={Logo}
        proposalCreateUrl="/propose"
        proposalUrlPrefix="/vote/"
      />
    </div>
  )
}

const VotePage: NextPage<PageWrapperProps> = ({ children: _, ...props }) => (
  <PageWrapper {...props}>
    <InnerVote />
  </PageWrapper>
)

export default VotePage

export const getStaticProps: GetStaticProps = makeGetDaoStaticProps({
  coreAddress: DAO_ADDRESS,
})
