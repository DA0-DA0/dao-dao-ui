import { DocumentTextIcon } from '@heroicons/react/outline'
import { FC, useEffect, useMemo } from 'react'
import { constSelector, useRecoilValue, waitForAll } from 'recoil'

import { useTranslation } from '@dao-dao/i18n'
import { CwCoreSelectors, CwProposalSingleSelectors } from '@dao-dao/state'
import { ConfigResponse } from '@dao-dao/state/clients/cw-core'
import {
  ProposalResponse,
  Status,
} from '@dao-dao/state/clients/cw-proposal-single'
import { OpenPinnedProposalLine, TooltipIcon } from '@dao-dao/ui'
import { expirationAtTimeToSecondsFromNow } from '@dao-dao/utils'

import { usePinnedDAOs } from '@/hooks'

export const PinnedProposalsList: FC = () => {
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

  return openProposalResponses.length > 0 ? (
    <div>
      <h2 className="flex gap-4 justify-between items-center mb-4 primary-text">
        <div className="flex gap-1 items-center">
          <DocumentTextIcon className="inline w-4" />
          {t('title.openProposals')}
          <TooltipIcon label={t('info.openProposalsTooltip')} />
        </div>
      </h2>
      <div className="flex flex-col gap-2 md:gap-1">
        {openProposalResponses.map(({ coreAddress, daoConfig, response }) => (
          <OpenPinnedProposalLine
            key={response.id}
            daoConfig={daoConfig}
            markDone={() => markPinnedProposalIdDone(coreAddress, response.id)}
            proposalResponse={response}
            proposalViewUrl={`/dao/${coreAddress}/proposals/${response.id}`}
          />
        ))}
      </div>
    </div>
  ) : null
}
