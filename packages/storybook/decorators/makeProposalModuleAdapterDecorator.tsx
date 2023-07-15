import { DecoratorFn } from '@storybook/react'

import { ProposalModuleAdapterProvider } from '@dao-dao/stateful/proposal-module-adapter'
import { useDaoInfoContext } from '@dao-dao/stateless'

export const makeProposalModuleAdapterDecorator: (
  proposalId: string
) => DecoratorFn = (proposalId) =>
  function ProposalModuleAdapterDecorator(Story) {
    const { coreAddress, proposalModules } = useDaoInfoContext()

    return (
      <ProposalModuleAdapterProvider
        initialOptions={{
          coreAddress,
        }}
        proposalId={proposalId}
        proposalModules={proposalModules}
      >
        <Story />
      </ProposalModuleAdapterProvider>
    )
  }
