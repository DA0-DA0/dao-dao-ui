import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ReactNode } from 'react'

import {
  ChainProvider,
  DaoInfoContext,
  ErrorPage,
  Loader,
} from '@dao-dao/stateless'
import { ContractVersion, DaoInfo } from '@dao-dao/types'

import { DaoActionsProvider } from '../../actions'
import { daoQueries } from '../../queries/dao'
import { VotingModuleAdapterProvider } from '../../voting-module-adapter'
import { SuspenseLoader } from '../SuspenseLoader'

export type DaoProvidersProps = {
  info: DaoInfo
  children: ReactNode
}

export const DaoProviders = ({ info, children }: DaoProvidersProps) => {
  // Don't wrap chain governance in voting module or DAO actions provider.
  const inner =
    info.coreVersion === ContractVersion.Gov ? (
      children
    ) : (
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
    )

  return (
    // Add a unique key here to tell React to re-render everything when the
    // `coreAddress` is changed, since for some insane reason, Next.js does not
    // reset state when navigating between dynamic rotues. Even though the
    // `info` value passed below changes, somehow no re-render occurs... unless
    // the `key` prop is unique. See the issue below for more people compaining
    // about this to no avail. https://github.com/vercel/next.js/issues/9992
    <ChainProvider chainId={info.chainId}>
      <DaoInfoContext.Provider key={info.coreAddress} value={info}>
        {inner}
      </DaoInfoContext.Provider>
    </ChainProvider>
  )
}

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
  const daoInfoQuery = useQuery(
    daoQueries.info(useQueryClient(), {
      chainId,
      coreAddress,
    })
  )

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={daoInfoQuery.isPending}
    >
      {!daoInfoQuery.isPending &&
        (daoInfoQuery.isError ? (
          <ErrorPage error={daoInfoQuery.error} />
        ) : (
          <DaoProviders info={daoInfoQuery.data}>{children}</DaoProviders>
        ))}
    </SuspenseLoader>
  )
}
