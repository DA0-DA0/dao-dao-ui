// Inspired by https://storybook.js.org/addons/storybook-dark-mode README

import { DecoratorFn } from '@storybook/react'

import { useDaoInfoContext } from '@dao-dao/common'
import { ProposalModuleAdapterProvider } from '@dao-dao/proposal-module-adapter'

import { Loader, Logo } from 'components'

// Proposal module adapters registered in `DaoPageWrapperDecorator.tsx`

export const makeProposalModuleAdapterDecorator: (
  proposalId: string
  // eslint-disable-next-line react/display-name
) => DecoratorFn = (proposalId) => (Story) => {
  const info = useDaoInfoContext()

  return (
    <ProposalModuleAdapterProvider
      initialOptions={{
        coreAddress: info.coreAddress,
        Logo,
        Loader,
      }}
      proposalId={proposalId}
      proposalModules={info.proposalModules}
    >
      <Story />
    </ProposalModuleAdapterProvider>
  )
}
