import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BetaWarningModal } from './BetaWarningModal'

export default {
  title: 'DAO DAO / packages / ui / components / modals / BetaWarningModal',
  component: BetaWarningModal,
} as ComponentMeta<typeof BetaWarningModal>

const Template: ComponentStory<typeof BetaWarningModal> = (args) => (
  <BetaWarningModal {...args} />
)

export const Default = Template.bind({})
Default.args = {
  visible: true,
  onClose: () => alert('close'),
}
