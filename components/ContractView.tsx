import { Coin } from '@cosmjs/proto-signing'
import { Cw20Coin } from '@dao-dao/types/contracts/cw3-dao'
import {
  StarIcon as StarOutline,
  PlusIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { StarIcon as StarSolid } from '@heroicons/react/solid'
import Link from 'next/link'
import { Children, MouseEventHandler, ReactNode } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'
import { isMemberSelector } from 'selectors/daos'
import {
  cw20TokenInfo,
  walletAddress,
  walletTokenBalanceLoading,
} from 'selectors/treasury'
import {
  convertDenomToHumanReadableDenom,
  convertFromMicroDenom,
  convertMicroDenomToDenom,
} from 'util/conversion'
import { Logo, LogoNoBorder } from './Logo'
import { ProposalList } from './ProposalList'

export function GradientHero({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[40%] bg-gradient-radial-t from-accent via-base-100 p-6 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 flex flex-col justify-between">
      {children}
    </div>
  )
}

export function TooltipWrapper({
  tip,
  children,
}: {
  tip: string
  children: ReactNode
}) {
  return (
    <div className="tooltip" data-tip={tip}>
      {children}
    </div>
  )
}

export function HeroContractHeader({
  name,
  member,
  description,
  pinned,
  onPin,
  contractAddress
}: {
  name: string
  member: boolean
  description: string
  pinned: boolean
  onPin: Function
  contractAddress?: string
}) {
  return (
    <div className="flex items-center flex-col my-3">
      <Logo width={85} height={85} alt="DAO DAO logo" />
      <div className="flex flex-col items-center">
        <div>
          <div className="mt-3">
            <h1 className="inline text-2xl font-medium">{name}</h1>
            <div className="inline ml-2">
              {member && (
                <TooltipWrapper tip="You have voting power">
                  {' '}
                  <UserIcon className="inline w-5 h-5 mb-1" />{' '}
                </TooltipWrapper>
              )}
              <TooltipWrapper
                tip={`This is ${
                  pinned ? '' : 'not '
                } one of your favorite contracts`}
              >
                <button onClick={(_e) => onPin()}>
                  {pinned ? (
                    <StarSolid className="inline w-5 h-5 mb-1" />
                  ) : (
                    <StarOutline className="inline w-5 h-5 mb-1" />
                  )}
                </button>
              </TooltipWrapper>
            </div>
          </div>
        </div>
        {contractAddress && <p className="mt-2 font-mono">{contractAddress}</p>}
        <p className="mt-2 font-mono">{description}</p>
      </div>
    </div>
  )
}

export function HeroContractFooter({ children }: { children: ReactNode }) {
  const childList = Children.toArray(children)
  return (
    <div className="w-full border-y border-neutral py-2">
      <ul className="list-none flex justify-around text-sm">
        {Children.map(childList, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </div>
  )
}

function LoadingButton() {
  return (
    <a className="btn btn-sm btn-outline normal-case text-left loading">
      Loading
    </a>
  )
}

export function ContractProposalsDispaly({
  contractAddress,
  proposalCreateLink,
  multisig,
}: {
  contractAddress: string
  proposalCreateLink: string
  multisig?: boolean
}) {
  const wallet = useRecoilValue(walletAddress)
  const loading = useRecoilValue(walletTokenBalanceLoading(wallet))

  const member = useRecoilValue(isMemberSelector(contractAddress)).member
  const tooltip =
    (!member &&
      `You must have voting power to create a proposal.${
        multisig ? '' : ' Consider staking some tokens.'
      }`) ||
    'Something went wrong'

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-lg">Proposals</h2>
        {loading ? (
          <LoadingButton />
        ) : (
          <div className={!member ? 'tooltip' : ''} data-tip={tooltip}>
            <Link href={proposalCreateLink} passHref>
              <a
                className={
                  'btn btn-sm btn-outline normal-case text-left' +
                  (!member ? ' btn-disabled' : '')
                }
              >
                New proposal
                <PlusIcon className="inline w-5 h-5 ml-1" />
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className="px-4 mt-4">
        <ProposalList contractAddress={contractAddress} multisig={multisig} />
      </div>
    </>
  )
}

export function ContractBalances({
  contractType,
  native,
  cw20,
}: {
  contractType: 'DAO' | 'Multisig'
  native: Coin[]
  cw20?: Cw20Coin[]
}) {
  const cw20List = cw20 ? cw20 : []
  const cw20Info = useRecoilValue(
    waitForAll(cw20List.map(({ address }) => cw20TokenInfo(address)))
  )
  const cw20InfoBalance = cw20Info.map((info, idx) => ({
    info: info,
    amount: cw20List[idx].amount,
  }))

  return (
    <>
      <h2 className="font-medium text-lg">Treasury</h2>
      <h3 className="font-mono text-sm mt-6 text-secondary">
        {contractType} Balances
      </h3>
      <ul className="list-none mt-1 text-medium font-semibold ml-1">
        {native.map((coin, idx) => {
          const symbol = convertFromMicroDenom(coin.denom)
          return (
            <li key={idx}>
              {convertMicroDenomToDenom(coin.amount).toLocaleString()} ${symbol}
            </li>
          )
        })}
        {!native.length && (
          <li key="nobalance" className="text-uppercase">
            0 $
            {convertDenomToHumanReadableDenom(
              process.env.NEXT_PUBLIC_STAKING_DENOM as string
            ).toUpperCase()}
          </li>
        )}
        {cw20InfoBalance.map(({ info, amount }) => {
          return (
            <li key={info.name}>
              {convertMicroDenomToDenom(amount).toLocaleString()} ${info.symbol}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export function BalanceCard({
  denom,
  title,
  amount,
  onPlus,
  onMinus,
  loading,
}: {
  denom: string
  title: string
  amount: string
  onPlus: MouseEventHandler<HTMLButtonElement>
  onMinus: MouseEventHandler<HTMLButtonElement>
  loading: boolean
}) {
  return (
    <div className="shadow p-6 rounded-lg w-full border border-base-300 mt-2">
      <h2 className="text-sm font-mono text-secondary">{title}</h2>
      {loading ? (
        <div className="animate-spin-medium inline-block mt-2">
          <LogoNoBorder />
        </div>
      ) : (
        <p className="mt-2 font-bold">
          {amount} ${denom}
        </p>
      )}
      <div className="flex justify-end">
        <div className="btn-group">
          <button
            className="btn-outline btn btn-xs btn-square border-secondary"
            onClick={onPlus}
          >
            +
          </button>
          <button
            className="btn-outline btn btn-xs btn-square border-secondary"
            onClick={onMinus}
          >
            -
          </button>
        </div>
      </div>
    </div>
  )
}
