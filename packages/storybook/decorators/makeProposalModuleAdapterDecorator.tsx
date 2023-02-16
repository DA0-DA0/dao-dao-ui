import { DecoratorFn } from '@storybook/react'

import { ProposalModuleAdapterProvider } from '@dao-dao/stateful/proposal-module-adapter'
import { useDaoInfoContext } from '@dao-dao/stateless'

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
      }}
      proposalId={proposalId}
      proposalModules={proposalModules}
    >
      <Story />
    </ProposalModuleAdapterProvider>
  )
}
