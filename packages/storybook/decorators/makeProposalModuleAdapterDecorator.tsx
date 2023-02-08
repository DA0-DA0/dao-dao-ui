// Inspired by https://storybook.js.org/addons/storybook-dark-mode README

import { DecoratorFn } from '@storybook/react'

import { ProposalModuleAdapterProvider } from '@dao-dao/stateful/proposal-module-adapter'
import { useDaoInfo } from '@dao-dao/stateless'

export const makeProposalModuleAdapterDecorator: (
  proposalId: string
  // eslint-disable-next-line react/display-name
) => DecoratorFn = (proposalId) => (Story) => {
  const { chainId, coreAddress, proposalModules } = useDaoInfo()

  return (
    <ProposalModuleAdapterProvider
      initialOptions={{
        chainId,
        coreAddress,
      }}
      proposalId={proposalId}
      proposalModules={proposalModules}
    >
      <Story />
    </ProposalModuleAdapterProvider>
  )
}
