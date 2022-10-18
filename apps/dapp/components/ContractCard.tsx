// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Dao, Pencil, PinOutline, PinSolid, Votes } from '@dao-dao/icons'
import { Loader, Logo } from '@dao-dao/ui'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'

interface ContractCardProps {
  name: string
  description: string
  href: string
  votingPowerPercent?: string
  proposals: number
  balance: string
  pinned?: boolean
  onPin?: Function
  imgUrl?: string | null
  selected?: boolean
  loading?: boolean
}

export const ContractCard = ({
  name,
  description,
  href,
  votingPowerPercent,
  proposals,
  balance,
  pinned,
  onPin,
  imgUrl,
  selected,
  loading: _loading,
}: ContractCardProps) => {
  const { t } = useTranslation()

  // Next.js takes some time to render a DAO page on first load. Let's
  // indicate to the user something is happening while this is loading.
  const [loading, setLoading] = useState(false)

  return (
    <div className="relative w-full">
      <Link href={href}>
        <a onClick={() => setLoading(true)}>
          <div
            className={clsx(
              'relative flex h-[320px] w-full flex-col items-center justify-between rounded-lg bg-card from-transparent p-6 hover:outline hover:outline-1 hover:outline-brand',
              selected && 'outline outline-1 outline-brand'
            )}
          >
            <div className="absolute top-0 left-0 h-[110px] w-full rounded-lg bg-gradient-to-t from-transparent to-dark opacity-[8%]"></div>
            <div className="flex flex-col items-center self-stretch">
              <div
                className={clsx({ 'animate-spin-medium': _loading || loading })}
              >
                {imgUrl ? (
                  <div
                    aria-label={t('info.daosLogo')}
                    className="h-[80px] w-[80px] rounded-full bg-cover bg-center"
                    role="img"
                    style={{
                      backgroundImage: `url(${imgUrl})`,
                    }}
                  ></div>
                ) : (
                  <Logo size={80} />
                )}
              </div>

              <h3 className="text-md mt-3 max-w-full truncate font-semibold">
                {name}
              </h3>
              <p className="mt-2 break-words text-center font-mono text-xs text-secondary line-clamp-3">
                {description}
              </p>
            </div>
            <div className="items-left flex flex-col gap-1">
              {balance && (
                <p className="text-sm">
                  <Dao className="mr-2 mb-1 inline w-4" />
                  {convertMicroDenomToDenomWithDecimals(
                    balance,
                    NATIVE_DECIMALS
                  )}{' '}
                  {nativeTokenLabel(NATIVE_DENOM)}
                </p>
              )}
              {proposals !== undefined && (
                <p className="text-sm">
                  <Pencil className="mr-2 mb-1 inline w-4" />
                  {t('info.numProposals', { count: proposals })}
                </p>
              )}
              {votingPowerPercent && (
                <div className="text-success flex flex-row gap-2 text-sm text-valid">
                  <Votes className="h-5 w-4" />
                  {votingPowerPercent === '0%' ? (
                    t('info.noVotingPower')
                  ) : (
                    <div className="flex flex-row flex-wrap gap-x-1">
                      <span>{t('title.yourVotingPower')}:</span>
                      {votingPowerPercent}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </a>
      </Link>
      {onPin !== undefined && pinned !== undefined && (
        <button
          className="absolute top-[18px] right-[18px] text-brand"
          onClick={() => onPin()}
        >
          {pinned ? (
            <PinSolid className="h-4 w-4" />
          ) : (
            <PinOutline className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  )
}

export const LoadingContractCard = () => (
  <div className="relative flex h-[320px] w-full flex-col items-center justify-center rounded-lg bg-card from-transparent p-6 shadow transition-shadow">
    <div className="absolute top-0 left-0 h-[110px] w-full rounded-lg bg-gradient-to-t from-transparent to-dark opacity-[8%] "></div>
    <div className="flex h-[70px] w-[70px] items-center justify-center">
      <Loader size={72} />
    </div>
  </div>
)
