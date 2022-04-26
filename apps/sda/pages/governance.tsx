import fs from 'fs'
import path from 'path'

import { PlusIcon } from '@heroicons/react/outline'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

import { Button } from '@dao-dao/ui'

import {
  HeroContent,
  Loader,
  makeGetStaticProps,
  PageWrapper,
  PageWrapperProps,
  SuspenseLoader,
  ProposalsContent,
  Hero,
  HeroContentLoader,
  DescriptionAndAirdropAllocation,
  ProposalsInfo,
  ProposalsInfoLoader,
} from '@/components'
interface InnerGovernanceProps {
  missionMarkdown: string
}

const InnerGovernance: FunctionComponent<InnerGovernanceProps> = ({
  missionMarkdown,
}) => {
  const router = useRouter()

  return (
    <section className="p-8 mx-auto space-y-8 max-w-page">
      <Hero>
        <SuspenseLoader fallback={<HeroContentLoader />}>
          <HeroContent />
        </SuspenseLoader>
      </Hero>

      <DescriptionAndAirdropAllocation missionMarkdown={missionMarkdown} />

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
    </section>
  )
}

type GovernancePageProps = PageWrapperProps & {
  innerProps: InnerGovernanceProps
}

const GovernancePage: NextPage<GovernancePageProps> = ({
  children: _,
  innerProps,
  ...props
}) => (
  <PageWrapper {...props}>
    <InnerGovernance {...innerProps} />
  </PageWrapper>
)

export default GovernancePage

export const getStaticProps: GetStaticProps<GovernancePageProps> = async (
  ...props
) => {
  const [staticProps, missionMarkdown] = await Promise.all([
    // Get normal props for DAO info.
    makeGetStaticProps()(...props),
    // Read contents of markdown file.
    fs.promises.readFile(path.join(process.cwd(), 'mission.md'), {
      encoding: 'utf8',
    }),
  ])

  if (!('props' in staticProps)) {
    return staticProps
  }

  return {
    ...staticProps,
    props: {
      ...staticProps.props,
      innerProps: {
        missionMarkdown,
      },
    },
  }
}
