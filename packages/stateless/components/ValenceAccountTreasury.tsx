import clsx from 'clsx'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  LoadingData,
  TokenCardInfo,
  TreasuryHistoryGraphProps,
  ValenceAccount,
} from '@dao-dao/types'
import { serializeTokenSource } from '@dao-dao/utils'

import { useChain } from '../hooks'
import { CopyToClipboard } from './CopyToClipboard'
import { GridCardContainer } from './GridCardContainer'
import { SwitchCard } from './inputs/Switch'
import { Loader } from './logo'
import { TooltipInfoIcon } from './tooltip'

export type ValenceAccountTreasuryProps<T extends TokenCardInfo> = {
  account: ValenceAccount
  tokens: LoadingData<T[]>
  TokenCard: ComponentType<T>
  TreasuryHistoryGraph: ComponentType<TreasuryHistoryGraphProps>
  className?: string
}

export const ValenceAccountTreasury = <T extends TokenCardInfo>({
  account,
  tokens,
  TokenCard,
  TreasuryHistoryGraph,
  className,
}: ValenceAccountTreasuryProps<T>) => {
  const { t } = useTranslation()
  const { bech32_prefix: bech32Prefix } = useChain()

  const [valenceAccountMode, setValenceAccountMode] = useState<
    'all' | 'rebalancer'
  >('all')

  const valenceAccountRebalancerTargets =
    account.config?.rebalancer?.targets.map(({ source }) =>
      serializeTokenSource(source)
    ) || []

  return (
    <div className={clsx('space-y-3', className)}>
      <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex flex-row items-center gap-1">
          <p className="primary-text">{t('title.valenceAccount')}</p>
          <TooltipInfoIcon
            size="sm"
            title={
              // TODO(rebalancer): Add description.
              'What is a Valence Account'
            }
          />
        </div>

        <CopyToClipboard
          className="!gap-2 rounded-md bg-background-tertiary p-2 font-mono transition hover:bg-background-secondary"
          takeStartEnd={{
            start: bech32Prefix.length + 6,
            end: 6,
          }}
          textClassName="!bg-transparent !p-0"
          tooltip={t('button.clickToCopyAddress')}
          value={account.address}
        />
      </div>

      <div className="flex flex-col gap-8 rounded-lg border border-dashed border-border-primary bg-background-tertiary p-3 sm:p-4 lg:p-5">
        {tokens.loading || (tokens.updating && tokens.data.length === 0) ? (
          <Loader className="my-12" size={48} />
        ) : (
          tokens.data.length > 0 && (
            <>
              {account.config.rebalancer && (
                <SwitchCard
                  containerClassName="-mb-2 self-start"
                  enabled={valenceAccountMode === 'rebalancer'}
                  label="Only Rebalancer"
                  onClick={() =>
                    setValenceAccountMode((value) =>
                      value === 'rebalancer' ? 'all' : 'rebalancer'
                    )
                  }
                  sizing="sm"
                />
              )}

              <TreasuryHistoryGraph
                account={account}
                address={account.address}
                chainId={account.chainId}
                className="px-8"
                showRebalancer={valenceAccountMode === 'rebalancer'}
              />

              <GridCardContainer cardType="wide">
                {tokens.data
                  .filter(
                    ({ token }) =>
                      valenceAccountMode !== 'rebalancer' ||
                      valenceAccountRebalancerTargets.includes(
                        serializeTokenSource(token)
                      )
                  )
                  .map((props, index) => (
                    <TokenCard {...props} key={index} noExtraActions />
                  ))}
              </GridCardContainer>
            </>
          )
        )}
      </div>
    </div>
  )
}
