import {
  DocumentTextIcon,
  HeartIcon,
  PlusIcon,
  SparklesIcon,
} from '@heroicons/react/outline'
import { NextPage } from 'next'
import Link from 'next/link'
import { FC } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import i18n from '@dao-dao/i18n'
import { CwCoreSelectors, CwProposalSingleSelectors } from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
import {
  Button,
  LoadingScreen,
  ProposalLine,
  SuspenseLoader,
} from '@dao-dao/ui'

import { pinnedAddressesAtom } from '@/atoms'
import { FeaturedCard, PinnedDAOCard, SmallScreenNav } from '@/components'
import { featuredDaos } from '@/util'

const InnerStarred: FC = () => {
  const pinnedDaos = useRecoilValue(pinnedAddressesAtom)

  const pinnedDaosProposalModules = useRecoilValue(
    waitForAll(
      pinnedDaos.map((contractAddress) =>
        CwCoreSelectors.proposalModulesSelector({
          contractAddress,
          params: [{}],
        })
      )
    )
  )
    .map((modules, index) => ({
      coreAddress: pinnedDaos[index],
      proposalModuleAddress: modules?.[0],
    }))
    .filter(({ proposalModuleAddress }) => !!proposalModuleAddress) as {
    coreAddress: string
    proposalModuleAddress: string
  }[]

  const openProposals = useRecoilValue(
    waitForAll(
      pinnedDaosProposalModules.map(({ proposalModuleAddress }) =>
        CwProposalSingleSelectors.reverseProposalsSelector({
          contractAddress: proposalModuleAddress,
          params: [
            {
              limit: 10,
            },
          ],
        })
      )
    )
  )
    .flatMap(
      (response, responseIndex) =>
        response?.proposals.map((proposalResponse) => ({
          coreAddress: pinnedDaosProposalModules[responseIndex],
          response: proposalResponse,
        })) ?? []
    )
    .filter(({ response }) => response.proposal.status === Status.Open)
    .sort(
      (a, b) =>
        b.response.proposal.start_height - a.response.proposal.start_height
    )

  return (
    <>
      <SmallScreenNav />

      <div className="px-2 md:py-6 md:px-6">
        {openProposals.length > 0 && (
          <div className="mb-6">
            <h2 className="flex gap-4 justify-between items-center mb-4 primary-text">
              <div className="flex gap-1 items-center">
                <DocumentTextIcon className="inline w-4" />
                {i18n.t('Open proposals')}
              </div>
            </h2>
            <div className="flex flex-col gap-2 md:gap-1">
              {openProposals.map(({ coreAddress, response }) => (
                <ProposalLine
                  key={response.id}
                  proposalResponse={response}
                  proposalViewUrl={`/dao/${coreAddress}/proposals/${response.id}`}
                />
              ))}
            </div>
          </div>
        )}

        {pinnedDaos.length > 0 && (
          <div className="mb-6">
            <h2 className="flex gap-4 justify-between items-center mb-4 primary-text">
              <div className="flex gap-1 items-center">
                <HeartIcon className="inline w-4" />
                {i18n.t('Favorited')}
              </div>
              <Link href="/dao/create" passHref>
                <Button size="sm">
                  <PlusIcon className="w-4 h-4" /> {i18n.t('Create')}
                </Button>
              </Link>
            </h2>
            <div className="flex flex-wrap gap-4 justify-center max-w-6xl md:justify-start">
              {pinnedDaos.map((address) => (
                <PinnedDAOCard key={address} address={address} />
              ))}
            </div>
          </div>
        )}

        <h2 className="flex gap-4 justify-between items-center mb-4 primary-text">
          <div className="flex gap-1 items-center">
            <SparklesIcon className="inline w-4 " />
            {i18n.t('Featured')}
          </div>
          {/* Show create button here if no pinned DAOs. */}
          {pinnedDaos.length === 0 && (
            <Link href="/dao/create" passHref>
              <Button size="sm">
                <PlusIcon className="w-4 h-4" /> {i18n.t('Create')}
              </Button>
            </Link>
          )}
        </h2>
        <div className="flex flex-wrap gap-4 justify-center max-w-6xl md:justify-start">
          {featuredDaos.map((props) => (
            <FeaturedCard {...props} key={props.name} />
          ))}
        </div>
      </div>
    </>
  )
}

const StarredPage: NextPage = () => (
  <SuspenseLoader fallback={<LoadingScreen />}>
    <InnerStarred />
  </SuspenseLoader>
)

export default StarredPage
