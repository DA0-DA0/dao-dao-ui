import { PlusIcon } from '@heroicons/react/outline'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { Button, SuspenseLoader } from '@dao-dao/ui'

import {
  Loader,
  PageWrapper,
  PageWrapperProps,
  PausedBanner,
  ProposalsContent,
  ProposalsInfo,
  ProposalsInfoLoader,
  VoteHero,
  VoteHeroContent,
  VoteHeroContentLoader,
} from '@/components'
import { makeGetStaticProps } from '@/server/makeGetStaticProps'

const InnerVote: FunctionComponent = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="space-y-8">
      <VoteHero>
        <SuspenseLoader fallback={<VoteHeroContentLoader />}>
          <VoteHeroContent />
        </SuspenseLoader>
      </VoteHero>

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

      <div className="!mt-4 !mb-6">
        <SuspenseLoader fallback={<ProposalsInfoLoader />}>
          <ProposalsInfo />
        </SuspenseLoader>
      </div>
      <PausedBanner />

      <SuspenseLoader fallback={<Loader />}>
        <ProposalsContent />
      </SuspenseLoader>
    </div>
  )
}

const VotePage: NextPage<PageWrapperProps> = ({ children: _, ...props }) => (
  <PageWrapper {...props}>
    <InnerVote />
  </PageWrapper>
)

export default VotePage

export const getStaticProps: GetStaticProps = makeGetStaticProps()
