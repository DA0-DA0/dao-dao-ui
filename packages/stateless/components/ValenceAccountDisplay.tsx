import { Build } from '@mui/icons-material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TokenCardInfo, ValenceAccountDisplayProps } from '@dao-dao/types'
import { serializeTokenSource } from '@dao-dao/utils'

import { ErrorPage } from './error'
import { Loader } from './logo'
import { TokenLineHeader } from './token'
import { Tooltip, TooltipInfoIcon } from './tooltip'

export const ValenceAccountDisplay = <T extends TokenCardInfo>({
  account,
  tokens,
  TokenLine,
  TreasuryHistoryGraph,
  ButtonLink,
  IconButtonLink,
  configureRebalancerHref,
  className,
}: ValenceAccountDisplayProps<T>) => {
  const { t } = useTranslation()

  const valenceAccountRebalancerTargets =
    account.config?.rebalancer?.targets.map(({ token }) =>
      serializeTokenSource(token)
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
      <div className="mb-4 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <p className="title-text">{t('title.rebalancer')}</p>

          <TooltipInfoIcon
            size="sm"
            title={
              // TODO(rebalancer): Add description.
              'What is the Rebalancer'
            }
          />
        </div>

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

      <div className="flex flex-col gap-4">
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
                <TreasuryHistoryGraph
                  account={account}
                  address={account.address}
                  chainId={account.chainId}
                  className="mb-8 hidden rounded-md bg-background-tertiary p-6 sm:flex"
                  graphClassName="max-h-[20rem]"
                  registerTokenColors={setTokenSourceColorMap}
                  showRebalancer
                />
              )}

              <div className="flex flex-col gap-1">
                {account.config.rebalancer && (
                  <>
                    <TokenLineHeader className="!mb-2" />

                    {rebalancedTokens.map((props, index) => (
                      <TokenLine
                        {...props}
                        key={index}
                        color={
                          tokenSourceColorMap[serializeTokenSource(props.token)]
                        }
                        noExtraActions
                        transparentBackground={index % 2 !== 0}
                      />
                    ))}

                    {otherTokens.length > 0 && (
                      <>
                        <div className="my-4 h-[1px] bg-border-primary"></div>

                        <p className="title-text my-4">
                          {t('title.nonRebalancedTokens')}
                        </p>
                      </>
                    )}
                  </>
                )}

                {otherTokens.length > 0 && (
                  <TokenLineHeader className="!mb-2" />
                )}

                {otherTokens.map((props, index) => (
                  <TokenLine
                    {...props}
                    key={index}
                    color={
                      tokenSourceColorMap[serializeTokenSource(props.token)]
                    }
                    noExtraActions
                    transparentBackground={index % 2 !== 0}
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
