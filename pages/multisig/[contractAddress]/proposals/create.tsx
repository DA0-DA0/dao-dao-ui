import toast from 'react-hot-toast'
import { ProposalData, ProposalForm } from '@components/ProposalForm'
import type { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { sigSelector } from 'selectors/multisigs'
import {
  cosmWasmSigningClient,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import { MessageTemplate, messageTemplates } from 'templates/templateList'
import { defaultExecuteFee } from 'util/fee'
import { cleanChainError } from 'util/cleanChainError'
import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { findAttribute } from '@cosmjs/stargate/build/logs'
import { Breadcrumbs } from '@components/Breadcrumbs'
import { sidebarExpandedAtom } from 'atoms/sidebar'
import { Sidebar } from 'components/Sidebar'

const MultisigProposalCreate: NextPage = () => {
  const router: NextRouter = useRouter()
  const contractAddress = router.query.contractAddress as string

  const sigInfo = useRecoilValue(sigSelector(contractAddress))
  const signingClient = useRecoilValue(cosmWasmSigningClient)
  const walletAddress = useRecoilValue(walletAddressSelector)

  const expanded = useRecoilValue(sidebarExpandedAtom)

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
        govAddress: '',
        govDecimals: 0,
        multisig: true,
      })
    })

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

  const gridClassName = `grid grid-cols-${expanded ? 6 : 1}`

  return (
    <div className={gridClassName}>
      <div className="w-full col-span-4 p-6">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/multisig/${contractAddress}`, sigInfo.config.name],
            [router.asPath, `New proposal`],
          ]}
        />
        <ProposalForm
          contractAddress={contractAddress}
          onSubmit={onProposalSubmit}
          loading={proposalLoading}
          multisig
        />
      </div>
      <Sidebar>
        <div className="col-span-2 p-6 bg-base-200 min-h-screen"></div>
      </Sidebar>
    </div>
  )
}

export default MultisigProposalCreate
