import { Children, MouseEventHandler, ReactNode } from 'react'

import Link from 'next/link'

import { useRecoilValue, waitForAll } from 'recoil'

import { StarIcon as StarOutline } from '@heroicons/react/outline'
import { StarIcon as StarSolid } from '@heroicons/react/solid'
import Tooltip from '@reach/tooltip'
import { useThemeContext } from 'ui'

import { Button } from '@components'

import { contractInstantiateTime } from 'selectors/contracts'
import { isMemberSelector } from 'selectors/cosm'
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
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from 'util/conversion'

import { Logo, LogoNoBorder } from './Logo'
import { ProposalList } from './ProposalList'

export function GradientHero({ children }: { children: ReactNode }) {
  const theme = useThemeContext()
  const endStop = theme.theme === 'dark' ? '#111213' : '#FFFFFF'
  const baseRgb = theme.accentColor
    ? theme.accentColor.split('(')[1].split(')')[0]
    : '73, 55, 192'
  return (
    <div
      style={{
        background: `linear-gradient(180deg, rgba(${baseRgb}, 0.4) 0%, rgba(17, 18, 19, 0) 100%)`,
      }}
    >
      <div
        className="p-6 flex flex-col justify-between"
        style={{
          background: `linear-gradient(270deg, ${endStop} 0%, rgba(17, 18, 19, 0) 50%, ${endStop} 100%)`,
        }}
      >
        {children}
      </div>
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
  const { accentColor } = useThemeContext()

  return (
    <button
      className="text-left w-20 flex flex-row items-center link-text text-brand"
      style={accentColor ? { color: accentColor } : {}}
      onClick={(_e) => onPin()}
    >
      {pinned ? (
        <StarSolid
          className="inline w-[20px] mr-1 text-brand"
          style={accentColor ? { color: accentColor } : {}}
        />
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
    <div className="flex items-center flex-col mt-2">
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
        <h1 className="inline header-text mt-5">{name}</h1>
        <EstablishedDate address={address} />
      </div>
      <div className="mb-4 mt-2">
        <p className="body-text whitespace-pre-wrap">{description}</p>
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
    <div className="flex flex-row items-center gap-1 caption-text">
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
    <div className="w-full border-y border-inactive py-[20px]">
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
    <li className="flex flex-row items-center caption-text">
      <span className="inline flex items-center gap-1 mr-1">
        {icon} {text}:
      </span>
      {value}
    </li>
  )
}

export function BalanceIcon({ iconURI }: { iconURI?: string }) {
  const { accentColor } = useThemeContext()

  return (
    <div
      className="rounded-full bg-brand w-4 h-4 bg-center bg-cover"
      style={{
        ...(!!accentColor && { backgroundColor: accentColor }),
        backgroundImage: iconURI ? `url(${iconURI})` : '',
      }}
    ></div>
  )
}

export function BalanceListItem({ children }: { children: ReactNode }) {
  return (
    <li className="caption-text flex flex-row items-center flex-wrap gap-2">
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
        const symbol = nativeTokenLabel(coin.denom)
        const icon = nativeTokenLogoURI(coin.denom)
        return (
          <BalanceListItem key={idx}>
            <BalanceIcon iconURI={icon} />
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
  const tooltip = !member
    ? `You must have voting power to create a proposal.${
        multisig ? '' : ' Consider staking some tokens.'
      }`
    : undefined

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="primary-text">Proposals</h2>

        <Link href={member ? proposalCreateLink : '#'} passHref>
          <a>
            <Tooltip label={tooltip}>
              <Button size="sm" disabled={!!tooltip || loading}>
                {loading ? 'Loading...' : 'New proposal'}
              </Button>
            </Tooltip>
          </a>
        </Link>
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
    <div className="py-4 px-6 rounded-lg w-full border border-default mt-2">
      <h2 className="caption-text font-mono">{title}</h2>
      {loading ? (
        <div className="animate-spin-medium inline-block mt-2">
          <LogoNoBorder />
        </div>
      ) : (
        <div className="mt-2 title-text flex flex-row flex-wrap items-center gap-2 mb-[22px]">
          <BalanceIcon />
          {amount} ${denom}
        </div>
      )}
      <div className="flex justify-end">
        <Button size="sm" variant="secondary" onClick={onManage}>
          Manage
        </Button>
      </div>
    </div>
  )
}
