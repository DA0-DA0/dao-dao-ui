import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeProps as makeProposalCardProps } from './ProposalCard.stories'
import { ProposalCreatedModal } from './ProposalCreatedModal'

export default {
  title:
    'DAO DAO / packages / stateless / components / proposal / ProposalCreatedModal',
  component: ProposalCreatedModal,
} as ComponentMeta<typeof ProposalCreatedModal>

const Template: ComponentStory<typeof ProposalCreatedModal> = (args) => (
  <ProposalCreatedModal {...args} />
)

export const Default = Template.bind({})
Default.args = {
  modalProps: {
    onClose: () => alert('close'),
  },
  itemProps: makeProposalCardProps(),
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=1010%3A47509',
  },
}
