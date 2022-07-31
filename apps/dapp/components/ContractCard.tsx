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
              'flex relative flex-col justify-between items-center p-6 w-full h-[320px] bg-card from-transparent rounded-lg hover:outline-1 hover:outline-brand hover:outline',
              selected && 'outline-1 outline-brand outline'
            )}
          >
            <div className="absolute top-0 left-0 w-full h-[110px] bg-gradient-to-t from-transparent to-dark rounded-lg opacity-[8%]"></div>
            <div className="flex flex-col items-center self-stretch">
              <div
                className={clsx({ 'animate-spin-medium': _loading || loading })}
              >
                {imgUrl ? (
                  <div
                    aria-label={t('info.daosLogo')}
                    className="w-[80px] h-[80px] bg-center bg-cover rounded-full"
                    role="img"
                    style={{
                      backgroundImage: `url(${imgUrl})`,
                    }}
                  ></div>
                ) : (
                  <Logo size={80} />
                )}
              </div>

              <h3 className="mt-3 max-w-full font-semibold truncate text-md">
                {name}
              </h3>
              <p className="mt-2 font-mono text-xs text-center text-secondary break-words line-clamp-3">
                {description}
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
                  {nativeTokenLabel(NATIVE_DENOM)}
                </p>
              )}
              {proposals !== undefined && (
                <p className="text-sm">
                  <Pencil
                    className="inline mr-2 mb-1 w-4"
                    fill="currentColor"
                  />
                  {t('info.numProposals', { count: proposals })}
                </p>
              )}
              {votingPowerPercent && (
                <div className="flex flex-row gap-2 text-sm text-valid text-success">
                  <Votes className="w-4 h-5" fill="currentColor" />
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
            <PinSolid className="w-4 h-4" />
          ) : (
            <PinOutline className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  )
}

export const LoadingContractCard = () => (
  <div className="flex relative flex-col justify-center items-center p-6 w-full h-[320px] bg-card from-transparent rounded-lg shadow transition-shadow">
    <div className="absolute top-0 left-0 w-full h-[110px] bg-gradient-to-t from-transparent to-dark rounded-lg opacity-[8%] "></div>
    <div className="flex justify-center items-center w-[70px] h-[70px]">
      <Loader size={72} />
    </div>
  </div>
)
