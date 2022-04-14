import { ReactNode } from 'react'

import Link from 'next/link'

import { PlusIcon, StarIcon as StarIconOutline } from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'

import {
  convertDenomToHumanReadableDenom,
  convertMicroDenomToDenomWithDecimals,
} from 'util/conversion'

import {
  CARD_IMAGES_ENABLED,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
} from '../util/constants'
import SvgDao from './icons/Dao'
import SvgPencil from './icons/Pencil'
import SvgVotes from './icons/Votes'
import { Logo } from './Logo'

function DIYLogo({
  title,
  body,
  href,
  weight,
  proposals,
  balance,
  children,
  token = true,
}: {
  title: string
  body: string
  href: string
  weight?: number
  proposals?: number
  balance?: string
  children: ReactNode
  token?: boolean
}) {
  return (
    <Link href={href}>
      <a>
        <div className="flex relative flex-col justify-between items-center p-6 m-2 h-[300px] bg-card from-transparent rounded-lg hover:outline-1 hover:outline-brand hover:outline shadow hover:shadow-md hover:shadow-brand transition-shadow">
          <div className="absolute top-0 left-0 w-full h-[110px] bg-gradient-to-t from-transparent to-dark rounded-lg opacity-[8%] "></div>
          <div className="flex flex-col items-center max-w-full">
            <div className="relative">
              {children}
              {token && (
                <div
                  className="absolute -right-[10px] -bottom-1 bg-center rounded-full border border-light"
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundImage: 'url(/daotoken.jpg)',
                  }}
                ></div>
              )}
            </div>
            <h3 className="mt-3 max-w-full font-semibold truncate text-md">
              {title}
            </h3>
            <p className="mt-1 font-mono text-xs text-center text-secondary break-words line-clamp-3">
              {body}
            </p>
          </div>
          <div className="flex flex-col gap-1 items-left">
            {balance && (
              <p className="text-sm">
                <SvgDao className="inline mr-2 mb-1 w-4" fill="currentColor" />
                {convertMicroDenomToDenomWithDecimals(
                  balance,
                  NATIVE_DECIMALS
                )}{' '}
                {convertDenomToHumanReadableDenom(NATIVE_DENOM)}
              </p>
            )}
            {proposals != undefined && (
              <p className="text-sm">
                <SvgPencil
                  className="inline mr-2 mb-1 w-4"
                  fill="currentColor"
                />
                {proposals} proposal{weight != 1 && 's'}
              </p>
            )}
            {weight != undefined && (
              <p className="text-sm text-valid text-success">
                <SvgVotes
                  className="inline mr-2 mb-1 h-5"
                  fill="currentColor"
                />
                {weight} vote{weight != 1 && 's'}
              </p>
            )}
          </div>
        </div>
      </a>
    </Link>
  )
}

export function ContractCard({
  name,
  description,
  href,
  weight,
  proposals,
  balance,
  pinned,
  onPin,
  imgUrl,
}: {
  name: string
  description: string
  href: string
  weight: number
  proposals: number
  balance: string
  pinned: boolean
  onPin: Function
  imgUrl?: string | null
}) {
  return (
    <div className="relative">
      <DIYLogo
        balance={balance}
        body={description}
        href={href}
        proposals={proposals}
        title={name}
        weight={weight}
      >
        {imgUrl && CARD_IMAGES_ENABLED ? (
          <div
            aria-label="DAO's Custom Logo"
            className="w-[80px] h-[80px] bg-center bg-cover rounded-full"
            role="img"
            style={{
              backgroundImage: `url(${imgUrl})`,
            }}
          ></div>
        ) : (
          <Logo alt={name} height={80} width={80} />
        )}
      </DIYLogo>
      <button
        className="absolute top-[18px] right-[18px] text-brand"
        onClick={(_e) => onPin()}
      >
        {pinned ? (
          <StarIconSolid className="w-[18px] h-[18px]" />
        ) : (
          <StarIconOutline className="w-[18px] h-[18px]" />
        )}
      </button>
    </div>
  )
}

export function LoadingContractCard() {
  return (
    <div className="flex relative flex-col justify-center items-center p-6 m-2 h-[300px]  bg-card from-transparent rounded-lg shadow transition-shadow">
      <div className="absolute top-0 left-0 w-full h-[110px] bg-gradient-to-t from-transparent to-dark rounded-lg opacity-[8%] "></div>
      <div className="flex justify-center items-center w-[70px] h-[70px]">
        <div className="inline-block animate-spin">
          <Logo height={72} width={72} />
        </div>
      </div>
    </div>
  )
}

const EmptyStateContractCard = ({
  title,
  description,
  backgroundUrl,
  href,
}: {
  title: string
  description: string
  backgroundUrl: string
  href: string
}) => {
  return (
    <Link href={href} passHref>
      <a className="overflow-hidden w-max max-w-[400px] rounded-md border border-inactive hover:border-brand transition">
        <div
          className={'h-72 bg-no-repeat bg-cover opacity-75'}
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
        <div className="py-4 px-6">
          <div className="flex gap-2 items-center mb-2 primary-text">
            <PlusIcon className="w-4" />
            {title}
          </div>
          <div className="body-text">{description}</div>
        </div>
      </a>
    </Link>
  )
}
