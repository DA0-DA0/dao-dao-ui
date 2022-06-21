import {
  DocumentTextIcon,
  HeartIcon,
  PlusIcon,
  SparklesIcon,
} from '@heroicons/react/outline'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { FC, useEffect, useMemo } from 'react'
import { constSelector, useRecoilValue, waitForAll } from 'recoil'

import { useTranslation } from '@dao-dao/i18n'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
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

const InnerHome: FC = () => {
  const { t } = useTranslation()
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
  // See the comment above the usePinnedDAOs hooks for more details.
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

      <div className="px-4 md:py-6 md:px-6">
        {openProposalResponses.length > 0 && (
          <div className="mb-6">
            <h2 className="flex gap-4 justify-between items-center mb-4 primary-text">
              <div className="flex gap-1 items-center">
                <DocumentTextIcon className="inline w-4" />
                {t('openProposals')}
                <TooltipIcon label={t('openProposalsTooltip')} />
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
                {t('favorited')}
              </div>
              <Link href="/dao/create" passHref>
                <Button size="sm">
                  <PlusIcon className="w-4 h-4" /> {t('create')}
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
            {t('featured')}
          </div>
          {/* Show create button here if no pinned DAOs. */}
          {pinnedAddresses.length === 0 && (
            <Link href="/dao/create" passHref>
              <Button size="sm">
                <PlusIcon className="w-4 h-4" /> {t('create')}
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

const HomePage: NextPage = () => (
  <SuspenseLoader fallback={<LoadingScreen />}>
    <InnerHome />
  </SuspenseLoader>
)

export default HomePage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
