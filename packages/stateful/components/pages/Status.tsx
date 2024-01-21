import clsx from 'clsx'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  indexerUpStatusSelector,
  refreshIndexerUpStatusAtom,
} from '@dao-dao/state'
import {
  ChainLogo,
  ErrorPage,
  PageHeaderContent,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  SITE_URL,
  formatDateTimeTz,
  getDisplayNameForChainId,
  getSupportedChains,
} from '@dao-dao/utils'

export const StatusPage = () => {
  const { t } = useTranslation()
  const { asPath } = useRouter()

  const chains = getSupportedChains().filter((c) => !c.noIndexer)

  // Refresh every 3 seconds.
  const setRefreshIndexerStatus = useSetRecoilState(refreshIndexerUpStatusAtom)
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIndexerStatus((id) => id + 1)
    }, 3 * 1000)

    return () => clearInterval(interval)
  }, [setRefreshIndexerStatus])

  return (
    <>
      <NextSeo
        description={t('info.statusPageDescription')}
        openGraph={{
          url: SITE_URL + asPath,
          title: t('title.status'),
          description: t('info.statusPageDescription'),
        }}
        title={t('title.status')}
      />

      <PageHeaderContent
        className="mx-auto max-w-5xl"
        title={t('title.status')}
      />

      <div className="mx-auto flex max-w-5xl flex-col gap-2">
        <p className="primary-text mb-4">{t('info.statusPageDescription')}</p>

        {chains.map(({ chainId }) => (
          <ChainStatus key={chainId} chainId={chainId} />
        ))}
      </div>
    </>
  )
}

type ChainStatusProps = {
  chainId: string
}

const ChainStatus = ({ chainId }: ChainStatusProps) => {
  const { t } = useTranslation()
  const upStatus = useCachedLoadingWithError(
    indexerUpStatusSelector({ chainId })
  )

  return (
    <div
      key={chainId}
      className="flex flex-col gap-3 rounded-md bg-background-tertiary p-3 xs:gap-4 xs:p-4"
    >
      <div className="flex flex-row items-start justify-between gap-x-4 gap-y-2">
        <div className="flex flex-row items-center gap-2 xs:gap-3">
          <ChainLogo chainId={chainId} className="xs:hidden" size={22} />
          <ChainLogo chainId={chainId} className="hidden xs:block" size={28} />

          <p className="title-text xs:header-text">
            {getDisplayNameForChainId(chainId)}
          </p>
        </div>

        <div
          className={clsx(
            'flex flex-row items-center gap-2 rounded-full bg-background-overlay p-2 xs:p-3',
            upStatus.loading && 'animate-pulse'
          )}
        >
          <div
            className={clsx(
              'h-3 w-3 shrink-0 rounded-full xs:h-4 xs:w-4',
              upStatus.loading
                ? 'bg-icon-interactive-active'
                : !upStatus.errored && upStatus.data.caughtUp
                ? 'bg-icon-interactive-valid'
                : 'bg-icon-interactive-error'
            )}
          ></div>

          <p className="primary-text">
            {upStatus.loading
              ? t('info.loading')
              : upStatus.errored
              ? t('info.errored')
              : upStatus.data.caughtUp
              ? t('info.upToDate')
              : t('info.catchingUp')}
          </p>
        </div>
      </div>

      {!upStatus.loading && !upStatus.errored && !upStatus.data.caughtUp && (
        <div className="flex flex-row items-center justify-between gap-4">
          <p className="secondary-text text-text-interactive-error">
            {t('info.blocksBehind')}
          </p>

          <p className="font-mono text-text-interactive-error">
            {(
              upStatus.data.chainBlock.height -
              upStatus.data.indexerBlock.height
            ).toLocaleString()}
          </p>
        </div>
      )}

      <div className="flex flex-row items-start justify-between gap-3 xs:gap-4">
        <p className="secondary-text shrink-0">{t('info.lastBlock')}</p>

        <div
          className={clsx(
            'flex flex-col items-end gap-2 break-words text-right font-mono text-sm xs:text-base',
            upStatus.loading && 'animate-pulse'
          )}
        >
          <p>
            {!upStatus.loading && !upStatus.errored
              ? upStatus.data.indexerBlock.height.toLocaleString()
              : '...'}
          </p>

          <p>
            {!upStatus.loading && !upStatus.errored
              ? formatDateTimeTz(new Date(upStatus.data.indexerBlock.timestamp))
              : '...'}
          </p>
        </div>
      </div>

      {upStatus.errored && <ErrorPage error={upStatus.error} />}
    </div>
  )
}
