import { Build } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TokenCardInfo, ValenceAccountTreasuryProps } from '@dao-dao/types'
import { serializeTokenSource } from '@dao-dao/utils'

import { useChain } from '../hooks'
import { CopyToClipboard } from './CopyToClipboard'
import { ErrorPage } from './error'
import { Loader } from './logo'
import { Tooltip, TooltipInfoIcon } from './tooltip'

export const ValenceAccountTreasury = <T extends TokenCardInfo>({
  account,
  tokens,
  TokenLine,
  TreasuryHistoryGraph,
  ButtonLink,
  IconButtonLink,
  configureRebalancerHref,
  className,
  inline,
}: ValenceAccountTreasuryProps<T>) => {
  const { t } = useTranslation()
  const { bech32_prefix: bech32Prefix } = useChain()

  const valenceAccountRebalancerTargets =
    account.config?.rebalancer?.targets.map(({ source }) =>
      serializeTokenSource(source)
    ) || []

  // Maps serialized token source to color.
  const [tokenSourceColorMap, setTokenSourceColorMap] = useState<
    Record<string, string>
  >({})

  // Rebalanced tokens
  const rebalancedTokens =
    tokens.loading || tokens.errored
      ? []
      : tokens.data.filter(({ token }) =>
          valenceAccountRebalancerTargets.includes(serializeTokenSource(token))
        )
  // Other tokens
  const otherTokens =
    tokens.loading || tokens.errored
      ? []
      : tokens.data.filter((token) => !rebalancedTokens.includes(token))

  return (
    <div className={className}>
      {!inline && (
        <div className="mb-3 flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
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
      )}

      <div
        className={clsx(
          'flex flex-col gap-4',
          !inline &&
            'rounded-lg border border-dashed border-border-primary bg-background-tertiary p-3 sm:p-4 lg:p-5'
        )}
      >
        {tokens.loading ||
        (!tokens.errored && tokens.updating && tokens.data.length === 0) ? (
          <Loader className="my-12" size={48} />
        ) : tokens.errored ? (
          <ErrorPage title={t('error.unexpectedError')}>
            <pre className="whitespace-pre-wrap text-xs text-text-interactive-error">
              {tokens.error instanceof Error
                ? tokens.error.message
                : `${tokens.error}`}
            </pre>
          </ErrorPage>
        ) : (
          tokens.data.length > 0 && (
            <>
              {account.config.rebalancer && (
                <div className="mb-6 flex flex-col gap-2 px-8">
                  <div className="relative flex flex-row items-center justify-center gap-1">
                    <p className="title-text">{t('title.rebalancer')}</p>

                    <TooltipInfoIcon
                      size="sm"
                      title={t('info.rebalancerGraphTooltip')}
                    />

                    {!!configureRebalancerHref && (
                      <Tooltip title={t('title.configureRebalancer')}>
                        <IconButtonLink
                          Icon={Build}
                          containerClassName="absolute right-0"
                          href={configureRebalancerHref}
                          size="sm"
                          variant="ghost"
                        />
                      </Tooltip>
                    )}
                  </div>

                  <TreasuryHistoryGraph
                    account={account}
                    address={account.address}
                    chainId={account.chainId}
                    registerTokenColors={setTokenSourceColorMap}
                    showRebalancer
                  />
                </div>
              )}

              <div className="flex flex-col gap-1">
                {account.config.rebalancer && (
                  <>
                    <TokenHeader className="pl-8" />

                    {rebalancedTokens.map((props, index) => (
                      <TokenLine
                        {...props}
                        key={index}
                        color={
                          tokenSourceColorMap[serializeTokenSource(props.token)]
                        }
                        noExtraActions
                      />
                    ))}

                    {!inline && (
                      <div className="-mx-3 mt-4 h-[1px] bg-border-primary sm:-mx-4 lg:-mx-5"></div>
                    )}

                    <p className="title-text mt-8 mb-4">
                      {t('title.nonRebalancedTokens')}
                    </p>
                  </>
                )}

                <TokenHeader className="pl-4" />

                {otherTokens.map((props, index) => (
                  <TokenLine
                    {...props}
                    key={index}
                    color={
                      tokenSourceColorMap[serializeTokenSource(props.token)]
                    }
                    noExtraActions
                  />
                ))}

                {!!configureRebalancerHref && !account.config.rebalancer && (
                  <ButtonLink
                    containerClassName="self-end mt-2"
                    href={configureRebalancerHref}
                    variant="secondary"
                  >
                    {t('button.setUpRebalancer')}
                  </ButtonLink>
                )}
              </div>
            </>
          )
        )}
      </div>
    </div>
  )
}

type TokenHeaderProps = {
  className?: string
}

const TokenHeader = ({ className }: TokenHeaderProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'secondary-text grid grid-cols-2 items-center gap-4 pr-4 sm:grid-cols-[2fr_1fr_1fr]',
        className
      )}
    >
      <p>{t('title.token')}</p>

      <p className="text-right">{t('title.total')}</p>

      <div className="hidden flex-row items-center justify-end gap-1 sm:flex">
        <p className="text-right">{t('title.estUsdValue')}</p>
        <TooltipInfoIcon size="xs" title={t('info.estimatedUsdValueTooltip')} />
      </div>
    </div>
  )
}
