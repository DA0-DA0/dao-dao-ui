/* eslint-disable @next/next/no-img-element */

import { FunctionComponent } from 'react'

import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { constSelector, useRecoilValue } from 'recoil'

import fs from 'fs'
import path from 'path'

import {
  governanceModulesSelector,
  configSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw-governance'
import { listProposalsSelector } from '@dao-dao/state/recoil/selectors/clients/cw-proposal-single'
import { Button, MarkdownPreview } from '@dao-dao/ui'
import { humanReadableDuration } from '@dao-dao/utils'
import { convertThresholdDataToTQ } from '@dao-dao/utils/v1'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid'

import {
  Hero,
  Loader,
  makeGetStaticProps,
  PageWrapper,
  PageWrapperProps,
  ProposalItem,
  SuspenseLoader,
} from '@/components'
import {
  useGovernanceModule,
  useGovernanceTokenInfo,
  useStakingInfo,
} from '@/hooks'
import { DAO_ADDRESS } from '@/util'

const HeroContentLoader = () => (
  <>
    <Hero.Header image={<Loader size="6rem" />} />
    <Hero.Stats />
  </>
)

const HeroContent = () => {
  const daoConfig = useRecoilValue(
    configSelector({ contractAddress: DAO_ADDRESS })
  )
  const { governanceTokenContractAddress, governanceTokenInfo } =
    useGovernanceTokenInfo()
  const { stakingContractConfig, totalStaked } = useStakingInfo({
    fetchTotalStaked: true,
  })
  const { governanceModuleConfig } = useGovernanceModule()

  const { threshold } = governanceModuleConfig
    ? convertThresholdDataToTQ(governanceModuleConfig.threshold)
    : { threshold: undefined }

  if (
    !daoConfig ||
    !governanceTokenContractAddress ||
    !governanceTokenInfo ||
    !stakingContractConfig ||
    totalStaked === undefined ||
    !governanceModuleConfig ||
    !threshold
  )
    return null

  return (
    <>
      <Hero.Header
        description={daoConfig.description}
        image={
          <img
            alt="logo"
            className="w-full h-full"
            src={daoConfig.image_url ?? '/daotoken.jpg'}
          />
        }
        title={daoConfig.name}
      />
      <Hero.Stats
        data={{
          denom: governanceTokenInfo.name,
          totalSupply: Number(governanceTokenInfo.total_supply) * 1e6,
          stakedPercent:
            (totalStaked / Number(governanceTokenInfo.total_supply)) * 100,
          aprPercent: 103, // TODO: Fill in.
          unstakingDuration: stakingContractConfig.unstaking_duration
            ? humanReadableDuration(stakingContractConfig.unstaking_duration)
            : 'None',
          proposalDeposit:
            Number(governanceModuleConfig.deposit_info?.deposit ?? '0') * 1e6,
          depositRefund:
            governanceModuleConfig.deposit_info?.refund_failed_proposals ??
            false
              ? 'Yes'
              : 'No',
          passingThreshold: threshold.display,
        }}
      />
    </>
  )
}

const ProposalsContent = () => {
  const router = useRouter()

  const governanceModuleAddress = useRecoilValue(
    governanceModulesSelector({ contractAddress: DAO_ADDRESS, params: [{}] })
  )?.[0]
  const proposalResponses =
    useRecoilValue(
      governanceModuleAddress
        ? listProposalsSelector({
            contractAddress: governanceModuleAddress,
            params: [{}],
          })
        : constSelector(undefined)
    )?.proposals ?? []

  return (
    <>
      <div className="flex justify-between items-center">
        <Button type="button" variant="secondary">
          <ChevronDownIcon className="w-4 h-4" /> Open
        </Button>
        <Button
          onClick={() => router.push('/propose')}
          type="button"
          variant="secondary"
        >
          <PlusIcon className="w-4 h-4" /> New Proposal
        </Button>
      </div>

      <div className="space-y-1">
        {proposalResponses.map((response) => (
          <ProposalItem key={response.id} proposalResponse={response} />
        ))}
      </div>
    </>
  )
}

interface InnerGovernanceProps {
  missionMarkdown: string
}

const InnerGovernance: FunctionComponent<InnerGovernanceProps> = ({
  missionMarkdown,
}) => (
  <section className="p-8 mx-auto space-y-8 max-w-screen-xl">
    <Hero>
      <Hero.Overlay imageUrl="/daotoken.jpg" />
      <SuspenseLoader fallback={<HeroContentLoader />}>
        <HeroContent />
      </SuspenseLoader>
    </Hero>

    <div className="p-8 max-w-none bg-disabled rounded-lg">
      <MarkdownPreview
        className="max-w-full text-base"
        markdown={missionMarkdown}
      />
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-medium">Proposals</h3>

      <SuspenseLoader fallback={<Loader />}>
        <ProposalsContent />
      </SuspenseLoader>
    </div>
  </section>
)

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
