import {
  ArrowNarrowLeftIcon,
  CurrencyDollarIcon,
  KeyIcon,
  LibraryIcon,
  LinkIcon,
  PencilIcon,
  PlusIcon,
  PlusSmIcon,
  UserIcon,
} from '@heroicons/react/outline'
import Logo from 'components/Logo'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilValue } from 'recoil'
import {
  daoSelector,
  isMemberSelector,
  proposalCount,
  tokenConfig,
  totalStaked,
} from 'selectors/daos'
import { cw20Balances, cw20TokenInfo, nativeBalance } from 'selectors/treasury'
import {
  convertFromMicroDenom,
  convertMicroDenomToDenom,
} from 'util/conversion'
import {
  walletStakedTokenBalance,
  walletTokenBalance,
} from 'selectors/treasury'
import { ProposalList } from 'components/ProposalList'

function BalanceCard({
  denom,
  title,
  amount,
}: {
  denom: string
  title: string
  amount: string
}) {
  return (
    <div className="shadow p-6 rounded-lg w-full border border-base-300 h-28 mt-2">
      <h2 className="text-sm font-mono text-secondary">{title}</h2>
      <p className="mt-2 font-bold">
        $ {amount} {denom}
      </p>
      <div className="flex justify-end">
        <div className="btn-group">
          <button className="btn-outline btn btn-xs btn-square border-secondary">
            +
          </button>
          <button className="btn-outline btn btn-xs btn-square border-secondary">
            -
          </button>
        </div>
      </div>
    </div>
  )
}

