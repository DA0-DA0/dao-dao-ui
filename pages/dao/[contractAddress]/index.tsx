import React, { useEffect, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import { useDaoConfig } from 'hooks/dao'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ConfigResponse } from '@dao-dao/types/contracts/cw3-dao'
import LinkCard from 'components/LinkCard'
import ClipboardText from 'components/ClipboardText'
import TrueFalseIndicator from 'components/TrueFalseIndicator'
import { useTokenConfig } from 'hooks/govToken'
import { convertMicroDenomToDenom } from 'util/conversion'

enum TabState {
  Actions,
  Info,
}

function actions(contractAddress: string) {
  return (
    <>
      <LinkCard href={`/dao/${contractAddress}/proposals`}>
        <h3 className="text-2xl font-bold">
          Proposals{' '}
          <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
        </h3>
        <p className="mt-4 text-xl">
          Create and vote on proposals for the DAO to execute.
        </p>
      </LinkCard>
      <LinkCard href={`/dao/${contractAddress}/treasury`}>
        <h3 className="text-2xl font-bold">
          Treasury{' '}
          <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
        </h3>
        <p className="mt-4 text-xl">Manage DAO finances.</p>
      </LinkCard>
      <LinkCard href={`/dao/${contractAddress}/staking`}>
        <h3 className="text-2xl font-bold">
          Staking{' '}
          <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
        </h3>
        <p className="mt-4 text-xl">
          Staking your tokens to vote and earn rewards.
        </p>
      </LinkCard>
    </>
  )
}

function info(
  contractAddress: string,
  dao: ConfigResponse,
  tokenInfo: any | undefined
) {
  return (
    <>
      <ClipboardText
        description={'Contract Address'}
        address={contractAddress}
      />
      <ClipboardText
        description={'Gov Token Address'}
        address={dao.gov_token}
      />
      <div className="flex flex-wrap my-6">
        <div className="shadow stats mx-1 my-2">
          <div className="stat">
            <div className="stat-title">Refund Failed Proposals</div>
            <div className="stat-value">
              {dao.config.refund_failed_proposals ? 'True' : 'False'}
            </div>
          </div>
        </div>
        <div className="shadow stats mx-1 my-2">
          <div className="stat">
            <div className="stat-title">Proposal Deposit</div>
            <div className="stat-value">{dao.config.proposal_deposit}</div>
            <div className="stat-desc">
              {process.env.NEXT_PUBLIC_STAKING_DENOM}
            </div>
          </div>
        </div>
        <div className="shadow stats mx-1 my-2">
          <div className="stat">
            <div className="stat-title">Proposal Quorum</div>
            <div className="stat-value">
              {parseFloat(
                (dao.config.threshold as any).absolute_percentage.percentage
              ) * 100}
              {'%'}
            </div>
          </div>
        </div>
        <div className="shadow stats mx-1 my-2">
          <div className="stat">
            <div className="stat-title">Gov Token Name</div>
            <div className="stat-value">
              {tokenInfo ? tokenInfo.name : null}
            </div>
          </div>
        </div>
        <div className="shadow stats mx-1 my-2">
          <div className="stat">
            <div className="stat-title">Gov Token Supply</div>
            <div className="stat-value">
              {tokenInfo
                ? convertMicroDenomToDenom(tokenInfo.total_supply)
                : null}
            </div>
            <div className="stat-desc">
              {tokenInfo ? '$' + tokenInfo.symbol : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function selectInfo(
  tab: TabState,
  contractAddress: string,
  dao: ConfigResponse,
  tokenInfo: any
) {
  switch (tab) {
    case TabState.Actions:
      return actions(contractAddress)
    case TabState.Info:
      return info(contractAddress, dao, tokenInfo)
  }
}

const DaoHome: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const [tab, setTab] = useState<TabState>(TabState.Actions)

  let { daoInfo, loading } = useDaoConfig(contractAddress)
  let { tokenInfo } = useTokenConfig(daoInfo ? daoInfo.gov_token : undefined)

  return (
    <WalletLoader loading={loading}>
      {daoInfo ? (
        <>
          <h1 className="text-6xl font-bold">{daoInfo.config.name}</h1>
          <h4 className="text-xl">{daoInfo.config.description}</h4>
          <div className="tabs mt-6">
            <button
              className={
                'tab tab-lg tab-bordered' +
                (tab === TabState.Actions ? ' tab-active' : '')
              }
              onClick={() => setTab(TabState.Actions)}
            >
              Actions
            </button>
            <button
              className={
                'tab tab-lg tab-bordered' +
                (tab === TabState.Info ? ' tab-active' : '')
              }
              onClick={() => setTab(TabState.Info)}
            >
              Info
            </button>
          </div>
          <div className="card p-2 max-w-prose">
            {selectInfo(tab, contractAddress, daoInfo, tokenInfo)}
          </div>
        </>
      ) : (
        <p>DAO not found</p>
      )}
    </WalletLoader>
  )
}

export default DaoHome
