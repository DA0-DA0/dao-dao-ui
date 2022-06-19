import fs from 'fs'
import path from 'path'

import { PlusIcon } from '@heroicons/react/outline'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { Button, SuspenseLoader } from '@dao-dao/ui'
import { CI } from '@dao-dao/utils'

import {
  DescriptionAndAirdropAllocation,
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
  makeGetStaticProps,
} from '@/components'

interface InnerVoteProps {
  missionMarkdown: string
}

const InnerVote: FunctionComponent<InnerVoteProps> = ({ missionMarkdown }) => {
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
        <h3 className="title-text">{t('proposals')}</h3>

        <Button
          className="shrink-0"
          onClick={() => router.push('/propose')}
          size="sm"
          type="button"
        >
          {t('newProposal')} <PlusIcon className="w-[10px]" />
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

      <DescriptionAndAirdropAllocation missionMarkdown={missionMarkdown} />
    </div>
  )
}

type VotePageProps = PageWrapperProps & {
  innerProps: InnerVoteProps
}

const VotePage: NextPage<VotePageProps> = ({
  children: _,
  innerProps,
  ...props
}) => (
  <PageWrapper {...props}>
    <InnerVote {...innerProps} />
  </PageWrapper>
)

export default VotePage

export const getStaticProps: GetStaticProps<VotePageProps> = async (
  ...props
) => {
  // Don't query chain if running in CI.
  if (CI) {
    return { notFound: true }
  }

  const [staticProps, missionMarkdown] = await Promise.all([
    // Get normal props for DAO info.
    makeGetStaticProps()(...props),
    // Read contents of markdown file.
    fs.promises.readFile(path.join(process.cwd(), 'mission.md'), {
      encoding: 'utf8',
    }),
  ])

  return 'props' in staticProps
    ? {
        ...staticProps,
        props: {
          ...staticProps.props,
          innerProps: {
            missionMarkdown,
          },
        },
      }
    : staticProps
}
