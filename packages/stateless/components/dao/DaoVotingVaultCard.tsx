import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { DaoVotingVaultCardProps } from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { TooltipInfoIcon } from '../tooltip'

export const DaoVotingVaultCard = ({
  vault: { name, description },
  vaultVotingPowerPercent,
  walletVotingPowerPercent,
  virtual,
}: DaoVotingVaultCardProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'relative flex flex-col justify-between overflow-hidden rounded-md border border-border-primary',
        virtual && 'border-dashed'
      )}
    >
      {virtual && (
        <div className="absolute top-[1rem] left-[-6.5rem] flex w-60 -rotate-45 flex-row items-center justify-center gap-1 bg-background-primary py-1.5 px-36">
          <p className="primary-text grow text-center text-xs font-bold text-text-primary">
            {t('title.virtual')}
          </p>
          <TooltipInfoIcon
            size="xs"
            title={t('info.virtualVotingVaultTooltip')}
          />
        </div>
      )}

      <div className="flex flex-col items-center gap-4 p-6 sm:p-10">
        {/* Name */}
        <p className="title-text px-4 text-center">{name}</p>

        <p className="body-text px-4 text-center text-text-secondary">
          {DESCRIPTION_OVERRIDES[name] || description}
        </p>
      </div>

      <div className="flex flex-col gap-2 border-t border-border-interactive-disabled p-4">
        {/* Vault voting power */}
        <div className="flex flex-row flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <div className="flex flex-row items-center gap-1">
            <p className="secondary-text">{t('info.vaultVotingPower')}</p>
            <TooltipInfoIcon
              size="xs"
              title={t('info.vaultVotingPowerTooltip')}
            />
          </div>

          <p
            className={clsx(
              'body-text font-mono',
              vaultVotingPowerPercent.loading && 'animate-pulse'
            )}
          >
            {vaultVotingPowerPercent.loading
              ? '...'
              : formatPercentOf100(vaultVotingPowerPercent.data)}
          </p>
        </div>

        {/* Wallet's voting power. Hide if undefined because no wallet. */}
        {(walletVotingPowerPercent.loading ||
          walletVotingPowerPercent.data !== undefined) && (
          <div className="flex flex-row flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <div className="flex flex-row items-center gap-1">
              <p className="secondary-text">{t('info.yourVaultVotingPower')}</p>
              <TooltipInfoIcon
                size="xs"
                title={t('info.yourVaultVotingPowerTooltip')}
              />
            </div>

            <p
              className={clsx(
                'body-text font-mono',
                walletVotingPowerPercent.loading && 'animate-pulse'
              )}
            >
              {walletVotingPowerPercent.loading
                ? '...'
                : formatPercentOf100(walletVotingPowerPercent.data || 0)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Override description for a vault.
const DESCRIPTION_OVERRIDES: Partial<Record<string, string>> = {
  'Lockdrop Vault':
    'Voting power generated by the LP tokens locked during the Lockdrop phase of the launch event',
  'Credits Vault': 'Voting power generated by the vested airdrop tokens',
  'Investors Vault':
    'Voting power provider for locked/vested tokens of seed funding round backers',
  'LP Vault':
    "Voting power generated by LP tokens from the Liquid Auction that were not locked at the launch event's Lockdrop.",
  'Grants SubDAO Vault': 'Voting power generated by vested grant payments',
  'CREDITS VAULT': 'Voting power generated by the vested airdrop tokens',
}
