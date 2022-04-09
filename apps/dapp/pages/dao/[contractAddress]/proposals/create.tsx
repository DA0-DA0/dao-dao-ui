import { useState } from 'react'

import type { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { findAttribute } from '@cosmjs/stargate/build/logs'
import toast from 'react-hot-toast'

import { Breadcrumbs } from '@components/Breadcrumbs'
import { CopyToClipboard } from '@components/CopyToClipboard'
import { ProposalData, ProposalForm } from '@components/ProposalForm'
import { proposalsCreatedAtom } from 'atoms/proposals'
import {
  cosmWasmSigningClient,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import { daoSelector } from 'selectors/daos'
import { cw20TokenInfo } from 'selectors/treasury'
import { cleanChainError } from 'util/cleanChainError'
import { expirationExpired } from 'util/expiration'

const ProposalCreate: NextPage = () => {
  const router: NextRouter = useRouter()
  const contractAddress = router.query.contractAddress as string
  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const tokenInfo = useRecoilValue(cw20TokenInfo(daoInfo.gov_token))

  const signingClient = useRecoilValue(cosmWasmSigningClient)
  const walletAddress = useRecoilValue(walletAddressSelector)

  const setProposalsCreated = useSetRecoilState(
    proposalsCreatedAtom(contractAddress)
  )

  const [proposalLoading, setProposalLoading] = useState(false)

  const onProposalSubmit = async (d: ProposalData) => {
    setProposalLoading(true)

    if (signingClient == null) {
      toast.error('No signing client. Is your wallet connected?')
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
    <div className="grid grid-cols-6">
      <div className="w-full col-span-4 p-6">
        <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/dao/${contractAddress}`, daoInfo.config.name],
            [router.asPath, `New proposal`],
          ]}
        />
        <ProposalForm
          onSubmit={onProposalSubmit}
          contractAddress={contractAddress}
          loading={proposalLoading}
          multisig={false}
          toCosmosMsgProps={{
            sigAddress: contractAddress,
            govAddress: daoInfo.gov_token,
            govDecimals: tokenInfo.decimals,
            multisig: false,
          }}
        />
      </div>
      <div className="col-span-2 p-6">
        <h2 className="font-medium text-medium mb-6">Info</h2>
        <div className="grid grid-cols-3 gap-x-1 gap-y-2 items-center">
          <p className="text-tertiary font-mono text-sm">DAO Treasury</p>
          <div className="col-span-2">
            <CopyToClipboard value={contractAddress} />
          </div>
          <p className="text-tertiary font-mono text-sm">Gov Token</p>
          <div className="col-span-2">
            <CopyToClipboard value={daoInfo.gov_token} />
          </div>
          <p className="text-tertiary font-mono text-sm">Staking</p>
          <div className="col-span-2">
            <CopyToClipboard value={daoInfo.staking_contract} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalCreate
