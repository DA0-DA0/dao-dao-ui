import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeProps as makeUnstakingLineProps } from './UnstakingLine.stories'
import { UnstakingModal, UnstakingModalProps } from './UnstakingModal'
import { UnstakingTaskStatus } from './UnstakingStatus'

export default {
  title: 'DAO DAO / packages / ui / components / UnstakingModal',
  component: UnstakingModal,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof UnstakingModal>

const Template: ComponentStory<typeof UnstakingModal> = (args) => (
  <UnstakingModal {...args} />
)

export const makeProps = (
  tokenSymbol = 'DOG'
): Omit<UnstakingModalProps, 'onClose'> => ({
  unstakingDuration: '5 days',
  tasks: [
    makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, tokenSymbol).task,
    makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, tokenSymbol).task,
    makeUnstakingLineProps(UnstakingTaskStatus.ReadyToClaim, tokenSymbol).task,
    makeUnstakingLineProps(UnstakingTaskStatus.Claimed, tokenSymbol).task,
    makeUnstakingLineProps(UnstakingTaskStatus.Claimed, tokenSymbol).task,
    makeUnstakingLineProps(UnstakingTaskStatus.Claimed, tokenSymbol).task,
    makeUnstakingLineProps(UnstakingTaskStatus.Claimed, tokenSymbol).task,
    makeUnstakingLineProps(UnstakingTaskStatus.Claimed, tokenSymbol).task,
  ],
  onClaim: () => alert('claim'),
})

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=321%3A35845',
  },
}
