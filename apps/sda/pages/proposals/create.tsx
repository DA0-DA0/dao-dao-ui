import { useState } from 'react'

import type { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { findAttribute } from '@cosmjs/stargate/build/logs'
import toast from 'react-hot-toast'

import { proposalsCreatedAtom } from 'atoms/proposals'
import {
  cosmWasmSigningClient,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import { daoSelector } from 'selectors/daos'
import { cw20TokenInfo } from 'selectors/treasury'
import { cleanChainError } from 'util/cleanChainError'
import { expirationExpired } from 'util/expiration'

import { DAO_ADDRESS } from '@/util/constants'

const ProposalCreate: NextPage = () => {
  const router: NextRouter = useRouter()
  const daoInfo = useRecoilValue(daoSelector(DAO_ADDRESS))
  const tokenInfo = useRecoilValue(cw20TokenInfo(daoInfo.gov_token))

  const signingClient = useRecoilValue(cosmWasmSigningClient)
  const walletAddress = useRecoilValue(walletAddressSelector)

  const setProposalsCreated = useSetRecoilState(
    proposalsCreatedAtom(DAO_ADDRESS)
  )

  const [proposalLoading, setProposalLoading] = useState(false)

  const onProposalSubmit = async (d: any) => {
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
              spender: DAO_ADDRESS,
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
                spender: DAO_ADDRESS,
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
        DAO_ADDRESS,
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

        router.push(`/proposals/${proposalId}`)
      })
      .finally(() => setProposalLoading(false))
  }

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-4 p-6 w-full">
        {/* <Breadcrumbs
          crumbs={[
            ['/starred', 'Home'],
            [`/dao/${contractAddress}`, daoInfo.config.name],
            [router.asPath, `New proposal`],
          ]}
        /> */}
        {/* <ProposalForm
          contractAddress={contractAddress}
          loading={proposalLoading}
          onSubmit={onProposalSubmit}
          toCosmosMsgProps={{
            sigAddress: contractAddress,
            govAddress: daoInfo.gov_token,
            govDecimals: tokenInfo.decimals,
          }}
        /> */}
      </div>
      <div className="col-span-2 p-6">
        <h2 className="mb-6 font-medium text-medium">Info</h2>
        <div className="grid grid-cols-3 gap-x-1 gap-y-2 items-center">
          <p className="font-mono text-sm text-tertiary">DAO Treasury</p>
          <div className="col-span-2">
            {/* <CopyToClipboard value={contractAddress} /> */}
          </div>
          <p className="font-mono text-sm text-tertiary">Gov Token</p>
          <div className="col-span-2">
            {/* <CopyToClipboard value={daoInfo.gov_token} /> */}
          </div>
          <p className="font-mono text-sm text-tertiary">Staking</p>
          <div className="col-span-2">
            {/* <CopyToClipboard value={daoInfo.staking_contract} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalCreate
