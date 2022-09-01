import { PlusIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EdamameCrown } from '@dao-dao/icons'

import { UnstakingModal, UnstakingTask, UnstakingTaskStatus } from 'components'

import { Button } from './Button'
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
  unstakedBalance: number
  unstakingTasks: UnstakingTask[]
  tokenDecimals: number
  usdcUnitPrice: number
  unstakingDuration: string
  stakes?: TokenStake[]
  onAddToken?: () => void
  onClickRewards: () => void
  onClaim: () => void
}

export const TokenCard = ({
  crown,
  tokenSymbol,
  subtitle,
  imageUrl,
  totalBalance,
  unstakedBalance,
  unstakingTasks,
  tokenDecimals,
  usdcUnitPrice,
  unstakingDuration,
  stakes,
  onAddToken,
  onClickRewards,
  onClaim,
}: TokenCardProps) => {
  const { t } = useTranslation()

  const totalStaked = useMemo(
    () => stakes?.reduce((acc, stake) => acc + stake.amount, 0) ?? 0,
    [stakes]
  )
  const pendingRewards = useMemo(
    () => stakes?.reduce((acc, stake) => acc + stake.rewards, 0) ?? 0,
    [stakes]
  )
  const unstakingBalance = useMemo(
    () =>
      unstakingTasks.reduce(
        (acc, task) =>
          acc +
          // Only include balance of unstaking tasks.
          (task.status === UnstakingTaskStatus.Unstaking ? task.amount : 0),
        0
      ) ?? 0,
    [unstakingTasks]
  )

  const [showUnstakingTokens, setShowUnstakingTokens] = useState(false)

  return (
    <>
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
              <Tooltip title={t('info.addTokenTooltip')}>
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
          <div className="flex flex-row gap-8 justify-between items-start">
            <p className="link-text">{t('info.totalHoldings')}</p>
            {/* leading-5 to match link-text's line-height. */}
            <div className="flex flex-col gap-1 items-end font-mono text-right caption-text">
              <p className="leading-5 text-text-body">
                {totalBalance.toLocaleString(undefined, {
                  maximumFractionDigits: tokenDecimals,
                })}{' '}
                ${tokenSymbol}
              </p>
              <p>
                {t('format.token', {
                  val: totalBalance * usdcUnitPrice,
                  tokenSymbol: 'USDC',
                })}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-8 justify-between items-start">
            <p className="link-text">{t('info.availableBalance')}</p>
            {/* leading-5 to match link-text's line-height. */}
            <div className="flex flex-col gap-1 items-end font-mono text-right caption-text">
              <p className="leading-5 text-text-body">
                {unstakedBalance.toLocaleString(undefined, {
                  maximumFractionDigits: tokenDecimals,
                })}{' '}
                ${tokenSymbol}
              </p>
              <p>
                {t('format.token', {
                  val: unstakedBalance * usdcUnitPrice,
                  tokenSymbol: 'USDC',
                })}
              </p>
            </div>
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
                      title={
                        <>
                          {stakes.slice(1).map(({ validator }, index) => (
                            <p key={index}>{validator}</p>
                          ))}
                        </>
                      }
                    >
                      <span className="underline underline-offset-2 cursor-pointer">
                        {t('info.andNumMore', { count: stakes.length - 1 })}
                      </span>
                    </Tooltip>
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-row gap-8 justify-between items-center">
              <p className="secondary-text">{t('info.pendingRewards')}</p>

              <Tooltip title={t('info.createClaimProposal')}>
                <Button
                  className="font-mono text-right text-text-body underline-offset-2 caption-text"
                  onClick={onClickRewards}
                  variant="underline"
                >
                  {pendingRewards.toLocaleString(undefined, {
                    maximumFractionDigits: tokenDecimals,
                  })}{' '}
                  ${tokenSymbol}
                </Button>
              </Tooltip>
            </div>

            <div className="flex flex-row gap-8 justify-between items-center">
              <p className="secondary-text">{t('title.unstakingTokens')}</p>

              <Button
                className={clsx(
                  'font-mono text-right underline-offset-2 caption-text',
                  unstakingBalance > 0 && 'text-text-body'
                )}
                onClick={() => setShowUnstakingTokens(true)}
                variant="underline"
              >
                {unstakingBalance.toLocaleString(undefined, {
                  maximumFractionDigits: tokenDecimals,
                })}{' '}
                ${tokenSymbol}
              </Button>
            </div>
          </div>
        )}
      </div>

      {showUnstakingTokens && (
        <UnstakingModal
          onClaim={onClaim}
          onClose={() => setShowUnstakingTokens(false)}
          tasks={unstakingTasks}
          unstakingDuration={unstakingDuration}
        />
      )}
    </>
  )
}
