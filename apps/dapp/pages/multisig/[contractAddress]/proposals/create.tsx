import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { findAttribute } from '@cosmjs/stargate/build/logs'
import type { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { useRecoilValue } from 'recoil'

import { useWallet } from '@dao-dao/state'
import { Breadcrumbs, CopyToClipboard, LoadingScreen } from '@dao-dao/ui'

import { ProposalData, ProposalForm } from '@/components/ProposalForm'
import { SmallScreenNav } from '@/components/SmallScreenNav'
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
    <div className="flex flex-col lg:grid lg:grid-cols-6">
      <div className="md:hidden">
        <SmallScreenNav />
      </div>
      <div className="col-span-4 px-4 md:p-6">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/multisig/${contractAddress}`, sigInfo.config.name],
            [router.asPath, `New proposal`],
          ]}
        />

        <h2 className="my-3 md:hidden primary-text">New proposal</h2>

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
      <div className="col-span-2 p-4 md:p-6">
        <h2 className="mb-6 primary-text">Info</h2>
        <div className="grid grid-cols-3 gap-x-1 gap-y-2 items-center">
          <p className="font-mono text-sm text-tertiary">Multisig</p>
          <div className="col-span-2">
            <CopyToClipboard value={contractAddress} />
          </div>
          <p className="font-mono text-sm text-tertiary">cw4-groups</p>
          <div className="col-span-2">
            <CopyToClipboard value={sigInfo.group_address} />
          </div>
        </div>
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
