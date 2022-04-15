import { Children, MouseEventHandler, ReactNode } from 'react'

import Link from 'next/link'

import { useRecoilValue, waitForAll } from 'recoil'

import { useThemeContext, Button } from '@dao-dao/ui'
import {
  NATIVE_DECIMALS,
  HEADER_IMAGES_ENABLED,
  convertDenomToHumanReadableDenom,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from '@dao-dao/utils'
import { StarIcon as StarOutline } from '@heroicons/react/outline'
import { StarIcon as StarSolid } from '@heroicons/react/solid'
import Tooltip from '@reach/tooltip'

import { contractInstantiateTime } from 'selectors/contracts'
import { isMemberSelector } from 'selectors/cosm'
import {
  cw20Balances,
  cw20TokenInfo,
  nativeBalance,
  walletAddress,
  walletTokenBalanceLoading,
} from 'selectors/treasury'

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
        className="flex flex-col justify-between p-6"
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
      className="flex flex-row items-center w-20 text-left text-brand link-text"
      onClick={(_e) => onPin()}
      style={accentColor ? { color: accentColor } : {}}
    >
      {pinned ? (
        <StarSolid
          className="inline mr-1 w-[20px] text-brand"
          style={accentColor ? { color: accentColor } : {}}
        />
      ) : (
        <StarOutline className="inline mr-1 w-[20px]" />
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
    <div className="flex flex-col items-center mt-2">
      {imgUrl && HEADER_IMAGES_ENABLED ? (
        <div
          aria-label="DAO's Custom Logo"
          className="w-[95px] h-[95px] bg-center bg-cover rounded-full"
          role="img"
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        ></div>
      ) : (
        <Logo alt="DAO DAO logo" height={85} width={85} />
      )}
      <div className="flex flex-col items-center">
        <h1 className="inline mt-5 header-text">{name}</h1>
        <EstablishedDate address={address} />
      </div>
      <div className="mt-2 mb-4">
        <p className="whitespace-pre-wrap body-text">{description}</p>
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
    <div className="flex flex-row gap-1 items-center caption-text">
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
    <div className="py-[20px] w-full border-y border-inactive">
      <ul className="flex flex-wrap gap-2 justify-around text-sm list-none">
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
      <span className="inline flex gap-1 items-center mr-1">
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
      className="w-4 h-4 bg-center bg-cover rounded-full bg-brand"
      style={{
        ...(!!accentColor && { backgroundColor: accentColor }),
        backgroundImage: iconURI ? `url(${iconURI})` : '',
      }}
    ></div>
  )
}

export function BalanceListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex flex-row flex-wrap gap-2 items-center caption-text">
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
    <ul className="flex flex-col gap-2 mt-6 list-none">
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
              <Button disabled={!!tooltip || loading} size="sm">
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
    <div className="py-4 px-6 mt-2 w-full rounded-lg border border-default">
      <h2 className="font-mono caption-text">{title}</h2>
      {loading ? (
        <div className="inline-block mt-2 animate-spin-medium">
          <LogoNoBorder />
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-2 items-center mt-2 mb-[22px] title-text">
          <BalanceIcon />
          {amount} ${denom}
        </div>
      )}
      <div className="flex justify-end">
        <Button onClick={onManage} size="sm" variant="secondary">
          Manage
        </Button>
      </div>
    </div>
  )
}
