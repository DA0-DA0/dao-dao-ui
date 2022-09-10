import { ComponentMeta, ComponentStory } from '@storybook/react'

import { GovernanceConfigurationInput } from './GovernanceConfigurationInput'

export default {
  title:
    'DAO DAO / packages / voting-module-adapter / adapters / cw4-voting / daoCreation / ui / GovernanceConfigurationInput',
  component: GovernanceConfigurationInput,
} as ComponentMeta<typeof GovernanceConfigurationInput>

const Template: ComponentStory<typeof GovernanceConfigurationInput> = (
  args
) => <GovernanceConfigurationInput {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
