import { useState } from 'react'
import { nextDraftProposalIdAtom } from 'atoms/proposals'
import Loader from 'components/Loader'
import { ProposalDraftSidebar } from 'components/ProposalDraftSidebar'
import type { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  useRecoilState,
  useRecoilTransaction_UNSTABLE,
  useRecoilValue,
} from 'recoil'
import { draftProposalsSelector } from 'selectors/proposals'
import {
  createDraftProposalTransaction,
  draftProposalKey,
} from '../../../../util/proposal'
import { useThemeContext } from 'contexts/theme'

function getEditorTheme(appTheme: string): string {
  return appTheme !== 'junoDark' ? 'black' : 'white'
}

const MultisigProposalCreate: NextPage = () => {
  const router: NextRouter = useRouter()
  const contractAddress = router.query.contractAddress as string
  const [nextDraftProposalId, setNextDraftProposalId] = useRecoilState<number>(
    nextDraftProposalIdAtom
  )
  const [proposalId, setProposalId] = useState<string>('')
  const draftProposals = useRecoilValue(draftProposalsSelector(contractAddress))
  const createDraftProposal = useRecoilTransaction_UNSTABLE(
    createDraftProposalTransaction(contractAddress, draftProposals)
  )
  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const themeContext = useThemeContext()
  const backgroundArrowColor = getEditorTheme(themeContext.theme)

  const collapsedArrowClass = isExpanded ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  )

  useEffect(() => {
    if (!proposalId) {
      const draftKey = draftProposalKey(nextDraftProposalId)
      const nextId = nextDraftProposalId + 1
      setNextDraftProposalId(nextId)
      setProposalId(draftKey)
    } else {
      router.replace(`/multisig/${contractAddress}/proposals/${proposalId}`)
    }
  }, [
    contractAddress,
    createDraftProposal,
    nextDraftProposalId,
    setNextDraftProposalId,
    proposalId,
    router,
  ])

  const sidebar = (
    <ProposalDraftSidebar
      contractAddress={contractAddress}
      proposalId={proposalId}
    />
  )

  return (
    <div className="grid grid-cols-6">
      <div className="w-full col-span-4 p-6">
        <Loader />
      </div>
      {isExpanded ? (
        <div className="col-span-2 p-6 bg-base-200 min-h-screen">
          <i
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              backgroundColor: backgroundArrowColor,
              margin: '-21px 0 0 -48px',
              padding: '10px 0 10px 0',
              borderRadius: '15px 0 0 15px',
              color: 'grey',
              cursor: 'pointer',
              fontSize: '25px',
              lineHeight: '1',
              position: 'absolute',
              top: '50%',
            }}
          >
            {collapsedArrowClass}
          </i>
          {sidebar}
        </div>
      ) : (
        <div className="flex items-center justify-end col-span-2">
          <i
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              backgroundColor: backgroundArrowColor,
              margin: '-21px 0 0 -48px',
              padding: '10px 0 10px 0',
              borderRadius: '15px 0 0 15px',
              color: 'grey',
              cursor: 'pointer',
              fontSize: '25px',
              lineHeight: '1',
              position: 'absolute',
              top: '50%',
            }}
          >
            {collapsedArrowClass}
          </i>
        </div>
      )}
    </div>
  )
}

export default MultisigProposalCreate
