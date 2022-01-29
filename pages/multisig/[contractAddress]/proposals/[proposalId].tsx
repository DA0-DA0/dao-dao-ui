import { errorAtom, loadingAtom } from 'atoms/status'
import { Breadcrumbs } from 'components/Breadcrumbs'
import {
  ProposalDetails,
  ProposalDetailsSidebar,
} from 'components/ProposalDetails'
import { ProposalDraftSidebar } from 'components/ProposalDraftSidebar'
import toast from 'react-hot-toast'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { sigSelector } from 'selectors/multisigs'
import { draftProposalSelector } from 'selectors/proposals'
import {
  cosmWasmSigningClient,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import { ProposalData, ProposalForm } from '@components/ProposalForm'
import { useState } from 'react'
import { Message } from '@components/ProposalTemplates'
import { defaultExecuteFee } from 'util/fee'
import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { findAttribute } from '@cosmjs/stargate/build/logs'
import { cleanChainError } from 'util/cleanChainError'

const MultisigProposal: NextPage = () => {
  const router = useRouter()
  const proposalKey = router.query.proposalId as string
  const contractAddress = router.query.contractAddress as string
  const sigInfo = useRecoilValue(sigSelector(contractAddress))
  const draftProposal = useRecoilValue(
    draftProposalSelector({ contractAddress, proposalId: proposalKey })
  )
  const signingClient = useRecoilValue(cosmWasmSigningClient)
  const walletAddress = useRecoilValue(walletAddressSelector)

  const [proposalLoading, setProposalLoading] = useState(false)

  const onProposalSubmit = async (d: ProposalData) => {
    setProposalLoading(true)
    let cosmMsgs = d.messages.map((m: Message) =>
      m.toCosmosMsg(m, {
        sigAddress: contractAddress,
        govAddress: '',
        govDecimals: 0,
        multisig: true,
      })
    )

    await signingClient
      ?.execute(
        walletAddress,
        contractAddress,
        {
          propose: {
            title: d.title,
            description: d.description,
            msgs: cosmMsgs,
          },
        },
        defaultExecuteFee
      )
      .catch((e) => {
        toast.error(cleanChainError(e.message))
      })
      .then((response: void | ExecuteResult) => {
        if (!response) {
          return
        }
        const proposalId = findAttribute(
          response.logs,
          'wasm',
          'proposal_id'
        ).value
        router.push(`/multisig/${contractAddress}/proposals/${proposalId}`)
      })
      .finally(() => setProposalLoading(false))
  }

  let content
  let sidebar

  if (draftProposal || proposalKey.startsWith('draft:')) {
    content = (
      <ProposalForm
        onSubmit={onProposalSubmit}
        loading={proposalLoading}
        multisig
      />
    )
    sidebar = (
      <ProposalDraftSidebar
        contractAddress={contractAddress}
        proposalId={proposalKey}
      />
    )
  } else {
    content = (
      <ProposalDetails
        contractAddress={contractAddress}
        proposalId={Number(proposalKey)}
        multisig
      />
    )
    sidebar = (
      <ProposalDetailsSidebar
        contractAddress={contractAddress}
        proposalId={Number(proposalKey)}
        multisig
      />
    )
  }

  return (
    <div className="grid grid-cols-6">
      <div className="w-full col-span-4 p-6">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/multisig/${contractAddress}`, sigInfo.config.name],
            [router.asPath, `Proposal ${proposalKey}`],
          ]}
        />
        {content}
      </div>
      <div className="col-span-2 p-6 bg-base-200 min-h-screen">{sidebar}</div>
    </div>
  )
}

export default MultisigProposal
