import { ComponentMeta, ComponentStory } from '@storybook/react'

import { GovernanceConfiguration } from './GovernanceConfiguration'

export default {
  title:
    'DAO DAO / packages / voting-module-adapter / adapters / cw4-voting / daoCreation / ui / GovernanceConfiguration',
  component: GovernanceConfiguration,
} as ComponentMeta<typeof GovernanceConfiguration>

const Template: ComponentStory<typeof GovernanceConfiguration> = (args) => (
  <GovernanceConfiguration {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/Dao-2.0?node-id=779%3A39756',
  },
}
