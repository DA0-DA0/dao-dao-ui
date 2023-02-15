import { ReactNode } from 'react'

import { DaoContext } from '@dao-dao/stateless'
import { DaoInfo } from '@dao-dao/types'

import { DaoActionsProvider } from '../../actions'
import { VotingModuleAdapterProvider } from '../../voting-module-adapter'

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
  <DaoContext.Provider
    key={info.coreAddress}
    value={{
      daoInfo: info,
    }}
  >
    <VotingModuleAdapterProvider
      contractName={info.votingModuleContractName}
      options={{
        votingModuleAddress: info.votingModuleAddress,
        coreAddress: info.coreAddress,
      }}
    >
      <DaoActionsProvider>{children}</DaoActionsProvider>
    </VotingModuleAdapterProvider>
  </DaoContext.Provider>
)
