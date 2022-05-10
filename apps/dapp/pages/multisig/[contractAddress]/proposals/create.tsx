import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { findAttribute } from '@cosmjs/stargate/build/logs'
import type { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { useRecoilValue } from 'recoil'

import { useWallet } from '@dao-dao/state'
import { Breadcrumbs, LoadingScreen } from '@dao-dao/ui'

import { ProposalData, ProposalForm } from '@/components/ProposalForm'
import { SuspenseLoader } from '@/components/SuspenseLoader'
import { sigSelector } from '@/selectors/multisigs'
import { cleanChainError } from '@/util/cleanChainError'

const InnerMultisigProposalCreate: FC = () => {
  const router: NextRouter = useRouter()
  const contractAddress = router.query.contractAddress as string

  const sigInfo = useRecoilValue(sigSelector(contractAddress))
  const { address: walletAddress, signingClient } = useWallet()

  const [proposalLoading, setProposalLoading] = useState(false)

  const onProposalSubmit = async (d: ProposalData) => {
    if (!signingClient || !walletAddress) {
      toast.error('Please connect your wallet.')
      return
    }

    setProposalLoading(true)

    await signingClient
      .execute(
        walletAddress,
        contractAddress,
        {
          propose: {
            title: d.title,
            description: d.description,
            msgs: d.messages,
          },
        },
        'auto'
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

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-4 p-6 w-full">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/multisig/${contractAddress}`, sigInfo.config.name],
            [router.asPath, `New proposal`],
          ]}
        />
        <ProposalForm
          contractAddress={contractAddress}
          loading={proposalLoading}
          multisig
          onSubmit={onProposalSubmit}
          toCosmosMsgProps={{
            sigAddress: contractAddress,
            govAddress: sigInfo.group_address,
            govDecimals: 0,
            multisig: true,
          }}
        />
      </div>
    </div>
  )
}

const MultisigProposalCreatePage: NextPage = () => (
  <SuspenseLoader fallback={<LoadingScreen />}>
    <InnerMultisigProposalCreate />
  </SuspenseLoader>
)

export default MultisigProposalCreatePage
