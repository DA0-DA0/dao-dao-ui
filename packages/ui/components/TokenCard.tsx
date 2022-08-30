import { PlusIcon } from '@heroicons/react/outline'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { EdamameCrown, SubdirectoryArrowRight } from '@dao-dao/icons'

import { IconButton } from './IconButton'
import { Tooltip } from './Tooltip'

export interface TokenStake {
  amount: number
  validator: string
  rewards: number
}

export interface TokenCardProps {
  crown?: boolean
  tokenSymbol: string
  subtitle?: string
  imageUrl: string
  totalBalance: number
  tokenDecimals: number
  usdcUnitPrice: number
  stakes?: TokenStake[]
  onAddToken?: () => null
}

export const TokenCard = ({
  crown,
  tokenSymbol,
  subtitle,
  imageUrl,
  totalBalance,
  tokenDecimals,
  usdcUnitPrice,
  stakes,
  onAddToken,
}: TokenCardProps) => {
  const { t } = useTranslation()

  const totalStaked = useMemo(
    () => stakes?.reduce((acc, curr) => acc + curr.amount, 0) ?? 0,
    [stakes]
  )
  const totalRewards = useMemo(
    () => stakes?.reduce((acc, curr) => acc + curr.rewards, 0) ?? 0,
    [stakes]
  )

  return (
    <div className="bg-background-tertiary rounded-lg">
      <div className="relative p-5">
        <div className="flex flex-row gap-4">
          <div className="relative">
            {/* Image */}
            <div
              className="w-10 h-10 bg-center rounded-full bg-fill"
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            ></div>

            {/* Crown */}
            {!!crown && (
              <EdamameCrown
                className="absolute -top-4 -left-6 text-secondary stroke-2"
                height="32px"
                width="32px"
              />
            )}
          </div>

          {/* Titles */}
          <div className="flex flex-col gap-1">
            <p className="title-text">${tokenSymbol}</p>
            <p className="caption-text">{subtitle}</p>
          </div>
        </div>

        {onAddToken && (
          <div className="absolute top-3 right-3">
            {/* TODO: Fix tooltip location. */}
            <Tooltip label={t('info.addTokenTooltip')}>
              <IconButton
                Icon={PlusIcon}
                circular
                onClick={onAddToken}
                variant="ghost"
              />
            </Tooltip>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 py-4 px-6 border-t border-inactive">
        <div className="flex flex-row gap-8 justify-between items-center">
          <p className="link-text">{t('info.totalHoldings')}</p>
          <p className="font-mono text-right text-text-body caption-text">
            {totalBalance.toLocaleString(undefined, {
              maximumFractionDigits: tokenDecimals,
            })}{' '}
            ${tokenSymbol}
          </p>
        </div>

        <div className="flex flex-row gap-8 justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <SubdirectoryArrowRight className="w-4 h-4 text-icon-secondary" />
            <p className="secondary-text">{t('info.conversion')}</p>
          </div>

          <p className="font-mono text-right caption-text">
            {t('format.token', {
              val: totalBalance * usdcUnitPrice,
              tokenSymbol: 'USDC',
            })}
          </p>
        </div>
      </div>

      {!!stakes?.length && (
        <div className="flex flex-col gap-2 px-6 pt-4 pb-6 border-t border-inactive">
          <p className="mb-1 link-text">{t('info.stakes')}</p>

          <div className="flex flex-row gap-8 justify-between items-center">
            <p className="secondary-text">{t('info.staked')}</p>

            <p className="font-mono text-right text-text-body caption-text">
              {totalStaked.toLocaleString(undefined, {
                maximumFractionDigits: tokenDecimals,
              })}{' '}
              ${tokenSymbol}
            </p>
          </div>

          <div className="flex flex-row gap-8 justify-between items-center">
            <p className="secondary-text">
              {t('info.validators', { count: stakes.length })}
            </p>

            <p className="font-mono text-right text-text-body caption-text">
              {stakes[0].validator}
              {stakes.length > 1 && (
                <>
                  ,{' '}
                  <Tooltip
                    label={
                      <>
                        {stakes.slice(1).map(({ validator }, index) => (
                          <p key={index}>{validator}</p>
                        ))}
                      </>
                    }
                  >
                    <span className="underline cursor-pointer">
                      {t('info.andNumMore', { count: stakes.length - 1 })}
                    </span>
                  </Tooltip>
                </>
              )}
            </p>
          </div>

          <div className="flex flex-row gap-8 justify-between items-center">
            <p className="secondary-text">{t('info.rewards')}</p>

            <p className="font-mono text-right text-text-body caption-text">
              {totalRewards.toLocaleString(undefined, {
                maximumFractionDigits: tokenDecimals,
              })}{' '}
              ${tokenSymbol}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