const DaoHome: NextPage = () => {
  const router = useRouter()
  const contractAddress = router.query.contractAddress as string

  const daoInfo = useRecoilValue(daoSelector(contractAddress))
  const tokenInfo = useRecoilValue(tokenConfig(daoInfo?.gov_token))
  const stakedTotal = useRecoilValue(totalStaked(daoInfo?.staking_contract))
  const proposalsTotal = useRecoilValue(proposalCount(contractAddress))
  const { member } = useRecoilValue(isMemberSelector(contractAddress))

  // Balances for the DAO
  const nativeBalances = useRecoilValue(nativeBalance(contractAddress))
  const cw20balances = useRecoilValue(cw20Balances(contractAddress))

  // Balances for the visitor
  const govTokenBalance = useRecoilValue(walletTokenBalance(daoInfo?.gov_token))
  const stakedGovTokenBalance = useRecoilValue(
    walletStakedTokenBalance(daoInfo?.staking_contract)
  )

  const stakedPercent = (100 * stakedTotal) / Number(tokenInfo?.total_supply)

  return (
    <div className="grid grid-cols-6">
      <div className="w-full col-span-4">
        <div className="h-2/5 bg-gradient-radial from-accent via-base-100">
          <div className="p-6 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 h-full flex flex-col justify-between">
            <div className="text-md font-medium text-secondary-focus">
              <ArrowNarrowLeftIcon className="inline w-5 h-5 mr-2 mb-1" />
              <Link href="/dao/list">
                <a className="mr-2">DAOs</a>
              </Link>
              /
              <Link href={router.asPath}>
                <a className="ml-2">{daoInfo.config.name}</a>
              </Link>
            </div>

            <div className="flex items-center flex-col">
              <Logo width={85} height={85} alt="DAO DAO logo" />
              <div className="flex flex-col items-center">
                <div>
                  <h1 className="text-2xl font-medium mt-3">
                    {daoInfo.config.name}
                    <LinkIcon className="inline w-5 h-5 mb-1 ml-2" />
                    {member && (
                      <UserIcon className="inline w-5 h-5 mb-1 ml-1" />
                    )}
                  </h1>
                </div>
                <p className="mt-2 font-mono">{daoInfo.config.description}</p>
              </div>
            </div>

            <div className="w-full border-y border-neutral py-2">
              <ul className="list-none flex justify-around text-sm">
                <li>
                  <CurrencyDollarIcon className="w-5 h-5 mb-1 mr-1 inline" />
                  {convertMicroDenomToDenom(
                    tokenInfo?.total_supply
                  ).toLocaleString()}{' '}
                  ${tokenInfo?.symbol}
                </li>
                <li>
                  <LibraryIcon className="w-5 h-5 mb-1 mr-1 inline" />
                  {stakedPercent}% ${tokenInfo?.symbol} staked
                </li>
                <li>
                  <PencilIcon className="w-5 h-5 mb-1 mr-1 inline" />
                  {proposalsTotal} proposals
                </li>
                <li>
                  <KeyIcon className="w-5 h-5 mb-1 mr-1 inline" />$
                  {convertMicroDenomToDenom(daoInfo?.config.proposal_deposit)}{' '}
                  proposal deposit
                </li>
              </ul>
            </div>
          </div>
        </div>{' '}
        {/* end header */}
        <body className="px-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-lg">Proposals</h2>
            <Link href={`/dao/${contractAddress}/proposals/create`}>
              <button className="btn btn-sm btn-outline normal-case text-left">
                New proposal <PlusIcon className="inline w-5 h-5 ml-1" />
              </button>
            </Link>
          </div>
          <div className="px-4 mt-4">
            <ProposalList contractAddress={contractAddress} />
          </div>
        </body>
      </div>
      <div className="col-start-5 col-span-2 border border-l border-base-300 p-6 h-screen">
        <h2 className="font-medium text-lg">Treasury</h2>
        <h3 className="font-mono text-sm mt-6 text-secondary">
          DAO's Balances
        </h3>
        <ul className="list-none mt-1 text-medium font-semibold">
          {nativeBalances.map((coin, idx) => {
            const symbol = convertFromMicroDenom(coin.denom)
            return (
              <li key={idx}>
                $ {convertMicroDenomToDenom(coin.amount).toLocaleString()}{' '}
                {symbol}
              </li>
            )
          })}
          {cw20balances.map(({ address, amount }) => {
            const tokenInfo = useRecoilValue(cw20TokenInfo(address))
            return (
              <li key={tokenInfo.name}>
                $ {convertMicroDenomToDenom(amount).toLocaleString()}{' '}
                {tokenInfo.symbol}
              </li>
            )
          })}
        </ul>
        <hr className="mt-8 mb-6" />
        <h2 className="font-medium text-md">Your shares</h2>
        <ul className="list-none mt-3">
          <li>
            <BalanceCard
              title="balance"
              amount={convertMicroDenomToDenom(
                govTokenBalance?.amount
              ).toLocaleString()}
              denom={tokenInfo?.symbol}
            />
          </li>
          <li>
            <BalanceCard
              title={`votes (= staked ${tokenInfo?.symbol})`}
              amount={convertMicroDenomToDenom(
                stakedGovTokenBalance.amount
              ).toLocaleString()}
              denom={tokenInfo?.symbol}
            />
          </li>
        </ul>
        {govTokenBalance?.amount ? (
          <div className="bg-base-300 rounded-lg w-full mt-2 px-6 py-4">
            <h3 className="font-mono text-sm font-semibold mb-3">
              You have{' '}
              {convertMicroDenomToDenom(
                govTokenBalance?.amount
              ).toLocaleString()}{' '}
              unstaked {tokenInfo.symbol}
            </h3>
            <p className="text-sm">
              Staking them would bring you{' '}
              {stakedGovTokenBalance &&
                `${(
                  (govTokenBalance.amount / stakedGovTokenBalance.amount) *
                  100
                ).toLocaleString()}%`}{' '}
              more voting power and help you defend your positions for{' '}
              {daoInfo.config.name}
              {"'"}s direction.
            </p>
            <div className="text-right mt-3">
              <button className="btn btn-sm btn-ghost normal-case font-normal">
                Stake tokens
                <PlusSmIcon className="inline w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DaoHome
