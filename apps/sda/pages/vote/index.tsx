import fs from 'fs'
import path from 'path'

import { PlusIcon } from '@heroicons/react/outline'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

import { Button } from '@dao-dao/ui'

import {
  VoteHeroContent,
  Loader,
  makeGetStaticProps,
  PageWrapper,
  PageWrapperProps,
  SuspenseLoader,
  ProposalsContent,
  VoteHero,
  VoteHeroContentLoader,
  ProposalsInfo,
  ProposalsInfoLoader,
  DescriptionAndAirdropAllocation,
} from '@/components'
import { CI } from '@/util'

interface InnerVoteProps {
  missionMarkdown: string
}

const InnerVote: FunctionComponent<InnerVoteProps> = ({ missionMarkdown }) => {
  const router = useRouter()

  return (
    <div className="space-y-8">
      <VoteHero>
        <SuspenseLoader fallback={<VoteHeroContentLoader />}>
          <VoteHeroContent />
        </SuspenseLoader>
      </VoteHero>

      <div className="flex flex-row justify-between items-center">
        <h3 className="title-text">Proposals</h3>

        <Button
          className="shrink-0"
          onClick={() => router.push('/propose')}
          size="sm"
          type="button"
        >
          New proposal <PlusIcon className="w-[10px]" />
        </Button>
      </div>

      <div className="!mt-4 !mb-6">
        <SuspenseLoader fallback={<ProposalsInfoLoader />}>
          <ProposalsInfo />
        </SuspenseLoader>
      </div>

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
