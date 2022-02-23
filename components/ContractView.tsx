import { Children, MouseEventHandler, ReactNode, Suspense } from 'react'

import Link from 'next/link'

import { useRecoilValue, waitForAll } from 'recoil'

import { StarIcon as StarOutline, PlusIcon } from '@heroicons/react/outline'
import { StarIcon as StarSolid } from '@heroicons/react/solid'

import { contractInstantiateTime } from 'selectors/contracts'
import { isMemberSelector } from 'selectors/daos'
import {
  cw20Balances,
  cw20TokenInfo,
  nativeBalance,
  walletAddress,
  walletTokenBalanceLoading,
} from 'selectors/treasury'
import { NATIVE_DECIMALS, HEADER_IMAGES_ENABLED } from 'util/constants'
import {
  convertDenomToHumanReadableDenom,
  convertFromMicroDenom,
  convertMicroDenomToDenomWithDecimals,
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

export function StarButton({
  pinned,
  onPin,
}: {
  pinned: boolean
  onPin: Function
}) {
  return (
    <button
      className={`text-left w-20 flex flex-row items-center text-sm ${
        pinned ? ' text-accent' : ''
      }`}
      onClick={(_e) => onPin()}
    >
      {pinned ? (
        <StarSolid className="inline w-[20px] mr-1" />
      ) : (
        <StarOutline className="inline w-[20px] mr-1" />
      )}
      {pinned ? 'Starred' : 'Star'}
    </button>
  )
}

export function EstablishedDate({ address }: { address: string }) {
  const instantiateDate = useRecoilValue(contractInstantiateTime(address))
  const formattedDate = instantiateDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return <p className="mb-3 text-sm">Est. {formattedDate}</p>
}

export function HeroContractHeader({
  name,
  address,
  description,
  imgUrl,
}: {
  name: string
  address: string
  description: string
  imgUrl?: string | null
}) {
  return (
    <div className="flex items-center flex-col mt-3">
      {imgUrl && HEADER_IMAGES_ENABLED ? (
        <div
          className="rounded-full bg-center bg-cover w-[95px] h-[95px]"
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
          role="img"
          aria-label="DAO's Custom Logo"
        ></div>
      ) : (
        <Logo width={85} height={85} alt="DAO DAO logo" />
      )}
      <div className="flex flex-col items-center">
        <h1 className="inline text-2xl font-semibold mb-1 mt-5">{name}</h1>
        <EstablishedDate address={address} />
      </div>
      <div className="my-2">
        <p>{description}</p>
      </div>
    </div>
  )
}

export function HeroContractHorizontalInfoSection({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-row items-center gap-1 text-secondary">
      {children}
    </div>
  )
}

export function HeroContractHorizontalInfo({
  children,
}: {
  children: ReactNode
}) {
  const childList = Children.toArray(children)
  return (
    <div className="w-full border-y border-neutral py-3">
      <ul className="list-none flex justify-around text-sm flex-wrap gap-2">
        {Children.map(childList, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </div>
  )
}

export function GovInfoListItem({
  icon,
  text,
  value,
}: {
  icon: ReactNode
  text: string
  value: string
}) {
  return (
    <li className="flex flex-row items-center text-sm">
      <span className="inline text-secondary flex items-center gap-1 mr-1">
        {icon} {text}:
      </span>
      {value}
    </li>
  )
}

export function BalanceIcon() {
  return <div className="w-4 h-4 rounded-full bg-accent"></div>
}

export function BalanceListItem({ children }: { children: ReactNode }) {
  return (
    <li className="text-sm text-secondary flex flex-row items-center flex-wrap gap-2">
      {children}
    </li>
  )
}

export function TreasuryBalances({ address }: { address: string }) {
  const nativeBalances = useRecoilValue(nativeBalance(address))
  const cw20List = useRecoilValue(cw20Balances(address))

  const cw20Info = useRecoilValue(
    waitForAll(cw20List.map(({ address }) => cw20TokenInfo(address)))
  )
  const cw20InfoBalance = cw20Info.map((info, idx) => ({
    info: info,
    amount: cw20List[idx].amount,
  }))

  return (
    <ul className="list-none mt-6 flex flex-col gap-2">
      {nativeBalances.map((coin, idx) => {
        const symbol = convertFromMicroDenom(coin.denom)
        return (
          <BalanceListItem key={idx}>
            <BalanceIcon />
            {convertMicroDenomToDenomWithDecimals(
              coin.amount,
              NATIVE_DECIMALS
            ).toLocaleString(undefined, {
              maximumFractionDigits: 20,
            })}{' '}
            ${symbol}
          </BalanceListItem>
        )
      })}
      {!nativeBalances.length && (
        <BalanceListItem>
          <BalanceIcon />0 $
          {convertDenomToHumanReadableDenom(
            process.env.NEXT_PUBLIC_STAKING_DENOM as string
          ).toUpperCase()}
        </BalanceListItem>
      )}
      {cw20InfoBalance.map(({ info, amount }) => {
        return (
          <BalanceListItem key={info.name}>
            <BalanceIcon />
            {convertMicroDenomToDenomWithDecimals(
              amount,
              info.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: 20,
            })}{' '}
            ${info.symbol}
          </BalanceListItem>
        )
      })}
    </ul>
  )
}

export function LoadingButton() {
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

export function BalanceCard({
  denom,
  title,
  amount,
  onManage,
  loading,
}: {
  denom: string
  title: string
  amount: string
  onManage: MouseEventHandler<HTMLButtonElement>
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
        <div className="mt-2 font-bold flex flex-row flex-wrap items-center gap-2">
          <BalanceIcon />
          {amount} ${denom}
        </div>
      )}
      <div className="flex justify-end">
        <button
          className="btn btn-xs normal-case font-normal rounded-md"
          onClick={onManage}
        >
          Manage
        </button>
      </div>
    </div>
  )
}
