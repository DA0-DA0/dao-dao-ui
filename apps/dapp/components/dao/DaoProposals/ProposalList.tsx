import { DownloadIcon } from '@heroicons/react/outline'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil'

import {
  CwProposalSingleSelectors,
  refreshProposalsIdAtom,
  useProposalModule,
} from '@dao-dao/state'
import { Button, ProposalLine, SuspenseLoader } from '@dao-dao/ui'

import { proposalListCountAtom, proposalStartBeforesAtom } from '@/atoms'

import { useDAOInfoContext } from '../../DAOPageWrapper'
import { EmptyContractCard } from '../../EmptyContractCard'
import { Loader } from '../../Loader'

const PROP_LOAD_LIMIT = 10

interface SingleProposalListProps {
  listIndex: number
}

const SingleProposalList: FC<SingleProposalListProps> = ({ listIndex }) => {
  const { coreAddress } = useDAOInfoContext()
  const { proposalModuleAddress } = useProposalModule(coreAddress)
  if (!proposalModuleAddress) {
    throw new Error('No proposal module found.')
  }

  const [startBefores, setStartBefores] = useRecoilState(
    proposalStartBeforesAtom
  )

  const proposalResponses = useRecoilValue(
    listIndex - 1 in startBefores
      ? CwProposalSingleSelectors.reverseProposalsSelector({
          contractAddress: proposalModuleAddress,
          params: [
            {
              startBefore: startBefores[listIndex - 1],
              limit: PROP_LOAD_LIMIT,
            },
          ],
        })
      : constSelector(undefined)
  )?.proposals

  // Once proposals are loaded, store last proposal ID for next load query.
  useEffect(() => {
    if (proposalResponses?.length) {
      setStartBefores((prev) => ({
        ...prev,
        [listIndex]: proposalResponses[proposalResponses.length - 1].id,
      }))
    }
  }, [proposalResponses, setStartBefores, listIndex])

  return (
    <>
      {proposalResponses?.map((response) => (
        <ProposalLine
          key={response.id}
          proposalResponse={response}
          proposalViewUrl={`/dao/${coreAddress}/proposals/${response.id}`}
        />
      ))}
    </>
  )
}

export const ProposalList: FC = () => {
  const { t } = useTranslation()
  const { coreAddress } = useDAOInfoContext()
  const { proposalModuleAddress, proposalCount } = useProposalModule(
    coreAddress,
    { fetchProposalCount: true }
  )

  if (!proposalModuleAddress) {
    throw new Error(t('error.noProposalModule'))
  }

  // Load from Recoil so that loaded propoals are shared by
  // desktop and mobile views.
  const startBefores = useRecoilValue(proposalStartBeforesAtom)
  const [listCount, setListCount] = useRecoilState(proposalListCountAtom)

  // If all proposals are refreshed, reset startBefores since the pages
  // proposals display on might have switched. startBefores stores the
  // last proposal ID on each page, so this must be reset.
  const refreshProposalsId = useRecoilValue(refreshProposalsIdAtom)
  const resetStartBefores = useResetRecoilState(proposalStartBeforesAtom)
  useEffect(() => {
    resetStartBefores()
  }, [refreshProposalsId, resetStartBefores])

  if (!proposalCount) {
    return (
      <div className="flex">
        <EmptyContractCard
          backgroundUrl="/empty-state-proposal.jpeg"
          description={t('info.firstProposalPrompt')}
          fullWidth
          href={`/dao/${coreAddress}/proposals/create`}
          title={t('title.createAProposal')}
        />
      </div>
    )
  }

  // Only allow loading more once proposal ID has been set from previous
  // list; should take 1 extra render after proposals load.
  // There is more to load if we haven't yet hit proposal ID 1.
  const showLoadMore = (startBefores[listCount - 1] ?? 0) > 1

  return (
    <>
      <div className="flex flex-col gap-2 md:gap-1">
        {[...Array(listCount)].map((_, idx) => (
          <SuspenseLoader key={idx} fallback={<Loader className="mt-2" />}>
            <SingleProposalList listIndex={idx} />
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
