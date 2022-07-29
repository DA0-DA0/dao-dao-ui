import { DocumentTextIcon } from '@heroicons/react/outline'
import groupBy from 'lodash.groupby'
import isEqual from 'lodash.isequal'
import { FC, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue, waitForAll } from 'recoil'

import { matchAndLoadCommon } from '@dao-dao/proposal-module-adapter'
import { cwCoreProposalModulesSelector } from '@dao-dao/state'
import {
  Loader,
  Logo,
  PinnedProposalLine,
  SuspenseLoader,
  TooltipIcon,
} from '@dao-dao/ui'

import { usePinnedDAOs } from '@/hooks'

export const PinnedProposalsList: FC = () => {
  const { t } = useTranslation()

  return (
    <SuspenseLoader
      fallback={
        <div>
          <div className="flex gap-1 items-center">
            <DocumentTextIcon className="inline w-4" />
            <p>{t('title.openProposals')}</p>
            <TooltipIcon label={t('info.openProposalsTooltip')} />
          </div>
          <Loader />
        </div>
      }
    >
      <InnerPinnedProposalsList />
    </SuspenseLoader>
  )
}

const InnerPinnedProposalsList: FC = () => {
  const { t } = useTranslation()
  const {
    pinnedAddresses: _pinnedAddresses,
    isProposalMarkedDone,
    getLatestPinnedProposalNumberMarkedDone,
    markPinnedProposalDone,
    cacheLatestProposalsMarkedDone,
    pinnedLatestProposalsMarkedDone,
  } = usePinnedDAOs()

  // Keep constant since we call hooks in a loop and need the exact same hooks
  // to run in the same order every render. When someone favorites/unfavorites a
  // DAO from their home page, this will change, so keep it constant for this
  // instance of its existence. We can just manually filter them out below anyway.
  const [initialPinnedAddresses] = useState(_pinnedAddresses)
  const pinnedProposalModules = useRecoilValue(
    waitForAll(
      initialPinnedAddresses.map((contractAddress) =>
        cwCoreProposalModulesSelector(contractAddress)
      )
    )
  )

  // Get hooks for all proposal modules to list proposals. Should stay constant.
  const useListAllProposalInfosHooks = useMemo(
    () =>
      pinnedProposalModules.flatMap((proposalModules, coreIndex) =>
        proposalModules.map((proposalModule) => ({
          useListAllProposalInfos: matchAndLoadCommon(proposalModule, {
            coreAddress: initialPinnedAddresses[coreIndex],
            Logo,
            Loader,
          }).hooks.useListAllProposalInfos,
          coreAddress: initialPinnedAddresses[coreIndex],
          coreIndex,
          proposalModule,
        }))
      ),
    [initialPinnedAddresses, pinnedProposalModules]
  )

  const allProposalInfos = useListAllProposalInfosHooks.map(
    ({ coreAddress, coreIndex, proposalModule, useListAllProposalInfos }) => {
      const startAfter = getLatestPinnedProposalNumberMarkedDone(
        coreAddress,
        proposalModule.address
      )

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const proposalInfos = useListAllProposalInfos(startAfter)

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const proposalInfosWithData = useMemo(
        () =>
          proposalInfos.map((info) => ({
            ...info,
            coreAddress,
            coreIndex,
            proposalModule,
          })),
        [proposalInfos, coreAddress, coreIndex, proposalModule]
      )

      return proposalInfosWithData
    }
  )

  // Filter proposals marked done or not open and sort descending by timestamp,
  // putting undefined timestamps at the bottom.
  const openProposalInfos = useMemo(
    () =>
      allProposalInfos
        .flat()
        .filter(
          ({
            coreAddress,
            proposalModule: { address },
            proposalNumber,
            isOpen,
          }) =>
            // Since we keep initialPinnedAddresses constant to preserve hook call
            // order, manually filter out proposals that are no longer pinned.
            _pinnedAddresses.includes(coreAddress) &&
            !isProposalMarkedDone(coreAddress, address, proposalNumber) &&
            isOpen
        )
        .sort((a, b) =>
          b.timestamp && a.timestamp
            ? b.timestamp.getTime() - a.timestamp.getTime()
            : !a.timestamp
            ? 1
            : !b.timestamp
            ? -1
            : 0
        ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...allProposalInfos, _pinnedAddresses, isProposalMarkedDone]
  )

  // Cache results so that we fetch fewer proposals next time, since some may no
  // longer be open for voting, and thus don't need to be fetched. Do this by
  // marking done the proposal ID per proposal module right before the earliest
  // proposal we fetched for each DAO. See the comment above the usePinnedDAOs
  // hook definition for more details.
  useEffect(() => {
    const openProposalInfosByCoreAddress = groupBy(
      openProposalInfos,
      ({ coreAddress }) => coreAddress
    )

    const updatedDoneProposals = Object.entries(
      openProposalInfosByCoreAddress
    ).reduce((acc, [coreAddress, infos]) => {
      const infosByProposalModuleAddress = groupBy(
        infos,
        ({ proposalModule: { address } }) => address
      )

      return {
        ...acc,
        [coreAddress]: Object.entries(infosByProposalModuleAddress).reduce(
          (coreAcc, [proposalModuleAddress, infos]) => ({
            ...coreAcc,
            // If proposals fetched, select the earliest done, which is right
            // before the first one.
            ...(infos.length
              ? {
                  [proposalModuleAddress]:
                    Math.min(
                      ...infos.map(({ proposalNumber }) => proposalNumber)
                    ) - 1,
                }
              : {}),
          }),
          {} as Record<string, number | undefined>
        ),
      }
    }, {} as Record<string, Record<string, number | undefined> | undefined>)

    // Update cached done if any are different.
    if (!isEqual(pinnedLatestProposalsMarkedDone, updatedDoneProposals)) {
      cacheLatestProposalsMarkedDone(updatedDoneProposals)
    }
  }, [
    cacheLatestProposalsMarkedDone,
    getLatestPinnedProposalNumberMarkedDone,
    openProposalInfos,
    pinnedLatestProposalsMarkedDone,
  ])

  return openProposalInfos.length > 0 ? (
    <div>
      <div className="flex gap-4 justify-between items-center mb-4 primary-text">
        <div className="flex gap-1 items-center">
          <DocumentTextIcon className="inline w-4" />
          <p>{t('title.openProposals')}</p>
          <TooltipIcon label={t('info.openProposalsTooltip')} />
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-1">
        {openProposalInfos.map(
          ({ coreAddress, coreIndex, proposalModule, proposalNumber, id }) => (
            <PinnedProposalLine
              key={id}
              coreAddress={coreAddress}
              markDone={() =>
                markPinnedProposalDone(
                  coreAddress,
                  proposalModule.address,
                  proposalNumber
                )
              }
              proposalId={id}
              proposalModules={pinnedProposalModules[coreIndex] ?? []}
              proposalViewUrl={`/dao/${coreAddress}/proposals/${id}`}
            />
          )
        )}
      </div>
    </div>
  ) : null
}
