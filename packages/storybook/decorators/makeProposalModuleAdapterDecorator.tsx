import { DecoratorFn } from '@storybook/react'

import { ProposalModuleAdapterProvider } from '@dao-dao/stateful/proposal-module-adapter'

export const makeProposalModuleAdapterDecorator: (
  proposalId: string
) => DecoratorFn = (proposalId) =>
  function ProposalModuleAdapterDecorator(Story) {
    return (
      <ProposalModuleAdapterProvider proposalId={proposalId}>
        <Story />
      </ProposalModuleAdapterProvider>
    )
  }
