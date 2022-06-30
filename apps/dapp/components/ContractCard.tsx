import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, ReactNode, useState } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { Dao, Pencil, Votes } from '@dao-dao/icons'
import { Logo } from '@dao-dao/ui'
import {
  CARD_IMAGES_ENABLED,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'

interface ContractCardBaseProps {
  title: string
  body: string
  href: string
  votingPowerPercent?: string
  proposals?: number
  balance?: string
  children: ReactNode
  selected?: boolean
  setLoading: (loading: boolean) => void
}

const ContractCardBase: FC<ContractCardBaseProps> = ({
  title,
  body,
  href,
  votingPowerPercent,
  proposals,
  balance,
  children,
  selected,
  setLoading,
}) => {
  const { t } = useTranslation()

  return (
    <Link href={href}>
      <a onClick={() => setLoading(true)}>
        <div
          className={clsx(
            'relative flex h-[320px] w-[260px] flex-col items-center justify-between rounded-lg bg-card from-transparent p-6 hover:outline hover:outline-1 hover:outline-brand',
            selected && 'outline outline-1 outline-brand'
          )}
        >
          <div className="absolute top-0 left-0 h-[110px] w-full rounded-lg bg-gradient-to-t from-transparent to-dark opacity-[8%] "></div>
          <div className="flex max-w-full flex-col items-center">
            {children}
            <h3 className="text-md mt-3 max-w-full truncate font-semibold">
              {title}
            </h3>
            <p className="mt-2 break-words text-center font-mono text-xs text-secondary line-clamp-3">
              {body}
            </p>
          </div>
          <div className="items-left flex flex-col gap-1">
            {balance && (
              <p className="text-sm">
                <Dao className="mr-2 mb-1 inline w-4" fill="currentColor" />
                {convertMicroDenomToDenomWithDecimals(
                  balance,
                  NATIVE_DECIMALS
                )}{' '}
                {nativeTokenLabel(NATIVE_DENOM)}
              </p>
            )}
            {proposals !== undefined && (
              <p className="text-sm">
                <Pencil className="mr-2 mb-1 inline w-4" fill="currentColor" />
                {t('info.numProposals', { count: proposals })}
              </p>
            )}
            {votingPowerPercent && (
              <div className="text-success flex flex-row gap-2 text-sm text-valid">
                <Votes className="h-5 w-4" fill="currentColor" />
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
  )
}

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

export const ContractCard: FC<ContractCardProps> = ({
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
}) => {
  const { t } = useTranslation()

  // Next.js takes some time to render a DAO page on first load. Let's
  // indicate to the user something is happening while this is loading.
  const [loading, setLoading] = useState(false)

  return (
    <div className="relative w-min">
      <ContractCardBase
        balance={balance}
        body={description}
        href={href}
        proposals={proposals}
        selected={selected}
        setLoading={setLoading}
        title={name}
        votingPowerPercent={votingPowerPercent}
      >
        <div className={clsx({ 'animate-spin-medium': _loading || loading })}>
          {imgUrl && CARD_IMAGES_ENABLED ? (
            <div
              aria-label={t('info.daosLogo')}
              className="h-[80px] w-[80px] rounded-full bg-cover bg-center"
              role="img"
              style={{
                backgroundImage: `url(${imgUrl})`,
              }}
            ></div>
          ) : (
            <Logo alt={name} height={80} width={80} />
          )}
        </div>
      </ContractCardBase>
      <button
        className="absolute top-[18px] right-[18px] text-brand"
        onClick={onPin ? (_) => onPin() : undefined}
      >
        {pinned !== undefined ? (
          pinned ? (
            <HeartIconSolid className="h-[18px] w-[18px]" />
          ) : (
            <HeartIconOutline className="h-[18px] w-[18px]" />
          )
        ) : undefined}
      </button>
    </div>
  )
}

export const LoadingContractCard = () => (
  <div className="relative flex h-[320px] w-[260px] flex-col items-center justify-center  rounded-lg bg-card from-transparent p-6 shadow transition-shadow">
    <div className="absolute top-0 left-0 h-[110px] w-full rounded-lg bg-gradient-to-t from-transparent to-dark opacity-[8%] "></div>
    <div className="flex h-[70px] w-[70px] items-center justify-center">
      <div className="inline-block animate-spin-medium">
        <Logo height={72} width={72} />
      </div>
    </div>
  </div>
)
