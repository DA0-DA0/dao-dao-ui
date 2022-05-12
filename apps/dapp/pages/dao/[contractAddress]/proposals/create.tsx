import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { findAttribute } from '@cosmjs/stargate/build/logs'
import type { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { useWallet } from '@dao-dao/state'
import { CopyToClipboard, Breadcrumbs, LoadingScreen } from '@dao-dao/ui'

import { proposalsCreatedAtom } from '@/atoms/proposals'
import { ProposalData, ProposalForm } from '@/components/ProposalForm'
import { SmallScreenNav } from '@/components/SmallScreenNav'
import { SuspenseLoader } from '@/components/SuspenseLoader'
import { daoSelector } from '@/selectors/daos'
import { cw20TokenInfo } from '@/selectors/treasury'
import { cleanChainError } from '@/util/cleanChainError'
import { expirationExpired } from '@/util/expiration'

const InnerProposalCreate: FC = () => {
  const router: NextRouter = useRouter()
  const contractAddress = router.query.contractAddress as string
  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const tokenInfo = useRecoilValue(cw20TokenInfo(daoInfo.gov_token))

  const { address: walletAddress, signingClient } = useWallet()

  const setProposalsCreated = useSetRecoilState(
    proposalsCreatedAtom(contractAddress)
  )

  const [proposalLoading, setProposalLoading] = useState(false)

  const onProposalSubmit = async (d: ProposalData) => {
    setProposalLoading(true)

    if (!signingClient || !walletAddress) {
      toast.error('Please connect your wallet.')
      return
    }

    if (daoInfo.config.proposal_deposit !== '0') {
      try {
        // Request to increase the contract's allowance if needed.
        const currentAllowance = await signingClient?.queryContractSmart(
          daoInfo.gov_token,
          {
            allowance: {
              owner: walletAddress,
              spender: contractAddress,
            },
          }
        )
        const blockHeight = (await signingClient?.getHeight()) as number
        if (
          !expirationExpired(currentAllowance.expires, blockHeight) &&
          Number(currentAllowance.allowance) <
            Number(daoInfo.config.proposal_deposit)
        ) {
          await signingClient?.execute(
            walletAddress,
            daoInfo.gov_token,
            {
              increase_allowance: {
                amount: daoInfo.config.proposal_deposit,
                spender: contractAddress,
              },
            },
            'auto'
          )
        }
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

        setProposalsCreated((n) => n + 1)

        router.push(`/dao/${contractAddress}/proposals/${proposalId}`)
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
            [`/dao/${contractAddress}`, daoInfo.config.name],
            [router.asPath, `New proposal`],
          ]}
        />
        <h2 className="my-3 md:hidden primary-text">New proposal</h2>
        <ProposalForm
          contractAddress={contractAddress}
          loading={proposalLoading}
          multisig={false}
          onSubmit={onProposalSubmit}
          toCosmosMsgProps={{
            sigAddress: contractAddress,
            govAddress: daoInfo.gov_token,
            govDecimals: tokenInfo.decimals,
            multisig: false,
          }}
        />
      </div>
      <div className="col-span-2 p-4 md:p-6">
        <h2 className="mb-6 font-medium text-medium">Info</h2>
        <div className="grid grid-cols-3 gap-x-1 gap-y-2 items-center">
          <p className="font-mono text-sm text-tertiary">DAO Treasury</p>
          <div className="col-span-2">
            <CopyToClipboard value={contractAddress} />
          </div>
          <p className="font-mono text-sm text-tertiary">Gov Token</p>
          <div className="col-span-2">
            <CopyToClipboard value={daoInfo.gov_token} />
          </div>
          <p className="font-mono text-sm text-tertiary">Staking</p>
          <div className="col-span-2">
            <CopyToClipboard value={daoInfo.staking_contract} />
          </div>
        </div>
      </div>
    </div>
  )
}

const ProposalCreatePage: NextPage = () => (
  <SuspenseLoader fallback={<LoadingScreen />}>
    <InnerProposalCreate />
  </SuspenseLoader>
)

export default ProposalCreatePage
