import { Coin } from "@cosmjs/proto-signing";
import { Cw20Coin } from "@dao-dao/types/contracts/cw3-dao";
import { LinkIcon, PlusIcon, UserIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { Children, cloneElement, ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { cw20TokenInfo } from "selectors/treasury";
import { convertDenomToHumanReadableDenom, convertFromMicroDenom, convertMicroDenomToDenom } from "util/conversion";
import Logo from "./Logo";
import { ProposalList } from "./ProposalList";


export function GradientHero({
  children
}: {
  children: ReactNode
}) {
  return (
    <div className="h-2/5 bg-gradient-radial-t from-accent via-base-100">
      <div className="p-6 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  )
}

export function HeroContractHeader({
  name,
  member,
  description
}: {
  name: string
  member: boolean
  description?: string
}) {
  return (
    <div className="flex items-center flex-col">
      <Logo width={85} height={85} alt="DAO DAO logo" />
      <div className="flex flex-col items-center">
        <div>
          <h1 className="text-2xl font-medium mt-3">
            {name}
            <LinkIcon className="inline w-5 h-5 mb-1 ml-2" />
            {member && (
              <UserIcon className="inline w-5 h-5 mb-1 ml-1" />
            )}
          </h1>
        </div>
        {description && <p className="mt-2 font-mono">{description}</p>}
      </div>
    </div>

  )
}

export function HeroContractFooter({
  children
}: {
  children: ReactNode
}) {
  const childList = Children.toArray(children)
  return (
    <div className="w-full border-y border-neutral py-2">
      <ul className="list-none flex justify-around text-sm">
        {Children.map(childList, (child) => (
          <li>
            {child}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ContractProposalsDispaly({
  contractAddress,
  proposalCreateLink,
}: {
  contractAddress: string,
  proposalCreateLink: string
}) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-lg">Proposals</h2>
        <Link href={proposalCreateLink}>
          <button className="btn btn-sm btn-outline normal-case text-left">
            New proposal <PlusIcon className="inline w-5 h-5 ml-1" />
          </button>
        </Link>
      </div>
      <div className="px-4 mt-4">
        <ProposalList contractAddress={contractAddress} />
      </div>
    </>
  )
}

export function ContractBalances({
  contractType,
  native,
  cw20
}: {
  contractType: "DAO" | "Multisig",
  native: Coin[],
  cw20?: Cw20Coin[]
}) {
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
              {convertMicroDenomToDenom(coin.amount).toLocaleString()}{' '}
              ${symbol}
            </li>
          )
        })}
        {!native.length &&
          <li key="nobalance" className="text-uppercase">
            0 ${convertDenomToHumanReadableDenom(process.env.NEXT_PUBLIC_STAKING_DENOM as string).toUpperCase()}
          </li>}
        {cw20 && cw20.map(({ address, amount }) => {
          const tokenInfo = useRecoilValue(cw20TokenInfo(address))
          return (
            <li key={tokenInfo.name}>
              {convertMicroDenomToDenom(amount).toLocaleString()}{' '}
              ${tokenInfo.symbol}
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
}: {
  denom: string
  title: string
  amount: string
}) {
  return (
    <div className="shadow p-6 rounded-lg w-full border border-base-300 h-28 mt-2">
      <h2 className="text-sm font-mono text-secondary">{title}</h2>
      <p className="mt-2 font-bold">
        {amount} ${denom}
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
