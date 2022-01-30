import { Breadcrumbs } from 'components/Breadcrumbs'
import {
  ProposalDetails,
  ProposalDetailsSidebar,
} from 'components/ProposalDetails'
import { ProposalDraftSidebar } from 'components/ProposalDraftSidebar'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { daoSelector } from 'selectors/daos'
import { draftProposalSelector } from 'selectors/proposals'
import { ProposalData, ProposalForm } from '@components/ProposalForm'
import { cw20TokenInfo } from 'selectors/treasury'
import {
  cosmWasmSigningClient,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import toast from 'react-hot-toast'
import { defaultExecuteFee } from 'util/fee'
import { useState } from 'react'
import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { findAttribute } from '@cosmjs/stargate/build/logs'
import { cleanChainError } from 'util/cleanChainError'
import { MessageTemplate, messageTemplates } from 'templates/templateList'

const Proposal: NextPage = () => {
  const router = useRouter()
  const proposalKey = router.query.proposalId as string
  const contractAddress = router.query.contractAddress as string
  const sigInfo = useRecoilValue(daoSelector(contractAddress))
  const draftProposal = useRecoilValue(
    draftProposalSelector({ contractAddress, proposalId: proposalKey })
  )
  const tokenInfo = useRecoilValue(cw20TokenInfo(sigInfo.gov_token))

  const signingClient = useRecoilValue(cosmWasmSigningClient)
  const walletAddress = useRecoilValue(walletAddressSelector)

  const [proposalLoading, setProposalLoading] = useState(false)

  const onProposalSubmit = async (d: ProposalData) => {
    setProposalLoading(true)
    let cosmMsgs = d.messages.map((m: MessageTemplate) => {
      const toCosmosMsg = messageTemplates.find(
        (template) => template.label === m.label
      )?.toCosmosMsg

      // Unreachable.
      if (!toCosmosMsg) return {}

      return toCosmosMsg(m as any, {
        sigAddress: contractAddress,
        govAddress: sigInfo.gov_token,
        govDecimals: tokenInfo.decimals,
        multisig: false,
      })
    })

    if (sigInfo.config.proposal_deposit !== '0') {
      try {
        await signingClient?.execute(
          walletAddress,
          sigInfo.gov_token,
          {
            increase_allowance: {
              amount: sigInfo.config.proposal_deposit,
              spender: contractAddress,
            },
          },
          defaultExecuteFee
        )
      } catch (e: any) {
        toast.error(
          `failed to increase allowance to pay proposal deposit: (${cleanChainError(
            e.message
          )})`
        )
        return
      }
    }

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
        router.push(`/dao/${contractAddress}/proposals/${proposalId}`)
      })
      .finally(() => setProposalLoading(false))
  }

  let content
  let sidebar

  if (draftProposal || proposalKey.startsWith('draft:')) {
    content = (
      <ProposalForm
        onSubmit={onProposalSubmit}
        govTokenDenom={tokenInfo.symbol}
        loading={proposalLoading}
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
      />
    )
    sidebar = (
      <ProposalDetailsSidebar
        contractAddress={contractAddress}
        proposalId={Number(proposalKey)}
      />
    )
  }

  return (
    <div className="grid grid-cols-6">
      <div className="w-full col-span-4 p-6">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/dao/${contractAddress}`, sigInfo.config.name],
            [router.asPath, `Proposal ${proposalKey}`],
          ]}
        />
        {content}
      </div>
      <div className="col-span-2 p-6 bg-base-200 min-h-screen">{sidebar}</div>
    </div>
  )
}

export default Proposal
