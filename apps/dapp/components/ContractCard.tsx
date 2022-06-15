import { StarIcon as StarIconOutline } from '@heroicons/react/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

import i18n from '@dao-dao/i18n'
import { Dao, Pencil, Votes } from '@dao-dao/icons'
import { Logo } from '@dao-dao/ui'
import {
  CARD_IMAGES_ENABLED,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToHumanReadableDenom,
  convertMicroDenomToDenomWithDecimals,
} from '@dao-dao/utils'

interface ContractCardBaseProps {
  title: string
  body: string
  href: string
  weight?: string
  proposals?: number
  balance?: string
  children: ReactNode
  token?: boolean
  selected?: boolean
}

const ContractCardBase: FC<ContractCardBaseProps> = ({
  title,
  body,
  href,
  weight,
  proposals,
  balance,
  children,
  selected,
  token = true,
}) => (
  <Link href={href}>
    <a>
      <div
        className={clsx(
          'flex relative flex-col justify-between items-center p-6 w-[260px] h-[320px] bg-card from-transparent rounded-lg hover:outline-1 hover:outline-brand hover:outline',
          selected && 'outline-1 outline-brand outline'
        )}
      >
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
          <p className="mt-2 font-mono text-xs text-center text-secondary break-words line-clamp-3">
            {body}
          </p>
        </div>
        <div className="flex flex-col gap-1 items-left">
          {balance && (
            <p className="text-sm">
              <Dao className="inline mr-2 mb-1 w-4" fill="currentColor" />
              {convertMicroDenomToDenomWithDecimals(
                balance,
                NATIVE_DECIMALS
              )}{' '}
              {convertDenomToHumanReadableDenom(NATIVE_DENOM)}
            </p>
          )}
          {proposals !== undefined && (
            <p className="text-sm">
              <Pencil className="inline mr-2 mb-1 w-4" fill="currentColor" />
              {i18n.t('proposal', { count: proposals })}
            </p>
          )}
          {weight !== undefined && (
            <p className="text-sm text-valid text-success">
              <Votes className="inline mr-2 mb-1 h-5" fill="currentColor" />
              {i18n.t('Your voting weight')}: {weight}
            </p>
          )}
        </div>
      </div>
    </a>
  </Link>
)

interface ContractCardProps {
  name: string
  description: string
  href: string
  weight?: string
  proposals: number
  balance: string
  pinned?: boolean
  onPin?: Function
  imgUrl?: string | null
  selected?: boolean
}

export const ContractCard: FC<ContractCardProps> = ({
  name,
  description,
  href,
  weight,
  proposals,
  balance,
  pinned,
  onPin,
  imgUrl,
  selected,
}) => (
  <div className="relative w-min">
    <ContractCardBase
      balance={balance}
      body={description}
      href={href}
      proposals={proposals}
      selected={selected}
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
    </ContractCardBase>
    <button
      className="absolute top-[18px] right-[18px] text-brand"
      onClick={onPin ? (_) => onPin() : undefined}
    >
      {pinned !== undefined ? (
        pinned ? (
          <StarIconSolid className="w-[18px] h-[18px]" />
        ) : (
          <StarIconOutline className="w-[18px] h-[18px]" />
        )
      ) : undefined}
    </button>
  </div>
)

export const LoadingContractCard = () => (
  <div className="flex relative flex-col justify-center items-center p-6 w-[260px]  h-[320px] bg-card from-transparent rounded-lg shadow transition-shadow">
    <div className="absolute top-0 left-0 w-full h-[110px] bg-gradient-to-t from-transparent to-dark rounded-lg opacity-[8%] "></div>
    <div className="flex justify-center items-center w-[70px] h-[70px]">
      <div className="inline-block animate-spin">
        <Logo height={72} width={72} />
      </div>
    </div>
  </div>
)
