import { ReactNode } from 'react'

import Link from 'next/link'

import {
  PlusIcon,
  ScaleIcon,
  StarIcon as StarIconOutline,
} from '@heroicons/react/outline'
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
}: {
  title: string
  body: string
  href: string
  weight?: number
  proposals?: number
  balance?: string
  children: ReactNode
}) {
  return (
    <Link href={href}>
      <a>
        <div className="transition-shadow shadow p-6 h-[275px] rounded-lg flex flex-col items-center m-2 bg-gradient-to-b from-base-300 justify-between border border-base-300 hover:shadow-accent hover:shadow-md hover:outline-accent hover:outline hover:outline-1">
          <div className="flex flex-col items-center max-w-full">
            <div>{children}</div>
            <h3 className="text-lg font-semibold mt-3 truncate max-w-full">
              {title}
            </h3>
            <p className="text-secondary text-sm font-mono text-center mt-1 break-words line-clamp-2">
              {body}
            </p>
          </div>
          <div className="mt-3 flex flex-col items-left gap-1">
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
              <p className="text-success text-sm">
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
            className="rounded-full bg-center bg-cover w-[70px] h-[70px]"
            style={{
              backgroundImage: `url(${imgUrl})`,
            }}
            role="img"
            aria-label="DAO's Custom Logo"
          ></div>
        ) : (
          <Logo height={70} width={70} alt={name} />
        )}
      </DIYLogo>
      <button className="absolute top-6 right-6" onClick={(_e) => onPin()}>
        {pinned ? (
          <StarIconSolid className="w-5 h-5" />
        ) : (
          <StarIconOutline className="w-5 h-5" />
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
    <DIYLogo title={title} body={body} href={href}>
      <div className="w-[70px] h-[70px] flex justify-center items-center">
        <PlusIcon className="w-10 h-10 ml-1" />
      </div>
    </DIYLogo>
  )
}

export function LoadingContractCard() {
  return (
    <div className="transition-shadow shadow p-6 h-[275px] rounded-lg flex flex-col items-center justify-center m-2 bg-gradient-to-b from-base-300 border border-base-300 hover:shadow-accent hover:shadow-md hover:outline-accent hover:outline hover:outline-1">
      <div className="flex justify-center items-center">
        <div className="animate-spin inline-block">
          <Logo height={72} width={72} />
        </div>
      </div>
    </div>
  )
}
