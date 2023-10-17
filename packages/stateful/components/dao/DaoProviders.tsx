import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ChainProvider,
  DaoInfoContext,
  ErrorPage,
  Loader,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { DaoInfo } from '@dao-dao/types'

import { DaoActionsProvider } from '../../actions'
import { daoInfoSelector } from '../../recoil'
import { VotingModuleAdapterProvider } from '../../voting-module-adapter'
import { SuspenseLoader } from '../SuspenseLoader'

export type DaoProvidersProps = {
  info: DaoInfo
  children: ReactNode
}

export const DaoProviders = ({ info, children }: DaoProvidersProps) => (
  // Add a unique key here to tell React to re-render everything when the
  // `coreAddress` is changed, since for some insane reason, Next.js does not
  // reset state when navigating between dynamic rotues. Even though the `info`
  // value passed below changes, somehow no re-render occurs... unless the `key`
  // prop is unique. See the issue below for more people compaining about this
  // to no avail. https://github.com/vercel/next.js/issues/9992
  <ChainProvider chainId={info.chainId}>
    <DaoInfoContext.Provider key={info.coreAddress} value={info}>
      <VotingModuleAdapterProvider
        contractName={info.votingModuleContractName}
        options={{
          chainId: info.chainId,
          votingModuleAddress: info.votingModuleAddress,
          coreAddress: info.coreAddress,
        }}
      >
        <DaoActionsProvider>{children}</DaoActionsProvider>
      </VotingModuleAdapterProvider>
    </DaoInfoContext.Provider>
  </ChainProvider>
)

export type DaoProvidersWithoutInfoProps = {
  chainId: string
  coreAddress: string
  children: ReactNode
}

export const DaoProvidersWithoutInfo = ({
  chainId,
  coreAddress,
  children,
}: DaoProvidersWithoutInfoProps) => {
  const { t } = useTranslation()
  const infoLoading = useCachedLoadingWithError(
    daoInfoSelector({
      chainId,
      coreAddress,
    })
  )

  return (
    <SuspenseLoader fallback={<Loader />} forceFallback={infoLoading.loading}>
      {!infoLoading.loading &&
        (infoLoading.errored ? (
          <ErrorPage title={t('error.unexpectedError')}>
            <pre className="whitespace-pre-wrap text-xs text-text-interactive-error">
              {infoLoading.error instanceof Error
                ? infoLoading.error.message
                : `${infoLoading.error}`}
            </pre>
          </ErrorPage>
        ) : (
          <DaoProviders info={infoLoading.data}>{children}</DaoProviders>
        ))}
    </SuspenseLoader>
  )
}
