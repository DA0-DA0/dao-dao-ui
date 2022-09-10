import { ComponentMeta, ComponentStory } from '@storybook/react'

import { GovernanceConfigurationReview } from './GovernanceConfigurationReview'

export default {
  title:
    'DAO DAO / packages / voting-module-adapter / adapters / cw4-voting / daoCreation / ui / GovernanceConfigurationReview',
  component: GovernanceConfigurationReview,
} as ComponentMeta<typeof GovernanceConfigurationReview>

const Template: ComponentStory<typeof GovernanceConfigurationReview> = (
  args
) => <GovernanceConfigurationReview {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
