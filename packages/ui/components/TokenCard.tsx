import { PlusIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { EdamameCrown } from '@dao-dao/icons'

import { IconButton } from './IconButton'
import { Tooltip } from './Tooltip'

export interface TokenCardProps {
  crown?: boolean
  tokenSymbol: string
  tokenImageUrl: string
  tokenBalance: string
  tokenUSDCPrice: string
  tokenBalanceUSDCEquivalent: string
  onAddToken?: () => null
}

export const TokenCard = ({
  tokenImageUrl,
  tokenSymbol,
  tokenBalance,
  tokenUSDCPrice,
  tokenBalanceUSDCEquivalent,
  onAddToken,
  crown,
}: TokenCardProps) => {
  const { t } = useTranslation()

  return (
    <div className="rounded-lg border border-default">
      <div className="flex flex-row justify-between p-5 border-b border-inactive">
        <div className="relative">
          <div className="flex flex-row gap-4">
            <div
              className="w-10 h-10 bg-center rounded-full bg-fill"
              style={{
                backgroundImage: `url(${tokenImageUrl})`,
              }}
            ></div>
            <div className="flex flex-col gap-1">
              <p className="title-text">${tokenSymbol}</p>
              <p className="caption-text">
                {t('format.usdc', { val: tokenUSDCPrice })}
              </p>
            </div>
          </div>
          {!!crown && (
            <EdamameCrown
              className="absolute -top-4 -left-[24px] stroke-current"
              height="32px"
              width="32px"
            />
          )}{' '}
        </div>
        {!!onAddToken && (
          <Tooltip label={t('info.addTokenTooltip')}>
            <IconButton
              icon={<PlusIcon className="w-full h-full" />}
              onClick={onAddToken}
              variant="ghost"
            />
          </Tooltip>
        )}
      </div>
      <div className="flex justify-between py-4 px-5">
        <p className="secondary-text">{t('info.daoBalance')}</p>
        <p className="font-mono text-black caption-text">
          {tokenBalance} ${tokenSymbol}{' '}
          <span className="caption-text">
            {t('format.usdc', { val: tokenBalanceUSDCEquivalent })}
          </span>
        </p>
      </div>
    </div>
  )
}
