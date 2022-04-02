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
  token: boolean
}) {
  return (
    <Link href={href}>
      <a>
        <div className="transition-shadow shadow p-6 h-[300px] rounded-lg flex flex-col items-center m-2 bg-card from-transparent justify-between hover:shadow-brand hover:shadow-md hover:outline-brand hover:outline hover:outline-1 relative">
          <div className="absolute w-full h-[110px] top-0 left-0 bg-gradient-to-t to-dark from-transparent opacity-[8%] rounded-lg "></div>
          <div className="flex flex-col items-center max-w-full">
            <div className="relative">
              {children}
              {token && (
                <div
                  className="bg-center rounded-full absolute -bottom-1 -right-[10px] border border-light"
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundImage: 'url(/daotoken.jpg)',
                  }}
                ></div>
              )}
            </div>
            <h3 className="text-md font-semibold truncate max-w-full mt-3">
              {title}
            </h3>
            <p className="text-secondary text-xs font-mono text-center mt-1 break-words line-clamp-3">
              {body}
            </p>
          </div>
          <div className="flex flex-col items-left gap-1">
            {balance && (
              <p className="text-sm">
                <SvgDao fill="currentColor" className="inline w-4 mr-2 mb-1" />
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
                  fill="currentColor"
                  className="inline w-4 mr-2 mb-1"
                />
                {proposals} proposal{weight != 1 && 's'}
              </p>
            )}
            {weight != undefined && (
              <p className="text-success text-sm text-valid">
                <SvgVotes
                  fill="currentColor"
                  className="inline h-5 mr-2 mb-1"
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
        title={name}
        body={description}
        href={href}
        weight={weight}
        proposals={proposals}
        balance={balance}
      >
        {imgUrl && CARD_IMAGES_ENABLED ? (
          <div
            className="rounded-full bg-center bg-cover w-[80px] h-[80px]"
            style={{
              backgroundImage: `url(${imgUrl})`,
            }}
            role="img"
            aria-label="DAO's Custom Logo"
          ></div>
        ) : (
          <Logo height={80} width={80} alt={name} />
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

export function MysteryContractCard({
  title,
  body,
  href,
}: {
  title: string
  body: string
  href: string
}) {
  return (
    <DIYLogo title={title} body={body} href={href} token={false}>
      <div className="w-[70px] h-[70px] flex justify-center items-center">
        <PlusIcon className="w-9" />
      </div>
    </DIYLogo>
  )
}

export function LoadingContractCard() {
  return (
    <div className="transition-shadow shadow p-6 h-[300px] rounded-lg flex flex-col items-center justify-center m-2 bg-gradient-to-b from-base-300 border border-base-300 hover:shadow-accent hover:shadow-md hover:outline-accent hover:outline hover:outline-1">
      <div className="w-[70px] h-[70px] flex justify-center items-center">
        <div className="animate-spin inline-block">
          <Logo height={72} width={72} />
        </div>
      </div>
    </div>
  )
}
