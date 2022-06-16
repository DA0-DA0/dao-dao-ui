import {
  DocumentTextIcon,
  HeartIcon,
  PlusIcon,
  SparklesIcon,
} from '@heroicons/react/outline'
import { NextPage } from 'next'
import Link from 'next/link'
import { FC, useEffect, useMemo } from 'react'
import { constSelector, useRecoilValue, waitForAll } from 'recoil'

import i18n from '@dao-dao/i18n'
import { CwCoreSelectors, CwProposalSingleSelectors } from '@dao-dao/state'
import { ConfigResponse } from '@dao-dao/state/clients/cw-core'
import {
  ProposalResponse,
  Status,
} from '@dao-dao/state/clients/cw-proposal-single'
import {
  Button,
  LoadingScreen,
  OpenPinnedProposalLine,
  SuspenseLoader,
  TooltipIcon,
} from '@dao-dao/ui'
import { expirationAtTimeToSecondsFromNow } from '@dao-dao/utils'

import { FeaturedCard, PinnedDAOCard, SmallScreenNav } from '@/components'
import { usePinnedDAOs } from '@/hooks'
import { featuredDaos } from '@/util'

const InnerStarred: FC = () => {
  const {
    pinnedAddresses,
    isProposalIdMarkedDone,
    getLatestPinnedProposalIdMarkedDone,
    markPinnedProposalIdDone,
    cacheLatestProposalIDsMarkedDone,
  } = usePinnedDAOs()

  const pinnedDAOConfigs = useRecoilValue(
    waitForAll(
      pinnedAddresses.map((contractAddress) =>
        CwCoreSelectors.configSelector({ contractAddress })
      )
    )
  )
  const pinnedProposalModuleAddresses = useRecoilValue(
    waitForAll(
      pinnedAddresses.map((contractAddress) =>
        CwCoreSelectors.proposalModulesSelector({
          contractAddress,
          params: [{}],
        })
      )
    )
  ).map((addresses) => addresses?.[0])
  const pinnedDAOProposals = useRecoilValue(
    waitForAll(
      pinnedProposalModuleAddresses.map((contractAddress, index) =>
        contractAddress
          ? CwProposalSingleSelectors.listAllProposalsSelector({
              contractAddress,
              params: [
                {
                  startAfter: getLatestPinnedProposalIdMarkedDone(
                    pinnedAddresses[index]
                  ),
                },
              ],
            })
          : constSelector(undefined)
      )
    )
  )
  // Combine into a single array.
  const { pinned, openProposalResponses } = useMemo(() => {
    const pinned = pinnedAddresses
      .map((coreAddress, index) => ({
        coreAddress,
        config: pinnedDAOConfigs[index],
        proposalModuleAddress: pinnedProposalModuleAddresses[index],
        proposalResponses: pinnedDAOProposals[index]?.proposals,
      }))
      .filter(
        ({ config, proposalModuleAddress, proposalResponses }) =>
          !!config && !!proposalModuleAddress && !!proposalResponses
      ) as {
      coreAddress: string
      config: ConfigResponse
      proposalModuleAddress: string
      proposalResponses: ProposalResponse[]
    }[]

    const openProposalResponses = pinned
      .flatMap(
        ({ coreAddress, config, proposalResponses }) =>
          proposalResponses.map((response) => ({
            coreAddress,
            daoConfig: config,
            response,
          })) ?? []
      )
      .filter(
        ({ coreAddress, response }) =>
          !isProposalIdMarkedDone(coreAddress, response.id) &&
          response.proposal.status === Status.Open
      )
      .sort(
        (a, b) =>
          (expirationAtTimeToSecondsFromNow(b.response.proposal.expiration) ??
            0) -
          (expirationAtTimeToSecondsFromNow(a.response.proposal.expiration) ??
            0)
      )

    return { pinned, openProposalResponses }
  }, [
    isProposalIdMarkedDone,
    pinnedAddresses,
    pinnedDAOConfigs,
    pinnedDAOProposals,
    pinnedProposalModuleAddresses,
  ])

  // Cache results so that we fetch fewer proposals next time, since some
  // may no longer be open for voting, and thus don't need to be fetched.
  // Do this by marking done the proposal ID right before the earliest
  // proposal we fetched for each DAO.
  useEffect(() => {
    const updatedDoneProposalIDs = pinned.reduce((acc, { coreAddress }) => {
      const openProposalIDs = openProposalResponses
        .filter(({ coreAddress: a }) => coreAddress === a)
        .map(({ response }) => response.id)
      const latestIdMarkedDone =
        getLatestPinnedProposalIdMarkedDone(coreAddress)

      return {
        ...acc,
        // Only try to update the ID if something is already marked done.
        ...(openProposalIDs.length || latestIdMarkedDone !== undefined
          ? {
              [coreAddress]: openProposalIDs.length
                ? // If proposals fetched, select the earliest done
                  // proposal ID, which is right before the first one.
                  Math.min(...openProposalIDs) - 1
                : latestIdMarkedDone,
            }
          : {}),
      }
    }, {} as Record<string, number | undefined>)

    // Update cached done if any are different.
    if (
      Object.entries(updatedDoneProposalIDs).some(
        ([coreAddress, proposalId]) =>
          proposalId !== getLatestPinnedProposalIdMarkedDone(coreAddress)
      )
    ) {
      cacheLatestProposalIDsMarkedDone(updatedDoneProposalIDs)
    }
  }, [
    cacheLatestProposalIDsMarkedDone,
    getLatestPinnedProposalIdMarkedDone,
    openProposalResponses,
    pinned,
  ])

  return (
    <>
      <SmallScreenNav />

      <div className="px-2 md:py-6 md:px-6">
        {openProposalResponses.length > 0 && (
          <div className="mb-6">
            <h2 className="flex gap-4 justify-between items-center mb-4 primary-text">
              <div className="flex gap-1 items-center">
                <DocumentTextIcon className="inline w-4" />
                {i18n.t('Open proposals')}
                <TooltipIcon label="These are open proposals you have not yet voted on for your favorited DAOs shown below." />
              </div>
            </h2>
            <div className="flex flex-col gap-2 md:gap-1">
              {openProposalResponses.map(
                ({ coreAddress, daoConfig, response }) => (
                  <OpenPinnedProposalLine
                    key={response.id}
                    daoConfig={daoConfig}
                    markDone={() =>
                      markPinnedProposalIdDone(coreAddress, response.id)
                    }
                    proposalResponse={response}
                    proposalViewUrl={`/dao/${coreAddress}/proposals/${response.id}`}
                  />
                )
              )}
            </div>
          </div>
        )}

        {pinnedAddresses.length > 0 && (
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
              {pinnedAddresses.map((address) => (
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
          {pinnedAddresses.length === 0 && (
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
