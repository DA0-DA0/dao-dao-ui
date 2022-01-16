import { PlusIcon, ScaleIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Logo } from './Logo'

function DIYLogo({
  title,
  body,
  href,
  weight,
  children,
}: {
  title: string
  body: string
  href: string
  weight: number
  children: ReactNode
}) {
  return (
    <Link href={href}>
      <a>
        <div className="transition-shadow shadow p-6 h-[300px] rounded-lg flex flex-col items-center m-2 bg-gradient-to-b from-base-300 justify-between border border-base-300 hover:shadow-accent hover:shadow-md hover:outline-accent hover:outline hover:outline-1">
          <div className="flex flex-col items-center">
            <div className="mt-6">{children}</div>
            <h3 className="text-lg font-semibold mt-3">{title}</h3>
            <p className="text-secondary text-sm font-mono text-center mt-1 break-words">
              {body}
            </p>
          </div>
          {weight != 0 && (
            <p className="text-success text-sm mt-3">
              <ScaleIcon className="inline w-5 h-5 mr-2 mb-1" />
              {weight} vote{weight > 1 && 's'}
            </p>
          )}
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
}: {
  name: string
  description: string
  href: string
  weight: number
}) {
  return (
    <DIYLogo title={name} body={description} href={href} weight={weight}>
      <Logo height={70} width={70} alt={name} />
    </DIYLogo>
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
    <DIYLogo title={title} body={body} href={href} weight={0}>
      <div className="w-[70px] h-[70px] flex justify-center items-center">
        <PlusIcon className="w-10 h-10 ml-1" />
      </div>
    </DIYLogo>
  )
}
