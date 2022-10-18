// Inspired by https://storybook.js.org/addons/storybook-dark-mode README

import { DecoratorFn } from '@storybook/react'

import { ProposalModuleAdapterProvider } from '@dao-dao/proposal-module-adapter'
import { Loader, Logo, useDaoInfoContext } from '@dao-dao/ui'

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
