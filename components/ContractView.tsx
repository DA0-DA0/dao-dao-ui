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
import {NATIVE_DECIMALS, PUBLIC_IMAGES_ENABLED} from 'util/constants'
import {
  convertDenomToHumanReadableDenom,
  convertFromMicroDenom,
  convertMicroDenomToDenomWithDecimals,
} from 'util/conversion'
import { AddressSmall } from './Address'
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
      className={'text-left w-20' + (pinned ? ' text-accent' : '')}
      onClick={(_e) => onPin()}
    >
      {pinned ? (
        <StarSolid className="inline w-5 h-5 mr-1" />
      ) : (
        <StarOutline className="inline w-5 h-5 mr-1" />
      )}
      {pinned ? 'Starred' : 'Star'}
    </button>
  )
}

export function HeroContractHeader({
  name,
  member,
  address,
  imgUrl,
}: {
  name: string
  member: boolean
  address: string,
  imgUrl?: (string | null)
}) {
  return (
    <div className="flex items-center flex-col my-3">
      { typeof imgUrl === "string" && PUBLIC_IMAGES_ENABLED ? (
        <img width={85} height={85} src={imgUrl} alt="DAO's Custom Logo"/>
      ) :(
        <Logo width={85} height={85} alt="DAO DAO logo" />
      )}
      <div className="flex flex-col items-center">
        <div>
          <div className="mt-3">
            <h1 className="inline text-2xl font-medium mb-2">{name}</h1>
            <div className="inline ml-2 text-success">
              {member && (
                <TooltipWrapper tip="You have voting power">
                  {' '}
                  <UserIcon className="inline w-5 h-5 mb-2" />{' '}
                </TooltipWrapper>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 font-mono mb-3">
          <AddressSmall address={address} />
        </div>
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
  description,
  gov_token,
  staking_contract,
  native,
  cw20,
}: {
  description: string
  gov_token?: string
  staking_contract?: string
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
    <div className="py-5 border-t border-neutral grid grid-cols-5 mb-1 gap-4">
      <div className="col-span-3">
        <h2 className="font-medium text-lg">Treasury</h2>
        <p className="mt-1 mb-3 overflow-y-auto max-h-40">{description}</p>
        <div className="grid grid-cols-3">
          {gov_token && (
            <>
              <p className="col-span-1 font-sm text-secondary gap-y-2 truncate">
                Gov token address
              </p>{' '}
              <div className="col-span-2">
                <AddressSmall address={gov_token} />
              </div>
            </>
          )}
          {staking_contract && (
            <>
              <p className="col-span-1 font-sm text-secondary truncate">
                Staking address
              </p>{' '}
              <div className="col-span-2">
                <AddressSmall address={staking_contract} />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="col-start-4 col-span-2">
        <div className="col-span-2 col-start-4">
          <h2 className="font-medium text-lg">Balances</h2>
          <ul className="list-none mt-1 text-medium ml-1 gap-y-2">
            {native.map((coin, idx) => {
              const symbol = convertFromMicroDenom(coin.denom)
              return (
                <li className="mb-1" key={idx}>
                  {convertMicroDenomToDenomWithDecimals(
                    coin.amount,
                    NATIVE_DECIMALS
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 20,
                  })}{' '}
                  ${symbol}
                </li>
              )
            })}
            {!native.length && (
              <li key="nobalance" className="text-uppercase mb-1">
                0 $
                {convertDenomToHumanReadableDenom(
                  process.env.NEXT_PUBLIC_STAKING_DENOM as string
                ).toUpperCase()}
              </li>
            )}
            {cw20InfoBalance.map(({ info, amount }) => {
              return (
                <li key={info.name} className="mb-1">
                  {convertMicroDenomToDenomWithDecimals(
                    amount,
                    info.decimals
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 20,
                  })}{' '}
                  ${info.symbol}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
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
        <p className="mt-2 font-bold">
          {amount} ${denom}
        </p>
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
