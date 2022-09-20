import { DownloadIcon } from '@heroicons/react/outline'
import { ComponentType, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import { matchAndLoadCommon } from '@dao-dao/proposal-module-adapter'
import {
  proposalListCountAtom,
  proposalStartBeforesAtom,
  refreshProposalsIdAtom,
} from '@dao-dao/state'
import {
  Button,
  Loader as DefaultLoader,
  Logo as DefaultLogo,
  ImagePromptCard,
  LoaderProps,
  LogoProps,
  ProposalLine,
} from '@dao-dao/ui'

import { useDaoInfoContext } from './DaoPageWrapper'
import { SuspenseLoader } from './SuspenseLoader'

// Contracts enforce a max of 30, though this is on the edge for DAOs with
// proposals that have a large size.
const PROP_LOAD_LIMIT = 20

export interface ProposalListProps {
  proposalCreateUrl: string
  proposalUrlPrefix: string
  Logo?: ComponentType<LogoProps>
  Loader?: ComponentType<LoaderProps>
}

export const ProposalList = (props: ProposalListProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()
  const { Loader = DefaultLoader } = props

  // Load from Recoil so that loaded propoals are shared by desktop and mobile
  // views.
  const startBefores = useRecoilValue(proposalStartBeforesAtom(coreAddress))
  const [listCount, setListCount] = useRecoilState(
    proposalListCountAtom(coreAddress)
  )
  // Set listCount back to 1 on render, so the list count doesn't persist across
  // different DAO pages.
  useEffect(() => {
    setListCount(1)
  }, [setListCount])

  // If all proposals are refreshed, reset startBefores since the pages
  // proposals display on might have switched. startBefores stores the last
  // proposal ID on each page, so this must be reset.
  const refreshProposalsId = useRecoilValue(refreshProposalsIdAtom)
  const resetStartBefores = useResetRecoilState(
    proposalStartBeforesAtom(coreAddress)
  )
  useEffect(() => {
    resetStartBefores()
  }, [refreshProposalsId, resetStartBefores])

  // Only allow loading more once proposal ID has been set from previous list;
  // should take 1 extra render after proposals load. There is more to load if
  // we haven't yet hit proposal ID 1 for all proposal modules.
  const showLoadMore = Object.values(startBefores[listCount - 1] ?? {}).some(
    (startBefore) => (startBefore ?? 0) > 1
  )

  return (
    <>
      <div className="flex flex-col gap-2 md:gap-1">
        {[...Array(listCount)].map((_, idx) => (
          <SuspenseLoader key={idx} fallback={<Loader className="mt-2" />}>
            <SingleProposalList listIndex={idx} {...props} />
          </SuspenseLoader>
        ))}
      </div>

      {showLoadMore && (
        <Button
          className="mt-3 font-mono border border-inactive"
          onClick={() => setListCount((c) => c + 1)}
          size="sm"
          variant="secondary"
        >
          {t('button.loadMore')}{' '}
          <DownloadIcon className="inline ml-1 w-5 h-5" />
        </Button>
      )}
    </>
  )
}

interface SingleProposalListProps extends ProposalListProps {
  listIndex: number
}

const SingleProposalList = ({
  proposalCreateUrl,
  proposalUrlPrefix,
  Logo = DefaultLogo,
  Loader = DefaultLoader,
  listIndex,
}: SingleProposalListProps) => {
  const { t } = useTranslation()
  const { coreAddress, proposalModules } = useDaoInfoContext()

  const [startBefores, setStartBefores] = useRecoilState(
    proposalStartBeforesAtom(coreAddress)
  )

  // Get hooks for all proposal modules to list proposals. Should stay constant.
  const useReverseProposalInfosHooks = useMemo(
    () =>
      proposalModules.map((proposalModule) => ({
        useReverseProposalInfos: matchAndLoadCommon(proposalModule, {
          coreAddress,
          Logo,
          Loader,
        }).hooks.useReverseProposalInfos,
        proposalModule,
      })),
    [Loader, Logo, coreAddress, proposalModules]
  )

  // Hooks always called in the same order, so this is safe. But damn are we
  // pushing it.
  const proposalListInfos = useReverseProposalInfosHooks.map(
    ({ proposalModule, useReverseProposalInfos }) => {
      const startBefore = startBefores[listIndex - 1]?.[proposalModule.address]

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const reverseProposalInfos = useReverseProposalInfos(
        startBefore,
        PROP_LOAD_LIMIT
      )

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const reverseProposalInfosWithProposalModules = useMemo(
        () =>
          reverseProposalInfos.map((info) => ({
            ...info,
            proposalModule,
          })),
        [proposalModule, reverseProposalInfos]
      )

      return reverseProposalInfosWithProposalModules
    }
  )

  // Sort descending by timestamp, putting undefined timestamps at the bottom.
  const proposalListInfosToDisplay = useMemo(
    () =>
      proposalListInfos
        .flat()
        .sort((a, b) =>
          b.timestamp && a.timestamp
            ? b.timestamp.getTime() - a.timestamp.getTime()
            : !a.timestamp
            ? 1
            : !b.timestamp
            ? -1
            : 0
        )
        // We can only guarantee that the first PROP_LOAD_LIMIT proposals in
        // this list of proposals combined from all proposal modules are in
        // order, since we loaded the most recent PROP_LOAD_LIMIT proposals from
        // each module, and then sorted all of them against each other. If we
        // display all proposals returned (e.g. 10 from A, 10 from B, etc.),
        // it's possible we'll include proposals from module B that are
        // temporally after not-yet-loaded proposals from module A. In other
        // words, if A has 12 proposals, B has 5 proposals, all of A's proposals
        // are more recent than B's, and we load the first 10 from both, we
        // cannot show the first 10 from A followed by all 5 from B, because we
        // do not yet know if A has another page of 10 that are before B's 5.
        // Thus, we ask all modules for 10, and only show the most recent 10,
        // until the next list loads the remaining 2 from A followed by the 5
        // from B (since A is out of proposals). In summary, we must display at
        // most the number of proposals that we ask for from each module to
        // preserve the relative timestamps across all modules.
        .slice(0, PROP_LOAD_LIMIT),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...proposalListInfos]
  )

  // Once proposals are loaded, store last proposal ID for next load query.
  useEffect(() => {
    if (proposalListInfosToDisplay.length) {
      setStartBefores((prev) => ({
        ...prev,
        [listIndex]: proposalModules.reduce(
          (acc, proposalModule) => ({
            ...acc,
            [proposalModule.address]:
              proposalListInfosToDisplay
                .filter((info) => info.proposalModule === proposalModule)
                .slice(-1)[0]?.proposalNumber ??
              // If no proposal from this proposal module shows up in the
              // proposals we are listing here, use the startBefore from the
              // previous list.
              prev[listIndex - 1]?.[proposalModule.address],
          }),
          {} as Record<string, number | undefined>
        ),
      }))
    }
  }, [setStartBefores, listIndex, proposalModules, proposalListInfosToDisplay])

  // If found no proposals
  if (listIndex === 0 && !proposalListInfosToDisplay.length) {
    return (
      <div className="flex">
        <ImagePromptCard
          backgroundUrl="/empty-state-proposal.jpeg"
          description={t('info.firstProposalPrompt')}
          fullWidth
          href={proposalCreateUrl}
          title={t('title.createAProposal')}
        />
      </div>
    )
  }

  return (
    <>
      {proposalListInfosToDisplay.map(({ id }) => (
        <ProposalLine
          key={id}
          Loader={Loader}
          Logo={Logo}
          coreAddress={coreAddress}
          proposalId={id}
          proposalModules={proposalModules}
          proposalViewUrl={proposalUrlPrefix + id}
        />
      ))}
    </>
  )
}
