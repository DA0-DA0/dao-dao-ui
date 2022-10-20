// Inspired by https://storybook.js.org/addons/storybook-dark-mode README

import { DecoratorFn } from '@storybook/react'

import { ProposalModuleAdapterProvider } from '@dao-dao/proposal-module-adapter'
import { Loader, Logo, useDaoInfoContext } from '@dao-dao/ui'

export const makeProposalModuleAdapterDecorator: (
  proposalId: string
  // eslint-disable-next-line react/display-name
) => DecoratorFn = (proposalId) => (Story) => {
  const { chainId, coreAddress, proposalModules } = useDaoInfoContext()

  return (
    <ProposalModuleAdapterProvider
      initialOptions={{
        chainId,
        coreAddress,
        Logo,
        Loader,
      }}
      proposalId={proposalId}
      proposalModules={proposalModules}
    >
      <Story />
    </ProposalModuleAdapterProvider>
  )
}
