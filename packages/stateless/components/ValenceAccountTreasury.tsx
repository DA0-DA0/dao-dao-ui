import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TokenCardInfo, ValenceAccountTreasuryProps } from '@dao-dao/types'
import { serializeTokenSource } from '@dao-dao/utils'

import { useChain } from '../hooks'
import { CopyToClipboard } from './CopyToClipboard'
import { SwitchCard } from './inputs/Switch'
import { Loader } from './logo'
import { TooltipInfoIcon } from './tooltip'

export const ValenceAccountTreasury = <T extends TokenCardInfo>({
  account,
  tokens,
  TokenLine,
  TreasuryHistoryGraph,
  ButtonLink,
  configureRebalancerHref,
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

  const [tokenSourceColorMap, setTokenSourceColorMap] = useState<
    Record<string, string>
  >({})

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
              {(account.config.rebalancer || configureRebalancerHref) && (
                <div className="flex flex-row flex-wrap justify-between gap-x-6 gap-y-2">
                  {account.config.rebalancer ? (
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
                  ) : (
                    <div></div>
                  )}

                  {!!configureRebalancerHref && (
                    <ButtonLink
                      href={configureRebalancerHref}
                      variant="secondary"
                    >
                      {t('title.configureRebalancer')}
                    </ButtonLink>
                  )}
                </div>
              )}

              <TreasuryHistoryGraph
                account={account}
                address={account.address}
                chainId={account.chainId}
                className="px-8"
                registerTokenColors={setTokenSourceColorMap}
                showRebalancer={valenceAccountMode === 'rebalancer'}
              />

              <div className="space-y-1">
                <div className="secondary-text mb-2 grid grid-cols-2 items-center gap-4 pl-8 pr-4 sm:grid-cols-[2fr_1fr_1fr]">
                  <p>{t('title.token')}</p>

                  <p className="text-right">{t('title.total')}</p>

                  <div className="hidden flex-row items-center justify-end gap-1 sm:flex">
                    <p className="text-right">{t('title.estUsdValue')}</p>
                    <TooltipInfoIcon
                      size="xs"
                      title={t('info.estimatedUsdValueTooltip')}
                    />
                  </div>
                </div>

                {tokens.data
                  .filter(
                    ({ token }) =>
                      valenceAccountMode !== 'rebalancer' ||
                      valenceAccountRebalancerTargets.includes(
                        serializeTokenSource(token)
                      )
                  )
                  .map((props, index) => (
                    <TokenLine
                      {...props}
                      key={index}
                      color={
                        tokenSourceColorMap[serializeTokenSource(props.token)]
                      }
                      noExtraActions
                    />
                  ))}
              </div>
            </>
          )
        )}
      </div>
    </div>
  )
}
